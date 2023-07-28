export const categoryMap = {"category":{"/":{"path":"/category/","map":{"技术":{"path":"/category/%E6%8A%80%E6%9C%AF/","keys":["v-596e8807"]},"python":{"path":"/category/python/","keys":["v-1a74fe27","v-014b8769","v-69b8418f"]},"工具":{"path":"/category/%E5%B7%A5%E5%85%B7/","keys":["v-34ddd771"]}}}},"tag":{"/":{"path":"/tag/","map":{"python":{"path":"/tag/python/","keys":["v-596e8807","v-014b8769"]},"技术":{"path":"/tag/%E6%8A%80%E6%9C%AF/","keys":["v-69b8418f"]},"爬虫":{"path":"/tag/%E7%88%AC%E8%99%AB/","keys":["v-69b8418f"]},"polygon":{"path":"/tag/polygon/","keys":["v-1a74fe27","v-014b8769"]},"mysql":{"path":"/tag/mysql/","keys":["v-014b8769"]},"Sublime Text":{"path":"/tag/sublime-text/","keys":["v-34ddd771"]},"工具说明书":{"path":"/tag/%E5%B7%A5%E5%85%B7%E8%AF%B4%E6%98%8E%E4%B9%A6/","keys":["v-34ddd771"]}}}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoryMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoryMap);
  });


