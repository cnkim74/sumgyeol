import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { getMemorialsByUser } from "@/lib/memorials";
import MemorialEditor from "@/components/MemorialEditor";

export const metadata = { title: "하늘공원 편집" };

export default async function EditMemorialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session.userId) redirect("/login?next=/dashboard");

  const { id } = await params;
  const memorials = await getMemorialsByUser(session.userId!);
  const memorial = memorials.find((m) => m.id === Number(id));
  if (!memorial) notFound();

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
          {memorial.deceasedName} 님의 하늘공원
        </h1>
        <p className="text-[15px] text-[var(--color-ink-mute)] mb-8">
          내용을 수정하고 저장하세요.{" "}
          {memorial.status === "live" && (
            <Link
              href={`/하늘/${memorial.slug}`}
              className="text-[var(--color-ink)] underline"
              target="_blank"
            >
              공개 페이지 보기 →
            </Link>
          )}
        </p>
        <MemorialEditor
          userId={session.userId!}
          initialData={{
            id: memorial.id,
            slug: memorial.slug,
            deceasedName: memorial.deceasedName,
            bornDate: memorial.bornDate,
            diedDate: memorial.diedDate,
            bio: memorial.bio,
            status: memorial.status,
          }}
        />
      </div>
    </div>
  );
}
