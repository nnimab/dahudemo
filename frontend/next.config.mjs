/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.optimization.usedExports = false;
      config.optimization.providedExports = false;
    }
    return config;
  },
  // 支援獨立輸出用於 Docker 部署
  output: 'standalone',
  async rewrites() {
    // 根據環境變數決定後端 URL
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`, // 代理到後端 FastAPI
      },
    ]
  },
}

export default nextConfig
