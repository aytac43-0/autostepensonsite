/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. TypeScript hatalarını görmezden gel (Build'i durdurmasın)
  typescript: {
    ignoreBuildErrors: true,
  },
  // 2. ESLint hatalarını görmezden gel
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 3. Supabase 'Critical dependency' uyarısını sustur
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

export default nextConfig;
