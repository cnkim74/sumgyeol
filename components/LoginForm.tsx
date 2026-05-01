"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      email: fd.get("email"),
      password: fd.get("password"),
    };
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error ?? "로그인 실패");
        setSubmitting(false);
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("네트워크 오류입니다.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card !p-8 !gap-5">
      <div className="field">
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          autoFocus
        />
      </div>
      <div className="field">
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
      </div>
      {error && <p className="text-[14px] text-[#b3493e]">{error}</p>}
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "들어가는 중…" : "로그인"}
      </button>
    </form>
  );
}
