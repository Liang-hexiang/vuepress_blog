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
                    {text: 'Polygon面积计算', icon: 'book', link: 'Polygon面积计算'},
                    {text: 'Python2转Python3', icon: 'book', link: 'Python2转Python3'},
                    {text: 'Python添加环境变量', icon: 'book', link: 'Python添加环境变量'},

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
                    {text: "Picgo&GitHub创建图床", icon: "book", link: "PicGo+GitHub"},

                ],
            },
            {
                text: "设计模式",
                icon: "code",
                prefix: "设计模式/",
                children: [
                    {text: "单例模式(Python实现)", icon: "code", link: "单例模式"},
                    {text: "工厂模式(Python实现)", icon: "code", link: "工厂模式"}
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
                    {text: '下雪啦', icon: 'snow', link: "下雪啦"}
                ],
            },
            {
                text: "笔记",
                icon: "book",
                prefix: "笔记/",
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