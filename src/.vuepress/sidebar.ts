import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    "/": [
        {
            text: "博客",
            prefix: 'posts/',
            collapsible: true,
            children: [
                {text: 'gRPC', icon: 'fas fa-book', prefix: 'gRPC/', collapsible: true, children: ['gRPC服务']},
                {
                    text: 'Python',
                    icon: 'fab fa-python',
                    prefix: 'python/',
                    collapsible: true,
                    children: ['DBUtils导入', 'polygon面积计算', 'Python2转Python3']
                },
            ]
        },
        {
            text: "设计模式",
            prefix: 'design_pattern/',
            collapsible: true,
            children: [
                '单例模式', '工厂模式', '门面模式'
            ]
        },
    ]
});
