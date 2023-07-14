import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/space",
  lang: "zh-CN",
  title: "",
  description: "集搞笑、技术、娱乐、八卦、新闻为一体的全方位未来式网站！",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
