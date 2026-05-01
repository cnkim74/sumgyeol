import { Suspense } from "react";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export const metadata = { title: "로그인" };

export default function LoginPage() {
  return (
    <section className="section">
      <div className="container max-w-md">
        <h1 className="display-md text-center mb-3">다시 오셨네요.</h1>
        <p className="lead text-center mb-10">숨결에 로그인합니다.</p>
        <Suspense>
          <LoginForm />
        </Suspense>
        <p className="text-center mt-8 text-[15px] text-[var(--color-ink-mute)]">
          처음이신가요?{" "}
          <Link href="/signup" className="text-link">
            회원가입
          </Link>
        </p>
      </div>
    </section>
  );
}
