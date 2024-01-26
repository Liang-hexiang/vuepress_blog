export const siteData = JSON.parse("{\"base\":\"/space/\",\"lang\":\"zh-CN\",\"title\":\"\",\"description\":\"欢迎来到酥肉丸子的博客空间\",\"head\":[[\"link\",{\"rel\":\"preconnect\",\"href\":\"https://fonts.googleapis.com\"}],[\"link\",{\"rel\":\"preconnect\",\"href\":\"https://fonts.gstatic.com\",\"crossorigin\":\"\"}],[\"link\",{\"href\":\"https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap\",\"rel\":\"stylesheet\"}],[\"link\",{\"href\":\"https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+KuaiLe&display=swap\",\"rel\":\"stylesheet\"}],[\"link\",{\"rel\":\"icon\",\"href\":\"/space/favicon.ico\"}],[\"link\",{\"rel\":\"icon\",\"href\":\"/space/assets/icon/chrome-mask-512.png\",\"type\":\"image/png\",\"sizes\":\"512x512\"}],[\"link\",{\"rel\":\"icon\",\"href\":\"/space/assets/icon/chrome-mask-192.png\",\"type\":\"image/png\",\"sizes\":\"192x192\"}],[\"link\",{\"rel\":\"icon\",\"href\":\"/space/assets/icon/chrome-512.png\",\"type\":\"image/png\",\"sizes\":\"512x512\"}],[\"link\",{\"rel\":\"icon\",\"href\":\"/space/assets/icon/chrome-192.png\",\"type\":\"image/png\",\"sizes\":\"192x192\"}],[\"link\",{\"rel\":\"manifest\",\"href\":\"/space/manifest.webmanifest\",\"crossorigin\":\"use-credentials\"}],[\"meta\",{\"name\":\"theme-color\",\"content\":\"#46bd87\"}],[\"link\",{\"rel\":\"apple-touch-icon\",\"href\":\"/space/assets/icon/apple-icon-152.png\"}],[\"meta\",{\"name\":\"apple-mobile-web-app-capable\",\"content\":\"yes\"}],[\"meta\",{\"name\":\"apple-mobile-web-app-status-bar-style\",\"content\":\"black\"}],[\"meta\",{\"name\":\"msapplication-TileImage\",\"content\":\"/space/assets/icon/ms-icon-144.png\"}],[\"meta\",{\"name\":\"msapplication-TileColor\",\"content\":\"#ffffff\"}],[\"meta\",{\"name\":\"viewport\",\"content\":\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover\"}]],\"locales\":{}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
