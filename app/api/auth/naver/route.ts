import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

export async function GET(req: NextRequest) {
  const state = randomBytes(16).toString("hex");
  const next = req.nextUrl.searchParams.get("next") || "/dashboard";
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || `https://${req.headers.get("host")}`;

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.NAVER_CLIENT_ID!,
    redirect_uri: `${baseUrl}/api/auth/naver/callback`,
    state: `${state}__${next}`,
  });

  const res = NextResponse.redirect(
    `https://nid.naver.com/oauth2.0/authorize?${params}`
  );
  res.cookies.set("oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });
  return res;
}
