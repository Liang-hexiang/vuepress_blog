<template><div><p>🔖 自 Spark 2.0 起，SparkSession 已成为 PySpark 与 RDD 和 DataFrame 配合使用的入口点。在2.0之前，入口点曾是SparkContext。 本节内容将主要通过定义和描述如何创建 SparkSession 以及使用-shellspark中的默认 SparkSession 变量来重点解释什么是 SparkSession........</p>
<!-- more -->
<h1 id="理解sparksession" tabindex="-1"><a class="header-anchor" href="#理解sparksession" aria-hidden="true">#</a> 📖理解SparkSession</h1>
<h2 id="sparksession" tabindex="-1"><a class="header-anchor" href="#sparksession" aria-hidden="true">#</a> 1️⃣SparkSession</h2>
<p>✏️在Spark2.0版本，pyspark.sql引入了一个新类<code v-pre>SparkSession</code>。SparkSession 是我们在 2.0 版本之前使用的所有不同上下文（SQLContext 和 HiveContext 等）的组合类。从 2.0 开始，SparkSession 可以用来替换 SQLContext、HiveContext 以及 2.0 之前定义的其他上下文。<br>
✏️正如开头提到的，SparkSession 是 PySpark 的入口点，创建 SparkSession 实例将是您使用 RDD、DataFrame 和 Dataset 进行编程时编写的第一个语句。<br>
✏️虽然 SparkContext 在 2.0 之前曾经是一个入口点，但并没有完全被 SparkSession 取代。SparkContext 的许多功能在 Spark 2.0 及更高版本中仍然可用，而且SparkSession是在内部创建了<code v-pre>SparkConfig </code>和<code v-pre>SparkContext</code>，并通过<code v-pre>SparkSession</code>来提供配置创建。</p>
<p>SparkSession还包括其他不同上下文的API：</p>
<ul>
<li>SparkContext,</li>
<li>SQLContext,</li>
<li>StreamingContext,</li>
<li>HiveContext.</li>
</ul>
<p>❓ PySpark程序中可以创建多少个SparkSession？</p>
<pre><code>可以创建多个SparkSession。如果想要PySpark表在逻辑上分离时，就需要使用`SparkSession.builder()`或者`SparkSession.newSession()`创建多个SparkSession
</code></pre>
<h2 id="创建sparksession" tabindex="-1"><a class="header-anchor" href="#创建sparksession" aria-hidden="true">#</a> 2️⃣创建SparkSession</h2>
<p>在PySpark程序中，需要使用构造器方法builder方法。builder方法的使用方法如下：</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment"># Create SparkSession from builder</span>
<span class="token keyword">import</span> pyspark
<span class="token keyword">from</span> pyspark<span class="token punctuation">.</span>sql <span class="token keyword">import</span> SparkSession
spark <span class="token operator">=</span> SparkSession<span class="token punctuation">.</span>builder<span class="token punctuation">.</span>master<span class="token punctuation">(</span><span class="token string">"local[1]"</span><span class="token punctuation">)</span> \
                    <span class="token punctuation">.</span>appName<span class="token punctuation">(</span><span class="token string">'SparkByExamples.com'</span><span class="token punctuation">)</span> \
                    <span class="token punctuation">.</span>getOrCreate<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>master()</code>: 如果是在集群上运行程序，需要使用主机名称为参数传入master()。这个参数值通常是<code v-pre>yarn</code>或者是<code v-pre>mesos</code>，这取决于你的主节点的配置。</li>
<li><code v-pre>local[num]</code>: 在单机模式下运行的时候使用。<code v-pre>num</code>应该是一个整数值，表示的是在使用<code v-pre>RDD</code>、<code v-pre>DataFrame</code>、<code v-pre>DataSet</code>时应该创建多少个分区。一般这个值可以是CPU核心数。</li>
<li><code v-pre>appName()</code>: 设置应用名称</li>
<li><code v-pre>getOrCreate()</code>: 从名字即可看出，获取或者创建SparkSession，如果已经存在则获取，否则创建新的SparkSession</li>
</ul>
<p><strong>创建另一个SparkSession：</strong></p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment"># Create new SparkSession</span>
spark2 <span class="token operator">=</span> SparkSession<span class="token punctuation">.</span>newSession
<span class="token keyword">print</span><span class="token punctuation">(</span>spark2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>使用上面的代码会创建一个新的SparkSession，并且与现有的SparkSession使用相同的应用名称。两个会话的底层 SparkContext 是相同的，因为每个 PySpark 应用程序只能有一个上下文。</p>
</blockquote>
<p><strong>获取现有的SparkSession</strong></p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment"># Get Existing SparkSession</span>
spark3 <span class="token operator">=</span> SparkSession<span class="token punctuation">.</span>builder<span class="token punctuation">.</span>getOrCreate
<span class="token keyword">print</span><span class="token punctuation">(</span>spark3<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-spark-配置" tabindex="-1"><a class="header-anchor" href="#使用-spark-配置" aria-hidden="true">#</a> 3️⃣使用 Spark 配置</h2>
<p>可以使用<code v-pre>config</code>方法为SparkSession增加配置</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment"># 使用 config()</span>
spark <span class="token operator">=</span> SparkSession<span class="token punctuation">.</span>builder 
      <span class="token punctuation">.</span>master<span class="token punctuation">(</span><span class="token string">"local[1]"</span><span class="token punctuation">)</span> 
      <span class="token punctuation">.</span>appName<span class="token punctuation">(</span><span class="token string">"SparkByExamples.com"</span><span class="token punctuation">)</span> 
      <span class="token punctuation">.</span>config<span class="token punctuation">(</span><span class="token string">"spark.some.config.option"</span><span class="token punctuation">,</span> <span class="token string">"config-value"</span><span class="token punctuation">)</span> 
      <span class="token punctuation">.</span>getOrCreate<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建启用hive的sparksession" tabindex="-1"><a class="header-anchor" href="#创建启用hive的sparksession" aria-hidden="true">#</a> 4️⃣ 创建启用Hive的SparkSession</h2>
<blockquote>
<p>为了将 Hive 与 PySpark 一起使用，您需要使用该enableHiveSupport()方法启用它。</p>
</blockquote>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code>spark <span class="token operator">=</span> SparkSession<span class="token punctuation">.</span>builder \
      <span class="token punctuation">.</span>master<span class="token punctuation">(</span><span class="token string">"local[1]"</span><span class="token punctuation">)</span> \
      <span class="token punctuation">.</span>appName<span class="token punctuation">(</span><span class="token string">"SparkByExamples.com"</span><span class="token punctuation">)</span> \
      <span class="token punctuation">.</span>config<span class="token punctuation">(</span><span class="token string">"spark.sql.warehouse.dir"</span><span class="token punctuation">,</span> <span class="token string">"&lt;path>/spark-warehouse"</span><span class="token punctuation">)</span> \
      <span class="token punctuation">.</span>enableHiveSupport<span class="token punctuation">(</span><span class="token punctuation">)</span> \
      <span class="token punctuation">.</span>getOrCreate<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="获取或配置pyspark-config" tabindex="-1"><a class="header-anchor" href="#获取或配置pyspark-config" aria-hidden="true">#</a> 5️⃣ 获取或配置PySpark Config</h2>
<blockquote>
<p>创建 SparkSession 后，您可以在运行时添加 Spark 配置或获取所有配置。</p>
</blockquote>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment"># Set Config</span>
spark<span class="token punctuation">.</span>conf<span class="token punctuation">.</span><span class="token builtin">set</span><span class="token punctuation">(</span><span class="token string">"spark.executor.memory"</span><span class="token punctuation">,</span> <span class="token string">"5g"</span><span class="token punctuation">)</span>

<span class="token comment"># Get a Spark Config</span>
partitions <span class="token operator">=</span> spark<span class="token punctuation">.</span>conf<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">"spark.sql.shuffle.partitions"</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>partitions<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="简单创建dataframe" tabindex="-1"><a class="header-anchor" href="#简单创建dataframe" aria-hidden="true">#</a> 6️⃣ 简单创建DataFrame</h2>
<p>使用<code v-pre>createDataFrame</code>创建DataFrame</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment"># Create DataFrame</span>
df <span class="token operator">=</span> spark<span class="token punctuation">.</span>createDataFrame<span class="token punctuation">(</span>
    <span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token string">"Scala"</span><span class="token punctuation">,</span> <span class="token number">25000</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token string">"Spark"</span><span class="token punctuation">,</span> <span class="token number">35000</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token string">"PHP"</span><span class="token punctuation">,</span> <span class="token number">21000</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
df<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># Output</span>
<span class="token comment">#+-----+-----+</span>
<span class="token comment">#|   _1|   _2|</span>
<span class="token comment">#+-----+-----+</span>
<span class="token comment">#|Scala|25000|</span>
<span class="token comment">#|Spark|35000|</span>
<span class="token comment">#|  PHP|21000|</span>
<span class="token comment">#+-----+-----+</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🔗 <a href='https://sparkbyexamples.com/pyspark/different-ways-to-create-dataframe-in-pyspark/'>其他创建DataFrame的方法</a></p>
<p>、</p>
</div></template>


