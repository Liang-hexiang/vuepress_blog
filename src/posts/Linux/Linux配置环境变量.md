---
icon: book
date: 2023-07-28
cover: https://img.tucang.cc/api/image/show/64a50296cae6612fb1468ddb15110c75
category:
  - 技术 
tag:
  - Linux
---

# Linux配置环境变量


### 1. 查看所有变量
```shell 
# 使用env
lianghexiang@ubuntu:~$ env 

# 使用export
lianghexiang@ubuntu:~$ export 
```

### 2. 查看一个变量
```bash
lianghexiang@ubuntu:~$ echo ${变量名}
# 或者
lianghexiang@ubuntu:~$ env | grep 变量名
# 或者
lianghexiang@ubuntu:~$ export | grep 变量名
```

### 3. 设置变量
#### 1. 临时设置
```bash
# 执行export 这个设置仅限当前终端有效，窗口关闭后无效
# 其中PATH变量定义了运行命令的查找路径，以冒号:分割不同的路径，如，/home/yan/share/usr/local/arm/3.4.1/bin 这个就表示一个软件的路径了，多个软件就用:分开，如 /usr/local/LAMP/php/bin:/usr/local/LAMP/mysql/bin
lianghexiang@ubuntu:~$ export PATH=$PATH:路径
```
#### 2. 当前登录用户的全局变量
```bash
# 修改.bashrc文件
vim ~/.bashrc
# 在该文件末尾添加如下行 path是要添加的变量的路径
export PATH=path:$PATH

```

### 3. 测试
```bash
# 执行查看命令
echo $PATH
# 或者
env
```