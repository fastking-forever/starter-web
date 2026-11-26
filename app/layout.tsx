import type { Metadata } from "next";
import ScrollProgress from "@/components/scroll-progress";
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
      <body className="min-h-screen bg-[#070707] text-neutral-100 antialiased">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
