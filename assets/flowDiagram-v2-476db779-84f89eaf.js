import { p as parser$1, f as flowDb } from "./flowDb-6a57c1b4-f4306f31.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-5f89df53-9f1377ea.js";
import { B as setConfig } from "./mermaid.core-b4cd1474.js";
import "./layout-3283d80c.js";
import "./index-a92ac404-371a4dd8.js";
import "./edges-49ac43a2-3bd4bb42.js";
import "./createText-3df630b5-0544be43.js";
import "./svgDraw-0fcc813d-2201b09c.js";
import "./line-9384a60e.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./selectAll-76152093.js";
import "./app-af2d9ada.js";
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
