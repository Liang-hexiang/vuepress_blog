import {
  flowRendererV2,
  flowStyles
} from "./chunk-GKLLU77C.js";
import {
  flowDb,
  parser$1
} from "./chunk-JVPQVJSL.js";
import "./chunk-SMI3BTS2.js";
import "./chunk-66LJYKOO.js";
import "./chunk-FGX6APXM.js";
import "./chunk-Y55O7A3N.js";
import "./chunk-XLJEZXBE.js";
import "./chunk-HYCFHQ5R.js";
import {
  require_dayjs_min,
  require_dist,
  setConfig
} from "./chunk-LITSLGUO.js";
import {
  __toESM
} from "./chunk-TFWDKVI3.js";

// node_modules/mermaid/dist/flowDiagram-v2-476db779.js
var import_dayjs = __toESM(require_dayjs_min(), 1);
var import_sanitize_url = __toESM(require_dist(), 1);
var diagram = {
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
//# sourceMappingURL=flowDiagram-v2-476db779-NHJCL73F.js.map
