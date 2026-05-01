import { getDb } from "./db";

export type Slide = {
  id: number;
  imagePath: string;
  alt: string | null;
  sortOrder: number;
  createdAt: string;
};

export async function listSlides(): Promise<Slide[]> {
  const db = await getDb();
  const result = await db.execute(
    "SELECT * FROM hero_slides ORDER BY sort_order ASC, id ASC"
  );
  return result.rows.map((r) => rowToSlide(r as Record<string, unknown>));
}

export async function createSlide(input: {
  imagePath: string;
  alt?: string | null;
}): Promise<Slide> {
  const db = await getDb();
  const max = await db.execute(
    "SELECT COALESCE(MAX(sort_order), -1) AS m FROM hero_slides"
  );
  const next = Number((max.rows[0] as Record<string, unknown>).m) + 1;
  const result = await db.execute({
    sql: `INSERT INTO hero_slides (image_path, alt, sort_order)
          VALUES (?, ?, ?) RETURNING *`,
    args: [input.imagePath, input.alt ?? null, next],
  });
  return rowToSlide(result.rows[0] as Record<string, unknown>);
}

export async function deleteSlide(id: number): Promise<Slide | null> {
  const db = await getDb();
  const found = await db.execute({
    sql: "SELECT * FROM hero_slides WHERE id = ?",
    args: [id],
  });
  if (found.rows.length === 0) return null;
  await db.execute({
    sql: "DELETE FROM hero_slides WHERE id = ?",
    args: [id],
  });
  return rowToSlide(found.rows[0] as Record<string, unknown>);
}

export async function updateSlide(
  id: number,
  fields: { alt?: string | null; sortOrder?: number }
): Promise<void> {
  const db = await getDb();
  const sets: string[] = [];
  const args: (string | number | null)[] = [];
  if (fields.alt !== undefined) {
    sets.push("alt = ?");
    args.push(fields.alt);
  }
  if (fields.sortOrder !== undefined) {
    sets.push("sort_order = ?");
    args.push(fields.sortOrder);
  }
  if (sets.length === 0) return;
  args.push(id);
  await db.execute({
    sql: `UPDATE hero_slides SET ${sets.join(", ")} WHERE id = ?`,
    args,
  });
}

export async function reorderSlides(orderedIds: number[]): Promise<void> {
  const db = await getDb();
  await db.batch(
    orderedIds.map((id, idx) => ({
      sql: "UPDATE hero_slides SET sort_order = ? WHERE id = ?",
      args: [idx, id],
    })),
    "write"
  );
}

function rowToSlide(row: Record<string, unknown>): Slide {
  return {
    id: Number(row.id),
    imagePath: row.image_path as string,
    alt: (row.alt as string | null) ?? null,
    sortOrder: Number(row.sort_order),
    createdAt: row.created_at as string,
  };
}
