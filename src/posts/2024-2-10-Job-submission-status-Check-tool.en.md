---
title: No Longer Busy Counting Document Submission Status! Write a Program to Count the Results with One Click
tags: Technology
date: 2024-2-10
img: /images/posts/2024-02-10/cover.png
describe: Now, you can use this program to greatly reduce your workload...
language: en
---
## Introduction and Brief Introduction

Whether you are a college student or a teacher, you may feel headache when registering the submission status of assignments while collecting them. You will feel frustrated by some mechanical work. Now, you can use this program to greatly reduce your workload.

So I wrote and open-sourced this project. This software can check the submission status of assignments with one click, count the number of people who have submitted/not submitted, and register it in an Excel spreadsheet.

## Preparation

### Environment and Software Packages

Make sure you have installed a relatively new version of the Python3 environment and the following software packages:

```bash
pip install pandas
pip install openpyxl
```

### Prepare Files
1. All the assignment files submitted by the students;
2. A list spreadsheet containing all the names;
3. The program'main.py' file;

If you haven't downloaded the program, you can download it using the following command and move the'main.py' file in it to the same directory as the above two files:

```bash
git clone https://github.com/Gloridust/Job-submission-status-Check-tool.git
```

### Configuration File

At the top of the'main.py' file, you can see the following configuration information:

![config.png](/images/posts/2024-02-10/config.png)

Note to replace the following variable contents with your actual information:

    'excel_name' is the relative path to the list spreadsheet you provide;
    'name_column' is the header of the column where all the names are located in the list spreadsheet;
   'status_column' is the header of the output result column;
    'file_extensions' are the suffixes of all the file names that need to be counted;
    'name_is_before' is the string before the name: for example, if your file name is 'Zhang San 2301101024' and the name is all the strings before '230', then fill in '230';

## Run

Double-click or use the following command in the file directory to run:

```bash
python3./main.py

```

After following the prompts, you can see the statistical results. The results will be output to the terminal and the registration status will be saved in the form.

![result](/images/posts/2024-02-10/result.png)

![table](/images/posts/2024-02-10/table.png)

## Write at the End

At this point, you should already be able to experience the convenience of this project. If you like it, you can give me a star to show your support. Thank you very much!

    May all Chinese youth cast off the chill and move upward, without listening to the words of those who are resigned to mediocrity. Those who can act, let them act; those who can speak, let them speak. With a little heat, emit a little light, just like a firefly, you can also emit a little light in the darkness, without waiting for the torch.
    If there is no torch after this: I will be the only light. If there is a torch or the sun, we will naturally disappear willingly. Not only without any resentment, but also with joy and praise for this torch or the sun; because it illuminates humanity, including me.