import Link from "next/link";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/session";
import { listUsers } from "@/lib/users";
import { listPromoRequests } from "@/lib/promo";
import { ROLE_LABELS } from "@/lib/roles";

export const metadata = { title: "관리" };

export default async function AdminPage() {
  const session = await getSession();
  if (session.role !== "admin") notFound();

  const [users, promos] = await Promise.all([
    listUsers(),
    listPromoRequests(),
  ]);

  return (
    <section className="section">
      <div className="container max-w-5xl">
        <p className="kicker mb-3">관리</p>
        <h1 className="display-md mb-8">전체 회원 · 신청</h1>

        {/* 빠른 메뉴 */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          <Link href="/admin/slides" className="card lift !p-5">
            <h3 className="card-title text-[1.15rem]">홈 슬라이더 관리</h3>
            <p className="text-[13px] text-[var(--color-ink-mute)] leading-[1.6]">
              첫 화면 풀스크린 이미지 추가·삭제·순서 변경.
            </p>
          </Link>
        </div>

        <h2 className="text-[1.4rem] font-bold mb-3">회원 ({users.length})</h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper)] mb-12">
          <table className="w-full text-[14px]">
            <thead className="bg-[var(--color-bg-soft)]">
              <tr>
                <th className="text-left p-3 font-semibold">이름</th>
                <th className="text-left p-3 font-semibold">이메일</th>
                <th className="text-left p-3 font-semibold">등급</th>
                <th className="text-left p-3 font-semibold">기관</th>
                <th className="text-left p-3 font-semibold">가입일</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-[var(--color-ink-mute)]">
                    아직 회원이 없습니다.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-t border-[var(--color-rule)]">
                    <td className="p-3">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">
                      <span className="role-badge">{ROLE_LABELS[u.role]}</span>
                    </td>
                    <td className="p-3">{u.organization ?? "—"}</td>
                    <td className="p-3 text-[var(--color-ink-mute)]">
                      {u.createdAt.slice(0, 10)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <h2 className="text-[1.4rem] font-bold mb-3">
          홍보 배너 신청 ({promos.length})
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-rule)] bg-[var(--color-paper)]">
          <table className="w-full text-[14px]">
            <thead className="bg-[var(--color-bg-soft)]">
              <tr>
                <th className="text-left p-3 font-semibold">기관</th>
                <th className="text-left p-3 font-semibold">유형</th>
                <th className="text-left p-3 font-semibold">메시지</th>
                <th className="text-left p-3 font-semibold">상태</th>
                <th className="text-left p-3 font-semibold">신청일</th>
              </tr>
            </thead>
            <tbody>
              {promos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-[var(--color-ink-mute)]">
                    아직 신청이 없습니다.
                  </td>
                </tr>
              ) : (
                promos.map((p) => (
                  <tr key={p.id} className="border-t border-[var(--color-rule)]">
                    <td className="p-3 font-medium">{p.organization}</td>
                    <td className="p-3">{p.bannerType ?? "—"}</td>
                    <td className="p-3 max-w-xs truncate" title={p.message ?? ""}>
                      {p.message ?? "—"}
                    </td>
                    <td className="p-3">
                      <span className="role-badge">{p.status}</span>
                    </td>
                    <td className="p-3 text-[var(--color-ink-mute)]">
                      {p.createdAt.slice(0, 10)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
