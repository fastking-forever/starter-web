import type { Metadata } from "next";
import ScrollProgress from "@/components/scroll-progress";
import TargetCursor from "@/components/target-cursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADAM | ألعابك في مكان واحد",
  description: "موقع ADAM: ألعاب للتنزيل، لعبة فضاء تفاعلية، ومساعد ذكي بالعربي.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=JetBrains+Mono:wght@400;600;700&family=Outfit:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#070A08] text-neutral-100 antialiased">
        <ScrollProgress />
        <TargetCursor />
        {children}
      </body>
    </html>
  );
}
