module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_HOST,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      process.env.NEXT_PUBLIC_HOST + '/server-sitemap.xml',
    ],
  },
}