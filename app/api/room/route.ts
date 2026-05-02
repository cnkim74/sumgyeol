import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createRoom } from "@/lib/rooms";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.userId) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const body = (await req.json()) as {
    name?: string;
    description?: string;
    memorialId?: number;
  };

  if (!body.name?.trim()) {
    return NextResponse.json({ error: "추모방 이름을 입력해 주세요." }, { status: 400 });
  }

  const room = await createRoom(
    session.userId,
    body.name.trim(),
    body.description?.trim(),
    body.memorialId
  );

  return NextResponse.json({ ok: true, room });
}
