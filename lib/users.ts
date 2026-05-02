import { getDb } from "./db";
import { hashPassword, verifyPassword } from "./auth";
import { canSignupAs, ORG_REQUIRED_ROLES, type Role } from "./roles";

// ADMIN_EMAILS 환경변수에 콤마로 적은 이메일은 가입·로그인 시 자동으로 admin 등급으로 승격.
// 예) ADMIN_EMAILS="cnkim@example.com,founder@sumgyeol.kr"
function isPromotedAdmin(email: string): boolean {
  const list = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

async function promoteIfAdminEmail(user: User): Promise<User> {
  if (user.role === "admin") return user;
  if (!isPromotedAdmin(user.email)) return user;
  const db = await getDb();
  await db.execute({
    sql: "UPDATE users SET role = 'admin' WHERE id = ?",
    args: [user.id],
  });
  console.log(`[users] auto-promoted ${user.email} → admin (ADMIN_EMAILS)`);
  return { ...user, role: "admin" };
}

export type User = {
  id: number;
  email: string;
  name: string;
  role: Role;
  organization: string | null;
  phone: string | null;
  createdAt: string;
};

export type UserInput = {
  email: string;
  password: string;
  name: string;
  role: string;
  organization?: string;
  phone?: string;
};

const VALID_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type CreateResult = { user: User } | { error: string };

export async function createUser(input: UserInput): Promise<CreateResult> {
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();
  const password = input.password;
  const roleRaw = input.role.trim();
  const organization = input.organization?.trim() || null;
  const phone = input.phone?.trim() || null;

  if (!VALID_EMAIL.test(email))
    return { error: "이메일 형식을 확인해 주세요." };
  if (name.length < 1) return { error: "이름을 적어 주세요." };
  if (password.length < 8) return { error: "비밀번호는 8자 이상이어야 해요." };
  if (!canSignupAs(roleRaw)) return { error: "회원 등급을 다시 골라 주세요." };

  const role = roleRaw as Role;
  if (ORG_REQUIRED_ROLES.includes(role) && !organization) {
    return { error: "기관(시설) 이름을 적어 주세요." };
  }

  const db = await getDb();
  const existing = await db.execute({
    sql: "SELECT id FROM users WHERE email = ?",
    args: [email],
  });
  if (existing.rows.length > 0) {
    return { error: "이미 가입된 이메일입니다." };
  }

  const passwordHash = await hashPassword(password);
  const result = await db.execute({
    sql: `INSERT INTO users (email, name, password_hash, role, organization, phone)
          VALUES (?, ?, ?, ?, ?, ?) RETURNING *`,
    args: [email, name, passwordHash, role, organization, phone],
  });
  const fresh = rowToUser(result.rows[0] as Record<string, unknown>);
  return { user: await promoteIfAdminEmail(fresh) };
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<CreateResult> {
  const db = await getDb();
  const result = await db.execute({
    sql: "SELECT * FROM users WHERE email = ?",
    args: [email.trim().toLowerCase()],
  });
  if (result.rows.length === 0) {
    return { error: "이메일 또는 비밀번호를 확인해 주세요." };
  }
  const row = result.rows[0] as Record<string, unknown>;
  const ok = await verifyPassword(password, row.password_hash as string);
  if (!ok) return { error: "이메일 또는 비밀번호를 확인해 주세요." };
  const fresh = rowToUser(row);
  return { user: await promoteIfAdminEmail(fresh) };
}

export async function findUserById(id: number): Promise<User | null> {
  const db = await getDb();
  const result = await db.execute({
    sql: "SELECT * FROM users WHERE id = ?",
    args: [id],
  });
  if (result.rows.length === 0) return null;
  return rowToUser(result.rows[0] as Record<string, unknown>);
}

export async function listUsers(): Promise<User[]> {
  const db = await getDb();
  const result = await db.execute(
    "SELECT * FROM users ORDER BY created_at DESC"
  );
  return result.rows.map((r) => rowToUser(r as Record<string, unknown>));
}

function rowToUser(row: Record<string, unknown>): User {
  return {
    id: Number(row.id),
    email: row.email as string,
    name: row.name as string,
    role: row.role as Role,
    organization: (row.organization as string | null) ?? null,
    phone: (row.phone as string | null) ?? null,
    createdAt: row.created_at as string,
  };
}
