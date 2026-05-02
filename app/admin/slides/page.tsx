import { listSlides } from "@/lib/slides";
import SlideManager from "@/components/SlideManager";

export const metadata = { title: "홈 슬라이더" };

export default async function AdminSlidesPage() {
  const slides = await listSlides();

  return (
    <div className="notion-page">
      <div className="notion-page-header">
        <span className="notion-page-icon">🖼</span>
        <div>
          <h1 className="notion-page-title">홈 슬라이더</h1>
          <p className="notion-page-desc">
            첫 화면 풀스크린 이미지 추가·삭제·순서 변경.
            현재 {slides.length}장 등록됨.
          </p>
        </div>
      </div>

      <div className="notion-section">
        <SlideManager initialSlides={slides} />
        <p className="mt-6 text-[12px] text-[var(--notion-text-mute)]">
          ⚠ Vercel 서버리스 환경에서는 업로드 파일이 인스턴스마다 휘발됩니다.
          프로덕션 전환 시 Vercel Blob 또는 Turso 객체 저장소로 교체 예정.
        </p>
      </div>
    </div>
  );
}
