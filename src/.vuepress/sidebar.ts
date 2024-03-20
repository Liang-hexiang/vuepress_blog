import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "博客",
      icon: "blog",
      prefix: "posts/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "机器学习",
      icon: "python",
      prefix: "机器学习/",
      collapsible: true,
      children: "structure",
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
  // "/posts/": [
  //
  //   {
  //     text: "python",
  //     icon: "python",
  //     prefix: "python/",
  //     collapsible: true,
  //     children: "structure",
  //   },
  // ]
});
