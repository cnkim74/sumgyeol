import { NextRequest, NextResponse } from "next/server";
import { updateContact, deleteContact } from "@/lib/contacts";
import { getSession } from "@/lib/session";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session.userId) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    const { id } = await params;
    const body = await req.json();
    const result = await updateContact(Number(id), session.userId, body);
    if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ ok: true, contact: result.contact });
  } catch (e) {
    console.error("[PUT /api/contacts/:id]", e);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session.userId) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    const { id } = await params;
    const result = await deleteContact(Number(id), session.userId);
    if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[DELETE /api/contacts/:id]", e);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
