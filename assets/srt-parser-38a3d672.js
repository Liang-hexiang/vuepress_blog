import { i as VTTParser, j as VTTBlock, V as VTTCue } from "./register-b25ec70a.js";
import "./app-ef9c1d43.js";
const MILLISECOND_SEP_RE = /,/g, TIMESTAMP_SEP = "-->";
class SRTParser extends VTTParser {
  parse(line, lineCount) {
    var _a, _b;
    if (line === "") {
      if (this.a) {
        this.j.push(this.a);
        (_b = (_a = this.f).onCue) == null ? void 0 : _b.call(_a, this.a);
        this.a = null;
      }
      this.c = VTTBlock.None;
    } else if (this.c === VTTBlock.Cue) {
      this.a.text += (this.a.text ? "\n" : "") + line;
    } else if (line.includes(TIMESTAMP_SEP)) {
      const result = this.o(line, lineCount);
      if (result) {
        this.a = new VTTCue(result[0], result[1], result[2].join(" "));
        this.a.id = this.l;
        this.c = VTTBlock.Cue;
      }
    }
    this.l = line;
  }
  o(line, lineCount) {
    return super.o(line.replace(MILLISECOND_SEP_RE, "."), lineCount);
  }
}
function createSRTParser() {
  return new SRTParser();
}
export {
  SRTParser,
  createSRTParser as default
};
