import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { getMemorialsByUser } from "@/lib/memorials";
import { getObituariesByUser } from "@/lib/obituaries";
import { getRoomsByOwner } from "@/lib/rooms";
import { PROMO_ELIGIBLE_ROLES, type Role } from "@/lib/roles";
import DeleteButton from "@/components/DeleteButton";

export const metadata = { title: "대시보드 — 숨결" };

export default async function DashboardPage() {
  const session = await getSession();
  if (!session.userId || !session.role) {
    redirect("/login?next=/dashboard");
  }
  const role: Role = session.role;
  const [memorials, obituaries, rooms] = await Promise.all([
    getMemorialsByUser(session.userId!),
    getObituariesByUser(session.userId!),
    getRoomsByOwner(session.userId!),
  ]);

  return (
    <div className="min-h-[calc(100dvh-48px)] bg-[#f7f7f5]">
      <div className="container max-w-3xl py-12">

        {/* 인사 */}
        <p className="text-[13px] font-medium tracking-widest uppercase text-[var(--color-ink-mute)] mb-1">
          숨결
        </p>
        <h1 className="text-[2rem] font-bold tracking-tight mb-8">
          {session.name} 님
        </h1>

        {/* 하늘공원 카드 — 메인 피처 */}
        <div className="mb-6">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-mute)] mb-3">
            나의 하늘공원
          </h2>

          {memorials.length === 0 ? (
            <div className="dashboard-heaven-empty">
              <div className="dhe-visual">
                <div className="dhe-circle" />
                <div className="dhe-lines">
                  <div className="dhe-line" />
                  <div className="dhe-line short" />
                  <div className="dhe-line x-short" />
                </div>
              </div>
              <div className="dhe-text">
                <h3>온라인 하늘공원을 만들어 보세요</h3>
                <p>
                  소중한 분을 추억하는 공간입니다. 생전 사진, 약력, 추모 메시지를
                  한곳에 모아 가족·지인과 나눌 수 있어요.
                </p>
                <Link href="/dashboard/memorial/new" className="btn btn-primary mt-2 text-[15px] py-3 px-6">
                  하늘공원 만들기
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {memorials.map((m) => (
                <div key={m.id} className="dashboard-memorial-row">
                  <div className="dmr-avatar">
                    {m.profileImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.profileImage} alt={m.deceasedName} />
                    ) : (
                      <span>{m.deceasedName.charAt(0)}</span>
                    )}
                  </div>
                  <div className="dmr-info">
                    <p className="dmr-name">{m.deceasedName}</p>
                    <p className="dmr-meta">
                      {m.bornDate && `${m.bornDate.slice(0, 4)}년생`}
                      {m.bornDate && m.diedDate && " · "}
                      {m.diedDate && `${m.diedDate.slice(0, 4)}년 별세`}
                    </p>
                  </div>
                  <div className="dmr-actions">
                    <span className={`notion-badge notion-badge-${m.status === "live" ? "approved" : "pending"}`}>
                      {m.status === "live" ? "공개" : "초안"}
                    </span>
                    {m.status === "live" && (
                      <Link href={`/하늘/${m.slug}`} className="dmr-link" target="_blank">
                        방문 →
                      </Link>
                    )}
                    <Link href={`/dashboard/memorial/${m.id}`} className="dmr-link">
                      편집
                    </Link>
                    <DeleteButton
                      apiPath={`/api/memorial/${m.id}`}
                      label="하늘공원"
                      name={m.deceasedName}
                    />
                  </div>
                </div>
              ))}
              <Link href="/dashboard/memorial/new" className="btn btn-soft text-[14px] py-2.5 px-5 self-start mt-1">
                + 새 하늘공원
              </Link>
            </div>
          )}
        </div>

        {/* 부고장 */}
        <div className="mb-6 mt-10">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-mute)] mb-3">
            부고장
          </h2>
          {obituaries.length === 0 ? (
            <div className="dash-card" style={{ gap: 20 }}>
              <span className="dash-card-icon">📨</span>
              <div className="flex-1">
                <p className="dash-card-title">부고장 만들기</p>
                <p className="dash-card-desc">
                  고인 정보·장례 일정·상주·계좌를 입력하면 공유 링크가 생성돼요.
                  카카오톡·문자로 바로 전달할 수 있습니다.
                </p>
              </div>
              <Link href="/dashboard/obituary/new" className="btn btn-primary text-[14px] py-2.5 px-5 shrink-0">
                만들기
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {obituaries.map((o) => (
                <div key={o.id} className="dashboard-memorial-row">
                  <div className="dmr-avatar" style={{ background: "var(--color-bg-deep)", fontSize: 18 }}>
                    📨
                  </div>
                  <div className="dmr-info">
                    <p className="dmr-name">고(故) {o.deceasedName} 님</p>
                    <p className="dmr-meta">
                      {o.diedDate.slice(0, 10)} 별세 · {o.funeralHome}
                    </p>
                  </div>
                  <div className="dmr-actions">
                    <span className={`notion-badge notion-badge-${o.status === "live" ? "approved" : "pending"}`}>
                      {o.status === "live" ? "공개" : "초안"}
                    </span>
                    {o.status === "live" ? (
                      <Link href={`/부고/${o.slug}`} className="dmr-link" target="_blank">
                        공유 →
                      </Link>
                    ) : (
                      <Link href={`/dashboard/obituary/${o.id}/preview`} className="dmr-link">
                        미리보기
                      </Link>
                    )}
                    <Link href={`/dashboard/obituary/${o.id}`} className="dmr-link">
                      편집
                    </Link>
                    <DeleteButton
                      apiPath={`/api/obituary/${o.id}`}
                      label="부고장"
                      name={`고(故) ${o.deceasedName}`}
                    />
                  </div>
                </div>
              ))}
              <Link href="/dashboard/obituary/new" className="btn btn-soft text-[14px] py-2.5 px-5 self-start mt-1">
                + 새 부고장
              </Link>
            </div>
          )}
        </div>

        {/* 나의 추모방 */}
        <div className="mb-6 mt-10">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-mute)] mb-3">
            나의 추모방
          </h2>
          {rooms.length === 0 ? (
            <div className="dash-card" style={{ gap: 20 }}>
              <span className="dash-card-icon">🗝</span>
              <div className="flex-1">
                <p className="dash-card-title">추모방 만들기</p>
                <p className="dash-card-desc">
                  가족·지인과 함께 추모 글을 나누는 공간입니다. 초대 코드로 접근할 수 있어요.
                </p>
              </div>
              <Link href="/dashboard/room/new" className="btn btn-primary text-[14px] py-2.5 px-5 shrink-0">
                만들기
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {rooms.map((r) => (
                <div key={r.id} className="dashboard-memorial-row">
                  <div className="dmr-avatar" style={{ background: "var(--color-bg-deep)", fontSize: 18 }}>
                    🗝
                  </div>
                  <div className="dmr-info">
                    <p className="dmr-name">{r.name}</p>
                    <p className="dmr-meta">초대코드 {r.joinCode}</p>
                  </div>
                  <div className="dmr-actions">
                    <Link
                      href={`/추모방/${r.joinCode}`}
                      className="dmr-link"
                      target="_blank"
                    >
                      방문 →
                    </Link>
                  </div>
                </div>
              ))}
              <Link href="/dashboard/room/new" className="btn btn-soft text-[14px] py-2.5 px-5 self-start mt-1">
                + 새 추모방
              </Link>
            </div>
          )}
        </div>

        {/* 빠른 메뉴 */}
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-mute)] mb-3 mt-10">
          서비스
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <DashCard
            icon="📸"
            title="모음"
            desc="사진·영상·글을 생전에 모아 둡니다."
            badge="준비 중"
          />
          <Link href="/dashboard/contacts" className="dash-card hoverable">
            <span className="dash-card-icon">📋</span>
            <div>
              <p className="dash-card-title">연락처 관리</p>
              <p className="dash-card-desc">부고를 보낼 연락처를 그룹별로 보관합니다.</p>
            </div>
          </Link>
          {PROMO_ELIGIBLE_ROLES.includes(role) && (
            <Link href="/promo" className="dash-card hoverable">
              <span className="dash-card-icon">📣</span>
              <div>
                <p className="dash-card-title">홍보 배너 신청</p>
                <p className="dash-card-desc">
                  숨결 페이지에 기관 홍보 배너를 신청합니다.
                </p>
              </div>
            </Link>
          )}
          {role === "admin" && (
            <Link href="/admin" className="dash-card hoverable">
              <span className="dash-card-icon">⬛</span>
              <div>
                <p className="dash-card-title">관리자 페이지</p>
                <p className="dash-card-desc">회원·하늘공원·슬라이더 관리.</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function DashCard({
  icon,
  title,
  desc,
  badge,
}: {
  icon: string;
  title: string;
  desc: string;
  badge?: string;
}) {
  return (
    <div className="dash-card">
      <span className="dash-card-icon">{icon}</span>
      <div className="flex-1">
        <p className="dash-card-title">
          {title}
          {badge && <span className="dash-card-badge">{badge}</span>}
        </p>
        <p className="dash-card-desc">{desc}</p>
      </div>
    </div>
  );
}
