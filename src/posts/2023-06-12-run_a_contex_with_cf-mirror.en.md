---
title: 'Upgrading the Copywriting Archive Website: Smart Use of CloudFlare Mirroring'
date: 2023-06-12
tags: Technology
img: /images/posts/2023-06-12/640.jpg
describe: Last January, I wrote an article about how to create a copywriting archive website with the most basic technology. However, that method was too cumbersome, and each update required re-submitting the original code, so I gave up updating it soon. Today, I will explain how to use CloudFlare to automatically mirror the channel content.
language: en
---
Last January, I wrote an article about how to create a copywriting archive website with the most basic technology. However, that method was too cumbersome, and each update required re-submitting the original code, so I gave up updating it soon. Today, I will explain how to use CloudFlare to automatically mirror the channel content. Before that, I still recommend that you read the content of the previous article.

![](/images/posts/2023-06-12/640.jpg)

First, you need to open the control panel of CloudFlare (hereinafter referred to as cf) to ensure that your domain name has been hosted on cf and the DNS page is set up for normal resolution; then open "Workers & Pages" on the left, and then "Create Application - Create Workers", the name is arbitrary, and ignore the code, just click on Deploy.

![](/images/posts/2023-06-12/640.png)

Then click "Configure - Quick Edit" to edit the code. Replace the code with the following content:

    const upstream_me = 't.me';
    const upstream_org = 'telegram.org';
    // Custom pathname for the upstream website.
    const upstream_path = '/s/WannaRainsNote';
    // Whether to use the HTTPS protocol for the upstream address.
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

It should be noted that in the first line here, please replace "WannaRainsNote" with your own channel name.

    const upstream_path = '/s/WannaRainsNote';

Since the number of Workers for each account is limited, we limit it to only mirror our channel; if you want to lift the restriction, change it to:

    const upstream_path = '/s/';

Finally, click "Save and Deploy". If there are no unexpected issues, the default.dev domain name should be accessible in the environment with a VPN. However, to achieve our ultimate goal, we need to continue setting up the routing and resolution.

Click the website tab to enter the domain name you want to resolve. After opening the domain name page, enter the "Workers Routing" tab (note that you do not click on workers directly on the homepage of the control panel).

![](/images/posts/2023-06-12/640%20(1).png)

Click "Add Route", here we will mirror this page to the "/note" directory of this website, so fill it in as shown in the figure:

![](/images/posts/2023-06-12/640%20(2).png)

In this way, we can access the mirror page at https://wr.gloridust.xyz/note/! However, it should be noted that due to the limited mirrored content, most links related to the original website cannot be clicked (such as DOWNLOAD) because they are not mirrored.

![](/images/posts/2023-06-12/640%20(3).png)

Similarly, we can extend this case to mirror other websites. For example, if I want to mirror Google, I will make the following changes in the previous lines of code:

    const upstream_me = 'google.com';
    const upstream_org = 'google.com';
    // Custom pathname for the upstream website.
    const upstream_path = '/';

In this way, it will be mirrored to "/google" in the website directory.

If you find this article inspiring, please like and bookmark it, thank you!