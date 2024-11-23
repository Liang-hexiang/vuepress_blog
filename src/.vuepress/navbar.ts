import {navbar} from "vuepress-theme-hope";

export default navbar([

    {
        text: "博客",
        icon: "fas fa-blog",
        prefix: "/posts/",
        children: [
            {
                text: 'gRPC',
                prefix: 'gRPC/',
                children: [
                    'gRPC服务'
                ]
            },
            {
                text: 'Python',
                prefix: 'python/',
                children: [
                    'Python添加环境变量', 'Python2转Python3'
                ]
            },
            {
                text: '常用工具',
                prefix: 'tools/',
                children: ['PicgoGithub搭建图床']
            }
        ]
    },
    {
        text: "设计模式",
        icon: "fas fa-wrench",
        link: "/design_pattern/"
    },
    {
        text: "时光轴",
        icon: "fas fa-clock",
        link: "/timeline/"
    },
]);