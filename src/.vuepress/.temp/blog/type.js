export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-3ae980e2","v-784c3919","v-4848c9f0","v-7a9b9630","v-71b4dc5e","v-3966997b","v-66d370d9","v-ca2606fe","v-59939119","v-77bb6b9a","v-4870e4c2","v-0b84fef2","v-4f435352","v-34cef64b","v-a430865c","v-014b8769","v-184f4da6","v-2e3eac9e"]}},"star":{"/":{"path":"/star/","keys":[]}},"timeline":{"/":{"path":"/timeline/","keys":["v-3ae980e2","v-784c3919","v-4848c9f0","v-7a9b9630","v-71b4dc5e","v-3966997b","v-66d370d9","v-ca2606fe","v-59939119","v-77bb6b9a","v-4870e4c2","v-0b84fef2","v-4f435352","v-34cef64b","v-a430865c","v-014b8769"]}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
  });

