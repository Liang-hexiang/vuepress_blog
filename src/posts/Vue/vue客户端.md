---
icon: vue
date: 2024-01-25
cover: https://img.tucang.cc/api/image/show/6c8acb93bd0fc9dd85006746d572df8f
category:
    - Vue
tag:
    - 前端
    - 框架
---


# Vue客户端





### 1. 什么是webpack
>  本质上，_webpack_ 是一个现代 JavaScript 应用程序的_静态模块打包器(module bundler)_。当 webpack 处理应用程序时，它会递归地构建一个_依赖关系图(dependency graph)_，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 _bundle_。  

![图片.png](https://cdn.nlark.com/yuque/0/2022/png/21881466/1657857178273-f17c0225-7be9-470a-b14a-3fdaebbcc194.png#clientId=u946fd131-c234-4&from=paste&height=319&id=u62fb1adf&originHeight=588&originWidth=1125&originalType=binary&ratio=1&rotation=0&showTitle=false&size=60942&status=done&style=none&taskId=ua4fd9b52-4a29-4fc7-8637-ff6a4daecd2&title=&width=610.1666870117188)
### 2. 安装webpack
```bash
PS C:\Users\Administrator> npm i webpack@3.12.0 -g
```
### DIY脚手架
#### 1. cmd规范

   1. 抛出：module.exports = xxx
   2. 引用：require(相对路径)
#### 2. ES6  module


```javascript
var person;
person = {
    name: "Tom",
    age: 20,
    action: function () {
        console.log("吃饭")
    }
};
var text = "测试webpack";

// 抛出变量
export {text};
// 抛出对象
export default person;

```

![图片.png](https://cdn.nlark.com/yuque/0/2022/png/21881466/1657861083761-d7c826f4-dd52-46ef-a417-ad22bbfbe9e8.png#clientId=u946fd131-c234-4&from=paste&height=513&id=u5882659e&originHeight=560&originWidth=729&originalType=binary&ratio=1&rotation=0&showTitle=false&size=65714&status=done&style=none&taskId=u11e2c40e-49fc-42e7-9d89-ce8d762efdd&title=&width=668.25)
```javascript
// 引入
// as x 起变量名，避免冲突
import * as c from './module'

console.log(c.text)

```
```html
<body>
  <div id="app"></div>
  <script src="./main.js"></script>
</body>
</html>

```
![图片.png](https://cdn.nlark.com/yuque/0/2022/png/21881466/1657861203034-2540a3cd-9b91-4e2a-a042-bea3f9c48bec.png#clientId=u946fd131-c234-4&from=paste&height=73&id=u1c14d7f7&originHeight=80&originWidth=600&originalType=binary&ratio=1&rotation=0&showTitle=false&size=5254&status=done&style=none&taskId=ud2b3a6cc-34d1-4b29-a4db-355a332deef&title=&width=550)Uncaught SyntaxError: Cannot use import statement outside a module
使用webpack支持模块化
```bash
E:\giteePython\FrontEndStudy\Vue\Day-04\webpack模块化支持>webpack ./main.js ./bundle.js
Hash: 245a451e490b2734bb12
Version: webpack 3.12.0
Time: 35ms
Asset     Size  Chunks             Chunk Names
bundle.js  3.29 kB       0  [emitted]  main
[0] ./main.js 102 bytes {0} [built]
[1] ./module.js 231 bytes {0} [built]

E:\giteePython\FrontEndStudy\Vue\Day-04\webpack模块化支持>

```
```html
<body>
  <div id="app"></div>
  <!--<script src="./main.js"></script>-->
  <script src="./bundle.js"></script>
</body>
```
![图片.png](https://cdn.nlark.com/yuque/0/2022/png/21881466/1657861702777-25715e43-c31c-4eaf-979d-66df157632fc.png#clientId=u946fd131-c234-4&from=paste&height=195&id=u23ac1549&originHeight=213&originWidth=948&originalType=binary&ratio=1&rotation=0&showTitle=false&size=19351&status=done&style=none&taskId=u403cd069-6124-47c6-882f-47c49a184cf&title=&width=869.0000000000001)
### vue-cli3脚手架的使用
CLI (@vue/cli) 是一个全局安装的 npm 包，提供了终端里的 vue 命令。它可以通过 vue create 快速搭建一个新项
目，或者直接通过 vue serve 构建新想法的原型。你也可以通过 vue ui 通过一套图形化界面管理你的所有项目 。
#### 安装
> 关于旧版本
> Vue CLI 的包名称由 vue-cli 改成了 @vue/cli。 如果你已经全局安装了旧版本的 vue-cli (1.x 或 2.x)，你需要先通过 npm uninstall vue-cli -g 或 yarn global remove vue-cli 卸载它。
>

```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli


C:\Users\Administrator>npm install -g @vue/cli
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
[######............] \ idealTree:tar-stream: timing idealTree:node_modules/@vue/cli/node_modules/tar-stream Completed i
```
### 拉取 2.x 模板 (旧版本) 
>  Vue CLI >= 3 和旧版使用了相同的 vue 命令，所以 Vue CLI 2 (vue-cli) 被覆盖了。如果你仍然需要使用旧版本的 vue init 功能，你可以全局安装一个桥接工具：  
>

```bash
npm install -g @vue/cli-init
# `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
vue init webpack my-project
```
### 使用vue-cli 2.x 创建项目
#### 使用webpack-simple创建项目

1. 命令 vue init webpack-simple my_project

![图片.png](https://cdn.nlark.com/yuque/0/2022/png/21881466/1657869331955-239fb974-451e-4de8-a1ee-42dba3f75bbc.png#clientId=ud5ec8b75-3503-4&from=paste&height=273&id=ub2c2bf4b&originHeight=298&originWidth=851&originalType=binary&ratio=1&rotation=0&showTitle=false&size=35001&status=done&style=none&taskId=u4a9fa155-412f-4b57-a54e-83ae75fb6e0&title=&width=780.0833333333334)	2. 文件结构：
![图片.png](https://cdn.nlark.com/yuque/0/2022/png/21881466/1657877155012-41ce1a56-74e1-4678-9474-40f6bc9e0090.png#clientId=ud5ec8b75-3503-4&from=paste&height=215&id=u94af56a3&originHeight=234&originWidth=340&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11108&status=done&style=none&taskId=u72b74c6b-deb1-499c-900c-f579d448499&title=&width=311.6666666666667)	

#### 使用webpack创建项目

1. 命令： vue init webpack 项目名
2. 文件结构
3. ![图片.png](https://cdn.nlark.com/yuque/0/2022/png/21881466/1657877049097-09fc14a3-19c5-4340-9995-41c162349ac3.png#clientId=ud5ec8b75-3503-4&from=paste&height=265&id=u7419ccb5&originHeight=289&originWidth=370&originalType=binary&ratio=1&rotation=0&showTitle=false&size=12570&status=done&style=none&taskId=u4b961330-dca6-4a24-9c7c-b9817fdf9ec&title=&width=339.1666666666667)

### 启动
```bash
npm run dev
```
![图片.png](https://cdn.nlark.com/yuque/0/2022/png/21881466/1657870143085-8bcae05a-269c-4618-ac4f-1c28323a59d1.png#clientId=ud5ec8b75-3503-4&from=paste&height=583&id=ud188b8ce&originHeight=636&originWidth=1394&originalType=binary&ratio=1&rotation=0&showTitle=false&size=145703&status=done&style=none&taskId=u34001fa6-9ea9-49e1-a0fe-041e6bbc693&title=&width=1277.8333333333335)###  安装vue-router
```bash
npm install vue-router -S  // 局部安装vue-router
// 安装报错的话指定版本安装
npm install vue-router@2.0.0 -S 
```
> 在引入文件时，index.js可以省略不写

### webpack
#### 1. entry
> 项目的入口文件, (main.js或者index.js)

#### 2. output
> 输出出口

#### 3. loading
> babel-loader: 对es6代码的解析
> css-loader：css代码解析
> style-loader：将css代码添加一个style标签插入到header中