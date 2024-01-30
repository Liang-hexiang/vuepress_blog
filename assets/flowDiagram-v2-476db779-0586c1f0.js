import { p as parser$1, f as flowDb } from "./flowDb-6a57c1b4-bde104c4.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-5f89df53-8e871405.js";
import { B as setConfig } from "./mermaid.core-e34e74ff.js";
import "./layout-04c64145.js";
import "./index-a92ac404-dffecb28.js";
import "./edges-49ac43a2-985e7527.js";
import "./createText-3df630b5-01e0d595.js";
import "./svgDraw-0fcc813d-e1d997d1.js";
import "./line-405d5f00.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./selectAll-9c81fa0d.js";
import "./app-ef9c1d43.js";
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
