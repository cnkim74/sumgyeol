import { NextResponse } from "next/server";
import { appendWaitlistEntry, type WaitlistEntry } from "@/lib/waitlist";

const ALLOWED_INTERESTS = new Set([
  "모음",
  "다큐멘터리",
  "디지털 액자",
  "B2B",
]);

function clean(value: unknown, max = 200): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const name = clean(data.name, 60);
  const email = clean(data.email, 120);
  const phone = clean(data.phone, 30);
  const message = clean(data.message, 500);
  const interestsRaw = Array.isArray(data.interests) ? data.interests : [];
  const interests = interestsRaw
    .map((v) => clean(v, 30))
    .filter((v) => ALLOWED_INTERESTS.has(v));

  if (!name) {
    return NextResponse.json({ error: "이름을 적어 주세요." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "이메일 형식을 확인해 주세요." }, { status: 400 });
  }

  const entry: WaitlistEntry = {
    name,
    email,
    phone: phone || undefined,
    interests,
    message: message || undefined,
    receivedAt: new Date().toISOString(),
  };

  try {
    await appendWaitlistEntry(entry);
  } catch (err) {
    console.error("[signup] failed to persist", err);
    // 개발 단계에선 영속 실패해도 응답은 성공으로 — 로그 확인
  }

  console.log("[signup]", entry);

  return NextResponse.json({ ok: true });
}
