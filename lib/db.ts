import { createClient, type Client } from "@libsql/client";
import path from "node:path";
import fs from "node:fs/promises";

let dbPromise: Promise<Client> | null = null;

async function init(): Promise<Client> {
  let url = process.env.DATABASE_URL;
  let authToken = process.env.DATABASE_AUTH_TOKEN;

  if (!url) {
    const dataDir = path.join(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });
    url = `file:${path.join(dataDir, "sumgyeol.db")}`;
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
    ],
    "write"
  );

  return client;
}

export function getDb(): Promise<Client> {
  if (!dbPromise) dbPromise = init();
  return dbPromise;
}
