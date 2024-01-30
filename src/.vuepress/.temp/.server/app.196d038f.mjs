var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { defineAsyncComponent, ref, readonly, reactive, defineComponent, onMounted, computed, h as h$4, inject, toRef, unref, getCurrentInstance, camelize, capitalize, watch, shallowRef, isRef, onUnmounted, resolveComponent, Transition, nextTick, provide, TransitionGroup, useSSRContext, createSSRApp } from "vue";
import { isString, isArray, dedupeHead, resolveLocalePath, isLinkHttp, removeLeadingSlash, ensureEndingSlash, isPlainObject, removeEndingSlash, isLinkMailto, isLinkTel, isLinkExternal, resolveRoutePathFromUrl } from "@vuepress/shared";
import { useRouter, useRoute, useLink, RouterView, createRouter, START_LOCATION, createMemoryHistory } from "vue-router";
import { tryOnMounted, tryOnScopeDispose, isClient } from "@vueuse/shared";
import { useEventListener, useStyleTag as useStyleTag$1, useElementSize, useWindowSize as useWindowSize$1, useWindowScroll, useClipboard, useStorage, useToggle, useDebounceFn, useMutationObserver, useFullscreen, usePreferredDark, useScrollLock, useThrottleFn, onClickOutside, useNow } from "@vueuse/core";
import { renderCodePen } from "create-codepen";
import d$4 from "@stackblitz/sdk";
import { defineCustomElements } from "vidstack/elements";
import { debounce } from "ts-debounce";
import { setupDevtoolsPlugin } from "@vue/devtools-api";
import { pageviewCount } from "@waline/client/dist/pageview.mjs";
import "mitt";
const pagesData$1 = {
  // path: /intro.html
  "v-184f4da6": () => import(
    /* webpackChunkName: "v-184f4da6" */
    "./assets/intro.html-f2fcbb72.js"
  ).then(({ data }) => data),
  // path: /
  "v-8daa1a0e": () => import(
    /* webpackChunkName: "v-8daa1a0e" */
    "./assets/index.html-7f3e906b.js"
  ).then(({ data }) => data),
  // path: /slides.html
  "v-2e3eac9e": () => import(
    /* webpackChunkName: "v-2e3eac9e" */
    "./assets/slides.html-77de331c.js"
  ).then(({ data }) => data),
  // path: /anything/%E5%B0%8F%E8%AE%B0/%E4%B8%8B%E9%9B%AA%E5%95%A6.html
  "v-ca2606fe": () => import(
    /* webpackChunkName: "v-ca2606fe" */
    "./assets/下雪啦.html-fbc83f77.js"
  ).then(({ data }) => data),
  // path: /anything/%E5%B0%8F%E8%AE%B0/%E5%A5%BD%E7%94%A8%E7%BD%91%E7%AB%99%E6%94%B6%E8%97%8F.html
  "v-59939119": () => import(
    /* webpackChunkName: "v-59939119" */
    "./assets/好用网站收藏.html-75a3ff21.js"
  ).then(({ data }) => data),
  // path: /design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F.html
  "v-4848c9f0": () => import(
    /* webpackChunkName: "v-4848c9f0" */
    "./assets/单例模式.html-f9f8c3f9.js"
  ).then(({ data }) => data),
  // path: /design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F.html
  "v-7a9b9630": () => import(
    /* webpackChunkName: "v-7a9b9630" */
    "./assets/工厂模式.html-bf736bcf.js"
  ).then(({ data }) => data),
  // path: /design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E9%97%A8%E9%9D%A2%E6%A8%A1%E5%BC%8F.html
  "v-71b4dc5e": () => import(
    /* webpackChunkName: "v-71b4dc5e" */
    "./assets/门面模式.html-80781494.js"
  ).then(({ data }) => data),
  // path: /posts/gRPC/gRPC%E6%9C%8D%E5%8A%A1.html
  "v-3966997b": () => import(
    /* webpackChunkName: "v-3966997b" */
    "./assets/gRPC服务.html-763d92ca.js"
  ).then(({ data }) => data),
  // path: /posts/Linux/Linux%E9%85%8D%E7%BD%AE%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.html
  "v-0b84fef2": () => import(
    /* webpackChunkName: "v-0b84fef2" */
    "./assets/Linux配置环境变量.html-14f7c39d.js"
  ).then(({ data }) => data),
  // path: /posts/mysql/mysql%E5%A4%87%E5%BF%98%E5%BD%95.html
  "v-784c3919": () => import(
    /* webpackChunkName: "v-784c3919" */
    "./assets/mysql备忘录.html-cffdab29.js"
  ).then(({ data }) => data),
  // path: /posts/python/Linux%E7%8E%AF%E5%A2%83%E4%B8%8BDBUtils%E5%AF%BC%E5%85%A5%E7%9A%84%E9%97%AE%E9%A2%98.html
  "v-4f435352": () => import(
    /* webpackChunkName: "v-4f435352" */
    "./assets/Linux环境下DBUtils导入的问题.html-29cd1c89.js"
  ).then(({ data }) => data),
  // path: /posts/python/polygon%E9%9D%A2%E7%A7%AF%E8%AE%A1%E7%AE%97.html
  "v-014b8769": () => import(
    /* webpackChunkName: "v-014b8769" */
    "./assets/polygon面积计算.html-208b79ea.js"
  ).then(({ data }) => data),
  // path: /posts/python/Python2%E8%BD%ACPython3.html
  "v-4870e4c2": () => import(
    /* webpackChunkName: "v-4870e4c2" */
    "./assets/Python2转Python3.html-8ce92cc9.js"
  ).then(({ data }) => data),
  // path: /posts/python/Python%E6%B7%BB%E5%8A%A0%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.html
  "v-77bb6b9a": () => import(
    /* webpackChunkName: "v-77bb6b9a" */
    "./assets/Python添加环境变量.html-3c793794.js"
  ).then(({ data }) => data),
  // path: /posts/tools/PicgoGitHub%E6%90%AD%E5%BB%BA%E5%9B%BE%E5%BA%8A.html
  "v-34cef64b": () => import(
    /* webpackChunkName: "v-34cef64b" */
    "./assets/PicgoGitHub搭建图床.html-8e7bfd51.js"
  ).then(({ data }) => data),
  // path: /posts/tools/sublime%E8%AF%B4%E6%98%8E%E4%B9%A6.html
  "v-a430865c": () => import(
    /* webpackChunkName: "v-a430865c" */
    "./assets/sublime说明书.html-0c2f2815.js"
  ).then(({ data }) => data),
  // path: /posts/Vue/Vue%E5%9F%BA%E7%A1%80.html
  "v-66d370d9": () => import(
    /* webpackChunkName: "v-66d370d9" */
    "./assets/Vue基础.html-d31f1ed2.js"
  ).then(({ data }) => data),
  // path: /posts/Vue/vue%E5%AE%A2%E6%88%B7%E7%AB%AF.html
  "v-3ae980e2": () => import(
    /* webpackChunkName: "v-3ae980e2" */
    "./assets/vue客户端.html-552c4fe1.js"
  ).then(({ data }) => data),
  // path: /anything/book_notes/%E4%BA%BA%E4%B9%8B%E8%A7%89%E9%86%92/%E4%B8%80%E5%88%87%E9%97%AE%E9%A2%98%E7%9A%84%E8%B5%B7%E6%BA%90.html
  "v-227b283b": () => import(
    /* webpackChunkName: "v-227b283b" */
    "./assets/一切问题的起源.html-7931b13d.js"
  ).then(({ data }) => data),
  // path: /404.html
  "v-3706649a": () => import(
    /* webpackChunkName: "v-3706649a" */
    "./assets/404.html-77beb351.js"
  ).then(({ data }) => data),
  // path: /anything/%E5%B0%8F%E8%AE%B0/
  "v-7f74a124": () => import(
    /* webpackChunkName: "v-7f74a124" */
    "./assets/index.html-7685aeab.js"
  ).then(({ data }) => data),
  // path: /anything/
  "v-c85a71d8": () => import(
    /* webpackChunkName: "v-c85a71d8" */
    "./assets/index.html-2d895521.js"
  ).then(({ data }) => data),
  // path: /design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/
  "v-7f99a408": () => import(
    /* webpackChunkName: "v-7f99a408" */
    "./assets/index.html-420d8e64.js"
  ).then(({ data }) => data),
  // path: /design_pattern/
  "v-eb42b032": () => import(
    /* webpackChunkName: "v-eb42b032" */
    "./assets/index.html-96ac881b.js"
  ).then(({ data }) => data),
  // path: /posts/gRPC/
  "v-08d26e1c": () => import(
    /* webpackChunkName: "v-08d26e1c" */
    "./assets/index.html-c74dbce0.js"
  ).then(({ data }) => data),
  // path: /posts/
  "v-e1e3da16": () => import(
    /* webpackChunkName: "v-e1e3da16" */
    "./assets/index.html-cda2d959.js"
  ).then(({ data }) => data),
  // path: /posts/Linux/
  "v-3689fde0": () => import(
    /* webpackChunkName: "v-3689fde0" */
    "./assets/index.html-092d3c3c.js"
  ).then(({ data }) => data),
  // path: /posts/mysql/
  "v-1dee9b02": () => import(
    /* webpackChunkName: "v-1dee9b02" */
    "./assets/index.html-78f75e8e.js"
  ).then(({ data }) => data),
  // path: /posts/python/
  "v-3ea18a3e": () => import(
    /* webpackChunkName: "v-3ea18a3e" */
    "./assets/index.html-533ab30a.js"
  ).then(({ data }) => data),
  // path: /posts/tools/
  "v-2951b8e9": () => import(
    /* webpackChunkName: "v-2951b8e9" */
    "./assets/index.html-c65965d4.js"
  ).then(({ data }) => data),
  // path: /posts/Vue/
  "v-635a6bfe": () => import(
    /* webpackChunkName: "v-635a6bfe" */
    "./assets/index.html-edb017ed.js"
  ).then(({ data }) => data),
  // path: /anything/book_notes/%E4%BA%BA%E4%B9%8B%E8%A7%89%E9%86%92/
  "v-0e47583b": () => import(
    /* webpackChunkName: "v-0e47583b" */
    "./assets/index.html-eb62e7de.js"
  ).then(({ data }) => data),
  // path: /anything/book_notes/
  "v-3bfcafe0": () => import(
    /* webpackChunkName: "v-3bfcafe0" */
    "./assets/index.html-cb58076f.js"
  ).then(({ data }) => data),
  // path: /category/
  "v-5bc93818": () => import(
    /* webpackChunkName: "v-5bc93818" */
    "./assets/index.html-08b3e749.js"
  ).then(({ data }) => data),
  // path: /tag/
  "v-744d024e": () => import(
    /* webpackChunkName: "v-744d024e" */
    "./assets/index.html-d9c9ea9c.js"
  ).then(({ data }) => data),
  // path: /article/
  "v-e52c881c": () => import(
    /* webpackChunkName: "v-e52c881c" */
    "./assets/index.html-4132d313.js"
  ).then(({ data }) => data),
  // path: /star/
  "v-154dc4c4": () => import(
    /* webpackChunkName: "v-154dc4c4" */
    "./assets/index.html-b6405ed6.js"
  ).then(({ data }) => data),
  // path: /timeline/
  "v-01560935": () => import(
    /* webpackChunkName: "v-01560935" */
    "./assets/index.html-620ca885.js"
  ).then(({ data }) => data),
  // path: /category/%E7%94%BB%E5%86%8C/
  "v-605620d1": () => import(
    /* webpackChunkName: "v-605620d1" */
    "./assets/index.html-f1986764.js"
  ).then(({ data }) => data),
  // path: /tag/%E7%BD%91%E7%AB%99/
  "v-efadec50": () => import(
    /* webpackChunkName: "v-efadec50" */
    "./assets/index.html-0db52788.js"
  ).then(({ data }) => data),
  // path: /category/%E7%BD%91%E5%9D%80%E6%94%B6%E8%97%8F/
  "v-6efe3f6e": () => import(
    /* webpackChunkName: "v-6efe3f6e" */
    "./assets/index.html-66b35593.js"
  ).then(({ data }) => data),
  // path: /tag/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/
  "v-05b88e01": () => import(
    /* webpackChunkName: "v-05b88e01" */
    "./assets/index.html-e7a54b05.js"
  ).then(({ data }) => data),
  // path: /category/python/
  "v-78cbe7bb": () => import(
    /* webpackChunkName: "v-78cbe7bb" */
    "./assets/index.html-b0f347b3.js"
  ).then(({ data }) => data),
  // path: /tag/python/
  "v-245f5676": () => import(
    /* webpackChunkName: "v-245f5676" */
    "./assets/index.html-f49af92f.js"
  ).then(({ data }) => data),
  // path: /category/%E6%8A%80%E6%9C%AF/
  "v-594730ea": () => import(
    /* webpackChunkName: "v-594730ea" */
    "./assets/index.html-8cc6ed80.js"
  ).then(({ data }) => data),
  // path: /tag/gprc/
  "v-287e5507": () => import(
    /* webpackChunkName: "v-287e5507" */
    "./assets/index.html-5a481783.js"
  ).then(({ data }) => data),
  // path: /category/%E5%B7%A5%E5%85%B7/
  "v-14145d44": () => import(
    /* webpackChunkName: "v-14145d44" */
    "./assets/index.html-e218d93b.js"
  ).then(({ data }) => data),
  // path: /tag/rpc/
  "v-b306a390": () => import(
    /* webpackChunkName: "v-b306a390" */
    "./assets/index.html-6a6c696e.js"
  ).then(({ data }) => data),
  // path: /category/vue/
  "v-65f6d381": () => import(
    /* webpackChunkName: "v-65f6d381" */
    "./assets/index.html-a43e1534.js"
  ).then(({ data }) => data),
  // path: /tag/linux/
  "v-211f44ee": () => import(
    /* webpackChunkName: "v-211f44ee" */
    "./assets/index.html-4a8f0349.js"
  ).then(({ data }) => data),
  // path: /tag/mysql/
  "v-1bee38ca": () => import(
    /* webpackChunkName: "v-1bee38ca" */
    "./assets/index.html-4437bd47.js"
  ).then(({ data }) => data),
  // path: /tag/polygon/
  "v-a2fdb2fa": () => import(
    /* webpackChunkName: "v-a2fdb2fa" */
    "./assets/index.html-15124902.js"
  ).then(({ data }) => data),
  // path: /tag/2to3/
  "v-259537bb": () => import(
    /* webpackChunkName: "v-259537bb" */
    "./assets/index.html-094cd24a.js"
  ).then(({ data }) => data),
  // path: /tag/picgo/
  "v-1382eb6a": () => import(
    /* webpackChunkName: "v-1382eb6a" */
    "./assets/index.html-a00c82a1.js"
  ).then(({ data }) => data),
  // path: /tag/github/
  "v-132a6ac4": () => import(
    /* webpackChunkName: "v-132a6ac4" */
    "./assets/index.html-cb3a2c28.js"
  ).then(({ data }) => data),
  // path: /tag/sublime-text/
  "v-32b1cb5c": () => import(
    /* webpackChunkName: "v-32b1cb5c" */
    "./assets/index.html-284fb423.js"
  ).then(({ data }) => data),
  // path: /tag/%E5%B7%A5%E5%85%B7%E8%AF%B4%E6%98%8E%E4%B9%A6/
  "v-1d73fa7a": () => import(
    /* webpackChunkName: "v-1d73fa7a" */
    "./assets/index.html-aec32a11.js"
  ).then(({ data }) => data),
  // path: /tag/%E5%89%8D%E7%AB%AF/
  "v-95f987f4": () => import(
    /* webpackChunkName: "v-95f987f4" */
    "./assets/index.html-81b11e4f.js"
  ).then(({ data }) => data),
  // path: /tag/%E6%A1%86%E6%9E%B6/
  "v-f4d3cd72": () => import(
    /* webpackChunkName: "v-f4d3cd72" */
    "./assets/index.html-618755e4.js"
  ).then(({ data }) => data)
};
const siteData$1 = JSON.parse('{"base":"/space/","lang":"zh-CN","title":"#/ cd L.H.X Blog Home","description":"","head":[["link",{"rel":"preconnect","href":"https://fonts.googleapis.com"}],["link",{"rel":"preconnect","href":"https://fonts.gstatic.com","crossorigin":""}],["link",{"href":"https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap","rel":"stylesheet"}],["link",{"href":"https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+KuaiLe&display=swap","rel":"stylesheet"}],["link",{"rel":"manifest","href":"/manifest.webmanifest"}],["meta",{"name":"theme-color","content":"#3eaf7c"}],["link",{"rel":"icon","href":"/space/favicon.ico"}],["link",{"rel":"icon","href":"/space/assets/icon/chrome-mask-512.png","type":"image/png","sizes":"512x512"}],["link",{"rel":"icon","href":"/space/assets/icon/chrome-mask-192.png","type":"image/png","sizes":"192x192"}],["link",{"rel":"icon","href":"/space/assets/icon/chrome-512.png","type":"image/png","sizes":"512x512"}],["link",{"rel":"icon","href":"/space/assets/icon/chrome-192.png","type":"image/png","sizes":"192x192"}],["link",{"rel":"apple-touch-icon","href":"/space/assets/icon/apple-icon-152.png"}],["meta",{"name":"apple-mobile-web-app-capable","content":"yes"}],["meta",{"name":"apple-mobile-web-app-status-bar-style","content":"black"}],["meta",{"name":"msapplication-TileImage","content":"/space/assets/icon/ms-icon-144.png"}],["meta",{"name":"msapplication-TileColor","content":"#ffffff"}],["meta",{"name":"viewport","content":"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"}]],"locales":{}}');
const pagesComponents = {
  // path: /intro.html
  "v-184f4da6": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-184f4da6" */
    "./assets/intro.html-248e396d.js"
  )),
  // path: /
  "v-8daa1a0e": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-8daa1a0e" */
    "./assets/index.html-cd97d14b.js"
  )),
  // path: /slides.html
  "v-2e3eac9e": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-2e3eac9e" */
    "./assets/slides.html-f4db5408.js"
  )),
  // path: /anything/%E5%B0%8F%E8%AE%B0/%E4%B8%8B%E9%9B%AA%E5%95%A6.html
  "v-ca2606fe": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-ca2606fe" */
    "./assets/下雪啦.html-98c6d593.js"
  )),
  // path: /anything/%E5%B0%8F%E8%AE%B0/%E5%A5%BD%E7%94%A8%E7%BD%91%E7%AB%99%E6%94%B6%E8%97%8F.html
  "v-59939119": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-59939119" */
    "./assets/好用网站收藏.html-baab33b0.js"
  )),
  // path: /design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F.html
  "v-4848c9f0": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-4848c9f0" */
    "./assets/单例模式.html-617670eb.js"
  )),
  // path: /design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F.html
  "v-7a9b9630": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-7a9b9630" */
    "./assets/工厂模式.html-1d1394ce.js"
  )),
  // path: /design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E9%97%A8%E9%9D%A2%E6%A8%A1%E5%BC%8F.html
  "v-71b4dc5e": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-71b4dc5e" */
    "./assets/门面模式.html-a0282dd2.js"
  )),
  // path: /posts/gRPC/gRPC%E6%9C%8D%E5%8A%A1.html
  "v-3966997b": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-3966997b" */
    "./assets/gRPC服务.html-7ff88d5b.js"
  )),
  // path: /posts/Linux/Linux%E9%85%8D%E7%BD%AE%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.html
  "v-0b84fef2": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-0b84fef2" */
    "./assets/Linux配置环境变量.html-8d41d635.js"
  )),
  // path: /posts/mysql/mysql%E5%A4%87%E5%BF%98%E5%BD%95.html
  "v-784c3919": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-784c3919" */
    "./assets/mysql备忘录.html-88faf280.js"
  )),
  // path: /posts/python/Linux%E7%8E%AF%E5%A2%83%E4%B8%8BDBUtils%E5%AF%BC%E5%85%A5%E7%9A%84%E9%97%AE%E9%A2%98.html
  "v-4f435352": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-4f435352" */
    "./assets/Linux环境下DBUtils导入的问题.html-ce5fd5f7.js"
  )),
  // path: /posts/python/polygon%E9%9D%A2%E7%A7%AF%E8%AE%A1%E7%AE%97.html
  "v-014b8769": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-014b8769" */
    "./assets/polygon面积计算.html-7915c862.js"
  )),
  // path: /posts/python/Python2%E8%BD%ACPython3.html
  "v-4870e4c2": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-4870e4c2" */
    "./assets/Python2转Python3.html-d81168e0.js"
  )),
  // path: /posts/python/Python%E6%B7%BB%E5%8A%A0%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.html
  "v-77bb6b9a": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-77bb6b9a" */
    "./assets/Python添加环境变量.html-6cecbd75.js"
  )),
  // path: /posts/tools/PicgoGitHub%E6%90%AD%E5%BB%BA%E5%9B%BE%E5%BA%8A.html
  "v-34cef64b": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-34cef64b" */
    "./assets/PicgoGitHub搭建图床.html-d0ac1a6c.js"
  )),
  // path: /posts/tools/sublime%E8%AF%B4%E6%98%8E%E4%B9%A6.html
  "v-a430865c": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-a430865c" */
    "./assets/sublime说明书.html-511be248.js"
  )),
  // path: /posts/Vue/Vue%E5%9F%BA%E7%A1%80.html
  "v-66d370d9": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-66d370d9" */
    "./assets/Vue基础.html-4b574e8c.js"
  )),
  // path: /posts/Vue/vue%E5%AE%A2%E6%88%B7%E7%AB%AF.html
  "v-3ae980e2": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-3ae980e2" */
    "./assets/vue客户端.html-88bca293.js"
  )),
  // path: /anything/book_notes/%E4%BA%BA%E4%B9%8B%E8%A7%89%E9%86%92/%E4%B8%80%E5%88%87%E9%97%AE%E9%A2%98%E7%9A%84%E8%B5%B7%E6%BA%90.html
  "v-227b283b": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-227b283b" */
    "./assets/一切问题的起源.html-cc9db719.js"
  )),
  // path: /404.html
  "v-3706649a": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-3706649a" */
    "./assets/404.html-037f8eb2.js"
  )),
  // path: /anything/%E5%B0%8F%E8%AE%B0/
  "v-7f74a124": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-7f74a124" */
    "./assets/index.html-8cad0a4b.js"
  )),
  // path: /anything/
  "v-c85a71d8": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-c85a71d8" */
    "./assets/index.html-8272aba7.js"
  )),
  // path: /design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/
  "v-7f99a408": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-7f99a408" */
    "./assets/index.html-958d30c7.js"
  )),
  // path: /design_pattern/
  "v-eb42b032": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-eb42b032" */
    "./assets/index.html-d7a20728.js"
  )),
  // path: /posts/gRPC/
  "v-08d26e1c": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-08d26e1c" */
    "./assets/index.html-fb99a26e.js"
  )),
  // path: /posts/
  "v-e1e3da16": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-e1e3da16" */
    "./assets/index.html-fc56c7e8.js"
  )),
  // path: /posts/Linux/
  "v-3689fde0": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-3689fde0" */
    "./assets/index.html-5404fbb0.js"
  )),
  // path: /posts/mysql/
  "v-1dee9b02": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-1dee9b02" */
    "./assets/index.html-2c3a12ad.js"
  )),
  // path: /posts/python/
  "v-3ea18a3e": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-3ea18a3e" */
    "./assets/index.html-1a032640.js"
  )),
  // path: /posts/tools/
  "v-2951b8e9": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-2951b8e9" */
    "./assets/index.html-52957521.js"
  )),
  // path: /posts/Vue/
  "v-635a6bfe": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-635a6bfe" */
    "./assets/index.html-4221f37b.js"
  )),
  // path: /anything/book_notes/%E4%BA%BA%E4%B9%8B%E8%A7%89%E9%86%92/
  "v-0e47583b": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-0e47583b" */
    "./assets/index.html-09fa9893.js"
  )),
  // path: /anything/book_notes/
  "v-3bfcafe0": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-3bfcafe0" */
    "./assets/index.html-8df3c408.js"
  )),
  // path: /category/
  "v-5bc93818": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-5bc93818" */
    "./assets/index.html-d8e9a019.js"
  )),
  // path: /tag/
  "v-744d024e": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-744d024e" */
    "./assets/index.html-dbcf72de.js"
  )),
  // path: /article/
  "v-e52c881c": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-e52c881c" */
    "./assets/index.html-6fe96b5b.js"
  )),
  // path: /star/
  "v-154dc4c4": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-154dc4c4" */
    "./assets/index.html-e9483f18.js"
  )),
  // path: /timeline/
  "v-01560935": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-01560935" */
    "./assets/index.html-0e2d15e2.js"
  )),
  // path: /category/%E7%94%BB%E5%86%8C/
  "v-605620d1": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-605620d1" */
    "./assets/index.html-50e02d9f.js"
  )),
  // path: /tag/%E7%BD%91%E7%AB%99/
  "v-efadec50": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-efadec50" */
    "./assets/index.html-a9fb0518.js"
  )),
  // path: /category/%E7%BD%91%E5%9D%80%E6%94%B6%E8%97%8F/
  "v-6efe3f6e": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-6efe3f6e" */
    "./assets/index.html-f675d176.js"
  )),
  // path: /tag/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/
  "v-05b88e01": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-05b88e01" */
    "./assets/index.html-3d3a1f25.js"
  )),
  // path: /category/python/
  "v-78cbe7bb": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-78cbe7bb" */
    "./assets/index.html-eef0930c.js"
  )),
  // path: /tag/python/
  "v-245f5676": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-245f5676" */
    "./assets/index.html-31390da0.js"
  )),
  // path: /category/%E6%8A%80%E6%9C%AF/
  "v-594730ea": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-594730ea" */
    "./assets/index.html-febb604e.js"
  )),
  // path: /tag/gprc/
  "v-287e5507": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-287e5507" */
    "./assets/index.html-13589f62.js"
  )),
  // path: /category/%E5%B7%A5%E5%85%B7/
  "v-14145d44": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-14145d44" */
    "./assets/index.html-10b6ff0f.js"
  )),
  // path: /tag/rpc/
  "v-b306a390": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-b306a390" */
    "./assets/index.html-85834105.js"
  )),
  // path: /category/vue/
  "v-65f6d381": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-65f6d381" */
    "./assets/index.html-073248ef.js"
  )),
  // path: /tag/linux/
  "v-211f44ee": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-211f44ee" */
    "./assets/index.html-294cea7a.js"
  )),
  // path: /tag/mysql/
  "v-1bee38ca": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-1bee38ca" */
    "./assets/index.html-1bc75844.js"
  )),
  // path: /tag/polygon/
  "v-a2fdb2fa": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-a2fdb2fa" */
    "./assets/index.html-a34df3c9.js"
  )),
  // path: /tag/2to3/
  "v-259537bb": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-259537bb" */
    "./assets/index.html-5112c548.js"
  )),
  // path: /tag/picgo/
  "v-1382eb6a": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-1382eb6a" */
    "./assets/index.html-d769d63f.js"
  )),
  // path: /tag/github/
  "v-132a6ac4": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-132a6ac4" */
    "./assets/index.html-3d4c10e3.js"
  )),
  // path: /tag/sublime-text/
  "v-32b1cb5c": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-32b1cb5c" */
    "./assets/index.html-f057e67b.js"
  )),
  // path: /tag/%E5%B7%A5%E5%85%B7%E8%AF%B4%E6%98%8E%E4%B9%A6/
  "v-1d73fa7a": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-1d73fa7a" */
    "./assets/index.html-ea64e006.js"
  )),
  // path: /tag/%E5%89%8D%E7%AB%AF/
  "v-95f987f4": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-95f987f4" */
    "./assets/index.html-9d59586a.js"
  )),
  // path: /tag/%E6%A1%86%E6%9E%B6/
  "v-f4d3cd72": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-f4d3cd72" */
    "./assets/index.html-994d133a.js"
  ))
};
var layoutsSymbol = Symbol(
  ""
);
var pagesData = ref(pagesData$1);
var pageDataEmpty = readonly({
  key: "",
  path: "",
  title: "",
  lang: "",
  frontmatter: {},
  headers: []
});
var pageData = ref(pageDataEmpty);
var usePageData = () => pageData;
var pageFrontmatterSymbol = Symbol(
  ""
);
var usePageFrontmatter = () => {
  const pageFrontmatter = inject(pageFrontmatterSymbol);
  if (!pageFrontmatter) {
    throw new Error("usePageFrontmatter() is called without provider.");
  }
  return pageFrontmatter;
};
var pageHeadSymbol = Symbol(
  ""
);
var usePageHead = () => {
  const pageHead = inject(pageHeadSymbol);
  if (!pageHead) {
    throw new Error("usePageHead() is called without provider.");
  }
  return pageHead;
};
var pageHeadTitleSymbol = Symbol(
  ""
);
var pageLangSymbol = Symbol(
  ""
);
var usePageLang = () => {
  const pageLang = inject(pageLangSymbol);
  if (!pageLang) {
    throw new Error("usePageLang() is called without provider.");
  }
  return pageLang;
};
var pageLayoutSymbol = Symbol(
  ""
);
var usePageLayout = () => {
  const pageLayout = inject(pageLayoutSymbol);
  if (!pageLayout) {
    throw new Error("usePageLayout() is called without provider.");
  }
  return pageLayout;
};
var routeLocaleSymbol = Symbol(
  ""
);
var useRouteLocale = () => {
  const routeLocale = inject(routeLocaleSymbol);
  if (!routeLocale) {
    throw new Error("useRouteLocale() is called without provider.");
  }
  return routeLocale;
};
var siteData = ref(siteData$1);
var useSiteData = () => siteData;
var siteLocaleDataSymbol = Symbol(
  ""
);
var useSiteLocaleData = () => {
  const siteLocaleData = inject(siteLocaleDataSymbol);
  if (!siteLocaleData) {
    throw new Error("useSiteLocaleData() is called without provider.");
  }
  return siteLocaleData;
};
var LAYOUT_NAME_DEFAULT = "Layout";
var LAYOUT_NAME_NOT_FOUND = "NotFound";
var resolvers = reactive({
  /**
   * Resolve layouts component map
   */
  resolveLayouts: (clientConfigs2) => clientConfigs2.reduce(
    (prev, item) => ({
      ...prev,
      ...item.layouts
    }),
    {}
  ),
  /**
   * Resolve page data according to page key
   */
  resolvePageData: async (pageKey) => {
    const pageDataResolver = pagesData.value[pageKey];
    const pageData2 = await (pageDataResolver == null ? void 0 : pageDataResolver());
    return pageData2 ?? pageDataEmpty;
  },
  /**
   * Resolve page frontmatter from page data
   */
  resolvePageFrontmatter: (pageData2) => pageData2.frontmatter,
  /**
   * Merge the head config in frontmatter and site locale
   *
   * Frontmatter should take priority over site locale
   */
  resolvePageHead: (headTitle, frontmatter, siteLocale) => {
    const description = isString(frontmatter.description) ? frontmatter.description : siteLocale.description;
    const head = [
      ...isArray(frontmatter.head) ? frontmatter.head : [],
      ...siteLocale.head,
      ["title", {}, headTitle],
      ["meta", { name: "description", content: description }]
    ];
    return dedupeHead(head);
  },
  /**
   * Resolve the content of page head title
   *
   * It would be used as the content of the `<title>` tag
   */
  resolvePageHeadTitle: (page2, siteLocale) => [page2.title, siteLocale.title].filter((item) => !!item).join(" | "),
  /**
   * Resolve page language from page data
   *
   * It would be used as the `lang` attribute of `<html>` tag
   */
  resolvePageLang: (page2) => page2.lang || "en",
  /**
   * Resolve layout component of current page
   */
  resolvePageLayout: (page2, layouts) => {
    let layoutName;
    if (page2.path) {
      const frontmatterLayout = page2.frontmatter.layout;
      if (isString(frontmatterLayout)) {
        layoutName = frontmatterLayout;
      } else {
        layoutName = LAYOUT_NAME_DEFAULT;
      }
    } else {
      layoutName = LAYOUT_NAME_NOT_FOUND;
    }
    return layouts[layoutName];
  },
  /**
   * Resolve locale path according to route path and locales config
   */
  resolveRouteLocale: (locales2, routePath) => resolveLocalePath(locales2, routePath),
  /**
   * Resolve site data for specific locale
   *
   * It would merge the locales fields to the root fields
   */
  resolveSiteLocaleData: (site, routeLocale) => ({
    ...site,
    ...site.locales[routeLocale]
  })
});
var ClientOnly = defineComponent({
  name: "ClientOnly",
  setup(_2, ctx) {
    const isMounted = ref(false);
    onMounted(() => {
      isMounted.value = true;
    });
    return () => {
      var _a2, _b2;
      return isMounted.value ? (_b2 = (_a2 = ctx.slots).default) == null ? void 0 : _b2.call(_a2) : null;
    };
  }
});
var Content = defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Content",
  props: {
    pageKey: {
      type: String,
      required: false,
      default: ""
    }
  },
  setup(props) {
    const page2 = usePageData();
    const pageComponent = computed(
      () => pagesComponents[props.pageKey || page2.value.key]
    );
    return () => pageComponent.value ? (
      // use page component
      h$4(pageComponent.value)
    ) : (
      // fallback content
      h$4(
        "div",
        "404 Not Found"
      )
    );
  }
});
var defineClientConfig = (clientConfig = {}) => clientConfig;
var withBase = (url) => {
  if (isLinkHttp(url))
    return url;
  return `${"/space/"}${removeLeadingSlash(url)}`;
};
const hopeInject = "";
const clientConfig0 = {};
var u8 = Uint8Array, u16 = Uint16Array, i32 = Int32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b2 = new u16(31);
  for (var i2 = 0; i2 < 31; ++i2) {
    b2[i2] = start += 1 << eb[i2 - 1];
  }
  var r2 = new i32(b2[30]);
  for (var i2 = 1; i2 < 30; ++i2) {
    for (var j2 = b2[i2]; j2 < b2[i2 + 1]; ++j2) {
      r2[j2] = j2 - b2[i2] << 5 | i2;
    }
  }
  return { b: b2, r: r2 };
};
var _a = freb(fleb, 2), fl = _a.b, revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0), fd = _b.b;
var rev = new u16(32768);
for (var i$5 = 0; i$5 < 32768; ++i$5) {
  var x$3 = (i$5 & 43690) >> 1 | (i$5 & 21845) << 1;
  x$3 = (x$3 & 52428) >> 2 | (x$3 & 13107) << 2;
  x$3 = (x$3 & 61680) >> 4 | (x$3 & 3855) << 4;
  rev[i$5] = ((x$3 & 65280) >> 8 | (x$3 & 255) << 8) >> 1;
}
var hMap = function(cd, mb, r2) {
  var s2 = cd.length;
  var i2 = 0;
  var l2 = new u16(mb);
  for (; i2 < s2; ++i2) {
    if (cd[i2])
      ++l2[cd[i2] - 1];
  }
  var le2 = new u16(mb);
  for (i2 = 1; i2 < mb; ++i2) {
    le2[i2] = le2[i2 - 1] + l2[i2 - 1] << 1;
  }
  var co;
  if (r2) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i2 = 0; i2 < s2; ++i2) {
      if (cd[i2]) {
        var sv = i2 << 4 | cd[i2];
        var r_1 = mb - cd[i2];
        var v2 = le2[cd[i2] - 1]++ << r_1;
        for (var m2 = v2 | (1 << r_1) - 1; v2 <= m2; ++v2) {
          co[rev[v2] >> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s2);
    for (i2 = 0; i2 < s2; ++i2) {
      if (cd[i2]) {
        co[i2] = rev[le2[cd[i2] - 1]++] >> 15 - cd[i2];
      }
    }
  }
  return co;
};
var flt = new u8(288);
for (var i$5 = 0; i$5 < 144; ++i$5)
  flt[i$5] = 8;
for (var i$5 = 144; i$5 < 256; ++i$5)
  flt[i$5] = 9;
for (var i$5 = 256; i$5 < 280; ++i$5)
  flt[i$5] = 7;
for (var i$5 = 280; i$5 < 288; ++i$5)
  flt[i$5] = 8;
var fdt = new u8(32);
for (var i$5 = 0; i$5 < 32; ++i$5)
  fdt[i$5] = 5;
var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
var max = function(a2) {
  var m2 = a2[0];
  for (var i2 = 1; i2 < a2.length; ++i2) {
    if (a2[i2] > m2)
      m2 = a2[i2];
  }
  return m2;
};
var bits = function(d2, p2, m2) {
  var o2 = p2 / 8 | 0;
  return (d2[o2] | d2[o2 + 1] << 8) >> (p2 & 7) & m2;
};
var bits16 = function(d2, p2) {
  var o2 = p2 / 8 | 0;
  return (d2[o2] | d2[o2 + 1] << 8 | d2[o2 + 2] << 16) >> (p2 & 7);
};
var shft = function(p2) {
  return (p2 + 7) / 8 | 0;
};
var slc = function(v2, s2, e2) {
  if (s2 == null || s2 < 0)
    s2 = 0;
  if (e2 == null || e2 > v2.length)
    e2 = v2.length;
  return new u8(v2.subarray(s2, e2));
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
];
var err = function(ind, msg, nt) {
  var e2 = new Error(msg || ec[ind]);
  e2.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e2, err);
  if (!nt)
    throw e2;
  return e2;
};
var inflt = function(dat, st, buf, dict) {
  var sl = dat.length, dl = dict ? dict.length : 0;
  if (!sl || st.f && !st.l)
    return buf || new u8(0);
  var noBuf = !buf;
  var resize = noBuf || st.i != 2;
  var noSt = st.i;
  if (noBuf)
    buf = new u8(sl * 3);
  var cbuf = function(l3) {
    var bl = buf.length;
    if (l3 > bl) {
      var nbuf = new u8(Math.max(bl * 2, l3));
      nbuf.set(buf);
      buf = nbuf;
    }
  };
  var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
  var tbts = sl * 8;
  do {
    if (!lm) {
      final = bits(dat, pos, 1);
      var type = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type) {
        var s2 = shft(pos) + 4, l2 = dat[s2 - 4] | dat[s2 - 3] << 8, t2 = s2 + l2;
        if (t2 > sl) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt + l2);
        buf.set(dat.subarray(s2, t2), bt);
        st.b = bt += l2, st.p = pos = t2 * 8, st.f = final;
        continue;
      } else if (type == 1)
        lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type == 2) {
        var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        var tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        var ldt = new u8(tl);
        var clt = new u8(19);
        for (var i2 = 0; i2 < hcLen; ++i2) {
          clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);
        }
        pos += hcLen * 3;
        var clb = max(clt), clbmsk = (1 << clb) - 1;
        var clm = hMap(clt, clb, 1);
        for (var i2 = 0; i2 < tl; ) {
          var r2 = clm[bits(dat, pos, clbmsk)];
          pos += r2 & 15;
          var s2 = r2 >> 4;
          if (s2 < 16) {
            ldt[i2++] = s2;
          } else {
            var c2 = 0, n2 = 0;
            if (s2 == 16)
              n2 = 3 + bits(dat, pos, 3), pos += 2, c2 = ldt[i2 - 1];
            else if (s2 == 17)
              n2 = 3 + bits(dat, pos, 7), pos += 3;
            else if (s2 == 18)
              n2 = 11 + bits(dat, pos, 127), pos += 7;
            while (n2--)
              ldt[i2++] = c2;
          }
        }
        var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
        lbt = max(lt);
        dbt = max(dt);
        lm = hMap(lt, lbt, 1);
        dm = hMap(dt, dbt, 1);
      } else
        err(1);
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
    }
    if (resize)
      cbuf(bt + 131072);
    var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    var lpos = pos;
    for (; ; lpos = pos) {
      var c2 = lm[bits16(dat, pos) & lms], sym = c2 >> 4;
      pos += c2 & 15;
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
      if (!c2)
        err(2);
      if (sym < 256)
        buf[bt++] = sym;
      else if (sym == 256) {
        lpos = pos, lm = null;
        break;
      } else {
        var add = sym - 254;
        if (sym > 264) {
          var i2 = sym - 257, b2 = fleb[i2];
          add = bits(dat, pos, (1 << b2) - 1) + fl[i2];
          pos += b2;
        }
        var d2 = dm[bits16(dat, pos) & dms], dsym = d2 >> 4;
        if (!d2)
          err(3);
        pos += d2 & 15;
        var dt = fd[dsym];
        if (dsym > 3) {
          var b2 = fdeb[dsym];
          dt += bits16(dat, pos) & (1 << b2) - 1, pos += b2;
        }
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt + 131072);
        var end = bt + add;
        if (bt < dt) {
          var shift = dl - dt, dend = Math.min(dt, end);
          if (shift + bt < 0)
            err(3);
          for (; bt < dend; ++bt)
            buf[bt] = dict[shift + bt];
        }
        for (; bt < end; ++bt)
          buf[bt] = buf[bt - dt];
      }
    }
    st.l = lm, st.p = lpos, st.b = bt, st.f = final;
    if (lm)
      final = 1, st.m = lbt, st.d = dm, st.n = dbt;
  } while (!final);
  return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
};
var et = /* @__PURE__ */ new u8(0);
var zls = function(d2, dict) {
  if ((d2[0] & 15) != 8 || d2[0] >> 4 > 7 || (d2[0] << 8 | d2[1]) % 31)
    err(6, "invalid zlib data");
  if ((d2[1] >> 5 & 1) == +!dict)
    err(6, "invalid zlib data: " + (d2[1] & 32 ? "need" : "unexpected") + " dictionary");
  return (d2[1] >> 3 & 4) + 2;
};
function unzlibSync(data, opts) {
  return inflt(data.subarray(zls(data, opts && opts.dictionary), -4), { i: 2 }, opts && opts.out, opts && opts.dictionary);
}
var te = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder();
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e2) {
}
var dutf8 = function(d2) {
  for (var r2 = "", i2 = 0; ; ) {
    var c2 = d2[i2++];
    var eb = (c2 > 127) + (c2 > 223) + (c2 > 239);
    if (i2 + eb > d2.length)
      return { s: r2, r: slc(d2, i2 - 1) };
    if (!eb)
      r2 += String.fromCharCode(c2);
    else if (eb == 3) {
      c2 = ((c2 & 15) << 18 | (d2[i2++] & 63) << 12 | (d2[i2++] & 63) << 6 | d2[i2++] & 63) - 65536, r2 += String.fromCharCode(55296 | c2 >> 10, 56320 | c2 & 1023);
    } else if (eb & 1)
      r2 += String.fromCharCode((c2 & 31) << 6 | d2[i2++] & 63);
    else
      r2 += String.fromCharCode((c2 & 15) << 12 | (d2[i2++] & 63) << 6 | d2[i2++] & 63);
  }
};
function strToU8(str, latin1) {
  if (latin1) {
    var ar_1 = new u8(str.length);
    for (var i2 = 0; i2 < str.length; ++i2)
      ar_1[i2] = str.charCodeAt(i2);
    return ar_1;
  }
  if (te)
    return te.encode(str);
  var l2 = str.length;
  var ar = new u8(str.length + (str.length >> 1));
  var ai = 0;
  var w2 = function(v2) {
    ar[ai++] = v2;
  };
  for (var i2 = 0; i2 < l2; ++i2) {
    if (ai + 5 > ar.length) {
      var n2 = new u8(ai + 8 + (l2 - i2 << 1));
      n2.set(ar);
      ar = n2;
    }
    var c2 = str.charCodeAt(i2);
    if (c2 < 128 || latin1)
      w2(c2);
    else if (c2 < 2048)
      w2(192 | c2 >> 6), w2(128 | c2 & 63);
    else if (c2 > 55295 && c2 < 57344)
      c2 = 65536 + (c2 & 1023 << 10) | str.charCodeAt(++i2) & 1023, w2(240 | c2 >> 18), w2(128 | c2 >> 12 & 63), w2(128 | c2 >> 6 & 63), w2(128 | c2 & 63);
    else
      w2(224 | c2 >> 12), w2(128 | c2 >> 6 & 63), w2(128 | c2 & 63);
  }
  return slc(ar, 0, ai);
}
function strFromU8(dat, latin1) {
  if (latin1) {
    var r2 = "";
    for (var i2 = 0; i2 < dat.length; i2 += 16384)
      r2 += String.fromCharCode.apply(null, dat.subarray(i2, i2 + 16384));
    return r2;
  } else if (td) {
    return td.decode(dat);
  } else {
    var _a2 = dutf8(dat), s2 = _a2.s, r2 = _a2.r;
    if (r2.length)
      err(8);
    return s2;
  }
}
const u$4 = ({ name: e2 = "", color: t2 = "currentColor" }, { slots: n2 }) => {
  var o2;
  return h$4("svg", { xmlns: "http://www.w3.org/2000/svg", class: ["icon", `${e2}-icon`], viewBox: "0 0 1024 1024", fill: t2, "aria-label": `${e2} icon` }, (o2 = n2.default) == null ? void 0 : o2.call(n2));
};
u$4.displayName = "IconBase";
const C$4 = ({ size: e2 = 48, stroke: t2 = 4, wrapper: n2 = true, height: o2 = 2 * e2 }) => {
  const i2 = h$4("svg", { xmlns: "http://www.w3.org/2000/svg", width: e2, height: e2, preserveAspectRatio: "xMidYMid", viewBox: "25 25 50 50" }, [h$4("animateTransform", { attributeName: "transform", type: "rotate", dur: "2s", keyTimes: "0;1", repeatCount: "indefinite", values: "0;360" }), h$4("circle", { cx: "50", cy: "50", r: "20", fill: "none", stroke: "currentColor", "stroke-width": t2, "stroke-linecap": "round" }, [h$4("animate", { attributeName: "stroke-dasharray", dur: "1.5s", keyTimes: "0;0.5;1", repeatCount: "indefinite", values: "1,200;90,200;1,200" }), h$4("animate", { attributeName: "stroke-dashoffset", dur: "1.5s", keyTimes: "0;0.5;1", repeatCount: "indefinite", values: "0;-35px;-125px" })])]);
  return n2 ? h$4("div", { class: "loading-icon-wrapper", style: `display:flex;align-items:center;justify-content:center;height:${o2}px` }, i2) : i2;
};
C$4.displayName = "LoadingIcon";
const oe = (e2, { slots: t2 }) => {
  var n2;
  return (n2 = t2.default) == null ? void 0 : n2.call(t2);
}, ie = (e2) => /\b(?:Android|iPhone)/i.test(e2), ae = (e2) => /version\/([\w.]+) .*(mobile ?safari|safari)/i.test(e2), le = (e2) => [/\((ipad);[-\w),; ]+apple/i, /applecoremedia\/[\w.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i].some((t2) => t2.test(e2)), pe = (e2 = "") => {
  if (e2) {
    if (typeof e2 == "number")
      return new Date(e2);
    const t2 = Date.parse(e2.toString());
    if (!Number.isNaN(t2))
      return new Date(t2);
  }
  return null;
}, he = (e2, t2) => {
  let n2 = 1;
  for (let o2 = 0; o2 < e2.length; o2++)
    n2 += e2.charCodeAt(o2), n2 += n2 << 10, n2 ^= n2 >> 6;
  return n2 += n2 << 3, n2 ^= n2 >> 11, n2 % t2;
}, p = Array.isArray, fe = (e2) => typeof e2 == "function", ve = (e2) => typeof e2 == "string";
var $$1 = (e2) => e2.startsWith("ftp://"), h$3 = (e2) => /^(https?:)?\/\//.test(e2), we = /.md((\?|#).*)?$/, ye = (e2, t2 = "/") => !!(h$3(e2) || $$1(e2) || e2.startsWith("/") && !e2.startsWith(t2) && !we.test(e2)), m$5 = (e2) => Object.prototype.toString.call(e2) === "[object Object]";
function $e() {
  const e2 = ref(false);
  return getCurrentInstance() && onMounted(() => {
    e2.value = true;
  }), e2;
}
function ze(e2) {
  return $e(), computed(() => !!e2());
}
const Re = (e2) => typeof e2 == "function", a$6 = (e2) => typeof e2 == "string", z$3 = (e2, t2) => a$6(e2) && e2.startsWith(t2), Pe = (e2, t2) => a$6(e2) && e2.endsWith(t2), M$4 = Object.entries, _e = Object.fromEntries, f$2 = Object.keys, v$5 = (e2, ...t2) => {
  if (t2.length === 0)
    return e2;
  const n2 = t2.shift() || null;
  return n2 && M$4(n2).forEach(([o2, i2]) => {
    o2 === "__proto__" || o2 === "constructor" || (m$5(e2[o2]) && m$5(i2) ? v$5(e2[o2], i2) : p(i2) ? e2[o2] = [...i2] : m$5(i2) ? e2[o2] = { ...i2 } : e2[o2] = n2[o2]);
  }), v$5(e2, ...t2);
}, R$3 = (e2) => (e2.endsWith(".md") && (e2 = `${e2.slice(0, -3)}.html`), !e2.endsWith("/") && !e2.endsWith(".html") && (e2 = `${e2}.html`), e2 = e2.replace(/(^|\/)(?:README|index).html$/i, "$1"), e2), A$4 = (e2) => {
  const [t2, n2 = ""] = e2.split("#");
  return t2 ? `${R$3(t2)}${n2 ? `#${n2}` : ""}` : e2;
}, N$2 = (e2) => m$5(e2) && a$6(e2.name), Te = (e2, t2 = false) => e2 ? p(e2) ? e2.map((n2) => a$6(n2) ? { name: n2 } : N$2(n2) ? n2 : null).filter((n2) => n2 !== null) : a$6(e2) ? [{ name: e2 }] : N$2(e2) ? [e2] : (console.error(`Expect "author" to be \`AuthorInfo[] | AuthorInfo | string[] | string ${t2 ? "" : "| false"} | undefined\`, but got`, e2), []) : [], g$5 = (e2, t2) => {
  if (e2) {
    if (p(e2) && e2.every(a$6))
      return e2;
    if (a$6(e2))
      return [e2];
    console.error(`Expect ${t2 || "value"} to be \`string[] | string | undefined\`, but got`, e2);
  }
  return [];
}, je = (e2) => g$5(e2, "category"), Be = (e2) => g$5(e2, "tag"), Oe = (e2) => z$3(e2, "/");
class De {
  constructor() {
    __publicField(this, "containerElement");
    __publicField(this, "messageElements", {});
    const t2 = "message-container", n2 = document.getElementById(t2);
    n2 ? this.containerElement = n2 : (this.containerElement = document.createElement("div"), this.containerElement.id = t2, document.body.appendChild(this.containerElement));
  }
  pop(t2, n2 = 2e3) {
    const o2 = document.createElement("div"), i2 = Date.now();
    return o2.className = "message move-in", o2.innerHTML = t2, this.containerElement.appendChild(o2), this.messageElements[i2] = o2, n2 > 0 && setTimeout(() => {
      this.close(i2);
    }, n2), i2;
  }
  close(t2) {
    if (t2) {
      const n2 = this.messageElements[t2];
      n2.classList.remove("move-in"), n2.classList.add("move-out"), n2.addEventListener("animationend", () => {
        n2.remove(), delete this.messageElements[t2];
      });
    } else
      f$2(this.messageElements).forEach((n2) => this.close(Number(n2)));
  }
  destroy() {
    document.body.removeChild(this.containerElement);
  }
}
const P$3 = /#.*$/u, _$2 = (e2) => {
  const t2 = P$3.exec(e2);
  return t2 ? t2[0] : "";
}, b$1 = (e2) => decodeURI(e2).replace(P$3, "").replace(/(index)?\.(md|html)$/, ""), Ge = (e2, t2) => {
  if (t2 === void 0)
    return false;
  const n2 = b$1(e2.path), o2 = b$1(t2), i2 = _$2(t2);
  return i2 ? i2 === e2.hash && (!o2 || n2 === o2) : n2 === o2;
};
class Ve {
  constructor() {
    __publicField(this, "containerElement");
    __publicField(this, "popupElements", {});
    const t2 = "popup-container", n2 = document.getElementById(t2);
    n2 ? this.containerElement = n2 : (this.containerElement = document.createElement("div"), this.containerElement.id = t2, document.body.appendChild(this.containerElement));
  }
  emit(t2, n2) {
    const o2 = document.createElement("div"), i2 = document.createElement("div"), r2 = Date.now();
    return this.containerElement.appendChild(o2), this.popupElements[r2] = o2, o2.className = "popup-wrapper appear", o2.appendChild(i2), o2.addEventListener("click", () => this.close(r2)), i2.className = "popup-container", i2.innerHTML = t2, typeof n2 == "number" && setTimeout(() => {
      this.close(r2);
    }, n2), r2;
  }
  close(t2) {
    if (t2) {
      const n2 = this.popupElements[t2];
      n2.classList.replace("appear", "disappear"), n2.children[0].addEventListener("animationend", () => {
        n2.remove(), delete this.popupElements[t2];
      });
    } else
      f$2(this.popupElements).forEach((n2) => this.close(Number(n2)));
  }
  destroy() {
    document.body.removeChild(this.containerElement);
  }
}
const Fe = (e2) => {
  const t2 = Buffer.from(e2, "base64").toString("binary");
  return strFromU8(unzlibSync(strToU8(t2, true)));
}, Ke = (e2) => h$3(e2) ? e2 : `https://github.com/${e2}`, qe = (e2) => !h$3(e2) || /github\.com/.test(e2) ? "GitHub" : /bitbucket\.org/.test(e2) ? "Bitbucket" : /gitlab\.com/.test(e2) ? "GitLab" : /gitee\.com/.test(e2) ? "Gitee" : null, w = (e2, ...t2) => {
  const n2 = e2.resolve(...t2), o2 = n2.matched[n2.matched.length - 1];
  if (!(o2 != null && o2.redirect))
    return n2;
  const { redirect: i2 } = o2, r2 = fe(i2) ? i2(n2) : i2, c2 = ve(r2) ? { path: r2 } : r2;
  return w(e2, { hash: n2.hash, query: n2.query, params: n2.params, ...c2 });
}, y$3 = (e2) => {
  if (!(e2.metaKey || e2.altKey || e2.ctrlKey || e2.shiftKey) && !e2.defaultPrevented && !(e2.button !== void 0 && e2.button !== 0)) {
    if (e2.currentTarget) {
      const t2 = e2.currentTarget.getAttribute("target");
      if (t2 != null && t2.match(/\b_blank\b/i))
        return;
    }
    return e2.preventDefault(), true;
  }
}, W$2 = () => {
  const { availWidth: e2, availHeight: t2 } = screen, { screenLeft: n2, screenTop: o2, innerWidth: i2, innerHeight: r2 } = window, c2 = Math.max(e2 / 2, 600), d2 = Math.max(t2 / 2, 400);
  return { width: c2, height: d2, left: n2 + i2 / 2 - c2 / 2, top: o2 + r2 / 2 - d2 / 2 };
}, Ye = (e2, t2 = "_blank", n2 = ["resizable", "status"]) => {
  var o2, i2;
  const { width: r2, height: c2, left: d2, top: U2 } = W$2();
  (i2 = (o2 = window.open(e2, t2, `width=${r2},height=${c2},left=${d2},top=${U2},${n2.join(",")}`)) == null ? void 0 : o2.focus) == null || i2.call(o2);
}, T$1 = (e2) => {
  const t2 = useRouter(), n2 = useRoute(), o2 = computed(() => w(t2, unref(e2))), i2 = computed(() => o2.value.fullPath === n2.fullPath), r2 = (c2 = {}) => y$3(c2) ? t2.push(unref(e2)).catch() : Promise.resolve();
  return { route: o2, href: computed(() => o2.value.href), isActive: i2, navigate: r2 };
};
defineComponent({ name: "RouterLink", props: { to: { type: String, required: true } }, slots: Object, setup(e2, { slots: t2 }) {
  const n2 = toRef(e2, "to"), o2 = T$1(n2);
  return () => {
    var i2;
    return h$4("a", { class: ["vp-link", { "vp-active": o2.isActive.value }], href: o2.href.value, onClick: o2.navigate }, (i2 = t2.default) == null ? void 0 : i2.call(t2, o2));
  };
} });
const j$1 = ({ to: e2 = "" }, { slots: t2 }) => {
  var n2;
  const o2 = useRouter(), i2 = (r2 = {}) => y$3(r2) ? o2.push(e2).catch() : Promise.resolve();
  return h$4("a", { class: "vp-link", href: withBase(A$4(e2)), onClick: i2 }, (n2 = t2.default) == null ? void 0 : n2.call(t2));
};
j$1.displayName = "VPLink";
const B$1 = () => h$4(u$4, { name: "github" }, () => h$4("path", { d: "M511.957 21.333C241.024 21.333 21.333 240.981 21.333 512c0 216.832 140.544 400.725 335.574 465.664 24.49 4.395 32.256-10.07 32.256-23.083 0-11.69.256-44.245 0-85.205-136.448 29.61-164.736-64.64-164.736-64.64-22.315-56.704-54.4-71.765-54.4-71.765-44.587-30.464 3.285-29.824 3.285-29.824 49.195 3.413 75.179 50.517 75.179 50.517 43.776 75.008 114.816 53.333 142.762 40.79 4.523-31.66 17.152-53.377 31.19-65.537-108.971-12.458-223.488-54.485-223.488-242.602 0-53.547 19.114-97.323 50.517-131.67-5.035-12.33-21.93-62.293 4.779-129.834 0 0 41.258-13.184 134.912 50.346a469.803 469.803 0 0 1 122.88-16.554c41.642.213 83.626 5.632 122.88 16.554 93.653-63.488 134.784-50.346 134.784-50.346 26.752 67.541 9.898 117.504 4.864 129.834 31.402 34.347 50.474 78.123 50.474 131.67 0 188.586-114.73 230.016-224.042 242.09 17.578 15.232 33.578 44.672 33.578 90.454v135.85c0 13.142 7.936 27.606 32.854 22.87C862.25 912.597 1002.667 728.747 1002.667 512c0-271.019-219.648-490.667-490.71-490.667z" }));
B$1.displayName = "GitHubIcon";
const H$2 = () => h$4(u$4, { name: "gitlab" }, () => h$4("path", { d: "M229.333 78.688C223.52 62 199.895 62 193.895 78.688L87.958 406.438h247.5c-.188 0-106.125-327.75-106.125-327.75zM33.77 571.438c-4.875 15 .563 31.687 13.313 41.25l464.812 345L87.77 406.438zm301.5-165 176.813 551.25 176.812-551.25zm655.125 165-54-165-424.312 551.25 464.812-345c12.938-9.563 18.188-26.25 13.5-41.25zM830.27 78.688c-5.812-16.688-29.437-16.688-35.437 0l-106.125 327.75h247.5z" }));
H$2.displayName = "GitLabIcon";
const O$2 = () => h$4(u$4, { name: "gitee" }, () => h$4("path", { d: "M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm242.97-533.34H482.39a23.7 23.7 0 0 0-23.7 23.7l-.03 59.28c0 13.08 10.59 23.7 23.7 23.7h165.96a23.7 23.7 0 0 1 23.7 23.7v11.85a71.1 71.1 0 0 1-71.1 71.1H375.71a23.7 23.7 0 0 1-23.7-23.7V423.11a71.1 71.1 0 0 1 71.1-71.1h331.8a23.7 23.7 0 0 0 23.7-23.7l.06-59.25a23.73 23.73 0 0 0-23.7-23.73H423.11a177.78 177.78 0 0 0-177.78 177.75v331.83c0 13.08 10.62 23.7 23.7 23.7h349.62a159.99 159.99 0 0 0 159.99-159.99V482.33a23.7 23.7 0 0 0-23.7-23.7z" }));
O$2.displayName = "GiteeIcon";
const D$1 = () => h$4(u$4, { name: "bitbucket" }, () => h$4("path", { d: "M575.256 490.862c6.29 47.981-52.005 85.723-92.563 61.147-45.714-20.004-45.714-92.562-1.133-113.152 38.29-23.442 93.696 7.424 93.696 52.005zm63.451-11.996c-10.276-81.152-102.29-134.839-177.152-101.156-47.433 21.138-79.433 71.424-77.129 124.562 2.853 69.705 69.157 126.866 138.862 120.576S647.3 548.571 638.708 478.83zm136.558-309.723c-25.161-33.134-67.986-38.839-105.728-45.13-106.862-17.151-216.576-17.7-323.438 1.134-35.438 5.706-75.447 11.996-97.719 43.996 36.572 34.304 88.576 39.424 135.424 45.129 84.553 10.862 171.447 11.447 256 .585 47.433-5.705 99.987-10.276 135.424-45.714zm32.585 591.433c-16.018 55.99-6.839 131.438-66.304 163.986-102.29 56.576-226.304 62.867-338.87 42.862-59.43-10.862-129.135-29.696-161.72-85.723-14.3-54.858-23.442-110.848-32.585-166.84l3.438-9.142 10.276-5.157c170.277 112.567 408.576 112.567 579.438 0 26.844 8.01 6.84 40.558 6.29 60.014zm103.424-549.157c-19.42 125.148-41.728 249.71-63.415 374.272-6.29 36.572-41.728 57.162-71.424 72.558-106.862 53.724-231.424 62.866-348.562 50.286-79.433-8.558-160.585-29.696-225.134-79.433-30.28-23.443-30.28-63.415-35.986-97.134-20.005-117.138-42.862-234.277-57.161-352.585 6.839-51.42 64.585-73.728 107.447-89.71 57.16-21.138 118.272-30.866 178.87-36.571 129.134-12.58 261.157-8.01 386.304 28.562 44.581 13.13 92.563 31.415 122.844 69.705 13.714 17.7 9.143 40.01 6.29 60.014z" }));
D$1.displayName = "BitbucketIcon";
const G$2 = () => h$4(u$4, { name: "source" }, () => h$4("path", { d: "M601.92 475.2c0 76.428-8.91 83.754-28.512 99.594-14.652 11.88-43.956 14.058-78.012 16.434-18.81 1.386-40.392 2.97-62.172 6.534-18.612 2.97-36.432 9.306-53.064 17.424V299.772c37.818-21.978 63.36-62.766 63.36-109.692 0-69.894-56.826-126.72-126.72-126.72S190.08 120.186 190.08 190.08c0 46.926 25.542 87.714 63.36 109.692v414.216c-37.818 21.978-63.36 62.766-63.36 109.692 0 69.894 56.826 126.72 126.72 126.72s126.72-56.826 126.72-126.72c0-31.086-11.286-59.598-29.7-81.576 13.266-9.504 27.522-17.226 39.996-19.206 16.038-2.574 32.868-3.762 50.688-5.148 48.312-3.366 103.158-7.326 148.896-44.55 61.182-49.698 74.25-103.158 75.24-187.902V475.2h-126.72zM316.8 126.72c34.848 0 63.36 28.512 63.36 63.36s-28.512 63.36-63.36 63.36-63.36-28.512-63.36-63.36 28.512-63.36 63.36-63.36zm0 760.32c-34.848 0-63.36-28.512-63.36-63.36s28.512-63.36 63.36-63.36 63.36 28.512 63.36 63.36-28.512 63.36-63.36 63.36zM823.68 158.4h-95.04V63.36h-126.72v95.04h-95.04v126.72h95.04v95.04h126.72v-95.04h95.04z" }));
G$2.displayName = "SourceIcon";
const Qe = (e2, t2) => {
  const n2 = t2 ? t2._instance : getCurrentInstance();
  return m$5(n2 == null ? void 0 : n2.appContext.components) && (e2 in n2.appContext.components || camelize(e2) in n2.appContext.components || capitalize(camelize(e2)) in n2.appContext.components);
}, V$1 = () => ze(() => typeof window < "u" && window.navigator && "userAgent" in window.navigator), Xe = () => {
  const e2 = V$1();
  return computed(() => e2.value && /\b(?:Android|iPhone)/i.test(navigator.userAgent));
}, Ze = (e2) => {
  const t2 = useRouteLocale();
  return computed(() => e2[t2.value]);
};
const defaultDocument = isClient ? window.document : void 0;
let _id = 0;
function useStyleTag(css2, options = {}) {
  const isLoaded = ref(false);
  const {
    document: document2 = defaultDocument,
    immediate = true,
    manual = false,
    id = `vueuse_styletag_${++_id}`
  } = options;
  const cssRef = ref(css2);
  let stop = () => {
  };
  const load = () => {
    if (!document2)
      return;
    const el = document2.getElementById(id) || document2.createElement("style");
    if (!el.isConnected) {
      el.id = id;
      if (options.media)
        el.media = options.media;
      document2.head.appendChild(el);
    }
    if (isLoaded.value)
      return;
    stop = watch(
      cssRef,
      (value) => {
        el.textContent = value;
      },
      { immediate: true }
    );
    isLoaded.value = true;
  };
  const unload = () => {
    if (!document2 || !isLoaded.value)
      return;
    stop();
    document2.head.removeChild(document2.getElementById(id));
    isLoaded.value = false;
  };
  if (immediate && !manual)
    tryOnMounted(load);
  if (!manual)
    tryOnScopeDispose(unload);
  return {
    id,
    css: cssRef,
    unload,
    load,
    isLoaded: readonly(isLoaded)
  };
}
const fontIcon = "";
var m$4 = defineComponent({ name: "FontIcon", props: { icon: { type: String, default: "" }, color: { type: String, default: "" }, size: { type: [String, Number], default: "" } }, setup(o2) {
  const c2 = computed(() => {
    const n2 = ["font-icon icon"], t2 = `${"iconfont icon-"}${o2.icon}`;
    return n2.push(t2), n2;
  }), r2 = computed(() => {
    const n2 = {};
    return o2.color && (n2.color = o2.color), o2.size && (n2["font-size"] = Number.isNaN(Number(o2.size)) ? o2.size : `${o2.size}px`), f$2(n2).length ? n2 : null;
  });
  return () => o2.icon ? h$4("span", { key: o2.icon, class: c2.value, style: r2.value, ...{} }) : null;
} });
const artPlayer = "";
const h$2 = (e2) => isString(e2) ? e2 : `${e2}px`, z$2 = (e2, u2 = 0) => {
  const o2 = shallowRef(), p2 = computed(() => h$2(unref(e2.width) || "100%")), m2 = ref("auto"), l2 = (t2) => {
    if (isString(t2)) {
      const [i2, s2] = t2.split(":"), a2 = Number(i2) / Number(s2);
      if (!Number.isNaN(a2))
        return a2;
    }
    return typeof t2 == "number" ? t2 : 16 / 9;
  }, N2 = (t2) => {
    const i2 = unref(e2.height), s2 = l2(unref(e2.ratio));
    return i2 ? h$2(i2) : `${Number(t2) / s2 + unref(u2)}px`;
  }, r2 = () => {
    o2.value && (m2.value = N2(o2.value.clientWidth));
  };
  return onMounted(() => {
    r2(), isRef(u2) && watch(u2, () => r2()), useEventListener("orientationchange", () => r2()), useEventListener("resize", () => r2());
  }), { el: o2, width: p2, height: m2 };
};
const M$3 = ["mp4", "mp3", "webm", "ogg", "m3u8", "hls", "ts", "flv", "mpd", "dash"], z$1 = (e2) => (e2 == null ? void 0 : e2.split(".").pop()) || "", k$3 = async (e2, a2, r2, s2 = false, o2 = 0) => {
  const d2 = (await import("dashjs/dist/dash.all.min.js")).default;
  if (d2.supportsMediaSource()) {
    const i2 = d2.MediaPlayer().create();
    i2.initialize(e2, a2, s2, o2), r2(() => i2.destroy());
  }
}, L$3 = async (e2, a2, r2) => {
  const s2 = (await import("mpegts.js/dist/mpegts.js")).default;
  if (s2.isSupported()) {
    const o2 = s2.createPlayer({ type: "flv", url: a2 });
    o2.attachMediaElement(e2), o2.load(), r2(() => o2.destroy());
  }
}, R$2 = async (e2, a2, r2) => {
  const s2 = (await import("hls.js/dist/hls.min.js")).default;
  if (e2.canPlayType("application/x-mpegURL") || e2.canPlayType("application/vnd.apple.mpegURL"))
    e2.src = a2;
  else if (s2.isSupported()) {
    const o2 = new s2();
    o2.attachMedia(e2), o2.on(s2.Events.MEDIA_ATTACHED, function() {
      o2.loadSource(a2);
    }), r2(() => o2.destroy());
  }
}, D = ["no-fullscreen", "no-hotkey", "no-playback-rate", "no-setting", "no-mutex", "no-plays-inline"], O$1 = ["airplay", "autoplay", "aspect-ratio", "auto-mini", "auto-size", "auto-orientation", "auto-playback", "fast-forward", "flip", "fullscreen-web", "lock", "loop", "is-live", "muted", "mini-progress-bar", "pip", "screenshot", "subtitle-offset"], U$3 = ["en", "pl", "cs", "es", "fa", "fr", "id", "ru"], _$1 = ["zh-cn", "zh-tw"], x$2 = (e2) => {
  const a2 = e2.toLowerCase(), r2 = a2.split("-")[0];
  return _$1.includes(a2) ? a2 : U$3.includes(r2) ? r2 : r2 === "zh" ? "zh-cn" : "en";
};
var C$3 = defineComponent({ name: "ArtPlayer", inheritAttrs: false, props: { src: { type: String, required: true }, type: { type: String, default: "" }, poster: { type: String, default: "" }, title: { type: String, default: "" }, width: { type: [String, Number], default: "100%" }, height: { type: [String, Number], default: void 0 }, ratio: { type: [String, Number], default: 16 / 9 }, config: { type: Object, default: null }, customPlayer: { type: Function, default: (e2) => e2 } }, setup(e2, { attrs: a2 }) {
  const r2 = usePageLang(), { el: s2, width: o2, height: d2 } = z$2(e2, 0), i2 = ref(false);
  let f2;
  const g2 = () => {
    var _a2, _b2, _c;
    const t2 = { theme: "#3eaf7c", ...{ "fullscreen": true, "playbackRate": true, "setting": true }, container: s2.value, poster: e2.poster, url: e2.src, type: e2.type || z$1(e2.src), lang: x$2(r2.value), ...e2.config, useSSR: false }, l2 = f$2(a2);
    if (D.forEach((n2) => {
      l2.includes(n2) && (t2[camelize(n2.replace(/^no-/, ""))] = false);
    }), O$1.forEach((n2) => {
      l2.includes(n2) && (t2[camelize(n2)] = true);
    }), t2.type) {
      const n2 = t2.customType ?? (t2.customType = {});
      if (M$3.includes(t2.type.toLowerCase()))
        switch (t2.type) {
          case "m3u8":
          case "hls":
            n2[_a2 = t2.type] ?? (n2[_a2] = (p2, c2, u2) => R$2(p2, c2, (y2) => {
              u2.on("destroy", y2);
            }));
            break;
          case "flv":
            n2[_b2 = t2.type] ?? (n2[_b2] = (p2, c2, u2) => L$3(p2, c2, (y2) => {
              u2.on("destroy", y2);
            }));
            break;
          case "mpd":
          case "dash":
            n2[_c = t2.type] ?? (n2[_c] = (p2, c2, u2) => k$3(p2, c2, (y2) => {
              u2.on("destroy", y2);
            }));
            break;
        }
      else
        console.warn(`[components]: ArtPlayer does not support current file type ${t2.type}!`);
    }
    return t2;
  };
  return onMounted(async () => {
    const { default: t2 } = await import("artplayer"), l2 = new t2(g2());
    f2 = await e2.customPlayer(l2) || l2, i2.value = true;
  }), onUnmounted(() => {
    f2 == null || f2.destroy();
  }), () => [h$4("div", { ref: s2, class: "vp-artplayer", style: { width: o2.value, height: d2.value } }), i2.value ? null : h$4(C$4)];
} });
const badge = "";
const o$6 = ({ type: r2 = "info", text: e2 = "", vertical: i2, color: l2 }, { slots: t2 }) => {
  var a2;
  return h$4("span", { class: ["vp-badge", r2, { diy: l2 }], style: { verticalAlign: i2 ?? false, backgroundColor: l2 ?? false } }, ((a2 = t2.default) == null ? void 0 : a2.call(t2)) || e2);
};
o$6.displayName = "Badge";
const biliBili = "";
const e$5 = "accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture";
const d$3 = "https://player.bilibili.com/player.html";
var S$3 = defineComponent({ name: "BiliBili", props: { bvid: { type: String, default: "" }, aid: { type: String, default: "" }, cid: { type: String, default: "" }, title: { type: String, default: "A BiliBili video" }, page: { type: [String, Number], default: 1 }, width: { type: [String, Number], default: "100%" }, height: { type: [String, Number], default: void 0 }, ratio: { type: [String, Number], default: 16 / 9 }, time: { type: [String, Number], default: 0 }, autoplay: Boolean }, setup(i2) {
  const { el: m2, width: n2, height: f2 } = z$2(i2), e2 = ref(false), l2 = computed(() => {
    const { aid: a2, bvid: r2, cid: o2, autoplay: u2, time: p2, page: s2 } = i2;
    return a2 && o2 ? `${d$3}?aid=${a2}&cid=${o2}&t=${p2}&autoplay=${u2 ? 1 : 0}&page=${s2}` : r2 ? `${d$3}?bvid=${r2}&t=${p2}&autoplay=${u2 ? 1 : 0}` : null;
  });
  return () => l2.value ? [h$4("div", { class: "bilibili-desc" }, h$4("a", { class: "sr-only", href: l2.value }, i2.title)), h$4("iframe", { ref: m2, src: l2.value, title: i2.title, class: "bilibili-iframe", allow: e$5, style: { width: n2.value, height: e2.value ? f2.value : 0 }, onLoad: () => {
    e2.value = true;
  } }), e2.value ? null : h$4(C$4)] : [];
} });
const codePen = "";
var d$2 = defineComponent({ name: "CodePen", props: { link: { type: String, default: "" }, user: { type: String, default: "" }, slugHash: { type: String, default: "" }, title: { type: String, default: "" }, height: { type: [String, Number], default: 380 }, theme: { type: String, default: "default" }, defaultTab: { type: Array, default: () => ["result"] }, status: { type: String, default: "preview" } }, setup(e2) {
  const r2 = () => {
    const n2 = /(?:^(?:https?:)?\/\/codepen.io\/|^\/|^)(.*?)\/(?:pen|embed)\/(.*?)\/?$/.exec(e2.link);
    return { user: n2 == null ? void 0 : n2[1], slugHash: n2 == null ? void 0 : n2[2] };
  }, l2 = computed(() => r2().user || e2.user), u2 = computed(() => r2().slugHash || e2.slugHash), o2 = computed(() => ({ user: l2.value, "slug-hash": u2.value, "theme-id": e2.theme, "default-tab": e2.defaultTab.join(","), "pen-title": e2.title, height: e2.height, preview: e2.status === "preview" ? "true" : "" }));
  return onMounted(() => {
    e2.status !== "clicktorun" && renderCodePen(o2.value, `.codepen-${u2.value}`);
  }), () => h$4("div", { class: ["codepen-wrapper", `codepen-${u2.value}`] }, [e2.status === "clicktorun" ? h$4("button", { type: "button", class: "codepen-button", onClick: () => {
    renderCodePen(o2.value, `.codepen-${u2.value}`);
  } }, "Run Code") : null, h$4("span", ["See the Pen ", h$4("a", { href: e2.link }, [e2.title]), " by ", h$4("a", { href: `https://codepen.io/${l2.value}` }, [l2.value]), " on ", h$4("a", { href: "https://codepen.io" }, ["CodePen"]), "."])]);
} });
const pdf = "";
const r$4 = (i2) => isLinkHttp(i2) ? i2 : withBase(i2);
const u$3 = (e2) => {
  console.error("[PDF]: " + e2);
}, R$1 = (e2) => {
  for (; e2.firstChild; )
    e2.removeChild(e2.firstChild);
}, E$1 = (e2) => e2 === "string" ? document.querySelector(e2) : e2 instanceof HTMLElement ? e2 : document.body, M$2 = (e2) => {
  let t2 = "";
  return e2 && (t2 += M$4(e2).map(([o2, i2]) => o2 === "noToolbar" ? `toolbar=${i2 ? 0 : 1}` : `${encodeURIComponent(o2)}=${encodeURIComponent(i2)}`).join("&"), t2 && (t2 = `#${t2.slice(0, t2.length - 1)}`)), t2;
}, f$1 = (e2, t2, o2, i2, n2) => {
  R$1(t2);
  let a2 = o2;
  e2 === "pdfjs" && (a2 = `${`${ensureEndingSlash(withBase(null))}web/viewer.html`}?file=${encodeURIComponent(o2)}${M$2(i2)}`);
  const d2 = e2 === "pdfjs" || e2 === "iframe" ? "iframe" : "embed", r2 = document.createElement(d2);
  return r2.className = "pdf-viewer", r2.type = "application/pdf", r2.title = n2, r2.src = a2, r2 instanceof HTMLIFrameElement && (r2.allow = "fullscreen"), t2.classList.add("pdf-viewer-container"), t2.appendChild(r2), t2.getElementsByTagName(d2)[0];
}, U$2 = (e2, t2 = null, { title: o2, hint: i2, options: n2 = {} }) => {
  var a2, d2;
  if (typeof window > "u" || !((a2 = window == null ? void 0 : window.navigator) != null && a2.userAgent))
    return null;
  const { navigator: r2 } = window, { userAgent: l2 } = r2, c2 = window.Promise !== void 0, s2 = le(l2) || ie(l2), g2 = !s2 && ae(l2), h2 = !s2 && /firefox/i.test(l2) && l2.split("rv:").length > 1 ? parseInt(l2.split("rv:")[1].split(".")[0], 10) > 18 : false, w2 = !s2 && (c2 || h2);
  if (!isString(e2))
    return u$3("URL is not valid"), null;
  const p2 = E$1(t2);
  if (!p2)
    return u$3("Target element cannot be determined"), null;
  const m2 = o2 || ((d2 = /\/([^/]+).pdf/.exec(e2)) == null ? void 0 : d2[1]) || "PDF Viewer";
  return w2 || !s2 ? f$1(g2 ? "iframe" : "embed", p2, e2, n2, m2) : (p2.innerHTML = i2.replace(/\[url\]/g, e2), u$3("This browser does not support embedded PDFs"), null);
};
var j = defineComponent({ name: "PDF", props: { url: { type: String, required: true }, title: { type: String, default: "" }, width: { type: [String, Number], default: "100%" }, height: { type: [String, Number], default: void 0 }, ratio: { type: [String, Number], default: 16 / 9 }, page: { type: [String, Number], default: 1 }, noToolbar: Boolean, zoom: { type: [String, Number], default: 100 } }, setup(e2) {
  const { el: t2, width: o2, height: i2 } = z$2(e2), n2 = Ze({ "/": { "hint": "<p>此浏览器不支持嵌入式 PDF。请下载 PDF 查看：<a href='[url]' target='_blank'>下载 PDF</a></p>" } });
  return onMounted(() => {
    U$2(r$4(e2.url), t2.value, { title: e2.title, hint: n2.value.hint, options: { page: e2.page, noToolbar: e2.noToolbar, zoom: e2.zoom } });
  }), () => h$4("div", { class: "pdf-viewer-wrapper", ref: t2, style: { width: o2.value, height: i2.value } });
} });
const replIt = "";
var g$4 = defineComponent({ name: "Replit", props: { link: { type: String, default: "" }, user: { type: String, default: "" }, repl: { type: String, default: "" }, width: { type: [String, Number], default: "100%" }, height: { type: [String, Number], default: void 0 }, ratio: { type: [String, Number], default: 16 / 9 }, theme: { type: String, default: "light" }, file: { type: String, default: () => null }, plain: Boolean, text: { type: String, default: "Open on Replit" } }, setup(e2) {
  const { el: a2, width: u2, height: p2 } = z$2(e2), l2 = ref(false), r2 = computed(() => {
    var n2;
    if (e2.link) {
      const i2 = new URL(e2.link);
      return e2.plain ? i2.searchParams.delete("embed") : i2.searchParams.set("embed", "true"), i2.toString();
    }
    return e2.user && e2.repl ? `https://replit.com/@${e2.user}/${e2.repl}${e2.plain ? "" : "?embed=true"}${(n2 = e2.file) != null && n2.length ? `#${e2.file}` : ""}` : null;
  });
  return () => r2.value ? h$4("div", { class: "replit-wrapper" }, e2.plain ? h$4("button", { type: "button", class: "replit-button", onClick: () => {
    window.open(r2.value, "_blank");
  } }, e2.text) : [h$4("iframe", { ref: a2, class: "replit-iframe", src: r2.value, style: { width: u2.value, height: l2.value ? p2.value : 0 }, onLoad: () => {
    l2.value = true;
  } }), l2.value ? null : h$4(C$4)]) : null;
} });
const balloon = "";
const popup$1 = "";
const shareService = "";
const g$3 = (t2) => {
  var r2;
  return ((r2 = document.querySelector(`meta[name="${t2}"]`)) == null ? void 0 : r2.getAttribute("content")) ?? null;
}, q$2 = (t2, r2 = "") => {
  const a2 = ["vp-share-icon", r2];
  return isLinkHttp(t2) || Oe(t2) ? h$4("img", { class: a2, src: t2, "no-view": "" }) : z$3(t2, "<") && Pe(t2, ">") ? h$4("div", { class: a2, innerHTML: t2 }) : h$4("div", { class: [...a2, t2] });
};
var B = defineComponent({ name: "ShareService", props: { config: { type: Object, default: () => ({}) }, plain: Boolean, title: { type: String, required: false }, description: { type: String, required: false }, url: { type: String, required: false }, summary: { type: String, required: false }, cover: { type: String, required: false }, tag: { type: [Array, String], required: false } }, setup(t2) {
  let r2;
  const a2 = usePageData(), c2 = usePageFrontmatter(), e2 = ref(false), s2 = () => {
    var n2;
    const i2 = t2.title ?? a2.value.title, u2 = t2.description ?? c2.value.description ?? g$3("description") ?? g$3("og:description") ?? g$3("twitter:description"), m2 = t2.url ?? typeof window > "u" ? null : window.location.href, p2 = t2.cover ?? g$3("og:image"), v2 = (n2 = document.querySelector(`${".theme-default-content"} :not(a) > img`)) == null ? void 0 : n2.getAttribute("src"), f2 = t2.tag ?? c2.value.tag ?? c2.value.tags, y2 = isArray(f2) ? f2.filter(isString).join(",") : isString(f2) ? f2 : null;
    return t2.config.link.replace(/\[([^\]]+)\]/g, (D2, k2) => {
      const A2 = k2.split("|");
      for (const l2 of A2) {
        if (l2 === "url" && m2)
          return m2;
        if (l2 === "title" && i2)
          return i2;
        if (l2 === "description" && u2)
          return u2;
        if (l2 === "summary" && t2.summary)
          return t2.summary;
        if (l2 === "cover" && p2)
          return p2;
        if (l2 === "image" && v2)
          return v2;
        if (l2 === "tags" && y2)
          return y2;
      }
      return "";
    });
  }, d2 = () => {
    const n2 = s2();
    switch (t2.config.action) {
      case "navigate":
        window.open(n2);
        break;
      case "open":
        window.open(n2, "_blank");
        break;
      case "qrcode":
        import("qrcode").then(({ toDataURL: i2 }) => i2(n2, { errorCorrectionLevel: "H", width: 250, scale: 1, margin: 1.5 })).then((i2) => {
          r2.emit(`<img src="${i2}" alt="qrcode" class="share-qrcode" />`);
        });
        break;
      default:
        Ye(n2, "share");
    }
  };
  return onMounted(() => {
    r2 = new Ve();
  }), () => {
    const { config: { name: n2, icon: i2, shape: u2, color: m2 }, plain: p2 } = t2;
    return [h$4("button", { type: "button", class: ["vp-share-button", { plain: p2 }], "aria-label": n2, "data-balloon-pos": "up", onClick: () => d2() }, p2 ? q$2(u2, "plain") : i2 ? q$2(i2) : h$4("div", { class: "vp-share-icon colorful", style: { background: m2 }, innerHTML: u2 })), e2.value ? h$4("div", { class: "share-popup" }) : null];
  };
} });
const G$1 = [{ "name": "buffer", "link": "https://bufferapp.com/add?text=[title]&url=[url]", "color": "#333", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="m942.837 500.76-84.36-41.48a43.84 43.84 0 0 0-38.6-.12L531.2 598.919a43.8 43.8 0 0 1-38.4 0l-288.638-139.76a43.84 43.84 0 0 0-38.6.12l-84.399 41.48c-12.24 6-12.2 24.4.08 30.32L492.84 730.318c12.16 5.92 26.2 5.92 38.36 0l411.557-199.239c12.28-5.96 12.32-24.32.08-30.32zm0 239.998-84.36-41.48a43.84 43.84 0 0 0-38.6-.12L531.2 838.917a43.8 43.8 0 0 1-38.4 0l-288.638-139.76a43.84 43.84 0 0 0-38.6.12l-84.399 41.48c-12.24 6-12.2 24.4.08 30.32L492.84 970.316c12.16 5.92 26.2 5.92 38.36 0l411.557-199.239c12.28-5.96 12.32-24.32.08-30.32zM489.6 59.963 81.163 260.76c-12.24 6-12.2 24.4.08 30.32L492.84 490.319c12.16 5.92 26.16 5.92 38.32 0l411.597-199.238c12.28-5.96 12.32-24.32.08-30.32L534.44 59.963a50.68 50.68 0 0 0-44.84 0z"/></svg>' }, { "name": "douban", "link": "https://shuo.douban.com/!service/share?href=[url]&name=[title]&text=[description|summary]&image=[cover|image]&starid=0&aid=0&style=11", "color": "#00b51d", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M943.4 65.7H81.6c-8.8 0-16 7.1-16 16v63.8c0 8.8 7.1 16 16 16h861.7c8.8 0 16-7.1 16-16V81.6c0-8.8-7.1-15.9-15.9-15.9zm0 797.9h-233l83-207.5h70.2c8.8 0 16-7.1 16-16v-367c0-8.8-7.1-16-16-16H161.4c-8.8 0-16 7.1-16 16v367c0 8.8 7.1 16 16 16h504.3l-83 207.5H426.3L368.9 720c0-8.8-7.1-16-16-16h-95.7c-8.8 0-16 7.1-16 16l57.4 143.6h-217c-8.8 0-16 7.1-16 16v63.8c0 8.8 7.1 16 16 16h861.7c8.8 0 16-7.1 16-16v-63.8c0-8.9-7.1-16-15.9-16zM289.1 560.4V352.9h446.8v207.5H289.1z"/></svg>' }, { "name": "email", "link": "mailto:?subject=[title]&body=[url]%0D%0A%0D%0A[description|summary]", "color": "#1384FF", "action": "open", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M146.375 174.5C99.793 174.5 62 212.293 62 258.875c0 26.543 12.48 51.504 33.75 67.5l382.5 286.875c20.04 14.941 47.46 14.941 67.5 0l382.5-286.875c21.27-15.996 33.75-40.957 33.75-67.5 0-46.582-37.793-84.375-84.375-84.375h-731.25zM62 371.375V737c0 62.05 50.45 112.5 112.5 112.5h675c62.05 0 112.5-50.45 112.5-112.5V371.375L579.5 658.25a112.324 112.324 0 0 1-135 0L62 371.375z"/></svg>' }, { "name": "evernote", "link": "https://www.evernote.com/clip.action?url=[url]&title=[title]", "color": "#3c599b", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M369.64 264.42c3.2 44.62-35.1 43.18-43.22 43.18-137.86 0-147.28-2-167.16 6.68-1.12.44-1.48 0-.74-.74L375.58 92.9c.76-.74 1.2-.44.76.74-8.7 19.98-6.7 30.18-6.7 170.78zm158 616c-29.36-74.16 26-153.86 105.04-153.24 34.98 0 45.2 46.42 15.9 62.84-12.38 6.6-49.9 3.48-50.28 38.4-.1 34.18 39.34 50 62.4 49.78a91.28 91.28 0 0 0 91.3-91.3v-.16c0-23.26-15.58-94.44-95.08-110.68-15.44-3.08-130-12.7-136.7-101.04C512.74 608.88 485.42 702 434 713.2c-17.48 3.88-139.36 15.28-225.84-73.54 0 0-37.14-30.46-56.46-115.9-6.76-31.5-18.56-79.4-22.28-124 0-36 22.28-60.9 50.14-64.4 162 0 180 4.64 202-15.6 19.64-18.48 15.6-31 15.6-205.56 2-16.6 15.58-61.62 106.82-48.28 12 1.72 63.82 8.36 74.96 61.28l128.52 22.3c40.86 7.42 141.88 14 161.2 115.88 45.32 242.18 17.82 476.92 15.6 476.92C852.3 971.06 662.12 960 662.12 960c-37.9-.46-108.5-18.8-134.54-79.66zm161.88-409.68c-2 3.84-4.4 12 1.7 14 28.18 9.86 79.5 13.68 91.76 11.06 6.22-.5 6.1-8.86 4.96-13.3-7.06-43.7-81.66-53-98.48-11.84z"/></svg>', "icon": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#14cc45"/><path fill="#595757" d="M347.671 193.259v87.51h-87.51z"/><path fill="#595757" d="M788.047 323.645s3.65-77.491-73.84-103.02c0 0-89.479-12.867-151.41-11.91 0 0-8.595-53.23-103.33-53.23 0 0-89.556-1.244-89.892 70.526v61.671s2.848 14.991-27.833 14.991h-81.581s-34.28 5.282-34.28 72.934c0 0 3.133 120.082 41.322 200.24 0 0 9.398 34.667 58.228 46.577 0 0 95.822 25.477 123.991 21.722 0 0 58.228 22.137 62.008-111.874 0 0 3.755-19.935 6.266 11.392 0 0-1.89 68.948 57.607 72.702 0 0 45.723 12.557 73.892 10.045 0 0 37.568 2.15 37.568 64.158 0 0 13.152 71.665-34.435 71.665h-65.763s-18.149 4.428-18.149-21.877c0 0-4.997-21.878 26.305-21.878h15.534v-43.756h-43.082s-66.332-6.317-66.332 50.047v75.135s9.347 49.866 66.332 49.866h121.273s48.441.44 76.61-90.359c0-.078 48.52-182.323 22.991-435.767zM625.272 486.523c0-21.877 18.02-51.16 39.432-51.16s36.48 36.118 36.48 58.022c-28.79-7.897-45.827-9.606-75.912-6.862z"/></svg>' }, { "name": "facebook", "link": "https://www.facebook.com/sharer/sharer.php?u=[url]&title=[title]&description=[description]&quote=[summary]&hashtag=[tags]", "color": "#3c599b", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M960 113.4v797c0 27.4-22.2 49.4-49.4 49.4H682.2V613h116.4L816 477.8H682v-86.4c0-39.2 10.8-65.8 67-65.8h71.6v-121c-12.4-1.6-54.8-5.4-104.4-5.4-103.2 0-174 63-174 178.8v99.8H425.4V613h116.8v347H113.4C86.2 960 64 937.8 64 910.6V113.4C64 86.2 86.2 64 113.4 64h797c27.4 0 49.6 22.2 49.6 49.4z"/></svg>', "icon": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="#537bbc" d="M512.298 1021.22c281.23 0 509.235-227.973 509.235-509.22 0-281.218-228.005-509.22-509.235-509.22C231.066 2.78 3.078 230.782 3.078 512c0 281.247 227.986 509.22 509.22 509.22"/><path fill="#fff" d="M353.357 400.378h68.151v-66.235c0-29.206.737-74.247 21.952-102.142 22.348-29.542 53.026-49.622 105.794-49.622 85.976 0 122.18 12.263 122.18 12.263L654.4 295.61s-28.407-8.213-54.903-8.213c-26.512 0-50.243 9.5-50.243 35.995v76.988h108.687L650.352 499H549.254v342.602H421.508V499h-68.15v-98.622z"/></svg>' }, { "name": "flipboard", "link": "https://share.flipboard.com/bookmarklet/popout?v=2&url=[url]&title=[title]", "color": "#e12828", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M90.125 90.125h270.703v843.75H90.125V90.125zm298.828 298.828h274.219v274.219H388.953V388.953zm0-298.828h544.922v270.703H388.953V90.125z"/></svg>', "icon": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#e12828"/><path fill="#fff" d="M263.487 261.893H445.92V809.17H263.487V261.893z"/><path fill="#fce9e9" d="M445.92 261.893h364.842v182.435H445.92V261.893z"/><path fill="#f6bebe" d="M445.92 444.328h182.435v182.435H445.92V444.328z"/></svg>' }, { "name": "line", "link": "https://line.me/R/msg/text/?[title]%0D%0A[url]%0D%0A[description|summary]", "color": "#00b902", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M806.6 426.52a25.24 25.24 0 0 1 0 50.44h-70.2v45h70.2a25.2 25.2 0 1 1 0 50.36h-95.44a25.24 25.24 0 0 1-25.08-25.16V356.32c0-13.8 11.28-25.2 25.2-25.2h95.44a25.2 25.2 0 0 1-.12 50.4h-70.2v45h70.2zM652.4 547.16a25.2 25.2 0 0 1-25.24 25.08 24.72 24.72 0 0 1-20.4-10l-97.72-132.68v117.6a25.2 25.2 0 0 1-50.28 0V356.32a25.08 25.08 0 0 1 24.96-25.12c7.8 0 15 4.16 19.8 10.16L602 474.56V356.32c0-13.8 11.28-25.2 25.2-25.2 13.8 0 25.2 11.4 25.2 25.2v190.84zm-229.64 0a25.28 25.28 0 0 1-25.24 25.16 25.24 25.24 0 0 1-25.08-25.16V356.32c0-13.8 11.28-25.2 25.2-25.2 13.84 0 25.12 11.4 25.12 25.2v190.84zm-98.64 25.16h-95.44a25.36 25.36 0 0 1-25.2-25.16V356.32c0-13.8 11.4-25.2 25.2-25.2 13.92 0 25.2 11.4 25.2 25.2v165.64h70.24a25.2 25.2 0 0 1 0 50.36M992 444.56c0-214.84-215.4-389.68-480-389.68S32 229.72 32 444.56C32 637 202.8 798.24 433.4 828.88c15.64 3.28 36.92 10.32 42.32 23.6 4.8 12.04 3.16 30.64 1.52 43.2l-6.56 40.8c-1.8 12.04-9.6 47.44 41.96 25.8 51.64-21.56 276.64-163.12 377.44-279C959.04 607.72 992 530.32 992 444.56"/></svg>' }, { "name": "qq", "link": 'https://connect.qq.com/widget/shareqq/index.html?url=[url]&title=[title]&source=[title]&desc=[description]&pics=[cover]&summary="[summary]"', "color": "#5eaade", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M867.897 627.143c-18.205-58.482-39.14-107.634-71.339-188.075 5.006-211.285-82.83-382.18-285.127-382.18-204.572 0-290.475 174.308-285.013 382.18-32.313 80.555-53.134 129.366-71.339 188.075-38.684 124.587-26.169 176.128-16.611 177.266 20.48 2.503 79.758-93.753 79.758-93.753 0 55.751 28.672 128.455 90.794 180.907-30.037 9.216-97.507 34.02-81.464 61.212 12.97 21.96 223.232 13.995 283.875 7.168 60.644 6.827 270.905 14.791 283.876-7.168 16.042-27.079-51.542-51.996-81.465-61.212 62.122-52.566 90.794-125.27 90.794-180.907 0 0 59.279 96.256 79.759 93.753 9.67-1.252 22.186-52.793-16.498-177.266z"/></svg>' }, { "name": "qrcode", "action": "qrcode", "link": "[url]", "color": "#999", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M409.6 68H136.533c-37.5 0-68 31-68 68v273.6c0 37.547 31 68 68 68H409.6c37.547 0 68-31 68-68V136.533c0-37.5-31-68-68-68zm-68 256c0 9-8 17-17 17H222.2c-9 0-17-8-17-17V221.6c0-9 8-17 17-17h102.4c9 0 17 8 17 17V324zM887.734 68H614.4c-37.547 0-68 31-68 68v273.6c0 37.547 31 68 68 68h273c37.5 0 68-31 68-68V136.533c0-37.5-31-68-68-68zm-68 256c0 9-8 17-17 17h-102.4c-9 0-17-8-17-17V221.6c0-9 8-17 17-17h102.4c9 0 17 8 17 17V324zM409.6 546.133H136.533c-37.5 0-68 31-68 68v273c0 37.5 31 68 68 68H409.6c37.547 0 68-31 68-68V614.4c0-37.547-31-68-68-68zm-68 256c0 9-8 17-17 17H222.2c-9 0-17-8-17-17v-102.4c0-9 8-17 17-17h102.4c9 0 17 8 17 17v102.4zm580-86.4H785V768c0 9.5-8 17-17 17h-52v137.6c0 18.8 15 34 34.134 34.133H921.6c18.8 0 34.133-15 34.133-34.133V749.8c0-18.774-15-34.134-34.133-34.134zm-204.8-137.6c0-18.8-15-34.133-34.133-34.133H579.2c-18.8 0-34 15-34 34.133v104.534c0 18.8 15 34 34 34.133h103.467c18.8 0 34.133-15 34.133-34.133V578.133zm-85.333 275.2H563.2c-9.5 0-17 8-17 17v68c0 9.5 8 17 17 17h68c9.5 0 17-8 17-17V870.4c0-9.5-8-17-17-17zm307.2-307.2H870.4c-9.5 0-17 8-17 17v68c0 9.5 8 17 17 17h68c9.5 0 17-8 17-17V563.2c0-9.5-8-17-17-17z"/></svg>' }, { "name": "reddit", "link": "https://www.reddit.com/submit?title=[title]&url=[url]", "color": "#ff4501", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M967.111 531.911a114 114 0 0 0-114-114 111.957 111.957 0 0 0-68.266 24.121A518.827 518.827 0 0 0 554.103 372.4l28.217-161.564a10.923 10.923 0 0 1 10.923-9.558h3.186l142.905 43.691a91 91 0 1 0 19.114-65.536l-143.815-41.87a91 91 0 0 0-22.3-3.186 79.644 79.644 0 0 0-78.28 65.991L484.926 372.4a524.288 524.288 0 0 0-246.215 69.632 111.957 111.957 0 0 0-68.266-24.12 113.323 113.323 0 0 0-69 205.71 176.583 176.583 0 0 0 0 21.845c0 150.642 182.044 273.067 409.6 273.067S921.6 796.33 921.6 645.689a176.583 176.583 0 0 0 0-21.845 114 114 0 0 0 45.511-91.933zm-682.667 45.511a69 69 0 1 1 69 69 69 69 0 0 1-69-69zm373.647 202.07a23.21 23.21 0 0 1-11.378 14.563 286.265 286.265 0 0 1-269.426 0 23.21 23.21 0 0 1-11.378-14.563 23.666 23.666 0 0 1 3.641-18.205l13.198-18.66a22.3 22.3 0 0 1 29.128-5.916 230.741 230.741 0 0 0 200.248 0 22.3 22.3 0 0 1 29.128 7.282l13.198 18.66a23.666 23.666 0 0 1 3.64 16.839zm13.198-133.803a69 69 0 1 1 69-69 69 69 0 0 1-69 69z"/></svg>' }, { "name": "skype", "link": "https://web.skype.com/share?url=[title]%0D%0A[url]%0D%0A[description|summary]", "color": "#00aff0", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M743.429 607.429q0-28.572-11.143-52.286T704.57 516t-41.714-28-47.143-19.429-50-13.142l-59.428-13.715q-17.143-4-25.143-6t-20-6.571T444 420t-9.429-12-4.285-17.143q0-44 82.285-44 24.572 0 44 6.857T587.43 370t21.714 19.143T632 405.714t27.429 6.857q26.857 0 43.142-18.285t16.286-44q0-31.429-32-56.857t-81.143-38.572-104-13.143q-38.857 0-75.428 8.857T358 277.43t-50.857 49.714T288 400.57q0 34.858 10.857 60.858t32 43.142 45.714 27.715 58.858 18.571l83.428 20.572q51.429 12.571 64 20.571 18.286 11.429 18.286 34.286 0 22.285-22.857 36.857t-60 14.571q-29.143 0-52.286-9.143t-37.143-22-26-25.714-26.286-22-30.857-9.143q-28.571 0-43.143 17.143T288 649.714q0 52.572 69.714 90T524 777.143q41.714 0 80-10.572T674 736t50.571-53.429 18.858-75.142zm207.428 124q0 90.857-64.286 155.142T731.43 950.857q-74.286 0-133.715-45.714-44 9.143-85.714 9.143-81.714 0-156.286-31.715t-128.571-85.714-85.714-128.571T109.714 512q0-41.714 9.143-85.714-45.714-59.429-45.714-133.715 0-90.857 64.286-155.142T292.57 73.143q74.286 0 133.715 45.714 44-9.143 85.714-9.143 81.714 0 156.286 31.715t128.571 85.714 85.714 128.571T914.286 512q0 41.714-9.143 85.714 45.714 59.429 45.714 133.715z"/></svg>' }, { "name": "telegram", "link": "https://t.me/share/url?url=[url]&text=[title]%0D%0A[description|summary]", "color": "#158cc7", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="m410.965 814.649 12.743-192.512L773.234 307.2c15.474-14.108-3.186-20.935-23.666-8.647L318.123 571.164 131.527 512c-40.05-11.378-40.505-39.14 9.102-59.164l726.813-280.349c33.223-15.019 65.08 8.192 52.338 59.165L795.99 814.649c-8.648 41.415-33.679 51.427-68.267 32.313L539.307 707.698l-90.567 87.836c-10.468 10.468-19.115 19.115-37.775 19.115z"/></svg>' }, { "name": "twitter", "link": "https://twitter.com/intent/tweet?text=[title]&url=[url]&hashtags=[tags][title]", "color": "#3397db", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M921.177 283.063c-25.031 23.062-35.437 34.875-35.437 34.875s9 179.718-85.22 318.093-216 221.344-392.905 239.063c-176.907 17.718-292.22-54.282-292.22-54.282s77.345-4.5 126.845-23.343c49.218-19.125 120.093-68.906 120.093-68.906s-100.687-31.22-136.968-66.094c-36.282-35.157-45.282-55.969-45.282-55.969l99.563-1.406S175.02 549.125 145.208 505.25s-33.75-87.187-33.75-87.187l76.5 30.937s-63.562-86.906-72.562-154.406 11.531-103.782 11.531-103.782 32.344 61.032 165.656 128.532 245.813 63.562 245.813 63.562-43.031-149.344 88.875-215.437S849.74 213.03 849.74 213.03s23.062-6.187 40.218-12.656c17.157-6.187 41.907-17.719 41.907-17.719l-40.5 72.844 62.718-6.75s-7.875 11.25-32.906 34.313z"/></svg>' }, { "name": "weibo", "link": "http://service.weibo.com/share/share.php?url=[url]&title=[title]&pic=[cover|image]", "color": "#e6162d", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M457.3 543c-68.1-17.7-145 16.2-174.6 76.2-30.1 61.2-1 129.1 67.8 151.3 71.2 23 155.2-12.2 184.4-78.3 28.7-64.6-7.2-131-77.6-149.2zm-52 156.2c-13.8 22.1-43.5 31.7-65.8 21.6-22-10-28.5-35.7-14.6-57.2 13.7-21.4 42.3-31 64.4-21.7 22.4 9.5 29.6 35 16 57.3zm45.5-58.5c-5 8.6-16.1 12.7-24.7 9.1-8.5-3.5-11.2-13.1-6.4-21.5 5-8.4 15.6-12.4 24.1-9.1 8.7 3.2 11.8 12.9 7 21.5zm334.5-197.2c15 4.8 31-3.4 35.9-18.3 11.8-36.6 4.4-78.4-23.2-109-27.6-30.6-68.4-42.3-106-34.3-15.4 3.3-25.2 18.4-21.9 33.8 3.3 15.3 18.4 25.2 33.8 21.8 18.4-3.9 38.3 1.8 51.9 16.7 13.5 15 17.2 35.4 11.3 53.3-4.9 15.1 3.2 31.1 18.2 36z"/><path d="M885.1 237.5c-56.7-62.9-140.4-86.9-217.7-70.5-17.9 3.8-29.3 21.4-25.4 39.3 3.8 17.9 21.4 29.3 39.3 25.5 55-11.7 114.4 5.4 154.8 50.1 40.3 44.7 51.2 105.7 34 159.1-5.6 17.4 3.9 36 21.3 41.7 17.4 5.6 36-3.9 41.6-21.2v-.1c24.1-75.4 8.9-161.1-47.9-223.9zM729 499c-12.2-3.6-20.5-6.1-14.1-22.1 13.8-34.7 15.2-64.7.3-86-28-40.1-104.8-37.9-192.8-1.1 0 0-27.6 12.1-20.6-9.8 13.5-43.5 11.5-79.9-9.6-101-47.7-47.8-174.6 1.8-283.5 110.6C127.3 471.1 80 557.5 80 632.2 80 775.1 263.2 862 442.5 862c235 0 391.3-136.5 391.3-245 0-65.5-55.2-102.6-104.8-118zM443 810.8c-143 14.1-266.5-50.5-275.8-144.5-9.3-93.9 99.2-181.5 242.2-195.6 143-14.2 266.5 50.5 275.8 144.4C694.4 709 586 796.6 443 810.8z"/></svg>' }, { "name": "whatsapp", "link": "https://api.whatsapp.com/send?text=[title]%0D%0A[url]%0D%0A[description|summary]", "color": "#25d366", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M511.895 90.125h.21c232.63 0 421.77 189.246 421.77 421.875S744.7 933.875 512.105 933.875c-85.78 0-165.374-25.559-232.03-69.68l-162.176 51.82 52.558-156.761A418.781 418.781 0 0 1 90.125 512c0-232.629 189.176-421.875 421.77-421.875zm-120.692 231.89c-8.05-19.23-14.167-19.968-26.367-20.46a235.266 235.266 0 0 0-13.922-.493c-15.89 0-32.484 4.641-42.539 14.872-12.129 12.41-42.468 41.379-42.468 100.898 0 59.45 43.488 116.965 49.324 125.016 6.117 8.015 84.797 131.836 206.894 182.285 95.52 39.48 123.856 35.824 145.618 31.183 31.746-6.82 71.543-30.234 81.562-58.464 10.02-28.301 10.02-52.418 7.102-57.551-2.954-5.098-11.004-8.016-23.204-14.133-12.234-6.082-71.578-35.332-82.828-39.234-11.004-4.114-21.48-2.672-29.777 9.035-11.742 16.312-23.203 32.906-32.52 42.89-7.312 7.805-19.3 8.79-29.285 4.641-13.43-5.625-51.047-18.773-97.488-59.977-35.894-31.921-60.328-71.648-67.394-83.566-7.102-12.2-.739-19.266 4.886-25.84 6.082-7.558 11.953-12.902 18.07-19.969 6.118-7.066 9.493-10.722 13.43-19.02 4.149-8.05 1.23-16.347-1.722-22.429-2.918-6.082-27.352-65.566-37.372-89.648z"/></svg>' }];
var W$1 = defineComponent({ name: "Share", props: { services: { type: [String, Array], default: () => G$1.map(({ name: t2 }) => t2) }, titleGetter: { type: Function, default: (t2) => t2.title }, descriptionGetter: { type: Function, default: (t2) => t2.frontmatter.description }, summaryGetter: { type: Function, default: (t2) => t2.summary }, coverGetter: { type: Function, default: (t2) => t2.cover }, tagGetter: { type: Function, default: ({ frontmatter: t2 }) => t2.tag || t2.tags }, inline: Boolean, colorful: Boolean }, setup(t2) {
  const r2 = usePageData(), a2 = computed(() => (a$6(t2.services) ? t2.services.split(",") : t2.services).map((e2) => m$5(e2) ? e2.name && e2.link ? e2 : null : G$1.find(({ name: s2 }) => s2 === e2)).filter((e2) => e2 != null)), c2 = computed(() => {
    const e2 = {};
    return ["titleGetter", "descriptionGetter", "summaryGetter", "coverGetter", "tagGetter"].forEach((s2) => {
      if (Re(t2[s2])) {
        const d2 = t2[s2](r2.value);
        d2 && (e2[s2.replace("Getter", "")] = d2);
      }
    }), e2;
  });
  return () => h$4("div", { class: "vp-share-buttons", style: t2.inline ? { display: "inline-block" } : {} }, a2.value.map((e2) => h$4(B, { config: e2, ...c2.value, plain: !t2.colorful })));
} });
const siteInfo = "";
var m$3 = defineComponent({ name: "SiteInfo", components: { BitbucketIcon: D$1, GiteeIcon: O$2, GitHubIcon: B$1, GitLabIcon: H$2, SourceIcon: G$2 }, props: { name: { type: String, required: true }, desc: { type: String, default: "" }, logo: { type: String, default: "" }, url: { type: String, required: true }, preview: { type: String, required: true }, repo: { type: String, default: "" } }, setup(e2) {
  const t2 = Ze({ "/": { "source": "源代码" } }), i2 = computed(() => e2.repo ? qe(e2.repo) : null);
  return () => h$4("div", { class: "vp-site-info" }, [h$4("a", { class: "vp-site-info-navigator", title: e2.name, href: e2.url, target: "_blank" }), h$4("div", { class: "vp-site-info-preview", style: { background: `url(${withBase(e2.preview)}) center/cover no-repeat` } }), h$4("div", { class: "vp-site-info-detail" }, [e2.logo ? h$4("img", { class: "vp-site-info-logo", src: e2.logo, alt: e2.name, loading: "lazy", "no-view": "" }) : null, h$4("div", { class: "vp-site-info-name" }, e2.name), h$4("div", { class: "vp-site-info-desc" }, e2.desc)]), e2.repo ? h$4("div", { class: "vp-site-info-source-wrapper" }, h$4("a", { class: "vp-site-info-source", href: e2.repo, "aria-label": t2.value.source, "data-balloon-pos": "left", title: t2.value.source, target: "_blank" }, h$4(resolveComponent(`${i2.value}Icon`)))) : null]);
} });
const stackBlitz = "";
const a$5 = d$4;
var m$2 = defineComponent({ name: "StackBlitz", props: { id: { type: String, required: true }, type: { type: String, default: "project" }, width: { type: [String, Number], default: "100%" }, height: { type: [String, Number], default: void 0 }, ratio: { type: [String, Number], default: 16 / 9 }, file: { type: [String, Array], default: "" }, initialPath: { type: String, default: "" }, embed: Boolean, load: Boolean, view: { type: String, default: "preview" }, hideExplorer: Boolean, hideNavigation: Boolean, hideDevtools: Boolean, terminalHeight: { type: [String, Number], default: 30 }, devToolsHeight: { type: [String, Number], default: 30 }, text: { type: String, default: "Open in StackBlitz" }, theme: { type: String, default: "dark" } }, setup(t2) {
  const { el: i2, width: r2, height: l2 } = z$2(t2), o2 = computed(() => ({ openFile: t2.file, view: t2.view, theme: t2.theme, clickToLoad: t2.load, hideExplorer: t2.hideExplorer, hideNavigation: t2.hideNavigation, hideDevTools: t2.hideDevtools, initialPath: t2.initialPath }));
  return onMounted(() => {
    t2.embed && a$5[t2.type === "github" ? "embedGithubProject" : "embedProjectId"](i2.value, t2.id, o2.value);
  }), () => t2.embed ? h$4("div", { ref: i2, class: "stackblitz-container", style: { width: r2.value, height: l2.value } }) : h$4("div", { class: "stackblitz-container" }, h$4("button", { type: "button", class: "stackblitz-button", onClick: () => {
    a$5[t2.type === "github" ? "openGithubProject" : "openProjectId"](t2.id, o2.value);
  } }, t2.text));
} });
const vidstack = "";
var u$2 = defineComponent({ name: "VidStack", props: { sources: { type: Array, default: () => [] }, tracks: { type: Array, default: () => [] } }, setup(r2, { attrs: s2 }) {
  return useStyleTag$1(["https://cdn.jsdelivr.net/npm/vidstack@0.6/styles/defaults.css", "https://cdn.jsdelivr.net/npm/vidstack@0.6/styles/community-skin/audio.css", "https://cdn.jsdelivr.net/npm/vidstack@0.6/styles/community-skin/video.css"].map((t2) => `@import url("${t2}");`).join(`
`), { id: "vidstack-style" }), onMounted(() => defineCustomElements()), () => h$4("media-player", { crossorigin: "", ...s2 }, [h$4("media-outlet", [r2.sources.map((t2) => m$5(t2) ? h$4("source", { src: t2.src, type: t2.type }) : h$4("source", t2)), h$4("media-gesture", { event: "pointerup", action: "toggle:paused" }), h$4("media-gesture", { event: "dblclick", action: "toggle:fullscreen" }), s2.poster ? h$4("media-poster", { alt: s2.alt || s2.title }) : null, r2.tracks.map(({ src: t2, label: a2, srclang: i2, kind: n2, default: o2 }) => h$4("track", { src: t2, label: a2, srclang: i2, kind: n2, default: o2 }))]), h$4("media-community-skin")]);
} });
const xiGua = "";
var n$a = defineComponent({ name: "XiGua", props: { id: { type: String, required: true }, title: { type: String, default: "A XiGua video" }, width: { type: [String, Number], default: "100%" }, height: { type: [String, Number], default: void 0 }, ratio: { type: [String, Number], default: 16 / 9 }, time: { type: [String, Number], default: 0 }, autoplay: Boolean }, setup(t2) {
  const { el: r2, width: l2, height: o2 } = z$2(t2), i2 = ref(false), a2 = computed(() => `https://www.ixigua.com/iframe/${t2.id}?startTime=${t2.time}&autoplay=${t2.autoplay ? 1 : 0}`);
  return () => t2.id ? [h$4("div", { class: "xi-gua-desc" }, h$4("a", { class: "sr-only", href: a2.value }, t2.title)), h$4("iframe", { ref: r2, src: a2.value, title: t2.title, class: "xi-gua-iframe", allow: e$5, style: { width: l2.value, height: i2.value ? o2.value : 0 }, onLoad: () => {
    i2.value = true;
  } }), i2.value ? null : h$4(C$4)] : [];
} });
const l$5 = () => h$4(u$4, { name: "back-to-top" }, () => [h$4("path", { d: "M512 843.2c-36.2 0-66.4-13.6-85.8-21.8-10.8-4.6-22.6 3.6-21.8 15.2l7 102c.4 6.2 7.6 9.4 12.6 5.6l29-22c3.6-2.8 9-1.8 11.4 2l41 64.2c3 4.8 10.2 4.8 13.2 0l41-64.2c2.4-3.8 7.8-4.8 11.4-2l29 22c5 3.8 12.2.6 12.6-5.6l7-102c.8-11.6-11-20-21.8-15.2-19.6 8.2-49.6 21.8-85.8 21.8z" }), h$4("path", { d: "m795.4 586.2-96-98.2C699.4 172 513 32 513 32S324.8 172 324.8 488l-96 98.2c-3.6 3.6-5.2 9-4.4 14.2L261.2 824c1.8 11.4 14.2 17 23.6 10.8L419 744s41.4 40 94.2 40c52.8 0 92.2-40 92.2-40l134.2 90.8c9.2 6.2 21.6.6 23.6-10.8l37-223.8c.4-5.2-1.2-10.4-4.8-14zM513 384c-34 0-61.4-28.6-61.4-64s27.6-64 61.4-64c34 0 61.4 28.6 61.4 64S547 384 513 384z" })]);
l$5.displayName = "BackToTopIcon";
const backToTop = "";
var P$2 = defineComponent({ name: "BackToTop", props: { threshold: { type: Number, default: 100 }, noProgress: Boolean }, setup(e2) {
  const r2 = usePageFrontmatter(), s2 = Ze({ "/": { "backToTop": "返回顶部" } }), a2 = shallowRef(), { height: n2 } = useElementSize(a2), { height: p2 } = useWindowSize$1(), { y: t2 } = useWindowScroll(), u2 = computed(() => r2.value.backToTop !== false && t2.value > e2.threshold), c2 = computed(() => t2.value / (n2.value - p2.value));
  return onMounted(() => {
    a2.value = document.body;
  }), () => h$4(Transition, { name: "fade" }, () => u2.value ? h$4("button", { type: "button", class: "vp-back-to-top-button", "aria-label": s2.value.backToTop, "data-balloon-pos": "left", onClick: () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } }, [e2.noProgress ? null : h$4("svg", { class: "vp-scroll-progress" }, h$4("circle", { cx: "50%", cy: "50%", style: { "stroke-dasharray": `calc(${Math.PI * c2.value * 100}% - ${4 * Math.PI}px) calc(${Math.PI * 100}% - ${4 * Math.PI}px)` } })), h$4(l$5)]) : null);
} });
const srOnly = "";
const clientConfig1 = defineClientConfig({
  enhance: ({ app }) => {
    if (!Qe("FontIcon"))
      app.component("FontIcon", m$4);
    if (!Qe("ArtPlayer"))
      app.component("ArtPlayer", C$3);
    if (!Qe("Badge"))
      app.component("Badge", o$6);
    if (!Qe("BiliBili"))
      app.component("BiliBili", S$3);
    if (!Qe("CodePen"))
      app.component("CodePen", d$2);
    if (!Qe("PDF"))
      app.component("PDF", j);
    if (!Qe("Replit"))
      app.component("Replit", g$4);
    if (!Qe("Share"))
      app.component("Share", W$1);
    if (!Qe("SiteInfo"))
      app.component("SiteInfo", m$3);
    if (!Qe("StackBlitz"))
      app.component("StackBlitz", m$2);
    if (!Qe("VidStack"))
      app.component("VidStack", u$2);
    if (!Qe("XiGua"))
      app.component("XiGua", n$a);
  },
  setup: () => {
    useStyleTag(`  @import url("https://at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css");
  `);
  },
  rootComponents: [
    () => h$4(P$2, {})
  ]
});
const clientConfig2 = defineClientConfig({
  setup() {
    return;
  }
});
const autoCatalog = "";
let t$8 = () => null;
const n$9 = Symbol(""), a$4 = (o2) => {
  t$8 = o2;
}, c$3 = () => inject(n$9), l$4 = (o2) => {
  o2.provide(n$9, t$8);
};
var N$1 = defineComponent({ name: "AutoCatalog", props: { base: { type: String, default: "" }, level: { type: Number, default: 3 }, index: Boolean }, setup(r2) {
  const u2 = c$3(), f2 = Ze({ "/": { "title": "目录", "empty": "暂无目录" } }), _2 = usePageData(), T2 = useRouter(), E2 = useSiteData(), O2 = (s2) => {
    const p2 = s2["I"];
    return typeof p2 > "u" || p2;
  }, b2 = () => {
    const s2 = r2.base || _2.value.path.replace(/\/[^/]+$/, "/"), p2 = T2.getRoutes(), h2 = [];
    return p2.filter(({ meta: t2, path: l2 }) => {
      if (!z$3(l2, s2) || l2 === s2)
        return false;
      if (s2 === "/") {
        const a2 = f$2(E2.value.locales).filter((n2) => n2 !== "/");
        if (l2 === "/404.html" || a2.some((n2) => z$3(l2, n2)))
          return false;
      }
      return (Pe(l2, ".html") && !Pe(l2, "/index.html") || Pe(l2, "/")) && O2(t2);
    }).map(({ path: t2, meta: l2 }) => {
      const a2 = t2.substring(s2.length).split("/").length;
      return { title: l2["t"] || "", icon: l2["i"], base: t2.replace(/\/[^/]+\/?$/, "/"), order: l2["O"] || null, level: Pe(t2, "/") ? a2 - 1 : a2, path: t2 };
    }).filter(({ title: t2, level: l2 }) => t2 && l2 <= r2.level).sort(({ title: t2, level: l2, path: a2, order: n2 }, { title: c2, level: o2, path: d2, order: i2 }) => l2 - o2 || (Pe(a2, "/index.html") ? -1 : Pe(d2, "/index.html") ? 1 : n2 === null ? i2 === null ? t2.localeCompare(c2) : i2 : i2 === null ? n2 : n2 > 0 ? i2 > 0 ? n2 - i2 : -1 : i2 < 0 ? n2 - i2 : 1)).forEach((t2) => {
      var l2;
      const { base: a2, level: n2 } = t2;
      switch (n2) {
        case 1:
          h2.push(t2);
          break;
        case 2: {
          const c2 = h2.find((o2) => o2.path === a2);
          c2 && (c2.children ?? (c2.children = [])).push(t2);
          break;
        }
        default: {
          const c2 = h2.find((o2) => o2.path === a2.replace(/\/[^/]+\/$/, "/"));
          if (c2) {
            const o2 = (l2 = c2.children) == null ? void 0 : l2.find((d2) => d2.path === a2);
            o2 && (o2.children ?? (o2.children = [])).push(t2);
          }
        }
      }
    }), h2;
  }, A2 = computed(() => b2());
  return () => h$4("div", { class: "vp-catalog" }, [h$4("h2", { class: "vp-catalog-main-title" }, f2.value.title), A2.value.length ? A2.value.map(({ children: s2 = [], icon: p2, path: h2, title: t2 }, l2) => [h$4("h3", { id: t2, class: ["vp-catalog-child-title", { "has-children": s2.length }] }, [h$4("a", { href: `#${t2}`, class: "header-anchor", "aria-hidden": true }, "#"), h$4(j$1, { class: "vp-catalog-title", to: h2 }, () => [r2.index ? `${l2 + 1}.` : null, p2 && u2 ? h$4(u2, { icon: p2 }) : null, t2 || h2])]), s2.length ? h$4("ul", { class: "vp-catalog-child-catalogs" }, s2.map(({ children: a2 = [], icon: n2, path: c2, title: o2 }, d2) => h$4("li", { class: "vp-child-catalog" }, [h$4("div", { class: ["vp-catalog-sub-title", { "has-children": a2.length }] }, [h$4("a", { href: `#${o2}`, class: "header-anchor" }, "#"), h$4(j$1, { class: "vp-catalog-title", to: c2 }, () => [r2.index ? `${l2 + 1}.${d2 + 1}` : null, n2 && u2 ? h$4(u2, { icon: n2 }) : null, o2 || c2])]), a2.length ? h$4("div", { class: "v-sub-catalogs" }, a2.map(({ icon: i2, path: v2, title: $2 }, L2) => h$4(j$1, { class: "vp-sub-catalog", to: v2 }, () => [r2.index ? `${l2 + 1}.${d2 + 1}.${L2 + 1}` : null, i2 && u2 ? h$4(u2, { icon: i2 }) : null, $2 || v2]))) : null]))) : null]) : h$4("p", { class: "vp-empty-catalog" }, f2.value.empty)]);
} }), S$2 = defineClientConfig({ enhance: ({ app: r2 }) => {
  l$4(r2), Qe("AutoCatalog", r2) || r2.component("AutoCatalog", N$1);
} });
const vars$2 = "";
const externalLinkIcon = "";
const svg = h$4("svg", {
  "class": "external-link-icon",
  "xmlns": "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  "focusable": "false",
  "x": "0px",
  "y": "0px",
  "viewBox": "0 0 100 100",
  "width": "15",
  "height": "15"
}, [
  h$4("path", {
    fill: "currentColor",
    d: "M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
  }),
  h$4("polygon", {
    fill: "currentColor",
    points: "45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
  })
]);
const ExternalLinkIcon = defineComponent({
  name: "ExternalLinkIcon",
  props: {
    locales: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  setup(props) {
    const routeLocale = useRouteLocale();
    const locale = computed(() => props.locales[routeLocale.value] ?? {
      openInNewWindow: "open in new window"
    });
    return () => h$4("span", [
      svg,
      h$4("span", {
        class: "external-link-icon-sr-only"
      }, locale.value.openInNewWindow)
    ]);
  }
});
const locales = {};
const clientConfig4 = defineClientConfig({
  enhance({ app }) {
    app.component("ExternalLinkIcon", h$4(ExternalLinkIcon, { locales }));
  }
});
/**
 * NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT
 */
const nprogress$1 = {
  settings: {
    minimum: 0.08,
    easing: "ease",
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    barSelector: '[role="bar"]',
    parent: "body",
    template: '<div class="bar" role="bar"></div>'
  },
  status: null,
  set: (n2) => {
    const started = nprogress$1.isStarted();
    n2 = clamp(n2, nprogress$1.settings.minimum, 1);
    nprogress$1.status = n2 === 1 ? null : n2;
    const progress = nprogress$1.render(!started);
    const bar = progress.querySelector(nprogress$1.settings.barSelector);
    const speed = nprogress$1.settings.speed;
    const ease = nprogress$1.settings.easing;
    progress.offsetWidth;
    queue((next) => {
      css(bar, {
        transform: "translate3d(" + toBarPerc(n2) + "%,0,0)",
        transition: "all " + speed + "ms " + ease
      });
      if (n2 === 1) {
        css(progress, {
          transition: "none",
          opacity: "1"
        });
        progress.offsetWidth;
        setTimeout(function() {
          css(progress, {
            transition: "all " + speed + "ms linear",
            opacity: "0"
          });
          setTimeout(function() {
            nprogress$1.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(() => next(), speed);
      }
    });
    return nprogress$1;
  },
  isStarted: () => typeof nprogress$1.status === "number",
  start: () => {
    if (!nprogress$1.status)
      nprogress$1.set(0);
    const work = () => {
      setTimeout(() => {
        if (!nprogress$1.status)
          return;
        nprogress$1.trickle();
        work();
      }, nprogress$1.settings.trickleSpeed);
    };
    if (nprogress$1.settings.trickle)
      work();
    return nprogress$1;
  },
  done: (force) => {
    if (!force && !nprogress$1.status)
      return nprogress$1;
    return nprogress$1.inc(0.3 + 0.5 * Math.random()).set(1);
  },
  inc: (amount) => {
    let n2 = nprogress$1.status;
    if (!n2) {
      return nprogress$1.start();
    }
    if (typeof amount !== "number") {
      amount = (1 - n2) * clamp(Math.random() * n2, 0.1, 0.95);
    }
    n2 = clamp(n2 + amount, 0, 0.994);
    return nprogress$1.set(n2);
  },
  trickle: () => nprogress$1.inc(Math.random() * nprogress$1.settings.trickleRate),
  render: (fromStart) => {
    if (nprogress$1.isRendered()) {
      return document.getElementById("nprogress");
    }
    addClass(document.documentElement, "nprogress-busy");
    const progress = document.createElement("div");
    progress.id = "nprogress";
    progress.innerHTML = nprogress$1.settings.template;
    const bar = progress.querySelector(nprogress$1.settings.barSelector);
    const perc = fromStart ? "-100" : toBarPerc(nprogress$1.status || 0);
    const parent = document.querySelector(nprogress$1.settings.parent);
    css(bar, {
      transition: "all 0 linear",
      transform: "translate3d(" + perc + "%,0,0)"
    });
    if (parent !== document.body) {
      addClass(parent, "nprogress-custom-parent");
    }
    parent == null ? void 0 : parent.appendChild(progress);
    return progress;
  },
  remove: () => {
    removeClass(document.documentElement, "nprogress-busy");
    removeClass(document.querySelector(nprogress$1.settings.parent), "nprogress-custom-parent");
    const progress = document.getElementById("nprogress");
    progress && removeElement(progress);
  },
  isRendered: () => !!document.getElementById("nprogress")
};
const clamp = (n2, min, max2) => {
  if (n2 < min)
    return min;
  if (n2 > max2)
    return max2;
  return n2;
};
const toBarPerc = (n2) => (-1 + n2) * 100;
const queue = function() {
  const pending = [];
  function next() {
    const fn = pending.shift();
    if (fn) {
      fn(next);
    }
  }
  return function(fn) {
    pending.push(fn);
    if (pending.length === 1)
      next();
  };
}();
const css = function() {
  const cssPrefixes = ["Webkit", "O", "Moz", "ms"];
  const cssProps = {};
  function camelCase(string) {
    return string.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(match, letter) {
      return letter.toUpperCase();
    });
  }
  function getVendorProp(name) {
    const style = document.body.style;
    if (name in style)
      return name;
    let i2 = cssPrefixes.length;
    const capName = name.charAt(0).toUpperCase() + name.slice(1);
    let vendorName;
    while (i2--) {
      vendorName = cssPrefixes[i2] + capName;
      if (vendorName in style)
        return vendorName;
    }
    return name;
  }
  function getStyleProp(name) {
    name = camelCase(name);
    return cssProps[name] ?? (cssProps[name] = getVendorProp(name));
  }
  function applyCss(element, prop, value) {
    prop = getStyleProp(prop);
    element.style[prop] = value;
  }
  return function(element, properties) {
    for (const prop in properties) {
      const value = properties[prop];
      if (value !== void 0 && Object.prototype.hasOwnProperty.call(properties, prop))
        applyCss(element, prop, value);
    }
  };
}();
const hasClass = (element, name) => {
  const list = typeof element === "string" ? element : classList(element);
  return list.indexOf(" " + name + " ") >= 0;
};
const addClass = (element, name) => {
  const oldList = classList(element);
  const newList = oldList + name;
  if (hasClass(oldList, name))
    return;
  element.className = newList.substring(1);
};
const removeClass = (element, name) => {
  const oldList = classList(element);
  if (!hasClass(element, name))
    return;
  const newList = oldList.replace(" " + name + " ", " ");
  element.className = newList.substring(1, newList.length - 1);
};
const classList = (element) => {
  return (" " + (element.className || "") + " ").replace(/\s+/gi, " ");
};
const removeElement = (element) => {
  element && element.parentNode && element.parentNode.removeChild(element);
};
const vars$1 = "";
const nprogress = "";
const useNprogress = () => {
  onMounted(() => {
    const router = useRouter();
    const loadedPages = /* @__PURE__ */ new Set();
    loadedPages.add(router.currentRoute.value.path);
    router.beforeEach((to) => {
      if (!loadedPages.has(to.path)) {
        nprogress$1.start();
      }
    });
    router.afterEach((to) => {
      loadedPages.add(to.path);
      nprogress$1.done();
    });
  });
};
const clientConfig5 = defineClientConfig({
  setup() {
    useNprogress();
  }
});
const themeData$1 = JSON.parse('{"encrypt":{},"author":{"name":"L.H.X","url":"/intro.html"},"logo":"/images/坏笑.svg","repo":"lianghexiang/space","docsDir":"src","footer":"{{setupRunningTimeFooter}}","displayFooter":true,"locales":{"/":{"lang":"zh-CN","navbarLocales":{"langName":"简体中文","selectLangAriaLabel":"选择语言"},"metaLocales":{"author":"作者","date":"写作日期","origin":"原创","views":"访问量","category":"分类","tag":"标签","readingTime":"阅读时间","words":"字数","toc":"此页内容","prev":"上一页","next":"下一页","lastUpdated":"上次编辑于","contributors":"贡献者","editLink":"在GitHub上编辑此文章","print":"打印"},"blogLocales":{"article":"文章","articleList":"文章列表","category":"分类","tag":"标签","timeline":"时间轴","timelineTitle":"昨日不在","all":"全部","intro":"个人介绍","star":"收藏"},"paginationLocales":{"prev":"上一页","next":"下一页","navigate":"跳转到","action":"前往","errorText":"请输入 1 到 $page 之前的页码！"},"outlookLocales":{"themeColor":"主题色","darkmode":"外观","fullscreen":"全屏"},"routeLocales":{"skipToContent":"跳至主要內容","notFoundTitle":"页面不存在","notFoundMsg":["这里什么也没有","我们是怎么来到这儿的？","这 是 四 零 四 !","看起来你访问了一个失效的链接"],"back":"返回上一页","home":"带我回家","openInNewWindow":"Open in new window"},"navbar":["/",{"text":"博客","icon":"repo","prefix":"/posts/","children":[{"text":"Python","icon":"code","prefix":"python/","children":[{"text":"Polygon面积计算","icon":"code","link":"Polygon面积计算"},{"text":"Python2转Python3","icon":"code","link":"Python2转Python3"},{"text":"Python添加环境变量","icon":"code","link":"Python添加环境变量"},{"text":"DBUtils小问题","icon":"code","link":"Linux环境下DBUtils导入的问题"}]},{"text":"Mysql","icon":"mysql","prefix":"mysql/","children":[{"text":"Mysql备忘录","icon":"book","link":"mysql备忘录"}]},{"text":"工具说明书","icon":"note","prefix":"tools/","children":[{"text":"SublimeText说明书","icon":"blog","link":"sublime说明书"},{"text":"PicgoGitHub创建图床","icon":"github","link":"PicGoGitHub搭建图床"}]},{"text":"Linux","icon":"linux","prefix":"Linux/","children":[{"text":"Ubuntu配置环境变量","icon":"book","link":"Linux配置环境变量"}]},{"text":"Vue","icon":"vue","prefix":"Vue/","children":[{"text":"Vue基础知识","icon":"vue","link":"Vue基础"},{"text":"Vue客户端","icon":"vue","link":"Vue客户端"}]}]},{"text":"随笔","icon":"note","prefix":"/anything/","children":[{"text":"日记","icon":"book","prefix":"小记/","children":[{"text":"下雪啦","icon":"snow","link":"下雪啦"},{"text":"网站收藏","icon":"link","link":"好用网站收藏"}]},{"text":"读书笔记","icon":"note","prefix":"book_notes/","children":[{"text":"人之觉醒","icon":"note","link":"人之觉醒/"}]}]},{"text":"设计模式","icon":"code","prefix":"/design_pattern/","children":[{"text":"设计模式","icon":"code","prefix":"设计模式/","children":[{"text":"单例模式(Python实现)","icon":"code","link":"单例模式"},{"text":"工厂模式(Python实现)","icon":"code","link":"工厂模式"}]}]},{"text":"时光轴","icon":"time","link":"/timeline/"}],"sidebar":{"/":["",{"text":"博客","icon":"blog","prefix":"posts/","children":"structure"},{"text":"随笔","icon":"write","prefix":"anything/","children":"structure"},{"text":"设计模式","icon":"python","prefix":"design_pattern/","children":"structure"},"intro"]},"rtl":false}},"blog":{"timeline":"忽如白驹过隙","description":"不积小流无以成江海，不积跬步无以至千里；","intro":"/intro.html","medias":{"Baidu":"https://baidu.com","BiliBili":"https://bilibili.com","Email":"lhx110396@163.com","GitHub":"https://github.com/lianghexiang","QQ":"https://example.com","Qzone":"https://example.com","Wechat":"https://example.com"}},"print":false,"fullscreen":true}');
const themeData = ref(themeData$1);
const useThemeData$1 = () => themeData;
const themeLocaleDataSymbol = Symbol("");
const useThemeLocaleData$1 = () => {
  const themeLocaleData = inject(themeLocaleDataSymbol);
  if (!themeLocaleData) {
    throw new Error("useThemeLocaleData() is called without provider.");
  }
  return themeLocaleData;
};
const resolveThemeLocaleData = (theme, routeLocale) => {
  const { locales: locales2, ...baseOptions } = theme;
  return {
    ...baseOptions,
    ...locales2 == null ? void 0 : locales2[routeLocale]
  };
};
const clientConfig6 = defineClientConfig({
  enhance({ app }) {
    const themeData2 = useThemeData$1();
    const routeLocale = app._context.provides[routeLocaleSymbol];
    const themeLocaleData = computed(() => resolveThemeLocaleData(themeData2.value, routeLocale.value));
    app.provide(themeLocaleDataSymbol, themeLocaleData);
    Object.defineProperties(app.config.globalProperties, {
      $theme: {
        get() {
          return themeData2.value;
        }
      },
      $themeLocale: {
        get() {
          return themeLocaleData.value;
        }
      }
    });
    {
      setupDevtoolsPlugin({
        // fix recursive reference
        app,
        id: "org.vuejs.vuepress.plugin-theme-data",
        label: "VuePress Theme Data Plugin",
        packageName: "@vuepress/plugin-theme-data",
        homepage: "https://v2.vuepress.vuejs.org",
        logo: "https://v2.vuepress.vuejs.org/images/hero.png",
        componentStateTypes: ["VuePress"]
      }, (api) => {
        api.on.inspectComponent((payload) => {
          payload.instanceData.state.push({
            type: "VuePress",
            key: "themeData",
            editable: false,
            value: themeData2.value
          }, {
            type: "VuePress",
            key: "themeLocaleData",
            editable: false,
            value: themeLocaleData.value
          });
        });
      });
    }
  }
});
const waline$1 = "";
const waline = "";
const e$4 = { "provider": "Waline", "dark": 'html[data-theme="dark"]', "serverURL": "https://waline-comment.vuejs.press" };
let n$8 = e$4;
const t$7 = Symbol(""), s$3 = () => inject(t$7), d$1 = s$3, g$2 = (o2) => {
  o2.provide(t$7, n$8);
};
const y$2 = { "/": { "placeholder": "请留言。(填写邮箱可在被回复时收到邮件提醒)" } };
import("./assets/waline-meta-651f1b6d.js");
var E = defineComponent({ name: "WalineComment", props: { identifier: { type: String, required: true } }, setup(t2) {
  const e2 = d$1(), m2 = usePageFrontmatter(), p2 = usePageLang(), l2 = Ze(y$2);
  let n2;
  const i2 = !!e2.serverURL, s2 = computed(() => {
    if (!i2)
      return false;
    const d2 = e2.pageview !== false, r2 = m2.value.pageview;
    return !!r2 || d2 !== false && r2 !== false;
  }), u2 = computed(() => ({ lang: p2.value === "zh-CN" ? "zh-CN" : "en", locale: l2.value, dark: "html.dark", ...e2, path: t2.identifier }));
  return onMounted(() => {
    watch(() => t2.identifier, () => {
      n2 == null || n2(), s2.value && nextTick().then(() => {
        setTimeout(() => {
          n2 = pageviewCount({ serverURL: e2.serverURL, path: t2.identifier });
        }, e2.delay || 800);
      });
    }, { immediate: true });
  }), () => i2 ? h$4("div", { id: "comment", class: "waline-wrapper" }, h$4(defineAsyncComponent({ loader: async () => (await import("@waline/client/dist/component.mjs")).Waline, loadingComponent: C$4 }), u2.value)) : null;
} });
var v$4 = defineComponent({ name: "CommentService", props: { darkmode: Boolean }, setup(e2) {
  const m2 = s$3(), n2 = usePageData(), o2 = usePageFrontmatter(), t2 = m2.comment !== false, a2 = computed(() => o2.value.comment || t2 && o2.value.comment !== false);
  return () => h$4(E, { identifier: o2.value.commentID || n2.value.path, darkmode: e2.darkmode, style: { display: a2.value ? "block" : "none" } });
} }), C$2 = defineClientConfig({ enhance: ({ app: e2 }) => {
  g$2(e2), e2.component("CommentService", v$4);
} });
const button = "";
const S$1 = 800, u$1 = 2e3, M$1 = { "/": { "copy": "复制代码", "copied": "已复制", "hint": "复制成功" } }, n$7 = false, P$1 = ['.theme-hope-content div[class*="language-"] pre'], m$1 = false;
const l$3 = /* @__PURE__ */ new Map(), T = () => {
  const { copy: C2 } = useClipboard({ legacy: true }), a2 = Ze(M$1), g2 = usePageData(), i2 = Xe();
  const y2 = (o2) => {
    if (!o2.hasAttribute("copy-code-registered")) {
      const e2 = document.createElement("button");
      e2.type = "button", e2.classList.add("copy-code-button"), e2.innerHTML = '<div class="copy-icon" />', e2.setAttribute("aria-label", a2.value.copy), e2.setAttribute("data-copied", a2.value.copied), o2.parentElement && o2.parentElement.insertBefore(e2, o2), o2.setAttribute("copy-code-registered", "");
    }
  }, p2 = () => nextTick().then(() => new Promise((o2) => {
    setTimeout(() => {
      P$1.forEach((e2) => {
        document.querySelectorAll(e2).forEach(y2);
      }), o2();
    }, S$1);
  })), d2 = (o2, e2, t2) => {
    let { innerText: s2 = "" } = e2;
    /language-(shellscript|shell|bash|sh|zsh)/.test(o2.classList.toString()) && (s2 = s2.replace(/^ *(\$|>) /gm, "")), C2(s2).then(() => {
      t2.classList.add("copied"), clearTimeout(l$3.get(t2));
      const c2 = setTimeout(() => {
        t2.classList.remove("copied"), t2.blur(), l$3.delete(t2);
      }, u$1);
      if (l$3.set(t2, c2), n$7)
        ;
    });
  };
  onMounted(() => {
    (!i2.value || m$1) && p2(), useEventListener("click", (o2) => {
      const e2 = o2.target;
      if (e2.matches('div[class*="language-"] > button.copy')) {
        const t2 = e2.parentElement, s2 = e2.nextElementSibling;
        s2 && d2(t2, s2, e2);
      } else if (e2.matches('div[class*="language-"] div.copy-icon')) {
        const t2 = e2.parentElement, s2 = t2.parentElement, c2 = t2.nextElementSibling;
        c2 && d2(s2, c2, t2);
      }
    }), watch(() => g2.value.path, () => {
      (!i2.value || m$1) && p2();
    });
  });
};
var Y$1 = defineClientConfig({ setup: () => {
  T();
} });
const chart = "";
const g$1 = (e2, n2) => n2 === "json" ? JSON.parse(e2) : new Function(`let config,__chart_js_config__;
{
${e2}
__chart_js_config__=config;
}
return __chart_js_config__;`)();
var h$1 = defineComponent({ name: "ChartJS", props: { config: { type: String, required: true }, id: { type: String, required: true }, title: { type: String, default: "" }, type: { type: String, default: "json" } }, setup(e2) {
  const n2 = shallowRef(), a2 = shallowRef(), o2 = ref(true);
  return onMounted(async () => {
    const [{ default: i2 }] = await Promise.all([import("chart.js/auto"), new Promise((c2) => setTimeout(c2, 800))]);
    i2.defaults.maintainAspectRatio = false;
    const s2 = g$1(Fe(e2.config), e2.type), l2 = a2.value.getContext("2d");
    new i2(l2, s2), o2.value = false;
  }), () => [e2.title ? h$4("div", { class: "chartjs-title" }, decodeURIComponent(e2.title)) : null, o2.value ? h$4(C$4, { class: "chartjs-loading", height: 192 }) : null, h$4("div", { ref: n2, class: "chartjs-wrapper", id: e2.id, style: { display: o2.value ? "none" : "block" } }, h$4("canvas", { ref: a2, height: 400 }))];
} });
const codeTabs = "";
const v$3 = useStorage("VUEPRESS_CODE_TAB_STORE", {});
var A$3 = defineComponent({ name: "CodeTabs", props: { active: { type: Number, default: 0 }, data: { type: Array, required: true }, id: { type: String, required: true }, tabId: { type: String, default: "" } }, slots: Object, setup(a2, { slots: n2 }) {
  const d2 = ref(a2.active), o2 = shallowRef([]), i2 = () => {
    a2.tabId && (v$3.value[a2.tabId] = a2.data[d2.value].id);
  }, s2 = (e2 = d2.value) => {
    d2.value = e2 < o2.value.length - 1 ? e2 + 1 : 0, o2.value[d2.value].focus();
  }, c2 = (e2 = d2.value) => {
    d2.value = e2 > 0 ? e2 - 1 : o2.value.length - 1, o2.value[d2.value].focus();
  }, b2 = (e2, t2) => {
    e2.key === " " || e2.key === "Enter" ? (e2.preventDefault(), d2.value = t2) : e2.key === "ArrowRight" ? (e2.preventDefault(), s2()) : e2.key === "ArrowLeft" && (e2.preventDefault(), c2()), a2.tabId && (v$3.value[a2.tabId] = a2.data[d2.value].id);
  }, p2 = () => {
    if (a2.tabId) {
      const e2 = a2.data.findIndex(({ id: t2 }) => v$3.value[a2.tabId] === t2);
      if (e2 !== -1)
        return e2;
    }
    return a2.active;
  };
  return onMounted(() => {
    d2.value = p2(), watch(() => v$3.value[a2.tabId], (e2, t2) => {
      if (a2.tabId && e2 !== t2) {
        const l2 = a2.data.findIndex(({ id: u2 }) => u2 === e2);
        l2 !== -1 && (d2.value = l2);
      }
    });
  }), () => a2.data.length ? h$4("div", { class: "vp-code-tabs" }, [h$4("div", { class: "vp-code-tabs-nav", role: "tablist" }, a2.data.map(({ id: e2 }, t2) => {
    const l2 = t2 === d2.value;
    return h$4("button", { type: "button", ref: (u2) => {
      u2 && (o2.value[t2] = u2);
    }, class: ["vp-code-tab-nav", { active: l2 }], role: "tab", "aria-controls": `codetab-${a2.id}-${t2}`, "aria-selected": l2, onClick: () => {
      d2.value = t2, i2();
    }, onKeydown: (u2) => b2(u2, t2) }, n2[`title${t2}`]({ value: e2, isActive: l2 }));
  })), a2.data.map(({ id: e2 }, t2) => {
    const l2 = t2 === d2.value;
    return h$4("div", { class: ["vp-code-tab", { active: l2 }], id: `codetab-${a2.id}-${t2}`, role: "tabpanel", "aria-expanded": l2 }, n2[`tab${t2}`]({ value: e2, isActive: l2 }));
  })]) : null;
} });
const codeGroup = "";
const c$2 = ({ active: p2 = false }, { slots: r2 }) => {
  var e2;
  return h$4("div", { class: ["code-group-item", { active: p2 }], "aria-selected": p2 }, (e2 = r2.default) == null ? void 0 : e2.call(r2));
};
c$2.displayName = "CodeGroupItem";
const C$1 = defineComponent({ name: "CodeGroup", slots: Object, setup(p2, { slots: r2 }) {
  const e2 = ref(-1), t2 = shallowRef([]);
  const d2 = (a2 = e2.value) => {
    e2.value = a2 < t2.value.length - 1 ? a2 + 1 : 0, t2.value[e2.value].focus();
  }, i2 = (a2 = e2.value) => {
    e2.value = a2 > 0 ? a2 - 1 : t2.value.length - 1, t2.value[e2.value].focus();
  }, f2 = (a2, l2) => {
    a2.key === " " || a2.key === "Enter" ? (a2.preventDefault(), e2.value = l2) : a2.key === "ArrowRight" ? (a2.preventDefault(), d2(l2)) : a2.key === "ArrowLeft" && (a2.preventDefault(), i2(l2));
  };
  return () => {
    var a2;
    const l2 = (((a2 = r2.default) == null ? void 0 : a2.call(r2)) || []).filter((o2) => o2.type.name === "CodeGroupItem").map((o2) => (o2.props === null && (o2.props = {}), o2));
    return l2.length === 0 ? null : (e2.value < 0 || e2.value > l2.length - 1 ? (e2.value = l2.findIndex((o2) => "active" in o2.props), e2.value === -1 && (e2.value = 0)) : l2.forEach((o2, u2) => {
      o2.props.active = u2 === e2.value;
    }), h$4("div", { class: "code-group" }, [h$4("div", { class: "code-group-nav" }, l2.map((o2, u2) => {
      const s2 = u2 === e2.value;
      return h$4("button", { type: "button", ref: (v2) => {
        v2 && (t2.value[u2] = v2);
      }, class: ["code-group-nav-tab", { active: s2 }], "aria-pressed": s2, "aria-expanded": s2, onClick: () => {
        e2.value = u2;
      }, onKeydown: (v2) => f2(v2, u2) }, o2.props.title);
    })), l2]));
  };
} });
const index$2 = "";
const q$1 = () => h$4(u$4, { name: "back" }, () => h$4("path", { d: "M1014.749 449.156v125.688H260.626l345.64 345.64-89.239 89.237L19.307 512l497.72-497.721 89.238 89.238-345.64 345.64h754.124z" })), a$3 = () => h$4(u$4, { name: "home" }, () => h$4("path", { d: "M780.106 420.978L506.994 147.866 233.882 420.978h.045v455.11H780.06v-455.11h.046zm90.977 90.976V876.09a91.022 91.022 0 01-91.023 91.022H233.927a91.022 91.022 0 01-91.022-91.022V511.954l-67.22 67.175-64.307-64.307 431.309-431.31c35.498-35.498 93.115-35.498 128.614 0l431.309 431.31-64.307 64.307L871.083 512z" })), o$5 = '<svg class="codepen-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M123.429 668L468 897.714V692.571L277.143 565.143zM88 585.714L198.286 512 88 438.286v147.428zm468 312L900.571 668 746.857 565.143 556 692.57v205.143zM512 616l155.429-104L512 408 356.571 512zM277.143 458.857L468 331.43V126.286L123.429 356zM825.714 512L936 585.714V438.286zm-78.857-53.143L900.571 356 556 126.286v205.143zM1024 356v312q0 23.429-19.429 36.571l-468 312Q524.571 1024 512 1024t-24.571-7.429l-468-312Q0 691.43 0 668V356q0-23.429 19.429-36.571l468-312Q499.429 0 512 0t24.571 7.429l468 312Q1024 332.57 1024 356z"/></svg>', v$2 = '<svg class="jsfiddle-icon" viewBox="0 0 1170 1024" xmlns="http://www.w3.org/2000/svg"><path d="M1028.571 441.143q63.429 26.286 102.572 83.143t39.143 126.571q0 93.714-67.429 160.286T940 877.714q-2.286 0-6.571-.285t-6-.286H232q-97.143-5.714-164.571-71.714T0 645.143q0-62.857 31.429-116t84-84q-6.858-22.286-6.858-46.857 0-65.715 46.858-112T269.143 240q54.286 0 98.286 33.143 42.857-88 127.142-141.714t186.572-53.715q94.857 0 174.857 46t126.571 124.857 46.572 172q0 3.429-.286 10.286t-.286 10.286zm-761.142 152q0 69.714 48 110.286T434.286 744q78.285 0 137.143-56.571-9.143-11.429-27.143-32.286t-24.857-28.857q-38.286 37.143-82.286 37.143-31.429 0-53.429-19.143t-22-50q0-30.286 22-49.715T436 525.143q25.143 0 48.286 12T526 568.57t37.143 42.858 39.428 46.857 44 42.857T702 732.57t69.429 12q69.142 0 116.857-40.857T936 594.857q0-69.143-48-109.714T769.714 444.57Q688 444.571 632 500l53.143 61.714q37.714-36.571 81.143-36.571 29.714 0 52.571 18.857t22.857 48q0 32.571-21.143 52.286T766.857 664q-24.571 0-47.143-12t-41.143-31.429-37.428-42.857-39.714-46.857T557.143 488 502 456.571t-67.714-12q-69.715 0-118.286 40.286t-48.571 108.286z"/></svg>', l$2 = '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 74.667C270.933 74.667 74.667 270.933 74.667 512S270.933 949.333 512 949.333 949.333 753.067 949.333 512 753.067 74.667 512 74.667zm0 810.666C307.2 885.333 138.667 716.8 138.667 512S307.2 138.667 512 138.667 885.333 307.2 885.333 512 716.8 885.333 512 885.333z"/><path d="M708.267 465.067 473.6 330.667c-8.533-4.267-17.067-6.4-25.6-6.4-29.867 0-53.333 23.466-53.333 53.333v268.8c0 8.533 2.133 19.2 6.4 25.6 10.666 17.067 27.733 27.733 46.933 27.733 8.533 0 17.067-2.133 25.6-6.4l234.667-134.4c8.533-4.266 14.933-10.666 19.2-19.2 6.4-12.8 8.533-27.733 4.266-40.533-2.133-14.933-10.666-25.6-23.466-34.133zM458.667 627.2V396.8L661.333 512 458.667 627.2z"/></svg>';
const codeDemo = "";
const L$2 = { "useBabel": false, "jsLib": [], "cssLib": [], "codepenLayout": "left", "codepenEditors": "101", "babel": "https://unpkg.com/@babel/standalone/babel.min.js", "vue": "https://unpkg.com/vue/dist/vue.global.prod.js", "react": "https://unpkg.com/react/umd/react.production.min.js", "reactDOM": "https://unpkg.com/react-dom/umd/react-dom.production.min.js" }, $ = { html: { types: ["html", "slim", "haml", "md", "markdown", "vue"], map: { html: "none", vue: "none", md: "markdown" } }, js: { types: ["js", "javascript", "coffee", "coffeescript", "ts", "typescript", "ls", "livescript"], map: { js: "none", javascript: "none", coffee: "coffeescript", ls: "livescript", ts: "typescript" } }, css: { types: ["css", "less", "sass", "scss", "stylus", "styl"], map: { css: "none", styl: "stylus" } } }, k$2 = (e2, s2, t2) => {
  const o2 = document.createElement(e2);
  return isPlainObject(s2) && f$2(s2).forEach((l2) => {
    if (l2.indexOf("data"))
      o2[l2] = s2[l2];
    else {
      const n2 = l2.replace("data", "");
      o2.dataset[n2] = s2[l2];
    }
  }), t2 && t2.forEach((l2) => {
    o2.appendChild(l2);
  }), o2;
}, S = (e2) => ({ ...L$2, ...e2, jsLib: Array.from(/* @__PURE__ */ new Set([...L$2.jsLib || [], ...e2.jsLib || []])), cssLib: Array.from(/* @__PURE__ */ new Set([...L$2.cssLib || [], ...e2.cssLib || []])) }), m = (e2, s2) => {
  if (e2[s2] !== void 0)
    return e2[s2];
  const t2 = new Promise((o2) => {
    var l2;
    const n2 = document.createElement("script");
    n2.src = s2, (l2 = document.querySelector("body")) == null || l2.appendChild(n2), n2.onload = () => {
      o2();
    };
  });
  return e2[s2] = t2, t2;
}, V = (e2, s2) => {
  if (s2.css && Array.from(e2.childNodes).every((t2) => t2.nodeName !== "STYLE")) {
    const t2 = k$2("style", { innerHTML: s2.css });
    e2.appendChild(t2);
  }
}, H$1 = (e2, s2, t2) => {
  const o2 = t2.getScript();
  if (o2 && Array.from(s2.childNodes).every((l2) => l2.nodeName !== "SCRIPT")) {
    const l2 = document.createElement("script");
    l2.appendChild(document.createTextNode(`{const document=window.document.querySelector('#${e2} .vp-code-demo-display').shadowRoot;
${o2}}`)), s2.appendChild(l2);
  }
}, I = (e2) => {
  const s2 = f$2(e2), t2 = { html: [], js: [], css: [], isLegal: false };
  return ["html", "js", "css"].forEach((o2) => {
    const l2 = s2.filter((n2) => $[o2].types.includes(n2));
    if (l2.length) {
      const n2 = l2[0];
      t2[o2] = [e2[n2].replace(/^\n|\n$/g, ""), $[o2].map[n2] || n2];
    }
  }), t2.isLegal = (!t2.html.length || t2.html[1] === "none") && (!t2.js.length || t2.js[1] === "none") && (!t2.css.length || t2.css[1] === "none"), t2;
}, x$1 = (e2) => e2.replace(/<br \/>/g, "<br>").replace(/<((\S+)[^<]*?)\s+\/>/g, "<$1></$2>"), O = (e2) => `<div id="app">
${x$1(e2)}
</div>`, J = (e2) => `${e2.replace("export default ", "const $reactApp = ").replace(/App\.__style__(\s*)=(\s*)`([\s\S]*)?`/, "")};
ReactDOM.createRoot(document.getElementById("app")).render(React.createElement($reactApp))`, q = (e2) => e2.replace(/export\s+default\s*\{(\n*[\s\S]*)\n*\}\s*;?$/u, "Vue.createApp({$1}).mount('#app')").replace(/export\s+default\s*define(Async)?Component\s*\(\s*\{(\n*[\s\S]*)\n*\}\s*\)\s*;?$/u, "Vue.createApp({$1}).mount('#app')").trim(), A$2 = (e2) => `(function(exports){var module={};module.exports=exports;${e2};return module.exports.__esModule?module.exports.default:module.exports;})({})`, F = (e2, s2) => {
  const t2 = S(s2), o2 = e2.js[0] || "";
  return { ...t2, html: x$1(e2.html[0] || ""), js: o2, css: e2.css[0] || "", isLegal: e2.isLegal, getScript: () => {
    var l2;
    return t2.useBabel ? ((l2 = window.Babel.transform(o2, { presets: ["es2015"] })) == null ? void 0 : l2.code) || "" : o2;
  } };
}, G = /<template>([\s\S]+)<\/template>/u, Y = /<script(\s*lang=(['"])(.*?)\2)?>([\s\S]+)<\/script>/u, K = /<style(\s*lang=(['"])(.*?)\2)?\s*(?:scoped)?>([\s\S]+)<\/style>/u, U$1 = (e2, s2) => {
  const t2 = S(s2), o2 = e2.html[0] || "", l2 = G.exec(o2), n2 = Y.exec(o2), d2 = K.exec(o2), u2 = l2 ? l2[1].replace(/^\n|\n$/g, "") : "", [i2 = "", c2 = ""] = n2 ? [n2[4].replace(/^\n|\n$/g, ""), n2[3]] : [], [a2 = "", h2 = ""] = d2 ? [d2[4].replace(/^\n|\n$/g, ""), d2[3]] : [], f2 = c2 === "" && (h2 === "" || h2 === "css");
  return { ...t2, html: O(u2), js: q(i2), css: a2, isLegal: f2, jsLib: [t2.vue, ...t2.jsLib], getScript: () => {
    var y2, p2;
    const g2 = s2.useBabel ? ((p2 = (y2 = window.Babel) == null ? void 0 : y2.transform(i2, { presets: ["es2015"] })) == null ? void 0 : p2.code) || "" : i2.replace(/export\s+default/u, "return");
    return `const app=window.document.createElement('div');document.firstElementChild.appendChild(app);const appOptions=${A$2(g2)};appOptions.template=\`${u2.replace("`", '\\`"')}\`;window.Vue.createApp(appOptions).mount(app);`;
  } };
}, W = (e2, s2) => {
  const t2 = S(s2);
  return { ...t2, html: O(""), js: J(e2.js[0] || ""), css: e2.css[0] || (e2.js[0] ? e2.js[0].replace(/App\.__style__(?:\s*)=(?:\s*)`([\s\S]*)?`/, "$1").trim() : ""), isLegal: e2.isLegal, jsLib: [t2.react, t2.reactDOM, ...t2.jsLib], jsx: true, getScript: () => {
    var o2, l2;
    const n2 = ((l2 = (o2 = window.Babel) == null ? void 0 : o2.transform(e2.js[0] || "", { presets: ["es2015", "react"] })) == null ? void 0 : l2.code) || "";
    return `window.ReactDOM.createRoot(document.firstElementChild).render(window.React.createElement(${A$2(n2)}))`;
  } };
}, v$1 = {}, z = (e2) => Promise.all([m(v$1, e2.babel), m(v$1, e2.react), m(v$1, e2.reactDOM)]), Q = (e2) => {
  const s2 = [m(v$1, e2.vue)];
  return e2.useBabel && s2.push(m(v$1, e2.babel)), Promise.all(s2);
}, X = (e2) => e2.useBabel ? m(v$1, e2.babel) : Promise.resolve();
var Z = defineComponent({ name: "CodeDemo", props: { id: { type: String, required: true }, type: { type: String, default: "normal" }, title: { type: String, default: "" }, config: { type: String, default: "" }, code: { type: String, required: true } }, slots: Object, setup(e2, { slots: s2 }) {
  const [t2, o2] = useToggle(false), l2 = shallowRef(), n2 = shallowRef(), d2 = ref("0"), u2 = ref(false), i2 = computed(() => JSON.parse(e2.config ? Fe(e2.config) : "{}")), c2 = computed(() => {
    const p2 = JSON.parse(Fe(e2.code));
    return I(p2);
  }), a2 = computed(() => e2.type === "react" ? W(c2.value, i2.value) : e2.type === "vue" ? U$1(c2.value, i2.value) : F(c2.value, i2.value)), h2 = computed(() => a2.value.isLegal), f2 = (p2 = false) => {
    const g2 = l2.value.attachShadow({ mode: "open" }), j2 = document.createElement("div");
    j2.classList.add("code-demo-app"), g2.appendChild(j2), h2.value ? (p2 && (j2.innerHTML = a2.value.html), V(g2, a2.value), H$1(e2.id, g2, a2.value), d2.value = "0") : d2.value = "auto", u2.value = true;
  }, y2 = () => {
    switch (e2.type) {
      case "react":
        return z(a2.value).then(() => f2());
      case "vue":
        return Q(a2.value).then(() => f2());
      default:
        return X(a2.value).then(() => f2(true));
    }
  };
  return onMounted(() => {
    setTimeout(() => {
      y2();
    }, 800);
  }), () => {
    var p2;
    return h$4("div", { class: "vp-code-demo", id: e2.id }, [h$4("div", { class: "vp-code-demo-header" }, [a2.value.isLegal ? h$4("button", { type: "button", title: "toggle", "aria-hidden": true, class: ["vp-code-demo-toggle-button", t2.value ? "down" : "end"], onClick: () => {
      d2.value = t2.value ? "0" : `${n2.value.clientHeight + 13.8}px`, o2();
    } }) : null, e2.title ? h$4("span", { class: "vp-code-demo-title" }, decodeURIComponent(e2.title)) : null, a2.value.isLegal && a2.value.jsfiddle !== false ? h$4("form", { class: "code-demo-jsfiddle", target: "_blank", action: "https://jsfiddle.net/api/post/library/pure/", method: "post" }, [h$4("input", { type: "hidden", name: "html", value: a2.value.html }), h$4("input", { type: "hidden", name: "js", value: a2.value.js }), h$4("input", { type: "hidden", name: "css", value: a2.value.css }), h$4("input", { type: "hidden", name: "wrap", value: "1" }), h$4("input", { type: "hidden", name: "panel_js", value: "3" }), h$4("input", { type: "hidden", name: "resources", value: [...a2.value.cssLib, ...a2.value.jsLib].join(",") }), h$4("button", { type: "submit", class: "jsfiddle-button", innerHTML: v$2, "aria-label": "JSFiddle", "data-balloon-pos": "up" })]) : null, !a2.value.isLegal || a2.value.codepen !== false ? h$4("form", { class: "code-demo-codepen", target: "_blank", action: "https://codepen.io/pen/define", method: "post" }, [h$4("input", { type: "hidden", name: "data", value: JSON.stringify({ html: a2.value.html, js: a2.value.js, css: a2.value.css, js_external: a2.value.jsLib.join(";"), css_external: a2.value.cssLib.join(";"), layout: a2.value.codepenLayout, html_pre_processor: c2.value ? c2.value.html[1] : "none", js_pre_processor: c2.value ? c2.value.js[1] : a2.value.jsx ? "babel" : "none", css_pre_processor: c2.value ? c2.value.css[1] : "none", editors: a2.value.codepenEditors }) }), h$4("button", { type: "submit", innerHTML: o$5, class: "codepen-button", "aria-label": "Codepen", "data-balloon-pos": "up" })]) : null]), u2.value ? null : h$4(C$4, { class: "vp-code-demo-loading" }), h$4("div", { ref: l2, class: "vp-code-demo-display", style: { display: h2.value && u2.value ? "block" : "none" } }), h$4("div", { class: "vp-code-demo-code-wrapper", style: { height: d2.value } }, h$4("div", { ref: n2, class: "vp-code-demo-codes" }, (p2 = s2.default) == null ? void 0 : p2.call(s2)))]);
  };
} });
const echarts = "";
const g = (async () => {
}).constructor, v = (e2, i2, o2) => i2 === "js" ? g("myChart", `let width,height,option,__echarts_config__;
{
${e2}
__echarts_config__={width,height,option};
}
return __echarts_config__;
`)(o2) : Promise.resolve({ option: JSON.parse(e2) });
var y$1 = defineComponent({ name: "ECharts", props: { config: { type: String, required: true }, id: { type: String, required: true }, title: { type: String, default: "" }, type: { type: String, default: "json" } }, setup(e2) {
  const i2 = ref(true), o2 = shallowRef();
  let t2;
  return useEventListener("resize", useDebounceFn(() => t2 == null ? void 0 : t2.resize(), 100)), onMounted(() => {
    Promise.all([import("echarts"), new Promise((r2) => setTimeout(r2, 800))]).then(async ([r2]) => {
      t2 = r2.init(o2.value);
      const { option: s2, ...a2 } = await v(Fe(e2.config), e2.type, t2);
      t2.resize(a2), t2.setOption(s2), i2.value = false;
    });
  }), onUnmounted(() => {
    t2 == null || t2.dispose();
  }), () => [e2.title ? h$4("div", { class: "echarts-title" }, decodeURIComponent(e2.title)) : null, h$4("div", { class: "echarts-wrapper" }, [h$4("div", { ref: o2, class: "echarts-container", id: e2.id }), i2.value ? h$4(C$4, { class: "echarts-loading", height: 360 }) : null])];
} });
const figure = "";
const flowchart = "";
var l$1 = { x: 0, y: 0, "line-width": 2, "line-length": 40, "text-margin": 8, "font-size": 14, "font-color": "#8DA1AC", "line-color": "#8DA1AC", "element-color": "black", fill: "white", "yes-text": "Yes", "no-text": "No", "arrow-end": "block", scale: 1 }, o$4 = { ...l$1, symbols: { start: { class: "start-element", "font-color": "#fff", fill: "#595959", "line-width": "0px" }, end: { class: "end-element", "font-color": "#fff", fill: "#595959", "line-width": "0px" }, operation: { class: "operation-element", "font-color": "#fff", fill: "#1890ff", "line-width": "0px" }, inputoutput: { class: "inputoutput-element", "font-color": "#fff", fill: "#1890ff", "line-width": "0px" }, subroutine: { class: "subroutine-element", "font-color": "#fff", fill: "#FF485E", "element-color": "#fff", "line-color": "red" }, condition: { class: "condition-element", "font-color": "#fff", fill: "#FF485E", "line-width": "0px" }, parallel: { class: "parallel-element", "font-color": "#fff", fill: "#1890ff", "line-width": "0px" } } }, e$3 = { ...l$1, "line-width": 1, symbols: { start: { class: "start-element", fill: "#ccc", "line-color": "#5c6ac4", "font-color": "#000" }, end: { class: "end-element", fill: "#ccc", "line-color": "#5c6ac4", "font-color": "#000" }, operation: { class: "operation-element", fill: "#f1f1f1", "line-color": "#5c6ac4", "font-color": "#000" }, inputoutput: { class: "inputoutput-element", fill: "#f1f1f1", "line-color": "#5c6ac4", "font-color": "#000" }, subroutine: { class: "subroutine-element", fill: "#f1f1f1", "line-color": "#5c6ac4", "font-color": "#000" }, condition: { class: "condition-element", fill: "#f1f1f1", "line-color": "#5c6ac4", "font-color": "#000" }, parallel: { class: "parallel-element", fill: "#f1f1f1", "line-color": "#5c6ac4", "font-color": "#000" } } }, t$6 = { ...l$1, symbols: { start: { class: "start-element", "font-color": "#fff", fill: "#2F495F", "line-width": "0px" }, end: { class: "end-element", "font-color": "#fff", fill: "#2F495F", "line-width": "0px" }, operation: { class: "operation-element", "font-color": "#fff", fill: "#00BC7D", "line-width": "0px" }, inputoutput: { class: "inputoutput-element", "font-color": "#fff", fill: "#EB4D5D", "line-width": "0px" }, subroutine: { class: "subroutine-element", "font-color": "#fff", fill: "#937AC4", "element-color": "#fff", "line-color": "red" }, condition: { class: "condition-element", "font-color": "#fff", fill: "#FFB500", "line-width": "0px" }, parallel: { class: "parallel-element", "font-color": "#fff", fill: "#2F495F", "line-width": "0px" } } };
const f = { ant: o$4, vue: t$6, pie: e$3 };
var y = defineComponent({ name: "FlowChart", props: { code: { type: String, required: true }, id: { type: String, required: true }, preset: { type: String, default: "vue" } }, setup(r2) {
  let o2 = null;
  const d2 = shallowRef(), t2 = ref(true), n2 = ref(1), a2 = computed(() => f[r2.preset] || (console.warn(`[md-enhance:flowchart] Unknown preset: ${r2.preset}`), f.vue)), l2 = (e2) => e2 < 419 ? 0.8 : e2 > 1280 ? 1 : 0.9;
  return onMounted(() => {
    Promise.all([import("flowchart.ts"), new Promise((e2) => setTimeout(e2, 800))]).then(([{ parse: e2 }]) => {
      o2 = e2(Fe(r2.code)), n2.value = l2(window.innerWidth), t2.value = false, o2.draw(r2.id, { ...a2.value, scale: n2.value });
    }), useEventListener("resize", useDebounceFn(() => {
      if (o2) {
        const e2 = l2(window.innerWidth);
        n2.value !== e2 && (n2.value = e2, o2.draw(r2.id, { ...a2.value, scale: e2 }));
      }
    }, 100));
  }), () => [t2.value ? h$4(C$4, { class: "flowchart-loading", height: 192 }) : null, h$4("div", { ref: d2, class: ["flowchart-wrapper", r2.preset], id: r2.id, style: { display: t2.value ? "none" : "block" } })];
} });
const footnote = "";
const imageMark = "";
const mermaid = "";
let i$4 = {};
const o$3 = Symbol(""), r$3 = () => inject(o$3), t$5 = (e2) => {
  e2.provide(o$3, i$4);
};
const o$2 = { useMaxWidth: false }, L$1 = (e2) => ({ dark: e2, background: e2 ? "#1e1e1e" : "#fff", primaryColor: e2 ? "#389d70" : "#4abf8a", primaryBorderColor: e2 ? "#389d70" : "#4abf8a", primaryTextColor: "#fff", secondaryColor: "#ffb500", secondaryBorderColor: e2 ? "#fff" : "#000", secondaryTextColor: e2 ? "#ddd" : "#333", tertiaryColor: e2 ? "#282828" : "#efeef4", tertiaryBorderColor: e2 ? "#bbb" : "#242424", tertiaryTextColor: e2 ? "#ddd" : "#333", noteBkgColor: e2 ? "#f6d365" : "#fff5ad", noteTextColor: "#242424", noteBorderColor: e2 ? "#f6d365" : "#333", lineColor: e2 ? "#d3d3d3" : "#333", textColor: e2 ? "#fff" : "#242424", mainBkg: e2 ? "#389d70" : "#4abf8a", errorBkgColor: "#eb4d5d", errorTextColor: "#fff", nodeBorder: e2 ? "#389d70" : "#4abf8a", nodeTextColor: e2 ? "#fff" : "#242424", signalTextColor: e2 ? "#9e9e9e" : "#242424", classText: "#fff", labelColor: "#fff", fillType0: e2 ? "#cf1322" : "#f1636e", fillType1: "#f39c12", fillType2: "#2ecc71", fillType3: "#fa541c", fillType4: "#25a55b", fillType5: "#13c2c2", fillType6: "#096dd9", fillType7: "#aa6fe9" });
var k$1 = defineComponent({ name: "Mermaid", props: { id: { type: String, required: true }, code: { type: String, required: true } }, setup(e2) {
  const { themeVariables: d2, ...s2 } = r$3(), f2 = shallowRef(), m2 = computed(() => Fe(e2.code)), l2 = ref(""), i2 = ref(false), c2 = async () => {
    const [{ default: t2 }] = await Promise.all([import("mermaid"), new Promise((r2) => setTimeout(r2, 800))]);
    t2.initialize({ theme: "base", themeVariables: { ...L$1(i2.value), ...Re(d2) ? d2(i2.value) : d2 }, flowchart: o$2, sequence: o$2, journey: o$2, gantt: o$2, er: o$2, pie: o$2, ...s2, startOnLoad: false }), l2.value = (await t2.render(e2.id, m2.value)).svg;
  }, p2 = () => {
    const { body: t2 } = document, r2 = document.createElement("div");
    r2.classList.add("mermaid-preview"), r2.innerHTML = l2.value, t2.appendChild(r2), r2.addEventListener("click", () => {
      t2.removeChild(r2);
    });
  }, u2 = () => {
    const t2 = `data:image/svg+xml;charset=utf8,${l2.value.replace(/%/g, "%25").replace(/"/g, "%22").replace(/'/g, "%27").replace(/&/g, "%26").replace(/#/g, "%23").replace(/{/g, "%7B").replace(/}/g, "%7D").replace(/</g, "%3C").replace(/>/g, "%3E")}`, r2 = document.createElement("a");
    r2.setAttribute("href", t2), r2.setAttribute("download", `${e2.id}.svg`), r2.click();
  };
  return onMounted(() => {
    const t2 = document.documentElement, r2 = () => t2.classList.contains("dark") || t2.getAttribute("data-theme") === "dark";
    i2.value = r2(), c2(), useMutationObserver(t2, () => {
      i2.value = r2();
    }, { attributeFilter: ["class", "data-theme"], attributes: true }), watch(i2, () => c2());
  }), () => [h$4("div", { class: "mermaid-actions" }, [h$4("button", { class: "preview-button", onClick: () => p2(), title: "preview", innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1316 1024" fill="currentColor"><path d="M658.286 0C415.89 0 0 297.106 0 512c0 214.82 415.89 512 658.286 512 242.322 0 658.285-294.839 658.285-512S900.608 0 658.286 0zm0 877.714c-161.573 0-512-221.769-512-365.714 0-144.018 350.427-365.714 512-365.714 161.572 0 512 217.16 512 365.714s-350.428 365.714-512 365.714z"/><path d="M658.286 292.571a219.429 219.429 0 1 0 0 438.858 219.429 219.429 0 0 0 0-438.858zm0 292.572a73.143 73.143 0 1 1 0-146.286 73.143 73.143 0 0 1 0 146.286z"/></svg>' }), h$4("button", { class: "download-button", onClick: () => u2(), title: "download", innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor"><path d="M828.976 894.125H190.189c-70.55 0-127.754-57.185-127.754-127.753V606.674c0-17.634 14.31-31.933 31.933-31.933h63.889c17.634 0 31.932 14.299 31.932 31.933v95.822c0 35.282 28.596 63.877 63.877 63.877h511.033c35.281 0 63.877-28.595 63.877-63.877v-95.822c0-17.634 14.298-31.933 31.943-31.933h63.878c17.635 0 31.933 14.299 31.933 31.933v159.7c0 70.566-57.191 127.751-127.754 127.751zM249.939 267.51c12.921-12.92 33.885-12.92 46.807 0l148.97 148.972V94.893c0-17.634 14.302-31.947 31.934-31.947h63.876c17.638 0 31.946 14.313 31.946 31.947v321.589l148.97-148.972c12.922-12.92 33.876-12.92 46.797 0l46.814 46.818c12.922 12.922 12.922 33.874 0 46.807L552.261 624.93c-1.14 1.138-21.664 13.684-42.315 13.693-20.877.01-41.88-12.542-43.021-13.693L203.122 361.135c-12.923-12.934-12.923-33.885 0-46.807l46.817-46.818z"/></svg>' })]), h$4("div", { ref: f2, class: "mermaid-wrapper" }, l2.value ? h$4("div", { class: "mermaid-content", innerHTML: l2.value }) : h$4(C$4, { class: "mermaid-loading", height: 96 }))];
} });
let o$1 = {};
const i$3 = Symbol(""), a$2 = () => inject(i$3), l = (e2) => {
  e2.provide(i$3, o$1);
};
const s$2 = { showCompileOutput: false, clearConsole: false, ssr: false };
let e$2 = s$2;
const n$6 = Symbol(""), r$2 = () => inject(n$6), t$4 = (o2) => {
  o2.provide(n$6, e$2);
};
const e$1 = () => import("reveal.js/plugin/highlight/highlight.esm.js"), o = () => import("reveal.js/plugin/markdown/markdown.esm.js"), r$1 = () => import("reveal.js/plugin/math/math.esm.js"), t$3 = () => import("reveal.js/plugin/notes/notes.esm.js"), i$2 = () => import("reveal.js/dist/reveal.esm.js"), a$1 = () => import("reveal.js/plugin/search/search.esm.js"), n$5 = () => import("reveal.js/plugin/zoom/zoom.esm.js");
const reveal = "";
const useReveal = () => [i$2(), o(), e$1(), r$1(), a$1(), t$3(), n$5()];
const index$1 = "";
const leagueGothic = "";
const sourceSansPro = "";
var R = defineComponent({ name: "Presentation", props: { id: { type: String, required: true }, code: { type: String, required: true }, theme: { type: String, default: "auto" } }, setup(r2) {
  const l2 = a$2(), t2 = usePageFrontmatter(), n2 = ref(""), s2 = ref(true), u2 = shallowRef();
  let i2 = null;
  const p2 = async (e2) => {
    const v2 = [new Promise((o2) => setTimeout(o2, 800)), ...useReveal()], [, c2, ...f2] = await Promise.all(v2), d2 = new c2.default(e2, { backgroundTransition: "slide", hash: t2.value.layout === "Slide", mouseWheel: t2.value.layout === "Slide", transition: "slide", slideNumber: true, ...l2, ...t2.value.reveal || {}, embedded: t2.value.layout !== "Slide", plugins: [...f2.map(({ default: o2 }) => o2), ...l2.plugins ?? []] });
    return await d2.initialize(), d2;
  };
  return onMounted(async () => {
    const e2 = u2.value;
    e2 && (n2.value = Fe(r2.code), e2.setAttribute("id", r2.id), e2.setAttribute("data-theme", r2.theme), i2 = await p2(e2), s2.value = false);
  }), onUnmounted(() => {
    i2 == null || i2.destroy();
  }), () => h$4("div", { class: "vp-reveal" }, [h$4("div", { ref: u2, class: ["reveal", "reveal-viewport"] }, h$4("div", { class: "slides", innerHTML: `<section data-markdown data-separator="^\\r?\\n---\\r?\\n$" data-separator-vertical="^\\r?\\n--\\r?\\n$"><script type="text/template">${n2.value}<\/script></section>` })), s2.value ? h$4(C$4, { class: "reveal-loading", height: 400 }) : null]);
} });
const playground = "";
var n$4 = defineComponent({ name: "Playground", props: { title: { type: String, default: "" }, link: { type: String, required: true } }, setup(o2) {
  return () => [h$4("div", { class: "vp-playground" }, [h$4("div", { class: "vp-playground-header" }, [o2.title ? h$4("div", { class: "vp-playground-title" }, decodeURIComponent(o2.title)) : null, h$4("div", { class: "vp-playground-actions" }, [h$4("a", { class: "vp-playground-action", href: decodeURIComponent(o2.link), target: "_blank", innerHTML: l$2 })])]), h$4("div", { class: "vp-playground-container" }, h$4("iframe", { src: decodeURIComponent(o2.link) }))])];
} });
const tabs = "";
const n$3 = useStorage("VUEPRESS_TAB_STORE", {});
var A$1 = defineComponent({ name: "Tabs", props: { active: { type: Number, default: 0 }, data: { type: Array, required: true }, id: { type: String, required: true }, tabId: { type: String, default: "" } }, slots: Object, setup(a2, { slots: v2 }) {
  const l2 = ref(a2.active), r2 = shallowRef([]), o2 = () => {
    a2.tabId && (n$3.value[a2.tabId] = a2.data[l2.value].id);
  }, s2 = (e2 = l2.value) => {
    l2.value = e2 < r2.value.length - 1 ? e2 + 1 : 0, r2.value[l2.value].focus();
  }, c2 = (e2 = l2.value) => {
    l2.value = e2 > 0 ? e2 - 1 : r2.value.length - 1, r2.value[l2.value].focus();
  }, b2 = (e2, t2) => {
    e2.key === " " || e2.key === "Enter" ? (e2.preventDefault(), l2.value = t2) : e2.key === "ArrowRight" ? (e2.preventDefault(), s2()) : e2.key === "ArrowLeft" && (e2.preventDefault(), c2()), o2();
  }, p2 = () => {
    if (a2.tabId) {
      const e2 = a2.data.findIndex(({ id: t2 }) => n$3.value[a2.tabId] === t2);
      if (e2 !== -1)
        return e2;
    }
    return a2.active;
  };
  return onMounted(() => {
    l2.value = p2(), watch(() => n$3.value[a2.tabId], (e2, t2) => {
      if (a2.tabId && e2 !== t2) {
        const u2 = a2.data.findIndex(({ id: i2 }) => i2 === e2);
        u2 !== -1 && (l2.value = u2);
      }
    });
  }), () => a2.data.length ? h$4("div", { class: "vp-tabs" }, [h$4("div", { class: "vp-tabs-nav", role: "tablist" }, a2.data.map(({ id: e2 }, t2) => {
    const u2 = t2 === l2.value;
    return h$4("button", { type: "button", ref: (i2) => {
      i2 && (r2.value[t2] = i2);
    }, class: ["vp-tab-nav", { active: u2 }], role: "tab", "aria-controls": `tab-${a2.id}-${t2}`, "aria-selected": u2, onClick: () => {
      l2.value = t2, o2();
    }, onKeydown: (i2) => b2(i2, t2) }, v2[`title${t2}`]({ value: e2, isActive: u2 }));
  })), a2.data.map(({ id: e2 }, t2) => {
    const u2 = t2 === l2.value;
    return h$4("div", { class: ["vp-tab", { active: u2 }], id: `tab-${a2.id}-${t2}`, role: "tabpanel", "aria-expanded": u2 }, v2[`tab${t2}`]({ value: e2, isActive: u2 }));
  })]) : null;
} });
const tasklist = "";
const katex_min = "";
const katex = "";
const clientConfig9 = defineClientConfig({
  enhance: ({ app }) => {
    app.component("ChartJS", h$1);
    app.component("CodeTabs", A$3);
    if (!Qe("CodeGroup", app))
      app.component("CodeGroup", C$1);
    if (!Qe("CodeGroupItem", app))
      app.component("CodeGroupItem", c$2);
    app.component("CodeDemo", Z);
    app.component("ECharts", y$1);
    app.component("FlowChart", y);
    t$5(app);
    app.component("Mermaid", k$1);
    l(app);
    app.component("Presentation", R);
    app.component("Playground", n$4);
    app.component("Tabs", A$1);
    t$4(app);
    app.component("VuePlayground", defineAsyncComponent(() => import("./assets/VuePlayground-97272952.js")));
  },
  setup: () => {
  }
});
let i$1 = {};
const t$2 = Symbol(""), n$2 = () => inject(t$2), s$1 = (o2) => {
  o2.provide(t$2, i$1);
};
const photoswipe = "";
const photoSwipe = "";
const P = ".theme-hope-content :not(a) > img:not([no-view])", x = { "/": { "closeTitle": "关闭", "downloadTitle": "下载图片", "fullscreenTitle": "切换全屏", "zoomTitle": "缩放", "arrowPrevTitle": "上一个 (左箭头)", "arrowNextTitle": "下一个 (右箭头)" } }, A = 800, b = '<div class="photo-swipe-loading"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" preserveAspectRatio="xMidYMid" viewBox="25 25 50 50"><animateTransform attributeName="transform" type="rotate" dur="2s" keyTimes="0;1" repeatCount="indefinite" values="0;360"></animateTransform><circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><animate attributeName="stroke-dasharray" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="1,200;90,200;1,200"></animate><animate attributeName="stroke-dashoffset" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="0;-35px;-125px"></animate></circle></svg></div>', H = (e2) => isString(e2) ? Array.from(document.querySelectorAll(e2)) : e2.map((l2) => Array.from(document.querySelectorAll(l2))).flat(), h = (e2) => new Promise((l2, m2) => {
  e2.complete ? l2({ type: "image", element: e2, src: e2.src, width: e2.naturalWidth, height: e2.naturalHeight, alt: e2.alt, msrc: e2.src }) : (e2.onload = () => l2(h(e2)), e2.onerror = (d2) => m2(d2));
}), N = () => {
  const { isSupported: e2, toggle: l2 } = useFullscreen(), m2 = n$2(), d2 = Ze(x), v2 = usePageData();
  let n2;
  const g2 = (a2) => {
    a2.on("uiRegister", () => {
      e2 && a2.ui.registerElement({ name: "fullscreen", order: 7, isButton: true, html: '<svg class="pswp__icn" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M249.5 270.833H437v-75H212a37.5 37.5 0 0 0-37.5 37.5v225h75v-187.5zm-37.5 600h225v-75H249.5v-187.5h-75v225a37.5 37.5 0 0 0 37.5 37.5zm637.5-37.5v-225h-75v187.5H587v75h225a37.5 37.5 0 0 0 37.5-37.5zM587 270.833h187.5v187.5h75v-225a37.5 37.5 0 0 0-37.5-37.5H587v75z"/></svg>', onClick: () => {
        l2();
      } }), a2.ui.registerElement({ name: "download", order: 8, isButton: true, tagName: "a", html: { isCustomSVG: true, inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1-1.5-1.6ZM23 23H9v2h14" id="pswp__icn-download"/>', outlineID: "pswp__icn-download" }, onInit: (r2, o2) => {
        r2.setAttribute("download", ""), r2.setAttribute("target", "_blank"), r2.setAttribute("rel", "noopener"), o2.on("change", () => {
          r2.setAttribute("href", o2.currSlide.data.src);
        });
      } }), a2.ui.registerElement({ name: "bulletsIndicator", className: "photo-swipe-bullets-indicator", appendTo: "wrapper", onInit: (r2, o2) => {
        const t2 = [];
        let i2 = -1;
        for (let s2 = 0; s2 < o2.getNumItems(); s2++) {
          const c2 = document.createElement("div");
          c2.className = "photo-swipe-bullet", c2.onclick = (w2) => {
            o2.goTo(t2.indexOf(w2.target));
          }, t2.push(c2), r2.appendChild(c2);
        }
        o2.on("change", () => {
          i2 >= 0 && t2[i2].classList.remove("active"), t2[o2.currIndex].classList.add("active"), i2 = o2.currIndex;
        });
      } });
    });
  }, p2 = () => Promise.all([import("photoswipe"), nextTick().then(() => new Promise((a2) => setTimeout(a2, A)).then(() => H(P)))]).then(([{ default: a2 }, r2]) => {
    const o2 = r2.map((t2) => ({ html: b, element: t2, msrc: t2.src }));
    r2.forEach((t2, i2) => {
      const s2 = () => {
        n2 = new a2({ preloaderDelay: 0, showHideAnimationType: "zoom", ...d2.value, ...m2, dataSource: o2, index: i2, ...{ closeOnVerticalDrag: true, wheelToZoom: false } }), g2(n2), n2.addFilter("thumbEl", () => t2), n2.addFilter("placeholderSrc", () => t2.src), n2.init();
      };
      t2.style.cursor = "zoom-in", t2.addEventListener("click", () => {
        s2();
      }), t2.addEventListener("keypress", ({ key: c2 }) => {
        c2 === "Enter" && s2();
      });
    }), r2.forEach((t2, i2) => {
      h(t2).then((s2) => {
        o2.splice(i2, 1, s2), n2 == null || n2.refreshSlideContent(i2);
      });
    });
  });
  onMounted(() => {
    useEventListener("wheel", () => {
      n2 == null || n2.close();
    }), p2(), watch(() => v2.value.path, () => p2());
  });
};
var M = defineClientConfig({ enhance: ({ app: e2 }) => {
  s$1(e2);
}, setup: () => {
  N();
} });
const t$1 = Symbol(""), r = () => {
  const e2 = inject(t$1);
  if (!e2)
    throw new Error("usePWAEvent() is called without provider.");
  return e2;
};
const c$1 = () => h$4(u$4, { name: "update" }, () => h$4("path", { d: "M949.949 146.25v255.826c0 21.981-13.989 35.97-35.97 35.97H658.154c-13.988 0-25.983-7.992-33.973-21.981-5.997-13.989-4-27.977 7.991-39.97l79.942-77.946c-55.954-51.973-121.918-77.955-199.863-77.955-37.975 0-75.95 8.002-113.924 21.99-37.975 15.985-67.948 37.976-91.934 63.957-25.982 23.987-47.973 53.96-63.957 91.934-29.983 73.955-29.983 153.895 0 227.85 15.984 37.976 37.975 67.947 63.957 91.934 23.986 25.982 53.959 47.973 91.934 63.956 37.974 13.989 75.95 21.991 113.924 21.991 45.967 0 87.942-9.998 127.913-29.982 41.976-17.99 75.951-45.967 101.931-83.943 7.993-4 11.994-5.995 13.989-5.995 5.997 0 9.998 1.994 13.988 5.995l77.958 77.946c3.989 4 5.986 7.993 5.986 11.994 0 1.994-1.996 5.995-3.99 11.994-43.973 51.962-93.941 91.934-151.9 117.914-53.958 25.983-115.92 39.972-185.874 39.972-61.961 0-119.921-11.984-169.89-33.973-57.96-25.985-105.923-57.963-139.896-93.943-35.98-33.972-67.958-81.936-93.94-139.897-45.967-101.93-45.967-237.846 0-339.777 25.982-57.96 57.96-105.923 93.94-139.896 33.973-35.98 81.936-67.958 139.896-93.94 49.968-21.99 107.928-33.974 169.89-33.974 55.963 0 109.923 9.988 161.885 29.973 53.97 21.99 101.933 51.963 139.908 89.938l73.954-73.944c9.987-9.998 23.987-13.988 39.971-8.002 13.988 8.002 21.98 19.995 21.98 33.984z" }));
c$1.displayName = "UpdateIcon";
const t = { "/": { "install": "安装", "iOSInstall": "点击分享按钮然后点击“添加到主屏幕”", "cancel": "取消", "close": "关闭", "prevImage": "上一张图片", "nextImage": "下一张图片", "desc": "详情", "feature": "主要特色", "explain": "该应用可以安装在你的 PC 或移动设备上。这将使该 Web 应用程序外观和行为与其他应用程序相同。它将在出现在应用程序列表中，并可以固定到主屏幕，开始菜单或任务栏。此 Web 应用程序还将能够与其他应用程序和你的操作系统安全地进行交互。", "hint": "发现新内容可用", "update": "新内容已就绪" } };
const popup = "";
const n$1 = (t2) => {
  const s2 = t2.waiting;
  if (!s2)
    return;
  const e2 = new MessageChannel();
  s2.postMessage({ type: "SKIP_WAITING" }, [e2.port2]);
};
var U = defineComponent({ name: "SWUpdatePopup", slots: Object, setup(W2, { slots: t$12 }) {
  const u2 = Ze(t), e2 = shallowRef(), p2 = computed(() => !!e2.value), l2 = () => {
    e2.value && (n$1(e2.value), e2.value = void 0);
  };
  return onMounted(() => {
    r().on("updated", (a2) => {
      a2 && (e2.value = a2);
    });
  }), () => h$4(Transition, { name: "popup" }, () => {
    var a2;
    return ((a2 = t$12.default) == null ? void 0 : a2.call(t$12, { enabled: p2.value, reload: l2 })) || (p2.value ? h$4("button", { type: "button", class: "sw-update-popup", tabindex: 0, onClick: () => l2() }, [u2.value.update, h$4("span", { class: "icon-wrapper" }, h$4(c$1))]) : null);
  });
} });
const clientConfig11 = defineClientConfig({
  setup: () => {
  },
  rootComponents: [
    U
  ]
});
const HopeIcon = (props) => {
  const { icon = "", color, size } = props;
  const style = {};
  if (color)
    style["color"] = color;
  if (size)
    style["height"] = Number.isNaN(Number(size)) ? size : `${size}px`;
  return isLinkHttp(icon) ? h$4("img", { class: "icon", src: icon, "no-view": "", style }) : Oe(icon) ? h$4("img", { class: "icon", src: withBase(icon), "no-view": "", style }) : h$4(resolveComponent("FontIcon"), props);
};
HopeIcon.displayName = "HopeIcon";
const getAncestorLinks = (path, routeLocale) => {
  const routePaths = path.replace(routeLocale, "/").split("/");
  const result = [];
  let link = removeEndingSlash(routeLocale);
  routePaths.forEach((name, index2) => {
    if (index2 !== routePaths.length - 1) {
      link += `${name}/`;
      result.push({ link, name: name || "Home" });
    } else if (name !== "") {
      link += name;
      result.push({ link, name });
    }
  });
  return result;
};
var ArticleInfoType;
(function(ArticleInfoType2) {
  ArticleInfoType2["type"] = "y";
  ArticleInfoType2["title"] = "t";
  ArticleInfoType2["shortTitle"] = "s";
  ArticleInfoType2["icon"] = "i";
  ArticleInfoType2["author"] = "a";
  ArticleInfoType2["date"] = "d";
  ArticleInfoType2["localizedDate"] = "l";
  ArticleInfoType2["category"] = "c";
  ArticleInfoType2["tag"] = "g";
  ArticleInfoType2["isEncrypted"] = "n";
  ArticleInfoType2["isOriginal"] = "o";
  ArticleInfoType2["readingTime"] = "r";
  ArticleInfoType2["excerpt"] = "e";
  ArticleInfoType2["sticky"] = "u";
  ArticleInfoType2["cover"] = "v";
  ArticleInfoType2["index"] = "I";
  ArticleInfoType2["order"] = "O";
})(ArticleInfoType || (ArticleInfoType = {}));
var PageType;
(function(PageType2) {
  PageType2["article"] = "a";
  PageType2["home"] = "h";
  PageType2["slide"] = "s";
  PageType2["page"] = "p";
})(PageType || (PageType = {}));
const resolveLinkInfo = (router, item, preferFull = false) => {
  const encodedPath = encodeURI(item);
  let result = w(router, A$4(encodedPath));
  if (result.name === "404")
    result = w(router, encodedPath);
  const { fullPath, meta, name } = result;
  return {
    text: !preferFull && meta[ArticleInfoType.shortTitle] ? meta[ArticleInfoType.shortTitle] : meta[ArticleInfoType.title] || item,
    link: name === "404" ? item : fullPath,
    ...meta[ArticleInfoType.icon] ? { icon: meta[ArticleInfoType.icon] } : {}
  };
};
const useNavigate = () => {
  const router = useRouter();
  const route = useRoute();
  return (url) => {
    if (url)
      if (Oe(url)) {
        if (route.path !== url)
          void router.push(url);
      } else if (isLinkHttp(url) || isLinkMailto(url)) {
        if (window)
          window.open(url);
      } else {
        const base = route.path.slice(0, route.path.lastIndexOf("/"));
        void router.push(`${base}/${encodeURI(url)}`);
      }
  };
};
const i = () => {
  const e2 = usePageData();
  return computed(() => e2.value.readingTime ?? null);
}, n = typeof { "/": { "word": "约 $word 字", "less1Minute": "小于 1 分钟", "time": "大约 $time 分钟" } } > "u" ? null : { "/": { "word": "约 $word 字", "less1Minute": "小于 1 分钟", "time": "大约 $time 分钟" } }, a = (e2, o2) => {
  const { minutes: r2, words: l2 } = e2, { less1Minute: m2, word: c2, time: d2 } = o2;
  return { time: r2 < 1 ? m2 : d2.replace("$time", Math.round(r2).toString()), words: c2.replace("$word", l2.toString()) };
}, u = { words: "", time: "" }, s = () => n ? Ze(n) : computed(() => null), L = () => {
  if (typeof n > "u")
    return computed(() => u);
  const e2 = i(), o2 = s();
  return computed(() => e2.value && o2.value ? a(e2.value, o2.value) : u);
};
const useThemeData = () => useThemeData$1();
const useThemeLocaleData = () => useThemeLocaleData$1();
const usePure = () => computed(() => Boolean(useThemeData().value.pure));
const usePageAuthor = () => {
  const themeLocale = useThemeLocaleData();
  const frontmatter = usePageFrontmatter();
  return computed(() => {
    const { author } = frontmatter.value;
    if (author)
      return Te(author);
    if (author === false)
      return [];
    return Te(themeLocale.value.author, false);
  });
};
const usePageCategory = () => {
  const frontmatter = usePageFrontmatter();
  return computed(() => je(frontmatter.value.category).map((name) => {
    var _a2, _b2;
    return {
      name,
      // this is a hack
      path: ((_b2 = (_a2 = inject(Symbol.for("categoryMap"))) == null ? void 0 : _a2.value.map[name]) == null ? void 0 : _b2.path) || ""
    };
  }));
};
const usePageTag = () => {
  const frontmatter = usePageFrontmatter();
  return computed(() => Be(frontmatter.value.tag).map((name) => {
    var _a2, _b2;
    return {
      name,
      // this is a hack
      path: ((_b2 = (_a2 = inject(Symbol.for("tagMap"))) == null ? void 0 : _a2.value.map[name]) == null ? void 0 : _b2.path) || ""
    };
  }));
};
const usePageDate = () => {
  const frontmatter = usePageFrontmatter();
  const page2 = usePageData();
  return computed(() => {
    const date = pe(frontmatter.value.date);
    if (date)
      return date;
    const { createdTime } = page2.value.git || {};
    if (createdTime)
      return new Date(createdTime);
    return null;
  });
};
const usePageInfo = () => {
  const themeLocale = useThemeLocaleData();
  const page2 = usePageData();
  const frontmatter = usePageFrontmatter();
  const author = usePageAuthor();
  const category = usePageCategory();
  const tag = usePageTag();
  const date = usePageDate();
  const readingTimeData = i();
  const readingTimeLocale = L();
  const info = computed(() => ({
    author: author.value,
    category: category.value,
    date: date.value,
    localizedDate: page2.value.localizedDate,
    tag: tag.value,
    isOriginal: frontmatter.value.isOriginal || false,
    readingTime: readingTimeData.value,
    readingTimeLocale: readingTimeLocale.value,
    pageview: "pageview" in frontmatter.value ? frontmatter.value.pageview : true
  }));
  const items = computed(() => "pageInfo" in frontmatter.value ? frontmatter.value.pageInfo : "pageInfo" in themeLocale.value ? themeLocale.value.pageInfo : null);
  return { info, items };
};
let promise = null;
let promiseResolve = null;
const scrollPromise = {
  wait: () => promise,
  pending: () => {
    promise = new Promise((resolve) => promiseResolve = resolve);
  },
  resolve: () => {
    promiseResolve == null ? void 0 : promiseResolve();
    promise = null;
    promiseResolve = null;
  }
};
const useScrollPromise = () => scrollPromise;
const mobileBreakPoint$1 = "719px";
const pcBreakPoint$1 = "1440px";
const enableThemeColor$1 = "true";
const cssVariables = {
  mobileBreakPoint: mobileBreakPoint$1,
  pcBreakPoint: pcBreakPoint$1,
  enableThemeColor: enableThemeColor$1,
  "theme-1": "#2196f3",
  "theme-2": "#f26d6d",
  "theme-3": "#3eaf7c",
  "theme-4": "#fb9b5f"
};
const { mobileBreakPoint, pcBreakPoint } = cssVariables;
const getPixels = (length) => length.endsWith("px") ? Number(length.slice(0, -2)) : null;
const useWindowSize = () => {
  const isMobile = ref(false);
  const isPC = ref(false);
  const windowSizeHandler = () => {
    isMobile.value = window.innerWidth <= (getPixels(mobileBreakPoint) ?? 719);
    isPC.value = window.innerWidth >= (getPixels(pcBreakPoint) ?? 1440);
  };
  onMounted(() => {
    windowSizeHandler();
    useEventListener("resize", windowSizeHandler, false);
    useEventListener("orientationchange", windowSizeHandler, false);
  });
  return {
    isMobile,
    isPC
  };
};
const darkModeSymbol = Symbol("");
const useDarkmode = () => {
  const darkmode = inject(darkModeSymbol);
  if (!darkmode)
    throw new Error("useDarkmode() is called without provider.");
  return darkmode;
};
const injectDarkmode = (app) => {
  const themeData2 = useThemeData();
  const isDarkPreferred = usePreferredDark();
  const status = useStorage("vuepress-theme-hope-scheme", "auto");
  const config = computed(() => themeData2.value.darkmode || "switch");
  const isDarkmode = computed(() => {
    const darkmode = config.value;
    return darkmode === "disable" ? false : (
      // force darkmode
      darkmode === "enable" ? true : (
        // auto
        darkmode === "auto" ? isDarkPreferred.value : (
          // toggle
          darkmode === "toggle" ? status.value === "dark" : (
            // switch
            status.value === "dark" || status.value === "auto" && isDarkPreferred.value
          )
        )
      )
    );
  });
  const canToggle = computed(() => {
    const darkmode = config.value;
    return darkmode === "switch" || darkmode === "toggle";
  });
  app.provide(darkModeSymbol, {
    canToggle,
    config,
    isDarkmode,
    status
  });
  Object.defineProperties(app.config.globalProperties, {
    $isDarkmode: { get: () => isDarkmode.value }
  });
};
const setupDarkmode = () => {
  const { isDarkmode } = useDarkmode();
  const updateDOM = (isDark = isDarkmode.value) => document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  onMounted(() => {
    watch(isDarkmode, updateDOM, { immediate: true });
  });
};
const AutoLink = defineComponent({
  name: "AutoLink",
  inheritAttrs: false,
  props: {
    /**
     * @description Autolink config
     */
    config: {
      type: Object,
      required: true
    },
    /**
     * @description Whether it's active only when exact match
     */
    exact: Boolean,
    /**
     * @description Whether to hide externalLinkIcon
     */
    noExternalLinkIcon: Boolean
  },
  emits: ["focusout"],
  slots: Object,
  setup(props, { attrs, emit, slots }) {
    const route = useRoute();
    const siteData2 = useSiteData();
    const config = toRef(props, "config");
    const hasHttpProtocol = computed(() => isLinkHttp(config.value.link));
    const hasNonHttpProtocol = computed(() => isLinkMailto(config.value.link) || isLinkTel(config.value.link));
    const linkTarget = computed(() => hasNonHttpProtocol.value ? void 0 : config.value.target || (hasHttpProtocol.value ? "_blank" : void 0));
    const isBlankTarget = computed(() => linkTarget.value === "_blank");
    const renderVPLink = computed(() => !hasHttpProtocol.value && !hasNonHttpProtocol.value && !isBlankTarget.value);
    const anchorRel = computed(() => hasNonHttpProtocol.value ? void 0 : config.value.rel || (isBlankTarget.value ? "noopener noreferrer" : void 0));
    const linkAriaLabel = computed(() => config.value.ariaLabel || config.value.text);
    const shouldBeActiveInSubpath = computed(() => {
      if (props.exact)
        return false;
      const localeKeys = f$2(siteData2.value.locales);
      return localeKeys.length ? (
        // check all the locales
        localeKeys.every((key) => key !== config.value.link)
      ) : (
        // check root
        config.value.link !== "/"
      );
    });
    const isActive = computed(() => renderVPLink.value ? config.value.activeMatch ? new RegExp(config.value.activeMatch).test(route.path) : (
      // if this link is active in subpath
      !shouldBeActiveInSubpath.value ? route.path === config.value.link : z$3(route.path, config.value.link)
    ) : false);
    return () => {
      const { before, after, default: defaultSlot } = slots;
      const { text, icon, link } = config.value;
      return renderVPLink.value ? h$4(j$1, {
        to: link,
        "aria-label": linkAriaLabel.value,
        ...attrs,
        // class needs to be merged manually
        class: ["nav-link", { active: isActive.value }, attrs["class"]],
        onFocusout: () => emit("focusout")
      }, () => defaultSlot ? defaultSlot() : [before ? before() : h$4(HopeIcon, { icon }), text, after == null ? void 0 : after()]) : h$4("a", {
        href: link,
        rel: anchorRel.value,
        target: linkTarget.value,
        "aria-label": linkAriaLabel.value,
        ...attrs,
        // class needs to be merged manually
        class: ["nav-link", attrs["class"]],
        onFocusout: () => emit("focusout")
      }, defaultSlot ? defaultSlot() : [
        before ? before() : h$4(HopeIcon, { icon }),
        text,
        props.noExternalLinkIcon ? null : h$4(ExternalLinkIcon),
        after == null ? void 0 : after()
      ]);
    };
  }
});
const isActiveSidebarItem = (route, item, exact = false) => {
  if ("activeMatch" in item)
    return new RegExp(item.activeMatch).test(route.path);
  if (Ge(route, item.link))
    return true;
  if (item.children && !exact)
    return item.children.some((child) => isActiveSidebarItem(route, child));
  return false;
};
const isMatchedSidebarItem = (route, item) => {
  if (item.type === "group")
    return item.children.some((child) => {
      if (child.type === "group")
        return isMatchedSidebarItem(route, child);
      return child.type === "page" && isActiveSidebarItem(route, child, true);
    }) || "prefix" in item && Ge(route, item.prefix);
  return false;
};
const renderItem = (config, props) => isString(config.link) ? (
  // if the item has link, render it as `<AutoLink>`
  h$4(AutoLink, {
    ...props,
    config
  })
) : (
  // if the item only has text, render it as `<p>`
  h$4("p", props, [h$4(HopeIcon, { icon: config.icon }), config.text])
);
const renderChildren$1 = (children) => {
  const route = useRoute();
  if (!children)
    return null;
  return h$4("ul", { class: "vp-sidebar-sub-headers" }, children.map((child) => {
    const active = isActiveSidebarItem(route, child, true);
    return h$4("li", { class: "vp-sidebar-sub-header" }, [
      renderItem(child, {
        class: ["vp-sidebar-link", "vp-heading", { active }]
      }),
      renderChildren$1(child.children)
    ]);
  }));
};
const sidebarData = { "/posts/": [{ "text": "G R P C", "prefix": "gRPC/", "collapsible": true, "children": ["gRPC服务"] }, { "text": "Linux", "prefix": "Linux/", "collapsible": true, "children": ["Linux配置环境变量"] }, { "text": "Mysql", "prefix": "mysql/", "collapsible": true, "children": ["mysql备忘录"] }, { "text": "Python", "prefix": "python/", "collapsible": true, "children": ["Linux环境下DBUtils导入的问题", "Python2转Python3", "polygon面积计算", "Python添加环境变量"] }, { "text": "Tools", "prefix": "tools/", "collapsible": true, "children": ["PicgoGitHub搭建图床", "sublime说明书"] }, { "text": "Vue", "prefix": "Vue/", "collapsible": true, "children": ["Vue基础", "vue客户端"] }], "/anything/": [{ "text": "小记", "prefix": "小记/", "collapsible": true, "children": ["下雪啦", "好用网站收藏"] }, { "text": "Book Notes", "prefix": "book_notes/", "collapsible": true, "children": [{ "text": "人之觉醒", "prefix": "人之觉醒/", "collapsible": true, "children": ["一切问题的起源"] }] }], "/design_pattern/": [{ "text": "设计模式", "prefix": "设计模式/", "collapsible": true, "children": ["单例模式", "工厂模式", "门面模式"] }] };
const resolvePrefix = (prefix = "", path = "") => Oe(path) ? path : `${ensureEndingSlash(prefix)}${path}`;
const headerToSidebarItem = (header, headerDepth) => {
  const page2 = usePageData();
  return {
    type: "heading",
    text: header.title,
    link: `${page2.value.path}#${header.slug}`,
    children: headersToSidebarItemChildren(header.children, headerDepth)
  };
};
const headersToSidebarItemChildren = (headers, headerDepth) => headerDepth > 0 ? headers.map((header) => headerToSidebarItem(header, headerDepth - 1)) : [];
const resolveHeadingSidebarItems = (headerDepth) => {
  const page2 = usePageData();
  return headersToSidebarItemChildren(page2.value.headers, headerDepth);
};
const resolveArraySidebarItems = (sidebarConfig, headerDepth, prefix = "") => {
  const router = useRouter();
  const page2 = usePageData();
  const handleChildItem = (item, pathPrefix = prefix) => {
    var _a2;
    const childItem = isString(item) ? resolveLinkInfo(router, resolvePrefix(pathPrefix, item)) : item.link ? {
      ...item,
      ...!isLinkExternal(item.link) ? {
        link: resolveLinkInfo(router, resolvePrefix(pathPrefix, item.link)).link
      } : {}
    } : item;
    if ("children" in childItem) {
      const prefix2 = resolvePrefix(pathPrefix, childItem.prefix);
      const children = childItem.children === "structure" ? sidebarData[prefix2] : childItem.children;
      return {
        type: "group",
        ...childItem,
        prefix: prefix2,
        children: children.map((item2) => handleChildItem(item2, prefix2))
      };
    }
    return {
      type: "page",
      ...childItem,
      children: (
        // if the sidebar item is current page and children is not set
        // use headers of current page as children
        childItem.link === page2.value.path ? headersToSidebarItemChildren(
          // skip h1 header
          ((_a2 = page2.value.headers[0]) == null ? void 0 : _a2.level) === 1 ? page2.value.headers[0].children : page2.value.headers,
          headerDepth
        ) : []
      )
    };
  };
  return sidebarConfig.map((item) => handleChildItem(item));
};
const resolveMultiSidebarItems = (sidebarConfig, headerDepth) => {
  const page2 = usePageData();
  const sidebarRoutes = f$2(sidebarConfig).sort((x2, y2) => y2.length - x2.length);
  for (const base of sidebarRoutes)
    if (z$3(decodeURI(page2.value.path), base)) {
      const matchedConfig = sidebarConfig[base];
      return matchedConfig ? resolveArraySidebarItems(matchedConfig === "structure" ? sidebarData[base] : matchedConfig === "heading" ? resolveHeadingSidebarItems(headerDepth) : matchedConfig, headerDepth, base) : [];
    }
  console.warn(`${page2.value.path} is missing sidebar config.`);
  return [];
};
const resolveSidebarItems = (sidebarConfig, headerDepth) => {
  const routeLocale = useRouteLocale();
  return sidebarConfig === false ? [] : sidebarConfig === "heading" ? resolveHeadingSidebarItems(headerDepth) : sidebarConfig === "structure" ? resolveArraySidebarItems(sidebarData[routeLocale.value], headerDepth, routeLocale.value) : isArray(sidebarConfig) ? resolveArraySidebarItems(sidebarConfig, headerDepth) : isPlainObject(sidebarConfig) ? resolveMultiSidebarItems(sidebarConfig, headerDepth) : [];
};
const sidebarItemsSymbol = Symbol("");
const setupSidebarItems = () => {
  const frontmatter = usePageFrontmatter();
  const themeLocale = useThemeLocaleData();
  const sidebarConfig = computed(() => frontmatter.value.home ? false : frontmatter.value.sidebar ?? themeLocale.value.sidebar ?? "structure");
  const headerDepth = computed(() => frontmatter.value.headerDepth ?? themeLocale.value.headerDepth ?? 2);
  const sidebarItems = computed(() => resolveSidebarItems(sidebarConfig.value, headerDepth.value));
  provide(sidebarItemsSymbol, sidebarItems);
};
const useSidebarItems = () => {
  const sidebarItems = inject(sidebarItemsSymbol);
  if (!sidebarItems)
    throw new Error("useSidebarItems() is called without provider.");
  return sidebarItems;
};
const footer = "";
const PageFooter = defineComponent({
  name: "PageFooter",
  setup() {
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const author = usePageAuthor();
    const enable = computed(() => {
      const { copyright: copyright2, footer: footer2 } = frontmatter.value;
      return footer2 !== false && Boolean(copyright2 || footer2 || themeLocale.value.displayFooter);
    });
    const content = computed(() => {
      const { footer: footer2 } = frontmatter.value;
      return footer2 === false ? false : isString(footer2) ? footer2 : themeLocale.value.footer || "";
    });
    const copyright = computed(() => "copyright" in frontmatter.value ? frontmatter.value.copyright : "copyright" in themeLocale.value ? themeLocale.value.copyright : author.value.length ? `Copyright © ${(/* @__PURE__ */ new Date()).getFullYear()} ${author.value[0].name}` : false);
    return () => enable.value ? h$4("footer", { class: "vp-footer-wrapper" }, [
      content.value ? h$4("div", { class: "vp-footer", innerHTML: content.value }) : null,
      copyright.value ? h$4("div", {
        class: "vp-copyright",
        innerHTML: copyright.value
      }) : null
    ]) : null;
  }
});
var e = defineComponent({ name: "EmptyComponent", setup: () => () => null });
const dropdownLink = "";
const DropdownLink = defineComponent({
  name: "NavbarDropdownLink",
  props: {
    /**
     * Dropdown config
     *
     * 下拉列表配置
     */
    config: {
      type: Object,
      required: true
    }
  },
  slots: Object,
  setup(props, { slots }) {
    const page2 = usePageData();
    const config = toRef(props, "config");
    const dropdownAriaLabel = computed(() => config.value.ariaLabel || config.value.text);
    const open = ref(false);
    watch(() => page2.value.path, () => {
      open.value = false;
    });
    const handleDropdown = (event) => {
      const isTriggerByTab = event.detail === 0;
      if (isTriggerByTab)
        open.value = !open.value;
    };
    return () => {
      var _a2;
      return h$4("div", { class: ["dropdown-wrapper", { open: open.value }] }, [
        h$4("button", {
          type: "button",
          class: "dropdown-title",
          "aria-label": dropdownAriaLabel.value,
          onClick: handleDropdown
        }, [
          ((_a2 = slots.title) == null ? void 0 : _a2.call(slots)) || h$4("span", { class: "title" }, [
            h$4(HopeIcon, { icon: config.value.icon }),
            props.config.text
          ]),
          h$4("span", { class: "arrow" }),
          h$4("ul", { class: "nav-dropdown" }, config.value.children.map((child, index2) => {
            const isLastChild = index2 === config.value.children.length - 1;
            return h$4("li", { class: "dropdown-item" }, "children" in child ? [
              h$4("h4", { class: "dropdown-subtitle" }, child.link ? h$4(AutoLink, {
                config: child,
                onFocusout: () => {
                  if (
                    // no children
                    child.children.length === 0 && isLastChild
                  )
                    open.value = false;
                }
              }) : h$4("span", child.text)),
              h$4("ul", { class: "dropdown-subitem-wrapper" }, child.children.map((grandchild, grandIndex) => h$4("li", { class: "dropdown-subitem" }, h$4(AutoLink, {
                config: grandchild,
                onFocusout: () => {
                  if (
                    // last item of grandchild
                    grandIndex === child.children.length - 1 && isLastChild
                  )
                    open.value = false;
                }
              }))))
            ] : h$4(AutoLink, {
              config: child,
              onFocusout: () => {
                if (isLastChild)
                  open.value = false;
              }
            }));
          }))
        ])
      ]);
    };
  }
});
const I18nIcon = () => h$4(u$4, { name: "i18n" }, () => [
  h$4("path", {
    d: "M379.392 460.8 494.08 575.488l-42.496 102.4L307.2 532.48 138.24 701.44l-71.68-72.704L234.496 460.8l-45.056-45.056c-27.136-27.136-51.2-66.56-66.56-108.544h112.64c7.68 14.336 16.896 27.136 26.112 35.84l45.568 46.08 45.056-45.056C382.976 312.32 409.6 247.808 409.6 204.8H0V102.4h256V0h102.4v102.4h256v102.4H512c0 70.144-37.888 161.28-87.04 210.944L378.88 460.8zM576 870.4 512 1024H409.6l256-614.4H768l256 614.4H921.6l-64-153.6H576zM618.496 768h196.608L716.8 532.48 618.496 768z"
  })
]);
I18nIcon.displayName = "I18nIcon";
const resolveNavbarItem = (router, item, prefix = "") => {
  if (isString(item))
    return resolveLinkInfo(router, `${prefix}${item}`);
  if ("children" in item)
    return {
      ...item,
      ...item.link && !isLinkExternal(item.link) ? resolveLinkInfo(router, `${prefix}${item.link}`) : {},
      children: item.children.map((child) => resolveNavbarItem(router, child, `${prefix}${item.prefix || ""}`))
    };
  return {
    ...item,
    link: isLinkExternal(item.link) ? item.link : resolveLinkInfo(router, `${prefix}${item.link}`).link
  };
};
const useNavbarItems = () => {
  const themeLocaleData = useThemeLocaleData();
  const router = useRouter();
  const getNavbarItems = () => (themeLocaleData.value.navbar || []).map((item) => resolveNavbarItem(router, item));
  const navbarItems = ref(getNavbarItems());
  watch(themeLocaleData, () => {
    navbarItems.value = getNavbarItems();
  });
  return navbarItems;
};
const useNavbarLanguageDropdown = () => {
  const router = useRouter();
  const route = useRoute();
  const routeLocale = useRouteLocale();
  const siteLocale = useSiteLocaleData();
  const themeData2 = useThemeData();
  const themeLocale = useThemeLocaleData();
  return computed(() => {
    const localePaths = f$2(siteLocale.value.locales);
    const extraLocales = M$4(themeData2.value.extraLocales ?? {});
    if (localePaths.length < 2 && !extraLocales.length)
      return null;
    const { path, fullPath } = router.currentRoute.value;
    const { navbarLocales } = themeLocale.value;
    const languageDropdown = {
      text: "",
      ariaLabel: navbarLocales == null ? void 0 : navbarLocales.selectLangAriaLabel,
      children: [
        ...localePaths.map((targetLocalePath) => {
          var _a2, _b2, _c;
          const targetSiteLocale = ((_a2 = siteLocale.value.locales) == null ? void 0 : _a2[targetLocalePath]) ?? {};
          const targetThemeLocale = ((_b2 = themeData2.value.locales) == null ? void 0 : _b2[targetLocalePath]) ?? {};
          const targetLang = targetSiteLocale.lang || "";
          const text = ((_c = targetThemeLocale.navbarLocales) == null ? void 0 : _c.langName) ?? targetLang;
          let link;
          if (targetLang === siteLocale.value.lang) {
            link = path;
          } else {
            const targetLocalePage = path.replace(routeLocale.value, targetLocalePath);
            link = // try to link to the corresponding page of current page
            router.getRoutes().some((item) => item.path === targetLocalePage) ? (
              // try to keep current hash across languages
              fullPath.replace(path, targetLocalePage)
            ) : (
              // or fallback to homepage
              targetThemeLocale.home ?? targetLocalePath
            );
          }
          return {
            text,
            link
          };
        }),
        ...extraLocales.map(([text, path2]) => ({
          text,
          link: path2.replace(":route", route.path.replace(routeLocale.value, ""))
        }))
      ]
    };
    return languageDropdown;
  });
};
const useNavbarRepo = () => {
  const themeLocale = useThemeLocaleData();
  const repo = computed(() => themeLocale.value.repo || null);
  const repoLink2 = computed(() => repo.value ? Ke(repo.value) : null);
  const repoType = computed(() => repo.value ? qe(repo.value) : null);
  const repoLabel = computed(() => repoLink2.value ? themeLocale.value.repoLabel ?? (repoType.value === null ? "Source" : repoType.value) : null);
  return computed(() => {
    if (!repoLink2.value || !repoLabel.value || themeLocale.value.repoDisplay === false)
      return null;
    return {
      type: repoType.value || "Source",
      label: repoLabel.value,
      link: repoLink2.value
    };
  });
};
defineComponent({
  name: "LanguageDropdown",
  setup() {
    const dropdown = useNavbarLanguageDropdown();
    return () => dropdown.value ? h$4("div", { class: "nav-item" }, h$4(DropdownLink, { class: "i18n-dropdown", config: dropdown.value }, {
      title: () => {
        var _a2;
        return h$4(I18nIcon, {
          "aria-label": (_a2 = dropdown.value) == null ? void 0 : _a2.ariaLabel,
          style: {
            width: "1rem",
            height: "1rem",
            verticalAlign: "middle"
          }
        });
      }
    })) : null;
  }
});
const navScreenDropdown = "";
const NavScreenDropdown = defineComponent({
  name: "NavScreenDropdown",
  props: {
    /**
     * Navbar Screen Dropdown list config
     *
     * 导航栏下拉列表配置
     */
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const page2 = usePageData();
    const config = toRef(props, "config");
    const dropdownAriaLabel = computed(() => config.value.ariaLabel || config.value.text);
    const open = ref(false);
    watch(() => page2.value.path, () => {
      open.value = false;
    });
    const isLastItemOfArray = (item, arr) => arr[arr.length - 1] === item;
    return () => [
      h$4("button", {
        type: "button",
        class: ["nav-screen-dropdown-title", { active: open.value }],
        "aria-label": dropdownAriaLabel.value,
        onClick: () => {
          open.value = !open.value;
        }
      }, [
        h$4("span", { class: "title" }, [
          h$4(HopeIcon, { icon: config.value.icon }),
          props.config.text
        ]),
        h$4("span", { class: ["arrow", open.value ? "down" : "end"] })
      ]),
      h$4("ul", {
        class: ["nav-screen-dropdown", { hide: !open.value }]
      }, config.value.children.map((child) => h$4("li", { class: "dropdown-item" }, "children" in child ? [
        h$4("h4", { class: "dropdown-subtitle" }, child.link ? h$4(AutoLink, {
          config: child,
          onFocusout: () => {
            if (isLastItemOfArray(child, config.value.children) && child.children.length === 0)
              open.value = false;
          }
        }) : h$4("span", child.text)),
        h$4("ul", { class: "dropdown-subitem-wrapper" }, child.children.map((grandchild) => h$4("li", { class: "dropdown-subitem" }, h$4(AutoLink, {
          config: grandchild,
          onFocusout: () => {
            if (isLastItemOfArray(grandchild, child.children) && isLastItemOfArray(child, config.value.children))
              open.value = false;
          }
        }))))
      ] : h$4(AutoLink, {
        config: child,
        onFocusout: () => {
          if (isLastItemOfArray(child, config.value.children))
            open.value = false;
        }
      }))))
    ];
  }
});
const navScreenLinks = "";
const NavScreenLinks = defineComponent({
  name: "NavScreenLinks",
  setup() {
    const navbarConfig = useNavbarItems();
    return () => navbarConfig.value.length ? h$4("nav", { class: "nav-screen-links" }, navbarConfig.value.map((config) => h$4("div", { class: "navbar-links-item" }, "children" in config ? h$4(NavScreenDropdown, { config }) : h$4(AutoLink, { config })))) : null;
  }
});
const DarkIcon = () => h$4(u$4, { name: "dark" }, () => h$4("path", {
  d: "M524.8 938.667h-4.267a439.893 439.893 0 0 1-313.173-134.4 446.293 446.293 0 0 1-11.093-597.334A432.213 432.213 0 0 1 366.933 90.027a42.667 42.667 0 0 1 45.227 9.386 42.667 42.667 0 0 1 10.24 42.667 358.4 358.4 0 0 0 82.773 375.893 361.387 361.387 0 0 0 376.747 82.774 42.667 42.667 0 0 1 54.187 55.04 433.493 433.493 0 0 1-99.84 154.88 438.613 438.613 0 0 1-311.467 128z"
}));
DarkIcon.displayName = "DarkIcon";
const LightIcon = () => h$4(u$4, { name: "light" }, () => h$4("path", {
  d: "M952 552h-80a40 40 0 0 1 0-80h80a40 40 0 0 1 0 80zM801.88 280.08a41 41 0 0 1-57.96-57.96l57.96-58a41.04 41.04 0 0 1 58 58l-58 57.96zM512 752a240 240 0 1 1 0-480 240 240 0 0 1 0 480zm0-560a40 40 0 0 1-40-40V72a40 40 0 0 1 80 0v80a40 40 0 0 1-40 40zm-289.88 88.08-58-57.96a41.04 41.04 0 0 1 58-58l57.96 58a41 41 0 0 1-57.96 57.96zM192 512a40 40 0 0 1-40 40H72a40 40 0 0 1 0-80h80a40 40 0 0 1 40 40zm30.12 231.92a41 41 0 0 1 57.96 57.96l-57.96 58a41.04 41.04 0 0 1-58-58l58-57.96zM512 832a40 40 0 0 1 40 40v80a40 40 0 0 1-80 0v-80a40 40 0 0 1 40-40zm289.88-88.08 58 57.96a41.04 41.04 0 0 1-58 58l-57.96-58a41 41 0 0 1 57.96-57.96z"
}));
LightIcon.displayName = "LightIcon";
const AutoIcon = () => h$4(u$4, { name: "auto" }, () => h$4("path", {
  d: "M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm0-840c-198.78 0-360 161.22-360 360 0 198.84 161.22 360 360 360s360-161.16 360-360c0-198.78-161.22-360-360-360zm0 660V212c165.72 0 300 134.34 300 300 0 165.72-134.28 300-300 300z"
}));
AutoIcon.displayName = "AutoIcon";
const EnterFullScreenIcon = () => h$4(u$4, { name: "enter-fullscreen" }, () => h$4("path", {
  d: "M762.773 90.24h-497.28c-96.106 0-174.4 78.293-174.4 174.4v497.28c0 96.107 78.294 174.4 174.4 174.4h497.28c96.107 0 175.04-78.293 174.4-174.4V264.64c0-96.213-78.186-174.4-174.4-174.4zm-387.2 761.173H215.04c-21.867 0-40.427-17.92-41.067-41.066V649.92c0-22.507 17.92-40.427 40.427-40.427 11.307 0 21.227 4.694 28.48 11.947 7.253 7.253 11.947 17.92 11.947 28.48v62.293l145.28-145.28c15.893-15.893 41.813-15.893 57.706 0 15.894 15.894 15.894 41.814 0 57.707l-145.28 145.28h62.294c22.506 0 40.426 17.92 40.426 40.427s-17.173 41.066-39.68 41.066zM650.24 165.76h160.427c21.866 0 40.426 17.92 41.066 41.067v160.426c0 22.507-17.92 40.427-40.426 40.427-11.307 0-21.227-4.693-28.48-11.947-7.254-7.253-11.947-17.92-11.947-28.48v-62.186L625.6 450.347c-15.893 15.893-41.813 15.893-57.707 0-15.893-15.894-15.893-41.814 0-57.707l145.28-145.28H650.88c-22.507 0-40.427-17.92-40.427-40.427s17.174-41.173 39.787-41.173z"
}));
EnterFullScreenIcon.displayName = "EnterFullScreenIcon";
const CancelFullScreenIcon = () => h$4(u$4, { name: "cancel-fullscreen" }, () => h$4("path", {
  d: "M778.468 78.62H247.922c-102.514 0-186.027 83.513-186.027 186.027V795.08c0 102.514 83.513 186.027 186.027 186.027h530.432c102.514 0 186.71-83.513 186.026-186.027V264.647C964.494 162.02 880.981 78.62 778.468 78.62zM250.88 574.35h171.122c23.324 0 43.122 19.115 43.804 43.805v171.121c0 24.008-19.114 43.122-43.122 43.122-12.06 0-22.641-5.006-30.378-12.743s-12.743-19.115-12.743-30.379V722.83L224.597 877.91c-16.953 16.952-44.6 16.952-61.553 0-16.953-16.954-16.953-44.602 0-61.554L318.009 661.39h-66.446c-24.007 0-43.122-19.114-43.122-43.122 0-24.12 18.432-43.918 42.439-43.918zm521.899-98.873H601.657c-23.325 0-43.122-19.114-43.805-43.804V260.55c0-24.007 19.115-43.122 43.122-43.122 12.06 0 22.642 5.007 30.379 12.743s12.743 19.115 12.743 30.38v66.445l154.965-154.965c16.953-16.953 44.601-16.953 61.554 0 16.953 16.953 16.953 44.6 0 61.554L705.536 388.55h66.446c24.007 0 43.122 19.115 43.122 43.122.114 24.007-18.318 43.804-42.325 43.804z"
}));
CancelFullScreenIcon.displayName = "CancelFullScreenIcon";
const OutlookIcon = () => h$4(u$4, { name: "outlook" }, () => [
  h$4("path", {
    d: "M224 800c0 9.6 3.2 44.8 6.4 54.4 6.4 48-48 76.8-48 76.8s80 41.6 147.2 0 134.4-134.4 38.4-195.2c-22.4-12.8-41.6-19.2-57.6-19.2C259.2 716.8 227.2 761.6 224 800zM560 675.2l-32 51.2c-51.2 51.2-83.2 32-83.2 32 25.6 67.2 0 112-12.8 128 25.6 6.4 51.2 9.6 80 9.6 54.4 0 102.4-9.6 150.4-32l0 0c3.2 0 3.2-3.2 3.2-3.2 22.4-16 12.8-35.2 6.4-44.8-9.6-12.8-12.8-25.6-12.8-41.6 0-54.4 60.8-99.2 137.6-99.2 6.4 0 12.8 0 22.4 0 12.8 0 38.4 9.6 48-25.6 0-3.2 0-3.2 3.2-6.4 0-3.2 3.2-6.4 3.2-6.4 6.4-16 6.4-16 6.4-19.2 9.6-35.2 16-73.6 16-115.2 0-105.6-41.6-198.4-108.8-268.8C704 396.8 560 675.2 560 675.2zM224 419.2c0-28.8 22.4-51.2 51.2-51.2 28.8 0 51.2 22.4 51.2 51.2 0 28.8-22.4 51.2-51.2 51.2C246.4 470.4 224 448 224 419.2zM320 284.8c0-22.4 19.2-41.6 41.6-41.6 22.4 0 41.6 19.2 41.6 41.6 0 22.4-19.2 41.6-41.6 41.6C339.2 326.4 320 307.2 320 284.8zM457.6 208c0-12.8 12.8-25.6 25.6-25.6 12.8 0 25.6 12.8 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6C470.4 233.6 457.6 220.8 457.6 208zM128 505.6C128 592 153.6 672 201.6 736c28.8-60.8 112-60.8 124.8-60.8-16-51.2 16-99.2 16-99.2l316.8-422.4c-48-19.2-99.2-32-150.4-32C297.6 118.4 128 291.2 128 505.6zM764.8 86.4c-22.4 19.2-390.4 518.4-390.4 518.4-22.4 28.8-12.8 76.8 22.4 99.2l9.6 6.4c35.2 22.4 80 12.8 99.2-25.6 0 0 6.4-12.8 9.6-19.2 54.4-105.6 275.2-524.8 288-553.6 6.4-19.2-3.2-32-19.2-32C777.6 76.8 771.2 80 764.8 86.4z"
  })
]);
OutlookIcon.displayName = "OutlookIcon";
const appearanceSwitch = "";
const AppearanceSwitch = defineComponent({
  name: "AppearanceSwitch",
  setup() {
    const { config, status } = useDarkmode();
    const toggleDarkMode = () => {
      if (config.value === "switch")
        status.value = {
          light: "dark",
          dark: "auto",
          auto: "light"
        }[status.value];
      else
        status.value = status.value === "light" ? "dark" : "light";
    };
    return () => h$4("button", {
      type: "button",
      id: "appearance-switch",
      onClick: () => toggleDarkMode()
    }, [
      h$4(AutoIcon, {
        style: {
          display: status.value === "auto" ? "block" : "none"
        }
      }),
      h$4(DarkIcon, {
        style: {
          display: status.value === "dark" ? "block" : "none"
        }
      }),
      h$4(LightIcon, {
        style: {
          display: status.value === "light" ? "block" : "none"
        }
      })
    ]);
  }
});
const AppearanceMode = defineComponent({
  name: "AppearanceMode",
  setup() {
    const themeLocale = useThemeLocaleData();
    const { canToggle } = useDarkmode();
    const locale = computed(() => themeLocale.value.outlookLocales.darkmode);
    return () => canToggle.value ? h$4("div", { class: "appearance-wrapper" }, [
      h$4("label", { class: "appearance-title", for: "appearance-switch" }, locale.value),
      h$4(AppearanceSwitch)
    ]) : null;
  }
});
const themeColorPicker = "";
const THEME_COLOR_KEY = "VUEPRESS_THEME_COLOR";
const ThemeColorPicker = defineComponent({
  name: "ThemeColorPicker",
  props: {
    /**
     * Theme color picker config
     *
     * 主题色选择器配置
     */
    themeColor: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const setThemeColor = (theme = "") => {
      const classes = document.documentElement.classList;
      const themes = f$2(props.themeColor);
      if (!theme) {
        localStorage.removeItem(THEME_COLOR_KEY);
        classes.remove(...themes);
        return;
      }
      classes.remove(...themes.filter((themeColorClass) => themeColorClass !== theme));
      classes.add(theme);
      localStorage.setItem(THEME_COLOR_KEY, theme);
    };
    onMounted(() => {
      const theme = localStorage.getItem(THEME_COLOR_KEY);
      if (theme)
        setThemeColor(theme);
    });
    return () => h$4("ul", { id: "theme-color-picker" }, [
      h$4("li", h$4("span", {
        class: "theme-color",
        onClick: () => setThemeColor()
      })),
      M$4(props.themeColor).map(([color, value]) => h$4("li", h$4("span", {
        style: { background: value },
        onClick: () => setThemeColor(color)
      })))
    ]);
  }
});
const enableThemeColor = cssVariables["enableThemeColor"] === "true";
const themeColor = enableThemeColor ? _e(M$4(cssVariables).filter(([key]) => key.startsWith("theme-"))) : {};
const ThemeColor = defineComponent({
  name: "ThemeColor",
  setup() {
    const themeLocale = useThemeLocaleData();
    const locale = computed(() => themeLocale.value.outlookLocales.themeColor);
    return () => enableThemeColor ? h$4("div", { class: "theme-color-wrapper" }, [
      h$4("label", { class: "theme-color-title", for: "theme-color-picker" }, locale.value),
      h$4(ThemeColorPicker, { themeColor })
    ]) : null;
  }
});
const toggleFullScreenButton = "";
const ToggleFullScreenButton = defineComponent({
  name: "ToggleFullScreenButton",
  setup() {
    const themeLocale = useThemeLocaleData();
    const { isSupported, isFullscreen, toggle } = useFullscreen();
    const fullscreenLocale = computed(() => themeLocale.value.outlookLocales.fullscreen);
    return () => isSupported ? h$4("div", { class: "full-screen-wrapper" }, [
      h$4("label", { class: "full-screen-title", for: "full-screen-switch" }, fullscreenLocale.value),
      h$4("button", {
        type: "button",
        id: "full-screen-switch",
        class: "full-screen",
        ariaPressed: isFullscreen.value,
        onClick: () => toggle()
      }, isFullscreen.value ? h$4(CancelFullScreenIcon) : h$4(EnterFullScreenIcon))
    ]) : null;
  }
});
const OutlookSettings = defineComponent({
  name: "OutlookSettings",
  setup() {
    const themeData2 = useThemeData();
    const pure = usePure();
    const enableFullScreen = computed(() => !pure.value && themeData2.value.fullscreen);
    return () => h$4(ClientOnly, () => [
      enableThemeColor ? h$4(ThemeColor) : null,
      h$4(AppearanceMode),
      enableFullScreen.value ? h$4(ToggleFullScreenButton) : null
    ]);
  }
});
const navScreen = "";
const NavScreen = defineComponent({
  name: "NavScreen",
  props: {
    /**
     * Whether to show the screen
     *
     * 是否显示
     */
    show: Boolean
  },
  emits: ["close"],
  slots: Object,
  setup(props, { emit, slots }) {
    const page2 = usePageData();
    const { isMobile } = useWindowSize();
    const body = shallowRef();
    const isLocked = useScrollLock(body);
    onMounted(() => {
      body.value = document.body;
      watch(isMobile, (value) => {
        if (!value && props.show) {
          isLocked.value = false;
          emit("close");
        }
      });
      watch(() => page2.value.path, () => {
        isLocked.value = false;
        emit("close");
      });
    });
    onUnmounted(() => {
      isLocked.value = false;
    });
    return () => h$4(Transition, {
      name: "fade",
      onEnter: () => {
        isLocked.value = true;
      },
      onAfterLeave: () => {
        isLocked.value = false;
      }
    }, () => {
      var _a2, _b2;
      return props.show ? h$4("div", { id: "nav-screen" }, h$4("div", { class: "vp-nav-screen-container" }, [
        (_a2 = slots.before) == null ? void 0 : _a2.call(slots),
        h$4(NavScreenLinks),
        h$4("div", { class: "vp-outlook-wrapper" }, h$4(OutlookSettings)),
        (_b2 = slots.after) == null ? void 0 : _b2.call(slots)
      ])) : null;
    });
  }
});
const navbarBrand = "";
const NavbarBrand = defineComponent({
  name: "NavbarBrand",
  setup() {
    const routeLocale = useRouteLocale();
    const siteLocale = useSiteLocaleData();
    const themeLocale = useThemeLocaleData();
    const siteBrandLink = computed(() => themeLocale.value.home || routeLocale.value);
    const siteTitle = computed(() => siteLocale.value.title);
    const siteBrandTitle = computed(() => themeLocale.value.navTitle ?? siteTitle.value);
    const siteBrandLogo = computed(() => themeLocale.value.logo ? withBase(themeLocale.value.logo) : null);
    const siteBrandLogoDark = computed(() => themeLocale.value.logoDark ? withBase(themeLocale.value.logoDark) : null);
    return () => h$4(j$1, { to: siteBrandLink.value, class: "vp-brand" }, () => [
      siteBrandLogo.value ? h$4("img", {
        class: [
          "vp-nav-logo",
          { light: Boolean(siteBrandLogoDark.value) }
        ],
        src: siteBrandLogo.value,
        alt: siteTitle.value
      }) : null,
      siteBrandLogoDark.value ? h$4("img", {
        class: ["vp-nav-logo dark"],
        src: siteBrandLogoDark.value,
        alt: siteTitle.value
      }) : null,
      siteBrandTitle.value ? h$4("span", {
        class: [
          "vp-site-name",
          {
            "hide-in-pad": siteBrandLogo.value && themeLocale.value.hideSiteNameOnMobile !== false
          }
        ]
      }, siteBrandTitle.value) : null
    ]);
  }
});
const navbarLinks = "";
const NavbarLinks = defineComponent({
  name: "NavbarLinks",
  setup() {
    const navbarConfig = useNavbarItems();
    return () => navbarConfig.value.length ? h$4("nav", { class: "vp-nav-links" }, navbarConfig.value.map((config) => h$4("div", { class: "nav-item hide-in-mobile" }, "children" in config ? h$4(DropdownLink, { config }) : h$4(AutoLink, { config })))) : null;
  }
});
const repoLink = "";
const RepoLink = defineComponent({
  name: "RepoLink",
  components: { BitbucketIcon: D$1, GiteeIcon: O$2, GitHubIcon: B$1, GitLabIcon: H$2, SourceIcon: G$2 },
  setup() {
    const repo = useNavbarRepo();
    return () => repo.value ? h$4("div", { class: "nav-item vp-repo" }, h$4("a", {
      class: "vp-repo-link",
      href: repo.value.link,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": repo.value.label
    }, h$4(resolveComponent(`${repo.value.type}Icon`), {
      style: {
        width: "1.25rem",
        height: "1.25rem",
        verticalAlign: "middle"
      }
    }))) : null;
  }
});
const toggleNavbarButton = "";
const ToggleNavbarButton = ({ active = false }, { emit }) => h$4("button", {
  type: "button",
  class: ["vp-toggle-navbar-button", { "is-active": active }],
  "aria-label": "Toggle Navbar",
  "aria-expanded": active,
  "aria-controls": "nav-screen",
  onClick: () => emit("toggle")
}, h$4("span", [
  h$4("span", { class: "vp-top" }),
  h$4("span", { class: "vp-middle" }),
  h$4("span", { class: "vp-bottom" })
]));
ToggleNavbarButton.displayName = "ToggleNavbarButton";
const toggleSidebarButton = "";
const ToggleSidebarButton = (_2, { emit }) => h$4("button", {
  type: "button",
  class: "vp-toggle-sidebar-button",
  title: "Toggle Sidebar",
  onClick: () => emit("toggle")
}, h$4("span", { class: "icon" }));
ToggleSidebarButton.displayName = "ToggleSidebarButton";
ToggleSidebarButton.emits = ["toggle"];
const outlookButton = "";
const OutlookButton = defineComponent({
  name: "OutlookButton",
  setup() {
    const { isSupported } = useFullscreen();
    const themeData2 = useThemeData();
    const pure = usePure();
    const page2 = usePageData();
    const { canToggle } = useDarkmode();
    const open = ref(false);
    const enableFullScreen = computed(() => !pure.value && themeData2.value.fullscreen && isSupported);
    watch(() => page2.value.path, () => {
      open.value = false;
    });
    return () => canToggle.value || enableFullScreen.value || enableThemeColor ? h$4(
      "div",
      { class: "nav-item hide-in-mobile" },
      // only AppearanceSwitch is enabled
      canToggle.value && !enableFullScreen.value && !enableThemeColor ? h$4(AppearanceSwitch) : (
        // only FullScreen is enabled
        enableFullScreen.value && !canToggle.value && !enableThemeColor ? h$4(ToggleFullScreenButton) : h$4("button", {
          type: "button",
          class: ["outlook-button", { open: open.value }],
          tabindex: "-1",
          "aria-hidden": true
        }, [
          h$4(OutlookIcon),
          h$4("div", { class: "outlook-dropdown" }, h$4(OutlookSettings))
        ])
      )
    ) : null;
  }
});
const navbar = "";
const Navbar = defineComponent({
  name: "NavBar",
  emits: ["toggleSidebar"],
  slots: Object,
  setup(_props, { emit, slots }) {
    const themeLocale = useThemeLocaleData();
    const { isMobile } = useWindowSize();
    const showScreen = ref(false);
    const autoHide = computed(() => {
      const { navbarAutoHide = "mobile" } = themeLocale.value;
      return navbarAutoHide !== "none" && (navbarAutoHide === "always" || isMobile.value);
    });
    const navbarLayout = computed(() => themeLocale.value.navbarLayout || {
      start: ["Brand"],
      center: ["Links"],
      end: ["Language", "Repo", "Outlook", "Search"]
    });
    const navbarComponentMap = {
      Brand: NavbarBrand,
      Language: e,
      Links: NavbarLinks,
      Repo: RepoLink,
      Outlook: OutlookButton,
      Search: Qe("Docsearch") ? resolveComponent("Docsearch") : Qe("SearchBox") ? resolveComponent("SearchBox") : e
    };
    const getNavbarComponent = (component) => navbarComponentMap[component] ?? (Qe(component) ? resolveComponent(component) : e);
    return () => {
      var _a2, _b2, _c, _d, _e2, _f;
      return [
        h$4("header", {
          id: "navbar",
          class: [
            "vp-navbar",
            {
              "auto-hide": autoHide.value,
              "hide-icon": themeLocale.value.navbarIcon === false
            }
          ]
        }, [
          h$4("div", { class: "vp-navbar-start" }, [
            h$4(ToggleSidebarButton, {
              onToggle: () => {
                if (showScreen.value)
                  showScreen.value = false;
                emit("toggleSidebar");
              }
            }),
            (_a2 = slots.startBefore) == null ? void 0 : _a2.call(slots),
            (navbarLayout.value.start || []).map((item) => h$4(getNavbarComponent(item))),
            (_b2 = slots.startAfter) == null ? void 0 : _b2.call(slots)
          ]),
          h$4("div", { class: "vp-navbar-center" }, [
            (_c = slots.centerBefore) == null ? void 0 : _c.call(slots),
            (navbarLayout.value.center || []).map((item) => h$4(getNavbarComponent(item))),
            (_d = slots.centerAfter) == null ? void 0 : _d.call(slots)
          ]),
          h$4("div", { class: "vp-navbar-end" }, [
            (_e2 = slots.endBefore) == null ? void 0 : _e2.call(slots),
            (navbarLayout.value.end || []).map((item) => h$4(getNavbarComponent(item))),
            (_f = slots.endAfter) == null ? void 0 : _f.call(slots),
            h$4(ToggleNavbarButton, {
              active: showScreen.value,
              onToggle: () => {
                showScreen.value = !showScreen.value;
              }
            })
          ])
        ]),
        h$4(NavScreen, {
          show: showScreen.value,
          onClose: () => {
            showScreen.value = false;
          }
        }, {
          before: () => {
            var _a3;
            return (_a3 = slots.screenTop) == null ? void 0 : _a3.call(slots);
          },
          after: () => {
            var _a3;
            return (_a3 = slots.screenBottom) == null ? void 0 : _a3.call(slots);
          }
        })
      ];
    };
  }
});
const sidebarChild = "";
const SidebarChild = defineComponent({
  name: "SidebarChild",
  props: {
    /**
     * Sidebar item config
     *
     * 侧边栏项目配置
     */
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();
    return () => [
      renderItem(props.config, {
        class: [
          "vp-sidebar-link",
          `vp-sidebar-${props.config.type}`,
          { active: isActiveSidebarItem(route, props.config, true) }
        ],
        exact: true
      }),
      renderChildren$1(props.config.children)
    ];
  }
});
const sidebarGroup = "";
const SidebarGroup = defineComponent({
  name: "SidebarGroup",
  props: {
    /**
     * Sidebar group item config
     *
     * 侧边栏分组配置
     */
    config: {
      type: Object,
      required: true
    },
    /**
     * Whether current group is open
     *
     * 当前分组是否展开
     */
    open: {
      type: Boolean,
      required: true
    }
  },
  emits: ["toggle"],
  setup(props, { emit }) {
    const route = useRoute();
    const active = computed(() => isActiveSidebarItem(route, props.config));
    const exact = computed(() => isActiveSidebarItem(route, props.config, true));
    return () => {
      const { collapsible, children = [], icon, prefix, link, text } = props.config;
      return h$4("section", { class: "vp-sidebar-group" }, [
        h$4(collapsible ? "button" : "p", {
          class: [
            "vp-sidebar-heading",
            {
              clickable: collapsible || link,
              exact: exact.value,
              active: active.value
            }
          ],
          ...collapsible ? {
            type: "button",
            onClick: () => emit("toggle"),
            onKeydown: (event) => {
              if (event.key === "Enter")
                emit("toggle");
            }
          } : {}
        }, [
          // icon
          h$4(HopeIcon, { icon }),
          // title
          link ? h$4(AutoLink, {
            class: "vp-sidebar-title",
            config: { text, link },
            noExternalLinkIcon: true
          }) : h$4("span", { class: "vp-sidebar-title" }, text),
          // arrow
          collapsible ? h$4("span", { class: ["vp-arrow", props.open ? "down" : "end"] }) : null
        ]),
        props.open || !collapsible ? h$4(SidebarLinks, { key: prefix, config: children }) : null
      ]);
    };
  }
});
const sidebarLinks = "";
const SidebarLinks = defineComponent({
  name: "SidebarLinks",
  props: {
    /**
     * Sidebar links config
     *
     * 侧边栏链接配置
     */
    config: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();
    const openGroupIndex = ref(-1);
    const toggleGroup = (index2) => {
      openGroupIndex.value = index2 === openGroupIndex.value ? -1 : index2;
    };
    watch(() => route.path, () => {
      const index2 = props.config.findIndex((item) => isMatchedSidebarItem(route, item));
      openGroupIndex.value = index2;
    }, { immediate: true, flush: "post" });
    return () => h$4("ul", { class: "vp-sidebar-links" }, props.config.map((config, index2) => h$4("li", config.type === "group" ? h$4(SidebarGroup, {
      config,
      open: index2 === openGroupIndex.value,
      onToggle: () => toggleGroup(index2)
    }) : h$4(SidebarChild, { config }))));
  }
});
const sidebar = "";
const Sidebar = defineComponent({
  name: "SideBar",
  slots: Object,
  setup(_props, { slots }) {
    const route = useRoute();
    const themeLocale = useThemeLocaleData();
    const sidebarItems = useSidebarItems();
    const sidebar2 = shallowRef();
    onMounted(() => {
      watch(() => route.hash, (hash) => {
        const activeSidebarItem = document.querySelector(`.vp-sidebar a.vp-sidebar-link[href="${route.path}${hash}"]`);
        if (!activeSidebarItem)
          return;
        const { top: sidebarTop, height: sidebarHeight } = sidebar2.value.getBoundingClientRect();
        const { top: activeSidebarItemTop, height: activeSidebarItemHeight } = activeSidebarItem.getBoundingClientRect();
        if (activeSidebarItemTop < sidebarTop)
          activeSidebarItem.scrollIntoView(true);
        else if (activeSidebarItemTop + activeSidebarItemHeight > sidebarTop + sidebarHeight)
          activeSidebarItem.scrollIntoView(false);
      });
    });
    return () => {
      var _a2, _b2, _c;
      return h$4("aside", {
        ref: sidebar2,
        id: "sidebar",
        class: [
          "vp-sidebar",
          { "hide-icon": themeLocale.value.sidebarIcon === false }
        ]
      }, [
        (_a2 = slots.top) == null ? void 0 : _a2.call(slots),
        ((_b2 = slots.default) == null ? void 0 : _b2.call(slots)) || h$4(SidebarLinks, { config: sidebarItems.value }),
        (_c = slots.bottom) == null ? void 0 : _c.call(slots)
      ]);
    };
  }
});
const common = "";
const CommonWrapper = defineComponent({
  name: "CommonWrapper",
  props: {
    /**
     * Extra class of container
     *
     * 容器额外类名
     */
    containerClass: { type: String, default: "" },
    /**
     * Whether disable navbar
     *
     * 是否禁用导航栏
     */
    noNavbar: Boolean,
    /**
     * Whether disable sidebar
     *
     * 是否禁用侧边栏
     */
    noSidebar: Boolean,
    /**
     * Whether disable toc
     */
    noToc: Boolean
  },
  slots: Object,
  setup(props, { slots }) {
    const router = useRouter();
    const page2 = usePageData();
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const { isMobile, isPC } = useWindowSize();
    const [isMobileSidebarOpen, toggleMobileSidebar] = useToggle(false);
    const [isDesktopSidebarCollapsed, toggleDesktopSidebar] = useToggle(false);
    const sidebarItems = useSidebarItems();
    const hideNavbar = ref(false);
    const enableNavbar = computed(() => {
      if (props.noNavbar)
        return false;
      if (frontmatter.value.navbar === false || themeLocale.value.navbar === false)
        return false;
      return Boolean(page2.value.title || themeLocale.value.logo || themeLocale.value.repo || themeLocale.value.navbar);
    });
    const enableSidebar = computed(() => {
      if (props.noSidebar)
        return false;
      return frontmatter.value.sidebar !== false && sidebarItems.value.length !== 0 && !frontmatter.value.home;
    });
    const enableToc = computed(() => props.noToc || frontmatter.value.home ? false : frontmatter.value.toc || themeLocale.value.toc !== false && frontmatter.value.toc !== false);
    const touchStart = { x: 0, y: 0 };
    const onTouchStart = (e2) => {
      touchStart.x = e2.changedTouches[0].clientX;
      touchStart.y = e2.changedTouches[0].clientY;
    };
    const onTouchEnd = (e2) => {
      const dx = e2.changedTouches[0].clientX - touchStart.x;
      const dy = e2.changedTouches[0].clientY - touchStart.y;
      if (
        // horizontal swipe
        Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > 40
      )
        if (dx > 0 && touchStart.x <= 80)
          toggleMobileSidebar(true);
        else
          toggleMobileSidebar(false);
    };
    const getScrollTop = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    let lastDistance = 0;
    useEventListener("scroll", useThrottleFn(() => {
      const distance = getScrollTop();
      if (distance <= 58 || distance < lastDistance)
        hideNavbar.value = false;
      else if (lastDistance + 200 < distance && !isMobileSidebarOpen.value)
        hideNavbar.value = true;
      lastDistance = distance;
    }, 300, true));
    watch(isMobile, (value) => {
      if (!value)
        toggleMobileSidebar(false);
    });
    onMounted(() => {
      const isLocked = useScrollLock(document.body);
      watch(isMobileSidebarOpen, (value) => {
        isLocked.value = value;
      });
      const unregisterRouterHook = router.afterEach(() => {
        toggleMobileSidebar(false);
      });
      onUnmounted(() => {
        isLocked.value = false;
        unregisterRouterHook();
      });
    });
    return () => h$4(Qe("GlobalEncrypt") ? resolveComponent("GlobalEncrypt") : oe, () => h$4("div", {
      class: [
        "theme-container",
        // classes
        {
          "no-navbar": !enableNavbar.value,
          "no-sidebar": !enableSidebar.value && !(slots.sidebar || slots.sidebarTop || slots.sidebarBottom),
          "has-toc": enableToc.value,
          "hide-navbar": hideNavbar.value,
          "sidebar-collapsed": !isMobile.value && !isPC.value && isDesktopSidebarCollapsed.value,
          "sidebar-open": isMobile.value && isMobileSidebarOpen.value
        },
        props.containerClass,
        frontmatter.value.containerClass || ""
      ],
      onTouchStart,
      onTouchEnd
    }, [
      // navbar
      enableNavbar.value ? h$4(Navbar, { onToggleSidebar: () => toggleMobileSidebar() }, {
        startBefore: () => {
          var _a2;
          return (_a2 = slots.navbarStartBefore) == null ? void 0 : _a2.call(slots);
        },
        startAfter: () => {
          var _a2;
          return (_a2 = slots.navbarStartAfter) == null ? void 0 : _a2.call(slots);
        },
        centerBefore: () => {
          var _a2;
          return (_a2 = slots.navbarCenterBefore) == null ? void 0 : _a2.call(slots);
        },
        centerAfter: () => {
          var _a2;
          return (_a2 = slots.navbarCenterAfter) == null ? void 0 : _a2.call(slots);
        },
        endBefore: () => {
          var _a2;
          return (_a2 = slots.navbarEndBefore) == null ? void 0 : _a2.call(slots);
        },
        endAfter: () => {
          var _a2;
          return (_a2 = slots.navbarEndAfter) == null ? void 0 : _a2.call(slots);
        },
        screenTop: () => {
          var _a2;
          return (_a2 = slots.navScreenTop) == null ? void 0 : _a2.call(slots);
        },
        screenBottom: () => {
          var _a2;
          return (_a2 = slots.navScreenBottom) == null ? void 0 : _a2.call(slots);
        }
      }) : null,
      // sidebar mask
      h$4(Transition, { name: "fade" }, () => isMobileSidebarOpen.value ? h$4("div", {
        class: "vp-sidebar-mask",
        onClick: () => toggleMobileSidebar(false)
      }) : null),
      // toggle sidebar button
      h$4(Transition, { name: "fade" }, () => isMobile.value ? null : h$4("div", {
        class: "toggle-sidebar-wrapper",
        onClick: () => toggleDesktopSidebar()
      }, h$4("span", {
        class: [
          "arrow",
          isDesktopSidebarCollapsed.value ? "end" : "start"
        ]
      }))),
      // sidebar
      h$4(Sidebar, {}, {
        ...slots.sidebar ? {
          default: () => slots.sidebar()
        } : {},
        top: () => {
          var _a2;
          return (_a2 = slots.sidebarTop) == null ? void 0 : _a2.call(slots);
        },
        bottom: () => {
          var _a2;
          return (_a2 = slots.sidebarBottom) == null ? void 0 : _a2.call(slots);
        }
      }),
      slots.default(),
      h$4(PageFooter)
    ]));
  }
});
const featurePanel = "";
const FeaturePanel = (props, { slots }) => {
  var _a2, _b2;
  const { bgImage, bgImageDark, bgImageStyle, color, description, image, imageDark, header, features = [] } = props;
  return h$4("div", {
    class: "vp-feature-wrapper"
  }, [
    bgImage ? h$4("div", {
      class: ["vp-feature-bg", { light: bgImageDark }],
      style: [{ "background-image": `url(${bgImage})` }, bgImageStyle]
    }) : null,
    bgImageDark ? h$4("div", {
      class: "vp-feature-bg dark",
      style: [
        { "background-image": `url(${bgImageDark})` },
        bgImageStyle
      ]
    }) : null,
    h$4("div", {
      class: "vp-feature",
      style: color ? { color } : {}
    }, [
      ((_a2 = slots.image) == null ? void 0 : _a2.call(slots, props)) || [
        image ? h$4("img", {
          class: ["vp-feature-image", { light: imageDark }],
          src: withBase(image),
          alt: header
        }) : null,
        imageDark ? h$4("img", {
          class: "vp-feature-image dark",
          src: withBase(imageDark),
          alt: header
        }) : null
      ],
      ((_b2 = slots.info) == null ? void 0 : _b2.call(slots, props)) || [
        header ? h$4("h2", { class: "vp-feature-header" }, header) : null,
        description ? h$4("p", {
          class: "vp-feature-description",
          innerHTML: description
        }) : null
      ],
      features.length ? h$4("div", { class: "vp-features" }, features.map(({ icon, title, details, link }) => {
        const children = [
          h$4("h3", { class: "vp-feature-title" }, [
            h$4(HopeIcon, { icon }),
            h$4("span", { innerHTML: title })
          ]),
          h$4("p", {
            class: "vp-feature-details",
            innerHTML: details
          })
        ];
        return link ? isLinkExternal(link) ? h$4("a", {
          class: "vp-feature-item link",
          href: link,
          role: "navigation",
          "aria-label": title,
          target: "_blank"
        }, children) : h$4(j$1, {
          class: "vp-feature-item link",
          to: link,
          role: "navigation",
          "aria-label": title
        }, () => children) : h$4("div", { class: "vp-feature-item" }, children);
      })) : null
    ])
  ]);
};
FeaturePanel.displayName = "FeaturePanel";
const DropTransition = defineComponent({
  name: "DropTransition",
  props: {
    /**
     * @description Transition type
     */
    type: {
      type: String,
      default: "single"
    },
    /**
     * @description Transition delay
     */
    delay: { type: Number, default: 0 },
    /**
     * @description Transition duration
     */
    duration: { type: Number, default: 0.25 },
    /**
     * @description appear
     */
    appear: Boolean
  },
  slots: Object,
  setup(props, { slots }) {
    const setStyle = (item) => {
      item.style.transition = `transform ${props.duration}s ease-in-out ${props.delay}s, opacity ${props.duration}s ease-in-out ${props.delay}s`;
      item.style.transform = "translateY(-20px)";
      item.style.opacity = "0";
    };
    const unsetStyle = (item) => {
      item.style.transform = "translateY(0)";
      item.style.opacity = "1";
    };
    return () => h$4(
      // @ts-ignore
      props.type === "single" ? Transition : TransitionGroup,
      {
        name: "drop",
        appear: props.appear,
        onAppear: setStyle,
        onAfterAppear: unsetStyle,
        onEnter: setStyle,
        onAfterEnter: unsetStyle,
        onBeforeLeave: setStyle
      },
      () => slots.default()
    );
  }
});
const heroInfo = "";
const HeroInfo = defineComponent({
  name: "HeroInfo",
  slots: Object,
  setup(_props, { slots }) {
    const frontmatter = usePageFrontmatter();
    const siteLocale = useSiteLocaleData();
    const isFullScreen = computed(() => frontmatter.value.heroFullScreen ?? false);
    const heroInfo2 = computed(() => {
      const { heroText, tagline } = frontmatter.value;
      return {
        text: heroText ?? siteLocale.value.title ?? "Hello",
        tagline: tagline ?? siteLocale.value.description ?? "",
        isFullScreen: isFullScreen.value
      };
    });
    const heroImage = computed(() => {
      const { heroText, heroImage: heroImage2, heroImageDark, heroAlt, heroImageStyle } = frontmatter.value;
      return {
        image: heroImage2 ? withBase(heroImage2) : null,
        imageDark: heroImageDark ? withBase(heroImageDark) : null,
        heroStyle: heroImageStyle,
        alt: heroAlt || heroText || "hero image",
        isFullScreen: isFullScreen.value
      };
    });
    const bgInfo = computed(() => {
      const { bgImage, bgImageDark, bgImageStyle } = frontmatter.value;
      return {
        image: a$6(bgImage) ? withBase(bgImage) : null,
        imageDark: a$6(bgImageDark) ? withBase(bgImageDark) : null,
        bgStyle: bgImageStyle,
        isFullScreen: isFullScreen.value
      };
    });
    const actions = computed(() => frontmatter.value.actions ?? []);
    return () => {
      var _a2, _b2, _c;
      return h$4("header", { class: ["vp-hero-info-wrapper", { fullscreen: isFullScreen.value }] }, [
        ((_a2 = slots.heroBg) == null ? void 0 : _a2.call(slots, bgInfo.value)) || [
          bgInfo.value.image ? h$4("div", {
            class: ["vp-hero-mask", { light: bgInfo.value.imageDark }],
            style: [
              { "background-image": `url(${bgInfo.value.image})` },
              bgInfo.value.bgStyle
            ]
          }) : null,
          bgInfo.value.imageDark ? h$4("div", {
            class: "vp-hero-mask dark",
            style: [
              {
                "background-image": `url(${bgInfo.value.imageDark})`
              },
              bgInfo.value.bgStyle
            ]
          }) : null
        ],
        h$4("div", { class: "vp-hero-info" }, [
          ((_b2 = slots.heroImage) == null ? void 0 : _b2.call(slots, heroImage.value)) || h$4(DropTransition, { appear: true, type: "group" }, () => [
            heroImage.value.image ? h$4("img", {
              key: "light",
              class: [
                "vp-hero-image",
                { light: heroImage.value.imageDark }
              ],
              style: heroImage.value.heroStyle,
              src: heroImage.value.image,
              alt: heroImage.value.alt
            }) : null,
            heroImage.value.imageDark ? h$4("img", {
              key: "dark",
              class: "vp-hero-image dark",
              style: heroImage.value.heroStyle,
              src: heroImage.value.imageDark,
              alt: heroImage.value.alt
            }) : null
          ]),
          ((_c = slots.heroInfo) == null ? void 0 : _c.call(slots, heroInfo2.value)) ?? h$4("div", { class: "vp-hero-infos" }, [
            heroInfo2.value.text ? h$4(DropTransition, { appear: true, delay: 0.04 }, () => h$4("h1", { id: "main-title" }, heroInfo2.value.text)) : null,
            heroInfo2.value.tagline ? h$4(DropTransition, { appear: true, delay: 0.08 }, () => h$4("p", {
              class: "vp-description",
              innerHTML: heroInfo2.value.tagline
            })) : null,
            actions.value.length ? h$4(DropTransition, { appear: true, delay: 0.12 }, () => h$4("p", { class: "vp-actions" }, actions.value.map((action) => h$4(AutoLink, {
              class: ["vp-action", action.type || "default"],
              config: action,
              noExternalLinkIcon: true
            })))) : null
          ])
        ])
      ]);
    };
  }
});
const highlightPanel = "";
const HighlightPanel = (props, { slots }) => {
  var _a2, _b2, _c;
  const { bgImage, bgImageDark, bgImageStyle, color, description, image, imageDark, header, highlights = [], type = "un-order" } = props;
  return h$4("div", {
    class: "vp-highlight-wrapper",
    style: color ? { color } : {}
  }, [
    bgImage ? h$4("div", {
      class: ["vp-highlight-bg", { light: bgImageDark }],
      style: [{ "background-image": `url(${bgImage})` }, bgImageStyle]
    }) : null,
    bgImageDark ? h$4("div", {
      class: "vp-highlight-bg dark",
      style: [
        { "background-image": `url(${bgImageDark})` },
        bgImageStyle
      ]
    }) : null,
    h$4("div", { class: "vp-highlight" }, [
      ((_a2 = slots.image) == null ? void 0 : _a2.call(slots, props)) || [
        image ? h$4("img", {
          class: ["vp-highlight-image", { light: imageDark }],
          src: withBase(image),
          alt: header
        }) : null,
        imageDark ? h$4("img", {
          class: "vp-highlight-image dark",
          src: withBase(imageDark),
          alt: header
        }) : null
      ],
      ((_b2 = slots.info) == null ? void 0 : _b2.call(slots, props)) || [
        h$4("div", { class: "vp-highlight-info-wrapper" }, h$4("div", { class: "vp-highlight-info" }, [
          header ? h$4("h2", {
            class: "vp-highlight-header",
            innerHTML: header
          }) : null,
          description ? h$4("p", {
            class: "vp-highlight-description",
            innerHTML: description
          }) : null,
          ((_c = slots.highlights) == null ? void 0 : _c.call(slots, highlights)) || h$4(type === "order" ? "ol" : type === "no-order" ? "dl" : "ul", { class: "vp-highlights" }, highlights.map(({ icon, title, details, link }) => {
            const children = [
              h$4(type === "no-order" ? "dt" : "h3", { class: "vp-highlight-title" }, [
                icon ? h$4(HopeIcon, {
                  class: "vp-highlight-icon",
                  icon
                }) : null,
                h$4("span", { innerHTML: title })
              ]),
              details ? h$4(type === "no-order" ? "dd" : "p", {
                class: "vp-highlight-details",
                innerHTML: details
              }) : null
            ];
            return h$4(type === "no-order" ? "div" : "li", {
              class: ["vp-highlight-item-wrapper", { link }]
            }, link ? ye(link) ? h$4("a", {
              class: "vp-highlight-item link",
              href: link,
              role: "navigation",
              "aria-label": title,
              target: "_blank"
            }, children) : h$4(j$1, {
              class: "vp-highlight-item link",
              to: link,
              role: "navigation",
              "aria-label": title
            }, () => children) : h$4("div", { class: "vp-highlight-item" }, children));
          }))
        ]))
      ]
    ])
  ]);
};
HighlightPanel.displayName = "HighlightPanel";
const MarkdownContent = ({ custom }) => h$4(Content, { class: ["theme-hope-content", { custom }] });
MarkdownContent.displayName = "MarkdownContent";
MarkdownContent.props = {
  custom: Boolean
};
const homePage = "";
const HomePage = defineComponent({
  name: "HomePage",
  slots: Object,
  setup(_props, { slots }) {
    const pure = usePure();
    const frontmatter = usePageFrontmatter();
    const features = computed(() => {
      const { features: features2 } = frontmatter.value;
      return isArray(features2) ? features2 : null;
    });
    const highlights = computed(() => {
      const { highlights: highlights2 } = frontmatter.value;
      if (isArray(highlights2))
        return highlights2;
      return null;
    });
    return () => {
      var _a2, _b2, _c, _d;
      return h$4("main", {
        id: "main-content",
        class: ["vp-project-home ", { pure: pure.value }],
        "aria-labelledby": frontmatter.value.heroText === null ? "" : "main-title"
      }, [
        (_a2 = slots.top) == null ? void 0 : _a2.call(slots),
        h$4(HeroInfo),
        ((_b2 = highlights.value) == null ? void 0 : _b2.map((highlight) => "features" in highlight ? h$4(FeaturePanel, highlight) : h$4(HighlightPanel, highlight))) || (features.value ? h$4(DropTransition, { appear: true, delay: 0.24 }, () => h$4(FeaturePanel, { features: features.value })) : null),
        (_c = slots.center) == null ? void 0 : _c.call(slots),
        h$4(DropTransition, {
          appear: true,
          delay: 0.32
        }, () => h$4(MarkdownContent)),
        (_d = slots.bottom) == null ? void 0 : _d.call(slots)
      ]);
    };
  }
});
const breadcrumb = "";
const BreadCrumb = defineComponent({
  name: "BreadCrumb",
  setup() {
    const router = useRouter();
    const page2 = usePageData();
    const routeLocale = useRouteLocale();
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const config = shallowRef([]);
    const enable = computed(() => (frontmatter.value.breadcrumb || frontmatter.value.breadcrumb !== false && themeLocale.value.breadcrumb !== false) && config.value.length > 1);
    const iconEnable = computed(() => frontmatter.value.breadcrumbIcon || frontmatter.value.breadcrumbIcon !== false && themeLocale.value.breadcrumbIcon !== false);
    const getBreadCrumbConfig = () => {
      const routes = router.getRoutes();
      const breadcrumbConfig = getAncestorLinks(page2.value.path, routeLocale.value).map(({ link, name }) => {
        const route = routes.find((route2) => route2.path === link);
        if (route) {
          const { meta, path } = w(router, route.path);
          return {
            title: meta[ArticleInfoType.shortTitle] || meta[ArticleInfoType.title] || name,
            icon: meta[ArticleInfoType.icon],
            path
          };
        }
        return null;
      }).filter((item) => item !== null);
      if (breadcrumbConfig.length > 1)
        config.value = breadcrumbConfig;
    };
    onMounted(() => {
      getBreadCrumbConfig();
      watch(() => page2.value.path, getBreadCrumbConfig);
    });
    return () => h$4("nav", { class: ["vp-breadcrumb", { disable: !enable.value }] }, enable.value ? h$4("ol", {
      vocab: "https://schema.org/",
      typeof: "BreadcrumbList"
    }, config.value.map((item, index2) => h$4("li", {
      class: { "is-active": config.value.length - 1 === index2 },
      property: "itemListElement",
      typeof: "ListItem"
    }, [
      h$4(j$1, {
        to: item.path,
        property: "item",
        typeof: "WebPage"
      }, () => [
        // icon
        iconEnable.value ? h$4(HopeIcon, { icon: item.icon }) : null,
        // text
        h$4("span", { property: "name" }, item.title || "Unknown")
      ]),
      // meta
      h$4("meta", { property: "position", content: index2 + 1 })
    ]))) : []);
  }
});
const pageNav = "";
const resolveFromFrontmatterConfig = (conf) => {
  const router = useRouter();
  if (conf === false)
    return false;
  if (isString(conf))
    return resolveLinkInfo(router, conf, true);
  if (isPlainObject(conf))
    return conf;
  return null;
};
const resolveFromSidebarItems = (sidebarItems, currentPath, offset) => {
  const index2 = sidebarItems.findIndex((item) => item.link === currentPath);
  if (index2 !== -1) {
    const targetItem = sidebarItems[index2 + offset];
    if (!(targetItem == null ? void 0 : targetItem.link))
      return null;
    return targetItem;
  }
  for (const item of sidebarItems)
    if (item.children) {
      const childResult = resolveFromSidebarItems(item.children, currentPath, offset);
      if (childResult)
        return childResult;
    }
  return null;
};
const PageNav = defineComponent({
  name: "PageNav",
  setup() {
    const themeLocale = useThemeLocaleData();
    const frontmatter = usePageFrontmatter();
    const sidebarItems = useSidebarItems();
    const page2 = usePageData();
    const navigate = useNavigate();
    const prevNavLink = computed(() => {
      const prevConfig = resolveFromFrontmatterConfig(frontmatter.value.prev);
      return prevConfig === false ? null : prevConfig || (themeLocale.value.prevLink === false ? null : resolveFromSidebarItems(sidebarItems.value, page2.value.path, -1));
    });
    const nextNavLink = computed(() => {
      const nextConfig = resolveFromFrontmatterConfig(frontmatter.value.next);
      return nextConfig === false ? null : nextConfig || (themeLocale.value.nextLink === false ? null : resolveFromSidebarItems(sidebarItems.value, page2.value.path, 1));
    });
    useEventListener("keydown", (event) => {
      if (event.altKey) {
        if (event.key === "ArrowRight") {
          if (nextNavLink.value) {
            navigate(nextNavLink.value.link);
            event.preventDefault();
          }
        } else if (event.key === "ArrowLeft") {
          if (prevNavLink.value) {
            navigate(prevNavLink.value.link);
            event.preventDefault();
          }
        }
      }
    });
    return () => prevNavLink.value || nextNavLink.value ? h$4("nav", { class: "vp-page-nav" }, [
      prevNavLink.value ? h$4(AutoLink, { class: "prev", config: prevNavLink.value }, () => {
        var _a2, _b2;
        return [
          h$4("div", { class: "hint" }, [
            h$4("span", { class: "arrow start" }),
            themeLocale.value.metaLocales.prev
          ]),
          h$4("div", { class: "link" }, [
            h$4(HopeIcon, {
              icon: (_a2 = prevNavLink.value) == null ? void 0 : _a2.icon
            }),
            (_b2 = prevNavLink.value) == null ? void 0 : _b2.text
          ])
        ];
      }) : null,
      nextNavLink.value ? h$4(AutoLink, { class: "next", config: nextNavLink.value }, () => {
        var _a2, _b2;
        return [
          h$4("div", { class: "hint" }, [
            themeLocale.value.metaLocales.next,
            h$4("span", { class: "arrow end" })
          ]),
          h$4("div", { class: "link" }, [
            (_a2 = nextNavLink.value) == null ? void 0 : _a2.text,
            h$4(HopeIcon, {
              icon: (_b2 = nextNavLink.value) == null ? void 0 : _b2.icon
            })
          ])
        ];
      }) : null
    ]) : null;
  }
});
const AuthorIcon = () => h$4(u$4, { name: "author" }, () => h$4("path", {
  d: "M649.6 633.6c86.4-48 147.2-144 147.2-249.6 0-160-128-288-288-288s-288 128-288 288c0 108.8 57.6 201.6 147.2 249.6-121.6 48-214.4 153.6-240 288-3.2 9.6 0 19.2 6.4 25.6 3.2 9.6 12.8 12.8 22.4 12.8h704c9.6 0 19.2-3.2 25.6-12.8 6.4-6.4 9.6-16 6.4-25.6-25.6-134.4-121.6-240-243.2-288z"
}));
AuthorIcon.displayName = "AuthorIcon";
const CalendarIcon = () => h$4(u$4, { name: "calendar" }, () => h$4("path", {
  d: "M716.4 110.137c0-18.753-14.72-33.473-33.472-33.473-18.753 0-33.473 14.72-33.473 33.473v33.473h66.993v-33.473zm-334.87 0c0-18.753-14.72-33.473-33.473-33.473s-33.52 14.72-33.52 33.473v33.473h66.993v-33.473zm468.81 33.52H716.4v100.465c0 18.753-14.72 33.473-33.472 33.473a33.145 33.145 0 01-33.473-33.473V143.657H381.53v100.465c0 18.753-14.72 33.473-33.473 33.473a33.145 33.145 0 01-33.473-33.473V143.657H180.6A134.314 134.314 0 0046.66 277.595v535.756A134.314 134.314 0 00180.6 947.289h669.74a134.36 134.36 0 00133.94-133.938V277.595a134.314 134.314 0 00-133.94-133.938zm33.473 267.877H147.126a33.145 33.145 0 01-33.473-33.473c0-18.752 14.72-33.473 33.473-33.473h736.687c18.752 0 33.472 14.72 33.472 33.473a33.145 33.145 0 01-33.472 33.473z"
}));
CalendarIcon.displayName = "CalendarIcon";
const CategoryIcon$1 = () => h$4(u$4, { name: "category" }, () => h$4("path", {
  d: "M148.41 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H148.41c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.311-40.31zM147.556 553.478H429.73c22.263 0 40.311 18.048 40.311 40.31v282.176c0 22.263-18.048 40.312-40.31 40.312H147.555c-22.263 0-40.311-18.049-40.311-40.312V593.79c0-22.263 18.048-40.311 40.31-40.311zM593.927 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H593.927c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.31-40.31zM730.22 920.502H623.926c-40.925 0-74.22-33.388-74.22-74.425V623.992c0-41.038 33.387-74.424 74.425-74.424h222.085c41.038 0 74.424 33.226 74.424 74.067v114.233c0 10.244-8.304 18.548-18.547 18.548s-18.548-8.304-18.548-18.548V623.635c0-20.388-16.746-36.974-37.33-36.974H624.13c-20.585 0-37.331 16.747-37.331 37.33v222.086c0 20.585 16.654 37.331 37.126 37.331H730.22c10.243 0 18.547 8.304 18.547 18.547 0 10.244-8.304 18.547-18.547 18.547z"
}));
CategoryIcon$1.displayName = "CategoryIcon";
const EyeIcon = () => h$4(u$4, { name: "eye" }, () => h$4("path", {
  d: "M992 512.096c0-5.76-.992-10.592-1.28-11.136-.192-2.88-1.152-8.064-2.08-10.816-.256-.672-.544-1.376-.832-2.08-.48-1.568-1.024-3.104-1.6-4.32C897.664 290.112 707.104 160 512 160c-195.072 0-385.632 130.016-473.76 322.592-1.056 2.112-1.792 4.096-2.272 5.856a55.512 55.512 0 00-.64 1.6c-1.76 5.088-1.792 8.64-1.632 7.744-.832 3.744-1.568 11.168-1.568 11.168-.224 2.272-.224 4.032.032 6.304 0 0 .736 6.464 1.088 7.808.128 1.824.576 4.512 1.12 6.976h-.032c.448 2.08 1.12 4.096 1.984 6.08.48 1.536.992 2.976 1.472 4.032C126.432 733.856 316.992 864 512 864c195.136 0 385.696-130.048 473.216-321.696 1.376-2.496 2.24-4.832 2.848-6.912.256-.608.48-1.184.672-1.728 1.536-4.48 1.856-8.32 1.728-8.32l-.032.032c.608-3.104 1.568-7.744 1.568-13.28zM512 672c-88.224 0-160-71.776-160-160s71.776-160 160-160 160 71.776 160 160-71.776 160-160 160z"
}));
EyeIcon.displayName = "EyeIcon";
const FireIcon = () => h$4(u$4, { name: "fire" }, () => h$4("path", {
  d: "M726.4 201.6c-12.8-9.6-28.8-6.4-38.4 0-9.6 9.6-16 25.6-9.6 38.4 6.4 12.8 9.6 28.8 12.8 44.8C604.8 83.2 460.8 38.4 454.4 35.2c-9.6-3.2-22.4 0-28.8 6.4-9.6 6.4-12.8 19.2-9.6 28.8 12.8 86.4-25.6 188.8-115.2 310.4-6.4-25.6-16-51.2-32-80-9.6-9.6-22.4-16-35.2-12.8-16 3.2-25.6 12.8-25.6 28.8-3.2 48-25.6 92.8-51.2 140.8C134.4 499.2 112 544 102.4 592c-32 150.4 99.2 329.6 233.6 380.8 9.6 3.2 19.2 6.4 32 9.6-25.6-19.2-41.6-51.2-48-96C294.4 691.2 505.6 640 515.2 460.8c153.6 105.6 224 336 137.6 505.6 3.2 0 6.4-3.2 9.6-3.2 0 0 3.2 0 3.2-3.2 163.2-89.6 252.8-208 259.2-345.6 16-211.2-163.2-390.4-198.4-412.8z"
}));
FireIcon.displayName = "FireIcon";
const PrintIcon = () => h$4(u$4, { name: "print" }, () => h$4("path", {
  d: "M819.2 364.8h-44.8V128c0-17.067-14.933-32-32-32H281.6c-17.067 0-32 14.933-32 32v236.8h-44.8C145.067 364.8 96 413.867 96 473.6v192c0 59.733 49.067 108.8 108.8 108.8h44.8V896c0 17.067 14.933 32 32 32h460.8c17.067 0 32-14.933 32-32V774.4h44.8c59.733 0 108.8-49.067 108.8-108.8v-192c0-59.733-49.067-108.8-108.8-108.8zM313.6 160h396.8v204.8H313.6V160zm396.8 704H313.6V620.8h396.8V864zM864 665.6c0 25.6-19.2 44.8-44.8 44.8h-44.8V588.8c0-17.067-14.933-32-32-32H281.6c-17.067 0-32 14.933-32 32v121.6h-44.8c-25.6 0-44.8-19.2-44.8-44.8v-192c0-25.6 19.2-44.8 44.8-44.8h614.4c25.6 0 44.8 19.2 44.8 44.8v192z"
}));
PrintIcon.displayName = "PrintIcon";
const TagIcon$1 = () => h$4(u$4, { name: "tag" }, () => h$4("path", {
  d: "M939.902 458.563L910.17 144.567c-1.507-16.272-14.465-29.13-30.737-30.737L565.438 84.098h-.402c-3.215 0-5.726 1.005-7.634 2.913l-470.39 470.39a10.004 10.004 0 000 14.164l365.423 365.424c1.909 1.908 4.42 2.913 7.132 2.913s5.223-1.005 7.132-2.913l470.39-470.39c2.01-2.11 3.014-5.023 2.813-8.036zm-240.067-72.121c-35.458 0-64.286-28.828-64.286-64.286s28.828-64.285 64.286-64.285 64.286 28.828 64.286 64.285-28.829 64.286-64.286 64.286z"
}));
TagIcon$1.displayName = "TagIcon";
const TimerIcon = () => h$4(u$4, { name: "timer" }, () => h$4("path", {
  d: "M799.387 122.15c4.402-2.978 7.38-7.897 7.38-13.463v-1.165c0-8.933-7.38-16.312-16.312-16.312H256.33c-8.933 0-16.311 7.38-16.311 16.312v1.165c0 5.825 2.977 10.874 7.637 13.592 4.143 194.44 97.22 354.963 220.201 392.763-122.204 37.542-214.893 196.511-220.2 389.397-4.661 5.049-7.638 11.651-7.638 19.03v5.825h566.49v-5.825c0-7.379-2.849-13.981-7.509-18.9-5.049-193.016-97.867-351.985-220.2-389.527 123.24-37.67 216.446-198.453 220.588-392.892zM531.16 450.445v352.632c117.674 1.553 211.787 40.778 211.787 88.676H304.097c0-48.286 95.149-87.382 213.728-88.676V450.445c-93.077-3.107-167.901-81.297-167.901-177.093 0-8.803 6.99-15.793 15.793-15.793 8.803 0 15.794 6.99 15.794 15.793 0 80.261 63.69 145.635 142.01 145.635s142.011-65.374 142.011-145.635c0-8.803 6.99-15.793 15.794-15.793s15.793 6.99 15.793 15.793c0 95.019-73.789 172.82-165.96 177.093z"
}));
TimerIcon.displayName = "TimerIcon";
const WordIcon = () => h$4(u$4, { name: "word" }, () => [
  h$4("path", {
    d: "M518.217 432.64V73.143A73.143 73.143 0 01603.43 1.097a512 512 0 01419.474 419.474 73.143 73.143 0 01-72.046 85.212H591.36a73.143 73.143 0 01-73.143-73.143z"
  }),
  h$4("path", {
    d: "M493.714 566.857h340.297a73.143 73.143 0 0173.143 85.577A457.143 457.143 0 11371.566 117.76a73.143 73.143 0 0185.577 73.143v339.383a36.571 36.571 0 0036.571 36.571z"
  })
]);
WordIcon.displayName = "WordIcon";
const useMetaLocale = () => {
  const themeLocale = useThemeLocaleData();
  return computed(() => themeLocale.value.metaLocales);
};
const editLinkPatterns = {
  GitHub: ":repo/edit/:branch/:path",
  GitLab: ":repo/-/edit/:branch/:path",
  Gitee: ":repo/edit/:branch/:path",
  Bitbucket: ":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"
};
const resolveEditLink = ({ docsRepo, docsBranch, docsDir, filePathRelative, editLinkPattern }) => {
  if (!filePathRelative)
    return null;
  const repoType = qe(docsRepo);
  let pattern;
  if (editLinkPattern)
    pattern = editLinkPattern;
  else if (repoType !== null)
    pattern = editLinkPatterns[repoType];
  if (!pattern)
    return null;
  return pattern.replace(/:repo/, isLinkHttp(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`).replace(/:branch/, docsBranch).replace(/:path/, removeLeadingSlash(`${removeEndingSlash(docsDir)}/${filePathRelative}`));
};
const useEditLink = () => {
  const themeLocale = useThemeLocaleData();
  const page2 = usePageData();
  const frontmatter = usePageFrontmatter();
  return computed(() => {
    const { repo, docsRepo = repo, docsBranch = "main", docsDir = "", editLink, editLinkPattern = "" } = themeLocale.value;
    const showEditLink = frontmatter.value.editLink ?? editLink ?? true;
    if (!showEditLink)
      return null;
    if (!docsRepo)
      return null;
    const link = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      editLinkPattern,
      filePathRelative: page2.value.filePathRelative
    });
    if (!link)
      return null;
    return {
      text: themeLocale.value.metaLocales.editLink,
      link
    };
  });
};
const useUpdateTime = () => {
  const siteLocale = useSiteLocaleData();
  const themeLocale = useThemeLocaleData();
  const page2 = usePageData();
  const frontmatter = usePageFrontmatter();
  return computed(() => {
    var _a2, _b2;
    const showLastUpdated = frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true;
    if (!showLastUpdated)
      return null;
    if (!((_a2 = page2.value.git) == null ? void 0 : _a2.updatedTime))
      return null;
    const updatedDate = new Date((_b2 = page2.value.git) == null ? void 0 : _b2.updatedTime);
    return updatedDate.toLocaleString(siteLocale.value.lang);
  });
};
const useContributors = () => {
  const themeLocale = useThemeLocaleData();
  const page2 = usePageData();
  const frontmatter = usePageFrontmatter();
  return computed(() => {
    var _a2;
    const showContributors = frontmatter.value.contributors ?? themeLocale.value.contributors ?? true;
    if (!showContributors)
      return null;
    return ((_a2 = page2.value.git) == null ? void 0 : _a2.contributors) ?? null;
  });
};
const authorInfo = "";
const AuthorInfo = defineComponent({
  name: "AuthorInfo",
  inheritAttrs: false,
  props: {
    /**
     * Author information
     *
     * 作者信息
     */
    author: {
      type: Array,
      required: true
    },
    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: Boolean
  },
  setup(props) {
    const metaLocale = useMetaLocale();
    return () => props.author.length ? h$4("span", {
      class: "page-author-info",
      "aria-label": `${metaLocale.value.author}${props.pure ? "" : "🖊"}`,
      ...props.pure ? {} : { "data-balloon-pos": "down" }
    }, [
      h$4(AuthorIcon),
      h$4("span", props.author.map((item) => item.url ? h$4("a", {
        class: "page-author-item",
        href: item.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, item.name) : h$4("span", { class: "page-author-item" }, item.name))),
      h$4("span", {
        property: "author",
        content: props.author.map((item) => item.name).join(", ")
      })
    ]) : null;
  }
});
const categoryInfo = "";
const CategoryInfo = defineComponent({
  name: "CategoryInfo",
  inheritAttrs: false,
  props: {
    /**
     * Category information
     *
     * 分类信息
     */
    category: {
      type: Array,
      required: true
    },
    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: Boolean
  },
  setup(props) {
    const router = useRouter();
    const page2 = usePageData();
    const metaLocale = useMetaLocale();
    const navigate = (event, path = "") => {
      if (path && page2.value.path !== path) {
        event.preventDefault();
        void router.push(path);
      }
    };
    return () => props.category.length ? h$4("span", {
      class: "page-category-info",
      "aria-label": `${metaLocale.value.category}${props.pure ? "" : "🌈"}`,
      ...props.pure ? {} : { "data-balloon-pos": "down" }
    }, [
      h$4(CategoryIcon$1),
      props.category.map(({ name, path }) => h$4("span", {
        class: [
          "page-category-item",
          {
            // TODO: magic number 9 is tricky here
            [`category${he(name, 9)}`]: !props.pure,
            clickable: path
          }
        ],
        role: path ? "navigation" : "",
        onClick: (event) => navigate(event, path)
      }, name)),
      h$4("meta", {
        property: "articleSection",
        content: props.category.map(({ name }) => name).join(",")
      })
    ]) : null;
  }
});
const DateInfo = defineComponent({
  name: "DateInfo",
  inheritAttrs: false,
  props: {
    /**
     * Date information
     *
     * 日期信息
     */
    date: {
      type: Object,
      default: null
    },
    /**
     * Localized date text
     *
     * 本地化的日期文字
     */
    localizedDate: {
      type: String,
      default: ""
    },
    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: Boolean
  },
  setup(props) {
    const lang = usePageLang();
    const metaLocale = useMetaLocale();
    return () => props.date ? h$4("span", {
      class: "page-date-info",
      "aria-label": `${metaLocale.value.date}${props.pure ? "" : "📅"}`,
      ...props.pure ? {} : { "data-balloon-pos": "down" }
    }, [
      h$4(CalendarIcon),
      h$4("span", h$4(ClientOnly, () => props.localizedDate || props.date.toLocaleDateString(lang.value))),
      h$4("meta", {
        property: "datePublished",
        // ISO Format Date string
        content: props.date.toISOString() || ""
      })
    ]) : null;
  }
});
const originalInfo = "";
const OriginalInfo = defineComponent({
  name: "OriginalInfo",
  inheritAttrs: false,
  props: {
    /**
     * Whether the article is original
     *
     * 文章是否是原创
     */
    isOriginal: Boolean
  },
  setup(props) {
    const metaLocale = useMetaLocale();
    return () => props.isOriginal ? h$4("span", { class: "page-original-info" }, metaLocale.value.origin) : null;
  }
});
const PageViewInfo = defineComponent({
  name: "PageViewInfo",
  inheritAttrs: false,
  props: {
    /**
     * Whether show pageview and it's path
     *
     * 是否显示浏览量以及其路径
     */
    pageview: {
      type: [Boolean, String],
      default: false
    },
    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: Boolean
  },
  setup(props) {
    const route = useRoute();
    const metaLocale = useMetaLocale();
    const pageviewElement = shallowRef();
    const pageViews = ref(0);
    useMutationObserver(pageviewElement, () => {
      const count = pageviewElement.value.textContent;
      if (count && !isNaN(Number(count)))
        pageViews.value = Number(count);
    }, { childList: true });
    return () => props.pageview ? h$4("span", {
      class: "page-pageview-info",
      "aria-label": `${metaLocale.value.views}${props.pure ? "" : "🔢"}`,
      ...props.pure ? {} : { "data-balloon-pos": "down" }
    }, [
      h$4(pageViews.value < 1e3 ? EyeIcon : FireIcon),
      h$4("span", {
        ref: pageviewElement,
        id: "ArtalkPV",
        class: "waline-pageview-count",
        /** visitorID */
        "data-path": isString(props.pageview) ? props.pageview : withBase(route.path)
      }, "...")
    ]) : null;
  }
});
const ReadingTimeInfo = defineComponent({
  name: "ReadingTimeInfo",
  inheritAttrs: false,
  props: {
    /**
     * Reading time information
     *
     * 阅读时间信息
     */
    readingTime: {
      type: Object,
      default: () => null
    },
    /**
     * Reading time locale
     *
     * 阅读时间语言环境
     */
    readingTimeLocale: {
      type: Object,
      default: () => null
    },
    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: Boolean
  },
  setup(props) {
    const metaLocale = useMetaLocale();
    const readingTimeMeta = computed(() => {
      if (!props.readingTime)
        return null;
      const { minutes } = props.readingTime;
      return minutes < 1 ? "PT1M" : `PT${Math.round(minutes)}M`;
    });
    return () => {
      var _a2, _b2;
      return ((_a2 = props.readingTimeLocale) == null ? void 0 : _a2.time) ? h$4("span", {
        class: "page-reading-time-info",
        "aria-label": `${metaLocale.value.readingTime}${props.pure ? "" : "⌛"}`,
        ...props.pure ? {} : { "data-balloon-pos": "down" }
      }, [
        h$4(TimerIcon),
        h$4("span", (_b2 = props.readingTimeLocale) == null ? void 0 : _b2.time),
        h$4("meta", {
          property: "timeRequired",
          content: readingTimeMeta.value
        })
      ]) : null;
    };
  }
});
const tagInfo = "";
const TagInfo = defineComponent({
  name: "TagInfo",
  inheritAttrs: false,
  props: {
    /**
     * Tag information
     *
     * 标签信息
     */
    tag: {
      type: Array,
      default: () => []
    },
    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: Boolean
  },
  setup(props) {
    const router = useRouter();
    const page2 = usePageData();
    const metaLocale = useMetaLocale();
    const navigate = (event, path = "") => {
      if (path && page2.value.path !== path) {
        event.preventDefault();
        void router.push(path);
      }
    };
    return () => props.tag.length ? h$4("span", {
      class: "page-tag-info",
      "aria-label": `${metaLocale.value.tag}${props.pure ? "" : "🏷"}`,
      ...props.pure ? {} : { "data-balloon-pos": "down" }
    }, [
      h$4(TagIcon$1),
      props.tag.map(({ name, path }) => h$4("span", {
        class: [
          "page-tag-item",
          {
            // TODO: magic number 9 is tricky here
            [`tag${he(name, 9)}`]: !props.pure,
            clickable: path
          }
        ],
        role: path ? "navigation" : "",
        onClick: (event) => navigate(event, path)
      }, name)),
      h$4("meta", {
        property: "keywords",
        content: props.tag.map(({ name }) => name).join(",")
      })
    ]) : null;
  }
});
const WordInfo = defineComponent({
  name: "ReadTimeInfo",
  inheritAttrs: false,
  props: {
    /**
     * Reading time information
     *
     * 阅读时间信息
     */
    readingTime: {
      type: Object,
      default: () => null
    },
    /**
     * Reading time locale
     *
     * 阅读时间语言环境
     */
    readingTimeLocale: {
      type: Object,
      default: () => null
    },
    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: Boolean
  },
  setup(props) {
    const metaLocale = useMetaLocale();
    return () => {
      var _a2, _b2, _c;
      return ((_a2 = props.readingTimeLocale) == null ? void 0 : _a2.words) ? h$4("span", {
        class: "page-word-info",
        "aria-label": `${metaLocale.value.words}${props.pure ? "" : "🔠"}`,
        ...props.pure ? {} : { "data-balloon-pos": "down" }
      }, [
        h$4(WordIcon),
        h$4("span", (_b2 = props.readingTimeLocale) == null ? void 0 : _b2.words),
        h$4("meta", {
          property: "wordCount",
          content: (_c = props.readingTime) == null ? void 0 : _c.words
        })
      ]) : null;
    };
  }
});
const pageInfo = "";
const PageInfo = defineComponent({
  name: "PageInfo",
  components: {
    AuthorInfo,
    CategoryInfo,
    DateInfo,
    OriginalInfo,
    PageViewInfo,
    ReadingTimeInfo,
    TagInfo,
    WordInfo
  },
  props: {
    /**
     * Article information to display
     *
     * 待展示的文章信息
     */
    items: {
      type: [Array, Boolean],
      default: () => [
        "Author",
        "Original",
        "Date",
        "PageView",
        "ReadingTime",
        "Category",
        "Tag"
      ]
    },
    /**
     * Article information
     *
     * 文章信息配置
     */
    info: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const pure = usePure();
    return () => props.items ? h$4("div", { class: "page-info" }, props.items.map((item) => h$4(resolveComponent(`${item}Info`), {
      ...props.info,
      pure: pure.value
    }))) : null;
  }
});
const pageTitle = "";
const PageTitle = defineComponent({
  name: "PageTitle",
  setup() {
    const page2 = usePageData();
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const { info, items } = usePageInfo();
    return () => h$4("div", { class: "vp-page-title" }, [
      h$4("h1", [
        themeLocale.value.titleIcon === false ? null : h$4(HopeIcon, { icon: frontmatter.value.icon }),
        page2.value.title
      ]),
      h$4(PageInfo, {
        info: info.value,
        ...items.value === null ? {} : { items: items.value }
      }),
      h$4("hr")
    ]);
  }
});
const EditIcon = () => h$4(u$4, { name: "edit" }, () => [
  h$4("path", {
    d: "M430.818 653.65a60.46 60.46 0 0 1-50.96-93.281l71.69-114.012 7.773-10.365L816.038 80.138A60.46 60.46 0 0 1 859.225 62a60.46 60.46 0 0 1 43.186 18.138l43.186 43.186a60.46 60.46 0 0 1 0 86.373L588.879 565.55l-8.637 8.637-117.466 68.234a60.46 60.46 0 0 1-31.958 11.229z"
  }),
  h$4("path", {
    d: "M728.802 962H252.891A190.883 190.883 0 0 1 62.008 771.98V296.934a190.883 190.883 0 0 1 190.883-192.61h267.754a60.46 60.46 0 0 1 0 120.92H252.891a69.962 69.962 0 0 0-69.098 69.099V771.98a69.962 69.962 0 0 0 69.098 69.098h475.911A69.962 69.962 0 0 0 797.9 771.98V503.363a60.46 60.46 0 1 1 120.922 0V771.98A190.883 190.883 0 0 1 728.802 962z"
  })
]);
EditIcon.displayName = "EditIcon";
const pageMeta = "";
const PageMeta = defineComponent({
  name: "PageMeta",
  setup() {
    const themeLocale = useThemeLocaleData();
    const editLink = useEditLink();
    const updateTime = useUpdateTime();
    const contributors = useContributors();
    return () => {
      const { metaLocales } = themeLocale.value;
      return h$4("footer", { class: "page-meta" }, [
        editLink.value ? h$4("div", { class: "meta-item edit-link" }, h$4(AutoLink, { class: "label", config: editLink.value }, { before: () => h$4(EditIcon) })) : null,
        h$4("div", { class: "meta-item git-info" }, [
          updateTime.value ? h$4("div", { class: "update-time" }, [
            h$4("span", { class: "label" }, `${metaLocales.lastUpdated}: `),
            h$4(ClientOnly, () => h$4("span", { class: "info" }, updateTime.value))
          ]) : null,
          contributors.value && contributors.value.length ? h$4("div", { class: "contributors" }, [
            h$4("span", { class: "label" }, `${metaLocales.contributors}: `),
            contributors.value.map(({ email, name }, index2) => [
              h$4("span", { class: "contributor", title: `email: ${email}` }, name),
              index2 !== contributors.value.length - 1 ? "," : ""
            ])
          ]) : null
        ])
      ]);
    };
  }
});
const printButton = "";
const PrintButton = defineComponent({
  name: "PrintButton",
  setup() {
    const themeData2 = useThemeData();
    const themeLocale = useThemeLocaleData();
    return () => themeData2.value.print === false ? null : h$4("button", {
      type: "button",
      class: "print-button",
      title: themeLocale.value.metaLocales.print,
      onClick: () => {
        window.print();
      }
    }, h$4(PrintIcon));
  }
});
const toc = "";
const renderHeader = ({ title, level, slug }) => h$4(j$1, {
  to: `#${slug}`,
  class: ["toc-link", `level${level}`]
}, () => title);
const renderChildren = (headers, headerDepth) => {
  const route = useRoute();
  return headers.length && headerDepth > 0 ? h$4("ul", { class: "toc-list" }, headers.map((header) => {
    const children = renderChildren(header.children, headerDepth - 1);
    return [
      h$4("li", {
        class: [
          "toc-item",
          { active: Ge(route, `#${header.slug}`) }
        ]
      }, renderHeader(header)),
      children ? h$4("li", children) : null
    ];
  })) : null;
};
const TOC = defineComponent({
  name: "TOC",
  props: {
    /**
     * TOC items config
     *
     * TOC 项目配置
     */
    items: {
      type: Array,
      default: () => []
    },
    /**
     * Max header nesting depth
     *
     * 最大的标题嵌套深度
     */
    headerDepth: {
      type: Number,
      default: 2
    }
  },
  slots: Object,
  setup(props, { slots }) {
    const route = useRoute();
    const page2 = usePageData();
    const metaLocale = useMetaLocale();
    const toc2 = shallowRef();
    const tocMarkerTop = ref("-1.7rem");
    const scrollTo = (top) => {
      var _a2;
      (_a2 = toc2.value) == null ? void 0 : _a2.scrollTo({ top, behavior: "smooth" });
    };
    const updateTocMarker = () => {
      if (toc2.value) {
        const activeTocItem = document.querySelector(".toc-item.active");
        if (activeTocItem)
          tocMarkerTop.value = `${// active toc item top
          activeTocItem.getBoundingClientRect().top - // toc top
          toc2.value.getBoundingClientRect().top + // toc scroll top
          toc2.value.scrollTop}px`;
        else
          tocMarkerTop.value = "-1.7rem";
      } else {
        tocMarkerTop.value = "-1.7rem";
      }
    };
    onMounted(() => {
      watch(() => route.hash, (hash) => {
        if (toc2.value) {
          const activeTocItem = document.querySelector(`#toc a.toc-link[href$="${hash}"]`);
          if (!activeTocItem)
            return;
          const { top: tocTop, height: tocHeight } = toc2.value.getBoundingClientRect();
          const { top: activeTocItemTop, height: activeTocItemHeight } = activeTocItem.getBoundingClientRect();
          if (activeTocItemTop < tocTop)
            scrollTo(toc2.value.scrollTop + activeTocItemTop - tocTop);
          else if (activeTocItemTop + activeTocItemHeight > tocTop + tocHeight)
            scrollTo(toc2.value.scrollTop + activeTocItemTop + activeTocItemHeight - tocTop - tocHeight);
        }
      });
      watch(() => route.fullPath, () => updateTocMarker(), { flush: "post", immediate: true });
    });
    return () => {
      var _a2, _b2;
      const tocHeaders = props.items.length ? renderChildren(props.items, props.headerDepth) : page2.value.headers ? renderChildren(page2.value.headers, props.headerDepth) : null;
      return tocHeaders ? h$4("div", { class: "toc-place-holder" }, [
        h$4("aside", { id: "toc" }, [
          (_a2 = slots.before) == null ? void 0 : _a2.call(slots),
          h$4("div", { class: "toc-header" }, [
            metaLocale.value.toc,
            h$4(PrintButton)
          ]),
          h$4("div", { class: "toc-wrapper", ref: toc2 }, [
            tocHeaders,
            h$4("div", {
              class: "toc-marker",
              style: {
                top: tocMarkerTop.value
              }
            })
          ]),
          (_b2 = slots.after) == null ? void 0 : _b2.call(slots)
        ])
      ]) : null;
    };
  }
});
const page$1 = "";
const NormalPage = defineComponent({
  name: "NormalPage",
  slots: Object,
  setup(_props, { slots }) {
    const frontmatter = usePageFrontmatter();
    const page2 = usePageData();
    const { isDarkmode } = useDarkmode();
    const themeLocale = useThemeLocaleData();
    const tocEnable = computed(() => frontmatter.value.toc || frontmatter.value.toc !== false && themeLocale.value.toc !== false);
    return () => h$4("main", { id: "main-content", class: "vp-page" }, h$4(Qe("LocalEncrypt") ? resolveComponent("LocalEncrypt") : oe, () => {
      var _a2, _b2, _c, _d;
      return [
        (_a2 = slots.top) == null ? void 0 : _a2.call(slots),
        frontmatter.value.cover ? h$4("img", {
          class: "page-cover",
          src: withBase(frontmatter.value.cover),
          alt: page2.value.title,
          "no-view": ""
        }) : null,
        h$4(BreadCrumb),
        h$4(PageTitle),
        tocEnable.value ? h$4(TOC, {
          headerDepth: frontmatter.value.headerDepth ?? themeLocale.value.headerDepth ?? 2
        }, {
          before: () => {
            var _a3;
            return (_a3 = slots.tocBefore) == null ? void 0 : _a3.call(slots);
          },
          after: () => {
            var _a3;
            return (_a3 = slots.tocAfter) == null ? void 0 : _a3.call(slots);
          }
        }) : null,
        (_b2 = slots.contentBefore) == null ? void 0 : _b2.call(slots),
        h$4(MarkdownContent),
        (_c = slots.contentAfter) == null ? void 0 : _c.call(slots),
        h$4(PageMeta),
        h$4(PageNav),
        Qe("CommentService") ? h$4(resolveComponent("CommentService"), {
          darkmode: isDarkmode.value
        }) : null,
        (_d = slots.bottom) == null ? void 0 : _d.call(slots)
      ];
    }));
  }
});
const skipLink = "";
const SkipLink = defineComponent({
  name: "SkipLink",
  props: {
    /** @description Content ID */
    content: {
      type: String,
      default: "main-content"
    }
  },
  setup(props) {
    const page2 = usePageData();
    const themeLocale = useThemeLocaleData();
    const skipToMainContent = shallowRef();
    const focusMainContent = ({ target }) => {
      const el = document.querySelector(target.hash);
      if (el) {
        const removeTabIndex = () => {
          el.removeAttribute("tabindex");
          el.removeEventListener("blur", removeTabIndex);
        };
        el.setAttribute("tabindex", "-1");
        el.addEventListener("blur", removeTabIndex);
        el.focus();
        window.scrollTo(0, 0);
      }
    };
    onMounted(() => {
      watch(() => page2.value.path, () => skipToMainContent.value.focus());
    });
    return () => [
      h$4("span", {
        ref: skipToMainContent,
        tabindex: "-1"
      }),
      h$4("a", {
        href: `#${props.content}`,
        class: "vp-skip-link sr-only",
        onClick: focusMainContent
      }, themeLocale.value.routeLocales.skipToContent)
    ];
  }
});
const fadeSlideY = "";
const FadeSlideY = defineComponent({
  name: "FadeSlideY",
  slots: Object,
  setup(_props, { slots }) {
    const { resolve: onBeforeEnter, pending: onBeforeLeave } = useScrollPromise();
    return () => h$4(Transition, {
      name: "fade-slide-y",
      mode: "out-in",
      onBeforeEnter,
      onBeforeLeave
    }, () => {
      var _a2;
      return (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
    });
  }
});
const Layout = defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Layout",
  setup() {
    const themeData2 = useThemeData();
    const themeLocale = useThemeLocaleData();
    const page2 = usePageData();
    const frontmatter = usePageFrontmatter();
    const { isMobile } = useWindowSize();
    const sidebarDisplay = computed(
      () => {
        var _a2, _b2;
        return ((_a2 = themeLocale.value.blog) == null ? void 0 : _a2.sidebarDisplay) || ((_b2 = themeData2.value.blog) == null ? void 0 : _b2.sidebarDisplay) || "mobile";
      }
    );
    return () => [
      h$4(SkipLink),
      h$4(CommonWrapper, {}, {
        default: () => frontmatter.value.home ? h$4(HomePage) : h$4(FadeSlideY, () => h$4(NormalPage, { key: page2.value.path })),
        ...sidebarDisplay.value !== "none" ? { navScreenBottom: () => h$4(resolveComponent("BloggerInfo")) } : {},
        ...!isMobile.value && sidebarDisplay.value === "always" ? { sidebar: () => h$4(resolveComponent("BloggerInfo")) } : {}
      })
    ];
  }
});
const notFoundHint = "";
const NotFoundHint = defineComponent({
  name: "NotFoundHint",
  setup() {
    const themeLocale = useThemeLocaleData();
    const getMsg = () => {
      const messages = themeLocale.value.routeLocales["notFoundMsg"];
      return messages[Math.floor(Math.random() * messages.length)];
    };
    return () => h$4("div", { class: "not-found-hint" }, [
      h$4("p", { class: "error-code" }, "404"),
      h$4("h1", { class: "error-title" }, themeLocale.value.routeLocales["notFoundTitle"]),
      h$4("p", { class: "error-hint" }, getMsg())
    ]);
  }
});
const notFound = "";
const NotFound = defineComponent({
  name: "NotFound",
  slots: Object,
  setup(_props, { slots }) {
    const routeLocale = useRouteLocale();
    const themeLocale = useThemeLocaleData();
    const { navigate } = useLink({
      to: themeLocale.value.home ?? routeLocale.value
    });
    return () => [
      h$4(SkipLink),
      h$4(CommonWrapper, { noSidebar: true }, () => {
        var _a2;
        return h$4("main", { id: "main-content", class: "vp-page not-found" }, ((_a2 = slots.default) == null ? void 0 : _a2.call(slots)) || [
          h$4(NotFoundHint),
          h$4("div", { class: "actions" }, [
            h$4("button", {
              type: "button",
              class: "action-button",
              onClick: () => {
                window.history.go(-1);
              }
            }, themeLocale.value.routeLocales.back),
            h$4("button", {
              type: "button",
              class: "action-button",
              onClick: () => navigate()
            }, themeLocale.value.routeLocales.home)
          ])
        ]);
      })
    ];
  }
});
const icons = { "Baidu": '<svg xmlns="http://www.w3.org/2000/svg" class="icon baidu-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#1D2FE3"/><path fill="#fff" d="M239.022 704.978c.098-4.865-.314-9.772.162-14.591 5.178-52.464 197.571-253.377 249.641-259.233 42.996-4.833 75.768 16.545 99.824 49.144 37.893 51.351 82.81 95.455 131.292 136.237 52.903 44.503 56.525 99.801 32.6 158.592-23.425 57.56-75.34 69.833-127.771 58.804-84.971-17.874-168.158-13.744-253.37-4.536-86.35 9.333-133.788-39.4-132.378-124.417zM352.464 412.86c-3.58 50.707-17.93 96.128-75.9 98.12-58 1.995-80-41.432-79.275-91.71.81-49.705 13.416-104 76.851-102.136 53.84 1.625 74.74 45.8 78.324 95.726zm386 142.168c-68.494-1.735-84.188-43.331-82.635-93.812 1.46-47.519 10-97.628 73.299-96.65 61.395.95 81.6 43.207 81.553 98.668 0 53.156-19.818 89.398-72.217 91.794zm-45.235-278.345c-10.464 42.665-24.513 91.761-85.919 94.502-52.74 2.354-71.705-34.482-72.805-81.242-1.233-52.42 48-112.965 87.582-110.373 33.943 2.226 71.146 49.541 71.142 97.113zm-195.147-14c-7 46.274-13.63 100-71.562 101.351-57 1.306-73.567-47.922-73.638-97.109 0-48 12.128-99 69.345-101.426 59.45-2.493 67.11 51 75.855 97.184z"/><path fill="#1d3fe3" d="M479.52 663.165c0 12.194 1.498 24.61-.284 36.537-4.707 31.503 18.862 78.749-45.326 77.534-54.226-1.027-103.338-3.31-113.231-73.536-7.164-50.852 7.78-85.674 57.687-102.668 17.67-6.016 39.618 5.058 54.096-14.548 10.84-14.679-2.901-54.592 33.418-41.47 24.075 8.7 11.477 38.922 13.278 59.652 1.68 19.366.359 38.99.363 58.5zm175.45 41.902c4.291 39.657 5.093 78-64.709 73.503-60-3.912-95.56-20.794-86.293-85.624 4.287-29.991-21.148-83.238 22.19-84.867 42.71-1.606 13.57 50.41 20.825 77.622 5.276 19.794-3.984 46.774 29.753 48.193 41.337 1.738 28.383-30.022 31.099-51.604 1.209-9.61-.85-19.65.528-29.215 2.516-17.474-8.928-44.716 19.554-47.191 36.044-3.133 24.155 28.376 26.678 47.523 1.896 14.387.375 29.225.375 51.66z"/><path fill="#fff" d="M435.669 685.038c-2.255 24.07 5.605 53.68-33.623 52.136-34.594-1.362-35.274-31.818-38.513-53.078-4.028-26.448 11.38-48.18 40.785-50 41-2.564 27.097 30.764 31.35 51z"/></svg>', "BiliBili": '<svg xmlns="http://www.w3.org/2000/svg" class="icon bilibili-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#1296db"/><path fill="#fff" d="M745.363 177.725a47 47 0 0 1 0 66.3L702.5 286.85h44A141 141 0 0 1 887 427.512v281.25a141 141 0 0 1-141 140.626H277.25A141 141 0 0 1 137 708.763v-281.25a141 141 0 0 1 141-141h43.725l-42.788-42.825a47 47 0 1 1 66.263-66.3l99.45 99.45c2.963 2.962 5.438 6.187 7.425 9.637h120.487c1.988-3.45 4.5-6.75 7.463-9.675l99.413-99.45a47 47 0 0 1 66.3 0zm1.012 203.25h-468.75a47 47 0 0 0-46.763 43.388l-.112 3.525v281.25c0 24.712 19.125 44.962 43.387 46.724l3.488.15h468.75a47 47 0 0 0 46.763-43.387l.112-3.487v-281.25c0-26-21-47-47-46.876zm-375 93.75c26 0 47 21 47 47v47a47 47 0 1 1-93.75 0V521.6c0-26 21-47 47-47zm281.25 0c26 0 47 21 47 47v47a47 47 0 1 1-93.75 0V521.6c0-26 21-47 47-47z"/></svg>', "Email": '<svg xmlns="http://www.w3.org/2000/svg" class="icon email-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#1384FF"/><path fill="#fff" d="M270.077 286.233H751.99c32.933 0 59.86 24.855 60.274 55.51l-301.023 157L210.217 341.88c.207-30.723 26.927-55.717 59.86-55.717zm-59.929 115.714-.276 277.756c0 30.931 27.134 56.2 60.205 56.2H751.99c33.14 0 60.274-25.269 60.274-56.2V401.81L518.283 551.492a15.88 15.88 0 0 1-14.43 0L210.148 401.947z"/></svg>', "GitHub": '<svg xmlns="http://www.w3.org/2000/svg" class="icon github-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#171515"/><path fill="#fff" d="M509.423 146.442c-200.317 0-362.756 162.42-362.756 362.8 0 160.266 103.936 296.24 248.109 344.217 18.139 3.327 24.76-7.872 24.76-17.486 0-8.613-.313-31.427-.49-61.702-100.912 21.923-122.205-48.63-122.205-48.63-16.495-41.91-40.28-53.067-40.28-53.067-32.937-22.51 2.492-22.053 2.492-22.053 36.407 2.566 55.568 37.386 55.568 37.386 32.362 55.438 84.907 39.43 105.58 30.143 3.296-23.444 12.667-39.43 23.032-48.498-80.557-9.156-165.246-40.28-165.246-179.297 0-39.604 14.135-71.988 37.342-97.348-3.731-9.178-16.18-46.063 3.556-96.009 0 0 30.46-9.754 99.76 37.19 28.937-8.048 59.97-12.071 90.823-12.211 30.807.14 61.843 4.165 90.822 12.21 69.26-46.944 99.663-37.189 99.663-37.189 19.792 49.946 7.34 86.831 3.61 96.01 23.25 25.359 37.29 57.742 37.29 97.347 0 139.366-84.82 170.033-165.637 179.013 13.026 11.2 24.628 33.342 24.628 67.182 0 48.498-.445 87.627-.445 99.521 0 9.702 6.535 20.988 24.945 17.444 144.03-48.067 247.881-183.95 247.881-344.175 0-200.378-162.442-362.798-362.802-362.798z"/></svg>', "QQ": '<svg xmlns="http://www.w3.org/2000/svg" class="icon qq-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#5eaade"/><path fill="#fff" d="M805.25 585.542c-15-48.188-32.25-88.688-58.781-154.97 4.125-174.093-68.25-314.905-234.938-314.905-168.562 0-239.344 143.625-234.844 314.906-26.625 66.375-43.78 106.594-58.78 154.969-31.876 102.656-21.563 145.125-13.688 146.062 16.875 2.063 65.718-77.25 65.718-77.25 0 45.938 23.625 105.844 74.813 149.063-24.75 7.593-80.344 28.03-67.125 50.437 10.688 18.094 183.938 11.531 233.906 5.906 49.969 5.625 223.219 12.188 233.906-5.906 13.22-22.312-42.468-42.844-67.125-50.437 51.188-43.313 74.813-103.22 74.813-149.063 0 0 48.844 79.313 65.719 77.25 7.969-1.031 18.281-43.5-13.594-146.062z"/></svg>', "Qzone": '<svg xmlns="http://www.w3.org/2000/svg" class="icon qzone-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#0985DD"/><path fill="#fff" d="M722.38 595.24c22.486-4.056 11.345-12.424 2.156-11.346-16.685 1.72-40.43 1.925-66.562 1.284l3.029 17.79a656.641 656.641 0 0 0 61.402-7.702l-.025-.026zm68.95-174.915a5.287 5.287 0 0 0-4.493-3.645L598.42 389.29l-84.326-170.628c-1.925-3.594-7.958-3.594-9.857 0L419.885 389.29l-188.417 27.39a5.338 5.338 0 0 0-4.466 3.645 5.493 5.493 0 0 0 1.488 5.57l136.36 132.92-32.088 187.519a5.263 5.263 0 0 0 2.13 5.39c1.695 1.284 3.851 1.463 5.776.385l168.651-88.407 168.524 88.638 2.567.642 3.209-1.079c1.72-1.283 2.566-3.208 2.13-5.34l-24.591-143.648c-27.21 2.156-54.37 3.183-76.42 3.183-77.267 0-135.075-3.645-135.948-3.645a16.48 16.48 0 0 1-14.785-11.757 16.247 16.247 0 0 1 5.981-17.764l155.431-113.05c-99.959-7.906-183.873-6.418-184.721-6.418-13.502.642-25.67-3.645.642-14.375 4.518-1.694 109.2-23.72 230.362-7.445 6.673.847 12.013 5.75 13.733 12.194a16.61 16.61 0 0 1-6.263 17.302L497.204 571.598c27.826 5.802 100.37 12.014 160.745 13.502l-4.519-26.312 136.308-132.97a5.338 5.338 0 0 0 1.54-5.544l.051.051z"/></svg>', "Wechat": '<svg xmlns="http://www.w3.org/2000/svg" class="icon wechat-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#1AC88E"/><path fill="#fff" d="M827.551 578.742a176.583 176.583 0 0 0-185.685-158.379 172.942 172.942 0 0 0-186.3 158.379 172.942 172.942 0 0 0 185.686 158.379 282.169 282.169 0 0 0 65.536-10.923l60.689 32.768-16.384-54.613a166.275 166.275 0 0 0 76.458-125.611zm-245.76-27.307a21.845 21.845 0 1 1 0-43.69 24.872 24.872 0 0 1 27.307 21.845 24.872 24.872 0 0 1-27.921 21.845h.614zm121.356 0a21.845 21.845 0 1 1 0-43.69 24.872 24.872 0 0 1 27.306 21.845 24.872 24.872 0 0 1-28.512 21.845h1.206z"/><path fill="#fff" d="M623.662 400.953h21.23A222.709 222.709 0 0 0 419.772 245.6a208.145 208.145 0 0 0-223.323 189.94 182.044 182.044 0 0 0 89.201 150.483l-22.436 67.356 78.279-39.435a389.575 389.575 0 0 0 78.279 10.923h20.616a163.226 163.226 0 0 1-6.667-46.718 182.044 182.044 0 0 1 189.94-177.197zm-121.379-60.69a27.921 27.921 0 1 1 0 55.843 31.562 31.562 0 0 1-33.36-27.921 31.562 31.562 0 0 1 34.59-27.921h-1.23zM346.34 396.107a31.562 31.562 0 0 1-33.383-27.921 31.562 31.562 0 0 1 33.383-27.921 27.921 27.921 0 1 1 0 55.842z"/></svg>' };
const categoryMap = { "category": { "/": { "path": "/category/", "map": { "画册": { "path": "/category/%E7%94%BB%E5%86%8C/", "keys": ["v-ca2606fe"] }, "网址收藏": { "path": "/category/%E7%BD%91%E5%9D%80%E6%94%B6%E8%97%8F/", "keys": ["v-59939119"] }, "python": { "path": "/category/python/", "keys": ["v-4848c9f0", "v-7a9b9630", "v-71b4dc5e", "v-77bb6b9a", "v-4870e4c2", "v-014b8769"] }, "技术": { "path": "/category/%E6%8A%80%E6%9C%AF/", "keys": ["v-784c3919", "v-3966997b", "v-0b84fef2", "v-4f435352"] }, "工具": { "path": "/category/%E5%B7%A5%E5%85%B7/", "keys": ["v-34cef64b", "v-a430865c"] }, "Vue": { "path": "/category/vue/", "keys": ["v-3ae980e2", "v-66d370d9"] } } } }, "tag": { "/": { "path": "/tag/", "map": { "网站": { "path": "/tag/%E7%BD%91%E7%AB%99/", "keys": ["v-59939119"] }, "设计模式": { "path": "/tag/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/", "keys": ["v-4848c9f0", "v-7a9b9630", "v-71b4dc5e"] }, "python": { "path": "/tag/python/", "keys": ["v-4848c9f0", "v-7a9b9630", "v-71b4dc5e", "v-77bb6b9a", "v-4870e4c2", "v-4f435352", "v-014b8769"] }, "gPRC": { "path": "/tag/gprc/", "keys": ["v-3966997b"] }, "RPC": { "path": "/tag/rpc/", "keys": ["v-3966997b"] }, "Linux": { "path": "/tag/linux/", "keys": ["v-77bb6b9a", "v-0b84fef2"] }, "Mysql": { "path": "/tag/mysql/", "keys": ["v-784c3919"] }, "polygon": { "path": "/tag/polygon/", "keys": ["v-014b8769"] }, "mysql": { "path": "/tag/mysql/", "keys": ["v-014b8769"] }, "2to3": { "path": "/tag/2to3/", "keys": ["v-4870e4c2"] }, "Picgo": { "path": "/tag/picgo/", "keys": ["v-34cef64b"] }, "GitHub": { "path": "/tag/github/", "keys": ["v-34cef64b"] }, "Sublime Text": { "path": "/tag/sublime-text/", "keys": ["v-a430865c"] }, "工具说明书": { "path": "/tag/%E5%B7%A5%E5%85%B7%E8%AF%B4%E6%98%8E%E4%B9%A6/", "keys": ["v-a430865c"] }, "前端": { "path": "/tag/%E5%89%8D%E7%AB%AF/", "keys": ["v-3ae980e2", "v-66d370d9"] }, "框架": { "path": "/tag/%E6%A1%86%E6%9E%B6/", "keys": ["v-3ae980e2", "v-66d370d9"] } } } } };
const typeMap = { "article": { "/": { "path": "/article/", "keys": ["v-227b283b", "v-3ae980e2", "v-784c3919", "v-4848c9f0", "v-7a9b9630", "v-71b4dc5e", "v-3966997b", "v-66d370d9", "v-ca2606fe", "v-59939119", "v-77bb6b9a", "v-4870e4c2", "v-0b84fef2", "v-4f435352", "v-34cef64b", "v-a430865c", "v-184f4da6", "v-2e3eac9e", "v-014b8769"] } }, "star": { "/": { "path": "/star/", "keys": [] } }, "timeline": { "/": { "path": "/timeline/", "keys": ["v-227b283b", "v-3ae980e2", "v-784c3919", "v-4848c9f0", "v-7a9b9630", "v-71b4dc5e", "v-3966997b", "v-66d370d9", "v-ca2606fe", "v-59939119", "v-77bb6b9a", "v-4870e4c2", "v-0b84fef2", "v-4f435352", "v-34cef64b", "v-a430865c", "v-184f4da6", "v-2e3eac9e", "v-014b8769"] } } };
const _ = ref(categoryMap), k = (e2 = "") => {
  const m2 = usePageData(), u2 = useRouter(), i2 = useRouteLocale();
  return computed(() => {
    var r2;
    const p2 = e2 || ((r2 = usePageFrontmatter().value.blog) == null ? void 0 : r2.key) || "";
    if (!p2)
      return console.warn("useBlogCategory: key not found"), { path: "/", map: {} };
    const l2 = u2.getRoutes();
    if (!_.value[p2])
      throw new Error(`useBlogCategory: key ${p2} is invalid`);
    const n2 = _.value[p2][i2.value], o2 = { path: n2.path, map: {} };
    for (const a2 in n2.map) {
      const t2 = n2.map[a2];
      o2.map[a2] = { path: t2.path, items: [] };
      for (const B2 of t2.keys) {
        const f2 = l2.find(({ name: s2 }) => s2 === B2);
        if (f2) {
          const s2 = w(u2, f2.path);
          o2.map[a2].items.push({ path: s2.path, info: s2.meta });
        }
      }
      m2.value.path === t2.path && (o2.currentItems = o2.map[a2].items);
    }
    return o2;
  });
};
const c = ref(typeMap), C = (e2 = "") => {
  const m2 = useRouter(), u2 = useRouteLocale();
  return computed(() => {
    var i2;
    const r2 = e2 || ((i2 = usePageFrontmatter().value.blog) == null ? void 0 : i2.key) || "";
    if (!r2)
      return console.warn("useBlogType: key not found"), { path: "/", items: [] };
    if (!c.value[r2])
      throw new Error(`useBlogType: key ${e2} is invalid`);
    const p2 = m2.getRoutes(), l2 = c.value[r2][u2.value], n2 = { path: l2.path, items: [] };
    for (const o2 of l2.keys) {
      const a2 = p2.find(({ name: t2 }) => t2 === o2);
      if (a2) {
        const t2 = w(m2, a2.path);
        n2.items.push({ path: t2.path, info: t2.meta });
      }
    }
    return n2;
  });
};
const categoryMapSymbol = Symbol.for("categoryMap");
const useCategoryMap = () => {
  const categoryMap2 = inject(categoryMapSymbol);
  if (!categoryMap2)
    throw new Error("useCategoryMap() is called without provider.");
  return categoryMap2;
};
const setupCategoryMap = () => {
  const categoryMap2 = k("category");
  provide(categoryMapSymbol, categoryMap2);
};
const useBlogOptions = () => {
  const themeData2 = useThemeData();
  const themeLocale = useThemeLocaleData();
  return computed(() => ({
    ...themeData2.value.blog,
    ...themeLocale.value.blog
  }));
};
const tagMapSymbol = Symbol.for("tagMap");
const useTagMap = () => {
  const tagMap = inject(tagMapSymbol);
  if (!tagMap)
    throw new Error("useTagMap() is called without provider.");
  return tagMap;
};
const setupTagMap = () => {
  const tagMap = k("tag");
  provide(tagMapSymbol, tagMap);
};
const useArticleAuthor = (info) => {
  const themeLocale = useThemeLocaleData();
  return computed(() => {
    const { [ArticleInfoType.author]: author } = info.value;
    if (author)
      return Te(author);
    if (author === false)
      return [];
    return Te(themeLocale.value.author, false);
  });
};
const useArticleCategory = (info) => {
  const categoryMap2 = useCategoryMap();
  return computed(() => je(info.value[ArticleInfoType.category]).map((name) => ({
    name,
    path: categoryMap2.value.map[name].path
  })));
};
const useArticleTag = (info) => {
  const tagMap = useTagMap();
  return computed(() => Be(info.value[ArticleInfoType.tag]).map((name) => ({
    name,
    path: tagMap.value.map[name].path
  })));
};
const useArticleDate = (info) => computed(() => {
  const { [ArticleInfoType.date]: timestamp } = info.value;
  return pe(timestamp);
});
const useArticleInfo = (props) => {
  const articleInfo = toRef(props, "info");
  const blogOptions = useBlogOptions();
  const author = useArticleAuthor(articleInfo);
  const category = useArticleCategory(articleInfo);
  const tag = useArticleTag(articleInfo);
  const date = useArticleDate(articleInfo);
  const readingTimeLocaleConfig = s();
  const info = computed(() => ({
    author: author.value,
    category: category.value,
    date: date.value,
    localizedDate: articleInfo.value[ArticleInfoType.localizedDate] || "",
    tag: tag.value,
    isOriginal: articleInfo.value[ArticleInfoType.isOriginal] || false,
    readingTime: articleInfo.value[ArticleInfoType.readingTime] || null,
    readingTimeLocale: articleInfo.value[ArticleInfoType.readingTime] && readingTimeLocaleConfig.value ? a(articleInfo.value[ArticleInfoType.readingTime], readingTimeLocaleConfig.value) : null,
    pageview: props.path
  }));
  const items = computed(() => blogOptions.value.articleInfo);
  return { info, items };
};
const articlesSymbol = Symbol("");
const useArticles = () => {
  const articles = inject(articlesSymbol);
  if (!articles)
    throw new Error("useArticles() is called without provider.");
  return articles;
};
const setupArticles = () => {
  const articles = C("article");
  provide(articlesSymbol, articles);
};
const starsSymbol = Symbol("");
const useStars = () => {
  const stars = inject(starsSymbol);
  if (!stars)
    throw new Error("useStars() is called without provider.");
  return stars;
};
const setupStars = () => {
  const stars = C("star");
  provide(starsSymbol, stars);
};
const timelinesSymbol = Symbol("");
const useTimelines = () => {
  const timelines = inject(timelinesSymbol);
  if (!timelines)
    throw new Error("useTimelines() is called without provider.");
  return timelines;
};
const setupTimelines = () => {
  const timelines = C("timeline");
  const timelineItems2 = computed(() => {
    const timelineItems3 = [];
    timelines.value.items.forEach(({ info, path }) => {
      const date = pe(info[ArticleInfoType.date]);
      const year = date == null ? void 0 : date.getFullYear();
      const month = date ? date.getMonth() + 1 : null;
      const day = date == null ? void 0 : date.getDate();
      if (year && month && day) {
        if (!timelineItems3[0] || timelineItems3[0].year !== year)
          timelineItems3.unshift({ year, items: [] });
        timelineItems3[0].items.push({
          date: `${month}/${day}`,
          info,
          path
        });
      }
    });
    return {
      ...timelines.value,
      config: timelineItems3.reverse()
    };
  });
  provide(timelinesSymbol, timelineItems2);
};
const setupBlog = () => {
  setupArticles();
  setupCategoryMap();
  setupStars();
  setupTagMap();
  setupTimelines();
};
const socialMedia = "";
const SocialMedia = defineComponent({
  name: "SocialMedia",
  setup() {
    const blogOptions = useBlogOptions();
    const isPure = usePure();
    const mediaLinks = computed(() => {
      const config = blogOptions.value.medias;
      return config ? M$4(config).map(([media, url]) => ({
        name: media,
        icon: icons[media],
        url
      })) : [];
    });
    return () => mediaLinks.value.length ? h$4("div", { class: "vp-social-medias" }, mediaLinks.value.map(({ name, icon, url }) => h$4("a", {
      class: "vp-social-media",
      href: url,
      rel: "noopener noreferrer",
      target: "_blank",
      "aria-label": name,
      ...isPure.value ? {} : { "data-balloon-pos": "up" },
      innerHTML: icon
    }))) : null;
  }
});
const bloggerInfo = "";
const BloggerInfo = defineComponent({
  name: "BloggerInfo",
  setup() {
    const blogOptions = useBlogOptions();
    const siteLocale = useSiteLocaleData();
    const themeLocale = useThemeLocaleData();
    const articles = useArticles();
    const categoryMap2 = useCategoryMap();
    const tagMap = useTagMap();
    const timelines = useTimelines();
    const navigate = useNavigate();
    const bloggerName = computed(() => {
      var _a2;
      return blogOptions.value.name || ((_a2 = Te(themeLocale.value.author)[0]) == null ? void 0 : _a2.name) || siteLocale.value.title;
    });
    const bloggerAvatar = computed(() => blogOptions.value.avatar || themeLocale.value.logo);
    const locale = computed(() => themeLocale.value.blogLocales);
    const intro = computed(() => blogOptions.value.intro);
    return () => {
      const { article, category, tag, timeline } = locale.value;
      const countItems = [
        [articles.value.path, articles.value.items.length, article],
        [categoryMap2.value.path, f$2(categoryMap2.value.map).length, category],
        [tagMap.value.path, f$2(tagMap.value.map).length, tag],
        [timelines.value.path, timelines.value.items.length, timeline]
      ];
      return h$4("div", {
        class: "vp-blogger-info",
        vocab: "https://schema.org/",
        typeof: "Person"
      }, [
        h$4("div", {
          class: "vp-blogger",
          ...intro.value ? {
            style: { cursor: "pointer" },
            "aria-label": locale.value.intro,
            "data-balloon-pos": "down",
            role: "navigation",
            onClick: () => navigate(intro.value)
          } : {}
        }, [
          bloggerAvatar.value ? h$4("img", {
            class: [
              "vp-blogger-avatar",
              { round: blogOptions.value.roundAvatar }
            ],
            src: withBase(bloggerAvatar.value),
            property: "image",
            alt: "Blogger Avatar"
          }) : null,
          bloggerName.value ? h$4("div", { class: "vp-blogger-name", property: "name" }, bloggerName.value) : null,
          blogOptions.value.description ? h$4("div", {
            class: "vp-blogger-description",
            innerHTML: blogOptions.value.description
          }) : null,
          intro.value ? h$4("meta", { property: "url", content: withBase(intro.value) }) : null
        ]),
        h$4("div", { class: "vp-blog-counts" }, countItems.map(([path, count, locale2]) => h$4(j$1, { class: "vp-blog-count", to: path }, () => [
          h$4("div", { class: "count" }, count),
          h$4("div", locale2)
        ]))),
        h$4(SocialMedia)
      ]);
    };
  }
});
const CategoryIcon = () => h$4(u$4, { name: "category" }, () => h$4("path", {
  d: "M148.41 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H148.41c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.311-40.31zM147.556 553.478H429.73c22.263 0 40.311 18.048 40.311 40.31v282.176c0 22.263-18.048 40.312-40.31 40.312H147.555c-22.263 0-40.311-18.049-40.311-40.312V593.79c0-22.263 18.048-40.311 40.31-40.311zM593.927 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H593.927c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.31-40.31zM730.22 920.502H623.926c-40.925 0-74.22-33.388-74.22-74.425V623.992c0-41.038 33.387-74.424 74.425-74.424h222.085c41.038 0 74.424 33.226 74.424 74.067v114.233c0 10.244-8.304 18.548-18.547 18.548s-18.548-8.304-18.548-18.548V623.635c0-20.388-16.746-36.974-37.33-36.974H624.13c-20.585 0-37.331 16.747-37.331 37.33v222.086c0 20.585 16.654 37.331 37.126 37.331H730.22c10.243 0 18.547 8.304 18.547 18.547 0 10.244-8.304 18.547-18.547 18.547z"
}));
CategoryIcon.displayName = "CategoryIcon";
const TagIcon = () => h$4(u$4, { name: "tag" }, () => h$4("path", {
  d: "M939.902 458.563L910.17 144.567c-1.507-16.272-14.465-29.13-30.737-30.737L565.438 84.098h-.402c-3.215 0-5.726 1.005-7.634 2.913l-470.39 470.39a10.004 10.004 0 000 14.164l365.423 365.424c1.909 1.908 4.42 2.913 7.132 2.913s5.223-1.005 7.132-2.913l470.39-470.39c2.01-2.11 3.014-5.023 2.813-8.036zm-240.067-72.121c-35.458 0-64.286-28.828-64.286-64.286s28.828-64.285 64.286-64.285 64.286 28.828 64.286 64.285-28.829 64.286-64.286 64.286z"
}));
TagIcon.displayName = "TagIcon";
const TimelineIcon = () => h$4(u$4, { name: "timeline" }, () => h$4("path", {
  d: "M511.997 70.568c-243.797 0-441.429 197.633-441.429 441.435 0 243.797 197.632 441.429 441.43 441.429S953.431 755.8 953.431 512.002c0-243.796-197.637-441.434-441.435-441.434zm150.158 609.093-15.605 15.61c-8.621 8.615-22.596 8.615-31.215 0L472.197 552.126c-4.95-4.944-4.34-14.888-4.34-24.677V247.14c0-12.19 9.882-22.07 22.07-22.07h22.07c12.19 0 22.07 9.882 22.07 22.07v273.218l128.088 128.088c8.62 8.62 8.62 22.595 0 31.215zm0 0"
}));
TimelineIcon.displayName = "TimelineIcon";
const SlideIcon = () => h$4(u$4, { name: "slides" }, () => h$4("path", {
  d: "M896 170.667v426.666a85.333 85.333 0 0 1-85.333 85.334h-256v61.184l192.597 115.584-43.861 73.13-148.736-89.173v95.275h-85.334v-95.318l-148.736 89.216-43.861-73.13 192.597-115.627v-61.141h-256A85.333 85.333 0 0 1 128 597.333V170.667H85.333V85.333h853.334v85.334H896zm-682.667 0v426.666h597.334V170.667H213.333zM426.667 512h-85.334V341.333h85.334V512zm128 0h-85.334V256h85.334v256zm128 0h-85.334V384h85.334v128z"
}));
SlideIcon.displayName = "SlideIcon";
const StickyIcon = () => h$4(u$4, { name: "sticky" }, () => [
  h$4("path", {
    d: "m381.3 733.8l-161.9 118c-5.9 4.5-13.2 6.6-20.1 6.6-8.7 0-17.7-3.4-24.3-10-12.2-12.2-13.9-31.3-3.5-45.2l144.5-195.5-113.6-112.9c-11.1-11.1-13.2-28.4-5.5-42 5.5-8.7 52.1-76.4 155.5-51 1.8 0.3 3.5 0.3 5.6 0.7 4.2 0.3 9 0.7 14.2 1.7 21.9 3.5 60.8-13.9 94.5-42.7 32.3-27.5 53.1-59.4 53.1-81.6 0-5.2 0-10.8-0.3-16-0.7-20.8-2.1-52.8 21.5-76.4 28.1-28.1 72.9-30.6 103.9-5.2 0.6 0.3 1 1 1.7 1.7 16.7 16.3 187.5 187.2 189.3 188.9 14.5 14.6 22.9 34.4 22.9 55.3 0 20.8-8 40.2-22.9 54.8-23.7 23.6-56 22.6-77.1 21.6-4.9 0-10.5-0.4-15.7-0.4-20.8 0-45.8 14.6-70.5 41.3-34.3 37.5-55.5 85.8-53.8 107.7 0.7 6.9 2.1 19.1 2.4 20.8 25 101.4-42.7 147.6-50.7 152.8-13.9 8.4-31.6 6.3-42.7-4.8l-112.1-112.2z"
  })
]);
StickyIcon.displayName = "StickyIcon";
const ArticleIcon = () => h$4(u$4, { name: "article" }, () => h$4("path", {
  d: "M853.333 938.667H170.667A42.667 42.667 0 0 1 128 896V128a42.667 42.667 0 0 1 42.667-42.667h682.666A42.667 42.667 0 0 1 896 128v768a42.667 42.667 0 0 1-42.667 42.667zm-42.666-85.334V170.667H213.333v682.666h597.334zM298.667 256h170.666v170.667H298.667V256zm0 256h426.666v85.333H298.667V512zm0 170.667h426.666V768H298.667v-85.333zm256-384h170.666V384H554.667v-85.333z"
}));
ArticleIcon.displayName = "ArticleIcon";
const BookIcon = () => h$4(u$4, { name: "book" }, () => h$4("path", {
  d: "M256 853.333h426.667A85.333 85.333 0 0 0 768 768V256a85.333 85.333 0 0 0-85.333-85.333H469.333a42.667 42.667 0 0 1 0-85.334h213.334A170.667 170.667 0 0 1 853.333 256v512a170.667 170.667 0 0 1-170.666 170.667H213.333A42.667 42.667 0 0 1 170.667 896V128a42.667 42.667 0 0 1 42.666-42.667h128A42.667 42.667 0 0 1 384 128v304.256l61.653-41.088a42.667 42.667 0 0 1 47.36 0l61.654 41.045V256A42.667 42.667 0 0 1 640 256v256a42.667 42.667 0 0 1-66.347 35.499l-104.32-69.547-104.32 69.547A42.667 42.667 0 0 1 298.667 512V170.667H256v682.666z"
}));
BookIcon.displayName = "BookIcon";
const LinkIcon = () => h$4(u$4, { name: "link" }, () => h$4("path", {
  d: "M460.8 584.533c17.067 17.067 17.067 42.667 0 59.734-17.067 17.066-42.667 17.066-59.733 0-85.334-85.334-85.334-217.6 0-302.934L554.667 192C640 110.933 776.533 110.933 857.6 196.267c81.067 81.066 81.067 213.333 0 294.4l-68.267 64c0-34.134-4.266-68.267-17.066-102.4l21.333-21.334c51.2-46.933 55.467-128 4.267-179.2s-128-55.466-179.2-4.266c-4.267 0-4.267 4.266-4.267 4.266L465.067 401.067c-51.2 51.2-51.2 132.266-4.267 183.466m123.733-183.466C601.6 384 627.2 384 644.267 401.067c85.333 85.333 85.333 217.6 0 302.933l-153.6 149.333C405.333 934.4 268.8 934.4 187.733 849.067c-81.066-81.067-81.066-213.334 0-294.4l68.267-64c0 34.133 4.267 72.533 17.067 102.4L251.733 614.4C204.8 665.6 204.8 746.667 256 793.6c51.2 46.933 123.733 46.933 174.933 0l149.334-149.333c51.2-51.2 51.2-128 0-179.2-12.8-17.067-17.067-46.934 4.266-64z"
}));
LinkIcon.displayName = "LinkIcon";
const ProjectIcon = () => h$4(u$4, { name: "project" }, () => h$4("path", {
  d: "M987.456 425.152H864V295.296a36.48 36.48 0 0 0-36.544-36.544h-360l-134.08-128.256A9.344 9.344 0 0 0 327.04 128H36.48A36.48 36.48 0 0 0 0 164.544v676.608a36.48 36.48 0 0 0 36.544 36.544h797.76a36.672 36.672 0 0 0 33.92-22.848L1021.44 475.52a36.48 36.48 0 0 0-33.92-50.304zM82.304 210.304h215.424l136.64 130.752h347.328v84.096H198.848A36.672 36.672 0 0 0 164.928 448L82.304 652.8V210.304zM808.32 795.456H108.544l118.08-292.608h699.904L808.32 795.52z"
}));
ProjectIcon.displayName = "ProjectIcon";
const FriendIcon = () => h$4(u$4, { name: "friend" }, () => h$4("path", {
  d: "M860.16 213.333A268.373 268.373 0 0 0 512 186.027a267.52 267.52 0 0 0-348.16 404.48L428.8 855.893a118.613 118.613 0 0 0 166.4 0l264.96-265.386a267.52 267.52 0 0 0 0-377.174zM800 531.627l-264.96 264.96a32.427 32.427 0 0 1-46.08 0L224 530.347a183.04 183.04 0 0 1 0-256 182.187 182.187 0 0 1 256 0 42.667 42.667 0 0 0 60.587 0 182.187 182.187 0 0 1 256 0 183.04 183.04 0 0 1 3.413 256z"
}));
FriendIcon.displayName = "FriendIcon";
const SlideDownIcon = () => h$4(u$4, { name: "slide-down" }, () => h$4("path", {
  d: "M108.775 312.23c13.553 0 27.106 3.734 39.153 11.806l375.205 250.338 363.641-252.808c32.587-21.624 76.499-12.83 98.123 19.757 21.685 32.467 12.95 76.56-19.576 98.184l-402.854 278.89c-23.733 15.901-54.694 15.962-78.547.12L69.501 442.097c-32.647-21.685-41.441-65.777-19.817-98.304 13.734-20.54 36.201-31.563 59.09-31.563Z"
}));
SlideDownIcon.displayName = "SlideDownIcon";
const emptyIcon = "";
const EmptyIcon = () => h$4("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  class: "empty-icon",
  viewBox: "0 0 1024 1024",
  innerHTML: '<defs><linearGradient id="f" x1="512.342" y1="2266.13" x2="512.342" y2="666.063" gradientUnits="userSpaceOnUse"><stop offset=".919" stop-color="#e6e6e6" stop-opacity="0"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="g" x1="528.912" y1="774" x2="388.088" y2="612" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#e6e6e6" stop-opacity="0"/></linearGradient><linearGradient id="h" x1="213.219" y1="721.704" x2="251.313" y2="683.61" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d7d7d7"/><stop offset=".485" stop-color="#fafafa"/><stop offset="1" stop-color="#fafafa"/></linearGradient><linearGradient id="i" x1="724.813" y1="821.718" x2="768.656" y2="777.876" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fafafa"/></linearGradient><linearGradient id="a" x1="513.493" y1="714.594" x2="471.007" y2="544.188" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#999"/><stop offset="1" stop-color="#ccc"/></linearGradient><linearGradient id="b" x1="440.156" y1="564.031" x2="508.594" y2="495.594" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="l" x1="660.988" y1="754.156" x2="608.637" y2="544.188" xlink:href="#a"/><linearGradient id="m" x1="479.188" y1="774.219" x2="649.782" y2="603.625" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#b3b3b3"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="n" x1="447.121" y1="774.219" x2="394.661" y2="563.813" xlink:href="#a"/><linearGradient id="o" x1="494" y1="597" x2="628" y2="463" xlink:href="#b"/><linearGradient id="d" x1="610.485" y1="604.938" x2="697.298" y2="518.125" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fff"/></linearGradient><linearGradient id="p" x1="457.438" y1="619.25" x2="353.469" y2="619.25" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e6e6e6" stop-opacity="0"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="q" x1="542.734" y1="674.25" x2="615.672" y2="601.313" xlink:href="#b"/><linearGradient id="c" x1="627.933" y1="358.938" x2="685.192" y2="422.531" gradientUnits="userSpaceOnUse"><stop offset=".4" stop-color="#e6e6e6" stop-opacity=".4"/><stop offset=".443" stop-color="#fff"/><stop offset=".6" stop-color="#ccc"/></linearGradient><linearGradient id="r" x1="618.547" y1="422.531" x2="681.547" y2="359.531" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e6e6e6"/><stop offset=".761" stop-color="#fff"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="s" x1="625" y1="441.5" x2="697" y2="369.5" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset=".761" stop-color="#fff"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="t" x1="627.681" y1="361.438" x2="692.257" y2="433.156" xlink:href="#c"/><linearGradient id="u" x1="561.414" y1="735.438" x2="573.149" y2="688.375" xlink:href="#d"/><linearGradient id="v" x1="405" y1="485.875" x2="440" y2="450.875" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fff" stop-opacity=".702"/></linearGradient><linearGradient id="w" x1="404.61" y1="486.906" x2="441.86" y2="449.656" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset=".495" stop-color="#ccc" stop-opacity=".702"/><stop offset=".498" stop-color="#ccc"/><stop offset="1" stop-color="#fff" stop-opacity=".302"/></linearGradient><radialGradient id="e" cx="329.297" cy="647.578" r="8.172" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fafafa"/><stop offset="1.2" stop-color="#e6e6e6"/></radialGradient><radialGradient id="j" cx="802.297" cy="673.578" r="8.172" xlink:href="#e"/><radialGradient id="k" cx="774.844" cy="642.75" r="5.531" xlink:href="#e"/></defs><path d="M512.33 666.07c441.828 0 800 358.18 800 800.03s-358.172 800.02-800 800.02-800-358.18-800-800.02 358.17-800.03 800-800.03z" style="fill:url(#f);fill-rule:evenodd"/><path d="m272 694 242-82 131 119-188 43z" style="fill:url(#g);fill-rule:evenodd"/><path fill="#b3b3b3" fill-rule="evenodd" d="M232.391 723.534a2.4 2.4 0 0 1 2.4 2.4v17.725a2.4 2.4 0 0 1-4.8 0v-17.725a2.4 2.4 0 0 1 2.4-2.4z"/><path d="M232.255 676.559c10.33 0 17.067 15.408 18.7 28.493 1.619 12.942-2.372 23.694-18.7 23.694-16.878 0-20.213-10.733-18.7-23.694 1.633-14.061 8.37-28.493 18.7-28.493z" style="fill:url(#h);fill-rule:evenodd"/><path fill="#b3b3b3" fill-rule="evenodd" d="M745.853 826h.938a2.4 2.4 0 0 1 2.4 2.4v22.238a2.4 2.4 0 0 1-2.4 2.4h-.938a2.4 2.4 0 0 1-2.4-2.4V828.4a2.4 2.4 0 0 1 2.4-2.4z"/><path d="M746.727 830.3c-19.438 0-23.278-9.326-21.541-20.59a34.467 34.467 0 0 1 3.289-10.369 16.628 16.628 0 0 1 0-9.112c2.889-12.327 12.059-20.911 18.356-20.911 6.56 0 15.468 9.1 18.356 20.911a14.589 14.589 0 0 1-.335 9.217 34.36 34.36 0 0 1 3.419 10.264c1.861 11.243-2.735 20.59-21.544 20.59z" style="fill:url(#i);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M328.841 654.562a6.571 6.571 0 0 0-5.2-5.027q-4.107-.952-.034-2.045a6.571 6.571 0 0 0 5.027-5.2q.952-4.109 2.045-.035a6.569 6.569 0 0 0 5.2 5.027q4.109.954.035 2.045a6.569 6.569 0 0 0-5.027 5.2q-.955 4.108-2.046.035z"/><path d="M328.383 653.73a6.567 6.567 0 0 0-5.2-5.027q-4.109-.954-.035-2.045a6.568 6.568 0 0 0 5.027-5.2q.954-4.107 2.046-.034a6.568 6.568 0 0 0 5.2 5.027q4.107.952.035 2.045a6.568 6.568 0 0 0-5.027 5.2q-.954 4.104-2.046.034z" style="fill:url(#e);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M801.841 680.562a6.571 6.571 0 0 0-5.2-5.027q-4.107-.952-.034-2.045a6.571 6.571 0 0 0 5.027-5.2q.952-4.109 2.045-.035a6.569 6.569 0 0 0 5.2 5.027q4.108.954.035 2.045a6.569 6.569 0 0 0-5.027 5.2q-.955 4.108-2.046.035z"/><path d="M801.383 679.73a6.567 6.567 0 0 0-5.2-5.027q-4.108-.954-.035-2.045a6.568 6.568 0 0 0 5.027-5.2q.954-4.107 2.046-.034a6.568 6.568 0 0 0 5.2 5.027q4.107.952.035 2.045a6.568 6.568 0 0 0-5.027 5.2q-.954 4.104-2.046.034z" style="fill:url(#j);fill-rule:evenodd"/><path d="M774.21 646.9a4.446 4.446 0 0 0-3.517-3.4q-2.778-.643-.023-1.383a4.443 4.443 0 0 0 3.4-3.517q.645-2.778 1.383-.023a4.443 4.443 0 0 0 3.517 3.4q2.778.645.023 1.383a4.446 4.446 0 0 0-3.4 3.517q-.645 2.78-1.383.023z" style="fill:url(#k);fill-rule:evenodd"/><path d="m385.6 714.6.158-150.658L598.9 544.174l-.158 150.658z" style="fill:url(#a);fill-rule:evenodd"/><path d="m385.474 564.031 214.763-19.383-36.171-49.067-215.559 17.634z" style="fill:url(#b);fill-rule:evenodd"/><path d="m598.744 694.832.156-150.658 71.975 59.319-.158 150.658z" style="fill:url(#l);fill-rule:evenodd"/><path d="m457.064 774.209.158-150.658 214.691-19.914-.158 150.663z" style="fill:url(#m);fill-rule:evenodd"/><path d="m384.566 714.459.158-150.659 72.5 59.75-.158 150.658z" style="fill:url(#n);fill-rule:evenodd"/><path d="M494 640s75.357-58.4 42-83-38.887 1.663-37 14 53.847 12.465 54-26c.2-49.979 75-125 75-125" style="fill:none;stroke-width:3px;stroke-dasharray:12 6;stroke:url(#o);fill-rule:evenodd"/><path d="m670.275 604.939-72.041-59.9 38.476-26.909 72.86 58.159z" style="fill:url(#d);fill-rule:evenodd"/><path d="m425.5 674.383-72.042-59.9 31.109-50.347 72.86 58.16z" style="fill:url(#p);fill-rule:evenodd"/><path d="m487.918 674.235 214.482-22.57-31.1-50.346-215.309 20.833z" style="fill:url(#q);fill-rule:evenodd"/><path style="fill:#fff;fill-rule:evenodd" d="m697.363 358.927-69.58 62.511-12.035 1.082z"/><path d="m697.363 358.927-69.58 62.511-12.035 1.082z" style="fill:url(#c);fill-rule:evenodd"/><path d="M615.748 422.52 604 413l92.089-53.46" style="fill:url(#r);fill-rule:evenodd"/><path d="m625 432 12 18 60-89" style="fill:url(#s);fill-rule:evenodd"/><path d="m626.98 421.335-2.471 11.828 70.918-71.735" style="fill:#fff;fill-rule:evenodd"/><path d="m626.98 421.335-2.471 11.828 70.918-71.735" style="fill:url(#t);fill-rule:evenodd"/><path d="m494.814 735.44 21.293-2.1v-6.613l-13.4 1.319v-6.965l10.977-1.08v-6.613l-10.977 1.08v-6.084l12.917-1.27v-6.525l-20.808 2.047v32.8zM521 732.863l7.054-.694v-11.241a106.361 106.361 0 0 0-1.014-11.274l.176-.017 2.645 7.586 4.453 11.553 4.32-.425 4.408-12.424 2.733-8.116.177-.018a111.811 111.811 0 0 0-1.014 11.474v11.241l7.185-.707V697l-8.552.841-5.025 14.646c-.618 1.956-1.147 4.08-1.808 6.173l-.22.022c-.617-1.968-1.146-3.987-1.808-5.818l-5.2-13.639-8.508.837v32.8zm37.213-3.661 7.891-.776v-10.889l3.835-.377c6.922-.681 12.961-4.714 12.961-12.517 0-8.111-5.951-10.082-13.181-9.371l-11.504 1.128v32.8zm7.891-17.881v-9.478l3.218-.316c3.792-.373 5.908.565 5.908 3.871 0 3.218-1.852 5.208-5.687 5.585zM594 725.682l7.891-.777v-26.274l8.905-.876v-6.524l-25.657 2.524v6.524l8.861-.871v26.274zm27.991-2.754 7.847-.772v-11.594l9.919-22.18-8.244.811-2.733 7.542c-.925 2.56-1.807 4.939-2.733 7.587l-.176.018c-.926-2.466-1.764-4.676-2.645-7.058l-2.734-7-8.375.824 9.874 20.233v11.594z" style="fill:url(#u);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M408.938 457.309a17.5 17.5 0 0 0 21.374 26.725 17.5 17.5 0 1 1-16.306-30.955 17.442 17.442 0 0 0-5.068 4.23z"/><circle cx="422.5" cy="468.375" r="17.5" style="fill:url(#v)"/><path fill="#ccc" fill-rule="evenodd" d="M391.76 451.5c-2.358 4.419 9.827 15.52 27.215 24.8 15.131 8.071 29.212 12.1 34.166 10.093-4.191 2.772-18.943-1.24-34.86-9.73-17.388-9.275-29.573-20.376-27.215-24.8a2.96 2.96 0 0 1 1.585-1.3 2.606 2.606 0 0 0-.891.937z"/><path d="M418.975 476.29c-17.388-9.275-29.573-20.376-27.215-24.8s18.363-.484 35.751 8.791 29.572 20.376 27.215 24.8-18.364.483-35.751-8.791zm31.634 5.732c1.824-3.42-8.789-12.642-23.7-20.6s-28.486-11.633-30.31-8.213 8.789 12.642 23.7 20.6 28.486 11.633 30.31 8.213zm-36.645-29.008-2.775 1.452.032 1.751 28.637 14.183.266-4.559z" style="fill:url(#w);fill-rule:evenodd"/><g class="people"><path style="fill:#f8cfad;fill-rule:evenodd" d="m612.131 676.5 1.362 3.532 3.255-2.324-1.361-3.532zM629.131 665.5l1.362 3.532 3.255-2.324-1.361-3.532z"/><path style="fill:#141a33;fill-rule:evenodd" d="m617.764 678.184-3.162-.078a11.028 11.028 0 0 0-1.034 3.454c-.258 2.006-1.177 5-.449 5.367 1.5 2.659 4.118-.215 4.118-.215s2.187-2.848 1.925-5.265c-.106-.973-1.181-1.869-1.398-3.263zM633.781 665.855l3.019.945a11.008 11.008 0 0 1-.137 3.6c-.4 1.981-.179 4.166-.986 4.277-2.283 2.03-3.827-1.533-3.827-1.533s-1.473-2.456-.444-4.659c.412-.88 1.718-1.385 2.375-2.63z"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M599.935 592.534s10.293 9.761 11.95 7.564 3.536-3.463-6.758-13.65z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M611.3 596.361c1.674-1.105 11.5 7.048 14.5 11.774s-12.705-4.36-14.632-6.776-1.54-3.893.132-4.998z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M621.815 607.988s1.809 2.549 2.433 1.756 2.475-1.064 2.449-1.138.1-.819 1.288-2.331-3.8-3.632-5.81-.494a2.556 2.556 0 0 0-.36 2.207z"/><path fill="#232c57" fill-rule="evenodd" d="M598 617s14.968-5.618 17 7a150.235 150.235 0 0 1 2 22s12.666 11.836 16 19c0 0-4.753-1.629-4 2 0 0-18.132-14.647-19-19s-9.148-18.716-12-31z"/><path d="M589 622s14.968-5.618 17 7a150.235 150.235 0 0 1 2 22s4.666 17.836 8 25c0 0-4.753-1.629-4 2 0 0-10.132-20.647-11-25s-9.148-18.716-12-31z" style="fill:#292966;fill-rule:evenodd"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M585.626 597.7s-10.292 9.761-11.95 7.563-3.536-3.463 6.758-13.65z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M574.259 601.529c-1.675-1.105-11.5 7.049-14.5 11.774s12.7-4.36 14.631-6.775 1.543-3.894-.131-4.999z"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M591.715 577.752s-.606 1.681 1.48 3.716-3.615 5.307-4.645 2.85-.48-2.716-.48-2.716z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M583.527 574.123c-.839 1.043.491 3.873 1.453 5.449s2.749 2.833 3.364 2.428 4.088-2.657 4-4-.228-3.4-.228-3.4 2.562-1.641 2.154-2.916-2.916-.154-2.916-.154a15.853 15.853 0 0 0-.227-2.224c-.189-.929-6.887-1.445-7.827 2.6s.558 1.805.227 2.217z"/><path fill="#232c57" fill-rule="evenodd" d="M584.227 567.758c2.1-.885 7.2-3.684 10.125.318s.842 4.385.989 5.294-1.894 5.69-1.341 6.63-3.865.8-4.657-1.179-2.844-.539-2.227-1.224-1.3-4.456-2.916-2.154a9.252 9.252 0 0 0 .309-1.38c-.115.192.259-3.257-.673-1.32s-2.1 1.037-3.069.762-1.8-1.118-1.071-1.689c.023-.016 2.436-3.172 4.531-4.058z"/><path d="M589 585c-2.584-.47-10.055.362-13 13 0 0 1.9 3.349 5 4s6 21 6 21 24.016 11.06 27-3c-.07-13.826-8-21-8-21s5.829-3.2 5-6-8.016-10.153-11-10-6 0-6 0-2.416 2.47-5 2z" style="fill:#f6bb07;fill-rule:evenodd"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M563.284 612.581s-.986 2.965-1.814 2.389-2.678-.3-2.675-.374-.333-.755-1.912-1.854 2.577-4.583 5.414-2.167a2.551 2.551 0 0 1 .987 2.006z"/></g>'
});
EmptyIcon.displayName = "EmptyIcon";
const LockIcon = () => h$4(u$4, { name: "lock" }, () => h$4("path", {
  d: "M787.168 952.268H236.832c-30.395 0-55.033-24.638-55.033-55.033V429.45c0-30.395 24.638-55.034 55.033-55.034h82.55V264.35c0-106.38 86.238-192.618 192.618-192.618S704.618 157.97 704.618 264.35v110.066h82.55c30.395 0 55.033 24.639 55.033 55.034v467.785c0 30.395-24.639 55.033-55.033 55.033zM484.483 672.046v115.122h55.034V672.046c31.99-11.373 55.033-41.605 55.033-77.496 0-45.592-36.958-82.55-82.55-82.55s-82.55 36.958-82.55 82.55c0 35.89 23.042 66.123 55.033 77.496zM622.067 264.35c0-60.788-49.28-110.067-110.067-110.067s-110.067 49.28-110.067 110.067v110.066h220.135V264.35z"
}));
LockIcon.displayName = "LockIcon";
const articleItem = "";
const ArticleItem = defineComponent({
  name: "ArticleItem",
  props: {
    /**
     * Article information
     *
     * 文章信息
     */
    info: {
      type: Object,
      required: true
    },
    /**
     * Article path
     *
     * 文章路径
     */
    path: { type: String, required: true }
  },
  slots: Object,
  setup(props, { slots }) {
    const articleInfo = toRef(props, "info");
    const { info: pageInfo2, items } = useArticleInfo(props);
    return () => {
      var _a2, _b2, _c;
      const { [ArticleInfoType.title]: title, [ArticleInfoType.type]: type, [ArticleInfoType.isEncrypted]: isEncrypted = false, [ArticleInfoType.cover]: cover, [ArticleInfoType.excerpt]: excerpt, [ArticleInfoType.sticky]: sticky } = articleInfo.value;
      const info = pageInfo2.value;
      return h$4("div", { class: "vp-article-wrapper" }, h$4("article", {
        class: "vp-article-item",
        vocab: "https://schema.org/",
        typeof: "Article"
      }, [
        ((_a2 = slots.cover) == null ? void 0 : _a2.call(slots, { cover })) || (cover ? [
          h$4("img", {
            class: "vp-article-cover",
            src: withBase(cover)
          }),
          h$4("meta", {
            property: "image",
            content: withBase(cover)
          })
        ] : []),
        sticky ? h$4(StickyIcon) : null,
        h$4(j$1, { to: props.path }, () => {
          var _a3;
          return ((_a3 = slots.title) == null ? void 0 : _a3.call(slots, { title, isEncrypted, type })) || h$4("header", { class: "vp-article-title" }, [
            isEncrypted ? h$4(LockIcon) : null,
            type === PageType.slide ? h$4(SlideIcon) : null,
            h$4("span", { property: "headline" }, title)
          ]);
        }),
        ((_b2 = slots.excerpt) == null ? void 0 : _b2.call(slots, { excerpt })) || (excerpt ? h$4("div", {
          class: "vp-article-excerpt",
          innerHTML: excerpt
        }) : null),
        h$4("hr", { class: "vp-article-hr" }),
        ((_c = slots.info) == null ? void 0 : _c.call(slots, { info })) || h$4(PageInfo, {
          info,
          ...items.value ? { items: items.value } : {}
        })
      ]));
    };
  }
});
const message = "";
const pagination = "";
const Pagination = defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pagination",
  props: {
    /**
     * Number of total items
     *
     * 项目总数
     */
    total: { type: Number, default: 10 },
    /**
     * Items per page
     *
     * 每页项目数
     */
    perPage: { type: Number, default: 10 },
    /**
     * Current page number
     *
     * 当前页面
     */
    current: { type: Number, default: 1 }
  },
  emits: ["updateCurrentPage"],
  setup(props, { emit }) {
    let message2;
    const themeLocale = useThemeLocaleData();
    const input = ref("");
    const locale = computed(() => themeLocale.value.paginationLocales);
    const totalPages = computed(() => Math.ceil(props.total / props.perPage));
    const enable = computed(() => Boolean(totalPages.value) && totalPages.value !== 1);
    const displayLeftEllipsis = computed(() => {
      if (totalPages.value < 7)
        return false;
      return props.current > 4;
    });
    const displayRightEllipsis = computed(() => {
      if (totalPages.value < 7)
        return false;
      return props.current < totalPages.value - 3;
    });
    const indexes = computed(() => {
      const { current: currentPage } = props;
      let min = 1;
      let max2 = totalPages.value;
      const arr = [];
      if (totalPages.value >= 7) {
        if (currentPage <= 4 && currentPage < totalPages.value - 3) {
          min = 1;
          max2 = 5;
        } else if (currentPage > 4 && currentPage >= totalPages.value - 3) {
          max2 = totalPages.value;
          min = totalPages.value - 4;
        } else if (totalPages.value > 7) {
          min = currentPage - 2;
          max2 = currentPage + 2;
        }
      }
      for (let i2 = min; i2 <= max2; i2++)
        arr.push(i2);
      return arr;
    });
    const navigate = (page2) => emit("updateCurrentPage", page2);
    const jumpPage = (index2) => {
      const pageNum = parseInt(index2);
      if (pageNum <= totalPages.value && pageNum > 0)
        navigate(pageNum);
      else
        message2.pop(`<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M64 512a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#FA5151"/><path d="m557.3 512 113.1-113.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L512 466.7 398.9 353.6c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L466.7 512 353.6 625.1c-12.5 12.5-12.5 32.8 0 45.3 6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4L512 557.3l113.1 113.1c6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4c12.5-12.5 12.5-32.8 0-45.3L557.3 512z" fill="#FFF"/></svg>${locale.value.errorText.replace(/\$page/g, totalPages.value.toString())}`);
    };
    onMounted(() => {
      message2 = new De();
    });
    return () => h$4("div", { class: "vp-pagination" }, enable.value ? h$4("div", { class: "vp-pagination-list" }, [
      h$4("div", { class: "vp-pagination-number " }, [
        // prev button
        props.current > 1 ? h$4("div", {
          class: "prev",
          role: "navigation",
          unselectable: "on",
          onClick: () => navigate(props.current - 1)
        }, locale.value.prev) : null,
        // left ellipsis
        displayLeftEllipsis.value ? [
          h$4("div", {
            role: "navigation",
            onClick: () => navigate(1)
          }, 1),
          h$4("div", { class: "ellipsis" }, "...")
        ] : null,
        // numbers
        indexes.value.map((num) => h$4("div", {
          key: num,
          class: { active: props.current === num },
          role: "navigation",
          onClick: () => navigate(num)
        }, num)),
        // right ellipsis
        displayRightEllipsis.value ? [
          h$4("div", { class: "ellipsis" }, "..."),
          h$4("div", {
            role: "navigation",
            onClick: () => navigate(totalPages.value)
          }, totalPages.value)
        ] : null,
        // next button
        props.current < totalPages.value ? h$4("div", {
          class: "next",
          role: "navigation",
          unselectable: "on",
          onClick: () => navigate(props.current + 1)
        }, locale.value.next) : null
      ]),
      h$4("div", { class: "vp-pagination-nav" }, [
        h$4("label", { for: "navigation-text" }, `${locale.value.navigate}: `),
        h$4("input", {
          id: "navigation-text",
          value: input.value,
          onInput: ({ target }) => {
            input.value = target.value;
          },
          onKeydown: (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              jumpPage(input.value);
            }
          }
        }),
        h$4("button", {
          class: "vp-pagination-button",
          role: "navigation",
          title: locale.value.action,
          onClick: () => jumpPage(input.value)
        }, locale.value.action)
      ])
    ]) : []);
  }
});
const articleList = "";
const ArticleList = defineComponent({
  name: "ArticleList",
  props: {
    /**
     * Articles
     *
     * 文章项目
     */
    items: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const blogOptions = useBlogOptions();
    const currentPage = ref(1);
    const articlePerPage = computed(() => blogOptions.value.articlePerPage || 10);
    const currentArticles = computed(() => props.items.slice((currentPage.value - 1) * articlePerPage.value, currentPage.value * articlePerPage.value));
    const updatePage = (page2) => {
      currentPage.value = page2;
      const query = { ...route.query };
      if (query["page"] === page2.toString() || page2 === 1 && !query["page"])
        return;
      if (page2 === 1)
        delete query["page"];
      else
        query["page"] = page2.toString();
      void router.push({ path: route.path, query });
    };
    onMounted(() => {
      const { page: page2 } = route.query;
      updatePage(page2 ? Number(page2) : 1);
      void import(
        /* webpackChunkName: "pageview" */
        "./assets/pageview-b46facd5.js"
      ).then(({ updatePageview }) => {
        updatePageview();
      });
      watch(currentPage, () => {
        const distance = document.querySelector("#article-list").getBoundingClientRect().top + window.scrollY;
        setTimeout(() => {
          window.scrollTo(0, distance);
        }, 100);
      });
      watch(() => route.query, ({ page: page3 }) => {
        updatePage(page3 ? Number(page3) : 1);
      });
    });
    return () => h$4("div", { id: "article-list", class: "vp-article-list" }, currentArticles.value.length ? [
      ...currentArticles.value.map(({ info, path }, index2) => h$4(DropTransition, { appear: true, delay: index2 * 0.04 }, () => h$4(ArticleItem, { key: path, info, path }))),
      h$4(Pagination, {
        current: currentPage.value,
        perPage: articlePerPage.value,
        total: props.items.length,
        onUpdateCurrentPage: updatePage
      })
    ] : h$4(EmptyIcon));
  }
});
const categoryList = "";
const CategoryList = defineComponent({
  name: "CategoryList",
  setup() {
    const page2 = usePageData();
    const categoryMap2 = useCategoryMap();
    return () => h$4("ul", { class: "vp-category-list" }, M$4(categoryMap2.value.map).map(([category, { path, items }]) => h$4("li", {
      class: [
        "vp-category",
        // TODO: magic number 9 is tricky here
        `vp-category${he(category, 9)}`,
        { active: path === page2.value.path }
      ]
    }, h$4(j$1, { to: path }, () => [
      category,
      h$4("span", { class: "count" }, items.length)
    ]))));
  }
});
const tagList = "";
const TagList = defineComponent({
  name: "TagList",
  setup() {
    const frontmatter = usePageFrontmatter();
    const tagMap = useTagMap();
    const isActive = (name) => {
      var _a2;
      return name === ((_a2 = frontmatter.value.blog) == null ? void 0 : _a2.name);
    };
    return () => h$4("ul", { class: "tag-list-wrapper" }, M$4(tagMap.value.map).map(([tag, { path, items }]) => h$4("li", {
      class: [
        "tag",
        // TODO: magic number 9 is tricky here
        `tag${he(tag, 9)}`,
        { active: isActive(tag) }
      ]
    }, h$4(j$1, { to: path }, () => [
      tag,
      h$4("span", { class: "tag-num" }, items.length)
    ]))));
  }
});
const timelineList = "";
const TimelineList = defineComponent({
  name: "TimelineList",
  setup() {
    const themeLocale = useThemeLocaleData();
    const timelines = useTimelines();
    const navigate = useNavigate();
    const hint = computed(() => themeLocale.value.blogLocales.timeline);
    return () => h$4("div", { class: "timeline-list-wrapper" }, [
      h$4("div", {
        class: "timeline-list-title",
        onClick: () => navigate(timelines.value.path)
      }, [
        h$4(TimelineIcon),
        h$4("span", { class: "num" }, timelines.value.items.length),
        hint.value
      ]),
      h$4("hr"),
      h$4("div", { class: "timeline-content" }, h$4("ul", { class: "timeline-list" }, timelines.value.config.map(({ year, items }, index2) => h$4(DropTransition, { appear: true, delay: 0.08 * (index2 + 1) }, () => h$4("li", [
        h$4("h3", { class: "timeline-year" }, year),
        h$4("ul", { class: "timeline-year-wrapper" }, items.map(({ date, info, path }) => h$4("li", { class: "timeline-item" }, [
          h$4("span", { class: "timeline-date" }, date),
          h$4(j$1, { class: "timeline-title", to: path }, () => info[ArticleInfoType.title])
        ])))
      ])))))
    ]);
  }
});
const infoList = "";
const InfoList = defineComponent({
  name: "InfoList",
  setup() {
    const themeLocale = useThemeLocaleData();
    const articles = useArticles();
    const categoryMap2 = useCategoryMap();
    const categoryNumber = computed(() => f$2(categoryMap2.value.map).length);
    const stars = useStars();
    const tagMap = useTagMap();
    const tagNumber = computed(() => f$2(tagMap.value.map).length);
    const navigate = useNavigate();
    const active = ref("article");
    const locale = computed(() => themeLocale.value.blogLocales);
    const buttons = [
      ["article", ArticleIcon],
      ["category", CategoryIcon],
      ["tag", TagIcon],
      ["timeline", TimelineIcon]
    ];
    return () => h$4("div", { class: "vp-blog-infos" }, [
      h$4("div", { class: "vp-blog-type-switcher" }, buttons.map(([key, icon]) => h$4("button", {
        type: "button",
        class: "vp-blog-type-button",
        onClick: () => {
          active.value = key;
        }
      }, h$4("div", {
        class: ["icon-wrapper", { active: active.value === key }],
        "aria-label": locale.value[key],
        "data-balloon-pos": "up"
      }, h$4(icon))))),
      h$4(DropTransition, () => (
        // article
        active.value === "article" ? h$4("div", { class: "vp-sticky-article-wrapper" }, [
          h$4("div", {
            class: "title",
            onClick: () => navigate(articles.value.path)
          }, [
            h$4(ArticleIcon),
            h$4("span", { class: "num" }, articles.value.items.length),
            locale.value.article
          ]),
          h$4("hr"),
          h$4("ul", { class: "vp-sticky-articles" }, stars.value.items.map(({ info, path }, index2) => h$4(DropTransition, { appear: true, delay: 0.08 * (index2 + 1) }, () => h$4("li", { class: "vp-sticky-article" }, h$4(j$1, { to: path }, () => info[ArticleInfoType.title])))))
        ]) : active.value === "category" ? h$4("div", { class: "vp-category-wrapper" }, [
          categoryNumber.value ? h$4("div", {
            class: "title",
            onClick: () => navigate(categoryMap2.value.path)
          }, [
            h$4(CategoryIcon),
            h$4("span", { class: "num" }, categoryNumber.value),
            locale.value.category
          ]) : null,
          h$4("hr"),
          h$4(DropTransition, { delay: 0.04 }, () => h$4(CategoryList))
        ]) : active.value === "tag" ? h$4("div", { class: "vp-tag-wrapper" }, [
          tagNumber.value ? h$4("div", {
            class: "title",
            onClick: () => navigate(tagMap.value.path)
          }, [
            h$4(TagIcon),
            h$4("span", { class: "num" }, tagNumber.value),
            locale.value.tag
          ]) : null,
          h$4("hr"),
          h$4(DropTransition, { delay: 0.04 }, () => h$4(TagList))
        ]) : h$4(DropTransition, () => h$4(TimelineList))
      ))
    ]);
  }
});
const page = "";
const BlogWrapper = defineComponent({
  name: "BlogWrapper",
  slots: Object,
  setup(_props, { slots }) {
    const { isMobile } = useWindowSize();
    return () => [
      h$4(SkipLink),
      h$4(CommonWrapper, { noSidebar: true, noToc: true }, {
        default: () => slots.default(),
        navScreenBottom: () => h$4(BloggerInfo),
        ...isMobile.value ? { sidebar: () => h$4(InfoList) } : {}
      })
    ];
  }
});
const infoPanel = "";
const InfoPanel = () => h$4("aside", { class: "vp-blog-info-wrapper" }, [
  h$4(DropTransition, () => h$4(BloggerInfo)),
  h$4(DropTransition, { delay: 0.04 }, () => h$4(InfoList))
]);
InfoPanel.displayName = "InfoPanel";
const BlogCategory = defineComponent({
  name: "BlogPage",
  components: {
    CategoryList,
    TagList
  },
  setup() {
    const page2 = usePageData();
    const frontmatter = usePageFrontmatter();
    const categoryMap2 = useCategoryMap();
    const tagMap = useTagMap();
    const blogOptions = computed(() => frontmatter.value.blog || {});
    const componentName = computed(() => {
      const { key = "" } = blogOptions.value;
      return key === "category" ? "CategoryList" : key === "tag" ? "TagList" : null;
    });
    const items = computed(() => {
      const { name = "", key = "" } = blogOptions.value;
      return key === "category" ? name ? categoryMap2.value.map[name].items : [] : key === "tag" ? name ? tagMap.value.map[name].items : [] : [];
    });
    return () => h$4(BlogWrapper, () => h$4("div", { class: "vp-page vp-blog" }, h$4("div", { class: "blog-page-wrapper" }, [
      h$4("main", { id: "main-content", class: "vp-blog-main" }, [
        h$4(DropTransition, () => componentName.value ? h$4(resolveComponent(componentName.value)) : null),
        blogOptions.value.name ? h$4(DropTransition, { appear: true, delay: 0.24 }, () => h$4(ArticleList, { key: page2.value.path, items: items.value })) : null
      ]),
      h$4(DropTransition, { delay: 0.16 }, () => h$4(InfoPanel, { key: "blog" }))
    ])));
  }
});
const defaultHeroBgImagePath = "/space/assets/hero-197a9d2d.jpg";
const blogHero = "";
const BlogHero = defineComponent({
  name: "BlogHero",
  slots: Object,
  setup(_props, { slots }) {
    const frontmatter = usePageFrontmatter();
    const siteLocale = useSiteLocaleData();
    const hero = shallowRef();
    const isFullScreen = computed(() => frontmatter.value.heroFullScreen ?? false);
    const heroInfo2 = computed(() => {
      const { heroText, heroImage, heroImageDark, heroAlt, heroImageStyle, tagline } = frontmatter.value;
      return {
        text: heroText ?? siteLocale.value.title ?? "Hello",
        image: heroImage ? withBase(heroImage) : null,
        imageDark: heroImageDark ? withBase(heroImageDark) : null,
        heroStyle: heroImageStyle,
        alt: heroAlt || heroText || "hero image",
        tagline: tagline ?? "",
        isFullScreen: isFullScreen.value
      };
    });
    const bgInfo = computed(() => {
      const { bgImage, bgImageDark, bgImageStyle } = frontmatter.value;
      return {
        image: isString(bgImage) ? withBase(bgImage) : bgImage === false ? null : defaultHeroBgImagePath,
        imageDark: isString(bgImageDark) ? withBase(bgImageDark) : null,
        bgStyle: bgImageStyle,
        isFullScreen: isFullScreen.value
      };
    });
    return () => {
      var _a2, _b2;
      return frontmatter.value.hero === false ? null : h$4("div", {
        ref: hero,
        class: [
          "vp-blog-hero",
          {
            fullscreen: isFullScreen.value,
            "no-bg": !bgInfo.value.image
          }
        ]
      }, [
        ((_a2 = slots.heroBg) == null ? void 0 : _a2.call(slots, bgInfo.value)) || [
          bgInfo.value.image ? h$4("div", {
            class: [
              "vp-blog-mask",
              { light: bgInfo.value.imageDark }
            ],
            style: [
              {
                background: `url(${bgInfo.value.image}) center/cover no-repeat`
              },
              bgInfo.value.bgStyle
            ]
          }) : null,
          bgInfo.value.imageDark ? h$4("div", {
            class: "vp-blog-mask dark",
            style: [
              {
                background: `url(${bgInfo.value.imageDark}) center/cover no-repeat`
              },
              bgInfo.value.bgStyle
            ]
          }) : null
        ],
        ((_b2 = slots.heroInfo) == null ? void 0 : _b2.call(slots, heroInfo2.value)) || [
          h$4(DropTransition, { appear: true, type: "group", delay: 0.04 }, () => [
            heroInfo2.value.image ? h$4("img", {
              key: "light",
              class: [
                "vp-blog-hero-image",
                { light: heroInfo2.value.imageDark }
              ],
              style: heroInfo2.value.heroStyle,
              src: heroInfo2.value.image,
              alt: heroInfo2.value.alt
            }) : null,
            heroInfo2.value.imageDark ? h$4("img", {
              key: "dark",
              class: "vp-blog-hero-image dark",
              style: heroInfo2.value.heroStyle,
              src: heroInfo2.value.imageDark,
              alt: heroInfo2.value.alt
            }) : null
          ]),
          h$4(DropTransition, { appear: true, delay: 0.08 }, () => heroInfo2.value.text ? h$4("h1", { class: "vp-blog-hero-title" }, heroInfo2.value.text) : null),
          h$4(DropTransition, { appear: true, delay: 0.12 }, () => heroInfo2.value.tagline ? h$4("p", {
            class: "vp-blog-hero-description",
            innerHTML: heroInfo2.value.tagline
          }) : null)
        ],
        heroInfo2.value.isFullScreen ? h$4("button", {
          type: "button",
          class: "slide-down-button",
          onClick: () => {
            window.scrollTo({
              top: hero.value.clientHeight,
              behavior: "smooth"
            });
          }
        }, [h$4(SlideDownIcon), h$4(SlideDownIcon)]) : null
      ]);
    };
  }
});
const projectPanel = "";
const AVAILABLE_PROJECT_TYPES = [
  "link",
  "article",
  "book",
  "project",
  "friend"
];
const ProjectPanel = defineComponent({
  name: "ProjectPanel",
  components: { ArticleIcon, BookIcon, FriendIcon, LinkIcon, ProjectIcon },
  setup() {
    const frontmatter = usePageFrontmatter();
    const pure = usePure();
    const navigate = useNavigate();
    const renderIcon = (icon = "", alt = "icon") => {
      if (AVAILABLE_PROJECT_TYPES.includes(icon))
        return h$4(resolveComponent(`${icon}-icon`));
      if (isLinkHttp(icon))
        return h$4("img", { class: "vp-project-image", src: icon, alt });
      if (Oe(icon))
        return h$4("img", {
          class: "vp-project-image",
          src: withBase(icon),
          alt
        });
      return h$4(HopeIcon, { icon });
    };
    return () => {
      var _a2;
      return ((_a2 = frontmatter.value.projects) == null ? void 0 : _a2.length) ? h$4("div", { class: "vp-project-panel" }, frontmatter.value.projects.map(({ icon, link, name, desc }, index2) => h$4("div", {
        class: [
          "vp-project-card",
          // TODO: magic number 9 is tricky here
          { [`project${index2 % 9}`]: !pure.value }
        ],
        onClick: () => navigate(link)
      }, [
        renderIcon(icon, name),
        h$4("div", { class: "vp-project-name" }, name),
        h$4("div", { class: "vp-project-desc" }, desc)
      ]))) : null;
    };
  }
});
const home = "";
const BlogHome$1 = defineComponent({
  name: "BlogHome",
  setup() {
    const articles = useArticles();
    return () => h$4("div", { class: "vp-page vp-blog" }, [
      h$4(BlogHero),
      h$4("div", { class: "blog-page-wrapper" }, [
        h$4("main", { id: "main-content", class: "vp-blog-main" }, [
          h$4(DropTransition, { appear: true, delay: 0.16 }, () => h$4(ProjectPanel)),
          h$4(DropTransition, { appear: true, delay: 0.24 }, () => h$4(ArticleList, { items: articles.value.items }))
        ]),
        h$4(DropTransition, { appear: true, delay: 0.16 }, () => h$4(InfoPanel, { key: "blog" }))
      ]),
      h$4(DropTransition, { appear: true, delay: 0.28 }, () => h$4(MarkdownContent))
    ]);
  }
});
const BlogHome = defineComponent({
  name: "BlogHome",
  setup() {
    return () => h$4(BlogWrapper, () => h$4(BlogHome$1));
  }
});
const articleType = "";
const ArticleType = defineComponent({
  name: "ArticleType",
  setup() {
    const page2 = usePageData();
    const localePath = useRouteLocale();
    const themeLocale = useThemeLocaleData();
    const articles = useArticles();
    const stars = useStars();
    const types = computed(() => {
      const locale = themeLocale.value.blogLocales;
      return [
        {
          text: locale.all,
          path: articles.value.path
        },
        { text: locale.star, path: stars.value.path },
        ...[].map(({ key, path }) => ({
          text: locale[key],
          path: path.replace(/^\//, localePath.value)
        }))
      ];
    });
    return () => h$4("ul", { class: "vp-article-type-wrapper" }, types.value.map((type) => h$4("li", {
      class: [
        "vp-article-type",
        { active: type.path === page2.value.path }
      ]
    }, h$4(j$1, { to: type.path }, () => type.text))));
  }
});
const BlogType = defineComponent({
  name: "BlogPage",
  setup() {
    const blogType = C();
    const frontmatter = usePageFrontmatter();
    const page2 = usePageData();
    const articles = useArticles();
    const stars = useStars();
    const items = computed(() => {
      const { key = "", type } = frontmatter.value.blog || {};
      return key === "star" ? stars.value.items : type === "type" && key ? blogType.value.items : articles.value.items;
    });
    return () => h$4(BlogWrapper, () => h$4("div", { class: "vp-page vp-blog" }, h$4("div", { class: "blog-page-wrapper" }, [
      h$4("main", { id: "main-content", class: "vp-blog-main" }, [
        h$4(DropTransition, () => h$4(ArticleType)),
        h$4(DropTransition, { appear: true, delay: 0.24 }, () => h$4(ArticleList, { key: page2.value.path, items: items.value }))
      ]),
      h$4(DropTransition, { delay: 0.16 }, () => h$4(InfoPanel, { key: "blog" }))
    ])));
  }
});
const timelineItems = "";
const TimelineItems = defineComponent({
  name: "TimelineItems",
  setup() {
    const blogOptions = useBlogOptions();
    const themeLocale = useThemeLocaleData();
    const timelines = useTimelines();
    const hint = computed(() => blogOptions.value.timeline || themeLocale.value.blogLocales.timelineTitle);
    const items = computed(() => timelines.value.config.map(({ year }) => ({
      title: year.toString(),
      level: 2,
      slug: year.toString(),
      children: []
    })));
    return () => h$4("div", { class: "timeline-wrapper" }, h$4("ul", { class: "timeline-content" }, [
      h$4(DropTransition, () => h$4("li", { class: "motto" }, hint.value)),
      h$4(TOC, { items: items.value }),
      timelines.value.config.map(({ year, items: items2 }, index2) => h$4(DropTransition, { appear: true, delay: 0.08 * (index2 + 1), type: "group" }, () => [
        h$4("h3", { key: "title", id: year, class: "timeline-year-title" }, h$4("span", year)),
        h$4("li", { key: "content", class: "timeline-year-list" }, [
          h$4("ul", { class: "timeline-year-wrapper" }, items2.map(({ date, info, path }) => h$4("li", { class: "timeline-item" }, [
            h$4("span", { class: "timeline-date" }, date),
            h$4(j$1, {
              class: "timeline-title",
              to: path
            }, () => info[ArticleInfoType.title])
          ])))
        ])
      ]))
    ]));
  }
});
const Timeline = defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Timeline",
  components: {
    ArticleType,
    CategoryList,
    TagList
  },
  setup() {
    return () => h$4(BlogWrapper, () => h$4("div", { class: "vp-page vp-blog" }, h$4("div", { class: "blog-page-wrapper" }, [
      h$4("main", { id: "main-content", class: "vp-blog-main" }, [
        h$4(DropTransition, { appear: true, delay: 0.24 }, () => h$4(TimelineItems))
      ]),
      h$4(DropTransition, { delay: 0.16 }, () => h$4(InfoPanel, { key: "blog" }))
    ])));
  }
});
const layout = "";
const slidePage = "";
var d = defineComponent({ name: "SlidePage", setup() {
  const a2 = useRouter(), o2 = ref(false), n2 = shallowRef(), s2 = () => {
    o2.value = !o2.value;
  }, e2 = () => {
    o2.value = false;
  }, u2 = () => {
    e2(), window.history.go(-1);
  }, i2 = () => {
    e2(), a2.push("/");
  };
  return onClickOutside(n2, e2), () => h$4("div", { class: "vp-reveal-page" }, [h$4(Content), h$4("div", { ref: n2, class: ["vp-reveal-menu", { active: o2.value }] }, [h$4("button", { type: "button", class: "menu-button", onClick: () => s2() }, h$4("span", { class: "icon" })), h$4("button", { type: "button", class: "back-button", onClick: () => u2() }, h$4(q$1)), h$4("button", { type: "button", class: "home-button", onClick: () => i2() }, h$4(a$3))])]);
} });
const index = "";
a$4(HopeIcon);
const clientConfig12 = defineClientConfig({
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;
    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();
      return scrollBehavior(...args);
    };
    injectDarkmode(app);
    app.component("HopeIcon", HopeIcon);
    app.component("VPLink", j$1);
    app.component("BloggerInfo", BloggerInfo);
  },
  setup: () => {
    setupDarkmode();
    setupSidebarItems();
    setupBlog();
  },
  layouts: {
    Layout,
    NotFound,
    BlogCategory,
    BlogHome,
    BlogType,
    Timeline,
    Slide: d
  }
});
const pwaEventSymbol = Symbol("pwaEvent");
const usePwaEvent = () => {
  const pwaEvent = inject(pwaEventSymbol);
  if (!pwaEvent) {
    throw new Error("usePwaEvent() is called without provider.");
  }
  return pwaEvent;
};
const useSkipWaiting = (registration) => {
  const worker = registration.waiting;
  if (!worker)
    return;
  const channel = new MessageChannel();
  worker.postMessage({ type: "SKIP_WAITING" }, [channel.port2]);
};
const clientConfig13 = defineClientConfig({
  setup() {
    return;
  }
});
const vars = "";
const pwaPopup = "";
defineComponent({
  name: "PwaPopup",
  props: {
    locales: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  setup(props) {
    const event = usePwaEvent();
    const routeLocale = useRouteLocale();
    const locale = computed(() => props.locales[routeLocale.value] ?? {
      message: "New content is available.",
      buttonText: "Refresh"
    });
    const show = ref(false);
    const registration = ref(null);
    const onClick = () => {
      show.value = false;
      if (registration.value) {
        useSkipWaiting(registration.value);
        location.reload(true);
      }
    };
    event.on("updated", (reg) => {
      if (reg) {
        registration.value = reg;
        show.value = true;
      }
    });
    return () => h$4(Transition, {
      name: "pwa-popup"
    }, () => show.value ? h$4("div", {
      class: "pwa-popup"
    }, [
      locale.value.message,
      h$4("br"),
      h$4("button", {
        onClick
      }, locale.value.buttonText)
    ]) : null);
  }
});
const clientConfig14 = defineClientConfig({
  rootComponents: [
    // wrap the `<PwaPopup />` component with plugin options
    defineComponent(() => {
      return () => null;
    })
  ]
});
const useDocsearchHotkeyListener = (callback) => {
  const remove = useEventListener("keydown", (event) => {
    const isHotKeyBind = event.key === "k" && (event.ctrlKey || event.metaKey);
    const isSlashKey = event.key === "/";
    if (!isSlashKey && !isHotKeyBind) {
      return;
    }
    event.preventDefault();
    callback();
    remove();
  });
};
const isSpecialClick = (event) => event.button === 1 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
const useDocsearchShim = () => {
  const router = useRouter();
  return {
    // render the hit component with custom `onClick` handler
    hitComponent: ({ hit, children }) => ({
      type: "a",
      ref: void 0,
      constructor: void 0,
      key: void 0,
      props: {
        href: hit.url,
        // handle `onClick` by `router.push`
        onClick: (event) => {
          if (isSpecialClick(event)) {
            return;
          }
          event.preventDefault();
          router.push(resolveRoutePathFromUrl(hit.url, "/space/"));
        },
        children
      },
      __v: null
    }),
    // navigation behavior triggered by `onKeyDown` internally
    navigator: {
      // when pressing Enter without metaKey
      navigate: ({ itemUrl }) => {
        router.push(resolveRoutePathFromUrl(itemUrl, "/space/"));
      }
    },
    // add search debounce
    transformSearchClient: (searchClient) => {
      const searchWithDebounce = debounce(searchClient.search, 500);
      return {
        ...searchClient,
        search: async (...args) => searchWithDebounce(...args)
      };
    }
  };
};
const getFacetFilters = (rawFacetFilters = [], lang) => [
  `lang:${lang}`,
  ...isArray(rawFacetFilters) ? rawFacetFilters : [rawFacetFilters]
];
const getSearchButtonTemplate = ({ buttonText = "Search", buttonAriaLabel = buttonText } = {}) => `<button type="button" class="DocSearch DocSearch-Button" aria-label="${buttonAriaLabel}"><span class="DocSearch-Button-Container"><svg width="20" height="20" class="DocSearch-Search-Icon" viewBox="0 0 20 20"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="DocSearch-Button-Placeholder">${buttonText}</span></span><span class="DocSearch-Button-Keys"><kbd class="DocSearch-Button-Key"><svg width="15" height="15" class="DocSearch-Control-Key-Icon"><path d="M4.505 4.496h2M5.505 5.496v5M8.216 4.496l.055 5.993M10 7.5c.333.333.5.667.5 1v2M12.326 4.5v5.996M8.384 4.496c1.674 0 2.116 0 2.116 1.5s-.442 1.5-2.116 1.5M3.205 9.303c-.09.448-.277 1.21-1.241 1.203C1 10.5.5 9.513.5 8V7c0-1.57.5-2.5 1.464-2.494.964.006 1.134.598 1.24 1.342M12.553 10.5h1.953" stroke-width="1.2" stroke="currentColor" fill="none" stroke-linecap="square"></path></svg></kbd><kbd class="DocSearch-Button-Key">K</kbd></span></button>`;
const POLL_INTERVAL = 16;
const pollToOpenDocsearch = () => {
  if (document.querySelector(".DocSearch-Modal"))
    return;
  const e2 = new Event("keydown");
  e2.key = "k";
  e2.metaKey = true;
  window.dispatchEvent(e2);
  setTimeout(pollToOpenDocsearch, POLL_INTERVAL);
};
const preconnectToAlgolia = (appId) => {
  const id = "algolia-preconnect";
  const rIC = window.requestIdleCallback || setTimeout;
  rIC(() => {
    if (document.head.querySelector(`#${id}`))
      return;
    const preconnect = document.createElement("link");
    preconnect.id = id;
    preconnect.rel = "preconnect";
    preconnect.href = `https://${appId}-dsn.algolia.net`;
    preconnect.crossOrigin = "";
    document.head.appendChild(preconnect);
  });
};
const optionsDefault = { "appId": "OD5D2HOUNL", "apiKey": "dad885b12cf463b19232a89f2e92f29e", "indexName": "space", "locales": { "/": { "placeholder": "搜索文档", "translations": { "button": { "buttonText": "搜索文档" } } } } };
{
  import("./assets/style-18663bf8.js");
  import("./assets/docsearch-cf1488f4.js");
}
const Docsearch = defineComponent({
  name: "Docsearch",
  props: {
    containerId: {
      type: String,
      required: false,
      default: "docsearch-container"
    },
    options: {
      type: Object,
      required: false,
      default: () => optionsDefault
    }
  },
  setup(props) {
    const docsearchShim = useDocsearchShim();
    const lang = usePageLang();
    const routeLocale = useRouteLocale();
    const hasInitialized = ref(false);
    const hasTriggered = ref(false);
    const options = computed(() => {
      var _a2;
      return {
        ...props.options,
        ...(_a2 = props.options.locales) == null ? void 0 : _a2[routeLocale.value]
      };
    });
    const initialize = async () => {
      var _a2;
      const { default: docsearch } = await import("@docsearch/js");
      docsearch({
        ...docsearchShim,
        ...options.value,
        container: `#${props.containerId}`,
        searchParameters: {
          ...options.value.searchParameters,
          facetFilters: getFacetFilters((_a2 = options.value.searchParameters) == null ? void 0 : _a2.facetFilters, lang.value)
        }
      });
      hasInitialized.value = true;
    };
    const trigger = () => {
      if (hasTriggered.value || hasInitialized.value)
        return;
      hasTriggered.value = true;
      initialize();
      pollToOpenDocsearch();
      watch(routeLocale, initialize);
    };
    useDocsearchHotkeyListener(trigger);
    onMounted(() => preconnectToAlgolia(options.value.appId));
    return () => {
      var _a2;
      return [
        h$4("div", {
          id: props.containerId,
          style: { display: hasInitialized.value ? "block" : "none" }
        }),
        hasInitialized.value ? null : h$4("div", {
          onClick: trigger,
          innerHTML: getSearchButtonTemplate((_a2 = options.value.translations) == null ? void 0 : _a2.button)
        })
      ];
    };
  }
});
const clientConfig15 = defineClientConfig({
  enhance({ app }) {
    app.component("Docsearch", Docsearch);
  }
});
const millisecondPerDay = 1e3 * 60 * 60 * 24;
const setupRunningTimeFooter = (date, locales2 = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "/": "Running time: :day days :hour hours :minute minutes :second seconds"
}, preserveContent = false) => {
  const initialTimeStamp = (date instanceof Date ? date : new Date(date)).getTime();
  let prevTimeText = "";
  const page2 = usePageData();
  const now = useNow();
  const routeLocale = useRouteLocale();
  const pastedTime = computed(() => {
    const passedTime = now.value.getTime() - initialTimeStamp;
    const restDate = new Date(passedTime % millisecondPerDay);
    return {
      day: Math.floor(passedTime / millisecondPerDay),
      hour: restDate.getHours(),
      minute: restDate.getMinutes(),
      second: restDate.getSeconds()
    };
  });
  onMounted(() => {
    watch(() => [page2.value.path, pastedTime.value], () => {
      const footer2 = document.querySelector(".vp-footer");
      if (footer2) {
        const { day, hour, minute, second } = pastedTime.value;
        const localeText = (locales2[routeLocale.value] || locales2["/"]).replace(":day", day.toString()).replace(":hour", hour.toString()).replace(":minute", minute.toString()).replace(":second", second.toString());
        footer2.innerHTML = `${preserveContent ? `${footer2.innerHTML.replace(`<br>${prevTimeText}`, "")}<br>` : ""}${localeText}`;
        prevTimeText = localeText;
      }
    }, {
      flush: "post",
      immediate: true
    });
  });
};
const clientConfig16 = defineClientConfig({
  enhance({ app, router, siteData: siteData2 }) {
  },
  setup() {
    setupRunningTimeFooter(
      /* @__PURE__ */ new Date("2023-06-01"),
      {
        "/": "本网站已经运行了: <font color='#ff8c00' size='3.5em'>:day</font> 天 <font color='#ff8c00' size='3.5em'>:hour</font> 小时 <font color='#ff8c00' size='3.5em'>:minute</font> 分钟 <font color='#ff8c00' size='3.5em'>:second </font>秒",
        "/zh/": "已运行 :day 天 :hour 小时 :minute 分钟 :second 秒"
      },
      false
    );
  }
});
const clientConfigs = [
  clientConfig0,
  clientConfig1,
  clientConfig2,
  S$2,
  clientConfig4,
  clientConfig5,
  clientConfig6,
  C$2,
  Y$1,
  clientConfig9,
  M,
  clientConfig11,
  clientConfig12,
  clientConfig13,
  clientConfig14,
  clientConfig15,
  clientConfig16
];
const pagesRoutes = [
  ["v-184f4da6", "/intro.html", { "d": 1688710125e3, "v": "https://img.tucang.cc/api/image/show/6c8acb93bd0fc9dd85006746d572df8f", "e": "<h1> 介绍页</h1>\n<p>我所在的位置：中国河南省<br>\n联系方式：<br>\n🐧 QQ：1973749775</p>\n<p>📧邮箱:lhx110396@163.com</p>\n<p>💻目前在郑州工作</p>\n<p>👋 你好！我的介绍页<br>\n既然茫茫人海中你能来到我的个人主页，这也是一种邂逅! ✨</p>\n<p>我热衷于分享最新的科技趋势和创新的编程技巧，致力于让技术变得更加容易理解和应用。我相信技术可以改变世界，而我希望成为这个变革的一部分。🌍💪</p>\n<p>📚 在我的博客中，你将发现我对编程语言、前端开发、人工智能和数据科学等领域的深入研究和经验分享。无论你是初学者还是经验丰富的开发者，我都将为你提供有价值的内容和实用的建议。🎓🚀</p>", "r": { "minutes": 1.44, "words": 432 }, "y": "a", "t": "介绍页", "i": "emoji" }, ["/intro", "/intro.md"]],
  ["v-8daa1a0e", "/", { "y": "h", "t": "博客主页", "i": "home" }, ["/index.html", "/README.md"]],
  ["v-2e3eac9e", "/slides.html", { "d": 1688710125e3, "v": "https://img.tucang.cc/api/image/show/72e720a5032441381e8d626f0e6538f1", "e": "<!-- markdownlint-disable MD024 MD033 MD051 -->\n", "r": { "minutes": 4.51, "words": 1354 }, "y": "s", "t": "幻灯片页", "i": "person-chalkboard" }, ["/slides", "/slides.md"]],
  ["v-ca2606fe", "/anything/%E5%B0%8F%E8%AE%B0/%E4%B8%8B%E9%9B%AA%E5%95%A6.html", { "d": 17022528e5, "l": "2023年12月11日", "c": ["画册"], "v": "https://img.tucang.cc/api/image/show/da3546c26f3726a1f7a63e96921b30ff", "e": '<h1> 2023初雪</h1>\n<figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepress/微信图片_20231211101841.jpg" alt="好白的雪" tabindex="0" loading="lazy"><figcaption>好白的雪</figcaption></figure>\n<figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepress/微信图片_20231211102037.jpg" alt="白雪皑皑" tabindex="0" loading="lazy"><figcaption>白雪皑皑</figcaption></figure>', "r": { "minutes": 0.17, "words": 50 }, "y": "a", "t": "2023初雪", "i": "snow" }, ["/anything/小记/下雪啦.html", "/anything/%E5%B0%8F%E8%AE%B0/%E4%B8%8B%E9%9B%AA%E5%95%A6", "/anything/小记/下雪啦.md", "/anything/%E5%B0%8F%E8%AE%B0/%E4%B8%8B%E9%9B%AA%E5%95%A6.md"]],
  ["v-59939119", "/anything/%E5%B0%8F%E8%AE%B0/%E5%A5%BD%E7%94%A8%E7%BD%91%E7%AB%99%E6%94%B6%E8%97%8F.html", { "d": 17022528e5, "l": "2023年12月11日", "c": ["网址收藏"], "g": ["网站"], "v": "https://img.tucang.cc/api/image/show/88bd6a5539dec4ece4596df98b999429", "e": "<h1> 好用网站收藏</h1>\n", "r": { "minutes": 0.09, "words": 27 }, "y": "a", "t": "好用网站收藏", "i": "link" }, ["/anything/小记/好用网站收藏.html", "/anything/%E5%B0%8F%E8%AE%B0/%E5%A5%BD%E7%94%A8%E7%BD%91%E7%AB%99%E6%94%B6%E8%97%8F", "/anything/小记/好用网站收藏.md", "/anything/%E5%B0%8F%E8%AE%B0/%E5%A5%BD%E7%94%A8%E7%BD%91%E7%AB%99%E6%94%B6%E8%97%8F.md"]],
  ["v-4848c9f0", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F.html", { "d": 170424e7, "l": "2024年1月3日", "c": ["python"], "g": ["设计模式", "python"], "v": "https://img.tucang.cc/api/image/show/6c8acb93bd0fc9dd85006746d572df8f", "e": `<h1> 单例模式</h1>
<h2> 单例模式的Python实现</h2>
<h3> 1. 普通单例模式</h3>
<blockquote>
<p>_ <em>new</em> _方法可以在实例化类的时候通过hasattr方法返回同一个实例</p>
</blockquote>
<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">ExerciseSinglePattern</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__new__</span><span class="token punctuation">(</span>cls<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">hasattr</span><span class="token punctuation">(</span>cls<span class="token punctuation">,</span> <span class="token string">'_instance'</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            cls<span class="token punctuation">.</span>_instance <span class="token operator">=</span> <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__new__<span class="token punctuation">(</span>cls<span class="token punctuation">)</span>
        <span class="token keyword">return</span> cls<span class="token punctuation">.</span>_instance

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'__init__'</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>a <span class="token operator">=</span> a
        self<span class="token punctuation">.</span>b <span class="token operator">=</span> b
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    sp <span class="token operator">=</span> ExerciseSinglePattern<span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">)</span>
    sp2 <span class="token operator">=</span> ExerciseSinglePattern<span class="token punctuation">(</span><span class="token string">'c'</span><span class="token punctuation">,</span> <span class="token string">'d'</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>sp<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>sp2<span class="token punctuation">)</span>
    <span class="token comment"># &lt;__main__.ExerciseSinglePattern object at 0x00000243AF6E4F70&gt;</span>
	<span class="token comment"># &lt;__main__.ExerciseSinglePattern object at 0x00000243AF6E4F70&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`, "r": { "minutes": 7.62, "words": 2286 }, "y": "a", "t": "单例模式", "i": "python" }, ["/design_pattern/设计模式/单例模式.html", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F", "/design_pattern/设计模式/单例模式.md", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F.md"]],
  ["v-7a9b9630", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F.html", { "d": 170424e7, "l": "2024年1月3日", "c": ["python"], "g": ["设计模式", "python"], "v": "https://img.tucang.cc/api/image/show/6c8acb93bd0fc9dd85006746d572df8f", "e": "<h1> 工厂模式</h1>\n<h3> 1. 前言</h3>\n<p>在本文章中，主要包含以下几个方面的主题：</p>\n<ol>\n<li>了解简单工厂设计模式；</li>\n<li>讨论工厂方法和抽象工厂方法及其差异；</li>\n<li>利用Python代码实现真实场景；</li>\n<li>讨论模式的优缺点并进行相应的比较。</li>\n</ol>\n<h3> 2. 了解工厂模式</h3>\n<p>在面向对象编程中，术语“工厂”表示一个负责创建其他类型对象的类。通常情况下，作为一个工厂的类有一个对象以及与它关联的多个方法。客户端使用某些参数调用此方法，之后，工厂会据此创建所需类型的对象，然后将它们返回给客户端。</p>", "r": { "minutes": 0.82, "words": 247 }, "y": "a", "t": "工厂模式", "i": "python" }, ["/design_pattern/设计模式/工厂模式.html", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F", "/design_pattern/设计模式/工厂模式.md", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F.md"]],
  ["v-71b4dc5e", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E9%97%A8%E9%9D%A2%E6%A8%A1%E5%BC%8F.html", { "d": 170424e7, "l": "2024年1月3日", "c": ["python"], "g": ["设计模式", "python"], "v": "https://img.tucang.cc/api/image/show/6c8acb93bd0fc9dd85006746d572df8f", "e": "<h1> 门面模式</h1>\n<p>本章涉及内容：</p>\n<ol>\n<li>\n<p>结构型设计模式概要；</p>\n</li>\n<li>\n<p>利用UML图理解门面设计模式；</p>\n</li>\n<li>\n<p>提供了Python v3.5实现代码的真实用例；</p>\n</li>\n<li>\n<p>门面模式与最少知识原则。</p>\n</li>\n</ol>\n<h3> 1. 什么是结构性设计模式</h3>\n", "r": { "minutes": 0.29, "words": 88 }, "y": "a", "t": "门面模式", "i": "python" }, ["/design_pattern/设计模式/门面模式.html", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E9%97%A8%E9%9D%A2%E6%A8%A1%E5%BC%8F", "/design_pattern/设计模式/门面模式.md", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E9%97%A8%E9%9D%A2%E6%A8%A1%E5%BC%8F.md"]],
  ["v-3966997b", "/posts/gRPC/gRPC%E6%9C%8D%E5%8A%A1.html", { "d": 170424e7, "l": "2024年1月3日", "c": ["技术"], "g": ["gPRC", "RPC"], "v": "https://img.tucang.cc/api/image/show/6c8acb93bd0fc9dd85006746d572df8f", "e": "<h1> gPRC服务</h1>\n", "r": { "minutes": 0.06, "words": 18 }, "y": "a", "t": "gPRC服务", "i": "python" }, ["/posts/gRPC/gRPC服务.html", "/posts/gRPC/gRPC%E6%9C%8D%E5%8A%A1", "/posts/gRPC/gRPC服务.md", "/posts/gRPC/gRPC%E6%9C%8D%E5%8A%A1.md"]],
  ["v-0b84fef2", "/posts/Linux/Linux%E9%85%8D%E7%BD%AE%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.html", { "d": 16905024e5, "l": "2023年7月28日", "c": ["技术"], "g": ["Linux"], "v": "https://img.tucang.cc/api/image/show/64a50296cae6612fb1468ddb15110c75", "e": '<h1> Linux配置环境变量</h1>\n<h3> 1. 查看所有变量</h3>\n<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用env</span>\nlianghexiang@ubuntu:~$ <span class="token function">env</span> \n\n<span class="token comment"># 使用export</span>\nlianghexiang@ubuntu:~$ <span class="token builtin class-name">export</span> \n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>', "r": { "minutes": 0.74, "words": 221 }, "y": "a", "t": "Linux配置环境变量", "i": "book" }, ["/posts/Linux/Linux配置环境变量.html", "/posts/Linux/Linux%E9%85%8D%E7%BD%AE%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F", "/posts/Linux/Linux配置环境变量.md", "/posts/Linux/Linux%E9%85%8D%E7%BD%AE%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.md"]],
  ["v-784c3919", "/posts/mysql/mysql%E5%A4%87%E5%BF%98%E5%BD%95.html", { "d": 17057088e5, "l": "2024年1月20日", "c": ["技术"], "g": ["Mysql"], "v": "https://img.tucang.cc/api/image/show/be92f3fc23a4ba0672923f5f05c7e08b", "e": '<h1> Mysql知识积累</h1>\n<h3> 1. Mysql内置函数</h3>\n<h4> 1. instr</h4>\n<p>简介：</p>\n<blockquote>\n<p>函数返回字符串中子字符串第一次出现的位置.如果在str中找不到子字符串，则INSTR()函数返回零(0)</p>\n</blockquote>\n<p>使用场景：</p>\n<blockquote>\n<p>想要在字符串中查找子字符串或检查字符串中是否存在子字符串。</p>\n</blockquote>\n<p>函数语法:</p>\n<div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>INSTR<span class="token punctuation">(</span>str<span class="token punctuation">,</span>substr<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>', "r": { "minutes": 5.16, "words": 1548 }, "y": "a", "t": "Mysql知识积累", "i": "mysql", "s": "Mysql语法基础" }, ["/posts/mysql/mysql备忘录.html", "/posts/mysql/mysql%E5%A4%87%E5%BF%98%E5%BD%95", "/posts/mysql/mysql备忘录.md", "/posts/mysql/mysql%E5%A4%87%E5%BF%98%E5%BD%95.md"]],
  ["v-4f435352", "/posts/python/Linux%E7%8E%AF%E5%A2%83%E4%B8%8BDBUtils%E5%AF%BC%E5%85%A5%E7%9A%84%E9%97%AE%E9%A2%98.html", { "d": 16905024e5, "l": "2023年7月28日", "c": ["技术"], "g": ["python"], "v": "https://img.tucang.cc/api/image/show/da3546c26f3726a1f7a63e96921b30ff", "e": '<h1> DBUtils版本问题</h1>\n<h3> 前言</h3>\n<figure><img src="https://img2023.cnblogs.com/blog/2432585/202307/2432585-20230719090938564-1692406477.png" alt="image" tabindex="0" loading="lazy"><figcaption>image</figcaption></figure>\n<p>事情的起因是，原本在pycharm上开发的代码，因为要使用到线程池，所以就按安装了DBUtils，在windows上运行代码倒没什么问题，后因代码运行时需要占用的内存过多，所以代码要转移到Linux服务器上，问题由之而来，运行代码时总会会报出找不到DBUtils库的错误，经过几番反复确认，python环境已经安装了DBUtils，而且安装的其他三方库皆无问题，所以便是用了万能的百度，终于是解决了问题</p>', "r": { "minutes": 0.87, "words": 261 }, "y": "a", "t": "DBUtils版本问题", "i": "book" }, ["/posts/python/Linux环境下DBUtils导入的问题.html", "/posts/python/Linux%E7%8E%AF%E5%A2%83%E4%B8%8BDBUtils%E5%AF%BC%E5%85%A5%E7%9A%84%E9%97%AE%E9%A2%98", "/posts/python/Linux环境下DBUtils导入的问题.md", "/posts/python/Linux%E7%8E%AF%E5%A2%83%E4%B8%8BDBUtils%E5%AF%BC%E5%85%A5%E7%9A%84%E9%97%AE%E9%A2%98.md"]],
  ["v-014b8769", "/posts/python/polygon%E9%9D%A2%E7%A7%AF%E8%AE%A1%E7%AE%97.html", { "d": 16881696e5, "l": "2023年7月1日", "c": ["python"], "g": ["polygon", "mysql", "python"], "v": "https://img.tucang.cc/api/image/show/72e720a5032441381e8d626f0e6538f1", "e": "<h1> Python操作Polygon</h1>\n<h3> 1. Polygon面积计算</h3>\n<blockquote>\n<p>首先介绍什么是Polygon，在地理信息系统(GIS)中，polygon是经纬度构成的多边形，可以用来描绘地理边界，区域和建筑物轮廓灯。在mysql中，可以使用polygon数据类型存储，Python的<code>Shapely</code>库提供了操作polygon数据的工具。</p>\n</blockquote>\n<p>在编程语言中，polygon数据多存储在二维列表中，例如<code>[[1, 2],[2, 0], [0, 1],......]</code>,  在数学中计算不规则多边形面积之一的公式是鞋带公式(也成高斯面积公式)</p>", "r": { "minutes": 1.04, "words": 311 }, "y": "a", "t": "Python操作Polygon", "i": "fish" }, ["/posts/python/polygon面积计算.html", "/posts/python/polygon%E9%9D%A2%E7%A7%AF%E8%AE%A1%E7%AE%97", "/posts/python/polygon面积计算.md", "/posts/python/polygon%E9%9D%A2%E7%A7%AF%E8%AE%A1%E7%AE%97.md"]],
  ["v-4870e4c2", "/posts/python/Python2%E8%BD%ACPython3.html", { "d": 16956864e5, "l": "2023年9月26日", "c": ["python"], "g": ["2to3", "python"], "v": "https://img.tucang.cc/api/image/show/72e720a5032441381e8d626f0e6538f1", "e": '<h1> Python2转Python3</h1>\n<h3> 工具介绍</h3>\n<p>💭 工具：<a href="http://2to3.py" target="_blank" rel="noopener noreferrer">2to3.py</a></p>\n<p>2to3.py是一个脚本文件，是Anaconda管理器自带的脚本文件，通常可以在anaconda的安装路径下找到，可能由于anaconda的版本不同，2to3.py文件的名字也可能略有差异，但总的来说都可以通过2to3关键字来辨别。</p>\n<h3> 使用</h3>\n<ol>\n<li>转单个py文件</li>\n</ol>\n<p>​	如果是转单个py文件的话可以直接把py文件的路径输入到命令之后</p>', "r": { "minutes": 0.64, "words": 193 }, "y": "a", "t": "Python2转Python3", "i": "fish" }, ["/posts/python/Python2转Python3.html", "/posts/python/Python2%E8%BD%ACPython3", "/posts/python/Python2转Python3.md", "/posts/python/Python2%E8%BD%ACPython3.md"]],
  ["v-77bb6b9a", "/posts/python/Python%E6%B7%BB%E5%8A%A0%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.html", { "d": 17018208e5, "l": "2023年12月6日", "c": ["python"], "g": ["Linux", "python"], "v": "https://img.tucang.cc/api/image/show/5383cab4c54b110f368ce995153f0de3", "e": "<h1> Python添加Linux环境变量</h1>\n", "r": { "minutes": 0.07, "words": 22 }, "y": "a", "t": "Python添加Linux环境变量", "i": "pen" }, ["/posts/python/Python添加环境变量.html", "/posts/python/Python%E6%B7%BB%E5%8A%A0%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F", "/posts/python/Python添加环境变量.md", "/posts/python/Python%E6%B7%BB%E5%8A%A0%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.md"]],
  ["v-34cef64b", "/posts/tools/PicgoGitHub%E6%90%AD%E5%BB%BA%E5%9B%BE%E5%BA%8A.html", { "d": 16892928e5, "l": "2023年7月14日", "c": ["工具"], "g": ["Picgo", "GitHub"], "v": "https://img.tucang.cc/api/image/show/3f96a1fd6956f27e1badccf6d7f982e1", "e": '<h1> PicgoGitHub图床</h1>\n<h2> 前言</h2>\n<p>这篇文章主要介绍在💻<code>windows</code>系统下安装PicGo并且在🇬🇭  GitHub上创建仓库来做我们自己的个人图床。</p>\n<p>首先，什么是 <code>Picgo</code>？</p>\n<p>picgo网站地址：<a href="https://picgo.github.io/PicGo-Doc/zh/guide/#%E7%89%B9%E8%89%B2%E5%8A%9F%E8%83%BD" target="_blank" rel="noopener noreferrer">https://picgo.github.io/PicGo-Doc/zh/guide/#特色功能</a></p>', "r": { "minutes": 3.14, "words": 942 }, "y": "a", "t": "PicgoGitHub图床", "i": "github" }, ["/posts/tools/PicgoGitHub搭建图床.html", "/posts/tools/PicgoGitHub%E6%90%AD%E5%BB%BA%E5%9B%BE%E5%BA%8A", "/posts/tools/PicgoGitHub搭建图床.md", "/posts/tools/PicgoGitHub%E6%90%AD%E5%BB%BA%E5%9B%BE%E5%BA%8A.md"]],
  ["v-a430865c", "/posts/tools/sublime%E8%AF%B4%E6%98%8E%E4%B9%A6.html", { "d": 16892928e5, "l": "2023年7月14日", "c": ["工具"], "g": ["Sublime Text", "工具说明书"], "v": "https://img.tucang.cc/api/image/show/72e720a5032441381e8d626f0e6538f1", "e": "<h1> Sublime Text使用文档说明书</h1>\n<h3> SublimeText预览Markdown</h3>\n<h4> 1. MarkdownEditor</h4>\n<p>🏷️MarkdownEditing是一个功能丰富的插件，提供了对Markdown文件的语法高亮、自动补全、预览等功能。</p>\n<p>安装：</p>\n<p>Ctrl+Shift+P打开控制台，输入Package Control: Install Package，然后输入MarkdownEditor，选择安装</p>\n", "r": { "minutes": 0.31, "words": 93 }, "y": "a", "t": "Sublime Text使用文档说明书", "i": "pen" }, ["/posts/tools/sublime说明书.html", "/posts/tools/sublime%E8%AF%B4%E6%98%8E%E4%B9%A6", "/posts/tools/sublime说明书.md", "/posts/tools/sublime%E8%AF%B4%E6%98%8E%E4%B9%A6.md"]],
  ["v-66d370d9", "/posts/Vue/Vue%E5%9F%BA%E7%A1%80.html", { "d": 170424e7, "l": "2024年1月3日", "c": ["Vue"], "g": ["前端", "框架"], "v": "https://img.tucang.cc/api/image/show/6c8acb93bd0fc9dd85006746d572df8f", "e": "<h1> Vue基础知识</h1>\n<h3> 指令系统</h3>\n<ol>\n<li>v-text</li>\n<li>v-html</li>\n<li>v-show</li>\n<li>v-if</li>\n<li>v-model 双向数据绑定</li>\n</ol>\n<h3> 常用属性</h3>\n<ol>\n<li>data()</li>\n<li>el</li>\n<li>methods</li>\n<li>watch</li>\n<li>computed</li>\n<li>templates</li>\n</ol>\n<h3> Vue组件</h3>\n<h4> 全局组件</h4>\n<p><strong>用法</strong>：</p>", "r": { "minutes": 3.45, "words": 1036 }, "y": "a", "t": "Vue基础知识", "i": "vue" }, ["/posts/Vue/Vue基础.html", "/posts/Vue/Vue%E5%9F%BA%E7%A1%80", "/posts/Vue/Vue基础.md", "/posts/Vue/Vue%E5%9F%BA%E7%A1%80.md"]],
  ["v-3ae980e2", "/posts/Vue/vue%E5%AE%A2%E6%88%B7%E7%AB%AF.html", { "d": 17061408e5, "l": "2024年1月25日", "c": ["Vue"], "g": ["前端", "框架"], "v": "https://img.tucang.cc/api/image/show/6c8acb93bd0fc9dd85006746d572df8f", "e": '<h1> Vue客户端</h1>\n<h3> 1. 什么是webpack</h3>\n<blockquote>\n<p>本质上，<em>webpack</em> 是一个现代 JavaScript 应用程序的_静态模块打包器(module bundler)<em>。当 webpack 处理应用程序时，它会递归地构建一个_依赖关系图(dependency graph)</em>，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 <em>bundle</em>。</p>\n</blockquote>\n<figure><img src="https://cdn.nlark.com/yuque/0/2022/png/21881466/1657857178273-f17c0225-7be9-470a-b14a-3fdaebbcc194.png#clientId=u946fd131-c234-4&amp;from=paste&amp;height=319&amp;id=u62fb1adf&amp;originHeight=588&amp;originWidth=1125&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=60942&amp;status=done&amp;style=none&amp;taskId=ua4fd9b52-4a29-4fc7-8637-ff6a4daecd2&amp;title=&amp;width=610.1666870117188" alt="图片.png" tabindex="0" loading="lazy"><figcaption>图片.png</figcaption></figure>', "r": { "minutes": 3.76, "words": 1129 }, "y": "a", "t": "Vue客户端", "i": "vue" }, ["/posts/Vue/vue客户端.html", "/posts/Vue/vue%E5%AE%A2%E6%88%B7%E7%AB%AF", "/posts/Vue/vue客户端.md", "/posts/Vue/vue%E5%AE%A2%E6%88%B7%E7%AB%AF.md"]],
  ["v-227b283b", "/anything/book_notes/%E4%BA%BA%E4%B9%8B%E8%A7%89%E9%86%92/%E4%B8%80%E5%88%87%E9%97%AE%E9%A2%98%E7%9A%84%E8%B5%B7%E6%BA%90.html", { "d": 1706525952e3, "r": { "minutes": 0.08, "words": 23 }, "y": "a", "t": "上篇：内观自己，摆脱焦虑之[大脑-一切问题的起源]", "i": "write" }, ["/anything/book_notes/人之觉醒/一切问题的起源.html", "/anything/book_notes/%E4%BA%BA%E4%B9%8B%E8%A7%89%E9%86%92/%E4%B8%80%E5%88%87%E9%97%AE%E9%A2%98%E7%9A%84%E8%B5%B7%E6%BA%90", "/anything/book_notes/人之觉醒/一切问题的起源.md", "/anything/book_notes/%E4%BA%BA%E4%B9%8B%E8%A7%89%E9%86%92/%E4%B8%80%E5%88%87%E9%97%AE%E9%A2%98%E7%9A%84%E8%B5%B7%E6%BA%90.md"]],
  ["v-3706649a", "/404.html", { "y": "p", "t": "" }, ["/404"]],
  ["v-7f74a124", "/anything/%E5%B0%8F%E8%AE%B0/", { "y": "p", "t": "小记" }, ["/anything/小记/", "/anything/%E5%B0%8F%E8%AE%B0/index.html"]],
  ["v-c85a71d8", "/anything/", { "y": "p", "t": "Anything" }, ["/anything/index.html"]],
  ["v-7f99a408", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/", { "y": "p", "t": "设计模式" }, ["/design_pattern/设计模式/", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/index.html"]],
  ["v-eb42b032", "/design_pattern/", { "y": "p", "t": "Design Pattern" }, ["/design_pattern/index.html"]],
  ["v-08d26e1c", "/posts/gRPC/", { "y": "p", "t": "G R P C" }, ["/posts/gRPC/index.html"]],
  ["v-e1e3da16", "/posts/", { "y": "p", "t": "Posts" }, ["/posts/index.html"]],
  ["v-3689fde0", "/posts/Linux/", { "y": "p", "t": "Linux" }, ["/posts/Linux/index.html"]],
  ["v-1dee9b02", "/posts/mysql/", { "y": "p", "t": "Mysql" }, ["/posts/mysql/index.html"]],
  ["v-3ea18a3e", "/posts/python/", { "y": "p", "t": "Python" }, ["/posts/python/index.html"]],
  ["v-2951b8e9", "/posts/tools/", { "y": "p", "t": "Tools" }, ["/posts/tools/index.html"]],
  ["v-635a6bfe", "/posts/Vue/", { "y": "p", "t": "Vue" }, ["/posts/Vue/index.html"]],
  ["v-0e47583b", "/anything/book_notes/%E4%BA%BA%E4%B9%8B%E8%A7%89%E9%86%92/", { "y": "p", "t": "人之觉醒" }, ["/anything/book_notes/人之觉醒/", "/anything/book_notes/%E4%BA%BA%E4%B9%8B%E8%A7%89%E9%86%92/index.html"]],
  ["v-3bfcafe0", "/anything/book_notes/", { "y": "p", "t": "Book Notes" }, ["/anything/book_notes/index.html"]],
  ["v-5bc93818", "/category/", { "y": "p", "t": "分类", "I": 0 }, ["/category/index.html"]],
  ["v-744d024e", "/tag/", { "y": "p", "t": "标签", "I": 0 }, ["/tag/index.html"]],
  ["v-e52c881c", "/article/", { "y": "p", "t": "文章", "I": 0 }, ["/article/index.html"]],
  ["v-154dc4c4", "/star/", { "y": "p", "t": "收藏", "I": 0 }, ["/star/index.html"]],
  ["v-01560935", "/timeline/", { "y": "p", "t": "时间轴", "I": 0 }, ["/timeline/index.html"]],
  ["v-605620d1", "/category/%E7%94%BB%E5%86%8C/", { "y": "p", "t": "画册 分类", "I": 0 }, ["/category/画册/", "/category/%E7%94%BB%E5%86%8C/index.html"]],
  ["v-efadec50", "/tag/%E7%BD%91%E7%AB%99/", { "y": "p", "t": "网站 标签", "I": 0 }, ["/tag/网站/", "/tag/%E7%BD%91%E7%AB%99/index.html"]],
  ["v-6efe3f6e", "/category/%E7%BD%91%E5%9D%80%E6%94%B6%E8%97%8F/", { "y": "p", "t": "网址收藏 分类", "I": 0 }, ["/category/网址收藏/", "/category/%E7%BD%91%E5%9D%80%E6%94%B6%E8%97%8F/index.html"]],
  ["v-05b88e01", "/tag/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/", { "y": "p", "t": "设计模式 标签", "I": 0 }, ["/tag/设计模式/", "/tag/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/index.html"]],
  ["v-78cbe7bb", "/category/python/", { "y": "p", "t": "python 分类", "I": 0 }, ["/category/python/index.html"]],
  ["v-245f5676", "/tag/python/", { "y": "p", "t": "python 标签", "I": 0 }, ["/tag/python/index.html"]],
  ["v-594730ea", "/category/%E6%8A%80%E6%9C%AF/", { "y": "p", "t": "技术 分类", "I": 0 }, ["/category/技术/", "/category/%E6%8A%80%E6%9C%AF/index.html"]],
  ["v-287e5507", "/tag/gprc/", { "y": "p", "t": "gPRC 标签", "I": 0 }, ["/tag/gprc/index.html"]],
  ["v-14145d44", "/category/%E5%B7%A5%E5%85%B7/", { "y": "p", "t": "工具 分类", "I": 0 }, ["/category/工具/", "/category/%E5%B7%A5%E5%85%B7/index.html"]],
  ["v-b306a390", "/tag/rpc/", { "y": "p", "t": "RPC 标签", "I": 0 }, ["/tag/rpc/index.html"]],
  ["v-65f6d381", "/category/vue/", { "y": "p", "t": "Vue 分类", "I": 0 }, ["/category/vue/index.html"]],
  ["v-211f44ee", "/tag/linux/", { "y": "p", "t": "Linux 标签", "I": 0 }, ["/tag/linux/index.html"]],
  ["v-1bee38ca", "/tag/mysql/", { "y": "p", "t": "Mysql 标签", "I": 0 }, ["/tag/mysql/index.html"]],
  ["v-a2fdb2fa", "/tag/polygon/", { "y": "p", "t": "polygon 标签", "I": 0 }, ["/tag/polygon/index.html"]],
  ["v-259537bb", "/tag/2to3/", { "y": "p", "t": "2to3 标签", "I": 0 }, ["/tag/2to3/index.html"]],
  ["v-1382eb6a", "/tag/picgo/", { "y": "p", "t": "Picgo 标签", "I": 0 }, ["/tag/picgo/index.html"]],
  ["v-132a6ac4", "/tag/github/", { "y": "p", "t": "GitHub 标签", "I": 0 }, ["/tag/github/index.html"]],
  ["v-32b1cb5c", "/tag/sublime-text/", { "y": "p", "t": "Sublime Text 标签", "I": 0 }, ["/tag/sublime-text/index.html"]],
  ["v-1d73fa7a", "/tag/%E5%B7%A5%E5%85%B7%E8%AF%B4%E6%98%8E%E4%B9%A6/", { "y": "p", "t": "工具说明书 标签", "I": 0 }, ["/tag/工具说明书/", "/tag/%E5%B7%A5%E5%85%B7%E8%AF%B4%E6%98%8E%E4%B9%A6/index.html"]],
  ["v-95f987f4", "/tag/%E5%89%8D%E7%AB%AF/", { "y": "p", "t": "前端 标签", "I": 0 }, ["/tag/前端/", "/tag/%E5%89%8D%E7%AB%AF/index.html"]],
  ["v-f4d3cd72", "/tag/%E6%A1%86%E6%9E%B6/", { "y": "p", "t": "框架 标签", "I": 0 }, ["/tag/框架/", "/tag/%E6%A1%86%E6%9E%B6/index.html"]]
];
var Vuepress = defineComponent({
  name: "Vuepress",
  setup() {
    const layout2 = usePageLayout();
    return () => h$4(layout2.value);
  }
});
var createRoutes = () => pagesRoutes.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path
      }))
    );
    return result;
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress
    }
  ]
);
var historyCreator = createMemoryHistory;
var createVueRouter = () => {
  const router = createRouter({
    // it might be an issue of vue-router that have to remove the ending slash
    history: historyCreator(removeEndingSlash("/space/")),
    routes: createRoutes(),
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition)
        return savedPosition;
      if (to.hash)
        return { el: to.hash };
      return { top: 0 };
    }
  });
  router.beforeResolve(async (to, from) => {
    var _a2;
    if (to.path !== from.path || from === START_LOCATION) {
      [pageData.value] = await Promise.all([
        resolvers.resolvePageData(to.name),
        (_a2 = pagesComponents[to.name]) == null ? void 0 : _a2.__asyncLoader()
      ]);
    }
  });
  return router;
};
var setupGlobalComponents = (app) => {
  app.component("ClientOnly", ClientOnly);
  app.component("Content", Content);
};
var setupGlobalComputed = (app, router, clientConfigs2) => {
  const routePath = ref(router.currentRoute.value.path);
  watch(
    () => router.currentRoute.value.path,
    (value) => routePath.value = value
  );
  const layouts = computed(() => resolvers.resolveLayouts(clientConfigs2));
  const routeLocale = computed(
    () => resolvers.resolveRouteLocale(siteData.value.locales, routePath.value)
  );
  const siteLocaleData = computed(
    () => resolvers.resolveSiteLocaleData(siteData.value, routeLocale.value)
  );
  const pageFrontmatter = computed(
    () => resolvers.resolvePageFrontmatter(pageData.value)
  );
  const pageHeadTitle = computed(
    () => resolvers.resolvePageHeadTitle(pageData.value, siteLocaleData.value)
  );
  const pageHead = computed(
    () => resolvers.resolvePageHead(
      pageHeadTitle.value,
      pageFrontmatter.value,
      siteLocaleData.value
    )
  );
  const pageLang = computed(() => resolvers.resolvePageLang(pageData.value));
  const pageLayout = computed(
    () => resolvers.resolvePageLayout(pageData.value, layouts.value)
  );
  app.provide(layoutsSymbol, layouts);
  app.provide(pageFrontmatterSymbol, pageFrontmatter);
  app.provide(pageHeadTitleSymbol, pageHeadTitle);
  app.provide(pageHeadSymbol, pageHead);
  app.provide(pageLangSymbol, pageLang);
  app.provide(pageLayoutSymbol, pageLayout);
  app.provide(routeLocaleSymbol, routeLocale);
  app.provide(siteLocaleDataSymbol, siteLocaleData);
  Object.defineProperties(app.config.globalProperties, {
    $frontmatter: { get: () => pageFrontmatter.value },
    $head: { get: () => pageHead.value },
    $headTitle: { get: () => pageHeadTitle.value },
    $lang: { get: () => pageLang.value },
    $page: { get: () => pageData.value },
    $routeLocale: { get: () => routeLocale.value },
    $site: { get: () => siteData.value },
    $siteLocale: { get: () => siteLocaleData.value },
    $withBase: { get: () => withBase }
  });
  return {
    layouts,
    pageData,
    pageFrontmatter,
    pageHead,
    pageHeadTitle,
    pageLang,
    pageLayout,
    routeLocale,
    siteData,
    siteLocaleData
  };
};
var setupUpdateHead = () => {
  const head = usePageHead();
  const lang = usePageLang();
  {
    const ssrContext = useSSRContext();
    if (ssrContext) {
      ssrContext.head = head.value;
      ssrContext.lang = lang.value;
    }
    return;
  }
};
var appCreator = createSSRApp;
var createVueApp = async () => {
  var _a2;
  const app = appCreator({
    name: "VuepressApp",
    setup() {
      var _a3;
      setupUpdateHead();
      for (const clientConfig of clientConfigs) {
        (_a3 = clientConfig.setup) == null ? void 0 : _a3.call(clientConfig);
      }
      return () => [
        h$4(RouterView),
        ...clientConfigs.flatMap(
          ({ rootComponents = [] }) => rootComponents.map((component) => h$4(component))
        )
      ];
    }
  });
  const router = createVueRouter();
  setupGlobalComponents(app);
  const globalComputed = setupGlobalComputed(app, router, clientConfigs);
  {
    const { setupDevtools } = await import("./assets/setupDevtools-X4YFRK4B-98030383.js");
    setupDevtools(app, globalComputed);
  }
  for (const clientConfig of clientConfigs) {
    await ((_a2 = clientConfig.enhance) == null ? void 0 : _a2.call(clientConfig, { app, router, siteData }));
  }
  app.use(router);
  return {
    app,
    router
  };
};
export {
  C$4 as C,
  createVueApp,
  r$2 as r,
  v$5 as v
};
