var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { v as peek, D as DOMEvent, E as ENABLE_AUTO_QUALITY, w as listenEvent, x as effect, y as TextTrack, z as TEXT_TRACK_READY_STATE, A as TEXT_TRACK_ON_MODE_CHANGE, L as LIST_SELECT, S as SET_AUTO_QUALITY, B as LIST_ADD, I as IS_CHROME, k as isUndefined, F as isNumber, G as camelToKebabCase, H as onDispose, J as useDisposalBin, K as IS_SAFARI, M as isHLSSrc, N as getNumberOfDecimalPlaces, O as isNil, Q as LIST_REMOVE, R as setAttribute, U as isMediaStream, l as isString } from "./register-adb9afe5.js";
class RAFLoop {
  constructor(_callback) {
    __publicField(this, "xi");
    this._e = _callback;
  }
  J() {
    if (!isUndefined(this.xi))
      return;
    this.yi();
  }
  K() {
    if (isNumber(this.xi))
      window.cancelAnimationFrame(this.xi);
    this.xi = void 0;
  }
  yi() {
    this.xi = window.requestAnimationFrame(() => {
      if (isUndefined(this.xi))
        return;
      this._e();
      this.yi();
    });
  }
}
const toDOMEventType = (type) => camelToKebabCase(type);
class HLSController {
  constructor(_video) {
    __publicField(this, "ph");
    __publicField(this, "za", null);
    __publicField(this, "gi", null);
    __publicField(this, "nh", {});
    __publicField(this, "oh", /* @__PURE__ */ new Set());
    this.aa = _video;
  }
  get instance() {
    return this.za;
  }
  setup(ctor, context) {
    this.ph = context;
    const isLive = peek(context.$store.streamType).includes("live"), isLiveLowLatency = peek(context.$store.streamType).includes("ll-");
    this.za = new ctor({
      lowLatencyMode: isLiveLowLatency,
      backBufferLength: isLiveLowLatency ? 4 : isLive ? 8 : void 0,
      renderTextTracksNatively: false,
      ...this.nh
    });
    const dispatcher = this.hi.bind(this);
    for (const event2 of Object.values(ctor.Events))
      this.za.on(event2, dispatcher);
    this.za.on(ctor.Events.ERROR, this.Wb.bind(this));
    for (const callback of this.oh)
      callback(this.za);
    context.player.dispatchEvent(new DOMEvent("hls-instance", { detail: this.za }));
    this.za.attachMedia(this.aa);
    this.za.on(ctor.Events.AUDIO_TRACK_SWITCHED, this.ii.bind(this));
    this.za.on(ctor.Events.LEVEL_SWITCHED, this.ji.bind(this));
    this.za.on(ctor.Events.LEVEL_LOADED, this.ki.bind(this));
    this.za.on(ctor.Events.NON_NATIVE_TEXT_TRACKS_FOUND, this.li.bind(this));
    this.za.on(ctor.Events.CUES_PARSED, this.mi.bind(this));
    context.qualities[ENABLE_AUTO_QUALITY] = this.ni.bind(this);
    listenEvent(context.qualities, "change", this.Ff.bind(this));
    listenEvent(context.audioTracks, "change", this.oi.bind(this));
    this.gi = effect(this.pi.bind(this));
  }
  pi() {
    if (!this.ph.$store.live())
      return;
    const raf = new RAFLoop(this.qi.bind(this));
    raf.J();
    return raf.K.bind(raf);
  }
  qi() {
    var _a;
    this.ph.$store.liveSyncPosition.set(((_a = this.za) == null ? void 0 : _a.liveSyncPosition) ?? Infinity);
  }
  hi(eventType, detail) {
    this.ph.player.dispatchEvent(new DOMEvent(toDOMEventType(eventType), { detail }));
  }
  li(eventType, data) {
    const event2 = new DOMEvent(eventType, { detail: data });
    let currentTrack = -1;
    for (let i = 0; i < data.tracks.length; i++) {
      const nonNativeTrack = data.tracks[i], init = nonNativeTrack.subtitleTrack ?? nonNativeTrack.closedCaptions, track = new TextTrack({
        id: `hls-${nonNativeTrack.kind}${i}`,
        src: init == null ? void 0 : init.url,
        label: nonNativeTrack.label,
        language: init == null ? void 0 : init.lang,
        kind: nonNativeTrack.kind
      });
      track[TEXT_TRACK_READY_STATE] = 2;
      track[TEXT_TRACK_ON_MODE_CHANGE] = () => {
        if (track.mode === "showing") {
          this.za.subtitleTrack = i;
          currentTrack = i;
        } else if (currentTrack === i) {
          this.za.subtitleTrack = -1;
          currentTrack = -1;
        }
      };
      if (nonNativeTrack.default)
        track.setMode("showing", event2);
      this.ph.textTracks.add(track, event2);
    }
  }
  mi(eventType, data) {
    const track = this.ph.textTracks.getById(`hls-${data.track}`);
    if (!track)
      return;
    const event2 = new DOMEvent(eventType, { detail: data });
    for (const cue of data.cues) {
      cue.positionAlign = "auto";
      track.addCue(cue, event2);
    }
  }
  ii(eventType, data) {
    const track = this.ph.audioTracks[data.id];
    if (track) {
      this.ph.audioTracks[LIST_SELECT](
        track,
        true,
        new DOMEvent(eventType, { detail: data })
      );
    }
  }
  ji(eventType, data) {
    const quality = this.ph.qualities[data.level];
    if (quality) {
      this.ph.qualities[LIST_SELECT](
        quality,
        true,
        new DOMEvent(eventType, { detail: data })
      );
    }
  }
  ki(eventType, data) {
    if (this.ph.$store.canPlay())
      return;
    const { type, live, totalduration: duration } = data.details;
    const event2 = new DOMEvent(eventType, { detail: data });
    this.ph.delegate.R("stream-type-change", {
      detail: live ? type === "EVENT" && Number.isFinite(duration) ? "live:dvr" : "live" : "on-demand",
      trigger: event2
    });
    this.ph.delegate.R("duration-change", { detail: duration, trigger: event2 });
    const media = this.za.media;
    if (this.za.currentLevel === -1) {
      this.ph.qualities[SET_AUTO_QUALITY](true, event2);
    }
    for (const track of this.za.audioTracks) {
      this.ph.audioTracks[LIST_ADD](
        {
          id: track.id + "",
          label: track.name,
          language: track.lang || "",
          kind: "main"
        },
        event2
      );
    }
    for (const level of this.za.levels) {
      this.ph.qualities[LIST_ADD](
        {
          width: level.width,
          height: level.height,
          codec: level.codecSet,
          bitrate: level.bitrate
        },
        event2
      );
    }
    media.dispatchEvent(new DOMEvent("canplay", { trigger: event2 }));
  }
  Wb(eventType, data) {
    var _a, _b, _c;
    if (data.fatal) {
      switch (data.type) {
        case "networkError":
          (_a = this.za) == null ? void 0 : _a.startLoad();
          break;
        case "mediaError":
          (_b = this.za) == null ? void 0 : _b.recoverMediaError();
          break;
        default:
          (_c = this.za) == null ? void 0 : _c.destroy();
          this.za = null;
          break;
      }
    }
  }
  ni() {
    if (this.za)
      this.za.currentLevel = -1;
  }
  Ff() {
    const { qualities } = this.ph;
    if (!this.za || qualities.auto)
      return;
    this.za[qualities.switch + "Level"] = qualities.selectedIndex;
    if (IS_CHROME)
      this.aa.currentTime = this.aa.currentTime;
  }
  oi() {
    const { audioTracks } = this.ph;
    if (this.za && this.za.audioTrack !== audioTracks.selectedIndex) {
      this.za.audioTrack = audioTracks.selectedIndex;
    }
  }
  Jg() {
    var _a, _b;
    if (this.ph)
      this.ph.qualities[ENABLE_AUTO_QUALITY] = void 0;
    (_a = this.za) == null ? void 0 : _a.destroy();
    this.za = null;
    (_b = this.gi) == null ? void 0 : _b.call(this);
    this.gi = null;
  }
}
class HTMLMediaEvents {
  constructor(_provider, _context) {
    __publicField(this, "ih", useDisposalBin());
    __publicField(this, "yh", false);
    __publicField(this, "Bh", false);
    __publicField(this, "Ch", false);
    __publicField(this, "zh", new RAFLoop(this.Ih.bind(this)));
    __publicField(this, "$h");
    __publicField(this, "bi");
    this.j = _provider;
    this.ph = _context;
    this.Fh();
    effect(this.Gh.bind(this));
    onDispose(this.Hh.bind(this));
  }
  get k() {
    return this.j.media;
  }
  get jg() {
    return this.ph.delegate;
  }
  Hh() {
    this.zh.K();
    this.ih.empty();
  }
  /**
   * The `timeupdate` event fires surprisingly infrequently during playback, meaning your progress
   * bar (or whatever else is synced to the currentTime) moves in a choppy fashion. This helps
   * resolve that by retrieving time updates in a request animation frame loop.
   */
  Ih() {
    const newTime = this.j.currentTime;
    if (this.ph.$store.currentTime() !== newTime)
      this.xh(newTime);
  }
  Fh() {
    this.wh("loadstart", this.ge);
    this.wh("abort", this.Dh);
    this.wh("emptied", this.Jh);
    this.wh("error", this.Wb);
  }
  Kh() {
    if (this.Bh)
      return;
    this.ih.add(
      this.wh("loadeddata", this.Lh),
      this.wh("loadedmetadata", this.Mh),
      this.wh("canplay", this.Rb),
      this.wh("canplaythrough", this.Nh),
      this.wh("durationchange", this.Oh),
      this.wh("play", this.Ph),
      this.wh("progress", this.Qh),
      this.wh("stalled", this.Rh),
      this.wh("suspend", this.Sh)
    );
    this.Bh = true;
  }
  Th() {
    if (this.Ch)
      return;
    this.ih.add(
      this.wh("pause", this.Uh),
      this.wh("playing", this.Vh),
      this.wh("ratechange", this.Wh),
      this.wh("seeked", this.Xh),
      this.wh("seeking", this.Yh),
      this.wh("ended", this.Zh),
      this.wh("volumechange", this.ac),
      this.wh("waiting", this._h)
    );
    this.Ch = true;
  }
  wh(eventType, handler) {
    return listenEvent(
      this.k,
      eventType,
      handler.bind(this)
    );
  }
  ci(event2) {
    return;
  }
  xh(time, trigger) {
    this.jg.R("time-update", {
      // Avoid errors where `currentTime` can have higher precision.
      detail: {
        currentTime: Math.min(time, this.ph.$store.seekableEnd()),
        played: this.k.played
      },
      trigger
    });
  }
  ge(event2) {
    if (this.k.networkState === 3) {
      this.Dh(event2);
      return;
    }
    this.Kh();
    this.jg.R("load-start", { trigger: event2 });
  }
  Dh(event2) {
    this.jg.R("abort", { trigger: event2 });
  }
  Jh() {
    this.jg.R("emptied", { trigger: event });
  }
  Lh(event2) {
    this.jg.R("loaded-data", { trigger: event2 });
  }
  Mh(event2) {
    this.Eh();
    this.Th();
    this.jg.R("volume-change", {
      detail: {
        volume: this.k.volume,
        muted: this.k.muted
      }
    });
    this.jg.R("loaded-metadata", { trigger: event2 });
    if (IS_SAFARI && isHLSSrc(this.ph.$store.source())) {
      this.jg.af(this.Ah(), event2);
    }
  }
  Ah() {
    return {
      duration: this.k.duration,
      buffered: this.k.buffered,
      seekable: this.k.seekable
    };
  }
  Eh() {
    const isLive = !Number.isFinite(this.k.duration);
    this.jg.R("stream-type-change", {
      detail: isLive ? "live" : "on-demand"
    });
  }
  Ph(event2) {
    if (!this.ph.$store.canPlay)
      return;
    this.jg.R("play", { trigger: event2 });
  }
  Uh(event2) {
    if (this.k.readyState === 1 && !this.yh)
      return;
    this.yh = false;
    this.zh.K();
    this.jg.R("pause", { trigger: event2 });
  }
  Rb(event2) {
    this.jg.af(this.Ah(), event2);
  }
  Nh(event2) {
    if (this.ph.$store.started())
      return;
    this.jg.R("can-play-through", {
      trigger: event2,
      detail: this.Ah()
    });
  }
  Vh(event2) {
    this.yh = false;
    this.jg.R("playing", { trigger: event2 });
    this.zh.J();
  }
  Rh(event2) {
    this.jg.R("stalled", { trigger: event2 });
    if (this.k.readyState < 3) {
      this.yh = true;
      this.jg.R("waiting", { trigger: event2 });
    }
  }
  _h(event2) {
    if (this.k.readyState < 3) {
      this.yh = true;
      this.jg.R("waiting", { trigger: event2 });
    }
  }
  Zh(event2) {
    this.zh.K();
    this.xh(this.k.duration, event2);
    this.jg.R("end", { trigger: event2 });
    if (this.ph.$store.loop()) {
      this.ai();
    } else {
      this.jg.R("ended", { trigger: event2 });
    }
  }
  Gh() {
    if (this.ph.$store.paused()) {
      listenEvent(this.k, "timeupdate", this.Vb.bind(this));
    }
  }
  Vb(event2) {
    this.xh(this.k.currentTime, event2);
  }
  Oh(event2) {
    this.Eh();
    if (this.ph.$store.ended()) {
      this.xh(this.k.duration, event2);
    }
    this.jg.R("duration-change", {
      detail: this.k.duration,
      trigger: event2
    });
  }
  ac(event2) {
    this.jg.R("volume-change", {
      detail: {
        volume: this.k.volume,
        muted: this.k.muted
      },
      trigger: event2
    });
  }
  Xh(event2) {
    this.xh(this.k.currentTime, event2);
    this.jg.R("seeked", {
      detail: this.k.currentTime,
      trigger: event2
    });
    if (Math.trunc(this.k.currentTime) === Math.trunc(this.k.duration) && getNumberOfDecimalPlaces(this.k.duration) > getNumberOfDecimalPlaces(this.k.currentTime)) {
      this.xh(this.k.duration, event2);
      if (!this.k.ended) {
        this.ph.player.dispatchEvent(
          new DOMEvent("media-play-request", {
            trigger: event2
          })
        );
      }
    }
  }
  Yh(event2) {
    this.jg.R("seeking", {
      detail: this.k.currentTime,
      trigger: event2
    });
  }
  Qh(event2) {
    this.jg.R("progress", {
      detail: {
        buffered: this.k.buffered,
        seekable: this.k.seekable
      },
      trigger: event2
    });
  }
  ai() {
    const hasCustomControls = isNil(this.k.controls);
    if (hasCustomControls)
      this.k.controls = false;
    this.ph.player.dispatchEvent(new DOMEvent("media-loop-request"));
  }
  Sh(event2) {
    this.jg.R("suspend", { trigger: event2 });
  }
  Wh(event2) {
    this.jg.R("rate-change", {
      detail: this.k.playbackRate,
      trigger: event2
    });
  }
  Wb(event2) {
    const error = this.k.error;
    if (!error)
      return;
    this.jg.R("error", {
      detail: {
        message: error.message,
        code: error.code,
        mediaError: error
      },
      trigger: event2
    });
  }
}
class NativeAudioTracks {
  constructor(_provider, _context) {
    this.j = _provider;
    this.ph = _context;
    this.qh.onaddtrack = this.sh.bind(this);
    this.qh.onremovetrack = this.th.bind(this);
    this.qh.onchange = this.uh.bind(this);
    listenEvent(this.ph.audioTracks, "change", this.vh.bind(this));
  }
  get qh() {
    return this.j.media.audioTracks;
  }
  sh(event2) {
    const _track = event2.track;
    if (_track.label === "")
      return;
    const audioTrack = {
      id: _track.id + "",
      label: _track.label,
      language: _track.language,
      kind: _track.kind,
      selected: false
    };
    this.ph.audioTracks[LIST_ADD](audioTrack, event2);
    if (_track.enabled)
      audioTrack.selected = true;
  }
  th(event2) {
    const track = this.ph.audioTracks.getById(event2.track.id);
    if (track)
      this.ph.audioTracks[LIST_REMOVE](track, event2);
  }
  uh(event2) {
    let enabledTrack = this.rh();
    if (!enabledTrack)
      return;
    const track = this.ph.audioTracks.getById(enabledTrack.id);
    if (track)
      this.ph.audioTracks[LIST_SELECT](track, true, event2);
  }
  rh() {
    return Array.from(this.qh).find((track) => track.enabled);
  }
  vh(event2) {
    const { current } = event2.detail;
    if (!current)
      return;
    const track = this.qh.getTrackById(current.id);
    if (track) {
      const prev = this.rh();
      if (prev)
        prev.enabled = false;
      track.enabled = true;
    }
  }
}
class HTMLMediaProvider {
  constructor(_media) {
    this.k = _media;
  }
  setup(context) {
    new HTMLMediaEvents(this, context);
    if ("audioTracks" in this.media)
      new NativeAudioTracks(this, context);
  }
  get type() {
    return "";
  }
  get media() {
    return this.k;
  }
  get paused() {
    return this.k.paused;
  }
  get muted() {
    return this.k.muted;
  }
  set muted(muted) {
    this.k.muted = muted;
  }
  get volume() {
    return this.k.volume;
  }
  set volume(volume) {
    this.k.volume = volume;
  }
  get currentTime() {
    return this.k.currentTime;
  }
  set currentTime(time) {
    this.k.currentTime = time;
  }
  get playsinline() {
    return this.k.hasAttribute("playsinline");
  }
  set playsinline(playsinline) {
    setAttribute(this.k, "playsinline", playsinline);
  }
  get playbackRate() {
    return this.k.playbackRate;
  }
  set playbackRate(rate) {
    this.k.playbackRate = rate;
  }
  async play() {
    return this.k.play();
  }
  async pause() {
    return this.k.pause();
  }
  async loadSource({ src }, preload) {
    this.k.preload = preload;
    if (isMediaStream(src)) {
      this.k.srcObject = src;
    } else {
      this.k.srcObject = null;
      this.k.src = isString(src) ? src : window.URL.createObjectURL(src);
    }
    this.k.load();
  }
}
export {
  HTMLMediaProvider as H,
  HLSController as a
};
