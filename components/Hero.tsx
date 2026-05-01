import Link from "next/link";
import Logomark from "./Logomark";

export default function Hero() {
  return (
    <section className="pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="container max-w-4xl text-center">
        <div className="flex justify-center mb-7 text-[var(--color-ink)]">
          <Logomark size={44} />
        </div>
        <h1 className="display-lg">
          잘 떠나는 법,<br />
          잘 기억되는 법.
        </h1>
        <p className="lead mt-7 max-w-2xl mx-auto">
          내 마지막 장(章)을 내가 씁니다.<br className="hidden sm:block" />
          사진 한 장이면 시작할 수 있어요.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link href="/#사전신청" className="btn btn-primary">
            무료로 영상 한 편 만들어 보기
          </Link>
          <Link href="/#모음" className="text-link ml-2">
            어떻게 쓰나요
          </Link>
        </div>
      </div>

      <div className="container max-w-6xl mt-16 md:mt-20">
        <div className="media-frame video !aspect-[16/9] !rounded-[28px]">
          <span className="media-label">PREVIEW · 추모 영상</span>
        </div>
        <p className="mt-5 text-center text-[13px] text-[var(--color-ink-mute)]">
          사진 3장을 올려 보세요. 30초 안에 한 편의 미리보기가 만들어집니다.
        </p>
      </div>
    </section>
  );
}
