import { p as parser$1, f as flowDb } from "./flowDb-6a57c1b4-336a3e4e.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-5f89df53-d7ebecf8.js";
import { B as setConfig } from "./mermaid.core-2da4967f.js";
import "./layout-41e358aa.js";
import "./index-a92ac404-21d1e697.js";
import "./edges-49ac43a2-5da3808e.js";
import "./createText-3df630b5-5e44baaa.js";
import "./svgDraw-0fcc813d-34e22c98.js";
import "./line-d461eee1.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./selectAll-423cf690.js";
import "./app-72f0b7d2.js";
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
