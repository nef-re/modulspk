import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: process.env.STATIC_EXPORT === '1' ? 'export' : undefined,
  images: {
    unoptimized: process.env.STATIC_EXPORT === '1',
  },
  async rewrites() {
    // /api/contact обрабатывается в app/api/contact/route.ts (работает без отдельного Express)
    if (process.env.STATIC_EXPORT === '1') return []
    return [
      {
        source: '/api/health',
        destination: `${process.env.API_URL ?? 'http://localhost:3001'}/api/health`,
      },
    ]
  },
}

export default nextConfig
