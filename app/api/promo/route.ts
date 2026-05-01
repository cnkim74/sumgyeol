import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createPromoRequest } from "@/lib/promo";
import { PROMO_ELIGIBLE_ROLES } from "@/lib/roles";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session.userId || !session.role) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }
  if (!PROMO_ELIGIBLE_ROLES.includes(session.role)) {
    return NextResponse.json(
      { error: "장례식장·하늘공원 회원만 신청할 수 있어요." },
      { status: 403 }
    );
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }
  const data = body as Record<string, unknown>;
  const organization = String(data.organization ?? "").trim();
  if (!organization) {
    return NextResponse.json(
      { error: "기관 이름을 적어 주세요." },
      { status: 400 }
    );
  }
  const request = await createPromoRequest({
    userId: session.userId,
    organization,
    contact: data.contact ? String(data.contact) : undefined,
    bannerType: data.bannerType ? String(data.bannerType) : undefined,
    message: data.message ? String(data.message) : undefined,
  });
  return NextResponse.json({ ok: true, id: request.id });
}
