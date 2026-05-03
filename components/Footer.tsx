import Link from "next/link";
import Logomark from "./Logomark";

export default function Footer() {
  const groups = [
    { h: "서비스", links: ["모음", "보냄", "머무름", "AI 추모 영상", "다큐멘터리"] },
    { h: "파트너십", links: ["상조회사·장례식장", "하늘공원 디지털 액자"] },
    { h: "숨결", links: ["소개", "도움말", "이용약관", "개인정보 처리방침"] },
  ];
  return (
    <footer style={{ borderTop: "1px solid var(--rule)", padding: "72px 0 36px" }}>
      <div className="container" style={{ display: "grid", gap: 48, gridTemplateColumns: "1.6fr 1fr 1fr 1fr" }}>
        <div>
          <Link href="/" className="nav-brand">
            <Logomark size={22} />
            <span>숨결</span>
          </Link>
          <p className="serif" style={{ marginTop: 14, color: "var(--ink-2)", fontSize: 14, lineHeight: 1.7, maxWidth: 320 }}>
            잘 떠나는 법, 잘 기억되는 법.
          </p>
        </div>
        {groups.map((g, i) => (
          <div key={i}>
            <div className="kicker" style={{ marginBottom: 16 }}>{g.h}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {g.links.map((l, j) => (
                <li key={j}>
                  <Link href="#" style={{ color: "var(--ink-2)", textDecoration: "none", fontSize: 14 }}>{l}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container" style={{ marginTop: 56, paddingTop: 24, borderTop: "1px solid var(--rule)", display: "flex", justifyContent: "space-between" }}>
        <div className="t-meta">© 2026 숨결 (sumgyeol). All rights reserved.</div>
        <div className="serif" style={{ color: "var(--ink-3)", fontStyle: "italic", fontSize: 13 }}>A breath, kept.</div>
      </div>
    </footer>
  );
}
