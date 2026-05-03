import type { Obituary } from "@/lib/obituaries";
import { ObjetSmall } from "./ObituaryObjets";
import ObituarySharePanel from "./ObituarySharePanel";

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

/* 오브제 → 색상 팔레트 매핑 */
const OBJET_PALETTE: Record<string, { bg: string; headerBg: string; accent: string; rule: string; ink: string; inkMute: string }> = {
  chrysanthemum: { bg: "#faf9f5", headerBg: "linear-gradient(160deg,#f5f0e8 0%,#faf9f5 100%)", accent: "#5a6045", rule: "#e0dbd0", ink: "#2a2820", inkMute: "#7a7060" },
  lotus:         { bg: "#faf7f9", headerBg: "linear-gradient(160deg,#f0e8ef 0%,#faf7f9 100%)", accent: "#8a4a72", rule: "#ddd0da", ink: "#2a1e28", inkMute: "#7a5a70" },
  butterfly:     { bg: "#f8f9fa", headerBg: "linear-gradient(160deg,#e8eef8 0%,#f8f9fa 100%)", accent: "#4a6aaa", rule: "#d0d8e8", ink: "#1e2838", inkMute: "#5a6a8a" },
  cross:         { bg: "#f8f8f6", headerBg: "linear-gradient(160deg,#eeeae0 0%,#f8f8f6 100%)", accent: "#6a5a3a", rule: "#ddd8cc", ink: "#28221a", inkMute: "#7a6a50" },
  dove:          { bg: "#f7f9fa", headerBg: "linear-gradient(160deg,#e4ecf4 0%,#f7f9fa 100%)", accent: "#3a608a", rule: "#ccd8e8", ink: "#1a2c3e", inkMute: "#4a6888" },
  star:          { bg: "#f8f7fb", headerBg: "linear-gradient(160deg,#e8e0f4 0%,#f8f7fb 100%)", accent: "#6a4aaa", rule: "#d8d0ea", ink: "#221838", inkMute: "#6a5888" },
  candle:        { bg: "#fdf8f2", headerBg: "linear-gradient(160deg,#f4e8d0 0%,#fdf8f2 100%)", accent: "#9a6020", rule: "#e4d4b8", ink: "#382010", inkMute: "#8a6040" },
  leaf:          { bg: "#f6faf5", headerBg: "linear-gradient(160deg,#dceede 0%,#f6faf5 100%)", accent: "#2e6840", rule: "#c4dcca", ink: "#182a1e", inkMute: "#4a7856" },
  moon:          { bg: "#f6f8fb", headerBg: "linear-gradient(160deg,#dce4f0 0%,#f6f8fb 100%)", accent: "#3a507a", rule: "#c8d4e8", ink: "#18243a", inkMute: "#4a5a78" },
  wave:          { bg: "#f4f9fb", headerBg: "linear-gradient(160deg,#d8ecf4 0%,#f4f9fb 100%)", accent: "#2a6888", rule: "#bcd8e8", ink: "#102838", inkMute: "#3a6880" },
  ribbon:        { bg: "#faf8fc", headerBg: "linear-gradient(160deg,#eedef8 0%,#faf8fc 100%)", accent: "#7a3a98", rule: "#dcc8ec", ink: "#281830", inkMute: "#7a4a90" },
  cloud:         { bg: "#f6f8fa", headerBg: "linear-gradient(160deg,#dee8f4 0%,#f6f8fa 100%)", accent: "#4a6880", rule: "#c8d8e8", ink: "#1c2c3c", inkMute: "#4a6070" },
};

function getPalette(objet: string) {
  return OBJET_PALETTE[objet] ?? OBJET_PALETTE.chrysanthemum;
}

/* 오브제 대형 SVG (헤더용) */
function ObjetHero({ id }: { id: string }) {
  return (
    <div className="obit-objet-hero" aria-hidden="true">
      <ObituaryObjetLarge id={id} />
    </div>
  );
}

/* 오브제 SVG 직접 인라인 (서버 컴포넌트에서 import 가능하도록) */
function ObituaryObjetLarge({ id }: { id: string }) {
  switch (id) {
    case "lotus":
      return (
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M32 10 C28 18 28 28 32 36 C36 28 36 18 32 10Z" fill="currentColor" opacity="0.7" />
          <path d="M32 18 C24 16 16 20 16 28 C22 30 30 28 32 24Z" fill="currentColor" opacity="0.5" />
          <path d="M32 18 C40 16 48 20 48 28 C42 30 34 28 32 24Z" fill="currentColor" opacity="0.5" />
          <path d="M20 22 C12 18 8 26 10 34 C16 34 22 30 22 26Z" fill="currentColor" opacity="0.3" />
          <path d="M44 22 C52 18 56 26 54 34 C48 34 42 30 42 26Z" fill="currentColor" opacity="0.3" />
          <path d="M12 40 Q32 36 52 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
          <line x1="32" y1="36" x2="32" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        </svg>
      );
    case "butterfly":
      return (
        <svg viewBox="0 0 64 64" fill="none">
          <g transform="rotate(-8, 32, 34)">
            <path d="M32 26 C20 8 4 14 6 26 C9 35 22 32 32 29Z" fill="currentColor" />
            <path d="M32 26 C44 10 56 16 54 26 C51 34 42 32 32 29Z" fill="currentColor" opacity="0.88" />
            <path d="M32 31 C24 35 13 43 16 50 C19 54 27 50 32 31Z" fill="currentColor" opacity="0.5" />
            <path d="M32 31 C40 35 51 43 48 50 C45 54 37 50 32 31Z" fill="currentColor" opacity="0.42" />
            <ellipse cx="32" cy="33" rx="2" ry="7.5" fill="currentColor" />
            <path d="M30.8 23 C27 18 22 15 19 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.6" />
            <circle cx="19" cy="13" r="1.8" fill="currentColor" opacity="0.6" />
            <path d="M33.2 23 C37 18 42 15 45 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.6" />
            <circle cx="45" cy="13" r="1.8" fill="currentColor" opacity="0.6" />
          </g>
        </svg>
      );
    case "cross":
      return (
        <svg viewBox="0 0 64 64" fill="none">
          <rect x="28" y="8" width="8" height="48" rx="4" fill="currentColor" opacity="0.75" />
          <rect x="14" y="20" width="36" height="8" rx="4" fill="currentColor" opacity="0.75" />
          <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="0.8" opacity="0.15" fill="none" strokeDasharray="3 5" />
        </svg>
      );
    case "dove":
      return (
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M22 34 C18 30 18 24 24 22 C28 20 32 22 34 26 C38 24 44 22 48 26 C50 28 48 32 44 32 C40 34 36 32 34 30 C32 34 30 38 26 40 C22 42 18 40 18 36 C18 35 20 34 22 34Z" fill="currentColor" opacity="0.75" />
          <path d="M34 26 C38 20 46 16 50 18 C52 20 50 24 46 26 C42 28 38 26 34 26Z" fill="currentColor" opacity="0.5" />
          <circle cx="22" cy="28" r="5" fill="currentColor" opacity="0.8" />
          <path d="M18 28 L14 27 L15 30Z" fill="currentColor" opacity="0.6" />
          <circle cx="20" cy="27" r="1.2" fill="white" opacity="0.9" />
          <path d="M26 42 C24 46 28 50 32 48" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" />
          <ellipse cx="31" cy="48" rx="2.5" ry="1.5" fill="currentColor" opacity="0.35" transform="rotate(-20, 31, 48)" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M32 8 L35.2 22.4 L50 24 L38.5 34.8 L42 50 L32 42 L22 50 L25.5 34.8 L14 24 L28.8 22.4Z" fill="currentColor" opacity="0.72" strokeLinejoin="round" />
          <circle cx="14" cy="14" r="2" fill="currentColor" opacity="0.35" />
          <circle cx="50" cy="12" r="2.5" fill="currentColor" opacity="0.28" />
          <circle cx="10" cy="44" r="1.5" fill="currentColor" opacity="0.25" />
          <circle cx="54" cy="40" r="2" fill="currentColor" opacity="0.22" />
        </svg>
      );
    case "candle":
      return (
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M32 8 C27 16 23 22 25 30 C26 34 32 37 32 37 C32 37 38 34 39 30 C41 22 37 16 32 8Z" fill="currentColor" opacity="0.3" />
          <path d="M32 14 C29.5 20 28.5 25 30 30 C30.8 33 32 34.5 32 34.5 C32 34.5 33.2 33 34 30 C35.5 25 34.5 20 32 14Z" fill="currentColor" opacity="0.65" />
          <line x1="32" y1="37" x2="32" y2="41" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
          <rect x="24" y="41" width="16" height="18" rx="3" fill="currentColor" opacity="0.22" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="32" cy="28" r="14" stroke="currentColor" strokeWidth="0.6" opacity="0.12" fill="none" />
        </svg>
      );
    case "leaf":
      return (
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M32 6 C16 22 14 42 32 56 C50 42 48 22 32 6Z" fill="currentColor" opacity="0.2" />
          <path d="M32 6 C32 30 32 48 32 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
          <path d="M32 22 C27 26 22 28 18 30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
          <path d="M32 32 C27 36 22 38 18 39" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
          <path d="M32 22 C37 26 42 28 46 30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
          <path d="M32 32 C37 36 42 38 46 39" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        </svg>
      );
    case "moon":
      return (
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M40 12 C28 14 20 22 20 32 C20 44 28 52 40 54 C30 54 14 44 14 32 C14 20 26 10 40 12Z" fill="currentColor" opacity="0.75" />
          <circle cx="46" cy="18" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="50" cy="30" r="1.5" fill="currentColor" opacity="0.4" />
          <circle cx="44" cy="44" r="2.2" fill="currentColor" opacity="0.35" />
        </svg>
      );
    case "wave":
      return (
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M6 22 Q14 14 22 22 Q30 30 38 22 Q46 14 58 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M6 32 Q14 24 22 32 Q30 40 38 32 Q46 24 58 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
          <path d="M6 42 Q14 34 22 42 Q30 50 38 42 Q46 34 58 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
          <path d="M32 6 C30 10 27 13 27 16 C27 19 29 21 32 21 C35 21 37 19 37 16 C37 13 34 10 32 6Z" fill="currentColor" opacity="0.45" />
        </svg>
      );
    case "ribbon":
      return (
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M32 26 C28 18 16 14 12 20 C8 26 14 34 24 32 C28 31 30 29 32 26Z" fill="currentColor" opacity="0.65" />
          <path d="M32 26 C36 18 48 14 52 20 C56 26 50 34 40 32 C36 31 34 29 32 26Z" fill="currentColor" opacity="0.65" />
          <ellipse cx="32" cy="26" rx="5" ry="4" fill="currentColor" opacity="0.85" />
          <path d="M28 30 C24 36 20 42 16 48 C14 51 12 52 14 54 C16 56 20 52 24 46 C28 40 30 36 32 34Z" fill="currentColor" opacity="0.45" />
          <path d="M36 30 C40 36 44 42 48 48 C50 51 52 52 50 54 C48 56 44 52 40 46 C36 40 34 36 32 34Z" fill="currentColor" opacity="0.45" />
        </svg>
      );
    case "cloud":
      return (
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M14 42 C8 42 6 34 12 32 C10 22 20 16 28 20 C30 14 38 10 44 16 C50 14 58 20 56 28 C60 30 60 38 54 40 C54 42 14 44 14 42Z" fill="currentColor" opacity="0.6" />
          <line x1="28" y1="48" x2="24" y2="56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
          <line x1="36" y1="48" x2="34" y2="58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
          <line x1="44" y1="46" x2="44" y2="56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
          <circle cx="38" cy="28" r="2" fill="white" opacity="0.5" />
          <circle cx="30" cy="32" r="1.5" fill="white" opacity="0.4" />
        </svg>
      );
    default: /* chrysanthemum */
      return (
        <svg viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="5.5" fill="currentColor" opacity="0.7" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            const x1 = 32 + 8 * Math.cos(a), y1 = 32 + 8 * Math.sin(a);
            const x2 = 32 + 25 * Math.cos(a), y2 = 32 + 25 * Math.sin(a);
            const cx1 = 32 + 14 * Math.cos(a - 0.28), cy1 = 32 + 14 * Math.sin(a - 0.28);
            const cx2 = 32 + 20 * Math.cos(a + 0.28), cy2 = 32 + 20 * Math.sin(a + 0.28);
            return (
              <path key={i}
                d={`M${x1.toFixed(1)},${y1.toFixed(1)} C${cx1.toFixed(1)},${cy1.toFixed(1)} ${cx2.toFixed(1)},${cy2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`}
                stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"
                opacity={0.5 + (i % 3) * 0.15} />
            );
          })}
        </svg>
      );
  }
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
  const pal = getPalette(obit.objet ?? "chrysanthemum");

  return (
    <div
      className="obit-root"
      data-template={obit.template ?? "classic"}
      style={{
        "--obit-bg": pal.bg,
        "--obit-header-bg": pal.headerBg,
        "--obit-accent": pal.accent,
        "--obit-rule": pal.rule,
        "--obit-ink": pal.ink,
        "--obit-ink-mute": pal.inkMute,
      } as React.CSSProperties}
    >
      {isPreview && (
        <div className="obit-preview-banner">
          초안 미리보기 — 본인에게만 보입니다
        </div>
      )}

      {/* ── 헤더 ── */}
      <header className="obit-header">
        <div className="obit-objet-wrap" aria-hidden="true">
          <ObituaryObjetLarge id={obit.objet ?? "chrysanthemum"} />
        </div>
        <p className="obit-kicker">부 고 (訃告)</p>
      </header>

      {/* ── 고인 정보 ── */}
      <section className="obit-deceased">
        {obit.profileImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={obit.profileImage} alt={obit.deceasedName} className="obit-portrait" />
        )}
        <div className="obit-name-block">
          <p className="obit-title-text">
            {obit.deceasedTitle ? `${obit.deceasedTitle} ` : ""}
            <strong className="obit-name">고(故) {obit.deceasedName}</strong>
            {" "}님께서
          </p>
          <p className="obit-died-line">
            {formatDate(obit.diedDate)}
            {obit.diedTime && ` ${obit.diedTime}`}{" "}
            별세하셨습니다.
          </p>
          {bornYear && (
            <p className="obit-years">{bornYear} — {diedYear}</p>
          )}
        </div>
      </section>

      <Divider objet={obit.objet} />

      {/* ── 장례 일정 ── */}
      <section className="obit-section">
        <h2 className="obit-section-title">장례 일정</h2>
        <dl className="obit-info-grid">
          <InfoRow label="장례식장" value={obit.funeralHome} />
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
          {obit.funeralRoom && <InfoRow label="빈소" value={obit.funeralRoom} />}
          {obit.funeralDate && <InfoRow label="입관" value={formatDate(obit.funeralDate)} />}
          {obit.ceremonyDate && <InfoRow label="발인" value={formatDate(obit.ceremonyDate)} accent />}
          {obit.burialPlace && <InfoRow label="장지" value={obit.burialPlace} />}
        </dl>
      </section>

      {obit.chiefMourners.length > 0 && (
        <>
          <Divider objet={obit.objet} />
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
          <Divider objet={obit.objet} />
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
          <Divider objet={obit.objet} />
          <section className="obit-section">
            <h2 className="obit-section-title">부의금 계좌</h2>
            <div className="obit-bank">
              <p className="obit-bank-info">
                {obit.bankName && <span className="obit-bank-name">{obit.bankName}</span>}
                {obit.bankAccount && <span className="obit-bank-account">{obit.bankAccount}</span>}
                {obit.bankHolder && <span className="obit-bank-holder">예금주 {obit.bankHolder}</span>}
              </p>
            </div>
          </section>
        </>
      )}

      {obit.extraMessage && (
        <>
          <Divider objet={obit.objet} />
          <section className="obit-section obit-section--message">
            <p className="obit-extra-message">{obit.extraMessage}</p>
          </section>
        </>
      )}

      {obit.memorialSlug && (
        <>
          <Divider objet={obit.objet} />
          <section className="obit-section obit-section--memorial">
            <a href={`/하늘/${obit.memorialSlug}`} className="obit-memorial-link">
              <span className="obit-memorial-icon" aria-hidden="true">🏞</span>
              <div>
                <p className="obit-memorial-title">온라인 하늘공원 방문하기</p>
                <p className="obit-memorial-desc">{obit.deceasedName} 님의 추모 공간에서 메시지를 남겨 주세요.</p>
              </div>
              <span className="obit-memorial-arrow" aria-hidden="true">→</span>
            </a>
          </section>
        </>
      )}

      {/* ── 공유 ── */}
      <div className="obit-share-wrap">
        <ObituarySharePanel
          slug={obit.slug}
          deceasedName={obit.deceasedName}
          funeralHome={obit.funeralHome}
          ceremonyDate={obit.ceremonyDate}
        />
      </div>

      <footer className="obit-footer">
        <div className="obit-footer-objet" aria-hidden="true">
          <ObjetSmall id={obit.objet ?? "chrysanthemum"} />
        </div>
        <p className="obit-footer-pray">삼가 고인의 명복을 빕니다.</p>
        <p className="obit-footer-brand">숨결 · Sumgyeol</p>
      </footer>
    </div>
  );
}

function Divider({ objet }: { objet: string }) {
  return (
    <div className="obit-divider" aria-hidden="true">
      <span />
      <ObjetSmall id={objet ?? "chrysanthemum"} />
      <span />
    </div>
  );
}

function InfoRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`obit-info-row${accent ? " obit-info-row--accent" : ""}`}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
