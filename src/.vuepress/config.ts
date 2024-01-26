import { getDirname, path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import {hopeTheme} from "vuepress-theme-hope";

export default defineUserConfig({
  base: "/space/",
  lang: "zh-CN",
  title: "",
  description: "欢迎来到酥肉丸子的博客空间",
  alias: {
    "@theme-hope/modules/blog/components/BlogHero": path.resolve(
        __dirname,
        "./components/BlogHero.vue",
    ),
  },

  theme,
  head: [

  ]

  // Enable it with pwa
  // shouldPrefetch: false,
});
