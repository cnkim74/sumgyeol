type Props = {
  size?: number;
  className?: string;
  title?: string;
};

export default function Logomark({
  size = 28,
  className,
  title = "숨결",
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
    >
      <g transform="rotate(-8, 20, 22)">
        {/* 상단 왼쪽 날개 — 크게 */}
        <path d="M20 16 C12 4 2 9 4 16 C6 22 14 20 20 18Z" fill="currentColor" />
        {/* 상단 오른쪽 날개 — 살짝 작게 (비대칭) */}
        <path d="M20 16 C27 6 35 10 34 16 C32 21 26 20 20 18Z" fill="currentColor" opacity="0.9" />
        {/* 하단 왼쪽 날개 */}
        <path d="M20 19 C15 22 8 27 10 31 C12 34 17 31 20 19Z" fill="currentColor" opacity="0.5" />
        {/* 하단 오른쪽 날개 */}
        <path d="M20 19 C25 22 31 26 29 30 C27 33 23 31 20 19Z" fill="currentColor" opacity="0.4" />
        {/* 몸체 */}
        <ellipse cx="20" cy="21" rx="1.4" ry="5.5" fill="currentColor" />
        {/* 더듬이 왼쪽 */}
        <path d="M19.2 14.5 C17 11.5 14 9.5 12 8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.6" />
        <circle cx="12" cy="8" r="1.3" fill="currentColor" opacity="0.6" />
        {/* 더듬이 오른쪽 */}
        <path d="M20.8 14.5 C23 11.5 26 9.5 28 8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.6" />
        <circle cx="28" cy="8" r="1.3" fill="currentColor" opacity="0.6" />
      </g>
    </svg>
  );
}
