---
title: "Engineers with Taste > PM + Programmer"
tags: Essay
date: 2026-5-1
img: /images/posts/2026-05-01/cover.png
describe: "Anthropic's Head of PM said it plainly: an engineer with taste is worth more than a PM plus an engineer. It's not that PMs are useless — it's that the concept of fixed job titles is dissolving."
language: en
---

![Cat Wu on Lenny's Podcast](/images/posts/2026-05-01/cover.png)

A few days ago, Lenny's podcast featured Cat Wu — Anthropic's Head of Product Management. She said something that's been stuck in my head ever since:

**An engineer with taste is worth more than a PM plus an engineer.**

Two years ago, the comment section would have exploded. But now, having spent the past year building a startup, I think she nailed it.

## PM + Programmer = Two Half-Products

We all know the traditional product development flow: PM gathers requirements, writes a PRD, draws wireframes; engineers take the spec, write code, ship it. In between are endless rounds of "that's not what I meant" and "that's not technically feasible."

The root problem is **information loss**.

Someone who doesn't understand technical boundaries is defining the product. Someone who doesn't care about user experience is building it. Add them together and you'd expect 1+1, but in practice you get 0.8 at best — because alignment costs, misunderstandings, and information decay are all hidden overhead.

Cat Wu put it more bluntly: the communication friction PMs create during engineering is a **net negative** for the company.

I've felt this firsthand while leading projects at endpage.net. The most productive moments were never when a PM wrote a perfect PRD and handed it off to dev — it was when that one person who understood both the user pain and the code shipped the whole thing from idea to production in a single day. No translation layer. No alignment meetings. No version-control hell.

## Taste Isn't Talent — It's the Result of Caring Consistently

Many people think taste is some mystical gift. It's not. **Taste is your ability to judge what's good and what isn't**, and it comes from caring consistently.

You've seen people who are particular about food — not because they were born with superior taste buds, but because every time they eat something great, they pause and think "why was that good?" Writing code works the same way. Engineers with taste dissect every good interaction they encounter, dogfood every feature they ship, and wince at ugly UI.

That's me. When I built inSearch, I scrapped every design decision from my earlier project Gleandu — not because the features were broken, but because **it was too ugly, so ugly I didn't even want to use it myself**. That gut feeling of "I wouldn't use this" is taste at work.

Same thing with our product YaoheAI. The core functionality came together quickly. But I spent massive amounts of time on conversational UX details: the pacing of AI responses, how probability results were visualized, loading feedback during photo analysis. None of these things appear in any PRD, because no PM would write "please make the loading animation feel reassuring." But users notice.

Steve Jobs once said: "Design is not just what it looks like and feels like. Design is how it works." That's exactly what engineers with taste do — they care about how a product is *experienced*, not just how it's *implemented*.

The data backs this up. AI's coding ability is growing exponentially — SWE-bench Verified (500 real-world GitHub issue resolution tasks) scores went from under 5% in early 2024 to nearly 94% now:

<div style="max-width:680px;margin:1.5rem auto">
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:-apple-system,BlinkMacSystemFont,sans-serif">
  <defs>
    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3b82f6" stop-opacity=".18"/><stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="680" height="320" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="340" y="28" text-anchor="middle" font-size="13" font-weight="700" fill="#1e293b">SWE-bench Verified Score Growth (2024 — 2026)</text>
  <line x1="70" y1="50" x2="70" y2="270" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="270" x2="650" y2="270" stroke="#e2e8f0" stroke-width="1"/>
  <line x1="70" y1="214" x2="650" y2="214" stroke="#f1f5f9" stroke-width="1"/>
  <line x1="70" y1="158" x2="650" y2="158" stroke="#f1f5f9" stroke-width="1"/>
  <line x1="70" y1="102" x2="650" y2="102" stroke="#f1f5f9" stroke-width="1"/>
  <text x="60" y="274" text-anchor="end" font-size="10" fill="#94a3b8">0%</text>
  <text x="60" y="218" text-anchor="end" font-size="10" fill="#94a3b8">25%</text>
  <text x="60" y="162" text-anchor="end" font-size="10" fill="#94a3b8">50%</text>
  <text x="60" y="106" text-anchor="end" font-size="10" fill="#94a3b8">75%</text>
  <text x="60" y="58" text-anchor="end" font-size="10" fill="#94a3b8">100%</text>
  <polygon points="90,262 185,253 280,200 375,170 470,118 565,74 650,55 650,270 90,270" fill="url(#g1)"/>
  <polyline points="90,262 185,253 280,200 375,170 470,118 565,74 650,55" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="90" cy="262" r="4" fill="#3b82f6"/><text x="90" y="256" text-anchor="middle" font-size="9" font-weight="600" fill="#3b82f6">4%</text>
  <circle cx="185" cy="253" r="4" fill="#3b82f6"/><text x="185" y="247" text-anchor="middle" font-size="9" font-weight="600" fill="#3b82f6">8%</text>
  <circle cx="280" cy="200" r="4" fill="#3b82f6"/><text x="280" y="194" text-anchor="middle" font-size="9" font-weight="600" fill="#3b82f6">33%</text>
  <circle cx="375" cy="170" r="4" fill="#3b82f6"/><text x="375" y="164" text-anchor="middle" font-size="9" font-weight="600" fill="#3b82f6">49%</text>
  <circle cx="470" cy="118" r="4" fill="#3b82f6"/><text x="470" y="112" text-anchor="middle" font-size="9" font-weight="600" fill="#3b82f6">72%</text>
  <circle cx="565" cy="74" r="4" fill="#3b82f6"/><text x="565" y="68" text-anchor="middle" font-size="9" font-weight="600" fill="#3b82f6">87.6%</text>
  <circle cx="650" cy="55" r="4" fill="#2563eb"/><text x="650" y="49" text-anchor="middle" font-size="9" font-weight="700" fill="#2563eb">93.9%</text>
  <text x="90" y="288" text-anchor="middle" font-size="9" fill="#94a3b8">2024.01</text>
  <text x="185" y="288" text-anchor="middle" font-size="9" fill="#94a3b8">2024.04</text>
  <text x="280" y="288" text-anchor="middle" font-size="9" fill="#94a3b8">2024.10</text>
  <text x="375" y="288" text-anchor="middle" font-size="9" fill="#94a3b8">2025.01</text>
  <text x="470" y="288" text-anchor="middle" font-size="9" fill="#94a3b8">2025.08</text>
  <text x="565" y="288" text-anchor="middle" font-size="9" fill="#94a3b8">2026.01</text>
  <text x="650" y="288" text-anchor="middle" font-size="9" fill="#94a3b8">2026.04</text>
  <text x="340" y="310" text-anchor="middle" font-size="9" fill="#94a3b8">Source: SWE-bench Leaderboard / Anthropic / OpenAI</text>
</svg>
</div>

From 4% to 93.9% in two years. That means AI's ability to solve real software engineering problems roughly doubles every six months. And that's just coding — design, product, and testing automation are advancing at similar speeds.

## Every "Middle Layer" Is Dying

Cat Wu's point isn't just about PMs. Think deeper: **every role that exists to shuttle information between A and B and reduce comprehension friction is being eaten by AI**.

Front-end is "dead" — Claude Code and Cursor let people with no front-end experience build polished pages. The stuff I build with Claude Code rivals dedicated front-end engineers.

Design is "dead" — Anthropic's Head of Design, Jenny Wen, admitted it herself: designers are no longer "the people who make mockups" but "the people who guard the quality floor."

QA is "dead" — AI writes tests alongside code; manual testing is becoming ceremonial.

Project managers are "dead" — when product cycles compress from six months to one day, what's left for a project manager to manage?

The numbers tell the story clearly:

<div style="max-width:680px;margin:1.5rem auto">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:-apple-system,BlinkMacSystemFont,sans-serif">
  <rect width="680" height="300" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
  <text x="340" y="28" text-anchor="middle" font-size="13" font-weight="700" fill="#1e293b">AI's Impact on Software Industry Roles (2025-2026)</text>
  <rect x="80" y="58" width="410" height="30" rx="4" fill="#3b82f6" opacity=".85"/>
  <text x="500" y="78" font-size="11" font-weight="700" fill="#1e293b">82% of devs use AI weekly</text>
  <rect x="80" y="98" width="300" height="30" rx="4" fill="#60a5fa" opacity=".85"/>
  <text x="390" y="118" font-size="11" font-weight="700" fill="#1e293b">~50% of code is AI-generated</text>
  <rect x="80" y="138" width="270" height="30" rx="4" fill="#8b5cf6" opacity=".85"/>
  <text x="360" y="158" font-size="11" font-weight="700" fill="#1e293b">54% of teams cut junior hiring</text>
  <rect x="80" y="178" width="330" height="30" rx="4" fill="#a855f7" opacity=".85"/>
  <text x="420" y="198" font-size="11" font-weight="700" fill="#1e293b">66% of companies reducing entry roles</text>
  <rect x="80" y="218" width="225" height="30" rx="4" fill="#ec4899" opacity=".85"/>
  <text x="315" y="238" font-size="11" font-weight="700" fill="#1e293b">Google: 25% code AI-assisted</text>
  <rect x="80" y="258" width="175" height="30" rx="4" fill="#f43f5e" opacity=".85"/>
  <text x="265" y="278" font-size="11" font-weight="700" fill="#1e293b">Only 29% of devs trust AI output</text>
</svg>
</div>

82% of developers use AI weekly, but only 29% actually trust its output. That gap is exactly where taste becomes essential. **Everyone can use AI to write code, but only a few can tell whether what AI wrote is actually good.**

The common thread? **Every middle layer exists to ferry information, and AI's core superpower is erasing information gaps.**

This reminds me of what ByteDance was already doing before AI — "More context, less control," making information flow to everyone and shrinking the management middle. What ByteDance achieved with Lark docs and transparent OKRs, AI can now push to the extreme: not just letting everyone *see* information, but letting everyone *digest* it — and even turning information directly into action.

## In the Vibe Coding Era, Taste Is the Only Moat

While running Vibe Coding bootcamps at endpage.net, I noticed a fascinating pattern: when everyone uses Claude Code to write software, the gap between interns with taste and those without is *wider* than it was in the hand-coding era.

Because AI amplifies everything — people with good taste use AI to build better products; people without taste use AI to produce more garbage.

AI can give you ten solutions, but it doesn't know which one *feels* best. It can implement any interaction, but it doesn't know which one is unnecessary. It can generate a page in seconds, but it doesn't know if the whitespace is too much or too little.

**AI makes execution power approach infinity, but taste determines the direction of execution.** The more powerful the tools, the more valuable taste becomes.

## Everyone Is Everyone

Cat Wu also made this observation in the podcast: technological change drives organizational change, and you need to keep switching roles.

Put plainly: **everyone is everyone.**

Before, if you were a PM, you just did PM things — write requirements, track progress, report to stakeholders. Now you need to read code, judge model capabilities, evaluate engineering trade-offs, build prototypes yourself, run user tests, and do all of it within a single day.

This isn't a single job anymore. It's PM + engineer + designer + venture capitalist rolled into one. Every product decision becomes a bet.

Product decisions used to be like driving — the road is fixed, just follow the GPS. Now they're like surfing — the wave is alive, you have to feel where it's surging with your body and stand up before it curls over you. If you're still on shore studying tide tables, the wave is long gone.

**What's dying isn't the "product manager" role — it's the concept of fixed job titles itself.**

## How to Become a Person with Taste

Enough theory. Here's what I actually practice:

**1. Use great products, avoid bad ones.** Your aesthetic is shaped by what you use daily. Spend time with Apple, Linear, Notion, Arc — feel their details. Avoid doomscrolling feeds — they systematically destroy your attention span and aesthetic sensibility.

**2. Be your own user.** After shipping a feature, don't rush to open a PR. Use it ten times first. Ask yourself: if I were opening this app for the first time, would I enjoy this? If not, keep iterating.

**3. Develop the "something's off" instinct.** When you see an interface, an interaction, a line of copy that feels wrong but you can't articulate why — stop and think. Turning that vague discomfort into concrete judgment is taste growing.

**4. Surround yourself with tasteful people.** Taste is contagious. Work with someone who has great taste once, and your standards will be permanently raised. Conversely, if your team operates in a "works, ship it" culture for too long, your taste will atrophy.

**5. Grow alongside the model.** Don't "use" AI as a tool — "coexist" with it as a teammate. Learn its temperament, know its weak spots, figure out when it's reliable and when it's hallucinating. This kind of relationship will reshape your own thinking patterns.

## Don't Settle

Here's a simple litmus test:

**If your job title were erased tomorrow and your badge only showed your name, what would make your team feel they can't do without you?**

Figuring that out is more valuable than reading ten "AI survival guides."

The future belongs to those who define themselves by output, not by title. It's not that a specific role is dying — it's that everyone needs to prove: **your taste and judgment are worth keeping.**

Don't settle. People with taste tend to do just fine.
