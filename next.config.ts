import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kode.devkayy.in',
      },
    ],
  },
};

export default nextConfig;
