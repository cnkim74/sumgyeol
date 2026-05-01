import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { reorderSlides } from "@/lib/slides";

export async function POST(req: Request) {
  const session = await getSession();
  if (session.role !== "admin") {
    return NextResponse.json(
      { error: "관리자만 가능합니다." },
      { status: 403 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }
  const data = body as Record<string, unknown>;
  const ids = data.ids;
  if (!Array.isArray(ids) || !ids.every((v) => typeof v === "number")) {
    return NextResponse.json({ error: "ids 배열이 필요합니다." }, { status: 400 });
  }

  await reorderSlides(ids as number[]);
  return NextResponse.json({ ok: true });
}
