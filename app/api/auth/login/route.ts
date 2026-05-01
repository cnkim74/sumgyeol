import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/users";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }
  const data = body as Record<string, unknown>;
  const email = String(data.email ?? "");
  const password = String(data.password ?? "");
  if (!email || !password) {
    return NextResponse.json(
      { error: "이메일·비밀번호를 적어 주세요." },
      { status: 400 }
    );
  }
  const result = await authenticateUser(email, password);
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
