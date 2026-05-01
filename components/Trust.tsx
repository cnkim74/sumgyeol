const promises = [
  {
    title: "한국 데이터센터 보관",
    body: "본인·가족 동의 없이 외부에 노출되지 않습니다.",
  },
  {
    title: "종교·예법 강요 없음",
    body: "양식은 직접 선택합니다. 어떤 형태의 작별이든 존중합니다.",
  },
  {
    title: "장례 영업과 분리 운영",
    body: "상조·장례식장과 정보를 공유하지 않습니다. 가입 후 영업 전화가 가지 않습니다.",
  },
];

export default function Trust() {
  return (
    <section className="section-tight">
      <div className="container">
        <div className="max-w-2xl mb-12">
          <p className="kicker mb-4">잘 지킬 건 지킵니다</p>
          <h2 className="display-md">
            모던하지만, 무게는 알고 있습니다.
          </h2>
        </div>

        <div className="grid gap-x-10 gap-y-8 md:grid-cols-3">
          {promises.map((p) => (
            <div key={p.title}>
              <h3 className="font-serif text-[1.2rem] font-medium text-[var(--color-ink)] mb-2">
                {p.title}
              </h3>
              <p className="font-sans text-[15px] leading-[1.7] text-[var(--color-ink-soft)]">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
