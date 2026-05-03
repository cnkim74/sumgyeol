import { getDb } from "./db";

export type Contact = {
  id: number;
  userId: number;
  name: string;
  phone: string | null;
  email: string | null;
  relation: string | null;
  groupName: string;
  memo: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ContactInput = {
  name: string;
  phone?: string;
  email?: string;
  relation?: string;
  groupName?: string;
  memo?: string;
};

function rowToContact(row: Record<string, unknown>): Contact {
  return {
    id: Number(row.id),
    userId: Number(row.user_id),
    name: row.name as string,
    phone: (row.phone as string | null) ?? null,
    email: (row.email as string | null) ?? null,
    relation: (row.relation as string | null) ?? null,
    groupName: (row.group_name as string) ?? "일반",
    memo: (row.memo as string | null) ?? null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export async function getContactsByUser(userId: number): Promise<Contact[]> {
  const db = await getDb();
  const result = await db.execute({
    sql: "SELECT * FROM contacts WHERE user_id = ? ORDER BY group_name, name",
    args: [userId],
  });
  return result.rows.map((r) => rowToContact(r as Record<string, unknown>));
}

export async function createContact(
  userId: number,
  input: ContactInput
): Promise<{ contact: Contact } | { error: string }> {
  if (!input.name.trim()) return { error: "이름을 입력해 주세요." };
  const db = await getDb();
  const result = await db.execute({
    sql: `INSERT INTO contacts (user_id, name, phone, email, relation, group_name, memo)
          VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *`,
    args: [
      userId,
      input.name.trim(),
      input.phone?.trim() || null,
      input.email?.trim() || null,
      input.relation?.trim() || null,
      input.groupName?.trim() || "일반",
      input.memo?.trim() || null,
    ],
  });
  return { contact: rowToContact(result.rows[0] as Record<string, unknown>) };
}

export async function updateContact(
  id: number,
  userId: number,
  input: Partial<ContactInput>
): Promise<{ contact: Contact } | { error: string }> {
  const db = await getDb();
  await db.execute({
    sql: `UPDATE contacts SET
            name       = COALESCE(?, name),
            phone      = COALESCE(?, phone),
            email      = COALESCE(?, email),
            relation   = COALESCE(?, relation),
            group_name = COALESCE(?, group_name),
            memo       = COALESCE(?, memo),
            updated_at = datetime('now')
          WHERE id = ? AND user_id = ?`,
    args: [
      input.name?.trim() || null,
      input.phone?.trim() || null,
      input.email?.trim() || null,
      input.relation?.trim() || null,
      input.groupName?.trim() || null,
      input.memo?.trim() || null,
      id,
      userId,
    ],
  });
  const result = await db.execute({
    sql: "SELECT * FROM contacts WHERE id = ? AND user_id = ?",
    args: [id, userId],
  });
  if (result.rows.length === 0) return { error: "연락처를 찾을 수 없습니다." };
  return { contact: rowToContact(result.rows[0] as Record<string, unknown>) };
}

export async function deleteContact(
  id: number,
  userId: number
): Promise<{ ok: boolean } | { error: string }> {
  const db = await getDb();
  const exists = await db.execute({
    sql: "SELECT id FROM contacts WHERE id = ? AND user_id = ?",
    args: [id, userId],
  });
  if (exists.rows.length === 0) return { error: "연락처를 찾을 수 없습니다." };
  await db.execute({
    sql: "DELETE FROM contacts WHERE id = ? AND user_id = ?",
    args: [id, userId],
  });
  return { ok: true };
}
