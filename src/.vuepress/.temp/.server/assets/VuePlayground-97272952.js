import { defineComponent, ref, shallowRef, computed, onMounted, h } from "vue";
import { r, v, C } from "../app.196d038f.mjs";
import "@vuepress/shared";
import "vue-router";
import "@vueuse/shared";
import "@vueuse/core";
import "create-codepen";
import "@stackblitz/sdk";
import "vidstack/elements";
import "ts-debounce";
import "@vue/devtools-api";
import "@waline/client/dist/pageview.mjs";
import "mitt";
const style = "";
const vuePlayground = "";
const V = (e) => JSON.parse(decodeURIComponent(e));
var w = defineComponent({ name: "VuePlayground", props: { title: { type: String, default: "" }, files: { type: String, required: true }, settings: { type: String, default: "{}" } }, setup(e) {
  const u = r(), l = ref(true), o = shallowRef(), a = shallowRef(), n = computed(() => v({}, u, V(e.settings))), i = async () => {
    const { ReplStore: s, Repl: p } = await import("@vue/repl");
    o.value = p, a.value = new s({ serializedState: decodeURIComponent(e.files) }), n.value.vueVersion && await a.value.setVueVersion(n.value.vueVersion);
  };
  return onMounted(async () => {
    await i(), l.value = false;
  }), () => [h("div", { class: "vue-playground-wrapper" }, [e.title ? h("div", { class: "header" }, decodeURIComponent(e.title)) : null, h("div", { class: "repl-container" }, [l.value ? h(C, { class: "preview-loading", height: 192 }) : null, o.value ? h(o.value, { store: a.value, autoResize: true, ...n.value, layout: "horizontal" }) : null])])];
} });
export {
  w as default
};
