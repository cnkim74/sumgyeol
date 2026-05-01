import Link from "next/link";

export default function Hero() {
  return (
    <section className="dawn-glow">
      <div className="container section grid gap-12 md:grid-cols-[1.15fr_1fr] items-center">
        <div>
          <p className="kicker mb-6">SUMGYEOL · 숨결</p>
          <h1 className="display-lg">
            잘 떠나는 법,<br />
            잘 기억되는 법.
          </h1>
          <p className="lead mt-8 max-w-xl">
            내 마지막 장(章)을 내가 씁니다.<br />
            사진 한 장이면 시작할 수 있어요.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/#사전신청" className="btn btn-primary">
              무료로 영상 한 편 만들어 보기
            </Link>
            <Link href="/#모음" className="btn btn-ghost">
              어떻게 쓰나요
            </Link>
          </div>
          <p className="mt-6 text-[13px] text-[var(--color-ink-mute)] font-sans">
            지금은 사전 신청을 받고 있어요. 정식 출시 전 미리 체험할 수 있도록 안내드립니다.
          </p>
        </div>

        <div className="relative">
          <div className="media-frame video">
            <span className="media-label">PREVIEW · 추모 영상</span>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden md:block">
            <div className="bg-[var(--color-bg)] border border-[var(--color-rule)] rounded-2xl px-5 py-4 shadow-[0_18px_40px_-20px_rgba(31,35,41,0.25)] max-w-[260px]">
              <p className="text-[13px] text-[var(--color-ink-mute)] font-sans">
                사진 3장을 올려 보세요. <br />
                30초 안에 미리보기가 만들어집니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
