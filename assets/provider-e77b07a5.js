var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { k as isUndefined, l as isString, D as DOMEvent, m as coerceToError, n as loadScript, o as isFunction, q as isHLSSupported, s as preconnect, v as peek } from "./register-adb9afe5.js";
import { VideoProvider } from "./provider-a4d64a9a.js";
import { a as HLSController } from "./provider-c97e3bcf.js";
import "./app-1b1c230d.js";
class HLSLibLoader {
  constructor(_lib, _context, _callback) {
    this.di = _lib;
    this.ph = _context;
    this._e = _callback;
    this.ei();
  }
  async ei() {
    const callbacks = {
      onLoadStart: this.ge.bind(this),
      onLoaded: this.ue.bind(this),
      onLoadError: this.fi.bind(this)
    };
    let ctor = await loadHLSScript(this.di, callbacks);
    if (isUndefined(ctor) && !isString(this.di))
      ctor = await importHLS(this.di, callbacks);
    if (!ctor)
      return null;
    if (!ctor.isSupported()) {
      const message = "[vidstack]: `hls.js` is not supported in this environment";
      this.ph.player.dispatchEvent(new DOMEvent("hls-unsupported"));
      this.ph.delegate.R("error", { detail: { message, code: 4 } });
      return null;
    }
    return ctor;
  }
  ge() {
    this.ph.player.dispatchEvent(new DOMEvent("hls-lib-load-start"));
  }
  ue(ctor) {
    this.ph.player.dispatchEvent(
      new DOMEvent("hls-lib-loaded", {
        detail: ctor
      })
    );
    this._e(ctor);
  }
  fi(e) {
    const error = coerceToError(e);
    this.ph.player.dispatchEvent(
      new DOMEvent("hls-lib-load-error", {
        detail: error
      })
    );
    this.ph.delegate.R("error", {
      detail: { message: error.message, code: 4 }
    });
  }
}
async function importHLS(loader, callbacks = {}) {
  var _a, _b, _c, _d, _e;
  if (isUndefined(loader))
    return void 0;
  (_a = callbacks.onLoadStart) == null ? void 0 : _a.call(callbacks);
  if (loader.prototype && loader.prototype !== Function) {
    (_b = callbacks.onLoaded) == null ? void 0 : _b.call(callbacks, loader);
    return loader;
  }
  try {
    const ctor = (_c = await loader()) == null ? void 0 : _c.default;
    if (ctor && !!ctor.isSupported) {
      (_d = callbacks.onLoaded) == null ? void 0 : _d.call(callbacks, ctor);
    } else {
      throw Error(
        false ? "[vidstack] failed importing `hls.js`. Dynamic import returned invalid constructor." : ""
      );
    }
    return ctor;
  } catch (err) {
    (_e = callbacks.onLoadError) == null ? void 0 : _e.call(callbacks, err);
  }
  return void 0;
}
async function loadHLSScript(src, callbacks = {}) {
  var _a, _b, _c;
  if (!isString(src))
    return void 0;
  (_a = callbacks.onLoadStart) == null ? void 0 : _a.call(callbacks);
  try {
    await loadScript(src);
    if (!isFunction(window.Hls)) {
      throw Error(
        false ? "[vidstack] failed loading `hls.js`. Could not find a valid `Hls` constructor on window" : ""
      );
    }
    const ctor = window.Hls;
    (_b = callbacks.onLoaded) == null ? void 0 : _b.call(callbacks, ctor);
    return ctor;
  } catch (err) {
    (_c = callbacks.onLoadError) == null ? void 0 : _c.call(callbacks, err);
  }
  return void 0;
}
const JS_DELIVR_CDN = "https://cdn.jsdelivr.net";
class HLSProvider extends VideoProvider {
  constructor() {
    super(...arguments);
    __publicField(this, "$$PROVIDER_TYPE", "HLS");
    __publicField(this, "mh", null);
    __publicField(this, "xd", new HLSController(this.video));
    __publicField(this, "lh", `${JS_DELIVR_CDN}/npm/hls.js@^1.0.0/dist/hls${".min.js"}`);
  }
  /**
   * The `hls.js` constructor.
   */
  get ctor() {
    return this.mh;
  }
  /**
   * The current `hls.js` instance.
   */
  get instance() {
    return this.xd.instance;
  }
  get type() {
    return "hls";
  }
  get canLiveSync() {
    return true;
  }
  /**
   * The `hls.js` configuration object.
   *
   * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning}
   */
  get config() {
    return this.xd.nh;
  }
  set config(config) {
    this.xd.nh = config;
  }
  /**
   * The `hls.js` constructor (supports dynamic imports) or a URL of where it can be found.
   *
   * @defaultValue `https://cdn.jsdelivr.net/npm/hls.js@^1.0.0/dist/hls.min.js`
   */
  get library() {
    return this.lh;
  }
  set library(library) {
    this.lh = library;
  }
  preconnect() {
    if (!isString(this.lh))
      return;
    preconnect(this.lh);
  }
  setup(context) {
    super.setup(context);
    new HLSLibLoader(this.lh, context, (ctor) => {
      this.mh = ctor;
      this.xd.setup(ctor, context);
      context.delegate.R("provider-setup", { detail: this });
      const src = peek(context.$store.source);
      if (src)
        this.loadSource(src);
    });
  }
  async loadSource({ src }) {
    var _a;
    if (!isString(src))
      return;
    (_a = this.xd.instance) == null ? void 0 : _a.loadSource(src);
  }
  /**
   * The given callback is invoked when a new `hls.js` instance is created and right before it's
   * attached to media.
   */
  onInstance(callback) {
    const instance = this.xd.instance;
    if (instance)
      callback(instance);
    this.xd.oh.add(callback);
    return () => this.xd.oh.delete(callback);
  }
  destroy() {
    this.xd.Jg();
  }
}
/**
 * Whether `hls.js` is supported in this environment.
 */
__publicField(HLSProvider, "supported", isHLSSupported());
export {
  HLSProvider
};
