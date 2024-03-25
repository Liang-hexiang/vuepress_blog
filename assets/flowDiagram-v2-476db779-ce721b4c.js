import { p as parser$1, f as flowDb } from "./flowDb-6a57c1b4-4e2103fc.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-5f89df53-70d07b42.js";
import { B as setConfig } from "./mermaid.core-6ae43af0.js";
import "./layout-88d09d67.js";
import "./index-a92ac404-3d8d9e3d.js";
import "./edges-49ac43a2-f940fcbd.js";
import "./createText-3df630b5-0f3c649b.js";
import "./svgDraw-0fcc813d-a5aacddd.js";
import "./line-8d03cbc5.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./selectAll-74f81cab.js";
import "./app-633802df.js";
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
