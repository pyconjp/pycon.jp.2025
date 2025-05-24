import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ja',
        permanent: false,
      },
      {
        source: '/:path((?!ja$|ja/|en$|en/).+)',
        destination: '/ja/:path',
        permanent: false,
      }
    ];
  },

  reactStrictMode: true,
  output: "standalone",
};

export default nextConfig;
