"use client";

import { useState, useRef } from "react";
import type { Contact } from "@/lib/contacts";

const GROUPS = ["일반", "가족", "친척", "지인", "직장", "종교", "기타"];

type Props = { initial: Contact[] };

export default function ContactBook({ initial }: Props) {
  const [contacts, setContacts] = useState<Contact[]>(initial);
  const [editing, setEditing] = useState<Contact | null>(null);
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [filterGroup, setFilterGroup] = useState("전체");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const importRef = useRef<HTMLInputElement>(null);

  /* 그룹 목록 */
  const groups = ["전체", ...GROUPS];
  const filtered = contacts.filter((c) => {
    const matchGroup = filterGroup === "전체" || c.groupName === filterGroup;
    const q = search.toLowerCase();
    const matchSearch = !q || c.name.includes(q) || (c.phone ?? "").includes(q) || (c.relation ?? "").includes(q);
    return matchGroup && matchSearch;
  });

  /* ─── CRUD ─── */
  async function saveContact(data: Partial<Contact>) {
    setSaving(true);
    setError("");
    const isNew = !data.id;
    const res = await fetch(isNew ? "/api/contacts" : `/api/contacts/${data.id}`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email,
        relation: data.relation,
        groupName: data.groupName,
        memo: data.memo,
      }),
    });
    const json = await res.json();
    setSaving(false);
    if (!res.ok) { setError(json.error ?? "오류가 발생했습니다."); return; }
    if (isNew) {
      setContacts((prev) => [json.contact, ...prev]);
      setAdding(false);
    } else {
      setContacts((prev) => prev.map((c) => c.id === json.contact.id ? json.contact : c));
      setEditing(null);
    }
  }

  async function deleteContact(id: number) {
    if (!confirm("이 연락처를 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
    if (res.ok) setContacts((prev) => prev.filter((c) => c.id !== id));
  }

  /* ─── CSV 내보내기 ─── */
  function exportCSV() {
    const rows = [["이름", "전화번호", "이메일", "관계", "그룹", "메모"]];
    contacts.forEach((c) => rows.push([c.name, c.phone ?? "", c.email ?? "", c.relation ?? "", c.groupName, c.memo ?? ""]));
    const csv = rows.map((r) => r.map((v) => `"${v.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "연락처.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  /* ─── CSV 불러오기 ─── */
  async function importCSV(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    const text = await file.text();
    const lines = text.split("\n").slice(1); // skip header
    let count = 0;
    for (const line of lines) {
      const cols = line.split(",").map((v) => v.trim().replace(/^"|"$/g, "").replace(/""/g, '"'));
      if (!cols[0]) continue;
      await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: cols[0], phone: cols[1], email: cols[2], relation: cols[3], groupName: cols[4] || "일반", memo: cols[5] }),
      });
      count++;
    }
    const res = await fetch("/api/contacts");
    const json = await res.json();
    setContacts(json.contacts ?? []);
    alert(`${count}명 가져오기 완료`);
    if (importRef.current) importRef.current.value = "";
  }

  return (
    <div className="cb-root">
      {/* ── 헤더 툴바 ── */}
      <div className="cb-toolbar">
        <input
          className="cb-search"
          type="search"
          placeholder="이름·전화번호·관계 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="cb-toolbar-right">
          <button type="button" className="btn btn-ghost btn-sm" onClick={exportCSV}>내보내기</button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => importRef.current?.click()}>가져오기</button>
          <input ref={importRef} type="file" accept=".csv" style={{ display: "none" }} onChange={importCSV} />
          <button type="button" className="btn btn-primary btn-sm" onClick={() => { setAdding(true); setEditing(null); }}>
            + 연락처 추가
          </button>
        </div>
      </div>

      {/* ── 그룹 탭 ── */}
      <div className="cb-group-tabs">
        {groups.map((g) => (
          <button key={g} type="button"
            className={`cb-group-tab${filterGroup === g ? " active" : ""}`}
            onClick={() => setFilterGroup(g)}
          >
            {g}
            <span className="cb-group-count">
              {g === "전체" ? contacts.length : contacts.filter((c) => c.groupName === g).length}
            </span>
          </button>
        ))}
      </div>

      {error && <p className="oe-error" style={{ padding: "0 0 12px" }}>{error}</p>}

      {/* ── 추가 폼 ── */}
      {adding && (
        <ContactForm
          onSave={saveContact}
          onCancel={() => setAdding(false)}
          saving={saving}
        />
      )}

      {/* ── 연락처 목록 ── */}
      {filtered.length === 0 ? (
        <div className="cb-empty">
          {search || filterGroup !== "전체" ? "검색 결과가 없습니다." : "아직 연락처가 없습니다. 추가해 보세요."}
        </div>
      ) : (
        <ul className="cb-list">
          {filtered.map((c) => (
            <li key={c.id} className="cb-item">
              {editing?.id === c.id ? (
                <ContactForm
                  initial={c}
                  onSave={saveContact}
                  onCancel={() => setEditing(null)}
                  saving={saving}
                />
              ) : (
                <div className="cb-item-inner">
                  <div className="cb-avatar" aria-hidden="true">{c.name[0]}</div>
                  <div className="cb-info">
                    <span className="cb-name">{c.name}</span>
                    {c.relation && <span className="cb-relation">{c.relation}</span>}
                    {c.phone && <span className="cb-phone"><a href={`tel:${c.phone.replace(/-/g,"")}`}>{c.phone}</a></span>}
                    {c.email && <span className="cb-email">{c.email}</span>}
                    {c.memo && <span className="cb-memo">{c.memo}</span>}
                  </div>
                  <span className="cb-group-badge">{c.groupName}</span>
                  <div className="cb-item-actions">
                    <button type="button" className="cb-btn-icon" title="수정" onClick={() => { setEditing(c); setAdding(false); }}>
                      <PencilIcon />
                    </button>
                    <button type="button" className="cb-btn-icon cb-btn-danger" title="삭제" onClick={() => deleteContact(c.id)}>
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <p className="cb-total">총 {contacts.length}명</p>
    </div>
  );
}

/* ─── 연락처 폼 ─── */
function ContactForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial?: Contact;
  onSave: (data: Partial<Contact>) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [relation, setRelation] = useState(initial?.relation ?? "");
  const [groupName, setGroupName] = useState(initial?.groupName ?? "일반");
  const [memo, setMemo] = useState(initial?.memo ?? "");

  return (
    <div className="cb-form">
      <div className="cb-form-grid">
        <div className="cb-form-field">
          <label className="cb-form-label">이름 *</label>
          <input className="oe-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" required />
        </div>
        <div className="cb-form-field">
          <label className="cb-form-label">전화번호</label>
          <input className="oe-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-0000-0000" type="tel" />
        </div>
        <div className="cb-form-field">
          <label className="cb-form-label">이메일</label>
          <input className="oe-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" type="email" />
        </div>
        <div className="cb-form-field">
          <label className="cb-form-label">관계</label>
          <input className="oe-input" value={relation} onChange={(e) => setRelation(e.target.value)} placeholder="친구, 동료, 친척…" />
        </div>
        <div className="cb-form-field">
          <label className="cb-form-label">그룹</label>
          <select className="oe-input" value={groupName} onChange={(e) => setGroupName(e.target.value)}>
            {GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div className="cb-form-field cb-form-field--full">
          <label className="cb-form-label">메모</label>
          <input className="oe-input" value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="추가 메모" />
        </div>
      </div>
      <div className="cb-form-actions">
        <button type="button" className="btn btn-ghost btn-sm" onClick={onCancel}>취소</button>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          disabled={saving || !name.trim()}
          onClick={() => onSave({ id: initial?.id, name, phone, email, relation, groupName, memo })}
        >
          {saving ? "저장 중…" : initial ? "수정 저장" : "추가"}
        </button>
      </div>
    </div>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" width="15" height="15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 2l3 3L5 14H2v-3L11 2z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" width="15" height="15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="2 4 14 4" />
      <path d="M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10" />
    </svg>
  );
}
