---
title: "Because I Couldn't Find the Password for the Compressed Package, I Developed a Password Cracking Software: EasyZipDecryptor"
tags: Technology
date: 2023-08-03
img: /images/posts/2023-08-03/cover.png
describe: Today, I downloaded a compressed package without a provided password from the internet. So, I tried to develop a password cracking script using Python...
language: en
---
Today, I downloaded a compressed package without a provided password from the internet. I think everyone has encountered this situation: after downloading a compressed package for half an hour or even longer, it cannot be opened because it is encrypted. So, I tried to develop a password cracking script using Python.

## Link

Here is the link. You can download it from [Github](https://github.com/Gloridust/EasyZipDecryptor), or from [my cloud drive](https://cloud.gloridust.xyz/s/l6hK).

## Introduction:

This is a simple password cracking script that can help you crack the passwords of zip, rar, and 7z compressed packages. Password cracking is a sensitive task, and for legal, compliant, and ethical purposes, make sure you have obtained authorization or permission and comply with applicable laws and regulations. This script is only for academic research and other legal purposes. If the use of this script leads to violations of local laws and regulations, the user shall bear the consequences.

## Features:

Supports password cracking for zip, rar, and 7z compressed packages.
Uses a dictionary file as the password list and tries each password for cracking.
When the cracking is successful, the password will be printed and the cracking will stop; when the cracking fails, a failure message will be displayed.
Preparation:
Before starting to use the script, make sure you have installed the following Python libraries: rarfile, zipfile, and py7zr. You can install them using pip with the following command:

```bash
pip install rarfile zipfile py7zr
```

## Usage:
Create a dictionary file: Prepare a dictionary file containing a list of passwords. Each password should be on a separate line. You can customize the password list. In [my cloud drive](https://cloud.gloridust.xyz/s/5mu3), we provide a simple password dictionary. You can use it after decompression. The dictionary content is from the internet. (Provided in [./dic/passwords.zip](./dic/passwords.zip))
Run the script: Open the terminal or command prompt, enter the directory where the script file is located, and run the Python script. According to the prompts, enter the location of the dictionary file and the location of the compressed package to be cracked.

## Example Usage:

Suppose your dictionary file is named passwords.txt and the compressed package is named example.zip, you can execute the following command to run the script:

```bash
python unzip.py
```

Then, follow the prompts to enter the location of the dictionary file and the location of the compressed package.

## Notes:

This script is only for academic research purposes. Please follow legal regulations and ensure that you have obtained appropriate authorization.
Password cracking involves security and privacy issues, and unauthorized password cracking is illegal.
Using a more comprehensive dictionary file may increase the success rate of password cracking, but please ensure that you obtain these dictionary files legally.

* * *

**Development Process**

The development of the password cracking software involves multiple stages, including requirements analysis, design, coding, and testing. We first clarified the goal of the software: to provide a simple and easy-to-use tool to help users unlock encrypted compressed packages.

1. **Requirements Analysis**: In the requirements analysis stage, we determined the supported compressed package formats, the password cracking function, and the need to use a dictionary file.
2. **Design**: Based on the requirements analysis, we designed the overall architecture and interface of the software. To ensure the scalability of the software, we adopted a modular design approach. At the same time, we focused on optimizing the user experience to ensure that the software operation is simple and intuitive.
3. **Coding**: In the coding stage, we used the Python language to implement the password cracking algorithm and related functions. To improve the cracking efficiency, we used multithreading and optimized algorithms to handle different types of compressed packages.
4. **Testing**: To ensure the stability and security of the software, we conducted comprehensive tests, including functional testing, performance testing, and security testing. Through continuous optimization and repair, we ensured that the software can run reliably in different environments.

**User Guide**

To ensure the legal use of the software and data security, we strongly recommend that users follow the following points:
1. **Legal Compliance**: Please ensure that you comply with applicable laws and regulations and ethical standards when using the software. Unauthorized password cracking is illegal.
2. **Data Privacy**: Please do not attempt to crack other people's compressed packages or unauthorized data to avoid infringing on others' privacy.
3. **Legal Authorization**: If your research or testing requires the use of specific types of dictionary files or password cracking tools, please ensure that you have obtained legal authorization or cooperate with relevant professionals.

(Note: This software is only for academic research and legal security testing. Unauthorized password cracking is illegal.)