"use client";

import Link from "next/link";
import { useEffect, useState, Fragment } from "react";
import HeroMood, { type Mood } from "./HeroMood";
import { ArrowIcon, ArrowLeftIcon } from "./icons";

type Slide = {
  id: string;
  kicker: string;
  title: [string, string];
  titleItalic: 0 | 1;
  lead: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  mood: Mood;
};

const HERO_SLIDES: Slide[] = [
  {
    id: "stars",
    kicker: "SUMGYEOL · 숨결",
    title: ["잘 떠나는 법,", "잘 기억되는 법."],
    titleItalic: 1,
    lead: "내 마지막 장(章)을 내가 씁니다.\n사진 한 장이면 시작할 수 있어요.",
    primary: { label: "영상 한 편 만들어 보기", href: "/#영상미리보기" },
    secondary: { label: "어떻게 쓰나요", href: "/#소개" },
    mood: "stars",
  },
  {
    id: "horizon",
    kicker: "ACT 1 · 모음",
    title: ["살아있는 동안,", "차곡차곡 쌓아갑니다."],
    titleItalic: 1,
    lead: "사진과 일지, 영상과 편지.\n흩어진 시간을 한곳에 모아둡니다.",
    primary: { label: "내 숨결함 만들기", href: "/#사전신청" },
    secondary: { label: "어떻게 쌓이나요", href: "/#모음" },
    mood: "horizon",
  },
  {
    id: "letter",
    kicker: "차별화 · 디지털 유언장",
    title: ["남기는 이야기,", "나만의 마지막 편지."],
    titleItalic: 1,
    lead: "수신인별로 다른 편지,\n약속된 날에 자동으로 전해집니다.",
    primary: { label: "유언장 써보기", href: "/#사전신청" },
    secondary: { label: "예시 보기", href: "/#소개" },
    mood: "letter",
  },
  {
    id: "frame",
    kicker: "ACT 3 · 머무름",
    title: ["떠난 후에도,", "일상 가까이에 머무릅니다."],
    titleItalic: 1,
    lead: "하늘공원의 디지털 액자,\n가족이 이어 쓰는 일지.",
    primary: { label: "추모 페이지 둘러보기", href: "/#소개" },
    secondary: { label: "파트너십", href: "/#소개" },
    mood: "frame",
  },
  {
    id: "cherry",
    kicker: "AI 추모 영상 · 30초",
    title: ["사진 세 장으로,", "한 편의 영상이 됩니다."],
    titleItalic: 1,
    lead: "AI가 음악과 흐름을 얹어 줍니다.\n무료로 한 편 만들어 보세요.",
    primary: { label: "지금 만들어 보기", href: "/#영상미리보기" },
    secondary: { label: "샘플 영상", href: "/#영상미리보기" },
    mood: "cherry",
  },
];

const INTERVAL_MS = 6500;

export type SliderItem = { id?: number; imagePath?: string; alt?: string };

export default function HeroSlider({ slides = [] }: { slides?: SliderItem[] } = {}) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = HERO_SLIDES.length;

  useEffect(() => {
    if (paused) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % total), INTERVAL_MS);
    return () => clearTimeout(t);
  }, [idx, paused, total]);

  const go = (n: number) => setIdx(((n % total) + total) % total);
  const slide = HERO_SLIDES[idx];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="숨결 — 잘 떠나는 법, 잘 기억되는 법"
      style={{
        position: "relative",
        overflow: "hidden",
        height: "min(100vh, 880px)",
        minHeight: 640,
        borderBottom: "1px solid var(--rule)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {HERO_SLIDES.map((s, i) => {
        const dbImage = slides[i]?.imagePath;
        return (
          <div
            key={s.id}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === idx ? 1 : 0,
              transition: "opacity 1.2s ease",
              pointerEvents: i === idx ? "auto" : "none",
            }}
          >
            {dbImage ? (
              <>
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `url(${dbImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to right, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.35) 50%, rgba(10,10,10,0.15) 100%)",
                }} />
              </>
            ) : (
              <HeroMood mood={s.mood} />
            )}
          </div>
        );
      })}

      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent 50%, color-mix(in srgb, var(--bg) 60%, transparent) 100%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{
        position: "relative", height: "100%",
        display: "flex", flexDirection: "column", justifyContent: "center",
        maxWidth: 1100,
      }}>
        <div key={slide.id} style={{ maxWidth: 720 }}>
          <div className="kicker fade-up" style={{ marginBottom: 28, color: slide.mood === "cherry" ? "#d4a5a5" : "var(--ink-3)" }}>
            {slide.kicker}
          </div>
          <h1 className="t-display fade-up d1">
            {slide.title.map((line, i) => (
              <Fragment key={i}>
                {i === slide.titleItalic ? (
                  <span style={{ color: "var(--ink-2)", fontStyle: "italic", fontWeight: 300 }}>{line}</span>
                ) : (
                  line
                )}
                {i < slide.title.length - 1 && <br />}
              </Fragment>
            ))}
          </h1>
          <p className="t-lead fade-up d2" style={{ marginTop: 32, maxWidth: 540, whiteSpace: "pre-line" }}>
            {slide.lead}
          </p>
          <div className="fade-up d3" style={{ marginTop: 44, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="btn btn-primary" href={slide.primary.href}>
              {slide.primary.label} <ArrowIcon />
            </Link>
            <Link className="btn btn-quiet" href={slide.secondary.href}>
              {slide.secondary.label}
            </Link>
          </div>
        </div>
      </div>

      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        padding: "0 var(--gutter) 32px",
        maxWidth: "var(--measure)", margin: "0 auto",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
        }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`슬라이드 ${i + 1}`}
                style={{
                  width: i === idx ? 32 : 18,
                  height: 2,
                  background: i === idx ? "var(--ink)" : "var(--rule-3)",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "all .4s ease",
                  borderRadius: 1,
                }}
              />
            ))}
            <span className="t-meta" style={{ marginLeft: 16, fontFamily: "var(--mono)", color: "var(--ink-3)" }}>
              {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span className="t-meta" style={{ color: "var(--ink-3)" }}>
              {HERO_SLIDES[(idx + 1) % total].kicker}
            </span>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                type="button"
                onClick={() => go(idx - 1)}
                aria-label="이전 슬라이드"
                style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "transparent", border: "1px solid var(--rule-2)",
                  color: "var(--ink-2)", cursor: "pointer",
                  display: "grid", placeItems: "center",
                  transition: "all .15s ease",
                }}
              >
                <ArrowLeftIcon size={14} />
              </button>
              <button
                type="button"
                onClick={() => go(idx + 1)}
                aria-label="다음 슬라이드"
                style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "transparent", border: "1px solid var(--rule-2)",
                  color: "var(--ink-2)", cursor: "pointer",
                  display: "grid", placeItems: "center",
                  transition: "all .15s ease",
                }}
              >
                <ArrowIcon size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
