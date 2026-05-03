const items = [
  { kicker: "보관", text: "한 번 만든 페이지는 평생 보관됩니다." },
  { kicker: "잠금", text: "그날 전까지는 본인만 볼 수 있어요." },
  { kicker: "전달", text: "약속한 사람에게, 약속한 날에." },
  { kicker: "해지", text: "마음이 바뀌면 모두 지울 수 있습니다." },
];

export default function Trust() {
  return (
    <section style={{ padding: "120px 0", borderTop: "1px solid var(--rule)" }}>
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <div className="kicker" style={{ marginBottom: 24 }}>약속</div>
          <h2 className="t-h2" style={{ maxWidth: 700 }}>마음을 맡기는 일이니까요.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid var(--rule)" }}>
          {items.map((it, i) => (
            <div key={i} style={{
              padding: "32px 28px 32px 0",
              borderRight: i < items.length - 1 ? "1px solid var(--rule)" : "none",
              paddingLeft: i > 0 ? 28 : 0,
            }}>
              <div className="kicker kicker-accent" style={{ marginBottom: 18 }}>{it.kicker}</div>
              <p className="serif" style={{ fontSize: 17, lineHeight: 1.5, color: "var(--ink)" }}>{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
