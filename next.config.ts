import type {NextConfig} from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      /*
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
        port: '',
        pathname: '/**',
      },
      */
      {
        protocol: 'https',
        hostname: 'pretalx.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      // タイムテーブルのリダイレクト
      {
        source: '/ja/timetable',
        destination: '/ja/timetable/day1',
        permanent: true,
      },
      {
        source: '/en/timetable',
        destination: '/en/timetable/day1',
        permanent: true,
      },
      
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
        source: '/:path((?!_next/|api/|ja$|ja/|en$|en/|common$|common/|sitemap.*\.xml$|robots.txt$).+)',
        has: [{ type: 'cookie', key: 'lang', value: 'en' }],
        destination: '/en/:path',
        permanent: false,
      },
      {
        source: '/:path((?!_next/|api/|ja$|ja/|en$|en/|common$|common/|sitemap.*\.xml$|robots.txt$).+)',
        has: [{ type: 'cookie', key: 'lang', value: 'ja' }],
        destination: '/ja/:path',
        permanent: false,
      },
      {
        source: '/:path((?!_next/|api/|ja$|ja/|en$|en/|common$|common/|sitemap.*\.xml$|robots.txt$).+)',
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
