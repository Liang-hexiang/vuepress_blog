import { _ as _export_sfc, r as resolveComponent, o as openBlock, c as createElementBlock, e as createBaseVNode, f as createTextVNode, d as createVNode, a as createStaticVNode } from "./app-72f0b7d2.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode(
  "h1",
  {
    id: "python2转python3",
    tabindex: "-1"
  },
  [
    /* @__PURE__ */ createBaseVNode("a", {
      class: "header-anchor",
      href: "#python2转python3",
      "aria-hidden": "true"
    }, "#"),
    /* @__PURE__ */ createTextVNode(" Python2转Python3")
  ],
  -1
  /* HOISTED */
);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode(
  "h3",
  {
    id: "工具介绍",
    tabindex: "-1"
  },
  [
    /* @__PURE__ */ createBaseVNode("a", {
      class: "header-anchor",
      href: "#工具介绍",
      "aria-hidden": "true"
    }, "#"),
    /* @__PURE__ */ createTextVNode(" 工具介绍")
  ],
  -1
  /* HOISTED */
);
const _hoisted_3 = {
  href: "http://2to3.py",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_4 = /* @__PURE__ */ createStaticVNode('<p>2to3.py是一个脚本文件，是Anaconda管理器自带的脚本文件，通常可以在anaconda的安装路径下找到，可能由于anaconda的版本不同，2to3.py文件的名字也可能略有差异，但总的来说都可以通过2to3关键字来辨别。</p><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3><ol><li>转单个py文件</li></ol><p>​ 如果是转单个py文件的话可以直接把py文件的路径输入到命令之后</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>python 2to3.py  <span class="token parameter variable">-w</span>  D:/file.py\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>批量转文件夹下的py文件</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 如果是想转文件夹下的文件，则将文件夹的路径输入到命令之后，并且以&#39;\\&#39;结尾</span>\nPython 2to3.py <span class="token parameter variable">-w</span> E:<span class="token punctuation">\\</span><span class="token punctuation">\\</span>Test<span class="token punctuation">\\</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>', 7);
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    _hoisted_2,
    createBaseVNode("p", null, [
      createTextVNode("💭 工具："),
      createBaseVNode("a", _hoisted_3, [
        createTextVNode("2to3.py"),
        createVNode(_component_ExternalLinkIcon)
      ])
    ]),
    _hoisted_4
  ]);
}
const Python2_Python3_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "Python2转Python3.html.vue"]]);
export {
  Python2_Python3_html as default
};
