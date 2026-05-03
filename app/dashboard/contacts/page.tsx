import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getContactsByUser } from "@/lib/contacts";
import ContactBook from "@/components/ContactBook";

export const metadata = { title: "연락처 — 숨결" };

export default async function ContactsPage() {
  const session = await getSession();
  if (!session.userId) redirect("/login");

  const contacts = await getContactsByUser(session.userId).catch(() => []);

  return (
    <div className="container" style={{ maxWidth: 720, paddingTop: 40, paddingBottom: 80 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 6 }}>
          연락처 관리
        </h1>
        <p style={{ fontSize: 14, color: "var(--color-ink-mute)", lineHeight: 1.6 }}>
          부고장을 보낼 분들의 연락처를 그룹별로 관리하세요. CSV 가져오기·내보내기를 지원합니다.
        </p>
      </div>
      <ContactBook initial={contacts} />
    </div>
  );
}
