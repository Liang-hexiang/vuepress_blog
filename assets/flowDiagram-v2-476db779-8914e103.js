import { p as parser$1, f as flowDb } from "./flowDb-6a57c1b4-56e018b8.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-5f89df53-025f44bd.js";
import { B as setConfig } from "./mermaid.core-d66013e1.js";
import "./layout-2f6d70b7.js";
import "./index-a92ac404-14274690.js";
import "./edges-49ac43a2-afa245fe.js";
import "./createText-3df630b5-12b5a17e.js";
import "./svgDraw-0fcc813d-7febea75.js";
import "./line-542dd1b4.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./selectAll-21b2b6fe.js";
import "./app-236d81d8.js";
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
