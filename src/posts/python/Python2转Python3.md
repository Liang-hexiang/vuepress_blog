---
​---
icon: fish
date: 2023-09-26
cover: https://img.tucang.cc/api/image/show/72e720a5032441381e8d626f0e6538f1
category:
    - python
tag:
  - 2to3
  - python
​---
---

# Python2转Python3

### 工具介绍

:thought_balloon: 工具：2to3.py

2to3.py是一个脚本文件，是Anaconda管理器自带的脚本文件，通常可以在anaconda的安装路径下找到，可能由于anaconda的版本不同，2to3.py文件的名字也可能略有差异，但总的来说都可以通过2to3关键字来辨别。

### 使用

1. 转单个py文件

​	如果是转单个py文件的话可以直接把py文件的路径输入到命令之后

```bash
python 2to3.py  -w  D:/file.py
```

2. 批量转文件夹下的py文件

```bash
# 如果是想转文件夹下的文件，则将文件夹的路径输入到命令之后，并且以'\'结尾
Python 2to3.py -w E:\\Test\
```







