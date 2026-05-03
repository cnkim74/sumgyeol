"use client";

import { useMemo } from "react";

type Props = { density?: number; twinkle?: boolean };

export default function Starfield({ density = 80, twinkle = true }: Props) {
  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < density; i++) {
      arr.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 1.4 + 0.3,
        op: Math.random() * 0.6 + 0.2,
        delay: Math.random() * 4,
      });
    }
    return arr;
  }, [density]);

  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={`${s.x}%`}
          cy={`${s.y}%`}
          r={s.r}
          fill="white"
          opacity={s.op}
          className={twinkle ? "star-tw" : undefined}
          style={twinkle ? { "--tw-delay": `${s.delay}s` } as React.CSSProperties : {}}
        />
      ))}
    </svg>
  );
}
