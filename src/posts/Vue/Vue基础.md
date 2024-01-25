---
icon: python
date: 2024-01-03
cover: https://img.tucang.cc/api/image/show/6c8acb93bd0fc9dd85006746d572df8f
category:
    - Vue
tag:
    - 前端
    - 框架
---


# Vue基础知识


### 指令系统
1. v-text
2. v-html
3. v-show
4. v-if
5. v-model 双向数据绑定
### 常用属性

1. data()
2. el
3. methods
4. watch
5. computed
6. templates
### Vue组件
#### 全局组件
**用法**：
```
Vue.component("组件的名字", {属性：})
```
#### 局部组件

1. 声明子组件
2. 挂载子组件
3. 使用子组件
### 组件传值
#### 1. 父组件 -->  子组件
#### 2. 子组件  --> 父组件
#### 3. 平行组件传值


### 生命周期钩子函数

- beforeCreate
- created  重点
   - 组件创建
   - 虚拟DOM
   - 发送ajax，获取数据，实现数据驱动视图
- beforeMount
- mounted  重点
   - 获取真实DOM
- beforeUpdate
- updated
- activated
- deactivated
- 

### 组件的缓存
#### 内置组件标签
缓存组件
```html
<!--当组件在被切换后需要保存样式时-->
<keep-alive> 需要被缓存的组件 </keep-alive>
```
### Vue的全家桶（Vue+Vue-router+Vuex）

#### SPA（Single Page Application）

### Vue-router
安装：

1. CDN引入：
   1. vue-2.0： [https://unpkg.com/vue-router@2.0.0/dist/vue-router.js](https://unpkg.com/vue-router@2.0.0/dist/vue-router.js)
   2. vue-3.0： https://unpkg.com/vue-router@4.0.15/dist/vue-router.global.js。
2. 文件引入
> VUe的核心插件
> 文档参考：[https://router.vuejs.org/zh/](https://router.vuejs.org/zh/)

```html
 Vue Router 是 Vue.js 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。功能包括：  
● 嵌套路由映射
● 动态路由选择
● 模块化、基于组件的路由配置
● 路由参数、查询、通配符
● 展示由 Vue.js 的过渡系统提供的过渡效果
● 细致的导航控制
● 自动激活 CSS 类的链接
● HTML5 history 模式或 hash 模式
● 可定制的滚动行为
● URL 的正确编码
```
#### 1. 定义组件
在页面中定义路由组件，在路由规则中进行映射
#### 2. 定义路由
```javascript

routes:[
  {
    path: "/home",
    component: Home
  },
  {
    path: '/course',
    component: Course
  }
]
```
#### 3. 创建路由实例
```javascript
const router = new VueRouter({
})
```
#### 4. 挂载路由实例到根实例
```javascript
new Vue({
        el: "#app",
        // 挂载路由
        router: router,
        data: function () {
            return {

            };
        },
        template: `<App></App>`,
        components: {
            App
        }
    })

```

1. 全局组件：router-link
    1. 使用 router-link 组件来导航.
    2. 通过传入 `to` 属性指定链接.
    3.  router-link 默认会被渲染成一个 `<a>` 标签
```html
# 触发原生的click事件
<router-link :to='/' @click.native='function'>  
```

2. 全局组件：router-view

```html
<div id="app">
</div>
<script src="../js/vue.js"></script>
<script src="vue-router.js"></script>
<script>
    const Home = {
        data: function(){
            return {

            };
        },
        template: `<div class="home">这是首页</div>`,
    };
    const Course = {
        data: function () {
            return {

            };
        },
        template: `<div class="course">课程列表</div>`,
    };
    //创建路由规则
    const routes = [
        {
            path: "/home",
            component: Home
        },
        {
            path: '/course',
            component: Course
        }
    ];
    // 定义路由
    const router = new VueRouter({
        // 缩写
        // routes
        routes: routes,
    })



    let App = {
        data: function () {
            return {};
        },
        // router-view 路由组件出口
        template: `
            <div>
                <div class="header">
                    <router-link to="/home">首页</router-link>
                    <router-link to="/course">课程</router-link>
                </div>
                <router-view></router-view>

            </div>`,
    };
    new Vue({
        el: "#app",
        // 挂载路由
        router: router,
        data: function () {
            return {

            };
        },
        template: `<App></App>`,
        components: {
            App
        }
    })

</script>
```

![图片.png](https://cdn.nlark.com/yuque/0/2022/png/21881466/1657853063854-7756e3de-0601-41d8-9b79-d3bb0ece4fe2.png#clientId=u73c377bf-d8c8-4&from=paste&height=199&id=aFxAb&originHeight=217&originWidth=533&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13661&status=done&style=none&taskId=u6c3cef8b-1472-4069-acb2-008d50fcddf&title=&width=488.58333333333337)![图片.png](https://cdn.nlark.com/yuque/0/2022/png/21881466/1657853118534-29147083-6cd0-497e-a473-8d43ba3a7e9c.png#clientId=u73c377bf-d8c8-4&from=paste&height=133&id=ZbpsY&originHeight=145&originWidth=1011&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10936&status=done&style=none&taskId=u545921ad-84e7-4f16-9aa5-d29192f1b72&title=&width=926.7500000000001)
#### 7. 编程式路由
>  除了使用 <router-link> 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。  

| 声明式 | 编程式 |
| --- | --- |
| <router-link :to="..."> | router.push(...) |

$.router.push

1. $route对象（）
2. ![](https://cdn.nlark.com/yuque/0/2022/png/21881466/1657853063854-7756e3de-0601-41d8-9b79-d3bb0ece4fe2.png#averageHue=%23fefdfd&from=url&id=lQXdy&originHeight=217&originWidth=533&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
3. $router对象（路由对象）
4. ![图片.png](https://cdn.nlark.com/yuque/0/2022/png/21881466/1657853962313-b8dd9df5-2db3-4fc1-95c8-efdd920a0e4d.png#averageHue=%23fefdfc&clientId=ufe7dd909-2a9c-4&from=paste&height=151&id=EWXrt&originHeight=165&originWidth=1024&originalType=binary&ratio=1&rotation=0&showTitle=false&size=20962&status=done&style=stroke&taskId=u58fae339-ee23-4ece-968d-e2762f77912&title=&width=938.6666666666667)
```javascript
 //创建路由规则
    const routes = [
        {
            path: "/home",
            name: "Home",
            component: Home
        },
        {
            path: '/course',
            component: Course
        },
        // 动态路由规则
        {
            path: '/user/:id',
            component: User
        }
    ];
// 动态路由试例
    const User = {
        data(){
            return {};
        },
        template: `<div class="user"><p>用户ID：{{$route.params.id}}</p></div>`,
        // 由于组件被复用，钩子函数只会调用一次
        created(){
            console.log(this.$route.params.id)
        },
        // 使用watch监听路由变化或者beforeRouteUpdate 导航守卫
        watch: {
            $route(to, from) {
                console.log(to)
                console.log(from)
                // 跳转到首页
                // 编程式跳转
                // this.$router.push({path:'/home'})  // 可以加入对象
                this.$router.push({name:'Home'})  // 可以加入对象
            }
        }
    }
    let App = {
        data: function () {
            return {};
        },
        // router-view 路由组件出口
        template: `
            <div>
                <div class="header">
                    <router-link to="/home">首页</router-link>
                    <router-link to="/course">课程</router-link>
<!--                    <router-link to="/user">用户</router-link>-->
<!--使用了path参数，params参数会失效<router-link :to="{path:'/user', params: {id: 1}}">用户</router-link>-->
                    <router-link :to="{path:'/user/1'}">用户</router-link>
                </div>
                <router-view></router-view>

            </div>`,
    };
```
#### 8. 嵌套路由
> 可以在被渲染的组件中添加自己的路由出口 <router-link> 例如，在 User 组件的模板添加一个 <router-view>：  

```javascript
const User = {
  template: `
  <div class="user">
  <h2>User {{ $route.params.id }}</h2>
  <router-view></router-view>
  </div>
  `
}
```
>  要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置：  
> 

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})

```
### 获取元素DOM的方式
在标签中使用`refs`属性
### scoped属性
在style中设定的样式只对当前组件的标签生效
### `@`符号的作用
解析当前文件路径

### element-ui的使用
#### 1. 安装element-ui
网站地址：[https://element.eleme.cn/#/zh-CN/component/installation](https://element.eleme.cn/#/zh-CN/component/installation)
```bash
// 推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。
npm i element-ui -S
```
#### 2. 引入Element
 在 main.js 中写入以下内容：  
```vue
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);
```
#### 3. 按需引入组件
> 借助 [babel-plugin-component](https://github.com/QingWei-Li/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

```bash
npm install babel-plugin-component -D
```
然后，将 .babelrc 修改为：
```json
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```
在main.js中引入需要的组件：
```javascript
import Vue from 'vue';
import { Button, Select } from 'element-ui';
import App from './App.vue';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
/* 或写为
* Vue.use(Button)
* Vue.use(Select)
*/

new Vue({
  el: '#app',
  render: h => h(App)
});
```

### axios
将axios挂载到Vue实例上
Vue.prototype.$自定义name = axios
```vue
import Axios from 'axios'
Vue.prototype.$Axios = Axios
```
#### 安装
```html
npm i axios -S
```
#### 配置默认值

1. 设置公共URL
   1. axios.default.baseURL
2. 

### vuex
文档地址：[https://v3.vuex.vuejs.org/zh/](https://v3.vuex.vuejs.org/zh/)
> Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 [devtools extension(opens new window)](https://github.com/vuejs/vue-devtools)，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

#### 安装vuex
```bash
npm i vuex -S  // 局部安装vuex
npm i vuex@2.0.0 -S  // 安装旧版本的vuex
```
#### 简单使用vuex
> [安装](https://v3.vuex.vuejs.org/zh/installation.html) Vuex 之后，让我们来创建一个 store。创建过程直截了当——仅需要提供一个初始 state 对象和一些 mutation：  


```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```
每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的**状态 (state)**。Vuex 和单纯的全局对象有以下两点不同：

1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 (commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用
#### 核心概念
##### 1. state
>  Vuex 使用**单一状态树**——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 ([SSOT](https://en.wikipedia.org/wiki/Single_source_of_truth)[(opens new window)](https://en.wikipedia.org/wiki/Single_source_of_truth))”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。  

```javascript
// 从 store 实例中读取状态最简单的方法就是在计算属性 (opens new window)中返回某个状态


```

### 权限控制
### Vue-Cookie

