import { NextResponse } from "next/server";
import { createUser } from "@/lib/users";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }
  const data = body as Record<string, unknown>;
  const result = await createUser({
    email: String(data.email ?? ""),
    password: String(data.password ?? ""),
    name: String(data.name ?? ""),
    role: String(data.role ?? "member"),
    organization: data.organization ? String(data.organization) : undefined,
    phone: data.phone ? String(data.phone) : undefined,
  });
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const session = await getSession();
  session.userId = result.user.id;
  session.email = result.user.email;
  session.name = result.user.name;
  session.role = result.user.role;
  await session.save();
  return NextResponse.json({
    ok: true,
    user: { id: result.user.id, role: result.user.role },
  });
}
