import Link from "next/link";
import Logomark from "./Logomark";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container py-16 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] text-[15px]">
        <div>
          <Link href="/" className="brand-lockup mb-4" aria-label="숨결 — 처음으로">
            <Logomark size={26} />
            <span className="brand-lockup-text">숨결</span>
          </Link>
          <p className="footer-text leading-[1.7] max-w-md mt-3">
            잘 떠나는 법, 잘 기억되는 법.<br />
            살아있는 동안 모으고, 그날이 오면 보내고, 이후에도 머무르는
            추모 플랫폼.
          </p>
        </div>

        <div>
          <div className="kicker mb-3">서비스</div>
          <ul className="flex flex-col gap-2">
            <li><Link href="/#모음" className="footer-link">모음</Link></li>
            <li><Link href="/#보냄" className="footer-link">보냄</Link></li>
            <li><Link href="/#머무름" className="footer-link">머무름</Link></li>
            <li><Link href="/#영상미리보기" className="footer-link">영상</Link></li>
          </ul>
        </div>

        <div>
          <div className="kicker mb-3">안내</div>
          <ul className="flex flex-col gap-2">
            <li><Link href="/about" className="footer-link">소개</Link></li>
            <li><Link href="/help" className="footer-link">도움말</Link></li>
            <li><Link href="/#B2B" className="footer-link">상조회사·장례식장 파트너십</Link></li>
            <li><a href="mailto:hello@sumgyeol.kr" className="footer-link">문의</a></li>
          </ul>
        </div>
      </div>

      <div className="container pb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[13px] footer-meta">
        <div>© {new Date().getFullYear()} 숨결 (sumgyeol)</div>
        <div className="flex gap-4">
          <Link href="/help#개인정보" className="footer-link">개인정보 처리방침</Link>
          <Link href="/help#약관" className="footer-link">이용약관</Link>
        </div>
      </div>
    </footer>
  );
}
