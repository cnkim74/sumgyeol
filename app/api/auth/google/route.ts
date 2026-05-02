import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

export async function GET(req: NextRequest) {
  const state = randomBytes(16).toString("hex");
  const next = req.nextUrl.searchParams.get("next") || "/dashboard";
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || `https://${req.headers.get("host")}`;

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: `${baseUrl}/api/auth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    state: `${state}__${next}`,
    access_type: "online",
  });

  const res = NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params}`
  );
  res.cookies.set("oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });
  return res;
}
