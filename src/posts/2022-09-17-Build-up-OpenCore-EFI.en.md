---
title: Guide to Hackintosh
tags: Repost Hackintosh Technology
img: /images/posts/2022-09-17/images.png
date: 2022-9-17
author: CharlesSu
describe: This article is suitable for those who have no understanding of Hackintosh. This article has been reposted with the consent of the original author @CharlesSu. If you repost it for the second time, please contact the author and indicate the source. The cover of the article comes from the Internet.
language: en
---
# Guide to Hackintosh
**Can enter bios**
**Can speak English or use translation**
**Have hands and patience**
**Need a USB drive**
## **Preface**
This is an article suitable for those who have no understanding of Hackintosh.
Applicable to: You have bought a computer and want to install Hackintosh.
If you are planning to buy a device that can install Hackintosh.
Refer to [Notebook](https://github.com/daliansky/Hackintosh) [Desktop](https://macx.top/18202.html)
**Expressions used in the article**:
1. Search **XXX + Chinese (the words in brackets are in English, search in Google)**
2. Notebook and computer are collectively referred to
obscure, and you still want to install Hackintosh, you need to configure the EFI yourself.
**Configure EFI**
This is a big deal!
Please combine multiple sources of information.
Don't just rely on my article, and don't be limited to the domestic Internet.
**Information You Need to Know**
Hackintosh is not very picky about the CPU, but if it is too old, too rare, or AMD, it is better to save time and not consider it. For netbooks (Pentium, Celeron, just pass it, it won't work),
Most Intel integrated graphics (HD + some numbers) and AMD discrete graphics cards can be driven. Please search for 「Graphics Card Model + Hackintosh」.
Very few network cards can be driven, and there are various special methods for those that can be driven.
Please search for specific situations by yourself, and this article will not expand on it.
Sound cards are the same. Please search by yourself.
## **Download Work**
#### *Must Download*
~~The files here refer to [this website](https://dortania.github.io/OpenCore-Install-Guide/ktext.html#must-haves) for some software~~
Please remember their nicknames (in parentheses).
***Please put all the files you download together, install the software. Make sure you can find everything!***
[plist Editor](https://github.com/corpnewt/ProperTree) or [OpenCoreCFG](https://mackie100projects.altervista.org/opencore-configurator/) for editing plist configuration.
Essential, download the release [Simplest EFI](https://github.com/acidanthera/OpenCorePkg/releases).
[SSDT](https://github.com/corpnewt/SSDTTime).
diskgeunis (Partition Tool) can be downloaded from Baidu.
[Lilu](https://github.com/acidanthera/Lilu/releases).
[VirtualSMC](https://github.com/acidanthera/VirtualSMC/releases).
[WhateverGreen! Some AMD integrated graphics cannot be installed!](https://github.com/acidanthera/WhateverGreen/releases).
[AICP Editing Tool](https://acpica.org/downloads/binary-tools).
[Writing Tool](https://github.com/balena-io/etcher/releases/download/v1.7.9/balenaEtcher-Setup-1.7.9.exe).
[Black Apple Soldier](https://blog.daliansky.net/) Download a mirror here, and I can send you one privately.
[Error Troubleshooting 1](https://shuiyunxc.gitee.io/2020/04/06/Faults/index/) [Error Troubleshooting 2](https://apple.sqlsec.com/10-%E6%8E%92%E9%94%99/).
These are the common problems that Hackintosh may encounter. Come here to check when you encounter problems.
*A total of 10 files*
**This is the additional part for notebooks, please skip it for desktops**
~~Because of the battery, keyboard, mouse, etc., most notebook users need to supplement these drivers. Of course, there are no absolutes. You cannot ensure that some people who have nothing to do and are special~~
This part is suitable for most users. If this part does not work according to the general tutorial, please search on Baidu.
**All Notebook Users**
SMCProcessor.kext
SMCSuperIO.kext
SMCLightSensor.kext
SMCBatteryManager.kext
SMCDellSensors.kext (only for Dell users)
*A total of 4 (5 for Dell)*
*__AMD Users__ Need Additional Drivers*
[AMDProcesser](https://github.com/trulyspinach/SMCAMDProcessor)
[AMDRadeonGPU](https://github.com/aluveitie/RadeonSensor)
#### **Graphics Card**
*Intel Integrated Graphics (That is, there is no graphics card in the entire computer)*
Use this [OC Toolbox](https://www.123pan.com/s/rd39-MkpOd) directly, which is very convenient.
*Nvdia*
 ~~Only supported up to 10.13.6~~
Refer to [this website](https://www.bilibili.com/video/BV1wr4y1r78X?spm_id_from=333.337.search-card.all.click&vd_source=b2ed1387674e77df3a3f4f6acfe5a846).
This part is quite controversial, and this technology is relatively new. Moreover, I do not have an Nvdia graphics card and cannot test it.
So Nvidia users please test it yourself.
*AMD Graphics Card (Discrete Graphics, if you are a Vega8 user and happen to know C++ and reverse engineering, welcome to contact me)*
AMD graphics cards are either driver-free or need to spoof the ID.
At this step, AMD users can shout: AMD YES.
If you are a Vega8 user.
And you just happen to know C++ and have been exposed to reverse engineering. Welcome to contact me.
#### **Sound Card**
For the sound card part, due to different brands of network cards having different driving methods.
Some just need to inject the ID, some need to add a separate driver, and some cannot be driven.
Here, I have searched for most of the sound card drivers on the entire network, and the rest is up to you to test.
[Sound Card](https://radcliffe.vercel.app/post/hei-ping-guo-sheng-qia-qu-dong/)
#### **Network Card**
For the Intel network card, refer to [Intel](https://zhuanlan.zhihu.com/p/299695036).
[Other Network Cards](https://zhuanlan.zhihu.com/p/339648390).
Search for your network card model here.
If your network card is there, you can search for 「Model + Hackintosh」.
**Now, all the download work should be done. You can take a break. You have worked hard, but the real hard part is coming. Drink less and eat more**
## **Configure EFI**
Please follow this order or an order that you will not get confused.
Please unzip and install the downloaded files. If you see a folder like XXX.kext, it means it is already the simplest.
Please classify the downloaded files.
### *Foundation*
 Unzip 「Simplest EFI」 to the place you find.

Delete all the things in the Tools folder.
Delete everything in the Drivers file except OpenRuntime.efi 「!Understand this sentence carefully!」
Put [this](https://github.com/acidanthera/OcBinaryData/blob/master/Drivers/HfsPlus.efi) in the Drivers folder.
### *ACIP*
~~The purpose of this step is to allow the system to control the hardware, and the software to control the hardware.
[Reference](https://www.bilibili.com/read/cv10117507/)~~
1. Open __**SSDT**__ and open the __**SSDTTime.bat**__ inside.
2. In the order of 「4, 3, 2」 (the order cannot be wrong), three files will be generated.
3. Now we need to deal with **SSDT-RTC0.dsl**.
If it is not automatically generated, [download](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-RTC0.dsl).
Open it with a text editor or something, and use all your knowledge to find

    External (_SB_.PCI0.LPCB, DeviceObj)
    Scope (_SB.PCI0.LPCB)
Modify it to
    External (_SB_.PCI0.LPC, DeviceObj)
    Scope (_SB.PCI0.LPC)
4. Deal with **SSDT-PMC**
If not, [download](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-PMC.dsl)
    External (_SB_.PCI0.LPCB, DeviceObj)

    Scope (_SB.PCI0.LPCB)
 Modify to
    ternal (_SB_.PCI0.LPC, DeviceObj) 
    Scope (_SB.PCI0.LPC) 
 5. Compile
 Use this command
    acpihelp.exe -o File Name
**Replace 「File Name」 with the five files you just created one by one**
In the end, you need to make sure that you can see five files ending with XXX.aml.
6. Now, please create a new folder, put the files in it, name it 「ACPI」 and replace it in the 「Simplest EFI』 folder.
### *Configure OpenCoreCFG*
Please refer to [this website](https://post.smzdm.com/p/aqm8nxvx/). The author of this part wrote it well. I will consider writing it myself in the future.
### *Assembly*
Put the **kexts folder** and **ACPI** in 「Simplest EFI」.
At this time, your 「Simplest EFI」 will have Figure 1.1 [xS2aDI.png](https://s1.ax1x.com/2022/09/17/xS2aDI.png) 1.2 [xS2hV0.png](https://s1.ax1x.com/2022/09/17/xS2hV0.png).
Rename your 「Simplest EFI」 to EFI.
    Take a break here.

    You have worked hard.

    After this step, it is time to officially start the installation.
## **Start Installation**
### 1. Write the Disk
Use the 「Writing Tool」 to write the image you downloaded to the USB drive.
~~If you get stuck at Vailting, just skip it~~
For beginners: When you see the green progress bar and the word Skip at the same time.
Just click **skip**.
### 2. Enter BIOS
*With all your knowledge, enter the bios and turn off (ignore those that are not available).*
    Fast Boot
    Secure Boot
    Serial/COM Port
    Parallel Port
    VT-d 
    CSM
    Thunderbolt (some have no drivers)
    Intel SGX
    Intel Platform Trust
    CFG Lock (if possible)
*Turn on*
    VT-x
    Above 4G decoding
    Hyper-Threading
    Execute Disable Bit
    EHCI/XHCI Hand-off
    OS type: other 
    UEFI Mode
    DVMT Pre-Allocated: 64MB
    SATA Mode: AHCI
### 3. Boot up
Boot from your USB drive.
### 4. Installation
1. Please adjust the installation program to a language you are familiar with. It is best not to log in to the Apple ID, do not.
If you find that the mirror image you downloaded is in Russian and cannot find a place to modify it.
Please use translation software, and Google Translate is recommended.
2. If you are installing a system before Catalina (10.15.x), please [refer to](https://www.applex.net/threads/macos-mojave.93508/).
### **Aftercare**
Now, if there is no accident, you should be in the system.
Some network cards and sound cards require other operations. Please follow the corresponding tutorials.
For the three-code injection part, the other author has mentioned it in the configuration *OpenCoreCFG* part, and I will not repeat it.
## **Epilogue**
This article is written in a hurry, and there are some things I don't really understand. I hope everyone can be patient and take their time.
After Apple released the M1 chip, I don't know how long Hackintosh can survive. Cherish it while you can.
If you are a Vega8 user and happen to know C++ to write drivers, I can take you to find out the progress abroad.
Thanks to those developers who have silently contributed to Hackintosh!
Best regards,
——————————————————————————
Please indicate the source when reposting, and you can create derivative works.
If you encounter problems during the installation, you can contact me on Telegram: [Charles](https://t.me/Mistry_Rain).
All operations come from the Internet. If you encounter problems, you are responsible for them yourself!
This article has been authorized to be published by [Gloridust](https://gloridust.xyz/) [Rene](https://rene.wang/).
* * *
This article has been reposted with the consent of the original author [@CharlesSu](t.me/Mistry_Rain). If you repost it for the second time, please contact the author and indicate the source.
The cover of the article comes from the Internet.
