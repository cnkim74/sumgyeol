"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  apiPath: string;   // e.g. "/api/memorial/3"
  label: string;     // e.g. "하늘공원" or "부고장"
  name: string;      // e.g. "홍길동"
};

export default function DeleteButton({ apiPath, label, name }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);
    setError("");
    const res = await fetch(apiPath, { method: "DELETE" });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "오류가 발생했습니다.");
      return;
    }
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        className="dmr-link dmr-link--danger"
        onClick={() => setOpen(true)}
      >
        삭제
      </button>

      {open && (
        <div className="delete-overlay" onClick={() => !loading && setOpen(false)}>
          <div className="delete-dialog" onClick={(e) => e.stopPropagation()}>
            <p className="delete-dialog-title">
              {label} 삭제
            </p>
            <p className="delete-dialog-body">
              <strong>{name}</strong> {label}을(를) 삭제하면 복구할 수 없습니다.
              정말 삭제하시겠습니까?
            </p>
            {error && <p className="delete-dialog-error">{error}</p>}
            <div className="delete-dialog-actions">
              <button
                type="button"
                className="btn btn-soft"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                취소
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "삭제 중…" : "삭제"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
