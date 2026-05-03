"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logomark from "./Logomark";
import AvatarImage from "./AvatarImage";
import type { Role } from "@/lib/roles";

const NAV = [
  { href: "/#모음", label: "모음" },
  { href: "/#보냄", label: "보냄" },
  { href: "/#머무름", label: "머무름" },
  { href: "/#영상미리보기", label: "영상" },
  { href: "/about", label: "소개" },
  { href: "/help", label: "도움말" },
];

export type HeaderUser = {
  id: number;
  name: string;
  email: string;
  role: Role;
  roleLabel: string;
  canPromo: boolean;
  isAdmin: boolean;
  avatarUrl?: string;
};

export default function HeaderClient({ user }: { user: HeaderUser | null }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setUserOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserOpen(false);
      }
    }
    if (userOpen) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [userOpen]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUserOpen(false);
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <header className="apple-nav">
        <div className="apple-nav-inner">
          <Link
            href="/"
            className="apple-brand"
            aria-label="숨결 — 처음으로"
            onClick={() => setOpen(false)}
          >
            <span className="apple-brand-mark">
              <Logomark size={38} />
            </span>
            <span className="apple-brand-col">
              <span className="apple-brand-text">숨결</span>
              <span className="apple-brand-en">Sumgyeol</span>
            </span>
            <span className="apple-brand-divider" aria-hidden="true" />
            <span className="apple-brand-slogan">기억 · 기쁨 · 천국</span>
          </Link>

          <nav className="apple-nav-center" aria-label="주요">
            {NAV.map((it) => (
              <Link key={it.href} href={it.href} className="apple-nav-link" data-label={it.label}>
                {it.label}
              </Link>
            ))}
          </nav>

          {user ? (
            <div className="apple-user" ref={userRef}>
              <button
                type="button"
                className="apple-user-trigger"
                aria-haspopup="menu"
                aria-expanded={userOpen}
                onClick={() => setUserOpen((v) => !v)}
              >
                <AvatarImage name={user.name} avatarUrl={user.avatarUrl} size={28} />
                <span className="apple-user-name">{user.name}</span>
                <span className="apple-user-role">{user.roleLabel}</span>
              </button>
              {userOpen && (
                <div className="apple-user-menu" role="menu">
                  <Link
                    href="/dashboard"
                    role="menuitem"
                    className="apple-user-item"
                    onClick={() => setUserOpen(false)}
                  >
                    내 정보
                  </Link>
                  {user.canPromo && (
                    <Link
                      href="/promo"
                      role="menuitem"
                      className="apple-user-item"
                      onClick={() => setUserOpen(false)}
                    >
                      홍보 배너 신청
                    </Link>
                  )}
                  {user.isAdmin && (
                    <Link
                      href="/admin"
                      role="menuitem"
                      className="apple-user-item"
                      onClick={() => setUserOpen(false)}
                    >
                      관리
                    </Link>
                  )}
                  <button
                    type="button"
                    role="menuitem"
                    className="apple-user-item is-danger"
                    onClick={logout}
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="apple-auth-actions">
              <Link href="/login" className="apple-nav-link">
                로그인
              </Link>
              <Link href="/signup" className="apple-nav-cta">
                회원가입
              </Link>
            </div>
          )}

          <button
            type="button"
            className="apple-burger"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            aria-controls="mobile-sheet"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        id="mobile-sheet"
        className="apple-sheet"
        data-open={open}
        role="dialog"
        aria-modal={open}
        aria-label="모바일 메뉴"
      >
        <div className="apple-sheet-inner">
          {NAV.map((it, i) => (
            <Link
              key={it.href}
              href={it.href}
              className="apple-sheet-link"
              style={{ ["--i" as never]: i }}
              onClick={() => setOpen(false)}
            >
              {it.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="apple-sheet-link"
                style={{ ["--i" as never]: NAV.length }}
                onClick={() => setOpen(false)}
              >
                내 정보 ({user.roleLabel})
              </Link>
              {user.canPromo && (
                <Link
                  href="/promo"
                  className="apple-sheet-link"
                  style={{ ["--i" as never]: NAV.length + 1 }}
                  onClick={() => setOpen(false)}
                >
                  홍보 배너 신청
                </Link>
              )}
              {user.isAdmin && (
                <Link
                  href="/admin"
                  className="apple-sheet-link"
                  style={{ ["--i" as never]: NAV.length + 2 }}
                  onClick={() => setOpen(false)}
                >
                  관리
                </Link>
              )}
              <button
                type="button"
                className="apple-sheet-link apple-sheet-cta"
                style={{ ["--i" as never]: NAV.length + 3 }}
                onClick={logout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="apple-sheet-link"
                style={{ ["--i" as never]: NAV.length }}
                onClick={() => setOpen(false)}
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="apple-sheet-link apple-sheet-cta"
                style={{ ["--i" as never]: NAV.length + 1 }}
                onClick={() => setOpen(false)}
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
