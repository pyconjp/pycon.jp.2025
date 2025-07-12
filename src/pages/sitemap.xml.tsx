import { getMembers, getSponsors } from '@/libs/spreadsheet';
import { GetServerSidePropsContext } from 'next';

async function generateSitemapXml(): Promise<string> {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  const buildTimestamp = new Date().toISOString()
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  xml += `
      <url>
        <loc>https://2025.pycon.jp/</loc>
        <lastmod>${buildTimestamp}</lastmod>
        <changefreq>daily</changefreq>
      </url>
    `;
  xml += `
      <url>
        <loc>https://2025.pycon.jp/members</loc>
        <lastmod>${buildTimestamp}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `;
  xml += `
      <url>
        <loc>https://2025.pycon.jp/sponsors</loc>
        <lastmod>${buildTimestamp}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `;
  xml += `
      <url>
        <loc>https://2025.pycon.jp/coc</loc>
        <lastmod>${buildTimestamp}</lastmod>
        <changefreq>yearly</changefreq>
      </url>
    `;
  // ここでurlを足していく
  const sponsors = await getSponsors();
  const members = await getMembers();
  sponsors.forEach((sponsor) => {
    xml += `
      <url>
        <loc>https://2025.pycon.jp/sponsors/${sponsor.path}</loc>
        <lastmod>${buildTimestamp}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `;
  });
  members.forEach((member) => {
    xml += `
      <url>
        <loc>https://2025.pycon.jp/members/${member.path}</loc>
        <lastmod>${buildTimestamp}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `;
  });
  xml += `</urlset>`;
  return xml;
}

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const xml = await generateSitemapXml(); // xmlコードを生成する処理（後で書く）

  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // 24時間のキャッシュ
  res.setHeader('Content-Type', 'application/xml');
  res.write(xml)
  res.end();

  return {
    props: {},
  };
};

const Page = () => null;
export default Page;

export const runtime = 'experimental-edge';