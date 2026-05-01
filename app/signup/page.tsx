import Link from "next/link";
import SignupForm from "@/components/SignupForm";

export const metadata = { title: "회원가입" };

export default function SignupPage() {
  return (
    <section className="section">
      <div className="container max-w-md">
        <h1 className="display-md text-center mb-3">숨결을 시작합니다.</h1>
        <p className="lead text-center mb-10">
          회원 등급을 골라 가입해 주세요.
        </p>
        <SignupForm />
        <p className="text-center mt-8 text-[15px] text-[var(--color-ink-mute)]">
          이미 가입하셨나요?{" "}
          <Link href="/login" className="text-link">
            로그인
          </Link>
        </p>
      </div>
    </section>
  );
}
