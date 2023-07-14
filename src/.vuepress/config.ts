import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/space",
  lang: "zh-CN",
  title: "",
  description: "欢迎来到我的博客空间",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
