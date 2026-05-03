import type { Obituary } from "@/lib/obituaries";
import ObituarySharePanel from "./ObituarySharePanel";

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export default function ObituaryView({
  obit,
  isPreview = false,
}: {
  obit: Obituary;
  isPreview?: boolean;
}) {
  const bornYear = obit.bornDate ? new Date(obit.bornDate).getFullYear() : null;
  const diedYear = new Date(obit.diedDate).getFullYear();
  const tpl = obit.template ?? "classic";

  return (
    <div className="obit-root" data-template={tpl}>
      {isPreview && (
        <div style={{
          background: "#fff3cd", color: "#856404", fontSize: 13,
          padding: "10px 20px", textAlign: "center", borderBottom: "1px solid #ffd666",
        }}>
          초안 미리보기 — 본인에게만 보입니다
        </div>
      )}

      {/* 상단 헤더 */}
      <header className="obit-header">
        <div className="obit-chrysanthemum" aria-hidden="true">
          {tpl === "modern"  && <ModernDeco />}
          {tpl === "nature"  && <LeafDeco />}
          {tpl === "heaven"  && <StarDeco />}
          {tpl === "warmth"  && <CandleDeco />}
          {(tpl === "classic" || !["modern","nature","heaven","warmth"].includes(tpl)) && <ChryIcon />}
        </div>
        <p className="obit-kicker">부 고 (訃告)</p>
      </header>

      {/* 고인 정보 */}
      <section className="obit-deceased">
        {obit.profileImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={obit.profileImage} alt={obit.deceasedName} className="obit-portrait" />
        )}
        <div className="obit-name-block">
          <p className="obit-title-text">
            {obit.deceasedTitle ? `${obit.deceasedTitle} ` : ""}
            <span className="obit-name">고(故) {obit.deceasedName}</span>
            {" "}님께서
          </p>
          <p className="obit-died-line">
            {formatDate(obit.diedDate)}
            {obit.diedTime && ` ${obit.diedTime}`}
            {" "}별세하셨습니다.
          </p>
          {bornYear && (
            <p className="obit-years">{bornYear} — {diedYear}</p>
          )}
        </div>
      </section>

      <div className="obit-divider"><span /><ChrySmall /><span /></div>

      {/* 장례 일정 */}
      <section className="obit-section">
        <h2 className="obit-section-title">장례 일정</h2>
        <dl className="obit-info-grid">
          <div className="obit-info-row">
            <dt>장례식장</dt>
            <dd>{obit.funeralHome}</dd>
          </div>
          {obit.funeralAddress && (
            <div className="obit-info-row">
              <dt>주소</dt>
              <dd>
                <a
                  href={`https://map.kakao.com/?q=${encodeURIComponent(obit.funeralAddress)}`}
                  target="_blank" rel="noopener noreferrer" className="obit-map-link"
                >
                  {obit.funeralAddress}
                  <span className="obit-map-badge">지도</span>
                </a>
              </dd>
            </div>
          )}
          {obit.funeralRoom && (
            <div className="obit-info-row"><dt>빈소</dt><dd>{obit.funeralRoom}</dd></div>
          )}
          {obit.funeralDate && (
            <div className="obit-info-row"><dt>입관</dt><dd>{formatDate(obit.funeralDate)}</dd></div>
          )}
          {obit.ceremonyDate && (
            <div className="obit-info-row obit-info-row--accent">
              <dt>발인</dt><dd>{formatDate(obit.ceremonyDate)}</dd>
            </div>
          )}
          {obit.burialPlace && (
            <div className="obit-info-row"><dt>장지</dt><dd>{obit.burialPlace}</dd></div>
          )}
        </dl>
      </section>

      {obit.chiefMourners.length > 0 && (
        <>
          <div className="obit-divider"><span /><ChrySmall /><span /></div>
          <section className="obit-section">
            <h2 className="obit-section-title">상주</h2>
            <ul className="obit-mourners">
              {obit.chiefMourners.map((m, i) => (
                <li key={i} className="obit-mourner">
                  <span className="obit-mourner-relation">{m.relation}</span>
                  <span className="obit-mourner-name">{m.name}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {(obit.contactName || obit.contactPhone) && (
        <>
          <div className="obit-divider"><span /><ChrySmall /><span /></div>
          <section className="obit-section">
            <h2 className="obit-section-title">연락처</h2>
            <p className="obit-contact">
              {obit.contactName && <span className="obit-contact-name">{obit.contactName}</span>}
              {obit.contactPhone && (
                <a href={`tel:${obit.contactPhone.replace(/-/g, "")}`} className="obit-contact-phone">
                  {obit.contactPhone}
                </a>
              )}
            </p>
          </section>
        </>
      )}

      {(obit.bankName || obit.bankAccount) && (
        <>
          <div className="obit-divider"><span /><ChrySmall /><span /></div>
          <section className="obit-section">
            <h2 className="obit-section-title">부의금 계좌</h2>
            <div className="obit-bank">
              <p className="obit-bank-info">
                <span className="obit-bank-name">{obit.bankName}</span>
                <span className="obit-bank-account">{obit.bankAccount}</span>
                {obit.bankHolder && (
                  <span className="obit-bank-holder">예금주: {obit.bankHolder}</span>
                )}
              </p>
            </div>
          </section>
        </>
      )}

      {obit.extraMessage && (
        <>
          <div className="obit-divider"><span /><ChrySmall /><span /></div>
          <section className="obit-section obit-section--message">
            <p className="obit-extra-message">{obit.extraMessage}</p>
          </section>
        </>
      )}

      {obit.memorialSlug && (
        <>
          <div className="obit-divider"><span /><ChrySmall /><span /></div>
          <section className="obit-section obit-section--memorial">
            <a href={`/하늘/${obit.memorialSlug}`} className="obit-memorial-link">
              <span className="obit-memorial-icon">🏞</span>
              <div>
                <p className="obit-memorial-title">온라인 하늘공원 방문하기</p>
                <p className="obit-memorial-desc">
                  {obit.deceasedName} 님의 추모 공간에서 메시지를 남겨 주세요.
                </p>
              </div>
              <span className="obit-memorial-arrow">→</span>
            </a>
          </section>
        </>
      )}

      <div className="obit-divider obit-divider--light"><span /><span /></div>
      <div className="obit-share-wrap">
        <ObituarySharePanel slug={obit.slug} deceasedName={obit.deceasedName} />
      </div>

      <footer className="obit-footer">
        <p>삼가 고인의 명복을 빕니다.</p>
        <p className="obit-footer-brand">숨결 (sumgyeol.kr)</p>
      </footer>
    </div>
  );
}

/* ─── 장식 SVG ─── */

function ChryIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.7" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 32 + 9 * Math.cos(angle), y1 = 32 + 9 * Math.sin(angle);
        const x2 = 32 + 24 * Math.cos(angle), y2 = 32 + 24 * Math.sin(angle);
        const cx1 = 32 + 14 * Math.cos(angle - 0.3), cy1 = 32 + 14 * Math.sin(angle - 0.3);
        const cx2 = 32 + 20 * Math.cos(angle + 0.3), cy2 = 32 + 20 * Math.sin(angle + 0.3);
        return (
          <path key={i}
            d={`M${x1.toFixed(1)},${y1.toFixed(1)} C${cx1.toFixed(1)},${cy1.toFixed(1)} ${cx2.toFixed(1)},${cy2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`}
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            opacity={0.5 + (i % 3) * 0.15} />
        );
      })}
    </svg>
  );
}

function ChrySmall() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="obit-divider-icon">
      <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.5" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        const x1 = 12 + 3.5 * Math.cos(a), y1 = 12 + 3.5 * Math.sin(a);
        const x2 = 12 + 9 * Math.cos(a), y2 = 12 + 9 * Math.sin(a);
        return (
          <line key={i} x1={x1.toFixed(1)} y1={y1.toFixed(1)} x2={x2.toFixed(1)} y2={y2.toFixed(1)}
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
        );
      })}
    </svg>
  );
}

function ModernDeco() {
  return (
    <svg viewBox="0 0 64 40" fill="none">
      <line x1="0" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <line x1="44" y1="20" x2="64" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <text x="32" y="27" textAnchor="middle" fontSize="22" fontWeight="900"
        fill="currentColor" fontFamily="serif" letterSpacing="4" opacity="0.85">訃</text>
    </svg>
  );
}

function LeafDeco() {
  return (
    <svg viewBox="0 0 64 64" fill="none">
      <path d="M32 8 C20 20 16 36 32 52 C48 36 44 20 32 8Z" fill="currentColor" opacity="0.18" />
      <path d="M32 8 C32 30 32 45 32 52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M32 22 C28 26 24 28 20 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      <path d="M32 30 C28 34 24 36 21 37" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      <path d="M32 22 C36 26 40 28 44 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      <path d="M32 30 C36 34 40 36 43 37" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      <path d="M20 14 C14 14 10 20 16 24 C18 18 22 16 20 14Z" fill="currentColor" opacity="0.12" />
      <path d="M44 14 C50 14 54 20 48 24 C46 18 42 16 44 14Z" fill="currentColor" opacity="0.12" />
    </svg>
  );
}

function StarDeco() {
  return (
    <svg viewBox="0 0 64 64" fill="none">
      <path d="M32 10 L34.5 24 L48 26 L37 36 L40 50 L32 42 L24 50 L27 36 L16 26 L29.5 24Z"
        fill="currentColor" opacity="0.22" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <circle cx="14" cy="16" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="50" cy="16" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="10" cy="42" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="54" cy="38" r="1.5" fill="currentColor" opacity="0.25" />
      <path d="M8 50 Q20 44 32 48 Q44 44 56 50"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" fill="none" />
    </svg>
  );
}

function CandleDeco() {
  return (
    <svg viewBox="0 0 64 64" fill="none">
      <path d="M32 6 C28 14 24 18 26 24 C27 28 32 30 32 30 C32 30 37 28 38 24 C40 18 36 14 32 6Z"
        fill="currentColor" opacity="0.25" />
      <path d="M32 14 C30 18 29 21 30 24 C30.5 26 32 27 32 27 C32 27 33.5 26 34 24 C35 21 34 18 32 14Z"
        fill="currentColor" opacity="0.5" />
      <line x1="32" y1="30" x2="32" y2="34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <rect x="26" y="34" width="12" height="22" rx="1.5" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1" />
      <path d="M26 40 Q23 42 23 46 Q23 50 26 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" fill="none" />
      <rect x="22" y="56" width="20" height="3" rx="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="32" cy="20" r="14" stroke="currentColor" strokeWidth="0.5" opacity="0.1" fill="none" strokeDasharray="2 4" />
    </svg>
  );
}
