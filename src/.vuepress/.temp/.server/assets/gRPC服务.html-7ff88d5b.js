import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="gprc服务" tabindex="-1"><a class="header-anchor" href="#gprc服务" aria-hidden="true">#</a> gPRC服务</h1></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../pages/posts/gRPC/gRPC服务.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const gRPC___html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "gRPC服务.html.vue"]]);
export {
  gRPC___html as default
};
