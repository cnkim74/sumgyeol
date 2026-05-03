"use client";

export default function Subscription() {
  return (
    <section id="사전신청" style={{ padding: "140px 0", background: "var(--bg-soft)", borderTop: "1px solid var(--rule)" }}>
      <div className="container" style={{ maxWidth: 720, textAlign: "center" }}>
        <div className="kicker" style={{ marginBottom: 24 }}>사전 신청</div>
        <h2 className="t-h1 serif">먼저 받아 보시겠어요?</h2>
        <p className="t-lead" style={{ marginTop: 24, maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
          이메일을 남겨 주시면, 첫 베타 초대장을 가장 먼저 보내드립니다.
        </p>
        <form
          style={{ marginTop: 40, display: "flex", gap: 8, maxWidth: 460, margin: "40px auto 0", flexWrap: "wrap", justifyContent: "center" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="이메일 주소"
            style={{
              flex: "1 1 240px",
              padding: "14px 20px",
              background: "var(--bg-elev)",
              border: "1px solid var(--rule-2)",
              borderRadius: 999,
              color: "var(--ink)",
              fontFamily: "var(--sans)",
              fontSize: 14.5,
              outline: "none",
            }}
          />
          <button className="btn btn-primary" type="submit">초대장 받기</button>
        </form>
        <p className="t-caption" style={{ marginTop: 18 }}>
          개인정보는 베타 초대 외의 용도로 사용되지 않습니다.
        </p>
      </div>
    </section>
  );
}
