# EthanBlog

<p align="center">
  <a href="#">
    <img width="180" src="public/favicon.png">
  </a>
</p>
<h2 align="center">EthanBlog</h2>

<div align="center"><p><a href="./README.md">简体中文</a>|<a href="./README_EN.md">English(US)</a></p></div>

EthanBlog 是一套基于 NextJS 的开源博客系统，使用 Markdown 格式，支持 中文/ENG 双语、支持深色模式，具有**博客、关于、友链**页面，使用 Vercel 一键部署。

<p align="center">
    <img src="public/images/preview.png">
</p>

## 结构

### 博客

- 文章目录：[src/posts/](src/posts/)
- 文章图片：[public/images/posts/](public/images/posts/)

其中，Markdown头部格式如下：

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

- 中文：[src/locales/zh.json](src/locales/zh.json)
- ENG：[src/locales/en.json](src/locales/en.json)

该文件包含其它 i18n 配置，个人简介仅更改 `name`、`bio`、`blogtitle` 即可。

### 关于

关于页面由 Markdown 更改，支持中英双语：

- 中文：[src/content/zh/about.md](src/content/zh/about.md)
- ENG：[src/content/en/about.md](src/content/en/about.md)

同时，你也可以更改关于页面的横幅：[public/images/about-banner.jpg](public/images/about-banner.jpg)

### 友链

友链由 tsx 内的 json 编写：[src/pages/friends.tsx](src/pages/friends.tsx)，同样支持多语言。格式如下：

```json
[
    {
      "name": "Rene Wang",
      "avatar": "/images/friends/ReneWang.png",
      "description": {
        "zh": "全栈开发大佬，天才少年，...",
        "en": "Full-stack developer, genius, ..."
      },
      "link": "https://rene.wang"
    },
    {
      "name": "Charles Su",
      "avatar": "/images/friends/CharlesSu.jpg",
      "description": {
        "zh": "乐于折腾，擅长刷机、黑苹果...",
        "en": "Tech enthusiast, expert in custom ROMs, Hackintosh..."
      },
      "link": "https://charles.su"
    },
    {
      "name": "YGeeker",
      "avatar": "/images/friends/YGeeker.png",
      "description": {
        "zh": "创业公司，我在此担任联合创始人",
        "en": "Start-up company. I serve as a co-founder here."
      },
      "link": "https://ygeeker.com"
    },
]
```

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

3. 开始调试

```bash
yarn dev
```

此时，你可以在 `localhost:3000` 或其它可用端口调试该博客。

## 部署

我们建议使用 [Vercel](https://vercel.com/new/) 一键部署。

## 开源与贡献

该项目采用 `MIT` 开源协议，并且欢迎所以 issue 和 PR，共同将这个项目变得更好！