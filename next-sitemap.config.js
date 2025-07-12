/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_PRODUCTION_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    generateRobotsTxt: true,
    sitemapSize: 5000,
};