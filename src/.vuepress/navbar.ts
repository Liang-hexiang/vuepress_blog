import {navbar} from "vuepress-theme-hope";

export default navbar([
    '/',
    {
        text: "博客",
        icon: "fas fa-blog",
        prefix: "/posts/",
        children: [
            {
                text: "Python",
                icon: "fab fa-python",
                prefix: "python/",
                children: [
                    {text: 'Polygon面积计算', icon: 'fab fa-python', link: 'Polygon面积计算'},
                    {text: 'Python2转Python3', icon: 'fab fa-python', link: 'Python2转Python3'},
                    {text: 'Python添加环境变量', icon: 'fab fa-python', link: 'Python添加环境变量'},
                    {text: "DBUtils小问题", icon: "fab fa-python", link: "Linux环境下DBUtils导入的问题"},

                ],
            },
            {
                text: "Mysql",
                icon: "mysql",
                prefix: "mysql/",
                children: [
                    {text: "Mysql备忘录", icon: "fas fa-database", link: "mysql备忘录"},
                ],
            },
            {
                text: "工具说明书",
                icon: "note",
                prefix: "tools/",
                children: [
                    {text: "SublimeText说明书", icon: "blog", link: "sublime说明书"},
                    {text: "PicgoGitHub创建图床", icon: "fab fa-github-alt", link: "PicGoGitHub搭建图床"},

                ],
            },
            {
                text: "Linux",
                icon: "fab fa-linux",
                prefix: "Linux/",
                children: [
                    {text: "Ubuntu配置环境变量", icon: "fab fa-linux", link: "Linux配置环境变量"},
                    {text: "Linux查询文件行数", icon: "fab fa-linux", link: "Linux查询文件行数"}
                ],
            },

            {
                text: "PySpark",
                prefix: "pyspark/",
                icon: 'map',
                children: [
                    {text: "PySpark初学者教程", icon: 'map', link: "PySpark初学者教程"},
                    {text: "SparkSession", icon: 'map', link: "SparkSession教程"}
                ],
            },

        ],
    },
    {
        text: '机器学习',
        icon: 'fas fa-robot',
        prefix: '/机器学习/',
        children: [
            {
                text: "线性回归",
                icon: 'fab fa-python',
                link: "线性回归/",
            },
        ]
    },
    {
        text: '设计模式',
        icon: 'fas fa-code',
        prefix: '/design_pattern/',
        children: [
            {
                text: "设计模式",
                icon: "code",
                prefix: "设计模式/",
                children: [
                    {text: "单例模式(Python实现)", icon: "fab fa-python", link: "单例模式"},
                    {text: "工厂模式(Python实现)", icon: "fab fa-python", link: "工厂模式"},
                ],
            },
        ]
    },
    {
        text: "随笔",
        icon: "fas fa-paw",
        prefix: "/anything/",
        children: [
            {
                text: "日记",
                icon: "book",
                prefix: "小记/",
                children: [
                    {text: '下雪啦', icon: 'fas fa-snowflake', link: "下雪啦"},
                    {text: '网站收藏', icon: 'fas fa-box', link: '好用网站收藏'}
                ],
            },
            {
                text: "读书笔记",
                icon: "note",
                prefix: "book_notes/",
                children: [
                    {
                        'text': "人之觉醒",
                        "icon": 'fas fa-book',
                        'link': "人之觉醒/"
                    },
                ],
            },
        ],
    },
    {
        text: "Go语言",
        icon: "fas fa-code",
        link: "/Go/"
    },
    {
        text: "时光轴",
        icon: "fas fa-clock",
        link: "/timeline/"
    },


]);