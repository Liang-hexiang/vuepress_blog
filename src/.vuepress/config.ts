import {getDirname, path} from "@vuepress/utils";
import {defineUserConfig} from "vuepress";
// 回到顶部
import theme from "./theme.js";
import {pwaPlugin} from "@vuepress/plugin-pwa"
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'
import { sitemapPlugin } from "vuepress-plugin-sitemap2";
import { feedPlugin } from "vuepress-plugin-feed2";
// 搜索功能
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

import 'vuepress-plugin-immersive-music-player'


// @ts-ignore
const __dirname = getDirname(import.meta.url);
export default defineUserConfig({
    base: "/space/",
    lang: "zh-CN",
    title: "#/ cd L.H.X Blog Home",
    theme,
    debug: true,
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
        ['script', {src: 'https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js'}],
        // ['link', {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@docsearch/css@3'}],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],

    ],
    plugins: [
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
        }),
        // 站点插件管理
        sitemapPlugin({
            // 配置选项
            hostname: "https://lianghexiang.github.io",
            changefreq: 'always',
            sitemapFilename: 'sitemap.xml'
        }),
        feedPlugin({
            // 插件选项
            hostname: 'https://lianghexiang.github.io/',
            rss: true,
            json: true,
            image: 'src/.vuepress/public/images/katongrenwu.png',
            devServer: true,
            devHostname: 'http://localhost:8080/',

        }),
        docsearchPlugin({
            // 配置项
            appId: 'OD5D2HOUNL',
            apiKey: 'd7094b39ae7af9fb8a20a69f71609c8a',
            indexName: 'space',
            searchParameters: {
            },
            locales: {
                "/": {
                    placeholder: '搜索文档',
                    translations: {
                        button: {
                            buttonText: '搜索文档',
                        },
                    },
                }
            }
        }),
        [
            'vuepress-plugin-immersive-music-player',{
            sliderStyle:{theme: 'isSpitRainbow'},
            playListID: 633015043,
        }],

    ]
});
