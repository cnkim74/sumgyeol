import Link from "next/link";
import Logomark from "./Logomark";

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 4C7 4 3 7.1 3 11c0 2.4 1.4 4.5 3.7 5.7L6 21l4-2.5c.6.1 1.3.2 2 .2 5 0 9-3.1 9-7S17 4 12 4z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container py-16 grid gap-12 md:gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr] text-[15px]">
        {/* 브랜드 블록 */}
        <div>
          <Link href="/" className="footer-brand-row" aria-label="숨결 — 처음으로">
            <span className="footer-brand-square">
              <Logomark size={24} />
            </span>
            <span className="footer-brand-name">숨결</span>
          </Link>
          <p className="footer-tagline">잘 떠나는 법, 잘 기억되는 법.</p>
          <p className="footer-text leading-[1.7] mt-2 max-w-md">
            살아있는 동안 모으고, 그날이 오면 보내고, 이후에도 머무르는
            추모 플랫폼.
          </p>
          <div className="footer-socials">
            <a
              href="#"
              className="footer-social"
              aria-label="인스타그램 (준비 중)"
              title="준비 중"
            >
              <InstagramIcon />
            </a>
            <a
              href="#"
              className="footer-social"
              aria-label="카카오톡 채널 (준비 중)"
              title="준비 중"
            >
              <ChatIcon />
            </a>
            <a
              href="mailto:hello@sumgyeol.kr"
              className="footer-social"
              aria-label="이메일"
            >
              <MailIcon />
            </a>
          </div>
        </div>

        {/* 서비스 */}
        <div>
          <div className="footer-heading">서비스</div>
          <ul className="flex flex-col gap-3">
            <li><Link href="/#모음" className="footer-link">모음</Link></li>
            <li><Link href="/#보냄" className="footer-link">보냄</Link></li>
            <li><Link href="/#머무름" className="footer-link">머무름</Link></li>
            <li>
              <Link href="/#영상미리보기" className="footer-link">
                AI 추모 영상
              </Link>
            </li>
            <li>
              <Link href="/#영상" className="footer-link">
                다큐멘터리
                <span className="footer-sublabel">지역 크리에이터 매칭</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* 파트너십 */}
        <div>
          <div className="footer-heading">파트너십</div>
          <ul className="flex flex-col gap-3">
            <li>
              <Link href="/#B2B" className="footer-link">
                상조회사·장례식장
              </Link>
            </li>
            <li>
              <Link href="/promo" className="footer-link">
                홍보 배너 신청
                <span className="footer-sublabel">장례식장·하늘공원 회원</span>
              </Link>
            </li>
            <li>
              <Link href="/#머무름" className="footer-link">
                하늘공원 디지털 액자
              </Link>
            </li>
          </ul>
        </div>

        {/* 회사 */}
        <div>
          <div className="footer-heading">숨결</div>
          <ul className="flex flex-col gap-3">
            <li><Link href="/about" className="footer-link">소개</Link></li>
            <li><Link href="/help" className="footer-link">도움말</Link></li>
            <li><Link href="/help#약관" className="footer-link">이용약관</Link></li>
            <li>
              <Link href="/help#개인정보" className="footer-link">
                개인정보 처리방침
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="footer-meta text-[13px]">
          © {new Date().getFullYear()} 숨결 (sumgyeol). All rights reserved.
        </div>
        <div className="footer-tagline-en">A breath, kept.</div>
      </div>
    </footer>
  );
}
