import { randomBytes } from "node:crypto";
import { getDb } from "./db";

export type MemorialRoom = {
  id: number;
  ownerId: number;
  memorialId: number | null;
  name: string;
  description: string | null;
  joinCode: string;
  status: string;
  createdAt: string;
};

export type RoomPost = {
  id: number;
  roomId: number;
  authorId: number | null;
  authorName: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
};

function rowToRoom(row: Record<string, unknown>): MemorialRoom {
  return {
    id: Number(row.id),
    ownerId: Number(row.owner_id),
    memorialId: row.memorial_id != null ? Number(row.memorial_id) : null,
    name: row.name as string,
    description: (row.description as string | null) ?? null,
    joinCode: row.join_code as string,
    status: row.status as string,
    createdAt: row.created_at as string,
  };
}

function rowToPost(row: Record<string, unknown>): RoomPost {
  return {
    id: Number(row.id),
    roomId: Number(row.room_id),
    authorId: row.author_id != null ? Number(row.author_id) : null,
    authorName: row.author_name as string,
    content: row.content as string,
    imageUrl: (row.image_url as string | null) ?? null,
    createdAt: row.created_at as string,
  };
}

export async function createRoom(
  ownerId: number,
  name: string,
  description?: string,
  memorialId?: number
): Promise<MemorialRoom> {
  const db = await getDb();
  const joinCode = randomBytes(4).toString("hex");
  const result = await db.execute({
    sql: `INSERT INTO memorial_rooms (owner_id, name, description, join_code, memorial_id)
          VALUES (?, ?, ?, ?, ?) RETURNING *`,
    args: [ownerId, name, description ?? null, joinCode, memorialId ?? null],
  });
  return rowToRoom(result.rows[0] as Record<string, unknown>);
}

export async function getRoomByCode(code: string): Promise<MemorialRoom | null> {
  const db = await getDb();
  const result = await db.execute({
    sql: "SELECT * FROM memorial_rooms WHERE join_code = ?",
    args: [code],
  });
  if (result.rows.length === 0) return null;
  return rowToRoom(result.rows[0] as Record<string, unknown>);
}

export async function getRoomsByOwner(ownerId: number): Promise<MemorialRoom[]> {
  const db = await getDb();
  const result = await db.execute({
    sql: "SELECT * FROM memorial_rooms WHERE owner_id = ? ORDER BY created_at DESC",
    args: [ownerId],
  });
  return result.rows.map((r) => rowToRoom(r as Record<string, unknown>));
}

export async function listAllRooms(): Promise<MemorialRoom[]> {
  const db = await getDb();
  const result = await db.execute(
    "SELECT * FROM memorial_rooms ORDER BY created_at DESC"
  );
  return result.rows.map((r) => rowToRoom(r as Record<string, unknown>));
}

export async function addRoomPost(
  roomId: number,
  authorName: string,
  content: string,
  authorId?: number,
  imageUrl?: string
): Promise<RoomPost> {
  const db = await getDb();
  const result = await db.execute({
    sql: `INSERT INTO room_posts (room_id, author_name, content, author_id, image_url)
          VALUES (?, ?, ?, ?, ?) RETURNING *`,
    args: [roomId, authorName, content, authorId ?? null, imageUrl ?? null],
  });
  return rowToPost(result.rows[0] as Record<string, unknown>);
}

export async function getRoomPosts(roomId: number): Promise<RoomPost[]> {
  const db = await getDb();
  const result = await db.execute({
    sql: "SELECT * FROM room_posts WHERE room_id = ? ORDER BY created_at DESC",
    args: [roomId],
  });
  return result.rows.map((r) => rowToPost(r as Record<string, unknown>));
}
