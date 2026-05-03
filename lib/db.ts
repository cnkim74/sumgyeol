import { createClient, type Client } from "@libsql/client";
import path from "node:path";
import fs from "node:fs/promises";
import { pathToFileURL } from "node:url";

let dbPromise: Promise<Client> | null = null;

async function init(): Promise<Client> {
  let url = process.env.DATABASE_URL;
  let authToken = process.env.DATABASE_AUTH_TOKEN;

  if (!url) {
    // Vercel 서버리스는 /tmp 외 read-only → /tmp 사용 (인스턴스마다 휘발).
    // 진짜 영속 필요하면 DATABASE_URL=libsql://...turso.io 로 Turso 붙이면 됨.
    const dataDir = process.env.VERCEL
      ? "/tmp"
      : path.join(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });
    url = pathToFileURL(path.join(dataDir, "sumgyeol.db")).href;
    authToken = undefined;
  }

  const client = createClient({ url, authToken });

  await client.batch(
    [
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'member',
        organization TEXT,
        phone TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
      `CREATE TABLE IF NOT EXISTS promo_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        organization TEXT NOT NULL,
        contact TEXT,
        banner_type TEXT,
        message TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )`,
      `CREATE TABLE IF NOT EXISTS hero_slides (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image_path TEXT NOT NULL,
        alt TEXT,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )`,
      `CREATE TABLE IF NOT EXISTS memorial_pages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        deceased_name TEXT NOT NULL,
        born_date TEXT,
        died_date TEXT,
        bio TEXT,
        profile_image TEXT,
        cover_image TEXT,
        status TEXT NOT NULL DEFAULT 'draft',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )`,
      `CREATE TABLE IF NOT EXISTS memorial_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        memorial_id INTEGER NOT NULL,
        author_name TEXT NOT NULL,
        author_email TEXT,
        content TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (memorial_id) REFERENCES memorial_pages(id) ON DELETE CASCADE
      )`,
      `CREATE TABLE IF NOT EXISTS obituaries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        deceased_name TEXT NOT NULL,
        deceased_title TEXT,
        born_date TEXT,
        died_date TEXT NOT NULL,
        died_time TEXT,
        profile_image TEXT,
        funeral_home TEXT NOT NULL,
        funeral_address TEXT,
        funeral_room TEXT,
        funeral_date TEXT,
        ceremony_date TEXT,
        burial_place TEXT,
        chief_mourners TEXT NOT NULL DEFAULT '[]',
        contact_name TEXT,
        contact_phone TEXT,
        bank_name TEXT,
        bank_account TEXT,
        bank_holder TEXT,
        extra_message TEXT,
        memorial_slug TEXT,
        status TEXT NOT NULL DEFAULT 'draft',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )`,
      `CREATE TABLE IF NOT EXISTS memorial_rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        owner_id INTEGER NOT NULL,
        memorial_id INTEGER,
        name TEXT NOT NULL,
        description TEXT,
        join_code TEXT NOT NULL UNIQUE,
        status TEXT NOT NULL DEFAULT 'active',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (memorial_id) REFERENCES memorial_pages(id) ON DELETE SET NULL
      )`,
      `CREATE TABLE IF NOT EXISTS room_posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room_id INTEGER NOT NULL,
        author_id INTEGER,
        author_name TEXT NOT NULL,
        content TEXT NOT NULL,
        image_url TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (room_id) REFERENCES memorial_rooms(id) ON DELETE CASCADE,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
      )`,
    ],
    "write"
  );

  // Users table — new columns (ALTER TABLE idempotent migrations)
  const migrations = [
    "ALTER TABLE users ADD COLUMN auth_provider TEXT NOT NULL DEFAULT 'local'",
    "ALTER TABLE users ADD COLUMN provider_id TEXT",
    "ALTER TABLE users ADD COLUMN avatar_url TEXT",
    "ALTER TABLE obituaries ADD COLUMN template TEXT NOT NULL DEFAULT 'classic'",
    "ALTER TABLE obituaries ADD COLUMN objet TEXT DEFAULT 'chrysanthemum'",
  ];
  for (const sql of migrations) {
    try {
      await client.execute(sql);
    } catch {
      /* column already exists — expected */
    }
  }

  // 기본 슬라이드 시드 — 비어 있을 때만
  const existing = await client.execute("SELECT COUNT(*) as n FROM hero_slides");
  const count = Number((existing.rows[0] as Record<string, unknown>).n);
  if (count === 0) {
    await client.batch(
      [
        {
          sql: "INSERT INTO hero_slides (image_path, alt, sort_order) VALUES (?, ?, ?)",
          args: ["/hero/1.jpg", "고요한 풍경 1", 0],
        },
        {
          sql: "INSERT INTO hero_slides (image_path, alt, sort_order) VALUES (?, ?, ?)",
          args: ["/hero/2.jpg", "고요한 풍경 2", 1],
        },
        {
          sql: "INSERT INTO hero_slides (image_path, alt, sort_order) VALUES (?, ?, ?)",
          args: ["/hero/3.jpg", "고요한 풍경 3", 2],
        },
      ],
      "write"
    );
  }

  return client;
}

export function getDb(): Promise<Client> {
  if (!dbPromise) dbPromise = init();
  return dbPromise;
}
