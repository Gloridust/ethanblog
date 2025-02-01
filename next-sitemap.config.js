/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://isethan.me',
  generateRobotsTxt: true,
  alternateRefs: [
    {
      href: 'https://isethan.me',
      hreflang: 'zh-CN',
    },
    {
      href: 'https://isethan.me/en',
      hreflang: 'en-US',
    },
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://isethan.me/sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*'],
      },
    ],
  },
  exclude: ['/api/*'],
} 