"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Slide } from "@/lib/slides";

export default function SlideManager({
  initialSlides,
}: {
  initialSlides: Slide[];
}) {
  const router = useRouter();
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    const res = await fetch("/api/admin/slides");
    const json = (await res.json()) as { ok?: boolean; slides?: Slide[] };
    if (json.ok && json.slides) setSlides(json.slides);
    router.refresh();
  }

  async function onUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setUploading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/slides", { method: "POST", body: fd });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error ?? "업로드에 실패했어요.");
      } else {
        e.currentTarget.reset();
        await refresh();
      }
    } catch {
      setError("네트워크 오류");
    } finally {
      setUploading(false);
    }
  }

  async function onDelete(id: number) {
    if (!confirm("이 슬라이드를 삭제할까요?")) return;
    await fetch(`/api/admin/slides/${id}`, { method: "DELETE" });
    await refresh();
  }

  async function move(id: number, dir: -1 | 1) {
    const idx = slides.findIndex((s) => s.id === id);
    const next = idx + dir;
    if (idx < 0 || next < 0 || next >= slides.length) return;
    const reordered = [...slides];
    [reordered[idx], reordered[next]] = [reordered[next], reordered[idx]];
    setSlides(reordered);
    await fetch("/api/admin/slides/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: reordered.map((s) => s.id) }),
    });
    router.refresh();
  }

  async function onAltBlur(id: number, value: string) {
    await fetch(`/api/admin/slides/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alt: value }),
    });
  }

  return (
    <div className="flex flex-col gap-10">
      {/* 업로드 카드 */}
      <form onSubmit={onUpload} className="card !p-6 !gap-4">
        <h3 className="card-title">새 슬라이드 추가</h3>
        <div className="field">
          <label htmlFor="image">이미지 파일 (JPG · PNG · WEBP, 5MB 이하)</label>
          <input id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp" required />
        </div>
        <div className="field">
          <label htmlFor="alt">설명 (대체 텍스트)</label>
          <input id="alt" name="alt" type="text" placeholder="예: 노을이 깔린 들녘" />
        </div>
        {error && <p className="text-[14px] text-[#b3493e]">{error}</p>}
        <button type="submit" className="btn btn-primary self-start" disabled={uploading}>
          {uploading ? "업로드 중…" : "추가"}
        </button>
      </form>

      {/* 슬라이드 목록 */}
      <div>
        <h3 className="text-[1.2rem] font-bold mb-4">현재 슬라이드 ({slides.length})</h3>
        {slides.length === 0 ? (
          <div className="card text-center !p-10 text-[var(--color-ink-mute)]">
            슬라이드가 없습니다. 위에서 추가해 주세요.
          </div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {slides.map((s, idx) => (
              <li key={s.id} className="card !p-5 !gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.imagePath}
                  alt={s.alt ?? ""}
                  className="w-full aspect-[16/9] object-cover rounded-lg border border-[var(--color-rule)]"
                />
                <div className="field !gap-1">
                  <label htmlFor={`alt-${s.id}`} className="text-[12px]">설명</label>
                  <input
                    id={`alt-${s.id}`}
                    type="text"
                    defaultValue={s.alt ?? ""}
                    onBlur={(e) => onAltBlur(s.id, e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] text-[var(--color-ink-mute)]">
                    순서 {idx + 1} · {s.imagePath}
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => move(s.id, -1)}
                      disabled={idx === 0}
                      className="btn btn-soft !py-2 !px-3 !text-[13px] disabled:opacity-40"
                      aria-label="위로"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => move(s.id, 1)}
                      disabled={idx === slides.length - 1}
                      className="btn btn-soft !py-2 !px-3 !text-[13px] disabled:opacity-40"
                      aria-label="아래로"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(s.id)}
                      className="btn btn-ghost !py-2 !px-3 !text-[13px]"
                      style={{ borderColor: "#b3493e", color: "#b3493e" }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
