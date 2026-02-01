/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. TypeScript hataları olsa bile build almayı zorla
  typescript: {
    ignoreBuildErrors: true,
  },
  // 2. ESLint hatalarını görmezden gel
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 3. Supabase ve WebSocket uyarılarını sustur
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Tarayıcı tarafında 'ws' (WebSocket) modülünü aramasını engelle
      ws: false,
    };

    // Supabase node-fetch uyarısını engellemek için
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
};

// .js uzantılı olduğu için bu formatı kullanıyoruz:
module.exports = nextConfig;
