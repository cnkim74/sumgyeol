import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/session";
import { getObituariesByUser } from "@/lib/obituaries";
import ObituaryEditor from "@/components/ObituaryEditor";

export const metadata = { title: "부고장 편집" };

export default async function EditObituaryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session.userId) redirect("/login?next=/dashboard");

  const { id } = await params;
  const obituaries = await getObituariesByUser(session.userId!);
  const obit = obituaries.find((o) => o.id === Number(id));
  if (!obit) notFound();

  return (
    <div className="min-h-[calc(100dvh-48px)] bg-[#f7f7f5]">
      <div className="container max-w-2xl py-12">
        <Link
          href="/dashboard"
          className="text-[13px] text-[var(--color-ink-mute)] hover:text-[var(--color-ink)] mb-6 inline-block"
        >
          ← 대시보드
        </Link>
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-[1.8rem] font-bold tracking-tight mb-1">
              부고장 편집
            </h1>
            <p className="text-[15px] text-[var(--color-ink-mute)]">
              고(故) {obit.deceasedName} 님
            </p>
          </div>
          {obit.status === "live" && (
            <Link
              href={`/부고/${obit.slug}`}
              target="_blank"
              className="btn btn-ghost text-[13px] py-2 px-4 shrink-0"
            >
              공개 페이지 →
            </Link>
          )}
        </div>
        <ObituaryEditor
          userId={session.userId!}
          initialData={{
            id: obit.id,
            slug: obit.slug,
            deceasedName: obit.deceasedName,
            deceasedTitle: obit.deceasedTitle,
            bornDate: obit.bornDate,
            diedDate: obit.diedDate,
            diedTime: obit.diedTime,
            funeralHome: obit.funeralHome,
            funeralAddress: obit.funeralAddress,
            funeralRoom: obit.funeralRoom,
            funeralDate: obit.funeralDate,
            ceremonyDate: obit.ceremonyDate,
            burialPlace: obit.burialPlace,
            chiefMourners: obit.chiefMourners,
            contactName: obit.contactName,
            contactPhone: obit.contactPhone,
            bankName: obit.bankName,
            bankAccount: obit.bankAccount,
            bankHolder: obit.bankHolder,
            extraMessage: obit.extraMessage,
            memorialSlug: obit.memorialSlug,
            template: obit.template,
            status: obit.status,
          }}
        />
      </div>
    </div>
  );
}
