import { getDb } from "./db";

export type PromoStatus = "pending" | "approved" | "declined";

export type PromoRequest = {
  id: number;
  userId: number;
  organization: string;
  contact: string | null;
  bannerType: string | null;
  message: string | null;
  status: PromoStatus;
  createdAt: string;
};

export type PromoInput = {
  userId: number;
  organization: string;
  contact?: string;
  bannerType?: string;
  message?: string;
};

export async function createPromoRequest(
  input: PromoInput
): Promise<PromoRequest> {
  const db = await getDb();
  const result = await db.execute({
    sql: `INSERT INTO promo_requests
            (user_id, organization, contact, banner_type, message)
          VALUES (?, ?, ?, ?, ?)
          RETURNING *`,
    args: [
      input.userId,
      input.organization.trim(),
      input.contact?.trim() ?? null,
      input.bannerType?.trim() ?? null,
      input.message?.trim() ?? null,
    ],
  });
  return rowToRequest(result.rows[0] as Record<string, unknown>);
}

export async function listPromoRequests(): Promise<PromoRequest[]> {
  const db = await getDb();
  const result = await db.execute(
    "SELECT * FROM promo_requests ORDER BY created_at DESC"
  );
  return result.rows.map((r) => rowToRequest(r as Record<string, unknown>));
}

function rowToRequest(row: Record<string, unknown>): PromoRequest {
  return {
    id: Number(row.id),
    userId: Number(row.user_id),
    organization: row.organization as string,
    contact: (row.contact as string | null) ?? null,
    bannerType: (row.banner_type as string | null) ?? null,
    message: (row.message as string | null) ?? null,
    status: row.status as PromoStatus,
    createdAt: row.created_at as string,
  };
}
