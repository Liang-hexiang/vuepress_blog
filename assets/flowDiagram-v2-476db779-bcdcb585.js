import { p as parser$1, f as flowDb } from "./flowDb-6a57c1b4-efd8089e.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-5f89df53-0a63074f.js";
import { B as setConfig } from "./mermaid.core-008ee585.js";
import "./layout-22ca4764.js";
import "./index-a92ac404-518c47c7.js";
import "./edges-49ac43a2-da70e6e5.js";
import "./createText-3df630b5-9cd4549c.js";
import "./svgDraw-0fcc813d-ce2dfa4f.js";
import "./line-850b69e0.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./selectAll-88a75c15.js";
import "./app-a222c416.js";
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
