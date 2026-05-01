import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/session";
import { findUserById } from "@/lib/users";
import { PROMO_ELIGIBLE_ROLES, ROLE_LABELS } from "@/lib/roles";
import PromoForm from "@/components/PromoForm";

export const metadata = { title: "홍보 배너 신청" };

export default async function PromoPage() {
  const session = await getSession();
  if (!session.userId || !session.role) {
    redirect("/login?next=/promo");
  }
  if (!PROMO_ELIGIBLE_ROLES.includes(session.role)) {
    notFound();
  }
  const user = await findUserById(session.userId);
  return (
    <section className="section">
      <div className="container max-w-2xl">
        <p className="kicker mb-3">{ROLE_LABELS[session.role]} 전용</p>
        <h1 className="display-md mb-3">홍보 배너 신청</h1>
        <p className="lead mb-10">
          숨결 페이지에 기관 홍보 배너 노출을 신청하실 수 있어요.
          담당자가 검토 후 따로 연락드립니다.
        </p>
        <PromoForm defaultOrg={user?.organization ?? ""} />
      </div>
    </section>
  );
}
