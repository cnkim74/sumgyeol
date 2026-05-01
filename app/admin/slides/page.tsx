import { notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { listSlides } from "@/lib/slides";
import SlideManager from "@/components/SlideManager";

export const metadata = { title: "슬라이드 관리" };

export default async function AdminSlidesPage() {
  const session = await getSession();
  if (session.role !== "admin") notFound();

  const slides = await listSlides();

  return (
    <section className="section">
      <div className="container max-w-4xl">
        <p className="kicker mb-3">관리</p>
        <h1 className="display-md mb-3">홈 슬라이더 관리</h1>
        <p className="lead mb-10">
          첫 화면에 노출되는 풀스크린 이미지 3장(이상)을 관리합니다.
          위에서 새 이미지를 올리고, 아래 목록에서 순서를 바꾸거나 삭제할 수 있어요.
        </p>
        <SlideManager initialSlides={slides} />
        <p className="mt-10 text-[13px] text-[var(--color-ink-mute)]">
          ⚠ Vercel 같은 서버리스 환경에서는 파일이 영속되지 않습니다.
          프로덕션은 Vercel Blob 또는 Turso 객체 저장소로 교체 예정.
          관련 — <Link href="/admin" className="text-link">관리 메인</Link>
        </p>
      </div>
    </section>
  );
}
