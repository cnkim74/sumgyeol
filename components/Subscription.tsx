export default function Subscription() {
  return (
    <section className="section bg-[var(--color-bg-soft)] border-y border-[var(--color-rule)]">
      <div className="container max-w-3xl">
        <p className="kicker mb-6 text-center">약속</p>
        <h2 className="display-md text-center">
          구독은 살아있는 동안.<br />
          약속은 그 이후까지.
        </h2>
        <p className="lead mt-8 text-center max-w-2xl mx-auto">
          월 구독 한 번이면, 그날의 부고 발송과 평생 보관은 더 받지 않습니다.
          가족이 이어받아 머무름까지 잇습니다.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="card !p-6 !gap-2 text-center">
            <span className="kicker">모음</span>
            <p className="font-sans text-[15px] text-[var(--color-ink-soft)] leading-[1.65]">
              월 구독 — 사진·일지·AI 영상·부고 명단 무제한 보관
            </p>
          </div>
          <div className="card !p-6 !gap-2 text-center">
            <span className="kicker">보냄</span>
            <p className="font-sans text-[15px] text-[var(--color-ink-soft)] leading-[1.65]">
              그날의 부고 자동 발송 — 모음 구독자는 무료
            </p>
          </div>
          <div className="card !p-6 !gap-2 text-center">
            <span className="kicker">머무름</span>
            <p className="font-sans text-[15px] text-[var(--color-ink-soft)] leading-[1.65]">
              가족 영속 보관 · 디지털 액자 — 옵션 추가
            </p>
          </div>
        </div>

        <p className="mt-10 text-center text-[13px] font-sans text-[var(--color-ink-mute)]">
          정확한 요금은 정식 출시와 함께 안내드립니다. 사전 신청자에겐 1년치 모음 구독을 무료로 드립니다.
        </p>
      </div>
    </section>
  );
}
