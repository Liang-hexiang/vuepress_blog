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
      text: "随笔",
      icon: "pen",
      prefix: "anything/",
      collapsible: true,
      children: "structure",

    },
    {
      text: "设计模式",
      icon: "book",
      prefix: "design_pattern/",
      collapsible: true,
      children: "structure",
    }
  ],
  "/机器学习/" : [

    {
      text: "线性回归",
      prefix: "线性回归/",
      icon: 'book',
      collapsible: true,
      children: [
        "什么是线性回归/",
      ]
    },

  ],
  '/Go/': [
    {
      text: 'Go语言入门',
      icon: 'golang',
      collapsible: true,
      children: [
        {
          text: "Go语法基础",
          prefix: "Go语法基础/",
          icon: 'golang',
          collapsible: true,
          children: [
            "前言/",
          ]
        }
      ]
    }
  ]
});
