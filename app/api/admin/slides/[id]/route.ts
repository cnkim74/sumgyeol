import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { getSession } from "@/lib/session";
import { deleteSlide, updateSlide } from "@/lib/slides";

async function requireAdmin() {
  const session = await getSession();
  if (session.role !== "admin") {
    return NextResponse.json(
      { error: "관리자만 가능합니다." },
      { status: 403 }
    );
  }
  return null;
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await ctx.params;
  const numId = Number(id);
  if (!Number.isFinite(numId)) {
    return NextResponse.json({ error: "잘못된 id" }, { status: 400 });
  }

  const removed = await deleteSlide(numId);
  if (!removed) {
    return NextResponse.json({ error: "찾을 수 없습니다." }, { status: 404 });
  }

  // 시드 기본 이미지(/hero/1.jpg, 2.jpg, 3.jpg)는 파일 삭제 안 함 — 다른 사람 업로드 본만 삭제
  const isDefault =
    removed.imagePath === "/hero/1.jpg" ||
    removed.imagePath === "/hero/2.jpg" ||
    removed.imagePath === "/hero/3.jpg";
  if (!isDefault) {
    try {
      const filePath = path.join(
        process.cwd(),
        "public",
        removed.imagePath.replace(/^\//, "")
      );
      await fs.unlink(filePath);
    } catch {
      // 파일이 이미 없으면 조용히 무시
    }
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await ctx.params;
  const numId = Number(id);
  if (!Number.isFinite(numId)) {
    return NextResponse.json({ error: "잘못된 id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }
  const data = body as Record<string, unknown>;
  const fields: { alt?: string | null; sortOrder?: number } = {};
  if (typeof data.alt === "string") fields.alt = data.alt.trim() || null;
  if (typeof data.sortOrder === "number") fields.sortOrder = data.sortOrder;

  await updateSlide(numId, fields);
  return NextResponse.json({ ok: true });
}
