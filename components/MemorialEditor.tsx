"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  userId: number;
  initialData?: {
    id: number;
    slug: string;
    deceasedName: string;
    bornDate: string | null;
    diedDate: string | null;
    bio: string | null;
    status: "draft" | "live";
  };
};

export default function MemorialEditor({ userId, initialData }: Props) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [deceasedName, setDeceasedName] = useState(initialData?.deceasedName ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [bornDate, setBornDate] = useState(initialData?.bornDate ?? "");
  const [diedDate, setDiedDate] = useState(initialData?.diedDate ?? "");
  const [bio, setBio] = useState(initialData?.bio ?? "");
  const [status, setStatus] = useState<"draft" | "live">(initialData?.status ?? "draft");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function autoSlug(name: string) {
    return name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9가-힣-]/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const url = isEdit
      ? `/api/memorial/${initialData!.id}`
      : "/api/memorial";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        slug,
        deceasedName,
        bornDate: bornDate || null,
        diedDate: diedDate || null,
        bio: bio || null,
        status,
      }),
    });

    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error ?? "오류가 발생했습니다.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form className="memorial-editor-form" onSubmit={handleSubmit}>
      <div className="me-field">
        <label className="me-label">고인 성함 *</label>
        <input
          className="me-input"
          type="text"
          value={deceasedName}
          onChange={(e) => {
            setDeceasedName(e.target.value);
            if (!isEdit) setSlug(autoSlug(e.target.value));
          }}
          placeholder="홍길동"
          required
        />
      </div>

      <div className="me-field">
        <label className="me-label">
          페이지 주소 *
          <span className="me-label-sub"> — sumgyeol.kr/하늘/</span>
        </label>
        <input
          className="me-input font-mono"
          type="text"
          value={slug}
          onChange={(e) => setSlug(autoSlug(e.target.value))}
          placeholder="hong-gildong"
          required
        />
      </div>

      <div className="me-row">
        <div className="me-field">
          <label className="me-label">출생일</label>
          <input
            className="me-input"
            type="date"
            value={bornDate}
            onChange={(e) => setBornDate(e.target.value)}
          />
        </div>
        <div className="me-field">
          <label className="me-label">별세일</label>
          <input
            className="me-input"
            type="date"
            value={diedDate}
            onChange={(e) => setDiedDate(e.target.value)}
          />
        </div>
      </div>

      <div className="me-field">
        <label className="me-label">기억의 글</label>
        <textarea
          className="me-textarea"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="고인에 대한 기억, 약력, 가족의 말을 적어 주세요…"
          rows={6}
        />
      </div>

      <div className="me-field">
        <label className="me-label">공개 설정</label>
        <div className="me-radio-group">
          <label className="me-radio">
            <input
              type="radio"
              value="draft"
              checked={status === "draft"}
              onChange={() => setStatus("draft")}
            />
            <span>초안 — 나만 볼 수 있음</span>
          </label>
          <label className="me-radio">
            <input
              type="radio"
              value="live"
              checked={status === "live"}
              onChange={() => setStatus("live")}
            />
            <span>공개 — 누구나 방문 가능</span>
          </label>
        </div>
      </div>

      {error && <p className="me-error">{error}</p>}

      <div className="me-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "저장 중…" : isEdit ? "저장" : "하늘공원 만들기"}
        </button>
        <a href="/dashboard" className="btn btn-soft">
          취소
        </a>
      </div>
    </form>
  );
}
