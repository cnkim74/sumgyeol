import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { getSession } from "@/lib/session";
import { createSlide, listSlides } from "@/lib/slides";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 5 * 1024 * 1024; // 5MB

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

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const slides = await listSlides();
  return NextResponse.json({ ok: true, slides });
}

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "이미지 업로드 형식을 확인해 주세요." },
      { status: 400 }
    );
  }

  const file = formData.get("image");
  const alt = String(formData.get("alt") ?? "").trim();

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "이미지 파일이 없어요." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "JPG · PNG · WEBP 만 올릴 수 있어요." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "5MB 이하 이미지만 가능합니다." },
      { status: 400 }
    );
  }

  const ext =
    file.type === "image/jpeg" ? "jpg" : file.type === "image/png" ? "png" : "webp";
  const filename = `slide-${Date.now()}.${ext}`;
  const dirPath = path.join(process.cwd(), "public", "hero");
  await fs.mkdir(dirPath, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dirPath, filename), buffer);

  const slide = await createSlide({
    imagePath: `/hero/${filename}`,
    alt: alt || null,
  });

  return NextResponse.json({ ok: true, slide });
}
