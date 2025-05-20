import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/:lang(ja|en)/:path*',
        destination: '/:path*?lang=:lang',
      },
    ];
  },

  reactStrictMode: true,
};

export default nextConfig;
