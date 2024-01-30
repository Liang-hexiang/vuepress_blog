import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_BiliBili = resolveComponent("BiliBili");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="好用网站收藏" tabindex="-1"><a class="header-anchor" href="#好用网站收藏" aria-hidden="true">#</a> 好用网站收藏</h1>`);
  _push(ssrRenderComponent(_component_BiliBili, { bvid: "BV1kt411o7C3" }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../pages/anything/小记/好用网站收藏.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _______html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "好用网站收藏.html.vue"]]);
export {
  _______html as default
};
