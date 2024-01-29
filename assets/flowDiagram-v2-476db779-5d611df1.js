import { p as parser$1, f as flowDb } from "./flowDb-6a57c1b4-d5fc3370.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-5f89df53-9675a58e.js";
import { B as setConfig } from "./mermaid.core-eeffdbd2.js";
import "./layout-8468bf13.js";
import "./index-a92ac404-43ebf14e.js";
import "./edges-49ac43a2-df2c752e.js";
import "./createText-3df630b5-967b4ed6.js";
import "./svgDraw-0fcc813d-726f39e8.js";
import "./line-b054064b.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./selectAll-9a9be5e5.js";
import "./app-43c6e3af.js";
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
