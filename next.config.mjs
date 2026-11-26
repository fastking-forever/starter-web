/** @type {import('next').NextConfig} */
const nextConfig = {
  // يمنع تحذير تعدد الـ lockfiles في المجلد الأب
  outputFileTracingRoot: process.cwd(),
  async headers() {
    return [
      {
        source: "/downloads/:path*",
        headers: [
          { key: "Content-Type", value: "application/vnd.android.package-archive" },
          { key: "Content-Disposition", value: "attachment" },
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
