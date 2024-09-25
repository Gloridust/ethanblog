---
title: My Four Years of Frontend Career, Obsession with Search Engines
tags: Essay
date: 2024-9-25  
img: /images/posts/2024-09-25/insearch-webui.jpg
describe: From Gleandu to inSearch, my four years of frontend career have always been obsessed with search engines.
language: en
---
Time flies, and it has been four years since I started my journey as a frontend developer. From my first independent frontend project "Gleandu" to my latest project "inSearch," all of them revolve around search engines. It seems that I have always had an obsession with search engines throughout my career: **I am not satisfied with the existing search engine experience and want to bring the ultimate search experience to everyone.**

Google Search needs no introduction. It is the absolute industry benchmark and the most elegant search engine, but unfortunately, it is not accessible in mainland China. Bing is also good, but it still has some ads cluttering the top of the search results. As for Baidu and other domestic search engines, they are not even worth mentioning. They are a piece of shit... My ultimate goal is to create a clean and elegant search engine that can be used by ordinary people in China.

## Product Design

### Gleandu

As the name suggests, it stands for "Clean version of Baidu made by Gloridust." I created it more than two years ago, and it was my first independent project after starting my frontend journey (before that, I had some practice projects, just modifying existing templates). Gleandu mainly served as an aggregator of multiple search engines, providing a clean landing page. However, the search results still redirected to the search engine providers—this was a compromise due to my limited capabilities at that time.

![gleandu-webui](/images/posts/2024-09-25/gleandu-webui.jpg)

The end result of this project was a failure: **it was too ugly**. It was so ugly that I didn't even want to use it myself. Although it solved the problem of the cluttered information flow on the Baidu homepage, it was still **too ugly**: the layout of the search box was distorted, the dropdown list couldn't align properly, and the design style was inconsistent... From both a **technical and design** perspective, it was a failure.

I used it as my Chrome homepage for a year, but I almost always ended up using Google for searching directly through the URL bar. On one hand, my PC and Mac always had Clash running, so I could access Google. On the other hand, the **ugly design** made me lose the desire to use it, despite its functional completeness. Eventually, I completely abandoned this project.

### inSearch

This year, a respectable professor at our university mentioned the fact that "we don't have a decent search engine," which reminded me of my initial project. I realized that the need for an elegant/decent search engine has remained unchanged over the past decade. Now that my technical skills have improved and my UI design abilities have progressed, with the help of LLM, I thought maybe I should give it another try.

I used React/NextJS to build the frontend and backend, and used web crawlers to simulate user requests, avoiding the need to redirect to the original search engine's result page, allowing me to have full control over the user experience. The design follows a minimalist and flat style, which I have always advocated for. The floating navigation bar at the top is also one of my proudest design elements. This way, I created a UI that I would be willing to use myself. Adapting to the user system was a mandatory option, as I believe it is a sign of respect for the operating system design. Therefore, I also adapted it to support dark mode and other features.

![inSearch-webui](/images/posts/2024-09-25/inSearch-webui.jpg)

This way, users can experience search results of the same quality as Google's. However, new problems arose: some search results couldn't be opened.

High-quality websites like Wikipedia are inaccessible to mainland Chinese users, but they are still of high quality. I believe that the accessibility of search results is also one of the criteria for judging the "quality" of a search engine. So, I used Workers to create a "web proxy" feature, which allows some inaccessible high-quality websites to display basic content. Although this reverse proxy method may still cause layout issues and unopenable media files, being unable to access a website is different from its quality—at least you can read the content.

![inSearch-proxy](/images/posts/2024-09-25/inSearch-proxy.jpg)

## Technological Progress

I have to mention the relevant technologies used in these projects. When I built Gleandu more than two years ago, I only knew how to use HTML/CSS/JS, and the tedious code work was extremely boring and painful for developers. Although the code files were few, they were very ugly.

![gleandu-github](/images/posts/2024-09-25/gleandu-github.jpg)

![gleandu-language](/images/posts/2024-09-25/gleandu-language.jpg)

On the other hand, inSearch, thanks to the component-based development of React/NextJS, has highly readable code, making maintenance and updates much easier. The choice of languages and technology stacks also reflects some technological progress: TypeScript, React, NextJS, Workers... These are the powerful tools that helped me create inSearch.

![inSearch-github](/images/posts/2024-09-25/insearch-github.jpg)

![inSearch-language](/images/posts/2024-09-25/insearch-language.jpg)

I used to think that I hadn't made much progress in the past four years, but comparing these two projects, I can see that I have come a long way. I now use inSearch as my daily search engine. It is elegant and decent, and I'm sure you will love it.