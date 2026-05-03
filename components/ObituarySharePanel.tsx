"use client";

import { useState } from "react";

type Props = {
  slug: string;
  deceasedName: string;
  funeralHome?: string;
  ceremonyDate?: string | null;
};

function fmtDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export default function ObituarySharePanel({ slug, deceasedName, funeralHome, ceremonyDate }: Props) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/부고/${slug}`
      : `/부고/${slug}`;

  function buildMessage() {
    const lines = [`訃告 — 고(故) ${deceasedName} 님께서 별세하셨습니다.`];
    if (funeralHome) lines.push(`장례식장: ${funeralHome}`);
    if (ceremonyDate) lines.push(`발인: ${fmtDate(ceremonyDate)}`);
    lines.push(`\n${url}`);
    return lines.join("\n");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function shareKakao() {
    if (navigator.share) {
      navigator.share({
        title: `고(故) ${deceasedName} 님 부고`,
        text: buildMessage(),
        url,
      });
      return;
    }
    copyLink();
  }

  function shareSMS() {
    const body = encodeURIComponent(buildMessage());
    const sep = /iphone|ipad/i.test(navigator.userAgent) ? "&" : "?";
    window.location.href = `sms:${sep}body=${body}`;
  }

  return (
    <div className="obit-share">
      <p className="obit-share-label">부고 공유하기</p>
      <div className="obit-share-btns">
        <button type="button" className="obit-share-btn obit-share-kakao" onClick={shareKakao}>
          <KakaoIcon />
          <span>카카오톡</span>
        </button>
        <button type="button" className="obit-share-btn obit-share-sms" onClick={shareSMS}>
          <SmsIcon />
          <span>문자</span>
        </button>
        <button
          type="button"
          className={`obit-share-btn obit-share-copy${copied ? " copied" : ""}`}
          onClick={copyLink}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span>{copied ? "복사됨!" : "링크 복사"}</span>
        </button>
      </div>
      <p className="obit-share-hint">링크를 복사해 카카오톡·문자·이메일로 전달하실 수 있습니다.</p>
    </div>
  );
}

function KakaoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M12 3C6.477 3 2 6.477 2 10.917c0 2.787 1.587 5.24 4.006 6.7-.16.573-.6 2.094-.686 2.42-.108.41.15.404.316.294.13-.086 2.053-1.39 2.887-1.952.47.066.951.1 1.477.1 5.523 0 10-3.477 10-7.562C22 6.477 17.523 3 12 3z" />
    </svg>
  );
}

function SmsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="18" height="18" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
