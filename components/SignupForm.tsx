"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ROLE_LABELS,
  SIGNUP_ROLES,
  ORG_REQUIRED_ROLES,
  type Role,
} from "@/lib/roles";
import OAuthButtons from "./OAuthButtons";

const ROLE_DESCRIPTIONS: Record<Role, string> = {
  member: "내 숨결을 모으고, 가족에게 남기는 분",
  funeral: "장례식장 운영자 — 부고 발송·B2B 연계",
  park: "하늘공원·추모공원 운영자 — 디지털 액자·연계",
  admin: "",
};

export default function SignupForm() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("member");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const orgRequired = ORG_REQUIRED_ROLES.includes(role);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      password: fd.get("password"),
      role,
      organization: fd.get("organization") ?? "",
      phone: fd.get("phone") ?? "",
    };
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error ?? "가입에 실패했어요.");
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
    <div className="flex flex-col gap-5">
      <OAuthButtons next="/dashboard" />
    <form onSubmit={onSubmit} className="card !p-8 !gap-5">
      <fieldset className="field">
        <legend className="text-[13px] font-semibold tracking-[0.02em] text-[var(--color-ink-soft)] mb-2">
          회원 등급
        </legend>
        <div className="grid gap-2">
          {SIGNUP_ROLES.map((r) => {
            const checked = role === r;
            return (
              <label
                key={r}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${
                  checked
                    ? "border-[var(--color-ink)] bg-[var(--color-bg)]"
                    : "border-[var(--color-rule)] bg-[var(--color-paper)] hover:border-[var(--color-ink-mute)]"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={checked}
                  onChange={() => setRole(r)}
                  className="mt-[5px] accent-[var(--color-ink)]"
                />
                <span className="flex-1">
                  <span className="block font-semibold text-[15px] text-[var(--color-ink)]">
                    {ROLE_LABELS[r]}
                  </span>
                  <span className="block text-[13px] text-[var(--color-ink-mute)] leading-[1.5]">
                    {ROLE_DESCRIPTIONS[r]}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="name">이름</label>
        <input id="name" name="name" type="text" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="email">이메일</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="password">비밀번호 (8자 이상)</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </div>
      {orgRequired && (
        <div className="field">
          <label htmlFor="organization">
            {role === "funeral" ? "장례식장 이름" : "하늘공원 이름"}
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            required
            placeholder={role === "funeral" ? "○○장례식장" : "○○하늘공원"}
          />
        </div>
      )}
      <div className="field">
        <label htmlFor="phone">연락처 (선택)</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="010-0000-0000"
        />
      </div>

      {error && <p className="text-[14px] text-[#b3493e]">{error}</p>}

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "가입 중…" : "가입하기"}
      </button>
    </form>
    </div>
  );
}
