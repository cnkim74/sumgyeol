import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { updateUserProfile } from "@/lib/users";

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session.userId) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const body = (await req.json()) as {
    name?: string;
    avatarUrl?: string;
    phone?: string;
  };

  const updated = await updateUserProfile(session.userId, {
    name: body.name,
    avatarUrl: body.avatarUrl,
    phone: body.phone,
  });

  if (!updated) {
    return NextResponse.json({ error: "사용자를 찾을 수 없습니다." }, { status: 404 });
  }

  // Update session
  if (body.name !== undefined) session.name = updated.name;
  if (body.avatarUrl !== undefined) session.avatarUrl = updated.avatarUrl ?? undefined;
  await session.save();

  return NextResponse.json({ ok: true });
}
