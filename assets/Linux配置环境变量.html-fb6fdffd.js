import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,a as e}from"./app-45230bf8.js";const i={},l=e(`<h1 id="linux配置环境变量" tabindex="-1"><a class="header-anchor" href="#linux配置环境变量" aria-hidden="true">#</a> Linux配置环境变量</h1><h3 id="_1-查看所有变量" tabindex="-1"><a class="header-anchor" href="#_1-查看所有变量" aria-hidden="true">#</a> 1. 查看所有变量</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用env</span>
lianghexiang@ubuntu:~$ <span class="token function">env</span> 

<span class="token comment"># 使用export</span>
lianghexiang@ubuntu:~$ <span class="token builtin class-name">export</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-查看一个变量" tabindex="-1"><a class="header-anchor" href="#_2-查看一个变量" aria-hidden="true">#</a> 2. 查看一个变量</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>lianghexiang@ubuntu:~$ <span class="token builtin class-name">echo</span> <span class="token variable">\${变量名}</span>
<span class="token comment"># 或者</span>
lianghexiang@ubuntu:~$ <span class="token function">env</span> <span class="token operator">|</span> <span class="token function">grep</span> 变量名
<span class="token comment"># 或者</span>
lianghexiang@ubuntu:~$ <span class="token builtin class-name">export</span> <span class="token operator">|</span> <span class="token function">grep</span> 变量名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-设置变量" tabindex="-1"><a class="header-anchor" href="#_3-设置变量" aria-hidden="true">#</a> 3. 设置变量</h3><h4 id="_1-临时设置" tabindex="-1"><a class="header-anchor" href="#_1-临时设置" aria-hidden="true">#</a> 1. 临时设置</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 执行export 这个设置仅限当前终端有效，窗口关闭后无效</span>
<span class="token comment"># 其中PATH变量定义了运行命令的查找路径，以冒号:分割不同的路径，如，/home/yan/share/usr/local/arm/3.4.1/bin 这个就表示一个软件的路径了，多个软件就用:分开，如 /usr/local/LAMP/php/bin:/usr/local/LAMP/mysql/bin</span>
lianghexiang@ubuntu:~$ <span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span>:路径
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-当前登录用户的全局变量" tabindex="-1"><a class="header-anchor" href="#_2-当前登录用户的全局变量" aria-hidden="true">#</a> 2. 当前登录用户的全局变量</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 修改.bashrc文件</span>
<span class="token function">vim</span> ~/.bashrc
<span class="token comment"># 在该文件末尾添加如下行 path是要添加的变量的路径</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>path:<span class="token environment constant">$PATH</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-测试" tabindex="-1"><a class="header-anchor" href="#_3-测试" aria-hidden="true">#</a> 3. 测试</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 执行查看命令</span>
<span class="token builtin class-name">echo</span> <span class="token environment constant">$PATH</span>
<span class="token comment"># 或者</span>
<span class="token function">env</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),c=[l];function t(d,r){return a(),s("div",null,c)}const u=n(i,[["render",t],["__file","Linux配置环境变量.html.vue"]]);export{u as default};
