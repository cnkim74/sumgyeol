import Link from "next/link";
import Logomark from "./Logomark";

const FG = "#aeb4bd";       // ink-2
const FG_DIM = "#777e89";   // ink-3
const FG_MUTE = "#4a505a";  // ink-mute
const RULE = "#262a31";     // rule
const BG = "#0f1115";       // bg-deep

export default function Footer() {
  const groups = [
    {
      h: "서비스",
      links: [
        { label: "부고장 만들기", href: "/dashboard/obituary/new" },
        { label: "하늘공원 추모 페이지", href: "/dashboard/memorial/new" },
        { label: "AI 추모 영상", href: "/#사전신청" },
        { label: "디지털 유언장", href: "/#사전신청" },
        { label: "다큐멘터리 인터뷰", href: "/#사전신청" },
      ],
    },
    {
      h: "파트너십",
      links: [
        { label: "상조회사·장례식장", href: "/#소개" },
        { label: "하늘공원 디지털 액자", href: "/#소개" },
      ],
    },
    {
      h: "숨결",
      links: [
        { label: "소개", href: "/about" },
        { label: "도움말", href: "/help" },
        { label: "이용약관", href: "#" },
        { label: "개인정보 처리방침", href: "#" },
      ],
    },
  ];

  return (
    <footer style={{ background: BG, borderTop: `1px solid ${RULE}`, padding: "72px 0 36px" }}>
      <div
        className="container"
        style={{ display: "grid", gap: 48, gridTemplateColumns: "1.6fr 1fr 1fr 1fr" }}
      >
        <div>
          <Link
            href="/"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#e9ebee", textDecoration: "none", fontFamily: "var(--sans)", fontWeight: 700, fontSize: 18 }}
          >
            <Logomark size={28} />
            <span>숨결</span>
          </Link>
          <p style={{ marginTop: 6, fontSize: 11, fontWeight: 400, letterSpacing: "0.14em", color: "rgba(245,241,230,0.45)" }}>
            기억 · 기쁨 · 천국
          </p>
          <p style={{ marginTop: 16, color: FG, fontSize: 14, lineHeight: 1.8, maxWidth: 300 }}>
            살아있는 동안 모으고, 그날이 오면 보내고,<br />
            이후에도 일상 가까이에 머무릅니다.
          </p>
        </div>
        {groups.map((g, i) => (
          <div key={i}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: FG_DIM, marginBottom: 18 }}>{g.h}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {g.links.map((l, j) => (
                <li key={j}>
                  <Link href={l.href} className="footer-nav-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        className="container"
        style={{ marginTop: 56, paddingTop: 24, borderTop: `1px solid ${RULE}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}
      >
        <div style={{ fontSize: 12, color: FG_MUTE, letterSpacing: "0.04em" }}>© 2026 숨결 (Sumgyeol). All rights reserved.</div>
        <div style={{ color: FG_DIM, fontStyle: "italic", fontSize: 13 }}>A breath, kept.</div>
      </div>
    </footer>
  );
}
