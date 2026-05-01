import WaitlistForm from "./WaitlistForm";

export default function WaitlistSection() {
  return (
    <section
      id="사전신청"
      className="section bg-[var(--color-bg-soft)] border-y border-[var(--color-rule)] scroll-mt-20"
    >
      <div className="container max-w-3xl">
        <p className="kicker mb-4 text-center">사전 신청</p>
        <h2 className="display-md text-center">
          먼저 시작하시는 분께,<br />
          1년치 모음 구독을 드립니다.
        </h2>
        <p className="lead text-center mt-6 max-w-xl mx-auto">
          출시 전 미리 체험할 수 있도록 안내드립니다. 천천히, 하나씩 열어 드릴게요.
        </p>
        <div className="mt-12">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
