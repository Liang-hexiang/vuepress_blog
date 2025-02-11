import{_ as e,r as i,o as t,c as l,e as o,f as n,d as p,a as s}from"./app-8962bb0b.js";const d={},u=s('<h1 id="prompt提示词" tabindex="-1"><a class="header-anchor" href="#prompt提示词" aria-hidden="true">#</a> Prompt提示词</h1><blockquote><p>如何去使用 Prompt，以充分发挥 LLM 的性能？首先我们需要知道设计 Prompt 的原则，它们是每一个开发者设计 Prompt 所必须知道的基础概念。本章讨论了设计高效 Prompt 的两个关键原则：<strong>编写清晰、具体的指令</strong>和<strong>给予模型充足思考时间</strong>。掌握这两点，对创建可靠的语言模型交互尤为重要。</p></blockquote><p>1️⃣首先，Prompt 需要清晰明确地表达需求，提供充足上下文，使语言模型准确理解我们的意图，就像向一个外星人详细解释人类世界一样。过于简略的 Prompt 往往使模型难以把握所要完成的具体任务。</p><p>2️⃣其次，让语言模型有充足时间推理也极为关键。就像人类解题一样，匆忙得出的结论多有失误。因此 Prompt 应加入逐步推理的要求，给模型留出充分思考时间，这样生成的结果才更准确可靠。</p><h3 id="原则一-编写清晰、具体的指令" tabindex="-1"><a class="header-anchor" href="#原则一-编写清晰、具体的指令" aria-hidden="true">#</a> 原则一: 编写清晰、具体的指令</h3><blockquote><p>在与语言模型交互时,以<strong>清晰、具体</strong>的方式表达需求。在许多情况下，更长、更复杂的 Prompt 反而会让语言模型更容易抓住关键点，给出符合预期的回复。原因在于，复杂的 Prompt 提供了更丰富的上下文和细节，让模型可以更准确地把握所需的操作和响应方式。</p></blockquote><h4 id="_1-使用分隔符清晰地表示输入的不同部分" tabindex="-1"><a class="header-anchor" href="#_1-使用分隔符清晰地表示输入的不同部分" aria-hidden="true">#</a> 1.使用分隔符清晰地表示输入的不同部分</h4>',7),c=s(`<p>使用分隔符尤其重要的是可以防止 <strong>提示词注入（Prompt Rejection）</strong>。什么是提示词注入？就是用户输入的文本可能包含与你的预设 Prompt 相冲突的内容，如果不加分隔，这些输入就可能“注入”并操纵语言模型，导致模型产生毫无关联的乱七八糟的输出。</p><p>举个例子，我们使用\`\`\`分隔文本和指令:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>text <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;&quot;&quot;
您应该提供尽可能清晰、具体的指示，以表达您希望模型执行的任务。\\
这将引导模型朝向所需的输出，并降低收到无关或不正确响应的可能性。\\
不要将写清晰的提示词与写简短的提示词混淆。\\
在许多情况下，更长的提示词可以为模型提供更多的清晰度和上下文信息，从而导致更详细和相关的输出。
&quot;&quot;&quot;</span></span>
<span class="token comment"># 需要总结的文本内容</span>
prompt <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;&quot;&quot;
把用三个反引号括起来的文本总结成一句话。
\`\`\`</span><span class="token interpolation"><span class="token punctuation">{</span>text<span class="token punctuation">}</span></span><span class="token string">\`\`\`
&quot;&quot;&quot;</span></span>
<span class="token comment"># 指令内容，使用 \`\`\` 来分隔指令和待总结的内容</span>
response <span class="token operator">=</span> get_completion<span class="token punctuation">(</span>prompt<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-寻求结构化的输出" tabindex="-1"><a class="header-anchor" href="#_2-寻求结构化的输出" aria-hidden="true">#</a> 2.寻求结构化的输出</h4><p>什么是结构化输出? 就是按照某种格式组织的内容，例如JSON、HTML等。这种输出非常适合在代码中进一步解析和处理。</p><p>比如：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token triple-quoted-string string">&quot;&quot;&quot;
请生成包括书名、作者和类别的三本虚构的、非真实存在的中文书籍清单，\\
并以 JSON 格式提供，其中包含以下键:book_id、title、author、genre。
&quot;&quot;&quot;</span>
response <span class="token operator">=</span> get_completion<span class="token punctuation">(</span>prompt<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;books&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token string">&quot;book_id&quot;</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token string">&quot;title&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;迷失的时光&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;author&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;genre&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;科幻&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token string">&quot;book_id&quot;</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token string">&quot;title&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;幻境之门&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;author&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;genre&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;奇幻&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token string">&quot;book_id&quot;</span><span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
      <span class="token string">&quot;title&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;虚拟现实&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;author&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;王五&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;genre&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;科幻&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-要求模型检查是否满足条件" tabindex="-1"><a class="header-anchor" href="#_3-要求模型检查是否满足条件" aria-hidden="true">#</a> 3. 要求模型检查是否满足条件</h4><p>如果任务包含不一定能满足的假设（条件），我们可以告诉模型先检查这些假设，如果不满足，则会指出并停止执行后续的完整流程。您还可以考虑可能出现的边缘情况及模型的应对，以避免意外的结果或错误发生。</p><h4 id="_4-提供少量示例" tabindex="-1"><a class="header-anchor" href="#_4-提供少量示例" aria-hidden="true">#</a> 4.提供少量示例</h4><p>&quot;Few-shot&quot; prompting，即在要求模型执行实际任务之前，给模型一两个已完成的样例，让模型了解我们的要求和期望的输出样式。</p><p>例如，在以下的样例中，我们先给了一个对话样例，然后要求模型用同样的隐喻风格回答关于“韧性”的问题。这就是一个少样本样例，它能帮助模型快速抓住我们要的语调和风格。</p><p>利用少样本样例，我们可以轻松“预热”语言模型，让它为新的任务做好准备。这是一个让模型快速上手新任务的有效策略。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>prompt <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;&quot;&quot;
您的任务是以一致的风格回答问题。

&lt;孩子&gt;: 请教我何为耐心。

&lt;祖父母&gt;: 挖出最深峡谷的河流源于一处不起眼的泉眼；最宏伟的交响乐从单一的音符开始；最复杂的挂毯以一根孤独的线开始编织。

&lt;孩子&gt;: 请教我何为韧性。
&quot;&quot;&quot;</span></span>
response <span class="token operator">=</span> get_completion<span class="token punctuation">(</span>prompt<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>
response <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token string">&quot;韧性是一种坚持不懈的品质，就像一棵顽强的树在风雨中屹立不倒。它是面对困难和挑战时不屈不挠的精神，能够适应变化和克服逆境。韧性是一种内在的力量，让我们能够坚持追求目标，即使面临困难和挫折也能坚持不懈地努力。&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="原则二-给模型时间去思考" tabindex="-1"><a class="header-anchor" href="#原则二-给模型时间去思考" aria-hidden="true">#</a> 原则二 给模型时间去思考</h3><blockquote><p>在设计 Prompt 时，给予语言模型充足的推理时间非常重要。语言模型与人类一样，需要时间来思考并解决复杂问题。如果让语言模型匆忙给出结论，其结果很可能不准确。例如，若要语言模型推断一本书的主题，仅提供简单的书名和一句简介是不足够的。这就像让一个人在极短时间内解决困难的数学题，错误在所难免。</p><p>相反，我们应通过 Prompt 指引语言模型进行深入思考。可以要求其先列出对问题的各种看法，说明推理依据，然后再得出最终结论。在 Prompt 中添加逐步推理的要求，能让语言模型投入更多时间逻辑思维，输出结果也将更可靠准确。</p><p>综上所述，给予语言模型充足的推理时间，是 Prompt Engineering 中一个非常重要的设计原则。这将大大提高语言模型处理复杂问题的效果，也是构建高质量 Prompt 的关键之处。开发者应注意给模型留出思考空间，以发挥语言模型的最大潜力。</p></blockquote><h4 id="_1-指定完成任务所需的步骤" tabindex="-1"><a class="header-anchor" href="#_1-指定完成任务所需的步骤" aria-hidden="true">#</a> 1.指定完成任务所需的步骤</h4><p>接下来我们将通过给定一个复杂任务，给出完成该任务的一系列步骤，来展示这一策略的效果。</p><p>首先我们描述了杰克和吉尔的故事，并给出提示词执行以下操作：首先，用一句话概括三个反引号限定的文本。第二，将摘要翻译成英语。第三，在英语摘要中列出每个名称。第四，输出包含以下键的 JSON 对象：英语摘要和人名个数。要求输出以换行符分隔。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>text <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;&quot;&quot;
在一个迷人的村庄里，兄妹杰克和吉尔出发去一个山顶井里打水。\\
他们一边唱着欢乐的歌，一边往上爬，\\
然而不幸降临——杰克绊了一块石头，从山上滚了下来，吉尔紧随其后。\\
虽然略有些摔伤，但他们还是回到了温馨的家中。\\
尽管出了这样的意外，他们的冒险精神依然没有减弱，继续充满愉悦地探索。
&quot;&quot;&quot;</span></span>
<span class="token comment"># example 1</span>
prompt_1 <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;&quot;&quot;
执行以下操作：
1-用一句话概括下面用三个反引号括起来的文本。
2-将摘要翻译成英语。
3-在英语摘要中列出每个人名。
4-输出一个 JSON 对象，其中包含以下键：english_summary，num_names。

请用换行符分隔您的答案。

Text:
\`\`\`</span><span class="token interpolation"><span class="token punctuation">{</span>text<span class="token punctuation">}</span></span><span class="token string">\`\`\`
&quot;&quot;&quot;</span></span>
response <span class="token operator">=</span> get_completion<span class="token punctuation">(</span>prompt_1<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;prompt 1:&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>

prompt <span class="token number">1</span><span class="token punctuation">:</span>
<span class="token number">1</span><span class="token operator">-</span>两个兄妹在山上打水时发生意外，但最终平安回家。
<span class="token number">2</span><span class="token operator">-</span>In a charming village<span class="token punctuation">,</span> siblings Jack <span class="token keyword">and</span> Jill <span class="token builtin">set</span> off to fetch water <span class="token keyword">from</span> a well on top of a hill<span class="token punctuation">.</span> While singing joyfully<span class="token punctuation">,</span> they climbed up<span class="token punctuation">,</span> but unfortunately<span class="token punctuation">,</span> Jack tripped on a stone <span class="token keyword">and</span> rolled down the hill<span class="token punctuation">,</span> <span class="token keyword">with</span> Jill following closely behind<span class="token punctuation">.</span> Despite some minor injuries<span class="token punctuation">,</span> they made it back to their cozy home<span class="token punctuation">.</span> Despite the mishap<span class="token punctuation">,</span> their adventurous spirit remained undiminished <span class="token keyword">as</span> they continued to explore <span class="token keyword">with</span> delight<span class="token punctuation">.</span>
<span class="token number">3</span><span class="token operator">-</span>Jack<span class="token punctuation">,</span> Jill
<span class="token number">4</span><span class="token operator">-</span><span class="token punctuation">{</span><span class="token string">&quot;english_summary&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;In a charming village, siblings Jack and Jill set off to fetch water from a well on top of a hill. While singing joyfully, they climbed up, but unfortunately, Jack tripped on a stone and rolled down the hill, with Jill following closely behind. Despite some minor injuries, they made it back to their cozy home. Despite the mishap, their adventurous spirit remained undiminished as they continued to explore with delight.&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;num_names&quot;</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述输出仍然存在一定问题，例如，键“姓名”会被替换为法语（译注：在英文原版中，要求从英语翻译到法语，对应指令第三步的输出为 &#39;Noms:&#39;，为Name的法语，这种行为难以预测，并可能为导出带来困难）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>prompt_2 = f&quot;&quot;&quot;
1-用一句话概括下面用&lt;&gt;括起来的文本。
2-将摘要翻译成英语。
3-在英语摘要中列出每个名称。
4-输出一个 JSON 对象，其中包含以下键：English_summary，num_names。

请使用以下格式：
文本：&lt;要总结的文本&gt;
摘要：&lt;摘要&gt;
翻译：&lt;摘要的翻译&gt;
名称：&lt;英语摘要中的名称列表&gt;
输出 JSON：&lt;带有 English_summary 和 num_names 的 JSON&gt;

Text: &lt;{text}&gt;
&quot;&quot;&quot;
response = get_completion(prompt_2)
print(&quot;\\nprompt 2:&quot;)
print(response)

prompt 2:
Summary: 在一个迷人的村庄里，兄妹杰克和吉尔在山顶井里打水时发生了意外，但他们的冒险精神依然没有减弱，继续充满愉悦地探索。

Translation: In a charming village, siblings Jack and Jill set off to fetch water from a well on top of a hill. Unfortunately, Jack tripped on a rock and tumbled down the hill, with Jill following closely behind. Despite some minor injuries, they made it back home safely. Despite the mishap, their adventurous spirit remained strong as they continued to explore joyfully.

Names: Jack, Jill

JSON Output: {&quot;English_summary&quot;: &quot;In a charming village, siblings Jack and Jill set off to fetch water from a well on top of a hill. Unfortunately, Jack tripped on a rock and tumbled down the hill, with Jill following closely behind. Despite some minor injuries, they made it back home safely. Despite the mishap, their adventurous spirit remained strong as they continued to explore joyfully.&quot;, &quot;num_names&quot;: 2}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-指导模型在下结论之前找出一个自己的解法" tabindex="-1"><a class="header-anchor" href="#_2-指导模型在下结论之前找出一个自己的解法" aria-hidden="true">#</a> 2.指导模型在下结论之前找出一个自己的解法</h4><p>在设计 Prompt 时，我们还可以通过明确指导语言模型进行自主思考，来获得更好的效果。</p><p>假设我们要语言模型判断一个数学问题的解答是否正确。仅仅提供问题和解答是不够的，语言模型可能会匆忙做出错误判断。</p><p>相反，我们可以在 Prompt 中先要求语言模型自己尝试解决这个问题，思考出自己的解法，然后再与提供的解答进行对比，判断正确性。这种先让语言模型自主思考的方式，能帮助它更深入理解问题，做出更准确的判断。</p><p>接下来我们会给出一个问题和一份来自学生的解答，要求模型判断解答是否正确：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>prompt <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;&quot;&quot;
判断学生的解决方案是否正确。

问题:
我正在建造一个太阳能发电站，需要帮助计算财务。

    土地费用为 100美元/平方英尺
    我可以以 250美元/平方英尺的价格购买太阳能电池板
    我已经谈判好了维护合同，每年需要支付固定的10万美元，并额外支付每平方英尺10美元
    作为平方英尺数的函数，首年运营的总费用是多少。

学生的解决方案：
设x为发电站的大小，单位为平方英尺。
费用：

    土地费用：100x
    太阳能电池板费用：250x
    维护费用：100,000美元+100x
    总费用：100x+250x+100,000美元+100x=450x+100,000美元
&quot;&quot;&quot;</span></span>
response <span class="token operator">=</span> get_completion<span class="token punctuation">(</span>prompt<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span>

<span class="token comment"># 学生的解决方案是正确的。他正确地计算了土地费用、太阳能电池板费用和维护费用，并将它们相加得到了总费用。</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是注意，学生的解决方案实际上是错误的。（<em>维护费用项100x应为10x，总费用450x应为360x</em>）</p><p>我们可以通过指导模型先自行找出一个解法来解决这个问题。</p><p>在接下来这个 Prompt 中，我们要求模型先自行解决这个问题，再根据自己的解法与学生的解法进行对比，从而判断学生的解法是否正确。同时，我们给定了输出的格式要求。通过拆分任务、明确步骤，让模型有更多时间思考，有时可以获得更准确的结果。在这个例子中，学生的答案是错误的，但如果我们没有先让模型自己计算，那么可能会被误导以为学生是正确的。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>prompt = f&quot;&quot;&quot;
请判断学生的解决方案是否正确，请通过如下步骤解决这个问题：
步骤：
    首先，自己解决问题。
    然后将您的解决方案与学生的解决方案进行比较，对比计算得到的总费用与学生计算的总费用是否一致，并评估学生的解决方案是否正确。
    在自己完成问题之前，请勿决定学生的解决方案是否正确。
使用以下格式：

    问题：问题文本
    学生的解决方案：学生的解决方案文本
    实际解决方案和步骤：实际解决方案和步骤文本
    学生计算的总费用：学生计算得到的总费用
    实际计算的总费用：实际计算出的总费用
    学生计算的费用和实际计算的费用是否相同：是或否
    学生的解决方案和实际解决方案是否相同：是或否
    学生的成绩：正确或不正确

问题：

    我正在建造一个太阳能发电站，需要帮助计算财务。 
    - 土地费用为每平方英尺100美元
    - 我可以以每平方英尺250美元的价格购买太阳能电池板
    - 我已经谈判好了维护合同，每年需要支付固定的10万美元，并额外支付每平方英尺10美元;
    作为平方英尺数的函数，首年运营的总费用是多少。
学生的解决方案：

    设x为发电站的大小，单位为平方英尺。
    费用：
    1. 土地费用：100x美元
    2. 太阳能电池板费用：250x美元
    3. 维护费用：100,000+100x=10万美元+10x美元
    总费用：100x美元+250x美元+10万美元+100x美元=450x+10万美元
实际解决方案和步骤：
&quot;&quot;&quot;
response = get_completion(prompt)
print(response)

实际解决方案和步骤：
    1. 土地费用：每平方英尺100美元，所以总费用为100x美元。
    2. 太阳能电池板费用：每平方英尺250美元，所以总费用为250x美元。
    3. 维护费用：固定费用为10万美元，额外费用为每平方英尺10美元，所以总费用为10万美元+10x美元。
    4. 总费用：将上述三项费用相加，得到总费用为100x美元+250x美元+10万美元+10x美元=360x+10万美元。
学生计算的总费用：450x+10万美元
实际计算的总费用：360x+10万美元
学生计算的费用和实际计算的费用是否相同：否
学生的解决方案和实际解决方案是否相同：否
学生的成绩：不正确

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三-局限性" tabindex="-1"><a class="header-anchor" href="#三-局限性" aria-hidden="true">#</a> 三 局限性</h3><p><strong>开发大模型相关应用时请务必铭记：</strong></p><p><strong>虚假知识</strong>：模型偶尔会生成一些看似真实实则编造的知识</p><p>在开发与应用语言模型时，需要注意它们可能生成虚假信息的风险。尽管模型经过大规模预训练，掌握了丰富知识，但它实际上并没有<em>完全</em>记住所见的信息，难以准确判断自己的知识边界，可能做出错误推断。若让语言模型描述一个不存在的产品,它可能会自行构造出似是而非的细节。这被称为“幻觉”(Hallucination)，是语言模型的一大缺陷。</p><p>如下示例展示了大模型的幻觉。我们要求告诉我们华为公司生产的 <em>GT Watch 运动手表</em> 产品的信息，事实上，这个公司是真实存在的，但产品是编造的，而模型一本正经地提供了它编造的知识，而且迷惑性很强。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>prompt = f&quot;&quot;&quot;
告诉我华为公司生产的GT Watch运动手表的相关信息
&quot;&quot;&quot;
response = get_completion(prompt)
print(response)

华为公司生产的GT Watch运动手表是一款智能手表，具有多种功能和特点。以下是相关信息：
1. 设计和外观：GT Watch采用圆形表盘设计，具有精致的外观和高质量的材料制造。它有多种颜色和表带选择，可以根据个人喜好进行定制。
2. 显示屏：GT Watch配备了1.39英寸的AMOLED显示屏，具有高清分辨率和良好的可视性。用户可以通过触摸屏幕进行操作和导航。
3. 运动追踪：GT Watch具有全天候的运动追踪功能，可以监测用户的步数、跑步距离、卡路里消耗和心率等数据。它还支持多种运动模式，如跑步、骑行、游泳等。
4. 健康监测：GT Watch可以监测用户的心率、血氧饱和度和睡眠质量等健康指标。它还提供健康建议和提醒，帮助用户保持良好的健康状态。
5. 通知和连接：GT Watch可以与用户的手机进行连接，通过蓝牙技术实现通知推送和电话提醒。用户可以在手表上查看短信、电话和社交媒体通知，无需拿出手机。
6. 长续航时间：GT Watch具有较长的续航时间，一次充电可以使用数天。它还支持快速充电技术，可以在短时间内充满电。
7. 其他功能：GT Watch还具有其他功能，如天气预报、闹钟、计时器、计步器等。它还支持NFC支付和音乐控制等便利功能。
总体而言，华为GT Watch是一款功能强大、外观精致的智能运动手表，适合那些注重健康和运动的用户使用。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>语言模型生成虚假信息的“幻觉”问题，是使用与开发语言模型时需要高度关注的风险。由于幻觉信息往往令人无法辨别真伪，开发者必须警惕并尽量避免它的产生。</p><p>目前 OpenAI 等公司正在积极研究解决语言模型的幻觉问题。在技术得以进一步改进之前，开发者可以通过Prompt设计减少幻觉发生的可能。例如，可以先让语言模型直接引用文本中的原句，然后再进行解答。这可以追踪信息来源，降低虚假内容的风险。</p><p>综上，语言模型的幻觉问题事关应用的可靠性与安全性。开发者有必要认识到这一缺陷（注：截至2023年7月），并采取Prompt优化等措施予以缓解，以开发出更加可信赖的语言模型应用。这也将是未来语言模型进化的重要方向之一。</p><p><strong>注意</strong>：</p><p>关于反斜杠使用的说明：在本教程中，我们使用反斜杠 \\ 来使文本适应屏幕大小以提高阅读体验，而没有用换行符 \\n 。GPT-3 并不受换行符（newline characters）的影响，但在您调用其他大模型时，需额外考虑换行符是否会影响模型性能。</p>`,43);function r(v,m){const a=i("tag");return t(),l("div",null,[u,o("p",null,[n('在编写 Prompt 时，我们可以使用各种标点符号作为“分隔符”，将不同的文本部分区分开来。分隔符就像是 Prompt 中的墙，将不同的指令、上下文、输入隔开，避免意外的混淆。你可以选择用 ````，"""，< >，'),p(a),n("，:` 等做分隔符，只要能明确起到隔断作用即可。")]),c])}const k=e(d,[["render",r],["__file","llm-prompt提示原则.html.vue"]]);export{k as default};
