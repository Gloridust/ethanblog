---
title: "The Post-LLM Era: Leverage, the Kill Line, the Last Generation, and the Ember Plan"
tags: Essay
date: 2026-7-22
img: /images/posts/2026-07-22/cover.png
describe: "LLMs pulled low-ability coders straight up to the line where they can contribute to serious projects — and in the same motion, severed the path for anyone who comes after to ever become a Human Native Coder. We may be the last generation to touch that boundary."
language: en
---

![The Post-LLM Era](/images/posts/2026-07-22/cover.png)

A plane is a good place to settle down and write. Nothing interrupts you, and you're not tempted to let an LLM do the work for you. This is probably my first fully hand-written long-form piece this year, and I want to put down some thoughts on what AI does for leverage — and where it draws its kill line.

## Leverage

Large language models dramatically raise development throughput. They pull people with weak coding ability — I call them Low Ability Coders, or LCoders — straight up to the line where they can contribute to large projects. What emerges is a clean hierarchy: the Master hands high-level tasks to the LCoder, and the LCoder, acting as a Human Agent, directs AI Agents to do the concrete work. A three-tier hybrid system takes shape — Human Master, Human Agent, and AI Agent in concert, ultimately shipping the Master's product vision and software engineering.

<svg viewBox="0 0 700 330" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;margin:2.5rem auto;max-width:680px" role="img" aria-label="Diagram of the three-tier hybrid system">
  <rect x="150" y="20" width="400" height="74" rx="18" fill="var(--bg-2)" stroke="var(--accent)" stroke-opacity="0.45" stroke-width="1.5"/>
  <circle cx="187" cy="57" r="17" fill="var(--accent-soft)" stroke="var(--accent)" stroke-opacity="0.5"/>
  <text x="187" y="62" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="var(--accent-ink)" font-weight="600">01</text>
  <text x="220" y="52" font-family="var(--font-sans)" font-size="16" font-weight="600" fill="var(--ink)">Human Master</text>
  <text x="220" y="74" font-family="var(--font-sans)" font-size="12" fill="var(--ink-3)">Product vision · High-level tasks · Engineering calls</text>
  <path d="M350 98 V120" stroke="var(--ink-4)" stroke-width="1.5"/>
  <path d="M345 119 L350 127 L355 119 Z" fill="var(--ink-4)"/>
  <text x="366" y="117" font-family="var(--font-mono)" font-size="11" fill="var(--ink-3)">intent</text>
  <rect x="150" y="128" width="400" height="74" rx="18" fill="var(--bg-2)" stroke="var(--warm-2)" stroke-opacity="0.7" stroke-width="1.5"/>
  <circle cx="187" cy="165" r="17" fill="var(--warm-2)" fill-opacity="0.28" stroke="var(--warm-2)" stroke-opacity="0.7"/>
  <text x="187" y="170" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="var(--ink-2)" font-weight="600">02</text>
  <text x="220" y="160" font-family="var(--font-sans)" font-size="16" font-weight="600" fill="var(--ink)">Human Agent (LCoder)</text>
  <text x="220" y="182" font-family="var(--font-sans)" font-size="12" fill="var(--ink-3)">Decompose · Direct · Review</text>
  <path d="M350 206 V228" stroke="var(--ink-4)" stroke-width="1.5"/>
  <path d="M345 227 L350 235 L355 227 Z" fill="var(--ink-4)"/>
  <text x="366" y="225" font-family="var(--font-mono)" font-size="11" fill="var(--ink-3)">instructions</text>
  <rect x="150" y="236" width="400" height="74" rx="18" fill="var(--bg-2)" stroke="var(--ink-4)" stroke-opacity="0.6" stroke-width="1.5"/>
  <circle cx="187" cy="273" r="17" fill="var(--ink-4)" fill-opacity="0.2" stroke="var(--ink-4)" stroke-opacity="0.6"/>
  <text x="187" y="278" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="var(--ink-2)" font-weight="600">03</text>
  <text x="220" y="268" font-family="var(--font-sans)" font-size="16" font-weight="600" fill="var(--ink)">AI Agent</text>
  <text x="220" y="290" font-family="var(--font-sans)" font-size="12" fill="var(--ink-3)">Write the code · Ship it</text>
  <path d="M596 28 q10 0 10 10 V150 q0 10 10 10 q-10 0 -10 10 V292 q0 10 -10 10" fill="none" stroke="var(--ink-4)" stroke-opacity="0.55" stroke-width="1.5"/>
  <text transform="translate(646,165) rotate(90)" text-anchor="middle" font-family="var(--font-mono)" font-size="11" fill="var(--ink-3)">Three-tier hybrid system</text>
</svg>

## The Kill Line

Human growth takes thousands of times longer than an LLM's. The number of people who will ever exceed the LLM's current SOTA in a given domain is destined to be vanishingly small.

If we quantify domain ability as a "growth age," a sharp threshold appears. Suppose the "age" at which a human reaches LLM-level ability in some field is 35. Then anyone who had already reached that "age" before the LLM era (or the AGI era) arrived becomes a **Master**; anyone who hadn't can only choose to become a **Human Agent** — because that is the only way left to maximize their own value.

Most people are destined to fall short of that "35." They have not surpassed the LLM's SOTA on any single point, so they must abandon the long apprenticeship of the Human Native Coder and become Human Agents instead.

<svg viewBox="0 0 700 152" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;margin:2.5rem auto;max-width:680px" role="img" aria-label="Definition of the kill line">
  <rect x="30" y="14" width="640" height="124" rx="20" fill="var(--bg-2)" stroke="var(--glass-border)" stroke-width="1.5"/>
  <rect x="30" y="14" width="4" height="124" rx="2" fill="var(--accent)" fill-opacity="0.6"/>
  <text x="350" y="66" text-anchor="middle" font-family="var(--font-serif)" font-size="29" fill="var(--ink)">
    <tspan font-style="italic">θ</tspan><tspan dx="10">≡</tspan><tspan dx="10" font-style="italic">A</tspan><tspan font-size="15" dy="7">LLM</tspan><tspan dy="-7">(</tspan><tspan font-style="italic">t</tspan><tspan font-size="15" dy="7">0</tspan><tspan dy="-7">)</tspan><tspan dx="12">=</tspan><tspan dx="12" font-style="italic">A</tspan><tspan font-size="15" dy="7">human</tspan><tspan dy="-7">(35)</tspan>
  </text>
  <text x="350" y="106" text-anchor="middle" font-family="var(--font-sans)" font-size="12.5" fill="var(--ink-3)">When a human grows to the equivalent of &quot;age 35&quot; in a field, they exactly match</text>
  <text x="350" y="126" text-anchor="middle" font-family="var(--font-sans)" font-size="12.5" fill="var(--ink-3)">the LLM&apos;s SOTA at time t₀. That ability level is the kill line θ.</text>
</svg>

<svg viewBox="0 0 700 196" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;margin:2.5rem auto;max-width:680px" role="img" aria-label="Piecewise function assigning roles">
  <rect x="30" y="14" width="640" height="168" rx="20" fill="var(--bg-2)" stroke="var(--glass-border)" stroke-width="1.5"/>
  <rect x="30" y="14" width="4" height="168" rx="2" fill="var(--warm-2)"/>
  <text x="72" y="103" font-family="var(--font-serif)" font-size="25" fill="var(--ink)">
    <tspan font-style="italic">role</tspan><tspan>(</tspan><tspan font-style="italic">i</tspan><tspan>)</tspan><tspan dx="10">=</tspan>
  </text>
  <path d="M212 50 c-11 0 -6 40 -17 48 c11 8 6 48 17 48" fill="none" stroke="var(--ink-2)" stroke-width="1.8" stroke-linecap="round"/>
  <text x="238" y="82" font-family="var(--font-sans)" font-size="15" font-weight="600" fill="var(--ink)">Human Native Coder (Master)</text>
  <text x="238" y="136" font-family="var(--font-sans)" font-size="15" font-weight="600" fill="var(--ink)">Human Agent</text>
  <text x="486" y="82" font-family="var(--font-serif)" font-size="17" fill="var(--ink-2)">
    <tspan>if </tspan><tspan font-style="italic">A</tspan><tspan font-size="11" dy="5">i</tspan><tspan dy="-5">(</tspan><tspan font-style="italic">t</tspan><tspan font-size="11" dy="5">0</tspan><tspan dy="-5">) ≥ </tspan><tspan font-style="italic">θ</tspan>
  </text>
  <text x="486" y="136" font-family="var(--font-serif)" font-size="17" fill="var(--ink-2)">
    <tspan>if </tspan><tspan font-style="italic">A</tspan><tspan font-size="11" dy="5">i</tspan><tspan dy="-5">(</tspan><tspan font-style="italic">t</tspan><tspan font-size="11" dy="5">0</tspan><tspan dy="-5">) &lt; </tspan><tspan font-style="italic">θ</tspan>
  </text>
  <path d="M238 96 H620" stroke="var(--ink-4)" stroke-opacity="0.4" stroke-width="1" stroke-dasharray="4 5"/>
  <text x="238" y="166" font-family="var(--font-sans)" font-size="12" fill="var(--ink-3)">Your ability at the single instant t₀ fixes your standing from then on.</text>
</svg>

This kill mechanism keeps running, cutting down in real time every attempt to walk the Human Native Coder path. That is precisely the fatal weakness of human growth: slow, cumulative, irreversible.

<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;margin:2.5rem auto;max-width:680px" role="img" aria-label="Human growth curve versus LLM SOTA curve, with the kill line">
  <defs>
    <linearGradient id="killZoneEn" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="var(--accent)" stop-opacity="0.02"/>
    </linearGradient>
  </defs>
  <rect x="80" y="40" width="560" height="130" fill="url(#killZoneEn)"/>
  <path d="M80 40 V330 H648" fill="none" stroke="var(--ink-4)" stroke-width="1.5"/>
  <text transform="translate(52,120) rotate(-90)" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="var(--ink-3)">Ability A</text>
  <text x="640" y="352" text-anchor="end" font-family="var(--font-mono)" font-size="12" fill="var(--ink-3)">Time t</text>
  <path d="M80 170 H640" stroke="var(--ink-2)" stroke-opacity="0.5" stroke-width="1.8" stroke-dasharray="8 7"/>
  <text x="86" y="162" font-family="var(--font-mono)" font-size="12.5" fill="var(--ink-2)" font-weight="600">θ · kill line</text>
  <path d="M430 40 V330" stroke="var(--ink-4)" stroke-opacity="0.7" stroke-width="1.5" stroke-dasharray="5 6"/>
  <text x="430" y="32" text-anchor="middle" font-family="var(--font-mono)" font-size="12" fill="var(--ink-3)">t₀ · the LLM era arrives</text>
  <path d="M80 316 C 250 310, 370 258, 430 170 C 486 88, 570 60, 640 50" fill="none" stroke="var(--accent)" stroke-width="3.5" stroke-linecap="round"/>
  <text x="628" y="76" text-anchor="end" font-family="var(--font-mono)" font-size="13" fill="var(--accent-ink)" font-weight="600">LLM SOTA</text>
  <path d="M80 308 C 220 254, 330 196, 430 158 C 520 124, 580 106, 640 96" fill="none" stroke="var(--ink-3)" stroke-width="2" stroke-dasharray="7 6" stroke-linecap="round"/>
  <text x="628" y="120" text-anchor="end" font-family="var(--font-sans)" font-size="12" fill="var(--ink-3)">The few who crossed · Masters</text>
  <path d="M80 312 C 210 282, 330 256, 470 242 C 550 235, 600 232, 640 230" fill="none" stroke="var(--warm-2)" stroke-width="3.5" stroke-linecap="round"/>
  <text x="628" y="256" text-anchor="end" font-family="var(--font-sans)" font-size="12" fill="var(--ink-2)">Most people · slow accrual</text>
  <circle cx="430" cy="170" r="16" fill="var(--accent-soft)"/>
  <circle cx="430" cy="170" r="6" fill="var(--bg)" stroke="var(--accent)" stroke-width="3.5"/>
  <text x="128" y="120" font-family="var(--font-sans)" font-size="12.5" fill="var(--ink-3)">Above θ: you can still improve the LLM</text>
  <text x="128" y="300" font-family="var(--font-sans)" font-size="12.5" fill="var(--ink-3)">Below θ: the optimal move is Human Agent</text>
</svg>

## We Are the Last Generation

Strictly speaking, "we" already aren't. After about half a year of front-end study, the LLM era landed on me in full. Since then I have barely dug into the syntactic depths of any programming language; without an LLM, I can no longer build a decent project on my own. Gen Z stopped being the "last generation" long ago — they are the first generation of coders to grow up entirely surrounded by LLMs.

The rest of us — those who accumulated a little something before the flood swept everything away — are the true "last generation" able to touch the boundary of the Human Native Coder. The generations after us will lose that road entirely. What they're born into is a starting point already ground into dust by LLMs, one they can no longer catch up to or surpass along the uniquely slow human growth curve.

## The Ember Plan

Humanity needs an ember plan. If the previous generation of Human Coders — the ones who already crossed the kill line — chooses to retire from the field and settle into the comfort of LLM-driven efficiency, then no one will be left who can surpass today's LLMs, let alone fundamentally improve, iterate on, or overturn the existing AI order.

This ember has to be carefully guarded. It might mean a small number of people committing to "unassisted" mastery in a chosen domain; it might mean constructing some controlled environment where a new generation gets the chance to retrace the natural evolutionary path of human intelligence; or it might mean passing down the core methods of thought and bodies of knowledge in some durable form. All so that at some future moment, when the LLM reveals its inherent ceiling, humanity can still light the fire that surpasses it, and keep the ember of intelligent evolution alive.

<svg viewBox="0 0 700 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;margin:2.5rem auto;max-width:680px" role="img" aria-label="Diagram of the Ember Plan">
  <defs>
    <radialGradient id="emberGlowEn" cx="0.5" cy="0.55" r="0.5">
      <stop offset="0%" stop-color="#F0B24A" stop-opacity="0.55"/>
      <stop offset="70%" stop-color="#E08A3C" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#E08A3C" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="flameEn" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#D9663C"/>
      <stop offset="55%" stop-color="#E8934A"/>
      <stop offset="100%" stop-color="#F2C65C"/>
    </linearGradient>
  </defs>
  <circle cx="140" cy="150" r="92" fill="none" stroke="var(--ink-4)" stroke-opacity="0.55" stroke-width="1.5" stroke-dasharray="7 8"/>
  <circle cx="140" cy="150" r="66" fill="url(#emberGlowEn)"/>
  <path d="M140 92 c26 34 38 50 38 74 a38 38 0 0 1 -76 0 c0 -20 14 -32 24 -50 c6 12 10 16 14 22 c2 -18 0 -30 0 -46 Z" fill="url(#flameEn)"/>
  <path d="M140 150 c11 15 16 22 16 32 a16 16 0 0 1 -32 0 c0 -10 8 -17 16 -32 Z" fill="#FFF3D6" fill-opacity="0.85"/>
  <text x="140" y="272" text-anchor="middle" font-family="var(--font-sans)" font-size="14" font-weight="600" fill="var(--ink)">The Ember</text>
  <text x="140" y="292" text-anchor="middle" font-family="var(--font-mono)" font-size="11" fill="var(--ink-3)">controlled · carefully guarded</text>
  <path d="M232 106 C 262 106, 268 74, 296 74" fill="none" stroke="var(--ink-4)" stroke-opacity="0.6" stroke-width="1.5" stroke-dasharray="5 5"/>
  <path d="M234 150 H296" fill="none" stroke="var(--ink-4)" stroke-opacity="0.6" stroke-width="1.5" stroke-dasharray="5 5"/>
  <path d="M232 194 C 262 194, 268 226, 296 226" fill="none" stroke="var(--ink-4)" stroke-opacity="0.6" stroke-width="1.5" stroke-dasharray="5 5"/>
  <rect x="300" y="48" width="340" height="52" rx="16" fill="var(--bg-2)" stroke="var(--glass-border)" stroke-width="1.5"/>
  <text x="322" y="72" font-family="var(--font-sans)" font-size="14" font-weight="600" fill="var(--ink)">Unassisted mastery</text>
  <text x="322" y="90" font-family="var(--font-sans)" font-size="11.5" fill="var(--ink-3)">A few who refuse LLM help in a chosen domain</text>
  <rect x="300" y="124" width="340" height="52" rx="16" fill="var(--bg-2)" stroke="var(--glass-border)" stroke-width="1.5"/>
  <text x="322" y="148" font-family="var(--font-sans)" font-size="14" font-weight="600" fill="var(--ink)">A controlled place to grow</text>
  <text x="322" y="166" font-family="var(--font-sans)" font-size="11.5" fill="var(--ink-3)">Let a new generation retrace the natural path</text>
  <rect x="300" y="200" width="340" height="52" rx="16" fill="var(--bg-2)" stroke="var(--glass-border)" stroke-width="1.5"/>
  <text x="322" y="224" font-family="var(--font-sans)" font-size="14" font-weight="600" fill="var(--ink)">Transmission of thought</text>
  <text x="322" y="242" font-family="var(--font-sans)" font-size="11.5" fill="var(--ink-3)">Core methodology preserved in a durable form</text>
  <path d="M300 296 H640" stroke="var(--warm-2)" stroke-opacity="0.5" stroke-width="1.5" stroke-dasharray="6 6"/>
  <text x="470" y="288" text-anchor="middle" font-family="var(--font-sans)" font-size="12.5" fill="var(--ink-2)">So when the LLM hits its ceiling, someone can still light the fire</text>
</svg>
