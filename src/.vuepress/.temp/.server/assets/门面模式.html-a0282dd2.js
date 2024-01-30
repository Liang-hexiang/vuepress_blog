import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="门面模式" tabindex="-1"><a class="header-anchor" href="#门面模式" aria-hidden="true">#</a> 门面模式</h1><p>本章涉及内容：</p><ol><li><p>结构型设计模式概要；</p></li><li><p>利用UML图理解门面设计模式；</p></li><li><p>提供了Python v3.5实现代码的真实用例；</p></li><li><p>门面模式与最少知识原则。</p></li></ol><h3 id="_1-什么是结构性设计模式" tabindex="-1"><a class="header-anchor" href="#_1-什么是结构性设计模式" aria-hidden="true">#</a> 1. 什么是结构性设计模式</h3></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../pages/design_pattern/设计模式/门面模式.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _____html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "门面模式.html.vue"]]);
export {
  _____html as default
};
