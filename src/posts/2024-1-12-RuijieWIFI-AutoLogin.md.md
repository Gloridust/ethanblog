---
title: "Say Goodbye to Campus Network Disconnection: Python Automatic Login to Ruijie Campus Network"
tags: Technology
date: 2024-1-12
img: /images/posts/2024-01-12/cover.png
describe: Tired of the campus network dropping out from time to time, I wrote a Python program to automatically login...
language: en
---
I don't know if it's because I'm used to using a proxy for a long time, but I encounter the campus network dropping out dozens of times almost every day during high-frequency work. Each time, I need to open the browser - open the login page - login - refresh to restore the network, and I don't know when it will drop out again.
Tired of the campus network dropping out from time to time, I decided to write a Python program to automatically login.
The project is open source on Github: Gloridust/RuijieWIFI-AutoLogin
The following content directly quotes the README document of [the project's Github](https://github.com/Gloridust/RuijieWIFI-AutoLogin):
* * *
Automatic login to the Ruijie campus WiFi authentication system of Yibin University to prevent accidental disconnection. In theory, it supports all Ruijie systems.
## Start
1. Download or clone the code to local
```bash
git clone https://github.com/Gloridust/RuijieWIFI-AutoLogin.git
```
2. Rename `example.config.py` to `config.py`, and you can start filling in the configuration file.
## Configuration
1. Open the browser and visit the login interface of the school campus network. Press `F12` to open the developer tools. Select the `Network` tab.
![jpg](/images/posts/2024-01-12/1.jpg)
2. Refresh the page, enter the account password, select the operator, and then login. Note: You must re-enter the password, do not use the remembered password content. In the developer tools, you can try to find some files that may contain the data we need. The following pictures are for your reference, and you may find these configuration information in these locations:
![jpg](/images/posts/2024-01-12/2.jpg)
![jpg](/images/posts/2024-01-12/3.jpg)
3. Open the `config.py` configuration file in the project file, and follow the prompts to fill in the content according to the information in the browser developer tools. If you cannot find the encrypted password or the `password` value is `null`, simply fill in the plaintext password and change `'passwordEncrypt'` to `'false'`, and ensure that all other content is filled in completely. The following is my configuration information, for reference only:
![jpg](/images/posts/2024-01-12/4.jpg)
Correction: The data of `service` may be wrong. For example, for `China Telecom`, please fill in `dianxin`.
## Run
If everything goes well, you can run it now:
```bash
python3./login.py
```
![png](/images/posts/2024-01-12/5.png)
Try surfing the internet! If you still see the password input interface when opening the login page again, you might as well refresh it.
## Advanced Operations
### Startup Autostart
Take automation to the extreme, experience the pleasure of a home broadband, and login seamlessly.
#### macOS
1. Give permissions in the main program directory of `login.py`:
```bash
chmod +x login.py
```
2. Rename `example.net.innovisle.RuijieWIFI-AutoLogin.plist` under the project directory to `net.innovisle.RuijieWIFI-AutoLogin.plist`
3. Edit `net.innovisle.RuijieWIFI-AutoLogin.plist` and fill in the absolute path of `login.py`. Taking mine as an example:
![jpg](/images/posts/2024-01-12/6.jpg)
4. Place the created `net.innovisle.RuijieWIFI-AutoLogin.plist` file in the `~/Library/LaunchAgents` directory.
5. Load the plist file: Try any of the following commands:
```bash
launchctl load ~/Library/LaunchAgents/net.innovisle.RuijieWIFI-AutoLogin.plist
```
```bash
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/net.innovisle.RuijieWIFI-AutoLogin.plist
```
If there is no error, you will receive a notification of the login item and see it in the login item list:
![png](/images/posts/2024-01-12/7.png)
#### Windows
Put the script or its shortcut into the "Startup" folder of Windows.
Press Windows + R to open the "Run" dialog box, enter shell:startup, and then press Enter. This will open the "Startup" folder.
Put your Python script or its shortcut into this folder. If it is a shortcut, make sure it points to the correct script path and Python interpreter.
### Automatic Login Frequency
You can adjust the login frequency in the last line of `login.py`, and the default is to login once every 1-3 seconds. You can adjust it appropriately. For example, if you want to try to login every 5-10 seconds, you can modify it to:
```python
time.sleep(random.randint(5, 10))
```
## LICENSE
MIT