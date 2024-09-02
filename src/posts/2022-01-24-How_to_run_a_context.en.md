---
title: How to Create an Online Copywriting Archive? Channel + Website
tags: Technology
date: 2022-1-24
img: /images/posts/2022-01-24/3762306_a9d119d0_1200_2482_418@1080x485.jpeg
describe: How to operate a copywriting archive? Channel + Website. Can I also open a copywriting archive? (Just take out the little notebook I wrote on the Internet for a year and use it)
language: en
---
![image.png](/images/posts/2022-01-24/3762306_a9d119d0_1200_2482_418@1080x485.jpeg)
Some time ago, I saw my first love forwarding an article from a WeChat official account. I went in to take a look and found that it was a place similar to a copywriting archive. So, I, who am often emo, thought: Can I also open a copywriting archive? (Just take out the little notebook I wrote on the Internet for a year and use it)
The links in this article are placed at the end.
![image.png](/images/posts/2022-01-24/3762306_8a8a6748_1201_3967_899@1079x613.png.m.jpg)
So I tried to open a copywriting channel on the blue 🛫 software. (As for why not on WeChat, it is because there are more restrictions and the operation is not convenient.)
![image.png](/images/posts/2022-01-24/3762306_6dfd1337_1201_4079_192@1080x2205.jpeg.m.jpg)
I prefer the design of the channel function. It is as convenient as sending a message in a group chat, can be edited at any time, and has a timed message function, and a very convenient comment function to interact with followers.
![image.png](/images/posts/2022-01-24/3762306_eff0e6b6_1201_4128_377@981x1219.png.m.jpg)
Next is the implementation of the website. In order to ensure that the style is consistent with the (my) channel (poor skills), for the information page, I directly used the export function of the channel software, exported it to html and hung it directly, made slight modifications to the header and footer, and added a few jump buttons.
![image.png](/images/posts/2022-01-24/3762306_808b8c8d_1201_4138_350@477x622.png.m.jpg)
![image.png](/images/posts/2022-01-24/3762306_c45762fb_1201_4146_118@1920x1080.png.m.jpg)
Then there is the homepage. I didn't plan to make a homepage at first, but in order to automatically add a #bottle tag at the end of the URL to make it jump to the latest when entering the website, I made one, which just made the website look more formal.
The homepage is based on the template of html5up. I strongly recommend this template website, which is free and beautiful. (The website address is placed at the end uniformly)
![image.png](/images/posts/2022-01-24/3762306_c45762fb_1201_4146_118@1920x1080.png.m.jpg)
Then, in order to promote each other between the software channel and the website, I. Set the top and join links in the channel and website respectively.
Then there is the problem of the website going online. The static web hosting service here uses github page, which saves time and effort, does not need to worry about the server, and focuses on operating the website for free.
The domain name uses the free.tk domain name, but the registration process is more troublesome. The freenom official has a very strict review mechanism to prevent malicious registration (referring to the verification of the IP address during registration and the filling of personal information, etc.).
Then the name server is set to the reverse proxy CDN service of cloudflare. One is because the freenom official website review is really too harsh. If the IP is changed in the middle, you need to log in again, and it is also very stuck; the second is considering the reason for domain name filing. If there is no reverse proxy, it may be inaccessible. If domains such as Ali and Tencent are inaccessible, this can also be solved.
![image.png](/images/posts/2022-01-24/3762306_99bddeef_1201_417_981@1920x743.png.m.jpg)
With the reverse proxy provided by cloudflare, we can also implement more interesting functions. For example, by identifying the user identifier UA to achieve different wallpaper adaptations for the PC and mobile terminals. This can be achieved through the cloudflare rule function, and the rule content is placed below.
![image.png](/images/posts/2022-01-24/3762306_d64b0832_1201_4179_837@1305x523.png.m.jpg)
![image.png](/images/posts/2022-01-24/3762306_7dd4129a_1201_4188_639@1007x723.png.m.jpg)
Different backgrounds:
![image.png](/images/posts/2022-01-24/3762306_f587d51d_1206_5607_64@1080x2340.jpeg.m.jpg)
![image.png](/images/posts/2022-01-24/3762306_26b0ba37_1206_5615_538@1920x1080.jpeg.m.jpg)
That's probably all for now. If you are not clear, you can leave a message on [Coolapk](https://www.coolapk.com/feed/33069243?shareKey=NGFjOTg5NjBlOWJiNjFmMTYyZDQ~&shareUid=3762306&shareFrom=com.coolapk.market_12.0.1)
* * *
Related resources:
[Homepage Template](https://html5up.net/)
[Free Domain Name](https://my.freenom.com/)
[Reverse Proxy](https://dash.cloudflare.com/)
[Copywriting Archive](https://wannarains.tk/)
Rule content:
(http.user_agent contains "Android" and http.user_agent contains "Mobile"; and http.request.uri contains "/images/posts/bg.jpg") or (http.user_agent contains "iPhone" and http.request.uri contains "/images/posts/bg.jpg") or (http.user_agent contains "Symbian" and http.request.uri contains "/images/posts/bg.jpg") or (http.user_agent contains "Windows Phone" and http.request.uri contains "/images/posts/bg.jpg")
* * *
