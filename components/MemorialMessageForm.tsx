"use client";

import { useState } from "react";

export default function MemorialMessageForm({
  memorialId,
}: {
  memorialId: number;
}) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/memorial/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memorialId, authorName: name, content }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "오류가 발생했습니다.");
      } else {
        setDone(true);
        setName("");
        setContent("");
        // 페이지 새로고침으로 목록 반영
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="memorial-form-done">
        추모의 말이 등록되었습니다. 감사합니다.
      </div>
    );
  }

  return (
    <form className="memorial-form" onSubmit={handleSubmit}>
      <input
        className="memorial-form-input"
        type="text"
        placeholder="성함"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        maxLength={40}
      />
      <textarea
        className="memorial-form-textarea"
        placeholder="추모의 말을 남겨 주세요…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        rows={3}
        maxLength={500}
      />
      {error && <p className="memorial-form-error">{error}</p>}
      <button
        type="submit"
        className="btn btn-primary memorial-form-btn"
        disabled={submitting}
      >
        {submitting ? "등록 중…" : "추모의 말 남기기"}
      </button>
    </form>
  );
}
