"use client";

import { useState } from "react";

export default function PromoForm({
  defaultOrg = "",
}: {
  defaultOrg?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      organization: fd.get("organization"),
      contact: fd.get("contact"),
      bannerType: fd.get("bannerType"),
      message: fd.get("message"),
    };
    try {
      const res = await fetch("/api/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error ?? "신청에 실패했어요.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("네트워크 오류입니다.");
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="card !p-10 text-center">
        <p className="kicker mb-3">신청 받았습니다</p>
        <h3 className="card-title">고맙습니다.</h3>
        <p className="prose-body !text-[16px] !leading-[1.75] mt-2">
          담당자가 검토 후 영업일 기준 3일 내 연락드립니다.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card !p-8 !gap-5">
      <div className="field">
        <label htmlFor="organization">기관 이름</label>
        <input
          id="organization"
          name="organization"
          type="text"
          required
          defaultValue={defaultOrg}
        />
      </div>
      <div className="field">
        <label htmlFor="contact">담당자 연락처</label>
        <input
          id="contact"
          name="contact"
          type="tel"
          placeholder="010-0000-0000"
        />
      </div>
      <div className="field">
        <label htmlFor="bannerType">배너 유형</label>
        <select id="bannerType" name="bannerType" defaultValue="">
          <option value="">선택해 주세요</option>
          <option value="logo">로고 (소형)</option>
          <option value="image">이미지 (가로 배너)</option>
          <option value="text">텍스트 광고</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">소개 메시지</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="기관 소개, 노출 희망 기간, 기타 요청 사항"
        />
      </div>
      {error && <p className="text-[14px] text-[#b3493e]">{error}</p>}
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "보내는 중…" : "홍보 배너 신청 보내기"}
      </button>
    </form>
  );
}
