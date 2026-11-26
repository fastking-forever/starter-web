import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "نَبْض | منصة تعريفية",
  description: "صفحة تعريفية أنيقة مع مساعد ذكي مدمج",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-[#0a0a0a] text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
