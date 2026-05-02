import { NextRequest, NextResponse } from "next/server";
import { getRoomByCode, addRoomPost } from "@/lib/rooms";
import { getSession } from "@/lib/session";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const room = await getRoomByCode(code);
  if (!room) {
    return NextResponse.json({ error: "추모방을 찾을 수 없습니다." }, { status: 404 });
  }

  const body = (await req.json()) as {
    authorName?: string;
    content?: string;
    imageUrl?: string;
  };

  if (!body.authorName?.trim()) {
    return NextResponse.json({ error: "이름을 입력해 주세요." }, { status: 400 });
  }
  if (!body.content?.trim()) {
    return NextResponse.json({ error: "내용을 입력해 주세요." }, { status: 400 });
  }
  if (body.content.trim().length > 500) {
    return NextResponse.json({ error: "내용은 500자 이내로 입력해 주세요." }, { status: 400 });
  }

  // Optionally associate logged-in user
  const session = await getSession();
  const post = await addRoomPost(
    room.id,
    body.authorName.trim(),
    body.content.trim(),
    session.userId,
    body.imageUrl?.trim()
  );

  return NextResponse.json({ ok: true, post });
}
