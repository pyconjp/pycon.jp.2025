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
        has: [
          {
            type: 'missing',
            key: 'lang',
          },
        ],
        destination: '/ja/:path*',
      },
    ];
  },
};

export default nextConfig;

