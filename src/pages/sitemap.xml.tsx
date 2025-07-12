// pages/sitemap.xml.tsx
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>https://example.com/sitemap1.xml</loc>
    </sitemap>
  </sitemapindex>`

  res.setHeader('Content-Type', 'application/xml')
  res.write(xml)
  res.end()

  return {
    props: {},
  }
}

export default function SiteMap() {
  return null // レンダリングしない
}