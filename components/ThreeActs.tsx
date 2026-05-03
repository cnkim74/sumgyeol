const acts = [
  { kicker: "ACT 1", title: "숨결을 모읍니다", when: "살아있는 동안",
    items: ["사진과 영상으로 만드는 추모 영상", "남기는 글, 매일의 일지", "가족에게 보낼 미래의 메시지", "부고 받을 사람 명단"] },
  { kicker: "ACT 2", title: "숨결을 보냅니다", when: "그날",
    items: ["부고 자동 SMS 발송", "추모 영상이 함께 도착", "디지털 조화 · 기념품", "상조회사·장례식장 연계"] },
  { kicker: "ACT 3", title: "숨결이 머무릅니다", when: "그 이후",
    items: ["하늘공원 디지털 액자", "추모 페이지 · 기일 알림", "AI로 다시 듣는 목소리", "가족이 이어 쓰는 일지"] },
];

export default function ThreeActs() {
  return (
    <section id="모음" style={{ padding: "120px 0", background: "var(--bg-soft)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "end", gap: 40, marginBottom: 80 }}>
          <div>
            <div className="kicker" style={{ marginBottom: 24 }}>서비스 — 세 막</div>
            <h2 className="t-h1 serif">모음 · 보냄 · 머무름.</h2>
          </div>
          <div className="t-body" style={{ paddingBottom: 8 }}>
            한 사람의 시간은 흐름입니다. 살아있는 동안 차곡차곡 쌓아두고, 그날이 오면 약속한 가족에게 보내고, 이후에도 일상 가까이에 머무르도록 — 세 막으로 설계했습니다.
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid var(--rule-2)" }}>
          {acts.map((act, i) => (
            <article key={i} style={{
              padding: "40px 32px 40px 0",
              borderRight: i < 2 ? "1px solid var(--rule)" : "none",
              paddingLeft: i > 0 ? 32 : 0,
              minHeight: 380,
              display: "flex", flexDirection: "column",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 28 }}>
                <span className="kicker kicker-accent">{act.kicker}</span>
                <span className="t-meta">{act.when}</span>
              </div>
              <h3 className="t-h2 serif" style={{ marginBottom: 28 }}>{act.title}</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14, marginTop: "auto" }}>
                {act.items.map((item, j) => (
                  <li key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start", color: "var(--ink-2)", fontSize: 15, lineHeight: 1.6 }}>
                    <span style={{ color: "var(--accent)", marginTop: 8, width: 14, height: 1, background: "currentColor", flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
