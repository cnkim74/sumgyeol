import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "소개 — 숨결",
  description: "숨결이 만들어진 이유와, 우리가 다르게 하려는 것들.",
};

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container max-w-3xl">
        <p className="kicker mb-4">소개</p>
        <h1 className="display-md mb-10">
          잘 떠나는 법, 잘 기억되는 법.<br />
          숨결이 시작된 이유.
        </h1>

        <div className="prose-body">
          <p>
            우리 세대는 부모님의 장례를 치르면서, 그리고 머지않은 우리 자신의
            마지막을 떠올리면서, 같은 질문을 합니다. 꼭 이렇게 무겁고, 이렇게
            급하고, 이렇게 정해진 모습이어야 할까.
          </p>
          <p>
            숨결은 다르게 해보려고 만든 작은 플랫폼입니다. 살아있는 동안에
            천천히 사진과 글, 짧은 영상으로 자기 이야기를 모아 두면, 그날이
            왔을 때 그 모음이 자연스럽게 가족에게 전해지고, 이후에도 일상
            가까이에 머무르게 됩니다.
          </p>

          <h2>모음 · 보냄 · 머무름</h2>
          <p>
            세 단어가 곧 제품의 구조입니다. 살아있을 때 모으고, 그날에 보내고,
            이후에 머무릅니다. 부고는 입구가 아니라 출구입니다. 우리는 입구를
            훨씬 더 중요하게 생각합니다.
          </p>

          <h2>약속</h2>
          <p>
            데이터는 한국 데이터센터에 보관하고, 본인·가족 동의 없이 외부에
            노출하지 않습니다. 어떤 종교나 예법도 강요하지 않습니다. 상조회사·
            장례식장과 정보를 공유하지 않으며, 가입 후 영업 전화가 가지
            않습니다.
          </p>

          <p className="mt-8">
            <Link href="/#사전신청" className="btn btn-primary">사전 신청 보내기</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
