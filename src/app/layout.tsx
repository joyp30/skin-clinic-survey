import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "피부과 사전문진 | Pre-Consultation Survey",
  description: "안전하고 효과적인 시술을 위한 피부과 비보험 시술 사전문진 시스템",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="app-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}
