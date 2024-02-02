var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { H as onDispose, y as TextTrack, W as TEXT_TRACK_NATIVE, z as TEXT_TRACK_READY_STATE, X as TEXT_TRACK_NATIVE_HLS, w as listenEvent, Y as canUsePictureInPicture, Z as canUseVideoPresentation, D as DOMEvent, _ as canPlayHLSNatively, $ as ATTACH_VIDEO } from "./register-fd3e9d5f.js";
import { H as HTMLMediaProvider } from "./provider-4530e4cc.js";
import "./app-72f0b7d2.js";
class NativeHLSTextTracks {
  constructor(_video, _context) {
    this.aa = _video;
    this.ph = _context;
    _video.textTracks.onaddtrack = this.fa.bind(this);
    onDispose(this.Hh.bind(this));
  }
  fa(event2) {
    const nativeTrack = event2.track;
    if (!nativeTrack || findTextTrackElement(this.aa, nativeTrack))
      return;
    const track = new TextTrack({
      id: nativeTrack.id,
      kind: nativeTrack.kind,
      label: nativeTrack.label,
      language: nativeTrack.language,
      type: "vtt"
    });
    track[TEXT_TRACK_NATIVE] = { track: nativeTrack };
    track[TEXT_TRACK_READY_STATE] = 2;
    track[TEXT_TRACK_NATIVE_HLS] = true;
    let lastIndex = 0;
    const onCueChange = (event22) => {
      if (!nativeTrack.cues)
        return;
      for (let i = lastIndex; i < nativeTrack.cues.length; i++) {
        track.addCue(nativeTrack.cues[i], event22);
        lastIndex++;
      }
    };
    onCueChange(event2);
    nativeTrack.oncuechange = onCueChange;
    this.ph.textTracks.add(track, event2);
    track.setMode(nativeTrack.mode, event2);
  }
  Hh() {
    var _a;
    this.aa.textTracks.onaddtrack = null;
    for (const track of this.ph.textTracks) {
      const nativeTrack = (_a = track[TEXT_TRACK_NATIVE]) == null ? void 0 : _a.track;
      if (nativeTrack == null ? void 0 : nativeTrack.oncuechange)
        nativeTrack.oncuechange = null;
    }
  }
}
function findTextTrackElement(video, track) {
  return Array.from(video.children).find((el) => el.track === track);
}
class VideoPictureInPicture {
  constructor(_video, _media) {
    __publicField(this, "Hc", (active, event2) => {
      this.k.delegate.R("picture-in-picture-change", {
        detail: active,
        trigger: event2
      });
    });
    this.aa = _video;
    this.k = _media;
    listenEvent(this.aa, "enterpictureinpicture", this.ri.bind(this));
    listenEvent(this.aa, "leavepictureinpicture", this.si.bind(this));
  }
  get active() {
    return document.pictureInPictureElement === this.aa;
  }
  get supported() {
    return canUsePictureInPicture(this.aa);
  }
  async enter() {
    return this.aa.requestPictureInPicture();
  }
  exit() {
    return document.exitPictureInPicture();
  }
  ri(event2) {
    this.Hc(true, event2);
  }
  si(event2) {
    this.Hc(false, event2);
  }
}
class VideoPresentation {
  constructor(_video, _media) {
    __publicField(this, "Ga", "inline");
    this.aa = _video;
    this.k = _media;
    listenEvent(this.aa, "webkitpresentationmodechanged", this.wi.bind(this));
  }
  get vi() {
    return canUseVideoPresentation(this.aa);
  }
  async ui(mode) {
    if (this.Ga === mode)
      return;
    this.aa.webkitSetPresentationMode(mode);
  }
  wi() {
    var _a;
    const prevMode = this.Ga;
    this.Ga = this.aa.webkitPresentationMode;
    (_a = this.k.player) == null ? void 0 : _a.dispatchEvent(
      new DOMEvent("video-presentation-change", {
        detail: this.Ga,
        trigger: event
      })
    );
    ["fullscreen", "picture-in-picture"].forEach((type) => {
      if (this.Ga === type || prevMode === type) {
        this.k.delegate.R(`${type}-change`, {
          detail: this.Ga === type,
          trigger: event
        });
      }
    });
  }
}
class FullscreenPresentationAdapter {
  constructor(_presentation) {
    this.ti = _presentation;
  }
  get active() {
    return this.ti.Ga === "fullscreen";
  }
  get supported() {
    return this.ti.vi;
  }
  async enter() {
    this.ti.ui("fullscreen");
  }
  async exit() {
    this.ti.ui("inline");
  }
}
class PIPPresentationAdapter {
  constructor(_presentation) {
    this.ti = _presentation;
  }
  get active() {
    return this.ti.Ga === "picture-in-picture";
  }
  get supported() {
    return this.ti.vi;
  }
  async enter() {
    this.ti.ui("picture-in-picture");
  }
  async exit() {
    this.ti.ui("inline");
  }
}
class VideoProvider extends HTMLMediaProvider {
  constructor(video, context) {
    super(video);
    __publicField(this, "$$PROVIDER_TYPE", "VIDEO");
    __publicField(this, "fullscreen");
    __publicField(this, "pictureInPicture");
    if (canUseVideoPresentation(video)) {
      const presentation = new VideoPresentation(video, context);
      this.fullscreen = new FullscreenPresentationAdapter(presentation);
      this.pictureInPicture = new PIPPresentationAdapter(presentation);
    } else if (canUsePictureInPicture(video)) {
      this.pictureInPicture = new VideoPictureInPicture(video, context);
    }
  }
  get type() {
    return "video";
  }
  setup(context) {
    super.setup(context);
    if (canPlayHLSNatively(this.video)) {
      new NativeHLSTextTracks(this.video, context);
    }
    context.textRenderers[ATTACH_VIDEO](this.video);
    onDispose(() => {
      context.textRenderers[ATTACH_VIDEO](null);
    });
    if (this.type === "video")
      context.delegate.R("provider-setup", { detail: this });
  }
  /**
   * The native HTML `<video>` element.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement}
   */
  get video() {
    return this.k;
  }
}
export {
  VideoProvider
};
