"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RoomEditor() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name") as string,
      description: (fd.get("description") as string) || undefined,
    };

    try {
      const res = await fetch("/api/room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error ?? "생성에 실패했습니다.");
        setSubmitting(false);
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("네트워크 오류입니다.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card !p-8 !gap-5">
      <div className="field">
        <label htmlFor="name">추모방 이름</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          placeholder="예: 故 홍길동 님을 기억하며"
        />
      </div>
      <div className="field">
        <label htmlFor="description">소개 (선택)</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          maxLength={500}
          placeholder="이 추모방에 대한 소개를 적어 주세요."
        />
      </div>
      {error && <p className="text-[14px] text-[#b3493e]">{error}</p>}
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "만드는 중…" : "추모방 만들기"}
      </button>
    </form>
  );
}
