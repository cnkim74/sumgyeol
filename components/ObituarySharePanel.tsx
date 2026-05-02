"use client";

import { useState } from "react";

type Props = {
  slug: string;
  deceasedName: string;
};

export default function ObituarySharePanel({ slug, deceasedName }: Props) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/부고/${slug}`
      : `/부고/${slug}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function shareKakao() {
    // Web Share API (iOS Safari, Android Chrome 지원)
    if (navigator.share) {
      navigator.share({
        title: `고(故) ${deceasedName} 님 부고`,
        text: `고(故) ${deceasedName} 님의 부고를 전해드립니다.`,
        url,
      });
      return;
    }
    // fallback: 링크 복사
    copyLink();
  }

  function shareSMS() {
    const text = encodeURIComponent(
      `고(故) ${deceasedName} 님 부고\n${url}`
    );
    window.location.href = `sms:?body=${text}`;
  }

  return (
    <div className="obit-share">
      <p className="obit-share-label">부고 공유하기</p>
      <div className="obit-share-btns">
        <button
          type="button"
          className="obit-share-btn obit-share-kakao"
          onClick={shareKakao}
        >
          <KakaoIcon />
          <span>카카오톡</span>
        </button>
        <button
          type="button"
          className="obit-share-btn obit-share-sms"
          onClick={shareSMS}
        >
          <SmsIcon />
          <span>문자</span>
        </button>
        <button
          type="button"
          className={`obit-share-btn obit-share-copy${copied ? " copied" : ""}`}
          onClick={copyLink}
        >
          <CopyIcon />
          <span>{copied ? "복사됨!" : "링크 복사"}</span>
        </button>
      </div>
    </div>
  );
}

function KakaoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
      <path d="M12 3C6.477 3 2 6.477 2 10.917c0 2.787 1.587 5.24 4.006 6.7-.16.573-.6 2.094-.686 2.42-.108.41.15.404.316.294.13-.086 2.053-1.39 2.887-1.952.47.066.951.1 1.477.1 5.523 0 10-3.477 10-7.562C22 6.477 17.523 3 12 3z" />
    </svg>
  );
}

function SmsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
