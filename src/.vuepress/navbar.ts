import {navbar} from "vuepress-theme-hope";

export default navbar([
    "/",
    {
        text: "博客",
        icon: "book",
        prefix: "/posts/",
        children: [
            {
                text: "Python",
                icon: "python",
                prefix: "python/",
                children: [
                    {text: "BS4的使用", icon: "spider", link: "beautifulsoup"},
                    {text: "polygon面积计算", icon: "fish", link: "polygon面积计算"},
                    {text: "polygon边界简化", icon: "cat", link: "polygon边界简化"},
                ],
            },
            {
                text: "Python",
                icon: "mysql",
                prefix: "mysql/",
                children: [
                    {text: "Mysql文档", icon: "mysql", link: "mysql知识积累"},

                ],
            },
        ],
    },
    {
        text: "随笔",
        icon: "pen",
        prefix: "/anything/",
        children: [
            {
                text: "日记",
                icon: "pen",
                prefix: "note/",
                children: [
                ],
            },
        ],
    },
    {
        text: "时光轴",
        icon: "clock",
        link: "/timeline/"

    }
]);
