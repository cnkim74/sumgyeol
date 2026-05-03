type Props = {
  size?: number;
  className?: string;
  title?: string;
};

/**
 * 숨결 로고마크 — 원(영원) 안 세 점이 아래(메모리)에서 위(천국)로 상승
 * 세 점: 메모리(하단·크고 진함) → 기쁨(중단·중간) → 천국(상단·작고 옅음)
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
      {/* 외원 — 영원·천국 */}
      <circle
        cx="16"
        cy="16"
        r="13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      {/* 메모리 — 하단, 가장 크고 진함 */}
      <circle cx="16" cy="22" r="2.4" fill="currentColor" />
      {/* 기쁨 — 중단 */}
      <circle cx="16" cy="15.5" r="1.8" fill="currentColor" opacity="0.65" />
      {/* 천국 — 상단, 가장 작고 옅음 */}
      <circle cx="16" cy="10" r="1.3" fill="currentColor" opacity="0.35" />
    </svg>
  );
}
