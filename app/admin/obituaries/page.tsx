import Link from "next/link";
import { listAllObituaries } from "@/lib/obituaries";

export const metadata = { title: "부고장 관리" };

export default async function AdminObituariesPage() {
  const obituaries = await listAllObituaries();
  const live = obituaries.filter((o) => o.status === "live");

  return (
    <div className="notion-page">
      <div className="notion-page-header">
        <span className="notion-page-icon">📨</span>
        <div>
          <h1 className="notion-page-title">부고장</h1>
          <p className="notion-page-desc">
            전체 {obituaries.length}건 · 공개 {live.length}건
          </p>
        </div>
      </div>

      <div className="notion-table-wrap">
        <table className="notion-table">
          <thead>
            <tr>
              <th>고인 성함</th>
              <th>별세일</th>
              <th>장례식장</th>
              <th>발인</th>
              <th>상주</th>
              <th>상태</th>
              <th>등록일</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {obituaries.length === 0 ? (
              <tr>
                <td colSpan={8} className="notion-table-empty">
                  아직 등록된 부고장이 없습니다.
                </td>
              </tr>
            ) : (
              obituaries.map((o) => (
                <tr key={o.id}>
                  <td className="font-medium">고(故) {o.deceasedName}</td>
                  <td className="text-[var(--notion-text-mute)]">
                    {o.diedDate.slice(0, 10)}
                  </td>
                  <td>{o.funeralHome}</td>
                  <td className="text-[var(--notion-text-mute)]">
                    {o.ceremonyDate ? o.ceremonyDate.slice(0, 10) : "—"}
                  </td>
                  <td className="text-[var(--notion-text-mute)]">
                    {o.chiefMourners.length > 0
                      ? o.chiefMourners.map((m) => m.name).join(", ")
                      : "—"}
                  </td>
                  <td>
                    <span
                      className={`notion-badge notion-badge-${
                        o.status === "live" ? "approved" : "pending"
                      }`}
                    >
                      {o.status === "live" ? "공개" : "초안"}
                    </span>
                  </td>
                  <td className="text-[var(--notion-text-mute)]">
                    {o.createdAt.slice(0, 10)}
                  </td>
                  <td>
                    {o.status === "live" && (
                      <Link
                        href={`/부고/${o.slug}`}
                        className="text-[12px] text-[var(--notion-text-mute)] hover:text-[var(--notion-text)] underline"
                        target="_blank"
                      >
                        보기 →
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
