---
title: 有品味的工程师 > PM + 程序员
tags: 随笔
date: 2026-5-1
img: /images/posts/2026-05-01/cover.png
describe: "Anthropic PM 负责人说了一句话：有 taste 的工程师 > PM + 工程师。不是 PM 没用了，是固定岗位这个概念本身在松动。"
language: cn
---

![Cat Wu on Lenny's Podcast](/images/posts/2026-05-01/cover.png)

三天前 Lenny 的播客更新了一期，嘉宾是 Cat Wu——Anthropic 的 PM 负责人。她说了一句让我反复咀嚼的话：

**有 taste 的工程师，价值大于一个 PM 加一个工程师。**

这句话如果放在两年前，评论区早就炸了。但现在，我觉得她说的就是我过去一年创业里最深的体感。

## PM + 程序员 = 两个半成品

传统的产品开发流程我们都懂：PM 想需求，写 PRD，画原型；程序员接需求，写代码，提交上线。中间夹着无数轮"这不是我想要的"和"这实现不了"。

问题出在**信息损耗**。

一个不懂技术边界的人在定义产品，一个不关心用户体验的人在实现产品。两个人加起来，听着是 1+1，实际上可能连 0.8 都不到——因为中间的对齐成本、理解偏差、信息折损，全是隐性开销。

Cat Wu 说得更狠：PM 在工程构建过程中产生的沟通摩擦，对企业来说是**负资产**。

我在 endpage.net 带团队做项目的时候深有体会。最高效的时刻，从来不是 PM 写了一份完美的 PRD 然后开发照着做——而是那个既懂用户痛点、又能自己把东西做出来的人，在一天之内从想法到上线全部跑通。没有翻译环节，没有对齐会议，没有版本管理地狱。

## 品味不是天赋，是持续在意的结果

很多人以为品味是玄学，其实不是。**品味就是你对"好"和"不好"的判断力**，它来自持续的在意。

你见过有人吃饭很讲究，不是因为天生味觉好，而是每次吃到好吃的都会停下来想"为什么好吃"。写代码也一样——有品味的工程师，每次看到一个好的交互都会拆解它，每次写完一个功能都会自己反复用一遍，看到丑的 UI 就皱眉头。

我自己就是这样。做 inSearch 的时候，推翻了之前做的 Gleandu 的所有设计，不是因为功能不行，而是**太丑了，丑到我自己都不想用**。这种"自己都不想用"的直觉，就是品味在起作用。

再比如做「摇盒AI」，功能其实很快就跑通了。但我花了大量时间在对话体验的细节上：AI 回复的节奏、概率结果的可视化方式、拍照分析时的 loading 反馈。这些东西不会出现在任何 PRD 里，因为没有 PM 会写"请把 loading 动画做得让人感到安心"这种需求。但用户感受得到。

乔布斯说过："设计不是看起来怎么样，设计是它怎么工作的。"有品味的工程师做的就是这件事——他在乎产品怎么被感受，而不只是怎么被实现。

数据不会说谎。AI 的编码能力正在以指数级速度增长——SWE-bench Verified（500 个真实 GitHub issue 修复任务）的得分，从 2024 年初的不到 5%，到现在已经逼近 94%：

<div style="max-width:680px;margin:1.5rem auto">
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:-apple-system,BlinkMacSystemFont,'Noto Sans SC',sans-serif">
  <defs>
    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3b82f6" stop-opacity=".18"/><stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="680" height="320" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="340" y="28" text-anchor="middle" font-size="13" font-weight="700" fill="#1e293b">SWE-bench Verified 得分增长（2024 — 2026）</text>
  <!-- grid -->
  <line x1="70" y1="50" x2="70" y2="270" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="270" x2="650" y2="270" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="214" x2="650" y2="214" stroke="#f1f5f9" stroke-width="1"/>
  <line x1="70" y1="158" x2="650" y2="158" stroke="#f1f5f9" stroke-width="1"/>
  <line x1="70" y1="102" x2="650" y2="102" stroke="#f1f5f9" stroke-width="1"/>
  <!-- Y labels -->
  <text x="60" y="274" text-anchor="end" font-size="10" fill="#94a3b8">0%</text>
  <text x="60" y="218" text-anchor="end" font-size="10" fill="#94a3b8">25%</text>
  <text x="60" y="162" text-anchor="end" font-size="10" fill="#94a3b8">50%</text>
  <text x="60" y="106" text-anchor="end" font-size="10" fill="#94a3b8">75%</text>
  <text x="60" y="58" text-anchor="end" font-size="10" fill="#94a3b8">100%</text>
  <!-- area fill -->
  <polygon points="90,262 185,253 280,200 375,170 470,118 565,74 650,55 650,270 90,270" fill="url(#g1)"/>
  <!-- line -->
  <polyline points="90,262 185,253 280,200 375,170 470,118 565,74 650,55" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- data points -->
  <circle cx="90" cy="262" r="4" fill="#3b82f6"/><text x="90" y="256" text-anchor="middle" font-size="9" font-weight="600" fill="#3b82f6">4%</text>
  <circle cx="185" cy="253" r="4" fill="#3b82f6"/><text x="185" y="247" text-anchor="middle" font-size="9" font-weight="600" fill="#3b82f6">8%</text>
  <circle cx="280" cy="200" r="4" fill="#3b82f6"/><text x="280" y="194" text-anchor="middle" font-size="9" font-weight="600" fill="#3b82f6">33%</text>
  <circle cx="375" cy="170" r="4" fill="#3b82f6"/><text x="375" y="164" text-anchor="middle" font-size="9" font-weight="600" fill="#3b82f6">49%</text>
  <circle cx="470" cy="118" r="4" fill="#3b82f6"/><text x="470" y="112" text-anchor="middle" font-size="9" font-weight="600" fill="#3b82f6">72%</text>
  <circle cx="565" cy="74" r="4" fill="#3b82f6"/><text x="565" y="68" text-anchor="middle" font-size="9" font-weight="600" fill="#3b82f6">87.6%</text>
  <circle cx="650" cy="55" r="4" fill="#2563eb"/><text x="650" y="49" text-anchor="middle" font-size="9" font-weight="700" fill="#2563eb">93.9%</text>
  <!-- X labels -->
  <text x="90" y="288" text-anchor="middle" font-size="9" fill="#94a3b8">2024.01</text>
  <text x="185" y="288" text-anchor="middle" font-size="9" fill="#94a3b8">2024.04</text>
  <text x="280" y="288" text-anchor="middle" font-size="9" fill="#94a3b8">2024.10</text>
  <text x="375" y="288" text-anchor="middle" font-size="9" fill="#94a3b8">2025.01</text>
  <text x="470" y="288" text-anchor="middle" font-size="9" fill="#94a3b8">2025.08</text>
  <text x="565" y="288" text-anchor="middle" font-size="9" fill="#94a3b8">2026.01</text>
  <text x="650" y="288" text-anchor="middle" font-size="9" fill="#94a3b8">2026.04</text>
  <text x="340" y="310" text-anchor="middle" font-size="9" fill="#94a3b8">数据来源：SWE-bench Leaderboard / Anthropic / OpenAI</text>
</svg>
</div>

两年时间，从 4% 到 93.9%。这个增速意味着什么？意味着 AI 解决真实软件工程问题的能力，每 6 个月翻一倍以上。而这只是编码能力——设计、产品、测试的自动化也在以类似的速度推进。

## 所有"中间层"都在死

Cat Wu 的观点其实不只是说 PM。往深了想，**所有"在 A 和 B 之间搬运信息、减少理解摩擦"的岗位，都在被 AI 蚕食**。

前端"已死"——Claude Code 和 Cursor 让不会前端的人也能搓出像样的页面。我自己用 Claude Code 做的东西，效果不比专职前端差。

设计"已死"——Anthropic 的设计负责人 Jenny Wen 自己都承认了，设计师不再是"画图的人"，而是"守住品质底线的人"。

QA"已死"——AI 一边写代码一边跑测试，人工测试正在变成象征性动作。

项目经理"已死"——当产品周期从六个月压缩到一天，你让项目经理管什么？

这不是臆测，数据已经很清楚了：

<div style="max-width:680px;margin:1.5rem auto">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:-apple-system,BlinkMacSystemFont,'Noto Sans SC',sans-serif">
  <rect width="680" height="300" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="340" y="28" text-anchor="middle" font-size="13" font-weight="700" fill="#1e293b">AI 对软件行业各角色的冲击（2025-2026 数据）</text>
  <!-- bars -->
  <rect x="80" y="58" width="410" height="30" rx="4" fill="#dbeafe"/><rect x="80" y="58" width="410" height="30" rx="4" fill="#3b82f6" opacity=".85"/>
  <text x="500" y="78" font-size="11" font-weight="700" fill="#1e293b">82% 开发者每周使用 AI</text>
  <rect x="80" y="98" width="300" height="30" rx="4" fill="#dbeafe"/><rect x="80" y="98" width="300" height="30" rx="4" fill="#60a5fa" opacity=".85"/>
  <text x="390" y="118" font-size="11" font-weight="700" fill="#1e293b">~50% 代码由 AI 生成</text>
  <rect x="80" y="138" width="270" height="30" rx="4" fill="#dbeafe"/><rect x="80" y="138" width="270" height="30" rx="4" fill="#8b5cf6" opacity=".85"/>
  <text x="360" y="158" font-size="11" font-weight="700" fill="#1e293b">54% 团队减少初级工程师招聘</text>
  <rect x="80" y="178" width="330" height="30" rx="4" fill="#dbeafe"/><rect x="80" y="178" width="330" height="30" rx="4" fill="#a855f7" opacity=".85"/>
  <text x="420" y="198" font-size="11" font-weight="700" fill="#1e293b">66% 企业因 AI 减少入门岗</text>
  <rect x="80" y="218" width="225" height="30" rx="4" fill="#dbeafe"/><rect x="80" y="218" width="225" height="30" rx="4" fill="#ec4899" opacity=".85"/>
  <text x="315" y="238" font-size="11" font-weight="700" fill="#1e293b">Google 25% 代码 AI 辅助</text>
  <rect x="80" y="258" width="175" height="30" rx="4" fill="#dbeafe"/><rect x="80" y="258" width="175" height="30" rx="4" fill="#f43f5e" opacity=".85"/>
  <text x="265" y="278" font-size="11" font-weight="700" fill="#1e293b">仅 29% 开发者仍信任 AI 输出</text>
</svg>
</div>

82% 的开发者已经每周使用 AI，但只有 29% 完全信任 AI 的输出——这个差距恰恰说明了品味的价值所在。**人人都能用 AI 写代码，但只有少数人知道 AI 写出来的东西好不好。**

共性是什么？**所有中间层存在的理由是搬运信息，而 AI 的核心能力恰恰就是抹掉信息差。**

这让我想起字节在 AI 之前就在做的事——"More context, less control"，尽一切可能让信息流通，削弱中间管理层。当年字节靠飞书和 OKR 全透明做到的事，现在 AI 能做得更极端：不只是让所有人"看到"信息，而是让所有人"消化"信息，甚至直接把信息变成行动。

## Vibe Coding 时代，品味是唯一护城河

我在 endpage.net 做 Vibe Coding 训练营的时候发现一个很有趣的现象：同样用 Claude Code 写代码，有品味的实习生做出来的东西和没品味的，差距比手写代码时代还大。

因为 AI 放大了一切——好品味的人用 AI 做出更好的产品，没品味的人用 AI 做出更多的垃圾。

AI 能给你十个方案，但它不知道哪个用起来最舒服。它能帮你实现任何交互，但它不知道哪个交互是多余的。它能秒出一个页面，但它不知道这个页面的留白是多了还是少了。

**AI 让执行力趋于无限，但品味决定了执行的方向。** 工具越强，品味越值钱。

## Everyone is Everyone

Cat Wu 在播客里还提到一个判断：科技的变化带来组织的变化，你需要不停地切换身份。

直白点说就是：**everyone is everyone。**

以前你是 PM 就踏踏实实当 PM，活儿很清楚——写需求、盯进度、做汇报。现在不行了，你得能看代码、能判断模型的能力边界、能评估技术方案的性价比、能自己做 prototype、能跑用户测试，还得能在一天之内把这些事全过一遍。

这其实就不是单一岗位的工作了，这是 PM + 工程师 + 设计师 + 风投的工作。每一个产品决策都变成了一次下注。

过去做产品决策像开车——路是固定的，导航照着走就行。现在做产品决策像冲浪——浪是活的，你得用身体去感受它往哪儿涌，然后在它卷过来之前站上去。你要是还在岸上研究潮汐表，浪早就过去了。

**死的不是"产品经理"这个角色，死的是"固定岗位"这个概念本身。**

## 怎么让自己成为有品味的人

说了这么多，聊聊我自己在做的事：

**1. 多用好产品，少用烂产品。** 你的审美被你日常使用的东西塑造。多用 Apple、Linear、Notion、Arc 这类产品，去感受细节。少刷信息流——那东西在系统性地摧毁你的注意力和审美。

**2. 自己做自己的用户。** 写完一个功能，别急着提 PR，先自己用十遍。问自己：如果我是第一次打开这个 App，我会觉得爽吗？如果不会，改到满意为止。

**3. 培养"不舒服"的直觉。** 看到一个界面、一段交互、一行文案，如果觉得哪里不对但说不出来，停下来想一想。把模糊的不适感变成具体的判断力，这就是品味在生长。

**4. 和有品味的人在一起。** 品味是会传染的。和有品味的人合作过一次，你的标准就会永久提高。反过来，如果你的团队长期在"能跑就行"的氛围里，你的品味会慢慢退化。

**5. 跟模型一起成长。** 不要把 AI 当工具去"使用"，把它当队友去"相处"。了解它的脾气，知道它的短板，摸清它什么时候靠谱什么时候会胡说八道。这种相处方式会反过来重塑你自己的思维模式。

## 别凑合

最后说一个检验标准，很简单：

**如果明天你的 title 被抹掉了，工牌上只写一个名字，你还能凭什么让团队觉得少了你不行？**

想清楚这个，比读十篇"AI 时代生存指南"管用多了。

未来属于那些不靠 title 定义自己、而靠 output 定义自己的人。不是某个岗位死了，是所有人都得证明：**你的品味和判断力，值得被留下。**

别凑合。有品味的人，运气不会太差。
