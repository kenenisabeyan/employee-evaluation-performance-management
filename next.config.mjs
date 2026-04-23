/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimized Next.js 15+ settings for ASTU Performance Evaluator
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
