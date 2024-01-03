import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,a as t}from"./app-3d1f8f25.js";const p={},e=t(`<h1 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式" aria-hidden="true">#</a> 单例模式</h1><h2 id="单例模式的python实现" tabindex="-1"><a class="header-anchor" href="#单例模式的python实现" aria-hidden="true">#</a> 单例模式的Python实现</h2><h3 id="_1-普通单例模式" tabindex="-1"><a class="header-anchor" href="#_1-普通单例模式" aria-hidden="true">#</a> 1. 普通单例模式</h3><blockquote><p>_ <em>new</em> _方法可以在实例化类的时候通过hasattr方法返回同一个实例</p></blockquote><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">ExerciseSinglePattern</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__new__</span><span class="token punctuation">(</span>cls<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">hasattr</span><span class="token punctuation">(</span>cls<span class="token punctuation">,</span> <span class="token string">&#39;_instance&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            cls<span class="token punctuation">.</span>_instance <span class="token operator">=</span> <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__new__<span class="token punctuation">(</span>cls<span class="token punctuation">)</span>
        <span class="token keyword">return</span> cls<span class="token punctuation">.</span>_instance

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;__init__&#39;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>a <span class="token operator">=</span> a
        self<span class="token punctuation">.</span>b <span class="token operator">=</span> b
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    sp <span class="token operator">=</span> ExerciseSinglePattern<span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">)</span>
    sp2 <span class="token operator">=</span> ExerciseSinglePattern<span class="token punctuation">(</span><span class="token string">&#39;c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;d&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>sp<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>sp2<span class="token punctuation">)</span>
    <span class="token comment"># &lt;__main__.ExerciseSinglePattern object at 0x00000243AF6E4F70&gt;</span>
	<span class="token comment"># &lt;__main__.ExerciseSinglePattern object at 0x00000243AF6E4F70&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-使用装饰器实现单例模式" tabindex="-1"><a class="header-anchor" href="#_2-使用装饰器实现单例模式" aria-hidden="true">#</a> 2. 使用装饰器实现单例模式</h3><h4 id="_2-1-装饰器-decorators" tabindex="-1"><a class="header-anchor" href="#_2-1-装饰器-decorators" aria-hidden="true">#</a> 2.1 装饰器（Decorators）</h4><blockquote><p>装饰器是Python中很重要的内容，属于Python的进阶知识；装饰器的本质可以理解为一个高阶函数，因为它返回的是一个函数对象。装饰器可以在不修改被装饰代码的情况下对代码增加额外的功能，这种动态增加功能的方式，我们称之为“装饰器”.</p></blockquote><p>1️⃣<strong>普通装饰器：</strong></p><p>一般来说，装饰器的基本代码格式为两层嵌套函数，如下所示：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
<span class="token comment"># 装饰器</span>
<span class="token keyword">def</span> <span class="token function">decorator</span><span class="token punctuation">(</span>func<span class="token punctuation">:</span>被装饰函数<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span><span class="token comment"># *args和**kwargs主要是被装饰函数所需的参数</span>
        <span class="token comment"># 函数执行前的操作</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Start:&quot;</span><span class="token punctuation">)</span>
        func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        <span class="token comment"># 函数执行后的操作</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;End&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> wrapper
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上就是一个简单的装饰器，如果要使用装饰器，则使用Python中的语法糖<code>@</code></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 基本函数</span>
<span class="token keyword">def</span> <span class="token function">test</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span>
    
<span class="token comment"># 使用装饰器后的函数</span>
<span class="token decorator annotation punctuation">@decorator</span>
<span class="token keyword">def</span> <span class="token function">test</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span>
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    test<span class="token punctuation">(</span><span class="token string">&#39;装饰器&#39;</span><span class="token punctuation">)</span>
  	<span class="token triple-quoted-string string">&quot;&quot;&quot;
  	Start:
	装饰器
	End
  	&quot;&quot;&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2️⃣<strong>带参数的装饰器:</strong></p><blockquote><p>如果装饰器本身需要传递参数，则需要构建一个可以返回装饰器的高阶函数。</p></blockquote><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 带有参数的装饰器</span>
<span class="token keyword">def</span> <span class="token function">logger_decorator</span><span class="token punctuation">(</span>log_info<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 装饰器</span>
    <span class="token keyword">def</span> <span class="token function">decorator</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 内层函数</span>
        <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>func<span class="token punctuation">.</span>__name__<span class="token punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token punctuation">{</span>log_info<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
            func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        <span class="token keyword">return</span> wrapper
    <span class="token keyword">return</span> decorator

<span class="token comment"># 带有参数的装饰器使用方法如下</span>
<span class="token decorator annotation punctuation">@logger_decorator</span><span class="token punctuation">(</span><span class="token string">&quot;Start...&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;...End&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">test2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;正在插入数据&quot;</span><span class="token punctuation">)</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
    
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    <span class="token comment"># test(&#39;装饰器&#39;)</span>
    test2<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepress/image-20231230132509562.png" alt="image-20231230132509562" tabindex="0" loading="lazy"><figcaption>image-20231230132509562</figcaption></figure><p>在我们执行被装饰器装饰的函数时，我们使用函数的方式和普通函数无异，也就是说如果我们想要对<code>test2()</code>函数增加打印执行时间的功能，我们只需要添加一个装饰器，由于函数调用的方式并没有发生变化，所以就无需更改任何原代码就可完成对代码额外功能的增加</p><p>我们来剖析一下上面调用<code>test()</code>函数时，程序的执行流程</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">#我们在调用test2()函数时，程序的执行顺序如下</span>
logger_decorator<span class="token punctuation">(</span>arg1<span class="token punctuation">,</span>arg2<span class="token punctuation">)</span><span class="token punctuation">(</span>test2<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span><span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
<span class="token comment"># 1. 首先，执行的是logger_decorator</span>
logger_decorator<span class="token punctuation">(</span>arg1<span class="token punctuation">,</span>arg2<span class="token punctuation">)</span>
<span class="token comment"># 2. 由上面的函数可知，logger_decorator函数返回的是decorator</span>
decorator <span class="token operator">=</span> logger_decorator<span class="token punctuation">(</span>arg1<span class="token punctuation">,</span>arg2<span class="token punctuation">)</span>
<span class="token comment"># 3. decorator接受一个参数func，这个参数就是被装饰函数的引用，接下来</span>
wrapper <span class="token operator">=</span> decorator<span class="token punctuation">(</span>test2<span class="token punctuation">)</span>
<span class="token comment"># 4. 其实，在执行test2时，实际上执行的是wrapper</span>
wrapper<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
<span class="token comment"># 以上就是通过装饰器装饰后的函数的整体流程</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3️⃣:<strong>通过签名调用的函数</strong></p><blockquote><p>上面我们说过，使用装饰器装饰过的函数，使用方法和被装饰前无异，但是有另外一种情况：我们依赖某个函数的签名，即func.<strong>name</strong>，此时我们如果装饰func的话，func.__name__就会发生改变，因为实际上func已经变成了wrapper，所以依赖函数签名的程序就会报错。针对这种情况，我们使用python内置的方法即可解决：functools.wraps函数</p></blockquote><p>如果我们不使用functools.wraps:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">wraps_decorator</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Do Something......&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
    <span class="token keyword">return</span> wrapper

<span class="token decorator annotation punctuation">@wraps_decorator</span>
<span class="token keyword">def</span> <span class="token function">wraps_test</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    <span class="token comment"># 我们如果不使用functools.wraps</span>
    func_name <span class="token operator">=</span> wraps_test<span class="token punctuation">.</span>__name__
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;wraps_test函数名称：</span><span class="token interpolation"><span class="token punctuation">{</span>func_name<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    wraps_test函数名称：wrapper
    &quot;&quot;&quot;</span>
    
    <span class="token comment"># 我们可以看到，wraps_test签名变成了wrapper</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用functools.wraps</strong>：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 使用方式很简单，通过装饰器的写法装饰内层函数即可</span>
<span class="token keyword">import</span> functools


<span class="token keyword">def</span> <span class="token function">wraps_decorator</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token decorator annotation punctuation">@functools<span class="token punctuation">.</span>wraps</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Do Something......&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
    <span class="token keyword">return</span> wrapper

<span class="token decorator annotation punctuation">@wraps_decorator</span>
<span class="token keyword">def</span> <span class="token function">wraps_test</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>

    <span class="token comment"># 使用functools.wraps</span>
    func_name <span class="token operator">=</span> wraps_test<span class="token punctuation">.</span>__name__
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;wraps_test函数名称：</span><span class="token interpolation"><span class="token punctuation">{</span>func_name<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    wraps_test函数名称：wraps_test
    &quot;&quot;&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26),o=[e];function c(i,l){return s(),a("div",null,o)}const d=n(p,[["render",c],["__file","单例模式.html.vue"]]);export{d as default};
