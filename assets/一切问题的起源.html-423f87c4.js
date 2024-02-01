import { _ as _export_sfc, r as resolveComponent, o as openBlock, c as createElementBlock, e as createBaseVNode, f as createTextVNode, d as createVNode, g as withCtx, b as createCommentVNode } from "./app-45c468b1.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode(
  "h1",
  {
    id: "大脑——一切问题的起源",
    tabindex: "-1"
  },
  [
    /* @__PURE__ */ createBaseVNode("a", {
      class: "header-anchor",
      href: "#大脑——一切问题的起源",
      "aria-hidden": "true"
    }, "#"),
    /* @__PURE__ */ createTextVNode(" 大脑——一切问题的起源")
  ],
  -1
  /* HOISTED */
);
const _hoisted_2 = {
  id: "第一章摘要摘要",
  tabindex: "-1"
};
const _hoisted_3 = /* @__PURE__ */ createBaseVNode(
  "a",
  {
    class: "header-anchor",
    href: "#第一章摘要摘要",
    "aria-hidden": "true"
  },
  "#",
  -1
  /* HOISTED */
);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode(
  "p",
  null,
  null,
  -1
  /* HOISTED */
);
const _hoisted_5 = { class: "table-of-contents" };
const _hoisted_6 = /* @__PURE__ */ createBaseVNode(
  "h2",
  {
    id: "第一节-大脑-重新认识你自己",
    tabindex: "-1"
  },
  [
    /* @__PURE__ */ createBaseVNode("a", {
      class: "header-anchor",
      href: "#第一节-大脑-重新认识你自己",
      "aria-hidden": "true"
    }, "#"),
    /* @__PURE__ */ createTextVNode(" 第一节　大脑：重新认识你自己")
  ],
  -1
  /* HOISTED */
);
function _sfc_render(_ctx, _cache) {
  const _component_font = resolveComponent("font");
  const _component_ECharts = resolveComponent("ECharts");
  const _component_router_link = resolveComponent("router-link");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("h3", _hoisted_2, [
      _hoisted_3,
      createTextVNode(),
      createVNode(_component_font, { color: "orange" }, {
        default: withCtx(() => [
          createTextVNode("第一章摘要摘要")
        ]),
        _: 1
        /* STABLE */
      })
    ]),
    createVNode(_component_ECharts, {
      id: "echarts-6",
      config: "eJyrrgUAAXUA+Q==",
      title: "%E6%A0%87%E9%A2%98"
    }, {
      default: withCtx(() => [
        _hoisted_4
      ]),
      _: 1
      /* STABLE */
    }),
    createBaseVNode("nav", _hoisted_5, [
      createBaseVNode("ul", null, [
        createBaseVNode("li", null, [
          createVNode(_component_router_link, { to: "#第一章摘要摘要" }, {
            default: withCtx(() => [
              createVNode(_component_font, { color: "orange" }, {
                default: withCtx(() => [
                  createTextVNode("第一章摘要摘要")
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        createBaseVNode("li", null, [
          createVNode(_component_router_link, { to: "#第一节-大脑-重新认识你自己" }, {
            default: withCtx(() => [
              createTextVNode("第一节　大脑：重新认识你自己")
            ]),
            _: 1
            /* STABLE */
          })
        ])
      ])
    ]),
    _hoisted_6,
    createCommentVNode(" more ")
  ]);
}
const ________html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "一切问题的起源.html.vue"]]);
export {
  ________html as default
};
