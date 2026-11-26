import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADAM | منصة تعريفية",
  description: "منصة ADAM: هوية، تجارب تفاعلية، مساعد ذكي، وتنزيلات ألعاب.",
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
