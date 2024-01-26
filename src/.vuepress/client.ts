// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { setupRunningTimeFooter } from "vuepress-theme-hope/presets/footerRunningTime.js";
export default defineClientConfig({
    enhance({ app, router, siteData }) {},
    setup() {
        setupRunningTimeFooter(
            new Date("2023-06-01"),
            {
                "/": "<font color='#ff8c00' size='2.5em'>本网站已经运行了</font>: <font color='#ff8c00' size='2.5em'>本网站已经运行了</font>:day 天 :hour 小时 :minute 分钟 :second <font color='#a52a2a'>秒</font>",
                "/zh/": "已运行 :day 天 :hour 小时 :minute 分钟 :second 秒",
            },
            false,
        );
    },
});

