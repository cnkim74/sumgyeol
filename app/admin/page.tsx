import Link from "next/link";
import { listUsers } from "@/lib/users";
import { listPromoRequests } from "@/lib/promo";
import { listAllMemorials } from "@/lib/memorials";

export const metadata = { title: "관리 대시보드" };

export default async function AdminDashboardPage() {
  const [users, promos, memorials] = await Promise.all([
    listUsers(),
    listPromoRequests(),
    listAllMemorials(),
  ]);

  const pendingPromos = promos.filter((p) => p.status === "pending").length;
  const liveMemorials = memorials.filter((m) => m.status === "live").length;

  const stats = [
    { label: "전체 회원", value: users.length, href: "/admin/users", icon: "👤" },
    { label: "홍보 신청", value: promos.length, sub: pendingPromos ? `대기 ${pendingPromos}건` : undefined, href: "/admin/promos", icon: "📣" },
    { label: "하늘공원", value: memorials.length, sub: `공개 ${liveMemorials}개`, href: "/admin/memorials", icon: "🏞" },
    { label: "홈 슬라이더", value: "관리", href: "/admin/slides", icon: "🖼" },
  ];

  const recentUsers = users.slice(0, 5);

  return (
    <div className="notion-page">
      <div className="notion-page-header">
        <span className="notion-page-icon">⬛</span>
        <div>
          <h1 className="notion-page-title">대시보드</h1>
          <p className="notion-page-desc">숨결 플랫폼 현황을 한눈에</p>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="notion-stat-grid">
        {stats.map((s) => (
          <Link key={s.href} href={s.href} className="notion-stat-card">
            <span className="notion-stat-icon">{s.icon}</span>
            <div className="notion-stat-body">
              <div className="notion-stat-label">{s.label}</div>
              <div className="notion-stat-value">{s.value}</div>
              {s.sub && <div className="notion-stat-sub">{s.sub}</div>}
            </div>
          </Link>
        ))}
      </div>

      {/* 최근 가입 */}
      <section className="notion-section">
        <div className="notion-section-header">
          <h2 className="notion-section-title">최근 가입 회원</h2>
          <Link href="/admin/users" className="notion-section-link">전체 보기 →</Link>
        </div>
        <div className="notion-table-wrap">
          <table className="notion-table">
            <thead>
              <tr>
                <th>이름</th>
                <th>이메일</th>
                <th>등급</th>
                <th>가입일</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.length === 0 ? (
                <tr><td colSpan={4} className="notion-table-empty">아직 회원이 없습니다.</td></tr>
              ) : (
                recentUsers.map((u) => (
                  <tr key={u.id}>
                    <td className="font-medium">{u.name}</td>
                    <td className="text-[var(--notion-text-mute)]">{u.email}</td>
                    <td><span className={`notion-badge notion-badge-${u.role}`}>{u.role}</span></td>
                    <td className="text-[var(--notion-text-mute)]">{u.createdAt.slice(0, 10)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
