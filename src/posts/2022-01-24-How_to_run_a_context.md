---
title: 如何创建一个网络文案馆？频道+网页  
tags: 技术
date: 2022-1-24
img: /images/posts/2022-01-24/3762306_a9d119d0_1200_2482_418@1080x485.jpeg
describe: 如何经营一个文案馆？频道+网页。我能不能也开一家文案馆呢？(正好把我写了一年的网抑云小本本拿出来用)
---

![image.png](/images/posts/2022-01-24/3762306_a9d119d0_1200_2482_418@1080x485.jpeg)  
前段时间看到初恋转发了一个微信公众号的文章，进去看了看原来是类似于文案馆的地方。于是，时常emo的我就想：我能不能也开一家文案馆呢？(正好把我写了一年的网抑云小本本拿出来用)
本文链接都放在末尾.  
![image.png](/images/posts/2022-01-24/3762306_8a8a6748_1201_3967_899@1079x613.png.m.jpg)  

于是我尝试在蓝色🛫软件开了家文案频道。(至于为什么不在微信，是因为限制比较多，而且操作不太方便)  
![image.png](/images/posts/2022-01-24/3762306_6dfd1337_1201_4079_192@1080x2205.jpeg.m.jpg)  

我更喜欢的是频道功能的设计，想在群聊内发消息一样方便，可以随时编辑，还有定时消息，很方便的评论功能和followers互动。  
![image.png](/images/posts/2022-01-24/3762306_eff0e6b6_1201_4128_377@981x1219.png.m.jpg)  
接下来就到了网页的实现。为了保证风格与(wo)频(ji)道(shu)一(bu)致(xing)，信息页面我直接运用了频道软件的导出功能，导出为html后直接挂上去，在头部尾部稍作修改，添加几个跳转按钮就ok了。  
![image.png](/images/posts/2022-01-24/3762306_808b8c8d_1201_4138_350@477x622.png.m.jpg)  
![image.png](/images/posts/2022-01-24/3762306_c45762fb_1201_4146_118@1920x1080.png.m.jpg)  
之后便是主页。本来不准备做主页，但是为了在URL结尾自动加上一个#bottle标签让它进入网页自动跳到最新，就做了一个，正好让网页显得正式一点。
主页是借鉴的html5up的模板。这个模板网站强烈安利，免费又漂亮。（网址统一放结尾）  
![image.png](/images/posts/2022-01-24/3762306_c45762fb_1201_4146_118@1920x1080.png.m.jpg)  
然后为了在软件频道和网站内相互推广，我。分别在频道设置了置顶以及网站内设置了频道加入链接。
之后就是网页上线的问题。这里静态网页托管服务用的是github page，省时省力不用担心服务器，专心运营网页还免费。
域名用的是免费的.tk域名，只不过注册流程比较麻烦。freenom官方为了防止恶意注册审查机制很严（指注册时IP地址的校对以及个人信息填写等）。
随后把名称服务器设置成了cloudflare的反向代理CDN服务。一是因为freenom官方网页审查确实太苛刻了，中途更换IP都要重新登录，而且还很卡；二是考虑到域名备案的原因，如果不反向代理很可能出现无法访问的问题。阿里腾讯等域名如果无法访问也可以通过这个解决。  
![image.png](/images/posts/2022-01-24/3762306_99bddeef_1201_417_981@1920x743.png.m.jpg)  
有了cloudflare提供反向代理，我们还可以实现更多有意思的功能。比如，通过识别用户标识UA来实现pc端和移动端不同壁纸适配。这可以通过cloudflare规则功能实现，规则内容放下面。  
![image.png](/images/posts/2022-01-24/3762306_d64b0832_1201_4179_837@1305x523.png.m.jpg)  
![image.png](/images/posts/2022-01-24/3762306_7dd4129a_1201_4188_639@1007x723.png.m.jpg)  
不一样的背景：  
![image.png](/images/posts/2022-01-24/3762306_f587d51d_1206_5607_64@1080x2340.jpeg.m.jpg)  
![image.png](/images/posts/2022-01-24/3762306_26b0ba37_1206_5615_538@1920x1080.jpeg.m.jpg)  
大概就写到这儿了吧，不清楚的可以在[酷安](https://www.coolapk.com/feed/33069243?shareKey=NGFjOTg5NjBlOWJiNjFmMTYyZDQ~&shareUid=3762306&shareFrom=com.coolapk.market_12.0.1)留言哦
* * *   
相关资源：    
[主页模板](https://html5up.net/)  
[免费域名](https://my.freenom.com/)  
[反向代理](https://dash.cloudflare.com/)  
[文案馆](https://wannarains.tk/)  

规则内容：  
(http.user_agent contains "Android" and http.user_agent contains "Mobile"; and http.request.uri contains "/images/posts/bg.jpg") or (http.user_agent contains "iPhone" and http.request.uri contains "/images/posts/bg.jpg") or (http.user_agent contains "Symbian" and http.request.uri contains "/images/posts/bg.jpg") or (http.user_agent contains "Windows Phone" and http.request.uri contains "/images/posts/bg.jpg")



* * *            
