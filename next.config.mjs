/** @type {import('next').NextConfig} */
const nextConfig = {
  // يمنع تحذير تعدد الـ lockfiles في المجلد الأب
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
