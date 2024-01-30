import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="sublime-text使用文档说明书" tabindex="-1"><a class="header-anchor" href="#sublime-text使用文档说明书" aria-hidden="true">#</a> Sublime Text使用文档说明书</h1><h3 id="sublimetext预览markdown" tabindex="-1"><a class="header-anchor" href="#sublimetext预览markdown" aria-hidden="true">#</a> SublimeText预览Markdown</h3><h4 id="_1-markdowneditor" tabindex="-1"><a class="header-anchor" href="#_1-markdowneditor" aria-hidden="true">#</a> 1. MarkdownEditor</h4><p>🏷️MarkdownEditing是一个功能丰富的插件，提供了对Markdown文件的语法高亮、自动补全、预览等功能。</p><p>安装：</p><p>Ctrl+Shift+P打开控制台，输入Package Control: Install Package，然后输入MarkdownEditor，选择安装</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../pages/posts/tools/sublime说明书.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const sublime____html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "sublime说明书.html.vue"]]);
export {
  sublime____html as default
};
