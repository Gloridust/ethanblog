# EthanBlog

<p align="center">
  <a href="#">
    <img width="180" src="public/favicon.png">
  </a>
</p>
<h2 align="center">EthanBlog</h2>

<div align="center"><p><a href="./README.md">简体中文</a>|<a href="./README_EN.md">English(US)</a></p></div>

EthanBlog 是一套基于 NextJS 的开源博客系统，使用 Markdown 格式，支持 中文/ENG 双语、支持深色模式，具有**博客、关于、友链**页面，使用 Vercel 一键部署。特点包括文章分页加载、SEO 优化、图片优化、社交媒体分享等功能。

<p align="center">
    <img src="public/images/preview.png">
</p>

## 功能特点

- 🌍 中英文双语支持
- 🌓 自适应深色模式
- 📱 响应式设计
- 📖 分页加载
- 🔍 SEO 优化
- 🖼️ 图片懒加载和优化
- 💬 Giscus 评论系统
- 🔗 社交媒体分享优化
- 📊 文章标签分类
- 🗺️ 自动生成 Sitemap

## 结构

### 博客

- 文章目录：[src/posts/](src/posts/)
- 文章图片：[public/images/posts/](public/images/posts/)

其中，Markdown 头部格式如下：

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

中文文章可不填写 `language`，但英文文章必须填写 `language:en`，才能被正常分类。

### 首页个人简介

支持双语，使用 json 文件配置：

- 中文：[src/locales/cn.json](src/locales/cn.json)
- ENG：[src/locales/en.json](src/locales/en.json)

该文件包含其它 i18n 配置，个人简介仅更改 `name`、`bio`、`blogtitle` 即可。

### 关于

关于页面包含以下功能：
- 个人简介
- 社交媒体统计（支持 Twitter、小红书等）
- 图片画廊（支持轮播和预览）
- 留言板功能

配置文件位置：
- 中文：[src/content/cn/about.md](src/content/cn/about.md)
- ENG：[src/content/en/about.md](src/content/en/about.md)

社交媒体配置在 `src/lib/social.ts` 中设置。

### 友链

友链由 tsx 内的 json 编写：[src/pages/friends.tsx](src/pages/friends.tsx)，同样支持多语言。格式如下：

```json
[
    {
      "name": "Rene Wang",
      "avatar": "/images/friends/ReneWang.png",
      "description": {
        "cn": "全栈开发大佬，天才少年，...",
        "en": "Full-stack developer, genius, ..."
      },
      "link": "https://rene.wang"
    }
]
```

### SEO 优化

博客已内置以下 SEO 优化功能：
- 自动生成 sitemap.xml 和 robots.txt
- 完整的 Open Graph 和 Twitter Card 支持
- 结构化数据（Schema.org）支持
- 多语言 SEO 优化
- 图片优化和 lazy loading
- 规范的 HTML5 语义化标签

## 调试

0. 该博客使用 yarn 管理包，如果你没有 yarn，请先下载。

1. Fork 该仓库，并克隆到本地：

```bash
git clone https://github.com/Gloridust/ethanblog.git
cd ./ethanblog
```

2. 初始化项目，下载所需依赖包：

```bash
yarn
```

3. 开始调试：

```bash
yarn dev
```

此时，你可以在 `localhost:3000` 或其它可用端口调试该博客。

## 环境变量配置

创建 `.env.local` 文件，添加以下配置：

```env
TWITTER_BEARER_TOKEN=your_twitter_api_token
```

## 部署

1. 我们建议使用 [Vercel](https://vercel.com/new/) 一键部署
2. 部署后，在 Vercel 项目设置中添加环境变量

## 开源与贡献

该项目采用 `MIT` 开源协议，并且欢迎所有 issue 和 PR，共同将这个项目变得更好！

## 技术栈

- Next.js 14
- TypeScript
- Tailwind CSS
- React Markdown
- Giscus
- next-sitemap
