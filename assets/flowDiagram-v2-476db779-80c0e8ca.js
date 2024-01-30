import { p as parser$1, f as flowDb } from "./flowDb-6a57c1b4-e98cac5a.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-5f89df53-2e8fa506.js";
import { B as setConfig } from "./mermaid.core-ee4e437c.js";
import "./layout-7ff5dbaf.js";
import "./index-a92ac404-d81fe2f8.js";
import "./edges-49ac43a2-879ff194.js";
import "./createText-3df630b5-c657ba94.js";
import "./svgDraw-0fcc813d-cf93d6d9.js";
import "./line-67587600.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./selectAll-85071d98.js";
import "./app-9387156d.js";
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
