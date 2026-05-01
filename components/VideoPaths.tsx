import Link from "next/link";

export default function VideoPaths() {
  return (
    <section id="영상" className="section">
      <div className="container">
        <div className="max-w-2xl mb-14">
          <p className="kicker mb-4">영상 — 두 갈래</p>
          <h2 className="display-md">
            사진 몇 장이면 충분합니다.<br />
            깊이 남기고 싶다면, 사람이 직접 찾아갑니다.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* AI 자동 영상 */}
          <article className="card !gap-5">
            <div className="media-frame video !aspect-[16/10]">
              <span className="media-label">AI 추모 영상 · 미리보기</span>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="card-title">AI가 엮어 드리는 추모 영상</h3>
              <span className="text-[13px] font-sans text-[var(--color-ink-mute)]">구독 포함</span>
            </div>
            <p className="prose-body !text-[16px] !leading-[1.75]">
              사진과 일지를 모아 한 편의 짧은 영상으로 바로 만들어 드립니다.
              직접 골라 다시 만들 수 있고, 부고가 나가는 날 함께 전해집니다.
            </p>
            <Link href="/#사전신청" className="btn btn-soft self-start">
              30초 안에 만들어 보기
            </Link>
          </article>

          {/* 다큐멘터리 인터뷰 */}
          <article className="card !gap-5">
            <div className="media-frame !aspect-[16/10]">
              <span className="media-label">다큐멘터리 · 인터뷰</span>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="card-title">미리 남기는 다큐멘터리</h3>
              <span className="text-[13px] font-sans text-[var(--color-ink-mute)]">신청·맞춤 견적</span>
            </div>
            <p className="prose-body !text-[16px] !leading-[1.75]">
              지역의 영상 작가가 직접 찾아와 인터뷰를 합니다.
              평생 한 번뿐인 기록입니다. AI로는 만들 수 없는 목소리와 표정이 남습니다.
            </p>
            <Link href="/#사전신청" className="btn btn-ghost self-start">
              다큐 신청 안내 받기
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
