import { p as parser$1, f as flowDb } from "./flowDb-6a57c1b4-7cd7e438.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-5f89df53-45b96caf.js";
import { B as setConfig } from "./mermaid.core-2ba066e7.js";
import "./layout-e1ef9f84.js";
import "./index-a92ac404-5b1f969a.js";
import "./edges-49ac43a2-95f05677.js";
import "./createText-3df630b5-48bd4a17.js";
import "./svgDraw-0fcc813d-f7bb79f8.js";
import "./line-af8ee067.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./selectAll-7a8bddae.js";
import "./app-c2e03701.js";
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
