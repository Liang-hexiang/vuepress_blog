import { pageviewCount } from "@waline/client/dist/pageview.mjs";
const r = () => pageviewCount({ serverURL: { "provider": "Waline", "dark": 'html[data-theme="dark"]', "serverURL": "https://waline-comment.vuejs.press" }.serverURL });
export {
  r as updatePageview
};
