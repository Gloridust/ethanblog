/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
  },
  images: {
    domains: ['image.coolapk.com'], // 添加 image.coolapk.com 域名
  },
};

export default nextConfig;