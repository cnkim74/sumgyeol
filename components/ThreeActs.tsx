const acts = [
  {
    id: "모음",
    kicker: "ACT 1",
    title: "숨결을 모읍니다",
    when: "살아있는 동안",
    items: [
      "사진·영상으로 만드는 AI 추모 영상",
      "남기는 글, 일지",
      "가족에게 보낼 미래의 메시지",
      "부고 받을 사람 명단",
    ],
  },
  {
    id: "보냄",
    kicker: "ACT 2",
    title: "숨결을 보냅니다",
    when: "그날",
    items: [
      "부고 자동 SMS 발송",
      "추모 영상이 함께 도착",
      "디지털 조화 · 기념품",
      "상조회사·장례식장 연계",
    ],
  },
  {
    id: "머무름",
    kicker: "ACT 3",
    title: "숨결이 머무릅니다",
    when: "그 이후",
    items: [
      "하늘공원 디지털 액자",
      "추모 페이지 · 기일 알림",
      "AI 영상통화·메신저로 다시 만남",
      "가족이 이어 쓰는 일지",
    ],
  },
];

export default function ThreeActs() {
  return (
    <section id="모음" className="section bg-[var(--color-bg-soft)] border-y border-[var(--color-rule)]">
      <div className="container">
        <div className="max-w-2xl mb-14">
          <p className="kicker mb-4">서비스 — 세 막</p>
          <h2 className="display-md">
            모음 · 보냄 · 머무름.<br />
            한 사람의 시간을 따라 흐릅니다.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {acts.map((act) => (
            <article key={act.id} id={act.id} className="card scroll-mt-24">
              <div className="flex items-baseline justify-between">
                <span className="kicker">{act.kicker}</span>
                <span className="text-[13px] text-[var(--color-ink-mute)] font-sans">
                  {act.when}
                </span>
              </div>
              <h3 className="card-title">{act.title}</h3>
              <ul className="card-list">
                {act.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
