import { j as defineComponent, k as r, l as ref, m as shallowRef, n as computed, v, p as onMounted, q as h, C, h as __vitePreload } from "./app-af2d9ada.js";
const style = "";
const vuePlayground = "";
const V = (e) => JSON.parse(decodeURIComponent(e));
var w = defineComponent({ name: "VuePlayground", props: { title: { type: String, default: "" }, files: { type: String, required: true }, settings: { type: String, default: "{}" } }, setup(e) {
  const u = r(), l = ref(true), o = shallowRef(), a = shallowRef(), n = computed(() => v({}, u, V(e.settings))), i = async () => {
    const { ReplStore: s, Repl: p } = await __vitePreload(() => import("./vue-repl-80e3ba7c.js"), true ? ["assets/vue-repl-80e3ba7c.js","assets/app-af2d9ada.js"] : void 0);
    o.value = p, a.value = new s({ serializedState: decodeURIComponent(e.files) }), n.value.vueVersion && await a.value.setVueVersion(n.value.vueVersion);
  };
  return onMounted(async () => {
    await i(), l.value = false;
  }), () => [h("div", { class: "vue-playground-wrapper" }, [e.title ? h("div", { class: "header" }, decodeURIComponent(e.title)) : null, h("div", { class: "repl-container" }, [l.value ? h(C, { class: "preview-loading", height: 192 }) : null, o.value ? h(o.value, { store: a.value, autoResize: true, ...n.value, layout: "horizontal" }) : null])])];
} });
export {
  w as default
};
