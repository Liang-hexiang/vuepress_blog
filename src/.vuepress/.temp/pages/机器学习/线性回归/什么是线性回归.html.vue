<template><div><h1 id="什么是线性回归" tabindex="-1"><a class="header-anchor" href="#什么是线性回归" aria-hidden="true">#</a> 什么是线性回归</h1>
<h3 id="线性回归名字解析" tabindex="-1"><a class="header-anchor" href="#线性回归名字解析" aria-hidden="true">#</a> <code v-pre>线性回归</code>名字解析</h3>
<p>想要理解线性回归，首先我们要了解这个名字。我们可以把&quot;线性回归&quot;分解成<code v-pre>线性</code>和<code v-pre>回归</code>两个部分，<strong>线性</strong>表示的是一类模型，即<code v-pre>线性模型</code>，而<strong>回归</strong>表示的是一类问题，叫做<strong>回归问题</strong>。<br>
所以<code v-pre>线性回归</code>通俗的理解也就是'使用线性模式来解决回归问题'。</p>
<h3 id="主要关注" tabindex="-1"><a class="header-anchor" href="#主要关注" aria-hidden="true">#</a> 主要关注</h3>
<p>1️⃣ 回归问题</p>
<p>2️⃣ 线性方程</p>
<p>3️⃣偏差度量</p>
<p>4️⃣权重更新</p>
<img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepress/2024-03-25-gJfaPb.png" title="回归模型训练示意图" alt="回归模型训练示意图"/>
<h3 id="回归问题" tabindex="-1"><a class="header-anchor" href="#回归问题" aria-hidden="true">#</a> 回归问题</h3>
<p><strong>回归</strong>一词表示，万物的发展轨迹都不是一条单调向上或者向下的直线，而是沿着均值波动。<br>
比如在研究中发现，如果父代身高高于平均值，则子代具有更高概率比他父亲要矮，也就是回归平均身高。</p>
<p>那么什么是回归问题呢？回归问题的具体例子很多，简单来说各个数据点都沿着一条主轴来回波动的问题都算是回归问题。</p>
<h3 id="数学解析" tabindex="-1"><a class="header-anchor" href="#数学解析" aria-hidden="true">#</a> 数学解析</h3>
<h4 id="线性函数" tabindex="-1"><a class="header-anchor" href="#线性函数" aria-hidden="true">#</a> 线性函数</h4>
<p><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepress/2024-03-30-zJRprv.png" alt="" loading="lazy"><br>
我们把上面函数中的符号逐个翻译一下：</p>
<p><strong><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mover accent="true"><mi>y</mi><mo>^</mo></mover></mrow><annotation encoding="application/x-tex">\hat{y}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.6944em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">y</span></span><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.1944em;"><span class="mord">^</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.1944em;"><span></span></span></span></span></span></span></span></span></strong>:</p>
</div></template>


