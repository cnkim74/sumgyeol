"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AvatarImage from "./AvatarImage";

export default function ProfileForm({
  initialName,
  initialAvatarUrl,
  initialPhone,
}: {
  initialName: string;
  initialAvatarUrl: string;
  initialPhone: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [phone, setPhone] = useState(initialPhone);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, avatarUrl: avatarUrl || undefined, phone: phone || undefined }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error ?? "저장에 실패했습니다.");
        setSubmitting(false);
        return;
      }
      setSuccess(true);
      router.refresh();
    } catch {
      setError("네트워크 오류입니다.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card !p-8 !gap-5">
      {/* Avatar preview */}
      <div className="flex items-center gap-4">
        <AvatarImage name={name || "?"} avatarUrl={avatarUrl || null} size={64} />
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-[var(--color-ink-soft)]">
            아바타 미리보기
          </p>
          <p className="text-[12px] text-[var(--color-ink-mute)]">
            이미지 URL을 입력하면 표시됩니다.
          </p>
        </div>
      </div>

      <div className="field">
        <label htmlFor="name">이름</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
      </div>

      <div className="field">
        <label htmlFor="avatarUrl">아바타 URL (선택)</label>
        <input
          id="avatarUrl"
          name="avatarUrl"
          type="url"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder="https://example.com/photo.jpg"
        />
      </div>

      <div className="field">
        <label htmlFor="phone">연락처 (선택)</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          placeholder="010-0000-0000"
        />
      </div>

      {error && <p className="text-[14px] text-[#b3493e]">{error}</p>}
      {success && (
        <p className="text-[14px] text-[#2d7a4a]">저장되었습니다.</p>
      )}

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "저장 중…" : "저장하기"}
      </button>
    </form>
  );
}
