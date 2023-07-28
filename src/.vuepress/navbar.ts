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
                icon: "code",
                prefix: "python/",
                children: [
                    {text: "BS4的使用", icon: "spider", link: "beautifulsoup"},
                    {text: "关于DBUtils的小插曲", icon: "book", link: "DBUtils小插曲"},


                ],
            },
            {
                text: "Mysql",
                icon: "mysql",
                prefix: "mysql/",
                children: [
                    {text: "Mysql文档", icon: "mysql", link: "mysql备忘录"},
                ],
            },
            {
                text: "工具说明书",
                icon: "book",
                prefix: "工具说明书/",
                children: [
                    {text: "SublimeText说明书", icon: "book", link: "sublime说明书"},
                ],
            },
            {
                text: "Linux",
                icon: "linux",
                prefix: "Linux/",
                children: [
                    {text: "Ubuntu配置系统变量", icon: "book", link: "Linux配置系统变量"},
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
[[[31.254762,120.620353]]]