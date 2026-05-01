import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "도움말 — 숨결",
  description: "자주 묻는 질문과, 안내가 필요한 분께.",
};

const faqs = [
  {
    q: "지금 가입하면 바로 쓸 수 있나요?",
    a: "지금은 사전 신청을 받고 있어요. 정식 출시와 함께 순차적으로 안내드립니다. 사전 신청자에게는 1년치 모음 구독을 무료로 드립니다.",
  },
  {
    q: "AI 추모 영상은 어떻게 만들어지나요?",
    a: "본인이 올린 사진과 일지에서 자동으로 한 편의 짧은 영상을 만들어 드립니다. 음악·길이·표지 등은 직접 골라 다시 만들 수 있어요. 외부에 공개되지 않으며, 본인과 지정한 가족만 볼 수 있습니다.",
  },
  {
    q: "다큐멘터리 영상은 무엇이 다른가요?",
    a: "지역의 영상 작가가 직접 찾아와 인터뷰를 합니다. 평생 한 번 남기는 본인의 목소리·표정·이야기가 담깁니다. AI 자동 영상과 달리 별도 신청·견적이 필요해요.",
  },
  {
    q: "그날이 오면 어떻게 부고가 보내지나요?",
    a: "본인이 미리 정해 두신 ‘보냄’ 명단으로 자동 SMS가 나갑니다. 모아둔 추모 영상이 함께 도착해요. 가족이 직접 발송 시점을 누르도록 설정할 수도 있습니다.",
  },
  {
    q: "내 정보는 안전한가요?",
    a: "한국 데이터센터에 보관하며, 본인·가족 동의 없이 외부에 공유하지 않습니다. 상조회사·장례식장과 정보를 공유하지 않으며, 가입 후 영업 전화가 가지 않습니다.",
  },
];

export default function HelpPage() {
  return (
    <section className="section">
      <div className="container max-w-3xl">
        <p className="kicker mb-4">도움말</p>
        <h1 className="display-md mb-10">자주 묻는 질문</h1>

        <div className="flex flex-col gap-6">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="card !p-6 !gap-3 [&[open]>summary]:text-[var(--color-ink)]"
            >
              <summary className="cursor-pointer font-serif text-[1.15rem] font-medium text-[var(--color-ink-soft)] list-none flex items-baseline justify-between gap-4">
                <span>{f.q}</span>
                <span className="text-[var(--color-ink-mute)] text-sm font-sans">＋</span>
              </summary>
              <p className="prose-body !text-[16px] !leading-[1.8] mt-1">{f.a}</p>
            </details>
          ))}
        </div>

        <div id="개인정보" className="mt-20">
          <h2 className="display-md text-[1.6rem]">개인정보 처리방침</h2>
          <p className="prose-body !text-[16px] !leading-[1.8] mt-4">
            정식 출시와 함께 상세 방침을 게시합니다. 사전 신청 단계에서 수집한
            정보(이름·이메일·연락처·관심 영역)는 출시 안내 외 다른 목적으로 사용하지
            않습니다. 삭제 요청은 <a href="mailto:hello@sumgyeol.kr" className="underline">hello@sumgyeol.kr</a> 로
            연락 주세요.
          </p>
        </div>

        <div id="약관" className="mt-14">
          <h2 className="display-md text-[1.6rem]">이용약관</h2>
          <p className="prose-body !text-[16px] !leading-[1.8] mt-4">
            정식 출시와 함께 게시합니다.
          </p>
        </div>

        <p className="mt-12">
          <Link href="/#사전신청" className="btn btn-primary">사전 신청 보내기</Link>
        </p>
      </div>
    </section>
  );
}
