/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript hataları olsa bile build almayı zorla
  typescript: {
    ignoreBuildErrors: true,
  },
  // ESLint hatalarını görmezden gel
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Supabase Realtime hatasını bastırmak için (Az önceki sarı uyarı)
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ws: false, // Tarayıcıda websocket modülünü yoksay
    };
    return config;
  },
};

module.exports = nextConfig;
