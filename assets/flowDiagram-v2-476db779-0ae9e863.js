import { p as parser$1, f as flowDb } from "./flowDb-6a57c1b4-10be4ddf.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-5f89df53-0f52918a.js";
import { B as setConfig } from "./mermaid.core-5fb20c5d.js";
import "./layout-3793c9a2.js";
import "./index-a92ac404-d2dd6a36.js";
import "./edges-49ac43a2-3f9675a9.js";
import "./createText-3df630b5-66e19a69.js";
import "./svgDraw-0fcc813d-df77bee9.js";
import "./line-de29888e.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./selectAll-23ad784b.js";
import "./app-a7828117.js";
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
