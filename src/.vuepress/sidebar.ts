import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "如何使用",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "博客",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    {
      text: "随笔",
      icon: "pen",
      prefix: "notes/",
      children: "structure",
    },
    "intro",
  ],
});
