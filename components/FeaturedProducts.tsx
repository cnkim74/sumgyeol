import Link from "next/link";

const products = [
  {
    tag: "무료 · 지금 바로",
    tagColor: "#4ade80",
    tagBg: "rgba(74,222,128,0.12)",
    icon: "📋",
    title: "부고장 만들기",
    desc: "카카오톡·문자로 공유하는 디지털 부고. 장례 일정·계좌·연락처까지 30분에 완성. 링크 하나로 전달됩니다.",
    cta: "부고장 작성 →",
    href: "/dashboard/obituary/new",
    highlight: true,
  },
  {
    tag: "디지털 추모 공간",
    tagColor: "#9aa6b5",
    tagBg: "rgba(154,166,181,0.12)",
    icon: "🌿",
    title: "하늘공원 페이지",
    desc: "고인의 사진·이야기를 담는 온라인 추모 페이지. 가족이 함께 기일 알림을 받고, 메시지를 남깁니다.",
    cta: "추모 페이지 만들기 →",
    href: "/dashboard/memorial/new",
    highlight: false,
  },
  {
    tag: "사전신청",
    tagColor: "#c2b69a",
    tagBg: "rgba(194,182,154,0.12)",
    icon: "🎞",
    title: "AI 추모 영상 · 영정사진",
    desc: "사진 한 장이면 생애 30초 영상이 만들어집니다. AI가 음악과 흐름을 더해 드립니다.",
    cta: "사전 신청하기 →",
    href: "/#사전신청",
    highlight: false,
  },
];

export default function FeaturedProducts() {
  return (
    <section
      id="핵심기능"
      style={{
        padding: "100px 0",
        background: "var(--bg-elev)",
        borderBottom: "1px solid var(--rule)",
      }}
    >
      <div className="container">
        <div style={{ marginBottom: 56, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div className="kicker" style={{ marginBottom: 16 }}>핵심 서비스</div>
            <h2 className="t-h1">지금 바로 시작할 수 있어요</h2>
          </div>
          <p className="t-body" style={{ maxWidth: 380 }}>
            준비가 되셨을 때 바로 쓸 수 있도록 설계했습니다.<br />
            부고장부터 추모 페이지까지, 모두 무료로 시작됩니다.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 16, alignItems: "stretch" }}>
          {products.map((p, i) => (
            <div
              key={i}
              style={{
                background: p.highlight ? "var(--bg)" : "var(--bg-soft)",
                border: `1px solid ${p.highlight ? "var(--rule-2)" : "var(--rule)"}`,
                borderRadius: 16,
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 0,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {p.highlight && (
                <div style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: 3,
                  background: "linear-gradient(90deg, #4ade80, #22c55e)",
                  borderRadius: "16px 16px 0 0",
                }} />
              )}
              <div style={{ marginBottom: 20 }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: p.tagColor,
                  background: p.tagBg,
                }}>
                  {p.tag}
                </span>
              </div>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{p.icon}</div>
              <h3 style={{
                fontSize: p.highlight ? 24 : 20,
                fontWeight: 700,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
                marginBottom: 14,
                fontFamily: "var(--sans)",
              }}>{p.title}</h3>
              <p style={{
                fontSize: 14,
                lineHeight: 1.75,
                color: "var(--ink-2)",
                marginBottom: 32,
                flex: 1,
                wordBreak: "keep-all",
              }}>{p.desc}</p>
              <Link
                href={p.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontFamily: "var(--sans)",
                  fontWeight: 600,
                  fontSize: 14,
                  color: p.highlight ? "#4ade80" : "var(--ink)",
                  textDecoration: "none",
                  letterSpacing: "-0.005em",
                  transition: "gap .15s",
                }}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
