var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/space/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  const links = document.getElementsByTagName("link");
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    const isBaseRelative = !!importerUrl;
    if (isBaseRelative) {
      for (let i2 = links.length - 1; i2 >= 0; i2--) {
        const link2 = links[i2];
        if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
          return;
        }
      }
    } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule());
};
/**
* @vue/shared v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function makeMap(str, expectsLowerCase) {
  const set2 = new Set(str.split(","));
  return expectsLowerCase ? (val) => set2.has(val.toLowerCase()) : (val) => set2.has(val);
}
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i2 = arr.indexOf(el);
  if (i2 > -1) {
    arr.splice(i2, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => toTypeString(val) === "[object Date]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject$1(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction((str) => {
  const s2 = str ? `on${capitalize(str)}` : ``;
  return s2;
});
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i2 = 0; i2 < fns.length; i2++) {
    fns[i2](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
const toNumber = (val) => {
  const n2 = isString(val) ? Number(val) : NaN;
  return isNaN(n2) ? val : n2;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i2 = 0; i2 < value.length; i2++) {
      const item = value[i2];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function stringifyStyle(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    const value = styles[key];
    const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
    if (isString(value) || typeof value === "number") {
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      const normalized = normalizeClass(value[i2]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const MATH_TAGS = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const isMathMLTag = /* @__PURE__ */ makeMap(MATH_TAGS);
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
const isBooleanAttr = /* @__PURE__ */ makeMap(
  specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`
);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const isKnownHtmlAttr = /* @__PURE__ */ makeMap(
  `accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`
);
const isKnownSvgAttr = /* @__PURE__ */ makeMap(
  `xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`
);
function isRenderableAttrValue(value) {
  if (value == null) {
    return false;
  }
  const type = typeof value;
  return type === "string" || type === "number" || type === "boolean";
}
function looseCompareArrays(a2, b2) {
  if (a2.length !== b2.length)
    return false;
  let equal = true;
  for (let i2 = 0; equal && i2 < a2.length; i2++) {
    equal = looseEqual(a2[i2], b2[i2]);
  }
  return equal;
}
function looseEqual(a2, b2) {
  if (a2 === b2)
    return true;
  let aValidType = isDate(a2);
  let bValidType = isDate(b2);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a2.getTime() === b2.getTime() : false;
  }
  aValidType = isSymbol(a2);
  bValidType = isSymbol(b2);
  if (aValidType || bValidType) {
    return a2 === b2;
  }
  aValidType = isArray$1(a2);
  bValidType = isArray$1(b2);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a2, b2) : false;
  }
  aValidType = isObject$1(a2);
  bValidType = isObject$1(b2);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a2).length;
    const bKeysCount = Object.keys(b2).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a2) {
      const aHasKey = a2.hasOwnProperty(key);
      const bHasKey = b2.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a2[key], b2[key])) {
        return false;
      }
    }
  }
  return String(a2) === String(b2);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray$1(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i2) => {
          entries[stringifySymbol(key, i2) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v2) => stringifySymbol(v2))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject$1(val) && !isArray$1(val) && !isPlainObject$1(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v2, i2 = "") => {
  var _a2;
  return isSymbol(v2) ? `Symbol(${(_a2 = v2.description) != null ? _a2 : i2})` : v2;
};
/**
* @vue/reactivity v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function warn$3(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$3(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i2, l2;
      for (i2 = 0, l2 = this.effects.length; i2 < l2; i2++) {
        this.effects[i2].stop();
      }
      for (i2 = 0, l2 = this.cleanups.length; i2 < l2; i2++) {
        this.cleanups[i2]();
      }
      if (this.scopes) {
        for (i2 = 0, l2 = this.scopes.length; i2 < l2; i2++) {
          this.scopes[i2].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  } else {
    warn$3(
      `onScopeDispose() is called when there is no active effect scope to be associated with.`
    );
  }
}
let activeEffect;
class ReactiveEffect {
  constructor(fn, trigger2, scheduler, scope) {
    this.fn = fn;
    this.trigger = trigger2;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this._dirtyLevel = 2;
    this._trackId = 0;
    this._runnings = 0;
    this._shouldSchedule = false;
    this._depsLength = 0;
    recordEffectScope(this, scope);
  }
  get dirty() {
    if (this._dirtyLevel === 1) {
      pauseTracking();
      for (let i2 = 0; i2 < this._depsLength; i2++) {
        const dep = this.deps[i2];
        if (dep.computed) {
          triggerComputed(dep.computed);
          if (this._dirtyLevel >= 2) {
            break;
          }
        }
      }
      if (this._dirtyLevel < 2) {
        this._dirtyLevel = 0;
      }
      resetTracking();
    }
    return this._dirtyLevel >= 2;
  }
  set dirty(v2) {
    this._dirtyLevel = v2 ? 2 : 0;
  }
  run() {
    this._dirtyLevel = 0;
    if (!this.active) {
      return this.fn();
    }
    let lastShouldTrack = shouldTrack;
    let lastEffect = activeEffect;
    try {
      shouldTrack = true;
      activeEffect = this;
      this._runnings++;
      preCleanupEffect(this);
      return this.fn();
    } finally {
      postCleanupEffect(this);
      this._runnings--;
      activeEffect = lastEffect;
      shouldTrack = lastShouldTrack;
    }
  }
  stop() {
    var _a2;
    if (this.active) {
      preCleanupEffect(this);
      postCleanupEffect(this);
      (_a2 = this.onStop) == null ? void 0 : _a2.call(this);
      this.active = false;
    }
  }
}
function triggerComputed(computed2) {
  return computed2.value;
}
function preCleanupEffect(effect2) {
  effect2._trackId++;
  effect2._depsLength = 0;
}
function postCleanupEffect(effect2) {
  if (effect2.deps && effect2.deps.length > effect2._depsLength) {
    for (let i2 = effect2._depsLength; i2 < effect2.deps.length; i2++) {
      cleanupDepEffect(effect2.deps[i2], effect2);
    }
    effect2.deps.length = effect2._depsLength;
  }
}
function cleanupDepEffect(dep, effect2) {
  const trackId = dep.get(effect2);
  if (trackId !== void 0 && effect2._trackId !== trackId) {
    dep.delete(effect2);
    if (dep.size === 0) {
      dep.cleanup();
    }
  }
}
let shouldTrack = true;
let pauseScheduleStack = 0;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function pauseScheduling() {
  pauseScheduleStack++;
}
function resetScheduling() {
  pauseScheduleStack--;
  while (!pauseScheduleStack && queueEffectSchedulers.length) {
    queueEffectSchedulers.shift()();
  }
}
function trackEffect(effect2, dep, debuggerEventExtraInfo) {
  var _a2;
  if (dep.get(effect2) !== effect2._trackId) {
    dep.set(effect2, effect2._trackId);
    const oldDep = effect2.deps[effect2._depsLength];
    if (oldDep !== dep) {
      if (oldDep) {
        cleanupDepEffect(oldDep, effect2);
      }
      effect2.deps[effect2._depsLength++] = dep;
    } else {
      effect2._depsLength++;
    }
    {
      (_a2 = effect2.onTrack) == null ? void 0 : _a2.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
    }
  }
}
const queueEffectSchedulers = [];
function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
  var _a2;
  pauseScheduling();
  for (const effect2 of dep.keys()) {
    if (effect2._dirtyLevel < dirtyLevel && dep.get(effect2) === effect2._trackId) {
      const lastDirtyLevel = effect2._dirtyLevel;
      effect2._dirtyLevel = dirtyLevel;
      if (lastDirtyLevel === 0) {
        effect2._shouldSchedule = true;
        {
          (_a2 = effect2.onTrigger) == null ? void 0 : _a2.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
        }
        effect2.trigger();
      }
    }
  }
  scheduleEffects(dep);
  resetScheduling();
}
function scheduleEffects(dep) {
  for (const effect2 of dep.keys()) {
    if (effect2.scheduler && effect2._shouldSchedule && (!effect2._runnings || effect2.allowRecurse) && dep.get(effect2) === effect2._trackId) {
      effect2._shouldSchedule = false;
      queueEffectSchedulers.push(effect2.scheduler);
    }
  }
}
const createDep = (cleanup, computed2) => {
  const dep = /* @__PURE__ */ new Map();
  dep.cleanup = cleanup;
  dep.computed = computed2;
  return dep;
};
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
    }
    trackEffect(
      activeEffect,
      dep,
      {
        target,
        type,
        key
      }
    );
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$1(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  pauseScheduling();
  for (const dep of deps) {
    if (dep) {
      triggerEffects(
        dep,
        2,
        {
          target,
          type,
          key,
          newValue,
          oldValue,
          oldTarget
        }
      );
    }
  }
  resetScheduling();
}
function getDepFromReactive(object, key) {
  var _a2;
  return (_a2 = targetMap.get(object)) == null ? void 0 : _a2.get(key);
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i2 = 0, l2 = this.length; i2 < l2; i2++) {
        track(arr, "get", i2 + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      pauseScheduling();
      const res = toRaw(this)[key].apply(this, args);
      resetScheduling();
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _shallow = false) {
    this._isReadonly = _isReadonly;
    this._shallow = _shallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, shallow = this._shallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(shallow = false) {
    super(false, shallow);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._shallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow$1(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray$1(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(shallow = false) {
    super(true, shallow);
  }
  set(target, key) {
    {
      warn$3(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key) {
    {
      warn$3(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
  true
);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v2) => Reflect.getPrototypeOf(v2);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(
        `${capitalize(type)} operation ${key}failed: target is readonly.`,
        toRaw(this)
      );
    }
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(
      method,
      false,
      false
    );
    readonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      false
    );
    shallowInstrumentations2[method] = createIterableMethod(
      method,
      false,
      true
    );
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(
      `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow$1(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this.effect = new ReactiveEffect(
      () => getter(this._value),
      () => triggerRefValue(this, 1),
      () => this.dep && scheduleEffects(this.dep)
    );
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    if (!self2._cacheable || self2.effect.dirty) {
      if (hasChanged(self2._value, self2._value = self2.effect.run())) {
        triggerRefValue(self2, 2);
      }
    }
    trackRefValue(self2);
    if (self2.effect._dirtyLevel >= 1) {
      triggerRefValue(self2, 1);
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(v2) {
    this.effect.dirty = v2;
  }
  // #endregion
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    trackEffect(
      activeEffect,
      ref2.dep || (ref2.dep = createDep(
        () => ref2.dep = void 0,
        ref2 instanceof ComputedRefImpl ? ref2 : void 0
      )),
      {
        target: ref2,
        type: "get",
        key: "value"
      }
    );
  }
}
function triggerRefValue(ref2, dirtyLevel = 2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    triggerEffects(
      dep,
      dirtyLevel,
      {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      }
    );
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow$1(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, 2, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class CustomRefImpl {
  constructor(factory) {
    this.dep = void 0;
    this.__v_isRef = true;
    const { get: get2, set: set2 } = factory(
      () => trackRefValue(this),
      () => triggerRefValue(this)
    );
    this._get = get2;
    this._set = set2;
  }
  get value() {
    return this._get();
  }
  set value(newVal) {
    this._set(newVal);
  }
}
function customRef(factory) {
  return new CustomRefImpl(factory);
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
  get dep() {
    return getDepFromReactive(toRaw(this._object), this._key);
  }
}
class GetterRefImpl {
  constructor(_getter) {
    this._getter = _getter;
    this.__v_isRef = true;
    this.__v_isReadonly = true;
  }
  get value() {
    return this._getter();
  }
}
function toRef$1(source, key, defaultValue) {
  if (isRef(source)) {
    return source;
  } else if (isFunction(source)) {
    return new GetterRefImpl(source);
  } else if (isObject$1(source) && arguments.length > 1) {
    return propertyToRef(source, key, defaultValue);
  } else {
    return ref(source);
  }
}
function propertyToRef(source, key, defaultValue) {
  const val = source[key];
  return isRef(val) ? val : new ObjectRefImpl(source, key, defaultValue);
}
/**
* @vue/runtime-core v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        msg + args.join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i2) => {
    logs.push(...i2 === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function assertNumber(val, type) {
  if (val === void 0) {
    return;
  } else if (typeof val !== "number") {
    warn$1(`${type} is not a valid number - got ${JSON.stringify(val)}.`);
  } else if (isNaN(val)) {
    warn$1(`${type} is NaN - the duration expression might be incorrect.`);
  }
}
const ErrorTypeStrings$1 = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err2) {
    handleError(err2, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err2) => {
        handleError(err2, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i2 = 0; i2 < fn.length; i2++) {
    values.push(callWithAsyncErrorHandling(fn[i2], instance, type, args));
  }
  return values;
}
function handleError(err2, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings$1[type];
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
          if (errorCapturedHooks[i2](err2, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err2, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err2, type, contextVNode, throwInDev);
}
function logError(err2, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings$1[type];
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      throw err2;
    } else {
      console.error(err2);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue$1 = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue$1.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue$1[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue$1.length || !queue$1.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue$1.push(job);
    } else {
      queue$1.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i2 = queue$1.indexOf(job);
  if (i2 > flushIndex) {
    queue$1.splice(i2, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$1(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen2, i2 = isFlushing ? flushIndex + 1 : 0) {
  {
    seen2 = seen2 || /* @__PURE__ */ new Map();
  }
  for (; i2 < queue$1.length; i2++) {
    const cb = queue$1[i2];
    if (cb && cb.pre) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      if (checkRecursiveUpdates(seen2, cb)) {
        continue;
      }
      queue$1.splice(i2, 1);
      i2--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen2) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a2, b2) => getId(a2) - getId(b2)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen2 = seen2 || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen2, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a2, b2) => {
  const diff = getId(a2) - getId(b2);
  if (diff === 0) {
    if (a2.pre && !b2.pre)
      return -1;
    if (b2.pre && !a2.pre)
      return 1;
  }
  return diff;
};
function flushJobs(seen2) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen2 = seen2 || /* @__PURE__ */ new Map();
  }
  queue$1.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen2, job);
  try {
    for (flushIndex = 0; flushIndex < queue$1.length; flushIndex++) {
      const job = queue$1[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue$1.length = 0;
    flushPostFlushCbs(seen2);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue$1.length || pendingPostFlushCbs.length) {
      flushJobs(seen2);
    }
  }
}
function checkRecursiveUpdates(seen2, fn) {
  if (!seen2.has(fn)) {
    seen2.set(fn, 1);
  } else {
    const count = seen2.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      handleError(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      );
      return true;
    } else {
      seen2.set(fn, count + 1);
    }
  }
}
let isHmrUpdating = false;
const hmrDirtyComponents = /* @__PURE__ */ new Set();
{
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
const map = /* @__PURE__ */ new Map();
function registerHMR(instance) {
  const id = instance.type.__hmrId;
  let record = map.get(id);
  if (!record) {
    createRecord(id, instance.type);
    record = map.get(id);
  }
  record.instances.add(instance);
}
function unregisterHMR(instance) {
  map.get(instance.type.__hmrId).instances.delete(instance);
}
function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
  const record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    isHmrUpdating = true;
    instance.effect.dirty = true;
    instance.update();
    isHmrUpdating = false;
  });
}
function reload(id, newComp) {
  const record = map.get(id);
  if (!record)
    return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (const instance of instances) {
    const oldComp = normalizeClassComponent(instance.type);
    if (!hmrDirtyComponents.has(oldComp)) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.add(oldComp);
    }
    instance.appContext.propsCache.delete(instance.type);
    instance.appContext.emitsCache.delete(instance.type);
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      hmrDirtyComponents.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance.parent) {
      instance.parent.effect.dirty = true;
      queueJob(instance.parent.update);
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn(
        "[HMR] Root or manually mounted instance modified. Full reload required."
      );
    }
  }
  queuePostFlushCb(() => {
    for (const instance of instances) {
      hmrDirtyComponents.delete(
        normalizeClassComponent(instance.type)
      );
    }
  });
}
function updateComponentDef(oldComp, newComp) {
  extend(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e2) {
      console.error(e2);
      console.warn(
        `[HMR] Something went wrong during Vue component hot-reload. Full reload required.`
      );
    }
  };
}
let devtools$1;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools$1) {
    devtools$1.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook$1(hook, target) {
  var _a2, _b2;
  devtools$1 = hook;
  if (devtools$1) {
    devtools$1.enabled = true;
    buffer.forEach(({ event, args }) => devtools$1.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    !((_b2 = (_a2 = window.navigator) == null ? void 0 : _a2.userAgent) == null ? void 0 : _b2.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook$1(newHook, target);
    });
    setTimeout(() => {
      if (!devtools$1) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
function devtoolsUnmountApp(app) {
  emit$1("app:unmount", app);
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools$1 && typeof devtools$1.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools$1.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      component.parent ? component.parent.uid : void 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1(
    "component:emit",
    component.appContext.app,
    component,
    event,
    params
  );
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(
            `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`
          );
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(
              `Invalid event arguments: event validation failed for event "${event}".`
            );
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a2) => isString(a2) ? a2.trim() : a2);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1(
        `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
          instance,
          instance.type
        )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(
          event
        )}" instead of "${event}".`
      );
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function pushScopeId(id) {
  currentScopeId = id;
}
function popScopeId() {
  currentScopeId = null;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    {
      devtoolsComponentUpdated(ctx);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
let accessedAttrs = false;
function markAttrsAccessed() {
  accessedAttrs = true;
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  {
    accessedAttrs = false;
  }
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = setupState.__isScriptSetup ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn$1(
            `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          );
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode(
        render.call(
          thisProxy,
          proxyToUse,
          renderCache,
          props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (attrs === props) {
        markAttrsAccessed();
      }
      result = normalizeVNode(
        render2.length > 1 ? render2(
          props,
          true ? {
            get attrs() {
              markAttrsAccessed();
              return attrs;
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render2(
          props,
          null
          /* we know it doesn't need it */
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err2) {
    blockStack.length = 0;
    handleError(err2, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  let setRoot = void 0;
  if (result.patchFlag > 0 && result.patchFlag & 2048) {
    [root, setRoot] = getChildRoot(result);
  }
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs);
      } else if (!accessedAttrs && root.type !== Comment) {
        const allAttrs = Object.keys(attrs);
        const eventAttrs = [];
        const extraAttrs = [];
        for (let i2 = 0, l2 = allAttrs.length; i2 < l2; i2++) {
          const key = allAttrs[i2];
          if (isOn(key)) {
            if (!isModelListener(key)) {
              eventAttrs.push(key[2].toLowerCase() + key.slice(3));
            }
          } else {
            extraAttrs.push(key);
          }
        }
        if (extraAttrs.length) {
          warn$1(
            `Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`
          );
        }
        if (eventAttrs.length) {
          warn$1(
            `Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
          );
        }
      }
    }
  }
  if (vnode.dirs) {
    if (!isElementRoot(root)) {
      warn$1(
        `Runtime directive used on component with non-element root node. The directives will not function as intended.`
      );
    }
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if (!isElementRoot(root)) {
      warn$1(
        `Component inside <Transition> renders non-element root node that cannot be animated.`
      );
    }
    root.transition = vnode.transition;
  }
  if (setRoot) {
    setRoot(root);
  } else {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getChildRoot = (vnode) => {
  const rawChildren = vnode.children;
  const dynamicChildren = vnode.dynamicChildren;
  const childRoot = filterSingleRoot(rawChildren, false);
  if (!childRoot) {
    return [vnode, void 0];
  } else if (childRoot.patchFlag > 0 && childRoot.patchFlag & 2048) {
    return getChildRoot(childRoot);
  }
  const index2 = rawChildren.indexOf(childRoot);
  const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
  const setRoot = (updatedRoot) => {
    rawChildren[index2] = updatedRoot;
    if (dynamicChildren) {
      if (dynamicIndex > -1) {
        dynamicChildren[dynamicIndex] = updatedRoot;
      } else if (updatedRoot.patchFlag > 0) {
        vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
      }
    }
  };
  return [normalizeVNode(childRoot), setRoot];
};
function filterSingleRoot(children, recurse = true) {
  let singleRoot;
  for (let i2 = 0; i2 < children.length; i2++) {
    const child = children[i2];
    if (isVNode(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
          if (recurse && singleRoot.patchFlag > 0 && singleRoot.patchFlag & 2048) {
            return filterSingleRoot(singleRoot.children);
          }
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
const isElementRoot = (vnode) => {
  return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if ((prevChildren || nextChildren) && isHmrUpdating) {
    return true;
  }
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i2 = 0; i2 < dynamicProps.length; i2++) {
        const key = dynamicProps[i2];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i2 = 0; i2 < nextKeys.length; i2++) {
    const key = nextKeys[i2];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.el = vnode.el;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component,
        false
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn$1(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn$1(
      `resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`
    );
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    if (!ctx) {
      warn$1(
        `Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`
      );
    }
    return ctx;
  }
};
function watchEffect(effect, options) {
  return doWatch(effect, null, options);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn$1(
      `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
    );
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, {
  immediate,
  deep,
  flush,
  once,
  onTrack,
  onTrigger
} = EMPTY_OBJ) {
  if (cb && once) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      unwatch();
    };
  }
  if (deep !== void 0 && typeof deep === "number") {
    warn$1(
      `watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.`
    );
  }
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(
        `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (deep !== void 0) {
      warn$1(
        `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (once !== void 0) {
      warn$1(
        `watch() "once" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
  }
  const warnInvalidSource = (s2) => {
    warn$1(
      `Invalid watch source: `,
      s2,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const instance = currentInstance;
  const reactiveGetter = (source2) => deep === true ? source2 : (
    // for deep: false, only traverse root-level properties
    traverse(source2, deep === false ? 1 : void 0)
  );
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow$1(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow$1(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return reactiveGetter(s2);
      } else if (isFunction(s2)) {
        return callWithErrorHandling(s2, instance, 2);
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
      cleanup = effect.onStop = void 0;
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active || !effect.dirty) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i2) => hasChanged(v2, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, NOOP, scheduler);
  const scope = getCurrentScope();
  const unwatch = () => {
    effect.stop();
    if (scope) {
      remove(scope.effects, effect);
    }
  };
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(
      effect.run.bind(effect),
      instance && instance.suspense
    );
  } else {
    effect.run();
  }
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i2 = 0; i2 < segments.length && cur; i2++) {
      cur = cur[segments[i2]];
    }
    return cur;
  };
}
function traverse(value, depth, currentDepth = 0, seen2) {
  if (!isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  if (depth && depth > 0) {
    if (currentDepth >= depth) {
      return value;
    }
    currentDepth++;
  }
  seen2 = seen2 || /* @__PURE__ */ new Set();
  if (seen2.has(value)) {
    return value;
  }
  seen2.add(value);
  if (isRef(value)) {
    traverse(value.value, depth, currentDepth, seen2);
  } else if (isArray$1(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      traverse(value[i2], depth, currentDepth, seen2);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v2) => {
      traverse(v2, depth, currentDepth, seen2);
    });
  } else if (isPlainObject$1(value)) {
    for (const key in value) {
      traverse(value[key], depth, currentDepth, seen2);
    }
  }
  return value;
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function withDirectives(vnode, directives) {
  if (currentRenderingInstance === null) {
    warn$1(`withDirectives can only be used inside render functions.`);
    return vnode;
  }
  const instance = getExposeProxy(currentRenderingInstance) || currentRenderingInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i2 = 0; i2 < directives.length; i2++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i2];
    if (dir) {
      if (isFunction(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i2 = 0; i2 < bindings.length; i2++) {
    const binding = bindings[i2];
    if (oldBindings) {
      binding.oldValue = oldBindings[i2].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
const leaveCbKey = Symbol("_leaveCb");
const enterCbKey$1 = Symbol("_enterCb");
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionPropsValidators = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  // leave
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  // appear
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator
};
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: BaseTransitionPropsValidators,
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        let hasFound = false;
        for (const c2 of children) {
          if (c2.type !== Comment) {
            if (hasFound) {
              warn$1(
                "<transition> can only be used on a single element or component. Use <transition-group> for lists."
              );
              break;
            }
            child = c2;
            hasFound = true;
          }
        }
      }
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      if (mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") {
        warn$1(`invalid <transition> mode: ${mode}`);
      }
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(
        innerChild,
        rawProps,
        state,
        instance
      );
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(
          oldInnerChild,
          rawProps,
          state,
          instance
        );
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (instance.update.active !== false) {
              instance.effect.dirty = true;
              instance.update();
            }
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(
              state,
              oldInnerChild
            );
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el[leaveCbKey] = () => {
              earlyRemove();
              el[leaveCbKey] = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(
      hook,
      instance,
      9,
      args
    );
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook2(hook, args);
    if (isArray$1(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el[leaveCbKey]) {
        el[leaveCbKey](
          true
          /* cancelled */
        );
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
        leavingVNode.el[leaveCbKey]();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el[enterCbKey$1] = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el[enterCbKey$1] = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el[enterCbKey$1]) {
        el[enterCbKey$1](
          true
          /* cancelled */
        );
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el[leaveCbKey] = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el[leaveCbKey] = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? (
    // #7121 ensure get the child component subtree in case
    // it's been replaced during HMR
    vnode.component ? vnode.component.subTree : vnode.children ? vnode.children[0] : void 0
  ) : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i2 = 0; i2 < children.length; i2++) {
    let child = children[i2];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i2);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(
        getTransitionRawChildren(child.children, keepComment, key)
      );
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i2 = 0; i2 < ret.length; i2++) {
      ret[i2].patchFlag = -2;
    }
  }
  return ret;
}
/*! #__NO_SIDE_EFFECTS__ */
function defineComponent(options, extraOptions) {
  return isFunction(options) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
const isAsyncWrapper = (i2) => !!i2.type.__asyncLoader;
/*! #__NO_SIDE_EFFECTS__ */
function defineAsyncComponent(source) {
  if (isFunction(source)) {
    source = { loader: source };
  }
  const {
    loader,
    loadingComponent,
    errorComponent,
    delay: delay2 = 200,
    timeout,
    // undefined = never times out
    suspensible = true,
    onError: userOnError
  } = source;
  let pendingRequest = null;
  let resolvedComp;
  let retries = 0;
  const retry = () => {
    retries++;
    pendingRequest = null;
    return load();
  };
  const load = () => {
    let thisRequest;
    return pendingRequest || (thisRequest = pendingRequest = loader().catch((err2) => {
      err2 = err2 instanceof Error ? err2 : new Error(String(err2));
      if (userOnError) {
        return new Promise((resolve2, reject) => {
          const userRetry = () => resolve2(retry());
          const userFail = () => reject(err2);
          userOnError(err2, userRetry, userFail, retries + 1);
        });
      } else {
        throw err2;
      }
    }).then((comp) => {
      if (thisRequest !== pendingRequest && pendingRequest) {
        return pendingRequest;
      }
      if (!comp) {
        warn$1(
          `Async component loader resolved to undefined. If you are using retry(), make sure to return its return value.`
        );
      }
      if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
        comp = comp.default;
      }
      if (comp && !isObject$1(comp) && !isFunction(comp)) {
        throw new Error(`Invalid async component load result: ${comp}`);
      }
      resolvedComp = comp;
      return comp;
    }));
  };
  return defineComponent({
    name: "AsyncComponentWrapper",
    __asyncLoader: load,
    get __asyncResolved() {
      return resolvedComp;
    },
    setup() {
      const instance = currentInstance;
      if (resolvedComp) {
        return () => createInnerComp(resolvedComp, instance);
      }
      const onError = (err2) => {
        pendingRequest = null;
        handleError(
          err2,
          instance,
          13,
          !errorComponent
        );
      };
      if (suspensible && instance.suspense || isInSSRComponentSetup) {
        return load().then((comp) => {
          return () => createInnerComp(comp, instance);
        }).catch((err2) => {
          onError(err2);
          return () => errorComponent ? createVNode(errorComponent, {
            error: err2
          }) : null;
        });
      }
      const loaded = ref(false);
      const error = ref();
      const delayed = ref(!!delay2);
      if (delay2) {
        setTimeout(() => {
          delayed.value = false;
        }, delay2);
      }
      if (timeout != null) {
        setTimeout(() => {
          if (!loaded.value && !error.value) {
            const err2 = new Error(
              `Async component timed out after ${timeout}ms.`
            );
            onError(err2);
            error.value = err2;
          }
        }, timeout);
      }
      load().then(() => {
        loaded.value = true;
        if (instance.parent && isKeepAlive(instance.parent.vnode)) {
          instance.parent.effect.dirty = true;
          queueJob(instance.parent.update);
        }
      }).catch((err2) => {
        onError(err2);
        error.value = err2;
      });
      return () => {
        if (loaded.value && resolvedComp) {
          return createInnerComp(resolvedComp, instance);
        } else if (error.value && errorComponent) {
          return createVNode(errorComponent, {
            error: error.value
          });
        } else if (loadingComponent && !delayed.value) {
          return createVNode(loadingComponent);
        }
      };
    }
  });
}
function createInnerComp(comp, parent) {
  const { ref: ref2, props, children, ce } = parent.vnode;
  const vnode = createVNode(comp, props, children);
  vnode.ref = ref2;
  vnode.ce = ce;
  delete parent.vnode.ce;
  return vnode;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey(ErrorTypeStrings$1[type].replace(/ hook$/, ""));
    warn$1(
      `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook(
  "rtg"
);
const onRenderTracked = createHook(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function renderList(source, renderItem2, cache, index2) {
  let ret;
  const cached = cache && cache[index2];
  if (isArray$1(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i2 = 0, l2 = source.length; i2 < l2; i2++) {
      ret[i2] = renderItem2(source[i2], i2, void 0, cached && cached[i2]);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn$1(`The v-for range expect an integer value but got ${source}.`);
    }
    ret = new Array(source);
    for (let i2 = 0; i2 < source; i2++) {
      ret[i2] = renderItem2(i2 + 1, i2, void 0, cached && cached[i2]);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i2) => renderItem2(item, i2, void 0, cached && cached[i2])
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i2 = 0, l2 = keys.length; i2 < l2; i2++) {
        const key = keys[i2];
        ret[i2] = renderItem2(source[key], key, i2, cached && cached[i2]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index2] = ret;
  }
  return ret;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
    if (name !== "default")
      props.name = name;
    return createVNode("slot", props, fallback && fallback());
  }
  let slot = slots[name];
  if (slot && slot.length > 1) {
    warn$1(
      `SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template.`
    );
    slot = () => [];
  }
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(
    Fragment,
    {
      key: props.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      validSlotContent && validSlotContent.key || `_${name}`
    },
    validSlotContent || (fallback ? fallback() : []),
    validSlotContent && slots._ === 1 ? 64 : -2
  );
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
const getPublicInstance = (i2) => {
  if (!i2)
    return null;
  if (isStatefulComponent(i2))
    return getExposeProxy(i2) || i2.proxy;
  return getPublicInstance(i2.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i2) => i2,
    $el: (i2) => i2.vnode.el,
    $data: (i2) => i2.data,
    $props: (i2) => shallowReadonly(i2.props),
    $attrs: (i2) => shallowReadonly(i2.attrs),
    $slots: (i2) => shallowReadonly(i2.slots),
    $refs: (i2) => shallowReadonly(i2.refs),
    $parent: (i2) => getPublicInstance(i2.parent),
    $root: (i2) => getPublicInstance(i2.root),
    $emit: (i2) => i2.emit,
    $options: (i2) => resolveMergedOptions(i2),
    $forceUpdate: (i2) => i2.f || (i2.f = () => {
      i2.effect.dirty = true;
      queueJob(i2.update);
    }),
    $nextTick: (i2) => i2.n || (i2.n = nextTick.bind(i2.proxy)),
    $watch: (i2) => instanceWatch.bind(i2)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
        markAttrsAccessed();
      } else if (key === "$slots") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn$1(
          `Property ${JSON.stringify(
            key
          )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
        );
      } else if (instance === currentRenderingInstance) {
        warn$1(
          `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1(
        `Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`
      );
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(
      `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
    );
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const {
    ctx,
    propsOptions: [propsOptions]
  } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1(
          `setup() return property ${JSON.stringify(
            key
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function normalizePropsOrEmits(props) {
  return isArray$1(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$1(
          `Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
        );
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn$1(
        `The data option must be a function. Plain object usage is no longer supported.`
      );
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$1(
        `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
      );
    }
    if (!isObject$1(data)) {
      warn$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(
          `Write operation failed: computed property "${key}" is readonly.`
        );
      };
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v2) => c2.value = v2
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v2) => injected.value = v2
      });
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m2) => mergeOptions$1(resolved, m2, optionMergeStrategies, true)
      );
    }
    mergeOptions$1(resolved, base, optionMergeStrategies);
  }
  if (isObject$1(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$1(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m2) => mergeOptions$1(to, m2, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(
        `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
      );
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i2 = 0; i2 < raw.length; i2++) {
      res[raw[i2]] = raw[i2];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray$1(to) && isArray$1(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v2) {
        {
          warn$1(
            `app.config cannot be replaced. Modify individual options instead.`
          );
        }
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else {
          warn$1(
            `A plugin must either be a function or an object with an "install" function.`
          );
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$1(
              "Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : "")
            );
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          if (rootContainer.__vue_app__) {
            warn$1(
              `There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`
            );
          }
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = void 0;
          }
          {
            context.reload = () => {
              render(
                cloneVNode(vnode),
                rootContainer,
                namespace
              );
            };
          }
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          {
            app._instance = vnode.component;
            devtoolsInitApp(app, version);
          }
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        } else {
          warn$1(
            `App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``
          );
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app._container);
          {
            app._instance = null;
            devtoolsUnmountApp(app);
          }
          delete app._container.__vue_app__;
        } else {
          warn$1(`Cannot unmount an app that is not mounted.`);
        }
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$1(
            `App already provides property with key "${String(key)}". It will be overwritten with the new value.`
          );
        }
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = null;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
        let key = propsToUpdate[i2];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i2 = 0; i2 < needCastKeys.length; i2++) {
      const key = needCastKeys[i2];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i2 = 0; i2 < raw.length; i2++) {
      if (!isString(raw[i2])) {
        warn$1(`props must be strings when using array syntax.`, raw[i2]);
      }
      const normalizedKey = camelize(raw[i2]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$1(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
}
function isSameType(a2, b2) {
  return getType(a2) === getType(b2);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$1(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(
      key,
      resolvedValues[key],
      opt,
      shallowReadonly(resolvedValues),
      !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key))
    );
  }
}
function validateProp(name, value, prop, props, isAbsent) {
  const { type, required, validator, skipCheck } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    let isValid = false;
    const types = isArray$1(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid; i2++) {
      const { valid, expectedType } = assertType(value, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value, props)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray$1(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  if (expectedTypes.length === 0) {
    return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
  }
  let message2 = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message2 += ` with value ${expectedValue}`;
  }
  message2 += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message2 += `with value ${receivedValue}.`;
  }
  return message2;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot$1 = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (currentInstance && (!ctx || ctx.root === currentInstance.root)) {
      warn$1(
        `Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
      );
    }
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot$1(key, value, ctx);
    } else if (value != null) {
      {
        warn$1(
          `Non-function value encountered for slot "${key}". Prefer function slots for better performance.`
        );
      }
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  if (!isKeepAlive(instance.vnode) && true) {
    warn$1(
      `Non-function value encountered for default slot. Prefer function slots for better performance.`
    );
  }
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(
        children,
        instance.slots = {}
      );
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (isHmrUpdating) {
        extend(slots, children);
        trigger(instance, "set", "$slots");
      } else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach(
      (r2, i2) => setRef(
        r2,
        oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i2] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  if (!owner) {
    warn$1(
      `Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`
    );
    return;
  }
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref2);
    const _isRef = isRef(ref2);
    const isVFor = rawRef.f;
    if (_isString || _isRef) {
      const doSet = () => {
        if (isVFor) {
          const existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray$1(existing) && remove(existing, refValue);
          } else {
            if (!isArray$1(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else {
          warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
        }
      };
      if (isUnmount || isVFor) {
        doSet();
      } else {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      }
    } else {
      warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
    }
  }
}
let hasMismatch = false;
const isSVGContainer = (container) => container.namespaceURI.includes("svg") && container.tagName !== "foreignObject";
const isMathMLContainer = (container) => container.namespaceURI.includes("MathML");
const getContainerType = (container) => {
  if (isSVGContainer(container))
    return "svg";
  if (isMathMLContainer(container))
    return "mathml";
  return void 0;
};
const isComment = (node) => node.nodeType === 8;
function createHydrationFunctions(rendererInternals) {
  const {
    mt: mountComponent,
    p: patch,
    o: {
      patchProp: patchProp2,
      createText,
      nextSibling,
      parentNode,
      remove: remove2,
      insert,
      createComment
    }
  } = rendererInternals;
  const hydrate = (vnode, container) => {
    if (!container.hasChildNodes()) {
      warn$1(
        `Attempting to hydrate existing markup but container is empty. Performing full mount instead.`
      );
      patch(null, vnode, container);
      flushPostFlushCbs();
      container._vnode = vnode;
      return;
    }
    hasMismatch = false;
    hydrateNode(container.firstChild, vnode, null, null, null);
    flushPostFlushCbs();
    container._vnode = vnode;
    if (hasMismatch && true) {
      console.error(`Hydration completed but contains mismatches.`);
    }
  };
  const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
    const isFragmentStart = isComment(node) && node.data === "[";
    const onMismatch = () => handleMismatch(
      node,
      vnode,
      parentComponent,
      parentSuspense,
      slotScopeIds,
      isFragmentStart
    );
    const { type, ref: ref2, shapeFlag, patchFlag } = vnode;
    let domType = node.nodeType;
    vnode.el = node;
    {
      if (!("__vnode" in node)) {
        Object.defineProperty(node, "__vnode", {
          value: vnode,
          enumerable: false
        });
      }
      if (!("__vueParentComponent" in node)) {
        Object.defineProperty(node, "__vueParentComponent", {
          value: parentComponent,
          enumerable: false
        });
      }
    }
    if (patchFlag === -2) {
      optimized = false;
      vnode.dynamicChildren = null;
    }
    let nextNode = null;
    switch (type) {
      case Text:
        if (domType !== 3) {
          if (vnode.children === "") {
            insert(vnode.el = createText(""), parentNode(node), node);
            nextNode = node;
          } else {
            nextNode = onMismatch();
          }
        } else {
          if (node.data !== vnode.children) {
            hasMismatch = true;
            warn$1(
              `Hydration text mismatch in`,
              node.parentNode,
              `
  - rendered on server: ${JSON.stringify(
                node.data
              )}
  - expected on client: ${JSON.stringify(vnode.children)}`
            );
            node.data = vnode.children;
          }
          nextNode = nextSibling(node);
        }
        break;
      case Comment:
        if (isTemplateNode(node)) {
          nextNode = nextSibling(node);
          replaceNode(
            vnode.el = node.content.firstChild,
            node,
            parentComponent
          );
        } else if (domType !== 8 || isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = nextSibling(node);
        }
        break;
      case Static:
        if (isFragmentStart) {
          node = nextSibling(node);
          domType = node.nodeType;
        }
        if (domType === 1 || domType === 3) {
          nextNode = node;
          const needToAdoptContent = !vnode.children.length;
          for (let i2 = 0; i2 < vnode.staticCount; i2++) {
            if (needToAdoptContent)
              vnode.children += nextNode.nodeType === 1 ? nextNode.outerHTML : nextNode.data;
            if (i2 === vnode.staticCount - 1) {
              vnode.anchor = nextNode;
            }
            nextNode = nextSibling(nextNode);
          }
          return isFragmentStart ? nextSibling(nextNode) : nextNode;
        } else {
          onMismatch();
        }
        break;
      case Fragment:
        if (!isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = hydrateFragment(
            node,
            vnode,
            parentComponent,
            parentSuspense,
            slotScopeIds,
            optimized
          );
        }
        break;
      default:
        if (shapeFlag & 1) {
          if ((domType !== 1 || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) && !isTemplateNode(node)) {
            nextNode = onMismatch();
          } else {
            nextNode = hydrateElement(
              node,
              vnode,
              parentComponent,
              parentSuspense,
              slotScopeIds,
              optimized
            );
          }
        } else if (shapeFlag & 6) {
          vnode.slotScopeIds = slotScopeIds;
          const container = parentNode(node);
          if (isFragmentStart) {
            nextNode = locateClosingAnchor(node);
          } else if (isComment(node) && node.data === "teleport start") {
            nextNode = locateClosingAnchor(node, node.data, "teleport end");
          } else {
            nextNode = nextSibling(node);
          }
          mountComponent(
            vnode,
            container,
            null,
            parentComponent,
            parentSuspense,
            getContainerType(container),
            optimized
          );
          if (isAsyncWrapper(vnode)) {
            let subTree;
            if (isFragmentStart) {
              subTree = createVNode(Fragment);
              subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
            } else {
              subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
            }
            subTree.el = node;
            vnode.component.subTree = subTree;
          }
        } else if (shapeFlag & 64) {
          if (domType !== 8) {
            nextNode = onMismatch();
          } else {
            nextNode = vnode.type.hydrate(
              node,
              vnode,
              parentComponent,
              parentSuspense,
              slotScopeIds,
              optimized,
              rendererInternals,
              hydrateChildren
            );
          }
        } else if (shapeFlag & 128) {
          nextNode = vnode.type.hydrate(
            node,
            vnode,
            parentComponent,
            parentSuspense,
            getContainerType(parentNode(node)),
            slotScopeIds,
            optimized,
            rendererInternals,
            hydrateNode
          );
        } else {
          warn$1("Invalid HostVNode type:", type, `(${typeof type})`);
        }
    }
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode);
    }
    return nextNode;
  };
  const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const { type, props, patchFlag, shapeFlag, dirs, transition } = vnode;
    const forcePatch = type === "input" || type === "option";
    {
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      let needCallTransitionHooks = false;
      if (isTemplateNode(el)) {
        needCallTransitionHooks = needTransition(parentSuspense, transition) && parentComponent && parentComponent.vnode.props && parentComponent.vnode.props.appear;
        const content = el.content.firstChild;
        if (needCallTransitionHooks) {
          transition.beforeEnter(content);
        }
        replaceNode(content, el, parentComponent);
        vnode.el = el = content;
      }
      if (shapeFlag & 16 && // skip if element has innerHTML / textContent
      !(props && (props.innerHTML || props.textContent))) {
        let next = hydrateChildren(
          el.firstChild,
          vnode,
          el,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
        let hasWarned = false;
        while (next) {
          hasMismatch = true;
          if (!hasWarned) {
            warn$1(
              `Hydration children mismatch on`,
              el,
              `
Server rendered element contains more child nodes than client vdom.`
            );
            hasWarned = true;
          }
          const cur = next;
          next = next.nextSibling;
          remove2(cur);
        }
      } else if (shapeFlag & 8) {
        if (el.textContent !== vnode.children) {
          hasMismatch = true;
          warn$1(
            `Hydration text content mismatch on`,
            el,
            `
  - rendered on server: ${el.textContent}
  - expected on client: ${vnode.children}`
          );
          el.textContent = vnode.children;
        }
      }
      if (props) {
        {
          for (const key in props) {
            if (propHasMismatch(el, key, props[key], vnode)) {
              hasMismatch = true;
            }
            if (forcePatch && (key.endsWith("value") || key === "indeterminate") || isOn(key) && !isReservedProp(key) || // force hydrate v-bind with .prop modifiers
            key[0] === ".") {
              patchProp2(
                el,
                key,
                null,
                props[key],
                void 0,
                void 0,
                parentComponent
              );
            }
          }
        }
      }
      let vnodeHooks;
      if (vnodeHooks = props && props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHooks, parentComponent, vnode);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      if ((vnodeHooks = props && props.onVnodeMounted) || dirs || needCallTransitionHooks) {
        queueEffectWithSuspense(() => {
          vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
    }
    return el.nextSibling;
  };
  const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!parentVNode.dynamicChildren;
    const children = parentVNode.children;
    const l2 = children.length;
    let hasWarned = false;
    for (let i2 = 0; i2 < l2; i2++) {
      const vnode = optimized ? children[i2] : children[i2] = normalizeVNode(children[i2]);
      if (node) {
        node = hydrateNode(
          node,
          vnode,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      } else if (vnode.type === Text && !vnode.children) {
        continue;
      } else {
        hasMismatch = true;
        if (!hasWarned) {
          warn$1(
            `Hydration children mismatch on`,
            container,
            `
Server rendered element contains fewer child nodes than client vdom.`
          );
          hasWarned = true;
        }
        patch(
          null,
          vnode,
          container,
          null,
          parentComponent,
          parentSuspense,
          getContainerType(container),
          slotScopeIds
        );
      }
    }
    return node;
  };
  const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    const { slotScopeIds: fragmentSlotScopeIds } = vnode;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    const container = parentNode(node);
    const next = hydrateChildren(
      nextSibling(node),
      vnode,
      container,
      parentComponent,
      parentSuspense,
      slotScopeIds,
      optimized
    );
    if (next && isComment(next) && next.data === "]") {
      return nextSibling(vnode.anchor = next);
    } else {
      hasMismatch = true;
      insert(vnode.anchor = createComment(`]`), container, next);
      return next;
    }
  };
  const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
    hasMismatch = true;
    warn$1(
      `Hydration node mismatch:
- rendered on server:`,
      node,
      node.nodeType === 3 ? `(text)` : isComment(node) && node.data === "[" ? `(start of fragment)` : ``,
      `
- expected on client:`,
      vnode.type
    );
    vnode.el = null;
    if (isFragment) {
      const end = locateClosingAnchor(node);
      while (true) {
        const next2 = nextSibling(node);
        if (next2 && next2 !== end) {
          remove2(next2);
        } else {
          break;
        }
      }
    }
    const next = nextSibling(node);
    const container = parentNode(node);
    remove2(node);
    patch(
      null,
      vnode,
      container,
      next,
      parentComponent,
      parentSuspense,
      getContainerType(container),
      slotScopeIds
    );
    return next;
  };
  const locateClosingAnchor = (node, open = "[", close = "]") => {
    let match = 0;
    while (node) {
      node = nextSibling(node);
      if (node && isComment(node)) {
        if (node.data === open)
          match++;
        if (node.data === close) {
          if (match === 0) {
            return nextSibling(node);
          } else {
            match--;
          }
        }
      }
    }
    return node;
  };
  const replaceNode = (newNode, oldNode, parentComponent) => {
    const parentNode2 = oldNode.parentNode;
    if (parentNode2) {
      parentNode2.replaceChild(newNode, oldNode);
    }
    let parent = parentComponent;
    while (parent) {
      if (parent.vnode.el === oldNode) {
        parent.vnode.el = parent.subTree.el = newNode;
      }
      parent = parent.parent;
    }
  };
  const isTemplateNode = (node) => {
    return node.nodeType === 1 && node.tagName.toLowerCase() === "template";
  };
  return [hydrate, hydrateNode];
}
function propHasMismatch(el, key, clientValue, vnode) {
  let mismatchType;
  let mismatchKey;
  let actual;
  let expected;
  if (key === "class") {
    actual = el.getAttribute("class");
    expected = normalizeClass(clientValue);
    if (!isSetEqual(toClassSet(actual || ""), toClassSet(expected))) {
      mismatchType = mismatchKey = `class`;
    }
  } else if (key === "style") {
    actual = el.getAttribute("style");
    expected = isString(clientValue) ? clientValue : stringifyStyle(normalizeStyle(clientValue));
    const actualMap = toStyleMap(actual);
    const expectedMap = toStyleMap(expected);
    if (vnode.dirs) {
      for (const { dir, value } of vnode.dirs) {
        if (dir.name === "show" && !value) {
          expectedMap.set("display", "none");
        }
      }
    }
    if (!isMapEqual(actualMap, expectedMap)) {
      mismatchType = mismatchKey = "style";
    }
  } else if (el instanceof SVGElement && isKnownSvgAttr(key) || el instanceof HTMLElement && (isBooleanAttr(key) || isKnownHtmlAttr(key))) {
    if (isBooleanAttr(key)) {
      actual = el.hasAttribute(key);
      expected = includeBooleanAttr(clientValue);
    } else if (clientValue == null) {
      actual = el.hasAttribute(key);
      expected = false;
    } else {
      if (el.hasAttribute(key)) {
        actual = el.getAttribute(key);
      } else if (key === "value" && el.tagName === "TEXTAREA") {
        actual = el.value;
      } else {
        actual = false;
      }
      expected = isRenderableAttrValue(clientValue) ? String(clientValue) : false;
    }
    if (actual !== expected) {
      mismatchType = `attribute`;
      mismatchKey = key;
    }
  }
  if (mismatchType) {
    const format = (v2) => v2 === false ? `(not rendered)` : `${mismatchKey}="${v2}"`;
    const preSegment = `Hydration ${mismatchType} mismatch on`;
    const postSegment = `
  - rendered on server: ${format(actual)}
  - expected on client: ${format(expected)}
  Note: this mismatch is check-only. The DOM will not be rectified in production due to performance overhead.
  You should fix the source of the mismatch.`;
    {
      warn$1(preSegment, el, postSegment);
    }
    return true;
  }
  return false;
}
function toClassSet(str) {
  return new Set(str.trim().split(/\s+/));
}
function isSetEqual(a2, b2) {
  if (a2.size !== b2.size) {
    return false;
  }
  for (const s2 of a2) {
    if (!b2.has(s2)) {
      return false;
    }
  }
  return true;
}
function toStyleMap(str) {
  const styleMap = /* @__PURE__ */ new Map();
  for (const item of str.split(";")) {
    let [key, value] = item.split(":");
    key = key == null ? void 0 : key.trim();
    value = value == null ? void 0 : value.trim();
    if (key && value) {
      styleMap.set(key, value);
    }
  }
  return styleMap;
}
function isMapEqual(a2, b2) {
  if (a2.size !== b2.size) {
    return false;
  }
  for (const [key, value] of a2) {
    if (value !== b2.get(key)) {
      return false;
    }
  }
  return true;
}
let supported$1;
let perf$1;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf$1.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf$1.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf$1.mark(endTag);
    perf$1.measure(
      `<${formatComponentName(instance, instance.type)}> ${type}`,
      startTag,
      endTag
    );
    perf$1.clearMarks(startTag);
    perf$1.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf$1.now() : Date.now());
  }
}
function isSupported() {
  if (supported$1 !== void 0) {
    return supported$1;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported$1 = true;
    perf$1 = window.performance;
  } else {
    supported$1 = false;
  }
  return supported$1;
}
function initFeatureFlags() {
  const needWarn = [];
  if (needWarn.length) {
    const multi = needWarn.length > 1;
    console.warn(
      `Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createHydrationRenderer(options) {
  return baseCreateRenderer(options, createHydrationFunctions);
}
function baseCreateRenderer(options, createHydrationFns) {
  {
    initFeatureFlags();
  }
  const target = getGlobalThis();
  target.__VUE__ = true;
  {
    setDevtoolsHook$1(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        } else {
          patchStaticNode(n1, n2, container, namespace);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else {
          warn$1("Invalid VNode type:", type, `(${typeof type})`);
        }
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
      n2.el,
      n2.anchor
    );
  };
  const patchStaticNode = (n1, n2, container, namespace) => {
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor);
      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(
        n2.children,
        container,
        anchor,
        namespace
      );
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(vnode, namespace),
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(
            el,
            key,
            null,
            props[key],
            namespace,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    {
      Object.defineProperty(el, "__vnode", {
        value: vnode,
        enumerable: false
      });
      Object.defineProperty(el, "__vueParentComponent", {
        value: parentComponent,
        enumerable: false
      });
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i2 = 0; i2 < slotScopeIds.length; i2++) {
        hostSetScopeId(el, slotScopeIds[i2]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
        subTree = filterSingleRoot(subTree.children) || subTree;
      }
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i2 = start; i2 < children.length; i2++) {
      const child = children[i2] = optimized ? cloneIfMounted(children[i2]) : normalizeVNode(children[i2]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (isHmrUpdating) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds
      );
      {
        traverseStaticChildren(n1, n2);
      }
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(
          el,
          n2,
          oldProps,
          newProps,
          parentComponent,
          parentSuspense,
          namespace
        );
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
            const key = propsToUpdate[i2];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(
                el,
                key,
                prev,
                next,
                namespace,
                n1.children,
                parentComponent,
                parentSuspense,
                unmountChildren
              );
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(
        el,
        n2,
        oldProps,
        newProps,
        parentComponent,
        parentSuspense,
        namespace
      );
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i2 = 0; i2 < newChildren.length; i2++) {
      const oldVNode = oldChildren[i2];
      const newVNode = newChildren[i2];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              namespace,
              vnode.children,
              parentComponent,
              parentSuspense,
              unmountChildren
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(
            el,
            key,
            prev,
            next,
            namespace,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (
      // #5523 dev root fragment may inherit directives
      isHmrUpdating || patchFlag & 2048
    ) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        {
          traverseStaticChildren(n1, n2);
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          namespace,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (instance.type.__hmrId) {
      registerHMR(instance);
    }
    {
      pushWarningContext(initialVNode);
      startMeasure(instance, `mount`);
    }
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      {
        startMeasure(instance, `init`);
      }
      setupComponent(instance);
      {
        endMeasure(instance, `init`);
      }
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
    } else {
      setupRenderEffect(
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      );
    }
    {
      popWarningContext();
      endMeasure(instance, `mount`);
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        {
          pushWarningContext(n2);
        }
        updateComponentPreRender(instance, n2, optimized);
        {
          popWarningContext();
        }
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.effect.dirty = true;
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m: m2, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            {
              startMeasure(instance, `render`);
            }
            instance.subTree = renderComponentRoot(instance);
            {
              endMeasure(instance, `render`);
            }
            {
              startMeasure(instance, `hydrate`);
            }
            hydrateNode(
              el,
              instance.subTree,
              instance,
              parentSuspense,
              null
            );
            {
              endMeasure(instance, `hydrate`);
            }
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              // note: we are moving the render call into an async callback,
              // which means it won't track dependencies - but it's ok because
              // a server-rendered async wrapper is already in resolved state
              // and it will never need to change.
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          {
            startMeasure(instance, `render`);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          {
            endMeasure(instance, `render`);
          }
          {
            startMeasure(instance, `patch`);
          }
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            namespace
          );
          {
            endMeasure(instance, `patch`);
          }
          initialVNode.el = subTree.el;
        }
        if (m2) {
          queuePostRenderEffect(m2, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        {
          devtoolsComponentAdded(instance);
        }
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u: u2, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              if (!instance.isUnmounted) {
                componentUpdateFn();
              }
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        {
          pushWarningContext(next || instance.vnode);
        }
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        {
          startMeasure(instance, `render`);
        }
        const nextTree = renderComponentRoot(instance);
        {
          endMeasure(instance, `render`);
        }
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        {
          startMeasure(instance, `patch`);
        }
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          namespace
        );
        {
          endMeasure(instance, `patch`);
        }
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u2) {
          queuePostRenderEffect(u2, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
        {
          devtoolsComponentUpdated(instance);
        }
        {
          popWarningContext();
        }
      }
    };
    const effect = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      NOOP,
      () => queueJob(update),
      instance.scope
      // track it in component's effect scope
    );
    const update = instance.update = () => {
      if (effect.dirty) {
        effect.run();
      }
    };
    update.id = instance.uid;
    toggleRecurse(instance, true);
    {
      effect.onTrack = instance.rtc ? (e2) => invokeArrayFns(instance.rtc, e2) : void 0;
      effect.onTrigger = instance.rtg ? (e2) => invokeArrayFns(instance.rtg, e2) : void 0;
      update.ownerInstance = instance;
    }
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i2;
    for (i2 = 0; i2 < commonLength; i2++) {
      const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
      patch(
        c1[i2],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i2 = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i2 <= e1 && i2 <= e2) {
      const n1 = c1[i2];
      const n2 = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i2++;
    }
    while (i2 <= e1 && i2 <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i2 > e1) {
      if (i2 <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i2 <= e2) {
          patch(
            null,
            c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          i2++;
        }
      }
    } else if (i2 > e2) {
      while (i2 <= e1) {
        unmount(c1[i2], parentComponent, parentSuspense, true);
        i2++;
      }
    } else {
      const s1 = i2;
      const s2 = i2;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i2 = s2; i2 <= e2; i2++) {
        const nextChild = c2[i2] = optimized ? cloneIfMounted(c2[i2]) : normalizeVNode(c2[i2]);
        if (nextChild.key != null) {
          if (keyToNewIndexMap.has(nextChild.key)) {
            warn$1(
              `Duplicate keys found during update:`,
              JSON.stringify(nextChild.key),
              `Make sure keys are unique.`
            );
          }
          keyToNewIndexMap.set(nextChild.key, i2);
        }
      }
      let j2;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i2 = 0; i2 < toBePatched; i2++)
        newIndexToOldIndexMap[i2] = 0;
      for (i2 = s1; i2 <= e1; i2++) {
        const prevChild = c1[i2];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j2 = s2; j2 <= e2; j2++) {
            if (newIndexToOldIndexMap[j2 - s2] === 0 && isSameVNodeType(prevChild, c2[j2])) {
              newIndex = j2;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i2 + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j2 = increasingNewIndexSequence.length - 1;
      for (i2 = toBePatched - 1; i2 >= 0; i2--) {
        const nextIndex = s2 + i2;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i2] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j2 < 0 || i2 !== increasingNewIndexSequence[j2]) {
            move(nextChild, container, anchor, 2);
          } else {
            j2--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i2 = 0; i2 < children.length; i2++) {
        move(children[i2], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref2,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs
    } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          optimized,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
        vnode.children.forEach((child) => {
          if (child.type === Comment) {
            hostRemove(child.el);
          } else {
            remove2(child);
          }
        });
      } else {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    if (instance.type.__hmrId) {
      unregisterHMR(instance);
    }
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
    {
      devtoolsComponentRemoved(instance);
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i2 = start; i2 < children.length; i2++) {
      unmount(children[i2], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  let isFlushing2 = false;
  const render = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        namespace
      );
    }
    if (!isFlushing2) {
      isFlushing2 = true;
      flushPreFlushCbs();
      flushPostFlushCbs();
      isFlushing2 = false;
    }
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(
      internals
    );
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (let i2 = 0; i2 < ch1.length; i2++) {
      const c1 = ch1[i2];
      let c2 = ch2[i2];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i2] = cloneIfMounted(ch2[i2]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
      if (c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i2, j2, u2, v2, c2;
  const len = arr.length;
  for (i2 = 0; i2 < len; i2++) {
    const arrI = arr[i2];
    if (arrI !== 0) {
      j2 = result[result.length - 1];
      if (arr[j2] < arrI) {
        p2[i2] = j2;
        result.push(i2);
        continue;
      }
      u2 = 0;
      v2 = result.length - 1;
      while (u2 < v2) {
        c2 = u2 + v2 >> 1;
        if (arr[result[c2]] < arrI) {
          u2 = c2 + 1;
        } else {
          v2 = c2;
        }
      }
      if (arrI < arr[result[u2]]) {
        if (u2 > 0) {
          p2[i2] = result[u2 - 1];
        }
        result[u2] = i2;
      }
    }
  }
  u2 = result.length;
  v2 = result[u2 - 1];
  while (u2-- > 0) {
    result[u2] = v2;
    v2 = p2[v2];
  }
  return result;
}
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}
const isTeleport = (type) => type.__isTeleport;
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  if (n2.shapeFlag & 6 && hmrDirtyComponents.has(n2.type)) {
    n1.shapeFlag &= ~256;
    n2.shapeFlag &= ~512;
    return false;
  }
  return n1.type === n2.type && n1.key === n2.key;
}
const createVNodeWithArgsTransform = (...args) => {
  return _createVNode(
    ...args
  );
};
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref2,
  ref_key,
  ref_for
}) => {
  if (typeof ref2 === "number") {
    ref2 = "" + ref2;
  }
  return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (vnode.key !== vnode.key) {
    warn$1(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = createVNodeWithArgsTransform;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (!type) {
      warn$1(`Invalid vnode type when creating vnode: ${type}.`);
    }
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject$1(style)) {
      if (isProxy(style) && !isArray$1(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction(type) ? 2 : 0;
  if (shapeFlag & 4 && isProxy(type)) {
    type = toRaw(type);
    warn$1(
      `Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`,
      `
Component that was made reactive: `,
      type
    );
  }
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref2 ? isArray$1(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: patchFlag === -1 && isArray$1(children) ? children.map(deepCloneVNode) : children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  return cloned;
}
function deepCloneVNode(vnode) {
  const cloned = cloneVNode(vnode);
  if (isArray$1(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$1(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$1(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i2 = 0; i2 < args.length; i2++) {
    const toMerge = args[i2];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  const g2 = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g2[key]))
      setters = g2[key] = [];
    setters.push(setter);
    return (v2) => {
      if (setters.length > 1)
        setters.forEach((set2) => set2(v2));
      else
        setters[0](v2);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v2) => currentInstance = v2
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v2) => isInSSRComponentSetup = v2
  );
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn$1(
      "Do not use built-in or reserved HTML elements as component id: " + name
    );
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  var _a2;
  const Component = instance.type;
  {
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config);
    }
    if (Component.components) {
      const names = Object.keys(Component.components);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateComponentName(names[i2], instance.appContext.config);
      }
    }
    if (Component.directives) {
      const names = Object.keys(Component.directives);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateDirectiveName(names[i2]);
      }
    }
    if (Component.compilerOptions && isRuntimeOnly()) {
      warn$1(
        `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
      );
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        shallowReadonly(instance.props),
        setupContext
      ]
    );
    resetTracking();
    reset();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e2) => {
          handleError(e2, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
        if (!instance.suspense) {
          const name = (_a2 = Component.name) != null ? _a2 : "Anonymous";
          warn$1(
            `Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
          );
        }
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(
        `setup() should not return VNodes directly - return a render function instead.`
      );
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$1(
      `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
    );
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        {
          startMeasure(instance, `compile`);
        }
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(
          extend(
            {
              isCustomElement,
              delimiters
            },
            compilerOptions
          ),
          componentCompilerOptions
        );
        Component.render = compile(template, finalCompilerOptions);
        {
          endMeasure(instance, `compile`);
        }
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
  if (!Component.render && instance.render === NOOP && !isSSR) {
    if (Component.template) {
      warn$1(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
      );
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(
    instance.attrs,
    {
      get(target, key) {
        markAttrsAccessed();
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  ));
}
function getSlotsProxy(instance) {
  return instance.slotsProxy || (instance.slotsProxy = new Proxy(instance.slots, {
    get(target, key) {
      track(instance, "get", "$slots");
      return target[key];
    }
  }));
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    {
      if (instance.exposed) {
        warn$1(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray$1(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn$1(
            `expose() should be passed a plain object, received ${exposedType}.`
          );
        }
      }
    }
    instance.exposed = exposed || {};
  };
  {
    return Object.freeze({
      get attrs() {
        return getAttrsProxy(instance);
      },
      get slots() {
        return getSlotsProxy(instance);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function h$4(type, propsOrChildren, children) {
  const l2 = arguments.length;
  if (l2 === 2) {
    if (isObject$1(propsOrChildren) && !isArray$1(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l2 > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l2 === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function initCustomFormatter() {
  if (typeof window === "undefined") {
    return;
  }
  const vueStyle = { style: "color:#3ba776" };
  const numberStyle = { style: "color:#1677ff" };
  const stringStyle = { style: "color:#f5222d" };
  const keywordStyle = { style: "color:#eb2f96" };
  const formatter = {
    header(obj) {
      if (!isObject$1(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, `VueInstance`];
      } else if (isRef(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, genRefFlag(obj)],
          "<",
          formatValue(obj.value),
          `>`
        ];
      } else if (isReactive(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
          "<",
          formatValue(obj),
          `>${isReadonly(obj) ? ` (readonly)` : ``}`
        ];
      } else if (isReadonly(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
          "<",
          formatValue(obj),
          ">"
        ];
      }
      return null;
    },
    hasBody(obj) {
      return obj && obj.__isVue;
    },
    body(obj) {
      if (obj && obj.__isVue) {
        return [
          "div",
          {},
          ...formatInstance(obj.$)
        ];
      }
    }
  };
  function formatInstance(instance) {
    const blocks = [];
    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock("props", toRaw(instance.props)));
    }
    if (instance.setupState !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("setup", instance.setupState));
    }
    if (instance.data !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("data", toRaw(instance.data)));
    }
    const computed2 = extractKeys(instance, "computed");
    if (computed2) {
      blocks.push(createInstanceBlock("computed", computed2));
    }
    const injected = extractKeys(instance, "inject");
    if (injected) {
      blocks.push(createInstanceBlock("injected", injected));
    }
    blocks.push([
      "div",
      {},
      [
        "span",
        {
          style: keywordStyle.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: instance }]
    ]);
    return blocks;
  }
  function createInstanceBlock(type, target) {
    target = extend({}, target);
    if (!Object.keys(target).length) {
      return ["span", {}];
    }
    return [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        type
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(target).map((key) => {
          return [
            "div",
            {},
            ["span", keywordStyle, key + ": "],
            formatValue(target[key], false)
          ];
        })
      ]
    ];
  }
  function formatValue(v2, asRaw = true) {
    if (typeof v2 === "number") {
      return ["span", numberStyle, v2];
    } else if (typeof v2 === "string") {
      return ["span", stringStyle, JSON.stringify(v2)];
    } else if (typeof v2 === "boolean") {
      return ["span", keywordStyle, v2];
    } else if (isObject$1(v2)) {
      return ["object", { object: asRaw ? toRaw(v2) : v2 }];
    } else {
      return ["span", stringStyle, String(v2)];
    }
  }
  function extractKeys(instance, type) {
    const Comp = instance.type;
    if (isFunction(Comp)) {
      return;
    }
    const extracted = {};
    for (const key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }
    return extracted;
  }
  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];
    if (isArray$1(opts) && opts.includes(key) || isObject$1(opts) && key in opts) {
      return true;
    }
    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }
    if (Comp.mixins && Comp.mixins.some((m2) => isKeyOfType(m2, key, type))) {
      return true;
    }
  }
  function genRefFlag(v2) {
    if (isShallow(v2)) {
      return `ShallowRef`;
    }
    if (v2.effect) {
      return `ComputedRef`;
    }
    return `Ref`;
  }
  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
}
const version = "3.4.15";
const warn$2 = warn$1;
/**
* @vue/runtime-dom v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const svgNS = "http://www.w3.org/2000/svg";
const mathmlNS = "http://www.w3.org/1998/Math/MathML";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content;
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
const TRANSITION = "transition";
const ANIMATION = "animation";
const vtcKey = Symbol("_vtc");
const Transition = (props, { slots }) => h$4(BaseTransition, resolveTransitionProps(props), slots);
Transition.displayName = "Transition";
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
const TransitionPropsValidators = Transition.props = /* @__PURE__ */ extend(
  {},
  BaseTransitionPropsValidators,
  DOMTransitionPropsValidators
);
const callHook = (hook, args = []) => {
  if (isArray$1(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray$1(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const {
    name = "v",
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`
  } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject$1(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n2 = NumberOf(duration);
    return [n2, n2];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  {
    assertNumber(res, "<transition> explicit duration");
  }
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c2) => c2 && el.classList.add(c2));
  (el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c2) => c2 && el.classList.remove(c2));
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el[vtcKey] = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e2) => {
    if (e2.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(
    getStyleProperties(`${TRANSITION}Property`).toString()
  );
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d2, i2) => toMs(d2) + toMs(delays[i2])));
}
function toMs(s2) {
  if (s2 === "auto")
    return 0;
  return Number(s2.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
const vShowOldKey = Symbol("_vod");
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el[vShowOldKey] = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
{
  vShow.name = "show";
}
function setDisplay(el, value) {
  el.style.display = value ? el[vShowOldKey] : "none";
}
const CSS_VAR_TEXT = Symbol("CSS_VAR_TEXT");
function patchStyle(el, prev, next) {
  const style = el.style;
  const currentDisplay = style.display;
  const isCssString = isString(next);
  if (next && !isCssString) {
    if (prev && !isString(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOldKey in el) {
    style.display = currentDisplay;
  }
}
const semicolonRE = /[^\\];\s*$/;
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$1(val)) {
    val.forEach((v2) => setStyle(style, name, v2));
  } else {
    if (val == null)
      val = "";
    {
      if (semicolonRE.test(val)) {
        warn$2(
          `Unexpected semicolon at the end of '${name}' style value: '${val}'`
        );
      }
    }
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i2 = 0; i2 < prefixes.length; i2++) {
    const prefixed = prefixes[i2] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean2 = isSpecialBooleanAttr(key);
    if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean2 ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    el._value = value;
    const oldValue = tag === "OPTION" ? el.getAttribute("value") : el.value;
    const newValue = value == null ? "" : value;
    if (oldValue !== newValue) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e2) {
    if (!needRemove) {
      warn$2(
        `Failed setting prop "${key}" on <${tag.toLowerCase()}>: value ${value} is invalid.`,
        e2
      );
    }
  }
  needRemove && el.removeAttribute(key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m2;
    while (m2 = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m2[0].length);
      options[m2[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p$2 = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p$2.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    if (!e2._vts) {
      e2._vts = Date.now();
    } else if (e2._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e2, invoker.value),
      instance,
      5,
      [e2]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray$1(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e22) => !e22._stopped && fn && fn(e22));
  } else {
    return value;
  }
}
const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const patchProp = (el, key, prevValue, nextValue, namespace, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(
      el,
      key,
      nextValue,
      prevChildren,
      parentComponent,
      parentSuspense,
      unmountChildren
    );
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString(value)) {
    return false;
  }
  return key in el;
}
const positionMap = /* @__PURE__ */ new WeakMap();
const newPositionMap = /* @__PURE__ */ new WeakMap();
const moveCbKey = Symbol("_moveCb");
const enterCbKey = Symbol("_enterCb");
const TransitionGroupImpl = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevChildren;
    let children;
    onUpdated(() => {
      if (!prevChildren.length) {
        return;
      }
      const moveClass = props.moveClass || `${props.name || "v"}-move`;
      if (!hasCSSTransform(
        prevChildren[0].el,
        instance.vnode.el,
        moveClass
      )) {
        return;
      }
      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      const movedChildren = prevChildren.filter(applyTranslation);
      forceReflow();
      movedChildren.forEach((c2) => {
        const el = c2.el;
        const style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.webkitTransform = style.transitionDuration = "";
        const cb = el[moveCbKey] = (e2) => {
          if (e2 && e2.target !== el) {
            return;
          }
          if (!e2 || /transform$/.test(e2.propertyName)) {
            el.removeEventListener("transitionend", cb);
            el[moveCbKey] = null;
            removeTransitionClass(el, moveClass);
          }
        };
        el.addEventListener("transitionend", cb);
      });
    });
    return () => {
      const rawProps = toRaw(props);
      const cssTransitionProps = resolveTransitionProps(rawProps);
      let tag = rawProps.tag || Fragment;
      prevChildren = children;
      children = slots.default ? getTransitionRawChildren(slots.default()) : [];
      for (let i2 = 0; i2 < children.length; i2++) {
        const child = children[i2];
        if (child.key != null) {
          setTransitionHooks(
            child,
            resolveTransitionHooks(child, cssTransitionProps, state, instance)
          );
        } else {
          warn$2(`<TransitionGroup> children must be keyed.`);
        }
      }
      if (prevChildren) {
        for (let i2 = 0; i2 < prevChildren.length; i2++) {
          const child = prevChildren[i2];
          setTransitionHooks(
            child,
            resolveTransitionHooks(child, cssTransitionProps, state, instance)
          );
          positionMap.set(child, child.el.getBoundingClientRect());
        }
      }
      return createVNode(tag, null, children);
    };
  }
};
const removeMode = (props) => delete props.mode;
/* @__PURE__ */ removeMode(TransitionGroupImpl.props);
const TransitionGroup = TransitionGroupImpl;
function callPendingCbs(c2) {
  const el = c2.el;
  if (el[moveCbKey]) {
    el[moveCbKey]();
  }
  if (el[enterCbKey]) {
    el[enterCbKey]();
  }
}
function recordPosition(c2) {
  newPositionMap.set(c2, c2.el.getBoundingClientRect());
}
function applyTranslation(c2) {
  const oldPos = positionMap.get(c2);
  const newPos = newPositionMap.get(c2);
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;
  if (dx || dy) {
    const s2 = c2.el.style;
    s2.transform = s2.webkitTransform = `translate(${dx}px,${dy}px)`;
    s2.transitionDuration = "0s";
    return c2;
  }
}
function hasCSSTransform(el, root, moveClass) {
  const clone = el.cloneNode();
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.forEach((cls) => {
      cls.split(/\s+/).forEach((c2) => c2 && clone.classList.remove(c2));
    });
  }
  moveClass.split(/\s+/).forEach((c2) => c2 && clone.classList.add(c2));
  clone.style.display = "none";
  const container = root.nodeType === 1 ? root : root.parentNode;
  container.appendChild(clone);
  const { hasTransform } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
}
const getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"] || false;
  return isArray$1(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e2) {
  e2.target.composing = true;
}
function onCompositionEnd(e2) {
  const target = e2.target;
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
const assignKey = Symbol("_assign");
const vModelText = {
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    const castToNumber = number || vnode.props && vnode.props.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e2) => {
      if (e2.target.composing)
        return;
      let domValue = el.value;
      if (trim) {
        domValue = domValue.trim();
      }
      if (castToNumber) {
        domValue = looseToNumber(domValue);
      }
      el[assignKey](domValue);
    });
    if (trim) {
      addEventListener(el, "change", () => {
        el.value = el.value.trim();
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    if (el.composing)
      return;
    const elValue = number || el.type === "number" ? looseToNumber(el.value) : el.value;
    const newValue = value == null ? "" : value;
    if (elValue === newValue) {
      return;
    }
    if (document.activeElement === el && el.type !== "range") {
      if (lazy) {
        return;
      }
      if (trim && el.value.trim() === newValue) {
        return;
      }
    }
    el.value = newValue;
  }
};
const vModelCheckbox = {
  // #4096 array checkboxes need to be deep traversed
  deep: true,
  created(el, _2, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    addEventListener(el, "change", () => {
      const modelValue = el._modelValue;
      const elementValue = getValue(el);
      const checked = el.checked;
      const assign2 = el[assignKey];
      if (isArray$1(modelValue)) {
        const index2 = looseIndexOf(modelValue, elementValue);
        const found = index2 !== -1;
        if (checked && !found) {
          assign2(modelValue.concat(elementValue));
        } else if (!checked && found) {
          const filtered = [...modelValue];
          filtered.splice(index2, 1);
          assign2(filtered);
        }
      } else if (isSet(modelValue)) {
        const cloned = new Set(modelValue);
        if (checked) {
          cloned.add(elementValue);
        } else {
          cloned.delete(elementValue);
        }
        assign2(cloned);
      } else {
        assign2(getCheckboxValue(el, checked));
      }
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: setChecked,
  beforeUpdate(el, binding, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    setChecked(el, binding, vnode);
  }
};
function setChecked(el, { value, oldValue }, vnode) {
  el._modelValue = value;
  if (isArray$1(value)) {
    el.checked = looseIndexOf(value, vnode.props.value) > -1;
  } else if (isSet(value)) {
    el.checked = value.has(vnode.props.value);
  } else if (value !== oldValue) {
    el.checked = looseEqual(value, getCheckboxValue(el, true));
  }
}
const vModelRadio = {
  created(el, { value }, vnode) {
    el.checked = looseEqual(value, vnode.props.value);
    el[assignKey] = getModelAssigner(vnode);
    addEventListener(el, "change", () => {
      el[assignKey](getValue(el));
    });
  },
  beforeUpdate(el, { value, oldValue }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    if (value !== oldValue) {
      el.checked = looseEqual(value, vnode.props.value);
    }
  }
};
const vModelSelect = {
  // <select multiple> value need to be deep traversed
  deep: true,
  created(el, { value, modifiers: { number } }, vnode) {
    const isSetModel = isSet(value);
    addEventListener(el, "change", () => {
      const selectedVal = Array.prototype.filter.call(el.options, (o2) => o2.selected).map(
        (o2) => number ? looseToNumber(getValue(o2)) : getValue(o2)
      );
      el[assignKey](
        el.multiple ? isSetModel ? new Set(selectedVal) : selectedVal : selectedVal[0]
      );
      el._assigning = true;
      nextTick(() => {
        el._assigning = false;
      });
    });
    el[assignKey] = getModelAssigner(vnode);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(el, { value, oldValue, modifiers: { number } }) {
    setSelected(el, value, oldValue, number);
  },
  beforeUpdate(el, _binding, vnode) {
    el[assignKey] = getModelAssigner(vnode);
  },
  updated(el, { value, oldValue, modifiers: { number } }) {
    if (!el._assigning) {
      setSelected(el, value, oldValue, number);
    }
  }
};
function setSelected(el, value, oldValue, number) {
  const isMultiple = el.multiple;
  const isArrayValue = isArray$1(value);
  if (isMultiple && !isArrayValue && !isSet(value)) {
    warn$2(
      `<select multiple v-model> expects an Array or Set value for its binding, but got ${Object.prototype.toString.call(value).slice(8, -1)}.`
    );
    return;
  }
  if (isArrayValue && looseEqual(value, oldValue)) {
    return;
  }
  for (let i2 = 0, l2 = el.options.length; i2 < l2; i2++) {
    const option = el.options[i2];
    const optionValue = getValue(option);
    if (isMultiple) {
      if (isArrayValue) {
        const optionType = typeof optionValue;
        if (optionType === "string" || optionType === "number") {
          option.selected = value.includes(
            number ? looseToNumber(optionValue) : optionValue
          );
        } else {
          option.selected = looseIndexOf(value, optionValue) > -1;
        }
      } else {
        option.selected = value.has(optionValue);
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i2)
          el.selectedIndex = i2;
        return;
      }
    }
  }
  if (!isMultiple && el.selectedIndex !== -1) {
    el.selectedIndex = -1;
  }
}
function getValue(el) {
  return "_value" in el ? el._value : el.value;
}
function getCheckboxValue(el, checked) {
  const key = checked ? "_trueValue" : "_falseValue";
  return key in el ? el[key] : checked;
}
const vModelDynamic = {
  created(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, "created");
  },
  mounted(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, "mounted");
  },
  beforeUpdate(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, "beforeUpdate");
  },
  updated(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, "updated");
  }
};
function resolveDynamicModel(tagName, type) {
  switch (tagName) {
    case "SELECT":
      return vModelSelect;
    case "TEXTAREA":
      return vModelText;
    default:
      switch (type) {
        case "checkbox":
          return vModelCheckbox;
        case "radio":
          return vModelRadio;
        default:
          return vModelText;
      }
  }
}
function callModelHook(el, binding, vnode, prevVNode, hook) {
  const modelToUse = resolveDynamicModel(
    el.tagName,
    vnode.props && vnode.props.type
  );
  const fn = modelToUse[hook];
  fn && fn(el, binding, vnode, prevVNode);
}
const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e2) => e2.stopPropagation(),
  prevent: (e2) => e2.preventDefault(),
  self: (e2) => e2.target !== e2.currentTarget,
  ctrl: (e2) => !e2.ctrlKey,
  shift: (e2) => !e2.shiftKey,
  alt: (e2) => !e2.altKey,
  meta: (e2) => !e2.metaKey,
  left: (e2) => "button" in e2 && e2.button !== 0,
  middle: (e2) => "button" in e2 && e2.button !== 1,
  right: (e2) => "button" in e2 && e2.button !== 2,
  exact: (e2, modifiers) => systemModifiers.some((m2) => e2[`${m2}Key`] && !modifiers.includes(m2))
};
const withModifiers = (fn, modifiers) => {
  const cache = fn._withMods || (fn._withMods = {});
  const cacheKey = modifiers.join(".");
  return cache[cacheKey] || (cache[cacheKey] = (event, ...args) => {
    for (let i2 = 0; i2 < modifiers.length; i2++) {
      const guard = modifierGuards[modifiers[i2]];
      if (guard && guard(event, modifiers))
        return;
    }
    return fn(event, ...args);
  });
};
const keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
};
const withKeys = (fn, modifiers) => {
  const cache = fn._withKeys || (fn._withKeys = {});
  const cacheKey = modifiers.join(".");
  return cache[cacheKey] || (cache[cacheKey] = (event) => {
    if (!("key" in event)) {
      return;
    }
    const eventKey = hyphenate(event.key);
    if (modifiers.some((k2) => k2 === eventKey || keyNames[k2] === eventKey)) {
      return fn(event);
    }
  });
};
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
let enabledHydration = false;
function ensureHydrationRenderer() {
  renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
  enabledHydration = true;
  return renderer;
}
const createSSRApp = (...args) => {
  const app = ensureHydrationRenderer().createApp(...args);
  {
    injectNativeTagCheck(app);
    injectCompilerOptionsCheck(app);
  }
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (container) {
      return mount(container, true, resolveRootNamespace(container));
    }
  };
  return app;
};
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function injectNativeTagCheck(app) {
  Object.defineProperty(app.config, "isNativeTag", {
    value: (tag) => isHTMLTag(tag) || isSVGTag(tag) || isMathMLTag(tag),
    writable: false
  });
}
function injectCompilerOptionsCheck(app) {
  {
    const isCustomElement = app.config.isCustomElement;
    Object.defineProperty(app.config, "isCustomElement", {
      get() {
        return isCustomElement;
      },
      set() {
        warn$2(
          `The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`
        );
      }
    });
    const compilerOptions = app.config.compilerOptions;
    const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc`;
    Object.defineProperty(app.config, "compilerOptions", {
      get() {
        warn$2(msg);
        return compilerOptions;
      },
      set() {
        warn$2(msg);
      }
    });
  }
}
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    if (!res) {
      warn$2(
        `Failed to mount app: mount target selector "${container}" returned null.`
      );
    }
    return res;
  }
  if (window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
    warn$2(
      `mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`
    );
  }
  return container;
}
/**
* vue v3.4.15
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function initDev() {
  {
    initCustomFormatter();
  }
}
{
  initDev();
}
const pagesData$1 = {
  // path: /
  "v-8daa1a0e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-8daa1a0e" */
    "./index.html-7f3e906b.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /intro.html
  "v-184f4da6": () => __vitePreload(() => import(
    /* webpackChunkName: "v-184f4da6" */
    "./intro.html-f2fcbb72.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /slides.html
  "v-2e3eac9e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-2e3eac9e" */
    "./slides.html-77de331c.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /anything/%E5%B0%8F%E8%AE%B0/%E4%B8%8B%E9%9B%AA%E5%95%A6.html
  "v-ca2606fe": () => __vitePreload(() => import(
    /* webpackChunkName: "v-ca2606fe" */
    "./下雪啦.html-fbc83f77.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /anything/%E5%B0%8F%E8%AE%B0/%E5%A5%BD%E7%94%A8%E7%BD%91%E7%AB%99%E6%94%B6%E8%97%8F.html
  "v-59939119": () => __vitePreload(() => import(
    /* webpackChunkName: "v-59939119" */
    "./好用网站收藏.html-75a3ff21.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F.html
  "v-4848c9f0": () => __vitePreload(() => import(
    /* webpackChunkName: "v-4848c9f0" */
    "./单例模式.html-f9f8c3f9.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F.html
  "v-7a9b9630": () => __vitePreload(() => import(
    /* webpackChunkName: "v-7a9b9630" */
    "./工厂模式.html-bf736bcf.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E9%97%A8%E9%9D%A2%E6%A8%A1%E5%BC%8F.html
  "v-71b4dc5e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-71b4dc5e" */
    "./门面模式.html-80781494.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /posts/Linux/Linux%E9%85%8D%E7%BD%AE%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.html
  "v-0b84fef2": () => __vitePreload(() => import(
    /* webpackChunkName: "v-0b84fef2" */
    "./Linux配置环境变量.html-14f7c39d.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /posts/Vue/Vue%E5%9F%BA%E7%A1%80.html
  "v-66d370d9": () => __vitePreload(() => import(
    /* webpackChunkName: "v-66d370d9" */
    "./Vue基础.html-d31f1ed2.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /posts/Vue/vue%E5%AE%A2%E6%88%B7%E7%AB%AF.html
  "v-3ae980e2": () => __vitePreload(() => import(
    /* webpackChunkName: "v-3ae980e2" */
    "./vue客户端.html-552c4fe1.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /posts/gRPC/gRPC%E6%9C%8D%E5%8A%A1.html
  "v-3966997b": () => __vitePreload(() => import(
    /* webpackChunkName: "v-3966997b" */
    "./gRPC服务.html-763d92ca.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /posts/mysql/mysql%E5%A4%87%E5%BF%98%E5%BD%95.html
  "v-784c3919": () => __vitePreload(() => import(
    /* webpackChunkName: "v-784c3919" */
    "./mysql备忘录.html-cffdab29.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /posts/python/Linux%E7%8E%AF%E5%A2%83%E4%B8%8BDBUtils%E5%AF%BC%E5%85%A5%E7%9A%84%E9%97%AE%E9%A2%98.html
  "v-4f435352": () => __vitePreload(() => import(
    /* webpackChunkName: "v-4f435352" */
    "./Linux环境下DBUtils导入的问题.html-29cd1c89.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /posts/python/Python2%E8%BD%ACPython3.html
  "v-4870e4c2": () => __vitePreload(() => import(
    /* webpackChunkName: "v-4870e4c2" */
    "./Python2转Python3.html-8ce92cc9.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /posts/python/Python%E6%B7%BB%E5%8A%A0%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.html
  "v-77bb6b9a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-77bb6b9a" */
    "./Python添加环境变量.html-3c793794.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /posts/python/polygon%E9%9D%A2%E7%A7%AF%E8%AE%A1%E7%AE%97.html
  "v-014b8769": () => __vitePreload(() => import(
    /* webpackChunkName: "v-014b8769" */
    "./polygon面积计算.html-208b79ea.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /posts/tools/PicgoGitHub%E6%90%AD%E5%BB%BA%E5%9B%BE%E5%BA%8A.html
  "v-34cef64b": () => __vitePreload(() => import(
    /* webpackChunkName: "v-34cef64b" */
    "./PicgoGitHub搭建图床.html-8e7bfd51.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /posts/tools/sublime%E8%AF%B4%E6%98%8E%E4%B9%A6.html
  "v-a430865c": () => __vitePreload(() => import(
    /* webpackChunkName: "v-a430865c" */
    "./sublime说明书.html-0c2f2815.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /anything/book_notes/%E4%BA%BA%E4%B9%8B%E8%A7%89%E9%86%92/%E4%B8%80%E5%88%87%E9%97%AE%E9%A2%98%E7%9A%84%E8%B5%B7%E6%BA%90.html
  "v-227b283b": () => __vitePreload(() => import(
    /* webpackChunkName: "v-227b283b" */
    "./一切问题的起源.html-7931b13d.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /404.html
  "v-3706649a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-3706649a" */
    "./404.html-77beb351.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /anything/%E5%B0%8F%E8%AE%B0/
  "v-7f74a124": () => __vitePreload(() => import(
    /* webpackChunkName: "v-7f74a124" */
    "./index.html-7685aeab.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /anything/
  "v-c85a71d8": () => __vitePreload(() => import(
    /* webpackChunkName: "v-c85a71d8" */
    "./index.html-2d895521.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/
  "v-7f99a408": () => __vitePreload(() => import(
    /* webpackChunkName: "v-7f99a408" */
    "./index.html-420d8e64.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /design_pattern/
  "v-eb42b032": () => __vitePreload(() => import(
    /* webpackChunkName: "v-eb42b032" */
    "./index.html-96ac881b.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /posts/Linux/
  "v-3689fde0": () => __vitePreload(() => import(
    /* webpackChunkName: "v-3689fde0" */
    "./index.html-092d3c3c.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /posts/
  "v-e1e3da16": () => __vitePreload(() => import(
    /* webpackChunkName: "v-e1e3da16" */
    "./index.html-cda2d959.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /posts/Vue/
  "v-635a6bfe": () => __vitePreload(() => import(
    /* webpackChunkName: "v-635a6bfe" */
    "./index.html-edb017ed.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /posts/gRPC/
  "v-08d26e1c": () => __vitePreload(() => import(
    /* webpackChunkName: "v-08d26e1c" */
    "./index.html-c74dbce0.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /posts/mysql/
  "v-1dee9b02": () => __vitePreload(() => import(
    /* webpackChunkName: "v-1dee9b02" */
    "./index.html-78f75e8e.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /posts/python/
  "v-3ea18a3e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-3ea18a3e" */
    "./index.html-533ab30a.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /posts/tools/
  "v-2951b8e9": () => __vitePreload(() => import(
    /* webpackChunkName: "v-2951b8e9" */
    "./index.html-c65965d4.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /anything/book_notes/%E4%BA%BA%E4%B9%8B%E8%A7%89%E9%86%92/
  "v-0e47583b": () => __vitePreload(() => import(
    /* webpackChunkName: "v-0e47583b" */
    "./index.html-eb62e7de.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /anything/book_notes/
  "v-3bfcafe0": () => __vitePreload(() => import(
    /* webpackChunkName: "v-3bfcafe0" */
    "./index.html-cb58076f.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /category/
  "v-5bc93818": () => __vitePreload(() => import(
    /* webpackChunkName: "v-5bc93818" */
    "./index.html-08b3e749.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /tag/
  "v-744d024e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-744d024e" */
    "./index.html-d9c9ea9c.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /article/
  "v-e52c881c": () => __vitePreload(() => import(
    /* webpackChunkName: "v-e52c881c" */
    "./index.html-4132d313.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /star/
  "v-154dc4c4": () => __vitePreload(() => import(
    /* webpackChunkName: "v-154dc4c4" */
    "./index.html-b6405ed6.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /timeline/
  "v-01560935": () => __vitePreload(() => import(
    /* webpackChunkName: "v-01560935" */
    "./index.html-620ca885.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /category/%E7%94%BB%E5%86%8C/
  "v-605620d1": () => __vitePreload(() => import(
    /* webpackChunkName: "v-605620d1" */
    "./index.html-f1986764.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /tag/%E7%BD%91%E7%AB%99/
  "v-efadec50": () => __vitePreload(() => import(
    /* webpackChunkName: "v-efadec50" */
    "./index.html-0db52788.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /category/%E7%BD%91%E5%9D%80%E6%94%B6%E8%97%8F/
  "v-6efe3f6e": () => __vitePreload(() => import(
    /* webpackChunkName: "v-6efe3f6e" */
    "./index.html-66b35593.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /tag/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/
  "v-05b88e01": () => __vitePreload(() => import(
    /* webpackChunkName: "v-05b88e01" */
    "./index.html-e7a54b05.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /category/python/
  "v-78cbe7bb": () => __vitePreload(() => import(
    /* webpackChunkName: "v-78cbe7bb" */
    "./index.html-b0f347b3.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /tag/python/
  "v-245f5676": () => __vitePreload(() => import(
    /* webpackChunkName: "v-245f5676" */
    "./index.html-f49af92f.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /category/%E6%8A%80%E6%9C%AF/
  "v-594730ea": () => __vitePreload(() => import(
    /* webpackChunkName: "v-594730ea" */
    "./index.html-8cc6ed80.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /tag/linux/
  "v-211f44ee": () => __vitePreload(() => import(
    /* webpackChunkName: "v-211f44ee" */
    "./index.html-4a8f0349.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /category/vue/
  "v-65f6d381": () => __vitePreload(() => import(
    /* webpackChunkName: "v-65f6d381" */
    "./index.html-a43e1534.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /tag/%E5%89%8D%E7%AB%AF/
  "v-95f987f4": () => __vitePreload(() => import(
    /* webpackChunkName: "v-95f987f4" */
    "./index.html-81b11e4f.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /category/%E5%B7%A5%E5%85%B7/
  "v-14145d44": () => __vitePreload(() => import(
    /* webpackChunkName: "v-14145d44" */
    "./index.html-e218d93b.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /tag/%E6%A1%86%E6%9E%B6/
  "v-f4d3cd72": () => __vitePreload(() => import(
    /* webpackChunkName: "v-f4d3cd72" */
    "./index.html-618755e4.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /tag/gprc/
  "v-287e5507": () => __vitePreload(() => import(
    /* webpackChunkName: "v-287e5507" */
    "./index.html-5a481783.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /tag/rpc/
  "v-b306a390": () => __vitePreload(() => import(
    /* webpackChunkName: "v-b306a390" */
    "./index.html-6a6c696e.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /tag/mysql/
  "v-1bee38ca": () => __vitePreload(() => import(
    /* webpackChunkName: "v-1bee38ca" */
    "./index.html-4437bd47.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /tag/2to3/
  "v-259537bb": () => __vitePreload(() => import(
    /* webpackChunkName: "v-259537bb" */
    "./index.html-094cd24a.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /tag/polygon/
  "v-a2fdb2fa": () => __vitePreload(() => import(
    /* webpackChunkName: "v-a2fdb2fa" */
    "./index.html-15124902.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /tag/picgo/
  "v-1382eb6a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-1382eb6a" */
    "./index.html-a00c82a1.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /tag/github/
  "v-132a6ac4": () => __vitePreload(() => import(
    /* webpackChunkName: "v-132a6ac4" */
    "./index.html-cb3a2c28.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /tag/sublime-text/
  "v-32b1cb5c": () => __vitePreload(() => import(
    /* webpackChunkName: "v-32b1cb5c" */
    "./index.html-284fb423.js"
  ), true ? [] : void 0).then(({ data }) => data),
  // path: /tag/%E5%B7%A5%E5%85%B7%E8%AF%B4%E6%98%8E%E4%B9%A6/
  "v-1d73fa7a": () => __vitePreload(() => import(
    /* webpackChunkName: "v-1d73fa7a" */
    "./index.html-aec32a11.js"
  ), true ? [] : void 0).then(({ data }) => data)
};
const siteData$1 = JSON.parse('{"base":"/space/","lang":"zh-CN","title":"#/ cd L.H.X Blog Home","description":"","head":[["link",{"rel":"preconnect","href":"https://fonts.googleapis.com"}],["link",{"rel":"preconnect","href":"https://fonts.gstatic.com","crossorigin":""}],["link",{"href":"https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap","rel":"stylesheet"}],["link",{"href":"https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+KuaiLe&display=swap","rel":"stylesheet"}],["link",{"rel":"manifest","href":"/manifest.webmanifest"}],["meta",{"name":"theme-color","content":"#3eaf7c"}],["link",{"rel":"icon","href":"/space/favicon.ico"}],["link",{"rel":"icon","href":"/space/assets/icon/chrome-mask-512.png","type":"image/png","sizes":"512x512"}],["link",{"rel":"icon","href":"/space/assets/icon/chrome-mask-192.png","type":"image/png","sizes":"192x192"}],["link",{"rel":"icon","href":"/space/assets/icon/chrome-512.png","type":"image/png","sizes":"512x512"}],["link",{"rel":"icon","href":"/space/assets/icon/chrome-192.png","type":"image/png","sizes":"192x192"}],["link",{"rel":"apple-touch-icon","href":"/space/assets/icon/apple-icon-152.png"}],["meta",{"name":"apple-mobile-web-app-capable","content":"yes"}],["meta",{"name":"apple-mobile-web-app-status-bar-style","content":"black"}],["meta",{"name":"msapplication-TileImage","content":"/space/assets/icon/ms-icon-144.png"}],["meta",{"name":"msapplication-TileColor","content":"#ffffff"}],["meta",{"name":"viewport","content":"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"}]],"locales":{}}');
var resolveHeadIdentifier = ([
  tag,
  attrs,
  content
]) => {
  if (tag === "meta" && attrs.name) {
    return `${tag}.${attrs.name}`;
  }
  if (["title", "base"].includes(tag)) {
    return tag;
  }
  if (tag === "template" && attrs.id) {
    return `${tag}.${attrs.id}`;
  }
  return JSON.stringify([tag, attrs, content]);
};
var dedupeHead = (head) => {
  const identifierSet = /* @__PURE__ */ new Set();
  const result = [];
  head.forEach((item) => {
    const identifier = resolveHeadIdentifier(item);
    if (!identifierSet.has(identifier)) {
      identifierSet.add(identifier);
      result.push(item);
    }
  });
  return result;
};
var ensureEndingSlash = (str) => str[str.length - 1] === "/" || str.endsWith(".html") ? str : `${str}/`;
var isLinkFtp = (link) => link.startsWith("ftp://");
var isLinkHttp = (link) => /^(https?:)?\/\//.test(link);
var markdownLinkRegexp = /.md((\?|#).*)?$/;
var isLinkExternal = (link, base = "/") => {
  if (isLinkHttp(link) || isLinkFtp(link)) {
    return true;
  }
  if (link.startsWith("/") && !link.startsWith(base) && !markdownLinkRegexp.test(link)) {
    return true;
  }
  return false;
};
var isLinkMailto = (link) => /^mailto:/.test(link);
var isLinkTel = (link) => /^tel:/.test(link);
var isPlainObject = (val) => Object.prototype.toString.call(val) === "[object Object]";
var removeEndingSlash = (str) => str[str.length - 1] === "/" ? str.slice(0, -1) : str;
var removeLeadingSlash = (str) => str[0] === "/" ? str.slice(1) : str;
var resolveLocalePath = (locales2, routePath) => {
  const localePaths = Object.keys(locales2).sort((a2, b2) => {
    const levelDelta = b2.split("/").length - a2.split("/").length;
    if (levelDelta !== 0) {
      return levelDelta;
    }
    return b2.length - a2.length;
  });
  for (const localePath of localePaths) {
    if (routePath.startsWith(localePath)) {
      return localePath;
    }
  }
  return "/";
};
var resolveRoutePathFromUrl = (url, base = "/") => {
  const pathname = url.replace(/^(https?:)?\/\/[^/]*/, "");
  return pathname.startsWith(base) ? `/${pathname.slice(base.length)}` : pathname;
};
const pagesComponents = {
  // path: /
  "v-8daa1a0e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-8daa1a0e" */
    "./index.html-d80e1521.js"
  ), true ? ["assets/index.html-d80e1521.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /intro.html
  "v-184f4da6": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-184f4da6" */
    "./intro.html-58bfdd8c.js"
  ), true ? ["assets/intro.html-58bfdd8c.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /slides.html
  "v-2e3eac9e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-2e3eac9e" */
    "./slides.html-ab673b48.js"
  ), true ? ["assets/slides.html-ab673b48.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /anything/%E5%B0%8F%E8%AE%B0/%E4%B8%8B%E9%9B%AA%E5%95%A6.html
  "v-ca2606fe": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-ca2606fe" */
    "./下雪啦.html-30f2eba0.js"
  ), true ? ["assets/下雪啦.html-30f2eba0.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /anything/%E5%B0%8F%E8%AE%B0/%E5%A5%BD%E7%94%A8%E7%BD%91%E7%AB%99%E6%94%B6%E8%97%8F.html
  "v-59939119": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-59939119" */
    "./好用网站收藏.html-867b268b.js"
  ), true ? ["assets/好用网站收藏.html-867b268b.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F.html
  "v-4848c9f0": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-4848c9f0" */
    "./单例模式.html-2be503c8.js"
  ), true ? ["assets/单例模式.html-2be503c8.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F.html
  "v-7a9b9630": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-7a9b9630" */
    "./工厂模式.html-4c5d5c3f.js"
  ), true ? ["assets/工厂模式.html-4c5d5c3f.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E9%97%A8%E9%9D%A2%E6%A8%A1%E5%BC%8F.html
  "v-71b4dc5e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-71b4dc5e" */
    "./门面模式.html-b63f1711.js"
  ), true ? ["assets/门面模式.html-b63f1711.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /posts/Linux/Linux%E9%85%8D%E7%BD%AE%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.html
  "v-0b84fef2": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-0b84fef2" */
    "./Linux配置环境变量.html-b082cfcf.js"
  ), true ? ["assets/Linux配置环境变量.html-b082cfcf.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /posts/Vue/Vue%E5%9F%BA%E7%A1%80.html
  "v-66d370d9": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-66d370d9" */
    "./Vue基础.html-11d6e15d.js"
  ), true ? ["assets/Vue基础.html-11d6e15d.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /posts/Vue/vue%E5%AE%A2%E6%88%B7%E7%AB%AF.html
  "v-3ae980e2": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-3ae980e2" */
    "./vue客户端.html-756cb545.js"
  ), true ? ["assets/vue客户端.html-756cb545.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /posts/gRPC/gRPC%E6%9C%8D%E5%8A%A1.html
  "v-3966997b": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-3966997b" */
    "./gRPC服务.html-44855b55.js"
  ), true ? ["assets/gRPC服务.html-44855b55.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /posts/mysql/mysql%E5%A4%87%E5%BF%98%E5%BD%95.html
  "v-784c3919": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-784c3919" */
    "./mysql备忘录.html-e363a608.js"
  ), true ? ["assets/mysql备忘录.html-e363a608.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /posts/python/Linux%E7%8E%AF%E5%A2%83%E4%B8%8BDBUtils%E5%AF%BC%E5%85%A5%E7%9A%84%E9%97%AE%E9%A2%98.html
  "v-4f435352": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-4f435352" */
    "./Linux环境下DBUtils导入的问题.html-dd4faaf7.js"
  ), true ? ["assets/Linux环境下DBUtils导入的问题.html-dd4faaf7.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /posts/python/Python2%E8%BD%ACPython3.html
  "v-4870e4c2": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-4870e4c2" */
    "./Python2转Python3.html-7c86a6ec.js"
  ), true ? ["assets/Python2转Python3.html-7c86a6ec.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /posts/python/Python%E6%B7%BB%E5%8A%A0%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.html
  "v-77bb6b9a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-77bb6b9a" */
    "./Python添加环境变量.html-0e451afe.js"
  ), true ? ["assets/Python添加环境变量.html-0e451afe.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /posts/python/polygon%E9%9D%A2%E7%A7%AF%E8%AE%A1%E7%AE%97.html
  "v-014b8769": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-014b8769" */
    "./polygon面积计算.html-0b7c0a7a.js"
  ), true ? ["assets/polygon面积计算.html-0b7c0a7a.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /posts/tools/PicgoGitHub%E6%90%AD%E5%BB%BA%E5%9B%BE%E5%BA%8A.html
  "v-34cef64b": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-34cef64b" */
    "./PicgoGitHub搭建图床.html-40e0b739.js"
  ), true ? ["assets/PicgoGitHub搭建图床.html-40e0b739.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /posts/tools/sublime%E8%AF%B4%E6%98%8E%E4%B9%A6.html
  "v-a430865c": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-a430865c" */
    "./sublime说明书.html-26292a91.js"
  ), true ? ["assets/sublime说明书.html-26292a91.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /anything/book_notes/%E4%BA%BA%E4%B9%8B%E8%A7%89%E9%86%92/%E4%B8%80%E5%88%87%E9%97%AE%E9%A2%98%E7%9A%84%E8%B5%B7%E6%BA%90.html
  "v-227b283b": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-227b283b" */
    "./一切问题的起源.html-f462a2ed.js"
  ), true ? ["assets/一切问题的起源.html-f462a2ed.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /404.html
  "v-3706649a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-3706649a" */
    "./404.html-7762df77.js"
  ), true ? ["assets/404.html-7762df77.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /anything/%E5%B0%8F%E8%AE%B0/
  "v-7f74a124": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-7f74a124" */
    "./index.html-aaf82ae8.js"
  ), true ? ["assets/index.html-aaf82ae8.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /anything/
  "v-c85a71d8": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-c85a71d8" */
    "./index.html-bc83b359.js"
  ), true ? ["assets/index.html-bc83b359.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/
  "v-7f99a408": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-7f99a408" */
    "./index.html-7a9d3529.js"
  ), true ? ["assets/index.html-7a9d3529.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /design_pattern/
  "v-eb42b032": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-eb42b032" */
    "./index.html-38a94c44.js"
  ), true ? ["assets/index.html-38a94c44.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /posts/Linux/
  "v-3689fde0": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-3689fde0" */
    "./index.html-d1fbd922.js"
  ), true ? ["assets/index.html-d1fbd922.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /posts/
  "v-e1e3da16": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-e1e3da16" */
    "./index.html-9f387e70.js"
  ), true ? ["assets/index.html-9f387e70.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /posts/Vue/
  "v-635a6bfe": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-635a6bfe" */
    "./index.html-1f5e6230.js"
  ), true ? ["assets/index.html-1f5e6230.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /posts/gRPC/
  "v-08d26e1c": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-08d26e1c" */
    "./index.html-42096d49.js"
  ), true ? ["assets/index.html-42096d49.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /posts/mysql/
  "v-1dee9b02": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-1dee9b02" */
    "./index.html-9a018249.js"
  ), true ? ["assets/index.html-9a018249.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /posts/python/
  "v-3ea18a3e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-3ea18a3e" */
    "./index.html-04ece14a.js"
  ), true ? ["assets/index.html-04ece14a.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /posts/tools/
  "v-2951b8e9": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-2951b8e9" */
    "./index.html-1e4a1c96.js"
  ), true ? ["assets/index.html-1e4a1c96.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /anything/book_notes/%E4%BA%BA%E4%B9%8B%E8%A7%89%E9%86%92/
  "v-0e47583b": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-0e47583b" */
    "./index.html-55b7fd1e.js"
  ), true ? ["assets/index.html-55b7fd1e.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /anything/book_notes/
  "v-3bfcafe0": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-3bfcafe0" */
    "./index.html-bbbc3e9c.js"
  ), true ? ["assets/index.html-bbbc3e9c.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /category/
  "v-5bc93818": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-5bc93818" */
    "./index.html-2a82688f.js"
  ), true ? ["assets/index.html-2a82688f.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /tag/
  "v-744d024e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-744d024e" */
    "./index.html-e8a236b0.js"
  ), true ? ["assets/index.html-e8a236b0.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /article/
  "v-e52c881c": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-e52c881c" */
    "./index.html-68b18b5e.js"
  ), true ? ["assets/index.html-68b18b5e.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /star/
  "v-154dc4c4": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-154dc4c4" */
    "./index.html-4bd12602.js"
  ), true ? ["assets/index.html-4bd12602.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /timeline/
  "v-01560935": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-01560935" */
    "./index.html-9589f317.js"
  ), true ? ["assets/index.html-9589f317.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /category/%E7%94%BB%E5%86%8C/
  "v-605620d1": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-605620d1" */
    "./index.html-2724876e.js"
  ), true ? ["assets/index.html-2724876e.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /tag/%E7%BD%91%E7%AB%99/
  "v-efadec50": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-efadec50" */
    "./index.html-61f7f620.js"
  ), true ? ["assets/index.html-61f7f620.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /category/%E7%BD%91%E5%9D%80%E6%94%B6%E8%97%8F/
  "v-6efe3f6e": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-6efe3f6e" */
    "./index.html-dc9c7c2d.js"
  ), true ? ["assets/index.html-dc9c7c2d.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /tag/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/
  "v-05b88e01": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-05b88e01" */
    "./index.html-40b6b870.js"
  ), true ? ["assets/index.html-40b6b870.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /category/python/
  "v-78cbe7bb": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-78cbe7bb" */
    "./index.html-5a0fc97c.js"
  ), true ? ["assets/index.html-5a0fc97c.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /tag/python/
  "v-245f5676": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-245f5676" */
    "./index.html-3e4b245c.js"
  ), true ? ["assets/index.html-3e4b245c.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /category/%E6%8A%80%E6%9C%AF/
  "v-594730ea": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-594730ea" */
    "./index.html-f7bfca7c.js"
  ), true ? ["assets/index.html-f7bfca7c.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /tag/linux/
  "v-211f44ee": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-211f44ee" */
    "./index.html-9c965cef.js"
  ), true ? ["assets/index.html-9c965cef.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /category/vue/
  "v-65f6d381": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-65f6d381" */
    "./index.html-edf2bde5.js"
  ), true ? ["assets/index.html-edf2bde5.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /tag/%E5%89%8D%E7%AB%AF/
  "v-95f987f4": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-95f987f4" */
    "./index.html-8bbf21bc.js"
  ), true ? ["assets/index.html-8bbf21bc.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /category/%E5%B7%A5%E5%85%B7/
  "v-14145d44": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-14145d44" */
    "./index.html-57703d48.js"
  ), true ? ["assets/index.html-57703d48.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /tag/%E6%A1%86%E6%9E%B6/
  "v-f4d3cd72": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-f4d3cd72" */
    "./index.html-d0577a19.js"
  ), true ? ["assets/index.html-d0577a19.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /tag/gprc/
  "v-287e5507": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-287e5507" */
    "./index.html-016fe943.js"
  ), true ? ["assets/index.html-016fe943.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /tag/rpc/
  "v-b306a390": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-b306a390" */
    "./index.html-58a0bf4e.js"
  ), true ? ["assets/index.html-58a0bf4e.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /tag/mysql/
  "v-1bee38ca": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-1bee38ca" */
    "./index.html-454205b7.js"
  ), true ? ["assets/index.html-454205b7.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /tag/2to3/
  "v-259537bb": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-259537bb" */
    "./index.html-977f021f.js"
  ), true ? ["assets/index.html-977f021f.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /tag/polygon/
  "v-a2fdb2fa": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-a2fdb2fa" */
    "./index.html-2632df57.js"
  ), true ? ["assets/index.html-2632df57.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /tag/picgo/
  "v-1382eb6a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-1382eb6a" */
    "./index.html-2124f02e.js"
  ), true ? ["assets/index.html-2124f02e.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /tag/github/
  "v-132a6ac4": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-132a6ac4" */
    "./index.html-f1521459.js"
  ), true ? ["assets/index.html-f1521459.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /tag/sublime-text/
  "v-32b1cb5c": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-32b1cb5c" */
    "./index.html-b33eda6a.js"
  ), true ? ["assets/index.html-b33eda6a.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0)),
  // path: /tag/%E5%B7%A5%E5%85%B7%E8%AF%B4%E6%98%8E%E4%B9%A6/
  "v-1d73fa7a": defineAsyncComponent(() => __vitePreload(() => import(
    /* webpackChunkName: "v-1d73fa7a" */
    "./index.html-4e1e106b.js"
  ), true ? ["assets/index.html-4e1e106b.js","assets/plugin-vue_export-helper-cc2b3d55.js"] : void 0))
};
var layoutsSymbol = Symbol(
  ""
);
var pagesData = ref(pagesData$1);
var pageDataEmpty = readonly({
  key: "",
  path: "",
  title: "",
  lang: "",
  frontmatter: {},
  headers: []
});
var pageData = ref(pageDataEmpty);
var usePageData = () => pageData;
var pageFrontmatterSymbol = Symbol(
  ""
);
var usePageFrontmatter = () => {
  const pageFrontmatter = inject(pageFrontmatterSymbol);
  if (!pageFrontmatter) {
    throw new Error("usePageFrontmatter() is called without provider.");
  }
  return pageFrontmatter;
};
var pageHeadSymbol = Symbol(
  ""
);
var usePageHead = () => {
  const pageHead = inject(pageHeadSymbol);
  if (!pageHead) {
    throw new Error("usePageHead() is called without provider.");
  }
  return pageHead;
};
var pageHeadTitleSymbol = Symbol(
  ""
);
var pageLangSymbol = Symbol(
  ""
);
var usePageLang = () => {
  const pageLang = inject(pageLangSymbol);
  if (!pageLang) {
    throw new Error("usePageLang() is called without provider.");
  }
  return pageLang;
};
var pageLayoutSymbol = Symbol(
  ""
);
var usePageLayout = () => {
  const pageLayout = inject(pageLayoutSymbol);
  if (!pageLayout) {
    throw new Error("usePageLayout() is called without provider.");
  }
  return pageLayout;
};
var routeLocaleSymbol = Symbol(
  ""
);
var useRouteLocale = () => {
  const routeLocale = inject(routeLocaleSymbol);
  if (!routeLocale) {
    throw new Error("useRouteLocale() is called without provider.");
  }
  return routeLocale;
};
var siteData = ref(siteData$1);
var useSiteData = () => siteData;
var siteLocaleDataSymbol = Symbol(
  ""
);
var useSiteLocaleData = () => {
  const siteLocaleData = inject(siteLocaleDataSymbol);
  if (!siteLocaleData) {
    throw new Error("useSiteLocaleData() is called without provider.");
  }
  return siteLocaleData;
};
var updateHeadSymbol = Symbol(
  ""
);
var LAYOUT_NAME_DEFAULT = "Layout";
var LAYOUT_NAME_NOT_FOUND = "NotFound";
var resolvers = reactive({
  /**
   * Resolve layouts component map
   */
  resolveLayouts: (clientConfigs2) => clientConfigs2.reduce(
    (prev, item) => ({
      ...prev,
      ...item.layouts
    }),
    {}
  ),
  /**
   * Resolve page data according to page key
   */
  resolvePageData: async (pageKey) => {
    const pageDataResolver = pagesData.value[pageKey];
    const pageData2 = await (pageDataResolver == null ? void 0 : pageDataResolver());
    return pageData2 ?? pageDataEmpty;
  },
  /**
   * Resolve page frontmatter from page data
   */
  resolvePageFrontmatter: (pageData2) => pageData2.frontmatter,
  /**
   * Merge the head config in frontmatter and site locale
   *
   * Frontmatter should take priority over site locale
   */
  resolvePageHead: (headTitle, frontmatter, siteLocale) => {
    const description = isString(frontmatter.description) ? frontmatter.description : siteLocale.description;
    const head = [
      ...isArray$1(frontmatter.head) ? frontmatter.head : [],
      ...siteLocale.head,
      ["title", {}, headTitle],
      ["meta", { name: "description", content: description }]
    ];
    return dedupeHead(head);
  },
  /**
   * Resolve the content of page head title
   *
   * It would be used as the content of the `<title>` tag
   */
  resolvePageHeadTitle: (page2, siteLocale) => [page2.title, siteLocale.title].filter((item) => !!item).join(" | "),
  /**
   * Resolve page language from page data
   *
   * It would be used as the `lang` attribute of `<html>` tag
   */
  resolvePageLang: (page2) => page2.lang || "en",
  /**
   * Resolve layout component of current page
   */
  resolvePageLayout: (page2, layouts) => {
    let layoutName;
    if (page2.path) {
      const frontmatterLayout = page2.frontmatter.layout;
      if (isString(frontmatterLayout)) {
        layoutName = frontmatterLayout;
      } else {
        layoutName = LAYOUT_NAME_DEFAULT;
      }
    } else {
      layoutName = LAYOUT_NAME_NOT_FOUND;
    }
    return layouts[layoutName];
  },
  /**
   * Resolve locale path according to route path and locales config
   */
  resolveRouteLocale: (locales2, routePath) => resolveLocalePath(locales2, routePath),
  /**
   * Resolve site data for specific locale
   *
   * It would merge the locales fields to the root fields
   */
  resolveSiteLocaleData: (site, routeLocale) => ({
    ...site,
    ...site.locales[routeLocale]
  })
});
var ClientOnly = defineComponent({
  name: "ClientOnly",
  setup(_2, ctx) {
    const isMounted = ref(false);
    onMounted(() => {
      isMounted.value = true;
    });
    return () => {
      var _a2, _b2;
      return isMounted.value ? (_b2 = (_a2 = ctx.slots).default) == null ? void 0 : _b2.call(_a2) : null;
    };
  }
});
var Content = defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Content",
  props: {
    pageKey: {
      type: String,
      required: false,
      default: ""
    }
  },
  setup(props) {
    const page2 = usePageData();
    const pageComponent = computed(
      () => pagesComponents[props.pageKey || page2.value.key]
    );
    return () => pageComponent.value ? (
      // use page component
      h$4(pageComponent.value)
    ) : (
      // fallback content
      h$4(
        "div",
        "404 Not Found"
      )
    );
  }
});
var defineClientConfig = (clientConfig = {}) => clientConfig;
var withBase = (url) => {
  if (isLinkHttp(url))
    return url;
  return `${"/space/"}${removeLeadingSlash(url)}`;
};
const hopeInject = "";
const clientConfig0 = {};
function getDevtoolsGlobalHook() {
  return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function getTarget() {
  return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
}
const isProxyAvailable = typeof Proxy === "function";
const HOOK_SETUP = "devtools-plugin:setup";
const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
let supported;
let perf;
function isPerformanceSupported() {
  var _a2;
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else if (typeof global !== "undefined" && ((_a2 = global.perf_hooks) === null || _a2 === void 0 ? void 0 : _a2.performance)) {
    supported = true;
    perf = global.perf_hooks.performance;
  } else {
    supported = false;
  }
  return supported;
}
function now() {
  return isPerformanceSupported() ? perf.now() : Date.now();
}
class ApiProxy {
  constructor(plugin, hook) {
    this.target = null;
    this.targetQueue = [];
    this.onQueue = [];
    this.plugin = plugin;
    this.hook = hook;
    const defaultSettings = {};
    if (plugin.settings) {
      for (const id in plugin.settings) {
        const item = plugin.settings[id];
        defaultSettings[id] = item.defaultValue;
      }
    }
    const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
    let currentSettings = Object.assign({}, defaultSettings);
    try {
      const raw = localStorage.getItem(localSettingsSaveId);
      const data = JSON.parse(raw);
      Object.assign(currentSettings, data);
    } catch (e2) {
    }
    this.fallbacks = {
      getSettings() {
        return currentSettings;
      },
      setSettings(value) {
        try {
          localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
        } catch (e2) {
        }
        currentSettings = value;
      },
      now() {
        return now();
      }
    };
    if (hook) {
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
    }
    this.proxiedOn = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target.on[prop];
        } else {
          return (...args) => {
            this.onQueue.push({
              method: prop,
              args
            });
          };
        }
      }
    });
    this.proxiedTarget = new Proxy({}, {
      get: (_target, prop) => {
        if (this.target) {
          return this.target[prop];
        } else if (prop === "on") {
          return this.proxiedOn;
        } else if (Object.keys(this.fallbacks).includes(prop)) {
          return (...args) => {
            this.targetQueue.push({
              method: prop,
              args,
              resolve: () => {
              }
            });
            return this.fallbacks[prop](...args);
          };
        } else {
          return (...args) => {
            return new Promise((resolve2) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: resolve2
              });
            });
          };
        }
      }
    });
  }
  async setRealTarget(target) {
    this.target = target;
    for (const item of this.onQueue) {
      this.target.on[item.method](...item.args);
    }
    for (const item of this.targetQueue) {
      item.resolve(await this.target[item.method](...item.args));
    }
  }
}
function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
  const descriptor = pluginDescriptor;
  const target = getTarget();
  const hook = getDevtoolsGlobalHook();
  const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
  if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
    hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
  } else {
    const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
    const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
    list.push({
      pluginDescriptor: descriptor,
      setupFn,
      proxy
    });
    if (proxy)
      setupFn(proxy.proxiedTarget);
  }
}
/*!
  * vue-router v4.2.5
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const isBrowser = typeof window !== "undefined";
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module";
}
const assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop$1 = () => {
};
const isArray = Array.isArray;
function warn(msg) {
  const args = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + msg].concat(args));
}
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const hashPos = location2.indexOf("#");
  let searchPos = location2.indexOf("?");
  if (hashPos < searchPos && hashPos >= 0) {
    searchPos = -1;
  }
  if (searchPos > -1) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
    query = parseQuery2(searchString);
  }
  if (hashPos > -1) {
    path = path || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + (searchString && "?") + searchString + hash,
    path,
    query,
    hash
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base) {
  if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
    return pathname;
  return pathname.slice(base.length) || "/";
}
function isSameRouteLocation(stringifyQuery2, a2, b2) {
  const aLastIndex = a2.matched.length - 1;
  const bLastIndex = b2.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a2.matched[aLastIndex], b2.matched[bLastIndex]) && isSameRouteLocationParams(a2.params, b2.params) && stringifyQuery2(a2.query) === stringifyQuery2(b2.query) && a2.hash === b2.hash;
}
function isSameRouteRecord(a2, b2) {
  return (a2.aliasOf || a2) === (b2.aliasOf || b2);
}
function isSameRouteLocationParams(a2, b2) {
  if (Object.keys(a2).length !== Object.keys(b2).length)
    return false;
  for (const key in a2) {
    if (!isSameRouteLocationParamsValue(a2[key], b2[key]))
      return false;
  }
  return true;
}
function isSameRouteLocationParamsValue(a2, b2) {
  return isArray(a2) ? isEquivalentArray(a2, b2) : isArray(b2) ? isEquivalentArray(b2, a2) : a2 === b2;
}
function isEquivalentArray(a2, b2) {
  return isArray(b2) ? a2.length === b2.length && a2.every((value, i2) => value === b2[i2]) : a2.length === 1 && a2[0] === b2;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/"))
    return to;
  if (!from.startsWith("/")) {
    warn(`Cannot resolve a relative location without an absolute path. Trying to resolve "${to}" from "${from}". It should look like "/${from}".`);
    return to;
  }
  if (!to)
    return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  const lastToSegment = toSegments[toSegments.length - 1];
  if (lastToSegment === ".." || lastToSegment === ".") {
    toSegments.push("");
  }
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".")
      continue;
    if (segment === "..") {
      if (position > 1)
        position--;
    } else
      break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join("/");
}
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
function normalizeBase(base) {
  if (!base) {
    if (isBrowser) {
      const baseEl = document.querySelector("base");
      base = baseEl && baseEl.getAttribute("href") || "/";
      base = base.replace(/^\w+:\/\/[^\/]+/, "");
    } else {
      base = "/";
    }
  }
  if (base[0] !== "/" && base[0] !== "#")
    base = "/" + base;
  return removeTrailingSlash(base);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location2) {
  return base.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset2) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset2.behavior,
    left: elRect.left - docRect.left - (offset2.left || 0),
    top: elRect.top - docRect.top - (offset2.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    if (typeof position.el === "string") {
      if (!isIdSelector || !document.getElementById(position.el.slice(1))) {
        try {
          const foundEl = document.querySelector(position.el);
          if (isIdSelector && foundEl) {
            warn(`The selector "${position.el}" should be passed as "el: document.querySelector('${position.el}')" because it starts with "#".`);
            return;
          }
        } catch (err2) {
          warn(`The selector "${position.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
          return;
        }
      }
    }
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      warn(`Couldn't find element using selector "${position.el}" returned by scrollBehavior.`);
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else {
    scrollToOptions = position;
  }
  if ("scrollBehavior" in document.documentElement.style)
    window.scrollTo(scrollToOptions);
  else {
    window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.pageXOffset, scrollToOptions.top != null ? scrollToOptions.top : window.pageYOffset);
  }
}
function getScrollKey(path, delta) {
  const position = history.state ? history.state.position - delta : -1;
  return position + path;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(base, location2) {
  const { pathname, search, hash } = location2;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/")
      pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  const path = stripBase(pathname, base);
  return path + search + hash;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else {
      replace(to);
    }
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index2 = listeners.indexOf(callback);
      if (index2 > -1)
        listeners.splice(index2, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    const { history: history2 } = window;
    if (!history2.state)
      return;
    history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
  }
  function destroy() {
    for (const teardown of teardowns)
      teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("beforeunload", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("beforeunload", beforeUnloadListener, {
    passive: true
  });
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base) {
  const { history: history2, location: location2 } = window;
  const currentLocation = {
    value: createCurrentLocation(base, location2)
  };
  const historyState = { value: history2.state };
  if (!historyState.value) {
    changeLocation(currentLocation.value, {
      back: null,
      current: currentLocation.value,
      forward: null,
      // the length is off by one, we need to decrease it
      position: history2.length - 1,
      replaced: true,
      // don't add a scroll as the user may have an anchor, and we want
      // scrollBehavior to be triggered without a saved position
      scroll: null
    }, true);
  }
  function changeLocation(to, state, replace2) {
    const hashIndex = base.indexOf("#");
    const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
    try {
      history2[replace2 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err2) {
      {
        warn("Error with push/replace State", err2);
      }
      location2[replace2 ? "replace" : "assign"](url);
    }
  }
  function replace(to, data) {
    const state = assign({}, history2.state, buildState(
      historyState.value.back,
      // keep back and forward entries but override current position
      to,
      historyState.value.forward,
      true
    ), data, { position: historyState.value.position });
    changeLocation(to, state, true);
    currentLocation.value = to;
  }
  function push(to, data) {
    const currentState = assign(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      historyState.value,
      history2.state,
      {
        forward: to,
        scroll: computeScrollPosition()
      }
    );
    if (!history2.state) {
      warn(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`);
    }
    changeLocation(currentState.current, currentState, true);
    const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
    changeLocation(to, state, false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners)
      historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign({
    // it's overridden right after
    location: "",
    base,
    go,
    createHref: createHref.bind(null, base)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
const NavigationFailureSymbol = Symbol("navigation failure");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
const ErrorTypeMessages = {
  [
    1
    /* ErrorTypes.MATCHER_NOT_FOUND */
  ]({ location: location2, currentLocation }) {
    return `No match for
 ${JSON.stringify(location2)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
  },
  [
    2
    /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
  ]({ from, to }) {
    return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
  },
  [
    4
    /* ErrorTypes.NAVIGATION_ABORTED */
  ]({ from, to }) {
    return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
  },
  [
    8
    /* ErrorTypes.NAVIGATION_CANCELLED */
  ]({ from, to }) {
    return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
  },
  [
    16
    /* ErrorTypes.NAVIGATION_DUPLICATED */
  ]({ from, to }) {
    return `Avoided redundant navigation to current location: "${from.fullPath}".`;
  }
};
function createRouterError(type, params) {
  {
    return assign(new Error(ErrorTypeMessages[type](params)), {
      type,
      [NavigationFailureSymbol]: true
    }, params);
  }
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const propertiesToLog = ["params", "query", "hash"];
function stringifyRoute(to) {
  if (typeof to === "string")
    return to;
  if ("path" in to)
    return to.path;
  const location2 = {};
  for (const key of propertiesToLog) {
    if (key in to)
      location2[key] = to[key];
  }
  return JSON.stringify(location2, null, 2);
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [
      90
      /* PathScore.Root */
    ];
    if (options.strict && !segment.length)
      pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
      if (token.type === 0) {
        if (!tokenIndex)
          pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += 40;
      } else if (token.type === 1) {
        const { value, repeatable, optional, regexp } = token;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re2 !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10;
          try {
            new RegExp(`(${re2})`);
          } catch (err2) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err2.message);
          }
        }
        let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
        if (!tokenIndex)
          subPattern = // avoid an optional / if there are more segments e.g. /:p?-static
          // or /:p?-:p2
          optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional)
          subPattern += "?";
        pattern += subPattern;
        subSegmentScore += 20;
        if (optional)
          subSegmentScore += -8;
        if (repeatable)
          subSegmentScore += -20;
        if (re2 === ".*")
          subSegmentScore += -50;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i2 = score.length - 1;
    score[i2][score[i2].length - 1] += 0.7000000000000001;
  }
  if (!options.strict)
    pattern += "/?";
  if (options.end)
    pattern += "$";
  else if (options.strict)
    pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse(path) {
    const match = path.match(re);
    const params = {};
    if (!match)
      return null;
    for (let i2 = 1; i2 < match.length; i2++) {
      const value = match[i2] || "";
      const key = keys[i2 - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/"))
        path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) {
        if (token.type === 0) {
          path += token.value;
        } else if (token.type === 1) {
          const { value, repeatable, optional } = token;
          const param = value in params ? params[value] : "";
          if (isArray(param) && !repeatable) {
            throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          }
          const text = isArray(param) ? param.join("/") : param;
          if (!text) {
            if (optional) {
              if (segment.length < 2) {
                if (path.endsWith("/"))
                  path = path.slice(0, -1);
                else
                  avoidDuplicatedSlash = true;
              }
            } else
              throw new Error(`Missing required param "${value}"`);
          }
          path += text;
        }
      }
    }
    return path || "/";
  }
  return {
    re,
    score,
    keys,
    parse,
    stringify
  };
}
function compareScoreArray(a2, b2) {
  let i2 = 0;
  while (i2 < a2.length && i2 < b2.length) {
    const diff = b2[i2] - a2[i2];
    if (diff)
      return diff;
    i2++;
  }
  if (a2.length < b2.length) {
    return a2.length === 1 && a2[0] === 40 + 40 ? -1 : 1;
  } else if (a2.length > b2.length) {
    return b2.length === 1 && b2[0] === 40 + 40 ? 1 : -1;
  }
  return 0;
}
function comparePathParserScore(a2, b2) {
  let i2 = 0;
  const aScore = a2.score;
  const bScore = b2.score;
  while (i2 < aScore.length && i2 < bScore.length) {
    const comp = compareScoreArray(aScore[i2], bScore[i2]);
    if (comp)
      return comp;
    i2++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore))
      return 1;
    if (isLastScoreNegative(bScore))
      return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const ROOT_TOKEN = {
  type: 0,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path)
    return [[]];
  if (path === "/")
    return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) {
    throw new Error(
      `Route paths should start with a "/": "${path}" should be "/${path}".`
    );
  }
  function crash(message2) {
    throw new Error(`ERR (${state})/"${buffer2}": ${message2}`);
  }
  let state = 0;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment)
      tokens.push(segment);
    segment = [];
  }
  let i2 = 0;
  let char;
  let buffer2 = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer2)
      return;
    if (state === 0) {
      segment.push({
        type: 0,
        value: buffer2
      });
    } else if (state === 1 || state === 2 || state === 3) {
      if (segment.length > 1 && (char === "*" || char === "+"))
        crash(`A repeatable param (${buffer2}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: 1,
        value: buffer2,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else {
      crash("Invalid state to consume buffer");
    }
    buffer2 = "";
  }
  function addCharToBuffer() {
    buffer2 += char;
  }
  while (i2 < path.length) {
    char = path[i2++];
    if (char === "\\" && state !== 2) {
      previousState = state;
      state = 4;
      continue;
    }
    switch (state) {
      case 0:
        if (char === "/") {
          if (buffer2) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = 1;
        } else {
          addCharToBuffer();
        }
        break;
      case 4:
        addCharToBuffer();
        state = previousState;
        break;
      case 1:
        if (char === "(") {
          state = 2;
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i2--;
        }
        break;
      case 2:
        if (char === ")") {
          if (customRe[customRe.length - 1] == "\\")
            customRe = customRe.slice(0, -1) + char;
          else
            state = 3;
        } else {
          customRe += char;
        }
        break;
      case 3:
        consumeBuffer();
        state = 0;
        if (char !== "*" && char !== "?" && char !== "+")
          i2--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === 2)
    crash(`Unfinished custom RegExp for param "${buffer2}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  {
    const existingKeys = /* @__PURE__ */ new Set();
    for (const key of parser.keys) {
      if (existingKeys.has(key.name))
        warn(`Found duplicated params with name "${key.name}" for path "${record.path}". Only the last one will be available on "$route.params".`);
      existingKeys.add(key.name);
    }
  }
  const matcher = assign(parser, {
    record,
    parent,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    {
      checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent);
    }
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [
      mainNormalizedRecord
    ];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) {
        normalizedRecords.push(assign({}, mainNormalizedRecord, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
          path: alias,
          // we might be the child of an alias
          aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      if (normalizedRecord.path === "*") {
        throw new Error('Catch all routes ("*") must now be defined using a param with a custom regexp.\nSee more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.');
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (parent && path[0] === "/")
        checkMissingParamsInAbsolutePath(matcher, parent);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
        {
          checkSameParams(originalRecord, matcher);
        }
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher)
          originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher))
          removeRoute(record.name);
      }
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i2 = 0; i2 < children.length; i2++) {
          addRoute(children[i2], matcher, originalRecord && originalRecord.children[i2]);
        }
      }
      originalRecord = originalRecord || matcher;
      if (matcher.record.components && Object.keys(matcher.record.components).length || matcher.record.name || matcher.record.redirect) {
        insertMatcher(matcher);
      }
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop$1;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index2 = matchers.indexOf(matcherRef);
      if (index2 > -1) {
        matchers.splice(index2, 1);
        if (matcherRef.record.name)
          matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    let i2 = 0;
    while (i2 < matchers.length && comparePathParserScore(matcher, matchers[i2]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (matcher.record.path !== matchers[i2].record.path || !isRecordChildOf(matcher, matchers[i2])))
      i2++;
    matchers.splice(i2, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher);
  }
  function resolve2(location2, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher)
        throw createRouterError(1, {
          location: location2
        });
      {
        const invalidParams = Object.keys(location2.params || {}).filter((paramName) => !matcher.keys.find((k2) => k2.name === paramName));
        if (invalidParams.length) {
          warn(`Discarded invalid param(s) "${invalidParams.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
        }
      }
      name = matcher.record.name;
      params = assign(
        // paramsFromLocation is a new object
        paramsFromLocation(
          currentLocation.params,
          // only keep params that exist in the resolved location
          // TODO: only keep optional params coming from a parent record
          matcher.keys.filter((k2) => !k2.optional).map((k2) => k2.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        location2.params && paramsFromLocation(location2.params, matcher.keys.map((k2) => k2.name))
      );
      path = matcher.stringify(params);
    } else if ("path" in location2) {
      path = location2.path;
      if (!path.startsWith("/")) {
        warn(`The Matcher cannot resolve relative paths but received "${path}". Unless you directly called \`matcher.resolve("${path}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`);
      }
      matcher = matchers.find((m2) => m2.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m2) => m2.re.test(currentLocation.path));
      if (!matcher)
        throw createRouterError(1, {
          location: location2,
          currentLocation
        });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location2.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes.forEach((route) => addRoute(route));
  return { addRoute, resolve: resolve2, removeRoute, getRoutes, getRecordMatcher };
}
function paramsFromLocation(params, keys) {
  const newParams = {};
  for (const key of keys) {
    if (key in params)
      newParams[key] = params[key];
  }
  return newParams;
}
function normalizeRouteRecord(record) {
  return {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: void 0,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) {
    propsObject.default = props;
  } else {
    for (const name in record.components)
      propsObject[name] = typeof props === "object" ? props[name] : props;
  }
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf)
      return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) {
    options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  }
  return options;
}
function isSameParam(a2, b2) {
  return a2.name === b2.name && a2.optional === b2.optional && a2.repeatable === b2.repeatable;
}
function checkSameParams(a2, b2) {
  for (const key of a2.keys) {
    if (!key.optional && !b2.keys.find(isSameParam.bind(null, key)))
      return warn(`Alias "${b2.record.path}" and the original record: "${a2.record.path}" must have the exact same param named "${key.name}"`);
  }
  for (const key of b2.keys) {
    if (!key.optional && !a2.keys.find(isSameParam.bind(null, key)))
      return warn(`Alias "${b2.record.path}" and the original record: "${a2.record.path}" must have the exact same param named "${key.name}"`);
  }
}
function checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent) {
  if (parent && parent.record.name && !mainNormalizedRecord.name && !mainNormalizedRecord.path) {
    warn(`The route named "${String(parent.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
  }
}
function checkMissingParamsInAbsolutePath(record, parent) {
  for (const key of parent.keys) {
    if (!record.keys.find(isSameParam.bind(null, key)))
      return warn(`Absolute path "${record.record.path}" must have the exact same param named "${key.name}" as its parent "${parent.record.path}".`);
  }
}
function isRecordChildOf(record, parent) {
  return parent.children.some((child) => child === record || isRecordChildOf(record, child));
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  try {
    return decodeURIComponent("" + text);
  } catch (err2) {
    warn(`Error decoding "${text}". Using original value`);
  }
  return "" + text;
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?")
    return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i2 = 0; i2 < searchParams.length; ++i2) {
    const searchParam = searchParams[i2].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) {
        search += (search.length ? "&" : "") + key;
      }
      continue;
    }
    const values = isArray(value) ? value.map((v2) => v2 && encodeQueryValue(v2)) : [value && encodeQueryValue(value)];
    values.forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null)
          search += "=" + value2;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) {
      normalizedQuery[key] = isArray(value) ? value.map((v2) => v2 == null ? null : "" + v2) : value == null ? value : "" + value;
    }
  }
  return normalizedQuery;
}
const matchedRouteKey = Symbol("router view location matched");
const viewDepthKey = Symbol("router view depth");
const routerKey = Symbol("router");
const routeLocationKey = Symbol("route location");
const routerViewLocationKey = Symbol("router view location");
function useCallbacks() {
  let handlers2 = [];
  function add2(handler) {
    handlers2.push(handler);
    return () => {
      const i2 = handlers2.indexOf(handler);
      if (i2 > -1)
        handlers2.splice(i2, 1);
    };
  }
  function reset() {
    handlers2 = [];
  }
  return {
    add: add2,
    list: () => handlers2.slice(),
    reset
  };
}
function guardToPromiseFn(guard, to, from, record, name) {
  const enterCallbackArray = record && // name is defined if record is because of the function overload
  (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve2, reject) => {
    const next = (valid) => {
      if (valid === false) {
        reject(createRouterError(4, {
          from,
          to
        }));
      } else if (valid instanceof Error) {
        reject(valid);
      } else if (isRouteLocation(valid)) {
        reject(createRouterError(2, {
          from: to,
          to: valid
        }));
      } else {
        if (enterCallbackArray && // since enterCallbackArray is truthy, both record and name also are
        record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") {
          enterCallbackArray.push(valid);
        }
        resolve2();
      }
    };
    const guardReturn = guard.call(record && record.instances[name], to, from, canOnlyBeCalledOnce(next, to, from));
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3)
      guardCall = guardCall.then(next);
    if (guard.length > 2) {
      const message2 = `The "next" callback was never called inside of ${guard.name ? '"' + guard.name + '"' : ""}:
${guard.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof guardReturn === "object" && "then" in guardReturn) {
        guardCall = guardCall.then((resolvedValue) => {
          if (!next._called) {
            warn(message2);
            return Promise.reject(new Error("Invalid navigation guard"));
          }
          return resolvedValue;
        });
      } else if (guardReturn !== void 0) {
        if (!next._called) {
          warn(message2);
          reject(new Error("Invalid navigation guard"));
          return;
        }
      }
    }
    guardCall.catch((err2) => reject(err2));
  });
}
function canOnlyBeCalledOnce(next, to, from) {
  let called = 0;
  return function() {
    if (called++ === 1)
      warn(`The "next" callback was called more than once in one navigation guard when going from "${from.fullPath}" to "${to.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`);
    next._called = true;
    if (called === 1)
      next.apply(null, arguments);
  };
}
function extractComponentsGuards(matched, guardType, to, from) {
  const guards = [];
  for (const record of matched) {
    if (!record.components && !record.children.length) {
      warn(`Record with path "${record.path}" is either missing a "component(s)" or "children" property.`);
    }
    for (const name in record.components) {
      let rawComponent = record.components[name];
      {
        if (!rawComponent || typeof rawComponent !== "object" && typeof rawComponent !== "function") {
          warn(`Component "${name}" in record with path "${record.path}" is not a valid component. Received "${String(rawComponent)}".`);
          throw new Error("Invalid route component");
        } else if ("then" in rawComponent) {
          warn(`Component "${name}" in record with path "${record.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const promise2 = rawComponent;
          rawComponent = () => promise2;
        } else if (rawComponent.__asyncLoader && // warn only once per component
        !rawComponent.__warnedDefineAsync) {
          rawComponent.__warnedDefineAsync = true;
          warn(`Component "${name}" in record with path "${record.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`);
        }
      }
      if (guardType !== "beforeRouteEnter" && !record.instances[name])
        continue;
      if (isRouteComponent(rawComponent)) {
        const options = rawComponent.__vccOpts || rawComponent;
        const guard = options[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
      } else {
        let componentPromise = rawComponent();
        if (!("catch" in componentPromise)) {
          warn(`Component "${name}" in record with path "${record.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`);
          componentPromise = Promise.resolve(componentPromise);
        }
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved)
            return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.components[name] = resolvedComponent;
          const options = resolvedComponent.__vccOpts || resolvedComponent;
          const guard = options[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name)();
        }));
      }
    }
  }
  return guards;
}
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function useLink(props) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  const route = computed(() => router.resolve(unref(props.to)));
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length)
      return -1;
    const index2 = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index2 > -1)
      return index2;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return (
      // we are dealing with nested routes
      length > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      getOriginalPath(routeMatched) === parentRecordPath && // avoid comparing the child with its parent
      currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index2
    );
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e2 = {}) {
    if (guardEvent(e2)) {
      return router[unref(props.replace) ? "replace" : "push"](
        unref(props.to)
        // avoid uncaught errors are they are logged anyway
      ).catch(noop$1);
    }
    return Promise.resolve();
  }
  if (isBrowser) {
    const instance = getCurrentInstance();
    if (instance) {
      const linkContextDevtools = {
        route: route.value,
        isActive: isActive.value,
        isExactActive: isExactActive.value
      };
      instance.__vrl_devtools = instance.__vrl_devtools || [];
      instance.__vrl_devtools.push(linkContextDevtools);
      watchEffect(() => {
        linkContextDevtools.route = route.value;
        linkContextDevtools.isActive = isActive.value;
        linkContextDevtools.isExactActive = isExactActive.value;
      }, { flush: "post" });
    }
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && slots.default(link);
      return props.custom ? children : h$4("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e2) {
  if (e2.metaKey || e2.altKey || e2.ctrlKey || e2.shiftKey)
    return;
  if (e2.defaultPrevented)
    return;
  if (e2.button !== void 0 && e2.button !== 0)
    return;
  if (e2.currentTarget && e2.currentTarget.getAttribute) {
    const target = e2.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target))
      return;
  }
  if (e2.preventDefault)
    e2.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i2) => value !== outerValue[i2]))
        return false;
    }
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    warnDeprecatedUsage();
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
        initialDepth++;
      }
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) {
            to.leaveGuards = from.leaveGuards;
          }
          if (!to.updateGuards.size) {
            to.updateGuards = from.updateGuards;
          }
        }
      }
      if (instance && to && // if there is no instance but to and from are the same this might be
      // the first visit
      (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
        (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
      }
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route });
      }
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h$4(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      if (isBrowser && component.ref) {
        const info = {
          depth: depth.value,
          name: matchedRoute.name,
          path: matchedRoute.path,
          meta: matchedRoute.meta
        };
        const internalInstances = isArray(component.ref) ? component.ref.map((r2) => r2.i) : [component.ref.i];
        internalInstances.forEach((instance) => {
          instance.__vrv_devtools = info;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        normalizeSlot(slots.default, { Component: component, route }) || component
      );
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot)
    return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function warnDeprecatedUsage() {
  const instance = getCurrentInstance();
  const parentName = instance.parent && instance.parent.type.name;
  const parentSubTreeType = instance.parent && instance.parent.subTree && instance.parent.subTree.type;
  if (parentName && (parentName === "KeepAlive" || parentName.includes("Transition")) && typeof parentSubTreeType === "object" && parentSubTreeType.name === "RouterView") {
    const comp = parentName === "KeepAlive" ? "keep-alive" : "transition";
    warn(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${comp}>
    <component :is="Component" />
  </${comp}>
</router-view>`);
  }
}
function formatRouteLocation(routeLocation, tooltip) {
  const copy = assign({}, routeLocation, {
    // remove variables that can contain vue instances
    matched: routeLocation.matched.map((matched) => omit(matched, ["instances", "children", "aliasOf"]))
  });
  return {
    _custom: {
      type: null,
      readOnly: true,
      display: routeLocation.fullPath,
      tooltip,
      value: copy
    }
  };
}
function formatDisplay(display) {
  return {
    _custom: {
      display
    }
  };
}
let routerId = 0;
function addDevtools(app, router, matcher) {
  if (router.__hasDevtools)
    return;
  router.__hasDevtools = true;
  const id = routerId++;
  setupDevtoolsPlugin({
    id: "org.vuejs.router" + (id ? "." + id : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app
  }, (api) => {
    if (typeof api.now !== "function") {
      console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
    }
    api.on.inspectComponent((payload, ctx) => {
      if (payload.instanceData) {
        payload.instanceData.state.push({
          type: "Routing",
          key: "$route",
          editable: false,
          value: formatRouteLocation(router.currentRoute.value, "Current Route")
        });
      }
    });
    api.on.visitComponentTree(({ treeNode: node, componentInstance }) => {
      if (componentInstance.__vrv_devtools) {
        const info = componentInstance.__vrv_devtools;
        node.tags.push({
          label: (info.name ? `${info.name.toString()}: ` : "") + info.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: PINK_500
        });
      }
      if (isArray(componentInstance.__vrl_devtools)) {
        componentInstance.__devtoolsApi = api;
        componentInstance.__vrl_devtools.forEach((devtoolsData) => {
          let backgroundColor = ORANGE_400;
          let tooltip = "";
          if (devtoolsData.isExactActive) {
            backgroundColor = LIME_500;
            tooltip = "This is exactly active";
          } else if (devtoolsData.isActive) {
            backgroundColor = BLUE_600;
            tooltip = "This link is active";
          }
          node.tags.push({
            label: devtoolsData.route.path,
            textColor: 0,
            tooltip,
            backgroundColor
          });
        });
      }
    });
    watch(router.currentRoute, () => {
      refreshRoutesView();
      api.notifyComponentUpdate();
      api.sendInspectorTree(routerInspectorId);
      api.sendInspectorState(routerInspectorId);
    });
    const navigationsLayerId = "router:navigations:" + id;
    api.addTimelineLayer({
      id: navigationsLayerId,
      label: `Router${id ? " " + id : ""} Navigations`,
      color: 4237508
    });
    router.onError((error, to) => {
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: "Error during Navigation",
          subtitle: to.fullPath,
          logType: "error",
          time: api.now(),
          data: { error },
          groupId: to.meta.__navigationId
        }
      });
    });
    let navigationId = 0;
    router.beforeEach((to, from) => {
      const data = {
        guard: formatDisplay("beforeEach"),
        from: formatRouteLocation(from, "Current Location during this navigation"),
        to: formatRouteLocation(to, "Target location")
      };
      Object.defineProperty(to.meta, "__navigationId", {
        value: navigationId++
      });
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          time: api.now(),
          title: "Start of navigation",
          subtitle: to.fullPath,
          data,
          groupId: to.meta.__navigationId
        }
      });
    });
    router.afterEach((to, from, failure) => {
      const data = {
        guard: formatDisplay("afterEach")
      };
      if (failure) {
        data.failure = {
          _custom: {
            type: Error,
            readOnly: true,
            display: failure ? failure.message : "",
            tooltip: "Navigation Failure",
            value: failure
          }
        };
        data.status = formatDisplay("❌");
      } else {
        data.status = formatDisplay("✅");
      }
      data.from = formatRouteLocation(from, "Current Location during this navigation");
      data.to = formatRouteLocation(to, "Target location");
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: "End of navigation",
          subtitle: to.fullPath,
          time: api.now(),
          data,
          logType: failure ? "warning" : "default",
          groupId: to.meta.__navigationId
        }
      });
    });
    const routerInspectorId = "router-inspector:" + id;
    api.addInspector({
      id: routerInspectorId,
      label: "Routes" + (id ? " " + id : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function refreshRoutesView() {
      if (!activeRoutesPayload)
        return;
      const payload = activeRoutesPayload;
      let routes = matcher.getRoutes().filter((route) => !route.parent || // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !route.parent.record.components);
      routes.forEach(resetMatchStateOnRouteRecord);
      if (payload.filter) {
        routes = routes.filter((route) => (
          // save matches state based on the payload
          isRouteMatching(route, payload.filter.toLowerCase())
        ));
      }
      routes.forEach((route) => markRouteRecordActive(route, router.currentRoute.value));
      payload.rootNodes = routes.map(formatRouteRecordForInspector);
    }
    let activeRoutesPayload;
    api.on.getInspectorTree((payload) => {
      activeRoutesPayload = payload;
      if (payload.app === app && payload.inspectorId === routerInspectorId) {
        refreshRoutesView();
      }
    });
    api.on.getInspectorState((payload) => {
      if (payload.app === app && payload.inspectorId === routerInspectorId) {
        const routes = matcher.getRoutes();
        const route = routes.find((route2) => route2.record.__vd_id === payload.nodeId);
        if (route) {
          payload.state = {
            options: formatRouteRecordMatcherForStateInspector(route)
          };
        }
      }
    });
    api.sendInspectorTree(routerInspectorId);
    api.sendInspectorState(routerInspectorId);
  });
}
function modifierForKey(key) {
  if (key.optional) {
    return key.repeatable ? "*" : "?";
  } else {
    return key.repeatable ? "+" : "";
  }
}
function formatRouteRecordMatcherForStateInspector(route) {
  const { record } = route;
  const fields = [
    { editable: false, key: "path", value: record.path }
  ];
  if (record.name != null) {
    fields.push({
      editable: false,
      key: "name",
      value: record.name
    });
  }
  fields.push({ editable: false, key: "regexp", value: route.re });
  if (route.keys.length) {
    fields.push({
      editable: false,
      key: "keys",
      value: {
        _custom: {
          type: null,
          readOnly: true,
          display: route.keys.map((key) => `${key.name}${modifierForKey(key)}`).join(" "),
          tooltip: "Param keys",
          value: route.keys
        }
      }
    });
  }
  if (record.redirect != null) {
    fields.push({
      editable: false,
      key: "redirect",
      value: record.redirect
    });
  }
  if (route.alias.length) {
    fields.push({
      editable: false,
      key: "aliases",
      value: route.alias.map((alias) => alias.record.path)
    });
  }
  if (Object.keys(route.record.meta).length) {
    fields.push({
      editable: false,
      key: "meta",
      value: route.record.meta
    });
  }
  fields.push({
    key: "score",
    editable: false,
    value: {
      _custom: {
        type: null,
        readOnly: true,
        display: route.score.map((score) => score.join(", ")).join(" | "),
        tooltip: "Score used to sort routes",
        value: route.score
      }
    }
  });
  return fields;
}
const PINK_500 = 15485081;
const BLUE_600 = 2450411;
const LIME_500 = 8702998;
const CYAN_400 = 2282478;
const ORANGE_400 = 16486972;
const DARK = 6710886;
function formatRouteRecordForInspector(route) {
  const tags = [];
  const { record } = route;
  if (record.name != null) {
    tags.push({
      label: String(record.name),
      textColor: 0,
      backgroundColor: CYAN_400
    });
  }
  if (record.aliasOf) {
    tags.push({
      label: "alias",
      textColor: 0,
      backgroundColor: ORANGE_400
    });
  }
  if (route.__vd_match) {
    tags.push({
      label: "matches",
      textColor: 0,
      backgroundColor: PINK_500
    });
  }
  if (route.__vd_exactActive) {
    tags.push({
      label: "exact",
      textColor: 0,
      backgroundColor: LIME_500
    });
  }
  if (route.__vd_active) {
    tags.push({
      label: "active",
      textColor: 0,
      backgroundColor: BLUE_600
    });
  }
  if (record.redirect) {
    tags.push({
      label: typeof record.redirect === "string" ? `redirect: ${record.redirect}` : "redirects",
      textColor: 16777215,
      backgroundColor: DARK
    });
  }
  let id = record.__vd_id;
  if (id == null) {
    id = String(routeRecordId++);
    record.__vd_id = id;
  }
  return {
    id,
    label: record.path,
    tags,
    children: route.children.map(formatRouteRecordForInspector)
  };
}
let routeRecordId = 0;
const EXTRACT_REGEXP_RE = /^\/(.*)\/([a-z]*)$/;
function markRouteRecordActive(route, currentRoute) {
  const isExactActive = currentRoute.matched.length && isSameRouteRecord(currentRoute.matched[currentRoute.matched.length - 1], route.record);
  route.__vd_exactActive = route.__vd_active = isExactActive;
  if (!isExactActive) {
    route.__vd_active = currentRoute.matched.some((match) => isSameRouteRecord(match, route.record));
  }
  route.children.forEach((childRoute) => markRouteRecordActive(childRoute, currentRoute));
}
function resetMatchStateOnRouteRecord(route) {
  route.__vd_match = false;
  route.children.forEach(resetMatchStateOnRouteRecord);
}
function isRouteMatching(route, filter) {
  const found = String(route.re).match(EXTRACT_REGEXP_RE);
  route.__vd_match = false;
  if (!found || found.length < 3) {
    return false;
  }
  const nonEndingRE = new RegExp(found[1].replace(/\$$/, ""), found[2]);
  if (nonEndingRE.test(filter)) {
    route.children.forEach((child) => isRouteMatching(child, filter));
    if (route.record.path !== "/" || filter === "/") {
      route.__vd_match = route.re.test(filter);
      return true;
    }
    return false;
  }
  const path = route.record.path.toLowerCase();
  const decodedPath = decode(path);
  if (!filter.startsWith("/") && (decodedPath.includes(filter) || path.includes(filter)))
    return true;
  if (decodedPath.startsWith(filter) || path.startsWith(filter))
    return true;
  if (route.record.name && String(route.record.name).includes(filter))
    return true;
  return route.children.some((child) => isRouteMatching(child, filter));
}
function omit(obj, keys) {
  const ret = {};
  for (const key in obj) {
    if (!keys.includes(key)) {
      ret[key] = obj[key];
    }
  }
  return ret;
}
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  if (!routerHistory)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = (
    // @ts-expect-error: intentionally avoid the type check
    applyToParams.bind(null, decode)
  );
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    } else {
      warn(`Cannot remove non-existent route "${String(name)}"`);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve2(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href2 = routerHistory.createHref(locationNormalized.fullPath);
      {
        if (href2.startsWith("//"))
          warn(`Location "${rawLocation}" resolved to "${href2}". A resolved location cannot start with multiple slashes.`);
        else if (!matchedRoute2.matched.length) {
          warn(`No match found for location with path "${rawLocation}"`);
        }
      }
      return assign(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href2
      });
    }
    let matcherLocation;
    if ("path" in rawLocation) {
      if ("params" in rawLocation && !("name" in rawLocation) && // @ts-expect-error: the type is never
      Object.keys(rawLocation.params).length) {
        warn(`Path "${rawLocation.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`);
      }
      matcherLocation = assign({}, rawLocation, {
        path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
      });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      matcherLocation = assign({}, rawLocation, {
        params: encodeParams(targetParams)
      });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    if (hash && !hash.startsWith("#")) {
      warn(`A \`hash\` should always start with the character "#". Replace "${hash}" with "#${hash}".`);
    }
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    {
      if (href.startsWith("//")) {
        warn(`Location "${rawLocation}" resolved to "${href}". A resolved location cannot start with multiple slashes.`);
      } else if (!matchedRoute.matched.length) {
        warn(`No match found for location with path "${"path" in rawLocation ? rawLocation.path : rawLocation}"`);
      }
    }
    return assign({
      fullPath,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
      )
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return createRouterError(8, {
        from,
        to
      });
    }
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : (
          // force empty params
          { path: newTargetLocation }
        );
        newTargetLocation.params = {};
      }
      if (!("path" in newTargetLocation) && !("name" in newTargetLocation)) {
        warn(`Invalid redirect found:
${JSON.stringify(newTargetLocation, null, 2)}
 when navigating to "${to.fullPath}". A redirect must contain a name or path. This will break in production.`);
        throw new Error("Invalid redirect");
      }
      return assign({
        query: to.query,
        hash: to.hash,
        // avoid transferring params if the redirect has a path
        params: "path" in newTargetLocation ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve2(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace2 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect)
      return pushWithRedirect(
        assign(locationAsObject(shouldRedirect), {
          state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
          force,
          replace: replace2
        }),
        // keep original redirectedFrom if it exists
        redirectedFrom || targetLocation
      );
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(16, { to: toLocation, from });
      handleScroll(
        from,
        from,
        // this is a push, the only way for it to be triggered from a
        // history.listen is with a redirect, which makes it become a push
        true,
        // This cannot be the first navigation because the initial location
        // cannot be manually navigated to
        false
      );
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? (
      // navigation redirects still mark the router as ready
      isNavigationFailure(
        error,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? error : markAsReady(error)
    ) : (
      // reject any unknown error
      triggerError(error, toLocation, from)
    )).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(
          failure2,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          if (
            // we are redirecting to the same location we were already at
            isSameRouteLocation(stringifyQuery$1, resolve2(failure2.to), toLocation) && // and we have done it a couple of times
            redirectedFrom && // @ts-expect-error: added only in dev
            (redirectedFrom._count = redirectedFrom._count ? (
              // @ts-expect-error
              redirectedFrom._count + 1
            ) : 1) > 30
          ) {
            warn(`Detected a possibly infinite redirection in a navigation guard when going from "${from.fullPath}" to "${toLocation.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`);
            return Promise.reject(new Error("Infinite redirect in navigation guard"));
          }
          return pushWithRedirect(
            // keep options
            assign({
              // preserve an existing replacement but allow the redirect to override it
              replace: replace2
            }, locationAsObject(failure2.to), {
              state: typeof failure2.to === "object" ? assign({}, data, failure2.to.state) : data,
              force
            }),
            // preserve the original redirectedFrom if any
            redirectedFrom || toLocation
          );
        }
      } else {
        failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
      }
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function runWithContext(fn) {
    const app = installedApps.values().next().value;
    return app && typeof app.runWithContext === "function" ? app.runWithContext(fn) : fn();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) {
      record.leaveGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) {
        record.updateGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of enteringRecords) {
        if (record.beforeEnter) {
          if (isArray(record.beforeEnter)) {
            for (const beforeEnter of record.beforeEnter)
              guards.push(guardToPromiseFn(beforeEnter, to, from));
          } else {
            guards.push(guardToPromiseFn(record.beforeEnter, to, from));
          }
        }
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err2) => isNavigationFailure(
      err2,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? err2 : Promise.reject(err2));
  }
  function triggerAfterEach(to, from, failure) {
    afterGuards.list().forEach((guard) => runWithContext(() => guard(to, from, failure)));
  }
  function finalizeNavigation(toLocation, from, isPush, replace2, data) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error)
      return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) {
      if (replace2 || isFirstNavigation)
        routerHistory.replace(toLocation.fullPath, assign({
          scroll: isFirstNavigation && state && state.scroll
        }, data));
      else
        routerHistory.push(toLocation.fullPath, data);
    }
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener)
      return;
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      if (!router.listening)
        return;
      const toLocation = resolve2(to);
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop$1);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) {
        saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      }
      navigate(toLocation, from).catch((error) => {
        if (isNavigationFailure(
          error,
          4 | 8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        )) {
          return error;
        }
        if (isNavigationFailure(
          error,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        )) {
          pushWithRedirect(
            error.to,
            toLocation
            // avoid an uncaught rejection, let push call triggerError
          ).then((failure) => {
            if (isNavigationFailure(
              failure,
              4 | 16
              /* ErrorTypes.NAVIGATION_DUPLICATED */
            ) && !info.delta && info.type === NavigationType.pop) {
              routerHistory.go(-1, false);
            }
          }).catch(noop$1);
          return Promise.reject();
        }
        if (info.delta) {
          routerHistory.go(-info.delta, false);
        }
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(
          // after navigation, all matched components are resolved
          toLocation,
          from,
          false
        );
        if (failure) {
          if (info.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
          // entry while a different route is displayed
          !isNavigationFailure(
            failure,
            8
            /* ErrorTypes.NAVIGATION_CANCELLED */
          )) {
            routerHistory.go(-info.delta, false);
          } else if (info.type === NavigationType.pop && isNavigationFailure(
            failure,
            4 | 16
            /* ErrorTypes.NAVIGATION_DUPLICATED */
          )) {
            routerHistory.go(-1, false);
          }
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop$1);
    });
  }
  let readyHandlers = useCallbacks();
  let errorListeners = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorListeners.list();
    if (list.length) {
      list.forEach((handler) => handler(error, to, from));
    } else {
      {
        warn("uncaught error during route navigation:");
      }
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
      return Promise.resolve();
    return new Promise((resolve3, reject) => {
      readyHandlers.add([resolve3, reject]);
    });
  }
  function markAsReady(err2) {
    if (!ready) {
      ready = !err2;
      setupListeners();
      readyHandlers.list().forEach(([resolve3, reject]) => err2 ? reject(err2) : resolve3());
      readyHandlers.reset();
    }
    return err2;
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior)
      return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err2) => triggerError(err2, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    hasRoute,
    getRoutes,
    resolve: resolve2,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorListeners.add,
    isReady,
    install(app) {
      const router2 = this;
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
      app.config.globalProperties.$router = router2;
      Object.defineProperty(app.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err2) => {
          warn("Unexpected error when starting the router:", err2);
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        Object.defineProperty(reactiveRoute, key, {
          get: () => currentRoute.value[key],
          enumerable: true
        });
      }
      app.provide(routerKey, router2);
      app.provide(routeLocationKey, shallowReactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app.unmount;
      installedApps.add(app);
      app.unmount = function() {
        installedApps.delete(app);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
      if (isBrowser) {
        addDevtools(app, router2, matcher);
      }
    }
  };
  function runGuardQueue(guards) {
    return guards.reduce((promise2, guard) => promise2.then(() => runWithContext(guard)), Promise.resolve());
  }
  return router;
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i2 = 0; i2 < len; i2++) {
    const recordFrom = from.matched[i2];
    if (recordFrom) {
      if (to.matched.find((record) => isSameRouteRecord(record, recordFrom)))
        updatingRecords.push(recordFrom);
      else
        leavingRecords.push(recordFrom);
    }
    const recordTo = to.matched[i2];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) {
        enteringRecords.push(recordTo);
      }
    }
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}
function useRouter() {
  return inject(routerKey);
}
function useRoute() {
  return inject(routeLocationKey);
}
var u8 = Uint8Array, u16 = Uint16Array, i32 = Int32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b2 = new u16(31);
  for (var i2 = 0; i2 < 31; ++i2) {
    b2[i2] = start += 1 << eb[i2 - 1];
  }
  var r2 = new i32(b2[30]);
  for (var i2 = 1; i2 < 30; ++i2) {
    for (var j2 = b2[i2]; j2 < b2[i2 + 1]; ++j2) {
      r2[j2] = j2 - b2[i2] << 5 | i2;
    }
  }
  return { b: b2, r: r2 };
};
var _a = freb(fleb, 2), fl = _a.b, revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0), fd = _b.b;
var rev = new u16(32768);
for (var i$7 = 0; i$7 < 32768; ++i$7) {
  var x$3 = (i$7 & 43690) >> 1 | (i$7 & 21845) << 1;
  x$3 = (x$3 & 52428) >> 2 | (x$3 & 13107) << 2;
  x$3 = (x$3 & 61680) >> 4 | (x$3 & 3855) << 4;
  rev[i$7] = ((x$3 & 65280) >> 8 | (x$3 & 255) << 8) >> 1;
}
var hMap = function(cd, mb, r2) {
  var s2 = cd.length;
  var i2 = 0;
  var l2 = new u16(mb);
  for (; i2 < s2; ++i2) {
    if (cd[i2])
      ++l2[cd[i2] - 1];
  }
  var le2 = new u16(mb);
  for (i2 = 1; i2 < mb; ++i2) {
    le2[i2] = le2[i2 - 1] + l2[i2 - 1] << 1;
  }
  var co;
  if (r2) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i2 = 0; i2 < s2; ++i2) {
      if (cd[i2]) {
        var sv = i2 << 4 | cd[i2];
        var r_1 = mb - cd[i2];
        var v2 = le2[cd[i2] - 1]++ << r_1;
        for (var m2 = v2 | (1 << r_1) - 1; v2 <= m2; ++v2) {
          co[rev[v2] >> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s2);
    for (i2 = 0; i2 < s2; ++i2) {
      if (cd[i2]) {
        co[i2] = rev[le2[cd[i2] - 1]++] >> 15 - cd[i2];
      }
    }
  }
  return co;
};
var flt = new u8(288);
for (var i$7 = 0; i$7 < 144; ++i$7)
  flt[i$7] = 8;
for (var i$7 = 144; i$7 < 256; ++i$7)
  flt[i$7] = 9;
for (var i$7 = 256; i$7 < 280; ++i$7)
  flt[i$7] = 7;
for (var i$7 = 280; i$7 < 288; ++i$7)
  flt[i$7] = 8;
var fdt = new u8(32);
for (var i$7 = 0; i$7 < 32; ++i$7)
  fdt[i$7] = 5;
var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
var max = function(a2) {
  var m2 = a2[0];
  for (var i2 = 1; i2 < a2.length; ++i2) {
    if (a2[i2] > m2)
      m2 = a2[i2];
  }
  return m2;
};
var bits = function(d2, p2, m2) {
  var o2 = p2 / 8 | 0;
  return (d2[o2] | d2[o2 + 1] << 8) >> (p2 & 7) & m2;
};
var bits16 = function(d2, p2) {
  var o2 = p2 / 8 | 0;
  return (d2[o2] | d2[o2 + 1] << 8 | d2[o2 + 2] << 16) >> (p2 & 7);
};
var shft = function(p2) {
  return (p2 + 7) / 8 | 0;
};
var slc = function(v2, s2, e2) {
  if (s2 == null || s2 < 0)
    s2 = 0;
  if (e2 == null || e2 > v2.length)
    e2 = v2.length;
  return new u8(v2.subarray(s2, e2));
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
];
var err = function(ind, msg, nt) {
  var e2 = new Error(msg || ec[ind]);
  e2.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e2, err);
  if (!nt)
    throw e2;
  return e2;
};
var inflt = function(dat, st, buf, dict) {
  var sl = dat.length, dl = dict ? dict.length : 0;
  if (!sl || st.f && !st.l)
    return buf || new u8(0);
  var noBuf = !buf;
  var resize = noBuf || st.i != 2;
  var noSt = st.i;
  if (noBuf)
    buf = new u8(sl * 3);
  var cbuf = function(l3) {
    var bl = buf.length;
    if (l3 > bl) {
      var nbuf = new u8(Math.max(bl * 2, l3));
      nbuf.set(buf);
      buf = nbuf;
    }
  };
  var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
  var tbts = sl * 8;
  do {
    if (!lm) {
      final = bits(dat, pos, 1);
      var type = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type) {
        var s2 = shft(pos) + 4, l2 = dat[s2 - 4] | dat[s2 - 3] << 8, t2 = s2 + l2;
        if (t2 > sl) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt + l2);
        buf.set(dat.subarray(s2, t2), bt);
        st.b = bt += l2, st.p = pos = t2 * 8, st.f = final;
        continue;
      } else if (type == 1)
        lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type == 2) {
        var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        var tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        var ldt = new u8(tl);
        var clt = new u8(19);
        for (var i2 = 0; i2 < hcLen; ++i2) {
          clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);
        }
        pos += hcLen * 3;
        var clb = max(clt), clbmsk = (1 << clb) - 1;
        var clm = hMap(clt, clb, 1);
        for (var i2 = 0; i2 < tl; ) {
          var r2 = clm[bits(dat, pos, clbmsk)];
          pos += r2 & 15;
          var s2 = r2 >> 4;
          if (s2 < 16) {
            ldt[i2++] = s2;
          } else {
            var c2 = 0, n2 = 0;
            if (s2 == 16)
              n2 = 3 + bits(dat, pos, 3), pos += 2, c2 = ldt[i2 - 1];
            else if (s2 == 17)
              n2 = 3 + bits(dat, pos, 7), pos += 3;
            else if (s2 == 18)
              n2 = 11 + bits(dat, pos, 127), pos += 7;
            while (n2--)
              ldt[i2++] = c2;
          }
        }
        var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
        lbt = max(lt);
        dbt = max(dt);
        lm = hMap(lt, lbt, 1);
        dm = hMap(dt, dbt, 1);
      } else
        err(1);
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
    }
    if (resize)
      cbuf(bt + 131072);
    var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    var lpos = pos;
    for (; ; lpos = pos) {
      var c2 = lm[bits16(dat, pos) & lms], sym = c2 >> 4;
      pos += c2 & 15;
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
      if (!c2)
        err(2);
      if (sym < 256)
        buf[bt++] = sym;
      else if (sym == 256) {
        lpos = pos, lm = null;
        break;
      } else {
        var add2 = sym - 254;
        if (sym > 264) {
          var i2 = sym - 257, b2 = fleb[i2];
          add2 = bits(dat, pos, (1 << b2) - 1) + fl[i2];
          pos += b2;
        }
        var d2 = dm[bits16(dat, pos) & dms], dsym = d2 >> 4;
        if (!d2)
          err(3);
        pos += d2 & 15;
        var dt = fd[dsym];
        if (dsym > 3) {
          var b2 = fdeb[dsym];
          dt += bits16(dat, pos) & (1 << b2) - 1, pos += b2;
        }
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt + 131072);
        var end = bt + add2;
        if (bt < dt) {
          var shift = dl - dt, dend = Math.min(dt, end);
          if (shift + bt < 0)
            err(3);
          for (; bt < dend; ++bt)
            buf[bt] = dict[shift + bt];
        }
        for (; bt < end; ++bt)
          buf[bt] = buf[bt - dt];
      }
    }
    st.l = lm, st.p = lpos, st.b = bt, st.f = final;
    if (lm)
      final = 1, st.m = lbt, st.d = dm, st.n = dbt;
  } while (!final);
  return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
};
var et = /* @__PURE__ */ new u8(0);
var zls = function(d2, dict) {
  if ((d2[0] & 15) != 8 || d2[0] >> 4 > 7 || (d2[0] << 8 | d2[1]) % 31)
    err(6, "invalid zlib data");
  if ((d2[1] >> 5 & 1) == +!dict)
    err(6, "invalid zlib data: " + (d2[1] & 32 ? "need" : "unexpected") + " dictionary");
  return (d2[1] >> 3 & 4) + 2;
};
function unzlibSync(data, opts) {
  return inflt(data.subarray(zls(data, opts && opts.dictionary), -4), { i: 2 }, opts && opts.out, opts && opts.dictionary);
}
var te = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder();
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e2) {
}
var dutf8 = function(d2) {
  for (var r2 = "", i2 = 0; ; ) {
    var c2 = d2[i2++];
    var eb = (c2 > 127) + (c2 > 223) + (c2 > 239);
    if (i2 + eb > d2.length)
      return { s: r2, r: slc(d2, i2 - 1) };
    if (!eb)
      r2 += String.fromCharCode(c2);
    else if (eb == 3) {
      c2 = ((c2 & 15) << 18 | (d2[i2++] & 63) << 12 | (d2[i2++] & 63) << 6 | d2[i2++] & 63) - 65536, r2 += String.fromCharCode(55296 | c2 >> 10, 56320 | c2 & 1023);
    } else if (eb & 1)
      r2 += String.fromCharCode((c2 & 31) << 6 | d2[i2++] & 63);
    else
      r2 += String.fromCharCode((c2 & 15) << 12 | (d2[i2++] & 63) << 6 | d2[i2++] & 63);
  }
};
function strToU8(str, latin1) {
  if (latin1) {
    var ar_1 = new u8(str.length);
    for (var i2 = 0; i2 < str.length; ++i2)
      ar_1[i2] = str.charCodeAt(i2);
    return ar_1;
  }
  if (te)
    return te.encode(str);
  var l2 = str.length;
  var ar = new u8(str.length + (str.length >> 1));
  var ai = 0;
  var w2 = function(v2) {
    ar[ai++] = v2;
  };
  for (var i2 = 0; i2 < l2; ++i2) {
    if (ai + 5 > ar.length) {
      var n2 = new u8(ai + 8 + (l2 - i2 << 1));
      n2.set(ar);
      ar = n2;
    }
    var c2 = str.charCodeAt(i2);
    if (c2 < 128 || latin1)
      w2(c2);
    else if (c2 < 2048)
      w2(192 | c2 >> 6), w2(128 | c2 & 63);
    else if (c2 > 55295 && c2 < 57344)
      c2 = 65536 + (c2 & 1023 << 10) | str.charCodeAt(++i2) & 1023, w2(240 | c2 >> 18), w2(128 | c2 >> 12 & 63), w2(128 | c2 >> 6 & 63), w2(128 | c2 & 63);
    else
      w2(224 | c2 >> 12), w2(128 | c2 >> 6 & 63), w2(128 | c2 & 63);
  }
  return slc(ar, 0, ai);
}
function strFromU8(dat, latin1) {
  if (latin1) {
    var r2 = "";
    for (var i2 = 0; i2 < dat.length; i2 += 16384)
      r2 += String.fromCharCode.apply(null, dat.subarray(i2, i2 + 16384));
    return r2;
  } else if (td) {
    return td.decode(dat);
  } else {
    var _a2 = dutf8(dat), s2 = _a2.s, r2 = _a2.r;
    if (r2.length)
      err(8);
    return s2;
  }
}
const u$4 = ({ name: e2 = "", color: t2 = "currentColor" }, { slots: n2 }) => {
  var o2;
  return h$4("svg", { xmlns: "http://www.w3.org/2000/svg", class: ["icon", `${e2}-icon`], viewBox: "0 0 1024 1024", fill: t2, "aria-label": `${e2} icon` }, (o2 = n2.default) == null ? void 0 : o2.call(n2));
};
u$4.displayName = "IconBase";
const C$4 = ({ size: e2 = 48, stroke: t2 = 4, wrapper: n2 = true, height: o2 = 2 * e2 }) => {
  const i2 = h$4("svg", { xmlns: "http://www.w3.org/2000/svg", width: e2, height: e2, preserveAspectRatio: "xMidYMid", viewBox: "25 25 50 50" }, [h$4("animateTransform", { attributeName: "transform", type: "rotate", dur: "2s", keyTimes: "0;1", repeatCount: "indefinite", values: "0;360" }), h$4("circle", { cx: "50", cy: "50", r: "20", fill: "none", stroke: "currentColor", "stroke-width": t2, "stroke-linecap": "round" }, [h$4("animate", { attributeName: "stroke-dasharray", dur: "1.5s", keyTimes: "0;0.5;1", repeatCount: "indefinite", values: "1,200;90,200;1,200" }), h$4("animate", { attributeName: "stroke-dashoffset", dur: "1.5s", keyTimes: "0;0.5;1", repeatCount: "indefinite", values: "0;-35px;-125px" })])]);
  return n2 ? h$4("div", { class: "loading-icon-wrapper", style: `display:flex;align-items:center;justify-content:center;height:${o2}px` }, i2) : i2;
};
C$4.displayName = "LoadingIcon";
const oe = (e2, { slots: t2 }) => {
  var n2;
  return (n2 = t2.default) == null ? void 0 : n2.call(t2);
}, ie = (e2) => /\b(?:Android|iPhone)/i.test(e2), ae = (e2) => /version\/([\w.]+) .*(mobile ?safari|safari)/i.test(e2), le = (e2) => [/\((ipad);[-\w),; ]+apple/i, /applecoremedia\/[\w.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i].some((t2) => t2.test(e2)), pe = (e2 = "") => {
  if (e2) {
    if (typeof e2 == "number")
      return new Date(e2);
    const t2 = Date.parse(e2.toString());
    if (!Number.isNaN(t2))
      return new Date(t2);
  }
  return null;
}, he = (e2, t2) => {
  let n2 = 1;
  for (let o2 = 0; o2 < e2.length; o2++)
    n2 += e2.charCodeAt(o2), n2 += n2 << 10, n2 ^= n2 >> 6;
  return n2 += n2 << 3, n2 ^= n2 >> 11, n2 % t2;
}, p$1 = Array.isArray, fe = (e2) => typeof e2 == "function", ve = (e2) => typeof e2 == "string";
var $$2 = (e2) => e2.startsWith("ftp://"), h$3 = (e2) => /^(https?:)?\/\//.test(e2), we = /.md((\?|#).*)?$/, ye = (e2, t2 = "/") => !!(h$3(e2) || $$2(e2) || e2.startsWith("/") && !e2.startsWith(t2) && !we.test(e2)), m$6 = (e2) => Object.prototype.toString.call(e2) === "[object Object]";
function $e() {
  const e2 = ref(false);
  return getCurrentInstance() && onMounted(() => {
    e2.value = true;
  }), e2;
}
function ze(e2) {
  return $e(), computed(() => !!e2());
}
const Re = (e2) => typeof e2 == "function", a$8 = (e2) => typeof e2 == "string", z$3 = (e2, t2) => a$8(e2) && e2.startsWith(t2), Pe = (e2, t2) => a$8(e2) && e2.endsWith(t2), M$4 = Object.entries, _e = Object.fromEntries, f$4 = Object.keys, v$5 = (e2, ...t2) => {
  if (t2.length === 0)
    return e2;
  const n2 = t2.shift() || null;
  return n2 && M$4(n2).forEach(([o2, i2]) => {
    o2 === "__proto__" || o2 === "constructor" || (m$6(e2[o2]) && m$6(i2) ? v$5(e2[o2], i2) : p$1(i2) ? e2[o2] = [...i2] : m$6(i2) ? e2[o2] = { ...i2 } : e2[o2] = n2[o2]);
  }), v$5(e2, ...t2);
}, R$3 = (e2) => (e2.endsWith(".md") && (e2 = `${e2.slice(0, -3)}.html`), !e2.endsWith("/") && !e2.endsWith(".html") && (e2 = `${e2}.html`), e2 = e2.replace(/(^|\/)(?:README|index).html$/i, "$1"), e2), A$4 = (e2) => {
  const [t2, n2 = ""] = e2.split("#");
  return t2 ? `${R$3(t2)}${n2 ? `#${n2}` : ""}` : e2;
}, N$3 = (e2) => m$6(e2) && a$8(e2.name), Te = (e2, t2 = false) => e2 ? p$1(e2) ? e2.map((n2) => a$8(n2) ? { name: n2 } : N$3(n2) ? n2 : null).filter((n2) => n2 !== null) : a$8(e2) ? [{ name: e2 }] : N$3(e2) ? [e2] : (console.error(`Expect "author" to be \`AuthorInfo[] | AuthorInfo | string[] | string ${t2 ? "" : "| false"} | undefined\`, but got`, e2), []) : [], g$5 = (e2, t2) => {
  if (e2) {
    if (p$1(e2) && e2.every(a$8))
      return e2;
    if (a$8(e2))
      return [e2];
    console.error(`Expect ${t2 || "value"} to be \`string[] | string | undefined\`, but got`, e2);
  }
  return [];
}, je = (e2) => g$5(e2, "category"), Be = (e2) => g$5(e2, "tag"), Oe = (e2) => z$3(e2, "/");
class De {
  constructor() {
    __publicField(this, "containerElement");
    __publicField(this, "messageElements", {});
    const t2 = "message-container", n2 = document.getElementById(t2);
    n2 ? this.containerElement = n2 : (this.containerElement = document.createElement("div"), this.containerElement.id = t2, document.body.appendChild(this.containerElement));
  }
  pop(t2, n2 = 2e3) {
    const o2 = document.createElement("div"), i2 = Date.now();
    return o2.className = "message move-in", o2.innerHTML = t2, this.containerElement.appendChild(o2), this.messageElements[i2] = o2, n2 > 0 && setTimeout(() => {
      this.close(i2);
    }, n2), i2;
  }
  close(t2) {
    if (t2) {
      const n2 = this.messageElements[t2];
      n2.classList.remove("move-in"), n2.classList.add("move-out"), n2.addEventListener("animationend", () => {
        n2.remove(), delete this.messageElements[t2];
      });
    } else
      f$4(this.messageElements).forEach((n2) => this.close(Number(n2)));
  }
  destroy() {
    document.body.removeChild(this.containerElement);
  }
}
const P$3 = /#.*$/u, _$2 = (e2) => {
  const t2 = P$3.exec(e2);
  return t2 ? t2[0] : "";
}, b$1 = (e2) => decodeURI(e2).replace(P$3, "").replace(/(index)?\.(md|html)$/, ""), Ge = (e2, t2) => {
  if (t2 === void 0)
    return false;
  const n2 = b$1(e2.path), o2 = b$1(t2), i2 = _$2(t2);
  return i2 ? i2 === e2.hash && (!o2 || n2 === o2) : n2 === o2;
};
class Ve {
  constructor() {
    __publicField(this, "containerElement");
    __publicField(this, "popupElements", {});
    const t2 = "popup-container", n2 = document.getElementById(t2);
    n2 ? this.containerElement = n2 : (this.containerElement = document.createElement("div"), this.containerElement.id = t2, document.body.appendChild(this.containerElement));
  }
  emit(t2, n2) {
    const o2 = document.createElement("div"), i2 = document.createElement("div"), r2 = Date.now();
    return this.containerElement.appendChild(o2), this.popupElements[r2] = o2, o2.className = "popup-wrapper appear", o2.appendChild(i2), o2.addEventListener("click", () => this.close(r2)), i2.className = "popup-container", i2.innerHTML = t2, typeof n2 == "number" && setTimeout(() => {
      this.close(r2);
    }, n2), r2;
  }
  close(t2) {
    if (t2) {
      const n2 = this.popupElements[t2];
      n2.classList.replace("appear", "disappear"), n2.children[0].addEventListener("animationend", () => {
        n2.remove(), delete this.popupElements[t2];
      });
    } else
      f$4(this.popupElements).forEach((n2) => this.close(Number(n2)));
  }
  destroy() {
    document.body.removeChild(this.containerElement);
  }
}
const Fe = (e2) => {
  const t2 = atob(e2);
  return strFromU8(unzlibSync(strToU8(t2, true)));
}, Ke = (e2) => h$3(e2) ? e2 : `https://github.com/${e2}`, qe = (e2) => !h$3(e2) || /github\.com/.test(e2) ? "GitHub" : /bitbucket\.org/.test(e2) ? "Bitbucket" : /gitlab\.com/.test(e2) ? "GitLab" : /gitee\.com/.test(e2) ? "Gitee" : null, w$1 = (e2, ...t2) => {
  const n2 = e2.resolve(...t2), o2 = n2.matched[n2.matched.length - 1];
  if (!(o2 != null && o2.redirect))
    return n2;
  const { redirect: i2 } = o2, r2 = fe(i2) ? i2(n2) : i2, c2 = ve(r2) ? { path: r2 } : r2;
  return w$1(e2, { hash: n2.hash, query: n2.query, params: n2.params, ...c2 });
}, y$3 = (e2) => {
  if (!(e2.metaKey || e2.altKey || e2.ctrlKey || e2.shiftKey) && !e2.defaultPrevented && !(e2.button !== void 0 && e2.button !== 0)) {
    if (e2.currentTarget) {
      const t2 = e2.currentTarget.getAttribute("target");
      if (t2 != null && t2.match(/\b_blank\b/i))
        return;
    }
    return e2.preventDefault(), true;
  }
}, W$2 = () => {
  const { availWidth: e2, availHeight: t2 } = screen, { screenLeft: n2, screenTop: o2, innerWidth: i2, innerHeight: r2 } = window, c2 = Math.max(e2 / 2, 600), d2 = Math.max(t2 / 2, 400);
  return { width: c2, height: d2, left: n2 + i2 / 2 - c2 / 2, top: o2 + r2 / 2 - d2 / 2 };
}, Ye = (e2, t2 = "_blank", n2 = ["resizable", "status"]) => {
  var o2, i2;
  const { width: r2, height: c2, left: d2, top: U2 } = W$2();
  (i2 = (o2 = window.open(e2, t2, `width=${r2},height=${c2},left=${d2},top=${U2},${n2.join(",")}`)) == null ? void 0 : o2.focus) == null || i2.call(o2);
}, j$1 = ({ to: e2 = "" }, { slots: t2 }) => {
  var n2;
  const o2 = useRouter(), i2 = (r2 = {}) => y$3(r2) ? o2.push(e2).catch() : Promise.resolve();
  return h$4("a", { class: "vp-link", href: withBase(A$4(e2)), onClick: i2 }, (n2 = t2.default) == null ? void 0 : n2.call(t2));
};
j$1.displayName = "VPLink";
const B$1 = () => h$4(u$4, { name: "github" }, () => h$4("path", { d: "M511.957 21.333C241.024 21.333 21.333 240.981 21.333 512c0 216.832 140.544 400.725 335.574 465.664 24.49 4.395 32.256-10.07 32.256-23.083 0-11.69.256-44.245 0-85.205-136.448 29.61-164.736-64.64-164.736-64.64-22.315-56.704-54.4-71.765-54.4-71.765-44.587-30.464 3.285-29.824 3.285-29.824 49.195 3.413 75.179 50.517 75.179 50.517 43.776 75.008 114.816 53.333 142.762 40.79 4.523-31.66 17.152-53.377 31.19-65.537-108.971-12.458-223.488-54.485-223.488-242.602 0-53.547 19.114-97.323 50.517-131.67-5.035-12.33-21.93-62.293 4.779-129.834 0 0 41.258-13.184 134.912 50.346a469.803 469.803 0 0 1 122.88-16.554c41.642.213 83.626 5.632 122.88 16.554 93.653-63.488 134.784-50.346 134.784-50.346 26.752 67.541 9.898 117.504 4.864 129.834 31.402 34.347 50.474 78.123 50.474 131.67 0 188.586-114.73 230.016-224.042 242.09 17.578 15.232 33.578 44.672 33.578 90.454v135.85c0 13.142 7.936 27.606 32.854 22.87C862.25 912.597 1002.667 728.747 1002.667 512c0-271.019-219.648-490.667-490.71-490.667z" }));
B$1.displayName = "GitHubIcon";
const H$2 = () => h$4(u$4, { name: "gitlab" }, () => h$4("path", { d: "M229.333 78.688C223.52 62 199.895 62 193.895 78.688L87.958 406.438h247.5c-.188 0-106.125-327.75-106.125-327.75zM33.77 571.438c-4.875 15 .563 31.687 13.313 41.25l464.812 345L87.77 406.438zm301.5-165 176.813 551.25 176.812-551.25zm655.125 165-54-165-424.312 551.25 464.812-345c12.938-9.563 18.188-26.25 13.5-41.25zM830.27 78.688c-5.812-16.688-29.437-16.688-35.437 0l-106.125 327.75h247.5z" }));
H$2.displayName = "GitLabIcon";
const O$2 = () => h$4(u$4, { name: "gitee" }, () => h$4("path", { d: "M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm242.97-533.34H482.39a23.7 23.7 0 0 0-23.7 23.7l-.03 59.28c0 13.08 10.59 23.7 23.7 23.7h165.96a23.7 23.7 0 0 1 23.7 23.7v11.85a71.1 71.1 0 0 1-71.1 71.1H375.71a23.7 23.7 0 0 1-23.7-23.7V423.11a71.1 71.1 0 0 1 71.1-71.1h331.8a23.7 23.7 0 0 0 23.7-23.7l.06-59.25a23.73 23.73 0 0 0-23.7-23.73H423.11a177.78 177.78 0 0 0-177.78 177.75v331.83c0 13.08 10.62 23.7 23.7 23.7h349.62a159.99 159.99 0 0 0 159.99-159.99V482.33a23.7 23.7 0 0 0-23.7-23.7z" }));
O$2.displayName = "GiteeIcon";
const D$1 = () => h$4(u$4, { name: "bitbucket" }, () => h$4("path", { d: "M575.256 490.862c6.29 47.981-52.005 85.723-92.563 61.147-45.714-20.004-45.714-92.562-1.133-113.152 38.29-23.442 93.696 7.424 93.696 52.005zm63.451-11.996c-10.276-81.152-102.29-134.839-177.152-101.156-47.433 21.138-79.433 71.424-77.129 124.562 2.853 69.705 69.157 126.866 138.862 120.576S647.3 548.571 638.708 478.83zm136.558-309.723c-25.161-33.134-67.986-38.839-105.728-45.13-106.862-17.151-216.576-17.7-323.438 1.134-35.438 5.706-75.447 11.996-97.719 43.996 36.572 34.304 88.576 39.424 135.424 45.129 84.553 10.862 171.447 11.447 256 .585 47.433-5.705 99.987-10.276 135.424-45.714zm32.585 591.433c-16.018 55.99-6.839 131.438-66.304 163.986-102.29 56.576-226.304 62.867-338.87 42.862-59.43-10.862-129.135-29.696-161.72-85.723-14.3-54.858-23.442-110.848-32.585-166.84l3.438-9.142 10.276-5.157c170.277 112.567 408.576 112.567 579.438 0 26.844 8.01 6.84 40.558 6.29 60.014zm103.424-549.157c-19.42 125.148-41.728 249.71-63.415 374.272-6.29 36.572-41.728 57.162-71.424 72.558-106.862 53.724-231.424 62.866-348.562 50.286-79.433-8.558-160.585-29.696-225.134-79.433-30.28-23.443-30.28-63.415-35.986-97.134-20.005-117.138-42.862-234.277-57.161-352.585 6.839-51.42 64.585-73.728 107.447-89.71 57.16-21.138 118.272-30.866 178.87-36.571 129.134-12.58 261.157-8.01 386.304 28.562 44.581 13.13 92.563 31.415 122.844 69.705 13.714 17.7 9.143 40.01 6.29 60.014z" }));
D$1.displayName = "BitbucketIcon";
const G$2 = () => h$4(u$4, { name: "source" }, () => h$4("path", { d: "M601.92 475.2c0 76.428-8.91 83.754-28.512 99.594-14.652 11.88-43.956 14.058-78.012 16.434-18.81 1.386-40.392 2.97-62.172 6.534-18.612 2.97-36.432 9.306-53.064 17.424V299.772c37.818-21.978 63.36-62.766 63.36-109.692 0-69.894-56.826-126.72-126.72-126.72S190.08 120.186 190.08 190.08c0 46.926 25.542 87.714 63.36 109.692v414.216c-37.818 21.978-63.36 62.766-63.36 109.692 0 69.894 56.826 126.72 126.72 126.72s126.72-56.826 126.72-126.72c0-31.086-11.286-59.598-29.7-81.576 13.266-9.504 27.522-17.226 39.996-19.206 16.038-2.574 32.868-3.762 50.688-5.148 48.312-3.366 103.158-7.326 148.896-44.55 61.182-49.698 74.25-103.158 75.24-187.902V475.2h-126.72zM316.8 126.72c34.848 0 63.36 28.512 63.36 63.36s-28.512 63.36-63.36 63.36-63.36-28.512-63.36-63.36 28.512-63.36 63.36-63.36zm0 760.32c-34.848 0-63.36-28.512-63.36-63.36s28.512-63.36 63.36-63.36 63.36 28.512 63.36 63.36-28.512 63.36-63.36 63.36zM823.68 158.4h-95.04V63.36h-126.72v95.04h-95.04v126.72h95.04v95.04h126.72v-95.04h95.04z" }));
G$2.displayName = "SourceIcon";
const Qe = (e2, t2) => {
  const n2 = t2 ? t2._instance : getCurrentInstance();
  return m$6(n2 == null ? void 0 : n2.appContext.components) && (e2 in n2.appContext.components || camelize(e2) in n2.appContext.components || capitalize(camelize(e2)) in n2.appContext.components);
}, V$1 = () => ze(() => typeof window < "u" && window.navigator && "userAgent" in window.navigator), Xe = () => {
  const e2 = V$1();
  return computed(() => e2.value && /\b(?:Android|iPhone)/i.test(navigator.userAgent));
}, Ze = (e2) => {
  const t2 = useRouteLocale();
  return computed(() => e2[t2.value]);
};
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function toValue(r2) {
  return typeof r2 === "function" ? r2() : unref(r2);
}
const isClient = typeof window !== "undefined" && typeof document !== "undefined";
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const toString = Object.prototype.toString;
const isObject = (val) => toString.call(val) === "[object Object]";
const noop = () => {
};
const isIOS = /* @__PURE__ */ getIsIOS();
function getIsIOS() {
  var _a2, _b2;
  return isClient && ((_a2 = window == null ? void 0 : window.navigator) == null ? void 0 : _a2.userAgent) && (/iP(ad|hone|od)/.test(window.navigator.userAgent) || ((_b2 = window == null ? void 0 : window.navigator) == null ? void 0 : _b2.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve2, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve2).catch(reject);
    });
  }
  return wrapper;
}
const bypassFilter = (invoke) => {
  return invoke();
};
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop;
  const _clearTimeout = (timer2) => {
    clearTimeout(timer2);
    lastRejector();
    lastRejector = noop;
  };
  const filter = (invoke) => {
    const duration = toValue(ms);
    const maxDuration = toValue(options.maxWait);
    if (timer)
      _clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = null;
      }
      return Promise.resolve(invoke());
    }
    return new Promise((resolve2, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve2;
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            _clearTimeout(timer);
          maxTimer = null;
          resolve2(invoke());
        }, maxDuration);
      }
      timer = setTimeout(() => {
        if (maxTimer)
          _clearTimeout(maxTimer);
        maxTimer = null;
        resolve2(invoke());
      }, duration);
    });
  };
  return filter;
}
function throttleFilter(ms, trailing = true, leading = true, rejectOnCancel = false) {
  let lastExec = 0;
  let timer;
  let isLeading = true;
  let lastRejector = noop;
  let lastValue;
  const clear2 = () => {
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
      lastRejector();
      lastRejector = noop;
    }
  };
  const filter = (_invoke) => {
    const duration = toValue(ms);
    const elapsed = Date.now() - lastExec;
    const invoke = () => {
      return lastValue = _invoke();
    };
    clear2();
    if (duration <= 0) {
      lastExec = Date.now();
      return invoke();
    }
    if (elapsed > duration && (leading || !isLeading)) {
      lastExec = Date.now();
      invoke();
    } else if (trailing) {
      lastValue = new Promise((resolve2, reject) => {
        lastRejector = rejectOnCancel ? reject : resolve2;
        timer = setTimeout(() => {
          lastExec = Date.now();
          isLeading = true;
          resolve2(invoke());
          clear2();
        }, Math.max(0, duration - elapsed));
      });
    }
    if (!leading && !timer)
      timer = setTimeout(() => isLeading = true, duration);
    isLeading = false;
    return lastValue;
  };
  return filter;
}
function pausableFilter(extendFilter = bypassFilter) {
  const isActive = ref(true);
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  const eventFilter = (...args) => {
    if (isActive.value)
      extendFilter(...args);
  };
  return { isActive: readonly(isActive), pause, resume, eventFilter };
}
function createSingletonPromise(fn) {
  let _promise;
  function wrapper() {
    if (!_promise)
      _promise = fn();
    return _promise;
  }
  wrapper.reset = async () => {
    const _prev = _promise;
    _promise = void 0;
    if (_prev)
      await _prev;
  };
  return wrapper;
}
function getLifeCycleTarget(target) {
  return target || getCurrentInstance();
}
function toRef(...args) {
  if (args.length !== 1)
    return toRef$1(...args);
  const r2 = args[0];
  return typeof r2 === "function" ? readonly(customRef(() => ({ get: r2, set: noop }))) : ref(r2);
}
function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(
    debounceFilter(ms, options),
    fn
  );
}
function useThrottleFn(fn, ms = 200, trailing = false, leading = true, rejectOnCancel = false) {
  return createFilterWrapper(
    throttleFilter(ms, trailing, leading, rejectOnCancel),
    fn
  );
}
function watchWithFilter(source, cb, options = {}) {
  const {
    eventFilter = bypassFilter,
    ...watchOptions
  } = options;
  return watch(
    source,
    createFilterWrapper(
      eventFilter,
      cb
    ),
    watchOptions
  );
}
function watchPausable(source, cb, options = {}) {
  const {
    eventFilter: filter,
    ...watchOptions
  } = options;
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter);
  const stop = watchWithFilter(
    source,
    cb,
    {
      ...watchOptions,
      eventFilter
    }
  );
  return { stop, pause, resume, isActive };
}
function tryOnMounted(fn, sync = true, target) {
  const instance = getLifeCycleTarget();
  if (instance)
    onMounted(fn, target);
  else if (sync)
    fn();
  else
    nextTick(fn);
}
function tryOnUnmounted(fn, target) {
  const instance = getLifeCycleTarget(target);
  if (instance)
    onUnmounted(fn, target);
}
function useIntervalFn(cb, interval = 1e3, options = {}) {
  const {
    immediate = true,
    immediateCallback = false
  } = options;
  let timer = null;
  const isActive = ref(false);
  function clean() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  function pause() {
    isActive.value = false;
    clean();
  }
  function resume() {
    const intervalValue = toValue(interval);
    if (intervalValue <= 0)
      return;
    isActive.value = true;
    if (immediateCallback)
      cb();
    clean();
    timer = setInterval(cb, intervalValue);
  }
  if (immediate && isClient)
    resume();
  if (isRef(interval) || typeof interval === "function") {
    const stopWatch = watch(interval, () => {
      if (isActive.value && isClient)
        resume();
    });
    tryOnScopeDispose(stopWatch);
  }
  tryOnScopeDispose(pause);
  return {
    isActive,
    pause,
    resume
  };
}
function useTimeoutFn(cb, interval, options = {}) {
  const {
    immediate = true
  } = options;
  const isPending = ref(false);
  let timer = null;
  function clear2() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop() {
    isPending.value = false;
    clear2();
  }
  function start(...args) {
    clear2();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;
      cb(...args);
    }, toValue(interval));
  }
  if (immediate) {
    isPending.value = true;
    if (isClient)
      start();
  }
  tryOnScopeDispose(stop);
  return {
    isPending: readonly(isPending),
    start,
    stop
  };
}
function useToggle(initialValue = false, options = {}) {
  const {
    truthyValue = true,
    falsyValue = false
  } = options;
  const valueIsRef = isRef(initialValue);
  const _value = ref(initialValue);
  function toggle(value) {
    if (arguments.length) {
      _value.value = value;
      return _value.value;
    } else {
      const truthy = toValue(truthyValue);
      _value.value = _value.value === truthy ? toValue(falsyValue) : truthy;
      return _value.value;
    }
  }
  if (valueIsRef)
    return toggle;
  else
    return [_value, toggle];
}
function unrefElement(elRef) {
  var _a2;
  const plain = toValue(elRef);
  return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
}
const defaultWindow = isClient ? window : void 0;
const defaultDocument = isClient ? window.document : void 0;
const defaultNavigator = isClient ? window.navigator : void 0;
function useEventListener(...args) {
  let target;
  let events;
  let listeners;
  let options;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [events, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events))
    events = [events];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(
    () => [unrefElement(target), toValue(options)],
    ([el, options2]) => {
      cleanup();
      if (!el)
        return;
      const optionsClone = isObject(options2) ? { ...options2 } : options2;
      cleanups.push(
        ...events.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, optionsClone));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
let _iOSWorkaround = false;
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, ignore = [], capture = true, detectIframe = false } = options;
  if (!window2)
    return noop;
  if (isIOS && !_iOSWorkaround) {
    _iOSWorkaround = true;
    Array.from(window2.document.body.children).forEach((el) => el.addEventListener("click", noop));
    window2.document.documentElement.addEventListener("click", noop);
  }
  let shouldListen = true;
  const shouldIgnore = (event) => {
    return ignore.some((target2) => {
      if (typeof target2 === "string") {
        return Array.from(window2.document.querySelectorAll(target2)).some((el) => el === event.target || event.composedPath().includes(el));
      } else {
        const el = unrefElement(target2);
        return el && (event.target === el || event.composedPath().includes(el));
      }
    });
  };
  const listener = (event) => {
    const el = unrefElement(target);
    if (!el || el === event.target || event.composedPath().includes(el))
      return;
    if (event.detail === 0)
      shouldListen = !shouldIgnore(event);
    if (!shouldListen) {
      shouldListen = true;
      return;
    }
    handler(event);
  };
  const cleanup = [
    useEventListener(window2, "click", listener, { passive: true, capture }),
    useEventListener(window2, "pointerdown", (e2) => {
      const el = unrefElement(target);
      shouldListen = !shouldIgnore(e2) && !!(el && !e2.composedPath().includes(el));
    }, { passive: true }),
    detectIframe && useEventListener(window2, "blur", (event) => {
      setTimeout(() => {
        var _a2;
        const el = unrefElement(target);
        if (((_a2 = window2.document.activeElement) == null ? void 0 : _a2.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(window2.document.activeElement)))
          handler(event);
      }, 0);
    })
  ].filter(Boolean);
  const stop = () => cleanup.forEach((fn) => fn());
  return stop;
}
function useMounted() {
  const isMounted = ref(false);
  if (getCurrentInstance()) {
    onMounted(() => {
      isMounted.value = true;
    });
  }
  return isMounted;
}
function useSupported(callback) {
  const isMounted = useMounted();
  return computed(() => {
    isMounted.value;
    return Boolean(callback());
  });
}
function useRafFn(fn, options = {}) {
  const {
    immediate = true,
    fpsLimit = void 0,
    window: window2 = defaultWindow
  } = options;
  const isActive = ref(false);
  const intervalLimit = fpsLimit ? 1e3 / fpsLimit : null;
  let previousFrameTimestamp = 0;
  let rafId = null;
  function loop(timestamp) {
    if (!isActive.value || !window2)
      return;
    const delta = timestamp - (previousFrameTimestamp || timestamp);
    if (intervalLimit && delta < intervalLimit) {
      rafId = window2.requestAnimationFrame(loop);
      return;
    }
    fn({ delta, timestamp });
    previousFrameTimestamp = timestamp;
    rafId = window2.requestAnimationFrame(loop);
  }
  function resume() {
    if (!isActive.value && window2) {
      isActive.value = true;
      rafId = window2.requestAnimationFrame(loop);
    }
  }
  function pause() {
    isActive.value = false;
    if (rafId != null && window2) {
      window2.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
  if (immediate)
    resume();
  tryOnScopeDispose(pause);
  return {
    isActive: readonly(isActive),
    pause,
    resume
  };
}
function useMediaQuery(query, options = {}) {
  const { window: window2 = defaultWindow } = options;
  const isSupported2 = useSupported(() => window2 && "matchMedia" in window2 && typeof window2.matchMedia === "function");
  let mediaQuery;
  const matches = ref(false);
  const handler = (event) => {
    matches.value = event.matches;
  };
  const cleanup = () => {
    if (!mediaQuery)
      return;
    if ("removeEventListener" in mediaQuery)
      mediaQuery.removeEventListener("change", handler);
    else
      mediaQuery.removeListener(handler);
  };
  const stopWatch = watchEffect(() => {
    if (!isSupported2.value)
      return;
    cleanup();
    mediaQuery = window2.matchMedia(toValue(query));
    if ("addEventListener" in mediaQuery)
      mediaQuery.addEventListener("change", handler);
    else
      mediaQuery.addListener(handler);
    matches.value = mediaQuery.matches;
  });
  tryOnScopeDispose(() => {
    stopWatch();
    cleanup();
    mediaQuery = void 0;
  });
  return matches;
}
function usePermission(permissionDesc, options = {}) {
  const {
    controls = false,
    navigator: navigator2 = defaultNavigator
  } = options;
  const isSupported2 = useSupported(() => navigator2 && "permissions" in navigator2);
  let permissionStatus;
  const desc = typeof permissionDesc === "string" ? { name: permissionDesc } : permissionDesc;
  const state = ref();
  const onChange = () => {
    if (permissionStatus)
      state.value = permissionStatus.state;
  };
  const query = createSingletonPromise(async () => {
    if (!isSupported2.value)
      return;
    if (!permissionStatus) {
      try {
        permissionStatus = await navigator2.permissions.query(desc);
        useEventListener(permissionStatus, "change", onChange);
        onChange();
      } catch (e2) {
        state.value = "prompt";
      }
    }
    return permissionStatus;
  });
  query();
  if (controls) {
    return {
      state,
      isSupported: isSupported2,
      query
    };
  } else {
    return state;
  }
}
function useClipboard(options = {}) {
  const {
    navigator: navigator2 = defaultNavigator,
    read = false,
    source,
    copiedDuring = 1500,
    legacy = false
  } = options;
  const isClipboardApiSupported = useSupported(() => navigator2 && "clipboard" in navigator2);
  const permissionRead = usePermission("clipboard-read");
  const permissionWrite = usePermission("clipboard-write");
  const isSupported2 = computed(() => isClipboardApiSupported.value || legacy);
  const text = ref("");
  const copied = ref(false);
  const timeout = useTimeoutFn(() => copied.value = false, copiedDuring);
  function updateText() {
    if (isClipboardApiSupported.value && permissionRead.value !== "denied") {
      navigator2.clipboard.readText().then((value) => {
        text.value = value;
      });
    } else {
      text.value = legacyRead();
    }
  }
  if (isSupported2.value && read)
    useEventListener(["copy", "cut"], updateText);
  async function copy(value = toValue(source)) {
    if (isSupported2.value && value != null) {
      if (isClipboardApiSupported.value && permissionWrite.value !== "denied")
        await navigator2.clipboard.writeText(value);
      else
        legacyCopy(value);
      text.value = value;
      copied.value = true;
      timeout.start();
    }
  }
  function legacyCopy(value) {
    const ta = document.createElement("textarea");
    ta.value = value != null ? value : "";
    ta.style.position = "absolute";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  function legacyRead() {
    var _a2, _b2, _c;
    return (_c = (_b2 = (_a2 = document == null ? void 0 : document.getSelection) == null ? void 0 : _a2.call(document)) == null ? void 0 : _b2.toString()) != null ? _c : "";
  }
  return {
    isSupported: isSupported2,
    text,
    copied,
    copy
  };
}
const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
const handlers = /* @__PURE__ */ getHandlers();
function getHandlers() {
  if (!(globalKey in _global))
    _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}
function guessSerializerType(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
const StorageSerializers = {
  boolean: {
    read: (v2) => v2 === "true",
    write: (v2) => String(v2)
  },
  object: {
    read: (v2) => JSON.parse(v2),
    write: (v2) => JSON.stringify(v2)
  },
  number: {
    read: (v2) => Number.parseFloat(v2),
    write: (v2) => String(v2)
  },
  any: {
    read: (v2) => v2,
    write: (v2) => String(v2)
  },
  string: {
    read: (v2) => v2,
    write: (v2) => String(v2)
  },
  map: {
    read: (v2) => new Map(JSON.parse(v2)),
    write: (v2) => JSON.stringify(Array.from(v2.entries()))
  },
  set: {
    read: (v2) => new Set(JSON.parse(v2)),
    write: (v2) => JSON.stringify(Array.from(v2))
  },
  date: {
    read: (v2) => new Date(v2),
    write: (v2) => v2.toISOString()
  }
};
const customStorageEventName = "vueuse-storage";
function useStorage(key, defaults, storage, options = {}) {
  var _a2;
  const {
    flush = "pre",
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = false,
    shallow,
    window: window2 = defaultWindow,
    eventFilter,
    onError = (e2) => {
      console.error(e2);
    },
    initOnMounted
  } = options;
  const data = (shallow ? shallowRef : ref)(typeof defaults === "function" ? defaults() : defaults);
  if (!storage) {
    try {
      storage = getSSRHandler("getDefaultStorage", () => {
        var _a22;
        return (_a22 = defaultWindow) == null ? void 0 : _a22.localStorage;
      })();
    } catch (e2) {
      onError(e2);
    }
  }
  if (!storage)
    return data;
  const rawInit = toValue(defaults);
  const type = guessSerializerType(rawInit);
  const serializer = (_a2 = options.serializer) != null ? _a2 : StorageSerializers[type];
  const { pause: pauseWatch, resume: resumeWatch } = watchPausable(
    data,
    () => write(data.value),
    { flush, deep, eventFilter }
  );
  if (window2 && listenToStorageChanges) {
    tryOnMounted(() => {
      useEventListener(window2, "storage", update);
      useEventListener(window2, customStorageEventName, updateFromCustomEvent);
      if (initOnMounted)
        update();
    });
  }
  if (!initOnMounted)
    update();
  return data;
  function write(v2) {
    try {
      if (v2 == null) {
        storage.removeItem(key);
      } else {
        const serialized = serializer.write(v2);
        const oldValue = storage.getItem(key);
        if (oldValue !== serialized) {
          storage.setItem(key, serialized);
          if (window2) {
            window2.dispatchEvent(new CustomEvent(customStorageEventName, {
              detail: {
                key,
                oldValue,
                newValue: serialized,
                storageArea: storage
              }
            }));
          }
        }
      }
    } catch (e2) {
      onError(e2);
    }
  }
  function read(event) {
    const rawValue = event ? event.newValue : storage.getItem(key);
    if (rawValue == null) {
      if (writeDefaults && rawInit != null)
        storage.setItem(key, serializer.write(rawInit));
      return rawInit;
    } else if (!event && mergeDefaults) {
      const value = serializer.read(rawValue);
      if (typeof mergeDefaults === "function")
        return mergeDefaults(value, rawInit);
      else if (type === "object" && !Array.isArray(value))
        return { ...rawInit, ...value };
      return value;
    } else if (typeof rawValue !== "string") {
      return rawValue;
    } else {
      return serializer.read(rawValue);
    }
  }
  function updateFromCustomEvent(event) {
    update(event.detail);
  }
  function update(event) {
    if (event && event.storageArea !== storage)
      return;
    if (event && event.key == null) {
      data.value = rawInit;
      return;
    }
    if (event && event.key !== key)
      return;
    pauseWatch();
    try {
      if ((event == null ? void 0 : event.newValue) !== serializer.write(data.value))
        data.value = read(event);
    } catch (e2) {
      onError(e2);
    } finally {
      if (event)
        nextTick(resumeWatch);
      else
        resumeWatch();
    }
  }
}
function usePreferredDark(options) {
  return useMediaQuery("(prefers-color-scheme: dark)", options);
}
function useMutationObserver(target, callback, options = {}) {
  const { window: window2 = defaultWindow, ...mutationOptions } = options;
  let observer;
  const isSupported2 = useSupported(() => window2 && "MutationObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const stopWatch = watch(
    () => unrefElement(target),
    (el) => {
      cleanup();
      if (isSupported2.value && window2 && el) {
        observer = new MutationObserver(callback);
        observer.observe(el, mutationOptions);
      }
    },
    { immediate: true }
  );
  const takeRecords = () => {
    return observer == null ? void 0 : observer.takeRecords();
  };
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported: isSupported2,
    stop,
    takeRecords
  };
}
function useResizeObserver(target, callback, options = {}) {
  const { window: window2 = defaultWindow, ...observerOptions } = options;
  let observer;
  const isSupported2 = useSupported(() => window2 && "ResizeObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const targets = computed(() => Array.isArray(target) ? target.map((el) => unrefElement(el)) : [unrefElement(target)]);
  const stopWatch = watch(
    targets,
    (els) => {
      cleanup();
      if (isSupported2.value && window2) {
        observer = new ResizeObserver(callback);
        for (const _el of els)
          _el && observer.observe(_el, observerOptions);
      }
    },
    { immediate: true, flush: "post", deep: true }
  );
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported: isSupported2,
    stop
  };
}
function useElementSize(target, initialSize = { width: 0, height: 0 }, options = {}) {
  const { window: window2 = defaultWindow, box = "content-box" } = options;
  const isSVG = computed(() => {
    var _a2, _b2;
    return (_b2 = (_a2 = unrefElement(target)) == null ? void 0 : _a2.namespaceURI) == null ? void 0 : _b2.includes("svg");
  });
  const width = ref(initialSize.width);
  const height = ref(initialSize.height);
  const { stop: stop1 } = useResizeObserver(
    target,
    ([entry]) => {
      const boxSize = box === "border-box" ? entry.borderBoxSize : box === "content-box" ? entry.contentBoxSize : entry.devicePixelContentBoxSize;
      if (window2 && isSVG.value) {
        const $elem = unrefElement(target);
        if ($elem) {
          const styles = window2.getComputedStyle($elem);
          width.value = Number.parseFloat(styles.width);
          height.value = Number.parseFloat(styles.height);
        }
      } else {
        if (boxSize) {
          const formatBoxSize = Array.isArray(boxSize) ? boxSize : [boxSize];
          width.value = formatBoxSize.reduce((acc, { inlineSize }) => acc + inlineSize, 0);
          height.value = formatBoxSize.reduce((acc, { blockSize }) => acc + blockSize, 0);
        } else {
          width.value = entry.contentRect.width;
          height.value = entry.contentRect.height;
        }
      }
    },
    options
  );
  tryOnMounted(() => {
    const ele = unrefElement(target);
    if (ele) {
      width.value = "offsetWidth" in ele ? ele.offsetWidth : initialSize.width;
      height.value = "offsetHeight" in ele ? ele.offsetHeight : initialSize.height;
    }
  });
  const stop2 = watch(
    () => unrefElement(target),
    (ele) => {
      width.value = ele ? initialSize.width : 0;
      height.value = ele ? initialSize.height : 0;
    }
  );
  function stop() {
    stop1();
    stop2();
  }
  return {
    width,
    height,
    stop
  };
}
const eventHandlers = [
  "fullscreenchange",
  "webkitfullscreenchange",
  "webkitendfullscreen",
  "mozfullscreenchange",
  "MSFullscreenChange"
];
function useFullscreen(target, options = {}) {
  const {
    document: document2 = defaultDocument,
    autoExit = false
  } = options;
  const targetRef = computed(() => {
    var _a2;
    return (_a2 = unrefElement(target)) != null ? _a2 : document2 == null ? void 0 : document2.querySelector("html");
  });
  const isFullscreen = ref(false);
  const requestMethod = computed(() => {
    return [
      "requestFullscreen",
      "webkitRequestFullscreen",
      "webkitEnterFullscreen",
      "webkitEnterFullScreen",
      "webkitRequestFullScreen",
      "mozRequestFullScreen",
      "msRequestFullscreen"
    ].find((m2) => document2 && m2 in document2 || targetRef.value && m2 in targetRef.value);
  });
  const exitMethod = computed(() => {
    return [
      "exitFullscreen",
      "webkitExitFullscreen",
      "webkitExitFullScreen",
      "webkitCancelFullScreen",
      "mozCancelFullScreen",
      "msExitFullscreen"
    ].find((m2) => document2 && m2 in document2 || targetRef.value && m2 in targetRef.value);
  });
  const fullscreenEnabled = computed(() => {
    return [
      "fullScreen",
      "webkitIsFullScreen",
      "webkitDisplayingFullscreen",
      "mozFullScreen",
      "msFullscreenElement"
    ].find((m2) => document2 && m2 in document2 || targetRef.value && m2 in targetRef.value);
  });
  const fullscreenElementMethod = [
    "fullscreenElement",
    "webkitFullscreenElement",
    "mozFullScreenElement",
    "msFullscreenElement"
  ].find((m2) => document2 && m2 in document2);
  const isSupported2 = useSupported(() => targetRef.value && document2 && requestMethod.value !== void 0 && exitMethod.value !== void 0 && fullscreenEnabled.value !== void 0);
  const isCurrentElementFullScreen = () => {
    if (fullscreenElementMethod)
      return (document2 == null ? void 0 : document2[fullscreenElementMethod]) === targetRef.value;
    return false;
  };
  const isElementFullScreen = () => {
    if (fullscreenEnabled.value) {
      if (document2 && document2[fullscreenEnabled.value] != null) {
        return document2[fullscreenEnabled.value];
      } else {
        const target2 = targetRef.value;
        if ((target2 == null ? void 0 : target2[fullscreenEnabled.value]) != null) {
          return Boolean(target2[fullscreenEnabled.value]);
        }
      }
    }
    return false;
  };
  async function exit() {
    if (!isSupported2.value || !isFullscreen.value)
      return;
    if (exitMethod.value) {
      if ((document2 == null ? void 0 : document2[exitMethod.value]) != null) {
        await document2[exitMethod.value]();
      } else {
        const target2 = targetRef.value;
        if ((target2 == null ? void 0 : target2[exitMethod.value]) != null)
          await target2[exitMethod.value]();
      }
    }
    isFullscreen.value = false;
  }
  async function enter() {
    if (!isSupported2.value || isFullscreen.value)
      return;
    if (isElementFullScreen())
      await exit();
    const target2 = targetRef.value;
    if (requestMethod.value && (target2 == null ? void 0 : target2[requestMethod.value]) != null) {
      await target2[requestMethod.value]();
      isFullscreen.value = true;
    }
  }
  async function toggle() {
    await (isFullscreen.value ? exit() : enter());
  }
  const handlerCallback = () => {
    const isElementFullScreenValue = isElementFullScreen();
    if (!isElementFullScreenValue || isElementFullScreenValue && isCurrentElementFullScreen())
      isFullscreen.value = isElementFullScreenValue;
  };
  useEventListener(document2, eventHandlers, handlerCallback, false);
  useEventListener(() => unrefElement(targetRef), eventHandlers, handlerCallback, false);
  if (autoExit)
    tryOnScopeDispose(exit);
  return {
    isSupported: isSupported2,
    isFullscreen,
    enter,
    exit,
    toggle
  };
}
function resolveElement(el) {
  if (typeof Window !== "undefined" && el instanceof Window)
    return el.document.documentElement;
  if (typeof Document !== "undefined" && el instanceof Document)
    return el.documentElement;
  return el;
}
function useNow(options = {}) {
  const {
    controls: exposeControls = false,
    interval = "requestAnimationFrame"
  } = options;
  const now2 = ref(/* @__PURE__ */ new Date());
  const update = () => now2.value = /* @__PURE__ */ new Date();
  const controls = interval === "requestAnimationFrame" ? useRafFn(update, { immediate: true }) : useIntervalFn(update, interval, { immediate: true });
  if (exposeControls) {
    return {
      now: now2,
      ...controls
    };
  } else {
    return now2;
  }
}
function useScriptTag(src, onLoaded = noop, options = {}) {
  const {
    immediate = true,
    manual = false,
    type = "text/javascript",
    async = true,
    crossOrigin,
    referrerPolicy,
    noModule,
    defer,
    document: document2 = defaultDocument,
    attrs = {}
  } = options;
  const scriptTag = ref(null);
  let _promise = null;
  const loadScript = (waitForScriptLoad) => new Promise((resolve2, reject) => {
    const resolveWithElement = (el2) => {
      scriptTag.value = el2;
      resolve2(el2);
      return el2;
    };
    if (!document2) {
      resolve2(false);
      return;
    }
    let shouldAppend = false;
    let el = document2.querySelector(`script[src="${toValue(src)}"]`);
    if (!el) {
      el = document2.createElement("script");
      el.type = type;
      el.async = async;
      el.src = toValue(src);
      if (defer)
        el.defer = defer;
      if (crossOrigin)
        el.crossOrigin = crossOrigin;
      if (noModule)
        el.noModule = noModule;
      if (referrerPolicy)
        el.referrerPolicy = referrerPolicy;
      Object.entries(attrs).forEach(([name, value]) => el == null ? void 0 : el.setAttribute(name, value));
      shouldAppend = true;
    } else if (el.hasAttribute("data-loaded")) {
      resolveWithElement(el);
    }
    el.addEventListener("error", (event) => reject(event));
    el.addEventListener("abort", (event) => reject(event));
    el.addEventListener("load", () => {
      el.setAttribute("data-loaded", "true");
      onLoaded(el);
      resolveWithElement(el);
    });
    if (shouldAppend)
      el = document2.head.appendChild(el);
    if (!waitForScriptLoad)
      resolveWithElement(el);
  });
  const load = (waitForScriptLoad = true) => {
    if (!_promise)
      _promise = loadScript(waitForScriptLoad);
    return _promise;
  };
  const unload = () => {
    if (!document2)
      return;
    _promise = null;
    if (scriptTag.value)
      scriptTag.value = null;
    const el = document2.querySelector(`script[src="${toValue(src)}"]`);
    if (el)
      document2.head.removeChild(el);
  };
  if (immediate && !manual)
    tryOnMounted(load);
  if (!manual)
    tryOnUnmounted(unload);
  return { scriptTag, load, unload };
}
function checkOverflowScroll(ele) {
  const style = window.getComputedStyle(ele);
  if (style.overflowX === "scroll" || style.overflowY === "scroll" || style.overflowX === "auto" && ele.clientWidth < ele.scrollWidth || style.overflowY === "auto" && ele.clientHeight < ele.scrollHeight) {
    return true;
  } else {
    const parent = ele.parentNode;
    if (!parent || parent.tagName === "BODY")
      return false;
    return checkOverflowScroll(parent);
  }
}
function preventDefault(rawEvent) {
  const e2 = rawEvent || window.event;
  const _target = e2.target;
  if (checkOverflowScroll(_target))
    return false;
  if (e2.touches.length > 1)
    return true;
  if (e2.preventDefault)
    e2.preventDefault();
  return false;
}
const elInitialOverflow = /* @__PURE__ */ new WeakMap();
function useScrollLock(element, initialState = false) {
  const isLocked = ref(initialState);
  let stopTouchMoveListener = null;
  let initialOverflow;
  watch(toRef(element), (el) => {
    const target = resolveElement(toValue(el));
    if (target) {
      const ele = target;
      if (!elInitialOverflow.get(ele))
        elInitialOverflow.set(ele, initialOverflow);
      if (isLocked.value)
        ele.style.overflow = "hidden";
    }
  }, {
    immediate: true
  });
  const lock = () => {
    const el = resolveElement(toValue(element));
    if (!el || isLocked.value)
      return;
    if (isIOS) {
      stopTouchMoveListener = useEventListener(
        el,
        "touchmove",
        (e2) => {
          preventDefault(e2);
        },
        { passive: false }
      );
    }
    el.style.overflow = "hidden";
    isLocked.value = true;
  };
  const unlock = () => {
    var _a2;
    const el = resolveElement(toValue(element));
    if (!el || !isLocked.value)
      return;
    isIOS && (stopTouchMoveListener == null ? void 0 : stopTouchMoveListener());
    el.style.overflow = (_a2 = elInitialOverflow.get(el)) != null ? _a2 : "";
    elInitialOverflow.delete(el);
    isLocked.value = false;
  };
  tryOnScopeDispose(unlock);
  return computed({
    get() {
      return isLocked.value;
    },
    set(v2) {
      if (v2)
        lock();
      else
        unlock();
    }
  });
}
let _id = 0;
function useStyleTag(css2, options = {}) {
  const isLoaded = ref(false);
  const {
    document: document2 = defaultDocument,
    immediate = true,
    manual = false,
    id = `vueuse_styletag_${++_id}`
  } = options;
  const cssRef = ref(css2);
  let stop = () => {
  };
  const load = () => {
    if (!document2)
      return;
    const el = document2.getElementById(id) || document2.createElement("style");
    if (!el.isConnected) {
      el.id = id;
      if (options.media)
        el.media = options.media;
      document2.head.appendChild(el);
    }
    if (isLoaded.value)
      return;
    stop = watch(
      cssRef,
      (value) => {
        el.textContent = value;
      },
      { immediate: true }
    );
    isLoaded.value = true;
  };
  const unload = () => {
    if (!document2 || !isLoaded.value)
      return;
    stop();
    document2.head.removeChild(document2.getElementById(id));
    isLoaded.value = false;
  };
  if (immediate && !manual)
    tryOnMounted(load);
  if (!manual)
    tryOnScopeDispose(unload);
  return {
    id,
    css: cssRef,
    unload,
    load,
    isLoaded: readonly(isLoaded)
  };
}
function useWindowScroll(options = {}) {
  const { window: window2 = defaultWindow, behavior = "auto" } = options;
  if (!window2) {
    return {
      x: ref(0),
      y: ref(0)
    };
  }
  const internalX = ref(window2.scrollX);
  const internalY = ref(window2.scrollY);
  const x2 = computed({
    get() {
      return internalX.value;
    },
    set(x22) {
      scrollTo({ left: x22, behavior });
    }
  });
  const y2 = computed({
    get() {
      return internalY.value;
    },
    set(y22) {
      scrollTo({ top: y22, behavior });
    }
  });
  useEventListener(
    window2,
    "scroll",
    () => {
      internalX.value = window2.scrollX;
      internalY.value = window2.scrollY;
    },
    {
      capture: false,
      passive: true
    }
  );
  return { x: x2, y: y2 };
}
function useWindowSize$1(options = {}) {
  const {
    window: window2 = defaultWindow,
    initialWidth = Number.POSITIVE_INFINITY,
    initialHeight = Number.POSITIVE_INFINITY,
    listenOrientation = true,
    includeScrollbar = true
  } = options;
  const width = ref(initialWidth);
  const height = ref(initialHeight);
  const update = () => {
    if (window2) {
      if (includeScrollbar) {
        width.value = window2.innerWidth;
        height.value = window2.innerHeight;
      } else {
        width.value = window2.document.documentElement.clientWidth;
        height.value = window2.document.documentElement.clientHeight;
      }
    }
  };
  update();
  tryOnMounted(update);
  useEventListener("resize", update, { passive: true });
  if (listenOrientation) {
    const matches = useMediaQuery("(orientation: portrait)");
    watch(matches, () => update());
  }
  return { width, height };
}
const fontIcon = "";
var m$5 = defineComponent({ name: "FontIcon", props: { icon: { type: String, default: "" }, color: { type: String, default: "" }, size: { type: [String, Number], default: "" } }, setup(o2) {
  const c2 = computed(() => {
    const n2 = ["font-icon icon"], t2 = `${"iconfont icon-"}${o2.icon}`;
    return n2.push(t2), n2;
  }), r2 = computed(() => {
    const n2 = {};
    return o2.color && (n2.color = o2.color), o2.size && (n2["font-size"] = Number.isNaN(Number(o2.size)) ? o2.size : `${o2.size}px`), f$4(n2).length ? n2 : null;
  });
  return () => o2.icon ? h$4("span", { key: o2.icon, class: c2.value, style: r2.value, ...{} }) : null;
} });
const artPlayer = "";
const h$2 = (e2) => isString(e2) ? e2 : `${e2}px`, z$2 = (e2, u2 = 0) => {
  const o2 = shallowRef(), p2 = computed(() => h$2(unref(e2.width) || "100%")), m2 = ref("auto"), l2 = (t2) => {
    if (isString(t2)) {
      const [i2, s2] = t2.split(":"), a2 = Number(i2) / Number(s2);
      if (!Number.isNaN(a2))
        return a2;
    }
    return typeof t2 == "number" ? t2 : 16 / 9;
  }, N2 = (t2) => {
    const i2 = unref(e2.height), s2 = l2(unref(e2.ratio));
    return i2 ? h$2(i2) : `${Number(t2) / s2 + unref(u2)}px`;
  }, r2 = () => {
    o2.value && (m2.value = N2(o2.value.clientWidth));
  };
  return onMounted(() => {
    r2(), isRef(u2) && watch(u2, () => r2()), useEventListener("orientationchange", () => r2()), useEventListener("resize", () => r2());
  }), { el: o2, width: p2, height: m2 };
};
const M$3 = ["mp4", "mp3", "webm", "ogg", "m3u8", "hls", "ts", "flv", "mpd", "dash"], z$1 = (e2) => (e2 == null ? void 0 : e2.split(".").pop()) || "", k$3 = async (e2, a2, r2, s2 = false, o2 = 0) => {
  const d2 = (await __vitePreload(() => import("./dash.all.min-b36672bf.js").then((n2) => n2.d), true ? ["assets/dash.all.min-b36672bf.js","assets/commonjsHelpers-7a77ea84.js"] : void 0)).default;
  if (d2.supportsMediaSource()) {
    const i2 = d2.MediaPlayer().create();
    i2.initialize(e2, a2, s2, o2), r2(() => i2.destroy());
  }
}, L$3 = async (e2, a2, r2) => {
  const s2 = (await __vitePreload(() => import("./mpegts-6144d43e.js").then((n2) => n2.m), true ? ["assets/mpegts-6144d43e.js","assets/commonjsHelpers-7a77ea84.js"] : void 0)).default;
  if (s2.isSupported()) {
    const o2 = s2.createPlayer({ type: "flv", url: a2 });
    o2.attachMediaElement(e2), o2.load(), r2(() => o2.destroy());
  }
}, R$2 = async (e2, a2, r2) => {
  const s2 = (await __vitePreload(() => import("./hls.min-fb4a02c6.js").then((n2) => n2.h), true ? ["assets/hls.min-fb4a02c6.js","assets/commonjsHelpers-7a77ea84.js"] : void 0)).default;
  if (e2.canPlayType("application/x-mpegURL") || e2.canPlayType("application/vnd.apple.mpegURL"))
    e2.src = a2;
  else if (s2.isSupported()) {
    const o2 = new s2();
    o2.attachMedia(e2), o2.on(s2.Events.MEDIA_ATTACHED, function() {
      o2.loadSource(a2);
    }), r2(() => o2.destroy());
  }
}, D = ["no-fullscreen", "no-hotkey", "no-playback-rate", "no-setting", "no-mutex", "no-plays-inline"], O$1 = ["airplay", "autoplay", "aspect-ratio", "auto-mini", "auto-size", "auto-orientation", "auto-playback", "fast-forward", "flip", "fullscreen-web", "lock", "loop", "is-live", "muted", "mini-progress-bar", "pip", "screenshot", "subtitle-offset"], U$3 = ["en", "pl", "cs", "es", "fa", "fr", "id", "ru"], _$1 = ["zh-cn", "zh-tw"], x$2 = (e2) => {
  const a2 = e2.toLowerCase(), r2 = a2.split("-")[0];
  return _$1.includes(a2) ? a2 : U$3.includes(r2) ? r2 : r2 === "zh" ? "zh-cn" : "en";
};
var C$3 = defineComponent({ name: "ArtPlayer", inheritAttrs: false, props: { src: { type: String, required: true }, type: { type: String, default: "" }, poster: { type: String, default: "" }, title: { type: String, default: "" }, width: { type: [String, Number], default: "100%" }, height: { type: [String, Number], default: void 0 }, ratio: { type: [String, Number], default: 16 / 9 }, config: { type: Object, default: null }, customPlayer: { type: Function, default: (e2) => e2 } }, setup(e2, { attrs: a2 }) {
  const r2 = usePageLang(), { el: s2, width: o2, height: d2 } = z$2(e2, 0), i2 = ref(false);
  let f2;
  const g2 = () => {
    var _a2, _b2, _c;
    const t2 = { theme: "#3eaf7c", ...{ "fullscreen": true, "playbackRate": true, "setting": true }, container: s2.value, poster: e2.poster, url: e2.src, type: e2.type || z$1(e2.src), lang: x$2(r2.value), ...e2.config, useSSR: false }, l2 = f$4(a2);
    if (D.forEach((n2) => {
      l2.includes(n2) && (t2[camelize(n2.replace(/^no-/, ""))] = false);
    }), O$1.forEach((n2) => {
      l2.includes(n2) && (t2[camelize(n2)] = true);
    }), t2.type) {
      const n2 = t2.customType ?? (t2.customType = {});
      if (M$3.includes(t2.type.toLowerCase()))
        switch (t2.type) {
          case "m3u8":
          case "hls":
            n2[_a2 = t2.type] ?? (n2[_a2] = (p2, c2, u2) => R$2(p2, c2, (y2) => {
              u2.on("destroy", y2);
            }));
            break;
          case "flv":
            n2[_b2 = t2.type] ?? (n2[_b2] = (p2, c2, u2) => L$3(p2, c2, (y2) => {
              u2.on("destroy", y2);
            }));
            break;
          case "mpd":
          case "dash":
            n2[_c = t2.type] ?? (n2[_c] = (p2, c2, u2) => k$3(p2, c2, (y2) => {
              u2.on("destroy", y2);
            }));
            break;
        }
      else
        console.warn(`[components]: ArtPlayer does not support current file type ${t2.type}!`);
    }
    return t2;
  };
  return onMounted(async () => {
    const { default: t2 } = await __vitePreload(() => import("./artplayer-3aa2e2e1.js").then((n2) => n2.a), true ? ["assets/artplayer-3aa2e2e1.js","assets/commonjsHelpers-7a77ea84.js","assets/commonjs-dynamic-modules-58f2b0ec.js"] : void 0), l2 = new t2(g2());
    f2 = await e2.customPlayer(l2) || l2, i2.value = true;
  }), onUnmounted(() => {
    f2 == null || f2.destroy();
  }), () => [h$4("div", { ref: s2, class: "vp-artplayer", style: { width: o2.value, height: d2.value } }), i2.value ? null : h$4(C$4)];
} });
const badge = "";
const o$7 = ({ type: r2 = "info", text: e2 = "", vertical: i2, color: l2 }, { slots: t2 }) => {
  var a2;
  return h$4("span", { class: ["vp-badge", r2, { diy: l2 }], style: { verticalAlign: i2 ?? false, backgroundColor: l2 ?? false } }, ((a2 = t2.default) == null ? void 0 : a2.call(t2)) || e2);
};
o$7.displayName = "Badge";
const biliBili = "";
const e$5 = "accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture";
const d$3 = "https://player.bilibili.com/player.html";
var S$3 = defineComponent({ name: "BiliBili", props: { bvid: { type: String, default: "" }, aid: { type: String, default: "" }, cid: { type: String, default: "" }, title: { type: String, default: "A BiliBili video" }, page: { type: [String, Number], default: 1 }, width: { type: [String, Number], default: "100%" }, height: { type: [String, Number], default: void 0 }, ratio: { type: [String, Number], default: 16 / 9 }, time: { type: [String, Number], default: 0 }, autoplay: Boolean }, setup(i2) {
  const { el: m2, width: n2, height: f2 } = z$2(i2), e2 = ref(false), l2 = computed(() => {
    const { aid: a2, bvid: r2, cid: o2, autoplay: u2, time: p2, page: s2 } = i2;
    return a2 && o2 ? `${d$3}?aid=${a2}&cid=${o2}&t=${p2}&autoplay=${u2 ? 1 : 0}&page=${s2}` : r2 ? `${d$3}?bvid=${r2}&t=${p2}&autoplay=${u2 ? 1 : 0}` : null;
  });
  return () => l2.value ? [h$4("div", { class: "bilibili-desc" }, h$4("a", { class: "sr-only", href: l2.value }, i2.title)), h$4("iframe", { ref: m2, src: l2.value, title: i2.title, class: "bilibili-iframe", allow: e$5, style: { width: n2.value, height: e2.value ? f2.value : 0 }, onLoad: () => {
    e2.value = true;
  } }), e2.value ? null : h$4(C$4)] : [];
} });
const p = "https://codepen.io", w = (e2) => {
  let n2 = "";
  for (const t2 in e2)
    t2 !== "prefill" && t2 !== "open" && (n2 !== "" && (n2 += "&"), n2 += t2 + "=" + encodeURIComponent(e2[t2]));
  return n2;
}, a$7 = (e2) => {
  const n2 = e2.preview === "true" ? "embed/preview" : "embed";
  if ("prefill" in e2)
    return [p, n2, "prefill"].join("/");
  let t2 = e2["slug-hash"];
  if (!t2)
    throw new Error("slug-hash is required");
  return e2.token && (t2 += "/" + e2.token), [p, e2.user || "anon", n2, t2 + "?" + w(e2)].join("/").replace(/\/\//g, "//");
}, i$6 = (e2, n2) => {
  const t2 = document.createElement(e2);
  for (const r2 in n2)
    Object.prototype.hasOwnProperty.call(n2, r2) && t2.setAttribute(r2, n2[r2].toString());
  return t2;
}, c$5 = (e2) => {
  const n2 = i$6("form", { class: "code-pen-embed-form", style: "display: none;", method: "post", action: a$7(e2), target: e2.name || "" });
  for (const t2 in e2)
    t2 !== "prefill" && n2.append(i$6("input", { type: "hidden", name: t2, value: e2[t2].toString() }));
  return n2;
}, m$4 = (e2) => {
  const { height: n2 = 300, class: t2 = "", name: r2 = "CodePen Embed" } = e2, s2 = { class: `cp_embed_iframe ${t2}`, src: a$7(e2), allowfullscreen: "", allowpaymentrequest: "", allowTransparency: "", frameborder: 0, width: "100%", height: n2, name: r2, scrolling: "no", style: "width: 100%; overflow: hidden; display: block;", title: e2["pen-title"] || r2 };
  return "prefill" in e2 || (s2.loading = "lazy"), e2["slug-hash"] && (s2.id = `code-pen-embed-${e2["slug-hash"].replace("/", "_")}`), i$6("iframe", s2);
}, f$3 = (e2, n2) => {
  if (e2.parentNode) {
    const t2 = document.createElement("div");
    return t2.className = "code-pen-embed-wrapper", t2.append(n2), e2.parentNode.replaceChild(t2, e2), t2;
  }
  return e2.append(n2), e2;
};
let $$1 = 1;
const N$2 = (e2, n2) => {
  const t2 = typeof n2 == "string" ? document.querySelector(n2) : n2 instanceof HTMLElement ? n2 : null;
  e2.user || (e2.user = "anon"), e2.name || (e2.name = t2 ? `code-pen-api-${$$1++}` : "_blank");
  const r2 = document.createDocumentFragment();
  let s2 = null;
  "prefill" in e2 && (e2.data = JSON.stringify(e2.prefill || "{}"), s2 = c$5(e2), r2.append(s2)), t2 ? (r2.append(m$4(e2)), f$3(t2, r2)) : document.body.appendChild(r2), s2 && s2.submit();
};
const codePen = "";
var d$2 = defineComponent({ name: "CodePen", props: { link: { type: String, default: "" }, user: { type: String, default: "" }, slugHash: { type: String, default: "" }, title: { type: String, default: "" }, height: { type: [String, Number], default: 380 }, theme: { type: String, default: "default" }, defaultTab: { type: Array, default: () => ["result"] }, status: { type: String, default: "preview" } }, setup(e2) {
  const r2 = () => {
    const n2 = /(?:^(?:https?:)?\/\/codepen.io\/|^\/|^)(.*?)\/(?:pen|embed)\/(.*?)\/?$/.exec(e2.link);
    return { user: n2 == null ? void 0 : n2[1], slugHash: n2 == null ? void 0 : n2[2] };
  }, l2 = computed(() => r2().user || e2.user), u2 = computed(() => r2().slugHash || e2.slugHash), o2 = computed(() => ({ user: l2.value, "slug-hash": u2.value, "theme-id": e2.theme, "default-tab": e2.defaultTab.join(","), "pen-title": e2.title, height: e2.height, preview: e2.status === "preview" ? "true" : "" }));
  return onMounted(() => {
    e2.status !== "clicktorun" && N$2(o2.value, `.codepen-${u2.value}`);
  }), () => h$4("div", { class: ["codepen-wrapper", `codepen-${u2.value}`] }, [e2.status === "clicktorun" ? h$4("button", { type: "button", class: "codepen-button", onClick: () => {
    N$2(o2.value, `.codepen-${u2.value}`);
  } }, "Run Code") : null, h$4("span", ["See the Pen ", h$4("a", { href: e2.link }, [e2.title]), " by ", h$4("a", { href: `https://codepen.io/${l2.value}` }, [l2.value]), " on ", h$4("a", { href: "https://codepen.io" }, ["CodePen"]), "."])]);
} });
const pdf = "";
const r$6 = (i2) => isLinkHttp(i2) ? i2 : withBase(i2);
const u$3 = (e2) => {
  console.error("[PDF]: " + e2);
}, R$1 = (e2) => {
  for (; e2.firstChild; )
    e2.removeChild(e2.firstChild);
}, E$1 = (e2) => e2 === "string" ? document.querySelector(e2) : e2 instanceof HTMLElement ? e2 : document.body, M$2 = (e2) => {
  let t2 = "";
  return e2 && (t2 += M$4(e2).map(([o2, i2]) => o2 === "noToolbar" ? `toolbar=${i2 ? 0 : 1}` : `${encodeURIComponent(o2)}=${encodeURIComponent(i2)}`).join("&"), t2 && (t2 = `#${t2.slice(0, t2.length - 1)}`)), t2;
}, f$2 = (e2, t2, o2, i2, n2) => {
  R$1(t2);
  let a2 = o2;
  e2 === "pdfjs" && (a2 = `${`${ensureEndingSlash(withBase(null))}web/viewer.html`}?file=${encodeURIComponent(o2)}${M$2(i2)}`);
  const d2 = e2 === "pdfjs" || e2 === "iframe" ? "iframe" : "embed", r2 = document.createElement(d2);
  return r2.className = "pdf-viewer", r2.type = "application/pdf", r2.title = n2, r2.src = a2, r2 instanceof HTMLIFrameElement && (r2.allow = "fullscreen"), t2.classList.add("pdf-viewer-container"), t2.appendChild(r2), t2.getElementsByTagName(d2)[0];
}, U$2 = (e2, t2 = null, { title: o2, hint: i2, options: n2 = {} }) => {
  var a2, d2;
  if (typeof window > "u" || !((a2 = window == null ? void 0 : window.navigator) != null && a2.userAgent))
    return null;
  const { navigator: r2 } = window, { userAgent: l2 } = r2, c2 = window.Promise !== void 0, s2 = le(l2) || ie(l2), g2 = !s2 && ae(l2), h2 = !s2 && /firefox/i.test(l2) && l2.split("rv:").length > 1 ? parseInt(l2.split("rv:")[1].split(".")[0], 10) > 18 : false, w2 = !s2 && (c2 || h2);
  if (!isString(e2))
    return u$3("URL is not valid"), null;
  const p2 = E$1(t2);
  if (!p2)
    return u$3("Target element cannot be determined"), null;
  const m2 = o2 || ((d2 = /\/([^/]+).pdf/.exec(e2)) == null ? void 0 : d2[1]) || "PDF Viewer";
  return w2 || !s2 ? f$2(g2 ? "iframe" : "embed", p2, e2, n2, m2) : (p2.innerHTML = i2.replace(/\[url\]/g, e2), u$3("This browser does not support embedded PDFs"), null);
};
var j = defineComponent({ name: "PDF", props: { url: { type: String, required: true }, title: { type: String, default: "" }, width: { type: [String, Number], default: "100%" }, height: { type: [String, Number], default: void 0 }, ratio: { type: [String, Number], default: 16 / 9 }, page: { type: [String, Number], default: 1 }, noToolbar: Boolean, zoom: { type: [String, Number], default: 100 } }, setup(e2) {
  const { el: t2, width: o2, height: i2 } = z$2(e2), n2 = Ze({ "/": { "hint": "<p>此浏览器不支持嵌入式 PDF。请下载 PDF 查看：<a href='[url]' target='_blank'>下载 PDF</a></p>" } });
  return onMounted(() => {
    U$2(r$6(e2.url), t2.value, { title: e2.title, hint: n2.value.hint, options: { page: e2.page, noToolbar: e2.noToolbar, zoom: e2.zoom } });
  }), () => h$4("div", { class: "pdf-viewer-wrapper", ref: t2, style: { width: o2.value, height: i2.value } });
} });
const replIt = "";
var g$4 = defineComponent({ name: "Replit", props: { link: { type: String, default: "" }, user: { type: String, default: "" }, repl: { type: String, default: "" }, width: { type: [String, Number], default: "100%" }, height: { type: [String, Number], default: void 0 }, ratio: { type: [String, Number], default: 16 / 9 }, theme: { type: String, default: "light" }, file: { type: String, default: () => null }, plain: Boolean, text: { type: String, default: "Open on Replit" } }, setup(e2) {
  const { el: a2, width: u2, height: p2 } = z$2(e2), l2 = ref(false), r2 = computed(() => {
    var n2;
    if (e2.link) {
      const i2 = new URL(e2.link);
      return e2.plain ? i2.searchParams.delete("embed") : i2.searchParams.set("embed", "true"), i2.toString();
    }
    return e2.user && e2.repl ? `https://replit.com/@${e2.user}/${e2.repl}${e2.plain ? "" : "?embed=true"}${(n2 = e2.file) != null && n2.length ? `#${e2.file}` : ""}` : null;
  });
  return () => r2.value ? h$4("div", { class: "replit-wrapper" }, e2.plain ? h$4("button", { type: "button", class: "replit-button", onClick: () => {
    window.open(r2.value, "_blank");
  } }, e2.text) : [h$4("iframe", { ref: a2, class: "replit-iframe", src: r2.value, style: { width: u2.value, height: l2.value ? p2.value : 0 }, onLoad: () => {
    l2.value = true;
  } }), l2.value ? null : h$4(C$4)]) : null;
} });
const balloon = "";
const popup$1 = "";
const shareService = "";
const g$3 = (t2) => {
  var r2;
  return ((r2 = document.querySelector(`meta[name="${t2}"]`)) == null ? void 0 : r2.getAttribute("content")) ?? null;
}, q$2 = (t2, r2 = "") => {
  const a2 = ["vp-share-icon", r2];
  return isLinkHttp(t2) || Oe(t2) ? h$4("img", { class: a2, src: t2, "no-view": "" }) : z$3(t2, "<") && Pe(t2, ">") ? h$4("div", { class: a2, innerHTML: t2 }) : h$4("div", { class: [...a2, t2] });
};
var B = defineComponent({ name: "ShareService", props: { config: { type: Object, default: () => ({}) }, plain: Boolean, title: { type: String, required: false }, description: { type: String, required: false }, url: { type: String, required: false }, summary: { type: String, required: false }, cover: { type: String, required: false }, tag: { type: [Array, String], required: false } }, setup(t2) {
  let r2;
  const a2 = usePageData(), c2 = usePageFrontmatter(), e2 = ref(false), s2 = () => {
    var n2;
    const i2 = t2.title ?? a2.value.title, u2 = t2.description ?? c2.value.description ?? g$3("description") ?? g$3("og:description") ?? g$3("twitter:description"), m2 = t2.url ?? typeof window > "u" ? null : window.location.href, p2 = t2.cover ?? g$3("og:image"), v2 = (n2 = document.querySelector(`${".theme-default-content"} :not(a) > img`)) == null ? void 0 : n2.getAttribute("src"), f2 = t2.tag ?? c2.value.tag ?? c2.value.tags, y2 = isArray$1(f2) ? f2.filter(isString).join(",") : isString(f2) ? f2 : null;
    return t2.config.link.replace(/\[([^\]]+)\]/g, (D2, k2) => {
      const A2 = k2.split("|");
      for (const l2 of A2) {
        if (l2 === "url" && m2)
          return m2;
        if (l2 === "title" && i2)
          return i2;
        if (l2 === "description" && u2)
          return u2;
        if (l2 === "summary" && t2.summary)
          return t2.summary;
        if (l2 === "cover" && p2)
          return p2;
        if (l2 === "image" && v2)
          return v2;
        if (l2 === "tags" && y2)
          return y2;
      }
      return "";
    });
  }, d2 = () => {
    const n2 = s2();
    switch (t2.config.action) {
      case "navigate":
        window.open(n2);
        break;
      case "open":
        window.open(n2, "_blank");
        break;
      case "qrcode":
        __vitePreload(() => import("./browser-e6953f98.js").then((n3) => n3.b), true ? [] : void 0).then(({ toDataURL: i2 }) => i2(n2, { errorCorrectionLevel: "H", width: 250, scale: 1, margin: 1.5 })).then((i2) => {
          r2.emit(`<img src="${i2}" alt="qrcode" class="share-qrcode" />`);
        });
        break;
      default:
        Ye(n2, "share");
    }
  };
  return onMounted(() => {
    r2 = new Ve();
  }), () => {
    const { config: { name: n2, icon: i2, shape: u2, color: m2 }, plain: p2 } = t2;
    return [h$4("button", { type: "button", class: ["vp-share-button", { plain: p2 }], "aria-label": n2, "data-balloon-pos": "up", onClick: () => d2() }, p2 ? q$2(u2, "plain") : i2 ? q$2(i2) : h$4("div", { class: "vp-share-icon colorful", style: { background: m2 }, innerHTML: u2 })), e2.value ? h$4("div", { class: "share-popup" }) : null];
  };
} });
const G$1 = [{ "name": "buffer", "link": "https://bufferapp.com/add?text=[title]&url=[url]", "color": "#333", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="m942.837 500.76-84.36-41.48a43.84 43.84 0 0 0-38.6-.12L531.2 598.919a43.8 43.8 0 0 1-38.4 0l-288.638-139.76a43.84 43.84 0 0 0-38.6.12l-84.399 41.48c-12.24 6-12.2 24.4.08 30.32L492.84 730.318c12.16 5.92 26.2 5.92 38.36 0l411.557-199.239c12.28-5.96 12.32-24.32.08-30.32zm0 239.998-84.36-41.48a43.84 43.84 0 0 0-38.6-.12L531.2 838.917a43.8 43.8 0 0 1-38.4 0l-288.638-139.76a43.84 43.84 0 0 0-38.6.12l-84.399 41.48c-12.24 6-12.2 24.4.08 30.32L492.84 970.316c12.16 5.92 26.2 5.92 38.36 0l411.557-199.239c12.28-5.96 12.32-24.32.08-30.32zM489.6 59.963 81.163 260.76c-12.24 6-12.2 24.4.08 30.32L492.84 490.319c12.16 5.92 26.16 5.92 38.32 0l411.597-199.238c12.28-5.96 12.32-24.32.08-30.32L534.44 59.963a50.68 50.68 0 0 0-44.84 0z"/></svg>' }, { "name": "douban", "link": "https://shuo.douban.com/!service/share?href=[url]&name=[title]&text=[description|summary]&image=[cover|image]&starid=0&aid=0&style=11", "color": "#00b51d", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M943.4 65.7H81.6c-8.8 0-16 7.1-16 16v63.8c0 8.8 7.1 16 16 16h861.7c8.8 0 16-7.1 16-16V81.6c0-8.8-7.1-15.9-15.9-15.9zm0 797.9h-233l83-207.5h70.2c8.8 0 16-7.1 16-16v-367c0-8.8-7.1-16-16-16H161.4c-8.8 0-16 7.1-16 16v367c0 8.8 7.1 16 16 16h504.3l-83 207.5H426.3L368.9 720c0-8.8-7.1-16-16-16h-95.7c-8.8 0-16 7.1-16 16l57.4 143.6h-217c-8.8 0-16 7.1-16 16v63.8c0 8.8 7.1 16 16 16h861.7c8.8 0 16-7.1 16-16v-63.8c0-8.9-7.1-16-15.9-16zM289.1 560.4V352.9h446.8v207.5H289.1z"/></svg>' }, { "name": "email", "link": "mailto:?subject=[title]&body=[url]%0D%0A%0D%0A[description|summary]", "color": "#1384FF", "action": "open", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M146.375 174.5C99.793 174.5 62 212.293 62 258.875c0 26.543 12.48 51.504 33.75 67.5l382.5 286.875c20.04 14.941 47.46 14.941 67.5 0l382.5-286.875c21.27-15.996 33.75-40.957 33.75-67.5 0-46.582-37.793-84.375-84.375-84.375h-731.25zM62 371.375V737c0 62.05 50.45 112.5 112.5 112.5h675c62.05 0 112.5-50.45 112.5-112.5V371.375L579.5 658.25a112.324 112.324 0 0 1-135 0L62 371.375z"/></svg>' }, { "name": "evernote", "link": "https://www.evernote.com/clip.action?url=[url]&title=[title]", "color": "#3c599b", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M369.64 264.42c3.2 44.62-35.1 43.18-43.22 43.18-137.86 0-147.28-2-167.16 6.68-1.12.44-1.48 0-.74-.74L375.58 92.9c.76-.74 1.2-.44.76.74-8.7 19.98-6.7 30.18-6.7 170.78zm158 616c-29.36-74.16 26-153.86 105.04-153.24 34.98 0 45.2 46.42 15.9 62.84-12.38 6.6-49.9 3.48-50.28 38.4-.1 34.18 39.34 50 62.4 49.78a91.28 91.28 0 0 0 91.3-91.3v-.16c0-23.26-15.58-94.44-95.08-110.68-15.44-3.08-130-12.7-136.7-101.04C512.74 608.88 485.42 702 434 713.2c-17.48 3.88-139.36 15.28-225.84-73.54 0 0-37.14-30.46-56.46-115.9-6.76-31.5-18.56-79.4-22.28-124 0-36 22.28-60.9 50.14-64.4 162 0 180 4.64 202-15.6 19.64-18.48 15.6-31 15.6-205.56 2-16.6 15.58-61.62 106.82-48.28 12 1.72 63.82 8.36 74.96 61.28l128.52 22.3c40.86 7.42 141.88 14 161.2 115.88 45.32 242.18 17.82 476.92 15.6 476.92C852.3 971.06 662.12 960 662.12 960c-37.9-.46-108.5-18.8-134.54-79.66zm161.88-409.68c-2 3.84-4.4 12 1.7 14 28.18 9.86 79.5 13.68 91.76 11.06 6.22-.5 6.1-8.86 4.96-13.3-7.06-43.7-81.66-53-98.48-11.84z"/></svg>', "icon": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#14cc45"/><path fill="#595757" d="M347.671 193.259v87.51h-87.51z"/><path fill="#595757" d="M788.047 323.645s3.65-77.491-73.84-103.02c0 0-89.479-12.867-151.41-11.91 0 0-8.595-53.23-103.33-53.23 0 0-89.556-1.244-89.892 70.526v61.671s2.848 14.991-27.833 14.991h-81.581s-34.28 5.282-34.28 72.934c0 0 3.133 120.082 41.322 200.24 0 0 9.398 34.667 58.228 46.577 0 0 95.822 25.477 123.991 21.722 0 0 58.228 22.137 62.008-111.874 0 0 3.755-19.935 6.266 11.392 0 0-1.89 68.948 57.607 72.702 0 0 45.723 12.557 73.892 10.045 0 0 37.568 2.15 37.568 64.158 0 0 13.152 71.665-34.435 71.665h-65.763s-18.149 4.428-18.149-21.877c0 0-4.997-21.878 26.305-21.878h15.534v-43.756h-43.082s-66.332-6.317-66.332 50.047v75.135s9.347 49.866 66.332 49.866h121.273s48.441.44 76.61-90.359c0-.078 48.52-182.323 22.991-435.767zM625.272 486.523c0-21.877 18.02-51.16 39.432-51.16s36.48 36.118 36.48 58.022c-28.79-7.897-45.827-9.606-75.912-6.862z"/></svg>' }, { "name": "facebook", "link": "https://www.facebook.com/sharer/sharer.php?u=[url]&title=[title]&description=[description]&quote=[summary]&hashtag=[tags]", "color": "#3c599b", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M960 113.4v797c0 27.4-22.2 49.4-49.4 49.4H682.2V613h116.4L816 477.8H682v-86.4c0-39.2 10.8-65.8 67-65.8h71.6v-121c-12.4-1.6-54.8-5.4-104.4-5.4-103.2 0-174 63-174 178.8v99.8H425.4V613h116.8v347H113.4C86.2 960 64 937.8 64 910.6V113.4C64 86.2 86.2 64 113.4 64h797c27.4 0 49.6 22.2 49.6 49.4z"/></svg>', "icon": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="#537bbc" d="M512.298 1021.22c281.23 0 509.235-227.973 509.235-509.22 0-281.218-228.005-509.22-509.235-509.22C231.066 2.78 3.078 230.782 3.078 512c0 281.247 227.986 509.22 509.22 509.22"/><path fill="#fff" d="M353.357 400.378h68.151v-66.235c0-29.206.737-74.247 21.952-102.142 22.348-29.542 53.026-49.622 105.794-49.622 85.976 0 122.18 12.263 122.18 12.263L654.4 295.61s-28.407-8.213-54.903-8.213c-26.512 0-50.243 9.5-50.243 35.995v76.988h108.687L650.352 499H549.254v342.602H421.508V499h-68.15v-98.622z"/></svg>' }, { "name": "flipboard", "link": "https://share.flipboard.com/bookmarklet/popout?v=2&url=[url]&title=[title]", "color": "#e12828", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M90.125 90.125h270.703v843.75H90.125V90.125zm298.828 298.828h274.219v274.219H388.953V388.953zm0-298.828h544.922v270.703H388.953V90.125z"/></svg>', "icon": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#e12828"/><path fill="#fff" d="M263.487 261.893H445.92V809.17H263.487V261.893z"/><path fill="#fce9e9" d="M445.92 261.893h364.842v182.435H445.92V261.893z"/><path fill="#f6bebe" d="M445.92 444.328h182.435v182.435H445.92V444.328z"/></svg>' }, { "name": "line", "link": "https://line.me/R/msg/text/?[title]%0D%0A[url]%0D%0A[description|summary]", "color": "#00b902", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M806.6 426.52a25.24 25.24 0 0 1 0 50.44h-70.2v45h70.2a25.2 25.2 0 1 1 0 50.36h-95.44a25.24 25.24 0 0 1-25.08-25.16V356.32c0-13.8 11.28-25.2 25.2-25.2h95.44a25.2 25.2 0 0 1-.12 50.4h-70.2v45h70.2zM652.4 547.16a25.2 25.2 0 0 1-25.24 25.08 24.72 24.72 0 0 1-20.4-10l-97.72-132.68v117.6a25.2 25.2 0 0 1-50.28 0V356.32a25.08 25.08 0 0 1 24.96-25.12c7.8 0 15 4.16 19.8 10.16L602 474.56V356.32c0-13.8 11.28-25.2 25.2-25.2 13.8 0 25.2 11.4 25.2 25.2v190.84zm-229.64 0a25.28 25.28 0 0 1-25.24 25.16 25.24 25.24 0 0 1-25.08-25.16V356.32c0-13.8 11.28-25.2 25.2-25.2 13.84 0 25.12 11.4 25.12 25.2v190.84zm-98.64 25.16h-95.44a25.36 25.36 0 0 1-25.2-25.16V356.32c0-13.8 11.4-25.2 25.2-25.2 13.92 0 25.2 11.4 25.2 25.2v165.64h70.24a25.2 25.2 0 0 1 0 50.36M992 444.56c0-214.84-215.4-389.68-480-389.68S32 229.72 32 444.56C32 637 202.8 798.24 433.4 828.88c15.64 3.28 36.92 10.32 42.32 23.6 4.8 12.04 3.16 30.64 1.52 43.2l-6.56 40.8c-1.8 12.04-9.6 47.44 41.96 25.8 51.64-21.56 276.64-163.12 377.44-279C959.04 607.72 992 530.32 992 444.56"/></svg>' }, { "name": "qq", "link": 'https://connect.qq.com/widget/shareqq/index.html?url=[url]&title=[title]&source=[title]&desc=[description]&pics=[cover]&summary="[summary]"', "color": "#5eaade", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M867.897 627.143c-18.205-58.482-39.14-107.634-71.339-188.075 5.006-211.285-82.83-382.18-285.127-382.18-204.572 0-290.475 174.308-285.013 382.18-32.313 80.555-53.134 129.366-71.339 188.075-38.684 124.587-26.169 176.128-16.611 177.266 20.48 2.503 79.758-93.753 79.758-93.753 0 55.751 28.672 128.455 90.794 180.907-30.037 9.216-97.507 34.02-81.464 61.212 12.97 21.96 223.232 13.995 283.875 7.168 60.644 6.827 270.905 14.791 283.876-7.168 16.042-27.079-51.542-51.996-81.465-61.212 62.122-52.566 90.794-125.27 90.794-180.907 0 0 59.279 96.256 79.759 93.753 9.67-1.252 22.186-52.793-16.498-177.266z"/></svg>' }, { "name": "qrcode", "action": "qrcode", "link": "[url]", "color": "#999", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M409.6 68H136.533c-37.5 0-68 31-68 68v273.6c0 37.547 31 68 68 68H409.6c37.547 0 68-31 68-68V136.533c0-37.5-31-68-68-68zm-68 256c0 9-8 17-17 17H222.2c-9 0-17-8-17-17V221.6c0-9 8-17 17-17h102.4c9 0 17 8 17 17V324zM887.734 68H614.4c-37.547 0-68 31-68 68v273.6c0 37.547 31 68 68 68h273c37.5 0 68-31 68-68V136.533c0-37.5-31-68-68-68zm-68 256c0 9-8 17-17 17h-102.4c-9 0-17-8-17-17V221.6c0-9 8-17 17-17h102.4c9 0 17 8 17 17V324zM409.6 546.133H136.533c-37.5 0-68 31-68 68v273c0 37.5 31 68 68 68H409.6c37.547 0 68-31 68-68V614.4c0-37.547-31-68-68-68zm-68 256c0 9-8 17-17 17H222.2c-9 0-17-8-17-17v-102.4c0-9 8-17 17-17h102.4c9 0 17 8 17 17v102.4zm580-86.4H785V768c0 9.5-8 17-17 17h-52v137.6c0 18.8 15 34 34.134 34.133H921.6c18.8 0 34.133-15 34.133-34.133V749.8c0-18.774-15-34.134-34.133-34.134zm-204.8-137.6c0-18.8-15-34.133-34.133-34.133H579.2c-18.8 0-34 15-34 34.133v104.534c0 18.8 15 34 34 34.133h103.467c18.8 0 34.133-15 34.133-34.133V578.133zm-85.333 275.2H563.2c-9.5 0-17 8-17 17v68c0 9.5 8 17 17 17h68c9.5 0 17-8 17-17V870.4c0-9.5-8-17-17-17zm307.2-307.2H870.4c-9.5 0-17 8-17 17v68c0 9.5 8 17 17 17h68c9.5 0 17-8 17-17V563.2c0-9.5-8-17-17-17z"/></svg>' }, { "name": "reddit", "link": "https://www.reddit.com/submit?title=[title]&url=[url]", "color": "#ff4501", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M967.111 531.911a114 114 0 0 0-114-114 111.957 111.957 0 0 0-68.266 24.121A518.827 518.827 0 0 0 554.103 372.4l28.217-161.564a10.923 10.923 0 0 1 10.923-9.558h3.186l142.905 43.691a91 91 0 1 0 19.114-65.536l-143.815-41.87a91 91 0 0 0-22.3-3.186 79.644 79.644 0 0 0-78.28 65.991L484.926 372.4a524.288 524.288 0 0 0-246.215 69.632 111.957 111.957 0 0 0-68.266-24.12 113.323 113.323 0 0 0-69 205.71 176.583 176.583 0 0 0 0 21.845c0 150.642 182.044 273.067 409.6 273.067S921.6 796.33 921.6 645.689a176.583 176.583 0 0 0 0-21.845 114 114 0 0 0 45.511-91.933zm-682.667 45.511a69 69 0 1 1 69 69 69 69 0 0 1-69-69zm373.647 202.07a23.21 23.21 0 0 1-11.378 14.563 286.265 286.265 0 0 1-269.426 0 23.21 23.21 0 0 1-11.378-14.563 23.666 23.666 0 0 1 3.641-18.205l13.198-18.66a22.3 22.3 0 0 1 29.128-5.916 230.741 230.741 0 0 0 200.248 0 22.3 22.3 0 0 1 29.128 7.282l13.198 18.66a23.666 23.666 0 0 1 3.64 16.839zm13.198-133.803a69 69 0 1 1 69-69 69 69 0 0 1-69 69z"/></svg>' }, { "name": "skype", "link": "https://web.skype.com/share?url=[title]%0D%0A[url]%0D%0A[description|summary]", "color": "#00aff0", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M743.429 607.429q0-28.572-11.143-52.286T704.57 516t-41.714-28-47.143-19.429-50-13.142l-59.428-13.715q-17.143-4-25.143-6t-20-6.571T444 420t-9.429-12-4.285-17.143q0-44 82.285-44 24.572 0 44 6.857T587.43 370t21.714 19.143T632 405.714t27.429 6.857q26.857 0 43.142-18.285t16.286-44q0-31.429-32-56.857t-81.143-38.572-104-13.143q-38.857 0-75.428 8.857T358 277.43t-50.857 49.714T288 400.57q0 34.858 10.857 60.858t32 43.142 45.714 27.715 58.858 18.571l83.428 20.572q51.429 12.571 64 20.571 18.286 11.429 18.286 34.286 0 22.285-22.857 36.857t-60 14.571q-29.143 0-52.286-9.143t-37.143-22-26-25.714-26.286-22-30.857-9.143q-28.571 0-43.143 17.143T288 649.714q0 52.572 69.714 90T524 777.143q41.714 0 80-10.572T674 736t50.571-53.429 18.858-75.142zm207.428 124q0 90.857-64.286 155.142T731.43 950.857q-74.286 0-133.715-45.714-44 9.143-85.714 9.143-81.714 0-156.286-31.715t-128.571-85.714-85.714-128.571T109.714 512q0-41.714 9.143-85.714-45.714-59.429-45.714-133.715 0-90.857 64.286-155.142T292.57 73.143q74.286 0 133.715 45.714 44-9.143 85.714-9.143 81.714 0 156.286 31.715t128.571 85.714 85.714 128.571T914.286 512q0 41.714-9.143 85.714 45.714 59.429 45.714 133.715z"/></svg>' }, { "name": "telegram", "link": "https://t.me/share/url?url=[url]&text=[title]%0D%0A[description|summary]", "color": "#158cc7", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="m410.965 814.649 12.743-192.512L773.234 307.2c15.474-14.108-3.186-20.935-23.666-8.647L318.123 571.164 131.527 512c-40.05-11.378-40.505-39.14 9.102-59.164l726.813-280.349c33.223-15.019 65.08 8.192 52.338 59.165L795.99 814.649c-8.648 41.415-33.679 51.427-68.267 32.313L539.307 707.698l-90.567 87.836c-10.468 10.468-19.115 19.115-37.775 19.115z"/></svg>' }, { "name": "twitter", "link": "https://twitter.com/intent/tweet?text=[title]&url=[url]&hashtags=[tags][title]", "color": "#3397db", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M921.177 283.063c-25.031 23.062-35.437 34.875-35.437 34.875s9 179.718-85.22 318.093-216 221.344-392.905 239.063c-176.907 17.718-292.22-54.282-292.22-54.282s77.345-4.5 126.845-23.343c49.218-19.125 120.093-68.906 120.093-68.906s-100.687-31.22-136.968-66.094c-36.282-35.157-45.282-55.969-45.282-55.969l99.563-1.406S175.02 549.125 145.208 505.25s-33.75-87.187-33.75-87.187l76.5 30.937s-63.562-86.906-72.562-154.406 11.531-103.782 11.531-103.782 32.344 61.032 165.656 128.532 245.813 63.562 245.813 63.562-43.031-149.344 88.875-215.437S849.74 213.03 849.74 213.03s23.062-6.187 40.218-12.656c17.157-6.187 41.907-17.719 41.907-17.719l-40.5 72.844 62.718-6.75s-7.875 11.25-32.906 34.313z"/></svg>' }, { "name": "weibo", "link": "http://service.weibo.com/share/share.php?url=[url]&title=[title]&pic=[cover|image]", "color": "#e6162d", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M457.3 543c-68.1-17.7-145 16.2-174.6 76.2-30.1 61.2-1 129.1 67.8 151.3 71.2 23 155.2-12.2 184.4-78.3 28.7-64.6-7.2-131-77.6-149.2zm-52 156.2c-13.8 22.1-43.5 31.7-65.8 21.6-22-10-28.5-35.7-14.6-57.2 13.7-21.4 42.3-31 64.4-21.7 22.4 9.5 29.6 35 16 57.3zm45.5-58.5c-5 8.6-16.1 12.7-24.7 9.1-8.5-3.5-11.2-13.1-6.4-21.5 5-8.4 15.6-12.4 24.1-9.1 8.7 3.2 11.8 12.9 7 21.5zm334.5-197.2c15 4.8 31-3.4 35.9-18.3 11.8-36.6 4.4-78.4-23.2-109-27.6-30.6-68.4-42.3-106-34.3-15.4 3.3-25.2 18.4-21.9 33.8 3.3 15.3 18.4 25.2 33.8 21.8 18.4-3.9 38.3 1.8 51.9 16.7 13.5 15 17.2 35.4 11.3 53.3-4.9 15.1 3.2 31.1 18.2 36z"/><path d="M885.1 237.5c-56.7-62.9-140.4-86.9-217.7-70.5-17.9 3.8-29.3 21.4-25.4 39.3 3.8 17.9 21.4 29.3 39.3 25.5 55-11.7 114.4 5.4 154.8 50.1 40.3 44.7 51.2 105.7 34 159.1-5.6 17.4 3.9 36 21.3 41.7 17.4 5.6 36-3.9 41.6-21.2v-.1c24.1-75.4 8.9-161.1-47.9-223.9zM729 499c-12.2-3.6-20.5-6.1-14.1-22.1 13.8-34.7 15.2-64.7.3-86-28-40.1-104.8-37.9-192.8-1.1 0 0-27.6 12.1-20.6-9.8 13.5-43.5 11.5-79.9-9.6-101-47.7-47.8-174.6 1.8-283.5 110.6C127.3 471.1 80 557.5 80 632.2 80 775.1 263.2 862 442.5 862c235 0 391.3-136.5 391.3-245 0-65.5-55.2-102.6-104.8-118zM443 810.8c-143 14.1-266.5-50.5-275.8-144.5-9.3-93.9 99.2-181.5 242.2-195.6 143-14.2 266.5 50.5 275.8 144.4C694.4 709 586 796.6 443 810.8z"/></svg>' }, { "name": "whatsapp", "link": "https://api.whatsapp.com/send?text=[title]%0D%0A[url]%0D%0A[description|summary]", "color": "#25d366", "shape": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M511.895 90.125h.21c232.63 0 421.77 189.246 421.77 421.875S744.7 933.875 512.105 933.875c-85.78 0-165.374-25.559-232.03-69.68l-162.176 51.82 52.558-156.761A418.781 418.781 0 0 1 90.125 512c0-232.629 189.176-421.875 421.77-421.875zm-120.692 231.89c-8.05-19.23-14.167-19.968-26.367-20.46a235.266 235.266 0 0 0-13.922-.493c-15.89 0-32.484 4.641-42.539 14.872-12.129 12.41-42.468 41.379-42.468 100.898 0 59.45 43.488 116.965 49.324 125.016 6.117 8.015 84.797 131.836 206.894 182.285 95.52 39.48 123.856 35.824 145.618 31.183 31.746-6.82 71.543-30.234 81.562-58.464 10.02-28.301 10.02-52.418 7.102-57.551-2.954-5.098-11.004-8.016-23.204-14.133-12.234-6.082-71.578-35.332-82.828-39.234-11.004-4.114-21.48-2.672-29.777 9.035-11.742 16.312-23.203 32.906-32.52 42.89-7.312 7.805-19.3 8.79-29.285 4.641-13.43-5.625-51.047-18.773-97.488-59.977-35.894-31.921-60.328-71.648-67.394-83.566-7.102-12.2-.739-19.266 4.886-25.84 6.082-7.558 11.953-12.902 18.07-19.969 6.118-7.066 9.493-10.722 13.43-19.02 4.149-8.05 1.23-16.347-1.722-22.429-2.918-6.082-27.352-65.566-37.372-89.648z"/></svg>' }];
var W$1 = defineComponent({ name: "Share", props: { services: { type: [String, Array], default: () => G$1.map(({ name: t2 }) => t2) }, titleGetter: { type: Function, default: (t2) => t2.title }, descriptionGetter: { type: Function, default: (t2) => t2.frontmatter.description }, summaryGetter: { type: Function, default: (t2) => t2.summary }, coverGetter: { type: Function, default: (t2) => t2.cover }, tagGetter: { type: Function, default: ({ frontmatter: t2 }) => t2.tag || t2.tags }, inline: Boolean, colorful: Boolean }, setup(t2) {
  const r2 = usePageData(), a2 = computed(() => (a$8(t2.services) ? t2.services.split(",") : t2.services).map((e2) => m$6(e2) ? e2.name && e2.link ? e2 : null : G$1.find(({ name: s2 }) => s2 === e2)).filter((e2) => e2 != null)), c2 = computed(() => {
    const e2 = {};
    return ["titleGetter", "descriptionGetter", "summaryGetter", "coverGetter", "tagGetter"].forEach((s2) => {
      if (Re(t2[s2])) {
        const d2 = t2[s2](r2.value);
        d2 && (e2[s2.replace("Getter", "")] = d2);
      }
    }), e2;
  });
  return () => h$4("div", { class: "vp-share-buttons", style: t2.inline ? { display: "inline-block" } : {} }, a2.value.map((e2) => h$4(B, { config: e2, ...c2.value, plain: !t2.colorful })));
} });
const siteInfo = "";
var m$3 = defineComponent({ name: "SiteInfo", components: { BitbucketIcon: D$1, GiteeIcon: O$2, GitHubIcon: B$1, GitLabIcon: H$2, SourceIcon: G$2 }, props: { name: { type: String, required: true }, desc: { type: String, default: "" }, logo: { type: String, default: "" }, url: { type: String, required: true }, preview: { type: String, required: true }, repo: { type: String, default: "" } }, setup(e2) {
  const t2 = Ze({ "/": { "source": "源代码" } }), i2 = computed(() => e2.repo ? qe(e2.repo) : null);
  return () => h$4("div", { class: "vp-site-info" }, [h$4("a", { class: "vp-site-info-navigator", title: e2.name, href: e2.url, target: "_blank" }), h$4("div", { class: "vp-site-info-preview", style: { background: `url(${withBase(e2.preview)}) center/cover no-repeat` } }), h$4("div", { class: "vp-site-info-detail" }, [e2.logo ? h$4("img", { class: "vp-site-info-logo", src: e2.logo, alt: e2.name, loading: "lazy", "no-view": "" }) : null, h$4("div", { class: "vp-site-info-name" }, e2.name), h$4("div", { class: "vp-site-info-desc" }, e2.desc)]), e2.repo ? h$4("div", { class: "vp-site-info-source-wrapper" }, h$4("a", { class: "vp-site-info-source", href: e2.repo, "aria-label": t2.value.source, "data-balloon-pos": "left", title: t2.value.source, target: "_blank" }, h$4(resolveComponent(`${i2.value}Icon`)))) : null]);
} });
const CONNECT_INTERVAL = 500;
const CONNECT_MAX_ATTEMPTS = 20;
const DEFAULT_FRAME_HEIGHT = 300;
const DEFAULT_ORIGIN = "https://stackblitz.com";
const PROJECT_TEMPLATES = [
  "angular-cli",
  "create-react-app",
  "html",
  "javascript",
  "node",
  "polymer",
  "typescript",
  "vue"
];
const UI_SIDEBAR_VIEWS = ["project", "search", "ports", "settings"];
const UI_THEMES = ["light", "dark"];
const UI_VIEWS = ["editor", "preview"];
const generators = {
  clickToLoad: (value) => trueParam("ctl", value),
  devToolsHeight: (value) => percentParam("devtoolsheight", value),
  forceEmbedLayout: (value) => trueParam("embed", value),
  hideDevTools: (value) => trueParam("hidedevtools", value),
  hideExplorer: (value) => trueParam("hideExplorer", value),
  hideNavigation: (value) => trueParam("hideNavigation", value),
  openFile: (value) => stringParams("file", value),
  showSidebar: (value) => booleanParam("showSidebar", value),
  sidebarView: (value) => enumParam("sidebarView", value, UI_SIDEBAR_VIEWS),
  startScript: (value) => stringParams("startScript", value),
  terminalHeight: (value) => percentParam("terminalHeight", value),
  theme: (value) => enumParam("theme", value, UI_THEMES),
  view: (value) => enumParam("view", value, UI_VIEWS),
  zenMode: (value) => trueParam("zenMode", value)
};
function buildParams(options = {}) {
  const params = Object.entries(options).map(([key, value]) => {
    if (value != null && generators.hasOwnProperty(key)) {
      return generators[key](value);
    }
    return "";
  }).filter(Boolean);
  return params.length ? `?${params.join("&")}` : "";
}
function trueParam(name, value) {
  if (value === true) {
    return `${name}=1`;
  }
  return "";
}
function booleanParam(name, value) {
  if (typeof value === "boolean") {
    return `${name}=${value ? "1" : "0"}`;
  }
  return "";
}
function percentParam(name, value) {
  if (typeof value === "number" && !Number.isNaN(value)) {
    const clamped = Math.min(100, Math.max(0, value));
    return `${name}=${encodeURIComponent(Math.round(clamped))}`;
  }
  return "";
}
function enumParam(name, value = "", allowList = []) {
  if (allowList.includes(value)) {
    return `${name}=${encodeURIComponent(value)}`;
  }
  return "";
}
function stringParams(name, value) {
  const values = Array.isArray(value) ? value : [value];
  return values.filter((val) => typeof val === "string" && val.trim() !== "").map((val) => `${name}=${encodeURIComponent(val)}`).join("&");
}
function genID() {
  return Math.random().toString(36).slice(2, 6) + Math.random().toString(36).slice(2, 6);
}
function openUrl(route, options) {
  return `${getOrigin(options)}${route}${buildParams(options)}`;
}
function embedUrl(route, options) {
  const config = {
    forceEmbedLayout: true
  };
  if (options && typeof options === "object") {
    Object.assign(config, options);
  }
  return `${getOrigin(config)}${route}${buildParams(config)}`;
}
function getOrigin(options = {}) {
  const origin = typeof options.origin === "string" ? options.origin : DEFAULT_ORIGIN;
  return origin.replace(/\/$/, "");
}
function replaceAndEmbed(target, frame, options) {
  if (!frame || !target || !target.parentNode) {
    throw new Error("Invalid Element");
  }
  if (target.id) {
    frame.id = target.id;
  }
  if (target.className) {
    frame.className = target.className;
  }
  setFrameDimensions(frame, options);
  target.replaceWith(frame);
}
function findElement(elementOrId) {
  if (typeof elementOrId === "string") {
    const element = document.getElementById(elementOrId);
    if (!element) {
      throw new Error(`Could not find element with id '${elementOrId}'`);
    }
    return element;
  } else if (elementOrId instanceof HTMLElement) {
    return elementOrId;
  }
  throw new Error(`Invalid element: ${elementOrId}`);
}
function openTarget(options) {
  return options && options.newWindow === false ? "_self" : "_blank";
}
function setFrameDimensions(frame, options = {}) {
  const height = Object.hasOwnProperty.call(options, "height") ? `${options.height}` : `${DEFAULT_FRAME_HEIGHT}`;
  const width = Object.hasOwnProperty.call(options, "width") ? `${options.width}` : void 0;
  frame.setAttribute("height", height);
  if (width) {
    frame.setAttribute("width", width);
  } else {
    frame.setAttribute("style", "width:100%;");
  }
}
class RDC {
  constructor(port) {
    this.pending = {};
    this.port = port;
    this.port.onmessage = this.messageListener.bind(this);
  }
  request({ type, payload }) {
    return new Promise((resolve2, reject) => {
      const id = genID();
      this.pending[id] = { resolve: resolve2, reject };
      this.port.postMessage({
        type,
        payload: {
          ...payload,
          // Ensure the payload object includes the request ID
          __reqid: id
        }
      });
    });
  }
  messageListener(event) {
    var _a2;
    if (typeof ((_a2 = event.data.payload) == null ? void 0 : _a2.__reqid) !== "string") {
      return;
    }
    const { type, payload } = event.data;
    const { __reqid: id, __success: success, __error: error } = payload;
    if (this.pending[id]) {
      if (success) {
        this.pending[id].resolve(this.cleanResult(payload));
      } else {
        this.pending[id].reject(error ? `${type}: ${error}` : type);
      }
      delete this.pending[id];
    }
  }
  cleanResult(payload) {
    const result = { ...payload };
    delete result.__reqid;
    delete result.__success;
    delete result.__error;
    return Object.keys(result).length ? result : null;
  }
}
class VM {
  constructor(port, config) {
    this.editor = {
      /**
       * Open one of several files in tabs and/or split panes.
       *
       * @since 1.7.0 Added support for opening multiple files
       */
      openFile: (path) => {
        return this._rdc.request({
          type: "SDK_OPEN_FILE",
          payload: { path }
        });
      },
      /**
       * Set a project file as the currently selected file.
       *
       * - This may update the highlighted file in the file explorer,
       *   and the currently open and/or focused editor tab.
       * - It will _not_ open a new editor tab if the provided path does not
       *   match a currently open tab. See `vm.editor.openFile` to open files.
       *
       * @since 1.7.0
       * @experimental
       */
      setCurrentFile: (path) => {
        return this._rdc.request({
          type: "SDK_SET_CURRENT_FILE",
          payload: { path }
        });
      },
      /**
       * Change the color theme
       *
       * @since 1.7.0
       */
      setTheme: (theme) => {
        return this._rdc.request({
          type: "SDK_SET_UI_THEME",
          payload: { theme }
        });
      },
      /**
       * Change the display mode of the project:
       *
       * - `default`: show the editor and preview pane
       * - `editor`: show the editor pane only
       * - `preview`: show the preview pane only
       *
       * @since 1.7.0
       */
      setView: (view) => {
        return this._rdc.request({
          type: "SDK_SET_UI_VIEW",
          payload: { view }
        });
      },
      /**
       * Change the display mode of the sidebar:
       *
       * - `true`: show the sidebar
       * - `false`: hide the sidebar
       *
       * @since 1.7.0
       */
      showSidebar: (visible = true) => {
        return this._rdc.request({
          type: "SDK_TOGGLE_SIDEBAR",
          payload: { visible }
        });
      }
    };
    this.preview = {
      /**
       * The origin (protocol and domain) of the preview iframe.
       *
       * In WebContainers-based projects, the origin will always be `null`;
       * try using `vm.preview.getUrl` instead.
       *
       * @see https://developer.stackblitz.com/guides/user-guide/available-environments
       */
      origin: "",
      /**
       * Get the current preview URL.
       *
       * In both and EngineBlock and WebContainers-based projects, the preview URL
       * may not reflect the exact path of the current page, after user navigation.
       *
       * In WebContainers-based projects, the preview URL will be `null` initially,
       * and until the project starts a web server.
       *
       * @since 1.7.0
       * @experimental
       */
      getUrl: () => {
        return this._rdc.request({
          type: "SDK_GET_PREVIEW_URL",
          payload: {}
        }).then((data) => (data == null ? void 0 : data.url) ?? null);
      },
      /**
       * Change the path of the preview URL.
       *
       * In WebContainers-based projects, this will be ignored if there is no
       * currently running web server.
       *
       * @since 1.7.0
       * @experimental
       */
      setUrl: (path = "/") => {
        if (typeof path !== "string" || !path.startsWith("/")) {
          throw new Error(`Invalid argument: expected a path starting with '/', got '${path}'`);
        }
        return this._rdc.request({
          type: "SDK_SET_PREVIEW_URL",
          payload: { path }
        });
      }
    };
    this._rdc = new RDC(port);
    Object.defineProperty(this.preview, "origin", {
      value: typeof config.previewOrigin === "string" ? config.previewOrigin : null,
      writable: false
    });
  }
  /**
   * Apply batch updates to the project files in one call.
   */
  applyFsDiff(diff) {
    const isObject2 = (val) => val !== null && typeof val === "object";
    if (!isObject2(diff) || !isObject2(diff.create)) {
      throw new Error("Invalid diff object: expected diff.create to be an object.");
    } else if (!Array.isArray(diff.destroy)) {
      throw new Error("Invalid diff object: expected diff.destroy to be an array.");
    }
    return this._rdc.request({
      type: "SDK_APPLY_FS_DIFF",
      payload: diff
    });
  }
  /**
   * Get the project’s defined dependencies.
   *
   * In EngineBlock projects, version numbers represent the resolved dependency versions.
   * In WebContainers-based projects, returns data from the project’s `package.json` without resolving installed version numbers.
   */
  getDependencies() {
    return this._rdc.request({
      type: "SDK_GET_DEPS_SNAPSHOT",
      payload: {}
    });
  }
  /**
   * Get a snapshot of the project files and their content.
   */
  getFsSnapshot() {
    return this._rdc.request({
      type: "SDK_GET_FS_SNAPSHOT",
      payload: {}
    });
  }
}
const connections = [];
class Connection {
  constructor(element) {
    this.id = genID();
    this.element = element;
    this.pending = new Promise((resolve2, reject) => {
      const listenForSuccess = ({ data, ports }) => {
        if ((data == null ? void 0 : data.action) === "SDK_INIT_SUCCESS" && data.id === this.id) {
          this.vm = new VM(ports[0], data.payload);
          resolve2(this.vm);
          cleanup();
        }
      };
      const pingFrame = () => {
        var _a2;
        (_a2 = this.element.contentWindow) == null ? void 0 : _a2.postMessage(
          {
            action: "SDK_INIT",
            id: this.id
          },
          "*"
        );
      };
      function cleanup() {
        window.clearInterval(interval);
        window.removeEventListener("message", listenForSuccess);
      }
      window.addEventListener("message", listenForSuccess);
      pingFrame();
      let attempts = 0;
      const interval = window.setInterval(() => {
        if (this.vm) {
          cleanup();
          return;
        }
        if (attempts >= CONNECT_MAX_ATTEMPTS) {
          cleanup();
          reject("Timeout: Unable to establish a connection with the StackBlitz VM");
          connections.forEach((connection, index2) => {
            if (connection.id === this.id) {
              connections.splice(index2, 1);
            }
          });
          return;
        }
        attempts++;
        pingFrame();
      }, CONNECT_INTERVAL);
    });
    connections.push(this);
  }
}
const getConnection = (identifier) => {
  const key = identifier instanceof Element ? "element" : "id";
  return connections.find((c2) => c2[key] === identifier) ?? null;
};
function createHiddenInput(name, value) {
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = name;
  input.value = value;
  return input;
}
function encodeFilePath(path) {
  return path.replace(/\[/g, "%5B").replace(/\]/g, "%5D");
}
function createProjectForm({
  template,
  title,
  description,
  dependencies,
  files,
  settings
}) {
  if (!PROJECT_TEMPLATES.includes(template)) {
    const names = PROJECT_TEMPLATES.map((t2) => `'${t2}'`).join(", ");
    console.warn(`Unsupported project.template: must be one of ${names}`);
  }
  const inputs = [];
  const addInput = (name, value, defaultValue = "") => {
    inputs.push(createHiddenInput(name, typeof value === "string" ? value : defaultValue));
  };
  addInput("project[title]", title);
  if (typeof description === "string" && description.length > 0) {
    addInput("project[description]", description);
  }
  addInput("project[template]", template, "javascript");
  if (dependencies) {
    if (template === "node") {
      console.warn(
        `Invalid project.dependencies: dependencies must be provided as a 'package.json' file when using the 'node' template.`
      );
    } else {
      addInput("project[dependencies]", JSON.stringify(dependencies));
    }
  }
  if (settings) {
    addInput("project[settings]", JSON.stringify(settings));
  }
  Object.entries(files).forEach(([path, contents]) => {
    addInput(`project[files][${encodeFilePath(path)}]`, contents);
  });
  const form = document.createElement("form");
  form.method = "POST";
  form.setAttribute("style", "display:none!important;");
  form.append(...inputs);
  return form;
}
function createProjectFrameHTML(project, options) {
  const form = createProjectForm(project);
  form.action = embedUrl("/run", options);
  form.id = "sb_run";
  const html = `<!doctype html>
<html>
<head><title></title></head>
<body>
  ${form.outerHTML}
  <script>document.getElementById('${form.id}').submit();<\/script>
</body>
</html>`;
  return html;
}
function openNewProject(project, options) {
  const form = createProjectForm(project);
  form.action = openUrl("/run", options);
  form.target = openTarget(options);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}
function connect(frameEl) {
  if (!(frameEl == null ? void 0 : frameEl.contentWindow)) {
    return Promise.reject("Provided element is not an iframe.");
  }
  const connection = getConnection(frameEl) ?? new Connection(frameEl);
  return connection.pending;
}
function openProject(project, options) {
  openNewProject(project, options);
}
function openProjectId(projectId, options) {
  const url = openUrl(`/edit/${projectId}`, options);
  const target = openTarget(options);
  window.open(url, target);
}
function openGithubProject(repoSlug, options) {
  const url = openUrl(`/github/${repoSlug}`, options);
  const target = openTarget(options);
  window.open(url, target);
}
function embedProject(elementOrId, project, options) {
  var _a2;
  const element = findElement(elementOrId);
  const html = createProjectFrameHTML(project, options);
  const frame = document.createElement("iframe");
  replaceAndEmbed(element, frame, options);
  (_a2 = frame.contentDocument) == null ? void 0 : _a2.write(html);
  return connect(frame);
}
function embedProjectId(elementOrId, projectId, options) {
  const element = findElement(elementOrId);
  const frame = document.createElement("iframe");
  frame.src = embedUrl(`/edit/${projectId}`, options);
  replaceAndEmbed(element, frame, options);
  return connect(frame);
}
function embedGithubProject(elementOrId, repoSlug, options) {
  const element = findElement(elementOrId);
  const frame = document.createElement("iframe");
  frame.src = embedUrl(`/github/${repoSlug}`, options);
  replaceAndEmbed(element, frame, options);
  return connect(frame);
}
const StackBlitzSDK = {
  connect,
  embedGithubProject,
  embedProject,
  embedProjectId,
  openGithubProject,
  openProject,
  openProjectId
};
const stackBlitz = "";
const a$6 = StackBlitzSDK;
var m$2 = defineComponent({ name: "StackBlitz", props: { id: { type: String, required: true }, type: { type: String, default: "project" }, width: { type: [String, Number], default: "100%" }, height: { type: [String, Number], default: void 0 }, ratio: { type: [String, Number], default: 16 / 9 }, file: { type: [String, Array], default: "" }, initialPath: { type: String, default: "" }, embed: Boolean, load: Boolean, view: { type: String, default: "preview" }, hideExplorer: Boolean, hideNavigation: Boolean, hideDevtools: Boolean, terminalHeight: { type: [String, Number], default: 30 }, devToolsHeight: { type: [String, Number], default: 30 }, text: { type: String, default: "Open in StackBlitz" }, theme: { type: String, default: "dark" } }, setup(t2) {
  const { el: i2, width: r2, height: l2 } = z$2(t2), o2 = computed(() => ({ openFile: t2.file, view: t2.view, theme: t2.theme, clickToLoad: t2.load, hideExplorer: t2.hideExplorer, hideNavigation: t2.hideNavigation, hideDevTools: t2.hideDevtools, initialPath: t2.initialPath }));
  return onMounted(() => {
    t2.embed && a$6[t2.type === "github" ? "embedGithubProject" : "embedProjectId"](i2.value, t2.id, o2.value);
  }), () => t2.embed ? h$4("div", { ref: i2, class: "stackblitz-container", style: { width: r2.value, height: l2.value } }) : h$4("div", { class: "stackblitz-container" }, h$4("button", { type: "button", class: "stackblitz-button", onClick: () => {
    a$6[t2.type === "github" ? "openGithubProject" : "openProjectId"](t2.id, o2.value);
  } }, t2.text));
} });
async function defineCustomElements() {
  return (await __vitePreload(() => import("./register-560c673b.js").then((n2) => n2.a0), true ? [] : void 0)).default();
}
const vidstack = "";
var u$2 = defineComponent({ name: "VidStack", props: { sources: { type: Array, default: () => [] }, tracks: { type: Array, default: () => [] } }, setup(r2, { attrs: s2 }) {
  return useStyleTag(["https://cdn.jsdelivr.net/npm/vidstack@0.6/styles/defaults.css", "https://cdn.jsdelivr.net/npm/vidstack@0.6/styles/community-skin/audio.css", "https://cdn.jsdelivr.net/npm/vidstack@0.6/styles/community-skin/video.css"].map((t2) => `@import url("${t2}");`).join(`
`), { id: "vidstack-style" }), onMounted(() => defineCustomElements()), () => h$4("media-player", { crossorigin: "", ...s2 }, [h$4("media-outlet", [r2.sources.map((t2) => m$6(t2) ? h$4("source", { src: t2.src, type: t2.type }) : h$4("source", t2)), h$4("media-gesture", { event: "pointerup", action: "toggle:paused" }), h$4("media-gesture", { event: "dblclick", action: "toggle:fullscreen" }), s2.poster ? h$4("media-poster", { alt: s2.alt || s2.title }) : null, r2.tracks.map(({ src: t2, label: a2, srclang: i2, kind: n2, default: o2 }) => h$4("track", { src: t2, label: a2, srclang: i2, kind: n2, default: o2 }))]), h$4("media-community-skin")]);
} });
const xiGua = "";
var n$b = defineComponent({ name: "XiGua", props: { id: { type: String, required: true }, title: { type: String, default: "A XiGua video" }, width: { type: [String, Number], default: "100%" }, height: { type: [String, Number], default: void 0 }, ratio: { type: [String, Number], default: 16 / 9 }, time: { type: [String, Number], default: 0 }, autoplay: Boolean }, setup(t2) {
  const { el: r2, width: l2, height: o2 } = z$2(t2), i2 = ref(false), a2 = computed(() => `https://www.ixigua.com/iframe/${t2.id}?startTime=${t2.time}&autoplay=${t2.autoplay ? 1 : 0}`);
  return () => t2.id ? [h$4("div", { class: "xi-gua-desc" }, h$4("a", { class: "sr-only", href: a2.value }, t2.title)), h$4("iframe", { ref: r2, src: a2.value, title: t2.title, class: "xi-gua-iframe", allow: e$5, style: { width: l2.value, height: i2.value ? o2.value : 0 }, onLoad: () => {
    i2.value = true;
  } }), i2.value ? null : h$4(C$4)] : [];
} });
const l$7 = () => h$4(u$4, { name: "back-to-top" }, () => [h$4("path", { d: "M512 843.2c-36.2 0-66.4-13.6-85.8-21.8-10.8-4.6-22.6 3.6-21.8 15.2l7 102c.4 6.2 7.6 9.4 12.6 5.6l29-22c3.6-2.8 9-1.8 11.4 2l41 64.2c3 4.8 10.2 4.8 13.2 0l41-64.2c2.4-3.8 7.8-4.8 11.4-2l29 22c5 3.8 12.2.6 12.6-5.6l7-102c.8-11.6-11-20-21.8-15.2-19.6 8.2-49.6 21.8-85.8 21.8z" }), h$4("path", { d: "m795.4 586.2-96-98.2C699.4 172 513 32 513 32S324.8 172 324.8 488l-96 98.2c-3.6 3.6-5.2 9-4.4 14.2L261.2 824c1.8 11.4 14.2 17 23.6 10.8L419 744s41.4 40 94.2 40c52.8 0 92.2-40 92.2-40l134.2 90.8c9.2 6.2 21.6.6 23.6-10.8l37-223.8c.4-5.2-1.2-10.4-4.8-14zM513 384c-34 0-61.4-28.6-61.4-64s27.6-64 61.4-64c34 0 61.4 28.6 61.4 64S547 384 513 384z" })]);
l$7.displayName = "BackToTopIcon";
const backToTop = "";
var P$2 = defineComponent({ name: "BackToTop", props: { threshold: { type: Number, default: 100 }, noProgress: Boolean }, setup(e2) {
  const r2 = usePageFrontmatter(), s2 = Ze({ "/": { "backToTop": "返回顶部" } }), a2 = shallowRef(), { height: n2 } = useElementSize(a2), { height: p2 } = useWindowSize$1(), { y: t2 } = useWindowScroll(), u2 = computed(() => r2.value.backToTop !== false && t2.value > e2.threshold), c2 = computed(() => t2.value / (n2.value - p2.value));
  return onMounted(() => {
    a2.value = document.body;
  }), () => h$4(Transition, { name: "fade" }, () => u2.value ? h$4("button", { type: "button", class: "vp-back-to-top-button", "aria-label": s2.value.backToTop, "data-balloon-pos": "left", onClick: () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } }, [e2.noProgress ? null : h$4("svg", { class: "vp-scroll-progress" }, h$4("circle", { cx: "50%", cy: "50%", style: { "stroke-dasharray": `calc(${Math.PI * c2.value * 100}% - ${4 * Math.PI}px) calc(${Math.PI * 100}% - ${4 * Math.PI}px)` } })), h$4(l$7)]) : null);
} });
const srOnly = "";
const clientConfig1 = defineClientConfig({
  enhance: ({ app }) => {
    if (!Qe("FontIcon"))
      app.component("FontIcon", m$5);
    if (!Qe("ArtPlayer"))
      app.component("ArtPlayer", C$3);
    if (!Qe("Badge"))
      app.component("Badge", o$7);
    if (!Qe("BiliBili"))
      app.component("BiliBili", S$3);
    if (!Qe("CodePen"))
      app.component("CodePen", d$2);
    if (!Qe("PDF"))
      app.component("PDF", j);
    if (!Qe("Replit"))
      app.component("Replit", g$4);
    if (!Qe("Share"))
      app.component("Share", W$1);
    if (!Qe("SiteInfo"))
      app.component("SiteInfo", m$3);
    if (!Qe("StackBlitz"))
      app.component("StackBlitz", m$2);
    if (!Qe("VidStack"))
      app.component("VidStack", u$2);
    if (!Qe("XiGua"))
      app.component("XiGua", n$b);
  },
  setup: () => {
    useStyleTag(`  @import url("https://at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css");
  `);
  },
  rootComponents: [
    () => h$4(P$2, {})
  ]
});
function r$5(r2, e2, n2) {
  var i2, t2, o2;
  void 0 === e2 && (e2 = 50), void 0 === n2 && (n2 = {});
  var a2 = null != (i2 = n2.isImmediate) && i2, u2 = null != (t2 = n2.callback) && t2, c2 = n2.maxWait, v2 = Date.now(), l2 = [];
  function f2() {
    if (void 0 !== c2) {
      var r3 = Date.now() - v2;
      if (r3 + e2 >= c2)
        return c2 - r3;
    }
    return e2;
  }
  var d2 = function() {
    var e3 = [].slice.call(arguments), n3 = this;
    return new Promise(function(i3, t3) {
      var c3 = a2 && void 0 === o2;
      if (void 0 !== o2 && clearTimeout(o2), o2 = setTimeout(function() {
        if (o2 = void 0, v2 = Date.now(), !a2) {
          var i4 = r2.apply(n3, e3);
          u2 && u2(i4), l2.forEach(function(r3) {
            return (0, r3.resolve)(i4);
          }), l2 = [];
        }
      }, f2()), c3) {
        var d3 = r2.apply(n3, e3);
        return u2 && u2(d3), i3(d3);
      }
      l2.push({ resolve: i3, reject: t3 });
    });
  };
  return d2.cancel = function(r3) {
    void 0 !== o2 && clearTimeout(o2), l2.forEach(function(e3) {
      return (0, e3.reject)(r3);
    }), l2 = [];
  }, d2;
}
const useActiveHeaderLinks = ({ headerLinkSelector: headerLinkSelector2, headerAnchorSelector: headerAnchorSelector2, delay: delay2, offset: offset2 = 5 }) => {
  const router = useRouter();
  const setActiveRouteHash = () => {
    var _a2, _b2;
    const scrollTop = Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop);
    const isAtPageTop = Math.abs(scrollTop - 0) < offset2;
    if (isAtPageTop) {
      updateHash(router, "");
      return;
    }
    const scrollBottom = window.innerHeight + scrollTop;
    const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const isAtPageBottom = Math.abs(scrollHeight - scrollBottom) < offset2;
    const headerLinks = Array.from(document.querySelectorAll(headerLinkSelector2));
    const headerAnchors = Array.from(document.querySelectorAll(headerAnchorSelector2));
    const existedHeaderAnchors = headerAnchors.filter((anchor) => headerLinks.some((link) => link.hash === anchor.hash));
    for (let i2 = 0; i2 < existedHeaderAnchors.length; i2++) {
      const anchor = existedHeaderAnchors[i2];
      const nextAnchor = existedHeaderAnchors[i2 + 1];
      const hasPassedCurrentAnchor = scrollTop >= (((_a2 = anchor.parentElement) == null ? void 0 : _a2.offsetTop) ?? 0) - offset2;
      const hasNotPassedNextAnchor = !nextAnchor || scrollTop < (((_b2 = nextAnchor.parentElement) == null ? void 0 : _b2.offsetTop) ?? 0) - offset2;
      const isActive = hasPassedCurrentAnchor && hasNotPassedNextAnchor;
      if (!isActive)
        continue;
      const routeHash = decodeURIComponent(router.currentRoute.value.hash);
      const anchorHash = decodeURIComponent(anchor.hash);
      if (routeHash === anchorHash)
        return;
      if (isAtPageBottom) {
        for (let j2 = i2 + 1; j2 < existedHeaderAnchors.length; j2++) {
          if (routeHash === decodeURIComponent(existedHeaderAnchors[j2].hash)) {
            return;
          }
        }
      }
      updateHash(router, anchorHash);
      return;
    }
  };
  const onScroll = r$5(setActiveRouteHash, delay2);
  onMounted(() => {
    window.addEventListener("scroll", onScroll);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
  });
};
const updateHash = async (router, hash) => {
  const { scrollBehavior } = router.options;
  router.options.scrollBehavior = void 0;
  await router.replace({
    query: router.currentRoute.value.query,
    hash,
    force: true
  }).finally(() => router.options.scrollBehavior = scrollBehavior);
};
const headerLinkSelector = ".vp-sidebar-link, .toc-link";
const headerAnchorSelector = ".header-anchor";
const delay = 200;
const offset = 5;
const clientConfig2 = defineClientConfig({
  setup() {
    useActiveHeaderLinks({
      headerLinkSelector,
      headerAnchorSelector,
      delay,
      offset
    });
  }
});
const autoCatalog = "";
let t$9 = () => null;
const n$a = Symbol(""), a$5 = (o2) => {
  t$9 = o2;
}, c$4 = () => inject(n$a), l$6 = (o2) => {
  o2.provide(n$a, t$9);
};
var N$1 = defineComponent({ name: "AutoCatalog", props: { base: { type: String, default: "" }, level: { type: Number, default: 3 }, index: Boolean }, setup(r2) {
  const u2 = c$4(), f2 = Ze({ "/": { "title": "目录", "empty": "暂无目录" } }), _2 = usePageData(), T2 = useRouter(), E2 = useSiteData(), O2 = (s2) => {
    const p2 = s2["I"];
    return typeof p2 > "u" || p2;
  }, b2 = () => {
    const s2 = r2.base || _2.value.path.replace(/\/[^/]+$/, "/"), p2 = T2.getRoutes(), h2 = [];
    return p2.filter(({ meta: t2, path: l2 }) => {
      if (!z$3(l2, s2) || l2 === s2)
        return false;
      if (s2 === "/") {
        const a2 = f$4(E2.value.locales).filter((n2) => n2 !== "/");
        if (l2 === "/404.html" || a2.some((n2) => z$3(l2, n2)))
          return false;
      }
      return (Pe(l2, ".html") && !Pe(l2, "/index.html") || Pe(l2, "/")) && O2(t2);
    }).map(({ path: t2, meta: l2 }) => {
      const a2 = t2.substring(s2.length).split("/").length;
      return { title: l2["t"] || "", icon: l2["i"], base: t2.replace(/\/[^/]+\/?$/, "/"), order: l2["O"] || null, level: Pe(t2, "/") ? a2 - 1 : a2, path: t2 };
    }).filter(({ title: t2, level: l2 }) => t2 && l2 <= r2.level).sort(({ title: t2, level: l2, path: a2, order: n2 }, { title: c2, level: o2, path: d2, order: i2 }) => l2 - o2 || (Pe(a2, "/index.html") ? -1 : Pe(d2, "/index.html") ? 1 : n2 === null ? i2 === null ? t2.localeCompare(c2) : i2 : i2 === null ? n2 : n2 > 0 ? i2 > 0 ? n2 - i2 : -1 : i2 < 0 ? n2 - i2 : 1)).forEach((t2) => {
      var l2;
      const { base: a2, level: n2 } = t2;
      switch (n2) {
        case 1:
          h2.push(t2);
          break;
        case 2: {
          const c2 = h2.find((o2) => o2.path === a2);
          c2 && (c2.children ?? (c2.children = [])).push(t2);
          break;
        }
        default: {
          const c2 = h2.find((o2) => o2.path === a2.replace(/\/[^/]+\/$/, "/"));
          if (c2) {
            const o2 = (l2 = c2.children) == null ? void 0 : l2.find((d2) => d2.path === a2);
            o2 && (o2.children ?? (o2.children = [])).push(t2);
          }
        }
      }
    }), h2;
  }, A2 = computed(() => b2());
  return () => h$4("div", { class: "vp-catalog" }, [h$4("h2", { class: "vp-catalog-main-title" }, f2.value.title), A2.value.length ? A2.value.map(({ children: s2 = [], icon: p2, path: h2, title: t2 }, l2) => [h$4("h3", { id: t2, class: ["vp-catalog-child-title", { "has-children": s2.length }] }, [h$4("a", { href: `#${t2}`, class: "header-anchor", "aria-hidden": true }, "#"), h$4(j$1, { class: "vp-catalog-title", to: h2 }, () => [r2.index ? `${l2 + 1}.` : null, p2 && u2 ? h$4(u2, { icon: p2 }) : null, t2 || h2])]), s2.length ? h$4("ul", { class: "vp-catalog-child-catalogs" }, s2.map(({ children: a2 = [], icon: n2, path: c2, title: o2 }, d2) => h$4("li", { class: "vp-child-catalog" }, [h$4("div", { class: ["vp-catalog-sub-title", { "has-children": a2.length }] }, [h$4("a", { href: `#${o2}`, class: "header-anchor" }, "#"), h$4(j$1, { class: "vp-catalog-title", to: c2 }, () => [r2.index ? `${l2 + 1}.${d2 + 1}` : null, n2 && u2 ? h$4(u2, { icon: n2 }) : null, o2 || c2])]), a2.length ? h$4("div", { class: "v-sub-catalogs" }, a2.map(({ icon: i2, path: v2, title: $2 }, L2) => h$4(j$1, { class: "vp-sub-catalog", to: v2 }, () => [r2.index ? `${l2 + 1}.${d2 + 1}.${L2 + 1}` : null, i2 && u2 ? h$4(u2, { icon: i2 }) : null, $2 || v2]))) : null]))) : null]) : h$4("p", { class: "vp-empty-catalog" }, f2.value.empty)]);
} }), S$2 = defineClientConfig({ enhance: ({ app: r2 }) => {
  l$6(r2), Qe("AutoCatalog", r2) || r2.component("AutoCatalog", N$1);
} });
const vars$2 = "";
const externalLinkIcon = "";
const svg = h$4("svg", {
  "class": "external-link-icon",
  "xmlns": "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  "focusable": "false",
  "x": "0px",
  "y": "0px",
  "viewBox": "0 0 100 100",
  "width": "15",
  "height": "15"
}, [
  h$4("path", {
    fill: "currentColor",
    d: "M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
  }),
  h$4("polygon", {
    fill: "currentColor",
    points: "45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
  })
]);
const ExternalLinkIcon = defineComponent({
  name: "ExternalLinkIcon",
  props: {
    locales: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  setup(props) {
    const routeLocale = useRouteLocale();
    const locale = computed(() => props.locales[routeLocale.value] ?? {
      openInNewWindow: "open in new window"
    });
    return () => h$4("span", [
      svg,
      h$4("span", {
        class: "external-link-icon-sr-only"
      }, locale.value.openInNewWindow)
    ]);
  }
});
const locales$1 = {};
const clientConfig4 = defineClientConfig({
  enhance({ app }) {
    app.component("ExternalLinkIcon", h$4(ExternalLinkIcon, { locales: locales$1 }));
  }
});
/**
 * NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT
 */
const nprogress$1 = {
  settings: {
    minimum: 0.08,
    easing: "ease",
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    barSelector: '[role="bar"]',
    parent: "body",
    template: '<div class="bar" role="bar"></div>'
  },
  status: null,
  set: (n2) => {
    const started = nprogress$1.isStarted();
    n2 = clamp(n2, nprogress$1.settings.minimum, 1);
    nprogress$1.status = n2 === 1 ? null : n2;
    const progress = nprogress$1.render(!started);
    const bar = progress.querySelector(nprogress$1.settings.barSelector);
    const speed = nprogress$1.settings.speed;
    const ease = nprogress$1.settings.easing;
    progress.offsetWidth;
    queue((next) => {
      css(bar, {
        transform: "translate3d(" + toBarPerc(n2) + "%,0,0)",
        transition: "all " + speed + "ms " + ease
      });
      if (n2 === 1) {
        css(progress, {
          transition: "none",
          opacity: "1"
        });
        progress.offsetWidth;
        setTimeout(function() {
          css(progress, {
            transition: "all " + speed + "ms linear",
            opacity: "0"
          });
          setTimeout(function() {
            nprogress$1.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(() => next(), speed);
      }
    });
    return nprogress$1;
  },
  isStarted: () => typeof nprogress$1.status === "number",
  start: () => {
    if (!nprogress$1.status)
      nprogress$1.set(0);
    const work = () => {
      setTimeout(() => {
        if (!nprogress$1.status)
          return;
        nprogress$1.trickle();
        work();
      }, nprogress$1.settings.trickleSpeed);
    };
    if (nprogress$1.settings.trickle)
      work();
    return nprogress$1;
  },
  done: (force) => {
    if (!force && !nprogress$1.status)
      return nprogress$1;
    return nprogress$1.inc(0.3 + 0.5 * Math.random()).set(1);
  },
  inc: (amount) => {
    let n2 = nprogress$1.status;
    if (!n2) {
      return nprogress$1.start();
    }
    if (typeof amount !== "number") {
      amount = (1 - n2) * clamp(Math.random() * n2, 0.1, 0.95);
    }
    n2 = clamp(n2 + amount, 0, 0.994);
    return nprogress$1.set(n2);
  },
  trickle: () => nprogress$1.inc(Math.random() * nprogress$1.settings.trickleRate),
  render: (fromStart) => {
    if (nprogress$1.isRendered()) {
      return document.getElementById("nprogress");
    }
    addClass(document.documentElement, "nprogress-busy");
    const progress = document.createElement("div");
    progress.id = "nprogress";
    progress.innerHTML = nprogress$1.settings.template;
    const bar = progress.querySelector(nprogress$1.settings.barSelector);
    const perc = fromStart ? "-100" : toBarPerc(nprogress$1.status || 0);
    const parent = document.querySelector(nprogress$1.settings.parent);
    css(bar, {
      transition: "all 0 linear",
      transform: "translate3d(" + perc + "%,0,0)"
    });
    if (parent !== document.body) {
      addClass(parent, "nprogress-custom-parent");
    }
    parent == null ? void 0 : parent.appendChild(progress);
    return progress;
  },
  remove: () => {
    removeClass(document.documentElement, "nprogress-busy");
    removeClass(document.querySelector(nprogress$1.settings.parent), "nprogress-custom-parent");
    const progress = document.getElementById("nprogress");
    progress && removeElement(progress);
  },
  isRendered: () => !!document.getElementById("nprogress")
};
const clamp = (n2, min, max2) => {
  if (n2 < min)
    return min;
  if (n2 > max2)
    return max2;
  return n2;
};
const toBarPerc = (n2) => (-1 + n2) * 100;
const queue = function() {
  const pending = [];
  function next() {
    const fn = pending.shift();
    if (fn) {
      fn(next);
    }
  }
  return function(fn) {
    pending.push(fn);
    if (pending.length === 1)
      next();
  };
}();
const css = function() {
  const cssPrefixes = ["Webkit", "O", "Moz", "ms"];
  const cssProps = {};
  function camelCase(string) {
    return string.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(match, letter) {
      return letter.toUpperCase();
    });
  }
  function getVendorProp(name) {
    const style = document.body.style;
    if (name in style)
      return name;
    let i2 = cssPrefixes.length;
    const capName = name.charAt(0).toUpperCase() + name.slice(1);
    let vendorName;
    while (i2--) {
      vendorName = cssPrefixes[i2] + capName;
      if (vendorName in style)
        return vendorName;
    }
    return name;
  }
  function getStyleProp(name) {
    name = camelCase(name);
    return cssProps[name] ?? (cssProps[name] = getVendorProp(name));
  }
  function applyCss(element, prop, value) {
    prop = getStyleProp(prop);
    element.style[prop] = value;
  }
  return function(element, properties) {
    for (const prop in properties) {
      const value = properties[prop];
      if (value !== void 0 && Object.prototype.hasOwnProperty.call(properties, prop))
        applyCss(element, prop, value);
    }
  };
}();
const hasClass = (element, name) => {
  const list = typeof element === "string" ? element : classList(element);
  return list.indexOf(" " + name + " ") >= 0;
};
const addClass = (element, name) => {
  const oldList = classList(element);
  const newList = oldList + name;
  if (hasClass(oldList, name))
    return;
  element.className = newList.substring(1);
};
const removeClass = (element, name) => {
  const oldList = classList(element);
  if (!hasClass(element, name))
    return;
  const newList = oldList.replace(" " + name + " ", " ");
  element.className = newList.substring(1, newList.length - 1);
};
const classList = (element) => {
  return (" " + (element.className || "") + " ").replace(/\s+/gi, " ");
};
const removeElement = (element) => {
  element && element.parentNode && element.parentNode.removeChild(element);
};
const vars$1 = "";
const nprogress = "";
const useNprogress = () => {
  onMounted(() => {
    const router = useRouter();
    const loadedPages = /* @__PURE__ */ new Set();
    loadedPages.add(router.currentRoute.value.path);
    router.beforeEach((to) => {
      if (!loadedPages.has(to.path)) {
        nprogress$1.start();
      }
    });
    router.afterEach((to) => {
      loadedPages.add(to.path);
      nprogress$1.done();
    });
  });
};
const clientConfig5 = defineClientConfig({
  setup() {
    useNprogress();
  }
});
const themeData$1 = JSON.parse('{"encrypt":{},"author":{"name":"L.H.X","url":"/intro.html"},"logo":"/images/坏笑.svg","repo":"lianghexiang/space","docsDir":"src","footer":"{{setupRunningTimeFooter}}","displayFooter":true,"locales":{"/":{"lang":"zh-CN","navbarLocales":{"langName":"简体中文","selectLangAriaLabel":"选择语言"},"metaLocales":{"author":"作者","date":"写作日期","origin":"原创","views":"访问量","category":"分类","tag":"标签","readingTime":"阅读时间","words":"字数","toc":"此页内容","prev":"上一页","next":"下一页","lastUpdated":"上次编辑于","contributors":"贡献者","editLink":"在GitHub上编辑此文章","print":"打印"},"blogLocales":{"article":"文章","articleList":"文章列表","category":"分类","tag":"标签","timeline":"时间轴","timelineTitle":"昨日不在","all":"全部","intro":"个人介绍","star":"收藏"},"paginationLocales":{"prev":"上一页","next":"下一页","navigate":"跳转到","action":"前往","errorText":"请输入 1 到 $page 之前的页码！"},"outlookLocales":{"themeColor":"主题色","darkmode":"外观","fullscreen":"全屏"},"routeLocales":{"skipToContent":"跳至主要內容","notFoundTitle":"页面不存在","notFoundMsg":["这里什么也没有","我们是怎么来到这儿的？","这 是 四 零 四 !","看起来你访问了一个失效的链接"],"back":"返回上一页","home":"带我回家","openInNewWindow":"Open in new window"},"navbar":["/",{"text":"博客","icon":"repo","prefix":"/posts/","children":[{"text":"Python","icon":"code","prefix":"python/","children":[{"text":"Polygon面积计算","icon":"code","link":"Polygon面积计算"},{"text":"Python2转Python3","icon":"code","link":"Python2转Python3"},{"text":"Python添加环境变量","icon":"code","link":"Python添加环境变量"},{"text":"DBUtils小问题","icon":"code","link":"Linux环境下DBUtils导入的问题"}]},{"text":"Mysql","icon":"mysql","prefix":"mysql/","children":[{"text":"Mysql备忘录","icon":"book","link":"mysql备忘录"}]},{"text":"工具说明书","icon":"note","prefix":"tools/","children":[{"text":"SublimeText说明书","icon":"blog","link":"sublime说明书"},{"text":"PicgoGitHub创建图床","icon":"github","link":"PicGoGitHub搭建图床"}]},{"text":"Linux","icon":"linux","prefix":"Linux/","children":[{"text":"Ubuntu配置环境变量","icon":"book","link":"Linux配置环境变量"}]},{"text":"Vue","icon":"vue","prefix":"Vue/","children":[{"text":"Vue基础知识","icon":"vue","link":"Vue基础"},{"text":"Vue客户端","icon":"vue","link":"Vue客户端"}]}]},{"text":"随笔","icon":"note","prefix":"/anything/","children":[{"text":"日记","icon":"book","prefix":"小记/","children":[{"text":"下雪啦","icon":"snow","link":"下雪啦"},{"text":"网站收藏","icon":"link","link":"好用网站收藏"}]},{"text":"读书笔记","icon":"note","prefix":"book_notes/","children":[{"text":"人之觉醒","icon":"note","link":"人之觉醒/"}]}]},{"text":"设计模式","icon":"code","prefix":"/design_pattern/","children":[{"text":"设计模式","icon":"code","prefix":"设计模式/","children":[{"text":"单例模式(Python实现)","icon":"code","link":"单例模式"},{"text":"工厂模式(Python实现)","icon":"code","link":"工厂模式"}]}]},{"text":"时光轴","icon":"time","link":"/timeline/"}],"sidebar":{"/":["",{"text":"博客","icon":"blog","prefix":"posts/","children":"structure"},{"text":"随笔","icon":"write","prefix":"anything/","children":"structure"},{"text":"设计模式","icon":"python","prefix":"design_pattern/","children":"structure"},"intro"]},"rtl":false}},"blog":{"timeline":"忽如白驹过隙","description":"不积小流无以成江海，不积跬步无以至千里；","intro":"/intro.html","medias":{"Baidu":"https://baidu.com","BiliBili":"https://bilibili.com","Email":"lhx110396@163.com","GitHub":"https://github.com/lianghexiang","QQ":"https://example.com","Qzone":"https://example.com","Wechat":"https://example.com"}},"print":false,"fullscreen":true}');
const themeData = ref(themeData$1);
const useThemeData$1 = () => themeData;
const themeLocaleDataSymbol = Symbol("");
const useThemeLocaleData$1 = () => {
  const themeLocaleData = inject(themeLocaleDataSymbol);
  if (!themeLocaleData) {
    throw new Error("useThemeLocaleData() is called without provider.");
  }
  return themeLocaleData;
};
const resolveThemeLocaleData = (theme, routeLocale) => {
  const { locales: locales2, ...baseOptions } = theme;
  return {
    ...baseOptions,
    ...locales2 == null ? void 0 : locales2[routeLocale]
  };
};
const clientConfig6 = defineClientConfig({
  enhance({ app }) {
    const themeData2 = useThemeData$1();
    const routeLocale = app._context.provides[routeLocaleSymbol];
    const themeLocaleData = computed(() => resolveThemeLocaleData(themeData2.value, routeLocale.value));
    app.provide(themeLocaleDataSymbol, themeLocaleData);
    Object.defineProperties(app.config.globalProperties, {
      $theme: {
        get() {
          return themeData2.value;
        }
      },
      $themeLocale: {
        get() {
          return themeLocaleData.value;
        }
      }
    });
    {
      setupDevtoolsPlugin({
        // fix recursive reference
        app,
        id: "org.vuejs.vuepress.plugin-theme-data",
        label: "VuePress Theme Data Plugin",
        packageName: "@vuepress/plugin-theme-data",
        homepage: "https://v2.vuepress.vuejs.org",
        logo: "https://v2.vuepress.vuejs.org/images/hero.png",
        componentStateTypes: ["VuePress"]
      }, (api) => {
        api.on.inspectComponent((payload) => {
          payload.instanceData.state.push({
            type: "VuePress",
            key: "themeData",
            editable: false,
            value: themeData2.value
          }, {
            type: "VuePress",
            key: "themeLocaleData",
            editable: false,
            value: themeLocaleData.value
          });
        });
      });
    }
  }
});
const t$8 = { "Content-Type": "application/json" }, n$9 = ({ serverURL: e2, lang: t2, paths: n2, signal: a2 }) => (({ serverURL: e3, lang: t3, paths: n3, type: a3, signal: r2 }) => fetch(`${e3}/article?path=${encodeURIComponent(n3.join(","))}&type=${encodeURIComponent(a3.join(","))}&lang=${t3}`, { signal: r2 }).then((e4) => e4.json()))({ serverURL: e2, lang: t2, paths: n2, type: ["time"], signal: a2 }).then((e3) => Array.isArray(e3) ? e3 : [e3]), a$4 = (e2) => (({ serverURL: e3, lang: n2, path: a2, type: r2, action: o2 }) => fetch(`${e3}/article?lang=${n2}`, { method: "POST", headers: t$8, body: JSON.stringify({ path: a2, type: r2, action: o2 }) }).then((e4) => e4.json()))({ ...e2, type: "time", action: "inc" }), r$4 = (e2) => {
  const t2 = ((e3 = "") => e3.replace(/\/$/u, ""))(e2);
  return /^(https?:)?\/\//.test(t2) ? t2 : `https://${t2}`;
}, o$6 = (e2) => {
  "AbortError" !== e2.name && console.error(e2.message);
}, l$5 = (e2) => e2.dataset.path || e2.getAttribute("id"), s$4 = (e2, t2) => {
  t2.forEach((t3, n2) => {
    t3.innerText = e2[n2].toString();
  });
}, i$5 = ({ serverURL: e2, path: t2 = window.location.pathname, selector: i2 = ".waline-pageview-count", update: p2 = true, lang: c2 = navigator.language }) => {
  const h2 = new AbortController(), g2 = Array.from(document.querySelectorAll(i2)), y2 = (e3) => {
    const n2 = l$5(e3);
    return null !== n2 && t2 !== n2;
  }, d2 = (a2) => n$9({ serverURL: r$4(e2), paths: a2.map((e3) => l$5(e3) || t2), lang: c2, signal: h2.signal }).then((e3) => s$4(e3, a2)).catch(o$6);
  if (p2) {
    const n2 = g2.filter((e3) => !y2(e3)), o2 = g2.filter(y2);
    a$4({ serverURL: r$4(e2), path: t2, lang: c2 }).then((e3) => s$4(new Array(n2.length).fill(e3), n2)), o2.length && d2(o2);
  } else
    d2(g2);
  return h2.abort.bind(h2);
};
const waline$1 = "";
const waline = "";
const e$4 = { "provider": "Waline", "dark": 'html[data-theme="dark"]', "serverURL": "https://waline-comment.vuejs.press" };
let n$8 = e$4;
const t$7 = Symbol(""), s$3 = () => inject(t$7), d$1 = s$3, g$2 = (o2) => {
  o2.provide(t$7, n$8);
};
const y$2 = { "/": { "placeholder": "请留言。(填写邮箱可在被回复时收到邮件提醒)" } };
__vitePreload(() => import("./waline-meta-651f1b6d.js"), true ? [] : void 0);
var E = defineComponent({ name: "WalineComment", props: { identifier: { type: String, required: true } }, setup(t2) {
  const e2 = d$1(), m2 = usePageFrontmatter(), p2 = usePageLang(), l2 = Ze(y$2);
  let n2;
  const i2 = !!e2.serverURL, s2 = computed(() => {
    if (!i2)
      return false;
    const d2 = e2.pageview !== false, r2 = m2.value.pageview;
    return !!r2 || d2 !== false && r2 !== false;
  }), u2 = computed(() => ({ lang: p2.value === "zh-CN" ? "zh-CN" : "en", locale: l2.value, dark: "html.dark", ...e2, path: t2.identifier }));
  return onMounted(() => {
    watch(() => t2.identifier, () => {
      n2 == null || n2(), s2.value && nextTick().then(() => {
        setTimeout(() => {
          n2 = i$5({ serverURL: e2.serverURL, path: t2.identifier });
        }, e2.delay || 800);
      });
    }, { immediate: true });
  }), () => i2 ? h$4("div", { id: "comment", class: "waline-wrapper" }, h$4(defineAsyncComponent({ loader: async () => (await __vitePreload(() => import("./component-d9ced7eb.js"), true ? [] : void 0)).Waline, loadingComponent: C$4 }), u2.value)) : null;
} });
var v$4 = defineComponent({ name: "CommentService", props: { darkmode: Boolean }, setup(e2) {
  const m2 = s$3(), n2 = usePageData(), o2 = usePageFrontmatter(), t2 = m2.comment !== false, a2 = computed(() => o2.value.comment || t2 && o2.value.comment !== false);
  return () => h$4(E, { identifier: o2.value.commentID || n2.value.path, darkmode: e2.darkmode, style: { display: a2.value ? "block" : "none" } });
} }), C$2 = defineClientConfig({ enhance: ({ app: e2 }) => {
  g$2(e2), e2.component("CommentService", v$4);
} });
const button = "";
const S$1 = 800, u$1 = 2e3, M$1 = { "/": { "copy": "复制代码", "copied": "已复制", "hint": "复制成功" } }, n$7 = false, P$1 = ['.theme-hope-content div[class*="language-"] pre'], m$1 = false;
const l$4 = /* @__PURE__ */ new Map(), T = () => {
  const { copy: C2 } = useClipboard({ legacy: true }), a2 = Ze(M$1), g2 = usePageData(), i2 = Xe();
  const y2 = (o2) => {
    if (!o2.hasAttribute("copy-code-registered")) {
      const e2 = document.createElement("button");
      e2.type = "button", e2.classList.add("copy-code-button"), e2.innerHTML = '<div class="copy-icon" />', e2.setAttribute("aria-label", a2.value.copy), e2.setAttribute("data-copied", a2.value.copied), o2.parentElement && o2.parentElement.insertBefore(e2, o2), o2.setAttribute("copy-code-registered", "");
    }
  }, p2 = () => nextTick().then(() => new Promise((o2) => {
    setTimeout(() => {
      P$1.forEach((e2) => {
        document.querySelectorAll(e2).forEach(y2);
      }), o2();
    }, S$1);
  })), d2 = (o2, e2, t2) => {
    let { innerText: s2 = "" } = e2;
    /language-(shellscript|shell|bash|sh|zsh)/.test(o2.classList.toString()) && (s2 = s2.replace(/^ *(\$|>) /gm, "")), C2(s2).then(() => {
      t2.classList.add("copied"), clearTimeout(l$4.get(t2));
      const c2 = setTimeout(() => {
        t2.classList.remove("copied"), t2.blur(), l$4.delete(t2);
      }, u$1);
      if (l$4.set(t2, c2), n$7)
        ;
    });
  };
  onMounted(() => {
    (!i2.value || m$1) && p2(), useEventListener("click", (o2) => {
      const e2 = o2.target;
      if (e2.matches('div[class*="language-"] > button.copy')) {
        const t2 = e2.parentElement, s2 = e2.nextElementSibling;
        s2 && d2(t2, s2, e2);
      } else if (e2.matches('div[class*="language-"] div.copy-icon')) {
        const t2 = e2.parentElement, s2 = t2.parentElement, c2 = t2.nextElementSibling;
        c2 && d2(s2, c2, t2);
      }
    }), watch(() => g2.value.path, () => {
      (!i2.value || m$1) && p2();
    });
  });
};
var Y$1 = defineClientConfig({ setup: () => {
  T();
} });
const chart = "";
const g$1 = (e2, n2) => n2 === "json" ? JSON.parse(e2) : new Function(`let config,__chart_js_config__;
{
${e2}
__chart_js_config__=config;
}
return __chart_js_config__;`)();
var h$1 = defineComponent({ name: "ChartJS", props: { config: { type: String, required: true }, id: { type: String, required: true }, title: { type: String, default: "" }, type: { type: String, default: "json" } }, setup(e2) {
  const n2 = shallowRef(), a2 = shallowRef(), o2 = ref(true);
  return onMounted(async () => {
    const [{ default: i2 }] = await Promise.all([__vitePreload(() => import("./auto-212798a6.js"), true ? [] : void 0), new Promise((c2) => setTimeout(c2, 800))]);
    i2.defaults.maintainAspectRatio = false;
    const s2 = g$1(Fe(e2.config), e2.type), l2 = a2.value.getContext("2d");
    new i2(l2, s2), o2.value = false;
  }), () => [e2.title ? h$4("div", { class: "chartjs-title" }, decodeURIComponent(e2.title)) : null, o2.value ? h$4(C$4, { class: "chartjs-loading", height: 192 }) : null, h$4("div", { ref: n2, class: "chartjs-wrapper", id: e2.id, style: { display: o2.value ? "none" : "block" } }, h$4("canvas", { ref: a2, height: 400 }))];
} });
const codeTabs = "";
const v$3 = useStorage("VUEPRESS_CODE_TAB_STORE", {});
var A$3 = defineComponent({ name: "CodeTabs", props: { active: { type: Number, default: 0 }, data: { type: Array, required: true }, id: { type: String, required: true }, tabId: { type: String, default: "" } }, slots: Object, setup(a2, { slots: n2 }) {
  const d2 = ref(a2.active), o2 = shallowRef([]), i2 = () => {
    a2.tabId && (v$3.value[a2.tabId] = a2.data[d2.value].id);
  }, s2 = (e2 = d2.value) => {
    d2.value = e2 < o2.value.length - 1 ? e2 + 1 : 0, o2.value[d2.value].focus();
  }, c2 = (e2 = d2.value) => {
    d2.value = e2 > 0 ? e2 - 1 : o2.value.length - 1, o2.value[d2.value].focus();
  }, b2 = (e2, t2) => {
    e2.key === " " || e2.key === "Enter" ? (e2.preventDefault(), d2.value = t2) : e2.key === "ArrowRight" ? (e2.preventDefault(), s2()) : e2.key === "ArrowLeft" && (e2.preventDefault(), c2()), a2.tabId && (v$3.value[a2.tabId] = a2.data[d2.value].id);
  }, p2 = () => {
    if (a2.tabId) {
      const e2 = a2.data.findIndex(({ id: t2 }) => v$3.value[a2.tabId] === t2);
      if (e2 !== -1)
        return e2;
    }
    return a2.active;
  };
  return onMounted(() => {
    d2.value = p2(), watch(() => v$3.value[a2.tabId], (e2, t2) => {
      if (a2.tabId && e2 !== t2) {
        const l2 = a2.data.findIndex(({ id: u2 }) => u2 === e2);
        l2 !== -1 && (d2.value = l2);
      }
    });
  }), () => a2.data.length ? h$4("div", { class: "vp-code-tabs" }, [h$4("div", { class: "vp-code-tabs-nav", role: "tablist" }, a2.data.map(({ id: e2 }, t2) => {
    const l2 = t2 === d2.value;
    return h$4("button", { type: "button", ref: (u2) => {
      u2 && (o2.value[t2] = u2);
    }, class: ["vp-code-tab-nav", { active: l2 }], role: "tab", "aria-controls": `codetab-${a2.id}-${t2}`, "aria-selected": l2, onClick: () => {
      d2.value = t2, i2();
    }, onKeydown: (u2) => b2(u2, t2) }, n2[`title${t2}`]({ value: e2, isActive: l2 }));
  })), a2.data.map(({ id: e2 }, t2) => {
    const l2 = t2 === d2.value;
    return h$4("div", { class: ["vp-code-tab", { active: l2 }], id: `codetab-${a2.id}-${t2}`, role: "tabpanel", "aria-expanded": l2 }, n2[`tab${t2}`]({ value: e2, isActive: l2 }));
  })]) : null;
} });
const codeGroup = "";
const c$3 = ({ active: p2 = false }, { slots: r2 }) => {
  var e2;
  return h$4("div", { class: ["code-group-item", { active: p2 }], "aria-selected": p2 }, (e2 = r2.default) == null ? void 0 : e2.call(r2));
};
c$3.displayName = "CodeGroupItem";
const C$1 = defineComponent({ name: "CodeGroup", slots: Object, setup(p2, { slots: r2 }) {
  const e2 = ref(-1), t2 = shallowRef([]);
  const d2 = (a2 = e2.value) => {
    e2.value = a2 < t2.value.length - 1 ? a2 + 1 : 0, t2.value[e2.value].focus();
  }, i2 = (a2 = e2.value) => {
    e2.value = a2 > 0 ? a2 - 1 : t2.value.length - 1, t2.value[e2.value].focus();
  }, f2 = (a2, l2) => {
    a2.key === " " || a2.key === "Enter" ? (a2.preventDefault(), e2.value = l2) : a2.key === "ArrowRight" ? (a2.preventDefault(), d2(l2)) : a2.key === "ArrowLeft" && (a2.preventDefault(), i2(l2));
  };
  return () => {
    var a2;
    const l2 = (((a2 = r2.default) == null ? void 0 : a2.call(r2)) || []).filter((o2) => o2.type.name === "CodeGroupItem").map((o2) => (o2.props === null && (o2.props = {}), o2));
    return l2.length === 0 ? null : (e2.value < 0 || e2.value > l2.length - 1 ? (e2.value = l2.findIndex((o2) => "active" in o2.props), e2.value === -1 && (e2.value = 0)) : l2.forEach((o2, u2) => {
      o2.props.active = u2 === e2.value;
    }), h$4("div", { class: "code-group" }, [h$4("div", { class: "code-group-nav" }, l2.map((o2, u2) => {
      const s2 = u2 === e2.value;
      return h$4("button", { type: "button", ref: (v2) => {
        v2 && (t2.value[u2] = v2);
      }, class: ["code-group-nav-tab", { active: s2 }], "aria-pressed": s2, "aria-expanded": s2, onClick: () => {
        e2.value = u2;
      }, onKeydown: (v2) => f2(v2, u2) }, o2.props.title);
    })), l2]));
  };
} });
const index$2 = "";
const q$1 = () => h$4(u$4, { name: "back" }, () => h$4("path", { d: "M1014.749 449.156v125.688H260.626l345.64 345.64-89.239 89.237L19.307 512l497.72-497.721 89.238 89.238-345.64 345.64h754.124z" })), a$3 = () => h$4(u$4, { name: "home" }, () => h$4("path", { d: "M780.106 420.978L506.994 147.866 233.882 420.978h.045v455.11H780.06v-455.11h.046zm90.977 90.976V876.09a91.022 91.022 0 01-91.023 91.022H233.927a91.022 91.022 0 01-91.022-91.022V511.954l-67.22 67.175-64.307-64.307 431.309-431.31c35.498-35.498 93.115-35.498 128.614 0l431.309 431.31-64.307 64.307L871.083 512z" })), o$5 = '<svg class="codepen-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M123.429 668L468 897.714V692.571L277.143 565.143zM88 585.714L198.286 512 88 438.286v147.428zm468 312L900.571 668 746.857 565.143 556 692.57v205.143zM512 616l155.429-104L512 408 356.571 512zM277.143 458.857L468 331.43V126.286L123.429 356zM825.714 512L936 585.714V438.286zm-78.857-53.143L900.571 356 556 126.286v205.143zM1024 356v312q0 23.429-19.429 36.571l-468 312Q524.571 1024 512 1024t-24.571-7.429l-468-312Q0 691.43 0 668V356q0-23.429 19.429-36.571l468-312Q499.429 0 512 0t24.571 7.429l468 312Q1024 332.57 1024 356z"/></svg>', v$2 = '<svg class="jsfiddle-icon" viewBox="0 0 1170 1024" xmlns="http://www.w3.org/2000/svg"><path d="M1028.571 441.143q63.429 26.286 102.572 83.143t39.143 126.571q0 93.714-67.429 160.286T940 877.714q-2.286 0-6.571-.285t-6-.286H232q-97.143-5.714-164.571-71.714T0 645.143q0-62.857 31.429-116t84-84q-6.858-22.286-6.858-46.857 0-65.715 46.858-112T269.143 240q54.286 0 98.286 33.143 42.857-88 127.142-141.714t186.572-53.715q94.857 0 174.857 46t126.571 124.857 46.572 172q0 3.429-.286 10.286t-.286 10.286zm-761.142 152q0 69.714 48 110.286T434.286 744q78.285 0 137.143-56.571-9.143-11.429-27.143-32.286t-24.857-28.857q-38.286 37.143-82.286 37.143-31.429 0-53.429-19.143t-22-50q0-30.286 22-49.715T436 525.143q25.143 0 48.286 12T526 568.57t37.143 42.858 39.428 46.857 44 42.857T702 732.57t69.429 12q69.142 0 116.857-40.857T936 594.857q0-69.143-48-109.714T769.714 444.57Q688 444.571 632 500l53.143 61.714q37.714-36.571 81.143-36.571 29.714 0 52.571 18.857t22.857 48q0 32.571-21.143 52.286T766.857 664q-24.571 0-47.143-12t-41.143-31.429-37.428-42.857-39.714-46.857T557.143 488 502 456.571t-67.714-12q-69.715 0-118.286 40.286t-48.571 108.286z"/></svg>', l$3 = '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 74.667C270.933 74.667 74.667 270.933 74.667 512S270.933 949.333 512 949.333 949.333 753.067 949.333 512 753.067 74.667 512 74.667zm0 810.666C307.2 885.333 138.667 716.8 138.667 512S307.2 138.667 512 138.667 885.333 307.2 885.333 512 716.8 885.333 512 885.333z"/><path d="M708.267 465.067 473.6 330.667c-8.533-4.267-17.067-6.4-25.6-6.4-29.867 0-53.333 23.466-53.333 53.333v268.8c0 8.533 2.133 19.2 6.4 25.6 10.666 17.067 27.733 27.733 46.933 27.733 8.533 0 17.067-2.133 25.6-6.4l234.667-134.4c8.533-4.266 14.933-10.666 19.2-19.2 6.4-12.8 8.533-27.733 4.266-40.533-2.133-14.933-10.666-25.6-23.466-34.133zM458.667 627.2V396.8L661.333 512 458.667 627.2z"/></svg>';
const codeDemo = "";
const L$2 = { "useBabel": false, "jsLib": [], "cssLib": [], "codepenLayout": "left", "codepenEditors": "101", "babel": "https://unpkg.com/@babel/standalone/babel.min.js", "vue": "https://unpkg.com/vue/dist/vue.global.prod.js", "react": "https://unpkg.com/react/umd/react.production.min.js", "reactDOM": "https://unpkg.com/react-dom/umd/react-dom.production.min.js" }, $ = { html: { types: ["html", "slim", "haml", "md", "markdown", "vue"], map: { html: "none", vue: "none", md: "markdown" } }, js: { types: ["js", "javascript", "coffee", "coffeescript", "ts", "typescript", "ls", "livescript"], map: { js: "none", javascript: "none", coffee: "coffeescript", ls: "livescript", ts: "typescript" } }, css: { types: ["css", "less", "sass", "scss", "stylus", "styl"], map: { css: "none", styl: "stylus" } } }, k$2 = (e2, s2, t2) => {
  const o2 = document.createElement(e2);
  return isPlainObject(s2) && f$4(s2).forEach((l2) => {
    if (l2.indexOf("data"))
      o2[l2] = s2[l2];
    else {
      const n2 = l2.replace("data", "");
      o2.dataset[n2] = s2[l2];
    }
  }), t2 && t2.forEach((l2) => {
    o2.appendChild(l2);
  }), o2;
}, S = (e2) => ({ ...L$2, ...e2, jsLib: Array.from(/* @__PURE__ */ new Set([...L$2.jsLib || [], ...e2.jsLib || []])), cssLib: Array.from(/* @__PURE__ */ new Set([...L$2.cssLib || [], ...e2.cssLib || []])) }), m = (e2, s2) => {
  if (e2[s2] !== void 0)
    return e2[s2];
  const t2 = new Promise((o2) => {
    var l2;
    const n2 = document.createElement("script");
    n2.src = s2, (l2 = document.querySelector("body")) == null || l2.appendChild(n2), n2.onload = () => {
      o2();
    };
  });
  return e2[s2] = t2, t2;
}, V = (e2, s2) => {
  if (s2.css && Array.from(e2.childNodes).every((t2) => t2.nodeName !== "STYLE")) {
    const t2 = k$2("style", { innerHTML: s2.css });
    e2.appendChild(t2);
  }
}, H$1 = (e2, s2, t2) => {
  const o2 = t2.getScript();
  if (o2 && Array.from(s2.childNodes).every((l2) => l2.nodeName !== "SCRIPT")) {
    const l2 = document.createElement("script");
    l2.appendChild(document.createTextNode(`{const document=window.document.querySelector('#${e2} .vp-code-demo-display').shadowRoot;
${o2}}`)), s2.appendChild(l2);
  }
}, I = (e2) => {
  const s2 = f$4(e2), t2 = { html: [], js: [], css: [], isLegal: false };
  return ["html", "js", "css"].forEach((o2) => {
    const l2 = s2.filter((n2) => $[o2].types.includes(n2));
    if (l2.length) {
      const n2 = l2[0];
      t2[o2] = [e2[n2].replace(/^\n|\n$/g, ""), $[o2].map[n2] || n2];
    }
  }), t2.isLegal = (!t2.html.length || t2.html[1] === "none") && (!t2.js.length || t2.js[1] === "none") && (!t2.css.length || t2.css[1] === "none"), t2;
}, x$1 = (e2) => e2.replace(/<br \/>/g, "<br>").replace(/<((\S+)[^<]*?)\s+\/>/g, "<$1></$2>"), O = (e2) => `<div id="app">
${x$1(e2)}
</div>`, J = (e2) => `${e2.replace("export default ", "const $reactApp = ").replace(/App\.__style__(\s*)=(\s*)`([\s\S]*)?`/, "")};
ReactDOM.createRoot(document.getElementById("app")).render(React.createElement($reactApp))`, q = (e2) => e2.replace(/export\s+default\s*\{(\n*[\s\S]*)\n*\}\s*;?$/u, "Vue.createApp({$1}).mount('#app')").replace(/export\s+default\s*define(Async)?Component\s*\(\s*\{(\n*[\s\S]*)\n*\}\s*\)\s*;?$/u, "Vue.createApp({$1}).mount('#app')").trim(), A$2 = (e2) => `(function(exports){var module={};module.exports=exports;${e2};return module.exports.__esModule?module.exports.default:module.exports;})({})`, F = (e2, s2) => {
  const t2 = S(s2), o2 = e2.js[0] || "";
  return { ...t2, html: x$1(e2.html[0] || ""), js: o2, css: e2.css[0] || "", isLegal: e2.isLegal, getScript: () => {
    var l2;
    return t2.useBabel ? ((l2 = window.Babel.transform(o2, { presets: ["es2015"] })) == null ? void 0 : l2.code) || "" : o2;
  } };
}, G = /<template>([\s\S]+)<\/template>/u, Y = /<script(\s*lang=(['"])(.*?)\2)?>([\s\S]+)<\/script>/u, K = /<style(\s*lang=(['"])(.*?)\2)?\s*(?:scoped)?>([\s\S]+)<\/style>/u, U$1 = (e2, s2) => {
  const t2 = S(s2), o2 = e2.html[0] || "", l2 = G.exec(o2), n2 = Y.exec(o2), d2 = K.exec(o2), u2 = l2 ? l2[1].replace(/^\n|\n$/g, "") : "", [i2 = "", c2 = ""] = n2 ? [n2[4].replace(/^\n|\n$/g, ""), n2[3]] : [], [a2 = "", h2 = ""] = d2 ? [d2[4].replace(/^\n|\n$/g, ""), d2[3]] : [], f2 = c2 === "" && (h2 === "" || h2 === "css");
  return { ...t2, html: O(u2), js: q(i2), css: a2, isLegal: f2, jsLib: [t2.vue, ...t2.jsLib], getScript: () => {
    var y2, p2;
    const g2 = s2.useBabel ? ((p2 = (y2 = window.Babel) == null ? void 0 : y2.transform(i2, { presets: ["es2015"] })) == null ? void 0 : p2.code) || "" : i2.replace(/export\s+default/u, "return");
    return `const app=window.document.createElement('div');document.firstElementChild.appendChild(app);const appOptions=${A$2(g2)};appOptions.template=\`${u2.replace("`", '\\`"')}\`;window.Vue.createApp(appOptions).mount(app);`;
  } };
}, W = (e2, s2) => {
  const t2 = S(s2);
  return { ...t2, html: O(""), js: J(e2.js[0] || ""), css: e2.css[0] || (e2.js[0] ? e2.js[0].replace(/App\.__style__(?:\s*)=(?:\s*)`([\s\S]*)?`/, "$1").trim() : ""), isLegal: e2.isLegal, jsLib: [t2.react, t2.reactDOM, ...t2.jsLib], jsx: true, getScript: () => {
    var o2, l2;
    const n2 = ((l2 = (o2 = window.Babel) == null ? void 0 : o2.transform(e2.js[0] || "", { presets: ["es2015", "react"] })) == null ? void 0 : l2.code) || "";
    return `window.ReactDOM.createRoot(document.firstElementChild).render(window.React.createElement(${A$2(n2)}))`;
  } };
}, v$1 = {}, z = (e2) => Promise.all([m(v$1, e2.babel), m(v$1, e2.react), m(v$1, e2.reactDOM)]), Q = (e2) => {
  const s2 = [m(v$1, e2.vue)];
  return e2.useBabel && s2.push(m(v$1, e2.babel)), Promise.all(s2);
}, X = (e2) => e2.useBabel ? m(v$1, e2.babel) : Promise.resolve();
var Z = defineComponent({ name: "CodeDemo", props: { id: { type: String, required: true }, type: { type: String, default: "normal" }, title: { type: String, default: "" }, config: { type: String, default: "" }, code: { type: String, required: true } }, slots: Object, setup(e2, { slots: s2 }) {
  const [t2, o2] = useToggle(false), l2 = shallowRef(), n2 = shallowRef(), d2 = ref("0"), u2 = ref(false), i2 = computed(() => JSON.parse(e2.config ? Fe(e2.config) : "{}")), c2 = computed(() => {
    const p2 = JSON.parse(Fe(e2.code));
    return I(p2);
  }), a2 = computed(() => e2.type === "react" ? W(c2.value, i2.value) : e2.type === "vue" ? U$1(c2.value, i2.value) : F(c2.value, i2.value)), h2 = computed(() => a2.value.isLegal), f2 = (p2 = false) => {
    const g2 = l2.value.attachShadow({ mode: "open" }), j2 = document.createElement("div");
    j2.classList.add("code-demo-app"), g2.appendChild(j2), h2.value ? (p2 && (j2.innerHTML = a2.value.html), V(g2, a2.value), H$1(e2.id, g2, a2.value), d2.value = "0") : d2.value = "auto", u2.value = true;
  }, y2 = () => {
    switch (e2.type) {
      case "react":
        return z(a2.value).then(() => f2());
      case "vue":
        return Q(a2.value).then(() => f2());
      default:
        return X(a2.value).then(() => f2(true));
    }
  };
  return onMounted(() => {
    setTimeout(() => {
      y2();
    }, 800);
  }), () => {
    var p2;
    return h$4("div", { class: "vp-code-demo", id: e2.id }, [h$4("div", { class: "vp-code-demo-header" }, [a2.value.isLegal ? h$4("button", { type: "button", title: "toggle", "aria-hidden": true, class: ["vp-code-demo-toggle-button", t2.value ? "down" : "end"], onClick: () => {
      d2.value = t2.value ? "0" : `${n2.value.clientHeight + 13.8}px`, o2();
    } }) : null, e2.title ? h$4("span", { class: "vp-code-demo-title" }, decodeURIComponent(e2.title)) : null, a2.value.isLegal && a2.value.jsfiddle !== false ? h$4("form", { class: "code-demo-jsfiddle", target: "_blank", action: "https://jsfiddle.net/api/post/library/pure/", method: "post" }, [h$4("input", { type: "hidden", name: "html", value: a2.value.html }), h$4("input", { type: "hidden", name: "js", value: a2.value.js }), h$4("input", { type: "hidden", name: "css", value: a2.value.css }), h$4("input", { type: "hidden", name: "wrap", value: "1" }), h$4("input", { type: "hidden", name: "panel_js", value: "3" }), h$4("input", { type: "hidden", name: "resources", value: [...a2.value.cssLib, ...a2.value.jsLib].join(",") }), h$4("button", { type: "submit", class: "jsfiddle-button", innerHTML: v$2, "aria-label": "JSFiddle", "data-balloon-pos": "up" })]) : null, !a2.value.isLegal || a2.value.codepen !== false ? h$4("form", { class: "code-demo-codepen", target: "_blank", action: "https://codepen.io/pen/define", method: "post" }, [h$4("input", { type: "hidden", name: "data", value: JSON.stringify({ html: a2.value.html, js: a2.value.js, css: a2.value.css, js_external: a2.value.jsLib.join(";"), css_external: a2.value.cssLib.join(";"), layout: a2.value.codepenLayout, html_pre_processor: c2.value ? c2.value.html[1] : "none", js_pre_processor: c2.value ? c2.value.js[1] : a2.value.jsx ? "babel" : "none", css_pre_processor: c2.value ? c2.value.css[1] : "none", editors: a2.value.codepenEditors }) }), h$4("button", { type: "submit", innerHTML: o$5, class: "codepen-button", "aria-label": "Codepen", "data-balloon-pos": "up" })]) : null]), u2.value ? null : h$4(C$4, { class: "vp-code-demo-loading" }), h$4("div", { ref: l2, class: "vp-code-demo-display", style: { display: h2.value && u2.value ? "block" : "none" } }), h$4("div", { class: "vp-code-demo-code-wrapper", style: { height: d2.value } }, h$4("div", { ref: n2, class: "vp-code-demo-codes" }, (p2 = s2.default) == null ? void 0 : p2.call(s2)))]);
  };
} });
const echarts = "";
const g = (async () => {
}).constructor, v = (e2, i2, o2) => i2 === "js" ? g("myChart", `let width,height,option,__echarts_config__;
{
${e2}
__echarts_config__={width,height,option};
}
return __echarts_config__;
`)(o2) : Promise.resolve({ option: JSON.parse(e2) });
var y$1 = defineComponent({ name: "ECharts", props: { config: { type: String, required: true }, id: { type: String, required: true }, title: { type: String, default: "" }, type: { type: String, default: "json" } }, setup(e2) {
  const i2 = ref(true), o2 = shallowRef();
  let t2;
  return useEventListener("resize", useDebounceFn(() => t2 == null ? void 0 : t2.resize(), 100)), onMounted(() => {
    Promise.all([__vitePreload(() => import("./index-bbe2273d.js"), true ? [] : void 0), new Promise((r2) => setTimeout(r2, 800))]).then(async ([r2]) => {
      t2 = r2.init(o2.value);
      const { option: s2, ...a2 } = await v(Fe(e2.config), e2.type, t2);
      t2.resize(a2), t2.setOption(s2), i2.value = false;
    });
  }), onUnmounted(() => {
    t2 == null || t2.dispose();
  }), () => [e2.title ? h$4("div", { class: "echarts-title" }, decodeURIComponent(e2.title)) : null, h$4("div", { class: "echarts-wrapper" }, [h$4("div", { ref: o2, class: "echarts-container", id: e2.id }), i2.value ? h$4(C$4, { class: "echarts-loading", height: 360 }) : null])];
} });
const figure = "";
const flowchart = "";
var l$2 = { x: 0, y: 0, "line-width": 2, "line-length": 40, "text-margin": 8, "font-size": 14, "font-color": "#8DA1AC", "line-color": "#8DA1AC", "element-color": "black", fill: "white", "yes-text": "Yes", "no-text": "No", "arrow-end": "block", scale: 1 }, o$4 = { ...l$2, symbols: { start: { class: "start-element", "font-color": "#fff", fill: "#595959", "line-width": "0px" }, end: { class: "end-element", "font-color": "#fff", fill: "#595959", "line-width": "0px" }, operation: { class: "operation-element", "font-color": "#fff", fill: "#1890ff", "line-width": "0px" }, inputoutput: { class: "inputoutput-element", "font-color": "#fff", fill: "#1890ff", "line-width": "0px" }, subroutine: { class: "subroutine-element", "font-color": "#fff", fill: "#FF485E", "element-color": "#fff", "line-color": "red" }, condition: { class: "condition-element", "font-color": "#fff", fill: "#FF485E", "line-width": "0px" }, parallel: { class: "parallel-element", "font-color": "#fff", fill: "#1890ff", "line-width": "0px" } } }, e$3 = { ...l$2, "line-width": 1, symbols: { start: { class: "start-element", fill: "#ccc", "line-color": "#5c6ac4", "font-color": "#000" }, end: { class: "end-element", fill: "#ccc", "line-color": "#5c6ac4", "font-color": "#000" }, operation: { class: "operation-element", fill: "#f1f1f1", "line-color": "#5c6ac4", "font-color": "#000" }, inputoutput: { class: "inputoutput-element", fill: "#f1f1f1", "line-color": "#5c6ac4", "font-color": "#000" }, subroutine: { class: "subroutine-element", fill: "#f1f1f1", "line-color": "#5c6ac4", "font-color": "#000" }, condition: { class: "condition-element", fill: "#f1f1f1", "line-color": "#5c6ac4", "font-color": "#000" }, parallel: { class: "parallel-element", fill: "#f1f1f1", "line-color": "#5c6ac4", "font-color": "#000" } } }, t$6 = { ...l$2, symbols: { start: { class: "start-element", "font-color": "#fff", fill: "#2F495F", "line-width": "0px" }, end: { class: "end-element", "font-color": "#fff", fill: "#2F495F", "line-width": "0px" }, operation: { class: "operation-element", "font-color": "#fff", fill: "#00BC7D", "line-width": "0px" }, inputoutput: { class: "inputoutput-element", "font-color": "#fff", fill: "#EB4D5D", "line-width": "0px" }, subroutine: { class: "subroutine-element", "font-color": "#fff", fill: "#937AC4", "element-color": "#fff", "line-color": "red" }, condition: { class: "condition-element", "font-color": "#fff", fill: "#FFB500", "line-width": "0px" }, parallel: { class: "parallel-element", "font-color": "#fff", fill: "#2F495F", "line-width": "0px" } } };
const f$1 = { ant: o$4, vue: t$6, pie: e$3 };
var y = defineComponent({ name: "FlowChart", props: { code: { type: String, required: true }, id: { type: String, required: true }, preset: { type: String, default: "vue" } }, setup(r2) {
  let o2 = null;
  const d2 = shallowRef(), t2 = ref(true), n2 = ref(1), a2 = computed(() => f$1[r2.preset] || (console.warn(`[md-enhance:flowchart] Unknown preset: ${r2.preset}`), f$1.vue)), l2 = (e2) => e2 < 419 ? 0.8 : e2 > 1280 ? 1 : 0.9;
  return onMounted(() => {
    Promise.all([__vitePreload(() => import("./flowchart-88d9ab5e.js"), true ? [] : void 0), new Promise((e2) => setTimeout(e2, 800))]).then(([{ parse: e2 }]) => {
      o2 = e2(Fe(r2.code)), n2.value = l2(window.innerWidth), t2.value = false, o2.draw(r2.id, { ...a2.value, scale: n2.value });
    }), useEventListener("resize", useDebounceFn(() => {
      if (o2) {
        const e2 = l2(window.innerWidth);
        n2.value !== e2 && (n2.value = e2, o2.draw(r2.id, { ...a2.value, scale: e2 }));
      }
    }, 100));
  }), () => [t2.value ? h$4(C$4, { class: "flowchart-loading", height: 192 }) : null, h$4("div", { ref: d2, class: ["flowchart-wrapper", r2.preset], id: r2.id, style: { display: t2.value ? "none" : "block" } })];
} });
const footnote = "";
const imageMark = "";
const mermaid = "";
let i$4 = {};
const o$3 = Symbol(""), r$3 = () => inject(o$3), t$5 = (e2) => {
  e2.provide(o$3, i$4);
};
const o$2 = { useMaxWidth: false }, L$1 = (e2) => ({ dark: e2, background: e2 ? "#1e1e1e" : "#fff", primaryColor: e2 ? "#389d70" : "#4abf8a", primaryBorderColor: e2 ? "#389d70" : "#4abf8a", primaryTextColor: "#fff", secondaryColor: "#ffb500", secondaryBorderColor: e2 ? "#fff" : "#000", secondaryTextColor: e2 ? "#ddd" : "#333", tertiaryColor: e2 ? "#282828" : "#efeef4", tertiaryBorderColor: e2 ? "#bbb" : "#242424", tertiaryTextColor: e2 ? "#ddd" : "#333", noteBkgColor: e2 ? "#f6d365" : "#fff5ad", noteTextColor: "#242424", noteBorderColor: e2 ? "#f6d365" : "#333", lineColor: e2 ? "#d3d3d3" : "#333", textColor: e2 ? "#fff" : "#242424", mainBkg: e2 ? "#389d70" : "#4abf8a", errorBkgColor: "#eb4d5d", errorTextColor: "#fff", nodeBorder: e2 ? "#389d70" : "#4abf8a", nodeTextColor: e2 ? "#fff" : "#242424", signalTextColor: e2 ? "#9e9e9e" : "#242424", classText: "#fff", labelColor: "#fff", fillType0: e2 ? "#cf1322" : "#f1636e", fillType1: "#f39c12", fillType2: "#2ecc71", fillType3: "#fa541c", fillType4: "#25a55b", fillType5: "#13c2c2", fillType6: "#096dd9", fillType7: "#aa6fe9" });
var k$1 = defineComponent({ name: "Mermaid", props: { id: { type: String, required: true }, code: { type: String, required: true } }, setup(e2) {
  const { themeVariables: d2, ...s2 } = r$3(), f2 = shallowRef(), m2 = computed(() => Fe(e2.code)), l2 = ref(""), i2 = ref(false), c2 = async () => {
    const [{ default: t2 }] = await Promise.all([__vitePreload(() => import("./mermaid.core-0d1776a9.js").then((n2) => n2.aN), true ? ["assets/mermaid.core-0d1776a9.js","assets/commonjsHelpers-7a77ea84.js"] : void 0), new Promise((r2) => setTimeout(r2, 800))]);
    t2.initialize({ theme: "base", themeVariables: { ...L$1(i2.value), ...Re(d2) ? d2(i2.value) : d2 }, flowchart: o$2, sequence: o$2, journey: o$2, gantt: o$2, er: o$2, pie: o$2, ...s2, startOnLoad: false }), l2.value = (await t2.render(e2.id, m2.value)).svg;
  }, p2 = () => {
    const { body: t2 } = document, r2 = document.createElement("div");
    r2.classList.add("mermaid-preview"), r2.innerHTML = l2.value, t2.appendChild(r2), r2.addEventListener("click", () => {
      t2.removeChild(r2);
    });
  }, u2 = () => {
    const t2 = `data:image/svg+xml;charset=utf8,${l2.value.replace(/%/g, "%25").replace(/"/g, "%22").replace(/'/g, "%27").replace(/&/g, "%26").replace(/#/g, "%23").replace(/{/g, "%7B").replace(/}/g, "%7D").replace(/</g, "%3C").replace(/>/g, "%3E")}`, r2 = document.createElement("a");
    r2.setAttribute("href", t2), r2.setAttribute("download", `${e2.id}.svg`), r2.click();
  };
  return onMounted(() => {
    const t2 = document.documentElement, r2 = () => t2.classList.contains("dark") || t2.getAttribute("data-theme") === "dark";
    i2.value = r2(), c2(), useMutationObserver(t2, () => {
      i2.value = r2();
    }, { attributeFilter: ["class", "data-theme"], attributes: true }), watch(i2, () => c2());
  }), () => [h$4("div", { class: "mermaid-actions" }, [h$4("button", { class: "preview-button", onClick: () => p2(), title: "preview", innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1316 1024" fill="currentColor"><path d="M658.286 0C415.89 0 0 297.106 0 512c0 214.82 415.89 512 658.286 512 242.322 0 658.285-294.839 658.285-512S900.608 0 658.286 0zm0 877.714c-161.573 0-512-221.769-512-365.714 0-144.018 350.427-365.714 512-365.714 161.572 0 512 217.16 512 365.714s-350.428 365.714-512 365.714z"/><path d="M658.286 292.571a219.429 219.429 0 1 0 0 438.858 219.429 219.429 0 0 0 0-438.858zm0 292.572a73.143 73.143 0 1 1 0-146.286 73.143 73.143 0 0 1 0 146.286z"/></svg>' }), h$4("button", { class: "download-button", onClick: () => u2(), title: "download", innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor"><path d="M828.976 894.125H190.189c-70.55 0-127.754-57.185-127.754-127.753V606.674c0-17.634 14.31-31.933 31.933-31.933h63.889c17.634 0 31.932 14.299 31.932 31.933v95.822c0 35.282 28.596 63.877 63.877 63.877h511.033c35.281 0 63.877-28.595 63.877-63.877v-95.822c0-17.634 14.298-31.933 31.943-31.933h63.878c17.635 0 31.933 14.299 31.933 31.933v159.7c0 70.566-57.191 127.751-127.754 127.751zM249.939 267.51c12.921-12.92 33.885-12.92 46.807 0l148.97 148.972V94.893c0-17.634 14.302-31.947 31.934-31.947h63.876c17.638 0 31.946 14.313 31.946 31.947v321.589l148.97-148.972c12.922-12.92 33.876-12.92 46.797 0l46.814 46.818c12.922 12.922 12.922 33.874 0 46.807L552.261 624.93c-1.14 1.138-21.664 13.684-42.315 13.693-20.877.01-41.88-12.542-43.021-13.693L203.122 361.135c-12.923-12.934-12.923-33.885 0-46.807l46.817-46.818z"/></svg>' })]), h$4("div", { ref: f2, class: "mermaid-wrapper" }, l2.value ? h$4("div", { class: "mermaid-content", innerHTML: l2.value }) : h$4(C$4, { class: "mermaid-loading", height: 96 }))];
} });
let o$1 = {};
const i$3 = Symbol(""), a$2 = () => inject(i$3), l$1 = (e2) => {
  e2.provide(i$3, o$1);
};
const s$2 = { showCompileOutput: false, clearConsole: false, ssr: false };
let e$2 = s$2;
const n$6 = Symbol(""), r$2 = () => inject(n$6), t$4 = (o2) => {
  o2.provide(n$6, e$2);
};
const e$1 = () => __vitePreload(() => import("./highlight.esm-5a7d9d1a.js"), true ? [] : void 0), o = () => __vitePreload(() => import("./markdown.esm-1a815376.js"), true ? [] : void 0), r$1 = () => __vitePreload(() => import("./math.esm-821e316c.js"), true ? [] : void 0), t$3 = () => __vitePreload(() => import("./notes.esm-f01d36a5.js"), true ? [] : void 0), i$2 = () => __vitePreload(() => import("./reveal.esm-72a5d327.js"), true ? [] : void 0), a$1 = () => __vitePreload(() => import("./search.esm-bd340a27.js"), true ? [] : void 0), n$5 = () => __vitePreload(() => import("./zoom.esm-226c665b.js"), true ? [] : void 0);
const reveal = "";
const useReveal = () => [i$2(), o(), e$1(), r$1(), a$1(), t$3(), n$5()];
const index$1 = "";
const leagueGothic = "";
const sourceSansPro = "";
var R = defineComponent({ name: "Presentation", props: { id: { type: String, required: true }, code: { type: String, required: true }, theme: { type: String, default: "auto" } }, setup(r2) {
  const l2 = a$2(), t2 = usePageFrontmatter(), n2 = ref(""), s2 = ref(true), u2 = shallowRef();
  let i2 = null;
  const p2 = async (e2) => {
    const v2 = [new Promise((o2) => setTimeout(o2, 800)), ...useReveal()], [, c2, ...f2] = await Promise.all(v2), d2 = new c2.default(e2, { backgroundTransition: "slide", hash: t2.value.layout === "Slide", mouseWheel: t2.value.layout === "Slide", transition: "slide", slideNumber: true, ...l2, ...t2.value.reveal || {}, embedded: t2.value.layout !== "Slide", plugins: [...f2.map(({ default: o2 }) => o2), ...l2.plugins ?? []] });
    return await d2.initialize(), d2;
  };
  return onMounted(async () => {
    const e2 = u2.value;
    e2 && (n2.value = Fe(r2.code), e2.setAttribute("id", r2.id), e2.setAttribute("data-theme", r2.theme), i2 = await p2(e2), s2.value = false);
  }), onUnmounted(() => {
    i2 == null || i2.destroy();
  }), () => h$4("div", { class: "vp-reveal" }, [h$4("div", { ref: u2, class: ["reveal", "reveal-viewport"] }, h$4("div", { class: "slides", innerHTML: `<section data-markdown data-separator="^\\r?\\n---\\r?\\n$" data-separator-vertical="^\\r?\\n--\\r?\\n$"><script type="text/template">${n2.value}<\/script></section>` })), s2.value ? h$4(C$4, { class: "reveal-loading", height: 400 }) : null]);
} });
const playground = "";
var n$4 = defineComponent({ name: "Playground", props: { title: { type: String, default: "" }, link: { type: String, required: true } }, setup(o2) {
  return () => [h$4("div", { class: "vp-playground" }, [h$4("div", { class: "vp-playground-header" }, [o2.title ? h$4("div", { class: "vp-playground-title" }, decodeURIComponent(o2.title)) : null, h$4("div", { class: "vp-playground-actions" }, [h$4("a", { class: "vp-playground-action", href: decodeURIComponent(o2.link), target: "_blank", innerHTML: l$3 })])]), h$4("div", { class: "vp-playground-container" }, h$4("iframe", { src: decodeURIComponent(o2.link) }))])];
} });
const tabs = "";
const n$3 = useStorage("VUEPRESS_TAB_STORE", {});
var A$1 = defineComponent({ name: "Tabs", props: { active: { type: Number, default: 0 }, data: { type: Array, required: true }, id: { type: String, required: true }, tabId: { type: String, default: "" } }, slots: Object, setup(a2, { slots: v2 }) {
  const l2 = ref(a2.active), r2 = shallowRef([]), o2 = () => {
    a2.tabId && (n$3.value[a2.tabId] = a2.data[l2.value].id);
  }, s2 = (e2 = l2.value) => {
    l2.value = e2 < r2.value.length - 1 ? e2 + 1 : 0, r2.value[l2.value].focus();
  }, c2 = (e2 = l2.value) => {
    l2.value = e2 > 0 ? e2 - 1 : r2.value.length - 1, r2.value[l2.value].focus();
  }, b2 = (e2, t2) => {
    e2.key === " " || e2.key === "Enter" ? (e2.preventDefault(), l2.value = t2) : e2.key === "ArrowRight" ? (e2.preventDefault(), s2()) : e2.key === "ArrowLeft" && (e2.preventDefault(), c2()), o2();
  }, p2 = () => {
    if (a2.tabId) {
      const e2 = a2.data.findIndex(({ id: t2 }) => n$3.value[a2.tabId] === t2);
      if (e2 !== -1)
        return e2;
    }
    return a2.active;
  };
  return onMounted(() => {
    l2.value = p2(), watch(() => n$3.value[a2.tabId], (e2, t2) => {
      if (a2.tabId && e2 !== t2) {
        const u2 = a2.data.findIndex(({ id: i2 }) => i2 === e2);
        u2 !== -1 && (l2.value = u2);
      }
    });
  }), () => a2.data.length ? h$4("div", { class: "vp-tabs" }, [h$4("div", { class: "vp-tabs-nav", role: "tablist" }, a2.data.map(({ id: e2 }, t2) => {
    const u2 = t2 === l2.value;
    return h$4("button", { type: "button", ref: (i2) => {
      i2 && (r2.value[t2] = i2);
    }, class: ["vp-tab-nav", { active: u2 }], role: "tab", "aria-controls": `tab-${a2.id}-${t2}`, "aria-selected": u2, onClick: () => {
      l2.value = t2, o2();
    }, onKeydown: (i2) => b2(i2, t2) }, v2[`title${t2}`]({ value: e2, isActive: u2 }));
  })), a2.data.map(({ id: e2 }, t2) => {
    const u2 = t2 === l2.value;
    return h$4("div", { class: ["vp-tab", { active: u2 }], id: `tab-${a2.id}-${t2}`, role: "tabpanel", "aria-expanded": u2 }, v2[`tab${t2}`]({ value: e2, isActive: u2 }));
  })]) : null;
} });
const tasklist = "";
const katex_min = "";
const katex = "";
const clientConfig9 = defineClientConfig({
  enhance: ({ app }) => {
    app.component("ChartJS", h$1);
    app.component("CodeTabs", A$3);
    if (!Qe("CodeGroup", app))
      app.component("CodeGroup", C$1);
    if (!Qe("CodeGroupItem", app))
      app.component("CodeGroupItem", c$3);
    app.component("CodeDemo", Z);
    app.component("ECharts", y$1);
    app.component("FlowChart", y);
    t$5(app);
    app.component("Mermaid", k$1);
    l$1(app);
    app.component("Presentation", R);
    app.component("Playground", n$4);
    app.component("Tabs", A$1);
    t$4(app);
    app.component("VuePlayground", defineAsyncComponent(() => __vitePreload(() => import("./VuePlayground-54960cf6.js"), true ? [] : void 0)));
  },
  setup: () => {
  }
});
let i$1 = {};
const t$2 = Symbol(""), n$2 = () => inject(t$2), s$1 = (o2) => {
  o2.provide(t$2, i$1);
};
const photoswipe = "";
const photoSwipe = "";
const P = ".theme-hope-content :not(a) > img:not([no-view])", x = { "/": { "closeTitle": "关闭", "downloadTitle": "下载图片", "fullscreenTitle": "切换全屏", "zoomTitle": "缩放", "arrowPrevTitle": "上一个 (左箭头)", "arrowNextTitle": "下一个 (右箭头)" } }, A = 800, b = '<div class="photo-swipe-loading"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" preserveAspectRatio="xMidYMid" viewBox="25 25 50 50"><animateTransform attributeName="transform" type="rotate" dur="2s" keyTimes="0;1" repeatCount="indefinite" values="0;360"></animateTransform><circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><animate attributeName="stroke-dasharray" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="1,200;90,200;1,200"></animate><animate attributeName="stroke-dashoffset" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="0;-35px;-125px"></animate></circle></svg></div>', H = (e2) => isString(e2) ? Array.from(document.querySelectorAll(e2)) : e2.map((l2) => Array.from(document.querySelectorAll(l2))).flat(), h = (e2) => new Promise((l2, m2) => {
  e2.complete ? l2({ type: "image", element: e2, src: e2.src, width: e2.naturalWidth, height: e2.naturalHeight, alt: e2.alt, msrc: e2.src }) : (e2.onload = () => l2(h(e2)), e2.onerror = (d2) => m2(d2));
}), N = () => {
  const { isSupported: e2, toggle: l2 } = useFullscreen(), m2 = n$2(), d2 = Ze(x), v2 = usePageData();
  let n2;
  const g2 = (a2) => {
    a2.on("uiRegister", () => {
      e2 && a2.ui.registerElement({ name: "fullscreen", order: 7, isButton: true, html: '<svg class="pswp__icn" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M249.5 270.833H437v-75H212a37.5 37.5 0 0 0-37.5 37.5v225h75v-187.5zm-37.5 600h225v-75H249.5v-187.5h-75v225a37.5 37.5 0 0 0 37.5 37.5zm637.5-37.5v-225h-75v187.5H587v75h225a37.5 37.5 0 0 0 37.5-37.5zM587 270.833h187.5v187.5h75v-225a37.5 37.5 0 0 0-37.5-37.5H587v75z"/></svg>', onClick: () => {
        l2();
      } }), a2.ui.registerElement({ name: "download", order: 8, isButton: true, tagName: "a", html: { isCustomSVG: true, inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1-1.5-1.6ZM23 23H9v2h14" id="pswp__icn-download"/>', outlineID: "pswp__icn-download" }, onInit: (r2, o2) => {
        r2.setAttribute("download", ""), r2.setAttribute("target", "_blank"), r2.setAttribute("rel", "noopener"), o2.on("change", () => {
          r2.setAttribute("href", o2.currSlide.data.src);
        });
      } }), a2.ui.registerElement({ name: "bulletsIndicator", className: "photo-swipe-bullets-indicator", appendTo: "wrapper", onInit: (r2, o2) => {
        const t2 = [];
        let i2 = -1;
        for (let s2 = 0; s2 < o2.getNumItems(); s2++) {
          const c2 = document.createElement("div");
          c2.className = "photo-swipe-bullet", c2.onclick = (w2) => {
            o2.goTo(t2.indexOf(w2.target));
          }, t2.push(c2), r2.appendChild(c2);
        }
        o2.on("change", () => {
          i2 >= 0 && t2[i2].classList.remove("active"), t2[o2.currIndex].classList.add("active"), i2 = o2.currIndex;
        });
      } });
    });
  }, p2 = () => Promise.all([__vitePreload(() => import("./photoswipe.esm-9513d798.js"), true ? [] : void 0), nextTick().then(() => new Promise((a2) => setTimeout(a2, A)).then(() => H(P)))]).then(([{ default: a2 }, r2]) => {
    const o2 = r2.map((t2) => ({ html: b, element: t2, msrc: t2.src }));
    r2.forEach((t2, i2) => {
      const s2 = () => {
        n2 = new a2({ preloaderDelay: 0, showHideAnimationType: "zoom", ...d2.value, ...m2, dataSource: o2, index: i2, ...{ closeOnVerticalDrag: true, wheelToZoom: false } }), g2(n2), n2.addFilter("thumbEl", () => t2), n2.addFilter("placeholderSrc", () => t2.src), n2.init();
      };
      t2.style.cursor = "zoom-in", t2.addEventListener("click", () => {
        s2();
      }), t2.addEventListener("keypress", ({ key: c2 }) => {
        c2 === "Enter" && s2();
      });
    }), r2.forEach((t2, i2) => {
      h(t2).then((s2) => {
        o2.splice(i2, 1, s2), n2 == null || n2.refreshSlideContent(i2);
      });
    });
  });
  onMounted(() => {
    useEventListener("wheel", () => {
      n2 == null || n2.close();
    }), p2(), watch(() => v2.value.path, () => p2());
  });
};
var M = defineClientConfig({ enhance: ({ app: e2 }) => {
  s$1(e2);
}, setup: () => {
  N();
} });
function mitt(n2) {
  return { all: n2 = n2 || /* @__PURE__ */ new Map(), on: function(t2, e2) {
    var i2 = n2.get(t2);
    i2 ? i2.push(e2) : n2.set(t2, [e2]);
  }, off: function(t2, e2) {
    var i2 = n2.get(t2);
    i2 && (e2 ? i2.splice(i2.indexOf(e2) >>> 0, 1) : n2.set(t2, []));
  }, emit: function(t2, e2) {
    var i2 = n2.get(t2);
    i2 && i2.slice().map(function(n3) {
      n3(e2);
    }), (i2 = n2.get("*")) && i2.slice().map(function(n3) {
      n3(t2, e2);
    });
  } };
}
const t$1 = Symbol(""), r = () => {
  const e2 = inject(t$1);
  if (!e2)
    throw new Error("usePWAEvent() is called without provider.");
  return e2;
};
const c$2 = async (a2, o2 = {}, l2 = true) => {
  const { register: n2 } = await __vitePreload(() => import("./index-27eac26f.js"), true ? [] : void 0);
  n2(a2, { ready(e2) {
    var r2;
    l2 && console.info("[Service Worker]: active"), (r2 = o2.ready) == null || r2.call(o2, e2);
  }, registered(e2) {
    var r2;
    l2 && console.log("[Service Worker]: registered"), (r2 = o2.registered) == null || r2.call(o2, e2);
  }, cached(e2) {
    var r2;
    l2 && console.log("[Service Worker]: cached"), (r2 = o2.cached) == null || r2.call(o2, e2);
  }, async updatefound(e2) {
    var r2;
    await navigator.serviceWorker.getRegistration() && (l2 && console.log("[Service Worker]: update found"), (r2 = o2.updatefound) == null || r2.call(o2, e2));
  }, updated(e2) {
    var r2;
    l2 && console.log("[Service Worker]: updated"), (r2 = o2.updated) == null || r2.call(o2, e2);
  }, offline() {
    var e2;
    l2 && console.log("[Service Worker]: offline"), (e2 = o2.offline) == null || e2.call(o2);
  }, error(e2) {
    var r2;
    l2 && console.error("[Service Worker]: ", e2), (r2 = o2.error) == null || r2.call(o2, e2);
  } });
};
const l = async (t2) => c$2(withBase("service-worker.js"), { ready(e2) {
  t2.emit("ready", e2);
}, registered(e2) {
  t2.emit("registered", e2);
}, cached(e2) {
  t2.emit("cached", e2);
}, updatefound(e2) {
  t2.emit("updatefound", e2);
}, updated(e2) {
  const r2 = "service-worker-version", o2 = Number(localStorage.getItem(r2) || 0);
  localStorage.setItem(r2, (o2 + 1).toString()), localStorage.removeItem("manifest"), t2.emit("updated", e2);
}, offline() {
  t2.emit("offline");
}, error(e2) {
  t2.emit("error", e2);
} }), f = () => {
  const t2 = mitt();
  provide(t$1, t2), onMounted(async () => {
    var e2;
    let r2 = false;
    (e2 = navigator.serviceWorker) != null && e2.controller && navigator.serviceWorker.addEventListener("controllerchange", () => {
      r2 || (r2 = true, window.location.reload());
    }), await l(t2);
  });
};
const c$1 = () => h$4(u$4, { name: "update" }, () => h$4("path", { d: "M949.949 146.25v255.826c0 21.981-13.989 35.97-35.97 35.97H658.154c-13.988 0-25.983-7.992-33.973-21.981-5.997-13.989-4-27.977 7.991-39.97l79.942-77.946c-55.954-51.973-121.918-77.955-199.863-77.955-37.975 0-75.95 8.002-113.924 21.99-37.975 15.985-67.948 37.976-91.934 63.957-25.982 23.987-47.973 53.96-63.957 91.934-29.983 73.955-29.983 153.895 0 227.85 15.984 37.976 37.975 67.947 63.957 91.934 23.986 25.982 53.959 47.973 91.934 63.956 37.974 13.989 75.95 21.991 113.924 21.991 45.967 0 87.942-9.998 127.913-29.982 41.976-17.99 75.951-45.967 101.931-83.943 7.993-4 11.994-5.995 13.989-5.995 5.997 0 9.998 1.994 13.988 5.995l77.958 77.946c3.989 4 5.986 7.993 5.986 11.994 0 1.994-1.996 5.995-3.99 11.994-43.973 51.962-93.941 91.934-151.9 117.914-53.958 25.983-115.92 39.972-185.874 39.972-61.961 0-119.921-11.984-169.89-33.973-57.96-25.985-105.923-57.963-139.896-93.943-35.98-33.972-67.958-81.936-93.94-139.897-45.967-101.93-45.967-237.846 0-339.777 25.982-57.96 57.96-105.923 93.94-139.896 33.973-35.98 81.936-67.958 139.896-93.94 49.968-21.99 107.928-33.974 169.89-33.974 55.963 0 109.923 9.988 161.885 29.973 53.97 21.99 101.933 51.963 139.908 89.938l73.954-73.944c9.987-9.998 23.987-13.988 39.971-8.002 13.988 8.002 21.98 19.995 21.98 33.984z" }));
c$1.displayName = "UpdateIcon";
const t = { "/": { "install": "安装", "iOSInstall": "点击分享按钮然后点击“添加到主屏幕”", "cancel": "取消", "close": "关闭", "prevImage": "上一张图片", "nextImage": "下一张图片", "desc": "详情", "feature": "主要特色", "explain": "该应用可以安装在你的 PC 或移动设备上。这将使该 Web 应用程序外观和行为与其他应用程序相同。它将在出现在应用程序列表中，并可以固定到主屏幕，开始菜单或任务栏。此 Web 应用程序还将能够与其他应用程序和你的操作系统安全地进行交互。", "hint": "发现新内容可用", "update": "新内容已就绪" } };
const popup = "";
const n$1 = (t2) => {
  const s2 = t2.waiting;
  if (!s2)
    return;
  const e2 = new MessageChannel();
  s2.postMessage({ type: "SKIP_WAITING" }, [e2.port2]);
};
var U = defineComponent({ name: "SWUpdatePopup", slots: Object, setup(W2, { slots: t$12 }) {
  const u2 = Ze(t), e2 = shallowRef(), p2 = computed(() => !!e2.value), l2 = () => {
    e2.value && (n$1(e2.value), e2.value = void 0);
  };
  return onMounted(() => {
    r().on("updated", (a2) => {
      a2 && (e2.value = a2);
    });
  }), () => h$4(Transition, { name: "popup" }, () => {
    var a2;
    return ((a2 = t$12.default) == null ? void 0 : a2.call(t$12, { enabled: p2.value, reload: l2 })) || (p2.value ? h$4("button", { type: "button", class: "sw-update-popup", tabindex: 0, onClick: () => l2() }, [u2.value.update, h$4("span", { class: "icon-wrapper" }, h$4(c$1))]) : null);
  });
} });
const clientConfig11 = defineClientConfig({
  setup: () => {
    f();
  },
  rootComponents: [
    U
  ]
});
const HopeIcon = (props) => {
  const { icon = "", color, size: size2 } = props;
  const style = {};
  if (color)
    style["color"] = color;
  if (size2)
    style["height"] = Number.isNaN(Number(size2)) ? size2 : `${size2}px`;
  return isLinkHttp(icon) ? h$4("img", { class: "icon", src: icon, "no-view": "", style }) : Oe(icon) ? h$4("img", { class: "icon", src: withBase(icon), "no-view": "", style }) : h$4(resolveComponent("FontIcon"), props);
};
HopeIcon.displayName = "HopeIcon";
const getAncestorLinks = (path, routeLocale) => {
  const routePaths = path.replace(routeLocale, "/").split("/");
  const result = [];
  let link = removeEndingSlash(routeLocale);
  routePaths.forEach((name, index2) => {
    if (index2 !== routePaths.length - 1) {
      link += `${name}/`;
      result.push({ link, name: name || "Home" });
    } else if (name !== "") {
      link += name;
      result.push({ link, name });
    }
  });
  return result;
};
var ArticleInfoType;
(function(ArticleInfoType2) {
  ArticleInfoType2["type"] = "y";
  ArticleInfoType2["title"] = "t";
  ArticleInfoType2["shortTitle"] = "s";
  ArticleInfoType2["icon"] = "i";
  ArticleInfoType2["author"] = "a";
  ArticleInfoType2["date"] = "d";
  ArticleInfoType2["localizedDate"] = "l";
  ArticleInfoType2["category"] = "c";
  ArticleInfoType2["tag"] = "g";
  ArticleInfoType2["isEncrypted"] = "n";
  ArticleInfoType2["isOriginal"] = "o";
  ArticleInfoType2["readingTime"] = "r";
  ArticleInfoType2["excerpt"] = "e";
  ArticleInfoType2["sticky"] = "u";
  ArticleInfoType2["cover"] = "v";
  ArticleInfoType2["index"] = "I";
  ArticleInfoType2["order"] = "O";
})(ArticleInfoType || (ArticleInfoType = {}));
var PageType;
(function(PageType2) {
  PageType2["article"] = "a";
  PageType2["home"] = "h";
  PageType2["slide"] = "s";
  PageType2["page"] = "p";
})(PageType || (PageType = {}));
const resolveLinkInfo = (router, item, preferFull = false) => {
  const encodedPath = encodeURI(item);
  let result = w$1(router, A$4(encodedPath));
  if (result.name === "404")
    result = w$1(router, encodedPath);
  const { fullPath, meta, name } = result;
  return {
    text: !preferFull && meta[ArticleInfoType.shortTitle] ? meta[ArticleInfoType.shortTitle] : meta[ArticleInfoType.title] || item,
    link: name === "404" ? item : fullPath,
    ...meta[ArticleInfoType.icon] ? { icon: meta[ArticleInfoType.icon] } : {}
  };
};
const useNavigate = () => {
  const router = useRouter();
  const route = useRoute();
  return (url) => {
    if (url)
      if (Oe(url)) {
        if (route.path !== url)
          void router.push(url);
      } else if (isLinkHttp(url) || isLinkMailto(url)) {
        if (window)
          window.open(url);
      } else {
        const base = route.path.slice(0, route.path.lastIndexOf("/"));
        void router.push(`${base}/${encodeURI(url)}`);
      }
  };
};
const i = () => {
  const e2 = usePageData();
  return computed(() => e2.value.readingTime ?? null);
}, n = typeof { "/": { "word": "约 $word 字", "less1Minute": "小于 1 分钟", "time": "大约 $time 分钟" } } > "u" ? null : { "/": { "word": "约 $word 字", "less1Minute": "小于 1 分钟", "time": "大约 $time 分钟" } }, a = (e2, o2) => {
  const { minutes: r2, words: l2 } = e2, { less1Minute: m2, word: c2, time: d2 } = o2;
  return { time: r2 < 1 ? m2 : d2.replace("$time", Math.round(r2).toString()), words: c2.replace("$word", l2.toString()) };
}, u = { words: "", time: "" }, s = () => n ? Ze(n) : computed(() => null), L = () => {
  if (typeof n > "u")
    return computed(() => u);
  const e2 = i(), o2 = s();
  return computed(() => e2.value && o2.value ? a(e2.value, o2.value) : u);
};
const useThemeData = () => useThemeData$1();
const useThemeLocaleData = () => useThemeLocaleData$1();
const usePure = () => computed(() => Boolean(useThemeData().value.pure));
const usePageAuthor = () => {
  const themeLocale = useThemeLocaleData();
  const frontmatter = usePageFrontmatter();
  return computed(() => {
    const { author } = frontmatter.value;
    if (author)
      return Te(author);
    if (author === false)
      return [];
    return Te(themeLocale.value.author, false);
  });
};
const usePageCategory = () => {
  const frontmatter = usePageFrontmatter();
  return computed(() => je(frontmatter.value.category).map((name) => {
    var _a2, _b2;
    return {
      name,
      // this is a hack
      path: ((_b2 = (_a2 = inject(Symbol.for("categoryMap"))) == null ? void 0 : _a2.value.map[name]) == null ? void 0 : _b2.path) || ""
    };
  }));
};
const usePageTag = () => {
  const frontmatter = usePageFrontmatter();
  return computed(() => Be(frontmatter.value.tag).map((name) => {
    var _a2, _b2;
    return {
      name,
      // this is a hack
      path: ((_b2 = (_a2 = inject(Symbol.for("tagMap"))) == null ? void 0 : _a2.value.map[name]) == null ? void 0 : _b2.path) || ""
    };
  }));
};
const usePageDate = () => {
  const frontmatter = usePageFrontmatter();
  const page2 = usePageData();
  return computed(() => {
    const date = pe(frontmatter.value.date);
    if (date)
      return date;
    const { createdTime } = page2.value.git || {};
    if (createdTime)
      return new Date(createdTime);
    return null;
  });
};
const usePageInfo = () => {
  const themeLocale = useThemeLocaleData();
  const page2 = usePageData();
  const frontmatter = usePageFrontmatter();
  const author = usePageAuthor();
  const category = usePageCategory();
  const tag = usePageTag();
  const date = usePageDate();
  const readingTimeData = i();
  const readingTimeLocale = L();
  const info = computed(() => ({
    author: author.value,
    category: category.value,
    date: date.value,
    localizedDate: page2.value.localizedDate,
    tag: tag.value,
    isOriginal: frontmatter.value.isOriginal || false,
    readingTime: readingTimeData.value,
    readingTimeLocale: readingTimeLocale.value,
    pageview: "pageview" in frontmatter.value ? frontmatter.value.pageview : true
  }));
  const items = computed(() => "pageInfo" in frontmatter.value ? frontmatter.value.pageInfo : "pageInfo" in themeLocale.value ? themeLocale.value.pageInfo : null);
  return { info, items };
};
let promise = null;
let promiseResolve = null;
const scrollPromise = {
  wait: () => promise,
  pending: () => {
    promise = new Promise((resolve2) => promiseResolve = resolve2);
  },
  resolve: () => {
    promiseResolve == null ? void 0 : promiseResolve();
    promise = null;
    promiseResolve = null;
  }
};
const useScrollPromise = () => scrollPromise;
const mobileBreakPoint$1 = "719px";
const pcBreakPoint$1 = "1440px";
const enableThemeColor$1 = "true";
const cssVariables = {
  mobileBreakPoint: mobileBreakPoint$1,
  pcBreakPoint: pcBreakPoint$1,
  enableThemeColor: enableThemeColor$1,
  "theme-1": "#2196f3",
  "theme-2": "#f26d6d",
  "theme-3": "#3eaf7c",
  "theme-4": "#fb9b5f"
};
const { mobileBreakPoint, pcBreakPoint } = cssVariables;
const getPixels = (length) => length.endsWith("px") ? Number(length.slice(0, -2)) : null;
const useWindowSize = () => {
  const isMobile = ref(false);
  const isPC = ref(false);
  const windowSizeHandler = () => {
    isMobile.value = window.innerWidth <= (getPixels(mobileBreakPoint) ?? 719);
    isPC.value = window.innerWidth >= (getPixels(pcBreakPoint) ?? 1440);
  };
  onMounted(() => {
    windowSizeHandler();
    useEventListener("resize", windowSizeHandler, false);
    useEventListener("orientationchange", windowSizeHandler, false);
  });
  return {
    isMobile,
    isPC
  };
};
const darkModeSymbol = Symbol("");
const useDarkmode = () => {
  const darkmode = inject(darkModeSymbol);
  if (!darkmode)
    throw new Error("useDarkmode() is called without provider.");
  return darkmode;
};
const injectDarkmode = (app) => {
  const themeData2 = useThemeData();
  const isDarkPreferred = usePreferredDark();
  const status = useStorage("vuepress-theme-hope-scheme", "auto");
  const config = computed(() => themeData2.value.darkmode || "switch");
  const isDarkmode = computed(() => {
    const darkmode = config.value;
    return darkmode === "disable" ? false : (
      // force darkmode
      darkmode === "enable" ? true : (
        // auto
        darkmode === "auto" ? isDarkPreferred.value : (
          // toggle
          darkmode === "toggle" ? status.value === "dark" : (
            // switch
            status.value === "dark" || status.value === "auto" && isDarkPreferred.value
          )
        )
      )
    );
  });
  const canToggle = computed(() => {
    const darkmode = config.value;
    return darkmode === "switch" || darkmode === "toggle";
  });
  app.provide(darkModeSymbol, {
    canToggle,
    config,
    isDarkmode,
    status
  });
  Object.defineProperties(app.config.globalProperties, {
    $isDarkmode: { get: () => isDarkmode.value }
  });
};
const setupDarkmode = () => {
  const { isDarkmode } = useDarkmode();
  const updateDOM = (isDark = isDarkmode.value) => document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  onMounted(() => {
    watch(isDarkmode, updateDOM, { immediate: true });
  });
};
const AutoLink = defineComponent({
  name: "AutoLink",
  inheritAttrs: false,
  props: {
    /**
     * @description Autolink config
     */
    config: {
      type: Object,
      required: true
    },
    /**
     * @description Whether it's active only when exact match
     */
    exact: Boolean,
    /**
     * @description Whether to hide externalLinkIcon
     */
    noExternalLinkIcon: Boolean
  },
  emits: ["focusout"],
  slots: Object,
  setup(props, { attrs, emit: emit2, slots }) {
    const route = useRoute();
    const siteData2 = useSiteData();
    const config = toRef$1(props, "config");
    const hasHttpProtocol = computed(() => isLinkHttp(config.value.link));
    const hasNonHttpProtocol = computed(() => isLinkMailto(config.value.link) || isLinkTel(config.value.link));
    const linkTarget = computed(() => hasNonHttpProtocol.value ? void 0 : config.value.target || (hasHttpProtocol.value ? "_blank" : void 0));
    const isBlankTarget = computed(() => linkTarget.value === "_blank");
    const renderVPLink = computed(() => !hasHttpProtocol.value && !hasNonHttpProtocol.value && !isBlankTarget.value);
    const anchorRel = computed(() => hasNonHttpProtocol.value ? void 0 : config.value.rel || (isBlankTarget.value ? "noopener noreferrer" : void 0));
    const linkAriaLabel = computed(() => config.value.ariaLabel || config.value.text);
    const shouldBeActiveInSubpath = computed(() => {
      if (props.exact)
        return false;
      const localeKeys = f$4(siteData2.value.locales);
      return localeKeys.length ? (
        // check all the locales
        localeKeys.every((key) => key !== config.value.link)
      ) : (
        // check root
        config.value.link !== "/"
      );
    });
    const isActive = computed(() => renderVPLink.value ? config.value.activeMatch ? new RegExp(config.value.activeMatch).test(route.path) : (
      // if this link is active in subpath
      !shouldBeActiveInSubpath.value ? route.path === config.value.link : z$3(route.path, config.value.link)
    ) : false);
    return () => {
      const { before, after, default: defaultSlot } = slots;
      const { text, icon, link } = config.value;
      return renderVPLink.value ? h$4(j$1, {
        to: link,
        "aria-label": linkAriaLabel.value,
        ...attrs,
        // class needs to be merged manually
        class: ["nav-link", { active: isActive.value }, attrs["class"]],
        onFocusout: () => emit2("focusout")
      }, () => defaultSlot ? defaultSlot() : [before ? before() : h$4(HopeIcon, { icon }), text, after == null ? void 0 : after()]) : h$4("a", {
        href: link,
        rel: anchorRel.value,
        target: linkTarget.value,
        "aria-label": linkAriaLabel.value,
        ...attrs,
        // class needs to be merged manually
        class: ["nav-link", attrs["class"]],
        onFocusout: () => emit2("focusout")
      }, defaultSlot ? defaultSlot() : [
        before ? before() : h$4(HopeIcon, { icon }),
        text,
        props.noExternalLinkIcon ? null : h$4(ExternalLinkIcon),
        after == null ? void 0 : after()
      ]);
    };
  }
});
const isActiveSidebarItem = (route, item, exact = false) => {
  if ("activeMatch" in item)
    return new RegExp(item.activeMatch).test(route.path);
  if (Ge(route, item.link))
    return true;
  if (item.children && !exact)
    return item.children.some((child) => isActiveSidebarItem(route, child));
  return false;
};
const isMatchedSidebarItem = (route, item) => {
  if (item.type === "group")
    return item.children.some((child) => {
      if (child.type === "group")
        return isMatchedSidebarItem(route, child);
      return child.type === "page" && isActiveSidebarItem(route, child, true);
    }) || "prefix" in item && Ge(route, item.prefix);
  return false;
};
const renderItem = (config, props) => isString(config.link) ? (
  // if the item has link, render it as `<AutoLink>`
  h$4(AutoLink, {
    ...props,
    config
  })
) : (
  // if the item only has text, render it as `<p>`
  h$4("p", props, [h$4(HopeIcon, { icon: config.icon }), config.text])
);
const renderChildren$1 = (children) => {
  const route = useRoute();
  if (!children)
    return null;
  return h$4("ul", { class: "vp-sidebar-sub-headers" }, children.map((child) => {
    const active = isActiveSidebarItem(route, child, true);
    return h$4("li", { class: "vp-sidebar-sub-header" }, [
      renderItem(child, {
        class: ["vp-sidebar-link", "vp-heading", { active }]
      }),
      renderChildren$1(child.children)
    ]);
  }));
};
const sidebarData = { "/posts/": [{ "text": "G R P C", "prefix": "gRPC/", "collapsible": true, "children": ["gRPC服务"] }, { "text": "Linux", "prefix": "Linux/", "collapsible": true, "children": ["Linux配置环境变量"] }, { "text": "Mysql", "prefix": "mysql/", "collapsible": true, "children": ["mysql备忘录"] }, { "text": "Python", "prefix": "python/", "collapsible": true, "children": ["Linux环境下DBUtils导入的问题", "Python2转Python3", "polygon面积计算", "Python添加环境变量"] }, { "text": "Tools", "prefix": "tools/", "collapsible": true, "children": ["PicgoGitHub搭建图床", "sublime说明书"] }, { "text": "Vue", "prefix": "Vue/", "collapsible": true, "children": ["Vue基础", "vue客户端"] }], "/anything/": [{ "text": "Book Notes", "prefix": "book_notes/", "collapsible": true, "children": [{ "text": "人之觉醒", "prefix": "人之觉醒/", "collapsible": true, "children": ["一切问题的起源"] }] }, { "text": "小记", "prefix": "小记/", "collapsible": true, "children": ["下雪啦", "好用网站收藏"] }], "/design_pattern/": [{ "text": "设计模式", "prefix": "设计模式/", "collapsible": true, "children": ["单例模式", "工厂模式", "门面模式"] }] };
const resolvePrefix = (prefix = "", path = "") => Oe(path) ? path : `${ensureEndingSlash(prefix)}${path}`;
const headerToSidebarItem = (header, headerDepth) => {
  const page2 = usePageData();
  return {
    type: "heading",
    text: header.title,
    link: `${page2.value.path}#${header.slug}`,
    children: headersToSidebarItemChildren(header.children, headerDepth)
  };
};
const headersToSidebarItemChildren = (headers, headerDepth) => headerDepth > 0 ? headers.map((header) => headerToSidebarItem(header, headerDepth - 1)) : [];
const resolveHeadingSidebarItems = (headerDepth) => {
  const page2 = usePageData();
  return headersToSidebarItemChildren(page2.value.headers, headerDepth);
};
const resolveArraySidebarItems = (sidebarConfig, headerDepth, prefix = "") => {
  const router = useRouter();
  const page2 = usePageData();
  const handleChildItem = (item, pathPrefix = prefix) => {
    var _a2;
    const childItem = isString(item) ? resolveLinkInfo(router, resolvePrefix(pathPrefix, item)) : item.link ? {
      ...item,
      ...!isLinkExternal(item.link) ? {
        link: resolveLinkInfo(router, resolvePrefix(pathPrefix, item.link)).link
      } : {}
    } : item;
    if ("children" in childItem) {
      const prefix2 = resolvePrefix(pathPrefix, childItem.prefix);
      const children = childItem.children === "structure" ? sidebarData[prefix2] : childItem.children;
      return {
        type: "group",
        ...childItem,
        prefix: prefix2,
        children: children.map((item2) => handleChildItem(item2, prefix2))
      };
    }
    return {
      type: "page",
      ...childItem,
      children: (
        // if the sidebar item is current page and children is not set
        // use headers of current page as children
        childItem.link === page2.value.path ? headersToSidebarItemChildren(
          // skip h1 header
          ((_a2 = page2.value.headers[0]) == null ? void 0 : _a2.level) === 1 ? page2.value.headers[0].children : page2.value.headers,
          headerDepth
        ) : []
      )
    };
  };
  return sidebarConfig.map((item) => handleChildItem(item));
};
const resolveMultiSidebarItems = (sidebarConfig, headerDepth) => {
  const page2 = usePageData();
  const sidebarRoutes = f$4(sidebarConfig).sort((x2, y2) => y2.length - x2.length);
  for (const base of sidebarRoutes)
    if (z$3(decodeURI(page2.value.path), base)) {
      const matchedConfig = sidebarConfig[base];
      return matchedConfig ? resolveArraySidebarItems(matchedConfig === "structure" ? sidebarData[base] : matchedConfig === "heading" ? resolveHeadingSidebarItems(headerDepth) : matchedConfig, headerDepth, base) : [];
    }
  console.warn(`${page2.value.path} is missing sidebar config.`);
  return [];
};
const resolveSidebarItems = (sidebarConfig, headerDepth) => {
  const routeLocale = useRouteLocale();
  return sidebarConfig === false ? [] : sidebarConfig === "heading" ? resolveHeadingSidebarItems(headerDepth) : sidebarConfig === "structure" ? resolveArraySidebarItems(sidebarData[routeLocale.value], headerDepth, routeLocale.value) : isArray$1(sidebarConfig) ? resolveArraySidebarItems(sidebarConfig, headerDepth) : isPlainObject(sidebarConfig) ? resolveMultiSidebarItems(sidebarConfig, headerDepth) : [];
};
const sidebarItemsSymbol = Symbol("");
const setupSidebarItems = () => {
  const frontmatter = usePageFrontmatter();
  const themeLocale = useThemeLocaleData();
  const sidebarConfig = computed(() => frontmatter.value.home ? false : frontmatter.value.sidebar ?? themeLocale.value.sidebar ?? "structure");
  const headerDepth = computed(() => frontmatter.value.headerDepth ?? themeLocale.value.headerDepth ?? 2);
  const sidebarItems = computed(() => resolveSidebarItems(sidebarConfig.value, headerDepth.value));
  provide(sidebarItemsSymbol, sidebarItems);
};
const useSidebarItems = () => {
  const sidebarItems = inject(sidebarItemsSymbol);
  if (!sidebarItems)
    throw new Error("useSidebarItems() is called without provider.");
  return sidebarItems;
};
const footer = "";
const PageFooter = defineComponent({
  name: "PageFooter",
  setup() {
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const author = usePageAuthor();
    const enable = computed(() => {
      const { copyright: copyright2, footer: footer2 } = frontmatter.value;
      return footer2 !== false && Boolean(copyright2 || footer2 || themeLocale.value.displayFooter);
    });
    const content = computed(() => {
      const { footer: footer2 } = frontmatter.value;
      return footer2 === false ? false : isString(footer2) ? footer2 : themeLocale.value.footer || "";
    });
    const copyright = computed(() => "copyright" in frontmatter.value ? frontmatter.value.copyright : "copyright" in themeLocale.value ? themeLocale.value.copyright : author.value.length ? `Copyright © ${(/* @__PURE__ */ new Date()).getFullYear()} ${author.value[0].name}` : false);
    return () => enable.value ? h$4("footer", { class: "vp-footer-wrapper" }, [
      content.value ? h$4("div", { class: "vp-footer", innerHTML: content.value }) : null,
      copyright.value ? h$4("div", {
        class: "vp-copyright",
        innerHTML: copyright.value
      }) : null
    ]) : null;
  }
});
var e = defineComponent({ name: "EmptyComponent", setup: () => () => null });
const dropdownLink = "";
const DropdownLink = defineComponent({
  name: "NavbarDropdownLink",
  props: {
    /**
     * Dropdown config
     *
     * 下拉列表配置
     */
    config: {
      type: Object,
      required: true
    }
  },
  slots: Object,
  setup(props, { slots }) {
    const page2 = usePageData();
    const config = toRef$1(props, "config");
    const dropdownAriaLabel = computed(() => config.value.ariaLabel || config.value.text);
    const open = ref(false);
    watch(() => page2.value.path, () => {
      open.value = false;
    });
    const handleDropdown = (event) => {
      const isTriggerByTab = event.detail === 0;
      if (isTriggerByTab)
        open.value = !open.value;
    };
    return () => {
      var _a2;
      return h$4("div", { class: ["dropdown-wrapper", { open: open.value }] }, [
        h$4("button", {
          type: "button",
          class: "dropdown-title",
          "aria-label": dropdownAriaLabel.value,
          onClick: handleDropdown
        }, [
          ((_a2 = slots.title) == null ? void 0 : _a2.call(slots)) || h$4("span", { class: "title" }, [
            h$4(HopeIcon, { icon: config.value.icon }),
            props.config.text
          ]),
          h$4("span", { class: "arrow" }),
          h$4("ul", { class: "nav-dropdown" }, config.value.children.map((child, index2) => {
            const isLastChild = index2 === config.value.children.length - 1;
            return h$4("li", { class: "dropdown-item" }, "children" in child ? [
              h$4("h4", { class: "dropdown-subtitle" }, child.link ? h$4(AutoLink, {
                config: child,
                onFocusout: () => {
                  if (
                    // no children
                    child.children.length === 0 && isLastChild
                  )
                    open.value = false;
                }
              }) : h$4("span", child.text)),
              h$4("ul", { class: "dropdown-subitem-wrapper" }, child.children.map((grandchild, grandIndex) => h$4("li", { class: "dropdown-subitem" }, h$4(AutoLink, {
                config: grandchild,
                onFocusout: () => {
                  if (
                    // last item of grandchild
                    grandIndex === child.children.length - 1 && isLastChild
                  )
                    open.value = false;
                }
              }))))
            ] : h$4(AutoLink, {
              config: child,
              onFocusout: () => {
                if (isLastChild)
                  open.value = false;
              }
            }));
          }))
        ])
      ]);
    };
  }
});
const resolveNavbarItem = (router, item, prefix = "") => {
  if (isString(item))
    return resolveLinkInfo(router, `${prefix}${item}`);
  if ("children" in item)
    return {
      ...item,
      ...item.link && !isLinkExternal(item.link) ? resolveLinkInfo(router, `${prefix}${item.link}`) : {},
      children: item.children.map((child) => resolveNavbarItem(router, child, `${prefix}${item.prefix || ""}`))
    };
  return {
    ...item,
    link: isLinkExternal(item.link) ? item.link : resolveLinkInfo(router, `${prefix}${item.link}`).link
  };
};
const useNavbarItems = () => {
  const themeLocaleData = useThemeLocaleData();
  const router = useRouter();
  const getNavbarItems = () => (themeLocaleData.value.navbar || []).map((item) => resolveNavbarItem(router, item));
  const navbarItems = ref(getNavbarItems());
  watch(themeLocaleData, () => {
    navbarItems.value = getNavbarItems();
  });
  return navbarItems;
};
const useNavbarRepo = () => {
  const themeLocale = useThemeLocaleData();
  const repo = computed(() => themeLocale.value.repo || null);
  const repoLink2 = computed(() => repo.value ? Ke(repo.value) : null);
  const repoType = computed(() => repo.value ? qe(repo.value) : null);
  const repoLabel = computed(() => repoLink2.value ? themeLocale.value.repoLabel ?? (repoType.value === null ? "Source" : repoType.value) : null);
  return computed(() => {
    if (!repoLink2.value || !repoLabel.value || themeLocale.value.repoDisplay === false)
      return null;
    return {
      type: repoType.value || "Source",
      label: repoLabel.value,
      link: repoLink2.value
    };
  });
};
const navScreenDropdown = "";
const NavScreenDropdown = defineComponent({
  name: "NavScreenDropdown",
  props: {
    /**
     * Navbar Screen Dropdown list config
     *
     * 导航栏下拉列表配置
     */
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const page2 = usePageData();
    const config = toRef$1(props, "config");
    const dropdownAriaLabel = computed(() => config.value.ariaLabel || config.value.text);
    const open = ref(false);
    watch(() => page2.value.path, () => {
      open.value = false;
    });
    const isLastItemOfArray = (item, arr) => arr[arr.length - 1] === item;
    return () => [
      h$4("button", {
        type: "button",
        class: ["nav-screen-dropdown-title", { active: open.value }],
        "aria-label": dropdownAriaLabel.value,
        onClick: () => {
          open.value = !open.value;
        }
      }, [
        h$4("span", { class: "title" }, [
          h$4(HopeIcon, { icon: config.value.icon }),
          props.config.text
        ]),
        h$4("span", { class: ["arrow", open.value ? "down" : "end"] })
      ]),
      h$4("ul", {
        class: ["nav-screen-dropdown", { hide: !open.value }]
      }, config.value.children.map((child) => h$4("li", { class: "dropdown-item" }, "children" in child ? [
        h$4("h4", { class: "dropdown-subtitle" }, child.link ? h$4(AutoLink, {
          config: child,
          onFocusout: () => {
            if (isLastItemOfArray(child, config.value.children) && child.children.length === 0)
              open.value = false;
          }
        }) : h$4("span", child.text)),
        h$4("ul", { class: "dropdown-subitem-wrapper" }, child.children.map((grandchild) => h$4("li", { class: "dropdown-subitem" }, h$4(AutoLink, {
          config: grandchild,
          onFocusout: () => {
            if (isLastItemOfArray(grandchild, child.children) && isLastItemOfArray(child, config.value.children))
              open.value = false;
          }
        }))))
      ] : h$4(AutoLink, {
        config: child,
        onFocusout: () => {
          if (isLastItemOfArray(child, config.value.children))
            open.value = false;
        }
      }))))
    ];
  }
});
const navScreenLinks = "";
const NavScreenLinks = defineComponent({
  name: "NavScreenLinks",
  setup() {
    const navbarConfig = useNavbarItems();
    return () => navbarConfig.value.length ? h$4("nav", { class: "nav-screen-links" }, navbarConfig.value.map((config) => h$4("div", { class: "navbar-links-item" }, "children" in config ? h$4(NavScreenDropdown, { config }) : h$4(AutoLink, { config })))) : null;
  }
});
const DarkIcon = () => h$4(u$4, { name: "dark" }, () => h$4("path", {
  d: "M524.8 938.667h-4.267a439.893 439.893 0 0 1-313.173-134.4 446.293 446.293 0 0 1-11.093-597.334A432.213 432.213 0 0 1 366.933 90.027a42.667 42.667 0 0 1 45.227 9.386 42.667 42.667 0 0 1 10.24 42.667 358.4 358.4 0 0 0 82.773 375.893 361.387 361.387 0 0 0 376.747 82.774 42.667 42.667 0 0 1 54.187 55.04 433.493 433.493 0 0 1-99.84 154.88 438.613 438.613 0 0 1-311.467 128z"
}));
DarkIcon.displayName = "DarkIcon";
const LightIcon = () => h$4(u$4, { name: "light" }, () => h$4("path", {
  d: "M952 552h-80a40 40 0 0 1 0-80h80a40 40 0 0 1 0 80zM801.88 280.08a41 41 0 0 1-57.96-57.96l57.96-58a41.04 41.04 0 0 1 58 58l-58 57.96zM512 752a240 240 0 1 1 0-480 240 240 0 0 1 0 480zm0-560a40 40 0 0 1-40-40V72a40 40 0 0 1 80 0v80a40 40 0 0 1-40 40zm-289.88 88.08-58-57.96a41.04 41.04 0 0 1 58-58l57.96 58a41 41 0 0 1-57.96 57.96zM192 512a40 40 0 0 1-40 40H72a40 40 0 0 1 0-80h80a40 40 0 0 1 40 40zm30.12 231.92a41 41 0 0 1 57.96 57.96l-57.96 58a41.04 41.04 0 0 1-58-58l58-57.96zM512 832a40 40 0 0 1 40 40v80a40 40 0 0 1-80 0v-80a40 40 0 0 1 40-40zm289.88-88.08 58 57.96a41.04 41.04 0 0 1-58 58l-57.96-58a41 41 0 0 1 57.96-57.96z"
}));
LightIcon.displayName = "LightIcon";
const AutoIcon = () => h$4(u$4, { name: "auto" }, () => h$4("path", {
  d: "M512 992C246.92 992 32 777.08 32 512S246.92 32 512 32s480 214.92 480 480-214.92 480-480 480zm0-840c-198.78 0-360 161.22-360 360 0 198.84 161.22 360 360 360s360-161.16 360-360c0-198.78-161.22-360-360-360zm0 660V212c165.72 0 300 134.34 300 300 0 165.72-134.28 300-300 300z"
}));
AutoIcon.displayName = "AutoIcon";
const EnterFullScreenIcon = () => h$4(u$4, { name: "enter-fullscreen" }, () => h$4("path", {
  d: "M762.773 90.24h-497.28c-96.106 0-174.4 78.293-174.4 174.4v497.28c0 96.107 78.294 174.4 174.4 174.4h497.28c96.107 0 175.04-78.293 174.4-174.4V264.64c0-96.213-78.186-174.4-174.4-174.4zm-387.2 761.173H215.04c-21.867 0-40.427-17.92-41.067-41.066V649.92c0-22.507 17.92-40.427 40.427-40.427 11.307 0 21.227 4.694 28.48 11.947 7.253 7.253 11.947 17.92 11.947 28.48v62.293l145.28-145.28c15.893-15.893 41.813-15.893 57.706 0 15.894 15.894 15.894 41.814 0 57.707l-145.28 145.28h62.294c22.506 0 40.426 17.92 40.426 40.427s-17.173 41.066-39.68 41.066zM650.24 165.76h160.427c21.866 0 40.426 17.92 41.066 41.067v160.426c0 22.507-17.92 40.427-40.426 40.427-11.307 0-21.227-4.693-28.48-11.947-7.254-7.253-11.947-17.92-11.947-28.48v-62.186L625.6 450.347c-15.893 15.893-41.813 15.893-57.707 0-15.893-15.894-15.893-41.814 0-57.707l145.28-145.28H650.88c-22.507 0-40.427-17.92-40.427-40.427s17.174-41.173 39.787-41.173z"
}));
EnterFullScreenIcon.displayName = "EnterFullScreenIcon";
const CancelFullScreenIcon = () => h$4(u$4, { name: "cancel-fullscreen" }, () => h$4("path", {
  d: "M778.468 78.62H247.922c-102.514 0-186.027 83.513-186.027 186.027V795.08c0 102.514 83.513 186.027 186.027 186.027h530.432c102.514 0 186.71-83.513 186.026-186.027V264.647C964.494 162.02 880.981 78.62 778.468 78.62zM250.88 574.35h171.122c23.324 0 43.122 19.115 43.804 43.805v171.121c0 24.008-19.114 43.122-43.122 43.122-12.06 0-22.641-5.006-30.378-12.743s-12.743-19.115-12.743-30.379V722.83L224.597 877.91c-16.953 16.952-44.6 16.952-61.553 0-16.953-16.954-16.953-44.602 0-61.554L318.009 661.39h-66.446c-24.007 0-43.122-19.114-43.122-43.122 0-24.12 18.432-43.918 42.439-43.918zm521.899-98.873H601.657c-23.325 0-43.122-19.114-43.805-43.804V260.55c0-24.007 19.115-43.122 43.122-43.122 12.06 0 22.642 5.007 30.379 12.743s12.743 19.115 12.743 30.38v66.445l154.965-154.965c16.953-16.953 44.601-16.953 61.554 0 16.953 16.953 16.953 44.6 0 61.554L705.536 388.55h66.446c24.007 0 43.122 19.115 43.122 43.122.114 24.007-18.318 43.804-42.325 43.804z"
}));
CancelFullScreenIcon.displayName = "CancelFullScreenIcon";
const OutlookIcon = () => h$4(u$4, { name: "outlook" }, () => [
  h$4("path", {
    d: "M224 800c0 9.6 3.2 44.8 6.4 54.4 6.4 48-48 76.8-48 76.8s80 41.6 147.2 0 134.4-134.4 38.4-195.2c-22.4-12.8-41.6-19.2-57.6-19.2C259.2 716.8 227.2 761.6 224 800zM560 675.2l-32 51.2c-51.2 51.2-83.2 32-83.2 32 25.6 67.2 0 112-12.8 128 25.6 6.4 51.2 9.6 80 9.6 54.4 0 102.4-9.6 150.4-32l0 0c3.2 0 3.2-3.2 3.2-3.2 22.4-16 12.8-35.2 6.4-44.8-9.6-12.8-12.8-25.6-12.8-41.6 0-54.4 60.8-99.2 137.6-99.2 6.4 0 12.8 0 22.4 0 12.8 0 38.4 9.6 48-25.6 0-3.2 0-3.2 3.2-6.4 0-3.2 3.2-6.4 3.2-6.4 6.4-16 6.4-16 6.4-19.2 9.6-35.2 16-73.6 16-115.2 0-105.6-41.6-198.4-108.8-268.8C704 396.8 560 675.2 560 675.2zM224 419.2c0-28.8 22.4-51.2 51.2-51.2 28.8 0 51.2 22.4 51.2 51.2 0 28.8-22.4 51.2-51.2 51.2C246.4 470.4 224 448 224 419.2zM320 284.8c0-22.4 19.2-41.6 41.6-41.6 22.4 0 41.6 19.2 41.6 41.6 0 22.4-19.2 41.6-41.6 41.6C339.2 326.4 320 307.2 320 284.8zM457.6 208c0-12.8 12.8-25.6 25.6-25.6 12.8 0 25.6 12.8 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6C470.4 233.6 457.6 220.8 457.6 208zM128 505.6C128 592 153.6 672 201.6 736c28.8-60.8 112-60.8 124.8-60.8-16-51.2 16-99.2 16-99.2l316.8-422.4c-48-19.2-99.2-32-150.4-32C297.6 118.4 128 291.2 128 505.6zM764.8 86.4c-22.4 19.2-390.4 518.4-390.4 518.4-22.4 28.8-12.8 76.8 22.4 99.2l9.6 6.4c35.2 22.4 80 12.8 99.2-25.6 0 0 6.4-12.8 9.6-19.2 54.4-105.6 275.2-524.8 288-553.6 6.4-19.2-3.2-32-19.2-32C777.6 76.8 771.2 80 764.8 86.4z"
  })
]);
OutlookIcon.displayName = "OutlookIcon";
const appearanceSwitch = "";
const AppearanceSwitch = defineComponent({
  name: "AppearanceSwitch",
  setup() {
    const { config, status } = useDarkmode();
    const toggleDarkMode = () => {
      if (config.value === "switch")
        status.value = {
          light: "dark",
          dark: "auto",
          auto: "light"
        }[status.value];
      else
        status.value = status.value === "light" ? "dark" : "light";
    };
    return () => h$4("button", {
      type: "button",
      id: "appearance-switch",
      onClick: () => toggleDarkMode()
    }, [
      h$4(AutoIcon, {
        style: {
          display: status.value === "auto" ? "block" : "none"
        }
      }),
      h$4(DarkIcon, {
        style: {
          display: status.value === "dark" ? "block" : "none"
        }
      }),
      h$4(LightIcon, {
        style: {
          display: status.value === "light" ? "block" : "none"
        }
      })
    ]);
  }
});
const AppearanceMode = defineComponent({
  name: "AppearanceMode",
  setup() {
    const themeLocale = useThemeLocaleData();
    const { canToggle } = useDarkmode();
    const locale = computed(() => themeLocale.value.outlookLocales.darkmode);
    return () => canToggle.value ? h$4("div", { class: "appearance-wrapper" }, [
      h$4("label", { class: "appearance-title", for: "appearance-switch" }, locale.value),
      h$4(AppearanceSwitch)
    ]) : null;
  }
});
const themeColorPicker = "";
const THEME_COLOR_KEY = "VUEPRESS_THEME_COLOR";
const ThemeColorPicker = defineComponent({
  name: "ThemeColorPicker",
  props: {
    /**
     * Theme color picker config
     *
     * 主题色选择器配置
     */
    themeColor: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const setThemeColor = (theme = "") => {
      const classes = document.documentElement.classList;
      const themes = f$4(props.themeColor);
      if (!theme) {
        localStorage.removeItem(THEME_COLOR_KEY);
        classes.remove(...themes);
        return;
      }
      classes.remove(...themes.filter((themeColorClass) => themeColorClass !== theme));
      classes.add(theme);
      localStorage.setItem(THEME_COLOR_KEY, theme);
    };
    onMounted(() => {
      const theme = localStorage.getItem(THEME_COLOR_KEY);
      if (theme)
        setThemeColor(theme);
    });
    return () => h$4("ul", { id: "theme-color-picker" }, [
      h$4("li", h$4("span", {
        class: "theme-color",
        onClick: () => setThemeColor()
      })),
      M$4(props.themeColor).map(([color, value]) => h$4("li", h$4("span", {
        style: { background: value },
        onClick: () => setThemeColor(color)
      })))
    ]);
  }
});
const enableThemeColor = cssVariables["enableThemeColor"] === "true";
const themeColor = enableThemeColor ? _e(M$4(cssVariables).filter(([key]) => key.startsWith("theme-"))) : {};
const ThemeColor = defineComponent({
  name: "ThemeColor",
  setup() {
    const themeLocale = useThemeLocaleData();
    const locale = computed(() => themeLocale.value.outlookLocales.themeColor);
    return () => enableThemeColor ? h$4("div", { class: "theme-color-wrapper" }, [
      h$4("label", { class: "theme-color-title", for: "theme-color-picker" }, locale.value),
      h$4(ThemeColorPicker, { themeColor })
    ]) : null;
  }
});
const toggleFullScreenButton = "";
const ToggleFullScreenButton = defineComponent({
  name: "ToggleFullScreenButton",
  setup() {
    const themeLocale = useThemeLocaleData();
    const { isSupported: isSupported2, isFullscreen, toggle } = useFullscreen();
    const fullscreenLocale = computed(() => themeLocale.value.outlookLocales.fullscreen);
    return () => isSupported2 ? h$4("div", { class: "full-screen-wrapper" }, [
      h$4("label", { class: "full-screen-title", for: "full-screen-switch" }, fullscreenLocale.value),
      h$4("button", {
        type: "button",
        id: "full-screen-switch",
        class: "full-screen",
        ariaPressed: isFullscreen.value,
        onClick: () => toggle()
      }, isFullscreen.value ? h$4(CancelFullScreenIcon) : h$4(EnterFullScreenIcon))
    ]) : null;
  }
});
const OutlookSettings = defineComponent({
  name: "OutlookSettings",
  setup() {
    const themeData2 = useThemeData();
    const pure = usePure();
    const enableFullScreen = computed(() => !pure.value && themeData2.value.fullscreen);
    return () => h$4(ClientOnly, () => [
      enableThemeColor ? h$4(ThemeColor) : null,
      h$4(AppearanceMode),
      enableFullScreen.value ? h$4(ToggleFullScreenButton) : null
    ]);
  }
});
const navScreen = "";
const NavScreen = defineComponent({
  name: "NavScreen",
  props: {
    /**
     * Whether to show the screen
     *
     * 是否显示
     */
    show: Boolean
  },
  emits: ["close"],
  slots: Object,
  setup(props, { emit: emit2, slots }) {
    const page2 = usePageData();
    const { isMobile } = useWindowSize();
    const body = shallowRef();
    const isLocked = useScrollLock(body);
    onMounted(() => {
      body.value = document.body;
      watch(isMobile, (value) => {
        if (!value && props.show) {
          isLocked.value = false;
          emit2("close");
        }
      });
      watch(() => page2.value.path, () => {
        isLocked.value = false;
        emit2("close");
      });
    });
    onUnmounted(() => {
      isLocked.value = false;
    });
    return () => h$4(Transition, {
      name: "fade",
      onEnter: () => {
        isLocked.value = true;
      },
      onAfterLeave: () => {
        isLocked.value = false;
      }
    }, () => {
      var _a2, _b2;
      return props.show ? h$4("div", { id: "nav-screen" }, h$4("div", { class: "vp-nav-screen-container" }, [
        (_a2 = slots.before) == null ? void 0 : _a2.call(slots),
        h$4(NavScreenLinks),
        h$4("div", { class: "vp-outlook-wrapper" }, h$4(OutlookSettings)),
        (_b2 = slots.after) == null ? void 0 : _b2.call(slots)
      ])) : null;
    });
  }
});
const navbarBrand = "";
const NavbarBrand = defineComponent({
  name: "NavbarBrand",
  setup() {
    const routeLocale = useRouteLocale();
    const siteLocale = useSiteLocaleData();
    const themeLocale = useThemeLocaleData();
    const siteBrandLink = computed(() => themeLocale.value.home || routeLocale.value);
    const siteTitle = computed(() => siteLocale.value.title);
    const siteBrandTitle = computed(() => themeLocale.value.navTitle ?? siteTitle.value);
    const siteBrandLogo = computed(() => themeLocale.value.logo ? withBase(themeLocale.value.logo) : null);
    const siteBrandLogoDark = computed(() => themeLocale.value.logoDark ? withBase(themeLocale.value.logoDark) : null);
    return () => h$4(j$1, { to: siteBrandLink.value, class: "vp-brand" }, () => [
      siteBrandLogo.value ? h$4("img", {
        class: [
          "vp-nav-logo",
          { light: Boolean(siteBrandLogoDark.value) }
        ],
        src: siteBrandLogo.value,
        alt: siteTitle.value
      }) : null,
      siteBrandLogoDark.value ? h$4("img", {
        class: ["vp-nav-logo dark"],
        src: siteBrandLogoDark.value,
        alt: siteTitle.value
      }) : null,
      siteBrandTitle.value ? h$4("span", {
        class: [
          "vp-site-name",
          {
            "hide-in-pad": siteBrandLogo.value && themeLocale.value.hideSiteNameOnMobile !== false
          }
        ]
      }, siteBrandTitle.value) : null
    ]);
  }
});
const navbarLinks = "";
const NavbarLinks = defineComponent({
  name: "NavbarLinks",
  setup() {
    const navbarConfig = useNavbarItems();
    return () => navbarConfig.value.length ? h$4("nav", { class: "vp-nav-links" }, navbarConfig.value.map((config) => h$4("div", { class: "nav-item hide-in-mobile" }, "children" in config ? h$4(DropdownLink, { config }) : h$4(AutoLink, { config })))) : null;
  }
});
const repoLink = "";
const RepoLink = defineComponent({
  name: "RepoLink",
  components: { BitbucketIcon: D$1, GiteeIcon: O$2, GitHubIcon: B$1, GitLabIcon: H$2, SourceIcon: G$2 },
  setup() {
    const repo = useNavbarRepo();
    return () => repo.value ? h$4("div", { class: "nav-item vp-repo" }, h$4("a", {
      class: "vp-repo-link",
      href: repo.value.link,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": repo.value.label
    }, h$4(resolveComponent(`${repo.value.type}Icon`), {
      style: {
        width: "1.25rem",
        height: "1.25rem",
        verticalAlign: "middle"
      }
    }))) : null;
  }
});
const toggleNavbarButton = "";
const ToggleNavbarButton = ({ active = false }, { emit: emit2 }) => h$4("button", {
  type: "button",
  class: ["vp-toggle-navbar-button", { "is-active": active }],
  "aria-label": "Toggle Navbar",
  "aria-expanded": active,
  "aria-controls": "nav-screen",
  onClick: () => emit2("toggle")
}, h$4("span", [
  h$4("span", { class: "vp-top" }),
  h$4("span", { class: "vp-middle" }),
  h$4("span", { class: "vp-bottom" })
]));
ToggleNavbarButton.displayName = "ToggleNavbarButton";
const toggleSidebarButton = "";
const ToggleSidebarButton = (_2, { emit: emit2 }) => h$4("button", {
  type: "button",
  class: "vp-toggle-sidebar-button",
  title: "Toggle Sidebar",
  onClick: () => emit2("toggle")
}, h$4("span", { class: "icon" }));
ToggleSidebarButton.displayName = "ToggleSidebarButton";
ToggleSidebarButton.emits = ["toggle"];
const outlookButton = "";
const OutlookButton = defineComponent({
  name: "OutlookButton",
  setup() {
    const { isSupported: isSupported2 } = useFullscreen();
    const themeData2 = useThemeData();
    const pure = usePure();
    const page2 = usePageData();
    const { canToggle } = useDarkmode();
    const open = ref(false);
    const enableFullScreen = computed(() => !pure.value && themeData2.value.fullscreen && isSupported2);
    watch(() => page2.value.path, () => {
      open.value = false;
    });
    return () => canToggle.value || enableFullScreen.value || enableThemeColor ? h$4(
      "div",
      { class: "nav-item hide-in-mobile" },
      // only AppearanceSwitch is enabled
      canToggle.value && !enableFullScreen.value && !enableThemeColor ? h$4(AppearanceSwitch) : (
        // only FullScreen is enabled
        enableFullScreen.value && !canToggle.value && !enableThemeColor ? h$4(ToggleFullScreenButton) : h$4("button", {
          type: "button",
          class: ["outlook-button", { open: open.value }],
          tabindex: "-1",
          "aria-hidden": true
        }, [
          h$4(OutlookIcon),
          h$4("div", { class: "outlook-dropdown" }, h$4(OutlookSettings))
        ])
      )
    ) : null;
  }
});
const navbar = "";
const Navbar = defineComponent({
  name: "NavBar",
  emits: ["toggleSidebar"],
  slots: Object,
  setup(_props, { emit: emit2, slots }) {
    const themeLocale = useThemeLocaleData();
    const { isMobile } = useWindowSize();
    const showScreen = ref(false);
    const autoHide = computed(() => {
      const { navbarAutoHide = "mobile" } = themeLocale.value;
      return navbarAutoHide !== "none" && (navbarAutoHide === "always" || isMobile.value);
    });
    const navbarLayout = computed(() => themeLocale.value.navbarLayout || {
      start: ["Brand"],
      center: ["Links"],
      end: ["Language", "Repo", "Outlook", "Search"]
    });
    const navbarComponentMap = {
      Brand: NavbarBrand,
      Language: e,
      Links: NavbarLinks,
      Repo: RepoLink,
      Outlook: OutlookButton,
      Search: Qe("Docsearch") ? resolveComponent("Docsearch") : Qe("SearchBox") ? resolveComponent("SearchBox") : e
    };
    const getNavbarComponent = (component) => navbarComponentMap[component] ?? (Qe(component) ? resolveComponent(component) : e);
    return () => {
      var _a2, _b2, _c, _d, _e2, _f;
      return [
        h$4("header", {
          id: "navbar",
          class: [
            "vp-navbar",
            {
              "auto-hide": autoHide.value,
              "hide-icon": themeLocale.value.navbarIcon === false
            }
          ]
        }, [
          h$4("div", { class: "vp-navbar-start" }, [
            h$4(ToggleSidebarButton, {
              onToggle: () => {
                if (showScreen.value)
                  showScreen.value = false;
                emit2("toggleSidebar");
              }
            }),
            (_a2 = slots.startBefore) == null ? void 0 : _a2.call(slots),
            (navbarLayout.value.start || []).map((item) => h$4(getNavbarComponent(item))),
            (_b2 = slots.startAfter) == null ? void 0 : _b2.call(slots)
          ]),
          h$4("div", { class: "vp-navbar-center" }, [
            (_c = slots.centerBefore) == null ? void 0 : _c.call(slots),
            (navbarLayout.value.center || []).map((item) => h$4(getNavbarComponent(item))),
            (_d = slots.centerAfter) == null ? void 0 : _d.call(slots)
          ]),
          h$4("div", { class: "vp-navbar-end" }, [
            (_e2 = slots.endBefore) == null ? void 0 : _e2.call(slots),
            (navbarLayout.value.end || []).map((item) => h$4(getNavbarComponent(item))),
            (_f = slots.endAfter) == null ? void 0 : _f.call(slots),
            h$4(ToggleNavbarButton, {
              active: showScreen.value,
              onToggle: () => {
                showScreen.value = !showScreen.value;
              }
            })
          ])
        ]),
        h$4(NavScreen, {
          show: showScreen.value,
          onClose: () => {
            showScreen.value = false;
          }
        }, {
          before: () => {
            var _a3;
            return (_a3 = slots.screenTop) == null ? void 0 : _a3.call(slots);
          },
          after: () => {
            var _a3;
            return (_a3 = slots.screenBottom) == null ? void 0 : _a3.call(slots);
          }
        })
      ];
    };
  }
});
const sidebarChild = "";
const SidebarChild = defineComponent({
  name: "SidebarChild",
  props: {
    /**
     * Sidebar item config
     *
     * 侧边栏项目配置
     */
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();
    return () => [
      renderItem(props.config, {
        class: [
          "vp-sidebar-link",
          `vp-sidebar-${props.config.type}`,
          { active: isActiveSidebarItem(route, props.config, true) }
        ],
        exact: true
      }),
      renderChildren$1(props.config.children)
    ];
  }
});
const sidebarGroup = "";
const SidebarGroup = defineComponent({
  name: "SidebarGroup",
  props: {
    /**
     * Sidebar group item config
     *
     * 侧边栏分组配置
     */
    config: {
      type: Object,
      required: true
    },
    /**
     * Whether current group is open
     *
     * 当前分组是否展开
     */
    open: {
      type: Boolean,
      required: true
    }
  },
  emits: ["toggle"],
  setup(props, { emit: emit2 }) {
    const route = useRoute();
    const active = computed(() => isActiveSidebarItem(route, props.config));
    const exact = computed(() => isActiveSidebarItem(route, props.config, true));
    return () => {
      const { collapsible, children = [], icon, prefix, link, text } = props.config;
      return h$4("section", { class: "vp-sidebar-group" }, [
        h$4(collapsible ? "button" : "p", {
          class: [
            "vp-sidebar-heading",
            {
              clickable: collapsible || link,
              exact: exact.value,
              active: active.value
            }
          ],
          ...collapsible ? {
            type: "button",
            onClick: () => emit2("toggle"),
            onKeydown: (event) => {
              if (event.key === "Enter")
                emit2("toggle");
            }
          } : {}
        }, [
          // icon
          h$4(HopeIcon, { icon }),
          // title
          link ? h$4(AutoLink, {
            class: "vp-sidebar-title",
            config: { text, link },
            noExternalLinkIcon: true
          }) : h$4("span", { class: "vp-sidebar-title" }, text),
          // arrow
          collapsible ? h$4("span", { class: ["vp-arrow", props.open ? "down" : "end"] }) : null
        ]),
        props.open || !collapsible ? h$4(SidebarLinks, { key: prefix, config: children }) : null
      ]);
    };
  }
});
const sidebarLinks = "";
const SidebarLinks = defineComponent({
  name: "SidebarLinks",
  props: {
    /**
     * Sidebar links config
     *
     * 侧边栏链接配置
     */
    config: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const route = useRoute();
    const openGroupIndex = ref(-1);
    const toggleGroup = (index2) => {
      openGroupIndex.value = index2 === openGroupIndex.value ? -1 : index2;
    };
    watch(() => route.path, () => {
      const index2 = props.config.findIndex((item) => isMatchedSidebarItem(route, item));
      openGroupIndex.value = index2;
    }, { immediate: true, flush: "post" });
    return () => h$4("ul", { class: "vp-sidebar-links" }, props.config.map((config, index2) => h$4("li", config.type === "group" ? h$4(SidebarGroup, {
      config,
      open: index2 === openGroupIndex.value,
      onToggle: () => toggleGroup(index2)
    }) : h$4(SidebarChild, { config }))));
  }
});
const sidebar = "";
const Sidebar = defineComponent({
  name: "SideBar",
  slots: Object,
  setup(_props, { slots }) {
    const route = useRoute();
    const themeLocale = useThemeLocaleData();
    const sidebarItems = useSidebarItems();
    const sidebar2 = shallowRef();
    onMounted(() => {
      watch(() => route.hash, (hash) => {
        const activeSidebarItem = document.querySelector(`.vp-sidebar a.vp-sidebar-link[href="${route.path}${hash}"]`);
        if (!activeSidebarItem)
          return;
        const { top: sidebarTop, height: sidebarHeight } = sidebar2.value.getBoundingClientRect();
        const { top: activeSidebarItemTop, height: activeSidebarItemHeight } = activeSidebarItem.getBoundingClientRect();
        if (activeSidebarItemTop < sidebarTop)
          activeSidebarItem.scrollIntoView(true);
        else if (activeSidebarItemTop + activeSidebarItemHeight > sidebarTop + sidebarHeight)
          activeSidebarItem.scrollIntoView(false);
      });
    });
    return () => {
      var _a2, _b2, _c;
      return h$4("aside", {
        ref: sidebar2,
        id: "sidebar",
        class: [
          "vp-sidebar",
          { "hide-icon": themeLocale.value.sidebarIcon === false }
        ]
      }, [
        (_a2 = slots.top) == null ? void 0 : _a2.call(slots),
        ((_b2 = slots.default) == null ? void 0 : _b2.call(slots)) || h$4(SidebarLinks, { config: sidebarItems.value }),
        (_c = slots.bottom) == null ? void 0 : _c.call(slots)
      ]);
    };
  }
});
const common = "";
const CommonWrapper = defineComponent({
  name: "CommonWrapper",
  props: {
    /**
     * Extra class of container
     *
     * 容器额外类名
     */
    containerClass: { type: String, default: "" },
    /**
     * Whether disable navbar
     *
     * 是否禁用导航栏
     */
    noNavbar: Boolean,
    /**
     * Whether disable sidebar
     *
     * 是否禁用侧边栏
     */
    noSidebar: Boolean,
    /**
     * Whether disable toc
     */
    noToc: Boolean
  },
  slots: Object,
  setup(props, { slots }) {
    const router = useRouter();
    const page2 = usePageData();
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const { isMobile, isPC } = useWindowSize();
    const [isMobileSidebarOpen, toggleMobileSidebar] = useToggle(false);
    const [isDesktopSidebarCollapsed, toggleDesktopSidebar] = useToggle(false);
    const sidebarItems = useSidebarItems();
    const hideNavbar = ref(false);
    const enableNavbar = computed(() => {
      if (props.noNavbar)
        return false;
      if (frontmatter.value.navbar === false || themeLocale.value.navbar === false)
        return false;
      return Boolean(page2.value.title || themeLocale.value.logo || themeLocale.value.repo || themeLocale.value.navbar);
    });
    const enableSidebar = computed(() => {
      if (props.noSidebar)
        return false;
      return frontmatter.value.sidebar !== false && sidebarItems.value.length !== 0 && !frontmatter.value.home;
    });
    const enableToc = computed(() => props.noToc || frontmatter.value.home ? false : frontmatter.value.toc || themeLocale.value.toc !== false && frontmatter.value.toc !== false);
    const touchStart = { x: 0, y: 0 };
    const onTouchStart = (e2) => {
      touchStart.x = e2.changedTouches[0].clientX;
      touchStart.y = e2.changedTouches[0].clientY;
    };
    const onTouchEnd = (e2) => {
      const dx = e2.changedTouches[0].clientX - touchStart.x;
      const dy = e2.changedTouches[0].clientY - touchStart.y;
      if (
        // horizontal swipe
        Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > 40
      )
        if (dx > 0 && touchStart.x <= 80)
          toggleMobileSidebar(true);
        else
          toggleMobileSidebar(false);
    };
    const getScrollTop = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    let lastDistance = 0;
    useEventListener("scroll", useThrottleFn(() => {
      const distance = getScrollTop();
      if (distance <= 58 || distance < lastDistance)
        hideNavbar.value = false;
      else if (lastDistance + 200 < distance && !isMobileSidebarOpen.value)
        hideNavbar.value = true;
      lastDistance = distance;
    }, 300, true));
    watch(isMobile, (value) => {
      if (!value)
        toggleMobileSidebar(false);
    });
    onMounted(() => {
      const isLocked = useScrollLock(document.body);
      watch(isMobileSidebarOpen, (value) => {
        isLocked.value = value;
      });
      const unregisterRouterHook = router.afterEach(() => {
        toggleMobileSidebar(false);
      });
      onUnmounted(() => {
        isLocked.value = false;
        unregisterRouterHook();
      });
    });
    return () => h$4(Qe("GlobalEncrypt") ? resolveComponent("GlobalEncrypt") : oe, () => h$4("div", {
      class: [
        "theme-container",
        // classes
        {
          "no-navbar": !enableNavbar.value,
          "no-sidebar": !enableSidebar.value && !(slots.sidebar || slots.sidebarTop || slots.sidebarBottom),
          "has-toc": enableToc.value,
          "hide-navbar": hideNavbar.value,
          "sidebar-collapsed": !isMobile.value && !isPC.value && isDesktopSidebarCollapsed.value,
          "sidebar-open": isMobile.value && isMobileSidebarOpen.value
        },
        props.containerClass,
        frontmatter.value.containerClass || ""
      ],
      onTouchStart,
      onTouchEnd
    }, [
      // navbar
      enableNavbar.value ? h$4(Navbar, { onToggleSidebar: () => toggleMobileSidebar() }, {
        startBefore: () => {
          var _a2;
          return (_a2 = slots.navbarStartBefore) == null ? void 0 : _a2.call(slots);
        },
        startAfter: () => {
          var _a2;
          return (_a2 = slots.navbarStartAfter) == null ? void 0 : _a2.call(slots);
        },
        centerBefore: () => {
          var _a2;
          return (_a2 = slots.navbarCenterBefore) == null ? void 0 : _a2.call(slots);
        },
        centerAfter: () => {
          var _a2;
          return (_a2 = slots.navbarCenterAfter) == null ? void 0 : _a2.call(slots);
        },
        endBefore: () => {
          var _a2;
          return (_a2 = slots.navbarEndBefore) == null ? void 0 : _a2.call(slots);
        },
        endAfter: () => {
          var _a2;
          return (_a2 = slots.navbarEndAfter) == null ? void 0 : _a2.call(slots);
        },
        screenTop: () => {
          var _a2;
          return (_a2 = slots.navScreenTop) == null ? void 0 : _a2.call(slots);
        },
        screenBottom: () => {
          var _a2;
          return (_a2 = slots.navScreenBottom) == null ? void 0 : _a2.call(slots);
        }
      }) : null,
      // sidebar mask
      h$4(Transition, { name: "fade" }, () => isMobileSidebarOpen.value ? h$4("div", {
        class: "vp-sidebar-mask",
        onClick: () => toggleMobileSidebar(false)
      }) : null),
      // toggle sidebar button
      h$4(Transition, { name: "fade" }, () => isMobile.value ? null : h$4("div", {
        class: "toggle-sidebar-wrapper",
        onClick: () => toggleDesktopSidebar()
      }, h$4("span", {
        class: [
          "arrow",
          isDesktopSidebarCollapsed.value ? "end" : "start"
        ]
      }))),
      // sidebar
      h$4(Sidebar, {}, {
        ...slots.sidebar ? {
          default: () => slots.sidebar()
        } : {},
        top: () => {
          var _a2;
          return (_a2 = slots.sidebarTop) == null ? void 0 : _a2.call(slots);
        },
        bottom: () => {
          var _a2;
          return (_a2 = slots.sidebarBottom) == null ? void 0 : _a2.call(slots);
        }
      }),
      slots.default(),
      h$4(PageFooter)
    ]));
  }
});
const featurePanel = "";
const FeaturePanel = (props, { slots }) => {
  var _a2, _b2;
  const { bgImage, bgImageDark, bgImageStyle, color, description, image, imageDark, header, features = [] } = props;
  return h$4("div", {
    class: "vp-feature-wrapper"
  }, [
    bgImage ? h$4("div", {
      class: ["vp-feature-bg", { light: bgImageDark }],
      style: [{ "background-image": `url(${bgImage})` }, bgImageStyle]
    }) : null,
    bgImageDark ? h$4("div", {
      class: "vp-feature-bg dark",
      style: [
        { "background-image": `url(${bgImageDark})` },
        bgImageStyle
      ]
    }) : null,
    h$4("div", {
      class: "vp-feature",
      style: color ? { color } : {}
    }, [
      ((_a2 = slots.image) == null ? void 0 : _a2.call(slots, props)) || [
        image ? h$4("img", {
          class: ["vp-feature-image", { light: imageDark }],
          src: withBase(image),
          alt: header
        }) : null,
        imageDark ? h$4("img", {
          class: "vp-feature-image dark",
          src: withBase(imageDark),
          alt: header
        }) : null
      ],
      ((_b2 = slots.info) == null ? void 0 : _b2.call(slots, props)) || [
        header ? h$4("h2", { class: "vp-feature-header" }, header) : null,
        description ? h$4("p", {
          class: "vp-feature-description",
          innerHTML: description
        }) : null
      ],
      features.length ? h$4("div", { class: "vp-features" }, features.map(({ icon, title, details, link }) => {
        const children = [
          h$4("h3", { class: "vp-feature-title" }, [
            h$4(HopeIcon, { icon }),
            h$4("span", { innerHTML: title })
          ]),
          h$4("p", {
            class: "vp-feature-details",
            innerHTML: details
          })
        ];
        return link ? isLinkExternal(link) ? h$4("a", {
          class: "vp-feature-item link",
          href: link,
          role: "navigation",
          "aria-label": title,
          target: "_blank"
        }, children) : h$4(j$1, {
          class: "vp-feature-item link",
          to: link,
          role: "navigation",
          "aria-label": title
        }, () => children) : h$4("div", { class: "vp-feature-item" }, children);
      })) : null
    ])
  ]);
};
FeaturePanel.displayName = "FeaturePanel";
const DropTransition = defineComponent({
  name: "DropTransition",
  props: {
    /**
     * @description Transition type
     */
    type: {
      type: String,
      default: "single"
    },
    /**
     * @description Transition delay
     */
    delay: { type: Number, default: 0 },
    /**
     * @description Transition duration
     */
    duration: { type: Number, default: 0.25 },
    /**
     * @description appear
     */
    appear: Boolean
  },
  slots: Object,
  setup(props, { slots }) {
    const setStyle2 = (item) => {
      item.style.transition = `transform ${props.duration}s ease-in-out ${props.delay}s, opacity ${props.duration}s ease-in-out ${props.delay}s`;
      item.style.transform = "translateY(-20px)";
      item.style.opacity = "0";
    };
    const unsetStyle = (item) => {
      item.style.transform = "translateY(0)";
      item.style.opacity = "1";
    };
    return () => h$4(
      // @ts-ignore
      props.type === "single" ? Transition : TransitionGroup,
      {
        name: "drop",
        appear: props.appear,
        onAppear: setStyle2,
        onAfterAppear: unsetStyle,
        onEnter: setStyle2,
        onAfterEnter: unsetStyle,
        onBeforeLeave: setStyle2
      },
      () => slots.default()
    );
  }
});
const heroInfo = "";
const HeroInfo = defineComponent({
  name: "HeroInfo",
  slots: Object,
  setup(_props, { slots }) {
    const frontmatter = usePageFrontmatter();
    const siteLocale = useSiteLocaleData();
    const isFullScreen = computed(() => frontmatter.value.heroFullScreen ?? false);
    const heroInfo2 = computed(() => {
      const { heroText, tagline } = frontmatter.value;
      return {
        text: heroText ?? siteLocale.value.title ?? "Hello",
        tagline: tagline ?? siteLocale.value.description ?? "",
        isFullScreen: isFullScreen.value
      };
    });
    const heroImage = computed(() => {
      const { heroText, heroImage: heroImage2, heroImageDark, heroAlt, heroImageStyle } = frontmatter.value;
      return {
        image: heroImage2 ? withBase(heroImage2) : null,
        imageDark: heroImageDark ? withBase(heroImageDark) : null,
        heroStyle: heroImageStyle,
        alt: heroAlt || heroText || "hero image",
        isFullScreen: isFullScreen.value
      };
    });
    const bgInfo = computed(() => {
      const { bgImage, bgImageDark, bgImageStyle } = frontmatter.value;
      return {
        image: a$8(bgImage) ? withBase(bgImage) : null,
        imageDark: a$8(bgImageDark) ? withBase(bgImageDark) : null,
        bgStyle: bgImageStyle,
        isFullScreen: isFullScreen.value
      };
    });
    const actions = computed(() => frontmatter.value.actions ?? []);
    return () => {
      var _a2, _b2, _c;
      return h$4("header", { class: ["vp-hero-info-wrapper", { fullscreen: isFullScreen.value }] }, [
        ((_a2 = slots.heroBg) == null ? void 0 : _a2.call(slots, bgInfo.value)) || [
          bgInfo.value.image ? h$4("div", {
            class: ["vp-hero-mask", { light: bgInfo.value.imageDark }],
            style: [
              { "background-image": `url(${bgInfo.value.image})` },
              bgInfo.value.bgStyle
            ]
          }) : null,
          bgInfo.value.imageDark ? h$4("div", {
            class: "vp-hero-mask dark",
            style: [
              {
                "background-image": `url(${bgInfo.value.imageDark})`
              },
              bgInfo.value.bgStyle
            ]
          }) : null
        ],
        h$4("div", { class: "vp-hero-info" }, [
          ((_b2 = slots.heroImage) == null ? void 0 : _b2.call(slots, heroImage.value)) || h$4(DropTransition, { appear: true, type: "group" }, () => [
            heroImage.value.image ? h$4("img", {
              key: "light",
              class: [
                "vp-hero-image",
                { light: heroImage.value.imageDark }
              ],
              style: heroImage.value.heroStyle,
              src: heroImage.value.image,
              alt: heroImage.value.alt
            }) : null,
            heroImage.value.imageDark ? h$4("img", {
              key: "dark",
              class: "vp-hero-image dark",
              style: heroImage.value.heroStyle,
              src: heroImage.value.imageDark,
              alt: heroImage.value.alt
            }) : null
          ]),
          ((_c = slots.heroInfo) == null ? void 0 : _c.call(slots, heroInfo2.value)) ?? h$4("div", { class: "vp-hero-infos" }, [
            heroInfo2.value.text ? h$4(DropTransition, { appear: true, delay: 0.04 }, () => h$4("h1", { id: "main-title" }, heroInfo2.value.text)) : null,
            heroInfo2.value.tagline ? h$4(DropTransition, { appear: true, delay: 0.08 }, () => h$4("p", {
              class: "vp-description",
              innerHTML: heroInfo2.value.tagline
            })) : null,
            actions.value.length ? h$4(DropTransition, { appear: true, delay: 0.12 }, () => h$4("p", { class: "vp-actions" }, actions.value.map((action) => h$4(AutoLink, {
              class: ["vp-action", action.type || "default"],
              config: action,
              noExternalLinkIcon: true
            })))) : null
          ])
        ])
      ]);
    };
  }
});
const highlightPanel = "";
const HighlightPanel = (props, { slots }) => {
  var _a2, _b2, _c;
  const { bgImage, bgImageDark, bgImageStyle, color, description, image, imageDark, header, highlights = [], type = "un-order" } = props;
  return h$4("div", {
    class: "vp-highlight-wrapper",
    style: color ? { color } : {}
  }, [
    bgImage ? h$4("div", {
      class: ["vp-highlight-bg", { light: bgImageDark }],
      style: [{ "background-image": `url(${bgImage})` }, bgImageStyle]
    }) : null,
    bgImageDark ? h$4("div", {
      class: "vp-highlight-bg dark",
      style: [
        { "background-image": `url(${bgImageDark})` },
        bgImageStyle
      ]
    }) : null,
    h$4("div", { class: "vp-highlight" }, [
      ((_a2 = slots.image) == null ? void 0 : _a2.call(slots, props)) || [
        image ? h$4("img", {
          class: ["vp-highlight-image", { light: imageDark }],
          src: withBase(image),
          alt: header
        }) : null,
        imageDark ? h$4("img", {
          class: "vp-highlight-image dark",
          src: withBase(imageDark),
          alt: header
        }) : null
      ],
      ((_b2 = slots.info) == null ? void 0 : _b2.call(slots, props)) || [
        h$4("div", { class: "vp-highlight-info-wrapper" }, h$4("div", { class: "vp-highlight-info" }, [
          header ? h$4("h2", {
            class: "vp-highlight-header",
            innerHTML: header
          }) : null,
          description ? h$4("p", {
            class: "vp-highlight-description",
            innerHTML: description
          }) : null,
          ((_c = slots.highlights) == null ? void 0 : _c.call(slots, highlights)) || h$4(type === "order" ? "ol" : type === "no-order" ? "dl" : "ul", { class: "vp-highlights" }, highlights.map(({ icon, title, details, link }) => {
            const children = [
              h$4(type === "no-order" ? "dt" : "h3", { class: "vp-highlight-title" }, [
                icon ? h$4(HopeIcon, {
                  class: "vp-highlight-icon",
                  icon
                }) : null,
                h$4("span", { innerHTML: title })
              ]),
              details ? h$4(type === "no-order" ? "dd" : "p", {
                class: "vp-highlight-details",
                innerHTML: details
              }) : null
            ];
            return h$4(type === "no-order" ? "div" : "li", {
              class: ["vp-highlight-item-wrapper", { link }]
            }, link ? ye(link) ? h$4("a", {
              class: "vp-highlight-item link",
              href: link,
              role: "navigation",
              "aria-label": title,
              target: "_blank"
            }, children) : h$4(j$1, {
              class: "vp-highlight-item link",
              to: link,
              role: "navigation",
              "aria-label": title
            }, () => children) : h$4("div", { class: "vp-highlight-item" }, children));
          }))
        ]))
      ]
    ])
  ]);
};
HighlightPanel.displayName = "HighlightPanel";
const MarkdownContent = ({ custom }) => h$4(Content, { class: ["theme-hope-content", { custom }] });
MarkdownContent.displayName = "MarkdownContent";
MarkdownContent.props = {
  custom: Boolean
};
const homePage = "";
const HomePage = defineComponent({
  name: "HomePage",
  slots: Object,
  setup(_props, { slots }) {
    const pure = usePure();
    const frontmatter = usePageFrontmatter();
    const features = computed(() => {
      const { features: features2 } = frontmatter.value;
      return isArray$1(features2) ? features2 : null;
    });
    const highlights = computed(() => {
      const { highlights: highlights2 } = frontmatter.value;
      if (isArray$1(highlights2))
        return highlights2;
      return null;
    });
    return () => {
      var _a2, _b2, _c, _d;
      return h$4("main", {
        id: "main-content",
        class: ["vp-project-home ", { pure: pure.value }],
        "aria-labelledby": frontmatter.value.heroText === null ? "" : "main-title"
      }, [
        (_a2 = slots.top) == null ? void 0 : _a2.call(slots),
        h$4(HeroInfo),
        ((_b2 = highlights.value) == null ? void 0 : _b2.map((highlight) => "features" in highlight ? h$4(FeaturePanel, highlight) : h$4(HighlightPanel, highlight))) || (features.value ? h$4(DropTransition, { appear: true, delay: 0.24 }, () => h$4(FeaturePanel, { features: features.value })) : null),
        (_c = slots.center) == null ? void 0 : _c.call(slots),
        h$4(DropTransition, {
          appear: true,
          delay: 0.32
        }, () => h$4(MarkdownContent)),
        (_d = slots.bottom) == null ? void 0 : _d.call(slots)
      ]);
    };
  }
});
const breadcrumb = "";
const BreadCrumb = defineComponent({
  name: "BreadCrumb",
  setup() {
    const router = useRouter();
    const page2 = usePageData();
    const routeLocale = useRouteLocale();
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const config = shallowRef([]);
    const enable = computed(() => (frontmatter.value.breadcrumb || frontmatter.value.breadcrumb !== false && themeLocale.value.breadcrumb !== false) && config.value.length > 1);
    const iconEnable = computed(() => frontmatter.value.breadcrumbIcon || frontmatter.value.breadcrumbIcon !== false && themeLocale.value.breadcrumbIcon !== false);
    const getBreadCrumbConfig = () => {
      const routes = router.getRoutes();
      const breadcrumbConfig = getAncestorLinks(page2.value.path, routeLocale.value).map(({ link, name }) => {
        const route = routes.find((route2) => route2.path === link);
        if (route) {
          const { meta, path } = w$1(router, route.path);
          return {
            title: meta[ArticleInfoType.shortTitle] || meta[ArticleInfoType.title] || name,
            icon: meta[ArticleInfoType.icon],
            path
          };
        }
        return null;
      }).filter((item) => item !== null);
      if (breadcrumbConfig.length > 1)
        config.value = breadcrumbConfig;
    };
    onMounted(() => {
      getBreadCrumbConfig();
      watch(() => page2.value.path, getBreadCrumbConfig);
    });
    return () => h$4("nav", { class: ["vp-breadcrumb", { disable: !enable.value }] }, enable.value ? h$4("ol", {
      vocab: "https://schema.org/",
      typeof: "BreadcrumbList"
    }, config.value.map((item, index2) => h$4("li", {
      class: { "is-active": config.value.length - 1 === index2 },
      property: "itemListElement",
      typeof: "ListItem"
    }, [
      h$4(j$1, {
        to: item.path,
        property: "item",
        typeof: "WebPage"
      }, () => [
        // icon
        iconEnable.value ? h$4(HopeIcon, { icon: item.icon }) : null,
        // text
        h$4("span", { property: "name" }, item.title || "Unknown")
      ]),
      // meta
      h$4("meta", { property: "position", content: index2 + 1 })
    ]))) : []);
  }
});
const pageNav = "";
const resolveFromFrontmatterConfig = (conf) => {
  const router = useRouter();
  if (conf === false)
    return false;
  if (isString(conf))
    return resolveLinkInfo(router, conf, true);
  if (isPlainObject(conf))
    return conf;
  return null;
};
const resolveFromSidebarItems = (sidebarItems, currentPath, offset2) => {
  const index2 = sidebarItems.findIndex((item) => item.link === currentPath);
  if (index2 !== -1) {
    const targetItem = sidebarItems[index2 + offset2];
    if (!(targetItem == null ? void 0 : targetItem.link))
      return null;
    return targetItem;
  }
  for (const item of sidebarItems)
    if (item.children) {
      const childResult = resolveFromSidebarItems(item.children, currentPath, offset2);
      if (childResult)
        return childResult;
    }
  return null;
};
const PageNav = defineComponent({
  name: "PageNav",
  setup() {
    const themeLocale = useThemeLocaleData();
    const frontmatter = usePageFrontmatter();
    const sidebarItems = useSidebarItems();
    const page2 = usePageData();
    const navigate = useNavigate();
    const prevNavLink = computed(() => {
      const prevConfig = resolveFromFrontmatterConfig(frontmatter.value.prev);
      return prevConfig === false ? null : prevConfig || (themeLocale.value.prevLink === false ? null : resolveFromSidebarItems(sidebarItems.value, page2.value.path, -1));
    });
    const nextNavLink = computed(() => {
      const nextConfig = resolveFromFrontmatterConfig(frontmatter.value.next);
      return nextConfig === false ? null : nextConfig || (themeLocale.value.nextLink === false ? null : resolveFromSidebarItems(sidebarItems.value, page2.value.path, 1));
    });
    useEventListener("keydown", (event) => {
      if (event.altKey) {
        if (event.key === "ArrowRight") {
          if (nextNavLink.value) {
            navigate(nextNavLink.value.link);
            event.preventDefault();
          }
        } else if (event.key === "ArrowLeft") {
          if (prevNavLink.value) {
            navigate(prevNavLink.value.link);
            event.preventDefault();
          }
        }
      }
    });
    return () => prevNavLink.value || nextNavLink.value ? h$4("nav", { class: "vp-page-nav" }, [
      prevNavLink.value ? h$4(AutoLink, { class: "prev", config: prevNavLink.value }, () => {
        var _a2, _b2;
        return [
          h$4("div", { class: "hint" }, [
            h$4("span", { class: "arrow start" }),
            themeLocale.value.metaLocales.prev
          ]),
          h$4("div", { class: "link" }, [
            h$4(HopeIcon, {
              icon: (_a2 = prevNavLink.value) == null ? void 0 : _a2.icon
            }),
            (_b2 = prevNavLink.value) == null ? void 0 : _b2.text
          ])
        ];
      }) : null,
      nextNavLink.value ? h$4(AutoLink, { class: "next", config: nextNavLink.value }, () => {
        var _a2, _b2;
        return [
          h$4("div", { class: "hint" }, [
            themeLocale.value.metaLocales.next,
            h$4("span", { class: "arrow end" })
          ]),
          h$4("div", { class: "link" }, [
            (_a2 = nextNavLink.value) == null ? void 0 : _a2.text,
            h$4(HopeIcon, {
              icon: (_b2 = nextNavLink.value) == null ? void 0 : _b2.icon
            })
          ])
        ];
      }) : null
    ]) : null;
  }
});
const AuthorIcon = () => h$4(u$4, { name: "author" }, () => h$4("path", {
  d: "M649.6 633.6c86.4-48 147.2-144 147.2-249.6 0-160-128-288-288-288s-288 128-288 288c0 108.8 57.6 201.6 147.2 249.6-121.6 48-214.4 153.6-240 288-3.2 9.6 0 19.2 6.4 25.6 3.2 9.6 12.8 12.8 22.4 12.8h704c9.6 0 19.2-3.2 25.6-12.8 6.4-6.4 9.6-16 6.4-25.6-25.6-134.4-121.6-240-243.2-288z"
}));
AuthorIcon.displayName = "AuthorIcon";
const CalendarIcon = () => h$4(u$4, { name: "calendar" }, () => h$4("path", {
  d: "M716.4 110.137c0-18.753-14.72-33.473-33.472-33.473-18.753 0-33.473 14.72-33.473 33.473v33.473h66.993v-33.473zm-334.87 0c0-18.753-14.72-33.473-33.473-33.473s-33.52 14.72-33.52 33.473v33.473h66.993v-33.473zm468.81 33.52H716.4v100.465c0 18.753-14.72 33.473-33.472 33.473a33.145 33.145 0 01-33.473-33.473V143.657H381.53v100.465c0 18.753-14.72 33.473-33.473 33.473a33.145 33.145 0 01-33.473-33.473V143.657H180.6A134.314 134.314 0 0046.66 277.595v535.756A134.314 134.314 0 00180.6 947.289h669.74a134.36 134.36 0 00133.94-133.938V277.595a134.314 134.314 0 00-133.94-133.938zm33.473 267.877H147.126a33.145 33.145 0 01-33.473-33.473c0-18.752 14.72-33.473 33.473-33.473h736.687c18.752 0 33.472 14.72 33.472 33.473a33.145 33.145 0 01-33.472 33.473z"
}));
CalendarIcon.displayName = "CalendarIcon";
const CategoryIcon$1 = () => h$4(u$4, { name: "category" }, () => h$4("path", {
  d: "M148.41 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H148.41c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.311-40.31zM147.556 553.478H429.73c22.263 0 40.311 18.048 40.311 40.31v282.176c0 22.263-18.048 40.312-40.31 40.312H147.555c-22.263 0-40.311-18.049-40.311-40.312V593.79c0-22.263 18.048-40.311 40.31-40.311zM593.927 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H593.927c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.31-40.31zM730.22 920.502H623.926c-40.925 0-74.22-33.388-74.22-74.425V623.992c0-41.038 33.387-74.424 74.425-74.424h222.085c41.038 0 74.424 33.226 74.424 74.067v114.233c0 10.244-8.304 18.548-18.547 18.548s-18.548-8.304-18.548-18.548V623.635c0-20.388-16.746-36.974-37.33-36.974H624.13c-20.585 0-37.331 16.747-37.331 37.33v222.086c0 20.585 16.654 37.331 37.126 37.331H730.22c10.243 0 18.547 8.304 18.547 18.547 0 10.244-8.304 18.547-18.547 18.547z"
}));
CategoryIcon$1.displayName = "CategoryIcon";
const EyeIcon = () => h$4(u$4, { name: "eye" }, () => h$4("path", {
  d: "M992 512.096c0-5.76-.992-10.592-1.28-11.136-.192-2.88-1.152-8.064-2.08-10.816-.256-.672-.544-1.376-.832-2.08-.48-1.568-1.024-3.104-1.6-4.32C897.664 290.112 707.104 160 512 160c-195.072 0-385.632 130.016-473.76 322.592-1.056 2.112-1.792 4.096-2.272 5.856a55.512 55.512 0 00-.64 1.6c-1.76 5.088-1.792 8.64-1.632 7.744-.832 3.744-1.568 11.168-1.568 11.168-.224 2.272-.224 4.032.032 6.304 0 0 .736 6.464 1.088 7.808.128 1.824.576 4.512 1.12 6.976h-.032c.448 2.08 1.12 4.096 1.984 6.08.48 1.536.992 2.976 1.472 4.032C126.432 733.856 316.992 864 512 864c195.136 0 385.696-130.048 473.216-321.696 1.376-2.496 2.24-4.832 2.848-6.912.256-.608.48-1.184.672-1.728 1.536-4.48 1.856-8.32 1.728-8.32l-.032.032c.608-3.104 1.568-7.744 1.568-13.28zM512 672c-88.224 0-160-71.776-160-160s71.776-160 160-160 160 71.776 160 160-71.776 160-160 160z"
}));
EyeIcon.displayName = "EyeIcon";
const FireIcon = () => h$4(u$4, { name: "fire" }, () => h$4("path", {
  d: "M726.4 201.6c-12.8-9.6-28.8-6.4-38.4 0-9.6 9.6-16 25.6-9.6 38.4 6.4 12.8 9.6 28.8 12.8 44.8C604.8 83.2 460.8 38.4 454.4 35.2c-9.6-3.2-22.4 0-28.8 6.4-9.6 6.4-12.8 19.2-9.6 28.8 12.8 86.4-25.6 188.8-115.2 310.4-6.4-25.6-16-51.2-32-80-9.6-9.6-22.4-16-35.2-12.8-16 3.2-25.6 12.8-25.6 28.8-3.2 48-25.6 92.8-51.2 140.8C134.4 499.2 112 544 102.4 592c-32 150.4 99.2 329.6 233.6 380.8 9.6 3.2 19.2 6.4 32 9.6-25.6-19.2-41.6-51.2-48-96C294.4 691.2 505.6 640 515.2 460.8c153.6 105.6 224 336 137.6 505.6 3.2 0 6.4-3.2 9.6-3.2 0 0 3.2 0 3.2-3.2 163.2-89.6 252.8-208 259.2-345.6 16-211.2-163.2-390.4-198.4-412.8z"
}));
FireIcon.displayName = "FireIcon";
const PrintIcon = () => h$4(u$4, { name: "print" }, () => h$4("path", {
  d: "M819.2 364.8h-44.8V128c0-17.067-14.933-32-32-32H281.6c-17.067 0-32 14.933-32 32v236.8h-44.8C145.067 364.8 96 413.867 96 473.6v192c0 59.733 49.067 108.8 108.8 108.8h44.8V896c0 17.067 14.933 32 32 32h460.8c17.067 0 32-14.933 32-32V774.4h44.8c59.733 0 108.8-49.067 108.8-108.8v-192c0-59.733-49.067-108.8-108.8-108.8zM313.6 160h396.8v204.8H313.6V160zm396.8 704H313.6V620.8h396.8V864zM864 665.6c0 25.6-19.2 44.8-44.8 44.8h-44.8V588.8c0-17.067-14.933-32-32-32H281.6c-17.067 0-32 14.933-32 32v121.6h-44.8c-25.6 0-44.8-19.2-44.8-44.8v-192c0-25.6 19.2-44.8 44.8-44.8h614.4c25.6 0 44.8 19.2 44.8 44.8v192z"
}));
PrintIcon.displayName = "PrintIcon";
const TagIcon$1 = () => h$4(u$4, { name: "tag" }, () => h$4("path", {
  d: "M939.902 458.563L910.17 144.567c-1.507-16.272-14.465-29.13-30.737-30.737L565.438 84.098h-.402c-3.215 0-5.726 1.005-7.634 2.913l-470.39 470.39a10.004 10.004 0 000 14.164l365.423 365.424c1.909 1.908 4.42 2.913 7.132 2.913s5.223-1.005 7.132-2.913l470.39-470.39c2.01-2.11 3.014-5.023 2.813-8.036zm-240.067-72.121c-35.458 0-64.286-28.828-64.286-64.286s28.828-64.285 64.286-64.285 64.286 28.828 64.286 64.285-28.829 64.286-64.286 64.286z"
}));
TagIcon$1.displayName = "TagIcon";
const TimerIcon = () => h$4(u$4, { name: "timer" }, () => h$4("path", {
  d: "M799.387 122.15c4.402-2.978 7.38-7.897 7.38-13.463v-1.165c0-8.933-7.38-16.312-16.312-16.312H256.33c-8.933 0-16.311 7.38-16.311 16.312v1.165c0 5.825 2.977 10.874 7.637 13.592 4.143 194.44 97.22 354.963 220.201 392.763-122.204 37.542-214.893 196.511-220.2 389.397-4.661 5.049-7.638 11.651-7.638 19.03v5.825h566.49v-5.825c0-7.379-2.849-13.981-7.509-18.9-5.049-193.016-97.867-351.985-220.2-389.527 123.24-37.67 216.446-198.453 220.588-392.892zM531.16 450.445v352.632c117.674 1.553 211.787 40.778 211.787 88.676H304.097c0-48.286 95.149-87.382 213.728-88.676V450.445c-93.077-3.107-167.901-81.297-167.901-177.093 0-8.803 6.99-15.793 15.793-15.793 8.803 0 15.794 6.99 15.794 15.793 0 80.261 63.69 145.635 142.01 145.635s142.011-65.374 142.011-145.635c0-8.803 6.99-15.793 15.794-15.793s15.793 6.99 15.793 15.793c0 95.019-73.789 172.82-165.96 177.093z"
}));
TimerIcon.displayName = "TimerIcon";
const WordIcon = () => h$4(u$4, { name: "word" }, () => [
  h$4("path", {
    d: "M518.217 432.64V73.143A73.143 73.143 0 01603.43 1.097a512 512 0 01419.474 419.474 73.143 73.143 0 01-72.046 85.212H591.36a73.143 73.143 0 01-73.143-73.143z"
  }),
  h$4("path", {
    d: "M493.714 566.857h340.297a73.143 73.143 0 0173.143 85.577A457.143 457.143 0 11371.566 117.76a73.143 73.143 0 0185.577 73.143v339.383a36.571 36.571 0 0036.571 36.571z"
  })
]);
WordIcon.displayName = "WordIcon";
const useMetaLocale = () => {
  const themeLocale = useThemeLocaleData();
  return computed(() => themeLocale.value.metaLocales);
};
const editLinkPatterns = {
  GitHub: ":repo/edit/:branch/:path",
  GitLab: ":repo/-/edit/:branch/:path",
  Gitee: ":repo/edit/:branch/:path",
  Bitbucket: ":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"
};
const resolveEditLink = ({ docsRepo, docsBranch, docsDir, filePathRelative, editLinkPattern }) => {
  if (!filePathRelative)
    return null;
  const repoType = qe(docsRepo);
  let pattern;
  if (editLinkPattern)
    pattern = editLinkPattern;
  else if (repoType !== null)
    pattern = editLinkPatterns[repoType];
  if (!pattern)
    return null;
  return pattern.replace(/:repo/, isLinkHttp(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`).replace(/:branch/, docsBranch).replace(/:path/, removeLeadingSlash(`${removeEndingSlash(docsDir)}/${filePathRelative}`));
};
const useEditLink = () => {
  const themeLocale = useThemeLocaleData();
  const page2 = usePageData();
  const frontmatter = usePageFrontmatter();
  return computed(() => {
    const { repo, docsRepo = repo, docsBranch = "main", docsDir = "", editLink, editLinkPattern = "" } = themeLocale.value;
    const showEditLink = frontmatter.value.editLink ?? editLink ?? true;
    if (!showEditLink)
      return null;
    if (!docsRepo)
      return null;
    const link = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      editLinkPattern,
      filePathRelative: page2.value.filePathRelative
    });
    if (!link)
      return null;
    return {
      text: themeLocale.value.metaLocales.editLink,
      link
    };
  });
};
const useUpdateTime = () => {
  const siteLocale = useSiteLocaleData();
  const themeLocale = useThemeLocaleData();
  const page2 = usePageData();
  const frontmatter = usePageFrontmatter();
  return computed(() => {
    var _a2, _b2;
    const showLastUpdated = frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true;
    if (!showLastUpdated)
      return null;
    if (!((_a2 = page2.value.git) == null ? void 0 : _a2.updatedTime))
      return null;
    const updatedDate = new Date((_b2 = page2.value.git) == null ? void 0 : _b2.updatedTime);
    return updatedDate.toLocaleString(siteLocale.value.lang);
  });
};
const useContributors = () => {
  const themeLocale = useThemeLocaleData();
  const page2 = usePageData();
  const frontmatter = usePageFrontmatter();
  return computed(() => {
    var _a2;
    const showContributors = frontmatter.value.contributors ?? themeLocale.value.contributors ?? true;
    if (!showContributors)
      return null;
    return ((_a2 = page2.value.git) == null ? void 0 : _a2.contributors) ?? null;
  });
};
const authorInfo = "";
const AuthorInfo = defineComponent({
  name: "AuthorInfo",
  inheritAttrs: false,
  props: {
    /**
     * Author information
     *
     * 作者信息
     */
    author: {
      type: Array,
      required: true
    },
    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: Boolean
  },
  setup(props) {
    const metaLocale = useMetaLocale();
    return () => props.author.length ? h$4("span", {
      class: "page-author-info",
      "aria-label": `${metaLocale.value.author}${props.pure ? "" : "🖊"}`,
      ...props.pure ? {} : { "data-balloon-pos": "down" }
    }, [
      h$4(AuthorIcon),
      h$4("span", props.author.map((item) => item.url ? h$4("a", {
        class: "page-author-item",
        href: item.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, item.name) : h$4("span", { class: "page-author-item" }, item.name))),
      h$4("span", {
        property: "author",
        content: props.author.map((item) => item.name).join(", ")
      })
    ]) : null;
  }
});
const categoryInfo = "";
const CategoryInfo = defineComponent({
  name: "CategoryInfo",
  inheritAttrs: false,
  props: {
    /**
     * Category information
     *
     * 分类信息
     */
    category: {
      type: Array,
      required: true
    },
    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: Boolean
  },
  setup(props) {
    const router = useRouter();
    const page2 = usePageData();
    const metaLocale = useMetaLocale();
    const navigate = (event, path = "") => {
      if (path && page2.value.path !== path) {
        event.preventDefault();
        void router.push(path);
      }
    };
    return () => props.category.length ? h$4("span", {
      class: "page-category-info",
      "aria-label": `${metaLocale.value.category}${props.pure ? "" : "🌈"}`,
      ...props.pure ? {} : { "data-balloon-pos": "down" }
    }, [
      h$4(CategoryIcon$1),
      props.category.map(({ name, path }) => h$4("span", {
        class: [
          "page-category-item",
          {
            // TODO: magic number 9 is tricky here
            [`category${he(name, 9)}`]: !props.pure,
            clickable: path
          }
        ],
        role: path ? "navigation" : "",
        onClick: (event) => navigate(event, path)
      }, name)),
      h$4("meta", {
        property: "articleSection",
        content: props.category.map(({ name }) => name).join(",")
      })
    ]) : null;
  }
});
const DateInfo = defineComponent({
  name: "DateInfo",
  inheritAttrs: false,
  props: {
    /**
     * Date information
     *
     * 日期信息
     */
    date: {
      type: Object,
      default: null
    },
    /**
     * Localized date text
     *
     * 本地化的日期文字
     */
    localizedDate: {
      type: String,
      default: ""
    },
    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: Boolean
  },
  setup(props) {
    const lang = usePageLang();
    const metaLocale = useMetaLocale();
    return () => props.date ? h$4("span", {
      class: "page-date-info",
      "aria-label": `${metaLocale.value.date}${props.pure ? "" : "📅"}`,
      ...props.pure ? {} : { "data-balloon-pos": "down" }
    }, [
      h$4(CalendarIcon),
      h$4("span", h$4(ClientOnly, () => props.localizedDate || props.date.toLocaleDateString(lang.value))),
      h$4("meta", {
        property: "datePublished",
        // ISO Format Date string
        content: props.date.toISOString() || ""
      })
    ]) : null;
  }
});
const originalInfo = "";
const OriginalInfo = defineComponent({
  name: "OriginalInfo",
  inheritAttrs: false,
  props: {
    /**
     * Whether the article is original
     *
     * 文章是否是原创
     */
    isOriginal: Boolean
  },
  setup(props) {
    const metaLocale = useMetaLocale();
    return () => props.isOriginal ? h$4("span", { class: "page-original-info" }, metaLocale.value.origin) : null;
  }
});
const PageViewInfo = defineComponent({
  name: "PageViewInfo",
  inheritAttrs: false,
  props: {
    /**
     * Whether show pageview and it's path
     *
     * 是否显示浏览量以及其路径
     */
    pageview: {
      type: [Boolean, String],
      default: false
    },
    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: Boolean
  },
  setup(props) {
    const route = useRoute();
    const metaLocale = useMetaLocale();
    const pageviewElement = shallowRef();
    const pageViews = ref(0);
    useMutationObserver(pageviewElement, () => {
      const count = pageviewElement.value.textContent;
      if (count && !isNaN(Number(count)))
        pageViews.value = Number(count);
    }, { childList: true });
    return () => props.pageview ? h$4("span", {
      class: "page-pageview-info",
      "aria-label": `${metaLocale.value.views}${props.pure ? "" : "🔢"}`,
      ...props.pure ? {} : { "data-balloon-pos": "down" }
    }, [
      h$4(pageViews.value < 1e3 ? EyeIcon : FireIcon),
      h$4("span", {
        ref: pageviewElement,
        id: "ArtalkPV",
        class: "waline-pageview-count",
        /** visitorID */
        "data-path": isString(props.pageview) ? props.pageview : withBase(route.path)
      }, "...")
    ]) : null;
  }
});
const ReadingTimeInfo = defineComponent({
  name: "ReadingTimeInfo",
  inheritAttrs: false,
  props: {
    /**
     * Reading time information
     *
     * 阅读时间信息
     */
    readingTime: {
      type: Object,
      default: () => null
    },
    /**
     * Reading time locale
     *
     * 阅读时间语言环境
     */
    readingTimeLocale: {
      type: Object,
      default: () => null
    },
    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: Boolean
  },
  setup(props) {
    const metaLocale = useMetaLocale();
    const readingTimeMeta = computed(() => {
      if (!props.readingTime)
        return null;
      const { minutes } = props.readingTime;
      return minutes < 1 ? "PT1M" : `PT${Math.round(minutes)}M`;
    });
    return () => {
      var _a2, _b2;
      return ((_a2 = props.readingTimeLocale) == null ? void 0 : _a2.time) ? h$4("span", {
        class: "page-reading-time-info",
        "aria-label": `${metaLocale.value.readingTime}${props.pure ? "" : "⌛"}`,
        ...props.pure ? {} : { "data-balloon-pos": "down" }
      }, [
        h$4(TimerIcon),
        h$4("span", (_b2 = props.readingTimeLocale) == null ? void 0 : _b2.time),
        h$4("meta", {
          property: "timeRequired",
          content: readingTimeMeta.value
        })
      ]) : null;
    };
  }
});
const tagInfo = "";
const TagInfo = defineComponent({
  name: "TagInfo",
  inheritAttrs: false,
  props: {
    /**
     * Tag information
     *
     * 标签信息
     */
    tag: {
      type: Array,
      default: () => []
    },
    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: Boolean
  },
  setup(props) {
    const router = useRouter();
    const page2 = usePageData();
    const metaLocale = useMetaLocale();
    const navigate = (event, path = "") => {
      if (path && page2.value.path !== path) {
        event.preventDefault();
        void router.push(path);
      }
    };
    return () => props.tag.length ? h$4("span", {
      class: "page-tag-info",
      "aria-label": `${metaLocale.value.tag}${props.pure ? "" : "🏷"}`,
      ...props.pure ? {} : { "data-balloon-pos": "down" }
    }, [
      h$4(TagIcon$1),
      props.tag.map(({ name, path }) => h$4("span", {
        class: [
          "page-tag-item",
          {
            // TODO: magic number 9 is tricky here
            [`tag${he(name, 9)}`]: !props.pure,
            clickable: path
          }
        ],
        role: path ? "navigation" : "",
        onClick: (event) => navigate(event, path)
      }, name)),
      h$4("meta", {
        property: "keywords",
        content: props.tag.map(({ name }) => name).join(",")
      })
    ]) : null;
  }
});
const WordInfo = defineComponent({
  name: "ReadTimeInfo",
  inheritAttrs: false,
  props: {
    /**
     * Reading time information
     *
     * 阅读时间信息
     */
    readingTime: {
      type: Object,
      default: () => null
    },
    /**
     * Reading time locale
     *
     * 阅读时间语言环境
     */
    readingTimeLocale: {
      type: Object,
      default: () => null
    },
    /**
     * Whether in pure mode
     *
     * 是否处于纯净模式
     */
    pure: Boolean
  },
  setup(props) {
    const metaLocale = useMetaLocale();
    return () => {
      var _a2, _b2, _c;
      return ((_a2 = props.readingTimeLocale) == null ? void 0 : _a2.words) ? h$4("span", {
        class: "page-word-info",
        "aria-label": `${metaLocale.value.words}${props.pure ? "" : "🔠"}`,
        ...props.pure ? {} : { "data-balloon-pos": "down" }
      }, [
        h$4(WordIcon),
        h$4("span", (_b2 = props.readingTimeLocale) == null ? void 0 : _b2.words),
        h$4("meta", {
          property: "wordCount",
          content: (_c = props.readingTime) == null ? void 0 : _c.words
        })
      ]) : null;
    };
  }
});
const pageInfo = "";
const PageInfo = defineComponent({
  name: "PageInfo",
  components: {
    AuthorInfo,
    CategoryInfo,
    DateInfo,
    OriginalInfo,
    PageViewInfo,
    ReadingTimeInfo,
    TagInfo,
    WordInfo
  },
  props: {
    /**
     * Article information to display
     *
     * 待展示的文章信息
     */
    items: {
      type: [Array, Boolean],
      default: () => [
        "Author",
        "Original",
        "Date",
        "PageView",
        "ReadingTime",
        "Category",
        "Tag"
      ]
    },
    /**
     * Article information
     *
     * 文章信息配置
     */
    info: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const pure = usePure();
    return () => props.items ? h$4("div", { class: "page-info" }, props.items.map((item) => h$4(resolveComponent(`${item}Info`), {
      ...props.info,
      pure: pure.value
    }))) : null;
  }
});
const pageTitle = "";
const PageTitle = defineComponent({
  name: "PageTitle",
  setup() {
    const page2 = usePageData();
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const { info, items } = usePageInfo();
    return () => h$4("div", { class: "vp-page-title" }, [
      h$4("h1", [
        themeLocale.value.titleIcon === false ? null : h$4(HopeIcon, { icon: frontmatter.value.icon }),
        page2.value.title
      ]),
      h$4(PageInfo, {
        info: info.value,
        ...items.value === null ? {} : { items: items.value }
      }),
      h$4("hr")
    ]);
  }
});
const EditIcon = () => h$4(u$4, { name: "edit" }, () => [
  h$4("path", {
    d: "M430.818 653.65a60.46 60.46 0 0 1-50.96-93.281l71.69-114.012 7.773-10.365L816.038 80.138A60.46 60.46 0 0 1 859.225 62a60.46 60.46 0 0 1 43.186 18.138l43.186 43.186a60.46 60.46 0 0 1 0 86.373L588.879 565.55l-8.637 8.637-117.466 68.234a60.46 60.46 0 0 1-31.958 11.229z"
  }),
  h$4("path", {
    d: "M728.802 962H252.891A190.883 190.883 0 0 1 62.008 771.98V296.934a190.883 190.883 0 0 1 190.883-192.61h267.754a60.46 60.46 0 0 1 0 120.92H252.891a69.962 69.962 0 0 0-69.098 69.099V771.98a69.962 69.962 0 0 0 69.098 69.098h475.911A69.962 69.962 0 0 0 797.9 771.98V503.363a60.46 60.46 0 1 1 120.922 0V771.98A190.883 190.883 0 0 1 728.802 962z"
  })
]);
EditIcon.displayName = "EditIcon";
const pageMeta = "";
const PageMeta = defineComponent({
  name: "PageMeta",
  setup() {
    const themeLocale = useThemeLocaleData();
    const editLink = useEditLink();
    const updateTime = useUpdateTime();
    const contributors = useContributors();
    return () => {
      const { metaLocales } = themeLocale.value;
      return h$4("footer", { class: "page-meta" }, [
        editLink.value ? h$4("div", { class: "meta-item edit-link" }, h$4(AutoLink, { class: "label", config: editLink.value }, { before: () => h$4(EditIcon) })) : null,
        h$4("div", { class: "meta-item git-info" }, [
          updateTime.value ? h$4("div", { class: "update-time" }, [
            h$4("span", { class: "label" }, `${metaLocales.lastUpdated}: `),
            h$4(ClientOnly, () => h$4("span", { class: "info" }, updateTime.value))
          ]) : null,
          contributors.value && contributors.value.length ? h$4("div", { class: "contributors" }, [
            h$4("span", { class: "label" }, `${metaLocales.contributors}: `),
            contributors.value.map(({ email, name }, index2) => [
              h$4("span", { class: "contributor", title: `email: ${email}` }, name),
              index2 !== contributors.value.length - 1 ? "," : ""
            ])
          ]) : null
        ])
      ]);
    };
  }
});
const printButton = "";
const PrintButton = defineComponent({
  name: "PrintButton",
  setup() {
    const themeData2 = useThemeData();
    const themeLocale = useThemeLocaleData();
    return () => themeData2.value.print === false ? null : h$4("button", {
      type: "button",
      class: "print-button",
      title: themeLocale.value.metaLocales.print,
      onClick: () => {
        window.print();
      }
    }, h$4(PrintIcon));
  }
});
const toc = "";
const renderHeader = ({ title, level, slug }) => h$4(j$1, {
  to: `#${slug}`,
  class: ["toc-link", `level${level}`]
}, () => title);
const renderChildren = (headers, headerDepth) => {
  const route = useRoute();
  return headers.length && headerDepth > 0 ? h$4("ul", { class: "toc-list" }, headers.map((header) => {
    const children = renderChildren(header.children, headerDepth - 1);
    return [
      h$4("li", {
        class: [
          "toc-item",
          { active: Ge(route, `#${header.slug}`) }
        ]
      }, renderHeader(header)),
      children ? h$4("li", children) : null
    ];
  })) : null;
};
const TOC = defineComponent({
  name: "TOC",
  props: {
    /**
     * TOC items config
     *
     * TOC 项目配置
     */
    items: {
      type: Array,
      default: () => []
    },
    /**
     * Max header nesting depth
     *
     * 最大的标题嵌套深度
     */
    headerDepth: {
      type: Number,
      default: 2
    }
  },
  slots: Object,
  setup(props, { slots }) {
    const route = useRoute();
    const page2 = usePageData();
    const metaLocale = useMetaLocale();
    const toc2 = shallowRef();
    const tocMarkerTop = ref("-1.7rem");
    const scrollTo2 = (top) => {
      var _a2;
      (_a2 = toc2.value) == null ? void 0 : _a2.scrollTo({ top, behavior: "smooth" });
    };
    const updateTocMarker = () => {
      if (toc2.value) {
        const activeTocItem = document.querySelector(".toc-item.active");
        if (activeTocItem)
          tocMarkerTop.value = `${// active toc item top
          activeTocItem.getBoundingClientRect().top - // toc top
          toc2.value.getBoundingClientRect().top + // toc scroll top
          toc2.value.scrollTop}px`;
        else
          tocMarkerTop.value = "-1.7rem";
      } else {
        tocMarkerTop.value = "-1.7rem";
      }
    };
    onMounted(() => {
      watch(() => route.hash, (hash) => {
        if (toc2.value) {
          const activeTocItem = document.querySelector(`#toc a.toc-link[href$="${hash}"]`);
          if (!activeTocItem)
            return;
          const { top: tocTop, height: tocHeight } = toc2.value.getBoundingClientRect();
          const { top: activeTocItemTop, height: activeTocItemHeight } = activeTocItem.getBoundingClientRect();
          if (activeTocItemTop < tocTop)
            scrollTo2(toc2.value.scrollTop + activeTocItemTop - tocTop);
          else if (activeTocItemTop + activeTocItemHeight > tocTop + tocHeight)
            scrollTo2(toc2.value.scrollTop + activeTocItemTop + activeTocItemHeight - tocTop - tocHeight);
        }
      });
      watch(() => route.fullPath, () => updateTocMarker(), { flush: "post", immediate: true });
    });
    return () => {
      var _a2, _b2;
      const tocHeaders = props.items.length ? renderChildren(props.items, props.headerDepth) : page2.value.headers ? renderChildren(page2.value.headers, props.headerDepth) : null;
      return tocHeaders ? h$4("div", { class: "toc-place-holder" }, [
        h$4("aside", { id: "toc" }, [
          (_a2 = slots.before) == null ? void 0 : _a2.call(slots),
          h$4("div", { class: "toc-header" }, [
            metaLocale.value.toc,
            h$4(PrintButton)
          ]),
          h$4("div", { class: "toc-wrapper", ref: toc2 }, [
            tocHeaders,
            h$4("div", {
              class: "toc-marker",
              style: {
                top: tocMarkerTop.value
              }
            })
          ]),
          (_b2 = slots.after) == null ? void 0 : _b2.call(slots)
        ])
      ]) : null;
    };
  }
});
const page$1 = "";
const NormalPage = defineComponent({
  name: "NormalPage",
  slots: Object,
  setup(_props, { slots }) {
    const frontmatter = usePageFrontmatter();
    const page2 = usePageData();
    const { isDarkmode } = useDarkmode();
    const themeLocale = useThemeLocaleData();
    const tocEnable = computed(() => frontmatter.value.toc || frontmatter.value.toc !== false && themeLocale.value.toc !== false);
    return () => h$4("main", { id: "main-content", class: "vp-page" }, h$4(Qe("LocalEncrypt") ? resolveComponent("LocalEncrypt") : oe, () => {
      var _a2, _b2, _c, _d;
      return [
        (_a2 = slots.top) == null ? void 0 : _a2.call(slots),
        frontmatter.value.cover ? h$4("img", {
          class: "page-cover",
          src: withBase(frontmatter.value.cover),
          alt: page2.value.title,
          "no-view": ""
        }) : null,
        h$4(BreadCrumb),
        h$4(PageTitle),
        tocEnable.value ? h$4(TOC, {
          headerDepth: frontmatter.value.headerDepth ?? themeLocale.value.headerDepth ?? 2
        }, {
          before: () => {
            var _a3;
            return (_a3 = slots.tocBefore) == null ? void 0 : _a3.call(slots);
          },
          after: () => {
            var _a3;
            return (_a3 = slots.tocAfter) == null ? void 0 : _a3.call(slots);
          }
        }) : null,
        (_b2 = slots.contentBefore) == null ? void 0 : _b2.call(slots),
        h$4(MarkdownContent),
        (_c = slots.contentAfter) == null ? void 0 : _c.call(slots),
        h$4(PageMeta),
        h$4(PageNav),
        Qe("CommentService") ? h$4(resolveComponent("CommentService"), {
          darkmode: isDarkmode.value
        }) : null,
        (_d = slots.bottom) == null ? void 0 : _d.call(slots)
      ];
    }));
  }
});
const skipLink = "";
const SkipLink = defineComponent({
  name: "SkipLink",
  props: {
    /** @description Content ID */
    content: {
      type: String,
      default: "main-content"
    }
  },
  setup(props) {
    const page2 = usePageData();
    const themeLocale = useThemeLocaleData();
    const skipToMainContent = shallowRef();
    const focusMainContent = ({ target }) => {
      const el = document.querySelector(target.hash);
      if (el) {
        const removeTabIndex = () => {
          el.removeAttribute("tabindex");
          el.removeEventListener("blur", removeTabIndex);
        };
        el.setAttribute("tabindex", "-1");
        el.addEventListener("blur", removeTabIndex);
        el.focus();
        window.scrollTo(0, 0);
      }
    };
    onMounted(() => {
      watch(() => page2.value.path, () => skipToMainContent.value.focus());
    });
    return () => [
      h$4("span", {
        ref: skipToMainContent,
        tabindex: "-1"
      }),
      h$4("a", {
        href: `#${props.content}`,
        class: "vp-skip-link sr-only",
        onClick: focusMainContent
      }, themeLocale.value.routeLocales.skipToContent)
    ];
  }
});
const fadeSlideY = "";
const FadeSlideY = defineComponent({
  name: "FadeSlideY",
  slots: Object,
  setup(_props, { slots }) {
    const { resolve: onBeforeEnter, pending: onBeforeLeave } = useScrollPromise();
    return () => h$4(Transition, {
      name: "fade-slide-y",
      mode: "out-in",
      onBeforeEnter,
      onBeforeLeave
    }, () => {
      var _a2;
      return (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
    });
  }
});
const Layout = defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Layout",
  setup() {
    const themeData2 = useThemeData();
    const themeLocale = useThemeLocaleData();
    const page2 = usePageData();
    const frontmatter = usePageFrontmatter();
    const { isMobile } = useWindowSize();
    const sidebarDisplay = computed(
      () => {
        var _a2, _b2;
        return ((_a2 = themeLocale.value.blog) == null ? void 0 : _a2.sidebarDisplay) || ((_b2 = themeData2.value.blog) == null ? void 0 : _b2.sidebarDisplay) || "mobile";
      }
    );
    return () => [
      h$4(SkipLink),
      h$4(CommonWrapper, {}, {
        default: () => frontmatter.value.home ? h$4(HomePage) : h$4(FadeSlideY, () => h$4(NormalPage, { key: page2.value.path })),
        ...sidebarDisplay.value !== "none" ? { navScreenBottom: () => h$4(resolveComponent("BloggerInfo")) } : {},
        ...!isMobile.value && sidebarDisplay.value === "always" ? { sidebar: () => h$4(resolveComponent("BloggerInfo")) } : {}
      })
    ];
  }
});
const notFoundHint = "";
const NotFoundHint = defineComponent({
  name: "NotFoundHint",
  setup() {
    const themeLocale = useThemeLocaleData();
    const getMsg = () => {
      const messages = themeLocale.value.routeLocales["notFoundMsg"];
      return messages[Math.floor(Math.random() * messages.length)];
    };
    return () => h$4("div", { class: "not-found-hint" }, [
      h$4("p", { class: "error-code" }, "404"),
      h$4("h1", { class: "error-title" }, themeLocale.value.routeLocales["notFoundTitle"]),
      h$4("p", { class: "error-hint" }, getMsg())
    ]);
  }
});
const notFound = "";
const NotFound = defineComponent({
  name: "NotFound",
  slots: Object,
  setup(_props, { slots }) {
    const routeLocale = useRouteLocale();
    const themeLocale = useThemeLocaleData();
    const { navigate } = useLink({
      to: themeLocale.value.home ?? routeLocale.value
    });
    return () => [
      h$4(SkipLink),
      h$4(CommonWrapper, { noSidebar: true }, () => {
        var _a2;
        return h$4("main", { id: "main-content", class: "vp-page not-found" }, ((_a2 = slots.default) == null ? void 0 : _a2.call(slots)) || [
          h$4(NotFoundHint),
          h$4("div", { class: "actions" }, [
            h$4("button", {
              type: "button",
              class: "action-button",
              onClick: () => {
                window.history.go(-1);
              }
            }, themeLocale.value.routeLocales.back),
            h$4("button", {
              type: "button",
              class: "action-button",
              onClick: () => navigate()
            }, themeLocale.value.routeLocales.home)
          ])
        ]);
      })
    ];
  }
});
const icons = { "Baidu": '<svg xmlns="http://www.w3.org/2000/svg" class="icon baidu-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#1D2FE3"/><path fill="#fff" d="M239.022 704.978c.098-4.865-.314-9.772.162-14.591 5.178-52.464 197.571-253.377 249.641-259.233 42.996-4.833 75.768 16.545 99.824 49.144 37.893 51.351 82.81 95.455 131.292 136.237 52.903 44.503 56.525 99.801 32.6 158.592-23.425 57.56-75.34 69.833-127.771 58.804-84.971-17.874-168.158-13.744-253.37-4.536-86.35 9.333-133.788-39.4-132.378-124.417zM352.464 412.86c-3.58 50.707-17.93 96.128-75.9 98.12-58 1.995-80-41.432-79.275-91.71.81-49.705 13.416-104 76.851-102.136 53.84 1.625 74.74 45.8 78.324 95.726zm386 142.168c-68.494-1.735-84.188-43.331-82.635-93.812 1.46-47.519 10-97.628 73.299-96.65 61.395.95 81.6 43.207 81.553 98.668 0 53.156-19.818 89.398-72.217 91.794zm-45.235-278.345c-10.464 42.665-24.513 91.761-85.919 94.502-52.74 2.354-71.705-34.482-72.805-81.242-1.233-52.42 48-112.965 87.582-110.373 33.943 2.226 71.146 49.541 71.142 97.113zm-195.147-14c-7 46.274-13.63 100-71.562 101.351-57 1.306-73.567-47.922-73.638-97.109 0-48 12.128-99 69.345-101.426 59.45-2.493 67.11 51 75.855 97.184z"/><path fill="#1d3fe3" d="M479.52 663.165c0 12.194 1.498 24.61-.284 36.537-4.707 31.503 18.862 78.749-45.326 77.534-54.226-1.027-103.338-3.31-113.231-73.536-7.164-50.852 7.78-85.674 57.687-102.668 17.67-6.016 39.618 5.058 54.096-14.548 10.84-14.679-2.901-54.592 33.418-41.47 24.075 8.7 11.477 38.922 13.278 59.652 1.68 19.366.359 38.99.363 58.5zm175.45 41.902c4.291 39.657 5.093 78-64.709 73.503-60-3.912-95.56-20.794-86.293-85.624 4.287-29.991-21.148-83.238 22.19-84.867 42.71-1.606 13.57 50.41 20.825 77.622 5.276 19.794-3.984 46.774 29.753 48.193 41.337 1.738 28.383-30.022 31.099-51.604 1.209-9.61-.85-19.65.528-29.215 2.516-17.474-8.928-44.716 19.554-47.191 36.044-3.133 24.155 28.376 26.678 47.523 1.896 14.387.375 29.225.375 51.66z"/><path fill="#fff" d="M435.669 685.038c-2.255 24.07 5.605 53.68-33.623 52.136-34.594-1.362-35.274-31.818-38.513-53.078-4.028-26.448 11.38-48.18 40.785-50 41-2.564 27.097 30.764 31.35 51z"/></svg>', "BiliBili": '<svg xmlns="http://www.w3.org/2000/svg" class="icon bilibili-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#1296db"/><path fill="#fff" d="M745.363 177.725a47 47 0 0 1 0 66.3L702.5 286.85h44A141 141 0 0 1 887 427.512v281.25a141 141 0 0 1-141 140.626H277.25A141 141 0 0 1 137 708.763v-281.25a141 141 0 0 1 141-141h43.725l-42.788-42.825a47 47 0 1 1 66.263-66.3l99.45 99.45c2.963 2.962 5.438 6.187 7.425 9.637h120.487c1.988-3.45 4.5-6.75 7.463-9.675l99.413-99.45a47 47 0 0 1 66.3 0zm1.012 203.25h-468.75a47 47 0 0 0-46.763 43.388l-.112 3.525v281.25c0 24.712 19.125 44.962 43.387 46.724l3.488.15h468.75a47 47 0 0 0 46.763-43.387l.112-3.487v-281.25c0-26-21-47-47-46.876zm-375 93.75c26 0 47 21 47 47v47a47 47 0 1 1-93.75 0V521.6c0-26 21-47 47-47zm281.25 0c26 0 47 21 47 47v47a47 47 0 1 1-93.75 0V521.6c0-26 21-47 47-47z"/></svg>', "Email": '<svg xmlns="http://www.w3.org/2000/svg" class="icon email-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#1384FF"/><path fill="#fff" d="M270.077 286.233H751.99c32.933 0 59.86 24.855 60.274 55.51l-301.023 157L210.217 341.88c.207-30.723 26.927-55.717 59.86-55.717zm-59.929 115.714-.276 277.756c0 30.931 27.134 56.2 60.205 56.2H751.99c33.14 0 60.274-25.269 60.274-56.2V401.81L518.283 551.492a15.88 15.88 0 0 1-14.43 0L210.148 401.947z"/></svg>', "GitHub": '<svg xmlns="http://www.w3.org/2000/svg" class="icon github-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#171515"/><path fill="#fff" d="M509.423 146.442c-200.317 0-362.756 162.42-362.756 362.8 0 160.266 103.936 296.24 248.109 344.217 18.139 3.327 24.76-7.872 24.76-17.486 0-8.613-.313-31.427-.49-61.702-100.912 21.923-122.205-48.63-122.205-48.63-16.495-41.91-40.28-53.067-40.28-53.067-32.937-22.51 2.492-22.053 2.492-22.053 36.407 2.566 55.568 37.386 55.568 37.386 32.362 55.438 84.907 39.43 105.58 30.143 3.296-23.444 12.667-39.43 23.032-48.498-80.557-9.156-165.246-40.28-165.246-179.297 0-39.604 14.135-71.988 37.342-97.348-3.731-9.178-16.18-46.063 3.556-96.009 0 0 30.46-9.754 99.76 37.19 28.937-8.048 59.97-12.071 90.823-12.211 30.807.14 61.843 4.165 90.822 12.21 69.26-46.944 99.663-37.189 99.663-37.189 19.792 49.946 7.34 86.831 3.61 96.01 23.25 25.359 37.29 57.742 37.29 97.347 0 139.366-84.82 170.033-165.637 179.013 13.026 11.2 24.628 33.342 24.628 67.182 0 48.498-.445 87.627-.445 99.521 0 9.702 6.535 20.988 24.945 17.444 144.03-48.067 247.881-183.95 247.881-344.175 0-200.378-162.442-362.798-362.802-362.798z"/></svg>', "QQ": '<svg xmlns="http://www.w3.org/2000/svg" class="icon qq-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#5eaade"/><path fill="#fff" d="M805.25 585.542c-15-48.188-32.25-88.688-58.781-154.97 4.125-174.093-68.25-314.905-234.938-314.905-168.562 0-239.344 143.625-234.844 314.906-26.625 66.375-43.78 106.594-58.78 154.969-31.876 102.656-21.563 145.125-13.688 146.062 16.875 2.063 65.718-77.25 65.718-77.25 0 45.938 23.625 105.844 74.813 149.063-24.75 7.593-80.344 28.03-67.125 50.437 10.688 18.094 183.938 11.531 233.906 5.906 49.969 5.625 223.219 12.188 233.906-5.906 13.22-22.312-42.468-42.844-67.125-50.437 51.188-43.313 74.813-103.22 74.813-149.063 0 0 48.844 79.313 65.719 77.25 7.969-1.031 18.281-43.5-13.594-146.062z"/></svg>', "Qzone": '<svg xmlns="http://www.w3.org/2000/svg" class="icon qzone-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#0985DD"/><path fill="#fff" d="M722.38 595.24c22.486-4.056 11.345-12.424 2.156-11.346-16.685 1.72-40.43 1.925-66.562 1.284l3.029 17.79a656.641 656.641 0 0 0 61.402-7.702l-.025-.026zm68.95-174.915a5.287 5.287 0 0 0-4.493-3.645L598.42 389.29l-84.326-170.628c-1.925-3.594-7.958-3.594-9.857 0L419.885 389.29l-188.417 27.39a5.338 5.338 0 0 0-4.466 3.645 5.493 5.493 0 0 0 1.488 5.57l136.36 132.92-32.088 187.519a5.263 5.263 0 0 0 2.13 5.39c1.695 1.284 3.851 1.463 5.776.385l168.651-88.407 168.524 88.638 2.567.642 3.209-1.079c1.72-1.283 2.566-3.208 2.13-5.34l-24.591-143.648c-27.21 2.156-54.37 3.183-76.42 3.183-77.267 0-135.075-3.645-135.948-3.645a16.48 16.48 0 0 1-14.785-11.757 16.247 16.247 0 0 1 5.981-17.764l155.431-113.05c-99.959-7.906-183.873-6.418-184.721-6.418-13.502.642-25.67-3.645.642-14.375 4.518-1.694 109.2-23.72 230.362-7.445 6.673.847 12.013 5.75 13.733 12.194a16.61 16.61 0 0 1-6.263 17.302L497.204 571.598c27.826 5.802 100.37 12.014 160.745 13.502l-4.519-26.312 136.308-132.97a5.338 5.338 0 0 0 1.54-5.544l.051.051z"/></svg>', "Wechat": '<svg xmlns="http://www.w3.org/2000/svg" class="icon wechat-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#1AC88E"/><path fill="#fff" d="M827.551 578.742a176.583 176.583 0 0 0-185.685-158.379 172.942 172.942 0 0 0-186.3 158.379 172.942 172.942 0 0 0 185.686 158.379 282.169 282.169 0 0 0 65.536-10.923l60.689 32.768-16.384-54.613a166.275 166.275 0 0 0 76.458-125.611zm-245.76-27.307a21.845 21.845 0 1 1 0-43.69 24.872 24.872 0 0 1 27.307 21.845 24.872 24.872 0 0 1-27.921 21.845h.614zm121.356 0a21.845 21.845 0 1 1 0-43.69 24.872 24.872 0 0 1 27.306 21.845 24.872 24.872 0 0 1-28.512 21.845h1.206z"/><path fill="#fff" d="M623.662 400.953h21.23A222.709 222.709 0 0 0 419.772 245.6a208.145 208.145 0 0 0-223.323 189.94 182.044 182.044 0 0 0 89.201 150.483l-22.436 67.356 78.279-39.435a389.575 389.575 0 0 0 78.279 10.923h20.616a163.226 163.226 0 0 1-6.667-46.718 182.044 182.044 0 0 1 189.94-177.197zm-121.379-60.69a27.921 27.921 0 1 1 0 55.843 31.562 31.562 0 0 1-33.36-27.921 31.562 31.562 0 0 1 34.59-27.921h-1.23zM346.34 396.107a31.562 31.562 0 0 1-33.383-27.921 31.562 31.562 0 0 1 33.383-27.921 27.921 27.921 0 1 1 0 55.842z"/></svg>' };
const categoryMap = { "category": { "/": { "path": "/category/", "map": { "画册": { "path": "/category/%E7%94%BB%E5%86%8C/", "keys": ["v-ca2606fe"] }, "网址收藏": { "path": "/category/%E7%BD%91%E5%9D%80%E6%94%B6%E8%97%8F/", "keys": ["v-59939119"] }, "python": { "path": "/category/python/", "keys": ["v-4848c9f0", "v-7a9b9630", "v-71b4dc5e", "v-77bb6b9a", "v-4870e4c2", "v-014b8769"] }, "技术": { "path": "/category/%E6%8A%80%E6%9C%AF/", "keys": ["v-784c3919", "v-3966997b", "v-0b84fef2", "v-4f435352"] }, "Vue": { "path": "/category/vue/", "keys": ["v-3ae980e2", "v-66d370d9"] }, "工具": { "path": "/category/%E5%B7%A5%E5%85%B7/", "keys": ["v-34cef64b", "v-a430865c"] } } } }, "tag": { "/": { "path": "/tag/", "map": { "网站": { "path": "/tag/%E7%BD%91%E7%AB%99/", "keys": ["v-59939119"] }, "设计模式": { "path": "/tag/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/", "keys": ["v-4848c9f0", "v-7a9b9630", "v-71b4dc5e"] }, "python": { "path": "/tag/python/", "keys": ["v-4848c9f0", "v-7a9b9630", "v-71b4dc5e", "v-77bb6b9a", "v-4870e4c2", "v-4f435352", "v-014b8769"] }, "Linux": { "path": "/tag/linux/", "keys": ["v-77bb6b9a", "v-0b84fef2"] }, "前端": { "path": "/tag/%E5%89%8D%E7%AB%AF/", "keys": ["v-3ae980e2", "v-66d370d9"] }, "框架": { "path": "/tag/%E6%A1%86%E6%9E%B6/", "keys": ["v-3ae980e2", "v-66d370d9"] }, "gPRC": { "path": "/tag/gprc/", "keys": ["v-3966997b"] }, "RPC": { "path": "/tag/rpc/", "keys": ["v-3966997b"] }, "Mysql": { "path": "/tag/mysql/", "keys": ["v-784c3919"] }, "2to3": { "path": "/tag/2to3/", "keys": ["v-4870e4c2"] }, "polygon": { "path": "/tag/polygon/", "keys": ["v-014b8769"] }, "mysql": { "path": "/tag/mysql/", "keys": ["v-014b8769"] }, "Picgo": { "path": "/tag/picgo/", "keys": ["v-34cef64b"] }, "GitHub": { "path": "/tag/github/", "keys": ["v-34cef64b"] }, "Sublime Text": { "path": "/tag/sublime-text/", "keys": ["v-a430865c"] }, "工具说明书": { "path": "/tag/%E5%B7%A5%E5%85%B7%E8%AF%B4%E6%98%8E%E4%B9%A6/", "keys": ["v-a430865c"] } } } } };
const typeMap = { "article": { "/": { "path": "/article/", "keys": ["v-227b283b", "v-3ae980e2", "v-784c3919", "v-4848c9f0", "v-7a9b9630", "v-71b4dc5e", "v-66d370d9", "v-3966997b", "v-ca2606fe", "v-59939119", "v-77bb6b9a", "v-4870e4c2", "v-0b84fef2", "v-4f435352", "v-34cef64b", "v-a430865c", "v-184f4da6", "v-2e3eac9e", "v-014b8769"] } }, "star": { "/": { "path": "/star/", "keys": [] } }, "timeline": { "/": { "path": "/timeline/", "keys": ["v-227b283b", "v-3ae980e2", "v-784c3919", "v-4848c9f0", "v-7a9b9630", "v-71b4dc5e", "v-66d370d9", "v-3966997b", "v-ca2606fe", "v-59939119", "v-77bb6b9a", "v-4870e4c2", "v-0b84fef2", "v-4f435352", "v-34cef64b", "v-a430865c", "v-184f4da6", "v-2e3eac9e", "v-014b8769"] } } };
const _ = ref(categoryMap), k = (e2 = "") => {
  const m2 = usePageData(), u2 = useRouter(), i2 = useRouteLocale();
  return computed(() => {
    var r2;
    const p2 = e2 || ((r2 = usePageFrontmatter().value.blog) == null ? void 0 : r2.key) || "";
    if (!p2)
      return console.warn("useBlogCategory: key not found"), { path: "/", map: {} };
    const l2 = u2.getRoutes();
    if (!_.value[p2])
      throw new Error(`useBlogCategory: key ${p2} is invalid`);
    const n2 = _.value[p2][i2.value], o2 = { path: n2.path, map: {} };
    for (const a2 in n2.map) {
      const t2 = n2.map[a2];
      o2.map[a2] = { path: t2.path, items: [] };
      for (const B2 of t2.keys) {
        const f2 = l2.find(({ name: s2 }) => s2 === B2);
        if (f2) {
          const s2 = w$1(u2, f2.path);
          o2.map[a2].items.push({ path: s2.path, info: s2.meta });
        }
      }
      m2.value.path === t2.path && (o2.currentItems = o2.map[a2].items);
    }
    return o2;
  });
};
const c = ref(typeMap), C = (e2 = "") => {
  const m2 = useRouter(), u2 = useRouteLocale();
  return computed(() => {
    var i2;
    const r2 = e2 || ((i2 = usePageFrontmatter().value.blog) == null ? void 0 : i2.key) || "";
    if (!r2)
      return console.warn("useBlogType: key not found"), { path: "/", items: [] };
    if (!c.value[r2])
      throw new Error(`useBlogType: key ${e2} is invalid`);
    const p2 = m2.getRoutes(), l2 = c.value[r2][u2.value], n2 = { path: l2.path, items: [] };
    for (const o2 of l2.keys) {
      const a2 = p2.find(({ name: t2 }) => t2 === o2);
      if (a2) {
        const t2 = w$1(m2, a2.path);
        n2.items.push({ path: t2.path, info: t2.meta });
      }
    }
    return n2;
  });
};
const categoryMapSymbol = Symbol.for("categoryMap");
const useCategoryMap = () => {
  const categoryMap2 = inject(categoryMapSymbol);
  if (!categoryMap2)
    throw new Error("useCategoryMap() is called without provider.");
  return categoryMap2;
};
const setupCategoryMap = () => {
  const categoryMap2 = k("category");
  provide(categoryMapSymbol, categoryMap2);
};
const useBlogOptions = () => {
  const themeData2 = useThemeData();
  const themeLocale = useThemeLocaleData();
  return computed(() => ({
    ...themeData2.value.blog,
    ...themeLocale.value.blog
  }));
};
const tagMapSymbol = Symbol.for("tagMap");
const useTagMap = () => {
  const tagMap = inject(tagMapSymbol);
  if (!tagMap)
    throw new Error("useTagMap() is called without provider.");
  return tagMap;
};
const setupTagMap = () => {
  const tagMap = k("tag");
  provide(tagMapSymbol, tagMap);
};
const useArticleAuthor = (info) => {
  const themeLocale = useThemeLocaleData();
  return computed(() => {
    const { [ArticleInfoType.author]: author } = info.value;
    if (author)
      return Te(author);
    if (author === false)
      return [];
    return Te(themeLocale.value.author, false);
  });
};
const useArticleCategory = (info) => {
  const categoryMap2 = useCategoryMap();
  return computed(() => je(info.value[ArticleInfoType.category]).map((name) => ({
    name,
    path: categoryMap2.value.map[name].path
  })));
};
const useArticleTag = (info) => {
  const tagMap = useTagMap();
  return computed(() => Be(info.value[ArticleInfoType.tag]).map((name) => ({
    name,
    path: tagMap.value.map[name].path
  })));
};
const useArticleDate = (info) => computed(() => {
  const { [ArticleInfoType.date]: timestamp } = info.value;
  return pe(timestamp);
});
const useArticleInfo = (props) => {
  const articleInfo = toRef$1(props, "info");
  const blogOptions = useBlogOptions();
  const author = useArticleAuthor(articleInfo);
  const category = useArticleCategory(articleInfo);
  const tag = useArticleTag(articleInfo);
  const date = useArticleDate(articleInfo);
  const readingTimeLocaleConfig = s();
  const info = computed(() => ({
    author: author.value,
    category: category.value,
    date: date.value,
    localizedDate: articleInfo.value[ArticleInfoType.localizedDate] || "",
    tag: tag.value,
    isOriginal: articleInfo.value[ArticleInfoType.isOriginal] || false,
    readingTime: articleInfo.value[ArticleInfoType.readingTime] || null,
    readingTimeLocale: articleInfo.value[ArticleInfoType.readingTime] && readingTimeLocaleConfig.value ? a(articleInfo.value[ArticleInfoType.readingTime], readingTimeLocaleConfig.value) : null,
    pageview: props.path
  }));
  const items = computed(() => blogOptions.value.articleInfo);
  return { info, items };
};
const articlesSymbol = Symbol("");
const useArticles = () => {
  const articles = inject(articlesSymbol);
  if (!articles)
    throw new Error("useArticles() is called without provider.");
  return articles;
};
const setupArticles = () => {
  const articles = C("article");
  provide(articlesSymbol, articles);
};
const starsSymbol = Symbol("");
const useStars = () => {
  const stars = inject(starsSymbol);
  if (!stars)
    throw new Error("useStars() is called without provider.");
  return stars;
};
const setupStars = () => {
  const stars = C("star");
  provide(starsSymbol, stars);
};
const timelinesSymbol = Symbol("");
const useTimelines = () => {
  const timelines = inject(timelinesSymbol);
  if (!timelines)
    throw new Error("useTimelines() is called without provider.");
  return timelines;
};
const setupTimelines = () => {
  const timelines = C("timeline");
  const timelineItems2 = computed(() => {
    const timelineItems3 = [];
    timelines.value.items.forEach(({ info, path }) => {
      const date = pe(info[ArticleInfoType.date]);
      const year = date == null ? void 0 : date.getFullYear();
      const month = date ? date.getMonth() + 1 : null;
      const day = date == null ? void 0 : date.getDate();
      if (year && month && day) {
        if (!timelineItems3[0] || timelineItems3[0].year !== year)
          timelineItems3.unshift({ year, items: [] });
        timelineItems3[0].items.push({
          date: `${month}/${day}`,
          info,
          path
        });
      }
    });
    return {
      ...timelines.value,
      config: timelineItems3.reverse()
    };
  });
  provide(timelinesSymbol, timelineItems2);
};
const setupBlog = () => {
  setupArticles();
  setupCategoryMap();
  setupStars();
  setupTagMap();
  setupTimelines();
};
const socialMedia = "";
const SocialMedia = defineComponent({
  name: "SocialMedia",
  setup() {
    const blogOptions = useBlogOptions();
    const isPure = usePure();
    const mediaLinks = computed(() => {
      const config = blogOptions.value.medias;
      return config ? M$4(config).map(([media, url]) => ({
        name: media,
        icon: icons[media],
        url
      })) : [];
    });
    return () => mediaLinks.value.length ? h$4("div", { class: "vp-social-medias" }, mediaLinks.value.map(({ name, icon, url }) => h$4("a", {
      class: "vp-social-media",
      href: url,
      rel: "noopener noreferrer",
      target: "_blank",
      "aria-label": name,
      ...isPure.value ? {} : { "data-balloon-pos": "up" },
      innerHTML: icon
    }))) : null;
  }
});
const bloggerInfo = "";
const BloggerInfo = defineComponent({
  name: "BloggerInfo",
  setup() {
    const blogOptions = useBlogOptions();
    const siteLocale = useSiteLocaleData();
    const themeLocale = useThemeLocaleData();
    const articles = useArticles();
    const categoryMap2 = useCategoryMap();
    const tagMap = useTagMap();
    const timelines = useTimelines();
    const navigate = useNavigate();
    const bloggerName = computed(() => {
      var _a2;
      return blogOptions.value.name || ((_a2 = Te(themeLocale.value.author)[0]) == null ? void 0 : _a2.name) || siteLocale.value.title;
    });
    const bloggerAvatar = computed(() => blogOptions.value.avatar || themeLocale.value.logo);
    const locale = computed(() => themeLocale.value.blogLocales);
    const intro = computed(() => blogOptions.value.intro);
    return () => {
      const { article, category, tag, timeline } = locale.value;
      const countItems = [
        [articles.value.path, articles.value.items.length, article],
        [categoryMap2.value.path, f$4(categoryMap2.value.map).length, category],
        [tagMap.value.path, f$4(tagMap.value.map).length, tag],
        [timelines.value.path, timelines.value.items.length, timeline]
      ];
      return h$4("div", {
        class: "vp-blogger-info",
        vocab: "https://schema.org/",
        typeof: "Person"
      }, [
        h$4("div", {
          class: "vp-blogger",
          ...intro.value ? {
            style: { cursor: "pointer" },
            "aria-label": locale.value.intro,
            "data-balloon-pos": "down",
            role: "navigation",
            onClick: () => navigate(intro.value)
          } : {}
        }, [
          bloggerAvatar.value ? h$4("img", {
            class: [
              "vp-blogger-avatar",
              { round: blogOptions.value.roundAvatar }
            ],
            src: withBase(bloggerAvatar.value),
            property: "image",
            alt: "Blogger Avatar"
          }) : null,
          bloggerName.value ? h$4("div", { class: "vp-blogger-name", property: "name" }, bloggerName.value) : null,
          blogOptions.value.description ? h$4("div", {
            class: "vp-blogger-description",
            innerHTML: blogOptions.value.description
          }) : null,
          intro.value ? h$4("meta", { property: "url", content: withBase(intro.value) }) : null
        ]),
        h$4("div", { class: "vp-blog-counts" }, countItems.map(([path, count, locale2]) => h$4(j$1, { class: "vp-blog-count", to: path }, () => [
          h$4("div", { class: "count" }, count),
          h$4("div", locale2)
        ]))),
        h$4(SocialMedia)
      ]);
    };
  }
});
const CategoryIcon = () => h$4(u$4, { name: "category" }, () => h$4("path", {
  d: "M148.41 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H148.41c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.311-40.31zM147.556 553.478H429.73c22.263 0 40.311 18.048 40.311 40.31v282.176c0 22.263-18.048 40.312-40.31 40.312H147.555c-22.263 0-40.311-18.049-40.311-40.312V593.79c0-22.263 18.048-40.311 40.31-40.311zM593.927 106.992h282.176c22.263 0 40.31 18.048 40.31 40.31V429.48c0 22.263-18.047 40.31-40.31 40.31H593.927c-22.263 0-40.311-18.047-40.311-40.31V147.302c0-22.263 18.048-40.31 40.31-40.31zM730.22 920.502H623.926c-40.925 0-74.22-33.388-74.22-74.425V623.992c0-41.038 33.387-74.424 74.425-74.424h222.085c41.038 0 74.424 33.226 74.424 74.067v114.233c0 10.244-8.304 18.548-18.547 18.548s-18.548-8.304-18.548-18.548V623.635c0-20.388-16.746-36.974-37.33-36.974H624.13c-20.585 0-37.331 16.747-37.331 37.33v222.086c0 20.585 16.654 37.331 37.126 37.331H730.22c10.243 0 18.547 8.304 18.547 18.547 0 10.244-8.304 18.547-18.547 18.547z"
}));
CategoryIcon.displayName = "CategoryIcon";
const TagIcon = () => h$4(u$4, { name: "tag" }, () => h$4("path", {
  d: "M939.902 458.563L910.17 144.567c-1.507-16.272-14.465-29.13-30.737-30.737L565.438 84.098h-.402c-3.215 0-5.726 1.005-7.634 2.913l-470.39 470.39a10.004 10.004 0 000 14.164l365.423 365.424c1.909 1.908 4.42 2.913 7.132 2.913s5.223-1.005 7.132-2.913l470.39-470.39c2.01-2.11 3.014-5.023 2.813-8.036zm-240.067-72.121c-35.458 0-64.286-28.828-64.286-64.286s28.828-64.285 64.286-64.285 64.286 28.828 64.286 64.285-28.829 64.286-64.286 64.286z"
}));
TagIcon.displayName = "TagIcon";
const TimelineIcon = () => h$4(u$4, { name: "timeline" }, () => h$4("path", {
  d: "M511.997 70.568c-243.797 0-441.429 197.633-441.429 441.435 0 243.797 197.632 441.429 441.43 441.429S953.431 755.8 953.431 512.002c0-243.796-197.637-441.434-441.435-441.434zm150.158 609.093-15.605 15.61c-8.621 8.615-22.596 8.615-31.215 0L472.197 552.126c-4.95-4.944-4.34-14.888-4.34-24.677V247.14c0-12.19 9.882-22.07 22.07-22.07h22.07c12.19 0 22.07 9.882 22.07 22.07v273.218l128.088 128.088c8.62 8.62 8.62 22.595 0 31.215zm0 0"
}));
TimelineIcon.displayName = "TimelineIcon";
const SlideIcon = () => h$4(u$4, { name: "slides" }, () => h$4("path", {
  d: "M896 170.667v426.666a85.333 85.333 0 0 1-85.333 85.334h-256v61.184l192.597 115.584-43.861 73.13-148.736-89.173v95.275h-85.334v-95.318l-148.736 89.216-43.861-73.13 192.597-115.627v-61.141h-256A85.333 85.333 0 0 1 128 597.333V170.667H85.333V85.333h853.334v85.334H896zm-682.667 0v426.666h597.334V170.667H213.333zM426.667 512h-85.334V341.333h85.334V512zm128 0h-85.334V256h85.334v256zm128 0h-85.334V384h85.334v128z"
}));
SlideIcon.displayName = "SlideIcon";
const StickyIcon = () => h$4(u$4, { name: "sticky" }, () => [
  h$4("path", {
    d: "m381.3 733.8l-161.9 118c-5.9 4.5-13.2 6.6-20.1 6.6-8.7 0-17.7-3.4-24.3-10-12.2-12.2-13.9-31.3-3.5-45.2l144.5-195.5-113.6-112.9c-11.1-11.1-13.2-28.4-5.5-42 5.5-8.7 52.1-76.4 155.5-51 1.8 0.3 3.5 0.3 5.6 0.7 4.2 0.3 9 0.7 14.2 1.7 21.9 3.5 60.8-13.9 94.5-42.7 32.3-27.5 53.1-59.4 53.1-81.6 0-5.2 0-10.8-0.3-16-0.7-20.8-2.1-52.8 21.5-76.4 28.1-28.1 72.9-30.6 103.9-5.2 0.6 0.3 1 1 1.7 1.7 16.7 16.3 187.5 187.2 189.3 188.9 14.5 14.6 22.9 34.4 22.9 55.3 0 20.8-8 40.2-22.9 54.8-23.7 23.6-56 22.6-77.1 21.6-4.9 0-10.5-0.4-15.7-0.4-20.8 0-45.8 14.6-70.5 41.3-34.3 37.5-55.5 85.8-53.8 107.7 0.7 6.9 2.1 19.1 2.4 20.8 25 101.4-42.7 147.6-50.7 152.8-13.9 8.4-31.6 6.3-42.7-4.8l-112.1-112.2z"
  })
]);
StickyIcon.displayName = "StickyIcon";
const ArticleIcon = () => h$4(u$4, { name: "article" }, () => h$4("path", {
  d: "M853.333 938.667H170.667A42.667 42.667 0 0 1 128 896V128a42.667 42.667 0 0 1 42.667-42.667h682.666A42.667 42.667 0 0 1 896 128v768a42.667 42.667 0 0 1-42.667 42.667zm-42.666-85.334V170.667H213.333v682.666h597.334zM298.667 256h170.666v170.667H298.667V256zm0 256h426.666v85.333H298.667V512zm0 170.667h426.666V768H298.667v-85.333zm256-384h170.666V384H554.667v-85.333z"
}));
ArticleIcon.displayName = "ArticleIcon";
const BookIcon = () => h$4(u$4, { name: "book" }, () => h$4("path", {
  d: "M256 853.333h426.667A85.333 85.333 0 0 0 768 768V256a85.333 85.333 0 0 0-85.333-85.333H469.333a42.667 42.667 0 0 1 0-85.334h213.334A170.667 170.667 0 0 1 853.333 256v512a170.667 170.667 0 0 1-170.666 170.667H213.333A42.667 42.667 0 0 1 170.667 896V128a42.667 42.667 0 0 1 42.666-42.667h128A42.667 42.667 0 0 1 384 128v304.256l61.653-41.088a42.667 42.667 0 0 1 47.36 0l61.654 41.045V256A42.667 42.667 0 0 1 640 256v256a42.667 42.667 0 0 1-66.347 35.499l-104.32-69.547-104.32 69.547A42.667 42.667 0 0 1 298.667 512V170.667H256v682.666z"
}));
BookIcon.displayName = "BookIcon";
const LinkIcon = () => h$4(u$4, { name: "link" }, () => h$4("path", {
  d: "M460.8 584.533c17.067 17.067 17.067 42.667 0 59.734-17.067 17.066-42.667 17.066-59.733 0-85.334-85.334-85.334-217.6 0-302.934L554.667 192C640 110.933 776.533 110.933 857.6 196.267c81.067 81.066 81.067 213.333 0 294.4l-68.267 64c0-34.134-4.266-68.267-17.066-102.4l21.333-21.334c51.2-46.933 55.467-128 4.267-179.2s-128-55.466-179.2-4.266c-4.267 0-4.267 4.266-4.267 4.266L465.067 401.067c-51.2 51.2-51.2 132.266-4.267 183.466m123.733-183.466C601.6 384 627.2 384 644.267 401.067c85.333 85.333 85.333 217.6 0 302.933l-153.6 149.333C405.333 934.4 268.8 934.4 187.733 849.067c-81.066-81.067-81.066-213.334 0-294.4l68.267-64c0 34.133 4.267 72.533 17.067 102.4L251.733 614.4C204.8 665.6 204.8 746.667 256 793.6c51.2 46.933 123.733 46.933 174.933 0l149.334-149.333c51.2-51.2 51.2-128 0-179.2-12.8-17.067-17.067-46.934 4.266-64z"
}));
LinkIcon.displayName = "LinkIcon";
const ProjectIcon = () => h$4(u$4, { name: "project" }, () => h$4("path", {
  d: "M987.456 425.152H864V295.296a36.48 36.48 0 0 0-36.544-36.544h-360l-134.08-128.256A9.344 9.344 0 0 0 327.04 128H36.48A36.48 36.48 0 0 0 0 164.544v676.608a36.48 36.48 0 0 0 36.544 36.544h797.76a36.672 36.672 0 0 0 33.92-22.848L1021.44 475.52a36.48 36.48 0 0 0-33.92-50.304zM82.304 210.304h215.424l136.64 130.752h347.328v84.096H198.848A36.672 36.672 0 0 0 164.928 448L82.304 652.8V210.304zM808.32 795.456H108.544l118.08-292.608h699.904L808.32 795.52z"
}));
ProjectIcon.displayName = "ProjectIcon";
const FriendIcon = () => h$4(u$4, { name: "friend" }, () => h$4("path", {
  d: "M860.16 213.333A268.373 268.373 0 0 0 512 186.027a267.52 267.52 0 0 0-348.16 404.48L428.8 855.893a118.613 118.613 0 0 0 166.4 0l264.96-265.386a267.52 267.52 0 0 0 0-377.174zM800 531.627l-264.96 264.96a32.427 32.427 0 0 1-46.08 0L224 530.347a183.04 183.04 0 0 1 0-256 182.187 182.187 0 0 1 256 0 42.667 42.667 0 0 0 60.587 0 182.187 182.187 0 0 1 256 0 183.04 183.04 0 0 1 3.413 256z"
}));
FriendIcon.displayName = "FriendIcon";
const SlideDownIcon = () => h$4(u$4, { name: "slide-down" }, () => h$4("path", {
  d: "M108.775 312.23c13.553 0 27.106 3.734 39.153 11.806l375.205 250.338 363.641-252.808c32.587-21.624 76.499-12.83 98.123 19.757 21.685 32.467 12.95 76.56-19.576 98.184l-402.854 278.89c-23.733 15.901-54.694 15.962-78.547.12L69.501 442.097c-32.647-21.685-41.441-65.777-19.817-98.304 13.734-20.54 36.201-31.563 59.09-31.563Z"
}));
SlideDownIcon.displayName = "SlideDownIcon";
const emptyIcon = "";
const EmptyIcon = () => h$4("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  class: "empty-icon",
  viewBox: "0 0 1024 1024",
  innerHTML: '<defs><linearGradient id="f" x1="512.342" y1="2266.13" x2="512.342" y2="666.063" gradientUnits="userSpaceOnUse"><stop offset=".919" stop-color="#e6e6e6" stop-opacity="0"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="g" x1="528.912" y1="774" x2="388.088" y2="612" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#e6e6e6" stop-opacity="0"/></linearGradient><linearGradient id="h" x1="213.219" y1="721.704" x2="251.313" y2="683.61" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d7d7d7"/><stop offset=".485" stop-color="#fafafa"/><stop offset="1" stop-color="#fafafa"/></linearGradient><linearGradient id="i" x1="724.813" y1="821.718" x2="768.656" y2="777.876" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fafafa"/></linearGradient><linearGradient id="a" x1="513.493" y1="714.594" x2="471.007" y2="544.188" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#999"/><stop offset="1" stop-color="#ccc"/></linearGradient><linearGradient id="b" x1="440.156" y1="564.031" x2="508.594" y2="495.594" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="l" x1="660.988" y1="754.156" x2="608.637" y2="544.188" xlink:href="#a"/><linearGradient id="m" x1="479.188" y1="774.219" x2="649.782" y2="603.625" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#b3b3b3"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="n" x1="447.121" y1="774.219" x2="394.661" y2="563.813" xlink:href="#a"/><linearGradient id="o" x1="494" y1="597" x2="628" y2="463" xlink:href="#b"/><linearGradient id="d" x1="610.485" y1="604.938" x2="697.298" y2="518.125" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fff"/></linearGradient><linearGradient id="p" x1="457.438" y1="619.25" x2="353.469" y2="619.25" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e6e6e6" stop-opacity="0"/><stop offset="1" stop-color="#e6e6e6"/></linearGradient><linearGradient id="q" x1="542.734" y1="674.25" x2="615.672" y2="601.313" xlink:href="#b"/><linearGradient id="c" x1="627.933" y1="358.938" x2="685.192" y2="422.531" gradientUnits="userSpaceOnUse"><stop offset=".4" stop-color="#e6e6e6" stop-opacity=".4"/><stop offset=".443" stop-color="#fff"/><stop offset=".6" stop-color="#ccc"/></linearGradient><linearGradient id="r" x1="618.547" y1="422.531" x2="681.547" y2="359.531" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e6e6e6"/><stop offset=".761" stop-color="#fff"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="s" x1="625" y1="441.5" x2="697" y2="369.5" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset=".761" stop-color="#fff"/><stop offset="1" stop-color="#f0f0f0"/></linearGradient><linearGradient id="t" x1="627.681" y1="361.438" x2="692.257" y2="433.156" xlink:href="#c"/><linearGradient id="u" x1="561.414" y1="735.438" x2="573.149" y2="688.375" xlink:href="#d"/><linearGradient id="v" x1="405" y1="485.875" x2="440" y2="450.875" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset="1" stop-color="#fff" stop-opacity=".702"/></linearGradient><linearGradient id="w" x1="404.61" y1="486.906" x2="441.86" y2="449.656" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ccc"/><stop offset=".495" stop-color="#ccc" stop-opacity=".702"/><stop offset=".498" stop-color="#ccc"/><stop offset="1" stop-color="#fff" stop-opacity=".302"/></linearGradient><radialGradient id="e" cx="329.297" cy="647.578" r="8.172" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fafafa"/><stop offset="1.2" stop-color="#e6e6e6"/></radialGradient><radialGradient id="j" cx="802.297" cy="673.578" r="8.172" xlink:href="#e"/><radialGradient id="k" cx="774.844" cy="642.75" r="5.531" xlink:href="#e"/></defs><path d="M512.33 666.07c441.828 0 800 358.18 800 800.03s-358.172 800.02-800 800.02-800-358.18-800-800.02 358.17-800.03 800-800.03z" style="fill:url(#f);fill-rule:evenodd"/><path d="m272 694 242-82 131 119-188 43z" style="fill:url(#g);fill-rule:evenodd"/><path fill="#b3b3b3" fill-rule="evenodd" d="M232.391 723.534a2.4 2.4 0 0 1 2.4 2.4v17.725a2.4 2.4 0 0 1-4.8 0v-17.725a2.4 2.4 0 0 1 2.4-2.4z"/><path d="M232.255 676.559c10.33 0 17.067 15.408 18.7 28.493 1.619 12.942-2.372 23.694-18.7 23.694-16.878 0-20.213-10.733-18.7-23.694 1.633-14.061 8.37-28.493 18.7-28.493z" style="fill:url(#h);fill-rule:evenodd"/><path fill="#b3b3b3" fill-rule="evenodd" d="M745.853 826h.938a2.4 2.4 0 0 1 2.4 2.4v22.238a2.4 2.4 0 0 1-2.4 2.4h-.938a2.4 2.4 0 0 1-2.4-2.4V828.4a2.4 2.4 0 0 1 2.4-2.4z"/><path d="M746.727 830.3c-19.438 0-23.278-9.326-21.541-20.59a34.467 34.467 0 0 1 3.289-10.369 16.628 16.628 0 0 1 0-9.112c2.889-12.327 12.059-20.911 18.356-20.911 6.56 0 15.468 9.1 18.356 20.911a14.589 14.589 0 0 1-.335 9.217 34.36 34.36 0 0 1 3.419 10.264c1.861 11.243-2.735 20.59-21.544 20.59z" style="fill:url(#i);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M328.841 654.562a6.571 6.571 0 0 0-5.2-5.027q-4.107-.952-.034-2.045a6.571 6.571 0 0 0 5.027-5.2q.952-4.109 2.045-.035a6.569 6.569 0 0 0 5.2 5.027q4.109.954.035 2.045a6.569 6.569 0 0 0-5.027 5.2q-.955 4.108-2.046.035z"/><path d="M328.383 653.73a6.567 6.567 0 0 0-5.2-5.027q-4.109-.954-.035-2.045a6.568 6.568 0 0 0 5.027-5.2q.954-4.107 2.046-.034a6.568 6.568 0 0 0 5.2 5.027q4.107.952.035 2.045a6.568 6.568 0 0 0-5.027 5.2q-.954 4.104-2.046.034z" style="fill:url(#e);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M801.841 680.562a6.571 6.571 0 0 0-5.2-5.027q-4.107-.952-.034-2.045a6.571 6.571 0 0 0 5.027-5.2q.952-4.109 2.045-.035a6.569 6.569 0 0 0 5.2 5.027q4.108.954.035 2.045a6.569 6.569 0 0 0-5.027 5.2q-.955 4.108-2.046.035z"/><path d="M801.383 679.73a6.567 6.567 0 0 0-5.2-5.027q-4.108-.954-.035-2.045a6.568 6.568 0 0 0 5.027-5.2q.954-4.107 2.046-.034a6.568 6.568 0 0 0 5.2 5.027q4.107.952.035 2.045a6.568 6.568 0 0 0-5.027 5.2q-.954 4.104-2.046.034z" style="fill:url(#j);fill-rule:evenodd"/><path d="M774.21 646.9a4.446 4.446 0 0 0-3.517-3.4q-2.778-.643-.023-1.383a4.443 4.443 0 0 0 3.4-3.517q.645-2.778 1.383-.023a4.443 4.443 0 0 0 3.517 3.4q2.778.645.023 1.383a4.446 4.446 0 0 0-3.4 3.517q-.645 2.78-1.383.023z" style="fill:url(#k);fill-rule:evenodd"/><path d="m385.6 714.6.158-150.658L598.9 544.174l-.158 150.658z" style="fill:url(#a);fill-rule:evenodd"/><path d="m385.474 564.031 214.763-19.383-36.171-49.067-215.559 17.634z" style="fill:url(#b);fill-rule:evenodd"/><path d="m598.744 694.832.156-150.658 71.975 59.319-.158 150.658z" style="fill:url(#l);fill-rule:evenodd"/><path d="m457.064 774.209.158-150.658 214.691-19.914-.158 150.663z" style="fill:url(#m);fill-rule:evenodd"/><path d="m384.566 714.459.158-150.659 72.5 59.75-.158 150.658z" style="fill:url(#n);fill-rule:evenodd"/><path d="M494 640s75.357-58.4 42-83-38.887 1.663-37 14 53.847 12.465 54-26c.2-49.979 75-125 75-125" style="fill:none;stroke-width:3px;stroke-dasharray:12 6;stroke:url(#o);fill-rule:evenodd"/><path d="m670.275 604.939-72.041-59.9 38.476-26.909 72.86 58.159z" style="fill:url(#d);fill-rule:evenodd"/><path d="m425.5 674.383-72.042-59.9 31.109-50.347 72.86 58.16z" style="fill:url(#p);fill-rule:evenodd"/><path d="m487.918 674.235 214.482-22.57-31.1-50.346-215.309 20.833z" style="fill:url(#q);fill-rule:evenodd"/><path style="fill:#fff;fill-rule:evenodd" d="m697.363 358.927-69.58 62.511-12.035 1.082z"/><path d="m697.363 358.927-69.58 62.511-12.035 1.082z" style="fill:url(#c);fill-rule:evenodd"/><path d="M615.748 422.52 604 413l92.089-53.46" style="fill:url(#r);fill-rule:evenodd"/><path d="m625 432 12 18 60-89" style="fill:url(#s);fill-rule:evenodd"/><path d="m626.98 421.335-2.471 11.828 70.918-71.735" style="fill:#fff;fill-rule:evenodd"/><path d="m626.98 421.335-2.471 11.828 70.918-71.735" style="fill:url(#t);fill-rule:evenodd"/><path d="m494.814 735.44 21.293-2.1v-6.613l-13.4 1.319v-6.965l10.977-1.08v-6.613l-10.977 1.08v-6.084l12.917-1.27v-6.525l-20.808 2.047v32.8zM521 732.863l7.054-.694v-11.241a106.361 106.361 0 0 0-1.014-11.274l.176-.017 2.645 7.586 4.453 11.553 4.32-.425 4.408-12.424 2.733-8.116.177-.018a111.811 111.811 0 0 0-1.014 11.474v11.241l7.185-.707V697l-8.552.841-5.025 14.646c-.618 1.956-1.147 4.08-1.808 6.173l-.22.022c-.617-1.968-1.146-3.987-1.808-5.818l-5.2-13.639-8.508.837v32.8zm37.213-3.661 7.891-.776v-10.889l3.835-.377c6.922-.681 12.961-4.714 12.961-12.517 0-8.111-5.951-10.082-13.181-9.371l-11.504 1.128v32.8zm7.891-17.881v-9.478l3.218-.316c3.792-.373 5.908.565 5.908 3.871 0 3.218-1.852 5.208-5.687 5.585zM594 725.682l7.891-.777v-26.274l8.905-.876v-6.524l-25.657 2.524v6.524l8.861-.871v26.274zm27.991-2.754 7.847-.772v-11.594l9.919-22.18-8.244.811-2.733 7.542c-.925 2.56-1.807 4.939-2.733 7.587l-.176.018c-.926-2.466-1.764-4.676-2.645-7.058l-2.734-7-8.375.824 9.874 20.233v11.594z" style="fill:url(#u);fill-rule:evenodd"/><path fill="#ccc" fill-rule="evenodd" d="M408.938 457.309a17.5 17.5 0 0 0 21.374 26.725 17.5 17.5 0 1 1-16.306-30.955 17.442 17.442 0 0 0-5.068 4.23z"/><circle cx="422.5" cy="468.375" r="17.5" style="fill:url(#v)"/><path fill="#ccc" fill-rule="evenodd" d="M391.76 451.5c-2.358 4.419 9.827 15.52 27.215 24.8 15.131 8.071 29.212 12.1 34.166 10.093-4.191 2.772-18.943-1.24-34.86-9.73-17.388-9.275-29.573-20.376-27.215-24.8a2.96 2.96 0 0 1 1.585-1.3 2.606 2.606 0 0 0-.891.937z"/><path d="M418.975 476.29c-17.388-9.275-29.573-20.376-27.215-24.8s18.363-.484 35.751 8.791 29.572 20.376 27.215 24.8-18.364.483-35.751-8.791zm31.634 5.732c1.824-3.42-8.789-12.642-23.7-20.6s-28.486-11.633-30.31-8.213 8.789 12.642 23.7 20.6 28.486 11.633 30.31 8.213zm-36.645-29.008-2.775 1.452.032 1.751 28.637 14.183.266-4.559z" style="fill:url(#w);fill-rule:evenodd"/><g class="people"><path style="fill:#f8cfad;fill-rule:evenodd" d="m612.131 676.5 1.362 3.532 3.255-2.324-1.361-3.532zM629.131 665.5l1.362 3.532 3.255-2.324-1.361-3.532z"/><path style="fill:#141a33;fill-rule:evenodd" d="m617.764 678.184-3.162-.078a11.028 11.028 0 0 0-1.034 3.454c-.258 2.006-1.177 5-.449 5.367 1.5 2.659 4.118-.215 4.118-.215s2.187-2.848 1.925-5.265c-.106-.973-1.181-1.869-1.398-3.263zM633.781 665.855l3.019.945a11.008 11.008 0 0 1-.137 3.6c-.4 1.981-.179 4.166-.986 4.277-2.283 2.03-3.827-1.533-3.827-1.533s-1.473-2.456-.444-4.659c.412-.88 1.718-1.385 2.375-2.63z"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M599.935 592.534s10.293 9.761 11.95 7.564 3.536-3.463-6.758-13.65z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M611.3 596.361c1.674-1.105 11.5 7.048 14.5 11.774s-12.705-4.36-14.632-6.776-1.54-3.893.132-4.998z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M621.815 607.988s1.809 2.549 2.433 1.756 2.475-1.064 2.449-1.138.1-.819 1.288-2.331-3.8-3.632-5.81-.494a2.556 2.556 0 0 0-.36 2.207z"/><path fill="#232c57" fill-rule="evenodd" d="M598 617s14.968-5.618 17 7a150.235 150.235 0 0 1 2 22s12.666 11.836 16 19c0 0-4.753-1.629-4 2 0 0-18.132-14.647-19-19s-9.148-18.716-12-31z"/><path d="M589 622s14.968-5.618 17 7a150.235 150.235 0 0 1 2 22s4.666 17.836 8 25c0 0-4.753-1.629-4 2 0 0-10.132-20.647-11-25s-9.148-18.716-12-31z" style="fill:#292966;fill-rule:evenodd"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M585.626 597.7s-10.292 9.761-11.95 7.563-3.536-3.463 6.758-13.65z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M574.259 601.529c-1.675-1.105-11.5 7.049-14.5 11.774s12.7-4.36 14.631-6.775 1.543-3.894-.131-4.999z"/><path style="fill:#f0c5a8;fill-rule:evenodd" d="M591.715 577.752s-.606 1.681 1.48 3.716-3.615 5.307-4.645 2.85-.48-2.716-.48-2.716z"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M583.527 574.123c-.839 1.043.491 3.873 1.453 5.449s2.749 2.833 3.364 2.428 4.088-2.657 4-4-.228-3.4-.228-3.4 2.562-1.641 2.154-2.916-2.916-.154-2.916-.154a15.853 15.853 0 0 0-.227-2.224c-.189-.929-6.887-1.445-7.827 2.6s.558 1.805.227 2.217z"/><path fill="#232c57" fill-rule="evenodd" d="M584.227 567.758c2.1-.885 7.2-3.684 10.125.318s.842 4.385.989 5.294-1.894 5.69-1.341 6.63-3.865.8-4.657-1.179-2.844-.539-2.227-1.224-1.3-4.456-2.916-2.154a9.252 9.252 0 0 0 .309-1.38c-.115.192.259-3.257-.673-1.32s-2.1 1.037-3.069.762-1.8-1.118-1.071-1.689c.023-.016 2.436-3.172 4.531-4.058z"/><path d="M589 585c-2.584-.47-10.055.362-13 13 0 0 1.9 3.349 5 4s6 21 6 21 24.016 11.06 27-3c-.07-13.826-8-21-8-21s5.829-3.2 5-6-8.016-10.153-11-10-6 0-6 0-2.416 2.47-5 2z" style="fill:#f6bb07;fill-rule:evenodd"/><path style="fill:#f8cfad;fill-rule:evenodd" d="M563.284 612.581s-.986 2.965-1.814 2.389-2.678-.3-2.675-.374-.333-.755-1.912-1.854 2.577-4.583 5.414-2.167a2.551 2.551 0 0 1 .987 2.006z"/></g>'
});
EmptyIcon.displayName = "EmptyIcon";
const LockIcon = () => h$4(u$4, { name: "lock" }, () => h$4("path", {
  d: "M787.168 952.268H236.832c-30.395 0-55.033-24.638-55.033-55.033V429.45c0-30.395 24.638-55.034 55.033-55.034h82.55V264.35c0-106.38 86.238-192.618 192.618-192.618S704.618 157.97 704.618 264.35v110.066h82.55c30.395 0 55.033 24.639 55.033 55.034v467.785c0 30.395-24.639 55.033-55.033 55.033zM484.483 672.046v115.122h55.034V672.046c31.99-11.373 55.033-41.605 55.033-77.496 0-45.592-36.958-82.55-82.55-82.55s-82.55 36.958-82.55 82.55c0 35.89 23.042 66.123 55.033 77.496zM622.067 264.35c0-60.788-49.28-110.067-110.067-110.067s-110.067 49.28-110.067 110.067v110.066h220.135V264.35z"
}));
LockIcon.displayName = "LockIcon";
const articleItem = "";
const ArticleItem = defineComponent({
  name: "ArticleItem",
  props: {
    /**
     * Article information
     *
     * 文章信息
     */
    info: {
      type: Object,
      required: true
    },
    /**
     * Article path
     *
     * 文章路径
     */
    path: { type: String, required: true }
  },
  slots: Object,
  setup(props, { slots }) {
    const articleInfo = toRef$1(props, "info");
    const { info: pageInfo2, items } = useArticleInfo(props);
    return () => {
      var _a2, _b2, _c;
      const { [ArticleInfoType.title]: title, [ArticleInfoType.type]: type, [ArticleInfoType.isEncrypted]: isEncrypted = false, [ArticleInfoType.cover]: cover, [ArticleInfoType.excerpt]: excerpt, [ArticleInfoType.sticky]: sticky } = articleInfo.value;
      const info = pageInfo2.value;
      return h$4("div", { class: "vp-article-wrapper" }, h$4("article", {
        class: "vp-article-item",
        vocab: "https://schema.org/",
        typeof: "Article"
      }, [
        ((_a2 = slots.cover) == null ? void 0 : _a2.call(slots, { cover })) || (cover ? [
          h$4("img", {
            class: "vp-article-cover",
            src: withBase(cover)
          }),
          h$4("meta", {
            property: "image",
            content: withBase(cover)
          })
        ] : []),
        sticky ? h$4(StickyIcon) : null,
        h$4(j$1, { to: props.path }, () => {
          var _a3;
          return ((_a3 = slots.title) == null ? void 0 : _a3.call(slots, { title, isEncrypted, type })) || h$4("header", { class: "vp-article-title" }, [
            isEncrypted ? h$4(LockIcon) : null,
            type === PageType.slide ? h$4(SlideIcon) : null,
            h$4("span", { property: "headline" }, title)
          ]);
        }),
        ((_b2 = slots.excerpt) == null ? void 0 : _b2.call(slots, { excerpt })) || (excerpt ? h$4("div", {
          class: "vp-article-excerpt",
          innerHTML: excerpt
        }) : null),
        h$4("hr", { class: "vp-article-hr" }),
        ((_c = slots.info) == null ? void 0 : _c.call(slots, { info })) || h$4(PageInfo, {
          info,
          ...items.value ? { items: items.value } : {}
        })
      ]));
    };
  }
});
const message = "";
const pagination = "";
const Pagination = defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pagination",
  props: {
    /**
     * Number of total items
     *
     * 项目总数
     */
    total: { type: Number, default: 10 },
    /**
     * Items per page
     *
     * 每页项目数
     */
    perPage: { type: Number, default: 10 },
    /**
     * Current page number
     *
     * 当前页面
     */
    current: { type: Number, default: 1 }
  },
  emits: ["updateCurrentPage"],
  setup(props, { emit: emit2 }) {
    let message2;
    const themeLocale = useThemeLocaleData();
    const input = ref("");
    const locale = computed(() => themeLocale.value.paginationLocales);
    const totalPages = computed(() => Math.ceil(props.total / props.perPage));
    const enable = computed(() => Boolean(totalPages.value) && totalPages.value !== 1);
    const displayLeftEllipsis = computed(() => {
      if (totalPages.value < 7)
        return false;
      return props.current > 4;
    });
    const displayRightEllipsis = computed(() => {
      if (totalPages.value < 7)
        return false;
      return props.current < totalPages.value - 3;
    });
    const indexes = computed(() => {
      const { current: currentPage } = props;
      let min = 1;
      let max2 = totalPages.value;
      const arr = [];
      if (totalPages.value >= 7) {
        if (currentPage <= 4 && currentPage < totalPages.value - 3) {
          min = 1;
          max2 = 5;
        } else if (currentPage > 4 && currentPage >= totalPages.value - 3) {
          max2 = totalPages.value;
          min = totalPages.value - 4;
        } else if (totalPages.value > 7) {
          min = currentPage - 2;
          max2 = currentPage + 2;
        }
      }
      for (let i2 = min; i2 <= max2; i2++)
        arr.push(i2);
      return arr;
    });
    const navigate = (page2) => emit2("updateCurrentPage", page2);
    const jumpPage = (index2) => {
      const pageNum = parseInt(index2);
      if (pageNum <= totalPages.value && pageNum > 0)
        navigate(pageNum);
      else
        message2.pop(`<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M64 512a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#FA5151"/><path d="m557.3 512 113.1-113.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L512 466.7 398.9 353.6c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L466.7 512 353.6 625.1c-12.5 12.5-12.5 32.8 0 45.3 6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4L512 557.3l113.1 113.1c6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4c12.5-12.5 12.5-32.8 0-45.3L557.3 512z" fill="#FFF"/></svg>${locale.value.errorText.replace(/\$page/g, totalPages.value.toString())}`);
    };
    onMounted(() => {
      message2 = new De();
    });
    return () => h$4("div", { class: "vp-pagination" }, enable.value ? h$4("div", { class: "vp-pagination-list" }, [
      h$4("div", { class: "vp-pagination-number " }, [
        // prev button
        props.current > 1 ? h$4("div", {
          class: "prev",
          role: "navigation",
          unselectable: "on",
          onClick: () => navigate(props.current - 1)
        }, locale.value.prev) : null,
        // left ellipsis
        displayLeftEllipsis.value ? [
          h$4("div", {
            role: "navigation",
            onClick: () => navigate(1)
          }, 1),
          h$4("div", { class: "ellipsis" }, "...")
        ] : null,
        // numbers
        indexes.value.map((num) => h$4("div", {
          key: num,
          class: { active: props.current === num },
          role: "navigation",
          onClick: () => navigate(num)
        }, num)),
        // right ellipsis
        displayRightEllipsis.value ? [
          h$4("div", { class: "ellipsis" }, "..."),
          h$4("div", {
            role: "navigation",
            onClick: () => navigate(totalPages.value)
          }, totalPages.value)
        ] : null,
        // next button
        props.current < totalPages.value ? h$4("div", {
          class: "next",
          role: "navigation",
          unselectable: "on",
          onClick: () => navigate(props.current + 1)
        }, locale.value.next) : null
      ]),
      h$4("div", { class: "vp-pagination-nav" }, [
        h$4("label", { for: "navigation-text" }, `${locale.value.navigate}: `),
        h$4("input", {
          id: "navigation-text",
          value: input.value,
          onInput: ({ target }) => {
            input.value = target.value;
          },
          onKeydown: (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              jumpPage(input.value);
            }
          }
        }),
        h$4("button", {
          class: "vp-pagination-button",
          role: "navigation",
          title: locale.value.action,
          onClick: () => jumpPage(input.value)
        }, locale.value.action)
      ])
    ]) : []);
  }
});
const articleList = "";
const ArticleList = defineComponent({
  name: "ArticleList",
  props: {
    /**
     * Articles
     *
     * 文章项目
     */
    items: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const blogOptions = useBlogOptions();
    const currentPage = ref(1);
    const articlePerPage = computed(() => blogOptions.value.articlePerPage || 10);
    const currentArticles = computed(() => props.items.slice((currentPage.value - 1) * articlePerPage.value, currentPage.value * articlePerPage.value));
    const updatePage = (page2) => {
      currentPage.value = page2;
      const query = { ...route.query };
      if (query["page"] === page2.toString() || page2 === 1 && !query["page"])
        return;
      if (page2 === 1)
        delete query["page"];
      else
        query["page"] = page2.toString();
      void router.push({ path: route.path, query });
    };
    onMounted(() => {
      const { page: page2 } = route.query;
      updatePage(page2 ? Number(page2) : 1);
      void __vitePreload(() => import(
        /* webpackChunkName: "pageview" */
        "./pageview-90ac9aca.js"
      ), true ? [] : void 0).then(({ updatePageview }) => {
        updatePageview();
      });
      watch(currentPage, () => {
        const distance = document.querySelector("#article-list").getBoundingClientRect().top + window.scrollY;
        setTimeout(() => {
          window.scrollTo(0, distance);
        }, 100);
      });
      watch(() => route.query, ({ page: page3 }) => {
        updatePage(page3 ? Number(page3) : 1);
      });
    });
    return () => h$4("div", { id: "article-list", class: "vp-article-list" }, currentArticles.value.length ? [
      ...currentArticles.value.map(({ info, path }, index2) => h$4(DropTransition, { appear: true, delay: index2 * 0.04 }, () => h$4(ArticleItem, { key: path, info, path }))),
      h$4(Pagination, {
        current: currentPage.value,
        perPage: articlePerPage.value,
        total: props.items.length,
        onUpdateCurrentPage: updatePage
      })
    ] : h$4(EmptyIcon));
  }
});
const categoryList = "";
const CategoryList = defineComponent({
  name: "CategoryList",
  setup() {
    const page2 = usePageData();
    const categoryMap2 = useCategoryMap();
    return () => h$4("ul", { class: "vp-category-list" }, M$4(categoryMap2.value.map).map(([category, { path, items }]) => h$4("li", {
      class: [
        "vp-category",
        // TODO: magic number 9 is tricky here
        `vp-category${he(category, 9)}`,
        { active: path === page2.value.path }
      ]
    }, h$4(j$1, { to: path }, () => [
      category,
      h$4("span", { class: "count" }, items.length)
    ]))));
  }
});
const tagList = "";
const TagList = defineComponent({
  name: "TagList",
  setup() {
    const frontmatter = usePageFrontmatter();
    const tagMap = useTagMap();
    const isActive = (name) => {
      var _a2;
      return name === ((_a2 = frontmatter.value.blog) == null ? void 0 : _a2.name);
    };
    return () => h$4("ul", { class: "tag-list-wrapper" }, M$4(tagMap.value.map).map(([tag, { path, items }]) => h$4("li", {
      class: [
        "tag",
        // TODO: magic number 9 is tricky here
        `tag${he(tag, 9)}`,
        { active: isActive(tag) }
      ]
    }, h$4(j$1, { to: path }, () => [
      tag,
      h$4("span", { class: "tag-num" }, items.length)
    ]))));
  }
});
const timelineList = "";
const TimelineList = defineComponent({
  name: "TimelineList",
  setup() {
    const themeLocale = useThemeLocaleData();
    const timelines = useTimelines();
    const navigate = useNavigate();
    const hint = computed(() => themeLocale.value.blogLocales.timeline);
    return () => h$4("div", { class: "timeline-list-wrapper" }, [
      h$4("div", {
        class: "timeline-list-title",
        onClick: () => navigate(timelines.value.path)
      }, [
        h$4(TimelineIcon),
        h$4("span", { class: "num" }, timelines.value.items.length),
        hint.value
      ]),
      h$4("hr"),
      h$4("div", { class: "timeline-content" }, h$4("ul", { class: "timeline-list" }, timelines.value.config.map(({ year, items }, index2) => h$4(DropTransition, { appear: true, delay: 0.08 * (index2 + 1) }, () => h$4("li", [
        h$4("h3", { class: "timeline-year" }, year),
        h$4("ul", { class: "timeline-year-wrapper" }, items.map(({ date, info, path }) => h$4("li", { class: "timeline-item" }, [
          h$4("span", { class: "timeline-date" }, date),
          h$4(j$1, { class: "timeline-title", to: path }, () => info[ArticleInfoType.title])
        ])))
      ])))))
    ]);
  }
});
const infoList = "";
const InfoList = defineComponent({
  name: "InfoList",
  setup() {
    const themeLocale = useThemeLocaleData();
    const articles = useArticles();
    const categoryMap2 = useCategoryMap();
    const categoryNumber = computed(() => f$4(categoryMap2.value.map).length);
    const stars = useStars();
    const tagMap = useTagMap();
    const tagNumber = computed(() => f$4(tagMap.value.map).length);
    const navigate = useNavigate();
    const active = ref("article");
    const locale = computed(() => themeLocale.value.blogLocales);
    const buttons = [
      ["article", ArticleIcon],
      ["category", CategoryIcon],
      ["tag", TagIcon],
      ["timeline", TimelineIcon]
    ];
    return () => h$4("div", { class: "vp-blog-infos" }, [
      h$4("div", { class: "vp-blog-type-switcher" }, buttons.map(([key, icon]) => h$4("button", {
        type: "button",
        class: "vp-blog-type-button",
        onClick: () => {
          active.value = key;
        }
      }, h$4("div", {
        class: ["icon-wrapper", { active: active.value === key }],
        "aria-label": locale.value[key],
        "data-balloon-pos": "up"
      }, h$4(icon))))),
      h$4(DropTransition, () => (
        // article
        active.value === "article" ? h$4("div", { class: "vp-sticky-article-wrapper" }, [
          h$4("div", {
            class: "title",
            onClick: () => navigate(articles.value.path)
          }, [
            h$4(ArticleIcon),
            h$4("span", { class: "num" }, articles.value.items.length),
            locale.value.article
          ]),
          h$4("hr"),
          h$4("ul", { class: "vp-sticky-articles" }, stars.value.items.map(({ info, path }, index2) => h$4(DropTransition, { appear: true, delay: 0.08 * (index2 + 1) }, () => h$4("li", { class: "vp-sticky-article" }, h$4(j$1, { to: path }, () => info[ArticleInfoType.title])))))
        ]) : active.value === "category" ? h$4("div", { class: "vp-category-wrapper" }, [
          categoryNumber.value ? h$4("div", {
            class: "title",
            onClick: () => navigate(categoryMap2.value.path)
          }, [
            h$4(CategoryIcon),
            h$4("span", { class: "num" }, categoryNumber.value),
            locale.value.category
          ]) : null,
          h$4("hr"),
          h$4(DropTransition, { delay: 0.04 }, () => h$4(CategoryList))
        ]) : active.value === "tag" ? h$4("div", { class: "vp-tag-wrapper" }, [
          tagNumber.value ? h$4("div", {
            class: "title",
            onClick: () => navigate(tagMap.value.path)
          }, [
            h$4(TagIcon),
            h$4("span", { class: "num" }, tagNumber.value),
            locale.value.tag
          ]) : null,
          h$4("hr"),
          h$4(DropTransition, { delay: 0.04 }, () => h$4(TagList))
        ]) : h$4(DropTransition, () => h$4(TimelineList))
      ))
    ]);
  }
});
const page = "";
const BlogWrapper = defineComponent({
  name: "BlogWrapper",
  slots: Object,
  setup(_props, { slots }) {
    const { isMobile } = useWindowSize();
    return () => [
      h$4(SkipLink),
      h$4(CommonWrapper, { noSidebar: true, noToc: true }, {
        default: () => slots.default(),
        navScreenBottom: () => h$4(BloggerInfo),
        ...isMobile.value ? { sidebar: () => h$4(InfoList) } : {}
      })
    ];
  }
});
const infoPanel = "";
const InfoPanel = () => h$4("aside", { class: "vp-blog-info-wrapper" }, [
  h$4(DropTransition, () => h$4(BloggerInfo)),
  h$4(DropTransition, { delay: 0.04 }, () => h$4(InfoList))
]);
InfoPanel.displayName = "InfoPanel";
const BlogCategory = defineComponent({
  name: "BlogPage",
  components: {
    CategoryList,
    TagList
  },
  setup() {
    const page2 = usePageData();
    const frontmatter = usePageFrontmatter();
    const categoryMap2 = useCategoryMap();
    const tagMap = useTagMap();
    const blogOptions = computed(() => frontmatter.value.blog || {});
    const componentName = computed(() => {
      const { key = "" } = blogOptions.value;
      return key === "category" ? "CategoryList" : key === "tag" ? "TagList" : null;
    });
    const items = computed(() => {
      const { name = "", key = "" } = blogOptions.value;
      return key === "category" ? name ? categoryMap2.value.map[name].items : [] : key === "tag" ? name ? tagMap.value.map[name].items : [] : [];
    });
    return () => h$4(BlogWrapper, () => h$4("div", { class: "vp-page vp-blog" }, h$4("div", { class: "blog-page-wrapper" }, [
      h$4("main", { id: "main-content", class: "vp-blog-main" }, [
        h$4(DropTransition, () => componentName.value ? h$4(resolveComponent(componentName.value)) : null),
        blogOptions.value.name ? h$4(DropTransition, { appear: true, delay: 0.24 }, () => h$4(ArticleList, { key: page2.value.path, items: items.value })) : null
      ]),
      h$4(DropTransition, { delay: 0.16 }, () => h$4(InfoPanel, { key: "blog" }))
    ])));
  }
});
const defaultHeroBgImagePath = "/space/assets/hero-197a9d2d.jpg";
const blogHero = "";
const BlogHero = defineComponent({
  name: "BlogHero",
  slots: Object,
  setup(_props, { slots }) {
    const frontmatter = usePageFrontmatter();
    const siteLocale = useSiteLocaleData();
    const hero = shallowRef();
    const isFullScreen = computed(() => frontmatter.value.heroFullScreen ?? false);
    const heroInfo2 = computed(() => {
      const { heroText, heroImage, heroImageDark, heroAlt, heroImageStyle, tagline } = frontmatter.value;
      return {
        text: heroText ?? siteLocale.value.title ?? "Hello",
        image: heroImage ? withBase(heroImage) : null,
        imageDark: heroImageDark ? withBase(heroImageDark) : null,
        heroStyle: heroImageStyle,
        alt: heroAlt || heroText || "hero image",
        tagline: tagline ?? "",
        isFullScreen: isFullScreen.value
      };
    });
    const bgInfo = computed(() => {
      const { bgImage, bgImageDark, bgImageStyle } = frontmatter.value;
      return {
        image: isString(bgImage) ? withBase(bgImage) : bgImage === false ? null : defaultHeroBgImagePath,
        imageDark: isString(bgImageDark) ? withBase(bgImageDark) : null,
        bgStyle: bgImageStyle,
        isFullScreen: isFullScreen.value
      };
    });
    return () => {
      var _a2, _b2;
      return frontmatter.value.hero === false ? null : h$4("div", {
        ref: hero,
        class: [
          "vp-blog-hero",
          {
            fullscreen: isFullScreen.value,
            "no-bg": !bgInfo.value.image
          }
        ]
      }, [
        ((_a2 = slots.heroBg) == null ? void 0 : _a2.call(slots, bgInfo.value)) || [
          bgInfo.value.image ? h$4("div", {
            class: [
              "vp-blog-mask",
              { light: bgInfo.value.imageDark }
            ],
            style: [
              {
                background: `url(${bgInfo.value.image}) center/cover no-repeat`
              },
              bgInfo.value.bgStyle
            ]
          }) : null,
          bgInfo.value.imageDark ? h$4("div", {
            class: "vp-blog-mask dark",
            style: [
              {
                background: `url(${bgInfo.value.imageDark}) center/cover no-repeat`
              },
              bgInfo.value.bgStyle
            ]
          }) : null
        ],
        ((_b2 = slots.heroInfo) == null ? void 0 : _b2.call(slots, heroInfo2.value)) || [
          h$4(DropTransition, { appear: true, type: "group", delay: 0.04 }, () => [
            heroInfo2.value.image ? h$4("img", {
              key: "light",
              class: [
                "vp-blog-hero-image",
                { light: heroInfo2.value.imageDark }
              ],
              style: heroInfo2.value.heroStyle,
              src: heroInfo2.value.image,
              alt: heroInfo2.value.alt
            }) : null,
            heroInfo2.value.imageDark ? h$4("img", {
              key: "dark",
              class: "vp-blog-hero-image dark",
              style: heroInfo2.value.heroStyle,
              src: heroInfo2.value.imageDark,
              alt: heroInfo2.value.alt
            }) : null
          ]),
          h$4(DropTransition, { appear: true, delay: 0.08 }, () => heroInfo2.value.text ? h$4("h1", { class: "vp-blog-hero-title" }, heroInfo2.value.text) : null),
          h$4(DropTransition, { appear: true, delay: 0.12 }, () => heroInfo2.value.tagline ? h$4("p", {
            class: "vp-blog-hero-description",
            innerHTML: heroInfo2.value.tagline
          }) : null)
        ],
        heroInfo2.value.isFullScreen ? h$4("button", {
          type: "button",
          class: "slide-down-button",
          onClick: () => {
            window.scrollTo({
              top: hero.value.clientHeight,
              behavior: "smooth"
            });
          }
        }, [h$4(SlideDownIcon), h$4(SlideDownIcon)]) : null
      ]);
    };
  }
});
const projectPanel = "";
const AVAILABLE_PROJECT_TYPES = [
  "link",
  "article",
  "book",
  "project",
  "friend"
];
const ProjectPanel = defineComponent({
  name: "ProjectPanel",
  components: { ArticleIcon, BookIcon, FriendIcon, LinkIcon, ProjectIcon },
  setup() {
    const frontmatter = usePageFrontmatter();
    const pure = usePure();
    const navigate = useNavigate();
    const renderIcon = (icon = "", alt = "icon") => {
      if (AVAILABLE_PROJECT_TYPES.includes(icon))
        return h$4(resolveComponent(`${icon}-icon`));
      if (isLinkHttp(icon))
        return h$4("img", { class: "vp-project-image", src: icon, alt });
      if (Oe(icon))
        return h$4("img", {
          class: "vp-project-image",
          src: withBase(icon),
          alt
        });
      return h$4(HopeIcon, { icon });
    };
    return () => {
      var _a2;
      return ((_a2 = frontmatter.value.projects) == null ? void 0 : _a2.length) ? h$4("div", { class: "vp-project-panel" }, frontmatter.value.projects.map(({ icon, link, name, desc }, index2) => h$4("div", {
        class: [
          "vp-project-card",
          // TODO: magic number 9 is tricky here
          { [`project${index2 % 9}`]: !pure.value }
        ],
        onClick: () => navigate(link)
      }, [
        renderIcon(icon, name),
        h$4("div", { class: "vp-project-name" }, name),
        h$4("div", { class: "vp-project-desc" }, desc)
      ]))) : null;
    };
  }
});
const home = "";
const BlogHome$1 = defineComponent({
  name: "BlogHome",
  setup() {
    const articles = useArticles();
    return () => h$4("div", { class: "vp-page vp-blog" }, [
      h$4(BlogHero),
      h$4("div", { class: "blog-page-wrapper" }, [
        h$4("main", { id: "main-content", class: "vp-blog-main" }, [
          h$4(DropTransition, { appear: true, delay: 0.16 }, () => h$4(ProjectPanel)),
          h$4(DropTransition, { appear: true, delay: 0.24 }, () => h$4(ArticleList, { items: articles.value.items }))
        ]),
        h$4(DropTransition, { appear: true, delay: 0.16 }, () => h$4(InfoPanel, { key: "blog" }))
      ]),
      h$4(DropTransition, { appear: true, delay: 0.28 }, () => h$4(MarkdownContent))
    ]);
  }
});
const BlogHome = defineComponent({
  name: "BlogHome",
  setup() {
    return () => h$4(BlogWrapper, () => h$4(BlogHome$1));
  }
});
const articleType = "";
const ArticleType = defineComponent({
  name: "ArticleType",
  setup() {
    const page2 = usePageData();
    const localePath = useRouteLocale();
    const themeLocale = useThemeLocaleData();
    const articles = useArticles();
    const stars = useStars();
    const types = computed(() => {
      const locale = themeLocale.value.blogLocales;
      return [
        {
          text: locale.all,
          path: articles.value.path
        },
        { text: locale.star, path: stars.value.path },
        ...[].map(({ key, path }) => ({
          text: locale[key],
          path: path.replace(/^\//, localePath.value)
        }))
      ];
    });
    return () => h$4("ul", { class: "vp-article-type-wrapper" }, types.value.map((type) => h$4("li", {
      class: [
        "vp-article-type",
        { active: type.path === page2.value.path }
      ]
    }, h$4(j$1, { to: type.path }, () => type.text))));
  }
});
const BlogType = defineComponent({
  name: "BlogPage",
  setup() {
    const blogType = C();
    const frontmatter = usePageFrontmatter();
    const page2 = usePageData();
    const articles = useArticles();
    const stars = useStars();
    const items = computed(() => {
      const { key = "", type } = frontmatter.value.blog || {};
      return key === "star" ? stars.value.items : type === "type" && key ? blogType.value.items : articles.value.items;
    });
    return () => h$4(BlogWrapper, () => h$4("div", { class: "vp-page vp-blog" }, h$4("div", { class: "blog-page-wrapper" }, [
      h$4("main", { id: "main-content", class: "vp-blog-main" }, [
        h$4(DropTransition, () => h$4(ArticleType)),
        h$4(DropTransition, { appear: true, delay: 0.24 }, () => h$4(ArticleList, { key: page2.value.path, items: items.value }))
      ]),
      h$4(DropTransition, { delay: 0.16 }, () => h$4(InfoPanel, { key: "blog" }))
    ])));
  }
});
const timelineItems = "";
const TimelineItems = defineComponent({
  name: "TimelineItems",
  setup() {
    const blogOptions = useBlogOptions();
    const themeLocale = useThemeLocaleData();
    const timelines = useTimelines();
    const hint = computed(() => blogOptions.value.timeline || themeLocale.value.blogLocales.timelineTitle);
    const items = computed(() => timelines.value.config.map(({ year }) => ({
      title: year.toString(),
      level: 2,
      slug: year.toString(),
      children: []
    })));
    return () => h$4("div", { class: "timeline-wrapper" }, h$4("ul", { class: "timeline-content" }, [
      h$4(DropTransition, () => h$4("li", { class: "motto" }, hint.value)),
      h$4(TOC, { items: items.value }),
      timelines.value.config.map(({ year, items: items2 }, index2) => h$4(DropTransition, { appear: true, delay: 0.08 * (index2 + 1), type: "group" }, () => [
        h$4("h3", { key: "title", id: year, class: "timeline-year-title" }, h$4("span", year)),
        h$4("li", { key: "content", class: "timeline-year-list" }, [
          h$4("ul", { class: "timeline-year-wrapper" }, items2.map(({ date, info, path }) => h$4("li", { class: "timeline-item" }, [
            h$4("span", { class: "timeline-date" }, date),
            h$4(j$1, {
              class: "timeline-title",
              to: path
            }, () => info[ArticleInfoType.title])
          ])))
        ])
      ]))
    ]));
  }
});
const Timeline = defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Timeline",
  components: {
    ArticleType,
    CategoryList,
    TagList
  },
  setup() {
    return () => h$4(BlogWrapper, () => h$4("div", { class: "vp-page vp-blog" }, h$4("div", { class: "blog-page-wrapper" }, [
      h$4("main", { id: "main-content", class: "vp-blog-main" }, [
        h$4(DropTransition, { appear: true, delay: 0.24 }, () => h$4(TimelineItems))
      ]),
      h$4(DropTransition, { delay: 0.16 }, () => h$4(InfoPanel, { key: "blog" }))
    ])));
  }
});
const layout = "";
const slidePage = "";
var d = defineComponent({ name: "SlidePage", setup() {
  const a2 = useRouter(), o2 = ref(false), n2 = shallowRef(), s2 = () => {
    o2.value = !o2.value;
  }, e2 = () => {
    o2.value = false;
  }, u2 = () => {
    e2(), window.history.go(-1);
  }, i2 = () => {
    e2(), a2.push("/");
  };
  return onClickOutside(n2, e2), () => h$4("div", { class: "vp-reveal-page" }, [h$4(Content), h$4("div", { ref: n2, class: ["vp-reveal-menu", { active: o2.value }] }, [h$4("button", { type: "button", class: "menu-button", onClick: () => s2() }, h$4("span", { class: "icon" })), h$4("button", { type: "button", class: "back-button", onClick: () => u2() }, h$4(q$1)), h$4("button", { type: "button", class: "home-button", onClick: () => i2() }, h$4(a$3))])]);
} });
const index = "";
a$5(HopeIcon);
const clientConfig12 = defineClientConfig({
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;
    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();
      return scrollBehavior(...args);
    };
    injectDarkmode(app);
    app.component("HopeIcon", HopeIcon);
    app.component("VPLink", j$1);
    app.component("BloggerInfo", BloggerInfo);
  },
  setup: () => {
    setupDarkmode();
    setupSidebarItems();
    setupBlog();
  },
  layouts: {
    Layout,
    NotFound,
    BlogCategory,
    BlogHome,
    BlogType,
    Timeline,
    Slide: d
  }
});
const pwaEventSymbol = Symbol("pwaEvent");
const usePwaEvent = () => {
  const pwaEvent = inject(pwaEventSymbol);
  if (!pwaEvent) {
    throw new Error("usePwaEvent() is called without provider.");
  }
  return pwaEvent;
};
const useSkipWaiting = (registration) => {
  const worker = registration.waiting;
  if (!worker)
    return;
  const channel = new MessageChannel();
  worker.postMessage({ type: "SKIP_WAITING" }, [channel.port2]);
};
const swFilename = "service-worker.js";
const clientConfig13 = defineClientConfig({
  setup() {
    const log = (...args) => console.log("[@vuepress/plugin-pwa]", ...args);
    const event = mitt();
    provide(pwaEventSymbol, event);
    onMounted(async () => {
      const { register } = await __vitePreload(() => import("./index-27eac26f.js"), true ? [] : void 0);
      register(withBase(swFilename), {
        ready(registration) {
          log("Service worker is active.");
          event.emit("ready", registration);
        },
        registered(registration) {
          log("Service worker has been registered.");
          event.emit("registered", registration);
        },
        cached(registration) {
          log("Content has been cached for offline use.");
          event.emit("cached", registration);
        },
        updatefound(registration) {
          log("New content is downloading.");
          event.emit("updatefound", registration);
        },
        updated(registration) {
          log("New content is available, please refresh.");
          event.emit("updated", registration);
        },
        offline() {
          log("No internet connection found. App is running in offline mode.");
          event.emit("offline");
        },
        error(err2) {
          log("Error during service worker registration:", err2);
          event.emit("error", err2);
        }
      });
    });
  }
});
const vars = "";
const pwaPopup = "";
const PwaPopup = defineComponent({
  name: "PwaPopup",
  props: {
    locales: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  setup(props) {
    const event = usePwaEvent();
    const routeLocale = useRouteLocale();
    const locale = computed(() => props.locales[routeLocale.value] ?? {
      message: "New content is available.",
      buttonText: "Refresh"
    });
    const show = ref(false);
    const registration = ref(null);
    const onClick = () => {
      show.value = false;
      if (registration.value) {
        useSkipWaiting(registration.value);
        location.reload(true);
      }
    };
    event.on("updated", (reg) => {
      if (reg) {
        registration.value = reg;
        show.value = true;
      }
    });
    return () => h$4(Transition, {
      name: "pwa-popup"
    }, () => show.value ? h$4("div", {
      class: "pwa-popup"
    }, [
      locale.value.message,
      h$4("br"),
      h$4("button", {
        onClick
      }, locale.value.buttonText)
    ]) : null);
  }
});
const locales = { "/": { "message": "发现新内容可用", "buttonText": "刷新" } };
const clientConfig14 = defineClientConfig({
  rootComponents: [
    // wrap the `<PwaPopup />` component with plugin options
    defineComponent(() => {
      return () => h$4(PwaPopup, { locales });
    })
  ]
});
const useDocsearchHotkeyListener = (callback) => {
  const remove2 = useEventListener("keydown", (event) => {
    const isHotKeyBind = event.key === "k" && (event.ctrlKey || event.metaKey);
    const isSlashKey = event.key === "/";
    if (!isSlashKey && !isHotKeyBind) {
      return;
    }
    event.preventDefault();
    callback();
    remove2();
  });
};
const isSpecialClick = (event) => event.button === 1 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
const useDocsearchShim = () => {
  const router = useRouter();
  return {
    // render the hit component with custom `onClick` handler
    hitComponent: ({ hit, children }) => ({
      type: "a",
      ref: void 0,
      constructor: void 0,
      key: void 0,
      props: {
        href: hit.url,
        // handle `onClick` by `router.push`
        onClick: (event) => {
          if (isSpecialClick(event)) {
            return;
          }
          event.preventDefault();
          router.push(resolveRoutePathFromUrl(hit.url, "/space/"));
        },
        children
      },
      __v: null
    }),
    // navigation behavior triggered by `onKeyDown` internally
    navigator: {
      // when pressing Enter without metaKey
      navigate: ({ itemUrl }) => {
        router.push(resolveRoutePathFromUrl(itemUrl, "/space/"));
      }
    },
    // add search debounce
    transformSearchClient: (searchClient) => {
      const searchWithDebounce = r$5(searchClient.search, 500);
      return {
        ...searchClient,
        search: async (...args) => searchWithDebounce(...args)
      };
    }
  };
};
const getFacetFilters = (rawFacetFilters = [], lang) => [
  `lang:${lang}`,
  ...isArray$1(rawFacetFilters) ? rawFacetFilters : [rawFacetFilters]
];
const getSearchButtonTemplate = ({ buttonText = "Search", buttonAriaLabel = buttonText } = {}) => `<button type="button" class="DocSearch DocSearch-Button" aria-label="${buttonAriaLabel}"><span class="DocSearch-Button-Container"><svg width="20" height="20" class="DocSearch-Search-Icon" viewBox="0 0 20 20"><path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="DocSearch-Button-Placeholder">${buttonText}</span></span><span class="DocSearch-Button-Keys"><kbd class="DocSearch-Button-Key"><svg width="15" height="15" class="DocSearch-Control-Key-Icon"><path d="M4.505 4.496h2M5.505 5.496v5M8.216 4.496l.055 5.993M10 7.5c.333.333.5.667.5 1v2M12.326 4.5v5.996M8.384 4.496c1.674 0 2.116 0 2.116 1.5s-.442 1.5-2.116 1.5M3.205 9.303c-.09.448-.277 1.21-1.241 1.203C1 10.5.5 9.513.5 8V7c0-1.57.5-2.5 1.464-2.494.964.006 1.134.598 1.24 1.342M12.553 10.5h1.953" stroke-width="1.2" stroke="currentColor" fill="none" stroke-linecap="square"></path></svg></kbd><kbd class="DocSearch-Button-Key">K</kbd></span></button>`;
const POLL_INTERVAL = 16;
const pollToOpenDocsearch = () => {
  if (document.querySelector(".DocSearch-Modal"))
    return;
  const e2 = new Event("keydown");
  e2.key = "k";
  e2.metaKey = true;
  window.dispatchEvent(e2);
  setTimeout(pollToOpenDocsearch, POLL_INTERVAL);
};
const preconnectToAlgolia = (appId) => {
  const id = "algolia-preconnect";
  const rIC = window.requestIdleCallback || setTimeout;
  rIC(() => {
    if (document.head.querySelector(`#${id}`))
      return;
    const preconnect = document.createElement("link");
    preconnect.id = id;
    preconnect.rel = "preconnect";
    preconnect.href = `https://${appId}-dsn.algolia.net`;
    preconnect.crossOrigin = "";
    document.head.appendChild(preconnect);
  });
};
const optionsDefault = { "appId": "OD5D2HOUNL", "apiKey": "d7094b39ae7af9fb8a20a69f71609c8a", "indexName": "space", "searchParameters": {}, "locales": { "/": { "placeholder": "搜索文档", "translations": { "button": { "buttonText": "搜索文档" } } } } };
{
  __vitePreload(() => import("./style-18663bf8.js"), true ? [] : void 0);
  __vitePreload(() => import("./docsearch-cf1488f4.js"), true ? [] : void 0);
}
const Docsearch = defineComponent({
  name: "Docsearch",
  props: {
    containerId: {
      type: String,
      required: false,
      default: "docsearch-container"
    },
    options: {
      type: Object,
      required: false,
      default: () => optionsDefault
    }
  },
  setup(props) {
    const docsearchShim = useDocsearchShim();
    const lang = usePageLang();
    const routeLocale = useRouteLocale();
    const hasInitialized = ref(false);
    const hasTriggered = ref(false);
    const options = computed(() => {
      var _a2;
      return {
        ...props.options,
        ...(_a2 = props.options.locales) == null ? void 0 : _a2[routeLocale.value]
      };
    });
    const initialize = async () => {
      var _a2;
      const { default: docsearch } = await __vitePreload(() => import("./index-5a7e4a42.js"), true ? [] : void 0);
      docsearch({
        ...docsearchShim,
        ...options.value,
        container: `#${props.containerId}`,
        searchParameters: {
          ...options.value.searchParameters,
          facetFilters: getFacetFilters((_a2 = options.value.searchParameters) == null ? void 0 : _a2.facetFilters, lang.value)
        }
      });
      hasInitialized.value = true;
    };
    const trigger2 = () => {
      if (hasTriggered.value || hasInitialized.value)
        return;
      hasTriggered.value = true;
      initialize();
      pollToOpenDocsearch();
      watch(routeLocale, initialize);
    };
    useDocsearchHotkeyListener(trigger2);
    onMounted(() => preconnectToAlgolia(options.value.appId));
    return () => {
      var _a2;
      return [
        h$4("div", {
          id: props.containerId,
          style: { display: hasInitialized.value ? "block" : "none" }
        }),
        hasInitialized.value ? null : h$4("div", {
          onClick: trigger2,
          innerHTML: getSearchButtonTemplate((_a2 = options.value.translations) == null ? void 0 : _a2.button)
        })
      ];
    };
  }
});
const clientConfig15 = defineClientConfig({
  enhance({ app }) {
    app.component("Docsearch", Docsearch);
  }
});
const millisecondPerDay = 1e3 * 60 * 60 * 24;
const setupRunningTimeFooter = (date, locales2 = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "/": "Running time: :day days :hour hours :minute minutes :second seconds"
}, preserveContent = false) => {
  const initialTimeStamp = (date instanceof Date ? date : new Date(date)).getTime();
  let prevTimeText = "";
  const page2 = usePageData();
  const now2 = useNow();
  const routeLocale = useRouteLocale();
  const pastedTime = computed(() => {
    const passedTime = now2.value.getTime() - initialTimeStamp;
    const restDate = new Date(passedTime % millisecondPerDay);
    return {
      day: Math.floor(passedTime / millisecondPerDay),
      hour: restDate.getHours(),
      minute: restDate.getMinutes(),
      second: restDate.getSeconds()
    };
  });
  onMounted(() => {
    watch(() => [page2.value.path, pastedTime.value], () => {
      const footer2 = document.querySelector(".vp-footer");
      if (footer2) {
        const { day, hour, minute, second } = pastedTime.value;
        const localeText = (locales2[routeLocale.value] || locales2["/"]).replace(":day", day.toString()).replace(":hour", hour.toString()).replace(":minute", minute.toString()).replace(":second", second.toString());
        footer2.innerHTML = `${preserveContent ? `${footer2.innerHTML.replace(`<br>${prevTimeText}`, "")}<br>` : ""}${localeText}`;
        prevTimeText = localeText;
      }
    }, {
      flush: "post",
      immediate: true
    });
  });
};
const clientConfig16 = defineClientConfig({
  enhance({ app, router, siteData: siteData2 }) {
  },
  setup() {
    setupRunningTimeFooter(
      /* @__PURE__ */ new Date("2023-06-01"),
      {
        "/": "本网站已经运行了: <font color='#ff8c00' size='3.5em'>:day</font> 天 <font color='#ff8c00' size='3.5em'>:hour</font> 小时 <font color='#ff8c00' size='3.5em'>:minute</font> 分钟 <font color='#ff8c00' size='3.5em'>:second </font>秒",
        "/zh/": "已运行 :day 天 :hour 小时 :minute 分钟 :second 秒"
      },
      false
    );
  }
});
const clientConfigs = [
  clientConfig0,
  clientConfig1,
  clientConfig2,
  S$2,
  clientConfig4,
  clientConfig5,
  clientConfig6,
  C$2,
  Y$1,
  clientConfig9,
  M,
  clientConfig11,
  clientConfig12,
  clientConfig13,
  clientConfig14,
  clientConfig15,
  clientConfig16
];
const pagesRoutes = [
  ["v-8daa1a0e", "/", { "y": "h", "t": "博客主页", "i": "home" }, ["/index.html", "/README.md"]],
  ["v-184f4da6", "/intro.html", { "d": 1688710125e3, "v": "https://img.tucang.cc/api/image/show/6c8acb93bd0fc9dd85006746d572df8f", "e": "<h1> 介绍页</h1>\n<p>我所在的位置：中国河南省<br>\n联系方式：<br>\n🐧 QQ：1973749775</p>\n<p>📧邮箱:lhx110396@163.com</p>\n<p>💻目前在郑州工作</p>\n<p>👋 你好！我的介绍页<br>\n既然茫茫人海中你能来到我的个人主页，这也是一种邂逅! ✨</p>\n<p>我热衷于分享最新的科技趋势和创新的编程技巧，致力于让技术变得更加容易理解和应用。我相信技术可以改变世界，而我希望成为这个变革的一部分。🌍💪</p>\n<p>📚 在我的博客中，你将发现我对编程语言、前端开发、人工智能和数据科学等领域的深入研究和经验分享。无论你是初学者还是经验丰富的开发者，我都将为你提供有价值的内容和实用的建议。🎓🚀</p>", "r": { "minutes": 1.44, "words": 432 }, "y": "a", "t": "介绍页", "i": "emoji" }, ["/intro", "/intro.md"]],
  ["v-2e3eac9e", "/slides.html", { "d": 1688710125e3, "v": "https://img.tucang.cc/api/image/show/72e720a5032441381e8d626f0e6538f1", "e": "<!-- markdownlint-disable MD024 MD033 MD051 -->\n", "r": { "minutes": 4.51, "words": 1354 }, "y": "s", "t": "幻灯片页", "i": "person-chalkboard" }, ["/slides", "/slides.md"]],
  ["v-ca2606fe", "/anything/%E5%B0%8F%E8%AE%B0/%E4%B8%8B%E9%9B%AA%E5%95%A6.html", { "d": 17022528e5, "l": "2023年12月11日", "c": ["画册"], "v": "https://img.tucang.cc/api/image/show/da3546c26f3726a1f7a63e96921b30ff", "e": '<h1> 2023初雪</h1>\n<figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepress/微信图片_20231211101841.jpg" alt="好白的雪" tabindex="0" loading="lazy"><figcaption>好白的雪</figcaption></figure>\n<figure><img src="https://raw.githubusercontent.com/lianghexiang/picgo-picture/main/vuepress/微信图片_20231211102037.jpg" alt="白雪皑皑" tabindex="0" loading="lazy"><figcaption>白雪皑皑</figcaption></figure>', "r": { "minutes": 0.17, "words": 50 }, "y": "a", "t": "2023初雪", "i": "snow" }, ["/anything/小记/下雪啦.html", "/anything/%E5%B0%8F%E8%AE%B0/%E4%B8%8B%E9%9B%AA%E5%95%A6", "/anything/小记/下雪啦.md", "/anything/%E5%B0%8F%E8%AE%B0/%E4%B8%8B%E9%9B%AA%E5%95%A6.md"]],
  ["v-59939119", "/anything/%E5%B0%8F%E8%AE%B0/%E5%A5%BD%E7%94%A8%E7%BD%91%E7%AB%99%E6%94%B6%E8%97%8F.html", { "d": 17022528e5, "l": "2023年12月11日", "c": ["网址收藏"], "g": ["网站"], "v": "https://img.tucang.cc/api/image/show/88bd6a5539dec4ece4596df98b999429", "e": "<h1> 好用网站收藏</h1>\n", "r": { "minutes": 0.09, "words": 27 }, "y": "a", "t": "好用网站收藏", "i": "link" }, ["/anything/小记/好用网站收藏.html", "/anything/%E5%B0%8F%E8%AE%B0/%E5%A5%BD%E7%94%A8%E7%BD%91%E7%AB%99%E6%94%B6%E8%97%8F", "/anything/小记/好用网站收藏.md", "/anything/%E5%B0%8F%E8%AE%B0/%E5%A5%BD%E7%94%A8%E7%BD%91%E7%AB%99%E6%94%B6%E8%97%8F.md"]],
  ["v-4848c9f0", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F.html", { "d": 170424e7, "l": "2024年1月3日", "c": ["python"], "g": ["设计模式", "python"], "v": "https://img.tucang.cc/api/image/show/6c8acb93bd0fc9dd85006746d572df8f", "e": `<h1> 单例模式</h1>
<h2> 单例模式的Python实现</h2>
<h3> 1. 普通单例模式</h3>
<blockquote>
<p>_ <em>new</em> _方法可以在实例化类的时候通过hasattr方法返回同一个实例</p>
</blockquote>
<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">ExerciseSinglePattern</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__new__</span><span class="token punctuation">(</span>cls<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">hasattr</span><span class="token punctuation">(</span>cls<span class="token punctuation">,</span> <span class="token string">'_instance'</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            cls<span class="token punctuation">.</span>_instance <span class="token operator">=</span> <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__new__<span class="token punctuation">(</span>cls<span class="token punctuation">)</span>
        <span class="token keyword">return</span> cls<span class="token punctuation">.</span>_instance

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'__init__'</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>a <span class="token operator">=</span> a
        self<span class="token punctuation">.</span>b <span class="token operator">=</span> b
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    sp <span class="token operator">=</span> ExerciseSinglePattern<span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">)</span>
    sp2 <span class="token operator">=</span> ExerciseSinglePattern<span class="token punctuation">(</span><span class="token string">'c'</span><span class="token punctuation">,</span> <span class="token string">'d'</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>sp<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>sp2<span class="token punctuation">)</span>
    <span class="token comment"># &lt;__main__.ExerciseSinglePattern object at 0x00000243AF6E4F70&gt;</span>
	<span class="token comment"># &lt;__main__.ExerciseSinglePattern object at 0x00000243AF6E4F70&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`, "r": { "minutes": 7.62, "words": 2286 }, "y": "a", "t": "单例模式", "i": "python" }, ["/design_pattern/设计模式/单例模式.html", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F", "/design_pattern/设计模式/单例模式.md", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F.md"]],
  ["v-7a9b9630", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F.html", { "d": 170424e7, "l": "2024年1月3日", "c": ["python"], "g": ["设计模式", "python"], "v": "https://img.tucang.cc/api/image/show/6c8acb93bd0fc9dd85006746d572df8f", "e": "<h1> 工厂模式</h1>\n<h3> 1. 前言</h3>\n<p>在本文章中，主要包含以下几个方面的主题：</p>\n<ol>\n<li>了解简单工厂设计模式；</li>\n<li>讨论工厂方法和抽象工厂方法及其差异；</li>\n<li>利用Python代码实现真实场景；</li>\n<li>讨论模式的优缺点并进行相应的比较。</li>\n</ol>\n<h3> 2. 了解工厂模式</h3>\n<p>在面向对象编程中，术语“工厂”表示一个负责创建其他类型对象的类。通常情况下，作为一个工厂的类有一个对象以及与它关联的多个方法。客户端使用某些参数调用此方法，之后，工厂会据此创建所需类型的对象，然后将它们返回给客户端。</p>", "r": { "minutes": 0.82, "words": 247 }, "y": "a", "t": "工厂模式", "i": "python" }, ["/design_pattern/设计模式/工厂模式.html", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F", "/design_pattern/设计模式/工厂模式.md", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F.md"]],
  ["v-71b4dc5e", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E9%97%A8%E9%9D%A2%E6%A8%A1%E5%BC%8F.html", { "d": 170424e7, "l": "2024年1月3日", "c": ["python"], "g": ["设计模式", "python"], "v": "https://img.tucang.cc/api/image/show/6c8acb93bd0fc9dd85006746d572df8f", "e": "<h1> 门面模式</h1>\n<p>本章涉及内容：</p>\n<ol>\n<li>\n<p>结构型设计模式概要；</p>\n</li>\n<li>\n<p>利用UML图理解门面设计模式；</p>\n</li>\n<li>\n<p>提供了Python v3.5实现代码的真实用例；</p>\n</li>\n<li>\n<p>门面模式与最少知识原则。</p>\n</li>\n</ol>\n<h3> 1. 什么是结构性设计模式</h3>\n", "r": { "minutes": 0.29, "words": 88 }, "y": "a", "t": "门面模式", "i": "python" }, ["/design_pattern/设计模式/门面模式.html", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E9%97%A8%E9%9D%A2%E6%A8%A1%E5%BC%8F", "/design_pattern/设计模式/门面模式.md", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/%E9%97%A8%E9%9D%A2%E6%A8%A1%E5%BC%8F.md"]],
  ["v-0b84fef2", "/posts/Linux/Linux%E9%85%8D%E7%BD%AE%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.html", { "d": 16905024e5, "l": "2023年7月28日", "c": ["技术"], "g": ["Linux"], "v": "https://img.tucang.cc/api/image/show/64a50296cae6612fb1468ddb15110c75", "e": '<h1> Linux配置环境变量</h1>\n<h3> 1. 查看所有变量</h3>\n<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用env</span>\nlianghexiang@ubuntu:~$ <span class="token function">env</span> \n\n<span class="token comment"># 使用export</span>\nlianghexiang@ubuntu:~$ <span class="token builtin class-name">export</span> \n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>', "r": { "minutes": 0.74, "words": 221 }, "y": "a", "t": "Linux配置环境变量", "i": "book" }, ["/posts/Linux/Linux配置环境变量.html", "/posts/Linux/Linux%E9%85%8D%E7%BD%AE%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F", "/posts/Linux/Linux配置环境变量.md", "/posts/Linux/Linux%E9%85%8D%E7%BD%AE%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.md"]],
  ["v-66d370d9", "/posts/Vue/Vue%E5%9F%BA%E7%A1%80.html", { "d": 170424e7, "l": "2024年1月3日", "c": ["Vue"], "g": ["前端", "框架"], "v": "https://img.tucang.cc/api/image/show/6c8acb93bd0fc9dd85006746d572df8f", "e": "<h1> Vue基础知识</h1>\n<h3> 指令系统</h3>\n<ol>\n<li>v-text</li>\n<li>v-html</li>\n<li>v-show</li>\n<li>v-if</li>\n<li>v-model 双向数据绑定</li>\n</ol>\n<h3> 常用属性</h3>\n<ol>\n<li>data()</li>\n<li>el</li>\n<li>methods</li>\n<li>watch</li>\n<li>computed</li>\n<li>templates</li>\n</ol>\n<h3> Vue组件</h3>\n<h4> 全局组件</h4>\n<p><strong>用法</strong>：</p>", "r": { "minutes": 3.45, "words": 1036 }, "y": "a", "t": "Vue基础知识", "i": "vue" }, ["/posts/Vue/Vue基础.html", "/posts/Vue/Vue%E5%9F%BA%E7%A1%80", "/posts/Vue/Vue基础.md", "/posts/Vue/Vue%E5%9F%BA%E7%A1%80.md"]],
  ["v-3ae980e2", "/posts/Vue/vue%E5%AE%A2%E6%88%B7%E7%AB%AF.html", { "d": 17061408e5, "l": "2024年1月25日", "c": ["Vue"], "g": ["前端", "框架"], "v": "https://img.tucang.cc/api/image/show/6c8acb93bd0fc9dd85006746d572df8f", "e": '<h1> Vue客户端</h1>\n<h3> 1. 什么是webpack</h3>\n<blockquote>\n<p>本质上，<em>webpack</em> 是一个现代 JavaScript 应用程序的_静态模块打包器(module bundler)<em>。当 webpack 处理应用程序时，它会递归地构建一个_依赖关系图(dependency graph)</em>，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 <em>bundle</em>。</p>\n</blockquote>\n<figure><img src="https://cdn.nlark.com/yuque/0/2022/png/21881466/1657857178273-f17c0225-7be9-470a-b14a-3fdaebbcc194.png#clientId=u946fd131-c234-4&amp;from=paste&amp;height=319&amp;id=u62fb1adf&amp;originHeight=588&amp;originWidth=1125&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=60942&amp;status=done&amp;style=none&amp;taskId=ua4fd9b52-4a29-4fc7-8637-ff6a4daecd2&amp;title=&amp;width=610.1666870117188" alt="图片.png" tabindex="0" loading="lazy"><figcaption>图片.png</figcaption></figure>', "r": { "minutes": 3.76, "words": 1129 }, "y": "a", "t": "Vue客户端", "i": "vue" }, ["/posts/Vue/vue客户端.html", "/posts/Vue/vue%E5%AE%A2%E6%88%B7%E7%AB%AF", "/posts/Vue/vue客户端.md", "/posts/Vue/vue%E5%AE%A2%E6%88%B7%E7%AB%AF.md"]],
  ["v-3966997b", "/posts/gRPC/gRPC%E6%9C%8D%E5%8A%A1.html", { "d": 170424e7, "l": "2024年1月3日", "c": ["技术"], "g": ["gPRC", "RPC"], "v": "https://img.tucang.cc/api/image/show/6c8acb93bd0fc9dd85006746d572df8f", "e": "<h1> gPRC服务</h1>\n", "r": { "minutes": 0.06, "words": 18 }, "y": "a", "t": "gPRC服务", "i": "python" }, ["/posts/gRPC/gRPC服务.html", "/posts/gRPC/gRPC%E6%9C%8D%E5%8A%A1", "/posts/gRPC/gRPC服务.md", "/posts/gRPC/gRPC%E6%9C%8D%E5%8A%A1.md"]],
  ["v-784c3919", "/posts/mysql/mysql%E5%A4%87%E5%BF%98%E5%BD%95.html", { "d": 17057088e5, "l": "2024年1月20日", "c": ["技术"], "g": ["Mysql"], "v": "https://img.tucang.cc/api/image/show/be92f3fc23a4ba0672923f5f05c7e08b", "e": '<h1> Mysql知识积累</h1>\n<h3> 1. Mysql内置函数</h3>\n<h4> 1. instr</h4>\n<p>简介：</p>\n<blockquote>\n<p>函数返回字符串中子字符串第一次出现的位置.如果在str中找不到子字符串，则INSTR()函数返回零(0)</p>\n</blockquote>\n<p>使用场景：</p>\n<blockquote>\n<p>想要在字符串中查找子字符串或检查字符串中是否存在子字符串。</p>\n</blockquote>\n<p>函数语法:</p>\n<div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>INSTR<span class="token punctuation">(</span>str<span class="token punctuation">,</span>substr<span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>', "r": { "minutes": 5.16, "words": 1548 }, "y": "a", "t": "Mysql知识积累", "i": "mysql", "s": "Mysql语法基础" }, ["/posts/mysql/mysql备忘录.html", "/posts/mysql/mysql%E5%A4%87%E5%BF%98%E5%BD%95", "/posts/mysql/mysql备忘录.md", "/posts/mysql/mysql%E5%A4%87%E5%BF%98%E5%BD%95.md"]],
  ["v-4f435352", "/posts/python/Linux%E7%8E%AF%E5%A2%83%E4%B8%8BDBUtils%E5%AF%BC%E5%85%A5%E7%9A%84%E9%97%AE%E9%A2%98.html", { "d": 16905024e5, "l": "2023年7月28日", "c": ["技术"], "g": ["python"], "v": "https://img.tucang.cc/api/image/show/da3546c26f3726a1f7a63e96921b30ff", "e": '<h1> DBUtils版本问题</h1>\n<h3> 前言</h3>\n<figure><img src="https://img2023.cnblogs.com/blog/2432585/202307/2432585-20230719090938564-1692406477.png" alt="image" tabindex="0" loading="lazy"><figcaption>image</figcaption></figure>\n<p>事情的起因是，原本在pycharm上开发的代码，因为要使用到线程池，所以就按安装了DBUtils，在windows上运行代码倒没什么问题，后因代码运行时需要占用的内存过多，所以代码要转移到Linux服务器上，问题由之而来，运行代码时总会会报出找不到DBUtils库的错误，经过几番反复确认，python环境已经安装了DBUtils，而且安装的其他三方库皆无问题，所以便是用了万能的百度，终于是解决了问题</p>', "r": { "minutes": 0.87, "words": 261 }, "y": "a", "t": "DBUtils版本问题", "i": "book" }, ["/posts/python/Linux环境下DBUtils导入的问题.html", "/posts/python/Linux%E7%8E%AF%E5%A2%83%E4%B8%8BDBUtils%E5%AF%BC%E5%85%A5%E7%9A%84%E9%97%AE%E9%A2%98", "/posts/python/Linux环境下DBUtils导入的问题.md", "/posts/python/Linux%E7%8E%AF%E5%A2%83%E4%B8%8BDBUtils%E5%AF%BC%E5%85%A5%E7%9A%84%E9%97%AE%E9%A2%98.md"]],
  ["v-4870e4c2", "/posts/python/Python2%E8%BD%ACPython3.html", { "d": 16956864e5, "l": "2023年9月26日", "c": ["python"], "g": ["2to3", "python"], "v": "https://img.tucang.cc/api/image/show/72e720a5032441381e8d626f0e6538f1", "e": '<h1> Python2转Python3</h1>\n<h3> 工具介绍</h3>\n<p>💭 工具：<a href="http://2to3.py" target="_blank" rel="noopener noreferrer">2to3.py</a></p>\n<p>2to3.py是一个脚本文件，是Anaconda管理器自带的脚本文件，通常可以在anaconda的安装路径下找到，可能由于anaconda的版本不同，2to3.py文件的名字也可能略有差异，但总的来说都可以通过2to3关键字来辨别。</p>\n<h3> 使用</h3>\n<ol>\n<li>转单个py文件</li>\n</ol>\n<p>​	如果是转单个py文件的话可以直接把py文件的路径输入到命令之后</p>', "r": { "minutes": 0.64, "words": 193 }, "y": "a", "t": "Python2转Python3", "i": "fish" }, ["/posts/python/Python2转Python3.html", "/posts/python/Python2%E8%BD%ACPython3", "/posts/python/Python2转Python3.md", "/posts/python/Python2%E8%BD%ACPython3.md"]],
  ["v-77bb6b9a", "/posts/python/Python%E6%B7%BB%E5%8A%A0%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.html", { "d": 17018208e5, "l": "2023年12月6日", "c": ["python"], "g": ["Linux", "python"], "v": "https://img.tucang.cc/api/image/show/5383cab4c54b110f368ce995153f0de3", "e": "<h1> Python添加Linux环境变量</h1>\n", "r": { "minutes": 0.07, "words": 22 }, "y": "a", "t": "Python添加Linux环境变量", "i": "pen" }, ["/posts/python/Python添加环境变量.html", "/posts/python/Python%E6%B7%BB%E5%8A%A0%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F", "/posts/python/Python添加环境变量.md", "/posts/python/Python%E6%B7%BB%E5%8A%A0%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.md"]],
  ["v-014b8769", "/posts/python/polygon%E9%9D%A2%E7%A7%AF%E8%AE%A1%E7%AE%97.html", { "d": 16881696e5, "l": "2023年7月1日", "c": ["python"], "g": ["polygon", "mysql", "python"], "v": "https://img.tucang.cc/api/image/show/72e720a5032441381e8d626f0e6538f1", "e": "<h1> Python操作Polygon</h1>\n<h3> 1. Polygon面积计算</h3>\n<blockquote>\n<p>首先介绍什么是Polygon，在地理信息系统(GIS)中，polygon是经纬度构成的多边形，可以用来描绘地理边界，区域和建筑物轮廓灯。在mysql中，可以使用polygon数据类型存储，Python的<code>Shapely</code>库提供了操作polygon数据的工具。</p>\n</blockquote>\n<p>在编程语言中，polygon数据多存储在二维列表中，例如<code>[[1, 2],[2, 0], [0, 1],......]</code>,  在数学中计算不规则多边形面积之一的公式是鞋带公式(也成高斯面积公式)</p>", "r": { "minutes": 1.04, "words": 311 }, "y": "a", "t": "Python操作Polygon", "i": "fish" }, ["/posts/python/polygon面积计算.html", "/posts/python/polygon%E9%9D%A2%E7%A7%AF%E8%AE%A1%E7%AE%97", "/posts/python/polygon面积计算.md", "/posts/python/polygon%E9%9D%A2%E7%A7%AF%E8%AE%A1%E7%AE%97.md"]],
  ["v-34cef64b", "/posts/tools/PicgoGitHub%E6%90%AD%E5%BB%BA%E5%9B%BE%E5%BA%8A.html", { "d": 16892928e5, "l": "2023年7月14日", "c": ["工具"], "g": ["Picgo", "GitHub"], "v": "https://img.tucang.cc/api/image/show/3f96a1fd6956f27e1badccf6d7f982e1", "e": '<h1> PicgoGitHub图床</h1>\n<h2> 前言</h2>\n<p>这篇文章主要介绍在💻<code>windows</code>系统下安装PicGo并且在🇬🇭  GitHub上创建仓库来做我们自己的个人图床。</p>\n<p>首先，什么是 <code>Picgo</code>？</p>\n<p>picgo网站地址：<a href="https://picgo.github.io/PicGo-Doc/zh/guide/#%E7%89%B9%E8%89%B2%E5%8A%9F%E8%83%BD" target="_blank" rel="noopener noreferrer">https://picgo.github.io/PicGo-Doc/zh/guide/#特色功能</a></p>', "r": { "minutes": 3.14, "words": 942 }, "y": "a", "t": "PicgoGitHub图床", "i": "github" }, ["/posts/tools/PicgoGitHub搭建图床.html", "/posts/tools/PicgoGitHub%E6%90%AD%E5%BB%BA%E5%9B%BE%E5%BA%8A", "/posts/tools/PicgoGitHub搭建图床.md", "/posts/tools/PicgoGitHub%E6%90%AD%E5%BB%BA%E5%9B%BE%E5%BA%8A.md"]],
  ["v-a430865c", "/posts/tools/sublime%E8%AF%B4%E6%98%8E%E4%B9%A6.html", { "d": 16892928e5, "l": "2023年7月14日", "c": ["工具"], "g": ["Sublime Text", "工具说明书"], "v": "https://img.tucang.cc/api/image/show/72e720a5032441381e8d626f0e6538f1", "e": "<h1> Sublime Text使用文档说明书</h1>\n<h3> SublimeText预览Markdown</h3>\n<h4> 1. MarkdownEditor</h4>\n<p>🏷️MarkdownEditing是一个功能丰富的插件，提供了对Markdown文件的语法高亮、自动补全、预览等功能。</p>\n<p>安装：</p>\n<p>Ctrl+Shift+P打开控制台，输入Package Control: Install Package，然后输入MarkdownEditor，选择安装</p>\n", "r": { "minutes": 0.31, "words": 93 }, "y": "a", "t": "Sublime Text使用文档说明书", "i": "pen" }, ["/posts/tools/sublime说明书.html", "/posts/tools/sublime%E8%AF%B4%E6%98%8E%E4%B9%A6", "/posts/tools/sublime说明书.md", "/posts/tools/sublime%E8%AF%B4%E6%98%8E%E4%B9%A6.md"]],
  ["v-227b283b", "/anything/book_notes/%E4%BA%BA%E4%B9%8B%E8%A7%89%E9%86%92/%E4%B8%80%E5%88%87%E9%97%AE%E9%A2%98%E7%9A%84%E8%B5%B7%E6%BA%90.html", { "d": 1706525952e3, "r": { "minutes": 0.08, "words": 23 }, "y": "a", "t": "上篇：内观自己，摆脱焦虑之[大脑-一切问题的起源]", "i": "write" }, ["/anything/book_notes/人之觉醒/一切问题的起源.html", "/anything/book_notes/%E4%BA%BA%E4%B9%8B%E8%A7%89%E9%86%92/%E4%B8%80%E5%88%87%E9%97%AE%E9%A2%98%E7%9A%84%E8%B5%B7%E6%BA%90", "/anything/book_notes/人之觉醒/一切问题的起源.md", "/anything/book_notes/%E4%BA%BA%E4%B9%8B%E8%A7%89%E9%86%92/%E4%B8%80%E5%88%87%E9%97%AE%E9%A2%98%E7%9A%84%E8%B5%B7%E6%BA%90.md"]],
  ["v-3706649a", "/404.html", { "y": "p", "t": "" }, ["/404"]],
  ["v-7f74a124", "/anything/%E5%B0%8F%E8%AE%B0/", { "y": "p", "t": "小记" }, ["/anything/小记/", "/anything/%E5%B0%8F%E8%AE%B0/index.html"]],
  ["v-c85a71d8", "/anything/", { "y": "p", "t": "Anything" }, ["/anything/index.html"]],
  ["v-7f99a408", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/", { "y": "p", "t": "设计模式" }, ["/design_pattern/设计模式/", "/design_pattern/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/index.html"]],
  ["v-eb42b032", "/design_pattern/", { "y": "p", "t": "Design Pattern" }, ["/design_pattern/index.html"]],
  ["v-3689fde0", "/posts/Linux/", { "y": "p", "t": "Linux" }, ["/posts/Linux/index.html"]],
  ["v-e1e3da16", "/posts/", { "y": "p", "t": "Posts" }, ["/posts/index.html"]],
  ["v-635a6bfe", "/posts/Vue/", { "y": "p", "t": "Vue" }, ["/posts/Vue/index.html"]],
  ["v-08d26e1c", "/posts/gRPC/", { "y": "p", "t": "G R P C" }, ["/posts/gRPC/index.html"]],
  ["v-1dee9b02", "/posts/mysql/", { "y": "p", "t": "Mysql" }, ["/posts/mysql/index.html"]],
  ["v-3ea18a3e", "/posts/python/", { "y": "p", "t": "Python" }, ["/posts/python/index.html"]],
  ["v-2951b8e9", "/posts/tools/", { "y": "p", "t": "Tools" }, ["/posts/tools/index.html"]],
  ["v-0e47583b", "/anything/book_notes/%E4%BA%BA%E4%B9%8B%E8%A7%89%E9%86%92/", { "y": "p", "t": "人之觉醒" }, ["/anything/book_notes/人之觉醒/", "/anything/book_notes/%E4%BA%BA%E4%B9%8B%E8%A7%89%E9%86%92/index.html"]],
  ["v-3bfcafe0", "/anything/book_notes/", { "y": "p", "t": "Book Notes" }, ["/anything/book_notes/index.html"]],
  ["v-5bc93818", "/category/", { "y": "p", "t": "分类", "I": 0 }, ["/category/index.html"]],
  ["v-744d024e", "/tag/", { "y": "p", "t": "标签", "I": 0 }, ["/tag/index.html"]],
  ["v-e52c881c", "/article/", { "y": "p", "t": "文章", "I": 0 }, ["/article/index.html"]],
  ["v-154dc4c4", "/star/", { "y": "p", "t": "收藏", "I": 0 }, ["/star/index.html"]],
  ["v-01560935", "/timeline/", { "y": "p", "t": "时间轴", "I": 0 }, ["/timeline/index.html"]],
  ["v-605620d1", "/category/%E7%94%BB%E5%86%8C/", { "y": "p", "t": "画册 分类", "I": 0 }, ["/category/画册/", "/category/%E7%94%BB%E5%86%8C/index.html"]],
  ["v-efadec50", "/tag/%E7%BD%91%E7%AB%99/", { "y": "p", "t": "网站 标签", "I": 0 }, ["/tag/网站/", "/tag/%E7%BD%91%E7%AB%99/index.html"]],
  ["v-6efe3f6e", "/category/%E7%BD%91%E5%9D%80%E6%94%B6%E8%97%8F/", { "y": "p", "t": "网址收藏 分类", "I": 0 }, ["/category/网址收藏/", "/category/%E7%BD%91%E5%9D%80%E6%94%B6%E8%97%8F/index.html"]],
  ["v-05b88e01", "/tag/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/", { "y": "p", "t": "设计模式 标签", "I": 0 }, ["/tag/设计模式/", "/tag/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F/index.html"]],
  ["v-78cbe7bb", "/category/python/", { "y": "p", "t": "python 分类", "I": 0 }, ["/category/python/index.html"]],
  ["v-245f5676", "/tag/python/", { "y": "p", "t": "python 标签", "I": 0 }, ["/tag/python/index.html"]],
  ["v-594730ea", "/category/%E6%8A%80%E6%9C%AF/", { "y": "p", "t": "技术 分类", "I": 0 }, ["/category/技术/", "/category/%E6%8A%80%E6%9C%AF/index.html"]],
  ["v-211f44ee", "/tag/linux/", { "y": "p", "t": "Linux 标签", "I": 0 }, ["/tag/linux/index.html"]],
  ["v-65f6d381", "/category/vue/", { "y": "p", "t": "Vue 分类", "I": 0 }, ["/category/vue/index.html"]],
  ["v-95f987f4", "/tag/%E5%89%8D%E7%AB%AF/", { "y": "p", "t": "前端 标签", "I": 0 }, ["/tag/前端/", "/tag/%E5%89%8D%E7%AB%AF/index.html"]],
  ["v-14145d44", "/category/%E5%B7%A5%E5%85%B7/", { "y": "p", "t": "工具 分类", "I": 0 }, ["/category/工具/", "/category/%E5%B7%A5%E5%85%B7/index.html"]],
  ["v-f4d3cd72", "/tag/%E6%A1%86%E6%9E%B6/", { "y": "p", "t": "框架 标签", "I": 0 }, ["/tag/框架/", "/tag/%E6%A1%86%E6%9E%B6/index.html"]],
  ["v-287e5507", "/tag/gprc/", { "y": "p", "t": "gPRC 标签", "I": 0 }, ["/tag/gprc/index.html"]],
  ["v-b306a390", "/tag/rpc/", { "y": "p", "t": "RPC 标签", "I": 0 }, ["/tag/rpc/index.html"]],
  ["v-1bee38ca", "/tag/mysql/", { "y": "p", "t": "Mysql 标签", "I": 0 }, ["/tag/mysql/index.html"]],
  ["v-259537bb", "/tag/2to3/", { "y": "p", "t": "2to3 标签", "I": 0 }, ["/tag/2to3/index.html"]],
  ["v-a2fdb2fa", "/tag/polygon/", { "y": "p", "t": "polygon 标签", "I": 0 }, ["/tag/polygon/index.html"]],
  ["v-1382eb6a", "/tag/picgo/", { "y": "p", "t": "Picgo 标签", "I": 0 }, ["/tag/picgo/index.html"]],
  ["v-132a6ac4", "/tag/github/", { "y": "p", "t": "GitHub 标签", "I": 0 }, ["/tag/github/index.html"]],
  ["v-32b1cb5c", "/tag/sublime-text/", { "y": "p", "t": "Sublime Text 标签", "I": 0 }, ["/tag/sublime-text/index.html"]],
  ["v-1d73fa7a", "/tag/%E5%B7%A5%E5%85%B7%E8%AF%B4%E6%98%8E%E4%B9%A6/", { "y": "p", "t": "工具说明书 标签", "I": 0 }, ["/tag/工具说明书/", "/tag/%E5%B7%A5%E5%85%B7%E8%AF%B4%E6%98%8E%E4%B9%A6/index.html"]]
];
var Vuepress = defineComponent({
  name: "Vuepress",
  setup() {
    const layout2 = usePageLayout();
    return () => h$4(layout2.value);
  }
});
var createRoutes = () => pagesRoutes.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path
      }))
    );
    return result;
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress
    }
  ]
);
var historyCreator = createWebHistory;
var createVueRouter = () => {
  const router = createRouter({
    // it might be an issue of vue-router that have to remove the ending slash
    history: historyCreator(removeEndingSlash("/space/")),
    routes: createRoutes(),
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition)
        return savedPosition;
      if (to.hash)
        return { el: to.hash };
      return { top: 0 };
    }
  });
  router.beforeResolve(async (to, from) => {
    var _a2;
    if (to.path !== from.path || from === START_LOCATION_NORMALIZED) {
      [pageData.value] = await Promise.all([
        resolvers.resolvePageData(to.name),
        (_a2 = pagesComponents[to.name]) == null ? void 0 : _a2.__asyncLoader()
      ]);
    }
  });
  return router;
};
var setupGlobalComponents = (app) => {
  app.component("ClientOnly", ClientOnly);
  app.component("Content", Content);
};
var setupGlobalComputed = (app, router, clientConfigs2) => {
  const routePath = ref(router.currentRoute.value.path);
  watch(
    () => router.currentRoute.value.path,
    (value) => routePath.value = value
  );
  const layouts = computed(() => resolvers.resolveLayouts(clientConfigs2));
  const routeLocale = computed(
    () => resolvers.resolveRouteLocale(siteData.value.locales, routePath.value)
  );
  const siteLocaleData = computed(
    () => resolvers.resolveSiteLocaleData(siteData.value, routeLocale.value)
  );
  const pageFrontmatter = computed(
    () => resolvers.resolvePageFrontmatter(pageData.value)
  );
  const pageHeadTitle = computed(
    () => resolvers.resolvePageHeadTitle(pageData.value, siteLocaleData.value)
  );
  const pageHead = computed(
    () => resolvers.resolvePageHead(
      pageHeadTitle.value,
      pageFrontmatter.value,
      siteLocaleData.value
    )
  );
  const pageLang = computed(() => resolvers.resolvePageLang(pageData.value));
  const pageLayout = computed(
    () => resolvers.resolvePageLayout(pageData.value, layouts.value)
  );
  app.provide(layoutsSymbol, layouts);
  app.provide(pageFrontmatterSymbol, pageFrontmatter);
  app.provide(pageHeadTitleSymbol, pageHeadTitle);
  app.provide(pageHeadSymbol, pageHead);
  app.provide(pageLangSymbol, pageLang);
  app.provide(pageLayoutSymbol, pageLayout);
  app.provide(routeLocaleSymbol, routeLocale);
  app.provide(siteLocaleDataSymbol, siteLocaleData);
  Object.defineProperties(app.config.globalProperties, {
    $frontmatter: { get: () => pageFrontmatter.value },
    $head: { get: () => pageHead.value },
    $headTitle: { get: () => pageHeadTitle.value },
    $lang: { get: () => pageLang.value },
    $page: { get: () => pageData.value },
    $routeLocale: { get: () => routeLocale.value },
    $site: { get: () => siteData.value },
    $siteLocale: { get: () => siteLocaleData.value },
    $withBase: { get: () => withBase }
  });
  return {
    layouts,
    pageData,
    pageFrontmatter,
    pageHead,
    pageHeadTitle,
    pageLang,
    pageLayout,
    routeLocale,
    siteData,
    siteLocaleData
  };
};
var setupUpdateHead = () => {
  const head = usePageHead();
  const lang = usePageLang();
  const headTags = ref([]);
  const loadHead = () => {
    head.value.forEach((item) => {
      const tag = queryHeadTag(item);
      if (tag) {
        headTags.value.push(tag);
      }
    });
  };
  const updateHead = () => {
    document.documentElement.lang = lang.value;
    headTags.value.forEach((item) => {
      if (item.parentNode === document.head) {
        document.head.removeChild(item);
      }
    });
    headTags.value.splice(0, headTags.value.length);
    head.value.forEach((item) => {
      const tag = createHeadTag(item);
      if (tag !== null) {
        document.head.appendChild(tag);
        headTags.value.push(tag);
      }
    });
  };
  provide(updateHeadSymbol, updateHead);
  onMounted(() => {
    loadHead();
    updateHead();
    watch(
      () => head.value,
      () => updateHead()
    );
  });
};
var queryHeadTag = ([
  tagName,
  attrs,
  content = ""
]) => {
  const attrsSelector = Object.entries(attrs).map(([key, value]) => {
    if (isString(value)) {
      return `[${key}=${JSON.stringify(value)}]`;
    }
    if (value === true) {
      return `[${key}]`;
    }
    return "";
  }).join("");
  const selector = `head > ${tagName}${attrsSelector}`;
  const tags = Array.from(document.querySelectorAll(selector));
  const matchedTag = tags.find((item) => item.innerText === content);
  return matchedTag || null;
};
var createHeadTag = ([
  tagName,
  attrs,
  content
]) => {
  if (!isString(tagName)) {
    return null;
  }
  const tag = document.createElement(tagName);
  if (isPlainObject(attrs)) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (isString(value)) {
        tag.setAttribute(key, value);
      } else if (value === true) {
        tag.setAttribute(key, "");
      }
    });
  }
  if (isString(content)) {
    tag.appendChild(document.createTextNode(content));
  }
  return tag;
};
var appCreator = createSSRApp;
var createVueApp = async () => {
  var _a2;
  const app = appCreator({
    name: "VuepressApp",
    setup() {
      var _a3;
      setupUpdateHead();
      for (const clientConfig of clientConfigs) {
        (_a3 = clientConfig.setup) == null ? void 0 : _a3.call(clientConfig);
      }
      return () => [
        h$4(RouterView),
        ...clientConfigs.flatMap(
          ({ rootComponents = [] }) => rootComponents.map((component) => h$4(component))
        )
      ];
    }
  });
  const router = createVueRouter();
  setupGlobalComponents(app);
  const globalComputed = setupGlobalComputed(app, router, clientConfigs);
  {
    const { setupDevtools } = await __vitePreload(() => import("./setupDevtools-X4YFRK4B-f5b24d74.js"), true ? [] : void 0);
    setupDevtools(app, globalComputed);
  }
  for (const clientConfig of clientConfigs) {
    await ((_a2 = clientConfig.enhance) == null ? void 0 : _a2.call(clientConfig, { app, router, siteData }));
  }
  app.use(router);
  return {
    app,
    router
  };
};
{
  createVueApp().then(({ app, router }) => {
    router.isReady().then(() => {
      app.mount("#app");
    });
  });
}
export {
  popScopeId as $,
  toDisplayString as A,
  normalizeClass as B,
  C$4 as C,
  useStorage as D,
  onUnmounted as E,
  Fragment as F,
  reactive as G,
  withDirectives as H,
  vModelDynamic as I,
  vModelText as J,
  isRef as K,
  vShow as L,
  useStyleTag as M,
  provide as N,
  nextTick as O,
  useScriptTag as P,
  useDebounceFn as Q,
  version as R,
  watchEffect as S,
  toRef$1 as T,
  withCtx as U,
  renderSlot as V,
  withModifiers as W,
  Transition as X,
  withKeys as Y,
  pushScopeId as Z,
  __vitePreload as _,
  createStaticVNode as a,
  createCommentVNode as b,
  createElementBlock as c,
  createVueApp,
  createVNode as d,
  createBaseVNode as e,
  createTextVNode as f,
  defineComponent as g,
  r$2 as h,
  i$5 as i,
  ref as j,
  shallowRef as k,
  computed as l,
  onMounted as m,
  h$4 as n,
  openBlock as o,
  onBeforeUnmount as p,
  renderList as q,
  resolveComponent as r,
  setupDevtoolsPlugin as s,
  normalizeStyle as t,
  inject as u,
  v$5 as v,
  watch as w,
  useNow as x,
  createBlock as y,
  unref as z
};
