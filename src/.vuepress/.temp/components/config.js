import { defineClientConfig } from "@vuepress/client";
import { hasGlobalComponent } from "E:/code/space/node_modules/vuepress-theme-hope/node_modules/vuepress-shared/lib/client/index.js";
import { h } from "vue";

import { useScriptTag } from "E:/code/space/node_modules/@vueuse/core/index.mjs";
import FontIcon from "E:/code/space/node_modules/vuepress-theme-hope/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import ArtPlayer from "E:/code/space/node_modules/vuepress-theme-hope/node_modules/vuepress-plugin-components/lib/client/components/ArtPlayer.js";
import Badge from "E:/code/space/node_modules/vuepress-theme-hope/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import BiliBili from "E:/code/space/node_modules/vuepress-theme-hope/node_modules/vuepress-plugin-components/lib/client/components/BiliBili.js";
import CodePen from "E:/code/space/node_modules/vuepress-theme-hope/node_modules/vuepress-plugin-components/lib/client/components/CodePen.js";
import PDF from "E:/code/space/node_modules/vuepress-theme-hope/node_modules/vuepress-plugin-components/lib/client/components/PDF.js";
import Replit from "E:/code/space/node_modules/vuepress-theme-hope/node_modules/vuepress-plugin-components/lib/client/components/Replit.js";
import Share from "E:/code/space/node_modules/vuepress-theme-hope/node_modules/vuepress-plugin-components/lib/client/components/Share.js";
import SiteInfo from "E:/code/space/node_modules/vuepress-theme-hope/node_modules/vuepress-plugin-components/lib/client/components/SiteInfo.js";
import StackBlitz from "E:/code/space/node_modules/vuepress-theme-hope/node_modules/vuepress-plugin-components/lib/client/components/StackBlitz.js";
import VidStack from "E:/code/space/node_modules/vuepress-theme-hope/node_modules/vuepress-plugin-components/lib/client/components/VidStack.js";
import XiGua from "E:/code/space/node_modules/vuepress-theme-hope/node_modules/vuepress-plugin-components/lib/client/components/XiGua.js";
import BackToTop from "E:/code/space/node_modules/vuepress-theme-hope/node_modules/vuepress-plugin-components/lib/client/components/BackToTop.js";

import "E:/code/space/node_modules/vuepress-theme-hope/node_modules/vuepress-plugin-components/lib/client/styles/sr-only.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    if(!hasGlobalComponent("FontIcon")) app.component("FontIcon", FontIcon);
    if(!hasGlobalComponent("ArtPlayer")) app.component("ArtPlayer", ArtPlayer);
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("BiliBili")) app.component("BiliBili", BiliBili);
    if(!hasGlobalComponent("CodePen")) app.component("CodePen", CodePen);
    if(!hasGlobalComponent("PDF")) app.component("PDF", PDF);
    if(!hasGlobalComponent("Replit")) app.component("Replit", Replit);
    if(!hasGlobalComponent("Share")) app.component("Share", Share);
    if(!hasGlobalComponent("SiteInfo")) app.component("SiteInfo", SiteInfo);
    if(!hasGlobalComponent("StackBlitz")) app.component("StackBlitz", StackBlitz);
    if(!hasGlobalComponent("VidStack")) app.component("VidStack", VidStack);
    if(!hasGlobalComponent("XiGua")) app.component("XiGua", XiGua);
    
  },
  setup: () => {
    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/brands.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/solid.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/fontawesome.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/solid.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

    useScriptTag(
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/fontawesome.min.js`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);

  },
  rootComponents: [
    () => h(BackToTop, {}),
  ],
});
