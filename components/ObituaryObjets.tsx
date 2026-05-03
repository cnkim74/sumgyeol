export type ObjetId =
  | "chrysanthemum"
  | "lotus"
  | "butterfly"
  | "cross"
  | "dove"
  | "star"
  | "candle"
  | "leaf"
  | "moon"
  | "wave"
  | "ribbon"
  | "cloud";

export const OBJETS: { id: ObjetId; name: string }[] = [
  { id: "chrysanthemum", name: "국화" },
  { id: "lotus",         name: "연꽃" },
  { id: "butterfly",     name: "나비" },
  { id: "cross",         name: "십자가" },
  { id: "dove",          name: "비둘기" },
  { id: "star",          name: "별" },
  { id: "candle",        name: "촛불" },
  { id: "leaf",          name: "잎새" },
  { id: "moon",          name: "달" },
  { id: "wave",          name: "파도" },
  { id: "ribbon",        name: "리본" },
  { id: "cloud",         name: "구름" },
];

/* ─── 개별 SVG ─── */

function Chrysanthemum() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

function Lotus() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* 중앙 꽃잎 */}
      <path d="M32 10 C28 18 28 28 32 36 C36 28 36 18 32 10Z" fill="currentColor" opacity="0.7" />
      {/* 좌측 꽃잎 */}
      <path d="M32 18 C24 16 16 20 16 28 C22 30 30 28 32 24Z" fill="currentColor" opacity="0.5" />
      {/* 우측 꽃잎 */}
      <path d="M32 18 C40 16 48 20 48 28 C42 30 34 28 32 24Z" fill="currentColor" opacity="0.5" />
      {/* 외측 좌 */}
      <path d="M20 22 C12 18 8 26 10 34 C16 34 22 30 22 26Z" fill="currentColor" opacity="0.3" />
      {/* 외측 우 */}
      <path d="M44 22 C52 18 56 26 54 34 C48 34 42 30 42 26Z" fill="currentColor" opacity="0.3" />
      {/* 수면 */}
      <path d="M12 40 Q32 36 52 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
      {/* 줄기 */}
      <line x1="32" y1="36" x2="32" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function Butterfly() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
}

function Cross() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="28" y="8" width="8" height="48" rx="4" fill="currentColor" opacity="0.75" />
      <rect x="14" y="20" width="36" height="8" rx="4" fill="currentColor" opacity="0.75" />
      {/* 후광 */}
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="0.8" opacity="0.15" fill="none" strokeDasharray="3 5" />
      <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="0.6" opacity="0.1" fill="none" />
    </svg>
  );
}

function Dove() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* 몸통 */}
      <path d="M22 34 C18 30 18 24 24 22 C28 20 32 22 34 26 C38 24 44 22 48 26 C50 28 48 32 44 32 C40 34 36 32 34 30 C32 34 30 38 26 40 C22 42 18 40 18 36 C18 35 20 34 22 34Z" fill="currentColor" opacity="0.75" />
      {/* 날개 */}
      <path d="M34 26 C38 20 46 16 50 18 C52 20 50 24 46 26 C42 28 38 26 34 26Z" fill="currentColor" opacity="0.5" />
      {/* 머리 */}
      <circle cx="22" cy="28" r="5" fill="currentColor" opacity="0.8" />
      {/* 부리 */}
      <path d="M18 28 L14 27 L15 30Z" fill="currentColor" opacity="0.6" />
      {/* 눈 */}
      <circle cx="20" cy="27" r="1.2" fill="white" opacity="0.9" />
      {/* 올리브 가지 (optional small) */}
      <path d="M26 42 C24 46 28 50 32 48" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" />
      <ellipse cx="31" cy="48" rx="2.5" ry="1.5" fill="currentColor" opacity="0.35" transform="rotate(-20, 31, 48)" />
    </svg>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M32 8 L35.2 22.4 L50 24 L38.5 34.8 L42 50 L32 42 L22 50 L25.5 34.8 L14 24 L28.8 22.4Z"
        fill="currentColor" opacity="0.72" strokeLinejoin="round" />
      {/* 주변 별빛 */}
      <circle cx="14" cy="14" r="2" fill="currentColor" opacity="0.35" />
      <circle cx="50" cy="12" r="2.5" fill="currentColor" opacity="0.28" />
      <circle cx="10" cy="44" r="1.5" fill="currentColor" opacity="0.25" />
      <circle cx="54" cy="40" r="2" fill="currentColor" opacity="0.22" />
      <circle cx="46" cy="54" r="1.2" fill="currentColor" opacity="0.2" />
      {/* 빛줄기 */}
      <line x1="32" y1="2" x2="32" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="56" y1="32" x2="60" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <line x1="4" y1="32" x2="8" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

function Candle() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* 불꽃 */}
      <path d="M32 8 C27 16 23 22 25 30 C26 34 32 37 32 37 C32 37 38 34 39 30 C41 22 37 16 32 8Z"
        fill="currentColor" opacity="0.3" />
      <path d="M32 14 C29.5 20 28.5 25 30 30 C30.8 33 32 34.5 32 34.5 C32 34.5 33.2 33 34 30 C35.5 25 34.5 20 32 14Z"
        fill="currentColor" opacity="0.65" />
      <circle cx="32" cy="30" r="2.5" fill="currentColor" opacity="0.5" />
      {/* 심지 */}
      <line x1="32" y1="37" x2="32" y2="41" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
      {/* 양초 몸통 */}
      <rect x="24" y="41" width="16" height="18" rx="3" fill="currentColor" opacity="0.22" stroke="currentColor" strokeWidth="1.2" />
      {/* 녹아내린 촛농 */}
      <path d="M24 47 Q21 50 21 54 Q21 58 24 58" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.2" fill="none" />
      {/* 발광 효과 */}
      <circle cx="32" cy="28" r="14" stroke="currentColor" strokeWidth="0.6" opacity="0.12" fill="none" />
      <circle cx="32" cy="28" r="20" stroke="currentColor" strokeWidth="0.4" opacity="0.07" fill="none" />
    </svg>
  );
}

function Leaf() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M32 6 C16 22 14 42 32 56 C50 42 48 22 32 6Z" fill="currentColor" opacity="0.2" />
      <path d="M32 6 C32 30 32 48 32 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      {/* 잎맥 좌 */}
      <path d="M32 22 C27 26 22 28 18 30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <path d="M32 32 C27 36 22 38 18 39" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <path d="M32 42 C28 45 25 46 22 47" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      {/* 잎맥 우 */}
      <path d="M32 22 C37 26 42 28 46 30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <path d="M32 32 C37 36 42 38 46 39" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <path d="M32 42 C36 45 39 46 42 47" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

function Moon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* 초승달 */}
      <path d="M40 12 C28 14 20 22 20 32 C20 44 28 52 40 54 C30 54 14 44 14 32 C14 20 26 10 40 12Z"
        fill="currentColor" opacity="0.75" />
      {/* 별들 */}
      <circle cx="46" cy="18" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="50" cy="30" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="44" cy="44" r="2.2" fill="currentColor" opacity="0.35" />
      <circle cx="52" cy="44" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="38" cy="14" r="1" fill="currentColor" opacity="0.4" />
      {/* 작은 별 */}
      <path d="M48 22 L48.8 24.4 L51.2 24.4 L49.4 25.8 L50 28.2 L48 26.8 L46 28.2 L46.6 25.8 L44.8 24.4 L47.2 24.4Z"
        fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function Wave() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 22 Q14 14 22 22 Q30 30 38 22 Q46 14 58 22"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M6 32 Q14 24 22 32 Q30 40 38 32 Q46 24 58 32"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M6 42 Q14 34 22 42 Q30 50 38 42 Q46 34 58 42"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
      {/* 물방울 */}
      <path d="M32 6 C30 10 27 13 27 16 C27 19 29 21 32 21 C35 21 37 19 37 16 C37 13 34 10 32 6Z"
        fill="currentColor" opacity="0.45" />
    </svg>
  );
}

function Ribbon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* 리본 왼쪽 루프 */}
      <path d="M32 26 C28 18 16 14 12 20 C8 26 14 34 24 32 C28 31 30 29 32 26Z"
        fill="currentColor" opacity="0.65" />
      {/* 리본 오른쪽 루프 */}
      <path d="M32 26 C36 18 48 14 52 20 C56 26 50 34 40 32 C36 31 34 29 32 26Z"
        fill="currentColor" opacity="0.65" />
      {/* 중앙 매듭 */}
      <ellipse cx="32" cy="26" rx="5" ry="4" fill="currentColor" opacity="0.85" />
      {/* 리본 꼬리 왼쪽 */}
      <path d="M28 30 C24 36 20 42 16 48 C14 51 12 52 14 54 C16 56 20 52 24 46 C28 40 30 36 32 34Z"
        fill="currentColor" opacity="0.45" />
      {/* 리본 꼬리 오른쪽 */}
      <path d="M36 30 C40 36 44 42 48 48 C50 51 52 52 50 54 C48 56 44 52 40 46 C36 40 34 36 32 34Z"
        fill="currentColor" opacity="0.45" />
    </svg>
  );
}

function Cloud() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* 주구름 */}
      <path d="M14 42 C8 42 6 34 12 32 C10 22 20 16 28 20 C30 14 38 10 44 16 C50 14 58 20 56 28 C60 30 60 38 54 40 C54 42 14 44 14 42Z"
        fill="currentColor" opacity="0.6" />
      {/* 빛줄기 */}
      <line x1="28" y1="48" x2="24" y2="56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <line x1="36" y1="48" x2="34" y2="58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <line x1="44" y1="46" x2="44" y2="56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      {/* 작은 별 */}
      <circle cx="38" cy="28" r="2" fill="white" opacity="0.5" />
      <circle cx="30" cy="32" r="1.5" fill="white" opacity="0.4" />
      <circle cx="46" cy="30" r="1.2" fill="white" opacity="0.35" />
    </svg>
  );
}

const SVG_MAP: Record<ObjetId, React.FC> = {
  chrysanthemum: Chrysanthemum,
  lotus: Lotus,
  butterfly: Butterfly,
  cross: Cross,
  dove: Dove,
  star: Star,
  candle: Candle,
  leaf: Leaf,
  moon: Moon,
  wave: Wave,
  ribbon: Ribbon,
  cloud: Cloud,
};

export function ObjetIcon({ id, size = 64 }: { id: string; size?: number }) {
  const Component = SVG_MAP[(id as ObjetId)] ?? SVG_MAP.chrysanthemum;
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      style={{ display: "block" }}
      aria-hidden="true"
    >
      {/* re-render inside a sized wrapper via foreignObject workaround not needed — just use Component directly */}
      <Component />
    </svg>
  );
}

/* ─── 오브제 선택 피커 (에디터용) ─── */
export function ObjetPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: ObjetId) => void;
}) {
  return (
    <div className="objet-grid">
      {OBJETS.map((o) => {
        const Cmp = SVG_MAP[o.id];
        const selected = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            className={`objet-card${selected ? " selected" : ""}`}
            onClick={() => onChange(o.id)}
            aria-pressed={selected}
            title={o.name}
          >
            <span className="objet-card-icon">
              <svg viewBox="0 0 64 64" width="40" height="40" aria-hidden="true">
                <Cmp />
              </svg>
            </span>
            <span className="objet-card-name">{o.name}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── 작은 디바이더 아이콘 ─── */
export function ObjetSmall({ id }: { id: string }) {
  const Component = SVG_MAP[(id as ObjetId)] ?? SVG_MAP.chrysanthemum;
  return (
    <svg viewBox="0 0 64 64" width="20" height="20" className="obit-divider-icon" aria-hidden="true">
      <Component />
    </svg>
  );
}
