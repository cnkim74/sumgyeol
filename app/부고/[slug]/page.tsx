import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getObituaryBySlug } from "@/lib/obituaries";
import ObituaryView from "@/components/ObituaryView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const obit = await getObituaryBySlug(slug);
  if (!obit) return { title: "부고 — 숨결" };

  const d = new Date(obit.diedDate);
  const dateStr = `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  const title = `고(故) ${obit.deceasedName} 님 부고`;
  const description = `${dateStr} 별세 · ${obit.funeralHome}${obit.ceremonyDate ? ` · 발인 ${new Date(obit.ceremonyDate).getMonth() + 1}월 ${new Date(obit.ceremonyDate).getDate()}일` : ""}`;

  return {
    title: `${title} — 숨결`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      siteName: "숨결 (Sumgyeol)",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function ObituaryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const obit = await getObituaryBySlug(slug);
  if (!obit || obit.status !== "live") notFound();

  return <ObituaryView obit={obit} />;
}
