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
  async rewrites() {
    return [
      {
        source: '/api/auth',
        destination: 'https://kode.devkayy.in/api/auth.php',
      },
      {
        source: '/api/blogs',
        destination: 'https://kode.devkayy.in/api/blogs.php',
      },
      {
        source: '/api/projects',
        destination: 'https://kode.devkayy.in/api/projects.php',
      },
      {
        source: '/api/:path*',
        destination: 'https://kode.devkayy.in/api/:path*',
      },
    ]
  },
};

export default nextConfig;
