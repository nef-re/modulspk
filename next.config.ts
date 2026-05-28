import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: process.env.STATIC_EXPORT === '1' ? 'export' : undefined,
  images: {
    unoptimized: process.env.STATIC_EXPORT === '1',
  },
  async rewrites() {
    if (process.env.STATIC_EXPORT === '1') return []
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL ?? 'http://localhost:3001'}/api/:path*`,
      },
    ]
  },
}

export default nextConfig
