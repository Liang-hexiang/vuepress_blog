export const data = JSON.parse("{\"key\":\"v-06494d00\",\"path\":\"/anything/book_notes/%E6%B5%8B%E8%AF%95%E7%9B%AE%E5%BD%95/\",\"title\":\"测试目录\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"测试目录\",\"article\":false,\"feed\":false,\"sitemap\":false},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":1},\"filePathRelative\":null,\"excerpt\":\"\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
