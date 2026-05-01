"use client";

import { useMemo, useState } from "react";

type Category = "전체" | "추모 페이지" | "부고" | "영상" | "액자" | "일지";

const CATS: Category[] = ["전체", "추모 페이지", "부고", "영상", "액자", "일지"];

type Item = {
  cat: Exclude<Category, "전체">;
  title: string;
  caption: string;
  preview: () => React.ReactElement;
};

const ITEMS: Item[] = [
  {
    cat: "추모 페이지",
    title: "추모 페이지",
    caption: "고인을 기억하는 한 페이지. URL 하나로 평생 보관됩니다.",
    preview: () => (
      <div className="preview preview-page">
        <div className="preview-photo" />
      </div>
    ),
  },
  {
    cat: "부고",
    title: "부고 카드",
    caption: "사진과 짧은 글을 담은 단정한 부고. SMS·카톡으로 전해집니다.",
    preview: () => (
      <div className="preview">
        <div className="preview-card">
          <div className="pc-photo" />
          <div className="pc-line" />
          <div className="pc-line short" />
          <div className="pc-line x-short" />
        </div>
      </div>
    ),
  },
  {
    cat: "영상",
    title: "AI 추모 영상",
    caption: "사진과 일지로 만드는 30초 추모 영상. 직접 다시 만들 수 있어요.",
    preview: () => <div className="preview preview-video" />,
  },
  {
    cat: "액자",
    title: "디지털 액자",
    caption: "하늘공원·집에 두는 액자. 사진과 영상이 차분히 흐릅니다.",
    preview: () => (
      <div className="preview preview-frame">
        <div className="pf-screen" />
      </div>
    ),
  },
  {
    cat: "추모 페이지",
    title: "사진 모음",
    caption: "흩어진 사진을 한곳에 모아 가족과 나누어 봅니다.",
    preview: () => (
      <div className="preview preview-grid">
        <div className="pg-tile" />
        <div className="pg-tile" />
        <div className="pg-tile" />
        <div className="pg-tile" />
        <div className="pg-tile" />
        <div className="pg-tile" />
      </div>
    ),
  },
  {
    cat: "일지",
    title: "남기는 글·일지",
    caption: "오늘의 짧은 글, 가족에게 남기는 한 마디. 차곡차곡 쌓입니다.",
    preview: () => (
      <div className="preview preview-text">
        <div className="pt-h" />
        <div className="pt-line" />
        <div className="pt-line" />
        <div className="pt-line short" />
        <div className="pt-line" />
        <div className="pt-line x-short" />
      </div>
    ),
  },
];

export default function Showcase() {
  const [active, setActive] = useState<Category>("전체");

  const visible = useMemo(
    () => (active === "전체" ? ITEMS : ITEMS.filter((it) => it.cat === active)),
    [active]
  );

  return (
    <section className="section bg-[var(--color-bg-soft)] border-y border-[var(--color-rule)]">
      <div className="container">
        <div className="max-w-2xl mb-10 mx-auto text-center">
          <p className="kicker mb-4">결과물</p>
          <h2 className="display-md">
            이렇게 남길 수 있어요.
          </h2>
          <p className="lead mt-5">
            고인을 기억하는 한 장의 페이지부터, 미리 남기는 다큐멘터리까지.
            천천히, 한 번에 하나씩.
          </p>
        </div>

        <div className="chip-row mb-10" role="tablist" aria-label="결과물 종류">
          {CATS.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active === c}
              data-active={active === c}
              onClick={() => setActive(c)}
              className="chip"
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((it) => (
            <article key={it.title + it.cat} className="card lift !p-5">
              {it.preview()}
              <div className="px-1 pt-2">
                <h3 className="font-semibold text-[1.15rem] tracking-[-0.01em] text-[var(--color-ink)]">
                  {it.title}
                </h3>
                <p className="mt-1.5 text-[14px] text-[var(--color-ink-mute)] leading-[1.6]">
                  {it.caption}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
