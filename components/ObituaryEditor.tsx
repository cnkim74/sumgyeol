"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ChiefMourner } from "@/lib/obituaries";
import { ObjetPicker, type ObjetId } from "./ObituaryObjets";

type InitialData = {
  id: number;
  slug: string;
  deceasedName: string;
  deceasedTitle: string | null;
  bornDate: string | null;
  diedDate: string;
  diedTime: string | null;
  funeralHome: string;
  funeralAddress: string | null;
  funeralRoom: string | null;
  funeralDate: string | null;
  ceremonyDate: string | null;
  burialPlace: string | null;
  chiefMourners: ChiefMourner[];
  contactName: string | null;
  contactPhone: string | null;
  bankName: string | null;
  bankAccount: string | null;
  bankHolder: string | null;
  extraMessage: string | null;
  memorialSlug: string | null;
  template: string;
  objet: string;
  status: "draft" | "live";
};

const TEMPLATES: { id: string; name: string; subName: string; desc: string; swatch: string; emoji: string }[] = [
  { id: "classic", name: "전통", subName: "Classic", desc: "국화 문양, 차분한 크림",   swatch: "#faf9f5", emoji: "🌸" },
  { id: "modern",  name: "모던", subName: "Modern",  desc: "흰 배경, 굵은 타이포",     swatch: "#ffffff", emoji: "▪️" },
  { id: "nature",  name: "자연", subName: "Nature",  desc: "세이지 그린, 잎사귀",      swatch: "#edf5ed", emoji: "🌿" },
  { id: "heaven",  name: "하늘", subName: "Heaven",  desc: "하늘색 별, 고요한 분위기", swatch: "#eef2fb", emoji: "✨" },
  { id: "warmth",  name: "온기", subName: "Warmth",  desc: "따뜻한 크림, 촛불",        swatch: "#fdf5e3", emoji: "🕯️" },
];

type Props = {
  userId: number;
  initialData?: InitialData;
};

const COMMON_RELATIONS = ["배우자", "장남", "차남", "삼남", "장녀", "차녀", "며느리", "사위"];

export default function ObituaryEditor({ userId, initialData }: Props) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [deceasedName, setDeceasedName] = useState(initialData?.deceasedName ?? "");
  const [deceasedTitle, setDeceasedTitle] = useState(initialData?.deceasedTitle ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [bornDate, setBornDate] = useState(initialData?.bornDate ?? "");
  const [diedDate, setDiedDate] = useState(initialData?.diedDate ?? "");
  const [diedTime, setDiedTime] = useState(initialData?.diedTime ?? "");
  const [funeralHome, setFuneralHome] = useState(initialData?.funeralHome ?? "");
  const [funeralAddress, setFuneralAddress] = useState(initialData?.funeralAddress ?? "");
  const [funeralRoom, setFuneralRoom] = useState(initialData?.funeralRoom ?? "");
  const [funeralDate, setFuneralDate] = useState(initialData?.funeralDate ?? "");
  const [ceremonyDate, setCeremonyDate] = useState(initialData?.ceremonyDate ?? "");
  const [burialPlace, setBurialPlace] = useState(initialData?.burialPlace ?? "");
  const [mourners, setMourners] = useState<ChiefMourner[]>(
    initialData?.chiefMourners ?? [{ relation: "배우자", name: "" }]
  );
  const [contactName, setContactName] = useState(initialData?.contactName ?? "");
  const [contactPhone, setContactPhone] = useState(initialData?.contactPhone ?? "");
  const [bankName, setBankName] = useState(initialData?.bankName ?? "");
  const [bankAccount, setBankAccount] = useState(initialData?.bankAccount ?? "");
  const [bankHolder, setBankHolder] = useState(initialData?.bankHolder ?? "");
  const [extraMessage, setExtraMessage] = useState(initialData?.extraMessage ?? "");
  const [memorialSlug, setMemorialSlug] = useState(initialData?.memorialSlug ?? "");
  const [template, setTemplate] = useState(initialData?.template ?? "classic");
  const [objet, setObjet] = useState<ObjetId>((initialData?.objet ?? "chrysanthemum") as ObjetId);
  const [status, setStatus] = useState<"draft" | "live">(initialData?.status ?? "draft");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function autoSlug(name: string) {
    return name.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9가-힣-]/g, "");
  }

  function addMourner() {
    setMourners((prev) => [...prev, { relation: "", name: "" }]);
  }

  function removeMourner(i: number) {
    setMourners((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateMourner(i: number, field: keyof ChiefMourner, value: string) {
    setMourners((prev) =>
      prev.map((m, idx) => (idx === i ? { ...m, [field]: value } : m))
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const body = {
      userId,
      slug,
      deceasedName,
      deceasedTitle: deceasedTitle || null,
      bornDate: bornDate || null,
      diedDate,
      diedTime: diedTime || null,
      funeralHome,
      funeralAddress: funeralAddress || null,
      funeralRoom: funeralRoom || null,
      funeralDate: funeralDate || null,
      ceremonyDate: ceremonyDate || null,
      burialPlace: burialPlace || null,
      chiefMourners: mourners.filter((m) => m.name.trim()),
      contactName: contactName || null,
      contactPhone: contactPhone || null,
      bankName: bankName || null,
      bankAccount: bankAccount || null,
      bankHolder: bankHolder || null,
      extraMessage: extraMessage || null,
      memorialSlug: memorialSlug || null,
      template,
      objet,
      status,
    };

    const url = isEdit ? `/api/obituary/${initialData!.id}` : "/api/obituary";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error ?? "오류가 발생했습니다.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form className="obit-editor-form" onSubmit={handleSubmit}>

      {/* ── 템플릿 선택 ── */}
      <fieldset className="oe-fieldset">
        <legend className="oe-legend">디자인 템플릿</legend>
        <p className="oe-label-hint" style={{ marginBottom: 14 }}>
          카카오톡·문자로 공유될 부고장의 디자인을 선택하세요.
        </p>
        <div className="obit-tpl-grid">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`obit-tpl-card${template === t.id ? " selected" : ""}`}
              onClick={() => setTemplate(t.id)}
            >
              <div className="obit-tpl-swatch" style={{ background: t.swatch }}>
                <span style={{ fontSize: 28, zIndex: 1, position: "relative" }}>
                  {t.emoji}
                </span>
              </div>
              <div className="obit-tpl-info">
                <p className="obit-tpl-name">
                  {template === t.id && (
                    <span className="obit-tpl-check">
                      <svg viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  )}
                  {t.name}
                </p>
                <p className="obit-tpl-desc">{t.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </fieldset>

      {/* ── 오브제 선택 ── */}
      <fieldset className="oe-fieldset">
        <legend className="oe-legend">장식 오브제</legend>
        <p className="oe-label-hint" style={{ marginBottom: 14 }}>
          부고장 헤더와 구분선에 표시될 장식 아이콘을 선택하세요.
        </p>
        <ObjetPicker value={objet} onChange={setObjet} />
      </fieldset>

      {/* ── 고인 정보 ── */}
      <fieldset className="oe-fieldset">
        <legend className="oe-legend">고인 정보</legend>

        <div className="oe-row">
          <div className="oe-field">
            <label className="oe-label">성함 *</label>
            <input className="oe-input" type="text" value={deceasedName} required
              placeholder="홍길동"
              onChange={(e) => {
                setDeceasedName(e.target.value);
                if (!isEdit) setSlug(autoSlug(e.target.value));
              }} />
          </div>
          <div className="oe-field">
            <label className="oe-label">
              직함·호칭
              <span className="oe-label-hint"> 예) 前 ○○부장</span>
            </label>
            <input className="oe-input" type="text" value={deceasedTitle}
              placeholder="前 ○○기업 부장"
              onChange={(e) => setDeceasedTitle(e.target.value)} />
          </div>
        </div>

        <div className="oe-row">
          <div className="oe-field">
            <label className="oe-label">출생일</label>
            <input className="oe-input" type="date" value={bornDate}
              onChange={(e) => setBornDate(e.target.value)} />
          </div>
          <div className="oe-field">
            <label className="oe-label">별세일 *</label>
            <input className="oe-input" type="date" value={diedDate} required
              onChange={(e) => setDiedDate(e.target.value)} />
          </div>
          <div className="oe-field">
            <label className="oe-label">별세 시각</label>
            <input className="oe-input" type="text" value={diedTime}
              placeholder="오전 03:40"
              onChange={(e) => setDiedTime(e.target.value)} />
          </div>
        </div>

        <div className="oe-field">
          <label className="oe-label">
            부고장 주소 *
            <span className="oe-label-hint"> — sumgyeol.kr/부고/</span>
          </label>
          <input className="oe-input oe-mono" type="text" value={slug} required
            placeholder="hong-gildong"
            onChange={(e) => setSlug(autoSlug(e.target.value))} />
        </div>
      </fieldset>

      {/* ── 장례 정보 ── */}
      <fieldset className="oe-fieldset">
        <legend className="oe-legend">장례 정보</legend>

        <div className="oe-row">
          <div className="oe-field oe-field--2x">
            <label className="oe-label">장례식장 *</label>
            <input className="oe-input" type="text" value={funeralHome} required
              placeholder="서울아산병원 장례식장"
              onChange={(e) => setFuneralHome(e.target.value)} />
          </div>
          <div className="oe-field">
            <label className="oe-label">빈소</label>
            <input className="oe-input" type="text" value={funeralRoom}
              placeholder="제 5호실"
              onChange={(e) => setFuneralRoom(e.target.value)} />
          </div>
        </div>

        <div className="oe-field">
          <label className="oe-label">주소</label>
          <input className="oe-input" type="text" value={funeralAddress}
            placeholder="서울특별시 송파구 올림픽로 43길 88"
            onChange={(e) => setFuneralAddress(e.target.value)} />
        </div>

        <div className="oe-row">
          <div className="oe-field">
            <label className="oe-label">입관 일시</label>
            <input className="oe-input" type="datetime-local" value={funeralDate}
              onChange={(e) => setFuneralDate(e.target.value)} />
          </div>
          <div className="oe-field">
            <label className="oe-label">발인 일시 *</label>
            <input className="oe-input" type="datetime-local" value={ceremonyDate}
              onChange={(e) => setCeremonyDate(e.target.value)} />
          </div>
        </div>

        <div className="oe-field">
          <label className="oe-label">장지</label>
          <input className="oe-input" type="text" value={burialPlace}
            placeholder="경기도 ○○ 공원묘원"
            onChange={(e) => setBurialPlace(e.target.value)} />
        </div>
      </fieldset>

      {/* ── 상주 ── */}
      <fieldset className="oe-fieldset">
        <legend className="oe-legend">상주</legend>

        <div className="oe-mourners">
          {mourners.map((m, i) => (
            <div key={i} className="oe-mourner-row">
              <div className="oe-field" style={{ flex: "0 0 130px" }}>
                <select className="oe-input oe-select"
                  value={m.relation}
                  onChange={(e) => updateMourner(i, "relation", e.target.value)}>
                  <option value="">관계 선택</option>
                  {COMMON_RELATIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                  <option value="custom">직접 입력</option>
                </select>
              </div>
              {m.relation === "custom" ? (
                <div className="oe-field" style={{ flex: "0 0 120px" }}>
                  <input className="oe-input" type="text" placeholder="관계 직접 입력"
                    onChange={(e) => updateMourner(i, "relation", e.target.value)} />
                </div>
              ) : null}
              <div className="oe-field" style={{ flex: 1 }}>
                <input className="oe-input" type="text" placeholder="성함"
                  value={m.name}
                  onChange={(e) => updateMourner(i, "name", e.target.value)} />
              </div>
              {mourners.length > 1 && (
                <button type="button" className="oe-remove-btn"
                  onClick={() => removeMourner(i)}>
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        <button type="button" className="oe-add-btn" onClick={addMourner}>
          + 상주 추가
        </button>
      </fieldset>

      {/* ── 연락처 ── */}
      <fieldset className="oe-fieldset">
        <legend className="oe-legend">연락처</legend>
        <div className="oe-row">
          <div className="oe-field">
            <label className="oe-label">이름</label>
            <input className="oe-input" type="text" value={contactName}
              placeholder="홍길동"
              onChange={(e) => setContactName(e.target.value)} />
          </div>
          <div className="oe-field">
            <label className="oe-label">전화번호</label>
            <input className="oe-input" type="tel" value={contactPhone}
              placeholder="010-0000-0000"
              onChange={(e) => setContactPhone(e.target.value)} />
          </div>
        </div>
      </fieldset>

      {/* ── 부의금 ── */}
      <fieldset className="oe-fieldset">
        <legend className="oe-legend">부의금 계좌 (선택)</legend>
        <div className="oe-row">
          <div className="oe-field" style={{ flex: "0 0 150px" }}>
            <label className="oe-label">은행</label>
            <input className="oe-input" type="text" value={bankName}
              placeholder="국민은행"
              onChange={(e) => setBankName(e.target.value)} />
          </div>
          <div className="oe-field oe-field--2x">
            <label className="oe-label">계좌번호</label>
            <input className="oe-input oe-mono" type="text" value={bankAccount}
              placeholder="000-000-000000"
              onChange={(e) => setBankAccount(e.target.value)} />
          </div>
          <div className="oe-field">
            <label className="oe-label">예금주</label>
            <input className="oe-input" type="text" value={bankHolder}
              placeholder="홍길동"
              onChange={(e) => setBankHolder(e.target.value)} />
          </div>
        </div>
      </fieldset>

      {/* ── 추가 안내 ── */}
      <fieldset className="oe-fieldset">
        <legend className="oe-legend">추가 안내 (선택)</legend>
        <div className="oe-field">
          <label className="oe-label">메시지</label>
          <textarea className="oe-textarea" value={extraMessage} rows={4}
            placeholder="코로나 사정상 조문은 가족 중심으로 진행합니다."
            onChange={(e) => setExtraMessage(e.target.value)} />
        </div>
        <div className="oe-field">
          <label className="oe-label">
            연결할 하늘공원 주소
            <span className="oe-label-hint"> — 하늘공원 페이지의 슬러그</span>
          </label>
          <input className="oe-input oe-mono" type="text" value={memorialSlug}
            placeholder="hong-gildong"
            onChange={(e) => setMemorialSlug(e.target.value)} />
        </div>
      </fieldset>

      {/* ── 공개 설정 ── */}
      <fieldset className="oe-fieldset">
        <legend className="oe-legend">공개 설정</legend>
        <div className="oe-radio-group">
          <label className="oe-radio">
            <input type="radio" value="draft" checked={status === "draft"}
              onChange={() => setStatus("draft")} />
            <span>
              <strong>초안</strong> — 나만 볼 수 있음 (링크 공유 전 검토용)
            </span>
          </label>
          <label className="oe-radio">
            <input type="radio" value="live" checked={status === "live"}
              onChange={() => setStatus("live")} />
            <span>
              <strong>공개</strong> — 링크를 가진 누구나 접속 가능
            </span>
          </label>
        </div>
      </fieldset>

      {error && <p className="oe-error">{error}</p>}

      <div className="oe-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "저장 중…" : isEdit ? "수정 저장" : "부고장 만들기"}
        </button>
        {isEdit && status === "live" && (
          <a
            href={`/부고/${initialData!.slug}`}
            target="_blank"
            className="btn btn-soft"
          >
            공개 페이지 확인 →
          </a>
        )}
        <a href="/dashboard" className="btn btn-soft">취소</a>
      </div>
    </form>
  );
}
