import { defineClientConfig } from "@vuepress/client";
import { setupPWA } from "E:/code/space/node_modules/vuepress-theme-hope/node_modules/vuepress-plugin-pwa2/lib/client/composables/setup.js";
import SWUpdatePopup from "E:/code/space/node_modules/vuepress-theme-hope/node_modules/vuepress-plugin-pwa2/lib/client/components/SWUpdatePopup.js";


export default defineClientConfig({
  setup: () => {
    setupPWA();
  },
  rootComponents: [
    SWUpdatePopup,
    
  ],
});
