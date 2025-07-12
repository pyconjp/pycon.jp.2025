// pages/sitemap.xml.ts

export const config = {
  runtime: 'experimental-edge', // Cloudflareで動作させるには必要
};

export default async function handler() {
  const urls = [
    { loc: 'https://example.com/', lastmod: '2024-07-01' },
    { loc: 'https://example.com/about', lastmod: '2024-07-10' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `<url><loc>${url.loc}</loc><lastmod>${url.lastmod}</lastmod></url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}