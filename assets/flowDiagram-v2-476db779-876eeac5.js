import { p as parser$1, f as flowDb } from "./flowDb-6a57c1b4-f18f5356.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-5f89df53-d710c814.js";
import { B as setConfig } from "./mermaid.core-2887d852.js";
import "./layout-ea4e3517.js";
import "./index-a92ac404-b848c8b7.js";
import "./edges-49ac43a2-221d13e6.js";
import "./createText-3df630b5-85a1f0b5.js";
import "./svgDraw-0fcc813d-de80080e.js";
import "./line-2dfc4a3a.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./selectAll-a3a765c8.js";
import "./app-44cf68a7.js";
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
