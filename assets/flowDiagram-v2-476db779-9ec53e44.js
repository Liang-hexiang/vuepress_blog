import { p as parser$1, f as flowDb } from "./flowDb-6a57c1b4-2cb5cb32.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-5f89df53-5338e5f6.js";
import { B as setConfig } from "./mermaid.core-1866bf78.js";
import "./layout-3ea024d6.js";
import "./index-a92ac404-6d719330.js";
import "./edges-49ac43a2-18c3e8bd.js";
import "./createText-3df630b5-a3ac44bc.js";
import "./svgDraw-0fcc813d-c99b1456.js";
import "./line-debc4c15.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./selectAll-b96070b7.js";
import "./app-45c468b1.js";
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
