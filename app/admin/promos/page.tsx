import { listPromoRequests } from "@/lib/promo";

export const metadata = { title: "홍보 배너 신청" };

const STATUS_LABELS: Record<string, string> = {
  pending: "검토 중",
  approved: "승인",
  rejected: "반려",
};

export default async function AdminPromosPage() {
  const promos = await listPromoRequests();
  const pending = promos.filter((p) => p.status === "pending");
  const others = promos.filter((p) => p.status !== "pending");

  return (
    <div className="notion-page">
      <div className="notion-page-header">
        <span className="notion-page-icon">📣</span>
        <div>
          <h1 className="notion-page-title">홍보 배너 신청</h1>
          <p className="notion-page-desc">
            전체 {promos.length}건 · 대기 {pending.length}건
          </p>
        </div>
      </div>

      {pending.length > 0 && (
        <section className="notion-section">
          <div className="notion-section-header">
            <h2 className="notion-section-title">
              <span className="notion-badge notion-badge-pending mr-2">대기</span>
              검토 필요 {pending.length}건
            </h2>
          </div>
          <PromoTable rows={pending} />
        </section>
      )}

      <section className="notion-section">
        <div className="notion-section-header">
          <h2 className="notion-section-title">전체 신청</h2>
        </div>
        <PromoTable rows={promos} />
      </section>
    </div>
  );
}

function PromoTable({ rows }: { rows: Awaited<ReturnType<typeof listPromoRequests>> }) {
  return (
    <div className="notion-table-wrap">
      <table className="notion-table">
        <thead>
          <tr>
            <th>기관</th>
            <th>유형</th>
            <th>메시지</th>
            <th>연락처</th>
            <th>상태</th>
            <th>신청일</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={6} className="notion-table-empty">신청이 없습니다.</td>
            </tr>
          ) : (
            rows.map((p) => (
              <tr key={p.id}>
                <td className="font-medium">{p.organization}</td>
                <td>{p.bannerType ?? <span className="text-[var(--notion-text-mute)]">—</span>}</td>
                <td className="max-w-[200px] truncate" title={p.message ?? ""}>
                  {p.message ?? <span className="text-[var(--notion-text-mute)]">—</span>}
                </td>
                <td className="text-[var(--notion-text-mute)]">{p.contact ?? "—"}</td>
                <td>
                  <span className={`notion-badge notion-badge-${p.status}`}>
                    {STATUS_LABELS[p.status] ?? p.status}
                  </span>
                </td>
                <td className="text-[var(--notion-text-mute)]">{p.createdAt.slice(0, 10)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
