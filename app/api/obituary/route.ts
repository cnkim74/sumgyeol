import { NextRequest, NextResponse } from "next/server";
import { createObituary } from "@/lib/obituaries";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session.userId) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }
    const body = await req.json();
    const result = await createObituary({ ...body, userId: session.userId });
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ ok: true, obituary: result.obituary });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[POST /api/obituary]", msg);
    return NextResponse.json({ error: `[디버그] ${msg}` }, { status: 500 });
  }
}
