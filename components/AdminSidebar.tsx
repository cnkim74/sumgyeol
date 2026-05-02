"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  icon: string;
  label: string;
};

const NAV: { section: string; items: NavItem[] }[] = [
  {
    section: "",
    items: [
      { href: "/admin", icon: "⬛", label: "대시보드" },
    ],
  },
  {
    section: "회원 · 신청",
    items: [
      { href: "/admin/users", icon: "👤", label: "회원 명부" },
      { href: "/admin/promos", icon: "📣", label: "홍보 배너 신청" },
    ],
  },
  {
    section: "보냄 · 머무름",
    items: [
      { href: "/admin/obituaries", icon: "📨", label: "부고장" },
      { href: "/admin/memorials", icon: "🏞", label: "하늘공원 페이지" },
      { href: "/admin/rooms", icon: "🗝", label: "추모방" },
    ],
  },
  {
    section: "콘텐츠",
    items: [
      { href: "/admin/slides", icon: "🖼", label: "홈 슬라이더" },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="notion-sidebar">
      <div className="notion-sidebar-header">
        <span className="notion-sidebar-logo">숨결</span>
        <span className="notion-sidebar-sub">관리자</span>
      </div>

      <nav className="notion-nav">
        {NAV.map(({ section, items }) => (
          <div key={section} className="notion-nav-group">
            {section && (
              <p className="notion-nav-section">{section}</p>
            )}
            {items.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`notion-nav-item${active ? " active" : ""}`}
                >
                  <span className="notion-nav-icon">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="notion-sidebar-footer">
        <Link href="/" className="notion-nav-item text-[12px]">
          <span className="notion-nav-icon">↩</span>
          사이트로 돌아가기
        </Link>
      </div>
    </aside>
  );
}
