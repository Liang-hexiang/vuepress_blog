import { p as parser$1, f as flowDb } from "./flowDb-6a57c1b4-af829fba.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-5f89df53-7f218643.js";
import { B as setConfig } from "./mermaid.core-0d1776a9.js";
import "./layout-42d3d33d.js";
import "./index-a92ac404-2cad1ee9.js";
import "./edges-49ac43a2-72f1a17a.js";
import "./createText-3df630b5-affc273f.js";
import "./svgDraw-0fcc813d-3db7c7ee.js";
import "./line-d93a7de6.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./selectAll-3fa8bb50.js";
import "./app-d6533bb6.js";
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
