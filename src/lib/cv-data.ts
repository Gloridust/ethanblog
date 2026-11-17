// Content for /resume and /portfolio, in Chinese and English.
// Contact details and legal names are only sent to the page when the
// visitor has unlocked the resume (see getResumeContact).

export type Lang = 'zh' | 'en'

export const localeToLang = (locale?: string): Lang => (locale === 'en' ? 'en' : 'zh')

// ---------------------------------------------------------------------------
// Contact (sensitive parts masked unless authenticated)
// ---------------------------------------------------------------------------

export interface Contact {
  name: { zh: string; en: string }
  phone: string
  email: string
  emailHref: string
  github: string
  githubHref: string
  links: { label: string; href: string }[]
  school: { zh: string; en: string }
  endpageLegal: { zh: string; en: string }
}

const FULL_CONTACT: Contact = {
  name: { zh: '邹怡翔', en: 'Ethan Zou' },
  phone: '+86 184 2838 9622',
  email: 'ethan@endpage.net',
  emailHref: 'mailto:ethan@endpage.net',
  github: 'github.com/Gloridust',
  githubHref: 'https://github.com/Gloridust',
  links: [
    { label: 'isethan.me', href: 'https://isethan.me' },
    { label: 'x.com/gloridust1024', href: 'https://x.com/gloridust1024' },
  ],
  school: { zh: '宜宾学院', en: 'Yibin University' },
  endpageLegal: { zh: '宜宾熵析云枢网络科技有限责任公司', en: 'Yibin Shangxi Yunshu Network Technology Co., Ltd.' },
}

const MASKED_CONTACT: Contact = {
  name: { zh: '邹**', en: 'Ethan Z.' },
  phone: '+86 184 **** 9622',
  email: 'e***@endpage.net',
  emailHref: '#',
  github: 'github.com/***',
  githubHref: '#',
  links: [{ label: 'isethan.me', href: 'https://isethan.me' }],
  school: { zh: '某省属本科院校', en: 'A public university in Sichuan' },
  endpageLegal: { zh: '****网络科技有限责任公司', en: '**** Network Technology Co., Ltd.' },
}

export const getResumeContact = (authenticated: boolean): Contact =>
  authenticated ? FULL_CONTACT : MASKED_CONTACT

// ---------------------------------------------------------------------------
// Shared building blocks
// ---------------------------------------------------------------------------

export interface Metric { value: string; label: string }

export interface Job {
  org: string
  orgKey?: 'endpage' // legal name filled in from Contact
  href?: string
  role: string
  date: string
  place: string
  summary: string
  bullets: string[]
  stack: string[]
}

export interface OSItem { name: string; href: string; stars?: string; line: string }
export interface Award { year: string; name: string; badge: string }
export interface Paper { title: string; venue: string; note: string }
export interface SkillRow { label: string; items: string }

export interface ResumeContent {
  title: string
  tagline: string
  summary: string
  metrics: Metric[]
  sections: { experience: string; opensource: string; education: string; awards: string; research: string; skills: string }
  jobs: Job[]
  openSource: OSItem[]
  contributions: string
  education: { degree: string; date: string; note: string }
  awards: Award[]
  awardsMore: string
  papers: Paper[]
  ipNote: string
  skills: SkillRow[]
  ui: {
    unlock: string; lock: string; pdf: string; portfolio: string; resume: string; locked: string; enterPw: string
    pwTitle: string; pwDesc: string; pwPlaceholder: string; pwWrong: string; pwNet: string; pwChecking: string
    open: string
  }
}

// ---------------------------------------------------------------------------
// Resume
// ---------------------------------------------------------------------------

const RESUME_ZH: ResumeContent = {
  title: 'AI Native 全栈工程师 · 独立开发者',
  tagline: '从 0 到 1 把 AI 产品做出来、发出去、有人用。',
  summary:
    '2004 年生，数据科学与大数据技术专业在读。远程在出海 AI 公司 Hubitos 做全栈，半年合并 760+ PR，横跨桌面端、Go 后端与运营后台，参与多次生产发版；业余做开源与独立产品，两个项目合计 5,000+ GitHub Stars。习惯用 Claude Code / Codex 等 Agent 工作流把单人产出放大，能独立负责产品、设计、工程到上线的完整链路。',
  metrics: [
    { value: '5k+', label: 'GitHub Stars（开源项目）' },
    { value: '760+', label: 'Hubitos 已合并 PR' },
    { value: '2×', label: 'AdventureX 黑客松一等奖' },
    { value: '2.8k', label: 'X / Twitter 关注者' },
  ],
  sections: { experience: '工作经历', opensource: '开源项目', education: '教育背景', awards: '竞赛与荣誉', research: '学术成果', skills: '技术栈' },
  jobs: [
    {
      org: 'Hubitos',
      href: 'https://hubitos.ai',
      role: '全栈工程师',
      date: '2026.06 — 至今',
      place: '远程',
      summary: '面向东南亚等海外中小卖家与创作者的 AI 电商营销与社媒增长工作台（桌面端 + Web），覆盖选品分析、AI 图文/视频生成、多平台排期发布。',
      bullets: [
        '半年合并 760+ PR，覆盖 Electron 桌面端、Go 后端、Protobuf 服务契约与运营后台四个仓库；多次负责三端生产发版，含迁移演练、热修复分支与灰度开关。',
        'AI 电商视频：多视频模型（Seedance / MiniMax Hailuo / Wan）按需选择与计费报价，主 Agent 规划分镜与脚本，配套 TTS 配音、口型同步、视频翻译、换人物等工具；成片自动审片，发现问题由 Agent 重做。',
        '对话 Agent：接入视频、图片、文档（PDF / Word / PPT）等工具调用，修复提示词缓存失效，断流后自动恢复，长任务可停止与续跑。',
        '创作者任务系统：从发布任务、创作者领取、多平台（X / TikTok / Instagram / YouTube 等）帖子回读核验，到 AI 评分与奖励发放的完整闭环，以及后台运营工具。',
        '统一接入自建 AI 网关，补齐超时、重试、降级与成本记录；为桌面端加入功能云控开关和帮助菜单等增长能力。',
      ],
      stack: ['TypeScript', 'React', 'Electron', 'Go', 'Protobuf', 'PostgreSQL', 'Kubernetes', 'LLM Agent'],
    },
    {
      org: 'Centrol AI',
      href: 'https://app.centrol.ai',
      role: '技术顾问（负责全部技术开发与大部分产品设计）',
      date: '2026.08 — 2026.11',
      place: '远程',
      summary: '由真实 Agency 操盘数据驱动的网红营销 AI Agent 平台：Creator 匹配、建联谈判、Brief 与创意生成、内容审核，关键节点交给真人。',
      bullets: [
        '从零搭建 chat-first 产品：对话是主交互，右侧是该对话的完整工作区，各对话数据隔离；交付面向投资人的可用演示版。',
        '设计 Agent 与创作者之间的异步往返：定时任务驱动状态推进，用户关掉网页也能继续跑；Next.js + Supabase，40+ 次数据库迁移。',
        '独立完成中英双语官网、文档中心、法务页与 Beta NDA 流程。',
      ],
      stack: ['Next.js', 'Supabase', 'PostgreSQL', 'LLM Agent', 'Vercel'],
    },
    {
      org: 'endpage.net',
      orgKey: 'endpage',
      href: 'https://www.endpage.net',
      role: '联合创始人 & CTO',
      date: '2025.06 — 至今',
      place: '四川宜宾',
      summary: '一人公司式的小团队：对外承接企业定制开发，对内孵化并上架自己的独立产品。',
      bullets: [
        '自研 AI Native 产品并上架：摇盒AI（AI 对话 + 概率计算辅助选盒）、TikMy（离线短视频库与本地推荐）、油迹Pro、阅迹Pro。',
        '2025.07 – 2026.07 承接多家企业的定制系统开发，覆盖零售、企业治理与校园场景。',
        '发起 Vibe Coding 实战训练营，以 AI 辅助编程培训校园实习生，结业后直接参与公司项目。',
      ],
      stack: ['Flutter', 'SwiftUI', 'Next.js', 'FastAPI', 'Supabase'],
    },
    {
      org: 'YGeeker',
      role: '联合创始人',
      date: '2024',
      place: '成都',
      summary: '参与创办开源团队 YGeeker，开源并运营在线工具箱 Geekits；负责官网、测试、AI 功能与数据分析。',
      bullets: [],
      stack: [],
    },
  ],
  openSource: [
    { name: '云微 WechatOnCloud', href: 'https://github.com/Gloridust/WechatOnCloud', stars: '4.0k', line: '在 NAS / 服务器上运行服务端微信与浏览器实例，多端浏览器共享同一会话；850+ forks。' },
    { name: 'WowType', href: 'https://github.com/Gloridust/WowType', stars: '1.0k', line: 'Linux / macOS 拼音输入法：整句输入、错键纠正、神经语言模型重排、离线语音、实时互译；发布 11 天破千 Star。' },
    { name: '干饭厨子 GanCook', href: 'https://github.com/Gloridust/GanCook', stars: '100+', line: '可一键部署到 NAS 的家庭点菜系统，单容器 + SQLite，零配置开箱即用。' },
    { name: 'YetEase Music', href: 'https://github.com/Gloridust/YetEaseMusic', line: 'Rust 内核 × Flutter 界面的网易云音乐第三方客户端，覆盖 Linux / Windows / macOS / Android。' },
  ],
  contributions: '上游贡献：LocalSend（i18n 与中文翻译）、2noise/ChatTTS',
  education: { degree: '数据科学与大数据技术 · 本科', date: '2023 — 2027（预计）', note: '' },
  awards: [
    { year: '2025', name: 'AdventureX 黑客松 · 光速光合赛道（MemoirAI 声命体）', badge: '一等奖' },
    { year: '2024', name: 'AdventureX 黑客松 · 3 个赛道', badge: '一等奖' },
    { year: '2025', name: '大学生创新创业训练计划', badge: '国家级立项' },
    { year: '2024', name: '大学生创新创业训练计划', badge: '国家级' },
    { year: '2024', name: '全国大学生数学建模竞赛', badge: '国家三等奖' },
    { year: '2024', name: '全国大学生电工数学建模竞赛', badge: '国家三等奖' },
  ],
  awardsMore: '另有省级奖项 4 项（电子商务三创赛、校园 AI 算法精英赛、计算机设计大赛等）。',
  papers: [
    { title: 'TCGBNet: Tri-branch Conservative Gated Bridge Network for Medical Image Segmentation', venue: 'EAI IoTaaS · 第一作者', note: '在 ISIC 2017/2018 皮肤病灶分割上超过多种主流方法。' },
    { title: 'Urban Housing Price Prediction Based on Spatio-Temporal Attention Mixture of Experts', venue: 'EAI IoTaaS · 第一作者', note: 'R² 0.9936，MAE 较最优基线降低 48%。' },
  ],
  ipNote: '软件著作权 18 项。',
  skills: [
    { label: 'AI / LLM', items: 'Agent 与工具调用设计、RAG、提示词与缓存、LoRA / DPO 微调（Unsloth）、多模态生成（视频 / 图像 / TTS）、本地推理（llama.cpp / Ollama）' },
    { label: '客户端', items: 'React / Next.js、Electron、Flutter、SwiftUI、Tauri、fcitx5 / IMK 输入法' },
    { label: '后端 / 基础设施', items: 'Go、Rust、Python（FastAPI）、Node.js、PostgreSQL、Supabase、Docker、Kubernetes、Linux 运维' },
    { label: '工作方式', items: 'Claude Code / Codex 多 Agent 工作流、GitHub Actions、端到端测试、从需求到上线的独立交付' },
  ],
  ui: {
    unlock: '解锁', lock: '锁定', pdf: '下载 PDF', portfolio: '作品集', resume: '简历', locked: '联系方式等信息已隐藏，', enterPw: '输入密码',
    pwTitle: '查看完整简历', pwDesc: '联系方式等信息已隐藏，请输入密码解锁。', pwPlaceholder: '密码', pwWrong: '密码错误', pwNet: '网络错误', pwChecking: '验证中…',
    open: '查看',
  },
}

const RESUME_EN: ResumeContent = {
  title: 'AI-native Full-stack Engineer · Indie Developer',
  tagline: 'I build AI products from zero to one, ship them, and get them used.',
  summary:
    'Born 2004, undergraduate in Data Science & Big Data. Full-stack engineer (remote) at Hubitos, a global AI commerce startup: 760+ merged PRs in six months across desktop, Go backend and admin, with hands-on production releases. On the side I ship open-source and indie products; two of them have 5,000+ GitHub stars combined. I work with agentic tools (Claude Code, Codex) to own the whole loop from product and design to engineering and launch.',
  metrics: [
    { value: '5k+', label: 'GitHub stars on my projects' },
    { value: '760+', label: 'PRs merged at Hubitos' },
    { value: '2×', label: 'AdventureX hackathon 1st prize' },
    { value: '2.8k', label: 'followers on X' },
  ],
  sections: { experience: 'Experience', opensource: 'Open Source', education: 'Education', awards: 'Awards', research: 'Research', skills: 'Skills' },
  jobs: [
    {
      org: 'Hubitos',
      href: 'https://hubitos.ai',
      role: 'Full-stack Engineer',
      date: 'Jun 2026 — Present',
      place: 'Remote',
      summary: 'An AI workspace for commerce and social growth, used by small sellers and creators in Southeast Asia and beyond: product research, AI images and video, multi-platform scheduling.',
      bullets: [
        'Merged 760+ PRs in six months across the Electron desktop app, Go backend, Protobuf service contracts and admin console; ran several production releases end to end, including migration rehearsals, hotfix branches and feature flags.',
        'AI commerce video: model selection and pricing across Seedance, MiniMax Hailuo and Wan; a director agent that plans shots and scripts; TTS voice-over, lip sync, video translation and presenter swap; automatic review of finished cuts with agent-driven redo.',
        'Chat agent: tool calls for video, image and documents (PDF / Word / PowerPoint), fixed prompt-cache misses, recovery after dropped streams, stoppable and resumable long tasks.',
        'Creator task system: publish a task, creators claim it and post on X / TikTok / Instagram / YouTube, posts are read back and verified, AI scores entries, rewards are paid — plus the ops tooling around it.',
        'Moved all model traffic onto a self-hosted AI gateway with timeouts, retries, fallbacks and cost tracking; added remote feature switches and an in-app help menu to the desktop app.',
      ],
      stack: ['TypeScript', 'React', 'Electron', 'Go', 'Protobuf', 'PostgreSQL', 'Kubernetes', 'LLM agents'],
    },
    {
      org: 'Centrol AI',
      href: 'https://app.centrol.ai',
      role: 'Technical Advisor (built all of the engineering, most of the product design)',
      date: 'Aug 2026 — Nov 2026',
      place: 'Remote',
      summary: 'An AI agent platform for influencer marketing, trained on real agency playbooks: creator matching, outreach and negotiation, briefs and creative, content review, with humans at the key steps.',
      bullets: [
        'Built a chat-first product from scratch: the conversation drives everything, the right pane is that conversation’s full workspace, and each conversation’s data is isolated. Shipped the investor demo.',
        'Designed the asynchronous loop between agents and creators: scheduled jobs advance each campaign even when the browser is closed. Next.js + Supabase, 40+ database migrations.',
        'Built the bilingual marketing site, docs, legal pages and the beta NDA flow.',
      ],
      stack: ['Next.js', 'Supabase', 'PostgreSQL', 'LLM agents', 'Vercel'],
    },
    {
      org: 'endpage.net',
      orgKey: 'endpage',
      href: 'https://www.endpage.net',
      role: 'Co-founder & CTO',
      date: 'Jun 2025 — Present',
      place: 'Yibin, China',
      summary: 'A one-person-company style studio: custom software for businesses on one side, my own indie products on the other.',
      bullets: [
        'Shipped AI-native apps: YaoHe AI (chat plus probability math for blind-box picks), TikMy (offline short-video library with on-device recommendations), FuelTrack Pro, ReadTrace Pro.',
        'Jul 2025 – Jul 2026: delivered custom systems for several companies in retail, corporate governance and campus services.',
        'Started a vibe-coding bootcamp that trains student interns with AI-assisted programming; graduates join company projects directly.',
      ],
      stack: ['Flutter', 'SwiftUI', 'Next.js', 'FastAPI', 'Supabase'],
    },
    {
      org: 'YGeeker',
      role: 'Co-founder',
      date: '2024',
      place: 'Chengdu, China',
      summary: 'Co-founded the open-source team YGeeker and its online toolbox Geekits; worked on the website, testing, AI features and analytics.',
      bullets: [],
      stack: [],
    },
  ],
  openSource: [
    { name: 'WechatOnCloud', href: 'https://github.com/Gloridust/WechatOnCloud', stars: '4.0k', line: 'Run WeChat and browser sessions on your own NAS or server and share one session across browsers. 850+ forks.' },
    { name: 'WowType', href: 'https://github.com/Gloridust/WowType', stars: '1.0k', line: 'A pinyin input method for Linux and macOS: whole-sentence input, typo correction, neural LM reranking, offline voice input, live translation. 1k stars in 11 days.' },
    { name: 'GanCook', href: 'https://github.com/Gloridust/GanCook', stars: '100+', line: 'A family meal-ordering app you deploy to a NAS with one command: single container, SQLite, zero config.' },
    { name: 'YetEase Music', href: 'https://github.com/Gloridust/YetEaseMusic', line: 'A NetEase Cloud Music client with a Rust core and Flutter UI, for Linux, Windows, macOS and Android.' },
  ],
  contributions: 'Upstream: LocalSend (i18n and Chinese translation), 2noise/ChatTTS',
  education: { degree: 'B.Sc. Data Science & Big Data Technology', date: '2023 — 2027 (expected)', note: '' },
  awards: [
    { year: '2025', name: 'AdventureX Hackathon, Lightspeed track (MemoirAI)', badge: '1st prize' },
    { year: '2024', name: 'AdventureX Hackathon, 3 tracks', badge: '1st prize' },
    { year: '2025', name: 'National Undergraduate Innovation Program', badge: 'National' },
    { year: '2024', name: 'National Undergraduate Innovation Program', badge: 'National' },
    { year: '2024', name: 'China Undergraduate Mathematical Contest in Modeling', badge: 'National 3rd' },
    { year: '2024', name: 'National Electrician Mathematical Modeling Contest', badge: 'National 3rd' },
  ],
  awardsMore: 'Plus four provincial awards (e-commerce, campus AI algorithms, computer design).',
  papers: [
    { title: 'TCGBNet: Tri-branch Conservative Gated Bridge Network for Medical Image Segmentation', venue: 'EAI IoTaaS · first author', note: 'Beats several mainstream methods on ISIC 2017/2018 skin-lesion segmentation.' },
    { title: 'Urban Housing Price Prediction Based on Spatio-Temporal Attention Mixture of Experts', venue: 'EAI IoTaaS · first author', note: 'R² 0.9936; MAE 48% lower than the best baseline.' },
  ],
  ipNote: '18 registered software copyrights.',
  skills: [
    { label: 'AI / LLM', items: 'Agent and tool-call design, RAG, prompting and caching, LoRA / DPO fine-tuning (Unsloth), multimodal generation (video, image, TTS), local inference (llama.cpp, Ollama)' },
    { label: 'Client', items: 'React / Next.js, Electron, Flutter, SwiftUI, Tauri, input methods (fcitx5 / IMK)' },
    { label: 'Backend / Infra', items: 'Go, Rust, Python (FastAPI), Node.js, PostgreSQL, Supabase, Docker, Kubernetes, Linux ops' },
    { label: 'How I work', items: 'Multi-agent workflows with Claude Code and Codex, GitHub Actions, end-to-end tests, solo delivery from idea to launch' },
  ],
  ui: {
    unlock: 'Unlock', lock: 'Lock', pdf: 'PDF', portfolio: 'Portfolio', resume: 'Resume', locked: 'Contact details are hidden. ', enterPw: 'Enter password',
    pwTitle: 'View full resume', pwDesc: 'Contact details are hidden. Enter the password to unlock.', pwPlaceholder: 'Password', pwWrong: 'Wrong password', pwNet: 'Network error', pwChecking: 'Checking…',
    open: 'Open',
  },
}

export const RESUME: Record<Lang, ResumeContent> = { zh: RESUME_ZH, en: RESUME_EN }

// ---------------------------------------------------------------------------
// Portfolio
// ---------------------------------------------------------------------------

export interface Project {
  id: string
  name: string
  repo?: string // owner/name, used to fetch live stars
  href: string
  kind: string
  year: string
  pitch: string
  points: string[]
  stack: string[]
  image?: string
  stat?: string // static fallback, e.g. "4.0k ★"
}

export interface Product { name: string; icon: string; line: string; platform: string }

export interface PortfolioContent {
  title: string
  intro: string
  sections: { featured: string; ai: string; work: string; apps: string; research: string }
  featured: Project[]
  more: Project[]
  work: { org: string; href: string; role: string; date: string; line: string }[]
  apps: Product[]
  appsNote: string
  research: Paper[]
  ui: { resume: string; portfolio: string; code: string; site: string; stars: string; forks: string }
}

const IMG = (repo: string, path: string) => `https://raw.githubusercontent.com/Gloridust/${repo}/main/${path}`

const PORTFOLIO_ZH: PortfolioContent = {
  title: '作品集',
  intro: '我最近两年做的开源项目、AI 产品与工作。大多一个人从想法做到上线，代码都在 GitHub。',
  sections: { featured: '代表作', ai: 'AI 与工具', work: '工作中的产品', apps: '已上架的独立产品', research: '研究' },
  featured: [
    {
      id: 'woc', name: '云微 WechatOnCloud', repo: 'Gloridust/WechatOnCloud', href: 'https://github.com/Gloridust/WechatOnCloud',
      kind: '开源 · 自托管', year: '2026', stat: '4.0k ★',
      pitch: '在自己的 NAS / 服务器上运行「服务端微信」，任意设备打开浏览器就能用同一个会话。',
      points: [
        '每个实例是一个容器：Xvfb 虚拟显示 + 官方原版微信或 Chromium，KasmVNC 推流到浏览器，不修改客户端。',
        '自研面板是唯一入口，经 docker.sock 按需创建 / 销毁实例并反向代理，多用户按实例授权。',
        '支持 amd64 / arm64 与 PWA；上线半年 4,000 Star、850+ Fork，有独立的 Telegram 用户群。',
      ],
      stack: ['TypeScript', 'Docker', 'KasmVNC', 'PWA'],
      image: IMG('WechatOnCloud', 'doc/img/Screenshot-1.png'),
    },
    {
      id: 'wowtype', name: 'WowType', repo: 'Gloridust/WowType', href: 'https://github.com/Gloridust/WowType',
      kind: '开源 · AI 输入法', year: '2026', stat: '1.0k ★',
      pitch: '像微信输入法一样顺手的 Linux / macOS 拼音输入法。发布 11 天破千 Star，发布推文 4.2 万浏览。',
      points: [
        'Rust 引擎：整句解码、错键 / 漏键 / 换序纠正、简拼与省略韵母，用户习惯持续学习。',
        '用中文维基 + LCCC 语料训练词级语言模型，再接字级神经语言模型重排候选。',
        '离线语音输入、基于本地翻译模型或自带 API 的中英互译；fcitx5 与 macOS IMK 双外壳，一行命令安装。',
      ],
      stack: ['Rust', 'C++', 'fcitx5', 'Swift', 'N-gram / NNLM'],
      image: IMG('WowType', 'docs/images/candidates.png'),
    },
  ],
  more: [
    {
      id: 'gancook', name: '干饭厨子 GanCook', repo: 'Gloridust/GanCook', href: 'https://github.com/Gloridust/GanCook',
      kind: '开源 · 自托管', year: '2026', stat: '100+ ★',
      pitch: '一条 docker run 部署到 NAS 的家庭点菜系统：自动开饭局、家人点菜、谁做饭谁认领、贡献墙。',
      points: ['菜谱链接导入可选接 LLM 整理', '单容器 + SQLite，网页端一键升级'],
      stack: ['Next.js', 'SQLite', 'Docker'], image: IMG('GanCook', 'doc/img/home.webp'),
    },
    {
      id: 'yetease', name: 'YetEase Music', repo: 'Gloridust/YetEaseMusic', href: 'https://github.com/Gloridust/YetEaseMusic',
      kind: '开源 · 跨平台客户端', year: '2026',
      pitch: 'Rust 原生内核 × Flutter 自绘界面的网易云音乐第三方客户端，播放内核常驻约 16 MB。',
      points: ['Linux / Windows / macOS / Android 车机 / 命令行', '应用内一键更新、边下边播缓存'],
      stack: ['Rust', 'Flutter', 'flutter_rust_bridge'], image: IMG('YetEaseMusic', 'doc/screenshots/now-playing.webp'),
    },
    {
      id: 'openreduce', name: 'OpenReduceAI', repo: 'Gloridust/OpenReduceAI', href: 'https://github.com/Gloridust/OpenReduceAI',
      kind: 'AI · 模型微调', year: '2026',
      pitch: '在单张 12 GB 显卡上微调的中文「去 AI 腔」改写小模型（Qwen3.5-4B + LoRA）。',
      points: ['用 ChatGPT 之前的真人文本构造「AI 润色 → 还原」配对数据', 'SFT 后用多检测器裁判团打分做迭代 DPO'],
      stack: ['Qwen3.5', 'LoRA', 'DPO', 'Unsloth'],
    },
    {
      id: 'augur', name: 'Augur', repo: 'Gloridust/Augur', href: 'https://github.com/Gloridust/Augur',
      kind: 'AI · 浏览器扩展', year: '2026',
      pitch: '会学习的 Chrome 新标签页：预测你接下来要打开什么、整理标签、用端侧 Gemini 对话，数据全在本地。',
      points: ['每次打开 / 聚焦 / 关闭标签都在训练端侧模型', '同一模型驱动置顶、推荐与清理建议'],
      stack: ['TypeScript', 'React', 'Gemini Nano'], image: IMG('Augur', 'public/demo/Screenshot%202026-04-27%20at%2001.11.18.png'),
    },
    {
      id: 'huozi', name: '活字 HuoZi', repo: 'Gloridust/huozi', href: 'https://github.com/Gloridust/huozi',
      kind: 'AI Agent · 黑客松', year: '2026',
      pitch: '社媒运营的 Agent 人才市场：一个 idea 自动写稿、配图、排版、适配 4 个平台并用 computer-use 发布。',
      points: ['创作者的 Agent 在 Injective 链上确权', '被租用时通过 x402 / A2A 结算自动分成'],
      stack: ['TypeScript', 'StepFun', 'Computer Use', 'Injective'], image: IMG('huozi', 'doc/assets/preview.png'),
    },
    {
      id: 'memoir', name: 'MemoirAI 声命体', repo: 'Gloridust/heartnote-diary', href: 'https://github.com/Gloridust/heartnote-diary',
      kind: 'AI · AdventureX 2025 一等奖', year: '2025',
      pitch: 'AI 引导的对话式日记：用说话的方式记录生活，内容上链存证。',
      points: ['语音对话 → 自动成文', '数据上链永久存证'],
      stack: ['Flutter', 'FastAPI', 'LLM', 'Blockchain'],
    },
    {
      id: 'ecopyright', name: '易著 AI', repo: 'Gloridust/eSoftCopyright', href: 'https://github.com/Gloridust/eSoftCopyright',
      kind: 'AI · SaaS', year: '2024', stat: '50+ ★',
      pitch: '给一个题目，自动生成整套软件著作权申请材料。',
      points: ['LLM 生成说明书与代码文档', '在线即用'],
      stack: ['Next.js', 'LLM'],
    },
    {
      id: 'cevit', name: 'CEViT DeepFake Scanner', repo: 'Gloridust/CEViT-DeepFake-Scanner', href: 'https://github.com/Gloridust/CEViT-DeepFake-Scanner',
      kind: 'AI · 计算机视觉', year: '2024',
      pitch: '融合 ConvNeXt、EfficientNet 与 ViT 的 AI 生成人脸检测工具。',
      points: ['多骨干网络集成', '图片级真伪判别'],
      stack: ['PyTorch', 'ViT', 'ConvNeXt'],
    },
  ],
  work: [
    { org: 'Hubitos', href: 'https://hubitos.ai', role: '全栈工程师 · 远程', date: '2026.06 — 至今', line: 'AI 电商营销与社媒增长工作台。负责 AI 电商视频（多模型、分镜 Agent、配音与口型、审片重做）、对话 Agent 工具调用、创作者任务系统，半年合并 760+ PR。' },
    { org: 'Centrol AI', href: 'https://app.centrol.ai', role: '技术顾问', date: '2026.08 — 2026.11', line: '网红营销 AI Agent 平台，从零完成 chat-first 产品、Agent 与创作者的异步往返以及双语官网，负责全部技术开发与大部分产品设计。' },
  ],
  apps: [
    { name: '摇盒AI', icon: 'https://www.endpage.net/products/yaohe-ai.webp', platform: 'Flutter', line: 'AI 对话 + 实时概率计算，拍照分析门店盲盒。' },
    { name: 'TikMy', icon: 'https://www.endpage.net/products/tikmy.webp', platform: 'SwiftUI', line: '离线短视频库，本地推荐算法，完全私密。' },
    { name: '油迹Pro', icon: 'https://www.endpage.net/products/youji-pro.webp', platform: 'SwiftUI', line: '无广告的油耗记录与趋势分析。' },
  ],
  appsNote: '以上由 endpage.net 发布。',
  research: RESUME_ZH.papers,
  ui: { resume: '简历', portfolio: '作品集', code: '代码', site: '网站', stars: 'Stars', forks: 'Forks' },
}

const PORTFOLIO_EN: PortfolioContent = {
  title: 'Portfolio',
  intro: 'Open-source projects, AI products and work from the last two years. Most of it I took from idea to launch on my own; the code is on GitHub.',
  sections: { featured: 'Featured', ai: 'AI & tools', work: 'Products at work', apps: 'Shipped indie apps', research: 'Research' },
  featured: [
    {
      id: 'woc', name: 'WechatOnCloud', repo: 'Gloridust/WechatOnCloud', href: 'https://github.com/Gloridust/WechatOnCloud',
      kind: 'Open source · Self-hosted', year: '2026', stat: '4.0k ★',
      pitch: 'Run WeChat on your own NAS or server and use the same session from any browser, on any device.',
      points: [
        'Each instance is a container: a virtual display plus the official WeChat client or Chromium, streamed to the browser with KasmVNC. The client is never modified.',
        'A custom control panel is the only entry point: it creates and destroys instances through docker.sock, reverse-proxies them, and grants access per instance.',
        'amd64 / arm64 and PWA. 4,000 stars and 850+ forks in six months, with its own Telegram community.',
      ],
      stack: ['TypeScript', 'Docker', 'KasmVNC', 'PWA'],
      image: IMG('WechatOnCloud', 'doc/img/Screenshot-1.png'),
    },
    {
      id: 'wowtype', name: 'WowType', repo: 'Gloridust/WowType', href: 'https://github.com/Gloridust/WowType',
      kind: 'Open source · AI input method', year: '2026', stat: '1.0k ★',
      pitch: 'A pinyin input method for Linux and macOS that feels like WeChat’s. 1,000 stars in 11 days; the launch post reached 42K views.',
      points: [
        'Rust engine: whole-sentence decoding, correction of wrong, missing and swapped keys, abbreviations, and learning from what you pick.',
        'A word-level language model trained on Chinese Wikipedia and LCCC, with a character-level neural LM reranking candidates.',
        'Offline voice input and Chinese↔English translation with a local model or your own API key; fcitx5 and macOS IMK front ends, one-line install.',
      ],
      stack: ['Rust', 'C++', 'fcitx5', 'Swift', 'N-gram / NNLM'],
      image: IMG('WowType', 'docs/images/candidates.png'),
    },
  ],
  more: [
    {
      id: 'gancook', name: 'GanCook', repo: 'Gloridust/GanCook', href: 'https://github.com/Gloridust/GanCook',
      kind: 'Open source · Self-hosted', year: '2026', stat: '100+ ★',
      pitch: 'A family meal planner you deploy to a NAS with one docker run: meals open automatically, everyone orders, whoever cooks claims it.',
      points: ['Recipe-link import, optionally tidied by an LLM', 'Single container + SQLite, one-click upgrade from the web'],
      stack: ['Next.js', 'SQLite', 'Docker'], image: IMG('GanCook', 'doc/img/home.webp'),
    },
    {
      id: 'yetease', name: 'YetEase Music', repo: 'Gloridust/YetEaseMusic', href: 'https://github.com/Gloridust/YetEaseMusic',
      kind: 'Open source · Cross-platform client', year: '2026',
      pitch: 'A NetEase Cloud Music client with a native Rust core and a Flutter UI; the playback core idles at about 16 MB.',
      points: ['Linux, Windows, macOS, Android car units and a CLI', 'In-app updates, play-while-downloading cache'],
      stack: ['Rust', 'Flutter', 'flutter_rust_bridge'], image: IMG('YetEaseMusic', 'doc/screenshots/now-playing.webp'),
    },
    {
      id: 'openreduce', name: 'OpenReduceAI', repo: 'Gloridust/OpenReduceAI', href: 'https://github.com/Gloridust/OpenReduceAI',
      kind: 'AI · Fine-tuning', year: '2026',
      pitch: 'A small Chinese rewriting model that removes the “AI voice”, fine-tuned on a single 12 GB GPU (Qwen3.5-4B + LoRA).',
      points: ['Training pairs built from pre-ChatGPT human text and its AI-polished version', 'SFT, then iterative DPO scored by a panel of detectors'],
      stack: ['Qwen3.5', 'LoRA', 'DPO', 'Unsloth'],
    },
    {
      id: 'augur', name: 'Augur', repo: 'Gloridust/Augur', href: 'https://github.com/Gloridust/Augur',
      kind: 'AI · Browser extension', year: '2026',
      pitch: 'A Chrome new tab that learns: it predicts what you will open next, tidies your tabs and chats via on-device Gemini. Nothing leaves the browser.',
      points: ['Every tab open, focus and dismiss trains an on-device model', 'One model drives pins, suggestions and cleanup hints'],
      stack: ['TypeScript', 'React', 'Gemini Nano'], image: IMG('Augur', 'public/demo/Screenshot%202026-04-27%20at%2001.11.18.png'),
    },
    {
      id: 'huozi', name: 'HuoZi', repo: 'Gloridust/huozi', href: 'https://github.com/Gloridust/huozi',
      kind: 'AI agents · Hackathon', year: '2026',
      pitch: 'A marketplace of social-media agents: one idea becomes a draft, images and layout, adapted for four platforms and posted via computer use.',
      points: ['Creators’ agents are registered on-chain (Injective)', 'Each rental pays the creator via x402 / agent-to-agent settlement'],
      stack: ['TypeScript', 'StepFun', 'Computer use', 'Injective'], image: IMG('huozi', 'doc/assets/preview.png'),
    },
    {
      id: 'memoir', name: 'MemoirAI', repo: 'Gloridust/heartnote-diary', href: 'https://github.com/Gloridust/heartnote-diary',
      kind: 'AI · AdventureX 2025 1st prize', year: '2025',
      pitch: 'A diary you talk to: an AI guides the conversation and writes the entry, stored on-chain.',
      points: ['Voice conversation → finished entry', 'Entries stored on-chain'],
      stack: ['Flutter', 'FastAPI', 'LLM', 'Blockchain'],
    },
    {
      id: 'ecopyright', name: 'eSoftCopyright', repo: 'Gloridust/eSoftCopyright', href: 'https://github.com/Gloridust/eSoftCopyright',
      kind: 'AI · SaaS', year: '2024', stat: '50+ ★',
      pitch: 'Give it a title and it generates the full document set for a Chinese software-copyright filing.',
      points: ['LLM-written manuals and code documents', 'Runs in the browser'],
      stack: ['Next.js', 'LLM'],
    },
    {
      id: 'cevit', name: 'CEViT DeepFake Scanner', repo: 'Gloridust/CEViT-DeepFake-Scanner', href: 'https://github.com/Gloridust/CEViT-DeepFake-Scanner',
      kind: 'AI · Computer vision', year: '2024',
      pitch: 'Detects AI-generated faces with an ensemble of ConvNeXt, EfficientNet and ViT.',
      points: ['Multi-backbone ensemble', 'Image-level real vs. AI verdict'],
      stack: ['PyTorch', 'ViT', 'ConvNeXt'],
    },
  ],
  work: [
    { org: 'Hubitos', href: 'https://hubitos.ai', role: 'Full-stack Engineer · Remote', date: 'Jun 2026 — Present', line: 'AI workspace for commerce and social growth. I work on AI commerce video (multi-model, a director agent, voice-over and lip sync, automatic review and redo), the chat agent’s tools and the creator task system. 760+ PRs merged in six months.' },
    { org: 'Centrol AI', href: 'https://app.centrol.ai', role: 'Technical Advisor', date: 'Aug — Nov 2026', line: 'AI agent platform for influencer marketing. Built the chat-first product, the async loop between agents and creators, and the bilingual site; all of the engineering and most of the product design.' },
  ],
  apps: [
    { name: 'YaoHe AI', icon: 'https://www.endpage.net/products/yaohe-ai.webp', platform: 'Flutter', line: 'Chat plus live probability math; snap a photo to pick a blind box.' },
    { name: 'TikMy', icon: 'https://www.endpage.net/products/tikmy.webp', platform: 'SwiftUI', line: 'An offline short-video library with on-device recommendations.' },
    { name: 'FuelTrack Pro', icon: 'https://www.endpage.net/products/youji-pro.webp', platform: 'SwiftUI', line: 'Ad-free fuel logging and trends.' },
  ],
  appsNote: 'Published by endpage.net.',
  research: RESUME_EN.papers,
  ui: { resume: 'Resume', portfolio: 'Portfolio', code: 'Code', site: 'Site', stars: 'stars', forks: 'forks' },
}

export const PORTFOLIO: Record<Lang, PortfolioContent> = { zh: PORTFOLIO_ZH, en: PORTFOLIO_EN }
