import { NextRequest, NextResponse } from "next/server";
import { addMemorialMessage, getMemorialBySlug } from "@/lib/memorials";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { memorialId, authorName, content } = body as {
      memorialId?: number;
      authorName?: string;
      content?: string;
    };

    if (!memorialId || !authorName?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "필수 항목을 모두 입력해 주세요." }, { status: 400 });
    }
    if (content.trim().length > 500) {
      return NextResponse.json({ error: "500자 이내로 작성해 주세요." }, { status: 400 });
    }

    // 공개 페이지만 메시지 허용
    const db = await getDb();
    const result = await db.execute({
      sql: "SELECT status FROM memorial_pages WHERE id = ?",
      args: [memorialId],
    });
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "존재하지 않는 하늘공원입니다." }, { status: 404 });
    }
    const row = result.rows[0] as Record<string, unknown>;
    if (row.status !== "live") {
      return NextResponse.json({ error: "비공개 하늘공원입니다." }, { status: 403 });
    }

    const msg = await addMemorialMessage(memorialId, authorName, content);
    return NextResponse.json({ ok: true, message: msg });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
