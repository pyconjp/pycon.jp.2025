import type {NextConfig} from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      // ルートへのアクセス：cookie.lang に応じてリダイレクト
      {
        source: '/',
        has: [{ type: 'cookie', key: 'lang', value: 'en' }],
        destination: '/en',
        permanent: false,
      },
      {
        source: '/',
        has: [{ type: 'cookie', key: 'lang', value: 'ja' }],
        destination: '/ja',
        permanent: false,
      },
      {
        source: '/',
        missing: [{ type: 'cookie', key: 'lang' }],
        destination: '/ja',
        permanent: false,
      },

      // サブパスへのアクセス：cookie.lang に応じてパスを変換
      {
        source: '/:path((?!ja$|ja/|en$|en/|public$|public/).+)',
        has: [{ type: 'cookie', key: 'lang', value: 'en' }],
        destination: '/en/:path',
        permanent: false,
      },
      {
        source: '/:path((?!ja$|ja/|en$|en/|public$|public/).+)',
        has: [{ type: 'cookie', key: 'lang', value: 'ja' }],
        destination: '/ja/:path',
        permanent: false,
      },
      {
        source: '/:path((?!ja$|ja/|en$|en/|public$|public/).+)',
        missing: [{ type: 'cookie', key: 'lang' }],
        destination: '/ja/:path',
        permanent: false,
      },
    ];
  },
  reactStrictMode: true,
  output: "standalone",
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
