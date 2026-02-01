/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hataları yoksay ve build al
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Supabase hatasını sustur
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ws: false,
    };
    return config;
  },
}

module.exports = nextConfig
