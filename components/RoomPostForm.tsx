"use client";

import { useState } from "react";

export default function RoomPostForm({
  code,
  initialName,
}: {
  code: string;
  initialName?: string;
}) {
  const [authorName, setAuthorName] = useState(initialName ?? "");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!authorName.trim()) { setError("이름을 입력해 주세요."); return; }
    if (!content.trim()) { setError("내용을 입력해 주세요."); return; }
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/room/${code}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorName: authorName.trim(), content: content.trim() }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error ?? "등록에 실패했습니다.");
        setSubmitting(false);
        return;
      }
      setContent("");
      window.location.reload();
    } catch {
      setError("네트워크 오류입니다.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="room-post-form">
      <div className="field">
        <label htmlFor="rp-name">이름</label>
        <input
          id="rp-name"
          type="text"
          required
          maxLength={50}
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="홍길동"
        />
      </div>
      <div className="field">
        <label htmlFor="rp-content">내용</label>
        <textarea
          id="rp-content"
          required
          maxLength={500}
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="추모의 말씀을 남겨 주세요."
        />
        <p className="text-[12px] text-[var(--color-ink-mute)] text-right">
          {content.length}/500
        </p>
      </div>
      {error && <p className="text-[13px] text-[#b3493e]">{error}</p>}
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "등록 중…" : "글 남기기"}
      </button>
    </form>
  );
}
