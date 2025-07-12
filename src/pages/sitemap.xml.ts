import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/</loc><lastmod>2024-07-01</lastmod></url>
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(xml);
  res.end();

  return { props: {} }; // 返しても実質使われない
};

export default function Sitemap() {
  // ページ自体は描画されない
  return null;
}
