import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container flex items-center justify-between h-[68px]">
        <Link href="/" className="brand" aria-label="숨결 — 처음으로">
          숨결
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/#모음" className="nav-link">모음</Link>
          <Link href="/#보냄" className="nav-link">보냄</Link>
          <Link href="/#머무름" className="nav-link">머무름</Link>
          <Link href="/about" className="nav-link">소개</Link>
          <Link href="/help" className="nav-link">도움말</Link>
        </nav>
        <Link href="/#사전신청" className="btn btn-primary !py-3 !px-5 !text-sm">
          사전 신청
        </Link>
      </div>
    </header>
  );
}
