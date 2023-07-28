export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-596e8807","v-0b84fef2","v-34ddd771","v-1a74fe27","v-014b8769","v-69b8418f","v-184f4da6","v-2e3eac9e","v-784c3919"]}},"star":{"/":{"path":"/star/","keys":[]}},"timeline":{"/":{"path":"/timeline/","keys":["v-596e8807","v-0b84fef2","v-34ddd771","v-1a74fe27","v-014b8769","v-69b8418f"]}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
  });

