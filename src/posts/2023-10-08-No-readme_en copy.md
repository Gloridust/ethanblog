---
title: 我不想写 README_en ,所以我写了一个 README_en 自动生成软件：ReadmeTranslator
tags: 技术
date: 2023-10-08
img: /images/posts/2023-10-08/cover.png
describe: 也许，我们不应该把大量的精力放在写文档上面，而是集中精力在开发上面。也许，我们不必每次再写一次英文README文件...
---
## 最近
最近在做一些小东西，开源到了[我的Github](https://github.com/Gloridust)上面。考虑到以后面对国际市场以及国际化的问题，我几乎所有自己开发的项目都需要写英文版文档。可是每次写英文README文件都会花费我不少的时间与精力。正如[Rene](https://rene.wang)所说：我无法把精力集中在开发上。  
所以我想：能不能每次只写中文版README文件，然后自动生成英文版呢？  

## ReadmeTranslator
通过我的不断摸索以及 ChatGPT 的协助（可以看看以前的这篇文章：[解决编程自学痛点：配合 GPT 类大模型高效学习](https://gloridust.xyz/%E6%8A%80%E6%9C%AF/2023/08/24/studywithgpt.html)），我很快完成了这个软件的开发工作。  

![Github](/images/posts/2023-10-08/2.png)

我们在使用时，只需要将它放在和你写的 README.md 文件的相同目录下，当然，你得先安装依赖：
```
    pip3 install setuptools
    pip3 install googletrans==4.0.0-rc1
```
![Github](/images/posts/2023-10-08/3.png)

然后在终端中运行即可：

   ```
   python3 translate.py
   ```

![Github](/images/posts/2023-10-08/5.png)

 由于使用的是 GoogleTranslate 的 API，时间可能会持续 1～3 分钟，完成之后会有提示。

 ## 目前
 目前为止，程序大体能够运行，但是对于文本和代码的区分还有待加强。过几天有空了我再做修改...

最后附上Github 项目地址​：[https://github.com/Gloridust/Readmetranslator](https://github.com/Gloridust/Readmetranslator)

 睡觉！ 
