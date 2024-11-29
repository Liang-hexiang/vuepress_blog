import {navbar} from "vuepress-theme-hope";

export default navbar([
    {
        text: "博客",
        icon: "fas fa-book-open",
        prefix: "/posts/",
        children: [
            {text: 'Python', icon: 'fa-brands fa-python', link: 'python/'},
            {text: '常用工具', link: 'tools/', icon: "fas fa-toolbox",},
            {text: "设计模式", icon: "fas fa-code", link: "design_pattern/"},
            {text: 'gRPC', icon: 'fas fa-book', link: 'gRPC/'},

        ]
    },
    {
        text: "人工智能",
        icon: "fab fa-android",
        prefix: "/人工智能/",
        children: [
            {text: '大语言模型', icon: "fab fa-android",link: 'LLM/'}
        ]
    },
    {
        text: "杂谈",
        icon: "fab fa-diary",
        prefix: "/diary/",
        children: [
            {text: '日记', icon: "fab fa-android",link: '小记/'}
        ]
    },
    {
        text: "时光轴",
        icon: "fas fa-clock",
        link: "/timeline/"
    },
]);