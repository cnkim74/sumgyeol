import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import MemorialEditor from "@/components/MemorialEditor";

export const metadata = { title: "하늘공원 만들기" };

export default async function NewMemorialPage() {
  const session = await getSession();
  if (!session.userId) redirect("/login?next=/dashboard/memorial/new");

  return (
    <div className="min-h-[calc(100dvh-48px)] bg-[#f7f7f5]">
      <div className="container max-w-2xl py-12">
        <Link
          href="/dashboard"
          className="text-[13px] text-[var(--color-ink-mute)] hover:text-[var(--color-ink)] mb-6 inline-block"
        >
          ← 대시보드
        </Link>
        <h1 className="text-[1.8rem] font-bold tracking-tight mb-2">
          하늘공원 만들기
        </h1>
        <p className="text-[15px] text-[var(--color-ink-mute)] mb-8">
          소중한 분을 추억하는 온라인 공간을 만듭니다.
        </p>
        <MemorialEditor userId={session.userId!} />
      </div>
    </div>
  );
}
