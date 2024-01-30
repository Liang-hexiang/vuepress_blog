import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="_2023初雪" tabindex="-1"><a class="header-anchor" href="#_2023初雪" aria-hidden="true">#</a> 2023初雪</h1><figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepress/微信图片_20231211101841.jpg" alt="好白的雪" tabindex="0" loading="lazy"><figcaption>好白的雪</figcaption></figure><figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepress/微信图片_20231211102037.jpg" alt="白雪皑皑" tabindex="0" loading="lazy"><figcaption>白雪皑皑</figcaption></figure></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../pages/anything/小记/下雪啦.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ____html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "下雪啦.html.vue"]]);
export {
  ____html as default
};
