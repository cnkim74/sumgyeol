import { NextRequest, NextResponse } from "next/server";
import { getContactsByUser, createContact } from "@/lib/contacts";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session.userId) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    const contacts = await getContactsByUser(session.userId);
    return NextResponse.json({ contacts });
  } catch (e) {
    console.error("[GET /api/contacts]", e);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session.userId) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    const body = await req.json();
    const result = await createContact(session.userId, body);
    if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ ok: true, contact: result.contact });
  } catch (e) {
    console.error("[POST /api/contacts]", e);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
