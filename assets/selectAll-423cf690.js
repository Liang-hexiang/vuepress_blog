import { S as Selection, t as root, v as array } from "./mermaid.core-2da4967f.js";
function selectAll(selector) {
  return typeof selector === "string" ? new Selection([document.querySelectorAll(selector)], [document.documentElement]) : new Selection([array(selector)], root);
}
export {
  selectAll as s
};
