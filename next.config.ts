import type {NextConfig} from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
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

const withMDX = createMDX({});

export default withMDX(nextConfig);
