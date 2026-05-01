import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-rule)] mt-20">
      <div className="container py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] text-[15px]">
        <div>
          <div className="brand mb-3">숨결</div>
          <p className="text-[var(--color-ink-mute)] leading-[1.7] max-w-md">
            잘 떠나는 법, 잘 기억되는 법.<br />
            살아있는 동안 모으고, 그날이 오면 보내고, 이후에도 머무르는
            추모 플랫폼.
          </p>
        </div>

        <div>
          <div className="kicker mb-3">서비스</div>
          <ul className="flex flex-col gap-2 text-[var(--color-ink-soft)]">
            <li><Link href="/#모음" className="hover:text-[var(--color-ink)]">모음</Link></li>
            <li><Link href="/#보냄" className="hover:text-[var(--color-ink)]">보냄</Link></li>
            <li><Link href="/#머무름" className="hover:text-[var(--color-ink)]">머무름</Link></li>
            <li><Link href="/#영상" className="hover:text-[var(--color-ink)]">영상</Link></li>
          </ul>
        </div>

        <div>
          <div className="kicker mb-3">안내</div>
          <ul className="flex flex-col gap-2 text-[var(--color-ink-soft)]">
            <li><Link href="/about" className="hover:text-[var(--color-ink)]">소개</Link></li>
            <li><Link href="/help" className="hover:text-[var(--color-ink)]">도움말</Link></li>
            <li><Link href="/#B2B" className="hover:text-[var(--color-ink)]">상조회사·장례식장 파트너십</Link></li>
            <li><a href="mailto:hello@sumgyeol.kr" className="hover:text-[var(--color-ink)]">문의</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-rule)]">
        <div className="container py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[13px] text-[var(--color-ink-mute)]">
          <div>© {new Date().getFullYear()} 숨결 (sumgyeol)</div>
          <div className="flex gap-4">
            <Link href="/help#개인정보" className="hover:text-[var(--color-ink)]">개인정보 처리방침</Link>
            <Link href="/help#약관" className="hover:text-[var(--color-ink)]">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
