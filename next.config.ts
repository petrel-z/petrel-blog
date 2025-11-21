import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 使用 Turbopack（Next.js 16 默认），避免 webpack 配置冲突
  turbopack: {},
};

export default nextConfig;
