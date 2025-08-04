import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // 支持 GitHub Pages 的 basePath（如果需要）
  // basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',

  // 静态导出配置
  distDir: 'out',

  // 环境变量
  env: {
    CUSTOM_KEY: 'my-value',
  },
};

export default nextConfig;
