import { p as parser$1, f as flowDb } from "./flowDb-6a57c1b4-e0ba994e.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-5f89df53-f11745f9.js";
import { B as setConfig } from "./mermaid.core-acd9467f.js";
import "./layout-d815ade1.js";
import "./index-a92ac404-ad4b1b03.js";
import "./edges-49ac43a2-5bd1f08b.js";
import "./createText-3df630b5-162833b0.js";
import "./svgDraw-0fcc813d-2a153180.js";
import "./line-13749dde.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./selectAll-a91685c6.js";
import "./app-1b1c230d.js";
import "./commonjsHelpers-7a77ea84.js";
const diagram = {
  parser: parser$1,
  db: flowDb,
  renderer: flowRendererV2,
  styles: flowStyles,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV2.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen("gen-2");
  }
};
export {
  diagram
};
