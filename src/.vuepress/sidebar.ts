import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    // {
    //   text: "如何使用",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    {
      text: "博客",
      icon: "blog",
      prefix: "posts/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "随笔",
      icon: "write",
      prefix: "anything/",
      collapsible: true,
      children: "structure",

    },
    {
      text: "设计模式",
      icon: "python",
      prefix: "design_pattern/",
      collapsible: true,
      children: "structure",
    },
    "intro",
  ],
});
