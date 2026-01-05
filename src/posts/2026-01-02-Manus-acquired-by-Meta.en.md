---
title: "Meta Acquires Manus: Techies Scorn, Investors Fawn?"
tags: Essay
date: 2026-1-2
img: /images/posts/2026-01-02/cover.png
describe: "The biggest news in the tech world at year-end: Meta acquired Manus, the viral AI Agent product, for over $2 billion. In just a few months, it went from a small team with a Chinese background to over $100M ARR and then into the arms of a giant. The speed is breathtaking."
language: en
---

The biggest news in the tech world at year-end is Meta's acquisition of Manus, the viral AI Agent product, for over $2 billion. In just a few months, it evolved from a small project by a team with a Chinese background to surpassing $100 million in ARR, and finally being snatched up by a tech giant. The pace is truly breathtaking.

When I first saw Manus, my reaction was similar to many in the tech community: "Isn't this just a multi-agent system?" A main agent breaks down tasks, sub-agents call tools to execute them, and it retries upon failure. Tokens burn like wildfire, its practicality doesn't quite match OpenAI's Deep Research, and its efficiency is sometimes worse than doing it yourself. Someone in the open-source community even replicated something similar in just a few hours, offering it for free with nearly identical features.

Most tech peers shook their heads: "Too simple. It's a toy that we could easily build ourselves, and perhaps even better." The entry barrier seemed low, with no irreplicable moats.

But then I looked at my friends in investment banking, consulting, and private equity—they were in a completely different state. Their eyes lit up. With just a few natural language prompts, Manus could spit out a logically rigorous, professionally designed PPT or a complete due diligence report. Analysts who usually work 90+ hours a week could finally skip a few all-nighters, no longer staring at screens to fix formatting, or even letting it run while they focused on other things.

Why is the evaluation of the same product so diametrically opposed between these two circles? Behind this lies the greatest cognitive rift of the AI era.

It reminds me of Apple's history. Steve Jobs never obsessed over specs or complexity; he believed that a truly great product hides the complexity, making users feel that "it should be this simple." When the iPhone first launched, who didn't mock it for being just a big screen with one button? Yet, it was this "perceived simplicity" that changed the world.

The story of Manus might just be the "Apple moment" for AI. While the tech world is still competing on model size and benchmarks, the investment world has already seen that what's truly valuable isn't who has the biggest model, but who understands the user's real pain points and helps them get the job done in the most effortless way possible.

![cover](/images/posts/2026-01-02/cover.png)

## Why Did the Financial World Go Crazy?

To understand why Manus exploded in the investment banking, consulting, and PE circles, you first have to look at how grueling their daily lives are.

Analysts average 95 hours a week; at places like Goldman Sachs, many sleep less than 5 hours a day. 70% of their time isn't spent on strategic thinking or closing big deals, but on copy-pasting, formatting, and version control. A traditional report takes 8-12 hours, a PPT deck 4-6 hours, with endless back-and-forth communication and messy versioning. Labor costs run into the millions per year.

Manus arrived and directly liberated them from most of the mechanical work. Take a leasing company as an example: previously, a project manager took 3 days to write a due diligence report; now it takes 1.5 days. With 6,000 reports a year, it saves 9,000 man-days, equivalent to 18 million in costs. A top brokerage firm used a similar tool and saw monthly report production soar from 200 to 1,500, while overtime was slashed by 89%.

It's not just fast; it's professional. It automatically pulls and cleans data, integrates real-time market feeds, and generates multiple versions (roadshow, internal, regulatory). For industries where hourly rates are sky-high and repetitive tasks are abundant, this is a "dimensionality reduction strike."

The tech world looks down on it because our criterion is "how new or difficult the technology is." The investment world doesn't care about that; they only ask: "Can it save time and money while increasing output?" The answer is yes, and that's why they went crazy for it.

## Is it Really That "Simple" Technically?

To be honest, the core architecture of Manus isn't new: it's based on the mature ReAct pattern, multi-agent collaboration, tool calling, and incremental planning. These things have long existed in papers and open-source projects.

But the devil is in the details. The real challenge isn't inventing a new wheel, but polishing the existing one to the point where it runs reliably in real-world scenarios.

Take context management, for example: as agent conversations grow longer, token costs explode. Manus achieved a 10x cost reduction through "hand-crafted" optimizations like extreme KV caching, prompt prefix stabilization, and tool state machines.

Then there's reliability: LLM output is inherently unstable, making testing incredibly difficult. Traditional software has unit tests, but agents are probabilistic and context-sensitive. Manus managed to keep the failure retry rate below 3% through countless architectural refactors, prompt tuning, and engineering accumulation.

And tool integration: 29 tools running in parallel—browser operations, file I/O, code execution... It sounds easy, but the implementation is full of pitfalls. At scale, costs and latency can quickly spiral out of control.

When peers say they can "whip it up in a few days," they're talking about a prototype. Building a commercially viable product that can handle millions of users with controllable token costs has a dauntingly high barrier. On the GAIA benchmark, Manus has already far surpassed similar products from OpenAI. This isn't luck; it's the result of sheer engineering prowess.

Simple? It looks simple on the surface, but underneath are countless unsexy optimizations and trial-and-error. That is the true moat.

## The Resurrection of Apple's Philosophy in the AI Era

Steve Jobs famously said, "Simple can be harder than complex: You have to work hard to get your thinking clean to make it simple."

Manus follows this exact path. It doesn't chase the largest models or stack the flashiest features; it focuses on one thing: letting users speak naturally, and it gets the job done. No manuals, no tedious settings—it feels like hiring a reliable intern.

This is similar to Midjourney: not competing on being the most technically advanced, but on being the most satisfying for the user. With tiered subscriptions and a "low-entry, high-growth" approach, the ecosystem grew organically.

In the AI era, the logic of success has changed. It used to be about DAU and time spent; now it's first about ARR and NRR—how much real money users are willing to pay, and if they're willing to pay more.

Manus hit over $100M ARR in just a few months with an incredibly high NRR because it truly saved users money and earned them time. Speed became its only moat: while others were still obsessing over papers, they had already closed the commercial loop and locked in the users.

![Jobs](/images/posts/2026-01-02/640.png)

## The Eternal Divide Between Tech and Investment Circles

The tech circle asks: Is it new? Is it hard? Is the barrier high?

The investment circle only asks: Is the pain point solved? Is it making money? How big can it scale?

Manus exposes this divide perfectly. Technically "simple," yet commercially ruthless: it precisely targeted the efficiency revolution in finance, monetized quickly, and had capital chasing after it.

VC logic is also shifting: don't look at user data; look at the speed of monetization. Great AI products can reach an NRR of 250%—users don't just renew; they upgrade.

Strategic capital is rising, while pure financial capital is finding it harder to catch the wave. Meta's move is a classic example: instead of waiting for the market to mature, they bought the most proven path.

## Simplicity is the Ultimate Sophistication

Meta's acquisition of Manus isn't the end; it's the signal that the era of AI Agents has truly begun.

It tells us that in the AI wave, the winners are often not those with the largest models or the most complex architectures, but those who understand people best and know how to hide the complexity.

The tech world needs to wake up: stop staring only at papers and benchmarks; the user's pain point is the ultimate judge.

The investment world shouldn't get too carried away either: fast monetization is great, but long-term value still lies in technical depth and ecosystem breadth.

For entrepreneurs, the biggest takeaway is: don't fear simplicity. The real challenge is hiding the complexity so well that users feel, "Wow, it should just work like this."

The future belongs to products that solve the most pressing needs in the most elegant ways.

Manus is just the beginning. Who will create the next Apple moment?
