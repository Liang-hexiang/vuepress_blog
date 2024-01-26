// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { setupRunningTimeFooter } from "vuepress-theme-hope/presets/footerRunningTime.js";
export default defineClientConfig({
    enhance({ app, router, siteData }) {},
    setup() {
        setupRunningTimeFooter(
            new Date("2023-06-01"),
            {
                "/": "本网站已经运行了: <font color='#ff8c00' size='3.5em'>:day</font> 天 <font color='#ff8c00' size='3.5em'>:hour</font> 小时 <font color='#ff8c00' size='3.5em'>:minute</font> 分钟 <font color='#ff8c00' size='3.5em'>:second </font>秒",
                "/zh/": "已运行 :day 天 :hour 小时 :minute 分钟 :second 秒",
            },
            false,
        );
    },
});

