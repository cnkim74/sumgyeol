import { listAllRooms } from "@/lib/rooms";
import Link from "next/link";

export const metadata = { title: "추모방 관리 — 숨결 Admin" };

export default async function AdminRoomsPage() {
  const rooms = await listAllRooms();

  return (
    <div className="notion-page">
      <div className="notion-page-header">
        <h1 className="notion-page-title">추모방</h1>
        <p className="notion-page-sub">전체 {rooms.length}개</p>
      </div>

      <div className="notion-table-wrap">
        <table className="notion-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>초대코드</th>
              <th>소유자 ID</th>
              <th>상태</th>
              <th>생성일</th>
              <th>바로가기</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-[var(--color-ink-mute)] py-8">
                  추모방이 없습니다.
                </td>
              </tr>
            ) : (
              rooms.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td className="font-medium">{r.name}</td>
                  <td>
                    <code className="text-[13px] bg-[var(--color-bg)] px-2 py-0.5 rounded">
                      {r.joinCode}
                    </code>
                  </td>
                  <td>{r.ownerId}</td>
                  <td>
                    <span
                      className={`notion-badge notion-badge-${r.status === "active" ? "approved" : "pending"}`}
                    >
                      {r.status === "active" ? "활성" : r.status}
                    </span>
                  </td>
                  <td className="text-[var(--color-ink-mute)]">
                    {r.createdAt.slice(0, 10)}
                  </td>
                  <td>
                    <Link
                      href={`/추모방/${r.joinCode}`}
                      className="text-link text-[13px]"
                      target="_blank"
                    >
                      방문 →
                    </Link>
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
