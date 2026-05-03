type Props = { size?: number; ringed?: boolean };

export default function PortraitSilhouette({ size = 200, ringed = false }: Props) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 200 250" aria-hidden="true">
      <defs>
        <linearGradient id="silbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="1" stopColor="var(--bg-elev)" stopOpacity="1" />
        </linearGradient>
        <radialGradient id="silglow" cx="0.5" cy="0.4" r="0.5">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.45" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="250" fill="url(#silbg)" />
      <circle cx="100" cy="100" r="80" fill="url(#silglow)" />
      <ellipse cx="100" cy="98" rx="32" ry="38" fill="var(--ink-mute)" opacity="0.55" />
      <path d="M40 250c0-38 25-72 60-72s60 34 60 72" fill="var(--ink-mute)" opacity="0.55" />
      {ringed && (
        <rect x="6" y="6" width="188" height="238" fill="none" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="0.8" />
      )}
    </svg>
  );
}
