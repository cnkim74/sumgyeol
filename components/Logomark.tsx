type Props = {
  size?: number;
  className?: string;
  title?: string;
};

/**
 * 숨결 로고마크 — 나비 (나비 = 영혼·천국·기쁨 상징)
 * 상단 두 날개(크고 진함) + 하단 두 날개(작고 옅음) + 몸체 + 더듬이
 */
export default function Logomark({
  size = 28,
  className,
  title = "숨결",
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
    >
      {/* 상단 왼쪽 날개 */}
      <path
        d="M16 13 C10 7 5 9 6 13 C7 17 12 16 16 15Z"
        fill="currentColor"
      />
      {/* 상단 오른쪽 날개 */}
      <path
        d="M16 13 C22 7 27 9 26 13 C25 17 20 16 16 15Z"
        fill="currentColor"
      />
      {/* 하단 왼쪽 날개 */}
      <path
        d="M16 16 C13 17 8 21 9 25 C10 28 14 26 16 16Z"
        fill="currentColor"
        opacity="0.5"
      />
      {/* 하단 오른쪽 날개 */}
      <path
        d="M16 16 C19 17 24 21 23 25 C22 28 18 26 16 16Z"
        fill="currentColor"
        opacity="0.5"
      />
      {/* 몸체 */}
      <ellipse cx="16" cy="16.5" rx="1.3" ry="5.5" fill="currentColor" />
      {/* 더듬이 왼쪽 */}
      <path
        d="M15.5 11.5 C14 9 12 7 10.5 6"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      <circle cx="10.5" cy="6" r="1.1" fill="currentColor" opacity="0.55" />
      {/* 더듬이 오른쪽 */}
      <path
        d="M16.5 11.5 C18 9 20 7 21.5 6"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      <circle cx="21.5" cy="6" r="1.1" fill="currentColor" opacity="0.55" />
    </svg>
  );
}
