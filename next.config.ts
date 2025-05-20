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
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
