import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";



export default hopeTheme({

  author: {
    name: "L.H.X",
    url: "/intro.html",
  },

  darkmode: 'switch',
  iconAssets: ["fontawesome-with-brands","fontawesome"],
  logo: "/images/坏笑.svg",
  repo: "lianghexiang/space",

  docsDir: "src",

  // sidebar
  sidebar,
  // navbar
  navbar,

  footer: '{{setupRunningTimeFooter}}' ,
  displayFooter: true,
  locales: {
    // ...
    "/": {
      // 启用 RTL 布局
      rtl: false,
    },
  },
  blog: {
    timeline: "忽如白驹过隙",
    description: "<font color='orange' size='3em'>行之有恒，久自芬芳；</font>",
    intro: "/intro.html",
    medias: {
      Baidu: "https://baidu.com",
      BiliBili: "https://bilibili.com",
      Email: "lhx110396@163.com",
      GitHub: "https://github.com/lianghexiang",
      QQ: "https://example.com",
      Qzone: "https://example.com",
      Wechat: "https://example.com",
    },
  },
  // 禁用打印功能
  print: false,
  // 开启全屏按钮
  fullscreen: true,
  // page meta
  metaLocales: {
    editLink: "在GitHub上编辑此文章",

  },

  plugins: {

    blog: true,

    prismjs: {
      light: "coldark-cold",
      dark: "material-oceanic",
    },
    copyright: false,
    comment: {
      // You should generate and use your own comment service
      provider: "Waline",
      serverURL: "https://waline-comment.vuejs.press",
    },
    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      alert: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      hit: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: ["highlight", "math", "search", "notes", "zoom"],
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

    // uncomment these if you want a PWA
    pwa: {
      favicon: "/favicon.ico",
      cacheHTML: true,
      cachePic: true,
      appendBase: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Demo",
            short_name: "Demo",
            url: "/demo/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },
    components: {
      // 你想使用的组件
      components: [
        "ArtPlayer",
        "Badge",
        "BiliBili",
        "CodePen",
        "PDF",
        "Replit",
        "Share",
        "SiteInfo",
        "StackBlitz",
        "VidStack",
        "XiGua",
      ],
    },
  }
}, { check: true, compact:true, custom: true, debug: false});
