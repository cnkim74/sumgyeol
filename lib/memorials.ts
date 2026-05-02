import { getDb } from "./db";

export type MemorialPage = {
  id: number;
  userId: number;
  slug: string;
  deceasedName: string;
  bornDate: string | null;
  diedDate: string | null;
  bio: string | null;
  profileImage: string | null;
  coverImage: string | null;
  status: "draft" | "live";
  createdAt: string;
  updatedAt: string;
};

export type MemorialMessage = {
  id: number;
  memorialId: number;
  authorName: string;
  authorEmail: string | null;
  content: string;
  createdAt: string;
};

export type MemorialInput = {
  userId: number;
  slug: string;
  deceasedName: string;
  bornDate?: string;
  diedDate?: string;
  bio?: string;
  profileImage?: string;
  coverImage?: string;
  status?: "draft" | "live";
};

function rowToMemorial(row: Record<string, unknown>): MemorialPage {
  return {
    id: Number(row.id),
    userId: Number(row.user_id),
    slug: row.slug as string,
    deceasedName: row.deceased_name as string,
    bornDate: (row.born_date as string | null) ?? null,
    diedDate: (row.died_date as string | null) ?? null,
    bio: (row.bio as string | null) ?? null,
    profileImage: (row.profile_image as string | null) ?? null,
    coverImage: (row.cover_image as string | null) ?? null,
    status: (row.status as "draft" | "live") ?? "draft",
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

function rowToMessage(row: Record<string, unknown>): MemorialMessage {
  return {
    id: Number(row.id),
    memorialId: Number(row.memorial_id),
    authorName: row.author_name as string,
    authorEmail: (row.author_email as string | null) ?? null,
    content: row.content as string,
    createdAt: row.created_at as string,
  };
}

export async function createMemorial(
  input: MemorialInput
): Promise<{ memorial: MemorialPage } | { error: string }> {
  const slug = input.slug.trim().toLowerCase().replace(/[^a-z0-9가-힣-]/g, "-");
  if (!slug) return { error: "슬러그를 입력해 주세요." };
  if (!input.deceasedName.trim()) return { error: "고인 성함을 입력해 주세요." };

  const db = await getDb();
  const exists = await db.execute({
    sql: "SELECT id FROM memorial_pages WHERE slug = ?",
    args: [slug],
  });
  if (exists.rows.length > 0) return { error: "이미 사용 중인 주소입니다." };

  const result = await db.execute({
    sql: `INSERT INTO memorial_pages
            (user_id, slug, deceased_name, born_date, died_date, bio, profile_image, cover_image, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          RETURNING *`,
    args: [
      input.userId,
      slug,
      input.deceasedName.trim(),
      input.bornDate ?? null,
      input.diedDate ?? null,
      input.bio ?? null,
      input.profileImage ?? null,
      input.coverImage ?? null,
      input.status ?? "draft",
    ],
  });
  return { memorial: rowToMemorial(result.rows[0] as Record<string, unknown>) };
}

export async function updateMemorial(
  id: number,
  userId: number,
  patch: Partial<Omit<MemorialInput, "userId" | "slug">>
): Promise<{ memorial: MemorialPage } | { error: string }> {
  const db = await getDb();
  await db.execute({
    sql: `UPDATE memorial_pages SET
            deceased_name = COALESCE(?, deceased_name),
            born_date     = COALESCE(?, born_date),
            died_date     = COALESCE(?, died_date),
            bio           = COALESCE(?, bio),
            profile_image = COALESCE(?, profile_image),
            cover_image   = COALESCE(?, cover_image),
            status        = COALESCE(?, status),
            updated_at    = datetime('now')
          WHERE id = ? AND user_id = ?`,
    args: [
      patch.deceasedName ?? null,
      patch.bornDate ?? null,
      patch.diedDate ?? null,
      patch.bio ?? null,
      patch.profileImage ?? null,
      patch.coverImage ?? null,
      patch.status ?? null,
      id,
      userId,
    ],
  });
  const result = await db.execute({
    sql: "SELECT * FROM memorial_pages WHERE id = ?",
    args: [id],
  });
  if (result.rows.length === 0) return { error: "페이지를 찾을 수 없습니다." };
  return { memorial: rowToMemorial(result.rows[0] as Record<string, unknown>) };
}

export async function getMemorialBySlug(
  slug: string
): Promise<MemorialPage | null> {
  const db = await getDb();
  const result = await db.execute({
    sql: "SELECT * FROM memorial_pages WHERE slug = ?",
    args: [slug],
  });
  if (result.rows.length === 0) return null;
  return rowToMemorial(result.rows[0] as Record<string, unknown>);
}

export async function getMemorialsByUser(
  userId: number
): Promise<MemorialPage[]> {
  const db = await getDb();
  const result = await db.execute({
    sql: "SELECT * FROM memorial_pages WHERE user_id = ? ORDER BY created_at DESC",
    args: [userId],
  });
  return result.rows.map((r) => rowToMemorial(r as Record<string, unknown>));
}

export async function listAllMemorials(): Promise<MemorialPage[]> {
  const db = await getDb();
  const result = await db.execute(
    "SELECT * FROM memorial_pages ORDER BY created_at DESC"
  );
  return result.rows.map((r) => rowToMemorial(r as Record<string, unknown>));
}

export async function addMemorialMessage(
  memorialId: number,
  authorName: string,
  content: string,
  authorEmail?: string
): Promise<MemorialMessage> {
  const db = await getDb();
  const result = await db.execute({
    sql: `INSERT INTO memorial_messages (memorial_id, author_name, author_email, content)
          VALUES (?, ?, ?, ?) RETURNING *`,
    args: [memorialId, authorName.trim(), authorEmail ?? null, content.trim()],
  });
  return rowToMessage(result.rows[0] as Record<string, unknown>);
}

export async function getMemorialMessages(
  memorialId: number
): Promise<MemorialMessage[]> {
  const db = await getDb();
  const result = await db.execute({
    sql: "SELECT * FROM memorial_messages WHERE memorial_id = ? ORDER BY created_at DESC",
    args: [memorialId],
  });
  return result.rows.map((r) => rowToMessage(r as Record<string, unknown>));
}
