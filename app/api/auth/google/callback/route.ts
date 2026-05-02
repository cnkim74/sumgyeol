import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { findOrCreateOAuthUser } from "@/lib/users";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const code = searchParams.get("code");
  const stateParam = searchParams.get("state") ?? "";
  const stateCookie = req.cookies.get("oauth_state")?.value ?? "";

  // 1. Validate state
  const [stateValue, ...nextParts] = stateParam.split("__");
  const next = nextParts.join("__") || "/dashboard";

  if (!stateValue || stateValue !== stateCookie) {
    return NextResponse.redirect(
      new URL("/login?error=oauth_failed", req.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=oauth_failed", req.url));
  }

  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || `https://${req.headers.get("host")}`;

    // 2. Exchange code for token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${baseUrl}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      return NextResponse.redirect(
        new URL("/login?error=oauth_failed", req.url)
      );
    }

    const tokenData = (await tokenRes.json()) as { access_token?: string };
    const accessToken = tokenData.access_token;
    if (!accessToken) {
      return NextResponse.redirect(
        new URL("/login?error=oauth_failed", req.url)
      );
    }

    // 3. Get user info
    const userRes = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!userRes.ok) {
      return NextResponse.redirect(
        new URL("/login?error=oauth_failed", req.url)
      );
    }

    const profile = (await userRes.json()) as {
      sub: string;
      email: string;
      name: string;
      picture?: string;
    };

    // 4. Find or create user
    const user = await findOrCreateOAuthUser({
      provider: "google",
      providerId: profile.sub,
      email: profile.email,
      name: profile.name,
      avatarUrl: profile.picture,
    });

    // 5. Set session
    const session = await getSession();
    session.userId = user.id;
    session.email = user.email;
    session.name = user.name;
    session.role = user.role;
    session.avatarUrl = user.avatarUrl ?? undefined;
    await session.save();

    // 6. Clear oauth_state cookie and redirect
    const redirectRes = NextResponse.redirect(new URL(next, req.url));
    redirectRes.cookies.set("oauth_state", "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
    });
    return redirectRes;
  } catch (err) {
    console.error("[google oauth] callback error", err);
    return NextResponse.redirect(new URL("/login?error=oauth_failed", req.url));
  }
}
