import { _ as _export_sfc, r as resolveComponent, o as openBlock, c as createElementBlock, e as createBaseVNode, f as createTextVNode, d as createVNode } from "./app-72f0b7d2.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode(
  "h1",
  {
    id: "网站推荐",
    tabindex: "-1"
  },
  [
    /* @__PURE__ */ createBaseVNode("a", {
      class: "header-anchor",
      href: "#网站推荐",
      "aria-hidden": "true"
    }, "#"),
    /* @__PURE__ */ createTextVNode(" 网站推荐")
  ],
  -1
  /* HOISTED */
);
const _hoisted_2 = {
  id: "_1-http-sparkbyexamples-com",
  tabindex: "-1"
};
const _hoisted_3 = /* @__PURE__ */ createBaseVNode(
  "a",
  {
    class: "header-anchor",
    href: "#_1-http-sparkbyexamples-com",
    "aria-hidden": "true"
  },
  "#",
  -1
  /* HOISTED */
);
const _hoisted_4 = {
  href: "http://sparkbyexamples.com/",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_5 = /* @__PURE__ */ createBaseVNode(
  "div",
  { class: "hint-container info" },
  [
    /* @__PURE__ */ createBaseVNode("p", { class: "hint-container-title" }, "收藏理由"),
    /* @__PURE__ */ createBaseVNode("p", null, [
      /* @__PURE__ */ createTextVNode("是一个学习编程技术的网站，我主要是用来学习PySpark，因为这个网站的文档相比于官方文档来说，它的目录结构就比较一目了然，整体比较清晰；"),
      /* @__PURE__ */ createBaseVNode("br"),
      /* @__PURE__ */ createTextVNode(" 而且，关于PySpark的每个模块，每个方法，它都用比较好理解的语言描述。然后，还会有示例代码来以更加直观的方式让读者明白相关模块如何使用")
    ])
  ],
  -1
  /* HOISTED */
);
function _sfc_render(_ctx, _cache) {
  const _component_HopeIcon = resolveComponent("HopeIcon");
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  const _component_SiteInfo = resolveComponent("SiteInfo");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("h3", _hoisted_2, [
      _hoisted_3,
      createTextVNode(),
      createVNode(_component_HopeIcon, {
        icon: "support",
        color: "orange",
        size: "2rem"
      }),
      createTextVNode(" 1. "),
      createBaseVNode("a", _hoisted_4, [
        createTextVNode("http://sparkbyexamples.com/"),
        createVNode(_component_ExternalLinkIcon)
      ])
    ]),
    _hoisted_5,
    createVNode(_component_SiteInfo, {
      name: "Pyspark Site",
      desc: "PySpark学习网站，相比于其他网站教程，sparkbyexamples.com有着更清晰的目录结构和更详细更易懂的语言描述。",
      url: "http://sparkbyexamples.com/",
      preview: "https://sparkbyexamples.com/"
    })
  ]);
}
const _______html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "好用网站收藏.html.vue"]]);
export {
  _______html as default
};
