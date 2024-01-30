export const data = JSON.parse("{\"key\":\"v-0bff1532\",\"path\":\"/anything/book_notes/%E6%B5%8B%E8%AF%95%E7%9B%AE%E5%BD%95/%E6%B5%8B%E8%AF%95%E6%96%87%E4%BB%B6.html\",\"title\":\"测试文件\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"测试文件\",\"icon\":\"write\"},\"headers\":[],\"readingTime\":{\"minutes\":0.02,\"words\":7},\"filePathRelative\":\"anything/book_notes/测试目录/测试文件.md\",\"excerpt\":\"\"}")

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
