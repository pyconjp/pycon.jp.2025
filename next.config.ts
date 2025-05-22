import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/ja/:path*',
        destination: '/ja/:path*',
      },
      {
        source: '/en/:path*',
        destination: '/en/:path*',
      },
      {
        source: '/:path*',
        destination: '/ja/:path*',
      },
    ];
  },

  reactStrictMode: true,
  output: "standalone",
};

export default nextConfig;
