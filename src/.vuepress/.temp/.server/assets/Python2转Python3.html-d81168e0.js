import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="python2转python3" tabindex="-1"><a class="header-anchor" href="#python2转python3" aria-hidden="true">#</a> Python2转Python3</h1><h3 id="工具介绍" tabindex="-1"><a class="header-anchor" href="#工具介绍" aria-hidden="true">#</a> 工具介绍</h3><p>💭 工具：<a href="http://2to3.py" target="_blank" rel="noopener noreferrer">2to3.py`);
  _push(ssrRenderComponent(_component_ExternalLinkIcon, null, null, _parent));
  _push(`</a></p><p>2to3.py是一个脚本文件，是Anaconda管理器自带的脚本文件，通常可以在anaconda的安装路径下找到，可能由于anaconda的版本不同，2to3.py文件的名字也可能略有差异，但总的来说都可以通过2to3关键字来辨别。</p><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3><ol><li>转单个py文件</li></ol><p>​ 如果是转单个py文件的话可以直接把py文件的路径输入到命令之后</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>python 2to3.py  <span class="token parameter variable">-w</span>  D:/file.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>批量转文件夹下的py文件</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 如果是想转文件夹下的文件，则将文件夹的路径输入到命令之后，并且以&#39;\\&#39;结尾</span>
Python 2to3.py <span class="token parameter variable">-w</span> E:<span class="token punctuation">\\</span><span class="token punctuation">\\</span>Test<span class="token punctuation">\\</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../pages/posts/python/Python2转Python3.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Python2_Python3_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "Python2转Python3.html.vue"]]);
export {
  Python2_Python3_html as default
};
