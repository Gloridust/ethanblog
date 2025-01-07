---
title: Using Baidu Qianfan LLM Platform, I Created a Code Diagnostic Tool for Beginners
tags: Technology
date: 2023-11-13
img: /images/posts/2023-11-13/cover.png
describe: For programming beginners, they may encounter various problems at the initial stage. These problems are usually very simple and typical; however, the vast majority of people do not know how to diagnose and solve these problems, nor do they know how to search for information. So, I used a large model to create such a code diagnostic platform.
language: en
---
## Cause

As a member of the freshmen, I relied on the pitiful programming experience I had accumulated over the past 8 years to stand out in the first year of my major. When participating in a school-level competition, I was thinking about what else I could do. I started from the needs and thought about the current needs of the people around me.

I suddenly realized that they seemed to encounter many problems every day at the beginning stage of their major. These problems were usually very simple and typical; however, the vast majority of people did not know how to diagnose and solve these problems, nor did they know how to search for information. They could only choose to solve the problems by "asking questions". Obviously, in this case, "answerers" were in short supply. I suddenly thought of the content of the article [Solving the Pain Points of Self-study in Programming: Efficient Learning with the Assistance of GPT-like Large Models](https://gloridust.xyz/%E6%8A%80%E6%9C%AF/2023/08/24/studywithgpt.html).

So, I used a large model to create such a code diagnostic platform.

## Link

This project is open source on Github: [https://github.com/Gloridust/DebugThinker-python-UI](https://github.com/Gloridust/DebugThinker-python-UI) You can download the latest compiled version in the release, ready to use, with built-in api, no need to register the API interface of the Baidu Qianfan platform by yourself.

The compiled version is also available for download from the network disk: [https://cloud.gloridust.xyz/s/EOOtQ](https://cloud.gloridust.xyz/s/EOOtQ)
If you read this article in WeChat and cannot open the link, please try to click "Read the original text" to obtain the link in my blog.

***

The following content is from the README document of the project:

## DebugThinker-python-UI

A rapid code error diagnosis tool based on the Baidu Qianfan Large Model Platform, which can help beginners quickly solve code problems and improve learning efficiency.

## Original Project

Original command line version: [https://github.com/Gloridust/DebugThinker-python](https://github.com/Gloridust/DebugThinker-python)
The original command line version has stopped updating and maintenance, and the new version has the following advantages:
- More friendly graphical interactive UI interface, more convenient to use
- Supports multi-line line break input, can solve multi-line code

## Release Log
### v1.1.1
Packaged into an executable file using pyinstaller, greatly reducing the cost of use, ready to use. You can also package it yourself using the following command:
```
pyinstaller --onefile start.py
```
### v1.1.0
Optimized with threading for multi-threading, solving the problem of freezing after clicking the button to submit.
- Fix: Window freezes after submission
### v1.0.0
Created a GUI using tkinter, this is the first version that can be used normally.
## Start Using
### Obtain API
1. Register and log in to the [Baidu Qianfan Large Model Platform Console](https://console.bce.baidu.com/qianfan/ais/console/onlineService). In the "Online Service" area, activate the "ERNIE-Bot Large Model Public Cloud Online Invocation Service".
![img1](/images/posts/2023-11-13/1.png)
2. Create an application in "Application Access" to obtain the API_KEY and SECRET_KEY and save them properly.
![img1](/images/posts/2023-11-13/2.png)
### Configure the Program
1. Rename the [example.config.py](./example.config.py) in the same directory to [config.py](./config.py) file
2. Fill in the obtained API_KEY and SECRET_KEY into [config.py](./config.py) and save it.
### Use
1. Open the terminal in the project root directory and run the [start.py](./start.py) main program.
```
python./start.py
```
2. According to the requirements, enter the code and supplementary content into the corresponding text box, click "Submit", and wait for a moment to get the result.
## Troubleshooting
1. KeyError:'result'
```
Exception in Tkinter callback
Traceback (most recent call last):
  File "C:\Users\glori\AppData\Local\Programs\Python\Python311\Lib\tkinter\__init__.py", line 1948, in __call__
    return self.func(*args)
           ^^^^^^^^^^^^^^^^
  File "E:\GitHub\DebugThinker-python-UI\start.py", line 62, in run_program
    self.print_to_output(result['result'])
                         ~~~~~~^^^^^^^^^^
KeyError:'result'
```
There is no key named'result' in the returned json. Please check whether your config file is correct.
2. The remote host forcibly closed an existing connection
```
    raise ProxyError(e, request=request)
requests.exceptions.ProxyError: HTTPSConnectionPool(host='aip.baidubce.com', port=443): Max retries exceeded with url: /oauth/2.0/token?grant_type=client_credentials&client_id=%09xlebbPKwsMWyCsMvLO13Irvs&client_secret=OaTeLIwkmX3IiQUGRaAydTGYW5A5SC35 (Caused by ProxyError('Cannot connect to proxy.', ConnectionResetError(10054, 'The remote host forcibly closed an existing connection.', None, 10054, None)))
```
Check the network connection and whether the proxy is enabled. In a few network environments, you need to close the proxy to run the program, otherwise Baidu Qianfan may prohibit access.