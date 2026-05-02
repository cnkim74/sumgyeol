import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import ObituaryEditor from "@/components/ObituaryEditor";

export const metadata = { title: "부고장 만들기" };

export default async function NewObituaryPage() {
  const session = await getSession();
  if (!session.userId) redirect("/login?next=/dashboard/obituary/new");

  return (
    <div className="min-h-[calc(100dvh-48px)] bg-[#f7f7f5]">
      <div className="container max-w-2xl py-12">
        <Link
          href="/dashboard"
          className="text-[13px] text-[var(--color-ink-mute)] hover:text-[var(--color-ink)] mb-6 inline-block"
        >
          ← 대시보드
        </Link>
        <h1 className="text-[1.8rem] font-bold tracking-tight mb-1">
          부고장 만들기
        </h1>
        <p className="text-[15px] text-[var(--color-ink-mute)] mb-8">
          작성 후 링크를 카카오톡·문자로 바로 공유할 수 있어요.
        </p>
        <ObituaryEditor userId={session.userId!} />
      </div>
    </div>
  );
}
