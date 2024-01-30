var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { _ as __vitePreload } from "./app-c2e03701.js";
import { V as VTTCue, g as parseVTTTimestamp } from "./register-e1483a7a.js";
const FORMAT_START_RE = /^Format:[\s\t]*/, STYLE_START_RE = /^Style:[\s\t]*/, DIALOGUE_START_RE = /^Dialogue:[\s\t]*/, FORMAT_SPLIT_RE = /[\s\t]*,[\s\t]*/, STYLE_FUNCTION_RE = /\{[^}]+\}/g, NEW_LINE_RE = /\\N/g, STYLES_SECTION_START_RE = /^\[(.*)[\s\t]?Styles\]$/, EVENTS_SECTION_START_RE = /^\[(.*)[\s\t]?Events\]$/;
class SSAParser {
  constructor() {
    __publicField(this, "f");
    __publicField(this, "O", 0);
    __publicField(this, "a", null);
    __publicField(this, "j", []);
    __publicField(this, "k", []);
    __publicField(this, "N", null);
    __publicField(this, "d");
    __publicField(this, "P", {});
  }
  async init(init) {
    this.f = init;
    if (init.errors)
      this.d = (await __vitePreload(() => import("./errors-1808ba97.js"), true ? ["assets/errors-1808ba97.js","assets/register-e1483a7a.js","assets/app-c2e03701.js"] : void 0)).ParseErrorBuilder;
  }
  parse(line, lineCount) {
    var _a, _b;
    if (this.O) {
      switch (this.O) {
        case 1:
          if (line === "") {
            this.O = 0;
          } else if (STYLE_START_RE.test(line)) {
            if (this.N) {
              const styles = line.replace(STYLE_START_RE, "").split(FORMAT_SPLIT_RE);
              this.S(styles);
            } else {
              this.e((_a = this.d) == null ? void 0 : _a.T("Style", lineCount));
            }
          } else if (FORMAT_START_RE.test(line)) {
            this.N = line.replace(FORMAT_START_RE, "").split(FORMAT_SPLIT_RE);
          } else if (EVENTS_SECTION_START_RE.test(line)) {
            this.N = null;
            this.O = 2;
          }
          break;
        case 2:
          if (line === "") {
            this.Q();
          } else if (DIALOGUE_START_RE.test(line)) {
            this.Q();
            if (this.N) {
              const dialogue = line.replace(DIALOGUE_START_RE, "").split(FORMAT_SPLIT_RE), cue = this.U(dialogue, lineCount);
              if (cue)
                this.a = cue;
            } else {
              this.e((_b = this.d) == null ? void 0 : _b.T("Dialogue", lineCount));
            }
          } else if (this.a) {
            this.a.text += "\n" + line.replace(STYLE_FUNCTION_RE, "").replace(NEW_LINE_RE, "\n");
          } else if (FORMAT_START_RE.test(line)) {
            this.N = line.replace(FORMAT_START_RE, "").split(FORMAT_SPLIT_RE);
          } else if (STYLES_SECTION_START_RE.test(line)) {
            this.N = null;
            this.O = 1;
          } else if (EVENTS_SECTION_START_RE.test(line)) {
            this.N = null;
          }
      }
    } else if (line === "")
      ;
    else if (STYLES_SECTION_START_RE.test(line)) {
      this.N = null;
      this.O = 1;
    } else if (EVENTS_SECTION_START_RE.test(line)) {
      this.N = null;
      this.O = 2;
    }
  }
  done() {
    return {
      metadata: {},
      cues: this.j,
      regions: [],
      errors: this.k
    };
  }
  Q() {
    var _a, _b;
    if (!this.a)
      return;
    this.j.push(this.a);
    (_b = (_a = this.f).onCue) == null ? void 0 : _b.call(_a, this.a);
    this.a = null;
  }
  S(values) {
    let name = "Default", styles = {}, outlineX, align = "center", vertical = "bottom", marginV, outlineY = 1.2, outlineColor, bgColor, borderStyle = 3, transform = [];
    for (let i = 0; i < this.N.length; i++) {
      const field = this.N[i], value = values[i];
      switch (field) {
        case "Name":
          name = value;
          break;
        case "Fontname":
          styles["font-family"] = value;
          break;
        case "Fontsize":
          styles["font-size"] = `calc(${value} / var(--overlay-height))`;
          break;
        case "PrimaryColour":
          const color = parseColor(value);
          if (color)
            styles["--cue-color"] = color;
          break;
        case "BorderStyle":
          borderStyle = parseInt(value, 10);
          break;
        case "BackColour":
          bgColor = parseColor(value);
          break;
        case "OutlineColour":
          const _outlineColor = parseColor(value);
          if (_outlineColor)
            outlineColor = _outlineColor;
          break;
        case "Bold":
          if (parseInt(value))
            styles["font-weight"] = "bold";
          break;
        case "Italic":
          if (parseInt(value))
            styles["font-style"] = "italic";
          break;
        case "Underline":
          if (parseInt(value))
            styles["text-decoration"] = "underline";
          break;
        case "StrikeOut":
          if (parseInt(value))
            styles["text-decoration"] = "line-through";
          break;
        case "Spacing":
          styles["letter-spacing"] = value + "px";
          break;
        case "AlphaLevel":
          styles["opacity"] = parseFloat(value);
          break;
        case "ScaleX":
          transform.push(`scaleX(${parseFloat(value) / 100})`);
          break;
        case "ScaleY":
          transform.push(`scaleY(${parseFloat(value) / 100})`);
          break;
        case "Angle":
          transform.push(`rotate(${value}deg)`);
          break;
        case "Shadow":
          outlineY = parseInt(value, 10) * 1.2;
          break;
        case "MarginL":
          styles["--cue-width"] = "auto";
          styles["--cue-left"] = parseFloat(value) + "px";
          break;
        case "MarginR":
          styles["--cue-width"] = "auto";
          styles["--cue-right"] = parseFloat(value) + "px";
          break;
        case "MarginV":
          marginV = parseFloat(value);
          break;
        case "Outline":
          outlineX = parseInt(value, 10);
          break;
        case "Alignment":
          const alignment = parseInt(value, 10);
          if (alignment >= 4)
            vertical = alignment >= 7 ? "top" : "center";
          switch (alignment % 3) {
            case 1:
              align = "start";
              break;
            case 2:
              align = "center";
              break;
            case 3:
              align = "end";
              break;
          }
      }
    }
    styles.R = vertical;
    styles["--cue-white-space"] = "normal";
    styles["--cue-line-height"] = "normal";
    styles["--cue-text-align"] = align;
    if (vertical === "center") {
      styles[`--cue-top`] = "50%";
      transform.push("translateY(-50%)");
    } else {
      styles[`--cue-${vertical}`] = (marginV || 0) + "px";
    }
    if (borderStyle === 1) {
      styles["--cue-padding-y"] = "0";
    }
    if (borderStyle === 1 || bgColor) {
      styles["--cue-bg-color"] = borderStyle === 1 ? "none" : bgColor;
    }
    if (borderStyle === 3 && outlineColor) {
      styles["--cue-outline"] = `${outlineX}px solid ${outlineColor}`;
    }
    if (borderStyle === 1 && typeof outlineX === "number") {
      const color = bgColor ?? "#000";
      styles["--cue-text-shadow"] = [
        outlineColor && buildTextShadow(outlineX * 1.2, outlineY * 1.2, outlineColor),
        outlineColor ? buildTextShadow(outlineX * (outlineX / 2), outlineY * (outlineX / 2), color) : buildTextShadow(outlineX, outlineY, color)
      ].filter(Boolean).join(", ");
    }
    if (transform.length)
      styles["--cue-transform"] = transform.join(" ");
    this.P[name] = styles;
  }
  U(values, lineCount) {
    const fields = this.V(values);
    const timestamp = this.o(fields.Start, fields.End, lineCount);
    if (!timestamp)
      return;
    const cue = new VTTCue(timestamp[0], timestamp[1], ""), styles = { ...this.P[fields.Style] || {} }, voice = fields.Name ? `<v ${fields.Name}>` : "";
    const vertical = styles.R, marginLeft = fields.MarginL && parseFloat(fields.MarginL), marginRight = fields.MarginR && parseFloat(fields.MarginR), marginV = fields.MarginV && parseFloat(fields.MarginV);
    if (marginLeft) {
      styles["--cue-width"] = "auto";
      styles["--cue-left"] = marginLeft + "px";
    }
    if (marginRight) {
      styles["--cue-width"] = "auto";
      styles["--cue-right"] = marginRight + "px";
    }
    if (marginV && vertical !== "center") {
      styles[`--cue-${vertical}`] = marginV + "px";
    }
    cue.text = voice + values.slice(this.N.length - 1).join(", ").replace(STYLE_FUNCTION_RE, "").replace(NEW_LINE_RE, "\n");
    delete styles.R;
    if (Object.keys(styles).length)
      cue.style = styles;
    return cue;
  }
  V(values) {
    const fields = {};
    for (let i = 0; i < this.N.length; i++) {
      fields[this.N[i]] = values[i];
    }
    return fields;
  }
  o(startTimeText, endTimeText, lineCount) {
    var _a, _b, _c;
    const startTime = parseVTTTimestamp(startTimeText), endTime = parseVTTTimestamp(endTimeText);
    if (startTime !== null && endTime !== null && endTime > startTime) {
      return [startTime, endTime];
    } else {
      if (startTime === null) {
        this.e((_a = this.d) == null ? void 0 : _a.q(startTimeText, lineCount));
      }
      if (endTime === null) {
        this.e((_b = this.d) == null ? void 0 : _b.r(endTimeText, lineCount));
      }
      if (startTime != null && endTime !== null && endTime > startTime) {
        this.e((_c = this.d) == null ? void 0 : _c.s(startTime, endTime, lineCount));
      }
    }
  }
  e(error) {
    var _a, _b;
    if (!error)
      return;
    this.k.push(error);
    if (this.f.strict) {
      this.f.cancel();
      throw error;
    } else {
      (_b = (_a = this.f).onError) == null ? void 0 : _b.call(_a, error);
    }
  }
}
function parseColor(color) {
  const abgr = parseInt(color.replace("&H", ""), 16);
  if (abgr >= 0) {
    const a = abgr >> 24 & 255 ^ 255;
    const alpha = a / 255;
    const b = abgr >> 16 & 255;
    const g = abgr >> 8 & 255;
    const r = abgr & 255;
    return "rgba(" + [r, g, b, alpha].join(",") + ")";
  }
  return null;
}
function buildTextShadow(x, y, color) {
  const noOfShadows = Math.ceil(2 * Math.PI * x);
  let textShadow = "";
  for (let i = 0; i < noOfShadows; i++) {
    const theta = 2 * Math.PI * i / noOfShadows;
    textShadow += x * Math.cos(theta) + "px " + y * Math.sin(theta) + "px 0 " + color + (i == noOfShadows - 1 ? "" : ",");
  }
  return textShadow;
}
function createSSAParser() {
  return new SSAParser();
}
export {
  SSAParser,
  createSSAParser as default
};
