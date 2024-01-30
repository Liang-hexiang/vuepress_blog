var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { H as HTMLMediaProvider } from "./provider-f1c7442f.js";
import "./register-560c673b.js";
import "./app-d6533bb6.js";
class AudioProvider extends HTMLMediaProvider {
  constructor() {
    super(...arguments);
    __publicField(this, "$$PROVIDER_TYPE", "AUDIO");
  }
  get type() {
    return "audio";
  }
  setup(context) {
    super.setup(context);
    if (this.type === "audio")
      context.delegate.R("provider-setup", { detail: this });
  }
  /**
   * The native HTML `<audio>` element.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement}
   */
  get audio() {
    return this.k;
  }
}
export {
  AudioProvider
};
