---
title: 升级文案馆网站：巧用CloudFlare镜像
date: 2023-06-12
tags: 技术
img: /images/posts/2023-06-12/640.jpg
describe: 去年1月曾经写过一篇文章，讲述了如何以最低级技术创建一家文案馆网站​。可是那种方式过于繁杂，每次更新需要重新提交原代码，过不了多久就放弃​更新了。今天给大家讲解如何使用CloudFlare自动镜像​频道内容。
---

去年1月曾经写过一篇文章，讲述了如何以最低级技术创建一家文案馆网站。可是那种方式过于繁杂，每次更新需要重新提交原代码，过不了多久就放弃更新了。今天给大家讲解如何使用CloudFlare自动镜像频道内容。在此之前，我还是建议大家先了解一下之前的文章内容。

![](/images/posts/2023-06-12/640.jpg)

首先需要打开CloudFlare（以下简称cf）的控制面板，确保你的域名已经托管到了cf，并正常在DNS页面设置解析；然后打开左侧的“Workers&Pages”，然后“创建应用程序-创建Workers”，名称随意，代码不管，直接点击部署。

![](/images/posts/2023-06-12/640.png)

然后点击“配置-快速编辑”即可编辑代码。将代码替换为以下内容：

    const upstream_me = 't.me';
    const upstream_org = 'telegram.org';

    // Custom pathname for the upstream website.
    const upstream_path = '/s/WannaRainsNote';

    // Whether to use HTTPS protocol for upstream address.
    const https = true;

    // Replace texts.
    const replace_dict = {
    '$upstream': '$custom_domain',
    };

    addEventListener('fetch', event => {
    event.respondWith(fetchAndApply(event.request));
    });

    async function fetchAndApply(request) {
    let response = null;
    let url = new URL(request.url);
    let url_hostname = url.hostname;

    if (https == true) {
    url.protocol = 'https:';
    } else {
    url.protocol = 'http:';
    }

    var upstream_domain = upstream_me;

    // Check telegram.org
    let pathname = url.pathname;
    console.log(pathname);
     if (pathname.startsWith('/static')) {
        console.log('here');
    upstream_domain = upstream_org;
    url.pathname = pathname.replace('/static', '');
    } else {
        if (pathname == '/') {
        url.pathname = upstream_path;
        } else {
        url.pathname = upstream_path + url.pathname;
        }
    }

    url.host = upstream_domain;

    let method = request.method;
    let request_headers = request.headers;
    let new_request_headers = new Headers(request_headers);

    new_request_headers.set('Host', url.hostname);
    new_request_headers.set('Referer', url.hostname);

    let original_response = await fetch(url.href, {
        method: method,
        headers: new_request_headers
    });

    let original_response_clone = original_response.clone();
    let response_headers = original_response.headers;
    let new_response_headers = new Headers(response_headers);
    let status = original_response.status;

    response = new Response(original_response_clone.body, {
        status,
        headers: new_response_headers
    });
    let text = await response.text();

    // Modify it.
    let modified = text.replace(/telegram.org/g,'tg.k8s.li/static');

    // Return modified response.
    return new Response(modified, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
    });
    }


值得注意的是，在开头的这一行中，请把“WannaRainsNote”更换为你自己的频道名。

    const upstream_path = '/s/WannaRainsNote';

因为每个账户的Workers次数有限，我们限制它只能镜像我们的频道；如果你要放开限制，请改为：

    const upstream_path = '/s/';

最后点击“保存并部署”。不出意外的话，使用默认的.dev域名在魔法上网的环境下已经可以访问了。但为了实现我们的最终目的，接下来还要继续设置路由和解析。

点击网站标签，进入你要解析的域名。打开域名页面后，进入“Workers路由”标签（注意不是在控制面板主页直接点击workers）。

![](/images/posts/2023-06-12/640%20(1).png)

点击“添加路由”，这里我们将这个页面镜像到这个网站的“/note”目录下，所以如图填写：

![](/images/posts/2023-06-12/640%20(2).png)

这样我们就可以在https://wr.gloridust.xyz/note/访问镜像页面啦！但是值得注意的是，由于镜像内容有限，大部分有关原网站的链接都是不能点击的（比如DOWNLOAD），因为它没有被镜像。

![](/images/posts/2023-06-12/640%20(3).png)

同理，我们可以通过这个案例来扩展到镜像其他网站。比如我要镜像Google，那我就在前几行代码进行如下更改：

    const upstream_me = 'google.com';
    const upstream_org = 'google.com';

    // Custom pathname for the upstream website.
    const upstream_path = '/';

这样它就会被镜像到网站目录下的“/google”了。

如果你觉得这篇文章对你有所启发，麻烦点赞收藏，谢谢！