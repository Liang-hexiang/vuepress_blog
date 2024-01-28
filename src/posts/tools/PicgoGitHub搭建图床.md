---
icon: github
date: 2023-07-14
sitemap: true
cover: https://img.tucang.cc/api/image/show/3f96a1fd6956f27e1badccf6d7f982e1
category:
  - 工具 
tag:
  - Picgo
  - GitHub
---

# PicgoGitHub图床

## 前言

这篇文章主要介绍在:computer:`windows`系统下安装PicGo并且在:ghana:  GitHub上创建仓库来做我们自己的个人图床。

首先，什么是 `Picgo`？

picgo网站地址：https://picgo.github.io/PicGo-Doc/zh/guide/#%E7%89%B9%E8%89%B2%E5%8A%9F%E8%83%BD

**PicGo: 一个用于快速上传图片并获取图片 URL 链接的工具**

呈上GitHub下载地址：https://github.com/Molunerfinn/PicGo/releases

也可以在picgo网站中找到各种下载原，比如GitHub的，腾讯的，以及别的源，哪个快用哪个。

**应用截图**

![img](https://raw.githubusercontent.com/Molunerfinn/test/master/picgo/picgo-2.0.gif)

GitHub想必就不用做过多介绍了，一句话概括就是一个在线的代码托管平台。

Picgo支持很多的图床，比如七牛云，腾讯云等，这里我们介绍的是免费的GitHub。

## 动手

### 1. 安装Picgo

我选择的是2.4.0.beta版本，大家安装的时候可以选择稳定版，看个人喜好，喜欢尝试新功能的可以按照beta版，偏向于稳定的就安装稳定版。

2.3.1稳定版：https://github.com/Molunerfinn/PicGo/releases/tag/v2.3.1

![image-20230729151038685](https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729151038685.png)

其余的安装过程不再赘述，因为没什么特别需要注意的地方，傻瓜式安装就可以了，不想安装在C盘的注意更改安装目录。

### 2. GitHub仓库

1. 先登录GitHub，点击  + ，点击创建仓库

![image-20230729164849247](https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729164849247.png)

2. 创建仓库前配置好`名称`，`权限`，模板等，因为我们要在网络上访问，所以要选择`Public`.

   ![image-20230729164838764](https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729164838764.png)

   

​	创建成功后会跳转到仓库页面

![image-20230729164829442](https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729164829442.png)

3. 生成token

   token是用来验证用户身份的表示，所以要自己揣兜里，不要让别人看到。

   点击右上角的头像

   ![image-20230729164813237](https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729164813237.png)

   然后点击Settings

   ![image-20230729164803602](https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729164803602.png)

   在左侧导航栏的最下方找到`Developer settings`,然后点击，->

![image-20230729164654737](https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729164654737.png)

跳转到如下页面->

![image-20230729152822569](https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729152822569.png)

然后，设置过期时间，权限等 ->

![image-20230729164637962](https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729164637962.png)

最后，划到页面最底部，点击生成token：*************

![image-20230729153248698](https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729153248698.png)

**注意:这个token只能查看一次，如果离开这个页面在返回就看不到了, 所以先保存好token**



### 3.  :hammer_and_wrench:配置PicGo

打开PicGo

点击图床设置，我们可以看到GitHub

![image-20230729155924896](https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729155924896.png)

:one:：图床配置名

> 可以自己随便命名

:two:: 设置仓库名

> 用户名/仓库名

:three::设置分支名

> 一般都为main

:four:: 设置token

> 这里就要用到我们之前创建仓库之后设置的token了，将它填进去即可

:five:: 设置存储路径

> 默认的话会上传的仓库的根目录，也就是/，如果我们想要上传到仓库的某个目录下，就需要填写目录名称，并且以/结尾
>
> 比如我想上传到仓库下的blog目录下，这里就填写`blog/`

:six:: 设置自定义域名

> 我这里没有用到自定义域名，如果读者有需要的话可以问问度娘

配置完之后，在上传区选中GitHub

![image-20230729162854239](https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729162854239.png)

到此Picgo和GitHub的图床已经配置完成了，接下来就可以快乐的将图片上传到GitHub，然后获取到链接，在远程来访问我们的图片啦。



### 4. Typora

另外，经常使用Typora的小伙伴也可以通过Typora的偏好设置来将我们本地的图片通过PicGo来自动上传到仓库中啦

1. 点开Typora导航栏中的文件

![image-20230729163642417](https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729163642417.png)

2. 在偏好设置中配置PicGo

   ![image-20230729164404631](https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepressimage-20230729164404631.png)

