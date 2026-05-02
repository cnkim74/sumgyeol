"use client";

export default function AvatarImage({
  name,
  avatarUrl,
  size = 32,
}: {
  name: string;
  avatarUrl?: string | null;
  size?: number;
}) {
  const colors = [
    "#7c6f64",
    "#458588",
    "#689d6a",
    "#d79921",
    "#cc241d",
    "#b16286",
  ];
  const colorIndex =
    name.charCodeAt(0) % colors.length;
  const bg = colors[colorIndex];

  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={name}
        className="avatar"
        width={size}
        height={size}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="avatar-fallback"
      style={{
        width: size,
        height: size,
        background: bg,
        color: "#fff",
        fontSize: Math.round(size * 0.45),
      }}
    >
      {name.charAt(0)}
    </div>
  );
}
