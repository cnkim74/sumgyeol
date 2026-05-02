import { listUsers } from "@/lib/users";
import { ROLE_LABELS } from "@/lib/roles";

export const metadata = { title: "회원 명부" };

const ROLE_COLORS: Record<string, string> = {
  admin: "admin",
  funeral: "funeral",
  park: "park",
  member: "member",
};

export default async function AdminUsersPage() {
  const users = await listUsers();

  return (
    <div className="notion-page">
      <div className="notion-page-header">
        <span className="notion-page-icon">👤</span>
        <div>
          <h1 className="notion-page-title">회원 명부</h1>
          <p className="notion-page-desc">전체 {users.length}명</p>
        </div>
      </div>

      <div className="notion-table-wrap">
        <table className="notion-table">
          <thead>
            <tr>
              <th>#</th>
              <th>이름</th>
              <th>이메일</th>
              <th>등급</th>
              <th>기관</th>
              <th>연락처</th>
              <th>가입일</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="notion-table-empty">
                  아직 회원이 없습니다.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td className="text-[var(--notion-text-mute)] text-[12px]">{u.id}</td>
                  <td className="font-medium">{u.name}</td>
                  <td className="text-[var(--notion-text-mute)]">{u.email}</td>
                  <td>
                    <span className={`notion-badge notion-badge-${ROLE_COLORS[u.role] ?? "member"}`}>
                      {ROLE_LABELS[u.role]}
                    </span>
                  </td>
                  <td>{u.organization ?? <span className="text-[var(--notion-text-mute)]">—</span>}</td>
                  <td className="text-[var(--notion-text-mute)]">{u.phone ?? "—"}</td>
                  <td className="text-[var(--notion-text-mute)]">{u.createdAt.slice(0, 10)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
