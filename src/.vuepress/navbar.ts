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
                    {text: 'paramiko工具', icon: 'book', link: 'paramiko工具介绍'},
                    {text: 'Polygon边界简化', icon: 'book', link: 'Polygon边界简化'},
                    {text: 'Polygon面积计算', icon: 'book', link: 'Polygon面积计算'},
                    {text: 'Python2转Python3', icon: 'book', link: 'Python2转Python3'}
                ],
            },
            {
                text: "Mysql",
                icon: "mysql",
                prefix: "mysql/",
                children: [
                    {text: "Mysql备忘录", icon: "book", link: "mysql备忘录"},
                ],
            },
            {
                text: "工具说明书",
                icon: "book",
                prefix: "工具说明书/",
                children: [
                    {text: "SublimeText说明书", icon: "book", link: "sublime说明书"},
                    {text: "Picgo+GitHub创建图床", icon: "book", link: "PicGo+GitHub"},

                ],
            },
            {
                text: "Linux",
                icon: "linux",
                prefix: "Linux/",
                children: [
                    {text: "Ubuntu配置环境变量", icon: "book", link: "Linux配置环境变量"},
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
                    {text: "DBUtils小问题", icon: "pen", link: "Linux环境下DBUtils导入的问题"},
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