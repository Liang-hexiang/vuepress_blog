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
#### 5. 命名路由

1. 在路由规则中添加`name`属性
```html
path: "/home",
// 命名路由
name: "Home",
component: Home
```

2. 在router-link中绑定
```html
<router-link :to="{'name': 'Home'}">首页</router-link>
```
#### 6.动态路由

1. 路由规则
```javascript
 routes: [
    // 动态路径参数 以冒号开头
   // 在路由中设置的参数都会被添加到$route.params中，$route.params.id
    { path: '/user/:id', component: User }
  ]
// 可以在路由中设置多个参数，都会被
```
| 模式 | 匹配路径 | $route.params |
| --- | --- | --- |
| /user/:username | /user/tom | { username: 'tom' } |
| /user/:username/post/:post_id | /user/tom/post/123 | { username: 'tom', post_id: '123' } |

2. 响应路由参数的变化	
> 当使用路由参数时，`符合相同路由规则的导航`，例如从 /user/foo 导航到 /user/bar，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**。  

使用watch属性，监测路由的变化
```javascript
// 动态路由试例
    const User = {
        data(){
            return {};
        },
        template: `<div class="user"><p>用户ID：{{$route.params.id}}</p></div>`,
        // 由于组件被复用，钩子函数只会调用一次
        created(){
            console.log("组件被创建")
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

```
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


