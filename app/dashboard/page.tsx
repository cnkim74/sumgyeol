import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import {
  ROLE_LABELS,
  PROMO_ELIGIBLE_ROLES,
  type Role,
} from "@/lib/roles";

export const metadata = { title: "내 정보" };

export default async function DashboardPage() {
  const session = await getSession();
  if (!session.userId || !session.role) {
    redirect("/login?next=/dashboard");
  }
  const role: Role = session.role;

  return (
    <section className="section">
      <div className="container max-w-3xl">
        <p className="kicker mb-3">내 정보</p>
        <h1 className="display-md mb-4">
          {session.name} 님, 환영합니다.
        </h1>
        <p className="lead">
          현재 등급:{" "}
          <span className="role-badge">
            {ROLE_LABELS[role]}
          </span>
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {PROMO_ELIGIBLE_ROLES.includes(role) && (
            <Link href="/promo" className="card lift">
              <h3 className="card-title">홍보 배너 신청</h3>
              <p className="text-[14px] text-[var(--color-ink-mute)] leading-[1.6]">
                숨결 페이지에 기관 홍보 배너를 노출 신청합니다.
                담당자가 검토 후 회신해요.
              </p>
            </Link>
          )}
          {role === "admin" && (
            <Link href="/admin" className="card lift">
              <h3 className="card-title">관리</h3>
              <p className="text-[14px] text-[var(--color-ink-mute)] leading-[1.6]">
                전체 회원과 신청 목록을 봅니다.
              </p>
            </Link>
          )}
          {role === "member" && (
            <div className="card">
              <h3 className="card-title">곧 열립니다</h3>
              <p className="text-[14px] text-[var(--color-ink-mute)] leading-[1.6]">
                일반회원의 모음·보냄·머무름은 다음 단계에서 열립니다.
                사전 신청자에겐 1년치 모음 구독이 무료로 제공돼요.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
