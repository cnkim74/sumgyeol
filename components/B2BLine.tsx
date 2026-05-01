import Link from "next/link";

export default function B2BLine() {
  return (
    <section id="B2B" className="border-y border-[var(--color-rule)] bg-[var(--color-bg-soft)]">
      <div className="container py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="font-serif text-[1.05rem] text-[var(--color-ink-soft)]">
          상조회사·장례식장과 함께하는 파트너십을 준비하고 있습니다.
        </p>
        <Link
          href="mailto:partner@sumgyeol.kr?subject=숨결 파트너십 문의"
          className="btn btn-ghost !py-3 !px-5 !text-sm self-start md:self-auto"
        >
          파트너십 문의
        </Link>
      </div>
    </section>
  );
}
