# EthanBlog

<p align="center">
  <a href="#">
    <img width="180" src="public/favicon.png">
  </a>
</p>
<h2 align="center">EthanBlog</h2>

<div align="center"><p><a href="./README.md">简体中文</a>|<a href="./README_EN.md">English(US)</a></p></div>

EthanBlog is an open-source blog system based on NextJS, using Markdown format. It supports both Chinese and English languages, features a dark mode, and includes **blog, about, and friends** pages. It can be deployed with one click using Vercel.

<p align="center">
    <img src="public/images/preview.png">
</p>

Let me translate this README document to English:

## Features

- 🌍 Bilingual support (Chinese and English)
- 🌓 Adaptive dark mode
- 📱 Responsive design
- 📖 Pagination loading
- 🔍 SEO optimization
- 🖼️ Image lazy loading and optimization
- 💬 Giscus comment system
- 🔗 Social media sharing optimization
- 📊 Article tag categorization
- 🗺️ Automatic Sitemap generation

## Structure

### Blog

- Articles directory: [src/posts/](src/posts/)
- Article images: [public/images/posts/](public/images/posts/)

The Markdown header format is as follows:

```markdown
---
title: My Four Years of Frontend Career, Obsession with Search Engines
tags: Essay
date: 2024-9-25  
img: /images/posts/2024-09-25/inSearch-webui.jpg
describe: From Gleandu to inSearch, my four years of frontend career have always been obsessed with search engines.
language: en
---
```

Chinese articles don't need to fill in `language`, but English articles must specify `language:en` to be properly categorized.

### Homepage Personal Profile

Supports bilingual configuration using JSON files:

- Chinese: [src/locales/cn.json](src/locales/cn.json)
- English: [src/locales/en.json](src/locales/en.json)

These files contain other i18n configurations; for personal profile, only modify `name`, `bio`, and `blogtitle`.

### About

The About page includes the following features:
- Personal profile
- Social media statistics (supports Twitter, Xiaohongshu, etc.)
- Image gallery (supports carousel and preview)
- Message board functionality

Configuration file locations:
- Chinese: [src/content/cn/about.md](src/content/cn/about.md)
- English: [src/content/en/about.md](src/content/en/about.md)

Social media configuration is set in `src/lib/social.ts`.

### Friend Links

Friend links are written in JSON within TSX: [src/pages/friends.tsx](src/pages/friends.tsx), also supporting multiple languages. Format as follows:

```json
[
    {
      "name": "Rene Wang",
      "avatar": "/images/friends/ReneWang.png",
      "description": {
        "cn": "Full-stack development expert, young genius, ...",
        "en": "Full-stack developer, genius, ..."
      },
      "link": "https://rene.wang"
    }
]
```

### SEO Optimization

The blog has built-in SEO optimization features:
- Automatic generation of sitemap.xml and robots.txt
- Complete Open Graph and Twitter Card support
- Structured data (Schema.org) support
- Multilingual SEO optimization
- Image optimization and lazy loading
- Standard HTML5 semantic tags

## Debugging

0. This blog uses yarn for package management. If you don't have yarn, please install it first.

1. Fork the repository and clone it locally:

```bash
git clone https://github.com/Gloridust/ethanblog.git
cd ./ethanblog
```

2. Initialize the project and install required dependencies:

```bash
yarn
```

3. Start debugging:

```bash
yarn dev
```

You can now debug the blog at `localhost:3000` or another available port.

## Environment Variable Configuration

Create a `.env.local` file and add the following configuration:

```env
TWITTER_BEARER_TOKEN=your_twitter_api_token
```

## Deployment

1. We recommend using [Vercel](https://vercel.com/new/) for one-click deployment
2. After deployment, add environment variables in Vercel project settings

## Open Source and Contributions

This project uses the `MIT` license and welcomes all issues and PRs to make this project better!

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- React Markdown
- Giscus
- next-sitemap