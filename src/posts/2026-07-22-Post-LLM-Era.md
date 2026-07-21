---
title: 后 LLM 时代：提效、斩杀线、我们是最后一代、火种计划
tags: 随笔
date: 2026-7-22
img: /images/posts/2026-07-22/cover.png
describe: "LLM 把低能力编码者直接拉到了能参与大型项目的水平线上，也顺手斩断了后来者成为 Human Native Coder 的可能。我们这代人，可能是最后一批触摸到那条边界的人。"
language: cn
---

![后 LLM 时代](/images/posts/2026-07-22/cover.png)

飞机上很适合静下心来写文章，不用担心其他事情打扰，也不会想用 LLM 来偷懒。这应该是今年第一次写纯手工长文，我想写一些关于 AI 的提效与斩杀线的思考。

## 提效

大语言模型能显著提升开发效率。它把编码水平较低的人（我称之为 Low Ability Coder，简称 LCoder）直接拉到能参与大型项目开发的水平线上。于是形成一种清晰的层级：大佬向 LCoder 布置高层任务，LCoder 作为 Human Agent 再指挥 AI Agent 执行具体工作。三级混合系统就此成型——Human 大佬、Human Agent 与 AI Agent 协同，最终落地大佬的产品构想与软件工程。

<svg viewBox="0 0 700 330" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;margin:2.5rem auto;max-width:680px" role="img" aria-label="三级混合系统示意图">
  <rect x="150" y="20" width="400" height="74" rx="18" fill="var(--bg-2)" stroke="var(--accent)" stroke-opacity="0.45" stroke-width="1.5"/>
  <circle cx="187" cy="57" r="17" fill="var(--accent-soft)" stroke="var(--accent)" stroke-opacity="0.5"/>
  <text x="187" y="62" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="var(--accent-ink)" font-weight="600">01</text>
  <text x="220" y="52" font-family="var(--font-sans)" font-size="16" font-weight="600" fill="var(--ink)">Human 大佬</text>
  <text x="220" y="74" font-family="var(--font-sans)" font-size="12.5" fill="var(--ink-3)">产品构想 · 高层任务 · 工程决策</text>
  <path d="M350 98 V120" stroke="var(--ink-4)" stroke-width="1.5"/>
  <path d="M345 119 L350 127 L355 119 Z" fill="var(--ink-4)"/>
  <text x="366" y="117" font-family="var(--font-mono)" font-size="11" fill="var(--ink-3)">下达意图</text>
  <rect x="150" y="128" width="400" height="74" rx="18" fill="var(--bg-2)" stroke="var(--warm-2)" stroke-opacity="0.7" stroke-width="1.5"/>
  <circle cx="187" cy="165" r="17" fill="var(--warm-2)" fill-opacity="0.28" stroke="var(--warm-2)" stroke-opacity="0.7"/>
  <text x="187" y="170" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="var(--ink-2)" font-weight="600">02</text>
  <text x="220" y="160" font-family="var(--font-sans)" font-size="16" font-weight="600" fill="var(--ink)">Human Agent（LCoder）</text>
  <text x="220" y="182" font-family="var(--font-sans)" font-size="12.5" fill="var(--ink-3)">拆解 · 指挥 · 验收</text>
  <path d="M350 206 V228" stroke="var(--ink-4)" stroke-width="1.5"/>
  <path d="M345 227 L350 235 L355 227 Z" fill="var(--ink-4)"/>
  <text x="366" y="225" font-family="var(--font-mono)" font-size="11" fill="var(--ink-3)">下达指令</text>
  <rect x="150" y="236" width="400" height="74" rx="18" fill="var(--bg-2)" stroke="var(--ink-4)" stroke-opacity="0.6" stroke-width="1.5"/>
  <circle cx="187" cy="273" r="17" fill="var(--ink-4)" fill-opacity="0.2" stroke="var(--ink-4)" stroke-opacity="0.6"/>
  <text x="187" y="278" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="var(--ink-2)" font-weight="600">03</text>
  <text x="220" y="268" font-family="var(--font-sans)" font-size="16" font-weight="600" fill="var(--ink)">AI Agent</text>
  <text x="220" y="290" font-family="var(--font-sans)" font-size="12.5" fill="var(--ink-3)">具体编码 · 执行落地</text>
  <path d="M596 28 q10 0 10 10 V150 q0 10 10 10 q-10 0 -10 10 V292 q0 10 -10 10" fill="none" stroke="var(--ink-4)" stroke-opacity="0.55" stroke-width="1.5"/>
  <text transform="translate(646,165) rotate(90)" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="var(--ink-3)">三级混合系统</text>
</svg>

## 斩杀线

人类的成长需要的时间，是 LLM 的数千倍。在某个领域达到超越 LLM 当前 SOTA 水平的人，注定极少。

如果我们以"成长年龄"来量化领域能力，就会出现一个清晰的临界点：假设人类在某领域达到 LLM 水平所需的"年龄"为 35 岁。那么在 LLM 时代（或 AGI 时代）到来之前已经达到这个"年龄"的人，成为「大佬」；而尚未达到的人，则只能选择成为 Human Agent——唯有如此，他们才能最大化发挥自身价值。

大部分人注定未满这个"35 岁"。他们没有在任何一点上超越 LLM 的 SOTA，因此必须放弃 Human Native Coder 的漫长修炼，转而成为 Human Agent。

<svg viewBox="0 0 700 152" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;margin:2.5rem auto;max-width:680px" role="img" aria-label="斩杀线定义公式">
  <rect x="30" y="14" width="640" height="124" rx="20" fill="var(--bg-2)" stroke="var(--glass-border)" stroke-width="1.5"/>
  <rect x="30" y="14" width="4" height="124" rx="2" fill="var(--accent)" fill-opacity="0.6"/>
  <text x="350" y="66" text-anchor="middle" font-family="var(--font-serif)" font-size="29" fill="var(--ink)">
    <tspan font-style="italic">θ</tspan><tspan dx="10">≡</tspan><tspan dx="10" font-style="italic">A</tspan><tspan font-size="15" dy="7">LLM</tspan><tspan dy="-7">(</tspan><tspan font-style="italic">t</tspan><tspan font-size="15" dy="7">0</tspan><tspan dy="-7">)</tspan><tspan dx="12">=</tspan><tspan dx="12" font-style="italic">A</tspan><tspan font-size="15" dy="7">human</tspan><tspan dy="-7">(35)</tspan>
  </text>
  <text x="350" y="106" text-anchor="middle" font-family="var(--font-sans)" font-size="12.5" fill="var(--ink-3)">当人类在某领域成长到相当于「35 岁」时，恰好追平 LLM 在 t₀ 时刻的 SOTA。</text>
  <text x="350" y="126" text-anchor="middle" font-family="var(--font-sans)" font-size="12.5" fill="var(--ink-3)">这条能力水平线，就是斩杀线 θ。</text>
</svg>

<svg viewBox="0 0 700 196" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;margin:2.5rem auto;max-width:680px" role="img" aria-label="角色分流分段函数">
  <rect x="30" y="14" width="640" height="168" rx="20" fill="var(--bg-2)" stroke="var(--glass-border)" stroke-width="1.5"/>
  <rect x="30" y="14" width="4" height="168" rx="2" fill="var(--warm-2)"/>
  <text x="72" y="103" font-family="var(--font-serif)" font-size="25" fill="var(--ink)">
    <tspan font-style="italic">role</tspan><tspan>(</tspan><tspan font-style="italic">i</tspan><tspan>)</tspan><tspan dx="10">=</tspan>
  </text>
  <path d="M212 50 c-11 0 -6 40 -17 48 c11 8 6 48 17 48" fill="none" stroke="var(--ink-2)" stroke-width="1.8" stroke-linecap="round"/>
  <text x="238" y="82" font-family="var(--font-sans)" font-size="15" font-weight="600" fill="var(--ink)">Human Native Coder（大佬）</text>
  <text x="238" y="136" font-family="var(--font-sans)" font-size="15" font-weight="600" fill="var(--ink)">Human Agent</text>
  <text x="470" y="82" font-family="var(--font-serif)" font-size="17" fill="var(--ink-2)">
    <tspan>若 </tspan><tspan font-style="italic">A</tspan><tspan font-size="11" dy="5">i</tspan><tspan dy="-5">(</tspan><tspan font-style="italic">t</tspan><tspan font-size="11" dy="5">0</tspan><tspan dy="-5">) ≥ </tspan><tspan font-style="italic">θ</tspan>
  </text>
  <text x="470" y="136" font-family="var(--font-serif)" font-size="17" fill="var(--ink-2)">
    <tspan>若 </tspan><tspan font-style="italic">A</tspan><tspan font-size="11" dy="5">i</tspan><tspan dy="-5">(</tspan><tspan font-style="italic">t</tspan><tspan font-size="11" dy="5">0</tspan><tspan dy="-5">) &lt; </tspan><tspan font-style="italic">θ</tspan>
  </text>
  <path d="M238 96 H612" stroke="var(--ink-4)" stroke-opacity="0.4" stroke-width="1" stroke-dasharray="4 5"/>
  <text x="238" y="166" font-family="var(--font-sans)" font-size="12" fill="var(--ink-3)">在 t₀ 这一刻的能力存量，一次性决定了此后的身位。</text>
</svg>

这个斩杀机制将持续生效，即时斩断所有试图走 Human Native Coder 道路的可能。这正是人类成长的致命弱点：缓慢、累积、不可逆转。

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;margin:2.5rem auto;max-width:680px" role="img" aria-label="人类成长曲线与 LLM SOTA 曲线的斩杀线示意图">
  <defs>
    <linearGradient id="killZone" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="var(--accent)" stop-opacity="0.02"/>
    </linearGradient>
  </defs>
  <rect x="80" y="40" width="560" height="130" fill="url(#killZone)"/>
  <path d="M80 40 V330 H648" fill="none" stroke="var(--ink-4)" stroke-width="1.5"/>
  <text transform="translate(52,120) rotate(-90)" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="var(--ink-3)">能力 A</text>
  <text x="640" y="352" text-anchor="end" font-family="var(--font-mono)" font-size="12" fill="var(--ink-3)">时间 t</text>
  <path d="M80 170 H640" stroke="var(--ink-2)" stroke-opacity="0.5" stroke-width="1.8" stroke-dasharray="8 7"/>
  <text x="86" y="162" font-family="var(--font-mono)" font-size="12.5" fill="var(--ink-2)" font-weight="600">θ · 斩杀线</text>
  <path d="M430 40 V330" stroke="var(--ink-4)" stroke-opacity="0.7" stroke-width="1.5" stroke-dasharray="5 6"/>
  <text x="430" y="32" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="var(--ink-3)">t₀ · LLM 时代降临</text>
  <path d="M80 316 C 250 310, 370 258, 430 170 C 486 88, 570 60, 640 50" fill="none" stroke="var(--accent)" stroke-width="3.5" stroke-linecap="round"/>
  <text x="628" y="76" text-anchor="end" font-family="var(--font-mono)" font-size="13" fill="var(--accent-ink)" font-weight="600">LLM SOTA</text>
  <path d="M80 308 C 220 254, 330 196, 430 158 C 520 124, 580 106, 640 96" fill="none" stroke="var(--ink-3)" stroke-width="2" stroke-dasharray="7 6" stroke-linecap="round"/>
  <text x="628" y="120" text-anchor="end" font-family="var(--font-sans)" font-size="12" fill="var(--ink-3)">少数已跨线者 · 大佬</text>
  <path d="M80 312 C 210 282, 330 256, 470 242 C 550 235, 600 232, 640 230" fill="none" stroke="var(--warm-2)" stroke-width="3.5" stroke-linecap="round"/>
  <text x="628" y="256" text-anchor="end" font-family="var(--font-sans)" font-size="12" fill="var(--ink-2)">大多数人 · 缓慢累积</text>
  <circle cx="430" cy="170" r="16" fill="var(--accent-soft)"/>
  <circle cx="430" cy="170" r="6" fill="var(--bg)" stroke="var(--accent)" stroke-width="3.5"/>
  <text x="170" y="120" font-family="var(--font-sans)" font-size="12.5" fill="var(--ink-3)">θ 之上：能真正改进 LLM 的区域</text>
  <text x="196" y="300" font-family="var(--font-sans)" font-size="12.5" fill="var(--ink-3)">θ 之下：最优解是成为 Human Agent</text>
</svg>

## 我们是最后一代

其实严格来说，"我们"已经不是了。我在半年前端学习后，便迎来了 LLM 时代的全面降临。此后几乎没有深入钻研过任何一门编程语言的语法细节，离开了 LLM，我已无法独立完成一个像样的项目。Gen Z 早已不是"最后一代"——他们是第一代完全在 LLM 包围中成长的编码者。

而我们这些在 LLM 洪流彻底席卷前尚有少许积累的人，才是真正意义上"最后一代"能够触摸到 Human Native Coder 边界的群体。后来的世代，将彻底失去这条道路。他们生来面对的，是一个已被 LLM 碾压到尘埃的起点，无法再通过人类特有的缓慢成长曲线去追赶或超越。

## 火种计划

人类需要一个火种计划。如果那些已跨越斩杀线的上一辈 Human Coder 选择退出江湖，隐没于 LLM 带来的效率舒适区，那么便再无人能够超越当前的 LLM，更无人能够从根本上改进、迭代或颠覆现有的 AI 体系。

这个火种必须被精心守护。它或许意味着少数人在特定领域坚持"无辅助"的极致修炼，或许是构建某种受控环境，让新一代有机会重现人类智能的自然演化路径，又或许是将核心的思维方法与知识体系以某种持久形式传承下去。只为在未来某刻，当 LLM 展现出其固有瓶颈时，人类仍能点燃那超越之火，延续智能进化的火种。

<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;margin:2.5rem auto;max-width:680px" role="img" aria-label="火种计划示意图">
  <defs>
    <radialGradient id="emberGlow" cx="0.5" cy="0.55" r="0.5">
      <stop offset="0%" stop-color="#F0B24A" stop-opacity="0.55"/>
      <stop offset="70%" stop-color="#E08A3C" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#E08A3C" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="flame" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#D9663C"/>
      <stop offset="55%" stop-color="#E8934A"/>
      <stop offset="100%" stop-color="#F2C65C"/>
    </linearGradient>
  </defs>
  <circle cx="140" cy="150" r="92" fill="none" stroke="var(--ink-4)" stroke-opacity="0.55" stroke-width="1.5" stroke-dasharray="7 8"/>
  <circle cx="140" cy="150" r="66" fill="url(#emberGlow)"/>
  <path d="M140 92 c26 34 38 50 38 74 a38 38 0 0 1 -76 0 c0 -20 14 -32 24 -50 c6 12 10 16 14 22 c2 -18 0 -30 0 -46 Z" fill="url(#flame)"/>
  <path d="M140 150 c11 15 16 22 16 32 a16 16 0 0 1 -32 0 c0 -10 8 -17 16 -32 Z" fill="#FFF3D6" fill-opacity="0.85"/>
  <text x="140" y="272" text-anchor="middle" font-family="var(--font-sans)" font-size="14" font-weight="600" fill="var(--ink)">火种</text>
  <text x="140" y="292" text-anchor="middle" font-family="var(--font-mono)" font-size="11" fill="var(--ink-3)">受控环境 · 精心守护</text>
  <path d="M232 106 C 262 106, 268 74, 296 74" fill="none" stroke="var(--ink-4)" stroke-opacity="0.6" stroke-width="1.5" stroke-dasharray="5 5"/>
  <path d="M234 150 H296" fill="none" stroke="var(--ink-4)" stroke-opacity="0.6" stroke-width="1.5" stroke-dasharray="5 5"/>
  <path d="M232 194 C 262 194, 268 226, 296 226" fill="none" stroke="var(--ink-4)" stroke-opacity="0.6" stroke-width="1.5" stroke-dasharray="5 5"/>
  <rect x="300" y="48" width="340" height="52" rx="16" fill="var(--bg-2)" stroke="var(--glass-border)" stroke-width="1.5"/>
  <text x="322" y="72" font-family="var(--font-sans)" font-size="14" font-weight="600" fill="var(--ink)">无辅助的极致修炼</text>
  <text x="322" y="90" font-family="var(--font-sans)" font-size="11.5" fill="var(--ink-3)">少数人在特定领域坚持不借助 LLM</text>
  <rect x="300" y="124" width="340" height="52" rx="16" fill="var(--bg-2)" stroke="var(--glass-border)" stroke-width="1.5"/>
  <text x="322" y="148" font-family="var(--font-sans)" font-size="14" font-weight="600" fill="var(--ink)">受控的成长环境</text>
  <text x="322" y="166" font-family="var(--font-sans)" font-size="11.5" fill="var(--ink-3)">让新一代重现智能的自然演化路径</text>
  <rect x="300" y="200" width="340" height="52" rx="16" fill="var(--bg-2)" stroke="var(--glass-border)" stroke-width="1.5"/>
  <text x="322" y="224" font-family="var(--font-sans)" font-size="14" font-weight="600" fill="var(--ink)">思维与知识的传承</text>
  <text x="322" y="242" font-family="var(--font-sans)" font-size="11.5" fill="var(--ink-3)">以某种持久形式保存核心方法论</text>
  <path d="M300 296 H640" stroke="var(--warm-2)" stroke-opacity="0.5" stroke-width="1.5" stroke-dasharray="6 6"/>
  <text x="470" y="288" text-anchor="middle" font-family="var(--font-sans)" font-size="12.5" fill="var(--ink-2)">当 LLM 显现出固有瓶颈时，仍有人能点燃那超越之火</text>
</svg>
