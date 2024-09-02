---
title: "I Don't Want to Write README_en, So I Created a README_en Automatic Generation Software: ReadmeTranslator"
tags: Technology
date: 2023-10-08
img: /images/posts/2023-10-08/cover.png
describe: Perhaps, we shouldn't focus a lot of energy on writing documents, but concentrate on development. Maybe, we don't have to write the English README file every time again...
language: en
---
## Recently

Recently, I have been working on some small projects and open-sourced them on [my Github](https://github.com/Gloridust). Considering the future international market and internationalization issues, almost all my self-developed projects require English documentation. However, writing the English README file each time consumes a lot of my time and energy. Just as [Rene](https://rene.wang) said: I can't focus my energy on development.
So I thought: Can I just write the Chinese README file each time and automatically generate the English version?

## ReadmeTranslator

Through my continuous exploration and the assistance of ChatGPT (you can take a look at this previous article: [Solving the Pain Points of Self-study in Programming: Efficient Learning with the Assistance of GPT-like Large Models](https://gloridust.xyz/%E6%8A%80%E6%9C%AF/2023/08/24/studywithgpt.html)), I quickly completed the development of this software.

![Github](/images/posts/2023-10-08/2.png)

When using it, you only need to place it in the same directory as the README.md file you wrote. Of course, you need to install the dependencies first:

```
    pip3 install setuptools
    pip3 install googletrans==4.0.0-rc1
```

![Github](/images/posts/2023-10-08/3.png)

Then run it in the terminal:

   ```
   python3 translate.py
   ```

![Github](/images/posts/2023-10-08/5.png)

Since the API of GoogleTranslate is used, it may take 1 to 3 minutes, and there will be a prompt after completion.

## Currently

So far, the program can generally run, but the distinction between text and code needs to be strengthened. I will make modifications when I have free time in a few days...

Finally, here is the Github project address: [https://github.com/Gloridust/Readmetranslator](https://github.com/Gloridust/Readmetranslator)
Go to sleep!