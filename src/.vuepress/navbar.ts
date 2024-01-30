import {navbar} from "vuepress-theme-hope";

export default navbar([
    "/",
    {
        text: "博客",
        icon: "repo",
        prefix: "/posts/",
        children: [
            {
                text: "Python",
                icon: "code",
                prefix: "python/",
                children: [
                    {text: 'Polygon面积计算', icon: 'code', link: 'Polygon面积计算'},
                    {text: 'Python2转Python3', icon: 'code', link: 'Python2转Python3'},
                    {text: 'Python添加环境变量', icon: 'code', link: 'Python添加环境变量'},
                    {text: "DBUtils小问题", icon: "code", link: "Linux环境下DBUtils导入的问题"},

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
                icon: "note",
                prefix: "tools/",
                children: [
                    {text: "SublimeText说明书", icon: "blog", link: "sublime说明书"},
                    {text: "PicgoGitHub创建图床", icon: "github", link: "PicGoGitHub搭建图床"},

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
            {
                text: "Vue",
                icon: "vue",
                prefix: "Vue/",
                children: [
                    {text: "Vue基础知识", icon: "vue", link: "Vue基础"},
                    {text: "Vue客户端", icon: "vue", link: "Vue客户端"},
                ],
            }
        ],
    },
    {
        text: "随笔",
        icon: "note",
        prefix: "/anything/",
        children: [
            {
                text: "日记",
                icon: "book",
                prefix: "小记/",
                children: [
                    {text: '下雪啦', icon: 'snow', link: "下雪啦"},
                    {text: '网站收藏', icon: 'link', link: '好用网站收藏'}
                ],
            },
            {
                text: "读书笔记",
                icon: "note",
                prefix: "book_notes/",
                children: [
                    {
                        'text': "人之觉醒",
                        "icon": 'note',
                        'link': "人之觉醒/"
                    },
                ],
            },
        ],
    },
    {
        text: '设计模式',
        icon: 'code',
        prefix: '/design_pattern/',
        children: [
            {
                text: "设计模式",
                icon: "code",
                prefix: "设计模式/",
                children: [
                    {text: "单例模式(Python实现)", icon: "code", link: "单例模式"},
                    {text: "工厂模式(Python实现)", icon: "code", link: "工厂模式"},
                ],
            },
        ]
    },
    {
        text: "时光轴",
        icon: "time",
        link: "/timeline/"
    },

]);