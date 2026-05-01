import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "숨결 — 잘 떠나는 법, 잘 기억되는 법",
  description:
    "살아있는 동안 모으고, 그날이 오면 보내고, 이후에도 머무르는 추모 플랫폼. 사진과 글로 만드는 AI 추모 영상, 미리 남기는 다큐멘터리 인터뷰까지.",
  metadataBase: new URL("https://sumgyeol.kr"),
  openGraph: {
    title: "숨결",
    description: "잘 떠나는 법, 잘 기억되는 법.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
