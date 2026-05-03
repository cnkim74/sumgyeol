import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "숨결 — 잘 떠나는 법, 잘 기억되는 법",
    template: "%s · 숨결",
  },
  description:
    "살아있는 동안 모으고, 그날이 오면 보내고, 이후에도 머무르는 추모 플랫폼. 사진과 글로 만드는 AI 추모 영상, 미리 남기는 다큐멘터리 인터뷰까지.",
  metadataBase: new URL("https://sumgyeol.kr"),
  applicationName: "숨결",
  openGraph: {
    title: "숨결 — 잘 떠나는 법, 잘 기억되는 법",
    description:
      "살아있는 동안 모으고, 그날이 오면 보내고, 이후에도 머무르는 추모 플랫폼.",
    siteName: "숨결",
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;600;700&family=Nanum+Myeongjo:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body data-mode="dark">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
