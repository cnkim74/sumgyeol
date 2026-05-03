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
  return {
    title: `고(故) ${obit.deceasedName} 님 부고 — 숨결`,
    description: `${obit.funeralHome} · ${obit.diedDate} 별세`,
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
