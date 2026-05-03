import Link from "next/link";

const features = [
  {
    icon: "🔒",
    title: "생전에 미리 지정",
    desc: "자녀·배우자·형제 계정을 미리 연결해 두세요. 등록된 가족만이 약속된 시점에 기억에 접근할 수 있습니다.",
  },
  {
    icon: "📬",
    title: "사후 자동 공개",
    desc: "그날이 오면 가족 계정으로 사진·편지·영상이 자동으로 전달됩니다. 수신인별로 다른 내용을 설정할 수 있습니다.",
  },
  {
    icon: "🌱",
    title: "자녀가 이어 쓰는 추모",
    desc: "하늘공원 페이지는 가족이 계속 이어 쓸 수 있습니다. 기일 알림, 추모 메시지, 사진 추가가 모두 가능합니다.",
  },
  {
    icon: "📅",
    title: "기일·생일 알림",
    desc: "연결된 가족 계정에 매년 기일과 생일 알림이 발송됩니다. 잊지 않고 기억할 수 있도록 도와드립니다.",
  },
];

function AccountNode({ label, sub, accent }: { label: string; sub: string; accent?: boolean }) {
  return (
    <div style={{
      background: accent ? "var(--bg-elev)" : "var(--bg-soft)",
      border: `1px solid ${accent ? "var(--rule-2)" : "var(--rule)"}`,
      borderRadius: 12,
      padding: "14px 18px",
      display: "flex",
      alignItems: "center",
      gap: 12,
    }}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: accent ? "linear-gradient(135deg, var(--accent), var(--accent-2))" : "var(--bg-deep)",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
      }}>
        {accent ? "👤" : "👥"}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", fontFamily: "var(--sans)" }}>{label}</div>
        <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

export default function FamilyConnect() {
  return (
    <section
      id="가족연결"
      style={{
        padding: "120px 0",
        borderTop: "1px solid var(--rule)",
        background: "var(--bg)",
      }}
    >
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* 텍스트 */}
          <div>
            <div className="kicker kicker-accent" style={{ marginBottom: 20 }}>가족 연결 · 사후 정보 공개</div>
            <h2 className="t-h1" style={{ marginBottom: 28 }}>
              그 이후에도,<br />
              가족은 이어집니다.
            </h2>
            <p className="t-lead" style={{ marginBottom: 44 }}>
              미리 등록한 가족 계정이 있으면, 약속한 순간에<br />
              기억이 자동으로 전달됩니다.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 48 }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    fontSize: 20,
                    width: 40,
                    height: 40,
                    background: "var(--bg-elev)",
                    border: "1px solid var(--rule)",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>{f.icon}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", fontFamily: "var(--sans)", marginBottom: 4 }}>{f.title}</div>
                    <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.7, wordBreak: "keep-all" }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/#사전신청"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 24px",
                borderRadius: 999,
                background: "var(--ink)",
                color: "var(--bg)",
                fontFamily: "var(--sans)",
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                letterSpacing: "-0.005em",
              }}
            >
              사전 신청하기
            </Link>
          </div>

          {/* 시각적 다이어그램 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "relative" }}>
            {/* 중심 계정 */}
            <div style={{
              background: "linear-gradient(135deg, var(--bg-elev), var(--bg-soft))",
              border: "1px solid var(--rule-2)",
              borderRadius: 16,
              padding: "22px 24px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 8,
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--accent-warm), var(--accent))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}>🧑</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--sans)" }}>내 숨결 계정</div>
                <div style={{ fontSize: 12, color: "var(--ink-2)", marginTop: 3 }}>사진 · 편지 · 유언 · 부고 명단</div>
              </div>
              <div style={{
                marginLeft: "auto",
                fontSize: 11,
                fontWeight: 600,
                color: "#4ade80",
                background: "rgba(74,222,128,0.12)",
                padding: "3px 8px",
                borderRadius: 4,
                letterSpacing: "0.06em",
              }}>본인만 열람</div>
            </div>

            {/* 연결선 */}
            <div style={{ display: "flex", justifyContent: "center", color: "var(--rule-3)", fontSize: 12, letterSpacing: "0.12em", margin: "4px 0" }}>
              ↓ 그날이 오면 자동 공개 ↓
            </div>

            {/* 가족 계정들 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <AccountNode label="배우자 계정" sub="모든 콘텐츠 공개" accent />
              <AccountNode label="자녀 A 계정" sub="사진 + 편지 공개" accent />
              <AccountNode label="자녀 B 계정" sub="사진 + 부고 공개" accent />
              <AccountNode label="형제·지인 그룹" sub="부고 알림 + 추모 페이지" />
            </div>

            {/* 기일 알림 배지 */}
            <div style={{
              marginTop: 16,
              background: "var(--bg-elev)",
              border: "1px solid var(--rule)",
              borderRadius: 12,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}>
              <div style={{ fontSize: 18 }}>🔔</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", fontFamily: "var(--sans)" }}>기일 알림 발송됨</div>
                <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>연결된 가족 4명에게 · 매년 자동</div>
              </div>
              <div style={{ marginLeft: "auto", fontSize: 11, color: "var(--accent-warm)" }}>● 활성</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
