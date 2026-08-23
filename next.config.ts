import type {NextConfig} from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // 静的エクスポート（out/ に HTML を出力し、nginx から配信する）
  output: "export",
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pretalx.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  // 静的エクスポートでは next.config の redirects が適用されないため、
  // 言語振り分け（/ → /ja）とタイムテーブルのリダイレクトは nginx 側で行う。
  // 設定内容は pyconjp/pyconjp-ansible の
  // roles/nginx/files/etc/nginx/sites-enabled/yyyy.pycon.jp.conf を参照。
  reactStrictMode: true,
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
