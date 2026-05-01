"use client";

import { useState } from "react";

const INTEREST_OPTIONS = [
  { value: "모음", label: "모음 — 지금부터 사진·일지·AI 영상으로 쌓기" },
  { value: "다큐멘터리", label: "다큐멘터리 — 인터뷰 영상 미리 남기기" },
  { value: "디지털 액자", label: "디지털 액자 — 하늘공원·집에 두기" },
  { value: "B2B", label: "B2B — 상조회사·장례식장 파트너십" },
];

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export default function WaitlistForm() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [interests, setInterests] = useState<string[]>(["모음"]);

  function toggleInterest(value: string) {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "submitting") return;

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      message: form.get("message"),
      interests,
    };

    setState({ kind: "submitting" });
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setState({ kind: "error", message: json.error ?? "잠시 후 다시 시도해 주세요." });
        return;
      }
      setState({ kind: "success" });
    } catch {
      setState({ kind: "error", message: "네트워크 오류입니다. 다시 시도해 주세요." });
    }
  }

  if (state.kind === "success") {
    return (
      <div className="card text-center !p-10">
        <p className="kicker mb-3">신청 받았습니다</p>
        <h3 className="card-title">고맙습니다.</h3>
        <p className="prose-body !text-[16px] !leading-[1.75] mt-2">
          정식 출시 안내와 함께, 사전 신청자에게는 1년치 모음 구독을 무료로 드립니다.<br />
          확인 메일을 곧 보내 드릴게요.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card !p-8 md:!p-10 !gap-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="field">
          <label htmlFor="name">이름</label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="홍길동" />
        </div>
        <div className="field">
          <label htmlFor="email">이메일</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="phone">연락처 (선택)</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="010-0000-0000" />
      </div>

      <fieldset className="field">
        <legend className="text-[13px] font-semibold tracking-[0.02em] text-[var(--color-ink-soft)] mb-2">
          관심 있는 영역 (복수 선택)
        </legend>
        <div className="grid gap-2">
          {INTEREST_OPTIONS.map((opt) => {
            const checked = interests.includes(opt.value);
            return (
              <label
                key={opt.value}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${
                  checked
                    ? "border-[var(--color-quiet)] bg-[var(--color-bg)]"
                    : "border-[var(--color-rule)] bg-[var(--color-bg)] hover:border-[var(--color-ink-mute)]"
                }`}
              >
                <input
                  type="checkbox"
                  name="interests"
                  value={opt.value}
                  checked={checked}
                  onChange={() => toggleInterest(opt.value)}
                  className="mt-[5px] accent-[var(--color-quiet)]"
                />
                <span className="text-[15px] text-[var(--color-ink-soft)] leading-[1.55]">
                  {opt.label}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="message">하고 싶은 말 (선택)</label>
        <textarea id="message" name="message" rows={3} placeholder="궁금한 점, 바라는 기능 등 무엇이든." />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-2">
        <p className="text-[12px] text-[var(--color-ink-mute)] leading-[1.6]">
          제출하시면 사전 신청 안내 메일을 받는 것에 동의하는 것으로 간주합니다. 다른 용도로 쓰이지 않습니다.
        </p>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={state.kind === "submitting"}
        >
          {state.kind === "submitting" ? "보내는 중…" : "사전 신청 보내기"}
        </button>
      </div>

      {state.kind === "error" ? (
        <p className="text-[14px] text-[#b3493e] font-sans">{state.message}</p>
      ) : null}
    </form>
  );
}
