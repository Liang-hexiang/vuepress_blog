import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as i,c as o,d as n,e as s,f as e,a as t}from"./app-b25f38f8.js";const c={},r=t(`<h1 id="vue基础" tabindex="-1"><a class="header-anchor" href="#vue基础" aria-hidden="true">#</a> Vue基础</h1><h3 id="指令系统" tabindex="-1"><a class="header-anchor" href="#指令系统" aria-hidden="true">#</a> 指令系统</h3><ol><li>v-text</li><li>v-html</li><li>v-show</li><li>v-if</li><li>v-model 双向数据绑定</li></ol><h3 id="常用属性" tabindex="-1"><a class="header-anchor" href="#常用属性" aria-hidden="true">#</a> 常用属性</h3><ol><li>data()</li><li>el</li><li>methods</li><li>watch</li><li>computed</li><li>templates</li></ol><h3 id="vue组件" tabindex="-1"><a class="header-anchor" href="#vue组件" aria-hidden="true">#</a> Vue组件</h3><h4 id="全局组件" tabindex="-1"><a class="header-anchor" href="#全局组件" aria-hidden="true">#</a> 全局组件</h4><p><strong>用法</strong>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Vue.component(&quot;组件的名字&quot;, {属性：})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="局部组件" tabindex="-1"><a class="header-anchor" href="#局部组件" aria-hidden="true">#</a> 局部组件</h4><ol><li>声明子组件</li><li>挂载子组件</li><li>使用子组件</li></ol><h3 id="组件传值" tabindex="-1"><a class="header-anchor" href="#组件传值" aria-hidden="true">#</a> 组件传值</h3><h4 id="_1-父组件-子组件" tabindex="-1"><a class="header-anchor" href="#_1-父组件-子组件" aria-hidden="true">#</a> 1. 父组件 --&gt; 子组件</h4><h4 id="_2-子组件-父组件" tabindex="-1"><a class="header-anchor" href="#_2-子组件-父组件" aria-hidden="true">#</a> 2. 子组件 --&gt; 父组件</h4><h4 id="_3-平行组件传值" tabindex="-1"><a class="header-anchor" href="#_3-平行组件传值" aria-hidden="true">#</a> 3. 平行组件传值</h4><h3 id="生命周期钩子函数" tabindex="-1"><a class="header-anchor" href="#生命周期钩子函数" aria-hidden="true">#</a> 生命周期钩子函数</h3><ul><li>beforeCreate</li><li>created 重点 <ul><li>组件创建</li><li>虚拟DOM</li><li>发送ajax，获取数据，实现数据驱动视图</li></ul></li><li>beforeMount</li><li>mounted 重点 <ul><li>获取真实DOM</li></ul></li><li>beforeUpdate</li><li>updated</li><li>activated</li><li>deactivated</li><li></li></ul><h3 id="组件的缓存" tabindex="-1"><a class="header-anchor" href="#组件的缓存" aria-hidden="true">#</a> 组件的缓存</h3><h4 id="内置组件标签" tabindex="-1"><a class="header-anchor" href="#内置组件标签" aria-hidden="true">#</a> 内置组件标签</h4><p>缓存组件</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!--当组件在被切换后需要保存样式时--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>keep-alive</span><span class="token punctuation">&gt;</span></span> 需要被缓存的组件 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>keep-alive</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vue的全家桶-vue-vue-router-vuex" tabindex="-1"><a class="header-anchor" href="#vue的全家桶-vue-vue-router-vuex" aria-hidden="true">#</a> Vue的全家桶（Vue+Vue-router+Vuex）</h3><h4 id="spa-single-page-application" tabindex="-1"><a class="header-anchor" href="#spa-single-page-application" aria-hidden="true">#</a> SPA（Single Page Application）</h4><h3 id="vue-router" tabindex="-1"><a class="header-anchor" href="#vue-router" aria-hidden="true">#</a> Vue-router</h3><p>安装：</p>`,25),u={href:"https://unpkg.com/vue-router@2.0.0/dist/vue-router.js",target:"_blank",rel:"noopener noreferrer"},d=n("li",null,"vue-3.0： https://unpkg.com/vue-router@4.0.15/dist/vue-router.global.js。",-1),v=n("li",null,"文件引入",-1),k={href:"https://router.vuejs.org/zh/",target:"_blank",rel:"noopener noreferrer"},m=t(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code> Vue Router 是 Vue.js 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。功能包括：  
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-定义组件" tabindex="-1"><a class="header-anchor" href="#_1-定义组件" aria-hidden="true">#</a> 1. 定义组件</h4><p>在页面中定义路由组件，在路由规则中进行映射</p><h4 id="_2-定义路由" tabindex="-1"><a class="header-anchor" href="#_2-定义路由" aria-hidden="true">#</a> 2. 定义路由</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>
<span class="token literal-property property">routes</span><span class="token operator">:</span><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&quot;/home&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">component</span><span class="token operator">:</span> Home
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/course&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">component</span><span class="token operator">:</span> Course
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-创建路由实例" tabindex="-1"><a class="header-anchor" href="#_3-创建路由实例" aria-hidden="true">#</a> 3. 创建路由实例</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-挂载路由实例到根实例" tabindex="-1"><a class="header-anchor" href="#_4-挂载路由实例到根实例" aria-hidden="true">#</a> 4. 挂载路由实例到根实例</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&quot;#app&quot;</span><span class="token punctuation">,</span>
        <span class="token comment">// 挂载路由</span>
        <span class="token literal-property property">router</span><span class="token operator">:</span> router<span class="token punctuation">,</span>
        <span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>

            <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;App&gt;&lt;/App&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            App
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>全局组件：router-link <ol><li>使用 <code>router-link</code> 组件来导航.</li><li>通过传入 <code>to</code> 属性指定链接.</li><li><code>&lt;router-link&gt; </code>默认会被渲染成一个 <code>&lt;a&gt;</code> 标签</li></ol></li></ol><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>    # 触发原生的click事件
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">:to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>/<span class="token punctuation">&#39;</span></span> <span class="token attr-name">@click.native</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>function<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>全局组件：router-view</li></ol><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>../js/vue.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>vue-router.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">const</span> Home <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>

            <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div class=&quot;home&quot;&gt;这是首页&lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> Course <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>

            <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div class=&quot;course&quot;&gt;课程列表&lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token comment">//创建路由规则</span>
    <span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&quot;/home&quot;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">component</span><span class="token operator">:</span> Home
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/course&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">component</span><span class="token operator">:</span> Course
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// 定义路由</span>
    <span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VueRouter</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token comment">// 缩写</span>
        <span class="token comment">// routes</span>
        <span class="token literal-property property">routes</span><span class="token operator">:</span> routes<span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>



    <span class="token keyword">let</span> App <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// router-view 路由组件出口</span>
        <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
            &lt;div&gt;
                &lt;div class=&quot;header&quot;&gt;
                    &lt;router-link to=&quot;/home&quot;&gt;首页&lt;/router-link&gt;
                    &lt;router-link to=&quot;/course&quot;&gt;课程&lt;/router-link&gt;
                &lt;/div&gt;
                &lt;router-view&gt;&lt;/router-view&gt;

            &lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&quot;#app&quot;</span><span class="token punctuation">,</span>
        <span class="token comment">// 挂载路由</span>
        <span class="token literal-property property">router</span><span class="token operator">:</span> router<span class="token punctuation">,</span>
        <span class="token function-variable function">data</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span>

            <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;App&gt;&lt;/App&gt;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            App
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function h(b,g){const a=l("ExternalLinkIcon");return i(),o("div",null,[r,n("ol",null,[n("li",null,[s("CDN引入： "),n("ol",null,[n("li",null,[s("vue-2.0： "),n("a",u,[s("https://unpkg.com/vue-router@2.0.0/dist/vue-router.js"),e(a)])]),d])]),v]),n("blockquote",null,[n("p",null,[s("VUe的核心插件 文档参考："),n("a",k,[s("https://router.vuejs.org/zh/"),e(a)])])]),m])}const _=p(c,[["render",h],["__file","Vue基础知识笔记.html.vue"]]);export{_ as default};
