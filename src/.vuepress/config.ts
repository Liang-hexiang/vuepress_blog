import {getDirname, path} from "@vuepress/utils";
import {defineUserConfig} from "vuepress";
import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);
export default defineUserConfig({
    base: "/space/",
    lang: "zh-CN",
    title: "",
    description: "欢迎来到酥肉丸子的博客空间",
    theme,
    alias: {
        "@theme-hope/modules/blog/components/BlogHero": path.resolve(

            __dirname,
            "./components/BlogHero.vue",
        ),
    },
    head: [
        // 导入相应链接
        ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
        [
            "link",
            { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        ],
        [
            "link",
            {
                href: "https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap",
                rel: "stylesheet",
            },
        ],
        [
            "link",
            {
                href: "https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+KuaiLe&display=swap",
                rel: "stylesheet",
            },
        ],

    ]

    // Enable it with pwa
    // shouldPrefetch: false,
});
