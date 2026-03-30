// All resume data with sensitive/non-sensitive separation.
// Sensitive fields are only populated when authenticated.

export interface ResumeHero {
  name: string
  nameEn: string
  phone: string
  email: string
  emailHref: string
  github: string
  githubHref: string
  websites: string
  websiteLinks: { label: string; href: string }[]
  desc: string
  avatarUrl: string
}

export interface ResumeExpItem {
  title: string
  titleLink?: string
  role: string
  date: string
  paragraphs: string[]
  tags?: { text: string; accent?: boolean }[]
}

export interface ResumeAward {
  year: string
  name: string
  badge: string
  level: string
}

export interface ResumeProject {
  title: string
  sub: string
  icon?: string
  emoji?: string
  gradient?: string
  desc: string
  stack: string[]
}

export interface ResumePaper {
  title: string
  meta: string
  desc: string
}

export interface ResumeSkill {
  color: string
  title: string
  desc: string
  tags: string[]
}

export interface ResumeData {
  isAuthenticated: boolean
  hero: ResumeHero
  experience: ResumeExpItem[]
  skills: ResumeSkill[]
  awards: ResumeAward[]
  projects: ResumeProject[]
  papers: ResumePaper[]
  ipList: string[]
}

// --- Full (authenticated) data ---

const FULL_HERO: ResumeHero = {
  name: '邹怡翔',
  nameEn: 'Ethan Zou',
  phone: '18428389622',
  email: 'ethan@endpage.net',
  emailHref: 'mailto:ethan@endpage.net',
  github: 'github.com/Gloridust',
  githubHref: 'https://github.com/Gloridust',
  websites: 'isethan.me · endpage.net',
  websiteLinks: [
    { label: 'isethan.me', href: 'https://isethan.me' },
    { label: 'endpage.net', href: 'https://www.endpage.net' },
  ],
  desc: 'AI Native 全栈开发者，独立创业者。2004 年生，宜宾学院数据科学与大数据技术专业 2023 级在读。2025 年创办 endpage.net，专注于将 AI 能力深度融入产品设计与工程实践，学术研究和竞赛领域持续输出。',
  avatarUrl: 'https://www.endpage.net/ethan.png',
}

const FULL_EXPERIENCE: ResumeExpItem[] = [
  {
    title: '宜宾熵析云枢网络科技有限责任公司（endpage.net）',
    titleLink: 'https://www.endpage.net',
    role: '联合创始人 & CTO',
    date: '2025.06 — 至今',
    paragraphs: [
      '2025 年 6 月创办 endpage.net，定位 AI Native 产品开发与软件技术服务商。7 月起承接外包业务，先后交付糕三家连锁店无人售货系统、某企业股东投票系统、某高校校园跑管理平台等商业项目。2026 年初布局自研产品线，上线「摇盒AI」「TikMy」「油迹Pro」三款 AI Native 应用及校企共创项目「宜乐生活」。',
      '2026 年 3 月发起面向宜宾学院的 Vibe Coding 实战训练营，招募并培训校园实习生，以 AI 辅助编程为核心进行岗前培训，学员结业后直接加入公司参与企业级开发，实现产教融合闭环。',
    ],
    tags: [
      { text: 'AI Native', accent: true },
      { text: '产品研发', accent: true },
      { text: '软件外包', accent: true },
      { text: '产教融合', accent: true },
      { text: '团队管理' },
    ],
  },
  {
    title: '极云客（成都）科技有限公司（YGeeker）',
    role: '联合创始人 / 股东',
    date: '早期经历',
    paragraphs: [
      '参与创办 YGeeker，在开源领域有一定影响力，开源并运营了在线跨平台工具箱「Geekits」等产品。曾负责官网建设、产品测试、AI 功能开发与数据分析。现已不参与日常运营。',
    ],
  },
]

// --- Masked (public) data ---

const MASKED_HERO: ResumeHero = {
  name: '邹**',
  nameEn: 'Ethan Z.',
  phone: '184****9622',
  email: 'e***@endpage.net',
  emailHref: '#',
  github: 'github.com/***',
  githubHref: '#',
  websites: '***.me · endpage.net',
  websiteLinks: [
    { label: '***.me', href: '#' },
    { label: 'endpage.net', href: 'https://www.endpage.net' },
  ],
  desc: 'AI Native 全栈开发者，独立创业者。2004 年生，某高校数据科学与大数据技术专业在读。2025 年创办 endpage.net，专注于将 AI 能力深度融入产品设计与工程实践，学术研究和竞赛领域持续输出。',
  avatarUrl: 'https://www.endpage.net/ethan.png',
}

const MASKED_EXPERIENCE: ResumeExpItem[] = [
  {
    title: '****网络科技有限责任公司（endpage.net）',
    titleLink: 'https://www.endpage.net',
    role: '联合创始人 & CTO',
    date: '2025.06 — 至今',
    paragraphs: [
      '2025 年 6 月创办 endpage.net，定位 AI Native 产品开发与软件技术服务商。7 月起承接外包业务，先后交付多个商业项目。2026 年初布局自研产品线，上线「摇盒AI」「TikMy」「油迹Pro」三款 AI Native 应用及校企共创项目「宜乐生活」。',
      '2026 年 3 月发起面向某高校的 Vibe Coding 实战训练营，招募并培训校园实习生，以 AI 辅助编程为核心进行岗前培训，学员结业后直接加入公司参与企业级开发，实现产教融合闭环。',
    ],
    tags: [
      { text: 'AI Native', accent: true },
      { text: '产品研发', accent: true },
      { text: '软件外包', accent: true },
      { text: '产教融合', accent: true },
      { text: '团队管理' },
    ],
  },
  {
    title: '****科技有限公司（YGeeker）',
    role: '联合创始人 / 股东',
    date: '早期经历',
    paragraphs: [
      '参与创办 YGeeker，在开源领域有一定影响力，开源并运营了在线跨平台工具箱「Geekits」等产品。曾负责官网建设、产品测试、AI 功能开发与数据分析。现已不参与日常运营。',
    ],
  },
]

// --- Shared (non-sensitive) data ---

const SKILLS: ResumeSkill[] = [
  { color: 'var(--rv-accent)', title: 'AI Native 全栈开发', desc: '以 AI 为核心的全栈开发流程，覆盖移动端、Web 端与后端，深度使用 AI 编程工具。', tags: ['Flutter','SwiftUI','Vite','React','Next.js','FastAPI','Supabase','Claude Code','Cursor','Trae','Codex'] },
  { color: '#8b5cf6', title: 'AI 创意工具应用', desc: '熟悉主流 AI 生成工具，能将创意工具融入产品设计与内容生产流程。', tags: ['即梦','可灵','Suno','Nano Banana','NotebookLM','Capcut'] },
  { color: '#3b82f6', title: '编程语言与框架', desc: '多语言多框架实战，前端到后端到移动端均有完整项目交付。', tags: ['Python','TypeScript','Dart','Swift','C','LangChain','Tailwind'] },
  { color: '#22c55e', title: '运维、AI/ML 与工具链', desc: '独立部署运维，深度学习研究与工程并行，熟练使用设计工具。', tags: ['Linux','Nginx','Docker','YOLO','Ollama','RAG','Figma'] },
]

const AWARDS: ResumeAward[] = [
  { year: '2025', name: 'AdventureX 黑客松 · 光速光合赛道', badge: '一等奖', level: 'gold' },
  { year: '2025', name: '大学生创新创业训练计划', badge: '国家级立项', level: 'national' },
  { year: '2024', name: 'AdventureX 黑客松 · 3 个赛道（奖金价值 10w+）', badge: '一等奖', level: 'gold' },
  { year: '2024', name: '大学生创新创业训练计划', badge: '国家级高水平', level: 'national' },
  { year: '2024', name: '全国大学生电工数学建模竞赛', badge: '国家三等奖', level: 'national' },
  { year: '2024', name: '全国大学生数学建模竞赛', badge: '国家三等奖', level: 'national' },
  { year: '2024', name: '全国大学生电子商务「创新、创意及创业」挑战赛', badge: '省级二等奖', level: 'provincial' },
  { year: '2024', name: '全球校园人工智能算法精英大赛', badge: '四川省三等奖', level: 'provincial' },
  { year: '2024', name: '计算机设计大赛', badge: '四川省三等奖', level: 'provincial' },
  { year: '2024', name: '中国国际创新大赛（互联网+）', badge: '校铜奖', level: 'school' },
]

const PROJECTS: ResumeProject[] = [
  { title: '摇盒AI', sub: '自研产品 · 已上线', icon: 'https://www.endpage.net/products/yaohe-ai.webp', desc: 'AI 对话 + 实时概率计算，门店科学选盒，支持拍照分析与语音输入。', stack: ['Flutter','AI Chat','CV'] },
  { title: 'TikMy', sub: '自研产品 · SwiftUI', icon: 'https://www.endpage.net/products/tikmy.webp', desc: '本地导入、智能分类、沉浸式刷片，完全私密离线的短视频管理。', stack: ['SwiftUI','推荐算法','本地化'] },
  { title: '油迹Pro', sub: '自研产品 · SwiftUI', icon: 'https://www.endpage.net/products/youji-pro.webp', desc: '快速录入、智能油耗计算、可视化趋势，无广告的汽车油耗管理。', stack: ['SwiftUI','可视化','云同步'] },
  { title: '宜乐生活', sub: '校企共创', icon: 'https://www.endpage.net/products/unischool.png', desc: '校园跑与日常跑量运动管理平台。', stack: ['校企合作','双端','运动管理'] },
  { title: 'MemoirAI · 声命体', sub: 'AdventureX 2025 一等奖', emoji: '🎙️', gradient: 'linear-gradient(135deg,#667eea,#764ba2)', desc: 'AI 引导对话式日记，自然语言交互记录生活，数据上链永久存证。', stack: ['Flutter','FastAPI','Blockchain'] },
  { title: 'UnischoolAI · 小智', sub: '校园智能问答', emoji: '🤖', gradient: 'linear-gradient(135deg,#f093fb,#f5576c)', desc: '基于 RAG 架构的校园信息智能检索系统，部署于校内网。', stack: ['Qdrant','BGE-M3','RAG'] },
]

const PAPERS: ResumePaper[] = [
  { title: 'TCGBNet: Tri-branch Conservative Gated Bridge Network for Medical Image Segmentation', meta: 'Zou Y, Zhou X, Yu M, Li C* · EAI IoTaaS 国际会议 · 第一作者', desc: '提出基于 U-Net 的创新分割网络，融合保守三分支增强、动态跨门控桥和多尺度深度卷积，在 ISIC2017/2018 数据集上超越多种主流方法。' },
  { title: 'Urban Housing Price Prediction Based on Spatio-Temporal Attention Mixture of Experts System', meta: 'Zou Y, Zhu Q, Zhu W, Wang Y · EAI IoTaaS 国际会议 · 第一作者', desc: '提出 STAMoE 模型，融合状态空间模型、图注意力网络和自适应混合专家框架，R² 达 0.9936，MAE 较最优基线降低 48%。' },
  { title: 'Improved ResNet-50 for Face Authenticity Detection Based on Attention Mechanism and Feature Pyramid', meta: 'Zhou K, Zou Y, Wang Y, Xue Y · 投稿中 · 第二作者', desc: '改进 ResNet-50 融合 FPN 与通道注意力机制，在自建多源人脸数据集上达 91.9% 准确率，较原模型提升 3.4%。' },
]

const IP_LIST = [
  'TCGBNet 医学图像分割系统','基于时空注意力混合专家的城市房价预测系统',
  '基于 DeiT 视觉注意力的面部情感识别系统','基于 Langchain 的大模型代码处理软件',
  '基于传统数据库的大模型检索增强生成系统','基于机器视觉的电脑标签质量智能检测系统',
  '汽车零件缺陷检测系统','溴化镧探测器能谱自动刻度修正系统',
  'DataViz 数据可视化系统','基于数据可视化的个人财务监管系统',
  '电商数据分析与个性化营销推荐系统','CE-DF-Scanner',
  'BestPet 宠物推荐系统','MailMyNews 新闻邮件系统',
  'ShareScreenNearby','tcctool-plus',
  '熵析云枢订单管理系统','结合 AR/VR 的旅游文创产品体验平台',
]

export function getResumeData(authenticated: boolean): ResumeData {
  return {
    isAuthenticated: authenticated,
    hero: authenticated ? FULL_HERO : MASKED_HERO,
    experience: authenticated ? FULL_EXPERIENCE : MASKED_EXPERIENCE,
    skills: SKILLS,
    awards: AWARDS,
    projects: PROJECTS,
    papers: PAPERS,
    ipList: IP_LIST,
  }
}
