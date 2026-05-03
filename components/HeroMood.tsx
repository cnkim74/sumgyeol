"use client";

import { useMemo } from "react";
import PortraitSilhouette from "./PortraitSilhouette";
import Starfield from "./Starfield";

export type Mood = "stars" | "horizon" | "letter" | "frame" | "cherry";

export default function HeroMood({ mood }: { mood: Mood }) {
  if (mood === "stars") return <MoodStars />;
  if (mood === "horizon") return <MoodHorizon />;
  if (mood === "letter") return <MoodLetter />;
  if (mood === "frame") return <MoodFrame />;
  if (mood === "cherry") return <MoodCherry />;
  return null;
}

function MoodStars() {
  return (
    <>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 100% 70% at 70% 20%, color-mix(in srgb, var(--accent) 14%, transparent) 0%, transparent 65%), linear-gradient(180deg, var(--bg-deep) 0%, var(--bg) 80%)",
      }} />
      <Starfield density={90} />
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        height: 1, background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 50%, transparent), transparent)",
      }} />
    </>
  );
}

function MoodHorizon() {
  return (
    <>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, var(--bg-deep) 0%, color-mix(in srgb, var(--accent-warm) 4%, var(--bg)) 60%, var(--bg) 100%)",
      }} />
      <div style={{
        position: "absolute", right: "8%", top: "55%", transform: "translateY(-50%)",
        width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(circle, color-mix(in srgb, var(--accent-warm) 28%, transparent) 0%, transparent 70%)",
        filter: "blur(8px)",
      }} />
      <div style={{
        position: "absolute", left: 0, right: 0, top: "70%",
        height: 1, background: "linear-gradient(90deg, transparent, var(--rule-2), transparent)",
      }} />
      <svg style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "100%", height: "30%", opacity: 0.4 }} viewBox="0 0 1200 200" preserveAspectRatio="none">
        <path d="M0,200 L0,140 L150,80 L300,120 L480,60 L640,110 L820,40 L1000,90 L1200,70 L1200,200 Z" fill="var(--bg-deep)" />
      </svg>
    </>
  );
}

function MoodLetter() {
  return (
    <>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 100%)",
      }} />
      <div style={{
        position: "absolute", right: "6%", top: "50%", transform: "translateY(-50%)",
        fontSize: "min(36vw, 540px)",
        fontFamily: "var(--serif)",
        color: "color-mix(in srgb, var(--accent) 6%, transparent)",
        lineHeight: 0.9,
        userSelect: "none",
        pointerEvents: "none",
      }}>遺</div>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(var(--rule) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        opacity: 0.5,
      }} />
    </>
  );
}

function MoodFrame() {
  return (
    <>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-deep) 100%)",
      }} />
      <div style={{
        position: "absolute", right: "6%", top: "50%", transform: "translateY(-50%)",
        display: "flex", gap: 18, alignItems: "center",
        opacity: 0.85,
      }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: i === 1 ? 220 : 170,
            transform: `translateY(${i === 1 ? 0 : i === 0 ? 14 : -14}px) rotate(${i === 0 ? -2 : i === 2 ? 2 : 0}deg)`,
          }}>
            <div style={{
              padding: 10,
              background: "var(--bg-elev)",
              border: "1px solid var(--rule-2)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}>
              <div style={{
                aspectRatio: "3/4",
                background: "linear-gradient(180deg, var(--bg-soft), var(--bg-deep))",
                display: "grid", placeItems: "center",
              }}>
                <PortraitSilhouette size={i === 1 ? 140 : 100} />
              </div>
              <div style={{ height: 18, paddingTop: 6, fontFamily: "var(--serif)", fontSize: 9, color: "var(--ink-3)", textAlign: "center", letterSpacing: "0.2em" }}>
                追 慕
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function MoodCherry() {
  const petals = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 24; i++) {
      arr.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 0.7 + 0.5,
        r: Math.random() * 360,
        op: Math.random() * 0.5 + 0.2,
      });
    }
    return arr;
  }, []);
  return (
    <>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 60% 50% at 30% 30%, color-mix(in srgb, #d4a5a5 12%, transparent) 0%, transparent 60%), linear-gradient(180deg, var(--bg) 0%, var(--bg-deep) 100%)",
      }} />
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {petals.map((p, i) => (
          <g key={i} transform={`translate(${p.x}% ${p.y}%) scale(${p.s}) rotate(${p.r})`} opacity={p.op}>
            <path d="M0,-6 C3,-4 4,0 0,6 C-4,0 -3,-4 0,-6 Z" fill="#d4a5a5" />
          </g>
        ))}
      </svg>
    </>
  );
}
