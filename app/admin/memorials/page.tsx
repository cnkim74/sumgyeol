import Link from "next/link";
import { listAllMemorials } from "@/lib/memorials";

export const metadata = { title: "하늘공원 페이지" };

export default async function AdminMemorialsPage() {
  const memorials = await listAllMemorials();
  const live = memorials.filter((m) => m.status === "live");
  const draft = memorials.filter((m) => m.status === "draft");

  return (
    <div className="notion-page">
      <div className="notion-page-header">
        <span className="notion-page-icon">🏞</span>
        <div>
          <h1 className="notion-page-title">하늘공원 페이지</h1>
          <p className="notion-page-desc">
            전체 {memorials.length}개 · 공개 {live.length}개 · 초안 {draft.length}개
          </p>
        </div>
      </div>

      <div className="notion-table-wrap">
        <table className="notion-table">
          <thead>
            <tr>
              <th>고인 성함</th>
              <th>주소</th>
              <th>생년</th>
              <th>별세일</th>
              <th>상태</th>
              <th>등록일</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {memorials.length === 0 ? (
              <tr>
                <td colSpan={7} className="notion-table-empty">
                  아직 등록된 하늘공원이 없습니다.
                </td>
              </tr>
            ) : (
              memorials.map((m) => (
                <tr key={m.id}>
                  <td className="font-medium">{m.deceasedName}</td>
                  <td className="text-[var(--notion-text-mute)] font-mono text-[12px]">
                    /하늘/{m.slug}
                  </td>
                  <td className="text-[var(--notion-text-mute)]">{m.bornDate ?? "—"}</td>
                  <td className="text-[var(--notion-text-mute)]">{m.diedDate ?? "—"}</td>
                  <td>
                    <span className={`notion-badge notion-badge-${m.status === "live" ? "approved" : "pending"}`}>
                      {m.status === "live" ? "공개" : "초안"}
                    </span>
                  </td>
                  <td className="text-[var(--notion-text-mute)]">{m.createdAt.slice(0, 10)}</td>
                  <td>
                    {m.status === "live" && (
                      <Link
                        href={`/하늘/${m.slug}`}
                        className="text-[12px] text-[var(--notion-text-mute)] hover:text-[var(--notion-text)] underline"
                        target="_blank"
                      >
                        방문 →
                      </Link>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
