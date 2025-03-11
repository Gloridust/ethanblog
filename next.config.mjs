/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['default', 'cn', 'en'],
    defaultLocale: 'default',
    localeDetection: false,
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