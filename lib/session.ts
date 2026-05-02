import { cookies } from "next/headers";
import { getIronSession, type SessionOptions } from "iron-session";
import type { Role } from "./roles";

export type SessionData = {
  userId?: number;
  email?: string;
  name?: string;
  role?: Role;
  avatarUrl?: string;
};

const DEV_PASSWORD =
  "sumgyeol-dev-default-password-min-32-chars-replace-in-production";

const PASSWORD = process.env.SESSION_PASSWORD ?? DEV_PASSWORD;

if (PASSWORD.length < 32) {
  throw new Error("SESSION_PASSWORD must be at least 32 characters.");
}
if (process.env.NODE_ENV === "production" && PASSWORD === DEV_PASSWORD) {
  console.warn(
    "[숨결] WARNING: SESSION_PASSWORD not set — using dev default. " +
      "Set a real value in production env (vercel.com → Project → Environment Variables)."
  );
}

export const sessionOptions: SessionOptions = {
  password: PASSWORD,
  cookieName: "sumgyeol-session",
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}
