type Props = {
  size?: number;
  className?: string;
  title?: string;
};

export default function Logomark({
  size = 22,
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
      <circle
        cx="16"
        cy="17"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <circle cx="20.6" cy="12.4" r="2.6" fill="currentColor" />
    </svg>
  );
}
