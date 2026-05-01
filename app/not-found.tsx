import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container max-w-2xl text-center">
        <p className="kicker mb-4">404</p>
        <h1 className="display-md">찾으시는 자리가 없습니다.</h1>
        <p className="lead mt-6">
          주소가 바뀌었거나, 아직 준비 중인 페이지일 수 있어요.
        </p>
        <Link href="/" className="btn btn-primary mt-8 inline-flex">
          처음으로
        </Link>
      </div>
    </section>
  );
}
