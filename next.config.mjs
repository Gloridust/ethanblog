/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
  },
  env: {
    TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN,
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
};

export default nextConfig;