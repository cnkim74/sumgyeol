"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// NOTE: src 가 비어 있으면 bg(CSS 그라디언트)로 대체.
// 실제 사진 들어가면 src 채우고 bg 지우면 됨.
const SLIDES: { src?: string; alt: string; bg?: string }[] = [
  {
    alt: "따뜻한 노을이 깔린 지평선",
    bg:
      "radial-gradient(140% 80% at 78% 22%, rgba(255, 198, 132, 0.78) 0%, transparent 58%)," +
      "radial-gradient(100% 60% at 24% 100%, rgba(170, 80, 36, 0.70) 0%, transparent 70%)," +
      "linear-gradient(135deg, #281708 0%, #6B3A1C 48%, #C68352 100%)",
  },
  {
    alt: "고요한 새벽 하늘",
    bg:
      "radial-gradient(120% 70% at 50% 5%, rgba(208, 192, 210, 0.65) 0%, transparent 60%)," +
      "radial-gradient(80% 60% at 80% 80%, rgba(120, 96, 130, 0.55) 0%, transparent 70%)," +
      "linear-gradient(160deg, #18141F 0%, #3D3548 55%, #8A7AA0 100%)",
  },
  {
    alt: "은은한 들풀",
    bg:
      "radial-gradient(120% 70% at 70% 30%, rgba(228, 216, 178, 0.60) 0%, transparent 65%)," +
      "radial-gradient(80% 50% at 20% 90%, rgba(70, 84, 64, 0.55) 0%, transparent 70%)," +
      "linear-gradient(135deg, #1E2420 0%, #4B5947 50%, #B5B89A 100%)",
  },
];

const INTERVAL_MS = 6500;

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="hero-slider"
      aria-roledescription="carousel"
      aria-label="숨결 — 잘 떠나는 법, 잘 기억되는 법"
    >
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="hero-slide"
          data-active={i === active}
          aria-hidden={i !== active}
          role="img"
          aria-label={s.alt}
          style={
            s.src
              ? { backgroundImage: `url(${s.src})` }
              : { background: s.bg }
          }
        />
      ))}

      <div className="hero-overlay" />

      <div className="hero-text">
        <p className="hero-eyebrow">SUMGYEOL · 숨결</p>
        <h1 className="hero-headline">
          잘 떠나는 법,<br />
          잘 기억되는 법.
        </h1>
        <p className="hero-sub">
          내 마지막 장(章)을 내가 씁니다.
          <br className="hidden sm:block" />
          사진 한 장이면 시작할 수 있어요.
        </p>
        <div className="hero-cta-row">
          <Link href="/#사전신청" className="btn btn-light">
            사전 신청
          </Link>
          <Link href="/#영상미리보기" className="text-link text-link-light">
            어떻게 쓰나요
          </Link>
        </div>
      </div>

      <div className="hero-dots" role="tablist" aria-label="슬라이드 선택">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`슬라이드 ${i + 1}`}
            data-active={i === active}
            className="hero-dot"
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  );
}
