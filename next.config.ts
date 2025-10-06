import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.upc.edu.pe',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upc-cdn.b-cdn.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
