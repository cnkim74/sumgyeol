import { getDb } from "./db";

export type ChiefMourner = {
  relation: string;
  name: string;
};

export type Obituary = {
  id: number;
  userId: number;
  slug: string;
  deceasedName: string;
  deceasedTitle: string | null;
  bornDate: string | null;
  diedDate: string;
  diedTime: string | null;
  profileImage: string | null;
  funeralHome: string;
  funeralAddress: string | null;
  funeralRoom: string | null;
  funeralDate: string | null;
  ceremonyDate: string | null;
  burialPlace: string | null;
  chiefMourners: ChiefMourner[];
  contactName: string | null;
  contactPhone: string | null;
  bankName: string | null;
  bankAccount: string | null;
  bankHolder: string | null;
  extraMessage: string | null;
  memorialSlug: string | null;
  template: string;
  status: "draft" | "live";
  createdAt: string;
  updatedAt: string;
};

export type ObituaryInput = {
  userId: number;
  slug: string;
  deceasedName: string;
  deceasedTitle?: string;
  bornDate?: string;
  diedDate: string;
  diedTime?: string;
  profileImage?: string;
  funeralHome: string;
  funeralAddress?: string;
  funeralRoom?: string;
  funeralDate?: string;
  ceremonyDate?: string;
  burialPlace?: string;
  chiefMourners?: ChiefMourner[];
  contactName?: string;
  contactPhone?: string;
  bankName?: string;
  bankAccount?: string;
  bankHolder?: string;
  extraMessage?: string;
  memorialSlug?: string;
  template?: string;
  status?: "draft" | "live";
};

function rowToObituary(row: Record<string, unknown>): Obituary {
  let mourners: ChiefMourner[] = [];
  try {
    mourners = JSON.parse((row.chief_mourners as string) || "[]");
  } catch { /* ignore */ }

  return {
    id: Number(row.id),
    userId: Number(row.user_id),
    slug: row.slug as string,
    deceasedName: row.deceased_name as string,
    deceasedTitle: (row.deceased_title as string | null) ?? null,
    bornDate: (row.born_date as string | null) ?? null,
    diedDate: row.died_date as string,
    diedTime: (row.died_time as string | null) ?? null,
    profileImage: (row.profile_image as string | null) ?? null,
    funeralHome: row.funeral_home as string,
    funeralAddress: (row.funeral_address as string | null) ?? null,
    funeralRoom: (row.funeral_room as string | null) ?? null,
    funeralDate: (row.funeral_date as string | null) ?? null,
    ceremonyDate: (row.ceremony_date as string | null) ?? null,
    burialPlace: (row.burial_place as string | null) ?? null,
    chiefMourners: mourners,
    contactName: (row.contact_name as string | null) ?? null,
    contactPhone: (row.contact_phone as string | null) ?? null,
    bankName: (row.bank_name as string | null) ?? null,
    bankAccount: (row.bank_account as string | null) ?? null,
    bankHolder: (row.bank_holder as string | null) ?? null,
    extraMessage: (row.extra_message as string | null) ?? null,
    memorialSlug: (row.memorial_slug as string | null) ?? null,
    template: (row.template as string) ?? "classic",
    status: (row.status as "draft" | "live") ?? "draft",
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export type ObituaryResult =
  | { obituary: Obituary }
  | { error: string };

export async function createObituary(
  input: ObituaryInput
): Promise<ObituaryResult> {
  const slug = input.slug
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9가-힣-]/g, "");
  if (!slug) return { error: "주소(슬러그)를 입력해 주세요." };
  if (!input.deceasedName.trim()) return { error: "고인 성함을 입력해 주세요." };
  if (!input.diedDate) return { error: "별세일을 입력해 주세요." };
  if (!input.funeralHome.trim()) return { error: "장례식장을 입력해 주세요." };

  const db = await getDb();
  const exists = await db.execute({
    sql: "SELECT id FROM obituaries WHERE slug = ?",
    args: [slug],
  });
  if (exists.rows.length > 0) return { error: "이미 사용 중인 주소입니다." };

  const result = await db.execute({
    sql: `INSERT INTO obituaries
            (user_id, slug, deceased_name, deceased_title, born_date, died_date, died_time,
             profile_image, funeral_home, funeral_address, funeral_room, funeral_date,
             ceremony_date, burial_place, chief_mourners, contact_name, contact_phone,
             bank_name, bank_account, bank_holder, extra_message, memorial_slug, template, status)
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
          RETURNING *`,
    args: [
      input.userId,
      slug,
      input.deceasedName.trim(),
      input.deceasedTitle?.trim() || null,
      input.bornDate || null,
      input.diedDate,
      input.diedTime?.trim() || null,
      input.profileImage || null,
      input.funeralHome.trim(),
      input.funeralAddress?.trim() || null,
      input.funeralRoom?.trim() || null,
      input.funeralDate || null,
      input.ceremonyDate || null,
      input.burialPlace?.trim() || null,
      JSON.stringify(input.chiefMourners ?? []),
      input.contactName?.trim() || null,
      input.contactPhone?.trim() || null,
      input.bankName?.trim() || null,
      input.bankAccount?.trim() || null,
      input.bankHolder?.trim() || null,
      input.extraMessage?.trim() || null,
      input.memorialSlug?.trim() || null,
      input.template ?? "classic",
      input.status ?? "draft",
    ],
  });
  return { obituary: rowToObituary(result.rows[0] as Record<string, unknown>) };
}

export async function updateObituary(
  id: number,
  userId: number,
  patch: Partial<Omit<ObituaryInput, "userId" | "slug">>
): Promise<ObituaryResult> {
  const db = await getDb();
  const mouners = patch.chiefMourners
    ? JSON.stringify(patch.chiefMourners)
    : null;

  await db.execute({
    sql: `UPDATE obituaries SET
            deceased_name   = COALESCE(?, deceased_name),
            deceased_title  = COALESCE(?, deceased_title),
            born_date       = COALESCE(?, born_date),
            died_date       = COALESCE(?, died_date),
            died_time       = COALESCE(?, died_time),
            profile_image   = COALESCE(?, profile_image),
            funeral_home    = COALESCE(?, funeral_home),
            funeral_address = COALESCE(?, funeral_address),
            funeral_room    = COALESCE(?, funeral_room),
            funeral_date    = COALESCE(?, funeral_date),
            ceremony_date   = COALESCE(?, ceremony_date),
            burial_place    = COALESCE(?, burial_place),
            chief_mourners  = COALESCE(?, chief_mourners),
            contact_name    = COALESCE(?, contact_name),
            contact_phone   = COALESCE(?, contact_phone),
            bank_name       = COALESCE(?, bank_name),
            bank_account    = COALESCE(?, bank_account),
            bank_holder     = COALESCE(?, bank_holder),
            extra_message   = COALESCE(?, extra_message),
            memorial_slug   = COALESCE(?, memorial_slug),
            template        = COALESCE(?, template),
            status          = COALESCE(?, status),
            updated_at      = datetime('now')
          WHERE id = ? AND user_id = ?`,
    args: [
      patch.deceasedName?.trim() || null,
      patch.deceasedTitle?.trim() || null,
      patch.bornDate || null,
      patch.diedDate || null,
      patch.diedTime?.trim() || null,
      patch.profileImage || null,
      patch.funeralHome?.trim() || null,
      patch.funeralAddress?.trim() || null,
      patch.funeralRoom?.trim() || null,
      patch.funeralDate || null,
      patch.ceremonyDate || null,
      patch.burialPlace?.trim() || null,
      mouners,
      patch.contactName?.trim() || null,
      patch.contactPhone?.trim() || null,
      patch.bankName?.trim() || null,
      patch.bankAccount?.trim() || null,
      patch.bankHolder?.trim() || null,
      patch.extraMessage?.trim() || null,
      patch.memorialSlug?.trim() || null,
      patch.template || null,
      patch.status || null,
      id,
      userId,
    ],
  });
  const result = await db.execute({
    sql: "SELECT * FROM obituaries WHERE id = ?",
    args: [id],
  });
  if (result.rows.length === 0) return { error: "부고장을 찾을 수 없습니다." };
  return { obituary: rowToObituary(result.rows[0] as Record<string, unknown>) };
}

export async function getObituaryBySlug(
  slug: string
): Promise<Obituary | null> {
  const db = await getDb();
  const result = await db.execute({
    sql: "SELECT * FROM obituaries WHERE slug = ?",
    args: [slug],
  });
  if (result.rows.length === 0) return null;
  return rowToObituary(result.rows[0] as Record<string, unknown>);
}

export async function getObituariesByUser(
  userId: number
): Promise<Obituary[]> {
  const db = await getDb();
  const result = await db.execute({
    sql: "SELECT * FROM obituaries WHERE user_id = ? ORDER BY created_at DESC",
    args: [userId],
  });
  return result.rows.map((r) => rowToObituary(r as Record<string, unknown>));
}

export async function listAllObituaries(): Promise<Obituary[]> {
  const db = await getDb();
  const result = await db.execute(
    "SELECT * FROM obituaries ORDER BY created_at DESC"
  );
  return result.rows.map((r) => rowToObituary(r as Record<string, unknown>));
}

export async function deleteObituary(
  id: number,
  userId: number
): Promise<{ ok: boolean } | { error: string }> {
  const db = await getDb();
  const exists = await db.execute({
    sql: "SELECT id FROM obituaries WHERE id = ? AND user_id = ?",
    args: [id, userId],
  });
  if (exists.rows.length === 0) return { error: "부고장을 찾을 수 없습니다." };
  await db.execute({ sql: "DELETE FROM obituaries WHERE id = ? AND user_id = ?", args: [id, userId] });
  return { ok: true };
}
