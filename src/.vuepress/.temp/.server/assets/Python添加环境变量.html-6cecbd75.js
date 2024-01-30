import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper-cc2b3d55.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="python添加linux环境变量" tabindex="-1"><a class="header-anchor" href="#python添加linux环境变量" aria-hidden="true">#</a> Python添加Linux环境变量</h1></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../pages/posts/python/Python添加环境变量.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Python_______html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "Python添加环境变量.html.vue"]]);
export {
  Python_______html as default
};
