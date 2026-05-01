import { promises as fs } from "node:fs";
import path from "node:path";

export type WaitlistEntry = {
  name: string;
  email: string;
  phone?: string;
  interests: string[];
  message?: string;
  receivedAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "waitlist.jsonl");

// NOTE: 파일 기반은 로컬 개발용. Vercel 배포 시 영속되지 않음 →
// Vercel KV / Postgres / Resend 등으로 교체 예정 (Phase 2).
export async function appendWaitlistEntry(entry: WaitlistEntry): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.appendFile(FILE, JSON.stringify(entry) + "\n", "utf8");
}
