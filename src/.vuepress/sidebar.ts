import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/机器学习/" : [
    {
      text: "机器学习",
      prefix: "线性回归/",
      icon: 'book',
      collapsible: true,
      children: [
        "什么是线性回归/",
      ]
    },
  ],
  "/Go/": [
    {
      text: "Go基础",
      prefix: "Go语法基础/",
      icon: 'book',
      collapsible: true,
      children: [
        "前言/",
      ]
    },
  ]

});
