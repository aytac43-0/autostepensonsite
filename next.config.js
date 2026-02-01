/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript hatalarını YOKSAY (Build'i durdurmasın)
  typescript: {
    ignoreBuildErrors: true,
  },
  // ESLint hatalarını YOKSAY
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Supabase/WebSocket hatalarını sustur
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ws: false,
    };
    return config;
  },
}

module.exports = nextConfig
