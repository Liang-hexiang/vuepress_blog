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




