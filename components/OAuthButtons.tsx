"use client";

export default function OAuthButtons({ next }: { next?: string }) {
  const nextParam = next ? `?next=${encodeURIComponent(next)}` : "";

  return (
    <>
      <div className="flex flex-col gap-3">
        <a
          href={`/api/auth/google${nextParam}`}
          className="oauth-btn oauth-btn-google"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              fill="#4285F4"
              d="M47.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h13.2c-.6 3-2.3 5.5-4.8 7.2v6h7.8c4.6-4.2 7.3-10.5 7.3-17.5z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.8-6c-2.1 1.4-4.8 2.3-8.1 2.3-6.2 0-11.5-4.2-13.4-9.9H2.6v6.2C6.6 42.8 14.7 48 24 48z"
            />
            <path
              fill="#FBBC05"
              d="M10.6 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6v-6.2H2.6C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.8l8-6.2z"
            />
            <path
              fill="#EA4335"
              d="M24 9.5c3.5 0 6.6 1.2 9.1 3.5l6.8-6.8C35.9 2.4 30.5 0 24 0 14.7 0 6.6 5.2 2.6 13.2l8 6.2C12.5 13.7 17.8 9.5 24 9.5z"
            />
          </svg>
          Google로 계속
        </a>
        <a
          href={`/api/auth/naver${nextParam}`}
          className="oauth-btn oauth-btn-naver"
        >
          <span
            style={{
              fontWeight: 900,
              fontSize: 16,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            N
          </span>
          네이버로 계속
        </a>
      </div>
      <div className="oauth-divider">또는</div>
    </>
  );
}
