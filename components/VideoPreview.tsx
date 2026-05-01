import Link from "next/link";

export default function VideoPreview() {
  return (
    <section id="영상미리보기" className="section">
      <div className="container">
        <div className="grid gap-12 md:gap-16 md:grid-cols-[1fr_1.15fr] items-center">
          <div>
            <p className="kicker mb-4">AI 추모 영상</p>
            <h2 className="display-md">
              사진 몇 장이면<br />
              30초 만에 한 편.
            </h2>
            <p className="lead mt-6 max-w-xl">
              흩어진 사진과 짧은 일지를 모아 한 편의 추모 영상으로
              엮어 드려요. 음악·길이를 직접 골라 다시 만들 수 있고,
              부고가 나가는 날 함께 전해집니다.
            </p>
            <ul className="mt-8 flex flex-col gap-2 text-[15px] text-[var(--color-ink-soft)]">
              <li>· 사진 3장이면 미리보기 생성</li>
              <li>· 본인 일지가 있다면 자막으로 어우러짐</li>
              <li>· 본인·가족만 볼 수 있도록 비공개로 보관</li>
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/#사전신청" className="btn btn-primary">
                무료로 영상 한 편 만들어 보기
              </Link>
              <Link href="/#영상" className="text-link">
                다큐멘터리 인터뷰도 보기
              </Link>
            </div>
          </div>

          <div>
            <div className="media-frame video !aspect-[16/10] !rounded-[24px]">
              <span className="media-label">PREVIEW · 추모 영상</span>
            </div>
            <p className="mt-4 text-center text-[13px] text-[var(--color-ink-mute)]">
              사진 3장을 올려 보세요. 30초 안에 미리보기가 만들어집니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
