import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { getObituariesByUser } from "@/lib/obituaries";
import ObituaryView from "@/components/ObituaryView";

export const metadata = { title: "부고장 미리보기" };

export default async function PreviewObituaryPage({
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
    <div>
      {/* 미리보기 툴바 */}
      <div style={{
        background: "#1a1a1a", color: "#fff", fontSize: 13,
        padding: "10px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ opacity: 0.5 }}>미리보기</span>
          <span style={{
            background: obit.status === "live" ? "#22c55e" : "#f59e0b",
            color: "#000", fontSize: 11, fontWeight: 700,
            padding: "2px 8px", borderRadius: 999,
          }}>
            {obit.status === "live" ? "공개" : "초안"}
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link href={`/dashboard/obituary/${id}`}
            style={{
              background: "#fff", color: "#000", fontSize: 12, fontWeight: 600,
              padding: "6px 14px", borderRadius: 6, textDecoration: "none",
            }}>
            편집하기
          </Link>
          {obit.status === "live" && (
            <Link href={`/부고/${obit.slug}`} target="_blank"
              style={{
                background: "#3b82f6", color: "#fff", fontSize: 12, fontWeight: 600,
                padding: "6px 14px", borderRadius: 6, textDecoration: "none",
              }}>
              공개 링크 →
            </Link>
          )}
        </div>
      </div>

      <ObituaryView obit={obit} isPreview />
    </div>
  );
}
