import {getDirname, path} from "@vuepress/utils";
import {defineUserConfig} from "vuepress";
// 回到顶部
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import theme from "./theme.js";
import {pwaPlugin} from "@vuepress/plugin-pwa"
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'


// @ts-ignore
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
        ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],

    ],
    plugins: [
        backToTopPlugin(),
        pwaPlugin({
            skipWaiting: true,
        }),
        pwaPopupPlugin({
            locales: {
                '/': {
                    message: '发现新内容可用',
                    buttonText: '刷新',
                },
            },
        })
    ]
});
