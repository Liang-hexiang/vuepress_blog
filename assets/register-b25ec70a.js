var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
import { _ as __vitePreload } from "./app-ef9c1d43.js";
const SCOPE = Symbol(0);
let scheduledEffects = false, runningEffects = false, currentScope = null, currentObserver = null, currentObservers = null, currentObserversIndex = 0, effects = [], defaultContext = {};
const NOOP = () => {
}, STATE_CLEAN = 0, STATE_CHECK = 1, STATE_DIRTY = 2, STATE_DISPOSED = 3;
function flushEffects() {
  scheduledEffects = true;
  queueMicrotask(runEffects);
}
function runEffects() {
  if (!effects.length) {
    scheduledEffects = false;
    return;
  }
  runningEffects = true;
  for (let i = 0; i < effects.length; i++) {
    if (effects[i].$st !== STATE_CLEAN)
      runTop(effects[i]);
  }
  effects = [];
  scheduledEffects = false;
  runningEffects = false;
}
function runTop(node) {
  let ancestors = [node];
  while (node = node[SCOPE]) {
    if (node.$e && node.$st !== STATE_CLEAN)
      ancestors.push(node);
  }
  for (let i = ancestors.length - 1; i >= 0; i--) {
    updateCheck(ancestors[i]);
  }
}
function root(init) {
  const scope = createScope();
  return compute(scope, !init.length ? init : init.bind(null, dispose.bind(scope)), null);
}
function peek(fn) {
  return compute(currentScope, fn, null);
}
function untrack(fn) {
  return compute(null, fn, null);
}
function tick() {
  if (!runningEffects)
    runEffects();
}
function getScope() {
  return currentScope;
}
function scoped(run2, scope) {
  try {
    return compute(scope, run2, null);
  } catch (error) {
    handleError(scope, error);
    return;
  }
}
function getContext(key2, scope = currentScope) {
  return scope == null ? void 0 : scope.$cx[key2];
}
function setContext(key2, value, scope = currentScope) {
  if (scope)
    scope.$cx = { ...scope.$cx, [key2]: value };
}
function onDispose(disposable) {
  if (!disposable || !currentScope)
    return disposable || NOOP;
  const node = currentScope;
  if (!node.$d) {
    node.$d = disposable;
  } else if (Array.isArray(node.$d)) {
    node.$d.push(disposable);
  } else {
    node.$d = [node.$d, disposable];
  }
  return function removeDispose() {
    if (node.$st === STATE_DISPOSED)
      return;
    disposable.call(null);
    if (isFunction$1(node.$d)) {
      node.$d = null;
    } else if (Array.isArray(node.$d)) {
      node.$d.splice(node.$d.indexOf(disposable), 1);
    }
  };
}
function dispose(self = true) {
  if (this.$st === STATE_DISPOSED)
    return;
  let head = self ? this.$ps || this[SCOPE] : this, current = this.$ns, next = null;
  while (current && current[SCOPE] === this) {
    dispose.call(current, true);
    disposeNode(current);
    next = current.$ns;
    current.$ns = null;
    current = next;
  }
  if (self)
    disposeNode(this);
  if (current)
    current.$ps = !self ? this : this.$ps;
  if (head)
    head.$ns = current;
}
function disposeNode(node) {
  node.$st = STATE_DISPOSED;
  if (node.$d)
    emptyDisposal(node);
  if (node.$s)
    removeSourceObservers(node, 0);
  if (node.$ps)
    node.$ps.$ns = null;
  node[SCOPE] = null;
  node.$s = null;
  node.$o = null;
  node.$ps = null;
  node.$cx = defaultContext;
  node.$eh = null;
}
function emptyDisposal(scope) {
  try {
    if (Array.isArray(scope.$d)) {
      for (let i = scope.$d.length - 1; i >= 0; i--) {
        const callable = scope.$d[i];
        callable.call(callable);
      }
    } else {
      scope.$d.call(scope.$d);
    }
    scope.$d = null;
  } catch (error) {
    handleError(scope, error);
  }
}
function compute(scope, compute2, observer) {
  const prevScope = currentScope, prevObserver = currentObserver;
  currentScope = scope;
  currentObserver = observer;
  try {
    return compute2.call(scope);
  } finally {
    currentScope = prevScope;
    currentObserver = prevObserver;
  }
}
function handleError(scope, error) {
  if (!scope || !scope.$eh)
    throw error;
  let i = 0, len = scope.$eh.length, coercedError = coerceError(error);
  for (i = 0; i < len; i++) {
    try {
      scope.$eh[i](coercedError);
      break;
    } catch (error2) {
      coercedError = coerceError(error2);
    }
  }
  if (i === len)
    throw coercedError;
}
function coerceError(error) {
  return error instanceof Error ? error : Error(JSON.stringify(error));
}
function read() {
  if (this.$st === STATE_DISPOSED)
    return this.$v;
  if (currentObserver && !this.$e) {
    if (!currentObservers && currentObserver.$s && currentObserver.$s[currentObserversIndex] == this) {
      currentObserversIndex++;
    } else if (!currentObservers)
      currentObservers = [this];
    else
      currentObservers.push(this);
  }
  if (this.$c)
    updateCheck(this);
  return this.$v;
}
function write(newValue) {
  const value = isFunction$1(newValue) ? newValue(this.$v) : newValue;
  if (this.$ch(this.$v, value)) {
    this.$v = value;
    if (this.$o) {
      for (let i = 0; i < this.$o.length; i++) {
        notify(this.$o[i], STATE_DIRTY);
      }
    }
  }
  return this.$v;
}
const ScopeNode = function Scope() {
  this[SCOPE] = null;
  this.$ns = null;
  this.$ps = null;
  if (currentScope)
    currentScope.append(this);
};
const ScopeProto = ScopeNode.prototype;
ScopeProto.$cx = defaultContext;
ScopeProto.$eh = null;
ScopeProto.$c = null;
ScopeProto.$d = null;
ScopeProto.append = function(child) {
  child[SCOPE] = this;
  child.$ps = this;
  if (this.$ns) {
    if (child.$ns) {
      let tail = child.$ns;
      while (tail.$ns)
        tail = tail.$ns;
      tail.$ns = this.$ns;
      this.$ns.$ps = tail;
    } else {
      child.$ns = this.$ns;
      this.$ns.$ps = child;
    }
  }
  this.$ns = child;
  child.$cx = child.$cx === defaultContext ? this.$cx : { ...this.$cx, ...child.$cx };
  if (this.$eh) {
    child.$eh = !child.$eh ? this.$eh : [...child.$eh, ...this.$eh];
  }
};
ScopeProto.dispose = function() {
  dispose.call(this);
};
function createScope() {
  return new ScopeNode();
}
const ComputeNode = function Computation(initialValue, compute2, options) {
  ScopeNode.call(this);
  this.$st = compute2 ? STATE_DIRTY : STATE_CLEAN;
  this.$i = false;
  this.$e = false;
  this.$s = null;
  this.$o = null;
  this.$v = initialValue;
  if (compute2)
    this.$c = compute2;
  if (options && options.dirty)
    this.$ch = options.dirty;
};
const ComputeProto = ComputeNode.prototype;
Object.setPrototypeOf(ComputeProto, ScopeProto);
ComputeProto.$ch = isNotEqual;
ComputeProto.call = read;
function createComputation(initialValue, compute2, options) {
  return new ComputeNode(initialValue, compute2, options);
}
function isNotEqual(a, b) {
  return a !== b;
}
function isFunction$1(value) {
  return typeof value === "function";
}
function updateCheck(node) {
  if (node.$st === STATE_CHECK) {
    for (let i = 0; i < node.$s.length; i++) {
      updateCheck(node.$s[i]);
      if (node.$st === STATE_DIRTY) {
        break;
      }
    }
  }
  if (node.$st === STATE_DIRTY)
    update(node);
  else
    node.$st = STATE_CLEAN;
}
function cleanup(node) {
  if (node.$ns && node.$ns[SCOPE] === node)
    dispose.call(node, false);
  if (node.$d)
    emptyDisposal(node);
  node.$eh = node[SCOPE] ? node[SCOPE].$eh : null;
}
function update(node) {
  let prevObservers = currentObservers, prevObserversIndex = currentObserversIndex;
  currentObservers = null;
  currentObserversIndex = 0;
  try {
    cleanup(node);
    const result = compute(node, node.$c, node);
    if (currentObservers) {
      if (node.$s)
        removeSourceObservers(node, currentObserversIndex);
      if (node.$s && currentObserversIndex > 0) {
        node.$s.length = currentObserversIndex + currentObservers.length;
        for (let i = 0; i < currentObservers.length; i++) {
          node.$s[currentObserversIndex + i] = currentObservers[i];
        }
      } else {
        node.$s = currentObservers;
      }
      let source;
      for (let i = currentObserversIndex; i < node.$s.length; i++) {
        source = node.$s[i];
        if (!source.$o)
          source.$o = [node];
        else
          source.$o.push(node);
      }
    } else if (node.$s && currentObserversIndex < node.$s.length) {
      removeSourceObservers(node, currentObserversIndex);
      node.$s.length = currentObserversIndex;
    }
    if (!node.$e && node.$i) {
      write.call(node, result);
    } else {
      node.$v = result;
      node.$i = true;
    }
  } catch (error) {
    handleError(node, error);
    if (node.$st === STATE_DIRTY) {
      cleanup(node);
      if (node.$s)
        removeSourceObservers(node, 0);
    }
    return;
  }
  currentObservers = prevObservers;
  currentObserversIndex = prevObserversIndex;
  node.$st = STATE_CLEAN;
}
function notify(node, state) {
  if (node.$st >= state)
    return;
  if (node.$e && node.$st === STATE_CLEAN) {
    effects.push(node);
    if (!scheduledEffects)
      flushEffects();
  }
  node.$st = state;
  if (node.$o) {
    for (let i = 0; i < node.$o.length; i++) {
      notify(node.$o[i], STATE_CHECK);
    }
  }
}
function removeSourceObservers(node, index) {
  let source, swap;
  for (let i = index; i < node.$s.length; i++) {
    source = node.$s[i];
    if (source.$o) {
      swap = source.$o.indexOf(node);
      source.$o[swap] = source.$o[source.$o.length - 1];
      source.$o.pop();
    }
  }
}
function signal(initialValue, options) {
  const node = createComputation(initialValue, null, options), signal2 = read.bind(node);
  signal2[SCOPE] = true;
  signal2.set = write.bind(node);
  return signal2;
}
function isReadSignal(fn) {
  return isFunction$1(fn) && SCOPE in fn;
}
function computed(compute2, options) {
  const node = createComputation(
    options == null ? void 0 : options.initial,
    compute2,
    options
  ), signal2 = read.bind(node);
  signal2[SCOPE] = true;
  return signal2;
}
function effect$1(effect2, options) {
  const signal2 = createComputation(
    null,
    function runEffect() {
      let effectResult = effect2();
      isFunction$1(effectResult) && onDispose(effectResult);
      return null;
    },
    void 0
  );
  signal2.$e = true;
  update(signal2);
  return dispose.bind(signal2, true);
}
function isWriteSignal(fn) {
  return isReadSignal(fn) && "set" in fn;
}
function noop(...args) {
}
function isNull(value) {
  return value === null;
}
function isUndefined(value) {
  return typeof value === "undefined";
}
function isNil(value) {
  return isNull(value) || isUndefined(value);
}
function isObject(value) {
  return (value == null ? void 0 : value.constructor) === Object;
}
function isNumber(value) {
  return typeof value === "number" && !Number.isNaN(value);
}
function isString(value) {
  return typeof value === "string";
}
function isBoolean(value) {
  return typeof value === "boolean";
}
function isFunction(value) {
  return typeof value === "function";
}
function isArray(value) {
  return Array.isArray(value);
}
function createRegex(regex) {
  return isString(regex) ? new RegExp(regex) : regex;
}
function isWindow(value) {
  return value === window;
}
function createContext(provide) {
  return { id: Symbol(), provide };
}
function provideContext(context, value, scope = getScope()) {
  var _a3;
  const hasProvidedValue = !isUndefined(value);
  setContext(context.id, hasProvidedValue ? value : (_a3 = context.provide) == null ? void 0 : _a3.call(context), scope);
}
function useContext(context) {
  const value = getContext(context.id);
  return value;
}
function hasProvidedContext(context) {
  return !isUndefined(getContext(context.id));
}
var StoreFactory = class {
  constructor(record) {
    this.id = Symbol(0);
    this.record = record;
    this.v = Object.getOwnPropertyDescriptors(record);
  }
  create() {
    const store = {}, state = new Proxy(store, { get: (_, prop2) => store[prop2]() });
    for (const name of Object.keys(this.record)) {
      const getter = this.v[name].get;
      store[name] = getter ? computed(getter.bind(state)) : signal(this.record[name]);
    }
    return store;
  }
  reset(record, filter) {
    for (const name of Object.keys(record)) {
      if (!this.v[name].get && (!filter || filter(name))) {
        record[name].set(this.record[name]);
      }
    }
  }
};
function useStore(store) {
  return useContext(store);
}
var effect = effect$1;
function unwrap(fn) {
  return isFunction(fn) ? fn() : fn;
}
function unwrapDeep(fn) {
  let value = fn;
  while (typeof value === "function")
    value = value();
  return value;
}
var EVENT = Event;
var DOM_EVENT = Symbol("DOM_EVENT");
var _a$1;
var DOMEvent = class extends EVENT {
  constructor(type, ...init) {
    var _a3, _b2;
    super(type, init[0]);
    this[_a$1] = true;
    this.detail = (_a3 = init[0]) == null ? void 0 : _a3.detail;
    this.trigger = (_b2 = init[0]) == null ? void 0 : _b2.trigger;
  }
  /**
   * Walks up the event chain (following each `trigger`) and returns the origin event
   * that started the chain.
   */
  get originEvent() {
    return getOriginEvent(this) ?? this;
  }
  /**
   * Walks up the event chain (following each `trigger`) and determines whether the initial
   * event was triggered by the end user (ie: check whether `isTrusted` on the `originEvent` `true`).
   */
  get isOriginTrusted() {
    var _a3;
    return ((_a3 = getOriginEvent(this)) == null ? void 0 : _a3.isTrusted) ?? false;
  }
};
_a$1 = DOM_EVENT;
function isDOMEvent(event) {
  return !!(event == null ? void 0 : event[DOM_EVENT]);
}
function getOriginEvent(event) {
  let trigger = event.trigger;
  while (trigger && trigger.trigger) {
    trigger = trigger.trigger;
  }
  return trigger;
}
function walkTriggerEventChain(event, callback) {
  if (!isDOMEvent(event))
    return;
  let trigger = event.trigger;
  while (trigger) {
    const returnValue = callback(trigger);
    if (returnValue)
      return [trigger, returnValue];
    trigger = trigger.trigger;
  }
  return;
}
function findTriggerEvent(event, type) {
  var _a3;
  return (_a3 = walkTriggerEventChain(event, (e) => e.type === type)) == null ? void 0 : _a3[0];
}
function hasTriggerEvent(event, type) {
  return !!findTriggerEvent(event, type);
}
function appendTriggerEvent(event, trigger) {
  const origin = getOriginEvent(event) ?? event;
  if (origin === trigger) {
    throw Error(
      ""
    );
  }
  Object.defineProperty(origin, "trigger", {
    configurable: true,
    enumerable: true,
    get: () => trigger
  });
}
var EventsTarget = class extends EventTarget {
  addEventListener(type, callback, options) {
    return super.addEventListener(type, callback, options);
  }
  removeEventListener(type, callback, options) {
    return super.removeEventListener(type, callback, options);
  }
};
function listenEvent(target, type, handler, options) {
  target.addEventListener(type, handler, options);
  return onDispose(() => target.removeEventListener(type, handler, options));
}
function isPointerEvent(event) {
  return !!(event == null ? void 0 : event.type.startsWith("pointer"));
}
function isTouchEvent(event) {
  return !!(event == null ? void 0 : event.type.startsWith("touch"));
}
function isMouseEvent(event) {
  return /^(click|mouse)/.test((event == null ? void 0 : event.type) ?? "");
}
function isKeyboardEvent(event) {
  return !!(event == null ? void 0 : event.type.startsWith("key"));
}
function wasEnterKeyPressed(event) {
  return isKeyboardEvent(event) && event.key === "Enter";
}
function wasEscapeKeyPressed(event) {
  return isKeyboardEvent(event) && event.key === "Escape";
}
function isKeyboardClick(event) {
  return isKeyboardEvent(event) && (event.key === "Enter" || event.key === " ");
}
function isDOMNode(node) {
  return node instanceof Node;
}
function isDOMElement(node) {
  return isDOMNode(node) && node.nodeType === 1;
}
function isDOMFragment(node) {
  return isDOMNode(node) && node.nodeType === 11;
}
function createFragment() {
  return document.createDocumentFragment();
}
function createComment(data) {
  return document.createComment(data);
}
function setAttribute(host, name, value) {
  if (!value && value !== "" && value !== 0) {
    host.removeAttribute(name);
  } else {
    const attrValue = value + "";
    if (host.getAttribute(name) !== attrValue) {
      host.setAttribute(name, attrValue);
    }
  }
}
function setStyle(host, property, value) {
  if (!value && value !== 0) {
    host.style.removeProperty(property);
  } else {
    host.style.setProperty(property, value + "");
  }
}
function toggleClass(host, name, value) {
  host.classList[value ? "add" : "remove"](name);
}
function getSlottedChildren(el, name) {
  var _a3;
  const selector = name ? `slot[name="${name}"]` : "slot:not([name])";
  const slot = (_a3 = el.shadowRoot) == null ? void 0 : _a3.querySelector(selector);
  const childNodes = (slot == null ? void 0 : slot.assignedNodes({ flatten: true })) ?? [];
  return Array.prototype.filter.call(childNodes, (node) => node.nodeType == 1);
}
function attachDeclarativeShadowDOM(element) {
  const template = element.firstChild;
  const mode = template.getAttribute("shadowroot");
  const shadowRoot = template.parentNode.attachShadow({ mode });
  shadowRoot.appendChild(template.content);
  template.remove();
}
function run(fn) {
  return fn();
}
function runAll(fns, arg) {
  for (const fn of fns)
    fn(arg);
}
function camelToKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function camelToTitleCase(str) {
  return uppercaseFirstChar(str.replace(/([A-Z])/g, " $1"));
}
function kebabToCamelCase(str) {
  return str.replace(/-./g, (x) => x[1].toUpperCase());
}
function kebabToPascalCase(str) {
  return kebabToTitleCase(str).replace(/\s/g, "");
}
function kebabToTitleCase(str) {
  return uppercaseFirstChar(str.replace(/-./g, (x) => " " + x[1].toUpperCase()));
}
function uppercaseFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function lowercaseFirstLetter(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}
var trailingSemicolon = /;\s*$/;
function trimTrailingSemicolon(text) {
  return text.replace(trailingSemicolon, "");
}
function flattenArray(array) {
  const flat = [];
  for (let i = 0; i < array.length; i++) {
    if (isArray(array[i])) {
      flat.push(...flattenArray(array[i]));
    } else if (array[i] || array[i] === 0) {
      flat.push(array[i]);
    }
  }
  return flat;
}
var ComponentController = class {
  /**
   * The custom element this component is attached to. This is safe to use server-side with the
   * limited API listed below.
   *
   * **Important:** Only specific DOM APIs are safe to call server-side. This includes:
   *
   * - Attributes: `getAttribute`, `setAttribute`, `removeAttribute`, and `hasAttribute`
   * - Classes: `classList` API
   * - Styles: `style` API
   * - Events (noop): `addEventListener`, `removeEventListener`, and `dispatchEvent`
   */
  get el() {
    return this.instance.m;
  }
  /**
   * Reactive component properties.
   */
  get $props() {
    return this.instance.e;
  }
  /**
   * Reactive component store.
   */
  get $store() {
    return this.instance.k;
  }
  constructor(instance) {
    this.instance = instance;
    if (this.onAttach)
      instance.d.push(this.onAttach.bind(this));
    if (this.onConnect)
      instance.p.push(this.onConnect.bind(this));
    if (this.onDisconnect)
      instance.i.push(this.onDisconnect.bind(this));
    if (this.onDestroy)
      instance.x.push(this.onDestroy.bind(this));
  }
  /**
   * This method can be used to specify attributes that should be set on the host element. Any
   * attributes that are assigned to a function will be considered a signal and updated accordingly.
   */
  setAttributes(attributes) {
    if (this.instance.f)
      Object.assign(this.instance.f, attributes);
  }
  /**
   * This method can be used to specify styles that should set be set on the host element. Any
   * styles that are assigned to a function will be considered a signal and updated accordingly.
   */
  setStyles(styles) {
    if (this.instance.q)
      Object.assign(this.instance.q, styles);
  }
  /**
   * This method is used to satisfy the CSS variables contract specified on the current
   * custom element definition. Other CSS variables can be set via the `setStyles` method.
   */
  setCSSVars(vars) {
    this.setStyles(vars);
  }
  /**
   * Type-safe utility for creating component DOM events.
   */
  createEvent(type, ...init) {
    return new DOMEvent(type, init[0]);
  }
  /**
   * Creates a `DOMEvent` and dispatches it from the host element. This method is typed to
   * match all component events.
   */
  dispatch(type, ...init) {
    if (!this.el)
      return;
    const event = new DOMEvent(type, init[0]);
    this.el.dispatchEvent(event);
  }
  /**
   * Adds an event listener for the given `type` and returns a function which can be invoked to
   * remove the event listener.
   *
   * - The listener is removed if the current scope is disposed.
   * - This method is safe to use on the server (noop).
   */
  listen(type, handler, options) {
    if (!this.el)
      return noop;
    return listenEvent(this.el, type, handler, options);
  }
};
var Component = class extends ComponentController {
  constructor(instance) {
    super(instance);
    if (this.render && !instance.F && !instance.h) {
      instance.h = this.render.bind(this);
    }
  }
  destroy() {
    this.instance.y();
  }
};
var createMarkerWalker = (root4) => (
  // @ts-expect-error - filter accepts `boolean` but not typed.
  document.createTreeWalker(root4, NodeFilter.SHOW_COMMENT, (node) => node.nodeValue === "$")
);
var hydration = null;
function runHydration(run2, options) {
  const prev = hydration;
  hydration = { w: createMarkerWalker(options.target) };
  const result = run2();
  hydration = prev;
  return result;
}
var CONNECTED = /* @__PURE__ */ Symbol(0);
var INSERT_MARKER_NODE = createComment("$$");
var END_MARKER = /* @__PURE__ */ Symbol(0);
var END_MARKER_NODE = /* @__PURE__ */ createComment("/$");
var ARRAY_END_MARKER_VALUE = "/[]";
function insertLite(parent, value, before) {
  let isSignal = isFunction(value);
  if (isSignal && value[$$CHILDREN]) {
    value = value();
    isSignal = isFunction(value);
  }
  if (isSignal) {
    insertEffect(parent, value, before);
  } else if (!hydration && (value || value === 0)) {
    addChild(
      parent,
      isArray(value) ? resolveArray2(value) : isDOMNode(value) ? value : document.createTextNode(value + ""),
      before
    );
  }
}
function addChild(parent, node, before) {
  if (!node)
    return;
  if (before)
    parent.insertBefore(node, before);
  else
    parent.appendChild(node);
}
function insertEffect(parent, value, before) {
  const marker = before && before.nodeType === 8 ? before : INSERT_MARKER_NODE.cloneNode();
  if (marker !== before)
    addChild(parent, marker, before);
  effect(() => void insertExpression2(marker, unwrapDeep(value)));
}
function insertExpression2(start, value) {
  const end = start[END_MARKER];
  if (isArray(value)) {
    if (hydration) {
      start[END_MARKER] = findArrayEndMarker(start);
    } else {
      if (end)
        removeOldNodes(start, end);
      const fragment = resolveArray2(value);
      if (!fragment)
        return;
      if (!end)
        fragment.appendChild(createEndMarker(start));
      start.after(fragment);
    }
  } else if (isDOMNode(value)) {
    if (end)
      removeOldNodes(start, end);
    if (!hydration)
      start.after(value);
    if (!end)
      value.after(createEndMarker(start));
  } else if (isString(value) || isNumber(value)) {
    if (start[CONNECTED]) {
      start.nextSibling.data = value + "";
      return;
    }
    if (end)
      removeOldNodes(start, end);
    let text;
    if (!hydration) {
      text = document.createTextNode(value + "");
      start.after(text);
    } else {
      text = start.nextSibling;
    }
    start[CONNECTED] = true;
    if (!end)
      text.after(createEndMarker(start));
  } else if (end) {
    removeOldNodes(start, end);
  }
}
function createEndMarker(start) {
  return start[END_MARKER] = END_MARKER_NODE.cloneNode();
}
function findArrayEndMarker(node) {
  while (node) {
    if (node.nodeType === 8 && node.nodeValue === ARRAY_END_MARKER_VALUE)
      return node;
    node = node.nextSibling;
  }
}
function removeOldNodes(start, end) {
  while (start.nextSibling !== end)
    start.nextSibling.remove();
  start[CONNECTED] = false;
}
function resolveArray2(value) {
  const flattened = flattenArray(value);
  if (!flattened.length)
    return null;
  const fragment = createFragment();
  for (let i = 0; i < flattened.length; i++) {
    const child = flattened[i];
    if (isFunction(child)) {
      insertEffect(fragment, child);
    } else {
      fragment.append(child);
    }
  }
  return fragment;
}
function registerLiteCustomElement(Component2) {
  register$1(Component2, {
    insert: insertLite
  });
}
var DOM_ELEMENT_REGISTRY = Symbol(0);
function register$1(Component2, init) {
  const tagName = Component2.el.tagName;
  if (!window.customElements.get(tagName)) {
    if (!window[DOM_ELEMENT_REGISTRY])
      window[DOM_ELEMENT_REGISTRY] = /* @__PURE__ */ new Map();
    window[DOM_ELEMENT_REGISTRY].set(tagName, Component2);
    window.customElements.define(tagName, createHTMLElement(Component2, init));
  }
}
function $$_create_template(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content;
}
function $$_create_walker(fragment, walker = hydration == null ? void 0 : hydration.w) {
  try {
    return [$$_next_element(walker), walker];
  } catch (e) {
    return $$_create_walker(fragment, createMarkerWalker(document.importNode(fragment, true)));
  }
}
function $$_next_template(fragment) {
  return $$_create_walker(fragment)[0];
}
function $$_next_element(walker) {
  let element = walker.nextNode().nextSibling;
  if (element.localName.indexOf("-") > 0 && element.firstChild && element.firstChild.nodeName === "SHADOW-ROOT") {
    let node = element.firstChild.nextSibling || element.nextSibling;
    if (node)
      walker.currentNode = node;
  }
  return element;
}
var $$_hydrating = hydration;
function $$_setup_custom_element(host, props) {
  var _a3;
  const Component2 = (_a3 = window[DOM_ELEMENT_REGISTRY]) == null ? void 0 : _a3.get(host.localName);
  if (!Component2) {
    throw Error(
      host.localName
    );
  }
  const component = createComponent(Component2, { props });
  host.attachComponent(component);
  return component.instance.c;
}
function $$_clone(fragment) {
  const clone = document.importNode(fragment, true);
  return clone.firstElementChild;
}
function $$_create_element(tagName) {
  return document.createElement(tagName);
}
var $$_insert_lite = insertLite;
function $$_insert_at_marker_lite(marker, value) {
  insertLite(marker.parentElement, value, marker);
}
function $$_create_component(component, props = {}) {
  return peek(() => component(props));
}
var $$CHILDREN = /* @__PURE__ */ Symbol(0);
function $$_ref(element, ref) {
  if (isArray(ref)) {
    ref.filter(isFunction).forEach((ref2) => ref2(element));
  } else if (isFunction(ref)) {
    ref(element);
  }
}
var $$_attr = setAttribute;
function $$_listen(target, type, handler, capture = false) {
  if (isFunction(handler)) {
    listenEvent(target, type, handler, { capture });
  }
}
var $$_peek = peek;
var $$_scoped = scoped;
var $$_effect = effect;
var $$_computed = computed;
var CONNECT = /* @__PURE__ */ Symbol(0);
var PROPS = /* @__PURE__ */ Symbol(0);
var METHODS = /* @__PURE__ */ Symbol(0);
function createComponent(Component2, init) {
  const instance = new ComponentInstance(Component2, init);
  return scoped(() => new Component2(instance), instance.c);
}
var ComponentInstance = class {
  constructor(Component2, init = {}) {
    this.m = null;
    this.h = null;
    this.F = false;
    this.j = false;
    this.f = {};
    this.q = {};
    this.e = {};
    this.z = null;
    this.k = null;
    this.d = [];
    this.p = [];
    this.i = [];
    this.x = [];
    root((dispose2) => {
      var _a3;
      this.c = getScope();
      this.G = dispose2;
      if (init.scope)
        init.scope.append(this.c);
      const store = Component2.el.store;
      if (store) {
        this.k = store.create();
        this.z = new Proxy(this.k, {
          get: (_, prop2) => this.k[prop2]()
        });
        provideContext(store, this.k);
      }
      const props = Component2.el.props;
      if (props) {
        this.e = createInstanceProps(props);
        if (init.props) {
          for (const prop2 of Object.keys(init.props)) {
            if (prop2 in props) {
              const value = init.props[prop2];
              if (isFunction$1(value)) {
                effect$1(() => void this.e[prop2].set(value()));
              } else {
                this.e[prop2].set(value);
              }
            }
          }
        }
      }
      if ((_a3 = init.props) == null ? void 0 : _a3.innerHTML) {
        this.F = true;
      }
      onDispose(this.y.bind(this));
    });
  }
  y() {
    var _a3;
    if (this.j)
      return;
    this.j = true;
    for (const destroy of this.x) {
      scoped(() => destroy(this.m), this.c);
    }
    (_a3 = this.m) == null ? void 0 : _a3.destroy();
    this.d.length = 0;
    this.p.length = 0;
    this.i.length = 0;
    this.x.length = 0;
    tick();
    this.G();
    this.m = null;
    this.h = null;
  }
};
function createInstanceProps(defs) {
  const props = {};
  for (const name of Object.keys(defs)) {
    const def = defs[name];
    props[name] = signal(def.value, def);
  }
  return props;
}
async function setup(host) {
  var _a3;
  const parent = findParent(host);
  const hostCtor = host.constructor, componentCtor = hostCtor.a;
  if (parent) {
    await customElements.whenDefined(parent.localName);
    parent[CONNECT] === true || await new Promise((res) => parent[CONNECT].push(res));
  }
  if (host.isConnected) {
    if (parent == null ? void 0 : parent.keepAlive)
      host.keepAlive = true;
    host.attachComponent(
      createComponent(componentCtor, {
        scope: (_a3 = parent == null ? void 0 : parent.component) == null ? void 0 : _a3.instance.c
      })
    );
  }
}
function resolvePropsFromAttrs(host) {
  var _a3;
  const hostCtor = host.constructor, componentCtor = hostCtor.a, props = {};
  if (!hostCtor.f)
    return props;
  for (const attr of host.attributes) {
    let propName = hostCtor.f.get(attr.name), convert = propName && ((_a3 = componentCtor.el.props[propName].type) == null ? void 0 : _a3.from);
    if (convert) {
      let attrValue = host.getAttribute(attr.name);
      props[propName] = convert(attrValue);
    }
  }
  return props;
}
function findParent(host) {
  let hostCtor = host.constructor, componentCtor = hostCtor.a, node = host.parentNode, prefix = componentCtor.el.tagName.split("-", 1)[0] + "-";
  while (node) {
    if (node.nodeType === 1 && node.localName.startsWith(prefix)) {
      return node;
    }
    node = node.parentNode;
  }
  return null;
}
function createHTMLElement(Component2, init) {
  const _register = Component2.register;
  if (Component2.register) {
    const result = isArray(_register) ? _register : _register == null ? void 0 : _register();
    if (isArray(result))
      for (const Component3 of result)
        register$1(Component3, init);
  }
  let attrs;
  if (Component2.el.props) {
    attrs = /* @__PURE__ */ new Map();
    for (const propName of Object.keys(Component2.el.props)) {
      const def = Component2.el.props[propName];
      const attr = def.attribute;
      if (attr !== false) {
        const attrName = attr ?? camelToKebabCase(propName);
        attrs.set(attrName, propName);
      }
    }
  }
  class MaverickElement extends HTMLCustomElement {
    static get a() {
      return Component2;
    }
  }
  MaverickElement.H = init;
  MaverickElement.f = attrs;
  const proto = MaverickElement.prototype, componentProto = Component2.prototype;
  if (Component2.el.props) {
    for (const prop2 of Object.keys(Component2.el.props)) {
      Object.defineProperty(proto, prop2, {
        enumerable: true,
        configurable: true,
        get() {
          return !this.component ? Component2.el.props[prop2].value : this.component.instance.e[prop2]();
        },
        set(value) {
          const fn = () => this.component.instance.e[prop2].set(value);
          if (!this.component) {
            this.l.delete(prop2);
            this.l.set(prop2, fn);
            return;
          }
          fn();
        }
      });
    }
  }
  if (componentProto[PROPS]) {
    for (const name of componentProto[PROPS]) {
      Object.defineProperty(proto, name, {
        enumerable: true,
        configurable: true,
        get() {
          return this.component ? this.component[name] : void 0;
        },
        set(value) {
          if (!this.component) {
            this.l.delete(name);
            this.l.set(name, () => {
              this.component[name] = value;
            });
            return;
          }
          this.component[name] = value;
        }
      });
    }
  }
  if (componentProto[METHODS]) {
    for (const name of componentProto[METHODS]) {
      proto[name] = function(...args) {
        return this.component[name](...args);
      };
    }
  }
  return MaverickElement;
}
var HTML_ELEMENT = HTMLElement;
var _a;
var HTMLCustomElement = class extends HTML_ELEMENT {
  constructor() {
    super(...arguments);
    this.r = false;
    this.j = false;
    this.a = null;
    this.s = null;
    this.d = /* @__PURE__ */ new Set();
    this.i = [];
    this.l = /* @__PURE__ */ new Map();
    this.keepAlive = false;
    this[_a] = [];
    this.B = false;
  }
  get A() {
    return this.hasAttribute("mk-d");
  }
  get component() {
    return this.a;
  }
  get $store() {
    var _a3;
    return (_a3 = this.a) == null ? void 0 : _a3.instance.k;
  }
  get state() {
    return this.a.instance.z;
  }
  static get observedAttributes() {
    return this.f ? Array.from(this.f.keys()) : [];
  }
  attributeChangedCallback(name, _, newValue) {
    var _a3, _b2;
    const ctor = this.constructor;
    if (!this.a || !ctor.f)
      return;
    const propName = ctor.f.get(name);
    const from = (_b2 = (_a3 = ctor.a.el.props[propName]) == null ? void 0 : _a3.type) == null ? void 0 : _b2.from;
    if (from)
      this.a.instance.e[propName].set(from(newValue));
  }
  connectedCallback() {
    var _a3;
    const instance = (_a3 = this.a) == null ? void 0 : _a3.instance;
    if (!this.A && !instance)
      return this.N();
    if (!instance || !this.isConnected || this.r)
      return;
    if (this.j) {
      return;
    }
    if (this.hasAttribute("keep-alive"))
      this.keepAlive = true;
    this.r = true;
    if (instance.p.length) {
      scoped(() => {
        root((dispose2) => {
          this.s = getScope();
          for (const connectCallback of instance.p) {
            scoped(() => {
              const disconnectCallback = connectCallback(this);
              if (isFunction$1(disconnectCallback)) {
                this.i.push(disconnectCallback);
              }
            }, this.s);
          }
          this.i.push(dispose2);
        });
      }, instance.c);
    }
    if (isArray(this[CONNECT])) {
      runAll(this[CONNECT], this);
      this[CONNECT] = true;
    }
    return;
  }
  disconnectedCallback() {
    var _a3;
    const instance = (_a3 = this.a) == null ? void 0 : _a3.instance;
    if (!this.r || this.j)
      return;
    this.r = false;
    for (const callback of this.i) {
      scoped(callback, this.s);
    }
    if (instance == null ? void 0 : instance.i.length) {
      for (const callback of instance.i) {
        scoped(() => callback(this), instance.c);
      }
    }
    this.s = null;
    if (!this.A && !this.keepAlive) {
      requestAnimationFrame(() => {
        if (!this.isConnected) {
          instance == null ? void 0 : instance.y();
          this.j = true;
        }
      });
    }
  }
  attachComponent(component) {
    const instance = component.instance, ctor = this.constructor, def = ctor.a.el, init = ctor.H;
    if (this.a || this.j)
      return;
    scoped(() => {
      var _a3;
      this.o = instance.h ? def.shadowRoot ? this.shadowRoot ?? this.attachShadow(isBoolean(def.shadowRoot) ? { mode: "open" } : def.shadowRoot) : resolveShadowRootElement(this) : null;
      if (!hydration && def.shadowRoot && def.css && (init == null ? void 0 : init.adoptCSS)) {
        init.adoptCSS(this.o, def.css);
      }
      instance.m = this;
      this.a = component;
      const attrValues = resolvePropsFromAttrs(this);
      for (const name of Object.keys(attrValues)) {
        instance.e[name].set(attrValues[name]);
      }
      if ((_a3 = this.l) == null ? void 0 : _a3.size) {
        for (const action of this.l.values())
          action();
      }
      this.l = null;
      for (const callback of [...instance.d, ...this.d]) {
        scoped(() => callback(this), instance.c);
      }
      instance.d.length = 0;
      this.d = null;
      const $attrs = instance.f, $styles = instance.q;
      if ($attrs) {
        for (const name of Object.keys($attrs)) {
          if (isFunction$1($attrs[name])) {
            effect$1(() => setAttribute(this, name, $attrs[name]()));
          } else {
            setAttribute(this, name, $attrs[name]);
          }
        }
      }
      if ($styles) {
        for (const name of Object.keys($styles)) {
          if (isFunction$1($styles[name])) {
            effect$1(() => setStyle(this, name, $styles[name]()));
          } else {
            setStyle(this, name, $styles[name]);
          }
        }
      }
      this.dispatchEvent(new Event("attached"));
      if (this.o && init && instance.h) {
        const insert2 = () => init.insert(this.o, instance.h);
        if (this.hasAttribute("mk-h") && !ctor.a.el.nohydrate) {
          runHydration(insert2, { target: this.o });
        } else {
          insert2();
        }
      }
      this.connectedCallback();
    }, instance.c);
  }
  subscribe(callback) {
    return scoped(() => {
      return effect$1(() => callback(this.a.instance.z));
    }, this.a.instance.c);
  }
  onAttach(callback) {
    if (this.a) {
      callback(this);
      return noop;
    } else {
      this.d.add(callback);
      return () => {
        var _a3;
        return (_a3 = this.d) == null ? void 0 : _a3.delete(callback);
      };
    }
  }
  onEventDispatch(callback) {
    const ctor = this.constructor;
    if (ctor.n)
      for (const eventType of ctor.n)
        callback(eventType);
    this.I = callback;
  }
  destroy() {
    var _a3;
    this.disconnectedCallback();
    (_a3 = this.a) == null ? void 0 : _a3.destroy();
    this.a = null;
    this.j = true;
  }
  dispatchEvent(event) {
    var _a3;
    if (this.A) {
      const ctor = this.constructor;
      if (!ctor.n)
        ctor.n = /* @__PURE__ */ new Set();
      if (!ctor.n.has(event.type)) {
        (_a3 = this.I) == null ? void 0 : _a3.call(this, event.type);
        ctor.n.add(event.type);
      }
    }
    return untrack(() => super.dispatchEvent(event));
  }
  async N() {
    if (this.B)
      return;
    this.B = true;
    await setup(this);
    this.B = false;
  }
  P(code) {
  }
};
_a = CONNECT;
function resolveShadowRootElement(root4) {
  if (root4.firstChild && isDOMElement(root4.firstChild) && root4.firstChild.localName === "shadow-root") {
    return root4.firstChild;
  } else {
    const shadowRoot = $$_create_element("shadow-root");
    root4.prepend(shadowRoot);
    return shadowRoot;
  }
}
var PROP_DEF = Symbol(0);
function defineProp(definition) {
  return { [PROP_DEF]: true, ...definition };
}
function defineElement(declaration) {
  var _a3;
  if ("props" in declaration) {
    const props = declaration.props;
    for (const name of Object.keys(props)) {
      const def = ((_a3 = props[name]) == null ? void 0 : _a3[PROP_DEF]) ? props[name] : { [PROP_DEF]: true, value: props[name] };
      if (def.attribute !== false && !def.type)
        def.type = inferAttributeType(def.value);
      props[name] = def;
    }
  }
  return declaration;
}
var STRING = {
  from: (v) => v === null ? "" : v + ""
};
var NUMBER = {
  from: (v) => v === null ? 0 : Number(v)
};
var BOOLEAN = {
  from: (v) => v !== null,
  to: (v) => v ? "" : null
};
var FUNCTION = {
  from: false,
  to: () => null
};
var ARRAY = {
  from: (v) => v === null ? [] : JSON.parse(v),
  to: (v) => JSON.stringify(v)
};
var OBJECT = {
  from: (v) => v === null ? {} : JSON.parse(v),
  to: (v) => JSON.stringify(v)
};
function inferAttributeType(value) {
  if (value === null)
    return STRING;
  switch (typeof value) {
    case "undefined":
      return STRING;
    case "string":
      return STRING;
    case "boolean":
      return BOOLEAN;
    case "number":
      return NUMBER;
    case "function":
      return FUNCTION;
    case "object":
      return isArray(value) ? ARRAY : OBJECT;
    default:
      return STRING;
  }
}
function prop(target, propertyKey, descriptor) {
  if (!target[PROPS])
    target[PROPS] = /* @__PURE__ */ new Set();
  target[PROPS].add(propertyKey);
}
function method(target, propertyKey, descriptor) {
  if (!target[METHODS])
    target[METHODS] = /* @__PURE__ */ new Set();
  target[METHODS].add(propertyKey);
}
function ariaBool$1(value) {
  return value ? "true" : "false";
}
function createDisposalBin() {
  const disposal = /* @__PURE__ */ new Set();
  return {
    add(...callbacks) {
      for (const callback of callbacks)
        disposal.add(callback);
    },
    empty() {
      for (const callback of disposal)
        callback();
      disposal.clear();
    }
  };
}
function useDisposalBin() {
  const disposal = createDisposalBin();
  onDispose(disposal.empty);
  return disposal;
}
function keysOf(obj) {
  return Object.keys(obj);
}
function mergeProperties(...sources) {
  const target = {};
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    if (source) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    }
  }
  return target;
}
function pick(source, props) {
  const target = {};
  for (const prop2 of props) {
    Object.defineProperty(target, prop2, Object.getOwnPropertyDescriptor(source, prop2));
  }
  return target;
}
function omit(source, props) {
  return pick(
    source,
    keysOf(source).filter((key2) => !props.includes(key2))
  );
}
function deferredPromise() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}
function timedPromise(promise, timeout, timeoutMsg) {
  const timer = new Promise((_, reject) => {
    const timerId = setTimeout(() => {
      clearTimeout(timerId);
      reject(timeoutMsg);
    }, timeout);
  });
  return Promise.race([promise, timer]);
}
function waitTimeout(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
function waitAnimationFrame(callback) {
  return new Promise((resolve) => {
    window.requestAnimationFrame((time) => {
      callback == null ? void 0 : callback(time);
      resolve();
    });
  });
}
function animationFrameThrottle(func) {
  let id2 = -1, lastArgs;
  function throttle2(...args) {
    lastArgs = args;
    if (id2 >= 0)
      return;
    id2 = window.requestAnimationFrame(() => {
      func.apply(this, lastArgs);
      id2 = -1;
      lastArgs = void 0;
    });
  }
  return throttle2;
}
var requestIdleCallback = "requestIdleCallback" in window ? window.requestIdleCallback : (cb) => window.requestAnimationFrame(cb);
function waitIdlePeriod(callback, options) {
  return new Promise((resolve) => {
    requestIdleCallback((deadline) => {
      callback == null ? void 0 : callback(deadline);
      resolve();
    }, options);
  });
}
const std = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DOMEvent,
  EventsTarget,
  animationFrameThrottle,
  appendTriggerEvent,
  ariaBool: ariaBool$1,
  attachDeclarativeShadowDOM,
  camelToKebabCase,
  camelToTitleCase,
  createComment,
  createDisposalBin,
  createFragment,
  createRegex,
  deferredPromise,
  findTriggerEvent,
  flattenArray,
  getOriginEvent,
  getSlottedChildren,
  hasTriggerEvent,
  isArray,
  isBoolean,
  isDOMElement,
  isDOMEvent,
  isDOMFragment,
  isDOMNode,
  isFunction,
  isKeyboardClick,
  isKeyboardEvent,
  isMouseEvent,
  isNil,
  isNull,
  isNumber,
  isObject,
  isPointerEvent,
  isString,
  isTouchEvent,
  isUndefined,
  isWindow,
  kebabToCamelCase,
  kebabToPascalCase,
  kebabToTitleCase,
  keysOf,
  listenEvent,
  lowercaseFirstLetter,
  mergeProperties,
  noop,
  omit,
  pick,
  run,
  runAll,
  setAttribute,
  setStyle,
  timedPromise,
  toggleClass,
  trimTrailingSemicolon,
  unwrap,
  unwrapDeep,
  uppercaseFirstChar,
  useDisposalBin,
  waitAnimationFrame,
  waitIdlePeriod,
  waitTimeout,
  walkTriggerEventChain,
  wasEnterKeyPressed,
  wasEscapeKeyPressed
}, Symbol.toStringTag, { value: "Module" }));
function isHTMLAudioElement(element) {
  return element instanceof HTMLAudioElement;
}
function isHTMLVideoElement(element) {
  return element instanceof HTMLVideoElement;
}
function isHTMLMediaElement(element) {
  return isHTMLAudioElement(element) || isHTMLVideoElement(element);
}
const AUDIO_EXTENSIONS = /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i;
const AUDIO_TYPES = /* @__PURE__ */ new Set([
  "audio/mpeg",
  "audio/ogg",
  "audio/3gp",
  "audio/mp4",
  "audio/webm",
  "audio/flac"
]);
const VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i;
const VIDEO_TYPES = /* @__PURE__ */ new Set([
  "video/mp4",
  "video/webm",
  "video/3gp",
  "video/ogg",
  "video/avi",
  "video/mpeg"
]);
const HLS_VIDEO_EXTENSIONS = /\.(m3u8)($|\?)/i;
const HLS_VIDEO_TYPES = /* @__PURE__ */ new Set([
  // Apple sanctioned
  "application/vnd.apple.mpegurl",
  // Apple sanctioned for backwards compatibility
  "audio/mpegurl",
  // Very common
  "audio/x-mpegurl",
  // Very common
  "application/x-mpegurl",
  // Included for completeness
  "video/x-mpegurl",
  "video/mpegurl",
  "application/mpegurl"
]);
function isHLSSrc({ src, type }) {
  return typeof src === "string" && HLS_VIDEO_EXTENSIONS.test(src) || HLS_VIDEO_TYPES.has(type);
}
function isMediaStream(src) {
  return typeof window.MediaStream !== "undefined" && src instanceof window.MediaStream;
}
const $$_templ$l = /* @__PURE__ */ $$_create_template(`<!$><audio preload="none" aria-hidden="true"></audio>`), $$_templ_2$9 = $$_templ$l;
class AudioProviderLoader {
  constructor() {
    __publicField(this, "kh");
  }
  canPlay({ src, type }) {
    return isString(src) ? AUDIO_EXTENSIONS.test(src) || AUDIO_TYPES.has(type) || src.startsWith("blob:") && type === "audio/object" : type === "audio/object";
  }
  mediaType() {
    return "audio";
  }
  async load() {
    return new (await __vitePreload(() => import("./provider-6b9170de.js"), true ? ["assets/provider-6b9170de.js","assets/provider-167da691.js","assets/app-ef9c1d43.js"] : void 0)).AudioProvider(this.kh);
  }
  render($store) {
    return (() => {
      const [$$_root, $$_walker] = $$_create_walker($$_templ_2$9);
      $$_effect(() => $$_attr($$_root, "controls", $store.controls()));
      $$_effect(() => $$_attr($$_root, "crossorigin", $store.crossorigin()));
      $$_ref($$_root, (el) => void (this.kh = el));
      return $$_root;
    })();
  }
}
const $$_templ$k = /* @__PURE__ */ $$_create_template(`<!$><video preload="none" aria-hidden="true"></video>`), $$_templ_2$8 = $$_templ$k;
class VideoProviderLoader {
  constructor() {
    __publicField(this, "aa");
  }
  canPlay(src) {
    return isString(src.src) ? VIDEO_EXTENSIONS.test(src.src) || VIDEO_TYPES.has(src.type) || src.src.startsWith("blob:") && src.type === "video/object" || isHLSSrc(src) && canPlayHLSNatively() : src.type === "video/object";
  }
  mediaType() {
    return "video";
  }
  async load(context) {
    return new (await __vitePreload(() => import("./provider-9f3bc5d0.js"), true ? ["assets/provider-9f3bc5d0.js","assets/provider-167da691.js","assets/app-ef9c1d43.js"] : void 0)).VideoProvider(this.aa, context);
  }
  render($store) {
    const $poster = computed(() => $store.poster() && $store.controls() ? $store.poster() : null);
    return (() => {
      const [$$_root, $$_walker] = $$_create_walker($$_templ_2$8);
      $$_effect(() => $$_attr($$_root, "controls", $store.controls()));
      $$_effect(() => $$_attr($$_root, "crossorigin", $store.crossorigin()));
      $$_effect(() => $$_attr($$_root, "poster", $poster()));
      $$_ref($$_root, (el) => void (this.aa = el));
      return $$_root;
    })();
  }
}
const _HLSProviderLoader = class extends VideoProviderLoader {
  preconnect() {
    preconnect("https://cdn.jsdelivr.net", "preconnect");
  }
  canPlay({ src, type }) {
    return _HLSProviderLoader.supported && isString(src) && (HLS_VIDEO_EXTENSIONS.test(src) || HLS_VIDEO_TYPES.has(type));
  }
  async load(context) {
    return new (await __vitePreload(() => import("./provider-0b837c40.js"), true ? ["assets/provider-0b837c40.js","assets/provider-9f3bc5d0.js","assets/provider-167da691.js","assets/app-ef9c1d43.js"] : void 0)).HLSProvider(this.aa, context);
  }
};
let HLSProviderLoader = _HLSProviderLoader;
__publicField(HLSProviderLoader, "supported", isHLSSupported());
const LIST_ADD = Symbol(0);
const LIST_REMOVE = Symbol(0);
const LIST_RESET = Symbol(0);
const LIST_SELECT = Symbol(0);
const LIST_READONLY = Symbol(0);
const LIST_SET_READONLY = Symbol(0);
const LIST_ON_RESET = Symbol(0);
const LIST_ON_REMOVE = Symbol(0);
const LIST_ON_USER_SELECT = Symbol(0);
class List extends EventsTarget {
  constructor() {
    super(...arguments);
    __publicField(this, "a", []);
    /* @internal */
    __publicField(this, _a2, false);
  }
  get length() {
    return this.a.length;
  }
  get readonly() {
    return this[LIST_READONLY];
  }
  /**
   * Transform list to an array.
   */
  toArray() {
    return [...this.a];
  }
  [(_a2 = LIST_READONLY, Symbol.iterator)]() {
    return this.a.values();
  }
  /* @internal */
  [LIST_ADD](item, trigger) {
    const index = this.a.length;
    if (!("" + index in this)) {
      Object.defineProperty(this, index, {
        get() {
          return this.a[index];
        }
      });
    }
    if (this.a.includes(item))
      return;
    this.a.push(item);
    this.dispatchEvent(new DOMEvent("add", { detail: item, trigger }));
  }
  /* @internal */
  [LIST_REMOVE](item, trigger) {
    var _a3;
    const index = this.a.indexOf(item);
    if (index >= 0) {
      (_a3 = this[LIST_ON_REMOVE]) == null ? void 0 : _a3.call(this, item, trigger);
      this.a.splice(index, 1);
      this.dispatchEvent(new DOMEvent("remove", { detail: item, trigger }));
    }
  }
  /* @internal */
  [LIST_RESET](trigger) {
    var _a3;
    for (const item of [...this.a])
      this[LIST_REMOVE](item, trigger);
    this.a = [];
    this[LIST_SET_READONLY](false, trigger);
    (_a3 = this[LIST_ON_RESET]) == null ? void 0 : _a3.call(this);
  }
  /* @internal */
  [LIST_SET_READONLY](readonly, trigger) {
    if (this[LIST_READONLY] === readonly)
      return;
    this[LIST_READONLY] = readonly;
    this.dispatchEvent(new DOMEvent("readonly-change", { detail: readonly, trigger }));
  }
}
var key = {
  fullscreenEnabled: 0,
  fullscreenElement: 1,
  requestFullscreen: 2,
  exitFullscreen: 3,
  fullscreenchange: 4,
  fullscreenerror: 5,
  fullscreen: 6
};
var webkit = [
  "webkitFullscreenEnabled",
  "webkitFullscreenElement",
  "webkitRequestFullscreen",
  "webkitExitFullscreen",
  "webkitfullscreenchange",
  "webkitfullscreenerror",
  "-webkit-full-screen"
];
var moz = [
  "mozFullScreenEnabled",
  "mozFullScreenElement",
  "mozRequestFullScreen",
  "mozCancelFullScreen",
  "mozfullscreenchange",
  "mozfullscreenerror",
  "-moz-full-screen"
];
var ms = [
  "msFullscreenEnabled",
  "msFullscreenElement",
  "msRequestFullscreen",
  "msExitFullscreen",
  "MSFullscreenChange",
  "MSFullscreenError",
  "-ms-fullscreen"
];
var document$1 = typeof window !== "undefined" && typeof window.document !== "undefined" ? window.document : {};
var vendor = "fullscreenEnabled" in document$1 && Object.keys(key) || webkit[0] in document$1 && webkit || moz[0] in document$1 && moz || ms[0] in document$1 && ms || [];
var fscreen = {
  requestFullscreen: function(element) {
    return element[vendor[key.requestFullscreen]]();
  },
  requestFullscreenFunction: function(element) {
    return element[vendor[key.requestFullscreen]];
  },
  get exitFullscreen() {
    return document$1[vendor[key.exitFullscreen]].bind(document$1);
  },
  get fullscreenPseudoClass() {
    return ":" + vendor[key.fullscreen];
  },
  addEventListener: function(type, handler, options) {
    return document$1.addEventListener(vendor[key[type]], handler, options);
  },
  removeEventListener: function(type, handler, options) {
    return document$1.removeEventListener(vendor[key[type]], handler, options);
  },
  get fullscreenEnabled() {
    return Boolean(document$1[vendor[key.fullscreenEnabled]]);
  },
  set fullscreenEnabled(val) {
  },
  get fullscreenElement() {
    return document$1[vendor[key.fullscreenElement]];
  },
  set fullscreenElement(val) {
  },
  get onfullscreenchange() {
    return document$1[("on" + vendor[key.fullscreenchange]).toLowerCase()];
  },
  set onfullscreenchange(handler) {
    return document$1[("on" + vendor[key.fullscreenchange]).toLowerCase()] = handler;
  },
  get onfullscreenerror() {
    return document$1[("on" + vendor[key.fullscreenerror]).toLowerCase()];
  },
  set onfullscreenerror(handler) {
    return document$1[("on" + vendor[key.fullscreenerror]).toLowerCase()] = handler;
  }
};
var fscreen$1 = fscreen;
const CAN_FULLSCREEN = fscreen$1.fullscreenEnabled;
class FullscreenController extends ComponentController {
  constructor() {
    super(...arguments);
    /**
     * Tracks whether we're the active fullscreen event listener. Fullscreen events can only be
     * listened to globally on the document so we need to know if they relate to the current host
     * element or not.
     */
    __publicField(this, "b", false);
    __publicField(this, "c", false);
  }
  get active() {
    return this.c;
  }
  get supported() {
    return CAN_FULLSCREEN;
  }
  onConnect() {
    listenEvent(fscreen$1, "fullscreenchange", this.d.bind(this));
    listenEvent(fscreen$1, "fullscreenerror", this.e.bind(this));
  }
  async onDisconnect() {
    if (CAN_FULLSCREEN)
      await this.exit();
  }
  d(event) {
    const active = isFullscreen(this.el);
    if (active === this.c)
      return;
    if (!active)
      this.b = false;
    this.c = active;
    this.dispatch("fullscreen-change", { detail: active, trigger: event });
  }
  e(event) {
    if (!this.b)
      return;
    this.dispatch("fullscreen-error", { detail: null, trigger: event });
    this.b = false;
  }
  async enter() {
    try {
      this.b = true;
      if (!this.el || isFullscreen(this.el))
        return;
      assertFullscreenAPI();
      return fscreen$1.requestFullscreen(this.el);
    } catch (error) {
      this.b = false;
      throw error;
    }
  }
  async exit() {
    if (!this.el || !isFullscreen(this.el))
      return;
    assertFullscreenAPI();
    return fscreen$1.exitFullscreen();
  }
}
function canFullscreen() {
  return CAN_FULLSCREEN;
}
function isFullscreen(host) {
  if (fscreen$1.fullscreenElement === host)
    return true;
  try {
    return host.matches(
      // @ts-expect-error - `fullscreenPseudoClass` is missing from `@types/fscreen`.
      fscreen$1.fullscreenPseudoClass
    );
  } catch (error) {
    return false;
  }
}
function assertFullscreenAPI() {
  if (CAN_FULLSCREEN)
    return;
  throw Error(
    "[vidstack] no fullscreen API"
  );
}
const UA = navigator == null ? void 0 : navigator.userAgent.toLowerCase();
const IS_IOS = /iphone|ipad|ipod|ios|crios|fxios/i.test(UA);
const IS_IPHONE = /(iphone|ipod)/gi.test(navigator == null ? void 0 : navigator.platform);
const IS_CHROME = !!window.chrome;
const IS_SAFARI = !!window.safari || IS_IOS;
function canOrientScreen() {
  return !isUndefined(screen.orientation) && isFunction(screen.orientation.lock) && isFunction(screen.orientation.unlock);
}
function canPlayHLSNatively(video) {
  if (!video)
    video = document.createElement("video");
  return video.canPlayType("application/vnd.apple.mpegurl").length > 0;
}
function canUsePictureInPicture(video) {
  return !!document.pictureInPictureEnabled && !video.disablePictureInPicture;
}
function canUseVideoPresentation(video) {
  return isFunction(video.webkitSupportsPresentationMode) && isFunction(video.webkitSetPresentationMode);
}
async function canChangeVolume() {
  const video = document.createElement("video");
  video.volume = 0.5;
  await waitTimeout(0);
  return video.volume === 0.5;
}
function getMediaSource() {
  return (window == null ? void 0 : window.MediaSource) ?? (window == null ? void 0 : window.WebKitMediaSource);
}
function getSourceBuffer() {
  return (window == null ? void 0 : window.SourceBuffer) ?? (window == null ? void 0 : window.WebKitSourceBuffer);
}
function isHLSSupported() {
  const MediaSource = getMediaSource();
  if (isUndefined(MediaSource))
    return false;
  const isTypeSupported = MediaSource && isFunction(MediaSource.isTypeSupported) && MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
  const SourceBuffer = getSourceBuffer();
  const isSourceBufferValid = isUndefined(SourceBuffer) || !isUndefined(SourceBuffer.prototype) && isFunction(SourceBuffer.prototype.appendBuffer) && isFunction(SourceBuffer.prototype.remove);
  return !!isTypeSupported && !!isSourceBufferValid;
}
const CAN_USE_SCREEN_ORIENTATION_API = canOrientScreen();
class ScreenOrientationController extends ComponentController {
  constructor() {
    super(...arguments);
    __publicField(this, "g", signal(getScreenOrientation()));
    __publicField(this, "f", signal(false));
    __publicField(this, "h");
  }
  /**
   * The current screen orientation type.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get type() {
    return this.g();
  }
  /**
   * Whether the screen orientation is currently locked.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get locked() {
    return this.f();
  }
  /**
   * Whether the viewport is in a portrait orientation.
   *
   * @signal
   */
  get portrait() {
    return this.g().startsWith("portrait");
  }
  /**
   * Whether the viewport is in a landscape orientation.
   *
   * @signal
   */
  get landscape() {
    return this.g().startsWith("landscape");
  }
  /**
   * Whether the native Screen Orientation API is available.
   */
  get supported() {
    return CAN_USE_SCREEN_ORIENTATION_API;
  }
  onConnect() {
    if (CAN_USE_SCREEN_ORIENTATION_API) {
      listenEvent(screen.orientation, "change", this.i.bind(this));
    } else {
      const query = window.matchMedia("(orientation: landscape)");
      query.onchange = this.i.bind(this);
      return () => query.onchange = null;
    }
  }
  async onDisconnect() {
    if (CAN_USE_SCREEN_ORIENTATION_API && this.f())
      await this.unlock();
  }
  i(event) {
    this.g.set(getScreenOrientation());
    this.dispatch("orientation-change", {
      detail: {
        orientation: peek(this.g),
        lock: this.h
      },
      trigger: event
    });
  }
  /**
   * Locks the orientation of the screen to the desired orientation type using the
   * Screen Orientation API.
   *
   * @param lockType - The screen lock orientation type.
   * @throws Error - If screen orientation API is unavailable.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
   * @see {@link https://w3c.github.io/screen-orientation}
   */
  async lock(lockType) {
    if (peek(this.f) || this.h === lockType)
      return;
    assertScreenOrientationAPI();
    await screen.orientation.lock(lockType);
    this.f.set(true);
    this.h = lockType;
  }
  /**
   * Unlocks the orientation of the screen to it's default state using the Screen Orientation
   * API. This method will throw an error if the API is unavailable.
   *
   * @throws Error - If screen orientation API is unavailable.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
   * @see {@link https://w3c.github.io/screen-orientation}
   */
  async unlock() {
    if (!peek(this.f))
      return;
    assertScreenOrientationAPI();
    this.h = void 0;
    await screen.orientation.unlock();
    this.f.set(false);
  }
}
function assertScreenOrientationAPI() {
  if (CAN_USE_SCREEN_ORIENTATION_API)
    return;
  throw Error(
    "[vidstack] no orientation API"
  );
}
function getScreenOrientation() {
  if (CAN_USE_SCREEN_ORIENTATION_API)
    return window.screen.orientation.type;
  return window.innerWidth >= window.innerHeight ? "landscape-primary" : "portrait-primary";
}
function setAttributeIfEmpty(target, name, value) {
  if (!target.hasAttribute(name))
    target.setAttribute(name, value);
}
function setARIALabel(target, label) {
  if (target.hasAttribute("aria-label") || target.hasAttribute("aria-describedby"))
    return;
  function updateAriaDescription() {
    setAttribute(target, "aria-label", label());
  }
  effect(updateAriaDescription);
}
function isElementParent(owner, node, test) {
  while (node) {
    if (node === owner) {
      return true;
    } else if (node.localName === owner.localName || (test == null ? void 0 : test(node))) {
      break;
    } else {
      node = node.parentElement;
    }
  }
  return false;
}
function onPress(target, handler) {
  listenEvent(target, "pointerup", (event) => {
    if (event.button === 0)
      handler(event);
  });
  listenEvent(target, "keydown", (event) => {
    if (isKeyboardClick(event))
      handler(event);
  });
}
function scopedRaf(callback) {
  const scope = getScope();
  requestAnimationFrame(() => scoped(callback, scope));
}
const mediaContext = createContext();
function useMedia() {
  return useContext(mediaContext);
}
const MEDIA_ATTRIBUTES = [
  "autoplay",
  "autoplayError",
  "canFullscreen",
  "canPictureInPicture",
  "canLoad",
  "canPlay",
  "canSeek",
  "ended",
  "error",
  "fullscreen",
  "loop",
  "live",
  "liveEdge",
  "mediaType",
  "muted",
  "paused",
  "pictureInPicture",
  "playing",
  "playsinline",
  "seeking",
  "started",
  "streamType",
  "userIdle",
  "viewType",
  "waiting"
];
const MEDIA_KEY_SHORTCUTS = {
  togglePaused: "k Space",
  toggleMuted: "m",
  toggleFullscreen: "f",
  togglePictureInPicture: "i",
  toggleCaptions: "c",
  seekBackward: "ArrowLeft",
  seekForward: "ArrowRight",
  volumeUp: "ArrowUp",
  volumeDown: "ArrowDown"
};
const MODIFIER_KEYS = /* @__PURE__ */ new Set(["Shift", "Alt", "Meta", "Control"]), BUTTON_SELECTORS = 'button, [role="button"]', IGNORE_SELECTORS = 'input, textarea, select, [contenteditable], [role^="menuitem"]';
class MediaKeyboardController extends ComponentController {
  constructor(instance, _media) {
    super(instance);
    __publicField(this, "Ua");
    __publicField(this, "Ta", null);
    this.k = _media;
  }
  onConnect() {
    effect(this.Xa.bind(this));
  }
  Xa() {
    const { keyDisabled, keyTarget } = this.$props;
    if (keyDisabled())
      return;
    const target = keyTarget() === "player" ? this.el : document, $active = signal(false);
    if (target === this.el) {
      this.listen("focusin", () => $active.set(true));
      this.listen("focusout", (event) => {
        if (!this.el.contains(event.target))
          $active.set(false);
      });
    } else {
      if (!peek($active))
        $active.set(document.querySelector("media-player") === this.el);
      listenEvent(document, "focusin", (event) => {
        const activePlayer = event.composedPath().find((el) => el instanceof Element && el.localName === "media-player");
        if (activePlayer !== void 0)
          $active.set(this.el === activePlayer);
      });
    }
    effect(() => {
      if (!$active())
        return;
      listenEvent(target, "keyup", this.Ya.bind(this));
      listenEvent(target, "keydown", this.Za.bind(this));
      listenEvent(target, "keydown", this._a.bind(this), { capture: true });
    });
  }
  Ya(event) {
    const focused = document.activeElement, sliderFocused = focused == null ? void 0 : focused.hasAttribute("data-media-slider");
    if (!event.key || !this.$store.canSeek() || sliderFocused || (focused == null ? void 0 : focused.matches(IGNORE_SELECTORS))) {
      return;
    }
    const method2 = this.Va(event);
    if (method2 == null ? void 0 : method2.startsWith("seek")) {
      event.preventDefault();
      event.stopPropagation();
      if (this.Ta) {
        this.Wa(event);
        this.Ta = null;
      } else {
        this.k.remote.seek(this.Ua, event);
        this.Ua = void 0;
      }
    }
    if (method2 == null ? void 0 : method2.startsWith("volume")) {
      const volumeSlider = this.el.querySelector("media-volume-slider");
      volumeSlider == null ? void 0 : volumeSlider.dispatchEvent(new DOMEvent("keyup", { trigger: event }));
    }
  }
  Za(event) {
    var _a3, _b2;
    if (!event.key || MODIFIER_KEYS.has(event.key))
      return;
    const focused = document.activeElement;
    if ((focused == null ? void 0 : focused.matches(IGNORE_SELECTORS)) || isKeyboardClick(event) && (focused == null ? void 0 : focused.matches(BUTTON_SELECTORS))) {
      return;
    }
    const sliderFocused = focused == null ? void 0 : focused.hasAttribute("data-media-slider"), method2 = this.Va(event);
    if (!method2 && !event.metaKey && /[0-9]/.test(event.key) && !sliderFocused) {
      event.preventDefault();
      event.stopPropagation();
      this.k.remote.seek(this.$store.duration() / 10 * Number(event.key), event);
      return;
    }
    if (!method2 || /volume|seek/.test(method2) && sliderFocused)
      return;
    event.preventDefault();
    event.stopPropagation();
    switch (method2) {
      case "seekForward":
      case "seekBackward":
        this.$a(event, method2);
        break;
      case "volumeUp":
      case "volumeDown":
        const volumeSlider = this.el.querySelector("media-volume-slider");
        if (volumeSlider) {
          volumeSlider.dispatchEvent(new DOMEvent("keydown", { trigger: event }));
        } else {
          const value = event.shiftKey ? 0.1 : 0.05;
          this.k.remote.changeVolume(
            this.$store.volume() + (method2 === "volumeUp" ? +value : -value),
            event
          );
        }
        break;
      case "toggleFullscreen":
        this.k.remote.toggleFullscreen("prefer-media", event);
        break;
      default:
        (_b2 = (_a3 = this.k.remote)[method2]) == null ? void 0 : _b2.call(_a3, event);
    }
  }
  _a(event) {
    if (isHTMLMediaElement(event.target) && this.Va(event)) {
      event.preventDefault();
    }
  }
  Va(event) {
    const keyShortcuts = {
      ...this.$props.keyShortcuts(),
      ...this.k.ariaKeys
    };
    return Object.keys(keyShortcuts).find(
      (method2) => keyShortcuts[method2].split(" ").some(
        (keys) => replaceSymbolKeys(keys).replace(/Control/g, "Ctrl").split("+").every(
          (key2) => MODIFIER_KEYS.has(key2) ? event[key2.toLowerCase() + "Key"] : event.key === key2.replace("Space", " ")
        )
      )
    );
  }
  ab(event, type) {
    const seekBy = event.shiftKey ? 10 : 5;
    return this.Ua = Math.max(
      0,
      Math.min(
        (this.Ua ?? this.$store.currentTime()) + (type === "seekForward" ? +seekBy : -seekBy),
        this.$store.duration()
      )
    );
  }
  Wa(event) {
    var _a3;
    (_a3 = this.Ta) == null ? void 0 : _a3.dispatchEvent(new DOMEvent(event.type, { trigger: event }));
  }
  $a(event, type) {
    if (!this.$store.canSeek())
      return;
    if (!this.Ta)
      this.Ta = this.el.querySelector("media-time-slider");
    if (this.Ta) {
      this.Wa(event);
    } else {
      this.k.remote.seeking(this.ab(event, type), event);
    }
  }
}
const SYMBOL_KEY_MAP = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
function replaceSymbolKeys(key2) {
  return key2.replace(/Shift\+(\d)/g, (_, num) => SYMBOL_KEY_MAP[num - 1]);
}
const mediaPlayerProps = {
  autoplay: false,
  aspectRatio: defineProp({
    value: null,
    type: {
      from(value) {
        if (!value)
          return null;
        if (!value.includes("/"))
          return +value;
        const [width, height] = value.split("/").map(Number);
        return +(width / height).toFixed(4);
      }
    }
  }),
  controls: false,
  currentTime: 0,
  crossorigin: null,
  fullscreenOrientation: "landscape",
  load: "visible",
  logLevel: "silent",
  loop: false,
  muted: false,
  paused: true,
  playsinline: false,
  playbackRate: 1,
  poster: "",
  preload: "metadata",
  preferNativeHLS: defineProp({
    value: false,
    attribute: "prefer-native-hls"
  }),
  src: "",
  userIdleDelay: 2e3,
  viewType: "unknown",
  streamType: "unknown",
  volume: 1,
  liveEdgeTolerance: 10,
  minLiveDVRWindow: 60,
  keyDisabled: false,
  keyTarget: "player",
  keyShortcuts: MEDIA_KEY_SHORTCUTS,
  title: "",
  thumbnails: null,
  textTracks: defineProp({
    value: [],
    attribute: false
  }),
  smallBreakpointX: 600,
  largeBreakpointX: 980,
  smallBreakpointY: 380,
  largeBreakpointY: 600
};
class TimeRange {
  constructor(start, end) {
    __publicField(this, "W");
    if (isArray(start)) {
      this.W = start;
    } else if (!isUndefined(start) && !isUndefined(end)) {
      this.W = [[start, end]];
    } else {
      this.W = [];
    }
  }
  get length() {
    return this.W.length;
  }
  start(index) {
    return this.W[index][0] ?? Infinity;
  }
  end(index) {
    return this.W[index][1] ?? Infinity;
  }
}
function getTimeRangesStart(range) {
  if (!range.length)
    return null;
  let min = range.start(0);
  for (let i = 1; i < range.length; i++) {
    const value = range.start(i);
    if (value < min)
      min = value;
  }
  return min;
}
function getTimeRangesEnd(range) {
  if (!range.length)
    return null;
  let max = range.end(0);
  for (let i = 1; i < range.length; i++) {
    const value = range.end(i);
    if (value > max)
      max = value;
  }
  return max;
}
const MediaStoreFactory = new StoreFactory({
  audioTracks: [],
  audioTrack: null,
  autoplay: false,
  autoplayError: void 0,
  buffered: new TimeRange(),
  duration: 0,
  canLoad: false,
  canFullscreen: false,
  canPictureInPicture: false,
  canPlay: false,
  controls: false,
  crossorigin: null,
  poster: "",
  currentTime: 0,
  ended: false,
  error: void 0,
  fullscreen: false,
  loop: false,
  logLevel: "silent",
  mediaType: "unknown",
  muted: false,
  paused: true,
  played: new TimeRange(),
  playing: false,
  playsinline: false,
  pictureInPicture: false,
  preload: "metadata",
  playbackRate: 1,
  qualities: [],
  quality: null,
  autoQuality: false,
  canSetQuality: true,
  seekable: new TimeRange(),
  seeking: false,
  source: { src: "", type: "" },
  sources: [],
  started: false,
  title: "",
  textTracks: [],
  textTrack: null,
  thumbnails: null,
  thumbnailCues: [],
  volume: 1,
  waiting: false,
  get viewType() {
    return this.providedViewType !== "unknown" ? this.providedViewType : this.mediaType;
  },
  get streamType() {
    return this.providedStreamType !== "unknown" ? this.providedStreamType : this.inferredStreamType;
  },
  get currentSrc() {
    return this.source;
  },
  get bufferedStart() {
    return getTimeRangesStart(this.buffered) ?? 0;
  },
  get bufferedEnd() {
    return getTimeRangesEnd(this.buffered) ?? 0;
  },
  get seekableStart() {
    return getTimeRangesStart(this.seekable) ?? 0;
  },
  get seekableEnd() {
    return this.canPlay ? getTimeRangesEnd(this.seekable) ?? Infinity : 0;
  },
  get seekableWindow() {
    return Math.max(0, this.seekableEnd - this.seekableStart);
  },
  // ~~ responsive design ~~
  touchPointer: false,
  orientation: "landscape",
  mediaWidth: 0,
  mediaHeight: 0,
  breakpointX: "sm",
  breakpointY: "sm",
  // ~~ user props ~~
  userIdle: false,
  userBehindLiveEdge: false,
  // ~~ live props ~~
  liveEdgeTolerance: 10,
  minLiveDVRWindow: 60,
  get canSeek() {
    return /unknown|on-demand|:dvr/.test(this.streamType) && Number.isFinite(this.seekableWindow) && (!this.live || /:dvr/.test(this.streamType) && this.seekableWindow >= this.minLiveDVRWindow);
  },
  get live() {
    return this.streamType.includes("live") || !Number.isFinite(this.duration);
  },
  get liveEdgeStart() {
    return this.live && Number.isFinite(this.seekableEnd) ? Math.max(0, (this.liveSyncPosition ?? this.seekableEnd) - this.liveEdgeTolerance) : 0;
  },
  get liveEdge() {
    return this.live && (!this.canSeek || !this.userBehindLiveEdge && this.currentTime >= this.liveEdgeStart);
  },
  get liveEdgeWindow() {
    return this.live && Number.isFinite(this.seekableEnd) ? this.seekableEnd - this.liveEdgeStart : 0;
  },
  // ~~ internal props ~~
  autoplaying: false,
  providedViewType: "unknown",
  providedStreamType: "unknown",
  inferredStreamType: "unknown",
  liveSyncPosition: null
});
const DO_NOT_RESET_ON_SRC_CHANGE = /* @__PURE__ */ new Set([
  "autoplay",
  "breakpointX",
  "breakpointY",
  "canFullscreen",
  "canLoad",
  "canPictureInPicture",
  "controls",
  "fullscreen",
  "logLevel",
  "loop",
  "mediaHeight",
  "mediaWidth",
  "muted",
  "orientation",
  "pictureInPicture",
  "playsinline",
  "poster",
  "preload",
  "providedStreamType",
  "providedViewType",
  "source",
  "sources",
  "textTrack",
  "textTracks",
  "thumbnailCues",
  "thumbnails",
  "title",
  "touchPointer",
  "volume"
]);
function softResetMediaStore($media) {
  MediaStoreFactory.reset($media, (prop2) => !DO_NOT_RESET_ON_SRC_CHANGE.has(prop2));
  tick();
}
const SELECTED = Symbol(0);
class SelectList extends List {
  get selected() {
    return this.a.find((item) => item.selected) ?? null;
  }
  get selectedIndex() {
    return this.a.findIndex((item) => item.selected);
  }
  /* @internal */
  [LIST_ON_REMOVE](item, trigger) {
    this[LIST_SELECT](item, false, trigger);
  }
  /* @internal */
  [LIST_ADD](item, trigger) {
    item[SELECTED] = false;
    Object.defineProperty(item, "selected", {
      get() {
        return this[SELECTED];
      },
      set: (selected) => {
        var _a3;
        if (this.readonly)
          return;
        (_a3 = this[LIST_ON_USER_SELECT]) == null ? void 0 : _a3.call(this);
        this[LIST_SELECT](item, selected);
      }
    });
    super[LIST_ADD](item, trigger);
  }
  /* @internal */
  [LIST_SELECT](item, selected, trigger) {
    if (selected === item[SELECTED])
      return;
    const prev = this.selected;
    item[SELECTED] = selected;
    const changed = !selected ? prev === item : prev !== item;
    if (changed) {
      if (prev)
        prev[SELECTED] = false;
      this.dispatchEvent(
        new DOMEvent("change", {
          detail: { prev, current: this.selected },
          trigger
        })
      );
    }
  }
}
const SET_AUTO_QUALITY = Symbol(0);
const ENABLE_AUTO_QUALITY = Symbol(0);
class VideoQualityList extends SelectList {
  constructor() {
    super(...arguments);
    __publicField(this, "Sa", false);
    /**
     * Configures quality switching:
     *
     * - `current`: Trigger an immediate quality level switch. This will abort the current fragment
     * request if any, flush the whole buffer, and fetch fragment matching with current position
     * and requested quality level.
     *
     * - `next`: Trigger a quality level switch for next fragment. This could eventually flush
     * already buffered next fragment.
     *
     * - `load`: Set quality level for next loaded fragment.
     *
     * @see {@link https://vidstack.io/docs/player/core-concepts/quality#switch}
     * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#quality-switch-control-api}
     */
    __publicField(this, "switch", "current");
    /* @internal */
    __publicField(this, _b);
  }
  /**
   * Whether automatic quality selection is enabled.
   */
  get auto() {
    return this.Sa || this.readonly;
  }
  /* @internal */
  [(_b = ENABLE_AUTO_QUALITY, LIST_ON_USER_SELECT)]() {
    this[SET_AUTO_QUALITY](false);
  }
  /* @internal */
  [LIST_ON_RESET](trigger) {
    this[SET_AUTO_QUALITY](false, trigger);
  }
  /**
   * Request automatic quality selection (if supported). This will be a no-op if the list is
   * `readonly` as that already implies auto-selection.
   */
  autoSelect(trigger) {
    if (this.readonly || this.Sa || !this[ENABLE_AUTO_QUALITY])
      return;
    this[ENABLE_AUTO_QUALITY]();
    this[SET_AUTO_QUALITY](true, trigger);
  }
  /* @internal */
  [SET_AUTO_QUALITY](auto, trigger) {
    if (this.Sa === auto)
      return;
    this.Sa = auto;
    this.dispatchEvent(
      new DOMEvent("auto-change", {
        detail: auto,
        trigger
      })
    );
  }
}
class MediaLoadController extends ComponentController {
  constructor(instance, _callback) {
    super(instance);
    this._e = _callback;
  }
  async onAttach(el) {
    const load = this.$props.load();
    if (load === "eager") {
      requestAnimationFrame(this._e);
    } else if (load === "idle") {
      const { waitIdlePeriod: waitIdlePeriod2 } = await __vitePreload(() => Promise.resolve().then(() => std), true ? void 0 : void 0);
      waitIdlePeriod2(this._e);
    } else if (load === "visible") {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          this._e();
        }
      });
      observer.observe(el);
      return observer.disconnect.bind(observer);
    }
  }
}
class MediaPlayerDelegate {
  constructor(_handle, _media) {
    this.I = _handle;
    this.k = _media;
  }
  R(type, ...init) {
    this.I(new DOMEvent(type, init == null ? void 0 : init[0]));
  }
  async af(info, trigger) {
    const { $store, logger } = this.k;
    if (peek($store.canPlay))
      return;
    this.R("can-play", { detail: info, trigger });
    tick();
    if ($store.canPlay() && $store.autoplay() && !$store.started()) {
      await this.$e();
    }
  }
  async $e() {
    const { player, $store } = this.k;
    $store.autoplaying.set(true);
    try {
      await player.play();
      this.R("autoplay", { detail: { muted: $store.muted() } });
    } catch (error) {
      this.R("autoplay-fail", {
        detail: {
          muted: $store.muted(),
          error
        }
      });
    } finally {
      $store.autoplaying.set(false);
    }
  }
}
class Queue {
  constructor() {
    __publicField(this, "Pe", /* @__PURE__ */ new Map());
  }
  /**
   * Queue the given `item` under the given `key` to be processed at a later time by calling
   * `serve(key)`.
   */
  n(key2, item) {
    if (!this.Pe.has(key2))
      this.Pe.set(key2, /* @__PURE__ */ new Set());
    this.Pe.get(key2).add(item);
  }
  /**
   * Process all items in queue for the given `key`.
   */
  Ue(key2, callback) {
    const items = this.Pe.get(key2);
    if (items)
      for (const item of items)
        callback(item);
    this.Pe.delete(key2);
  }
  /**
   * Removes all queued items under the given `key`.
   */
  of(key2) {
    this.Pe.delete(key2);
  }
  /**
   * The number of items currently queued under the given `key`.
   */
  Ve(key2) {
    var _a3;
    return ((_a3 = this.Pe.get(key2)) == null ? void 0 : _a3.size) ?? 0;
  }
  /**
   * Clear all items in the queue.
   */
  Ye() {
    this.Pe.clear();
  }
}
function coerceToError(error) {
  return error instanceof Error ? error : Error(JSON.stringify(error));
}
class MediaUserController extends ComponentController {
  constructor() {
    super(...arguments);
    __publicField(this, "qa", -2);
    __publicField(this, "oa", 2e3);
    __publicField(this, "ra", false);
    __publicField(this, "pa", null);
  }
  /**
   * Whether the media user is currently idle.
   */
  get idling() {
    return this.$store.userIdle();
  }
  /**
   * The amount of delay in milliseconds while media playback is progressing without user
   * activity to indicate an idle state.
   *
   * @defaultValue 2000
   */
  get idleDelay() {
    return this.oa;
  }
  set idleDelay(newDelay) {
    this.oa = newDelay;
  }
  /**
   * Change the user idle state.
   */
  idle(idle, delay = this.oa, trigger) {
    this.sa();
    if (!this.ra)
      this.ta(idle, delay, trigger);
  }
  /**
   * Whether all idle tracking should be paused until resumed again.
   */
  pauseIdleTracking(paused, trigger) {
    this.ra = paused;
    if (paused) {
      this.sa();
      this.ta(false, 0, trigger);
    }
  }
  onConnect() {
    effect(this.x.bind(this));
    listenEvent(this.el, "play", this.va.bind(this));
    listenEvent(this.el, "pause", this.wa.bind(this));
  }
  x() {
    if (this.$store.paused())
      return;
    const onStopIdle = this.xa.bind(this);
    for (const eventType of ["pointerup", "keydown"]) {
      listenEvent(this.el, eventType, onStopIdle);
    }
    effect(() => {
      if (!this.$store.touchPointer())
        listenEvent(this.el, "pointermove", onStopIdle);
    });
  }
  va(event) {
    this.idle(true, this.oa, event);
  }
  wa(event) {
    this.idle(false, 0, event);
  }
  sa() {
    window.clearTimeout(this.qa);
    this.qa = -1;
  }
  xa(event) {
    var _a3;
    if (event.MEDIA_GESTURE)
      return;
    if (isKeyboardEvent(event)) {
      if (event.key === "Escape") {
        (_a3 = this.el) == null ? void 0 : _a3.focus();
        this.pa = null;
      } else if (this.pa) {
        event.preventDefault();
        requestAnimationFrame(() => {
          var _a4;
          (_a4 = this.pa) == null ? void 0 : _a4.focus();
          this.pa = null;
        });
      }
    }
    this.idle(false, 0, event);
    this.idle(true, this.oa, event);
  }
  ta(idle, delay, trigger) {
    if (delay === 0) {
      this.ua(idle, trigger);
      return;
    }
    this.qa = window.setTimeout(() => {
      this.ua(idle && !this.ra, trigger);
    }, delay);
  }
  ua(idle, trigger) {
    var _a3;
    if (this.$store.userIdle() === idle)
      return;
    this.$store.userIdle.set(idle);
    if (idle && document.activeElement && ((_a3 = this.el) == null ? void 0 : _a3.contains(document.activeElement))) {
      this.pa = document.activeElement;
      requestAnimationFrame(() => {
        var _a4;
        return (_a4 = this.el) == null ? void 0 : _a4.focus();
      });
    }
    this.dispatch("user-idle-change", {
      detail: idle,
      trigger
    });
  }
}
class MediaRequestContext {
  constructor() {
    __publicField(this, "$a", false);
    __publicField(this, "gf", false);
    __publicField(this, "ef", false);
    __publicField(this, "Pe", new Queue());
  }
}
class MediaRequestManager extends ComponentController {
  constructor(instance, _stateMgr, _request, _media) {
    super(instance);
    __publicField(this, "L");
    __publicField(this, "df");
    __publicField(this, "nb");
    __publicField(this, "cf");
    __publicField(this, "j");
    __publicField(this, "ff", false);
    this.o = _stateMgr;
    this.bf = _request;
    this.k = _media;
    this.cf = _media.$store;
    this.j = _media.$provider;
    this.L = new MediaUserController(instance);
    this.df = new FullscreenController(instance);
    this.nb = new ScreenOrientationController(instance);
  }
  onConnect() {
    effect(this.kf.bind(this));
    effect(this.lf.bind(this));
    effect(this.mf.bind(this));
    const names = Object.getOwnPropertyNames(Object.getPrototypeOf(this)), handle = this.nf.bind(this);
    for (const name of names) {
      if (name.startsWith("media-")) {
        this.listen(name, handle);
      }
    }
    this.listen("fullscreen-change", this.d.bind(this));
  }
  nf(event) {
    var _a3;
    event.stopPropagation();
    if (peek(this.j))
      (_a3 = this[event.type]) == null ? void 0 : _a3.call(this, event);
  }
  async H() {
    const { canPlay, paused, ended, autoplaying, seekableStart } = this.cf;
    if (!peek(paused))
      return;
    try {
      const provider = peek(this.j);
      throwIfNotReadyForPlayback(provider, peek(canPlay));
      if (peek(ended)) {
        provider.currentTime = seekableStart() + 0.1;
      }
      return provider.play();
    } catch (error) {
      const errorEvent = this.createEvent("play-fail", { detail: coerceToError(error) });
      errorEvent.autoplay = autoplaying();
      this.o.I(errorEvent);
      throw error;
    }
  }
  async G() {
    const { canPlay, paused } = this.cf;
    if (peek(paused))
      return;
    const provider = peek(this.j);
    throwIfNotReadyForPlayback(provider, peek(canPlay));
    return provider.pause();
  }
  Q() {
    const { canPlay, live, liveEdge, canSeek, liveSyncPosition, seekableEnd, userBehindLiveEdge } = this.cf;
    userBehindLiveEdge.set(false);
    if (peek(() => !live() || liveEdge() || !canSeek()))
      return;
    const provider = peek(this.j);
    throwIfNotReadyForPlayback(provider, peek(canPlay));
    provider.currentTime = liveSyncPosition() ?? seekableEnd() - 2;
  }
  async M(target = "prefer-media") {
    const provider = peek(this.j);
    const adapter = target === "prefer-media" && this.df.supported || target === "media" ? this.df : provider == null ? void 0 : provider.fullscreen;
    throwIfFullscreenNotSupported(target, adapter);
    if (adapter.active)
      return;
    if (peek(this.cf.pictureInPicture)) {
      this.ff = true;
      await this.P();
    }
    return adapter.enter();
  }
  async N(target = "prefer-media") {
    const provider = peek(this.j);
    const adapter = target === "prefer-media" && this.df.supported || target === "media" ? this.df : provider == null ? void 0 : provider.fullscreen;
    throwIfFullscreenNotSupported(target, adapter);
    if (!adapter.active)
      return;
    if (this.nb.locked)
      await this.nb.unlock();
    try {
      const result = await adapter.exit();
      if (this.ff && peek(this.cf.canPictureInPicture)) {
        await this.O();
      }
      return result;
    } finally {
      this.ff = false;
    }
  }
  async O() {
    this.hf();
    if (this.cf.pictureInPicture())
      return;
    return await this.j().pictureInPicture.enter();
  }
  async P() {
    this.hf();
    if (!this.cf.pictureInPicture())
      return;
    return await this.j().pictureInPicture.exit();
  }
  hf() {
    if (this.cf.canPictureInPicture())
      return;
    throw Error(
      "[vidstack] no pip support"
    );
  }
  kf() {
    this.L.idleDelay = this.$props.userIdleDelay();
  }
  lf() {
    var _a3, _b2;
    const { canLoad, canFullscreen: canFullscreen2 } = this.cf, supported = this.df.supported || ((_b2 = (_a3 = this.j()) == null ? void 0 : _a3.fullscreen) == null ? void 0 : _b2.supported) || false;
    if (canLoad() && peek(canFullscreen2) === supported)
      return;
    canFullscreen2.set(supported);
  }
  mf() {
    var _a3, _b2;
    const { canLoad, canPictureInPicture } = this.cf, supported = ((_b2 = (_a3 = this.j()) == null ? void 0 : _a3.pictureInPicture) == null ? void 0 : _b2.supported) || false;
    if (canLoad() && peek(canPictureInPicture) === supported)
      return;
    canPictureInPicture.set(supported);
  }
  ["media-audio-track-change-request"](event) {
    if (this.k.audioTracks.readonly) {
      return;
    }
    const index = event.detail, track = this.k.audioTracks[index];
    if (track) {
      this.bf.Pe.n("audioTrack", event);
      track.selected = true;
    }
  }
  async ["media-enter-fullscreen-request"](event) {
    try {
      this.bf.Pe.n("fullscreen", event);
      await this.M(event.detail);
    } catch (error) {
      this.e(error);
    }
  }
  async ["media-exit-fullscreen-request"](event) {
    try {
      this.bf.Pe.n("fullscreen", event);
      await this.N(event.detail);
    } catch (error) {
      this.e(error);
    }
  }
  async d(event) {
    if (!event.detail)
      return;
    try {
      const lockType = peek(this.$props.fullscreenOrientation);
      if (this.nb.supported && !isUndefined(lockType)) {
        await this.nb.lock(lockType);
      }
    } catch (e) {
    }
  }
  e(error) {
    this.o.I(
      this.createEvent("fullscreen-error", {
        detail: coerceToError(error)
      })
    );
  }
  async ["media-enter-pip-request"](event) {
    try {
      this.bf.Pe.n("pip", event);
      await this.O();
    } catch (error) {
      this.jf(error);
    }
  }
  async ["media-exit-pip-request"](event) {
    try {
      this.bf.Pe.n("pip", event);
      await this.P();
    } catch (error) {
      this.jf(error);
    }
  }
  jf(error) {
    this.o.I(
      this.createEvent("picture-in-picture-error", {
        detail: coerceToError(error)
      })
    );
  }
  ["media-live-edge-request"](event) {
    const { live, liveEdge, canSeek } = this.cf;
    if (!live() || liveEdge() || !canSeek())
      return;
    this.bf.Pe.n("seeked", event);
    try {
      this.Q();
    } catch (e) {
    }
  }
  ["media-loop-request"]() {
    window.requestAnimationFrame(async () => {
      try {
        this.bf.gf = true;
        this.bf.ef = true;
        await this.H();
      } catch (e) {
        this.bf.gf = false;
        this.bf.ef = false;
      }
    });
  }
  async ["media-pause-request"](event) {
    if (this.cf.paused())
      return;
    try {
      this.bf.Pe.n("pause", event);
      await this.j().pause();
    } catch (e) {
      this.bf.Pe.of("pause");
    }
  }
  async ["media-play-request"](event) {
    if (!this.cf.paused())
      return;
    try {
      this.bf.Pe.n("play", event);
      await this.j().play();
    } catch (e) {
      const errorEvent = this.createEvent("play-fail", { detail: coerceToError(e) });
      this.o.I(errorEvent);
    }
  }
  ["media-rate-change-request"](event) {
    if (this.cf.playbackRate() === event.detail)
      return;
    this.bf.Pe.n("rate", event);
    this.j().playbackRate = event.detail;
  }
  ["media-quality-change-request"](event) {
    if (this.k.qualities.readonly) {
      return;
    }
    this.bf.Pe.n("quality", event);
    const index = event.detail;
    if (index < 0) {
      this.k.qualities.autoSelect(event);
    } else {
      const quality = this.k.qualities[index];
      if (quality) {
        quality.selected = true;
      }
    }
  }
  ["media-resume-user-idle-request"](event) {
    this.bf.Pe.n("userIdle", event);
    this.L.pauseIdleTracking(false, event);
  }
  ["media-pause-user-idle-request"](event) {
    this.bf.Pe.n("userIdle", event);
    this.L.pauseIdleTracking(true, event);
  }
  ["media-seek-request"](event) {
    const { seekableStart, seekableEnd, ended, canSeek, live, userBehindLiveEdge } = this.cf;
    if (ended())
      this.bf.ef = true;
    this.bf.$a = false;
    this.bf.Pe.of("seeking");
    const boundTime = Math.min(Math.max(seekableStart() + 0.1, event.detail), seekableEnd() - 0.1);
    if (!Number.isFinite(boundTime) || !canSeek())
      return;
    this.bf.Pe.n("seeked", event);
    this.j().currentTime = boundTime;
    if (live() && event.isOriginTrusted && Math.abs(seekableEnd() - boundTime) >= 2) {
      userBehindLiveEdge.set(true);
    }
  }
  ["media-seeking-request"](event) {
    this.bf.Pe.n("seeking", event);
    this.cf.seeking.set(true);
    this.bf.$a = true;
  }
  ["media-start-loading"](event) {
    if (this.cf.canLoad())
      return;
    this.bf.Pe.n("load", event);
    this.o.I(this.createEvent("can-load"));
  }
  ["media-text-track-change-request"](event) {
    const { index, mode } = event.detail, track = this.k.textTracks[index];
    if (track) {
      this.bf.Pe.n("textTrack", event);
      track.setMode(mode, event);
    }
  }
  ["media-mute-request"](event) {
    if (this.cf.muted())
      return;
    this.bf.Pe.n("volume", event);
    this.j().muted = true;
  }
  ["media-unmute-request"](event) {
    const { muted, volume } = this.cf;
    if (!muted())
      return;
    this.bf.Pe.n("volume", event);
    this.k.$provider().muted = false;
    if (volume() === 0) {
      this.bf.Pe.n("volume", event);
      this.j().volume = 0.25;
    }
  }
  ["media-volume-change-request"](event) {
    const { muted, volume } = this.cf;
    const newVolume = event.detail;
    if (volume() === newVolume)
      return;
    this.bf.Pe.n("volume", event);
    this.j().volume = newVolume;
    if (newVolume > 0 && muted()) {
      this.bf.Pe.n("volume", event);
      this.j().muted = false;
    }
  }
}
function throwIfNotReadyForPlayback(provider, canPlay) {
  if (provider && canPlay)
    return;
  throw Error(
    "[vidstack] media not ready"
  );
}
function throwIfFullscreenNotSupported(target, fullscreen) {
  if (fullscreen == null ? void 0 : fullscreen.supported)
    return;
  throw Error(
    "[vidstack] no fullscreen support"
  );
}
var functionDebounce = debounce$1;
function debounce$1(fn, wait, callFirst) {
  var timeout = null;
  var debouncedFn = null;
  var clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      debouncedFn = null;
      timeout = null;
    }
  };
  var flush = function() {
    var call = debouncedFn;
    clear();
    if (call) {
      call();
    }
  };
  var debounceWrapper = function() {
    if (!wait) {
      return fn.apply(this, arguments);
    }
    var context = this;
    var args = arguments;
    var callNow = callFirst && !timeout;
    clear();
    debouncedFn = function() {
      fn.apply(context, args);
    };
    timeout = setTimeout(function() {
      timeout = null;
      if (!callNow) {
        var call = debouncedFn;
        debouncedFn = null;
        return call();
      }
    }, wait);
    if (callNow) {
      return debouncedFn();
    }
  };
  debounceWrapper.cancel = clear;
  debounceWrapper.flush = flush;
  return debounceWrapper;
}
var functionThrottle = throttle;
function throttle(fn, interval, options) {
  var timeoutId = null;
  var throttledFn = null;
  var leading = options && options.leading;
  var trailing = options && options.trailing;
  if (leading == null) {
    leading = true;
  }
  if (trailing == null) {
    trailing = !leading;
  }
  if (leading == true) {
    trailing = false;
  }
  var cancel = function() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };
  var flush = function() {
    var call = throttledFn;
    cancel();
    if (call) {
      call();
    }
  };
  var throttleWrapper = function() {
    var callNow = leading && !timeoutId;
    var context = this;
    var args = arguments;
    throttledFn = function() {
      return fn.apply(context, args);
    };
    if (!timeoutId) {
      timeoutId = setTimeout(function() {
        timeoutId = null;
        if (trailing) {
          return throttledFn();
        }
      }, interval);
    }
    if (callNow) {
      callNow = false;
      return throttledFn();
    }
  };
  throttleWrapper.cancel = cancel;
  throttleWrapper.flush = flush;
  return throttleWrapper;
}
const ATTACH_VIDEO = Symbol(0);
const TEXT_TRACK_CROSSORIGIN = Symbol(0);
const TEXT_TRACK_READY_STATE = Symbol(0);
const TEXT_TRACK_UPDATE_ACTIVE_CUES = Symbol(0);
const TEXT_TRACK_CAN_LOAD = Symbol(0);
const TEXT_TRACK_ON_MODE_CHANGE = Symbol(0);
const TEXT_TRACK_NATIVE = Symbol(0);
const TEXT_TRACK_NATIVE_HLS = Symbol(0);
const TRACKED_EVENT = /* @__PURE__ */ new Set([
  "autoplay",
  "autoplay-fail",
  "can-load",
  "sources-change",
  "source-change",
  "load-start",
  "abort",
  "error",
  "loaded-metadata",
  "loaded-data",
  "can-play",
  "play",
  "play-fail",
  "pause",
  "playing",
  "seeking",
  "seeked",
  "waiting"
]);
class MediaStateManager extends ComponentController {
  constructor(instance, _request, _media) {
    super(instance);
    __publicField(this, "cf");
    __publicField(this, "pf", /* @__PURE__ */ new Map());
    __publicField(this, "wf", true);
    __publicField(this, "tf", false);
    __publicField(this, "rf");
    __publicField(this, "seeking", functionThrottle(
      (event) => {
        const { seeking, currentTime, paused } = this.cf;
        seeking.set(true);
        currentTime.set(event.detail);
        this.qf("seeking", event);
        if (paused()) {
          this.rf = event;
          this.vf();
        }
      },
      150,
      { leading: true }
    ));
    __publicField(this, "vf", functionDebounce(() => {
      if (!this.rf)
        return;
      this.tf = true;
      const { waiting, playing } = this.cf;
      waiting.set(true);
      playing.set(false);
      const event = this.createEvent("waiting", { trigger: this.rf });
      this.pf.set("waiting", event);
      this.el.dispatchEvent(event);
      this.rf = void 0;
      this.tf = false;
    }, 300));
    this.bf = _request;
    this.k = _media;
    this.cf = _media.$store;
  }
  onAttach(el) {
    el.setAttribute("aria-busy", "true");
  }
  onConnect(el) {
    this.Cf();
    this.Df();
    this.Ef();
    this.listen("fullscreen-change", this["fullscreen-change"].bind(this));
    this.listen("fullscreen-error", this["fullscreen-error"].bind(this));
  }
  I(event) {
    var _a3, _b2;
    const type = event.type;
    (_a3 = this[event.type]) == null ? void 0 : _a3.call(this, event);
    {
      if (TRACKED_EVENT.has(type))
        this.pf.set(type, event);
      (_b2 = this.el) == null ? void 0 : _b2.dispatchEvent(event);
    }
  }
  sf() {
    this.xf();
    this.bf.ef = false;
    this.bf.gf = false;
    this.tf = false;
    this.rf = void 0;
    this.pf.clear();
  }
  qf(request, event) {
    this.bf.Pe.Ue(request, (requestEvent) => {
      event.request = requestEvent;
      appendTriggerEvent(event, requestEvent);
    });
  }
  Cf() {
    this.uf();
    this.yf();
    const textTracks = this.k.textTracks;
    listenEvent(textTracks, "add", this.uf.bind(this));
    listenEvent(textTracks, "remove", this.uf.bind(this));
    listenEvent(textTracks, "mode-change", this.yf.bind(this));
  }
  Df() {
    const qualities = this.k.qualities;
    listenEvent(qualities, "add", this.zf.bind(this));
    listenEvent(qualities, "remove", this.zf.bind(this));
    listenEvent(qualities, "change", this.Ff.bind(this));
    listenEvent(qualities, "auto-change", this.Gf.bind(this));
    listenEvent(qualities, "readonly-change", this.Hf.bind(this));
  }
  Ef() {
    const audioTracks = this.k.audioTracks;
    listenEvent(audioTracks, "add", this.Af.bind(this));
    listenEvent(audioTracks, "remove", this.Af.bind(this));
    listenEvent(audioTracks, "change", this.If.bind(this));
  }
  uf(event) {
    const { textTracks } = this.cf;
    textTracks.set(this.k.textTracks.toArray());
    this.dispatch("text-tracks-change", {
      detail: textTracks(),
      trigger: event
    });
  }
  yf(event) {
    if (event)
      this.qf("textTrack", event);
    const current = this.k.textTracks.selected, { textTrack } = this.cf;
    if (textTrack() !== current) {
      textTrack.set(current);
      this.dispatch("text-track-change", {
        detail: current,
        trigger: event
      });
    }
  }
  Af(event) {
    const { audioTracks } = this.cf;
    audioTracks.set(this.k.audioTracks.toArray());
    this.dispatch("audio-tracks-change", {
      detail: audioTracks(),
      trigger: event
    });
  }
  If(event) {
    const { audioTrack } = this.cf;
    audioTrack.set(this.k.audioTracks.selected);
    this.qf("audioTrack", event);
    this.dispatch("audio-track-change", {
      detail: audioTrack(),
      trigger: event
    });
  }
  zf(event) {
    const { qualities } = this.cf;
    qualities.set(this.k.qualities.toArray());
    this.dispatch("qualities-change", {
      detail: qualities(),
      trigger: event
    });
  }
  Ff(event) {
    const { quality } = this.cf;
    quality.set(this.k.qualities.selected);
    this.qf("quality", event);
    this.dispatch("quality-change", {
      detail: quality(),
      trigger: event
    });
  }
  Gf() {
    this.cf.autoQuality.set(this.k.qualities.auto);
  }
  Hf() {
    this.cf.canSetQuality.set(!this.k.qualities.readonly);
  }
  ["provider-change"](event) {
    this.k.$provider.set(event.detail);
  }
  ["autoplay"](event) {
    appendTriggerEvent(event, this.pf.get("play"));
    appendTriggerEvent(event, this.pf.get("can-play"));
    this.cf.autoplayError.set(void 0);
  }
  ["autoplay-fail"](event) {
    appendTriggerEvent(event, this.pf.get("play-fail"));
    appendTriggerEvent(event, this.pf.get("can-play"));
    this.cf.autoplayError.set(event.detail);
    this.sf();
  }
  ["can-load"](event) {
    this.cf.canLoad.set(true);
    this.pf.set("can-load", event);
    this.qf("load", event);
    this.k.textTracks[TEXT_TRACK_CAN_LOAD]();
  }
  ["media-type-change"](event) {
    appendTriggerEvent(event, this.pf.get("source-change"));
    const viewType = this.cf.viewType();
    this.cf.mediaType.set(event.detail);
    if (viewType !== this.cf.viewType()) {
      setTimeout(
        () => this.dispatch("view-type-change", {
          detail: this.cf.viewType(),
          trigger: event
        }),
        0
      );
    }
  }
  ["stream-type-change"](event) {
    const { streamType, inferredStreamType } = this.cf;
    appendTriggerEvent(event, this.pf.get("source-change"));
    inferredStreamType.set(event.detail);
    event.detail = streamType();
  }
  ["rate-change"](event) {
    this.cf.playbackRate.set(event.detail);
    this.qf("rate", event);
  }
  ["sources-change"](event) {
    this.cf.sources.set(event.detail);
  }
  ["source-change"](event) {
    var _a3;
    appendTriggerEvent(event, this.pf.get("sources-change"));
    this.cf.source.set(event.detail);
    (_a3 = this.el) == null ? void 0 : _a3.setAttribute("aria-busy", "true");
    if (this.wf) {
      this.wf = false;
      return;
    }
    this.k.audioTracks[LIST_RESET](event);
    this.k.qualities[LIST_RESET](event);
    this.sf();
    softResetMediaStore(this.k.$store);
    this.pf.set(event.type, event);
  }
  ["abort"](event) {
    appendTriggerEvent(event, this.pf.get("source-change"));
    appendTriggerEvent(event, this.pf.get("can-load"));
  }
  ["load-start"](event) {
    appendTriggerEvent(event, this.pf.get("source-change"));
  }
  ["error"](event) {
    this.cf.error.set(event.detail);
    appendTriggerEvent(event, this.pf.get("abort"));
  }
  ["loaded-metadata"](event) {
    appendTriggerEvent(event, this.pf.get("load-start"));
  }
  ["loaded-data"](event) {
    appendTriggerEvent(event, this.pf.get("load-start"));
  }
  ["can-play"](event) {
    var _a3, _b2;
    if (((_a3 = event.trigger) == null ? void 0 : _a3.type) !== "loadedmetadata") {
      appendTriggerEvent(event, this.pf.get("loaded-metadata"));
    }
    this.Bf(event.detail);
    (_b2 = this.el) == null ? void 0 : _b2.setAttribute("aria-busy", "false");
  }
  ["can-play-through"](event) {
    this.Bf(event.detail);
    appendTriggerEvent(event, this.pf.get("can-play"));
  }
  Bf(detail) {
    const { seekable, seekableEnd, buffered, duration, canPlay } = this.cf;
    seekable.set(detail.seekable);
    buffered.set(detail.buffered);
    duration.set(seekableEnd);
    canPlay.set(true);
  }
  ["duration-change"](event) {
    const { live, duration } = this.cf, time = event.detail;
    if (!live())
      duration.set(!Number.isNaN(time) ? time : 0);
  }
  ["progress"](event) {
    const { buffered, seekable, live, duration, seekableEnd } = this.cf, detail = event.detail;
    buffered.set(detail.buffered);
    seekable.set(detail.seekable);
    if (live()) {
      duration.set(seekableEnd);
      this.dispatch("duration-change", {
        detail: seekableEnd(),
        trigger: event
      });
    }
  }
  ["play"](event) {
    const { paused, autoplayError, ended, autoplaying } = this.cf;
    event.autoplay = autoplaying();
    if (this.bf.gf || !paused()) {
      event.stopImmediatePropagation();
      return;
    }
    appendTriggerEvent(event, this.pf.get("waiting"));
    this.qf("play", event);
    paused.set(false);
    autoplayError.set(void 0);
    if (ended() || this.bf.ef) {
      this.bf.ef = false;
      ended.set(false);
      this.I(this.createEvent("replay", { trigger: event }));
    }
  }
  ["play-fail"](event) {
    appendTriggerEvent(event, this.pf.get("play"));
    this.qf("play", event);
    const { paused, playing } = this.cf;
    paused.set(true);
    playing.set(false);
    this.sf();
  }
  ["playing"](event) {
    const playEvent = this.pf.get("play");
    if (playEvent) {
      appendTriggerEvent(event, this.pf.get("waiting"));
      appendTriggerEvent(event, playEvent);
    } else {
      appendTriggerEvent(event, this.pf.get("seeked"));
    }
    setTimeout(() => this.sf(), 0);
    const { paused, playing, seeking, ended } = this.cf;
    paused.set(false);
    playing.set(true);
    seeking.set(false);
    ended.set(false);
    if (this.bf.gf) {
      event.stopImmediatePropagation();
      this.bf.gf = false;
      return;
    }
    this["started"](event);
  }
  ["started"](event) {
    const { started, live, liveSyncPosition, seekableEnd } = this.cf;
    if (!started()) {
      if (live()) {
        const end = liveSyncPosition() ?? seekableEnd() - 2;
        if (Number.isFinite(end))
          this.k.$provider().currentTime = end;
      }
      started.set(true);
      this.I(this.createEvent("started", { trigger: event }));
    }
  }
  ["pause"](event) {
    if (this.bf.gf) {
      event.stopImmediatePropagation();
      return;
    }
    appendTriggerEvent(event, this.pf.get("seeked"));
    this.qf("pause", event);
    const { paused, playing, seeking } = this.cf;
    paused.set(true);
    playing.set(false);
    seeking.set(false);
    this.sf();
  }
  ["time-update"](event) {
    const { currentTime, played, waiting } = this.cf, detail = event.detail;
    currentTime.set(detail.currentTime);
    played.set(detail.played);
    waiting.set(false);
    for (const track of this.k.textTracks) {
      track[TEXT_TRACK_UPDATE_ACTIVE_CUES](detail.currentTime, event);
    }
  }
  ["volume-change"](event) {
    const { volume, muted } = this.cf, detail = event.detail;
    volume.set(detail.volume);
    muted.set(detail.muted || detail.volume === 0);
    this.qf("volume", event);
  }
  ["seeked"](event) {
    var _a3;
    const { seeking, currentTime, paused, duration, ended } = this.cf;
    if (this.bf.$a) {
      seeking.set(true);
      event.stopImmediatePropagation();
    } else if (seeking()) {
      const waitingEvent = this.pf.get("waiting");
      appendTriggerEvent(event, waitingEvent);
      if (((_a3 = waitingEvent == null ? void 0 : waitingEvent.trigger) == null ? void 0 : _a3.type) !== "seeking") {
        appendTriggerEvent(event, this.pf.get("seeking"));
      }
      if (paused())
        this.xf();
      seeking.set(false);
      if (event.detail !== duration())
        ended.set(false);
      currentTime.set(event.detail);
      this.qf("seeked", event);
      const origin = event.originEvent;
      if (origin && origin.isTrusted && !/seek/.test(origin.type)) {
        this["started"](event);
      }
    }
  }
  ["waiting"](event) {
    if (this.tf || this.bf.$a)
      return;
    event.stopImmediatePropagation();
    this.rf = event;
    this.vf();
  }
  ["ended"](event) {
    if (this.bf.gf) {
      event.stopImmediatePropagation();
      return;
    }
    const { paused, playing, seeking, ended } = this.cf;
    paused.set(true);
    playing.set(false);
    seeking.set(false);
    ended.set(true);
    this.sf();
  }
  xf() {
    this.vf.cancel();
    this.cf.waiting.set(false);
  }
  ["fullscreen-change"](event) {
    this.cf.fullscreen.set(event.detail);
    this.qf("fullscreen", event);
  }
  ["fullscreen-error"](event) {
    this.qf("fullscreen", event);
  }
  ["picture-in-picture-change"](event) {
    this.cf.pictureInPicture.set(event.detail);
    this.qf("pip", event);
  }
  ["picture-in-picture-error"](event) {
    this.qf("pip", event);
  }
}
class MediaStoreSync extends ComponentController {
  onAttach(el) {
    effect(this.Jf.bind(this));
    effect(this.Kf.bind(this));
    effect(this.Lf.bind(this));
    effect(this.Mf.bind(this));
    effect(this.Nf.bind(this));
    effect(this.Of.bind(this));
    effect(this.Pf.bind(this));
    effect(this.Qf.bind(this));
    effect(this.Rf.bind(this));
    effect(this.Sf.bind(this));
  }
  Tf() {
    return;
  }
  Jf() {
    const autoplay = this.$props.autoplay();
    this.$store.autoplay.set(autoplay);
    this.dispatch("autoplay-change", { detail: autoplay });
  }
  Lf() {
    const loop = this.$props.loop();
    this.$store.loop.set(loop);
    this.dispatch("loop-change", { detail: loop });
  }
  Mf() {
    const controls = this.$props.controls();
    this.$store.controls.set(controls);
    this.dispatch("controls-change", { detail: controls });
  }
  Kf() {
    const poster = this.$props.poster();
    this.$store.poster.set(poster);
    this.dispatch("poster-change", { detail: poster });
  }
  Nf() {
    this.$store.crossorigin.set(this.$props.crossorigin());
  }
  Of() {
    const playsinline = this.$props.playsinline();
    this.$store.playsinline.set(playsinline);
    this.dispatch("playsinline-change", { detail: playsinline });
  }
  Qf() {
    this.dispatch("live-change", { detail: this.$store.live() });
  }
  Pf() {
    this.$store.liveEdgeTolerance.set(this.$props.liveEdgeTolerance());
    this.$store.minLiveDVRWindow.set(this.$props.minLiveDVRWindow());
  }
  Rf() {
    this.dispatch("live-edge-change", { detail: this.$store.liveEdge() });
  }
  Sf() {
    this.$store.thumbnails.set(this.$props.thumbnails());
  }
}
function preconnect(url, rel = "preconnect") {
  const exists = document.querySelector(`link[href="${url}"]`);
  if (!isNull(exists))
    return true;
  const link = document.createElement("link");
  link.rel = rel;
  link.href = url;
  link.crossOrigin = "true";
  document.head.append(link);
  return true;
}
const pendingRequests = {};
function loadScript(src) {
  if (pendingRequests[src])
    return pendingRequests[src].promise;
  const promise = deferredPromise(), exists = document.querySelector(`script[src="${src}"]`);
  if (!isNull(exists)) {
    promise.resolve();
    return promise.promise;
  }
  const script = document.createElement("script");
  script.src = src;
  script.onload = () => {
    promise.resolve();
    delete pendingRequests[src];
  };
  script.onerror = () => {
    promise.reject();
    delete pendingRequests[src];
  };
  setTimeout(() => document.head.append(script), 0);
  return promise.promise;
}
function getRequestCredentials(crossorigin) {
  return crossorigin === "use-credentials" ? "include" : isString(crossorigin) ? "same-origin" : void 0;
}
function findActiveCue(time, cues) {
  for (let i = 0, len = cues.length; i < len; i++) {
    if (isCueActive(cues[i], time))
      return cues[i];
  }
  return null;
}
function isCueActive(cue, time) {
  return time >= cue.startTime && time < cue.endTime;
}
function onTrackChapterChange(tracks, currentTrack, onChange) {
  const track = tracks.toArray().find((track2) => track2.kind === "chapters" && track2.mode === "showing");
  if (track === currentTrack)
    return;
  if (!track) {
    onChange(null);
    return;
  }
  if (track.readyState == 2) {
    onChange(track);
  } else {
    onChange(null);
    track.addEventListener("load", () => onChange(track), { once: true });
  }
}
class TextTrack extends EventsTarget {
  constructor(init) {
    super();
    __publicField(this, "src");
    __publicField(this, "content");
    __publicField(this, "type");
    __publicField(this, "encoding");
    __publicField(this, "id", "");
    __publicField(this, "label", "");
    __publicField(this, "language", "");
    __publicField(this, "kind");
    __publicField(this, "default", false);
    __publicField(this, "Ia", false);
    __publicField(this, "Ea", 0);
    __publicField(this, "Ga", "disabled");
    __publicField(this, "Ja", {});
    __publicField(this, "Ha", []);
    __publicField(this, "Da", []);
    __publicField(this, "Fa", []);
    /* @internal */
    __publicField(this, _c, 0);
    /* @internal */
    __publicField(this, _d);
    /* @internal */
    __publicField(this, _e, null);
    /* @internal */
    __publicField(this, _f, null);
    for (const prop2 of Object.keys(init))
      this[prop2] = init[prop2];
    if (!this.type)
      this.type = "vtt";
    if (init.content) {
      __vitePreload(() => import("./prod-5c90466e.js"), true ? ["assets/prod-5c90466e.js","assets/app-ef9c1d43.js"] : void 0).then(({ parseText: parseText2, VTTCue: VTTCue2, VTTRegion: VTTRegion2 }) => {
        if (init.type === "json") {
          this.Ka(init.content, VTTCue2, VTTRegion2);
        } else {
          parseText2(init.content, { type: init.type }).then(({ cues, regions }) => {
            this.Da = cues;
            this.Ha = regions;
            this.La();
          });
        }
      });
    } else if (!init.src)
      this[TEXT_TRACK_READY_STATE] = 2;
  }
  static createId(track) {
    return `id::${track.type}-${track.kind}-${track.src ?? track.label}`;
  }
  get metadata() {
    return this.Ja;
  }
  get regions() {
    return this.Ha;
  }
  get cues() {
    return this.Da;
  }
  get activeCues() {
    return this.Fa;
  }
  /**
   * - 0: Not Loading
   * - 1: Loading
   * - 2: Ready
   * - 3: Error
   */
  get readyState() {
    return this[TEXT_TRACK_READY_STATE];
  }
  get mode() {
    return this.Ga;
  }
  set mode(mode) {
    this.setMode(mode);
  }
  addCue(cue, trigger) {
    var _a3;
    let i = 0, length = this.Da.length;
    for (i = 0; i < length; i++)
      if (cue.endTime <= this.Da[i].startTime)
        break;
    if (i === length)
      this.Da.push(cue);
    else
      this.Da.splice(i, 0, cue);
    if ((trigger == null ? void 0 : trigger.type) !== "cuechange") {
      (_a3 = this[TEXT_TRACK_NATIVE]) == null ? void 0 : _a3.track.addCue(cue);
    }
    this.dispatchEvent(new DOMEvent("add-cue", { detail: cue, trigger }));
    if (isCueActive(cue, this.Ea)) {
      this[TEXT_TRACK_UPDATE_ACTIVE_CUES](this.Ea, trigger);
    }
  }
  removeCue(cue, trigger) {
    var _a3;
    const index = this.Da.indexOf(cue);
    if (index >= 0) {
      const isActive = this.Fa.includes(cue);
      this.Da.splice(index, 1);
      (_a3 = this[TEXT_TRACK_NATIVE]) == null ? void 0 : _a3.track.removeCue(cue);
      this.dispatchEvent(new DOMEvent("remove-cue", { detail: cue, trigger }));
      if (isActive) {
        this[TEXT_TRACK_UPDATE_ACTIVE_CUES](this.Ea, trigger);
      }
    }
  }
  setMode(mode, trigger) {
    var _a3;
    if (this.Ga === mode)
      return;
    this.Ga = mode;
    if (mode === "disabled") {
      this.Fa = [];
      this.Ma();
    } else if (this.readyState === 2) {
      this[TEXT_TRACK_UPDATE_ACTIVE_CUES](this.Ea, trigger);
    } else {
      this.Na();
    }
    this.dispatchEvent(new DOMEvent("mode-change", { detail: this, trigger }));
    (_a3 = this[TEXT_TRACK_ON_MODE_CHANGE]) == null ? void 0 : _a3.call(this);
  }
  /* @internal */
  [(_c = TEXT_TRACK_READY_STATE, _d = TEXT_TRACK_CROSSORIGIN, _e = TEXT_TRACK_ON_MODE_CHANGE, _f = TEXT_TRACK_NATIVE, TEXT_TRACK_UPDATE_ACTIVE_CUES)](currentTime, trigger) {
    this.Ea = currentTime;
    if (this.mode === "disabled" || !this.Da.length)
      return;
    const activeCues = [];
    for (let i = 0, length = this.Da.length; i < length; i++) {
      const cue = this.Da[i];
      if (isCueActive(cue, currentTime))
        activeCues.push(cue);
    }
    let changed = activeCues.length !== this.Fa.length;
    if (!changed) {
      for (let i = 0; i < activeCues.length; i++) {
        if (!this.Fa.includes(activeCues[i])) {
          changed = true;
          break;
        }
      }
    }
    this.Fa = activeCues;
    if (changed)
      this.Ma(trigger);
  }
  /* @internal */
  [TEXT_TRACK_CAN_LOAD]() {
    this.Ia = true;
    if (this.Ga !== "disabled")
      this.Na();
  }
  async Na() {
    var _a3, _b2;
    if (!this.Ia || !this.src || this[TEXT_TRACK_READY_STATE] > 0)
      return;
    this[TEXT_TRACK_READY_STATE] = 1;
    this.dispatchEvent(new DOMEvent("load-start"));
    try {
      const { parseResponse: parseResponse2, VTTCue: VTTCue2, VTTRegion: VTTRegion2 } = await __vitePreload(() => import("./prod-5c90466e.js"), true ? ["assets/prod-5c90466e.js","assets/app-ef9c1d43.js"] : void 0), crossorigin = (_a3 = this[TEXT_TRACK_CROSSORIGIN]) == null ? void 0 : _a3.call(this);
      const response = fetch(this.src, {
        headers: this.type === "json" ? { "Content-Type": "application/json" } : void 0,
        credentials: getRequestCredentials(crossorigin)
      });
      if (this.type === "json") {
        this.Ka(await (await response).text(), VTTCue2, VTTRegion2);
      } else {
        const { errors, metadata, regions, cues } = await parseResponse2(response, {
          type: this.type,
          encoding: this.encoding
        });
        if (((_b2 = errors[0]) == null ? void 0 : _b2.code) === 0) {
          throw errors[0];
        } else {
          this.Ja = metadata;
          this.Ha = regions;
          this.Da = cues;
        }
      }
      this.La();
    } catch (error) {
      this.Oa(error);
    }
  }
  La() {
    var _a3;
    this[TEXT_TRACK_READY_STATE] = 2;
    if (!this.src || this.type !== "vtt") {
      const nativeTrack = (_a3 = this[TEXT_TRACK_NATIVE]) == null ? void 0 : _a3.track;
      if (nativeTrack)
        for (const cue of this.Da)
          nativeTrack.addCue(cue);
    }
    const loadEvent = new DOMEvent("load");
    this[TEXT_TRACK_UPDATE_ACTIVE_CUES](this.Ea, loadEvent);
    this.dispatchEvent(loadEvent);
  }
  Oa(error) {
    this[TEXT_TRACK_READY_STATE] = 3;
    this.dispatchEvent(new DOMEvent("error", { detail: error }));
  }
  Ka(json, VTTCue2, VTTRegion2) {
    try {
      json = JSON.parse(json);
      if (json.regions) {
        this.Ha = json.regions.map((json2) => Object.assign(new VTTRegion2(), json2));
      }
      if (json.cues) {
        this.Da = json.cues.filter((json2) => isNumber(json2.startTime) && isNumber(json2.endTime)).map((json2) => Object.assign(new VTTCue2(0, 0, ""), json2));
      }
    } catch (error) {
      this.Oa(error);
    }
  }
  Ma(trigger) {
    this.dispatchEvent(new DOMEvent("cue-change", { trigger }));
  }
}
const captionRE = /captions|subtitles/;
function isTrackCaptionKind(track) {
  return captionRE.test(track.kind);
}
class MediaRemoteControl {
  constructor(_logger) {
    __publicField(this, "ka", null);
    __publicField(this, "ja", null);
    __publicField(this, "la", -1);
    this.ma = _logger;
  }
  /**
   * Set the target from which to dispatch media requests events from. The events should bubble
   * up from this target to the `<media-player>` element.
   *
   * @example
   * ```ts
   * const button = document.querySelector('button');
   * remote.setTarget(button);
   * ```
   */
  setTarget(target) {
    this.ka = target;
  }
  /**
   * Returns the current `<media-player>` element. This method will attempt to find the player by
   * searching up from either the given `target` or default target set via `remote.setTarget`.
   *
   * @example
   * ```ts
   * const player = remote.getPlayer();
   * ```
   */
  getPlayer(target) {
    var _a3;
    if (this.ja)
      return this.ja;
    (_a3 = target ?? this.ka) == null ? void 0 : _a3.dispatchEvent(
      new DOMEvent("find-media-player", {
        detail: (player) => void (this.ja = player),
        bubbles: true,
        composed: true
      })
    );
    return this.ja;
  }
  /**
   * Set the current `<media-player>` element so the remote can support toggle methods such as
   * `togglePaused` as they rely on the current media state.
   */
  setPlayer(player) {
    this.ja = player;
  }
  /**
   * Dispatch a request to start the media loading process. This will only work if the media
   * player has been initialized with a custom loading strategy `<media-player load="custom">`.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#loading-strategies}
   */
  startLoading(trigger) {
    this.ia("media-start-loading", trigger);
  }
  /**
   * Dispatch a request to begin/resume media playback.
   */
  play(trigger) {
    this.ia("media-play-request", trigger);
  }
  /**
   * Dispatch a request to pause media playback.
   */
  pause(trigger) {
    this.ia("media-pause-request", trigger);
  }
  /**
   * Dispatch a request to set the media volume to mute (0).
   */
  mute(trigger) {
    this.ia("media-mute-request", trigger);
  }
  /**
   * Dispatch a request to unmute the media volume and set it back to it's previous state.
   */
  unmute(trigger) {
    this.ia("media-unmute-request", trigger);
  }
  /**
   * Dispatch a request to enter fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/fullscreen#media-remote}
   */
  enterFullscreen(target, trigger) {
    this.ia("media-enter-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to exit fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/fullscreen#media-remote}
   */
  exitFullscreen(target, trigger) {
    this.ia("media-exit-fullscreen-request", trigger, target);
  }
  /**
   * Dispatch a request to enter picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/picture-in-picture#media-remote}
   */
  enterPictureInPicture(trigger) {
    this.ia("media-enter-pip-request", trigger);
  }
  /**
   * Dispatch a request to exit picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/picture-in-picture#media-remote}
   */
  exitPictureInPicture(trigger) {
    this.ia("media-exit-pip-request", trigger);
  }
  /**
   * Notify the media player that a seeking process is happening and to seek to the given `time`.
   */
  seeking(time, trigger) {
    this.ia("media-seeking-request", trigger, time);
  }
  /**
   * Notify the media player that a seeking operation has completed and to seek to the given `time`.
   * This is generally called after a series of `remote.seeking()` calls.
   */
  seek(time, trigger) {
    this.ia("media-seek-request", trigger, time);
  }
  seekToLiveEdge(trigger) {
    this.ia("media-live-edge-request", trigger);
  }
  /**
   * Dispatch a request to update the media volume to the given `volume` level which is a value
   * between 0 and 1.
   *
   * @example
   * ```ts
   * remote.changeVolume(0); // 0%
   * remote.changeVolume(0.05); // 5%
   * remote.changeVolume(0.5); // 50%
   * remote.changeVolume(0.75); // 70%
   * remote.changeVolume(1); // 100%
   * ```
   */
  changeVolume(volume, trigger) {
    this.ia("media-volume-change-request", trigger, Math.max(0, Math.min(1, volume)));
  }
  /**
   * Dispatch a request to change the current audio track.
   *
   * @example
   * ```ts
   * remote.changeAudioTrack(1); // track at index 1
   * ```
   */
  changeAudioTrack(index, trigger) {
    this.ia("media-audio-track-change-request", trigger, index);
  }
  /**
   * Dispatch a request to change the video quality. The special value `-1` represents auto quality
   * selection.
   *
   * @example
   * ```ts
   * remote.changeQuality(-1); // auto
   * remote.changeQuality(1); // quality at index 1
   * ```
   */
  changeQuality(index, trigger) {
    this.ia("media-quality-change-request", trigger, index);
  }
  /**
   * Dispatch a request to change the mode of the text track at the given index.
   *
   * @example
   * ```ts
   * remote.changeTextTrackMode(1, 'showing'); // track at index 1
   * ```
   */
  changeTextTrackMode(index, mode, trigger) {
    this.ia("media-text-track-change-request", trigger, {
      index,
      mode
    });
  }
  /**
   * Dispatch a request to change the media playback rate.
   *
   * @example
   * ```ts
   * remote.changePlaybackRate(0.5); // Half the normal speed
   * remote.changePlaybackRate(1); // Normal speed
   * remote.changePlaybackRate(1.5); // 50% faster than normal
   * remote.changePlaybackRate(2); // Double the normal speed
   * ```
   */
  changePlaybackRate(rate, trigger) {
    this.ia("media-rate-change-request", trigger, rate);
  }
  /**
   * Dispatch a request to resume user idle tracking. Refer to {@link MediaRemoteControl.pauseUserIdle}
   * for more information.
   */
  resumeUserIdle(trigger) {
    this.ia("media-resume-user-idle-request", trigger);
  }
  /**
   * Dispatch a request to pause user idle tracking. Pausing tracking will result in the `user-idle`
   * attribute and state being `false` until `remote.resumeUserIdle()` is called. This method
   * is generally used when building custom controls and you'd like to prevent the UI from
   * dissapearing.
   *
   * @example
   * ```ts
   * // Prevent user idling while menu is being interacted with.
   * function onSettingsOpen() {
   *   remote.pauseUserIdle();
   * }
   *
   * function onSettingsClose() {
   *   remote.resumeUserIdle();
   * }
   * ```
   */
  pauseUserIdle(trigger) {
    this.ia("media-pause-user-idle-request", trigger);
  }
  /**
   * Dispatch a request to toggle the media playback state.
   */
  togglePaused(trigger) {
    const player = this.getPlayer(trigger == null ? void 0 : trigger.target);
    if (!player) {
      return;
    }
    if (player.state.paused)
      this.play(trigger);
    else
      this.pause(trigger);
  }
  /**
   * Dispatch a request to toggle the user idle state.
   */
  toggleUserIdle(trigger) {
    const player = this.getPlayer(trigger == null ? void 0 : trigger.target);
    if (!player) {
      return;
    }
    player.user.idle(!player.user.idling, 0, trigger);
  }
  /**
   * Dispatch a request to toggle the media muted state.
   */
  toggleMuted(trigger) {
    const player = this.getPlayer(trigger == null ? void 0 : trigger.target);
    if (!player) {
      return;
    }
    if (player.state.muted)
      this.unmute(trigger);
    else
      this.mute(trigger);
  }
  /**
   * Dispatch a request to toggle the media fullscreen state.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/fullscreen#media-remote}
   */
  toggleFullscreen(target, trigger) {
    const player = this.getPlayer(trigger == null ? void 0 : trigger.target);
    if (!player) {
      return;
    }
    if (player.state.fullscreen)
      this.exitFullscreen(target, trigger);
    else
      this.enterFullscreen(target, trigger);
  }
  /**
   * Dispatch a request to toggle the media picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/picture-in-picture#media-remote}
   */
  togglePictureInPicture(trigger) {
    const player = this.getPlayer(trigger == null ? void 0 : trigger.target);
    if (!player) {
      return;
    }
    if (player.state.pictureInPicture)
      this.exitPictureInPicture(trigger);
    else
      this.enterPictureInPicture(trigger);
  }
  /**
   * Dispatch a request to toggle the current captions mode.
   */
  toggleCaptions(trigger) {
    const player = this.getPlayer(trigger == null ? void 0 : trigger.target);
    if (!player) {
      return;
    }
    const tracks = player.state.textTracks, track = player.state.textTrack;
    if (track) {
      const index = tracks.indexOf(track);
      this.changeTextTrackMode(index, "disabled", trigger);
      this.la = index;
    } else {
      let index = this.la;
      if (!tracks[index] || !isTrackCaptionKind(tracks[index])) {
        index = -1;
      }
      if (index === -1) {
        index = tracks.findIndex((track2) => isTrackCaptionKind(track2) && track2.default);
      }
      if (index === -1) {
        index = tracks.findIndex((track2) => isTrackCaptionKind(track2));
      }
      if (index >= 0)
        this.changeTextTrackMode(index, "showing", trigger);
      this.la = -1;
    }
  }
  ia(type, trigger, detail) {
    const request = new DOMEvent(type, {
      bubbles: true,
      composed: true,
      detail,
      trigger
    });
    const shouldUsePlayer = (trigger == null ? void 0 : trigger.target) && (trigger.target === document || trigger.target === window || trigger.target === document.body || this.ja && !this.ja.contains(trigger.target));
    const target = shouldUsePlayer ? this.ka ?? this.getPlayer() : (trigger == null ? void 0 : trigger.target) ?? this.ka;
    target == null ? void 0 : target.dispatchEvent(request);
  }
  na(method2) {
  }
}
class ThumbnailsLoader extends ComponentController {
  constructor() {
    super(...arguments);
    __publicField(this, "k");
  }
  onConnect() {
    this.k = useMedia();
    effect(this.Uf.bind(this));
  }
  Uf() {
    const { canLoad, thumbnailCues } = this.k.$store;
    if (!canLoad())
      return;
    const controller = new AbortController(), { crossorigin, thumbnails } = this.k.$store;
    const src = thumbnails();
    if (!src)
      return;
    __vitePreload(() => import("./prod-5c90466e.js"), true ? ["assets/prod-5c90466e.js","assets/app-ef9c1d43.js"] : void 0).then(({ parseResponse: parseResponse2 }) => {
      parseResponse2(
        fetch(src, {
          signal: controller.signal,
          credentials: getRequestCredentials(crossorigin())
        })
      ).then(({ cues }) => thumbnailCues.set(cues)).catch(noop);
    });
    return () => {
      controller.abort();
      thumbnailCues.set([]);
    };
  }
}
class AudioTrackList extends SelectList {
  getById(id2) {
    if (id2 === "")
      return null;
    return this.a.find((track) => track.id === id2) ?? null;
  }
}
class NativeTextRenderer {
  constructor() {
    __publicField(this, "priority", 0);
    __publicField(this, "eg", true);
    __publicField(this, "aa", null);
    __publicField(this, "ya", null);
    __publicField(this, "dg", /* @__PURE__ */ new Set());
  }
  canRender() {
    return true;
  }
  attach(video) {
    this.aa = video;
    video.textTracks.onchange = this.Hc.bind(this);
  }
  addTrack(track) {
    this.dg.add(track);
    this.gg(track);
  }
  removeTrack(track) {
    var _a3, _b2;
    (_b2 = (_a3 = track[TEXT_TRACK_NATIVE]) == null ? void 0 : _a3.remove) == null ? void 0 : _b2.call(_a3);
    track[TEXT_TRACK_NATIVE] = null;
    this.dg.delete(track);
  }
  changeTrack(track) {
    const current = track == null ? void 0 : track[TEXT_TRACK_NATIVE];
    if (current && current.track.mode !== "showing") {
      current.track.mode = "showing";
    }
    this.ya = track;
  }
  setDisplay(display) {
    this.eg = display;
    this.Hc();
  }
  detach() {
    if (this.aa)
      this.aa.textTracks.onchange = null;
    for (const track of this.dg)
      this.removeTrack(track);
    this.dg.clear();
    this.aa = null;
    this.ya = null;
  }
  gg(track) {
    if (!this.aa)
      return;
    const el = track[TEXT_TRACK_NATIVE] ?? (track[TEXT_TRACK_NATIVE] = this.hg(track));
    if (el instanceof HTMLElement) {
      this.aa.append(el);
      el.track.mode = el.default ? "showing" : "hidden";
    }
  }
  hg(track) {
    const el = document.createElement("track"), isDefault = track.default || track.mode === "showing", isSupported = track.src && track.type === "vtt";
    el.id = track.id;
    el.src = isSupported ? track.src : "https://cdn.jsdelivr.net/npm/vidstack@0.6.12/empty.vtt";
    el.label = track.label;
    el.kind = track.kind;
    el.default = isDefault;
    track.language && (el.srclang = track.language);
    if (isDefault && !isSupported) {
      this.fg(track, el.track);
    }
    return el;
  }
  fg(track, native) {
    var _a3;
    if (track.src && track.type === "vtt" || ((_a3 = native.cues) == null ? void 0 : _a3.length))
      return;
    for (const cue of track.cues)
      native.addCue(cue);
  }
  Hc(event) {
    var _a3;
    for (const track of this.dg) {
      const nativeTrack = (_a3 = track[TEXT_TRACK_NATIVE]) == null ? void 0 : _a3.track;
      if (!nativeTrack)
        continue;
      if (!this.eg) {
        nativeTrack.mode = "disabled";
        continue;
      }
      const isShowing = nativeTrack.mode === "showing";
      if (isShowing)
        this.fg(track, nativeTrack);
      track.setMode(isShowing ? "showing" : "disabled", event);
    }
  }
}
class TextRenderers {
  constructor(_media) {
    __publicField(this, "aa", null);
    __publicField(this, "$");
    __publicField(this, "_", []);
    __publicField(this, "ca", false);
    __publicField(this, "X", null);
    __publicField(this, "Y", null);
    this.k = _media;
    const textTracks = _media.textTracks;
    this.$ = textTracks;
    effect(this.ea.bind(this));
    onDispose(this.ba.bind(this));
    listenEvent(textTracks, "add", this.fa.bind(this));
    listenEvent(textTracks, "remove", this.ga.bind(this));
    listenEvent(textTracks, "mode-change", this.Z.bind(this));
  }
  ea() {
    const { $store, $iosControls } = this.k;
    this.ca = $store.controls() || $iosControls();
    this.Z();
  }
  add(renderer) {
    this._.push(renderer);
    this.Z();
  }
  remove(renderer) {
    renderer.detach();
    this._.splice(this._.indexOf(renderer), 1);
    this.Z();
  }
  /* @internal */
  [ATTACH_VIDEO](video) {
    requestAnimationFrame(() => {
      this.aa = video;
      if (video) {
        this.X = new NativeTextRenderer();
        this.X.attach(video);
        for (const track of this.$)
          this.da(track);
      }
      this.Z();
    });
  }
  da(track) {
    var _a3;
    if (!isTrackCaptionKind(track))
      return;
    (_a3 = this.X) == null ? void 0 : _a3.addTrack(track);
  }
  ha(track) {
    var _a3;
    if (!isTrackCaptionKind(track))
      return;
    (_a3 = this.X) == null ? void 0 : _a3.removeTrack(track);
  }
  fa(event) {
    this.da(event.detail);
  }
  ga(event) {
    this.ha(event.detail);
  }
  Z() {
    var _a3, _b2, _c2;
    if (!this.aa) {
      this.ba();
      return;
    }
    const currentTrack = this.$.selected;
    if (this.ca || (currentTrack == null ? void 0 : currentTrack[TEXT_TRACK_NATIVE_HLS])) {
      (_a3 = this.Y) == null ? void 0 : _a3.changeTrack(null);
      this.X.setDisplay(true);
      this.X.changeTrack(currentTrack);
      return;
    }
    this.X.setDisplay(false);
    this.X.changeTrack(null);
    if (!currentTrack) {
      (_b2 = this.Y) == null ? void 0 : _b2.changeTrack(null);
      return;
    }
    const customRenderer = this._.sort((a, b) => a.priority - b.priority).find((loader) => loader.canRender(currentTrack));
    if (this.Y !== customRenderer) {
      (_c2 = this.Y) == null ? void 0 : _c2.detach();
      customRenderer == null ? void 0 : customRenderer.attach(this.aa);
      this.Y = customRenderer ?? null;
    }
    customRenderer == null ? void 0 : customRenderer.changeTrack(currentTrack);
  }
  ba() {
    var _a3, _b2;
    (_a3 = this.X) == null ? void 0 : _a3.detach();
    this.X = null;
    (_b2 = this.Y) == null ? void 0 : _b2.detach();
    this.Y = null;
  }
}
class TextTrackList extends List {
  constructor() {
    super(...arguments);
    __publicField(this, "Ia", false);
    __publicField(this, "Pa", {});
    /** @internal */
    __publicField(this, _g);
    __publicField(this, "Qa", this.Ra.bind(this));
  }
  get selected() {
    const track = this.a.find((t) => t.mode === "showing" && isTrackCaptionKind(t));
    return track ?? null;
  }
  add(init, trigger) {
    const isTrack = init instanceof TextTrack, track = isTrack ? init : new TextTrack(init);
    if (this.Pa[init.kind] && init.default)
      delete init.default;
    track.addEventListener("mode-change", this.Qa);
    this[LIST_ADD](track, trigger);
    track[TEXT_TRACK_CROSSORIGIN] = this[TEXT_TRACK_CROSSORIGIN];
    if (this.Ia)
      track[TEXT_TRACK_CAN_LOAD]();
    if (init.default) {
      this.Pa[init.kind] = track;
      track.mode = "showing";
    }
    return this;
  }
  remove(track, trigger) {
    if (!this.a.includes(track))
      return;
    if (track === this.Pa[track.kind])
      delete this.Pa[track.kind];
    track.mode = "disabled";
    track[TEXT_TRACK_ON_MODE_CHANGE] = null;
    track.removeEventListener("mode-change", this.Qa);
    this[LIST_REMOVE](track, trigger);
    return this;
  }
  clear(trigger) {
    for (const track of this.a)
      this.remove(track, trigger);
    return this;
  }
  getById(id2) {
    return this.a.find((track) => track.id === id2) ?? null;
  }
  getByKind(kind) {
    const kinds = Array.isArray(kind) ? kind : [kind];
    return this.a.filter((track) => kinds.includes(track.kind));
  }
  /* @internal */
  [(_g = TEXT_TRACK_CROSSORIGIN, TEXT_TRACK_CAN_LOAD)]() {
    if (this.Ia)
      return;
    for (const track of this.a)
      track[TEXT_TRACK_CAN_LOAD]();
    this.Ia = true;
  }
  Ra(event) {
    const track = event.detail;
    if (track.mode === "showing") {
      const kinds = isTrackCaptionKind(track) ? ["captions", "subtitles"] : [track.kind];
      for (const t of this.a) {
        if (t.mode === "showing" && t != track && kinds.includes(t.kind)) {
          t.mode = "disabled";
        }
      }
    }
    this.dispatchEvent(
      new DOMEvent("mode-change", {
        detail: event.detail,
        trigger: event
      })
    );
  }
}
class SourceSelection {
  constructor(_domSources, _media, _loader) {
    __publicField(this, "Vf");
    this.T = _domSources;
    this.k = _media;
    this.S = _loader;
    const HLS_LOADER = new HLSProviderLoader(), VIDEO_LOADER = new VideoProviderLoader(), AUDIO_LOADER = new AudioProviderLoader();
    this.Vf = computed(() => {
      return _media.$props.preferNativeHLS() ? [VIDEO_LOADER, AUDIO_LOADER, HLS_LOADER] : [HLS_LOADER, VIDEO_LOADER, AUDIO_LOADER];
    });
    effect(this.Xf.bind(this));
    effect(this.Yf.bind(this));
    effect(this.Zf.bind(this));
    effect(this._f.bind(this));
  }
  Xf() {
    this.k.delegate.R("sources-change", {
      detail: [...normalizeSrc(this.k.$props.src()), ...this.T()]
    });
  }
  Yf() {
    var _a3;
    const { $store } = this.k;
    const sources = $store.sources(), currentSource = peek($store.source), newSource = this.Wf(currentSource, sources), noMatch = ((_a3 = sources[0]) == null ? void 0 : _a3.src) && !newSource.src && !newSource.type;
    if (noMatch) {
      const { crossorigin } = $store, credentials = getRequestCredentials(crossorigin()), abort = new AbortController();
      Promise.all(
        sources.map(
          (source) => isString(source.src) && source.type === "?" ? fetch(source.src, {
            method: "HEAD",
            credentials,
            signal: abort.signal
          }).then((res) => {
            source.type = res.headers.get("content-type") || "??";
            return source;
          }).catch(() => source) : source
        )
      ).then((sources2) => {
        if (abort.signal.aborted)
          return;
        this.Wf(peek($store.source), sources2);
        tick();
      });
      return () => abort.abort();
    }
    tick();
  }
  Wf(currentSource, sources) {
    let newSource = { src: "", type: "" }, newLoader = null;
    for (const src of sources) {
      const loader = peek(this.Vf).find((loader2) => loader2.canPlay(src));
      if (loader) {
        newSource = src;
        newLoader = loader;
      }
    }
    this.$f(currentSource, newSource, newLoader);
    this.ag(peek(this.S), newLoader);
    return newSource;
  }
  $f(currentSource, newSource, newLoader) {
    if (newSource.src === currentSource.src && newSource.type === currentSource.type)
      return;
    this.k.delegate.R("source-change", { detail: newSource });
    this.k.delegate.R("media-type-change", {
      detail: (newLoader == null ? void 0 : newLoader.mediaType(newSource)) || "unknown"
    });
  }
  ag(currentLoader, newLoader) {
    if (newLoader === currentLoader)
      return;
    this.k.delegate.R("provider-change", { detail: null });
    newLoader && peek(() => {
      var _a3;
      return (_a3 = newLoader.preconnect) == null ? void 0 : _a3.call(newLoader, this.k);
    });
    this.S.set(newLoader);
    this.k.delegate.R("provider-loader-change", { detail: newLoader });
  }
  Zf() {
    const provider = this.k.$provider();
    if (!provider)
      return;
    if (this.k.$store.canLoad()) {
      peek(
        () => provider.setup({
          ...this.k,
          player: this.k.player
        })
      );
      return;
    }
    peek(() => {
      var _a3;
      return (_a3 = provider.preconnect) == null ? void 0 : _a3.call(provider, this.k);
    });
  }
  _f() {
    const provider = this.k.$provider(), source = this.k.$store.source();
    if (this.k.$store.canLoad()) {
      peek(() => provider == null ? void 0 : provider.loadSource(source, peek(this.k.$store.preload)));
      return;
    }
    try {
      isString(source.src) && preconnect(new URL(source.src).origin, "preconnect");
    } catch (e) {
    }
  }
}
function normalizeSrc(src) {
  return (isArray(src) ? src : [!isString(src) && "src" in src ? src : { src }]).map(
    ({ src: src2, type }) => ({
      src: src2,
      type: type ?? (!isString(src2) || src2.startsWith("blob:") ? "video/object" : "?")
    })
  );
}
class Tracks {
  constructor(_domTracks, _media) {
    __publicField(this, "bg", []);
    this.U = _domTracks;
    this.k = _media;
    effect(this.cg.bind(this));
  }
  cg() {
    const newTracks = [...this.k.$props.textTracks(), ...this.U()];
    for (const oldTrack of this.bg) {
      if (!newTracks.some((t) => t.id === oldTrack.id)) {
        const track = oldTrack.id && this.k.textTracks.getById(oldTrack.id);
        if (track)
          this.k.textTracks.remove(track);
      }
    }
    for (const newTrack of newTracks) {
      const id2 = newTrack.id || TextTrack.createId(newTrack);
      if (!this.k.textTracks.getById(id2)) {
        newTrack.id = id2;
        this.k.textTracks.add(newTrack);
      }
    }
    this.bg = newTracks;
  }
}
class Outlet extends Component {
  constructor(instance) {
    super(instance);
    __publicField(this, "k");
    __publicField(this, "T", signal([]));
    __publicField(this, "U", signal([]));
    __publicField(this, "S", signal(null));
    this.k = useMedia();
    new SourceSelection(this.T, this.k, this.S);
    new Tracks(this.U, this.k);
  }
  onAttach(el) {
    el.setAttribute("keep-alive", "");
  }
  onConnect(el) {
    const resize = new ResizeObserver(animationFrameThrottle(this.p.bind(this)));
    resize.observe(el);
    const mutation = new MutationObserver(this.V.bind(this));
    mutation.observe(el, { attributes: true, childList: true });
    if (IS_SAFARI) {
      listenEvent(el, "touchstart", (e) => e.preventDefault(), { passive: false });
    }
    scopedRaf(() => {
      this.p();
      this.V();
    });
    return () => {
      resize.disconnect();
      mutation.disconnect();
    };
  }
  onDestroy() {
    this.k.$store.currentTime.set(0);
  }
  p() {
    const player = this.k.player, width = this.el.offsetWidth, height = this.el.offsetHeight;
    if (!player)
      return;
    player.$store.mediaWidth.set(width);
    player.$store.mediaHeight.set(height);
    setStyle(player, "--media-width", width + "px");
    setStyle(player, "--media-height", height + "px");
  }
  V() {
    const sources = [], tracks = [], children = this.el.children;
    for (const el of children) {
      if (el instanceof HTMLSourceElement) {
        sources.push({
          src: el.src,
          type: el.type
        });
      } else if (el instanceof HTMLTrackElement) {
        tracks.push({
          id: el.id,
          src: el.src,
          kind: el.track.kind,
          language: el.srclang,
          label: el.label,
          default: el.default,
          type: el.getAttribute("data-type")
        });
      }
    }
    this.T.set(sources);
    this.U.set(tracks);
    tick();
  }
  render() {
    let currentProvider;
    onDispose(() => {
      var _a3;
      return (_a3 = currentProvider == null ? void 0 : currentProvider.destroy) == null ? void 0 : _a3.call(currentProvider);
    });
    return () => {
      currentProvider == null ? void 0 : currentProvider.destroy();
      const loader = this.S();
      if (!loader)
        return null;
      const el = loader.render(this.k.$store);
      {
        peek(() => {
          loader.load(this.k).then((provider) => {
            if (peek(this.S) !== loader)
              return;
            this.k.delegate.R("provider-change", {
              detail: provider
            });
            currentProvider = provider;
          });
        });
      }
      return el;
    };
  }
}
__publicField(Outlet, "el", defineElement({
  tagName: "media-outlet"
}));
class ARIAKeyShortcuts extends ComponentController {
  constructor(instance, _shortcut) {
    super(instance);
    this.ig = _shortcut;
  }
  onAttach(el) {
    const { $props, ariaKeys } = useMedia(), keys = el.getAttribute("aria-keyshortcuts");
    if (keys) {
      ariaKeys[this.ig] = keys;
      {
        onDispose(() => {
          delete ariaKeys[this.ig];
        });
      }
      return;
    }
    const shortcuts = $props.keyShortcuts()[this.ig];
    if (shortcuts)
      el.setAttribute("aria-keyshortcuts", shortcuts);
  }
}
const $$_templ$j = /* @__PURE__ */ $$_create_template(`<!$><svg viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false" data-media-icon="true"></svg>`);
function Icon({ slot, part, paths, rotate }) {
  return (() => {
    const [$$_root, $$_walker] = $$_create_walker($$_templ$j);
    $$_attr($$_root, "data-rotate", rotate);
    $$_attr($$_root, "slot", slot);
    $$_attr($$_root, "part", part);
    if (!$$_hydrating)
      $$_root.innerHTML = paths;
    return $$_root;
  })();
}
const ParseErrorCode = {
  LoadFail: 0,
  BadSignature: 1,
  BadTimestamp: 2,
  BadSettingValue: 3,
  BadFormat: 4,
  UnknownSetting: 5
};
class ParseError extends Error {
  constructor(init) {
    super(init.reason);
    __publicField(this, "code");
    __publicField(this, "line");
    this.code = init.code;
    this.line = init.line;
  }
}
const LINE_TERMINATOR_RE = /\r?\n|\r/gm;
class TextLineTransformStream {
  constructor(encoding) {
    __publicField(this, "writable");
    __publicField(this, "readable");
    const transformer = new TextStreamLineIterator(encoding);
    this.writable = new WritableStream({
      write(chunk) {
        transformer.transform(chunk);
      },
      close() {
        transformer.close();
      }
    });
    this.readable = new ReadableStream({
      start(controller) {
        transformer.onLine = (line) => controller.enqueue(line);
        transformer.onClose = () => controller.close();
      }
    });
  }
}
class TextStreamLineIterator {
  constructor(encoding) {
    __publicField(this, "x", "");
    __publicField(this, "y");
    __publicField(this, "onLine");
    __publicField(this, "onClose");
    this.y = new TextDecoder(encoding);
  }
  transform(chunk) {
    this.x += this.y.decode(chunk, { stream: true });
    const lines = this.x.split(LINE_TERMINATOR_RE);
    this.x = lines.pop() || "";
    for (let i = 0; i < lines.length; i++)
      this.onLine(lines[i].trim());
  }
  close() {
    if (this.x)
      this.onLine(this.x.trim());
    this.x = "";
    this.onClose();
  }
}
async function parseText(text, options) {
  const stream = new ReadableStream({
    start(controller) {
      const lines = text.split(LINE_TERMINATOR_RE);
      for (const line of lines)
        controller.enqueue(line);
      controller.close();
    }
  });
  return parseTextStream(stream, options);
}
async function parseTextStream(stream, options) {
  const type = (options == null ? void 0 : options.type) ?? "vtt";
  let factory;
  if (typeof type === "string") {
    switch (type) {
      case "srt":
        factory = (await __vitePreload(() => import("./srt-parser-38a3d672.js"), true ? ["assets/srt-parser-38a3d672.js","assets/app-ef9c1d43.js"] : void 0)).default;
        break;
      case "ssa":
      case "ass":
        factory = (await __vitePreload(() => import("./ssa-parser-cca29ea2.js"), true ? ["assets/ssa-parser-cca29ea2.js","assets/app-ef9c1d43.js"] : void 0)).default;
        break;
      default:
        factory = (await Promise.resolve().then(function() {
          return vttParser;
        })).default;
    }
  } else {
    factory = type;
  }
  let result;
  const reader = stream.getReader(), parser = factory(), errors = !!(options == null ? void 0 : options.strict) || !!(options == null ? void 0 : options.errors);
  await parser.init({
    strict: false,
    ...options,
    errors,
    type,
    cancel() {
      reader.cancel();
      result = parser.done(true);
    }
  });
  let i = 1;
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      parser.parse("", i);
      result = parser.done(false);
      break;
    }
    parser.parse(value, i);
    i++;
  }
  return result;
}
async function parseResponse(response, options) {
  var _a3, _b2;
  const res = await response;
  if (!res.ok || !res.body) {
    let error;
    return {
      metadata: {},
      cues: [],
      regions: [],
      errors: [error]
    };
  }
  const contentType = res.headers.get("content-type") || "", type = (_a3 = contentType.match(/text\/(.*?)(?:;|$)/)) == null ? void 0 : _a3[1], encoding = (_b2 = contentType.match(/charset=(.*?)(?:;|$)/)) == null ? void 0 : _b2[1];
  return parseByteStream(res.body, { type, encoding, ...options });
}
async function parseByteStream(stream, { encoding = "utf-8", ...options } = {}) {
  const textStream = stream.pipeThrough(new TextLineTransformStream(encoding));
  return parseTextStream(textStream, options);
}
class TextCue extends EventTarget {
  constructor(startTime, endTime, text) {
    super();
    /**
     * A string that identifies the cue.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrackCue/id}
     */
    __publicField(this, "id", "");
    /**
     * A `double` that represents the video time that the cue will start being displayed, in seconds.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrackCue/startTime}
     */
    __publicField(this, "startTime");
    /**
     * A `double` that represents the video time that the cue will stop being displayed, in seconds.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrackCue/endTime}
     */
    __publicField(this, "endTime");
    /**
     * Returns a string with the contents of the cue.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/VTTCue/text}
     */
    __publicField(this, "text");
    /**
     * A `boolean` for whether the video will pause when this cue stops being displayed.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/TextTrackCue/pauseOnExit}
     */
    __publicField(this, "pauseOnExit", false);
    this.startTime = startTime;
    this.endTime = endTime;
    this.text = text;
  }
  addEventListener(type, listener, options) {
    super.addEventListener(type, listener, options);
  }
  removeEventListener(type, listener, options) {
    super.removeEventListener(type, listener, options);
  }
}
const CueBase = window.VTTCue;
class VTTCue extends CueBase {
  constructor() {
    super(...arguments);
    /**
     * A `VTTRegion` object describing the video's sub-region that the cue will be drawn onto,
     * or `null` if none is assigned.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/VTTCue/region}
     */
    __publicField(this, "region", null);
    /**
     * The cue writing direction.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/VTTCue/vertical}
     */
    __publicField(this, "vertical", "");
    /**
     * Returns `true` if the `VTTCue.line` attribute is an integer number of lines or a percentage
     * of the video size.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/VTTCue/snapToLines}
     */
    __publicField(this, "snapToLines", true);
    /**
     * Returns the line positioning of the cue. This can be the string `'auto'` or a number whose
     * interpretation depends on the value of `VTTCue.snapToLines`.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/VTTCue/line}
     */
    __publicField(this, "line", "auto");
    /**
     * Returns an enum representing the alignment of the `VTTCue.line`.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/VTTCue/lineAlign}
     */
    __publicField(this, "lineAlign", "start");
    /**
     * Returns the indentation of the cue within the line. This can be the string `'auto'` or a
     * number representing the percentage of the `VTTCue.region`, or the video size if `VTTCue`.region`
     * is `null`.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/VTTCue/position}
     */
    __publicField(this, "position", "auto");
    /**
     * Returns an enum representing the alignment of the cue. This is used to determine what
     * the `VTTCue.position` is anchored to. The default is `'auto'`.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/VTTCue/positionAlign}
     */
    __publicField(this, "positionAlign", "auto");
    /**
     * Returns a double representing the size of the cue, as a percentage of the video size.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/VTTCue/size}
     */
    __publicField(this, "size", 100);
    /**
     * Returns an enum representing the alignment of all the lines of text within the cue box.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/VTTCue/align}
     */
    __publicField(this, "align", "center");
    /**
     * Additional styles associated with the cue.
     */
    __publicField(this, "style");
  }
}
class VTTRegion {
  constructor() {
    /**
     * A string that identifies the region.
     */
    __publicField(this, "id", "");
    /**
     * A `double` representing the width of the region, as a percentage of the video.
     */
    __publicField(this, "width", 100);
    /**
     * A `double` representing the height of the region, in number of lines.
     */
    __publicField(this, "lines", 3);
    /**
     * A `double` representing the region anchor X offset, as a percentage of the region.
     */
    __publicField(this, "regionAnchorX", 0);
    /**
     * A `double` representing the region anchor Y offset, as a percentage of the region.
     */
    __publicField(this, "regionAnchorY", 100);
    /**
     * A `double` representing the viewport anchor X offset, as a percentage of the video.
     */
    __publicField(this, "viewportAnchorX", 0);
    /**
     * A `double` representing the viewport anchor Y offset, as a percentage of the video.
     */
    __publicField(this, "viewportAnchorY", 100);
    /**
     * An enum representing how adding new cues will move existing cues.
     */
    __publicField(this, "scroll", "");
  }
}
const COMMA$1 = ",", PERCENT_SIGN$1 = "%";
function toNumber(text) {
  const num = parseInt(text, 10);
  return !Number.isNaN(num) ? num : null;
}
function toPercentage(text) {
  const num = parseInt(text.replace(PERCENT_SIGN$1, ""), 10);
  return !Number.isNaN(num) && num >= 0 && num <= 100 ? num : null;
}
function toCoords(text) {
  if (!text.includes(COMMA$1))
    return null;
  const [x, y] = text.split(COMMA$1).map(toPercentage);
  return x !== null && y !== null ? [x, y] : null;
}
function toFloat(text) {
  const num = parseFloat(text);
  return !Number.isNaN(num) ? num : null;
}
const HEADER_MAGIC = "WEBVTT", COMMA = ",", PERCENT_SIGN = "%", SETTING_SEP_RE = /[:=]/, SETTING_LINE_RE = /^[\s\t]*(region|vertical|line|position|size|align)[:=]/, NOTE_BLOCK_START = "NOTE", REGION_BLOCK_START = "REGION", REGION_BLOCK_START_RE = /^REGION:?[\s\t]+/, SPACE_RE = /[\s\t]+/, TIMESTAMP_SEP = "-->", TIMESTAMP_SEP_RE = /[\s\t]*-->[\s\t]+/, ALIGN_RE = /start|center|end|left|right/, LINE_ALIGN_RE = /start|center|end/, POS_ALIGN_RE = /line-(?:left|right)|center|auto/, TIMESTAMP_RE = /^(?:(\d{1,2}):)?(\d{2}):(\d{2})(?:\.(\d{1,3}))?$/;
var VTTBlock = /* @__PURE__ */ ((VTTBlock2) => {
  VTTBlock2[VTTBlock2["None"] = 0] = "None";
  VTTBlock2[VTTBlock2["Header"] = 1] = "Header";
  VTTBlock2[VTTBlock2["Cue"] = 2] = "Cue";
  VTTBlock2[VTTBlock2["Region"] = 3] = "Region";
  VTTBlock2[VTTBlock2["Note"] = 4] = "Note";
  return VTTBlock2;
})(VTTBlock || {});
class VTTParser {
  constructor() {
    __publicField(this, "f");
    __publicField(this, "c", 0);
    __publicField(this, "g", {});
    __publicField(this, "h", {});
    __publicField(this, "j", []);
    __publicField(this, "a", null);
    __publicField(this, "b", null);
    __publicField(this, "k", []);
    __publicField(this, "d");
    __publicField(this, "l", "");
  }
  async init(init) {
    this.f = init;
    if (init.strict)
      this.c = 1;
    if (init.errors)
      this.d = (await __vitePreload(() => import("./errors-f877c9b1.js"), true ? ["assets/errors-f877c9b1.js","assets/app-ef9c1d43.js"] : void 0)).ParseErrorBuilder;
  }
  parse(line, lineCount) {
    var _a3, _b2, _c2, _d2, _e2, _f2;
    if (line === "") {
      if (this.a) {
        this.j.push(this.a);
        (_b2 = (_a3 = this.f).onCue) == null ? void 0 : _b2.call(_a3, this.a);
        this.a = null;
      } else if (this.b) {
        this.h[this.b.id] = this.b;
        (_d2 = (_c2 = this.f).onRegion) == null ? void 0 : _d2.call(_c2, this.b);
        this.b = null;
      } else if (this.c === 1) {
        this.i(line, lineCount);
        (_f2 = (_e2 = this.f).onHeaderMetadata) == null ? void 0 : _f2.call(_e2, this.g);
      }
      this.c = 0;
    } else if (this.c) {
      switch (this.c) {
        case 1:
          this.i(line, lineCount);
          break;
        case 2:
          if (this.a) {
            const hasText = this.a.text.length > 0;
            if (!hasText && SETTING_LINE_RE.test(line)) {
              this.m(line.split(SPACE_RE), lineCount);
            } else {
              this.a.text += (hasText ? "\n" : "") + line;
            }
          }
          break;
        case 3:
          this.n(line.split(SPACE_RE), lineCount);
          break;
      }
    } else if (line.startsWith(NOTE_BLOCK_START)) {
      this.c = 4;
    } else if (line.startsWith(REGION_BLOCK_START)) {
      this.c = 3;
      this.b = new VTTRegion();
      this.n(line.replace(REGION_BLOCK_START_RE, "").split(SPACE_RE), lineCount);
    } else if (line.includes(TIMESTAMP_SEP)) {
      const result = this.o(line, lineCount);
      if (result) {
        this.a = new VTTCue(result[0], result[1], "");
        this.a.id = this.l;
        this.m(result[2], lineCount);
      }
      this.c = 2;
    } else if (lineCount === 1) {
      this.i(line, lineCount);
    }
    this.l = line;
  }
  done() {
    return {
      metadata: this.g,
      cues: this.j,
      regions: Object.values(this.h),
      errors: this.k
    };
  }
  i(line, lineCount) {
    var _a3;
    if (lineCount > 1) {
      if (SETTING_SEP_RE.test(line)) {
        const [key2, value] = line.split(SETTING_SEP_RE);
        if (key2)
          this.g[key2] = (value || "").replace(SPACE_RE, "");
      }
    } else if (line.startsWith(HEADER_MAGIC)) {
      this.c = 1;
    } else {
      this.e((_a3 = this.d) == null ? void 0 : _a3.p());
    }
  }
  o(line, lineCount) {
    var _a3, _b2, _c2;
    const [startTimeText, trailingText = ""] = line.split(TIMESTAMP_SEP_RE), [endTimeText, ...settingsText] = trailingText.split(SPACE_RE), startTime = parseVTTTimestamp(startTimeText), endTime = parseVTTTimestamp(endTimeText);
    if (startTime !== null && endTime !== null && endTime > startTime) {
      return [startTime, endTime, settingsText];
    } else {
      if (startTime === null) {
        this.e((_a3 = this.d) == null ? void 0 : _a3.q(startTimeText, lineCount));
      }
      if (endTime === null) {
        this.e((_b2 = this.d) == null ? void 0 : _b2.r(endTimeText, lineCount));
      }
      if (startTime != null && endTime !== null && endTime > startTime) {
        this.e((_c2 = this.d) == null ? void 0 : _c2.s(startTime, endTime, lineCount));
      }
    }
  }
  /**
   * @see {@link https://www.w3.org/TR/webvtt1/#region-settings-parsing}
   */
  n(settings, line) {
    var _a3, _b2;
    let badValue;
    for (let i = 0; i < settings.length; i++) {
      if (SETTING_SEP_RE.test(settings[i])) {
        badValue = false;
        const [name, value] = settings[i].split(SETTING_SEP_RE);
        switch (name) {
          case "id":
            this.b.id = value;
            break;
          case "width":
            const width = toPercentage(value);
            if (width !== null)
              this.b.width = width;
            else
              badValue = true;
            break;
          case "lines":
            const lines = toNumber(value);
            if (lines !== null)
              this.b.lines = lines;
            else
              badValue = true;
            break;
          case "regionanchor":
            const region = toCoords(value);
            if (region !== null) {
              this.b.regionAnchorX = region[0];
              this.b.regionAnchorY = region[1];
            } else
              badValue = true;
            break;
          case "viewportanchor":
            const viewport = toCoords(value);
            if (viewport !== null) {
              this.b.viewportAnchorX = viewport[0];
              this.b.viewportAnchorY = viewport[1];
            } else
              badValue = true;
            break;
          case "scroll":
            if (value === "up")
              this.b.scroll = "up";
            else
              badValue = true;
            break;
          default:
            this.e((_a3 = this.d) == null ? void 0 : _a3.t(name, value, line));
        }
        if (badValue) {
          this.e((_b2 = this.d) == null ? void 0 : _b2.u(name, value, line));
        }
      }
    }
  }
  /**
   * @see {@link https://www.w3.org/TR/webvtt1/#cue-timings-and-settings-parsing}
   */
  m(settings, line) {
    var _a3, _b2;
    let badValue;
    for (let i = 0; i < settings.length; i++) {
      badValue = false;
      if (SETTING_SEP_RE.test(settings[i])) {
        const [name, value] = settings[i].split(SETTING_SEP_RE);
        switch (name) {
          case "region":
            const region = this.h[value];
            if (region)
              this.a.region = region;
            break;
          case "vertical":
            if (value === "lr" || value === "rl") {
              this.a.vertical = value;
              this.a.region = null;
            } else
              badValue = true;
            break;
          case "line":
            const [linePos, lineAlign] = value.split(COMMA);
            if (linePos.includes(PERCENT_SIGN)) {
              const percentage = toPercentage(linePos);
              if (percentage !== null) {
                this.a.line = percentage;
                this.a.snapToLines = false;
              } else
                badValue = true;
            } else {
              const number = toFloat(linePos);
              if (number !== null)
                this.a.line = number;
              else
                badValue = true;
            }
            if (LINE_ALIGN_RE.test(lineAlign)) {
              this.a.lineAlign = lineAlign;
            } else if (lineAlign) {
              badValue = true;
            }
            if (this.a.line !== "auto")
              this.a.region = null;
            break;
          case "position":
            const [colPos, colAlign] = value.split(COMMA), position = toPercentage(colPos);
            if (position !== null)
              this.a.position = position;
            else
              badValue = true;
            if (colAlign && POS_ALIGN_RE.test(colAlign)) {
              this.a.positionAlign = colAlign;
            } else if (colAlign) {
              badValue = true;
            }
            break;
          case "size":
            const size = toPercentage(value);
            if (size !== null) {
              this.a.size = size;
              if (size < 100)
                this.a.region = null;
            } else {
              badValue = true;
            }
            break;
          case "align":
            if (ALIGN_RE.test(value)) {
              this.a.align = value;
            } else {
              badValue = true;
            }
            break;
          default:
            this.e((_a3 = this.d) == null ? void 0 : _a3.v(name, value, line));
        }
        if (badValue) {
          this.e((_b2 = this.d) == null ? void 0 : _b2.w(name, value, line));
        }
      }
    }
  }
  e(error) {
    var _a3, _b2;
    if (!error)
      return;
    this.k.push(error);
    if (this.f.strict) {
      this.f.cancel();
      throw error;
    } else {
      (_b2 = (_a3 = this.f).onError) == null ? void 0 : _b2.call(_a3, error);
    }
  }
}
function parseVTTTimestamp(timestamp) {
  const match = timestamp.match(TIMESTAMP_RE);
  if (!match)
    return null;
  const hours = match[1] ? parseInt(match[1], 10) : 0, minutes = parseInt(match[2], 10), seconds = parseInt(match[3], 10), milliseconds = match[4] ? parseInt(match[4].padEnd(3, "0"), 10) : 0, total = hours * 3600 + minutes * 60 + seconds + milliseconds / 1e3;
  if (hours < 0 || minutes < 0 || seconds < 0 || milliseconds < 0 || minutes > 59 || seconds > 59) {
    return null;
  }
  return total;
}
function createVTTParser() {
  return new VTTParser();
}
var vttParser = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  VTTBlock,
  VTTParser,
  default: createVTTParser,
  parseVTTTimestamp
});
const DIGIT_RE = /[0-9]/, MULTI_SPACE_RE = /[\s\t]+/, TAG_NAME = {
  c: "span",
  i: "i",
  b: "b",
  u: "u",
  ruby: "ruby",
  rt: "rt",
  v: "span",
  lang: "span",
  timestamp: "span"
}, HTML_ENTITIES = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
  "&lrm;": "‎",
  "&rlm;": "‏"
}, HTML_ENTITY_RE = /&(?:amp|lt|gt|quot|#(0+)?39|nbsp|lrm|rlm);/g, COLORS = /* @__PURE__ */ new Set([
  "white",
  "lime",
  "cyan",
  "red",
  "yellow",
  "magenta",
  "blue",
  "black"
]), BLOCK_TYPES = /* @__PURE__ */ new Set(Object.keys(TAG_NAME));
function tokenizeVTTCue(cue) {
  var _a3, _b2;
  let buffer = "", mode = 1, result = [], stack = [], node;
  for (let i = 0; i < cue.text.length; i++) {
    const char = cue.text[i];
    switch (mode) {
      case 1:
        if (char === "<") {
          addText();
          mode = 2;
        } else {
          buffer += char;
        }
        break;
      case 2:
        switch (char) {
          case "\n":
          case "	":
          case " ":
            addNode();
            mode = 4;
            break;
          case ".":
            addNode();
            mode = 3;
            break;
          case "/":
            mode = 5;
            break;
          case ">":
            addNode();
            mode = 1;
            break;
          default:
            if (!buffer && DIGIT_RE.test(char))
              mode = 6;
            buffer += char;
            break;
        }
        break;
      case 3:
        switch (char) {
          case "	":
          case " ":
          case "\n":
            addClass();
            if (node)
              (_a3 = node.class) == null ? void 0 : _a3.trim();
            mode = 4;
            break;
          case ".":
            addClass();
            break;
          case ">":
            addClass();
            if (node)
              (_b2 = node.class) == null ? void 0 : _b2.trim();
            mode = 1;
            break;
          default:
            buffer += char;
        }
        break;
      case 4:
        if (char === ">") {
          buffer = buffer.replace(MULTI_SPACE_RE, " ");
          if ((node == null ? void 0 : node.type) === "v")
            node.voice = replaceHTMLEntities(buffer);
          else if ((node == null ? void 0 : node.type) === "lang")
            node.lang = replaceHTMLEntities(buffer);
          buffer = "";
          mode = 1;
        } else {
          buffer += char;
        }
        break;
      case 5:
        if (char === ">") {
          buffer = "";
          node = stack.pop();
          mode = 1;
        }
        break;
      case 6:
        if (char === ">") {
          const time = parseVTTTimestamp(buffer);
          if (time !== null && time >= cue.startTime && time <= cue.endTime) {
            buffer = "timestamp";
            addNode();
            node.time = time;
          }
          buffer = "";
          mode = 1;
        } else {
          buffer += char;
        }
        break;
    }
  }
  function addNode() {
    if (BLOCK_TYPES.has(buffer)) {
      const parent = node;
      node = createBlockNode(buffer);
      if (parent) {
        if (stack[stack.length - 1] !== parent)
          stack.push(parent);
        parent.children.push(node);
      } else
        result.push(node);
    }
    buffer = "";
    mode = 1;
  }
  function addClass() {
    if (node && buffer) {
      const color = buffer.replace("bg_", "");
      if (COLORS.has(color)) {
        node[buffer.startsWith("bg_") ? "bgColor" : "color"] = color;
      } else {
        node.class = !node.class ? buffer : node.class + " " + buffer;
      }
    }
    buffer = "";
  }
  function addText() {
    if (!buffer)
      return;
    const text = { type: "text", data: replaceHTMLEntities(buffer) };
    node ? node.children.push(text) : result.push(text);
    buffer = "";
  }
  if (mode === 1)
    addText();
  return result;
}
function createBlockNode(type) {
  return {
    tagName: TAG_NAME[type],
    type,
    children: []
  };
}
function replaceHTMLEntities(text) {
  return text.replace(HTML_ENTITY_RE, (entity) => HTML_ENTITIES[entity] || "'");
}
function setCSSVar(el, name, value) {
  el.style.setProperty(`--${name}`, value + "");
}
function setDataAttr(el, name, value = true) {
  el.setAttribute(`data-${name}`, value === true ? "" : value + "");
}
function setPartAttr(el, name) {
  el.setAttribute("part", name);
}
function getLineHeight(el) {
  return parseFloat(getComputedStyle(el).lineHeight) || 0;
}
function createVTTCueTemplate(cue) {
  const template = document.createElement("template");
  template.innerHTML = renderVTTCueString(cue);
  return { cue, content: template.content };
}
function renderVTTCueString(cue, currentTime = 0) {
  return renderVTTTokensString(tokenizeVTTCue(cue), currentTime);
}
function renderVTTTokensString(tokens, currentTime = 0) {
  let attrs, result = "";
  for (const token of tokens) {
    if (token.type === "text") {
      result += token.data;
    } else {
      const isTimestamp = token.type === "timestamp";
      attrs = {};
      attrs.class = token.class;
      attrs.title = token.type === "v" && token.voice;
      attrs.lang = token.type === "lang" && token.lang;
      attrs["part"] = token.type === "v" && "voice";
      if (isTimestamp) {
        attrs["part"] = "timed";
        attrs["data-time"] = token.time;
        attrs["data-future"] = token.time > currentTime;
        attrs["data-past"] = token.time < currentTime;
      }
      attrs.style = `${token.color ? `color: ${token.color};` : ""}${token.bgColor ? `background-color: ${token.bgColor};` : ""}`;
      const attributes = Object.entries(attrs).filter((v) => v[1]).map((v) => `${v[0]}="${v[1] === true ? "" : v[1]}"`).join(" ");
      result += `<${token.tagName}${attributes ? " " + attributes : ""}>${renderVTTTokensString(
        token.children
      )}</${token.tagName}>`;
    }
  }
  return result;
}
function updateTimedVTTCueNodes(root2, currentTime) {
  for (const el of root2.querySelectorAll('[part="timed"]')) {
    const time = Number(el.getAttribute("data-time"));
    if (Number.isNaN(time))
      continue;
    if (time > currentTime)
      setDataAttr(el, "future");
    else
      el.removeAttribute("data-future");
    if (time < currentTime)
      setDataAttr(el, "past");
    else
      el.removeAttribute("data-past");
  }
}
function debounce(fn, delay) {
  let timeout = null, args;
  function run2() {
    clear();
    fn(...args);
    args = void 0;
  }
  function clear() {
    clearTimeout(timeout);
    timeout = null;
  }
  function debounce2() {
    args = [].slice.call(arguments);
    clear();
    timeout = setTimeout(run2, delay);
  }
  return debounce2;
}
const STARTING_BOX = Symbol(0);
function createBox(box) {
  if (box instanceof HTMLElement) {
    return {
      top: box.offsetTop,
      width: box.clientWidth,
      height: box.clientHeight,
      left: box.offsetLeft,
      right: box.offsetLeft + box.clientWidth,
      bottom: box.offsetTop + box.clientHeight
    };
  }
  return { ...box };
}
function moveBox(box, axis, delta) {
  switch (axis) {
    case "+x":
      box.left += delta;
      box.right += delta;
      break;
    case "-x":
      box.left -= delta;
      box.right -= delta;
      break;
    case "+y":
      box.top += delta;
      box.bottom += delta;
      break;
    case "-y":
      box.top -= delta;
      box.bottom -= delta;
      break;
  }
}
function isBoxCollision(a, b) {
  return a.left <= b.right && a.right >= b.left && a.top <= b.bottom && a.bottom >= b.top;
}
function isAnyBoxCollision(box, boxes) {
  for (let i = 0; i < boxes.length; i++)
    if (isBoxCollision(box, boxes[i]))
      return boxes[i];
  return null;
}
function isWithinBox(container, box) {
  return box.top >= 0 && box.bottom <= container.height && box.left >= 0 && box.right <= container.width;
}
function isBoxOutOfBounds(container, box, axis) {
  switch (axis) {
    case "+x":
      return box.left < 0;
    case "-x":
      return box.right > container.width;
    case "+y":
      return box.top < 0;
    case "-y":
      return box.bottom > container.height;
  }
}
function calcBoxIntersectPercentage(container, box) {
  const x = Math.max(0, Math.min(container.width, box.right) - Math.max(0, box.left)), y = Math.max(0, Math.min(container.height, box.bottom) - Math.max(0, box.top)), intersectArea = x * y;
  return intersectArea / (container.height * container.width);
}
function createCSSBox(container, box) {
  return {
    top: box.top / container.height,
    left: box.left / container.width,
    right: (container.width - box.right) / container.width,
    bottom: (container.height - box.bottom) / container.height
  };
}
function resolveRelativeBox(container, box) {
  box.top = box.top * container.height;
  box.left = box.left * container.width;
  box.right = container.width - box.right * container.width;
  box.bottom = container.height - box.bottom * container.height;
  return box;
}
const BOX_SIDES = ["top", "left", "right", "bottom"];
function setBoxCSSVars(el, container, box, prefix) {
  const cssBox = createCSSBox(container, box);
  for (const side of BOX_SIDES) {
    setCSSVar(el, `${prefix}-${side}`, cssBox[side] * 100 + "%");
  }
}
function avoidBoxCollisions(container, box, boxes, axis) {
  let percentage = 1, positionedBox, startBox = { ...box };
  for (let i = 0; i < axis.length; i++) {
    while (isBoxOutOfBounds(container, box, axis[i]) || isWithinBox(container, box) && isAnyBoxCollision(box, boxes)) {
      moveBox(box, axis[i], 1);
    }
    if (isWithinBox(container, box))
      return box;
    const intersection = calcBoxIntersectPercentage(container, box);
    if (percentage > intersection) {
      positionedBox = { ...box };
      percentage = intersection;
    }
    box = { ...startBox };
  }
  return positionedBox || startBox;
}
const POSITION_OVERRIDE = Symbol(0);
function positionCue(container, cue, displayEl, boxes) {
  let cueEl = displayEl.firstElementChild, line = computeCueLine(cue), displayBox, axis = [];
  if (!displayEl[STARTING_BOX]) {
    displayEl[STARTING_BOX] = createStartingBox(container, displayEl);
  }
  displayBox = resolveRelativeBox(container, { ...displayEl[STARTING_BOX] });
  if (displayEl[POSITION_OVERRIDE]) {
    axis = [displayEl[POSITION_OVERRIDE] === "top" ? "+y" : "-y", "+x", "-x"];
  } else if (cue.snapToLines) {
    let size;
    switch (cue.vertical) {
      case "":
        axis = ["+y", "-y"];
        size = "height";
        break;
      case "rl":
        axis = ["+x", "-x"];
        size = "width";
        break;
      case "lr":
        axis = ["-x", "+x"];
        size = "width";
        break;
    }
    let step = getLineHeight(cueEl), position = step * Math.round(line), maxPosition = container[size] + step, initialAxis = axis[0];
    if (Math.abs(position) > maxPosition) {
      position = position < 0 ? -1 : 1;
      position *= Math.ceil(maxPosition / step) * step;
    }
    if (line < 0) {
      position += cue.vertical === "" ? container.height : container.width;
      axis = axis.reverse();
    }
    moveBox(displayBox, initialAxis, position);
  } else {
    const isHorizontal = cue.vertical === "", posAxis = isHorizontal ? "+y" : "+x", size = isHorizontal ? displayBox.height : displayBox.width;
    moveBox(
      displayBox,
      posAxis,
      (isHorizontal ? container.height : container.width) * line / 100
    );
    moveBox(
      displayBox,
      posAxis,
      cue.lineAlign === "center" ? size / 2 : cue.lineAlign === "end" ? size : 0
    );
    axis = isHorizontal ? ["-y", "+y", "-x", "+x"] : ["-x", "+x", "-y", "+y"];
  }
  displayBox = avoidBoxCollisions(container, displayBox, boxes, axis);
  setBoxCSSVars(displayEl, container, displayBox, "cue");
  return displayBox;
}
function createStartingBox(container, cueEl) {
  const box = createBox(cueEl), pos = getStyledPositions(cueEl);
  cueEl[POSITION_OVERRIDE] = false;
  if (pos.top) {
    box.top = pos.top;
    box.bottom = pos.top + box.height;
    cueEl[POSITION_OVERRIDE] = "top";
  }
  if (pos.bottom) {
    const bottom = container.height - pos.bottom;
    box.top = bottom - box.height;
    box.bottom = bottom;
    cueEl[POSITION_OVERRIDE] = "bottom";
  }
  if (pos.left)
    box.left = pos.left;
  if (pos.right)
    box.right = container.width - pos.right;
  return createCSSBox(container, box);
}
function getStyledPositions(el) {
  const positions = {};
  for (const side of BOX_SIDES) {
    positions[side] = parseFloat(el.style.getPropertyValue(`--cue-${side}`));
  }
  return positions;
}
function computeCueLine(cue) {
  if (cue.line === "auto") {
    if (!cue.snapToLines) {
      return 100;
    } else {
      return -1;
    }
  }
  return cue.line;
}
function computeCuePosition(cue) {
  if (cue.position === "auto") {
    switch (cue.align) {
      case "start":
      case "left":
        return 0;
      case "right":
      case "end":
        return 100;
      default:
        return 50;
    }
  }
  return cue.position;
}
function computeCuePositionAlignment(cue, dir) {
  if (cue.positionAlign === "auto") {
    switch (cue.align) {
      case "start":
        return dir === "ltr" ? "line-left" : "line-right";
      case "end":
        return dir === "ltr" ? "line-right" : "line-left";
      case "center":
        return "center";
      default:
        return `line-${cue.align}`;
    }
  }
  return cue.positionAlign;
}
const REGION_AXIS = ["-y", "+y", "-x", "+x"];
function positionRegion(container, region, regionEl, boxes) {
  let cues = Array.from(regionEl.querySelectorAll('[part="cue-display"]')), height = 0, limit = Math.max(0, cues.length - region.lines);
  for (let i = cues.length - 1; i >= limit; i--) {
    height += cues[i].offsetHeight;
  }
  setCSSVar(regionEl, "region-height", height + "px");
  if (!regionEl[STARTING_BOX]) {
    regionEl[STARTING_BOX] = createCSSBox(container, createBox(regionEl));
  }
  let box = { ...regionEl[STARTING_BOX] };
  box = resolveRelativeBox(container, box);
  box.width = regionEl.clientWidth;
  box.height = height;
  box.right = box.left + box.width;
  box.bottom = box.top + height;
  box = avoidBoxCollisions(container, box, boxes, REGION_AXIS);
  setBoxCSSVars(regionEl, container, box, "region");
  return box;
}
class CaptionsRenderer {
  constructor(overlay, init) {
    __publicField(this, "overlay");
    __publicField(this, "z");
    __publicField(this, "A", 0);
    __publicField(this, "C", "ltr");
    __publicField(this, "B", []);
    __publicField(this, "D", false);
    __publicField(this, "E");
    __publicField(this, "h", /* @__PURE__ */ new Map());
    __publicField(this, "j", /* @__PURE__ */ new Map());
    __publicField(this, "K", debounce(() => {
      this.D = false;
      this.G();
      for (const el of this.h.values()) {
        el[STARTING_BOX] = null;
      }
      for (const el of this.j.values()) {
        if (el)
          el[STARTING_BOX] = null;
      }
      this.H(true);
    }, 50));
    this.overlay = overlay;
    this.dir = (init == null ? void 0 : init.dir) ?? "ltr";
    overlay.setAttribute("translate", "yes");
    overlay.setAttribute("aria-live", "off");
    overlay.setAttribute("aria-atomic", "true");
    setPartAttr(overlay, "captions");
    this.G();
    this.E = new ResizeObserver(this.I.bind(this));
    this.E.observe(overlay);
  }
  /* Text direction. */
  get dir() {
    return this.C;
  }
  set dir(dir) {
    this.C = dir;
    setDataAttr(this.overlay, "dir", dir);
  }
  get currentTime() {
    return this.A;
  }
  set currentTime(time) {
    this.A = time;
    this.update();
  }
  changeTrack({ regions, cues }) {
    this.reset();
    this.J(regions);
    for (const cue of cues)
      this.j.set(cue, null);
    this.update();
  }
  addCue(cue) {
    this.j.set(cue, null);
    this.update();
  }
  removeCue(cue) {
    this.j.delete(cue);
    this.update();
  }
  update(forceUpdate = false) {
    this.H(forceUpdate);
  }
  reset() {
    this.j.clear();
    this.h.clear();
    this.B = [];
    this.overlay.textContent = "";
  }
  destroy() {
    this.reset();
    this.E.disconnect();
  }
  I() {
    this.D = true;
    this.K();
  }
  G() {
    this.z = createBox(this.overlay);
    setCSSVar(this.overlay, "overlay-width", this.z.width + "px");
    setCSSVar(this.overlay, "overlay-height", this.z.height + "px");
  }
  H(forceUpdate = false) {
    if (!this.j.size || this.D)
      return;
    let cue, activeCues = [...this.j.keys()].filter((cue2) => this.A >= cue2.startTime && this.A <= cue2.endTime).sort(
      (cueA, cueB) => cueA.startTime !== cueB.startTime ? cueA.startTime - cueB.startTime : cueA.endTime - cueB.endTime
    ), activeRegions = activeCues.map((cue2) => cue2.region);
    for (let i = 0; i < this.B.length; i++) {
      cue = this.B[i];
      if (activeCues[i] === cue)
        continue;
      if (cue.region && !activeRegions.includes(cue.region)) {
        const regionEl = this.h.get(cue.region.id);
        if (regionEl) {
          regionEl.removeAttribute("data-active");
          forceUpdate = true;
        }
      }
      const cueEl = this.j.get(cue);
      if (cueEl) {
        cueEl.remove();
        forceUpdate = true;
      }
    }
    for (let i = 0; i < activeCues.length; i++) {
      cue = activeCues[i];
      let cueEl = this.j.get(cue);
      if (!cueEl)
        this.j.set(cue, cueEl = this.L(cue));
      const regionEl = this.F(cue) && this.h.get(cue.region.id);
      if (regionEl && !regionEl.hasAttribute("data-active")) {
        requestAnimationFrame(() => setDataAttr(regionEl, "active"));
        forceUpdate = true;
      }
      if (!cueEl.isConnected) {
        (regionEl || this.overlay).append(cueEl);
        forceUpdate = true;
      }
    }
    if (forceUpdate) {
      const boxes = [], seen = /* @__PURE__ */ new Set();
      for (let i = activeCues.length - 1; i >= 0; i--) {
        cue = activeCues[i];
        if (seen.has(cue.region || cue))
          continue;
        const isRegion = this.F(cue), el = isRegion ? this.h.get(cue.region.id) : this.j.get(cue);
        if (isRegion) {
          boxes.push(positionRegion(this.z, cue.region, el, boxes));
        } else {
          boxes.push(positionCue(this.z, cue, el, boxes));
        }
        seen.add(isRegion ? cue.region : cue);
      }
    }
    updateTimedVTTCueNodes(this.overlay, this.A);
    this.B = activeCues;
  }
  J(regions) {
    if (!regions)
      return;
    for (const region of regions) {
      const el = this.M(region);
      this.h.set(region.id, el);
      this.overlay.append(el);
    }
  }
  M(region) {
    const el = document.createElement("div");
    setPartAttr(el, "region");
    setDataAttr(el, "id", region.id);
    setDataAttr(el, "scroll", region.scroll);
    setCSSVar(el, "region-width", region.width + "%");
    setCSSVar(el, "region-anchor-x", region.regionAnchorX);
    setCSSVar(el, "region-anchor-y", region.regionAnchorY);
    setCSSVar(el, "region-viewport-anchor-x", region.viewportAnchorX);
    setCSSVar(el, "region-viewport-anchor-y", region.viewportAnchorY);
    setCSSVar(el, "region-lines", region.lines);
    return el;
  }
  L(cue) {
    var _a3;
    const display = document.createElement("div"), position = computeCuePosition(cue), positionAlignment = computeCuePositionAlignment(cue, this.C);
    setPartAttr(display, "cue-display");
    if (cue.vertical !== "")
      setDataAttr(display, "vertical");
    setCSSVar(display, "cue-text-align", cue.align);
    if (cue.style) {
      for (const prop2 of Object.keys(cue.style)) {
        display.style.setProperty(prop2, cue.style[prop2]);
      }
    }
    if (!this.F(cue)) {
      setCSSVar(
        display,
        "cue-writing-mode",
        cue.vertical === "" ? "horizontal-tb" : cue.vertical === "lr" ? "vertical-lr" : "vertical-rl"
      );
      if (!((_a3 = cue.style) == null ? void 0 : _a3["--cue-width"])) {
        let maxSize = position;
        if (positionAlignment === "line-left") {
          maxSize = 100 - position;
        } else if (positionAlignment === "center" && position <= 50) {
          maxSize = position * 2;
        } else if (positionAlignment === "center" && position > 50) {
          maxSize = (100 - position) * 2;
        }
        const size = cue.size < maxSize ? cue.size : maxSize;
        if (cue.vertical === "")
          setCSSVar(display, "cue-width", size + "%");
        else
          setCSSVar(display, "cue-height", size + "%");
      }
    } else {
      setCSSVar(
        display,
        "cue-offset",
        `${position - (positionAlignment === "line-right" ? 100 : positionAlignment === "center" ? 50 : 0)}%`
      );
    }
    const el = document.createElement("div");
    setPartAttr(el, "cue");
    if (cue.id)
      setDataAttr(el, "id", cue.id);
    el.innerHTML = renderVTTCueString(cue);
    display.append(el);
    return display;
  }
  F(cue) {
    return cue.region && cue.size === 100 && cue.vertical === "" && cue.line === "auto";
  }
}
function round(num, decimalPlaces = 2) {
  return Number(num.toFixed(decimalPlaces));
}
function getNumberOfDecimalPlaces(num) {
  var _a3;
  return ((_a3 = String(num).split(".")[1]) == null ? void 0 : _a3.length) ?? 0;
}
function clampNumber(min, value, max) {
  return Math.max(min, Math.min(max, value));
}
let $keyboard = signal(false);
{
  listenEvent(document, "pointerdown", () => {
    $keyboard.set(false);
  });
  listenEvent(document, "keydown", (e) => {
    if (e.metaKey || e.altKey || e.ctrlKey)
      return;
    $keyboard.set(true);
  });
}
class FocusVisibleController extends ComponentController {
  constructor() {
    super(...arguments);
    __publicField(this, "Ke", signal(false));
  }
  onConnect(el) {
    effect(() => {
      if (!$keyboard()) {
        this.Ke.set(false);
        updateFocusAttr(el, false);
        this.listen("pointerenter", this.Le.bind(this));
        this.listen("pointerleave", this.Me.bind(this));
        return;
      }
      const active = document.activeElement === el;
      this.Ke.set(active);
      updateFocusAttr(el, active);
      this.listen("focus", this.Ne.bind(this));
      this.listen("blur", this.Oe.bind(this));
    });
  }
  focused() {
    return this.Ke();
  }
  Ne() {
    this.Ke.set(true);
    updateFocusAttr(this.el, true);
  }
  Oe() {
    this.Ke.set(false);
    updateFocusAttr(this.el, false);
  }
  Le() {
    updateHoverAttr(this.el, true);
  }
  Me() {
    updateHoverAttr(this.el, false);
  }
}
function updateFocusAttr(el, isFocused) {
  setAttribute(el, "data-focus", isFocused);
  setAttribute(el, "data-hocus", isFocused);
}
function updateHoverAttr(el, isHovering) {
  setAttribute(el, "data-hocus", isHovering);
  setAttribute(el, "data-hover", isHovering);
}
const tooltipContext = createContext();
class Tooltip extends Component {
  onAttach(el) {
    if (hasProvidedContext(tooltipContext)) {
      scopedRaf(() => {
        if (!el.isConnected)
          return;
        const tooltip = useContext(tooltipContext);
        tooltip.bb(el);
      });
    }
    this.setAttributes({
      position: this.$props.position
    });
  }
}
__publicField(Tooltip, "el", defineElement({
  tagName: "media-tooltip",
  props: { position: "top center" }
}));
let id = 0;
class TooltipController extends ComponentController {
  constructor(instance) {
    super(instance);
    provideContext(tooltipContext, {
      bb: this.bb.bind(this)
    });
  }
  bb(tooltipEl) {
    const tooltipId = `media-tooltip-${++id}`;
    setAttribute(this.el, "aria-describedby", tooltipId);
    setAttribute(tooltipEl, "id", tooltipId);
    setAttribute(tooltipEl, "role", "tooltip");
    this.el.removeAttribute("aria-label");
  }
}
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key2, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key2) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key2, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$3(target, key2, result);
  return result;
};
const toggleButtonProps = {
  disabled: false,
  defaultPressed: false,
  defaultAppearance: false
};
class ToggleButton extends Component {
  constructor(instance) {
    super(instance);
    __publicField(this, "cb", signal(false));
    __publicField(this, "db");
    new FocusVisibleController(instance);
    new TooltipController(instance);
    if (this.db)
      new ARIAKeyShortcuts(instance, this.db);
  }
  get pressed() {
    return peek(this.cb);
  }
  onAttach(el) {
    if (isWriteSignal(this.cb)) {
      this.cb.set(this.$props.defaultPressed());
    }
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "button");
    const { disabled, defaultAppearance } = this.$props;
    this.setAttributes({
      disabled,
      "default-appearance": defaultAppearance,
      "data-pressed": this.cb,
      "aria-pressed": this.eb.bind(this),
      "data-media-button": true
    });
  }
  onConnect(el) {
    onPress(el, this.fb.bind(this));
  }
  eb() {
    return ariaBool$1(this.cb());
  }
  gb(event) {
    if (isWriteSignal(this.cb)) {
      this.cb.set((p) => !p);
    }
  }
  fb(event) {
    const disabled = this.$props.disabled();
    if (disabled) {
      if (disabled)
        event.stopImmediatePropagation();
      return;
    }
    event.preventDefault();
    this.gb(event);
  }
}
__publicField(ToggleButton, "el", defineElement({
  tagName: "media-toggle-button",
  props: toggleButtonProps
}));
__decorateClass$3([
  prop
], ToggleButton.prototype, "pressed", 1);
var Icon$56 = `<path d="M8.66667 6.66667C8.29848 6.66667 8 6.96514 8 7.33333V24.6667C8 25.0349 8.29848 25.3333 8.66667 25.3333H12.6667C13.0349 25.3333 13.3333 25.0349 13.3333 24.6667V7.33333C13.3333 6.96514 13.0349 6.66667 12.6667 6.66667H8.66667Z" fill="currentColor"/> <path d="M19.3333 6.66667C18.9651 6.66667 18.6667 6.96514 18.6667 7.33333V24.6667C18.6667 25.0349 18.9651 25.3333 19.3333 25.3333H23.3333C23.7015 25.3333 24 25.0349 24 24.6667V7.33333C24 6.96514 23.7015 6.66667 23.3333 6.66667H19.3333Z" fill="currentColor"/>`;
var Icon$59 = `<path d="M10.6667 6.6548C10.6667 6.10764 11.2894 5.79346 11.7295 6.11862L24.377 15.4634C24.7377 15.7298 24.7377 16.2692 24.3771 16.5357L11.7295 25.8813C11.2895 26.2065 10.6667 25.8923 10.6667 25.3451L10.6667 6.6548Z" fill="currentColor"/>`;
var Icon$71 = `<path d="M15.6038 12.2147C16.0439 12.5399 16.6667 12.2257 16.6667 11.6786V10.1789C16.6667 10.1001 16.7351 10.0384 16.8134 10.0479C20.1116 10.4494 22.6667 13.2593 22.6667 16.6659C22.6667 20.3481 19.6817 23.3332 15.9995 23.3332C12.542 23.3332 9.69927 20.7014 9.36509 17.332C9.32875 16.9655 9.03371 16.6662 8.66548 16.6662L6.66655 16.6666C6.29841 16.6666 5.99769 16.966 6.02187 17.3334C6.36494 22.5454 10.7012 26.6667 16 26.6667C21.5228 26.6667 26 22.1895 26 16.6667C26 11.4103 21.9444 7.10112 16.7916 6.69757C16.7216 6.69209 16.6667 6.63396 16.6667 6.56372V4.98824C16.6667 4.44106 16.0439 4.12689 15.6038 4.45206L11.0765 7.79738C10.7159 8.06387 10.7159 8.60326 11.0766 8.86973L15.6038 12.2147Z" fill="currentColor"/>`;
let PlayButton$1 = (_h = class extends ToggleButton {
  constructor() {
    super(...arguments);
    __publicField(this, "k");
    __publicField(this, "db", "togglePaused");
  }
  onAttach(el) {
    this.k = useMedia();
    this.cb = this.hb.bind(this);
    super.onAttach(el);
    setARIALabel(el, this.ib.bind(this));
    const { paused, ended } = this.k.$store;
    this.setAttributes({
      "data-paused": paused,
      "data-ended": ended
    });
  }
  gb(event) {
    const remote = this.k.remote;
    this.cb() ? remote.pause(event) : remote.play(event);
  }
  hb() {
    const { paused } = this.k.$store;
    return !paused();
  }
  ib() {
    const { paused } = this.k.$store;
    return paused() ? "Play" : "Pause";
  }
  render() {
    return [
      $$_create_component(Icon, { paths: Icon$59, slot: "play" }),
      $$_create_component(Icon, { paths: Icon$71, slot: "replay" }),
      $$_create_component(Icon, { paths: Icon$56, slot: "pause" })
    ];
  }
}, __publicField(_h, "el", defineElement({
  tagName: "media-play-button",
  props: toggleButtonProps
})), _h);
var Icon$24 = `<path d="M8 28.0003C8 27.6321 8.29848 27.3336 8.66667 27.3336H23.3333C23.7015 27.3336 24 27.6321 24 28.0003V29.3336C24 29.7018 23.7015 30.0003 23.3333 30.0003H8.66667C8.29848 30.0003 8 29.7018 8 29.3336V28.0003Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.66602 6.66699C4.29783 6.66699 3.99935 6.96547 3.99935 7.33366V24.667C3.99935 25.0352 4.29783 25.3337 4.66602 25.3337H27.3327C27.7009 25.3337 27.9994 25.0352 27.9994 24.667V7.33366C27.9994 6.96547 27.7009 6.66699 27.3327 6.66699H4.66602ZM8.66659 21.3333C8.2984 21.3333 7.99992 21.0349 7.99992 20.6667V11.3333C7.99992 10.9651 8.2984 10.6667 8.66659 10.6667H13.9999C14.3681 10.6667 14.6666 10.9651 14.6666 11.3333V12.6667C14.6666 13.0349 14.3681 13.3333 13.9999 13.3333H10.7999C10.7263 13.3333 10.6666 13.393 10.6666 13.4667V18.5333C10.6666 18.607 10.7263 18.6667 10.7999 18.6667H13.9999C14.3681 18.6667 14.6666 18.9651 14.6666 19.3333V20.6667C14.6666 21.0349 14.3681 21.3333 13.9999 21.3333H8.66659ZM17.9999 21.3333C17.6317 21.3333 17.3333 21.0349 17.3333 20.6667V11.3333C17.3333 10.9651 17.6317 10.6667 17.9999 10.6667H23.3333C23.7014 10.6667 23.9999 10.9651 23.9999 11.3333V12.6667C23.9999 13.0349 23.7014 13.3333 23.3333 13.3333H20.1333C20.0596 13.3333 19.9999 13.393 19.9999 13.4667V18.5333C19.9999 18.607 20.0596 18.6667 20.1333 18.6667H23.3333C23.7014 18.6667 23.9999 18.9651 23.9999 19.3333V20.6667C23.9999 21.0349 23.7014 21.3333 23.3333 21.3333H17.9999Z" fill="currentColor"/>`;
var Icon$25 = `<path fill-rule="evenodd" clip-rule="evenodd" d="M4.6661 6.66699C4.29791 6.66699 3.99943 6.96547 3.99943 7.33366V24.667C3.99943 25.0352 4.29791 25.3337 4.6661 25.3337H27.3328C27.701 25.3337 27.9994 25.0352 27.9994 24.667V7.33366C27.9994 6.96547 27.701 6.66699 27.3328 6.66699H4.6661ZM8.66667 21.3333C8.29848 21.3333 8 21.0349 8 20.6667V11.3333C8 10.9651 8.29848 10.6667 8.66667 10.6667H14C14.3682 10.6667 14.6667 10.9651 14.6667 11.3333V12.6667C14.6667 13.0349 14.3682 13.3333 14 13.3333H10.8C10.7264 13.3333 10.6667 13.393 10.6667 13.4667V18.5333C10.6667 18.607 10.7264 18.6667 10.8 18.6667H14C14.3682 18.6667 14.6667 18.9651 14.6667 19.3333V20.6667C14.6667 21.0349 14.3682 21.3333 14 21.3333H8.66667ZM18 21.3333C17.6318 21.3333 17.3333 21.0349 17.3333 20.6667V11.3333C17.3333 10.9651 17.6318 10.6667 18 10.6667H23.3333C23.7015 10.6667 24 10.9651 24 11.3333V12.6667C24 13.0349 23.7015 13.3333 23.3333 13.3333H20.1333C20.0597 13.3333 20 13.393 20 13.4667V18.5333C20 18.607 20.0597 18.6667 20.1333 18.6667H23.3333C23.7015 18.6667 24 18.9651 24 19.3333V20.6667C24 21.0349 23.7015 21.3333 23.3333 21.3333H18Z" fill="currentColor"/>`;
function ariaBool(value) {
  return value ? "true" : "false";
}
function $ariaBool(signal2) {
  return () => ariaBool(signal2());
}
let CaptionButton$1 = (_i = class extends ToggleButton {
  constructor() {
    super(...arguments);
    __publicField(this, "k");
    __publicField(this, "db", "toggleCaptions");
  }
  onAttach(el) {
    this.k = useMedia();
    this.cb = this.hb.bind(this);
    super.onAttach(el);
    setARIALabel(el, this.ib.bind(this));
    this.setAttributes({
      "aria-hidden": $ariaBool(this.jb.bind(this))
    });
  }
  gb(event) {
    this.k.remote.toggleCaptions(event);
  }
  hb() {
    const { textTrack } = this.k.$store, track = textTrack();
    return !!track && isTrackCaptionKind(track);
  }
  jb() {
    const { textTracks } = this.k.$store;
    return textTracks().filter(isTrackCaptionKind).length == 0;
  }
  ib() {
    const { textTrack } = this.k.$store;
    return textTrack() ? "Closed-Captions Off" : "Closed-Captions On";
  }
  render() {
    return [
      $$_create_component(Icon, { paths: Icon$24, slot: "on" }),
      $$_create_component(Icon, { paths: Icon$25, slot: "off" })
    ];
  }
}, __publicField(_i, "el", defineElement({
  tagName: "media-caption-button",
  props: toggleButtonProps
})), _i);
var Icon$37 = `<path d="M19.3334 13.3333C18.9652 13.3333 18.6667 13.0349 18.6667 12.6667L18.6667 7.33333C18.6667 6.96514 18.9652 6.66666 19.3334 6.66666H21.3334C21.7015 6.66666 22 6.96514 22 7.33333V9.86666C22 9.9403 22.0597 10 22.1334 10L24.6667 10C25.0349 10 25.3334 10.2985 25.3334 10.6667V12.6667C25.3334 13.0349 25.0349 13.3333 24.6667 13.3333L19.3334 13.3333Z" fill="currentColor"/> <path d="M13.3334 19.3333C13.3334 18.9651 13.0349 18.6667 12.6667 18.6667H7.33335C6.96516 18.6667 6.66669 18.9651 6.66669 19.3333V21.3333C6.66669 21.7015 6.96516 22 7.33335 22H9.86669C9.94032 22 10 22.0597 10 22.1333L10 24.6667C10 25.0349 10.2985 25.3333 10.6667 25.3333H12.6667C13.0349 25.3333 13.3334 25.0349 13.3334 24.6667L13.3334 19.3333Z" fill="currentColor"/> <path d="M18.6667 24.6667C18.6667 25.0349 18.9652 25.3333 19.3334 25.3333H21.3334C21.7015 25.3333 22 25.0349 22 24.6667V22.1333C22 22.0597 22.0597 22 22.1334 22H24.6667C25.0349 22 25.3334 21.7015 25.3334 21.3333V19.3333C25.3334 18.9651 25.0349 18.6667 24.6667 18.6667L19.3334 18.6667C18.9652 18.6667 18.6667 18.9651 18.6667 19.3333L18.6667 24.6667Z" fill="currentColor"/> <path d="M10.6667 13.3333H12.6667C13.0349 13.3333 13.3334 13.0349 13.3334 12.6667L13.3334 10.6667V7.33333C13.3334 6.96514 13.0349 6.66666 12.6667 6.66666H10.6667C10.2985 6.66666 10 6.96514 10 7.33333L10 9.86666C10 9.9403 9.94033 10 9.86669 10L7.33335 10C6.96516 10 6.66669 10.2985 6.66669 10.6667V12.6667C6.66669 13.0349 6.96516 13.3333 7.33335 13.3333L10.6667 13.3333Z" fill="currentColor"/>`;
var Icon$38 = `<path d="M25.3299 7.26517C25.2958 6.929 25.0119 6.66666 24.6667 6.66666H19.3334C18.9652 6.66666 18.6667 6.96514 18.6667 7.33333V9.33333C18.6667 9.70152 18.9652 10 19.3334 10L21.8667 10C21.9403 10 22 10.0597 22 10.1333V12.6667C22 13.0349 22.2985 13.3333 22.6667 13.3333H24.6667C25.0349 13.3333 25.3334 13.0349 25.3334 12.6667V7.33333C25.3334 7.31032 25.3322 7.28758 25.3299 7.26517Z" fill="currentColor"/> <path d="M22 21.8667C22 21.9403 21.9403 22 21.8667 22L19.3334 22C18.9652 22 18.6667 22.2985 18.6667 22.6667V24.6667C18.6667 25.0349 18.9652 25.3333 19.3334 25.3333L24.6667 25.3333C25.0349 25.3333 25.3334 25.0349 25.3334 24.6667V19.3333C25.3334 18.9651 25.0349 18.6667 24.6667 18.6667H22.6667C22.2985 18.6667 22 18.9651 22 19.3333V21.8667Z" fill="currentColor"/> <path d="M12.6667 22H10.1334C10.0597 22 10 21.9403 10 21.8667V19.3333C10 18.9651 9.70154 18.6667 9.33335 18.6667H7.33335C6.96516 18.6667 6.66669 18.9651 6.66669 19.3333V24.6667C6.66669 25.0349 6.96516 25.3333 7.33335 25.3333H12.6667C13.0349 25.3333 13.3334 25.0349 13.3334 24.6667V22.6667C13.3334 22.2985 13.0349 22 12.6667 22Z" fill="currentColor"/> <path d="M10 12.6667V10.1333C10 10.0597 10.0597 10 10.1334 10L12.6667 10C13.0349 10 13.3334 9.70152 13.3334 9.33333V7.33333C13.3334 6.96514 13.0349 6.66666 12.6667 6.66666H7.33335C6.96516 6.66666 6.66669 6.96514 6.66669 7.33333V12.6667C6.66669 13.0349 6.96516 13.3333 7.33335 13.3333H9.33335C9.70154 13.3333 10 13.0349 10 12.6667Z" fill="currentColor"/>`;
let FullscreenButton$1 = (_j = class extends ToggleButton {
  constructor() {
    super(...arguments);
    __publicField(this, "k");
    __publicField(this, "db", "toggleFullscreen");
  }
  onAttach(el) {
    this.k = useMedia();
    this.cb = this.hb.bind(this);
    super.onAttach(el);
    setARIALabel(el, this.ib.bind(this));
    const { fullscreen } = this.k.$store;
    this.setAttributes({
      "aria-hidden": $ariaBool(this.jb.bind(this)),
      "data-fullscreen": fullscreen
    });
  }
  gb(event) {
    const remote = this.k.remote, target = this.$props.target();
    this.cb() ? remote.exitFullscreen(target, event) : remote.enterFullscreen(target, event);
  }
  hb() {
    const { fullscreen } = this.k.$store;
    return fullscreen();
  }
  jb() {
    const { canFullscreen: canFullscreen2 } = this.k.$store;
    return !canFullscreen2();
  }
  ib() {
    const { fullscreen } = this.k.$store;
    return fullscreen() ? "Exit Fullscreen" : "Enter Fullscreen";
  }
  render() {
    return [
      $$_create_component(Icon, { paths: Icon$38, slot: "enter" }),
      $$_create_component(Icon, { paths: Icon$37, slot: "exit" })
    ];
  }
}, __publicField(_j, "el", defineElement({
  tagName: "media-fullscreen-button",
  props: {
    ...toggleButtonProps,
    target: "prefer-media"
  }
})), _j);
var Icon$52 = `<path d="M17.5091 24.6594C17.5091 25.2066 16.8864 25.5208 16.4463 25.1956L9.44847 20.0252C9.42553 20.0083 9.39776 19.9991 9.36923 19.9991H4.66667C4.29848 19.9991 4 19.7006 4 19.3325V12.6658C4 12.2976 4.29848 11.9991 4.66667 11.9991H9.37115C9.39967 11.9991 9.42745 11.99 9.45039 11.973L16.4463 6.8036C16.8863 6.47842 17.5091 6.79259 17.5091 7.33977L17.5091 24.6594Z" fill="currentColor"/> <path d="M28.8621 13.6422C29.1225 13.3818 29.1225 12.9597 28.8621 12.6994L27.9193 11.7566C27.659 11.4962 27.2368 11.4962 26.9765 11.7566L24.7134 14.0197C24.6613 14.0717 24.5769 14.0717 24.5248 14.0197L22.262 11.7568C22.0016 11.4964 21.5795 11.4964 21.3191 11.7568L20.3763 12.6996C20.116 12.9599 20.116 13.382 20.3763 13.6424L22.6392 15.9053C22.6913 15.9573 22.6913 16.0418 22.6392 16.0938L20.3768 18.3562C20.1165 18.6166 20.1165 19.0387 20.3768 19.299L21.3196 20.2419C21.58 20.5022 22.0021 20.5022 22.2624 20.2418L24.5248 17.9795C24.5769 17.9274 24.6613 17.9274 24.7134 17.9795L26.976 20.2421C27.2363 20.5024 27.6585 20.5024 27.9188 20.2421L28.8616 19.2992C29.122 19.0389 29.122 18.6168 28.8616 18.3564L26.599 16.0938C26.547 16.0418 26.547 15.9573 26.599 15.9053L28.8621 13.6422Z" fill="currentColor"/>`;
var Icon$101 = `<path d="M17.5091 24.6595C17.5091 25.2066 16.8864 25.5208 16.4463 25.1956L9.44847 20.0252C9.42553 20.0083 9.39776 19.9992 9.36923 19.9992H4.66667C4.29848 19.9992 4 19.7007 4 19.3325V12.6658C4 12.2976 4.29848 11.9992 4.66667 11.9992H9.37115C9.39967 11.9992 9.42745 11.99 9.45039 11.9731L16.4463 6.80363C16.8863 6.47845 17.5091 6.79262 17.5091 7.3398L17.5091 24.6595Z" fill="currentColor"/> <path d="M27.5091 9.33336C27.8773 9.33336 28.1758 9.63184 28.1758 10V22C28.1758 22.3682 27.8773 22.6667 27.5091 22.6667H26.1758C25.8076 22.6667 25.5091 22.3682 25.5091 22V10C25.5091 9.63184 25.8076 9.33336 26.1758 9.33336L27.5091 9.33336Z" fill="currentColor"/> <path d="M22.1758 12C22.544 12 22.8424 12.2985 22.8424 12.6667V19.3334C22.8424 19.7016 22.544 20 22.1758 20H20.8424C20.4743 20 20.1758 19.7016 20.1758 19.3334V12.6667C20.1758 12.2985 20.4743 12 20.8424 12H22.1758Z" fill="currentColor"/>`;
var Icon$102 = `<path d="M17.5091 24.6594C17.5091 25.2066 16.8864 25.5207 16.4463 25.1956L9.44847 20.0252C9.42553 20.0083 9.39776 19.9991 9.36923 19.9991H4.66667C4.29848 19.9991 4 19.7006 4 19.3324V12.6658C4 12.2976 4.29848 11.9991 4.66667 11.9991H9.37115C9.39967 11.9991 9.42745 11.99 9.45039 11.973L16.4463 6.80358C16.8863 6.4784 17.5091 6.79258 17.5091 7.33975L17.5091 24.6594Z" fill="currentColor"/> <path d="M22.8424 12.6667C22.8424 12.2985 22.544 12 22.1758 12H20.8424C20.4743 12 20.1758 12.2985 20.1758 12.6667V19.3333C20.1758 19.7015 20.4743 20 20.8424 20H22.1758C22.544 20 22.8424 19.7015 22.8424 19.3333V12.6667Z" fill="currentColor"/>`;
let MuteButton$1 = (_k = class extends ToggleButton {
  constructor() {
    super(...arguments);
    __publicField(this, "k");
    __publicField(this, "db", "toggleMuted");
  }
  onAttach(el) {
    this.k = useMedia();
    this.cb = this.hb.bind(this);
    setARIALabel(el, this.ib.bind(this));
    this.setAttributes({
      "data-muted": this.cb,
      "data-volume": this.kb.bind(this)
    });
    super.onAttach(el);
  }
  gb(event) {
    const remote = this.k.remote;
    this.cb() ? remote.unmute(event) : remote.mute(event);
  }
  hb() {
    const { muted, volume } = this.k.$store;
    return muted() || volume() === 0;
  }
  ib() {
    return this.cb() ? "Unmute" : "Mute";
  }
  kb() {
    const { muted, volume } = this.k.$store, $volume = volume();
    if (muted() || $volume === 0)
      return "muted";
    else if ($volume >= 0.5)
      return "high";
    else if ($volume < 0.5)
      return "low";
  }
  render() {
    return [
      $$_create_component(Icon, { paths: Icon$101, slot: "volume-high" }),
      $$_create_component(Icon, { paths: Icon$102, slot: "volume-low" }),
      $$_create_component(Icon, { paths: Icon$52, slot: "volume-muted" })
    ];
  }
}, __publicField(_k, "el", defineElement({
  tagName: "media-mute-button",
  props: toggleButtonProps
})), _k);
var Icon$57 = `<path d="M5.33334 26V19.4667C5.33334 19.393 5.39304 19.3333 5.46668 19.3333H7.86668C7.94031 19.3333 8.00001 19.393 8.00001 19.4667V23.3333C8.00001 23.7015 8.29849 24 8.66668 24H23.3333C23.7015 24 24 23.7015 24 23.3333V8.66666C24 8.29847 23.7015 7.99999 23.3333 7.99999H19.4667C19.393 7.99999 19.3333 7.9403 19.3333 7.86666V5.46666C19.3333 5.39302 19.393 5.33333 19.4667 5.33333H26C26.3682 5.33333 26.6667 5.63181 26.6667 5.99999V26C26.6667 26.3682 26.3682 26.6667 26 26.6667H6.00001C5.63182 26.6667 5.33334 26.3682 5.33334 26Z" fill="currentColor"/> <path d="M14.0098 8.42359H10.806C10.6872 8.42359 10.6277 8.56721 10.7117 8.6512L16.5491 14.4886C16.8094 14.7489 16.8094 15.171 16.5491 15.4314L15.3234 16.657C15.0631 16.9174 14.641 16.9174 14.3806 16.657L8.63739 10.9138C8.55339 10.8298 8.40978 10.8893 8.40978 11.0081V14.0236C8.40978 14.3918 8.1113 14.6903 7.74311 14.6903H6.00978C5.64159 14.6903 5.34311 14.3918 5.34311 14.0236L5.34311 6.02359C5.34311 5.6554 5.64159 5.35692 6.00978 5.35692L14.0098 5.35692C14.378 5.35692 14.6764 5.6554 14.6764 6.02359V7.75692C14.6764 8.12511 14.378 8.42359 14.0098 8.42359Z" fill="currentColor"/>`;
var Icon$58 = `<path d="M16 15.3333C15.6318 15.3333 15.3333 15.6318 15.3333 16V20C15.3333 20.3682 15.6318 20.6667 16 20.6667H21.3333C21.7015 20.6667 22 20.3682 22 20V16C22 15.6318 21.7015 15.3333 21.3333 15.3333H16Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.33333 7.33334C5.33333 6.96515 5.63181 6.66667 5.99999 6.66667H26C26.3682 6.66667 26.6667 6.96515 26.6667 7.33334V24.6667C26.6667 25.0349 26.3682 25.3333 26 25.3333H5.99999C5.63181 25.3333 5.33333 25.0349 5.33333 24.6667V7.33334ZM7.99999 10C7.99999 9.63182 8.29847 9.33334 8.66666 9.33334H23.3333C23.7015 9.33334 24 9.63182 24 10V22C24 22.3682 23.7015 22.6667 23.3333 22.6667H8.66666C8.29847 22.6667 7.99999 22.3682 7.99999 22V10Z" fill="currentColor"/>`;
class PIPButton extends ToggleButton {
  constructor() {
    super(...arguments);
    __publicField(this, "k");
    __publicField(this, "db", "togglePictureInPicture");
  }
  onAttach(el) {
    this.k = useMedia();
    this.cb = this.hb.bind(this);
    super.onAttach(el);
    setARIALabel(el, this.ib.bind(this));
    const { pictureInPicture } = this.k.$store;
    this.setAttributes({
      "aria-hidden": $ariaBool(this.jb.bind(this)),
      "data-pip": pictureInPicture
    });
  }
  gb(event) {
    const remote = this.k.remote;
    this.cb() ? remote.exitPictureInPicture(event) : remote.enterPictureInPicture(event);
  }
  hb() {
    const { pictureInPicture } = this.k.$store;
    return pictureInPicture();
  }
  jb() {
    const { canPictureInPicture } = this.k.$store;
    return !canPictureInPicture();
  }
  ib() {
    const { pictureInPicture } = this.k.$store;
    return pictureInPicture() ? "Exit Picture In Picture" : "Enter Picture In Picture";
  }
  render() {
    return [
      $$_create_component(Icon, { paths: Icon$58, slot: "enter" }),
      $$_create_component(Icon, { paths: Icon$57, slot: "exit" })
    ];
  }
}
__publicField(PIPButton, "el", defineElement({
  tagName: "media-pip-button",
  props: toggleButtonProps
}));
var Icon$77 = `<path d="M15.6038 12.2148C16.0439 12.5399 16.6667 12.2257 16.6667 11.6786V10.1789C16.6667 10.1001 16.7351 10.0384 16.8134 10.0479C20.1116 10.4494 22.6667 13.2593 22.6667 16.6659C22.6667 20.3481 19.6817 23.3332 15.9995 23.3332C12.542 23.3332 9.69927 20.7015 9.36509 17.332C9.32875 16.9655 9.03371 16.6662 8.66548 16.6662L6.66655 16.6666C6.29841 16.6666 5.99769 16.966 6.02187 17.3334C6.36494 22.5454 10.7012 26.6667 16 26.6667C21.5228 26.6667 26 22.1895 26 16.6667C26 11.4103 21.9444 7.10112 16.7916 6.69758C16.7216 6.69209 16.6667 6.63396 16.6667 6.56372V4.98824C16.6667 4.44106 16.0439 4.12689 15.6038 4.45207L11.0765 7.79738C10.7159 8.06387 10.7159 8.60327 11.0766 8.86974L15.6038 12.2148Z" fill="currentColor"/>`;
var Icon$81 = `<path d="M16.4167 12.2148C15.9766 12.5399 15.3538 12.2257 15.3538 11.6786V10.1789C15.3538 10.1001 15.2854 10.0384 15.2072 10.0479C11.9089 10.4494 9.35384 13.2593 9.35384 16.6659C9.35384 20.3481 12.3389 23.3332 16.0211 23.3332C19.4785 23.3332 22.3212 20.7015 22.6554 17.332C22.6918 16.9655 22.9868 16.6662 23.355 16.6662L25.354 16.6666C25.7221 16.6666 26.0228 16.966 25.9986 17.3334C25.6556 22.5454 21.3193 26.6667 16.0205 26.6667C10.4977 26.6667 6.02051 22.1895 6.02051 16.6667C6.02051 11.4103 10.0761 7.10112 15.2289 6.69758C15.2989 6.69209 15.3538 6.63396 15.3538 6.56372V4.98824C15.3538 4.44106 15.9766 4.12689 16.4167 4.45207L20.944 7.79738C21.3046 8.06387 21.3046 8.60327 20.9439 8.86974L16.4167 12.2148Z" fill="currentColor"/>`;
let SeekButton$1 = (_l = class extends Component {
  constructor(instance) {
    super(instance);
    __publicField(this, "k");
    this.k = useMedia();
    new FocusVisibleController(instance);
    new TooltipController(instance);
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "role", "button");
    setARIALabel(el, this.ib.bind(this));
    const { seconds, defaultAppearance } = this.$props;
    this.setAttributes({
      seconds,
      "default-appearance": defaultAppearance,
      "aria-hidden": $ariaBool(this.jb.bind(this)),
      "data-media-button": true
    });
  }
  onConnect(el) {
    onPress(el, this.gb.bind(this));
  }
  jb() {
    const { canSeek } = this.k.$store;
    return !canSeek();
  }
  ib() {
    const { seconds } = this.$props;
    return `Seek ${seconds() > 0 ? "forward" : "backward"} ${seconds()} seconds`;
  }
  gb(event) {
    const { seconds, disabled } = this.$props;
    if (disabled())
      return;
    const { currentTime } = this.k.$store, seekTo = currentTime() + seconds();
    this.k.remote.seek(seekTo, event);
  }
  render() {
    return [
      $$_create_component(Icon, { paths: Icon$77, slot: "backward" }),
      $$_create_component(Icon, { paths: Icon$81, slot: "forward" })
    ];
  }
}, __publicField(_l, "el", defineElement({
  tagName: "media-seek-button",
  props: {
    disabled: false,
    defaultAppearance: false,
    seconds: 30
  }
})), _l);
const SliderStoreFactory = new StoreFactory({
  min: 0,
  max: 100,
  value: 50,
  pointerValue: 0,
  focused: false,
  dragging: false,
  pointing: false,
  get interactive() {
    return this.dragging || this.focused || this.pointing;
  },
  get fillRate() {
    return calcRate(this.min, this.max, this.value);
  },
  get fillPercent() {
    return this.fillRate * 100;
  },
  get pointerRate() {
    return calcRate(this.min, this.max, this.pointerValue);
  },
  get pointerPercent() {
    return this.pointerRate * 100;
  }
});
function calcRate(min, max, value) {
  const range = max - min, offset = value - min;
  return range > 0 ? offset / range : 0;
}
const sliderProps = {
  min: 0,
  max: 100,
  disabled: false,
  value: 100,
  step: 1,
  keyStep: 1,
  shiftKeyMultiplier: 5,
  trackClass: null,
  trackFillClass: null,
  trackProgressClass: null,
  thumbContainerClass: null,
  thumbClass: null
};
function getClampedValue(min, max, value, step) {
  return clampNumber(min, round(value, getNumberOfDecimalPlaces(step)), max);
}
function getValueFromRate(min, max, rate, step) {
  const boundRate = clampNumber(0, rate, 1), range = max - min, fill = range * boundRate, stepRatio = fill / step, steps = step * stepRatio;
  return min + steps;
}
const SliderKeyDirection = {
  Left: -1,
  ArrowLeft: -1,
  Up: 1,
  ArrowUp: 1,
  Right: 1,
  ArrowRight: 1,
  Down: -1,
  ArrowDown: -1
};
class SliderEventsController extends ComponentController {
  constructor(instance, _delegate, _media) {
    super(instance);
    __publicField(this, "Id", null);
    __publicField(this, "lg", null);
    __publicField(this, "ng", null);
    __publicField(this, "mg", null);
    __publicField(this, "og", null);
    // -------------------------------------------------------------------------------------------
    // Keyboard Events
    // -------------------------------------------------------------------------------------------
    __publicField(this, "sg");
    __publicField(this, "Cg", functionThrottle(
      (event) => {
        this.kg(this.pg(event), event);
      },
      20,
      { leading: true }
    ));
    this.jg = _delegate;
    this.k = _media;
  }
  onConnect() {
    effect(this.vg.bind(this));
    effect(this.wg.bind(this));
    if (this.jg.tc) {
      scopedRaf(() => {
        var _a3;
        const outlet = (_a3 = this.k.player) == null ? void 0 : _a3.querySelector("media-outlet");
        if (outlet) {
          this.Id = outlet;
          listenEvent(outlet, "touchstart", this.xg.bind(this));
          listenEvent(outlet, "touchmove", this.yg.bind(this));
        }
      });
    }
  }
  xg(event) {
    this.lg = event.touches[0].clientX;
  }
  yg(event) {
    if (isNull(this.lg))
      return;
    event.preventDefault();
    if (this.$store.dragging())
      return;
    const diff = event.touches[0].clientX - this.lg;
    if (Math.abs(diff) > 20) {
      this.lg = event.touches[0].clientX;
      this.ng = this.$store.value();
      this.qg(this.ng, event);
    }
  }
  vg() {
    if (this.jg.mb())
      return;
    this.listen("focus", this.Ne.bind(this));
    this.listen("pointerenter", this.Le.bind(this));
    this.listen("pointermove", this.zg.bind(this));
    this.listen("pointerleave", this.Me.bind(this));
    this.listen("pointerdown", this.Ag.bind(this));
    this.listen("keydown", this.Za.bind(this));
    this.listen("keyup", this.Ya.bind(this));
  }
  wg() {
    if (this.jg.mb() || !this.$store.dragging())
      return;
    listenEvent(document, "pointerup", this.Bg.bind(this));
    listenEvent(document, "pointermove", this.Cg.bind(this));
    if (IS_SAFARI) {
      listenEvent(document, "touchmove", this.Dg.bind(this), {
        passive: false
      });
    }
  }
  Ne() {
    this.kg(this.$store.value());
  }
  rg(newValue, trigger) {
    const { value, min, max, dragging } = this.$store;
    const clampedValue = Math.max(min(), Math.min(newValue, max()));
    value.set(clampedValue);
    const event = this.createEvent("value-change", { detail: clampedValue, trigger });
    this.el.dispatchEvent(event);
    this.jg.Hb(event);
    if (dragging()) {
      const event2 = this.createEvent("drag-value-change", { detail: clampedValue, trigger });
      this.el.dispatchEvent(event2);
      this.jg.Kb(event2);
    }
  }
  kg(value, trigger) {
    var _a3;
    const { pointerValue, dragging } = this.$store;
    pointerValue.set(value);
    this.dispatch("pointer-value-change", { detail: value, trigger });
    if (dragging()) {
      const dir = this.jg.nb === "vertical" ? "bottom" : "left", size = this.jg.nb === "vertical" ? "height" : "width";
      if (this.og && !((_a3 = this.el) == null ? void 0 : _a3.hasAttribute("data-chapters"))) {
        this.og.style[size] = value + "%";
      }
      if (this.mg) {
        this.mg.style[dir] = value + "%";
      }
      this.rg(value, trigger);
    }
  }
  pg(event) {
    let thumbPositionRate, rect = this.el.getBoundingClientRect(), { min, max } = this.$store;
    if (this.jg.nb === "vertical") {
      const { bottom: trackBottom, height: trackHeight } = rect;
      thumbPositionRate = (trackBottom - event.clientY) / trackHeight;
    } else {
      if (this.lg && isNumber(this.ng)) {
        const { width } = this.Id.getBoundingClientRect(), rate = (event.clientX - this.lg) / width, range = max() - min(), diff = range * Math.abs(rate);
        thumbPositionRate = (rate < 0 ? this.ng - diff : this.ng + diff) / range;
      } else {
        const { left: trackLeft, width: trackWidth } = rect;
        thumbPositionRate = (event.clientX - trackLeft) / trackWidth;
      }
    }
    return Math.max(
      min(),
      Math.min(
        max(),
        this.jg.Gb(
          getValueFromRate(min(), max(), thumbPositionRate, this.jg.vb())
        )
      )
    );
  }
  Le(event) {
    this.$store.pointing.set(true);
  }
  zg(event) {
    const { dragging } = this.$store;
    if (dragging())
      return;
    this.kg(this.pg(event), event);
  }
  Me(event) {
    this.$store.pointing.set(false);
  }
  Ag(event) {
    if (event.button !== 0)
      return;
    const value = this.pg(event);
    this.qg(value, event);
    this.kg(value, event);
  }
  qg(value, trigger) {
    const { dragging } = this.$store;
    if (dragging())
      return;
    dragging.set(true);
    this.mg = this.el.querySelector(
      'shadow-root > div[part="thumb-container"]'
    );
    this.og = this.el.querySelector(
      'shadow-root > div[part~="track-fill"]'
    );
    this.k.remote.pauseUserIdle(trigger);
    const event = this.createEvent("drag-start", { detail: value, trigger });
    this.el.dispatchEvent(event);
    this.jg.Ib(event);
  }
  tg(value, trigger) {
    const { dragging } = this.$store;
    if (!dragging())
      return;
    dragging.set(false);
    if (this.og) {
      setStyle(this.og, "width", null);
      this.og = null;
    }
    if (this.mg) {
      setStyle(this.mg, "left", null);
      setStyle(this.mg, "bottom", null);
      this.mg = null;
    }
    this.k.remote.resumeUserIdle(trigger);
    const event = this.createEvent("drag-end", { detail: value, trigger });
    this.el.dispatchEvent(event);
    this.jg.Jb(event);
    this.lg = null;
    this.ng = null;
  }
  Za(event) {
    if (isDOMEvent(event)) {
      const trigger = event.trigger;
      if (isKeyboardEvent(trigger))
        event = trigger;
      else
        return;
    }
    const { key: key2 } = event;
    const { min, max } = this.$store;
    let newValue;
    if (key2 === "Home" || key2 === "PageUp") {
      newValue = min();
    } else if (key2 === "End" || key2 === "PageDown") {
      newValue = max();
    } else if (!event.metaKey && /[0-9]/.test(key2)) {
      newValue = (max() - min()) / 10 * Number(key2);
    }
    if (!isUndefined(newValue)) {
      this.kg(newValue, event);
      this.rg(newValue, event);
      return;
    }
    const value = this.ug(event);
    if (!value)
      return;
    const repeat = key2 === this.sg;
    if (!this.$store.dragging() && repeat)
      this.qg(value, event);
    this.kg(value, event);
    if (!repeat)
      this.rg(value, event);
    this.sg = key2;
  }
  Ya(event) {
    if (isDOMEvent(event)) {
      const trigger = event.trigger;
      if (isKeyboardEvent(trigger))
        event = trigger;
      else
        return;
    }
    this.sg = "";
    const { dragging, value } = this.$store;
    if (!dragging())
      return;
    const newValue = this.ug(event) ?? value();
    this.kg(newValue);
    this.tg(newValue, event);
  }
  ug(event) {
    const { key: key2, shiftKey } = event, isValidKey = Object.keys(SliderKeyDirection).includes(key2);
    if (!isValidKey)
      return;
    const { shiftKeyMultiplier } = this.$props;
    const { value } = this.$store, step = this.jg.vb(), keyStep = this.jg.Fb();
    const modifiedStep = !shiftKey ? keyStep : keyStep * shiftKeyMultiplier(), direction = Number(SliderKeyDirection[key2]), diff = modifiedStep * direction, steps = (value() + diff) / step;
    return Number((step * steps).toFixed(3));
  }
  // -------------------------------------------------------------------------------------------
  // Document (Pointer Events)
  // -------------------------------------------------------------------------------------------
  Bg(event) {
    if (event.button !== 0)
      return;
    const value = this.pg(event);
    this.kg(value, event);
    this.tg(value, event);
  }
  Dg(event) {
    event.preventDefault();
  }
}
const sliderValueFormatContext = createContext(() => ({}));
const $$_templ$h = /* @__PURE__ */ $$_create_template(`<!$><div part="track"></div>`), $$_templ_2$6 = /* @__PURE__ */ $$_create_template(`<!$><div part="track track-fill"></div>`), $$_templ_3$1 = /* @__PURE__ */ $$_create_template(`<!$><div part="track track-progress"></div>`), $$_templ_4$1 = /* @__PURE__ */ $$_create_template(`<!$><div part="thumb-container"><!$><div part="thumb"></div></div>`);
class Slider extends Component {
  constructor(instance) {
    super(instance);
    __publicField(this, "k");
    __publicField(this, "pb", false);
    __publicField(this, "nb", "");
    __publicField(this, "Db", animationFrameThrottle(
      (fillPercent, pointerPercent) => {
        var _a3, _b2;
        (_a3 = this.el) == null ? void 0 : _a3.style.setProperty("--slider-fill-percent", fillPercent + "%");
        (_b2 = this.el) == null ? void 0 : _b2.style.setProperty("--slider-pointer-percent", pointerPercent + "%");
      }
    ));
    // -------------------------------------------------------------------------------------------
    // Preview
    // -------------------------------------------------------------------------------------------
    __publicField(this, "lb", null);
    __publicField(this, "ob", animationFrameThrottle(() => {
      if (!this.lb)
        return;
      const rect = this.lb.getBoundingClientRect();
      setStyle(this.lb, "--computed-width", rect.width + "px");
      setStyle(this.lb, "--computed-height", rect.height + "px");
    }));
    provideContext(sliderValueFormatContext);
    this.k = useMedia();
    new SliderEventsController(instance, this, this.k);
    const focus = new FocusVisibleController(instance);
    this.$store.focused = focus.focused.bind(focus);
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "role", "slider");
    setAttributeIfEmpty(el, "tabindex", "0");
    setAttributeIfEmpty(el, "aria-orientation", "horizontal");
    setAttributeIfEmpty(el, "autocomplete", "off");
    this.nb = el.getAttribute("aria-orientation") || "";
    if (!this.pb) {
      effect(this.qb.bind(this));
      effect(this.rb.bind(this));
    }
    effect(this.sb.bind(this));
    this.tb();
  }
  onConnect(el) {
    this.ub();
  }
  render() {
    const { trackClass, trackFillClass, trackProgressClass, thumbContainerClass, thumbClass } = this.$props;
    return [
      (() => {
        const [$$_root, $$_walker] = $$_create_walker($$_templ$h);
        $$_effect(() => $$_attr($$_root, "class", trackClass()));
        return $$_root;
      })(),
      (() => {
        const [$$_root, $$_walker] = $$_create_walker($$_templ_2$6);
        $$_effect(() => $$_attr($$_root, "class", trackFillClass()));
        return $$_root;
      })(),
      (() => {
        const [$$_root, $$_walker] = $$_create_walker($$_templ_3$1);
        $$_effect(() => $$_attr($$_root, "class", trackProgressClass()));
        return $$_root;
      })(),
      (() => {
        const [$$_root, $$_walker] = $$_create_walker($$_templ_4$1), $$_el = $$_next_element($$_walker);
        $$_effect(() => $$_attr($$_root, "class", thumbContainerClass()));
        $$_effect(() => $$_attr($$_el, "class", thumbClass()));
        return $$_root;
      })()
    ];
  }
  // -------------------------------------------------------------------------------------------
  // Props
  // -------------------------------------------------------------------------------------------
  vb() {
    return this.$props.step();
  }
  Fb() {
    return this.$props.keyStep();
  }
  Gb(value) {
    return Math.round(value);
  }
  mb() {
    return this.$props.disabled();
  }
  // -------------------------------------------------------------------------------------------
  // Watch
  // -------------------------------------------------------------------------------------------
  qb() {
    const { min, max } = this.$props;
    this.$store.min.set(min());
    this.$store.max.set(max());
  }
  rb() {
    if (!this.mb())
      return;
    const { dragging, pointing } = this.$store;
    dragging.set(false);
    pointing.set(false);
  }
  sb() {
    const { dragging, value, min, max } = this.$store;
    if (peek(dragging))
      return;
    value.set(getClampedValue(min(), max(), value(), this.vb()));
  }
  // -------------------------------------------------------------------------------------------
  // ARIA
  // -------------------------------------------------------------------------------------------
  wb() {
    return ariaBool$1(this.mb());
  }
  xb() {
    return this.$props.min();
  }
  yb() {
    return this.$props.max();
  }
  zb() {
    const { value } = this.$store;
    return Math.round(value());
  }
  Ab() {
    const { value, max } = this.$store;
    return round(value() / max() * 100, 2) + "%";
  }
  // -------------------------------------------------------------------------------------------
  // Attributes
  // -------------------------------------------------------------------------------------------
  tb() {
    const { disabled } = this.$props, { dragging, interactive, pointing } = this.$store;
    this.setAttributes({
      disabled,
      "data-dragging": dragging,
      "data-pointing": pointing,
      "data-interactive": interactive,
      "aria-disabled": this.wb.bind(this),
      "aria-valuemin": this.xb.bind(this),
      "aria-valuemax": this.yb.bind(this),
      "aria-valuenow": this.zb.bind(this),
      "aria-valuetext": this.Ab.bind(this),
      "data-styled": this.Bb.bind(this),
      "data-media-slider": true
    });
    effect(this.Cb.bind(this));
  }
  Bb() {
    return !!this.$props.trackClass();
  }
  Cb() {
    const { fillPercent, pointerPercent } = this.$store;
    this.Db(round(fillPercent(), 3), round(pointerPercent(), 3));
  }
  ub() {
    this.lb = this.el.querySelector('[slot="preview"]');
    if (!this.lb)
      return;
    effect(this.Eb.bind(this));
    Promise.resolve().then(function() {
      return preview;
    }).then(({ setupPreviewStyles: setupPreviewStyles2 }) => {
      setupPreviewStyles2(this.lb, this.nb);
    });
  }
  Eb() {
    if (this.mb() || !this.lb)
      return;
    window.requestAnimationFrame(this.ob);
    const observer = new ResizeObserver(this.ob);
    observer.observe(this.lb);
    return () => observer.disconnect();
  }
  // -------------------------------------------------------------------------------------------
  // Events
  // -------------------------------------------------------------------------------------------
  Hb(event) {
  }
  Ib(event) {
  }
  Jb(event) {
  }
  Kb(event) {
  }
}
__publicField(Slider, "el", defineElement({
  tagName: "media-slider",
  props: sliderProps,
  store: SliderStoreFactory
}));
const $$_templ$g = /* @__PURE__ */ $$_create_template(`<!$><img part="img" loading="eager" decoding="async" aria-hidden="true" />`);
class Thumbnail extends Component {
  constructor(instance) {
    super(instance);
    __publicField(this, "k");
    __publicField(this, "ke", null);
    __publicField(this, "me", null);
    __publicField(this, "ne", []);
    __publicField(this, "Pb", signal(""));
    __publicField(this, "oe", signal(false));
    __publicField(this, "pe", signal(null));
    __publicField(this, "qe", animationFrameThrottle(this.ye.bind(this)));
    this.k = useMedia();
  }
  onAttach() {
    this.setAttributes({
      "data-loading": this.Tb.bind(this),
      "aria-hidden": $ariaBool(this.jb.bind(this))
    });
  }
  onConnect() {
    effect(this.ge.bind(this));
    effect(this.se.bind(this));
    effect(this.te.bind(this));
  }
  ge() {
    this.Pb();
    this.k.$store.thumbnails();
    this.oe.set(false);
  }
  ue() {
    this.oe.set(true);
    this.qe();
  }
  Tb() {
    return !this.jb() && !this.oe();
  }
  jb() {
    const { duration, thumbnailCues } = this.k.$store;
    return !Number.isFinite(duration()) || thumbnailCues().length === 0;
  }
  se() {
    const { time } = this.$props, { duration, thumbnailCues } = this.k.$store, _cues = thumbnailCues(), _time = time();
    if (!_cues || !Number.isFinite(duration())) {
      this.pe.set(null);
      return;
    }
    this.pe.set(findActiveCue(_time, _cues));
  }
  ve(el) {
    this.ke = el;
  }
  te() {
    const activeCue = this.pe(), thumbnails = peek(this.k.$store.thumbnails);
    if (!thumbnails || !activeCue) {
      this.Pb.set("");
      this.re();
      return;
    }
    const [_src, _coords = ""] = (activeCue.text || "").split("#");
    this.me = this.we(_coords);
    if (!this.me) {
      this.re();
      return;
    }
    this.Pb.set(this.xe(thumbnails, _src));
    this.qe();
  }
  xe(baseURL, src) {
    return !/https?:/.test(src) ? `${baseURL.split("/").slice(0, -1).join("/")}${src.replace(/^\/?/, "/")}`.replace(
      /^\/\//,
      "/"
    ) : src;
  }
  we(coords) {
    const [props, values] = coords.split("="), resolvedCoords = {}, coordValues = values == null ? void 0 : values.split(",");
    if (!props || !values)
      return null;
    for (let i = 0; i < props.length; i++)
      resolvedCoords[props[i]] = +coordValues[i];
    return resolvedCoords;
  }
  ye() {
    if (!this.ke || !this.me || !this.el)
      return;
    const { w, h, x, y } = this.me, { maxWidth, maxHeight, minWidth, minHeight } = getComputedStyle(this.el), minRatio = Math.max(parseInt(minWidth) / w, parseInt(minHeight) / h), maxRatio = Math.min(parseInt(maxWidth) / w, parseInt(maxHeight) / h), scale = maxRatio < 1 ? maxRatio : minRatio > 1 ? minRatio : 1;
    this.le(this.el, "--thumbnail-width", `${w * scale}px`);
    this.le(this.el, "--thumbnail-height", `${h * scale}px`);
    this.le(this.ke, "width", `${this.ke.naturalWidth * scale}px`);
    this.le(this.ke, "height", `${this.ke.naturalHeight * scale}px`);
    this.le(this.ke, "transform", `translate(-${x * scale}px, -${y * scale}px)`);
  }
  le(el, name, value) {
    el.style.setProperty(name, value);
    this.ne.push(() => el.style.removeProperty(name));
  }
  re() {
    for (const reset of this.ne)
      reset();
    this.ne = [];
  }
  render() {
    const { crossorigin } = this.k.$store;
    return (() => {
      const [$$_root, $$_walker] = $$_create_walker($$_templ$g);
      $$_effect(() => $$_attr($$_root, "src", this.Pb()));
      $$_effect(() => $$_attr($$_root, "crossorigin", crossorigin()));
      $$_listen($$_root, "load", this.ue.bind(this));
      $$_ref($$_root, this.ve.bind(this));
      return $$_root;
    })();
  }
}
__publicField(Thumbnail, "el", defineElement({
  tagName: "media-thumbnail",
  props: { time: 0 }
}));
const $$_templ$f = /* @__PURE__ */ $$_create_template(`<!$><media-thumbnail part="thumbnail" mk-d></media-thumbnail>`);
class SliderThumbnail extends Component {
  constructor(instance) {
    super(instance);
    __publicField(this, "k");
    __publicField(this, "Lb");
    this.k = useMedia();
    this.Lb = useStore(SliderStoreFactory);
  }
  Mb() {
    const { duration } = this.k.$store;
    return this.Lb.pointerRate() * duration();
  }
  render() {
    const time = this.Mb.bind(this);
    return (() => {
      const [$$_root, $$_walker] = $$_create_walker($$_templ$f);
      $$_effect(() => $$_attr($$_root, "time", time()));
      $$_setup_custom_element($$_root);
      return $$_root;
    })();
  }
}
__publicField(SliderThumbnail, "el", defineElement({
  tagName: "media-slider-thumbnail"
}));
__publicField(SliderThumbnail, "register", [Thumbnail]);
const $$_templ$e = /* @__PURE__ */ $$_create_template(`<!$><video muted="" playsinline="" preload="auto" part="video" style="max-width: unset"></video>`);
class SliderVideo extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "k");
    __publicField(this, "Lb");
    __publicField(this, "aa", null);
    __publicField(this, "Nb", signal(false));
    __publicField(this, "Ob", signal(false));
    __publicField(this, "Pb");
    __publicField(this, "Qb");
  }
  onAttach() {
    this.k = useMedia();
    this.Lb = useStore(SliderStoreFactory);
    this.Pb = computed(this.Sb.bind(this));
    this.Qb = computed(this.jb.bind(this));
    this.setAttributes({
      "data-loading": this.Tb.bind(this),
      "aria-hidden": $ariaBool(this.Qb)
    });
    effect(this.Ub.bind(this));
    effect(this.Vb.bind(this));
  }
  onConnect() {
    if (this.aa.readyState >= 2)
      this.Rb();
  }
  render() {
    const { crossorigin } = this.k.$store;
    return (() => {
      const [$$_root, $$_walker] = $$_create_walker($$_templ$e);
      $$_effect(() => $$_attr($$_root, "src", this.Pb()));
      $$_effect(() => $$_attr($$_root, "crossorigin", crossorigin()));
      $$_listen($$_root, "canplay", this.Rb.bind(this));
      $$_listen($$_root, "error", this.Wb.bind(this));
      $$_ref($$_root, this.Xb.bind(this));
      return $$_root;
    })();
  }
  Sb() {
    const { canLoad } = this.k.$store;
    return canLoad() ? this.$props.src() : null;
  }
  Tb() {
    return !this.Nb() && !this.Qb();
  }
  jb() {
    const { duration } = this.k.$store;
    return !!this.Ob() || !this.Nb() || !Number.isFinite(duration());
  }
  Ub() {
    this.Pb();
    this.Nb.set(false);
    this.Ob.set(false);
  }
  Rb(event) {
    this.Nb.set(true);
    this.dispatch("can-play", { trigger: event });
  }
  Wb(event) {
    this.Ob.set(true);
    this.dispatch("error", { trigger: event });
  }
  Vb() {
    const { duration } = this.k.$store;
    const { pointerRate } = this.Lb;
    if (this.Nb() && this.aa && Number.isFinite(duration()) && Number.isFinite(pointerRate())) {
      this.aa.currentTime = pointerRate() * duration();
    }
  }
  Xb(el) {
    this.aa = el;
  }
}
__publicField(SliderVideo, "el", defineElement({
  tagName: "media-slider-video",
  props: { src: void 0 }
}));
function padNumberWithZeroes(num, expectedLength) {
  const str = String(num);
  const actualLength = str.length;
  const shouldPad = actualLength < expectedLength;
  if (shouldPad) {
    const padLength = expectedLength - actualLength;
    const padding = `0`.repeat(padLength);
    return `${padding}${num}`;
  }
  return str;
}
function parseTime(duration) {
  const hours = Math.trunc(duration / 3600);
  const minutes = Math.trunc(duration % 3600 / 60);
  const seconds = Math.trunc(duration % 60);
  const fraction = Number((duration - Math.trunc(duration)).toPrecision(3));
  return {
    hours,
    minutes,
    seconds,
    fraction
  };
}
function formatTime(duration, shouldPadHours = false, shouldPadMinutes = false, shouldAlwaysShowHours = false) {
  const { hours, minutes, seconds } = parseTime(duration);
  const paddedHours = shouldPadHours ? padNumberWithZeroes(hours, 2) : hours;
  const paddedMinutes = shouldPadMinutes ? padNumberWithZeroes(minutes, 2) : minutes;
  const paddedSeconds = padNumberWithZeroes(seconds, 2);
  if (hours > 0 || shouldAlwaysShowHours) {
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  }
  return `${paddedMinutes}:${paddedSeconds}`;
}
function formatSpokenTime(duration) {
  const spokenParts = [];
  const { hours, minutes, seconds } = parseTime(duration);
  if (hours > 0) {
    spokenParts.push(`${hours} hour`);
  }
  if (minutes > 0) {
    spokenParts.push(`${minutes} min`);
  }
  if (seconds > 0 || spokenParts.length === 0) {
    spokenParts.push(`${seconds} sec`);
  }
  return spokenParts.join(" ");
}
const $$_templ$d = /* @__PURE__ */ $$_create_template(`<!$><span><!$></span>`);
class SliderValue extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "Yb");
    __publicField(this, "Zb");
    __publicField(this, "Lb");
  }
  onAttach() {
    this.Lb = useStore(SliderStoreFactory);
    this.Yb = useContext(sliderValueFormatContext);
    this.Zb = computed(this._b.bind(this));
  }
  _b() {
    var _a3, _b2;
    const { type, format, decimalPlaces, padHours, padMinutes, showHours } = this.$props;
    const { value: sliderValue, pointerValue, min, max } = this.Lb;
    const value = type() === "current" ? sliderValue() : pointerValue();
    if (format() === "percent") {
      const range = max() - min();
      const percent = value / range * 100;
      return (this.Yb.percent ?? round)(percent, decimalPlaces()) + "﹪";
    } else if (format() === "time") {
      return (this.Yb.time ?? formatTime)(value, padHours(), padMinutes(), showHours());
    } else {
      return ((_b2 = (_a3 = this.Yb).value) == null ? void 0 : _b2.call(_a3, value)) ?? value.toFixed(2);
    }
  }
  render() {
    return (() => {
      const [$$_root, $$_walker] = $$_create_walker($$_templ$d), $$_expr = $$_walker.nextNode();
      $$_insert_at_marker_lite($$_expr, this.Zb);
      return $$_root;
    })();
  }
}
__publicField(SliderValue, "el", defineElement({
  tagName: "media-slider-value",
  props: {
    type: "current",
    format: void 0,
    showHours: false,
    padHours: false,
    padMinutes: false,
    decimalPlaces: 2
  }
}));
let VolumeSlider$1 = (_m = class extends Slider {
  constructor() {
    super(...arguments);
    __publicField(this, "pb", true);
    __publicField(this, "$b", functionThrottle(this.ac.bind(this), 25));
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "aria-label", "Media volume");
    super.onAttach(el);
    {
      canChangeVolume().then((canSet) => {
        if (!canSet)
          setAttribute(el, "aria-hidden", "true");
      });
    }
    effect(this.y.bind(this));
  }
  y() {
    const { muted, volume } = this.k.$store;
    const newValue = muted() ? 0 : volume() * 100;
    this.$store.value.set(newValue);
    this.dispatch("value-change", { detail: newValue });
  }
  ac(event) {
    if (!event.trigger)
      return;
    const mediaVolume = round(event.detail / 100, 3);
    this.k.remote.changeVolume(mediaVolume, event);
  }
  Hb(event) {
    this.$b(event);
  }
  Kb(event) {
    this.$b(event);
  }
  xb() {
    return 0;
  }
  yb() {
    return 100;
  }
}, __publicField(_m, "el", defineElement({
  tagName: "media-volume-slider",
  props: {
    ...sliderProps,
    min: defineProp({ value: 0, attribute: false }),
    max: defineProp({ value: 100, attribute: false }),
    value: defineProp({ value: 100, attribute: false })
  },
  store: SliderStoreFactory
})), _m);
class ClassManager {
  constructor(el) {
    __publicField(this, "Fg");
    __publicField(this, "Gg");
    __publicField(this, "Eg", /* @__PURE__ */ new Map());
    __publicField(this, "Hg", signal([]));
    __publicField(this, "uc", animationFrameThrottle(this.Z.bind(this)));
    this.Fg = el.firstChild;
    this.Gg = new MutationObserver(this.V.bind(this));
    this.Gg.observe(this.Fg, { subtree: true, childList: true });
    effect(this.Ig.bind(this));
    onDispose(this.Jg.bind(this));
  }
  V(records) {
    const selector = Array.from(this.Eg.keys()).join(",");
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (isDOMElement(node) && node.matches(selector))
          this.uc();
      }
    }
  }
  dc(selector, $class) {
    this.Eg.set(selector, $class);
    this.Hg.set((c) => [...c, $class]);
    return this;
  }
  Z() {
    for (const [selector, classes] of this.Eg) {
      const _class = peek(classes);
      for (const el of this.Fg.querySelectorAll(selector)) {
        setAttribute(el, "class", _class);
      }
    }
  }
  Ig() {
    for (const c of this.Hg())
      c();
    this.uc();
  }
  Jg() {
    this.Hg.set([]);
    this.Eg.clear();
    this.Gg.disconnect();
  }
}
const $$_templ$c = /* @__PURE__ */ $$_create_template(`<div part="chapters"></div>`), $$_templ_2$5 = /* @__PURE__ */ $$_create_template(`<div part="chapter-container"><div part="chapter"><div part="track"></div><div part="track track-fill" style="width: 0%"></div><div part="track track-progress" style="width: 0%"></div></div></div>`);
class SliderChaptersRenderer {
  constructor(_media, _slider, _onChange) {
    __publicField(this, "Kg", []);
    __publicField(this, "Mg", []);
    __publicField(this, "Lg", 0);
    __publicField(this, "Ng", 0);
    __publicField(this, "$g", animationFrameThrottle((bufferedPercent) => {
      let width;
      for (let i = this.Ng; i < this.Mg.length; i++) {
        width = this.Og(this.Kg[i], bufferedPercent);
        this.Zg(this.Mg[i]).style.width = width + "%";
        if (width < 100) {
          this.Ng = i;
          break;
        }
      }
    }));
    __publicField(this, "ah", computed(this.bh.bind(this)));
    this.k = _media;
    this.Lb = _slider;
    this.Hc = _onChange;
  }
  render(cues, $class) {
    return (cues == null ? void 0 : cues.length) ? $$_peek(
      () => (() => {
        const $$_root = $$_clone($$_templ$c);
        $$_effect(() => $$_attr($$_root, "class", $class()));
        $$_insert_lite($$_root, () => this.Sg(cues));
        return $$_root;
      })()
    ) : null;
  }
  Sg(cues) {
    this.Kg = this.Tg(cues);
    const firstChapter = this.Kg[0];
    this.Hc(firstChapter.startTime === 0 ? firstChapter.text : "");
    for (let i = 0; i < this.Kg.length; i++)
      this.Mg.push(this.Ug());
    this.Vg();
    effect(this.Wg.bind(this));
    effect(this.Xg.bind(this));
    effect(this.Yg.bind(this));
    onDispose(() => {
      this.Mg = [];
      this.Lg = 0;
      this.Ng = 0;
    });
    return this.Mg;
  }
  Ug() {
    return $$_clone($$_templ_2$5);
  }
  Pg(container) {
    return container.firstChild.firstChild.nextSibling;
  }
  Zg(container) {
    return container.firstChild.lastChild;
  }
  _g() {
    return this.Kg[this.Kg.length - 1].endTime;
  }
  Vg() {
    let cue, endTime = this._g();
    for (let i = 0; i < this.Kg.length; i++) {
      cue = this.Kg[i];
      this.Mg[i].style.width = round((cue.endTime - cue.startTime) / endTime * 100, 3) + "%";
    }
  }
  Wg() {
    let { fillPercent, value, pointing } = this.Lb, currentChapter = this.Kg[this.Lg], activeIndex = this.Qg(
      currentChapter.startTime <= peek(value) ? this.Lg : 0,
      fillPercent()
    );
    if (activeIndex > this.Lg) {
      this.Rg(this.Lg, activeIndex, "100%");
    } else if (activeIndex < this.Lg) {
      this.Rg(activeIndex + 1, this.Lg + 1, "0%");
    }
    if (!peek(pointing) && this.Lg !== activeIndex) {
      this.Hc(this.Kg[activeIndex].text);
    }
    let trackFill = this.Pg(this.Mg[activeIndex]), percent = this.Og(this.Kg[activeIndex], fillPercent()) + "%";
    if (trackFill.style.width !== percent)
      trackFill.style.width = percent;
    this.Lg = activeIndex;
  }
  Xg() {
    let { pointing, pointerPercent } = this.Lb;
    if (!pointing())
      return;
    const activeIndex = this.Qg(0, pointerPercent());
    this.Hc(this.Kg[activeIndex].text);
  }
  Rg(start, end, width) {
    for (let i = start; i < end; i++)
      this.Pg(this.Mg[i]).style.width = width;
  }
  Qg(startIndex, percent) {
    let chapterPercent = 0;
    for (let i = startIndex; i < this.Kg.length; i++) {
      chapterPercent = this.Og(this.Kg[i], percent);
      if (chapterPercent >= 0 && chapterPercent < 100)
        return i;
    }
    return 0;
  }
  Yg() {
    this.$g(this.ah());
  }
  bh() {
    const { bufferedEnd, duration } = this.k;
    return round(Math.min(bufferedEnd() / Math.max(duration(), 1), 1), 3) * 100;
  }
  Og(cue, percent) {
    const lastChapter = this.Kg[this.Kg.length - 1], startPercent = cue.startTime / lastChapter.endTime * 100, endPercent = cue.endTime / lastChapter.endTime * 100;
    return Math.max(
      0,
      round(
        percent >= endPercent ? 100 : (percent - startPercent) / (endPercent - startPercent) * 100,
        3
      )
    );
  }
  Tg(cues) {
    const chapters = [];
    for (let i = 0; i < cues.length - 1; i++) {
      const currentCue = cues[i], nextCue = cues[i + 1];
      chapters.push(currentCue);
      if (nextCue) {
        const timeDiff = nextCue.startTime - currentCue.endTime;
        if (timeDiff > 0) {
          chapters.push(new window.VTTCue(currentCue.endTime, currentCue.endTime + timeDiff, ""));
        }
      }
    }
    chapters.push(cues[cues.length - 1]);
    return chapters;
  }
}
let TimeSlider$1 = (_n = class extends Slider {
  constructor(instance) {
    super(instance);
    __publicField(this, "pb", true);
    __publicField(this, "tc", true);
    __publicField(this, "ec");
    __publicField(this, "ya", signal(null));
    __publicField(this, "gc");
    __publicField(this, "hc");
    __publicField(this, "fc", false);
    // -------------------------------------------------------------------------------------------
    // Chapters
    // -------------------------------------------------------------------------------------------
    __publicField(this, "cc", null);
    __publicField(this, "ic", signal(""));
    provideContext(sliderValueFormatContext, {
      value: this.jc.bind(this),
      time: this.kc.bind(this)
    });
  }
  onAttach(el) {
    setAttributeIfEmpty(el, "aria-label", "Media time");
    super.onAttach(el);
    this.gc = new SliderChaptersRenderer(
      this.k.$store,
      this.$store,
      this.ic.set
    );
    this.setAttributes({
      "data-chapters": this.lc.bind(this)
    });
    this.setStyles({
      "--media-buffered-percent": this.mc.bind(this)
    });
    effect(this.z.bind(this));
    effect(this.nc.bind(this));
    effect(this.oc.bind(this));
    scopedRaf(() => {
      effect(this.pc.bind(this));
    });
  }
  mc() {
    const { bufferedEnd, duration } = this.k.$store;
    return round(Math.min(bufferedEnd() / Math.max(duration(), 1), 1) * 100, 3) + "%";
  }
  lc() {
    var _a3, _b2;
    const { duration } = this.k.$store;
    (_a3 = this.hc) == null ? void 0 : _a3.uc();
    return ((_b2 = this.ya()) == null ? void 0 : _b2.cues.length) && Number.isFinite(duration()) && duration() > 0;
  }
  onConnect(el) {
    super.onConnect(el);
    this.Ra();
    listenEvent(this.k.textTracks, "mode-change", this.Ra.bind(this));
    const { chapterContainerClass, chapterClass, trackClass, trackFillClass, trackProgressClass } = this.$props;
    this.hc = new ClassManager(el).dc('[part="chapter-container"]', chapterContainerClass).dc('[part="chapter"]', chapterClass).dc('[part="track"]', trackClass).dc('[part~="track-fill"]', trackFillClass).dc('[part~="track-progress"]', trackProgressClass);
  }
  render() {
    const tracks = super.render(), { chaptersClass } = this.$props;
    return [$$_computed(() => {
      var _a3;
      return this.gc.render((_a3 = this.ya()) == null ? void 0 : _a3.cues, chaptersClass);
    }), tracks];
  }
  nc() {
    this.ec = functionThrottle(
      this.$a.bind(this),
      this.$props.seekingRequestThrottle()
    );
  }
  z() {
    const { currentTime } = this.k.$store, { value, dragging } = this.$store, newValue = this.qc(currentTime());
    if (!peek(dragging)) {
      value.set(newValue);
      this.dispatch("value-change", { detail: newValue });
    }
  }
  pc() {
    const player = this.k.player;
    player && this.lb && setAttribute(player, "data-preview", this.$store.interactive());
  }
  $a(time, event) {
    this.k.remote.seeking(time, event);
  }
  rc(time, percent, event) {
    this.ec.cancel();
    const { live } = this.k.$store;
    if (live() && percent >= 99) {
      this.k.remote.seekToLiveEdge(event);
      return;
    }
    this.k.remote.seek(time, event);
  }
  Ib(event) {
    const { pauseWhileDragging } = this.$props;
    if (pauseWhileDragging()) {
      const { paused } = this.k.$store;
      this.fc = !paused();
      this.k.remote.pause(event);
    }
  }
  Kb(event) {
    this.ec(this.bc(event.detail), event);
  }
  Jb(event) {
    const percent = event.detail;
    this.rc(this.bc(percent), percent, event);
    const { pauseWhileDragging } = this.$props;
    if (pauseWhileDragging() && this.fc) {
      this.k.remote.play(event);
      this.fc = false;
    }
  }
  Hb(event) {
    const { dragging } = this.$store;
    if (dragging() || !event.trigger)
      return;
    this.Jb(event);
  }
  // -------------------------------------------------------------------------------------------
  // Props
  // -------------------------------------------------------------------------------------------
  vb() {
    const value = this.$props.step() / this.k.$store.duration() * 100;
    return Number.isFinite(value) ? value : 1;
  }
  Fb() {
    const value = this.$props.keyStep() / this.k.$store.duration() * 100;
    return Number.isFinite(value) ? value : 1;
  }
  Gb(value) {
    return round(value, 3);
  }
  mb() {
    const { canSeek } = this.k.$store;
    return super.mb() || !canSeek();
  }
  // -------------------------------------------------------------------------------------------
  // ARIA
  // -------------------------------------------------------------------------------------------
  xb() {
    return 0;
  }
  yb() {
    return 100;
  }
  Ab() {
    const time = this.bc(this.$store.value()), { duration } = this.k.$store;
    return Number.isFinite(time) ? `${formatSpokenTime(time)} out of ${formatSpokenTime(duration())}` : "live";
  }
  // -------------------------------------------------------------------------------------------
  // Format
  // -------------------------------------------------------------------------------------------
  bc(percent) {
    const { duration } = this.k.$store;
    return Math.round(percent / 100 * duration());
  }
  qc(time) {
    const { liveEdge, duration } = this.k.$store, rate = Math.max(0, Math.min(1, liveEdge() ? 1 : Math.min(time, duration()) / duration()));
    return Number.isNaN(rate) ? 0 : Number.isFinite(rate) ? rate * 100 : 100;
  }
  jc(percent) {
    const time = this.bc(percent), { live, duration } = this.k.$store;
    return Number.isFinite(time) ? (live() ? time - duration() : time).toFixed(0) : "LIVE";
  }
  kc(percent, padHours, padMinutes, showHours) {
    const time = this.bc(percent), { live, duration } = this.k.$store, value = live() ? time - duration() : time;
    return Number.isFinite(time) ? `${value < 0 ? "-" : ""}${formatTime(
      Math.abs(value),
      padHours,
      isNull(padMinutes) ? Math.abs(value) >= 3600 : padMinutes,
      showHours
    )}` : "LIVE";
  }
  Ra() {
    onTrackChapterChange(this.k.textTracks, peek(this.ya), this.ya.set);
  }
  oc() {
    var _a3;
    this.ya();
    this.cc = ((_a3 = this.el) == null ? void 0 : _a3.querySelector('[part="chapter-title"]')) ?? null;
    if (!this.cc)
      return;
    effect(this.sc.bind(this));
    return () => {
      this.cc.textContent = "";
      this.cc = null;
    };
  }
  sc() {
    this.cc.textContent = this.ic();
  }
}, __publicField(_n, "el", defineElement({
  tagName: "media-time-slider",
  props: {
    ...sliderProps,
    min: defineProp({ value: 0, attribute: false }),
    max: defineProp({ value: 100, attribute: false }),
    value: defineProp({ value: 0, attribute: false }),
    pauseWhileDragging: false,
    seekingRequestThrottle: 100,
    chaptersClass: null,
    chapterContainerClass: null,
    chapterClass: null
  },
  store: SliderStoreFactory
})), _n);
const menuContext = createContext();
const FOCUSABLE_ELEMENTS_SELECTOR = /* @__PURE__ */ [
  "a[href]",
  "[tabindex]",
  "input",
  "select",
  "button"
].map((selector) => `${selector}:not([aria-hidden])`).join(",");
const VALID_KEYS = /* @__PURE__ */ new Set([
  "Escape",
  "Tab",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "PageUp",
  "End",
  "PageDown",
  "Enter",
  " "
]);
class MenuFocusController {
  constructor(_delegate) {
    __publicField(this, "zd", 0);
    __publicField(this, "dh", null);
    __publicField(this, "ch", []);
    this.jg = _delegate;
  }
  get a() {
    return this.ch;
  }
  hd(el) {
    listenEvent(el, "focus", this.Ne.bind(this));
    this.dh = el;
  }
  gd() {
    if (!this.dh)
      return;
    this.Z();
    listenEvent(this.dh, "keyup", this.Ya.bind(this));
    listenEvent(this.dh, "keydown", this.Za.bind(this));
    onDispose(() => {
      this.zd = 0;
      this.ch = [];
    });
  }
  Z() {
    this.zd = 0;
    this.ch = this.hh();
  }
  kd(index = this.gh()) {
    const element = this.ch[index], container = this.jg.dd();
    if (element && container) {
      requestAnimationFrame(() => {
        container.scrollTop = element.offsetTop - container.offsetHeight / 2 + element.offsetHeight / 2;
      });
    }
  }
  eh(index) {
    var _a3;
    this.zd = index;
    (_a3 = this.ch[index]) == null ? void 0 : _a3.focus();
    this.kd(index);
  }
  gh() {
    return this.ch.findIndex((el) => el.getAttribute("aria-checked") === "true");
  }
  Ne() {
    setTimeout(() => {
      const index = this.gh();
      this.eh(index >= 0 ? index : 0);
    }, 100);
  }
  Ya(event) {
    if (!VALID_KEYS.has(event.key))
      return;
    event.stopPropagation();
    event.preventDefault();
  }
  Za(event) {
    if (!VALID_KEYS.has(event.key))
      return;
    event.stopPropagation();
    event.preventDefault();
    switch (event.key) {
      case "Escape":
        this.jg.ed(event);
        break;
      case "Tab":
        this.eh(this.fh(event.shiftKey ? -1 : 1));
        break;
      case "ArrowUp":
        this.eh(this.fh(-1));
        break;
      case "ArrowDown":
        this.eh(this.fh(1));
        break;
      case "Home":
      case "PageUp":
        this.eh(0);
        break;
      case "End":
      case "PageDown":
        this.eh(this.ch.length - 1);
        break;
    }
  }
  fh(delta) {
    let index = this.zd;
    do {
      index = (index + delta + this.ch.length) % this.ch.length;
    } while (this.ch[index].offsetParent === null);
    return index;
  }
  hh() {
    if (!this.dh)
      return [];
    const focusableElements = this.dh.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR), elements = [];
    const is = (node) => node.hasAttribute("data-media-menu-items");
    for (const el of focusableElements) {
      if (el instanceof HTMLElement && el.offsetParent !== null && // does not have display: none
      isElementParent(this.dh, el, is)) {
        elements.push(el);
      }
    }
    return elements;
  }
}
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key2, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key2) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key2, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$2(target, key2, result);
  return result;
};
let idCount = 0;
class Menu extends Component {
  constructor(instance) {
    super(instance);
    __publicField(this, "k");
    __publicField(this, "Bc");
    __publicField(this, "Cc");
    __publicField(this, "wc", signal(false));
    __publicField(this, "Ic", signal(false));
    __publicField(this, "Jc", signal(false));
    __publicField(this, "xc");
    __publicField(this, "yc", /* @__PURE__ */ new Set());
    __publicField(this, "Dc", null);
    __publicField(this, "vc", null);
    __publicField(this, "Ac", null);
    __publicField(this, "zc");
    __publicField(this, "ld", this.Ec.bind(this));
    __publicField(this, "$c", this.ad.bind(this));
    __publicField(this, "Zc", this.bd.bind(this));
    __publicField(this, "_c", this.cd.bind(this));
    this.k = useMedia();
    const currentIdCount = ++idCount;
    this.Bc = `media-menu-${currentIdCount}`;
    this.Cc = `media-menu-button-${currentIdCount}`;
    if (hasProvidedContext(menuContext)) {
      this.xc = useContext(menuContext);
    }
    this.zc = new MenuFocusController({
      dd: this.Sc.bind(this),
      ed: this.close.bind(this)
    });
    provideContext(menuContext, {
      wc: this.wc,
      fd: signal(""),
      Ec: this.Ec.bind(this),
      Kc: this.Kc.bind(this),
      Lc: this.Lc.bind(this),
      Mc: this.Mc.bind(this),
      Nc: this.Nc.bind(this),
      Fc: this.Fc.bind(this)
    });
  }
  onAttach(el) {
    const { position } = this.$props;
    this.setAttributes({
      position,
      "data-open": this.wc,
      "data-submenu": !!this.xc,
      "data-disabled": this.mb.bind(this),
      "data-media-menu": true
    });
  }
  onConnect(el) {
    var _a3;
    if (!this.xc) {
      effect(this.Oc.bind(this));
    }
    effect(this.Tc.bind(this));
    (_a3 = this.xc) == null ? void 0 : _a3.Fc(el);
    requestAnimationFrame(() => this.p());
  }
  onDestroy() {
    this.Pc();
    this.Dc = null;
    this.vc = null;
    this.Ac = null;
  }
  Pc() {
    var _a3, _b2;
    if (!this.vc || ((_a3 = this.el) == null ? void 0 : _a3.contains(this.vc)))
      return;
    const menu = (_b2 = this.vc) == null ? void 0 : _b2.parentElement;
    this.el.append(this.vc);
    if ((menu == null ? void 0 : menu.localName) === "media-menu") {
      menu.destroy();
      menu.remove();
    }
  }
  Oc() {
    var _a3, _b2;
    if (!this.el)
      return;
    const { breakpointX, breakpointY, viewType, orientation, fullscreen } = this.k.$store, popup = viewType() === "audio" ? breakpointX() === "sm" : breakpointY() === "sm";
    if (!this.vc || this.xc)
      return;
    setAttribute(this.el, "data-popup", popup);
    setAttribute(this.el, "data-popup-wide", popup && orientation() === "landscape");
    if (popup && !fullscreen()) {
      if ((_b2 = (_a3 = this.el).contains) == null ? void 0 : _b2.call(_a3, this.vc)) {
        const menu = this.el.cloneNode();
        menu.appendChild(this.vc);
        requestAnimationFrame(() => {
          if (!this.el)
            return;
          const mediaRing = "--media-focus-ring", mediaRingValue = getComputedStyle(this.el).getPropertyValue(mediaRing);
          if (mediaRingValue)
            setStyle(menu, mediaRing, mediaRingValue);
        });
        scoped(() => {
          document.body.append(menu);
        }, this.k.scope);
      }
    }
    this.p();
    return () => this.Pc();
  }
  Tc() {
    const expanded = this.Qc();
    this.p();
    this.Rc(expanded);
    if (!expanded)
      return;
    this.zc.gd();
    const closeTarget = this.Uc();
    if (closeTarget) {
      onPress(closeTarget, this.Vc.bind(this));
    }
    this.listen("pointerup", this.Wc.bind(this));
    listenEvent(window, "pointerup", this.Xc.bind(this));
  }
  Kc(el) {
    const isMenuItem = !!this.xc, isExpanded = this.Qc.bind(this), isARIAExpanded = $ariaBool(isExpanded), isARIADisabled = $ariaBool(this.mb.bind(this));
    setAttributeIfEmpty(el, "tabindex", isMenuItem ? "-1" : "0");
    setAttributeIfEmpty(el, "role", isMenuItem ? "menuitem" : "button");
    setAttribute(el, "id", this.Cc);
    setAttribute(el, "aria-controls", this.Bc);
    setAttribute(el, "aria-haspopup", "true");
    effect(() => {
      setAttribute(el, "aria-disabled", isARIADisabled());
      setAttribute(el, "aria-expanded", isARIAExpanded());
      if (!isMenuItem)
        setAttribute(el, "aria-pressed", isARIAExpanded());
      setAttribute(el, "data-pressed", isExpanded());
    });
    setAttribute(el, "data-media-button", !isMenuItem);
    setAttribute(el, "data-media-menu-button", "");
    onPress(el, this.Yc.bind(this));
    this.Dc = el;
  }
  Lc(el) {
    setAttributeIfEmpty(el, "role", "menu");
    setAttributeIfEmpty(el, "tabindex", "-1");
    setAttribute(el, "id", this.Bc);
    setAttribute(el, "aria-describedby", this.Cc);
    setAttribute(el, "data-media-menu-items", "");
    this.vc = el;
    this.zc.hd(el);
    this.Oc();
    this.Rc(peek(this.wc));
  }
  Mc(observer) {
    this.Ac = observer;
  }
  Rc(expanded) {
    if (this.vc)
      setAttribute(this.vc, "aria-hidden", ariaBool$1(!expanded));
  }
  Nc(disabled) {
    this.Jc.set(disabled);
  }
  Yc(event) {
    var _a3;
    if (this.xc)
      event.stopPropagation();
    if (this.mb())
      return;
    this.wc.set((expanded) => !expanded);
    this.Gc();
    tick();
    if (isKeyboardEvent(event)) {
      (_a3 = this.vc) == null ? void 0 : _a3.focus();
    }
    this.Hc(event);
  }
  Hc(trigger) {
    var _a3, _b2, _c2, _d2, _e2;
    const expanded = peek(this.wc);
    this.dispatch(expanded ? "open" : "close", { trigger });
    if (expanded) {
      if (!this.xc) {
        (_a3 = this.k.activeMenu) == null ? void 0 : _a3.close(trigger);
        this.k.activeMenu = this;
      }
      (_c2 = (_b2 = this.Ac) == null ? void 0 : _b2.id) == null ? void 0 : _c2.call(_b2, trigger);
    } else {
      if (!this.xc) {
        setTimeout(() => {
          for (const el of this.yc)
            el.close(trigger);
        }, 300);
        this.k.activeMenu = null;
      }
      (_e2 = (_d2 = this.Ac) == null ? void 0 : _d2.jd) == null ? void 0 : _e2.call(_d2, trigger);
    }
    if (expanded && !isKeyboardEvent(trigger)) {
      requestAnimationFrame(() => {
        this.zc.Z();
        setTimeout(() => {
          this.zc.kd();
        }, 100);
      });
    }
  }
  Qc() {
    return !this.mb() && this.wc();
  }
  mb() {
    return this.Ic() || this.Jc();
  }
  Ec(disabled) {
    this.Ic.set(disabled);
  }
  Wc(event) {
    event.stopPropagation();
  }
  Xc() {
    if (this.xc)
      return setTimeout(this.close.bind(this), 800);
    else
      this.close();
  }
  Vc(event) {
    event.stopPropagation();
    this.close(event);
  }
  Uc() {
    const target = this.el.querySelector('[slot="close-target"]');
    return isElementParent(this.el, target) ? target : null;
  }
  Sc() {
    if (!this.xc) {
      return this.vc;
    } else {
      let el = this.el;
      while (el && el.tagName !== "media-menu" && el.hasAttribute("data-submenu")) {
        el = el.parentNode;
      }
      return el;
    }
  }
  Gc(trigger) {
    if (this.xc)
      return;
    if (this.wc())
      this.k.remote.pauseUserIdle(trigger);
    else
      this.k.remote.resumeUserIdle(trigger);
  }
  Fc(el) {
    this.yc.add(el);
    listenEvent(el, "open", this.Zc);
    listenEvent(el, "close", this._c);
    onDispose(this.$c);
  }
  ad(el) {
    this.yc.delete(el);
  }
  bd(event) {
    for (const el of this.yc) {
      if (el !== event.target)
        el.setAttribute("aria-hidden", "true");
    }
    this.p();
  }
  cd() {
    for (const el of this.yc)
      el.removeAttribute("aria-hidden");
    this.p();
  }
  p() {
    var _a3;
    if (!this.vc || false)
      return;
    let style = getComputedStyle(this.vc), height = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    let children = [...this.vc.children];
    if (((_a3 = children[0]) == null ? void 0 : _a3.localName) === "shadow-root") {
      children.push(...children[0].children);
    }
    for (const child of children) {
      height += child.offsetHeight;
    }
    requestAnimationFrame(() => {
      if (!this.vc)
        return;
      setAttribute(this.vc, "data-resizing", "");
      setTimeout(() => {
        if (!this.vc)
          return;
        setAttribute(this.vc, "data-resizing", false);
      }, 250);
      setStyle(this.vc, "--menu-height", height + "px");
    });
  }
  open(trigger) {
    var _a3;
    if (peek(this.wc))
      return;
    this.wc.set(true);
    tick();
    this.Hc(trigger);
    if (isKeyboardEvent(trigger)) {
      (_a3 = this.vc) == null ? void 0 : _a3.focus();
    }
    this.Gc(trigger);
  }
  close(trigger) {
    if (!peek(this.wc))
      return;
    this.wc.set(false);
    tick();
    if (isKeyboardEvent(trigger)) {
      requestAnimationFrame(() => {
        var _a3;
        (_a3 = this.Dc) == null ? void 0 : _a3.focus();
      });
    }
    this.Hc(trigger);
    this.Gc(trigger);
  }
}
__publicField(Menu, "el", defineElement({
  tagName: "media-menu",
  props: { position: null }
}));
__decorateClass$2([
  method
], Menu.prototype, "open", 1);
__decorateClass$2([
  method
], Menu.prototype, "close", 1);
class MenuButton extends Component {
  constructor(instance) {
    super(instance);
    __publicField(this, "md");
    this.md = useContext(menuContext);
    new FocusVisibleController(instance);
    new TooltipController(instance);
  }
  onAttach(el) {
    this.md.Kc(el);
    effect(this.rb.bind(this));
  }
  onConnect(el) {
    const hint = Array.from(el.querySelectorAll('[slot="hint"]')).pop();
    if (hint) {
      effect(() => {
        const text = this.md.fd();
        if (text)
          hint.textContent = text;
      });
    }
  }
  rb() {
    this.md.Nc(this.$props.disabled());
  }
}
__publicField(MenuButton, "el", defineElement({
  tagName: "media-menu-button",
  props: { disabled: false }
}));
class MenuItems extends Component {
  constructor(instance) {
    super(instance);
    __publicField(this, "md");
    this.md = useContext(menuContext);
    new FocusVisibleController(instance);
  }
  onAttach(el) {
    this.md.Lc(el);
  }
}
__publicField(MenuItems, "el", defineElement({
  tagName: "media-menu-items"
}));
const radioGroupContext = createContext();
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key2, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key2) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key2, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key2, result);
  return result;
};
class RadioGroup extends Component {
  constructor(instance) {
    super(instance);
    __publicField(this, "od", /* @__PURE__ */ new Set());
    __publicField(this, "nd", signal(""));
    __publicField(this, "vd", this.Hc.bind(this));
    provideContext(radioGroupContext, {
      add: this.sd.bind(this),
      remove: this.td.bind(this)
    });
  }
  get values() {
    return Array.from(this.od).map((radio) => radio.nd());
  }
  get value() {
    return this.nd();
  }
  set value(value) {
    this.Hc(value);
  }
  onAttach(el) {
    const isMenuItem = hasProvidedContext(menuContext);
    if (!isMenuItem)
      setAttributeIfEmpty(el, "role", "radiogroup");
    this.pd();
    this.setAttributes({ value: this.nd });
  }
  onConnect() {
    effect(this.pd.bind(this));
  }
  onDestroy() {
    this.od.clear();
  }
  sd(radio) {
    if (this.od.has(radio))
      return;
    this.od.add(radio);
    radio.ud = this.vd;
    radio.qd(radio.nd() === this.nd());
  }
  td(radio) {
    radio.ud = null;
    this.od.delete(radio);
  }
  pd() {
    this.Hc(this.$props.value());
  }
  Hc(newValue, trigger) {
    const currentValue = peek(this.nd);
    if (!newValue || newValue === currentValue)
      return;
    const currentRadio = this.rd(currentValue), newRadio = this.rd(newValue);
    currentRadio == null ? void 0 : currentRadio.qd(false, trigger);
    newRadio == null ? void 0 : newRadio.qd(true, trigger);
    this.nd.set(newValue);
    this.dispatch("change", { trigger });
  }
  rd(newValue) {
    for (const radio of this.od) {
      if (newValue === peek(radio.nd))
        return radio;
    }
    return null;
  }
}
__publicField(RadioGroup, "el", defineElement({
  tagName: "media-radio-group",
  props: { value: "" }
}));
__decorateClass$1([
  prop
], RadioGroup.prototype, "values", 1);
__decorateClass$1([
  prop
], RadioGroup.prototype, "value", 1);
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key2, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key2) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key2, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$4(target, key2, result);
  return result;
};
const $$_templ$b = /* @__PURE__ */ $$_create_template(`<!$><div part="check"></div>`);
class Radio extends Component {
  constructor(instance) {
    super(instance);
    __publicField(this, "wd", signal(false));
    __publicField(this, "xd", {
      nd: this.$props.value,
      qd: this.qd.bind(this),
      ud: null
    });
    new FocusVisibleController(instance);
  }
  get checked() {
    return this.wd();
  }
  onAttach() {
    effect(this.sb.bind(this));
    this.yd();
    const isMenuItem = hasProvidedContext(menuContext);
    this.setAttributes({
      value: this.$props.value,
      role: isMenuItem ? "menuitemradio" : "radio",
      tabindex: isMenuItem ? -1 : 0,
      "aria-checked": $ariaBool(this.wd)
    });
  }
  onConnect(el) {
    this.yd();
    onPress(el, this.gb.bind(this));
  }
  onDisconnect() {
    const group = useContext(radioGroupContext);
    group.remove(this.xd);
  }
  yd() {
    const group = useContext(radioGroupContext);
    group.add(this.xd);
  }
  sb() {
    var _a3, _b2;
    const { value } = this.$props, newValue = value();
    if (peek(this.wd)) {
      (_b2 = (_a3 = this.xd).ud) == null ? void 0 : _b2.call(_a3, newValue);
    }
  }
  gb(event) {
    var _a3, _b2;
    if (peek(this.wd))
      return;
    this.wd.set(true);
    this.dispatch("change", { trigger: event });
    (_b2 = (_a3 = this.xd).ud) == null ? void 0 : _b2.call(_a3, peek(this.$props.value), event);
  }
  qd(value, trigger) {
    if (peek(this.wd) === value)
      return;
    this.wd.set(value);
    this.dispatch("change", { trigger });
  }
  render() {
    return $$_next_template($$_templ$b);
  }
}
__publicField(Radio, "el", defineElement({
  tagName: "media-radio",
  props: { value: "" }
}));
__decorateClass$4([
  prop
], Radio.prototype, "checked", 1);
const $$_templ$a = /* @__PURE__ */ $$_create_template(`<!$><media-radio-group mk-d><!$></media-radio-group>`), $$_templ_2$4 = /* @__PURE__ */ $$_create_template(`<!$><media-radio mk-d><!$></media-radio>`);
function renderRadioGroup(props) {
  const { value, onChange, radioGroupClass } = props;
  return (() => {
    const [$$_root, $$_walker] = $$_create_walker($$_templ$a), $$_expr = $$_walker.nextNode();
    $$_effect(() => $$_attr($$_root, "class", radioGroupClass()));
    $$_listen($$_root, "change", onChange);
    $$_scoped(() => {
      $$_insert_at_marker_lite($$_expr, () => renderOptions(props));
    }, $$_setup_custom_element($$_root, { value }));
    return $$_root;
  })();
}
function renderOptions(props) {
  const { options } = props;
  return options().map((option) => {
    return (() => {
      const [$$_root, $$_walker] = $$_create_walker($$_templ_2$4), $$_expr = $$_walker.nextNode();
      $$_attr($$_root, "part", props.part);
      $$_scoped(() => {
        $$_insert_at_marker_lite($$_expr, option.content);
      }, $$_setup_custom_element($$_root, { value: option.value }));
      return $$_root;
    })();
  });
}
const $$_templ$9 = /* @__PURE__ */ $$_create_template(`<!$><media-thumbnail part="thumbnail" mk-d></media-thumbnail>`), $$_templ_2$3 = /* @__PURE__ */ $$_create_template(`<!$><div part="content"><div part="title"><!$></div><div part="start-time"><!$></div><div part="duration"><!$></div></div>`);
class ChaptersMenuItems extends MenuItems {
  constructor(instance) {
    super(instance);
    __publicField(this, "k");
    __publicField(this, "zd", signal(0));
    __publicField(this, "ya", signal(null));
    this.k = useMedia();
  }
  onAttach(el) {
    super.onAttach(el);
    this.md.Mc({
      id: this.id.bind(this)
    });
    this.setAttributes({
      "data-thumbnails": this.Ad.bind(this)
    });
  }
  id() {
    peek(() => this.z());
  }
  onConnect(el) {
    effect(this.z.bind(this));
    effect(this.Bd.bind(this));
    this.Ra();
    listenEvent(this.k.textTracks, "mode-change", this.Ra.bind(this));
    const {
      chapterClass,
      thumbnailClass,
      contentClass,
      titleClass,
      startTimeClass,
      durationClass
    } = this.$props;
    new ClassManager(el).dc('[part="chapter"]', chapterClass).dc('[part="thumbnail"]', thumbnailClass).dc('[part="content"]', contentClass).dc('[part="title"]', titleClass).dc('[part="start-time"]', startTimeClass).dc('[part="duration"]', durationClass);
  }
  Ad() {
    const { thumbnailCues } = this.k.$store;
    return thumbnailCues().length > 0;
  }
  z() {
    if (!this.md.wc())
      return;
    const track = this.ya();
    if (!track) {
      this.zd.set(-1);
      return;
    }
    const { currentTime } = this.k.$store, time = currentTime(), activeCueIndex = track.cues.findIndex((cue) => isCueActive(cue, time));
    this.zd.set(activeCueIndex);
    if (activeCueIndex >= 0) {
      const cue = track.cues[activeCueIndex], radio = this.el.querySelector(`shadow-root media-radio[aria-checked='true']`), playedPercent = (time - cue.startTime) / (cue.endTime - cue.startTime) * 100;
      radio && setStyle(radio, "--played-percent", round(playedPercent, 3) + "%");
    }
  }
  Bd() {
    this.md.Ec(this.mb());
  }
  mb() {
    const track = this.ya();
    return !track || !track.cues.length;
  }
  Hc(event) {
    var _a3;
    if (this.mb() || !event.trigger)
      return;
    const index = +event.target.value, cues = (_a3 = this.ya()) == null ? void 0 : _a3.cues;
    if (isNumber(index) && (cues == null ? void 0 : cues[index])) {
      this.zd.set(index);
      this.k.remote.seek(cues[index].startTime, event);
    }
  }
  Ra() {
    onTrackChapterChange(this.k.textTracks, peek(this.ya), this.ya.set);
  }
  Cd() {
    return this.zd() + "";
  }
  Dd() {
    const track = this.ya();
    if (!track)
      return [];
    return track.cues.map((cue, i) => ({
      value: i + "",
      content: () => [
        (() => {
          const $$_signal = $$_computed(
            () => this.Ad() && (() => {
              const [$$_root, $$_walker] = $$_create_walker($$_templ$9);
              $$_setup_custom_element($$_root, { time: cue.startTime });
              return $$_root;
            })()
          );
          $$_signal();
          return $$_signal;
        })(),
        (() => {
          const [$$_root, $$_walker] = $$_create_walker($$_templ_2$3), $$_expr = $$_walker.nextNode(), $$_expr_2 = $$_walker.nextNode(), $$_expr_3 = $$_walker.nextNode();
          $$_insert_at_marker_lite($$_expr, cue.text);
          $$_insert_at_marker_lite($$_expr_2, () => formatTime(cue.startTime, false, cue.startTime >= 3600));
          $$_insert_at_marker_lite($$_expr_3, () => formatSpokenTime(cue.endTime - cue.startTime));
          return $$_root;
        })()
      ]
    }));
  }
  render() {
    const { containerClass } = this.$props;
    return renderRadioGroup({
      part: "chapter",
      value: this.Cd.bind(this),
      options: this.Dd.bind(this),
      radioGroupClass: containerClass,
      onChange: this.Hc.bind(this)
    });
  }
}
__publicField(ChaptersMenuItems, "el", defineElement({
  tagName: "media-chapters-menu-items",
  props: {
    containerClass: null,
    chapterClass: null,
    thumbnailClass: null,
    contentClass: null,
    titleClass: null,
    startTimeClass: null,
    durationClass: null
  }
}));
__publicField(ChaptersMenuItems, "register", [Thumbnail, RadioGroup, Radio]);
const $$_templ$8 = /* @__PURE__ */ $$_create_template(`<!$><span part="label"><!$></span>`);
class AudioMenuItems extends MenuItems {
  constructor(instance) {
    super(instance);
    __publicField(this, "k");
    this.k = useMedia();
  }
  onConnect(el) {
    effect(this.Bd.bind(this));
    effect(this.Ed.bind(this));
    const { radioClass, radioCheckClass } = this.$props;
    new ClassManager(el).dc("media-radio", radioClass).dc('[part="check"]', radioCheckClass);
  }
  Ed() {
    const { emptyLabel } = this.$props, { audioTrack } = this.k.$store, track = audioTrack();
    this.md.fd.set((track == null ? void 0 : track.label) ?? emptyLabel());
  }
  Bd() {
    this.md.Ec(this.mb());
  }
  mb() {
    const { audioTracks } = this.k.$store;
    return audioTracks().length === 0;
  }
  Hc(event) {
    if (this.mb())
      return;
    const radioGroup = event.target;
    const value = radioGroup.value, index = this.k.audioTracks.toArray().findIndex((track) => track.label.toLowerCase() === value);
    if (index >= 0)
      this.k.remote.changeAudioTrack(index, event);
  }
  Cd() {
    const { audioTrack } = this.k.$store;
    const track = audioTrack();
    return track ? track.label.toLowerCase() : "";
  }
  Dd() {
    const { audioTracks } = this.k.$store;
    return audioTracks().map((track) => ({
      value: track.label.toLowerCase(),
      content: () => (() => {
        const [$$_root, $$_walker] = $$_create_walker($$_templ$8), $$_expr = $$_walker.nextNode();
        $$_insert_at_marker_lite($$_expr, track.label);
        return $$_root;
      })()
    }));
  }
  render() {
    const { radioGroupClass } = this.$props;
    return renderRadioGroup({
      value: this.Cd.bind(this),
      options: this.Dd.bind(this),
      radioGroupClass,
      onChange: this.Hc.bind(this)
    });
  }
}
__publicField(AudioMenuItems, "el", defineElement({
  tagName: "media-audio-menu-items",
  props: {
    emptyLabel: "Default",
    radioClass: null,
    radioGroupClass: null,
    radioCheckClass: null
  }
}));
__publicField(AudioMenuItems, "register", [RadioGroup, Radio]);
var Icon$51 = `<path fill-rule="evenodd" clip-rule="evenodd" d="M26.6667 5.99998C26.6667 5.63179 26.3682 5.33331 26 5.33331H11.3333C10.9651 5.33331 10.6667 5.63179 10.6667 5.99998V17.5714C10.6667 17.6694 10.5644 17.7342 10.4741 17.6962C9.91823 17.4625 9.30754 17.3333 8.66667 17.3333C6.08934 17.3333 4 19.4226 4 22C4 24.5773 6.08934 26.6666 8.66667 26.6666C11.244 26.6666 13.3333 24.5773 13.3333 22V8.66665C13.3333 8.29846 13.6318 7.99998 14 7.99998L23.3333 7.99998C23.7015 7.99998 24 8.29846 24 8.66665V14.9048C24 15.0027 23.8978 15.0675 23.8075 15.0296C23.2516 14.7958 22.6409 14.6666 22 14.6666C19.4227 14.6666 17.3333 16.756 17.3333 19.3333C17.3333 21.9106 19.4227 24 22 24C24.5773 24 26.6667 21.9106 26.6667 19.3333V5.99998ZM22 21.3333C23.1046 21.3333 24 20.4379 24 19.3333C24 18.2287 23.1046 17.3333 22 17.3333C20.8954 17.3333 20 18.2287 20 19.3333C20 20.4379 20.8954 21.3333 22 21.3333ZM8.66667 24C9.77124 24 10.6667 23.1045 10.6667 22C10.6667 20.8954 9.77124 20 8.66667 20C7.5621 20 6.66667 20.8954 6.66667 22C6.66667 23.1045 7.5621 24 8.66667 24Z" fill="currentColor"/>`;
var Icon$10 = `<path d="M13.0908 14.3334C12.972 14.3334 12.9125 14.1898 12.9965 14.1058L17.7021 9.40022C17.9625 9.13987 17.9625 8.71776 17.7021 8.45741L16.2879 7.04319C16.0275 6.78284 15.6054 6.78284 15.3451 7.04319L6.8598 15.5285C6.59945 15.7888 6.59945 16.2109 6.8598 16.4713L8.27401 17.8855L8.27536 17.8868L15.3453 24.9568C15.6057 25.2172 16.0278 25.2172 16.2881 24.9568L17.7024 23.5426C17.9627 23.2822 17.9627 22.8601 17.7024 22.5998L12.9969 17.8944C12.9129 17.8104 12.9724 17.6668 13.0912 17.6668L26 17.6668C26.3682 17.6668 26.6667 17.3683 26.6667 17.0001V15.0001C26.6667 14.6319 26.3682 14.3334 26 14.3334L13.0908 14.3334Z" fill="currentColor"/>`;
var Icon$18 = `<path d="M15.905 17.4809C15.9571 17.533 16.0415 17.533 16.0936 17.4809L22.4111 11.1635C22.6714 10.9031 23.0935 10.9031 23.3539 11.1635L24.9567 12.7662C25.217 13.0266 25.217 13.4487 24.9567 13.709L18.1028 20.5629C18.0937 20.5732 18.0842 20.5833 18.0744 20.5931L16.4716 22.1959C16.2113 22.4562 15.7892 22.4562 15.5288 22.1959L7.04353 13.7106C6.78318 13.4503 6.78318 13.0281 7.04353 12.7678L8.6463 11.165C8.90665 10.9047 9.32876 10.9047 9.58911 11.165L15.905 17.4809Z" fill="currentColor"/>`;
const $$_templ$7 = /* @__PURE__ */ $$_create_template(`<!$><span slot="label"><!$></span>`), $$_templ_2$2$1 = /* @__PURE__ */ $$_create_template(`<!$><div slot="hint"></div>`);
function renderMenuButtonContent({ label, iconPaths }) {
  return [
    $$_create_component(Icon, { slot: "close-icon", paths: Icon$10 }),
    $$_create_component(Icon, { slot: "icon", paths: iconPaths }),
    (() => {
      const [$$_root, $$_walker] = $$_create_walker($$_templ$7), $$_expr = $$_walker.nextNode();
      $$_insert_at_marker_lite($$_expr, label);
      return $$_root;
    })(),
    $$_next_template($$_templ_2$2$1),
    $$_create_component(Icon, { slot: "open-icon", paths: Icon$18 })
  ];
}
class AudioMenuButton extends MenuButton {
  render() {
    const { label } = this.$props;
    return renderMenuButtonContent({
      label,
      iconPaths: Icon$51
    });
  }
}
__publicField(AudioMenuButton, "el", defineElement({
  tagName: "media-audio-menu-button",
  props: { disabled: false, label: "Audio" }
}));
const $$_templ$6 = /* @__PURE__ */ $$_create_template(`<!$><span part="label"><!$></span>`), $$_templ_2$1$1 = $$_templ$6;
class CaptionsMenuItems extends MenuItems {
  constructor(instance) {
    super(instance);
    __publicField(this, "k");
    this.k = useMedia();
  }
  onConnect(el) {
    effect(this.Bd.bind(this));
    effect(this.Ed.bind(this));
    const { radioClass, radioCheckClass } = this.$props;
    new ClassManager(el).dc("media-radio", radioClass).dc('[part="check"]', radioCheckClass);
  }
  Ed() {
    const { offLabel } = this.$props, { textTrack } = this.k.$store, track = textTrack();
    this.md.fd.set(
      track && isTrackCaptionKind(track) && track.mode === "showing" ? track.label : offLabel()
    );
  }
  Bd() {
    this.md.Ec(this.mb());
  }
  mb() {
    const { textTracks } = this.k.$store;
    return textTracks().filter(isTrackCaptionKind).length === 0;
  }
  Hc(event) {
    if (this.mb())
      return;
    const radioGroup = event.target;
    const value = radioGroup.value;
    if (value === "off") {
      const track = this.k.textTracks.selected;
      if (track) {
        const index2 = this.k.textTracks.toArray().indexOf(track);
        this.k.remote.changeTextTrackMode(index2, "disabled", event);
      }
      return;
    }
    const index = this.k.textTracks.toArray().findIndex((track) => track.label.toLowerCase() === value);
    if (index >= 0)
      this.k.remote.changeTextTrackMode(index, "showing", event);
  }
  Cd() {
    const { textTrack, textTracks } = this.k.$store, track = textTrack();
    return track && isTrackCaptionKind(track) && track.mode === "showing" ? track.label.toLowerCase() : "off";
  }
  Dd() {
    const { offLabel } = this.$props, { textTracks } = this.k.$store;
    return [
      { value: "off", content: () => (() => {
        const [$$_root, $$_walker] = $$_create_walker($$_templ$6), $$_expr = $$_walker.nextNode();
        $$_insert_at_marker_lite($$_expr, offLabel);
        return $$_root;
      })() },
      ...textTracks().filter(isTrackCaptionKind).map((track) => ({
        value: track.label.toLowerCase(),
        content: () => (() => {
          const [$$_root, $$_walker] = $$_create_walker($$_templ_2$1$1), $$_expr = $$_walker.nextNode();
          $$_insert_at_marker_lite($$_expr, track.label);
          return $$_root;
        })()
      }))
    ];
  }
  render() {
    const { radioGroupClass } = this.$props;
    return renderRadioGroup({
      value: this.Cd.bind(this),
      options: this.Dd.bind(this),
      radioGroupClass,
      onChange: this.Hc.bind(this)
    });
  }
}
__publicField(CaptionsMenuItems, "el", defineElement({
  tagName: "media-captions-menu-items",
  props: {
    offLabel: "Off",
    radioClass: null,
    radioGroupClass: null,
    radioCheckClass: null
  }
}));
__publicField(CaptionsMenuItems, "register", [RadioGroup, Radio]);
class CaptionsMenuButton extends MenuButton {
  render() {
    const { label } = this.$props;
    return renderMenuButtonContent({
      label,
      iconPaths: Icon$25
    });
  }
}
__publicField(CaptionsMenuButton, "el", defineElement({
  tagName: "media-captions-menu-button",
  props: { disabled: false, label: "Captions" }
}));
const $$_templ$5 = /* @__PURE__ */ $$_create_template(`<!$><span part="label"><!$></span>`);
class PlaybackRateMenuItems extends MenuItems {
  constructor(instance) {
    super(instance);
    __publicField(this, "k");
    this.k = useMedia();
  }
  onConnect(el) {
    effect(this.Ed.bind(this));
    const { radioClass, radioCheckClass } = this.$props;
    new ClassManager(el).dc("media-radio", radioClass).dc('[part="check"]', radioCheckClass);
  }
  Ed() {
    const { normalLabel } = this.$props, { playbackRate } = this.k.$store, rate = playbackRate();
    this.md.fd.set(rate === 1 ? normalLabel() : rate + "×");
  }
  Hc(event) {
    const radioGroup = event.target;
    this.k.remote.changePlaybackRate(+radioGroup.value, event);
  }
  Cd() {
    const { playbackRate } = this.k.$store;
    return playbackRate() + "";
  }
  Dd() {
    const { rates, normalLabel } = this.$props;
    return rates().map((rate) => ({
      value: rate + "",
      content: () => (() => {
        const [$$_root, $$_walker] = $$_create_walker($$_templ$5), $$_expr = $$_walker.nextNode();
        $$_insert_at_marker_lite($$_expr, () => rate === 1 ? normalLabel() : rate + "×");
        return $$_root;
      })()
    }));
  }
  render() {
    const { radioGroupClass } = this.$props;
    return renderRadioGroup({
      value: this.Cd.bind(this),
      options: this.Dd.bind(this),
      radioGroupClass,
      onChange: this.Hc.bind(this)
    });
  }
}
__publicField(PlaybackRateMenuItems, "el", defineElement({
  tagName: "media-playback-rate-menu-items",
  props: {
    normalLabel: "Normal",
    rates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
    radioGroupClass: null,
    radioClass: null,
    radioCheckClass: null
  }
}));
__publicField(PlaybackRateMenuItems, "register", [RadioGroup, Radio]);
var Icon$55 = `<path d="M25.14 25.1089C25.0171 25.2532 24.8356 25.3333 24.646 25.3333H22.8124C22.1084 25.3333 21.7734 24.1872 22.2745 23.6927C23.9161 22.0729 24.9336 19.822 24.9336 17.3333C24.9336 12.3997 20.9336 8.39973 16 8.39973C11.0664 8.39973 7.06641 12.3997 7.06641 17.3333C7.06641 19.822 8.08389 22.0729 9.72555 23.6927C10.2266 24.1872 9.89155 25.3333 9.18762 25.3333H7.35398C7.16436 25.3333 6.98294 25.2532 6.86001 25.1089C5.07703 23.015 4 20.2991 4 17.3333C4 10.7057 9.3724 5.33333 16 5.33333C22.6276 5.33333 28 10.7057 28 17.3333C28 20.2991 26.923 23.015 25.14 25.1089Z" fill="currentColor"/> <path d="M21.1992 14.3399C21.4595 14.0796 21.4595 13.6575 21.1992 13.3971L20.2564 12.4543C19.996 12.194 19.5739 12.194 19.3136 12.4543L16.4492 15.3187C16.4185 15.3493 16.3749 15.3629 16.332 15.3568C16.2236 15.3414 16.1127 15.3334 16 15.3334C14.7113 15.3334 13.6667 16.378 13.6667 17.6667C13.6667 18.9554 14.7113 20 16 20C17.2887 20 18.3333 18.9554 18.3333 17.6667C18.3333 17.5464 18.3242 17.4283 18.3067 17.313C18.3001 17.2696 18.3136 17.2255 18.3446 17.1945L21.1992 14.3399Z" fill="currentColor"/>`;
class PlaybackRateMenuButton extends MenuButton {
  render() {
    const { label } = this.$props;
    return renderMenuButtonContent({
      label,
      iconPaths: Icon$55
    });
  }
}
__publicField(PlaybackRateMenuButton, "el", defineElement({
  tagName: "media-playback-rate-menu-button",
  props: { disabled: false, label: "Speed" }
}));
const $$_templ$4 = /* @__PURE__ */ $$_create_template(`<!$><span><!$></span>`), $$_templ_2$7 = /* @__PURE__ */ $$_create_template(`<!$><span part="label"><!$></span>`), $$_templ_3$2 = /* @__PURE__ */ $$_create_template(`<!$><span part="info"><!$></span>`);
class QualityMenuItems extends MenuItems {
  constructor(instance) {
    super(instance);
    __publicField(this, "k");
    __publicField(this, "Gd", computed(() => {
      const { qualities } = this.k.$store;
      return [...qualities()].sort(
        (a, b) => b.height === a.height ? b.bitrate - a.bitrate : b.height - a.height
      );
    }));
    this.k = useMedia();
  }
  onConnect(el) {
    effect(this.Bd.bind(this));
    effect(this.Ed.bind(this));
    const { radioClass, radioCheckClass } = this.$props;
    new ClassManager(el).dc("media-radio", radioClass).dc('[part="check"]', radioCheckClass);
  }
  Ed() {
    const { autoLabel } = this.$props, { autoQuality, quality } = this.k.$store, qualityText = quality() ? quality().height + "p" : "";
    this.md.fd.set(!autoQuality() ? qualityText : autoLabel() + ` (${qualityText})`);
  }
  Bd() {
    const { qualities } = this.k.$store;
    this.md.Ec(qualities().length === 0);
  }
  mb() {
    const { canSetQuality, qualities } = this.k.$store;
    return !canSetQuality() || qualities().length === 0;
  }
  Hc(event) {
    if (this.mb())
      return;
    const radioGroup = event.target, value = radioGroup.value;
    if (value === "auto") {
      this.k.remote.changeQuality(-1, event);
      return;
    }
    const { qualities } = this.k.$store, index = peek(qualities).findIndex((quality) => this.Fd(quality) === value);
    if (index >= 0)
      this.k.remote.changeQuality(index, event);
  }
  Cd() {
    const { quality, autoQuality } = this.k.$store;
    if (autoQuality())
      return "auto";
    const currentQuality = quality();
    return currentQuality ? this.Fd(currentQuality) : "auto";
  }
  Fd(quality) {
    return quality.height + "_" + quality.bitrate;
  }
  Dd() {
    const { autoLabel, hideBitrate } = this.$props;
    return [
      { value: "auto", content: () => (() => {
        const [$$_root, $$_walker] = $$_create_walker($$_templ$4), $$_expr = $$_walker.nextNode();
        $$_insert_at_marker_lite($$_expr, autoLabel);
        return $$_root;
      })() },
      ...this.Gd().map((quality) => {
        const rate = `${round(quality.bitrate / 1e6, 2)} Mbps`;
        return {
          value: this.Fd(quality),
          content: () => [
            (() => {
              const [$$_root, $$_walker] = $$_create_walker($$_templ_2$7), $$_expr = $$_walker.nextNode();
              $$_insert_at_marker_lite($$_expr, quality.height + "p");
              return $$_root;
            })(),
            (() => {
              const $$_signal = $$_computed(
                () => !hideBitrate() && (() => {
                  const [$$_root, $$_walker] = $$_create_walker($$_templ_3$2), $$_expr = $$_walker.nextNode();
                  $$_insert_at_marker_lite($$_expr, rate);
                  return $$_root;
                })()
              );
              $$_signal();
              return $$_signal;
            })()
          ]
        };
      })
    ];
  }
  render() {
    const { radioGroupClass } = this.$props;
    return renderRadioGroup({
      value: this.Cd.bind(this),
      options: this.Dd.bind(this),
      radioGroupClass,
      onChange: this.Hc.bind(this)
    });
  }
}
__publicField(QualityMenuItems, "el", defineElement({
  tagName: "media-quality-menu-items",
  props: {
    autoLabel: "Auto",
    hideBitrate: false,
    radioGroupClass: null,
    radioClass: null,
    radioCheckClass: null
  }
}));
__publicField(QualityMenuItems, "register", [RadioGroup, Radio]);
var Icon$83 = `<path d="M18.6669 10.4001C18.6669 10.7683 18.3684 11.0667 18.0002 11.0667H16.2668C15.8987 11.0667 15.6002 10.7683 15.6002 10.4001V9.86674C15.6002 9.7931 15.5405 9.73341 15.4669 9.73341H5.99998C5.63179 9.73341 5.33331 9.43493 5.33331 9.06674V7.33341C5.33331 6.96522 5.63179 6.66674 5.99998 6.66674H15.4669C15.5405 6.66674 15.6002 6.60704 15.6002 6.53341V6.00007C15.6002 5.63188 15.8987 5.3334 16.2668 5.3334H18.0002C18.3684 5.3334 18.6669 5.63188 18.6669 6.00007V10.4001Z" fill="currentColor"/> <path d="M11.3334 18.8668C11.7016 18.8668 12.0001 18.5683 12.0001 18.2001V13.8001C12.0001 13.4319 11.7016 13.1335 11.3334 13.1335H9.60006C9.23187 13.1335 8.93339 13.4319 8.93339 13.8001V14.3335C8.93339 14.4071 8.8737 14.4668 8.80006 14.4668H6.00006C5.63187 14.4668 5.33339 14.7653 5.33339 15.1335V16.8668C5.33339 17.235 5.63187 17.5335 6.00006 17.5335H8.80006C8.8737 17.5335 8.93339 17.5932 8.93339 17.6668V18.2001C8.93339 18.5683 9.23187 18.8668 9.60006 18.8668H11.3334Z" fill="currentColor"/> <path d="M18.6667 26.0001C18.6667 26.3683 18.3682 26.6668 18 26.6668H16.2667C15.8985 26.6668 15.6 26.3683 15.6 26.0001V25.4668C15.6 25.3931 15.5403 25.3334 15.4667 25.3334H6.00014C5.63195 25.3334 5.33348 25.0349 5.33348 24.6668V22.9334C5.33348 22.5652 5.63195 22.2668 6.00014 22.2668H15.4667C15.5403 22.2668 15.6 22.2071 15.6 22.1334V21.6001C15.6 21.2319 15.8985 20.9334 16.2667 20.9334H18C18.3682 20.9334 18.6667 21.2319 18.6667 21.6001V26.0001Z" fill="currentColor"/> <path d="M22 24.6668C22 25.0349 22.2985 25.3334 22.6667 25.3334H26.0001C26.3683 25.3334 26.6668 25.0349 26.6668 24.6668V22.9334C26.6668 22.5652 26.3683 22.2668 26.0001 22.2668H22.6667C22.2985 22.2668 22 22.5652 22 22.9334V24.6668Z" fill="currentColor"/> <path d="M16.0001 17.5335C15.6319 17.5335 15.3334 17.235 15.3334 16.8668V15.1335C15.3334 14.7653 15.6319 14.4668 16.0001 14.4668H26.0001C26.3683 14.4668 26.6667 14.7653 26.6667 15.1335V16.8668C26.6667 17.235 26.3683 17.5335 26.0001 17.5335H16.0001Z" fill="currentColor"/> <path d="M22.0002 9.06674C22.0002 9.43493 22.2987 9.73341 22.6669 9.73341H26C26.3682 9.73341 26.6666 9.43493 26.6666 9.06674V7.3334C26.6666 6.96521 26.3682 6.66674 26 6.66674H22.6669C22.2987 6.66674 22.0002 6.96522 22.0002 7.33341V9.06674Z" fill="currentColor"/>`;
class QualityMenuButton extends MenuButton {
  render() {
    const { label } = this.$props;
    return renderMenuButtonContent({
      label,
      iconPaths: Icon$83
    });
  }
}
__publicField(QualityMenuButton, "el", defineElement({
  tagName: "media-quality-menu-button",
  props: { disabled: false, label: "Quality" }
}));
class Gesture extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "k");
    __publicField(this, "Id", null);
    __publicField(this, "Hd", 0);
    __publicField(this, "Jd", -1);
  }
  onAttach() {
    const { event, action } = this.$props;
    this.setAttributes({
      event,
      action
    });
  }
  onConnect() {
    this.k = useMedia();
    scopedRaf(() => {
      this.Id = this.k.player.querySelector("media-outlet");
      effect(this.Ld.bind(this));
    });
  }
  Ld() {
    let eventType = this.$props.event();
    if (!this.Id || !eventType)
      return;
    if (/^dbl/.test(eventType)) {
      eventType = eventType.split(/^dbl/)[1];
    }
    listenEvent(this.Id, eventType, this.Md.bind(this));
  }
  Md(event) {
    var _a3;
    if (!this.Nd(event) || isPointerEvent(event) && (event.button !== 0 || this.k.activeMenu)) {
      return;
    }
    event.MEDIA_GESTURE = true;
    event.preventDefault();
    const isDblEvent = (_a3 = peek(this.$props.event)) == null ? void 0 : _a3.startsWith("dbl");
    if (!isDblEvent) {
      if (this.Hd === 0) {
        setTimeout(() => {
          if (this.Hd === 1)
            this.Kd(event);
        }, 250);
      }
    } else if (this.Hd === 1) {
      queueMicrotask(() => this.Kd(event));
      clearTimeout(this.Jd);
      this.Hd = 0;
      return;
    }
    if (this.Hd === 0) {
      this.Jd = window.setTimeout(() => {
        this.Hd = 0;
      }, 275);
    }
    this.Hd++;
  }
  Kd(event) {
    this.el.setAttribute("data-triggered", "");
    requestAnimationFrame(() => {
      if (this.Od()) {
        this.Pd(peek(this.$props.action), event);
      }
      requestAnimationFrame(() => {
        this.el.removeAttribute("data-triggered");
      });
    });
  }
  /** Validate event occurred in gesture bounds. */
  Nd(event) {
    if (!this.el)
      return false;
    if (isPointerEvent(event) || isMouseEvent(event) || isTouchEvent(event)) {
      const touch = isTouchEvent(event) ? event.touches[0] : void 0;
      const clientX = (touch == null ? void 0 : touch.clientX) ?? event.clientX;
      const clientY = (touch == null ? void 0 : touch.clientY) ?? event.clientY;
      const rect = this.el.getBoundingClientRect();
      const inBounds = clientY >= rect.top && clientY <= rect.bottom && clientX >= rect.left && clientX <= rect.right;
      return event.type.includes("leave") ? !inBounds : inBounds;
    }
    return true;
  }
  /** Validate gesture has the highest z-index in this triggered group. */
  Od() {
    var _a3;
    const gestures = this.k.player.querySelectorAll(
      "media-gesture[data-triggered]"
    );
    return ((_a3 = Array.from(gestures).sort(
      (a, b) => +getComputedStyle(b).zIndex - +getComputedStyle(a).zIndex
    )[0]) == null ? void 0 : _a3.component) === this;
  }
  Pd(action, trigger) {
    if (!action)
      return;
    const [method2, value] = action.replace(/:([a-z])/, "-$1").split(":");
    if (action.includes(":fullscreen")) {
      this.k.remote.toggleFullscreen("prefer-media", trigger);
    } else if (action.includes("seek:")) {
      this.k.remote.seek(peek(this.k.$store.currentTime) + (+value || 0), trigger);
    } else {
      this.k.remote[kebabToCamelCase(method2)](trigger);
    }
  }
}
__publicField(Gesture, "el", defineElement({
  tagName: "media-gesture",
  props: {
    event: void 0,
    action: void 0
  }
}));
const $$_templ$3 = /* @__PURE__ */ $$_create_template(`<!$><svg part="icon" fill="none" viewBox="0 0 120 120" aria-hidden="true"><circle part="track" cx="60" cy="60" r="54" stroke="currentColor"></circle><circle part="track-fill" cx="60" cy="60" r="54" stroke="currentColor" pathLength="100"></circle></svg>`);
class BufferingIndicator extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "k");
  }
  onAttach() {
    this.k = useMedia();
    this.setAttributes({
      "data-buffering": computed(this.Qd.bind(this))
    });
  }
  Qd() {
    const { canPlay, waiting } = this.k.$store;
    return !canPlay() || waiting();
  }
  render() {
    return $$_next_template($$_templ$3);
  }
}
__publicField(BufferingIndicator, "el", defineElement({
  tagName: "media-buffering-indicator"
}));
class CaptionsTextRenderer {
  constructor(_renderer) {
    __publicField(this, "priority", 10);
    __publicField(this, "ya", null);
    __publicField(this, "ih", createDisposalBin());
    this.Sd = _renderer;
  }
  attach() {
  }
  canRender() {
    return true;
  }
  detach() {
    this.ih.empty();
    this.Sd.reset();
    this.ya = null;
  }
  changeTrack(track) {
    if (!track || this.ya === track)
      return;
    this.ih.empty();
    if (track.readyState < 2) {
      this.Sd.reset();
      this.ih.add(
        listenEvent(track, "load", () => this.jh(track), { once: true })
      );
    } else {
      this.jh(track);
    }
    this.ih.add(
      listenEvent(track, "add-cue", (event) => {
        this.Sd.addCue(event.detail);
      }),
      listenEvent(track, "remove-cue", (event) => {
        this.Sd.removeCue(event.detail);
      })
    );
    this.ya = track;
  }
  jh(track) {
    this.Sd.changeTrack({
      cues: [...track.cues],
      regions: [...track.regions]
    });
  }
}
class Captions extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "k");
    __publicField(this, "Sd");
    __publicField(this, "Rd");
  }
  onAttach() {
    this.k = useMedia();
    this.setAttributes({
      "aria-hidden": $ariaBool(this.jb.bind(this))
    });
  }
  onConnect(el) {
    this.Sd = new CaptionsRenderer(el);
    this.Rd = new CaptionsTextRenderer(this.Sd);
    effect(this.Ud.bind(this));
  }
  onDisconnect() {
    var _a3;
    if (this.Rd) {
      this.Rd.detach();
      this.k.textRenderers.remove(this.Rd);
    }
    (_a3 = this.Sd) == null ? void 0 : _a3.destroy();
  }
  jb() {
    const { textTrack } = this.k.$store, track = textTrack();
    return !track || !isTrackCaptionKind(track);
  }
  Ud() {
    const { viewType } = this.k.$store;
    if (viewType() === "audio") {
      return this.Vd();
    } else {
      return this.Wd();
    }
  }
  Vd() {
    effect(this.oc.bind(this));
    return () => {
      this.el.textContent = "";
    };
  }
  oc() {
    if (this.jb())
      return;
    const { textTrack } = this.k.$store;
    this.Td();
    listenEvent(textTrack(), "cue-change", this.Td.bind(this));
    effect(this.Xd.bind(this));
  }
  Td() {
    this.el.textContent = "";
    const { currentTime, textTrack } = this.k.$store, time = peek(currentTime), activeCues = peek(textTrack).activeCues;
    for (const cue of activeCues) {
      const cueEl = document.createElement("div");
      cueEl.setAttribute("part", "cue");
      cueEl.innerHTML = renderVTTCueString(cue, time);
      this.el.append(cueEl);
    }
  }
  Xd() {
    const { currentTime } = this.k.$store;
    updateTimedVTTCueNodes(this.el, currentTime());
  }
  Wd() {
    effect(this.Yd.bind(this));
    effect(this.Zd.bind(this));
    this.k.textRenderers.add(this.Rd);
    return () => {
      this.el.textContent = "";
      this.Rd.detach();
      this.k.textRenderers.remove(this.Rd);
    };
  }
  Yd() {
    this.Sd.dir = this.$props.textDir();
  }
  Zd() {
    if (this.jb())
      return;
    const { currentTime } = this.k.$store;
    this.Sd.currentTime = currentTime();
  }
}
__publicField(Captions, "el", defineElement({
  tagName: "media-captions",
  props: { textDir: "ltr" }
}));
const $$_templ$2$1 = /* @__PURE__ */ $$_create_template(`<!$><div part="container"><div part="text">LIVE</div></div>`);
class LiveIndicator extends Component {
  constructor(instance) {
    super(instance);
    __publicField(this, "k");
    this.k = useMedia();
    new FocusVisibleController(instance);
  }
  onAttach(el) {
    const { live, liveEdge } = this.k.$store;
    setARIALabel(el, this.ib.bind(this));
    this.setAttributes({
      tabindex: this._d.bind(this),
      role: this.$d.bind(this),
      "data-live": live,
      "data-live-edge": liveEdge,
      "data-media-button": true
    });
  }
  onConnect(el) {
    onPress(el, this.gb.bind(this));
  }
  ib() {
    const { live } = this.k.$store;
    return live() ? "Go live" : null;
  }
  _d() {
    const { live } = this.k.$store;
    return live() ? 0 : null;
  }
  $d() {
    const { live } = this.k.$store;
    return live() ? "button" : null;
  }
  gb(event) {
    const { liveEdge } = this.k.$store;
    if (liveEdge())
      return;
    this.k.remote.seekToLiveEdge(event);
  }
  render() {
    return $$_next_template($$_templ$2$1);
  }
}
__publicField(LiveIndicator, "el", defineElement({
  tagName: "media-live-indicator"
}));
const $$_templ$1$1 = /* @__PURE__ */ $$_create_template(`<!$><img part="img" />`);
class Poster extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "k");
    __publicField(this, "ae", signal(true));
    __publicField(this, "be", signal(false));
    __publicField(this, "ce");
    __publicField(this, "de");
  }
  onAttach(el) {
    this.k = useMedia();
    this.ce = computed(this.ee.bind(this));
    this.de = this.fe.bind(this);
    this.setAttributes({
      "data-loading": this.ae,
      "aria-hidden": $ariaBool(this.jb.bind(this))
    });
  }
  onConnect(el) {
    const { canLoad, poster } = this.k.$store;
    window.requestAnimationFrame(() => {
      if (!canLoad())
        preconnect(poster());
    });
    effect(this.ge.bind(this));
  }
  jb() {
    const { poster } = this.k.$store;
    return this.be() || !poster();
  }
  ee() {
    const { canLoad, poster } = this.k.$store;
    return canLoad() && poster().length ? poster() : null;
  }
  fe() {
    return this.ce() ? this.$props.alt() : null;
  }
  ge() {
    const { canLoad, poster } = this.k.$store;
    const isLoading = canLoad() && !!poster();
    this.ae.set(isLoading);
    this.be.set(false);
  }
  he() {
    this.ae.set(false);
  }
  Wb() {
    this.ae.set(false);
    this.be.set(true);
  }
  render() {
    const { crossorigin } = this.k.$store;
    return (() => {
      const [$$_root, $$_walker] = $$_create_walker($$_templ$1$1);
      $$_effect(() => $$_attr($$_root, "src", this.ce()));
      $$_effect(() => $$_attr($$_root, "alt", this.de()));
      $$_effect(() => $$_attr($$_root, "crossorigin", crossorigin()));
      $$_listen($$_root, "load", this.he.bind(this));
      $$_listen($$_root, "error", this.Wb.bind(this));
      return $$_root;
    })();
  }
}
__publicField(Poster, "el", defineElement({
  tagName: "media-poster",
  props: { alt: void 0 }
}));
const $$_templ$i = /* @__PURE__ */ $$_create_template(`<!$><span><!$></span>`);
class Time extends Component {
  constructor() {
    super(...arguments);
    __publicField(this, "k");
    __publicField(this, "ie");
  }
  onAttach() {
    this.k = useMedia();
    this.ie = computed(this.Mb.bind(this));
  }
  Mb() {
    const { type, remainder, padHours, padMinutes, showHours } = this.$props, seconds = this.je(type()), duration = this.k.$store.duration();
    if (!Number.isFinite(seconds + duration))
      return "LIVE";
    const time = remainder() ? Math.max(0, duration - seconds) : seconds;
    return formatTime(
      time,
      padHours(),
      isNull(padMinutes()) ? time >= 3600 : padMinutes(),
      showHours()
    );
  }
  je(type) {
    const { bufferedEnd, duration, currentTime } = this.k.$store;
    switch (type) {
      case "buffered":
        return bufferedEnd();
      case "duration":
        return duration();
      default:
        return currentTime();
    }
  }
  render() {
    return (() => {
      const [$$_root, $$_walker] = $$_create_walker($$_templ$i), $$_expr = $$_walker.nextNode();
      $$_insert_at_marker_lite($$_expr, this.ie);
      return $$_root;
    })();
  }
}
__publicField(Time, "el", defineElement({
  tagName: "media-time",
  props: {
    type: "current",
    showHours: false,
    padHours: null,
    padMinutes: null,
    remainder: false
  }
}));
function setupPreviewStyles(preview2, orientation) {
  let rect = preview2.getBoundingClientRect(), styles = {
    "--computed-width": rect.width + "px",
    "--computed-height": rect.height + "px",
    "--preview-width": "var(--media-slider-preview-width, var(--computed-width))",
    "--preview-height": "var(--media-slider-preview-height, var(--computed-height))"
  };
  if (orientation !== "vertical") {
    styles = {
      ...styles,
      "--preview-width-half": "calc(var(--preview-width) / 2)",
      "--preview-left-clamp": "max(var(--preview-width-half), var(--slider-pointer-percent))",
      "--preview-right-clamp": "calc(100% - var(--preview-width-half))",
      "--preview-left": "min(var(--preview-left-clamp), var(--preview-right-clamp))"
    };
  } else {
    styles = {
      ...styles,
      "--preview-height-half": "calc(var(--preview-height) / 2)",
      "--preview-top-clamp": "max(var(--preview-height-half), var(--slider-pointer-percent))",
      "--preview-bottom-clamp": "calc(100% - var(--preview-height-half))",
      "--preview-bottom": "min(var(--preview-top-clamp), var(--preview-bottom-clamp))"
    };
  }
  for (const name of Object.keys(styles)) {
    preview2.style.setProperty(name, styles[name]);
  }
}
var preview = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  setupPreviewStyles
});
class RequestQueue {
  constructor() {
    __publicField(this, "Qe", false);
    __publicField(this, "Re", deferredPromise());
    __publicField(this, "Pe", /* @__PURE__ */ new Map());
  }
  /**
   * The number of callbacks that are currently in queue.
   */
  get Ve() {
    return this.Pe.size;
  }
  /**
   * Whether items in the queue are being served immediately, otherwise they're queued to
   * be processed later.
   */
  get We() {
    return this.Qe;
  }
  /**
   * Waits for the queue to be flushed (ie: start serving).
   */
  async Xe() {
    if (this.Qe)
      return;
    await this.Re.promise;
  }
  /**
   * Queue the given `callback` to be invoked at a later time by either calling the `serve()` or
   * `start()` methods. If the queue has started serving (i.e., `start()` was already called),
   * then the callback will be invoked immediately.
   *
   * @param key - Uniquely identifies this callback so duplicates are ignored.
   * @param callback - The function to call when this item in the queue is being served.
   */
  n(key2, callback) {
    if (this.Qe) {
      callback();
      return;
    }
    this.Pe.delete(key2);
    this.Pe.set(key2, callback);
  }
  /**
   * Invokes the callback with the given `key` in the queue (if it exists).
   */
  Ue(key2) {
    var _a3;
    (_a3 = this.Pe.get(key2)) == null ? void 0 : _a3();
    this.Pe.delete(key2);
  }
  /**
   * Flush all queued items and start serving future requests immediately until `stop()` is called.
   */
  J() {
    this.Se();
    this.Qe = true;
    if (this.Pe.size > 0)
      this.Se();
  }
  /**
   * Stop serving requests, they'll be queued until you begin processing again by calling `start()`.
   */
  K() {
    this.Qe = false;
  }
  /**
   * Stop serving requests, empty the request queue, and release any promises waiting for the
   * queue to flush.
   */
  Ye() {
    this.K();
    this.Pe.clear();
    this.Te();
  }
  Se() {
    for (const key2 of this.Pe.keys())
      this.Ue(key2);
    this.Te();
  }
  Te() {
    this.Re.resolve();
    this.Re = deferredPromise();
  }
}
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key2, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key2) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key2, result) : decorator(result)) || result;
  if (kind && result)
    __defProp2(target, key2, result);
  return result;
};
class Player extends Component {
  constructor(instance) {
    super(instance);
    __publicField(this, "k");
    __publicField(this, "o");
    __publicField(this, "l");
    __publicField(this, "m", new RequestQueue());
    __publicField(this, "orientation");
    this.r();
    new MediaStoreSync(instance);
    const context = {
      player: null,
      scope: getScope(),
      qualities: new VideoQualityList(),
      audioTracks: new AudioTrackList(),
      $provider: signal(null),
      $props: this.$props,
      $store: this.$store
    };
    context.remote = new MediaRemoteControl(void 0);
    context.$iosControls = computed(this.s.bind(this));
    context.textTracks = new TextTrackList();
    context.textTracks[TEXT_TRACK_CROSSORIGIN] = this.$props.crossorigin;
    context.textRenderers = new TextRenderers(context);
    context.ariaKeys = {};
    this.k = context;
    provideContext(mediaContext, context);
    this.orientation = new ScreenOrientationController(instance);
    new FocusVisibleController(instance);
    new MediaKeyboardController(instance, context);
    new ThumbnailsLoader(instance);
    const request = new MediaRequestContext();
    this.o = new MediaStateManager(instance, request, context);
    this.l = new MediaRequestManager(instance, this.o, request, context);
    context.delegate = new MediaPlayerDelegate(
      this.o.I.bind(this.o),
      context
    );
    new MediaLoadController(instance, this.startLoading.bind(this));
  }
  get j() {
    return this.k.$provider();
  }
  onAttach(el) {
    el.setAttribute("tabindex", "0");
    setAttributeIfEmpty(el, "role", "region");
    effect(this.t.bind(this));
    effect(this.u.bind(this));
    effect(this.v.bind(this));
    effect(this.w.bind(this));
    effect(this.x.bind(this));
    effect(this.y.bind(this));
    effect(this.z.bind(this));
    effect(this.A.bind(this));
    effect(this.B.bind(this));
    this.C();
    this.D();
    this.k.player = el;
    this.k.remote.setTarget(el);
    this.k.remote.setPlayer(el);
    listenEvent(el, "find-media-player", this.E.bind(this));
  }
  onConnect(el) {
    if (IS_IPHONE)
      setAttribute(el, "data-iphone", "");
    const pointerQuery = window.matchMedia("(pointer: coarse)");
    this.q(pointerQuery);
    pointerQuery.onchange = this.q.bind(this);
    const resize = new ResizeObserver(this.p.bind(this));
    resize.observe(el);
    effect(this.p.bind(this));
    this.dispatch("media-player-connect", {
      detail: this.el,
      bubbles: true,
      composed: true
    });
    return () => {
      resize.disconnect();
      pointerQuery.onchange = null;
    };
  }
  r() {
    var _a3;
    const providedProps = {
      viewType: "providedViewType",
      streamType: "providedStreamType"
    };
    for (const prop2 of Object.keys(this.$props)) {
      (_a3 = this.$store[providedProps[prop2] ?? prop2]) == null ? void 0 : _a3.set(this.$props[prop2]());
    }
    effect(this.F.bind(this));
    this.$store.muted.set(this.$props.muted() || this.$props.volume() === 0);
  }
  t() {
    var _a3, _b2, _c2;
    const { title } = this.$props, { live, viewType } = this.$store, isLive = live(), type = uppercaseFirstChar(viewType()), typeText = type !== "Unknown" ? `${isLive ? "Live " : ""}${type}` : isLive ? "Live" : "Media";
    const newTitle = title();
    if (newTitle) {
      (_a3 = this.el) == null ? void 0 : _a3.setAttribute("data-title", newTitle);
      (_b2 = this.el) == null ? void 0 : _b2.removeAttribute("title");
    }
    const currentTitle = ((_c2 = this.el) == null ? void 0 : _c2.getAttribute("data-title")) || "";
    this.$store.title.set(currentTitle);
    setAttribute(
      this.el,
      "aria-label",
      currentTitle ? `${typeText} - ${currentTitle}` : typeText + " Player"
    );
  }
  u() {
    const orientation = this.orientation.landscape ? "landscape" : "portrait";
    this.$store.orientation.set(orientation);
    setAttribute(this.el, "data-orientation", orientation);
    this.p();
  }
  v() {
    if (this.$store.canPlay() && this.j)
      this.m.J();
    else
      this.m.K();
  }
  F() {
    this.$store.providedViewType.set(this.$props.viewType());
    this.$store.providedStreamType.set(this.$props.streamType());
  }
  C() {
    const $attrs = {
      "aspect-ratio": this.$props.aspectRatio,
      "data-captions": () => {
        const track = this.$store.textTrack();
        return !!track && isTrackCaptionKind(track);
      },
      "data-ios-controls": this.k.$iosControls
    };
    const mediaAttrName = {
      canPictureInPicture: "can-pip",
      pictureInPicture: "pip"
    };
    for (const prop2 of MEDIA_ATTRIBUTES) {
      const attrName = "data-" + (mediaAttrName[prop2] ?? camelToKebabCase(prop2));
      $attrs[attrName] = this.$store[prop2];
    }
    delete $attrs.title;
    this.setAttributes($attrs);
  }
  D() {
    this.setCSSVars({
      "--media-aspect-ratio": () => {
        const ratio = this.$props.aspectRatio();
        return ratio ? +ratio.toFixed(4) : null;
      }
    });
  }
  E(event) {
    event.detail(this.el);
  }
  p() {
    if (!this.el)
      return;
    const width = this.el.clientWidth, height = this.el.clientHeight, { smallBreakpointX, smallBreakpointY, largeBreakpointX, largeBreakpointY } = this.$props, bpx = width < smallBreakpointX() ? "sm" : width < largeBreakpointX() ? "md" : "lg", bpy = height < smallBreakpointY() ? "sm" : height < largeBreakpointY() ? "md" : "lg";
    this.$store.breakpointX.set(bpx);
    this.$store.breakpointY.set(bpy);
    setAttribute(this.el, "data-bp-x", bpx);
    setAttribute(this.el, "data-bp-y", bpy);
  }
  q(queryList) {
    const isTouch = queryList.matches;
    setAttribute(this.el, "data-touch", isTouch);
    this.$store.touchPointer.set(isTouch);
    this.p();
  }
  s() {
    return !canFullscreen() && this.$store.mediaType() === "video" && (this.$store.controls() && !this.$props.playsinline() || this.$store.fullscreen());
  }
  get provider() {
    return this.j;
  }
  get user() {
    return this.l.L;
  }
  get qualities() {
    return this.k.qualities;
  }
  get audioTracks() {
    return this.k.audioTracks;
  }
  get textTracks() {
    return this.k.textTracks;
  }
  get textRenderers() {
    return this.k.textRenderers;
  }
  get paused() {
    var _a3;
    return ((_a3 = this.j) == null ? void 0 : _a3.paused) ?? true;
  }
  set paused(paused) {
    if (paused) {
      this.m.n("paused", () => this.l.G());
    } else
      this.m.n("paused", () => this.l.H());
  }
  x() {
    this.paused = this.$props.paused();
  }
  get muted() {
    var _a3;
    return ((_a3 = this.j) == null ? void 0 : _a3.muted) ?? false;
  }
  set muted(muted) {
    this.m.n("muted", () => this.j.muted = muted);
  }
  w() {
    this.muted = this.$props.muted();
  }
  get currentTime() {
    var _a3;
    return ((_a3 = this.j) == null ? void 0 : _a3.currentTime) ?? 0;
  }
  set currentTime(time) {
    this.m.n("currentTime", () => {
      const adapter = this.j;
      if (time !== adapter.currentTime) {
        peek(() => {
          const boundTime = Math.min(
            Math.max(this.$store.seekableStart() + 0.1, time),
            this.$store.seekableEnd() - 0.1
          );
          if (Number.isFinite(boundTime))
            adapter.currentTime = boundTime;
        });
      }
    });
  }
  z() {
    this.currentTime = this.$props.currentTime();
  }
  get volume() {
    var _a3;
    return ((_a3 = this.j) == null ? void 0 : _a3.volume) ?? 1;
  }
  set volume(volume) {
    this.m.n("volume", () => this.j.volume = volume);
  }
  y() {
    this.volume = clampNumber(0, this.$props.volume(), 1);
  }
  get playsinline() {
    var _a3;
    return ((_a3 = this.j) == null ? void 0 : _a3.playsinline) ?? false;
  }
  set playsinline(inline) {
    this.m.n("playsinline", () => this.j.playsinline = inline);
  }
  A() {
    this.playsinline = this.$props.playsinline();
  }
  get playbackRate() {
    var _a3;
    return ((_a3 = this.j) == null ? void 0 : _a3.playbackRate) ?? 1;
  }
  set playbackRate(rate) {
    this.m.n("rate", () => this.j.playbackRate = rate);
  }
  B() {
    this.playbackRate = this.$props.playbackRate();
  }
  async play() {
    return this.l.H();
  }
  async pause() {
    return this.l.G();
  }
  async enterFullscreen(target) {
    return this.l.M(target);
  }
  async exitFullscreen(target) {
    return this.l.N(target);
  }
  enterPictureInPicture() {
    return this.l.O();
  }
  exitPictureInPicture() {
    return this.l.P();
  }
  seekToLiveEdge() {
    this.l.Q();
  }
  startLoading() {
    this.k.delegate.R("can-load");
  }
  destroy() {
    this.dispatch("destroy");
  }
}
__publicField(Player, "el", defineElement({
  tagName: "media-player",
  props: mediaPlayerProps,
  store: MediaStoreFactory
}));
__decorateClass([
  prop
], Player.prototype, "provider", 1);
__decorateClass([
  prop
], Player.prototype, "user", 1);
__decorateClass([
  prop
], Player.prototype, "orientation", 2);
__decorateClass([
  prop
], Player.prototype, "qualities", 1);
__decorateClass([
  prop
], Player.prototype, "audioTracks", 1);
__decorateClass([
  prop
], Player.prototype, "textTracks", 1);
__decorateClass([
  prop
], Player.prototype, "textRenderers", 1);
__decorateClass([
  prop
], Player.prototype, "paused", 1);
__decorateClass([
  prop
], Player.prototype, "muted", 1);
__decorateClass([
  prop
], Player.prototype, "currentTime", 1);
__decorateClass([
  prop
], Player.prototype, "volume", 1);
__decorateClass([
  prop
], Player.prototype, "playsinline", 1);
__decorateClass([
  prop
], Player.prototype, "playbackRate", 1);
__decorateClass([
  method
], Player.prototype, "play", 1);
__decorateClass([
  method
], Player.prototype, "pause", 1);
__decorateClass([
  method
], Player.prototype, "enterFullscreen", 1);
__decorateClass([
  method
], Player.prototype, "exitFullscreen", 1);
__decorateClass([
  method
], Player.prototype, "enterPictureInPicture", 1);
__decorateClass([
  method
], Player.prototype, "exitPictureInPicture", 1);
__decorateClass([
  method
], Player.prototype, "seekToLiveEdge", 1);
__decorateClass([
  method
], Player.prototype, "startLoading", 1);
function getUIComponents() {
  return [
    Poster,
    BufferingIndicator,
    Tooltip,
    Thumbnail,
    PlayButton$1,
    MuteButton$1,
    PIPButton,
    FullscreenButton$1,
    CaptionButton$1,
    SeekButton$1,
    Slider,
    TimeSlider$1,
    VolumeSlider$1,
    SliderThumbnail,
    SliderValue,
    SliderVideo,
    Time,
    ToggleButton,
    LiveIndicator,
    Captions,
    Gesture,
    Menu,
    MenuButton,
    MenuItems,
    RadioGroup,
    Radio,
    AudioMenuButton,
    AudioMenuItems,
    CaptionsMenuButton,
    CaptionsMenuItems,
    ChaptersMenuItems,
    QualityMenuButton,
    QualityMenuItems,
    PlaybackRateMenuButton,
    PlaybackRateMenuItems
  ];
}
var Icon$15 = `<path d="M16.6927 25.3346C16.3245 25.3346 16.026 25.0361 16.026 24.6679L16.026 7.3346C16.026 6.96641 16.3245 6.66794 16.6927 6.66794L18.6927 6.66794C19.0609 6.66794 19.3594 6.96642 19.3594 7.3346L19.3594 24.6679C19.3594 25.0361 19.0609 25.3346 18.6927 25.3346H16.6927Z" fill="currentColor"/> <path d="M24.026 25.3346C23.6578 25.3346 23.3594 25.0361 23.3594 24.6679L23.3594 7.3346C23.3594 6.96641 23.6578 6.66794 24.026 6.66794L26.026 6.66794C26.3942 6.66794 26.6927 6.96642 26.6927 7.3346V24.6679C26.6927 25.0361 26.3942 25.3346 26.026 25.3346H24.026Z" fill="currentColor"/> <path d="M5.48113 23.9407C5.38584 24.2963 5.59689 24.6619 5.95254 24.7572L7.88439 25.2748C8.24003 25.3701 8.60559 25.159 8.70089 24.8034L13.1871 8.06067C13.2824 7.70503 13.0713 7.33947 12.7157 7.24417L10.7838 6.72654C10.4282 6.63124 10.0626 6.8423 9.96733 7.19794L5.48113 23.9407Z" fill="currentColor"/>`;
var Icon$74 = `<path d="M16.6667 10.3452C16.6667 10.8924 16.0439 11.2066 15.6038 10.8814L11.0766 7.5364C10.7159 7.26993 10.7159 6.73054 11.0766 6.46405L15.6038 3.11873C16.0439 2.79356 16.6667 3.10773 16.6667 3.6549V5.22682C16.6667 5.29746 16.7223 5.35579 16.7927 5.36066C22.6821 5.76757 27.3333 10.674 27.3333 16.6667C27.3333 22.9259 22.2592 28 16 28C9.96483 28 5.03145 23.2827 4.68601 17.3341C4.66466 16.9665 4.96518 16.6673 5.33339 16.6673H7.3334C7.70157 16.6673 7.99714 16.9668 8.02743 17.3337C8.36638 21.4399 11.8064 24.6667 16 24.6667C20.4183 24.6667 24 21.085 24 16.6667C24 12.5225 20.8483 9.11428 16.8113 8.70739C16.7337 8.69957 16.6667 8.76096 16.6667 8.83893V10.3452Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0879 19.679C17.4553 19.9195 17.8928 20.0398 18.4004 20.0398C18.9099 20.0398 19.3474 19.9205 19.7129 19.6818C20.0803 19.4413 20.3635 19.0938 20.5623 18.6392C20.7612 18.1847 20.8606 17.6373 20.8606 16.9972C20.8625 16.3608 20.764 15.8192 20.5652 15.3722C20.3663 14.9252 20.0822 14.5853 19.7129 14.3523C19.3455 14.1175 18.908 14 18.4004 14C17.8928 14 17.4553 14.1175 17.0879 14.3523C16.7224 14.5853 16.4402 14.9252 16.2413 15.3722C16.0443 15.8173 15.9449 16.3589 15.943 16.9972C15.9411 17.6354 16.0396 18.1818 16.2385 18.6364C16.4373 19.089 16.7205 19.4366 17.0879 19.679ZM19.1362 18.4262C18.9487 18.7349 18.7034 18.8892 18.4004 18.8892C18.1996 18.8892 18.0226 18.8211 17.8691 18.6847C17.7157 18.5464 17.5964 18.3372 17.5112 18.0568C17.4279 17.7765 17.3871 17.4233 17.389 16.9972C17.3909 16.3684 17.4847 15.9025 17.6703 15.5995C17.8559 15.2945 18.0993 15.1421 18.4004 15.1421C18.603 15.1421 18.7801 15.2093 18.9316 15.3438C19.0832 15.4782 19.2015 15.6828 19.2868 15.9574C19.372 16.2301 19.4146 16.5767 19.4146 16.9972C19.4165 17.6392 19.3237 18.1156 19.1362 18.4262Z" fill="currentColor"/> <path d="M13.7746 19.8978C13.8482 19.8978 13.9079 19.8381 13.9079 19.7644V14.2129C13.9079 14.1393 13.8482 14.0796 13.7746 14.0796H12.642C12.6171 14.0796 12.5927 14.0865 12.5716 14.0997L11.2322 14.9325C11.1931 14.9568 11.1693 14.9996 11.1693 15.0457V15.9497C11.1693 16.0539 11.2833 16.1178 11.3722 16.0635L12.464 15.396C12.4682 15.3934 12.473 15.3921 12.4779 15.3921C12.4926 15.3921 12.5045 15.404 12.5045 15.4187V19.7644C12.5045 19.8381 12.5642 19.8978 12.6378 19.8978H13.7746Z" fill="currentColor"/>`;
var Icon$78 = `<path d="M15.3333 10.3452C15.3333 10.8924 15.9561 11.2066 16.3962 10.8814L20.9234 7.5364C21.2841 7.26993 21.2841 6.73054 20.9235 6.46405L16.3962 3.11873C15.9561 2.79356 15.3333 3.10773 15.3333 3.6549V5.22682C15.3333 5.29746 15.2778 5.35579 15.2073 5.36066C9.31791 5.76757 4.66667 10.674 4.66667 16.6667C4.66667 22.9259 9.74078 28 16 28C22.0352 28 26.9686 23.2827 27.314 17.3341C27.3354 16.9665 27.0348 16.6673 26.6666 16.6673H24.6666C24.2984 16.6673 24.0029 16.9668 23.9726 17.3337C23.6336 21.4399 20.1937 24.6667 16 24.6667C11.5817 24.6667 8 21.085 8 16.6667C8 12.5225 11.1517 9.11428 15.1887 8.70739C15.2663 8.69957 15.3333 8.76096 15.3333 8.83893V10.3452Z" fill="currentColor"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0879 19.679C17.4553 19.9195 17.8928 20.0398 18.4004 20.0398C18.9099 20.0398 19.3474 19.9205 19.7129 19.6818C20.0803 19.4413 20.3635 19.0938 20.5623 18.6392C20.7612 18.1847 20.8606 17.6373 20.8606 16.9972C20.8625 16.3608 20.764 15.8192 20.5652 15.3722C20.3663 14.9252 20.0822 14.5853 19.7129 14.3523C19.3455 14.1175 18.908 14 18.4004 14C17.8928 14 17.4553 14.1175 17.0879 14.3523C16.7224 14.5853 16.4402 14.9252 16.2413 15.3722C16.0443 15.8173 15.9449 16.3589 15.943 16.9972C15.9411 17.6354 16.0396 18.1818 16.2385 18.6364C16.4373 19.089 16.7205 19.4366 17.0879 19.679ZM19.1362 18.4262C18.9487 18.7349 18.7034 18.8892 18.4004 18.8892C18.1996 18.8892 18.0225 18.8211 17.8691 18.6847C17.7157 18.5464 17.5964 18.3372 17.5112 18.0568C17.4278 17.7765 17.3871 17.4233 17.389 16.9972C17.3909 16.3684 17.4847 15.9025 17.6703 15.5995C17.8559 15.2945 18.0992 15.1421 18.4004 15.1421C18.603 15.1421 18.7801 15.2093 18.9316 15.3438C19.0831 15.4782 19.2015 15.6828 19.2867 15.9574C19.372 16.2301 19.4146 16.5767 19.4146 16.9972C19.4165 17.6392 19.3237 18.1156 19.1362 18.4262Z" fill="currentColor"/> <path d="M13.7746 19.8978C13.8482 19.8978 13.9079 19.8381 13.9079 19.7644V14.2129C13.9079 14.1393 13.8482 14.0796 13.7746 14.0796H12.642C12.6171 14.0796 12.5927 14.0865 12.5716 14.0997L11.2322 14.9325C11.1931 14.9568 11.1693 14.9996 11.1693 15.0457V15.9497C11.1693 16.0539 11.2833 16.1178 11.3722 16.0635L12.464 15.396C12.4682 15.3934 12.473 15.3921 12.4779 15.3921C12.4926 15.3921 12.5045 15.404 12.5045 15.4187V19.7644C12.5045 19.8381 12.5642 19.8978 12.6378 19.8978H13.7746Z" fill="currentColor"/>`;
var Icon$85 = `<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5722 5.33333C13.2429 5.33333 12.9629 5.57382 12.9132 5.89938L12.4063 9.21916C12.4 9.26058 12.3746 9.29655 12.3378 9.31672C12.2387 9.37118 12.1409 9.42779 12.0444 9.48648C12.0086 9.5083 11.9646 9.51242 11.9255 9.49718L8.79572 8.27692C8.48896 8.15732 8.14083 8.27958 7.9762 8.56472L5.5491 12.7686C5.38444 13.0538 5.45271 13.4165 5.70981 13.6223L8.33308 15.7225C8.3658 15.7487 8.38422 15.7887 8.38331 15.8306C8.38209 15.8867 8.38148 15.9429 8.38148 15.9993C8.38148 16.0558 8.3821 16.1121 8.38332 16.1684C8.38423 16.2102 8.36582 16.2503 8.33313 16.2765L5.7103 18.3778C5.45334 18.5836 5.38515 18.9462 5.54978 19.2314L7.97688 23.4352C8.14155 23.7205 8.48981 23.8427 8.79661 23.723L11.926 22.5016C11.9651 22.4864 12.009 22.4905 12.0449 22.5123C12.1412 22.5709 12.2388 22.6274 12.3378 22.6818C12.3745 22.7019 12.4 22.7379 12.4063 22.7793L12.9132 26.0993C12.9629 26.4249 13.2429 26.6654 13.5722 26.6654H18.4264C18.7556 26.6654 19.0356 26.425 19.0854 26.0995L19.5933 22.7801C19.5997 22.7386 19.6252 22.7027 19.6619 22.6825C19.7614 22.6279 19.8596 22.5711 19.9564 22.5121C19.9923 22.4903 20.0362 22.4862 20.0754 22.5015L23.2035 23.7223C23.5103 23.842 23.8585 23.7198 24.0232 23.4346L26.4503 19.2307C26.6149 18.9456 26.5467 18.583 26.2898 18.3771L23.6679 16.2766C23.6352 16.2504 23.6168 16.2104 23.6177 16.1685C23.619 16.1122 23.6196 16.0558 23.6196 15.9993C23.6196 15.9429 23.619 15.8866 23.6177 15.8305C23.6168 15.7886 23.6353 15.7486 23.668 15.7224L26.2903 13.623C26.5474 13.4172 26.6156 13.0544 26.451 12.7692L24.0239 8.56537C23.8592 8.28023 23.5111 8.15797 23.2043 8.27757L20.0758 9.49734C20.0367 9.51258 19.9927 9.50846 19.9569 9.48664C19.8599 9.42762 19.7616 9.37071 19.6618 9.31596C19.6251 9.2958 19.5997 9.25984 19.5933 9.21843L19.0854 5.89915C19.0356 5.57369 18.7556 5.33333 18.4264 5.33333H13.5722ZM16.0001 20.2854C18.3672 20.2854 20.2862 18.3664 20.2862 15.9993C20.2862 13.6322 18.3672 11.7132 16.0001 11.7132C13.6329 11.7132 11.714 13.6322 11.714 15.9993C11.714 18.3664 13.6329 20.2854 16.0001 20.2854Z" fill="currentColor"/>`;
function i18n(translations, key2) {
  var _a3;
  return ((_a3 = translations()) == null ? void 0 : _a3[key2]) ?? key2;
}
const communitySkinContext = createContext();
function useCommunitySkin() {
  return useContext(communitySkinContext);
}
function useCommunitySkinI18n() {
  return useCommunitySkin().$props.translations;
}
const $$_templ$2 = /* @__PURE__ */ $$_create_template(`<media-play-button default-appearance="" mk-d><media-tooltip mk-d><span slot="play"></span><span slot="pause"></span></media-tooltip></media-play-button>`), $$_templ_2$2 = /* @__PURE__ */ $$_create_template(`<media-mute-button default-appearance="" mk-d><media-tooltip mk-d><span slot="mute"></span><span slot="unmute"></span></media-tooltip></media-mute-button>`), $$_templ_3 = /* @__PURE__ */ $$_create_template(`<media-caption-button default-appearance="" mk-d><media-tooltip mk-d><span slot="on"></span><span slot="off"></span></media-tooltip></media-caption-button>`), $$_templ_4 = /* @__PURE__ */ $$_create_template(`<media-pip-button default-appearance="" mk-d><media-tooltip mk-d><span slot="enter"></span><span slot="exit"></span></media-tooltip></media-pip-button>`), $$_templ_5 = /* @__PURE__ */ $$_create_template(`<media-fullscreen-button default-appearance="" mk-d><media-tooltip position="top right" mk-d><span slot="enter"></span><span slot="exit"></span></media-tooltip></media-fullscreen-button>`), $$_templ_6 = /* @__PURE__ */ $$_create_template(`<media-seek-button mk-d><media-tooltip mk-d><span></span></media-tooltip></media-seek-button>`), $$_templ_7 = /* @__PURE__ */ $$_create_template(`<media-volume-slider mk-d><media-slider-value type="pointer" format="percent" slot="preview" mk-d></media-slider-value></media-volume-slider>`), $$_templ_8 = /* @__PURE__ */ $$_create_template(`<span part="main-title"></span>`), $$_templ_9 = $$_templ_8, $$_templ_10 = /* @__PURE__ */ $$_create_template(`<media-menu part="chapters-menu" mk-d><media-menu-button mk-d><media-tooltip mk-d></media-tooltip></media-menu-button><media-chapters-menu-items mk-d></media-chapters-menu-items></media-menu>`), $$_templ_11 = /* @__PURE__ */ $$_create_template(`<media-menu part="settings-menu" mk-d><media-menu-button mk-d><media-tooltip mk-d></media-tooltip></media-menu-button><media-menu-items mk-d><media-menu mk-d><media-audio-menu-button mk-d></media-audio-menu-button><media-audio-menu-items mk-d></media-audio-menu-items></media-menu><media-menu mk-d><media-playback-rate-menu-button mk-d></media-playback-rate-menu-button><media-playback-rate-menu-items mk-d></media-playback-rate-menu-items></media-menu><media-menu mk-d><media-quality-menu-button mk-d></media-quality-menu-button><media-quality-menu-items mk-d></media-quality-menu-items></media-menu><media-menu mk-d><media-captions-menu-button mk-d></media-captions-menu-button><media-captions-menu-items mk-d></media-captions-menu-items></media-menu></media-menu-items></media-menu>`), $$_templ_12 = /* @__PURE__ */ $$_create_template(`<div part="gestures"><media-gesture event="pointerup" action="toggle:paused" mk-d></media-gesture><media-gesture event="pointerup" action="toggle:user-idle" mk-d></media-gesture><media-gesture event="dblpointerup" action="toggle:fullscreen" mk-d></media-gesture><media-gesture event="dblpointerup" action="seek:-10" mk-d></media-gesture><media-gesture event="dblpointerup" action="seek:10" mk-d></media-gesture></div>`), $$_templ_13 = /* @__PURE__ */ $$_create_template(`<media-time-slider mk-d><div slot="preview"><media-slider-thumbnail mk-d></media-slider-thumbnail><div part="chapter-title"></div><media-slider-value type="pointer" format="time" mk-d></media-slider-value></div></media-time-slider>`), $$_templ_14 = /* @__PURE__ */ $$_create_template(`<div part="time-group"><media-time type="current" mk-d></media-time><div part="time-divider">/</div><media-time type="duration" mk-d></media-time></div>`);
function PlayButton({
  part,
  tooltip = "top left"
}) {
  const lang = useCommunitySkinI18n();
  return (() => {
    const $$_root = $$_clone($$_templ$2), $$_el = $$_root.firstChild, $$_el_2 = $$_el.firstChild, $$_el_3 = $$_el_2.nextSibling;
    $$_attr($$_root, "part", part);
    $$_scoped(() => {
      $$_attr($$_el, "position", tooltip);
      $$_scoped(() => {
        $$_insert_lite($$_el_2, () => i18n(lang, "Play"));
        $$_insert_lite($$_el_3, () => i18n(lang, "Pause"));
      }, $$_setup_custom_element($$_el));
    }, $$_setup_custom_element($$_root));
    return $$_root;
  })();
}
function MuteButton({ tooltip = "top center" }) {
  const lang = useCommunitySkinI18n();
  return (() => {
    const $$_root = $$_clone($$_templ_2$2), $$_el = $$_root.firstChild, $$_el_2 = $$_el.firstChild, $$_el_3 = $$_el_2.nextSibling;
    $$_scoped(() => {
      $$_attr($$_el, "position", tooltip);
      $$_scoped(() => {
        $$_insert_lite($$_el_2, () => i18n(lang, "Mute"));
        $$_insert_lite($$_el_3, () => i18n(lang, "Unmute"));
      }, $$_setup_custom_element($$_el));
    }, $$_setup_custom_element($$_root));
    return $$_root;
  })();
}
function CaptionButton({ tooltip = "top center" }) {
  const lang = useCommunitySkinI18n();
  return (() => {
    const $$_root = $$_clone($$_templ_3), $$_el = $$_root.firstChild, $$_el_2 = $$_el.firstChild, $$_el_3 = $$_el_2.nextSibling;
    $$_scoped(() => {
      $$_attr($$_el, "position", tooltip);
      $$_scoped(() => {
        $$_insert_lite($$_el_2, () => i18n(lang, "Closed-Captions On"));
        $$_insert_lite($$_el_3, () => i18n(lang, "Closed-Captions Off"));
      }, $$_setup_custom_element($$_el));
    }, $$_setup_custom_element($$_root));
    return $$_root;
  })();
}
function PiPButton() {
  const lang = useCommunitySkinI18n();
  return (() => {
    const $$_root = $$_clone($$_templ_4), $$_el = $$_root.firstChild, $$_el_2 = $$_el.firstChild, $$_el_3 = $$_el_2.nextSibling;
    $$_scoped(() => {
      $$_scoped(() => {
        $$_insert_lite($$_el_2, () => i18n(lang, "Enter PiP"));
        $$_insert_lite($$_el_3, () => i18n(lang, "Exit PiP"));
      }, $$_setup_custom_element($$_el));
    }, $$_setup_custom_element($$_root));
    return $$_root;
  })();
}
function FullscreenButton() {
  const lang = useCommunitySkinI18n();
  return (() => {
    const $$_root = $$_clone($$_templ_5), $$_el = $$_root.firstChild, $$_el_2 = $$_el.firstChild, $$_el_3 = $$_el_2.nextSibling;
    $$_scoped(() => {
      $$_scoped(() => {
        $$_insert_lite($$_el_2, () => i18n(lang, "Enter Fullscreen"));
        $$_insert_lite($$_el_3, () => i18n(lang, "Exit Fullscreen"));
      }, $$_setup_custom_element($$_el));
    }, $$_setup_custom_element($$_root));
    return $$_root;
  })();
}
function SeekButton({
  seconds,
  tooltip = "top center"
}) {
  const lang = useCommunitySkinI18n();
  return (() => {
    const $$_root = $$_clone($$_templ_6), $$_el = $$_root.firstChild, $$_el_2 = $$_el.firstChild;
    $$_attr($$_root, "seconds", seconds);
    $$_scoped(() => {
      $$_insert_lite(
        $$_root,
        $$_create_component(Icon, { paths: seconds >= 0 ? Icon$78 : Icon$74 }),
        $$_el
      );
      $$_attr($$_el, "position", tooltip);
      $$_scoped(() => {
        $$_insert_lite($$_el_2, () => i18n(lang, seconds >= 0 ? "Seek Forward" : "Seek Backward"));
      }, $$_setup_custom_element($$_el));
    }, $$_setup_custom_element($$_root));
    return $$_root;
  })();
}
function VolumeSlider() {
  return (() => {
    const $$_root = $$_clone($$_templ_7), $$_el = $$_root.firstChild;
    $$_scoped(() => {
      $$_setup_custom_element($$_el);
    }, $$_setup_custom_element($$_root));
    return $$_root;
  })();
}
function ChapterTitleOrMainTitle() {
  const {
    $media: { title, textTracks, started }
  } = useCommunitySkin();
  const chapterTitle = signal(""), mainTitle = computed(() => started() ? chapterTitle() || title() : title());
  effect(() => {
    const track = textTracks().find(
      (track2) => track2.kind === "chapters" && track2.mode === "showing"
    );
    track && listenEvent(track, "cue-change", () => {
      var _a3;
      chapterTitle.set(((_a3 = track.activeCues[0]) == null ? void 0 : _a3.text) || "");
    });
    return () => chapterTitle.set("");
  });
  return (() => {
    const $$_root = $$_clone($$_templ_9);
    $$_insert_lite($$_root, mainTitle);
    return $$_root;
  })();
}
function ChaptersMenu({
  position = "bottom",
  tooltip = "bottom center"
}) {
  const lang = useCommunitySkinI18n();
  return (() => {
    const $$_root = $$_clone($$_templ_10), $$_el = $$_root.firstChild, $$_el_2 = $$_el.firstChild, $$_el_3 = $$_el.nextSibling;
    $$_attr($$_root, "position", position);
    $$_scoped(() => {
      $$_scoped(() => {
        $$_insert_lite($$_el, $$_create_component(Icon, { paths: Icon$15 }), $$_el_2);
        $$_attr($$_el_2, "position", tooltip);
        $$_scoped(() => {
          $$_insert_lite($$_el_2, () => i18n(lang, "Chapters"));
        }, $$_setup_custom_element($$_el_2));
      }, $$_setup_custom_element($$_el));
      $$_setup_custom_element($$_el_3);
    }, $$_setup_custom_element($$_root));
    return $$_root;
  })();
}
function SettingsMenu({
  position = "bottom",
  tooltip = "bottom right"
}) {
  const lang = useCommunitySkinI18n();
  return (() => {
    const $$_root = $$_clone($$_templ_11), $$_el = $$_root.firstChild, $$_el_2 = $$_el.firstChild, $$_el_3 = $$_el.nextSibling, $$_el_4 = $$_el_3.firstChild, $$_el_5 = $$_el_4.firstChild, $$_el_6 = $$_el_5.nextSibling, $$_el_7 = $$_el_4.nextSibling, $$_el_8 = $$_el_7.firstChild, $$_el_9 = $$_el_8.nextSibling, $$_el_10 = $$_el_7.nextSibling, $$_el_11 = $$_el_10.firstChild, $$_el_12 = $$_el_11.nextSibling, $$_el_13 = $$_el_10.nextSibling, $$_el_14 = $$_el_13.firstChild, $$_el_15 = $$_el_14.nextSibling;
    $$_attr($$_root, "position", position);
    $$_scoped(() => {
      $$_scoped(() => {
        $$_insert_lite($$_el, $$_create_component(Icon, { paths: Icon$85, rotate: true }), $$_el_2);
        $$_attr($$_el_2, "position", tooltip);
        $$_scoped(() => {
          $$_insert_lite($$_el_2, () => i18n(lang, "Settings"));
        }, $$_setup_custom_element($$_el_2));
      }, $$_setup_custom_element($$_el));
      $$_scoped(() => {
        $$_scoped(() => {
          $$_setup_custom_element($$_el_5, { label: () => i18n(lang, "Audio") });
          $$_setup_custom_element($$_el_6, { emptyLabel: () => i18n(lang, "Default") });
        }, $$_setup_custom_element($$_el_4));
        $$_scoped(() => {
          $$_setup_custom_element($$_el_8, { label: () => i18n(lang, "Speed") });
          $$_setup_custom_element($$_el_9, { normalLabel: () => i18n(lang, "Normal") });
        }, $$_setup_custom_element($$_el_7));
        $$_scoped(() => {
          $$_setup_custom_element($$_el_11, { label: () => i18n(lang, "Quality") });
          $$_setup_custom_element($$_el_12, { autoLabel: () => i18n(lang, "Auto") });
        }, $$_setup_custom_element($$_el_10));
        $$_scoped(() => {
          $$_setup_custom_element($$_el_14, { label: () => i18n(lang, "Captions") });
          $$_setup_custom_element($$_el_15, { offLabel: () => i18n(lang, "Off") });
        }, $$_setup_custom_element($$_el_13));
      }, $$_setup_custom_element($$_el_3));
    }, $$_setup_custom_element($$_root));
    return $$_root;
  })();
}
function VideoGestures() {
  return (() => {
    const $$_root = $$_clone($$_templ_12), $$_el = $$_root.firstChild, $$_el_2 = $$_el.nextSibling, $$_el_3 = $$_el_2.nextSibling, $$_el_4 = $$_el_3.nextSibling, $$_el_5 = $$_el_4.nextSibling;
    $$_setup_custom_element($$_el);
    $$_setup_custom_element($$_el_2);
    $$_setup_custom_element($$_el_3);
    $$_setup_custom_element($$_el_4);
    $$_setup_custom_element($$_el_5);
    return $$_root;
  })();
}
function TimeSlider() {
  return (() => {
    const $$_root = $$_clone($$_templ_13), $$_el = $$_root.firstChild, $$_el_2 = $$_el.firstChild, $$_el_3 = $$_el_2.nextSibling, $$_el_4 = $$_el_3.nextSibling;
    $$_scoped(() => {
      $$_setup_custom_element($$_el_2);
      $$_setup_custom_element($$_el_4);
    }, $$_setup_custom_element($$_root));
    return $$_root;
  })();
}
function TimeGroup() {
  return (() => {
    const $$_root = $$_clone($$_templ_14), $$_el = $$_root.firstChild, $$_el_2 = $$_el.nextSibling, $$_el_3 = $$_el_2.nextSibling;
    $$_setup_custom_element($$_el);
    $$_setup_custom_element($$_el_3);
    return $$_root;
  })();
}
const $$_templ$1 = /* @__PURE__ */ $$_create_template(`<div part="media-ui aod live:dvr mobile"><media-captions mk-d></media-captions><div part="controls"><div part="controls-group"></div><div part="controls-group"></div><div part="controls-group"><media-time type="current" mk-d></media-time><div part="controls-spacer"></div><media-time type="duration" mk-d></media-time></div><div part="controls-group"><div part="controls-spacer"></div><div part="controls-spacer"></div></div></div></div>`), $$_templ_2$1 = /* @__PURE__ */ $$_create_template(`<div part="media-ui aod live:dvr desktop"><media-captions mk-d></media-captions><div part="controls"><div part="controls-group"></div><div part="controls-group"></div></div></div>`);
function renderAudio(isMobile) {
  return isMobile ? MobileUI$1() : DesktopUI$1();
}
function MobileUI$1() {
  return (() => {
    const $$_root = $$_clone($$_templ$1), $$_el = $$_root.firstChild, $$_el_2 = $$_el.nextSibling, $$_el_3 = $$_el_2.firstChild, $$_el_4 = $$_el_3.nextSibling, $$_el_5 = $$_el_4.nextSibling, $$_el_6 = $$_el_5.firstChild, $$_el_7 = $$_el_6.nextSibling, $$_el_8 = $$_el_7.nextSibling, $$_el_9 = $$_el_5.nextSibling, $$_el_10 = $$_el_9.firstChild, $$_el_11 = $$_el_10.nextSibling;
    $$_setup_custom_element($$_el);
    $$_insert_lite($$_el_3, $$_create_component(MuteButton, { tooltip: "top left" }), null);
    $$_insert_lite($$_el_3, $$_create_component(ChapterTitleOrMainTitle), null);
    $$_insert_lite($$_el_3, $$_create_component(CaptionButton), null);
    $$_insert_lite($$_el_3, $$_create_component(ChaptersMenu, { tooltip: "top center", position: "top" }), null);
    $$_insert_lite($$_el_3, $$_create_component(SettingsMenu, { tooltip: "top right", position: "top" }), null);
    $$_insert_lite($$_el_4, $$_create_component(TimeSlider));
    $$_setup_custom_element($$_el_6);
    $$_setup_custom_element($$_el_8);
    $$_insert_lite($$_el_9, $$_create_component(SeekButton, { seconds: -10, tooltip: "top left" }), $$_el_11);
    $$_insert_lite($$_el_9, $$_create_component(PlayButton, { tooltip: "top center" }), $$_el_11);
    $$_insert_lite($$_el_9, $$_create_component(SeekButton, { seconds: 10 }), $$_el_11);
    return $$_root;
  })();
}
function DesktopUI$1() {
  return (() => {
    const $$_root = $$_clone($$_templ_2$1), $$_el = $$_root.firstChild, $$_el_2 = $$_el.nextSibling, $$_el_3 = $$_el_2.firstChild, $$_el_4 = $$_el_3.nextSibling;
    $$_setup_custom_element($$_el);
    $$_insert_lite($$_el_3, $$_create_component(TimeSlider));
    $$_insert_lite($$_el_4, $$_create_component(SeekButton, { seconds: -10, tooltip: "top left" }), null);
    $$_insert_lite($$_el_4, $$_create_component(PlayButton, { tooltip: "top center" }), null);
    $$_insert_lite($$_el_4, $$_create_component(SeekButton, { seconds: 10 }), null);
    $$_insert_lite($$_el_4, $$_create_component(TimeGroup), null);
    $$_insert_lite($$_el_4, $$_create_component(ChapterTitleOrMainTitle), null);
    $$_insert_lite($$_el_4, $$_create_component(MuteButton, { tooltip: "top center" }), null);
    $$_insert_lite($$_el_4, $$_create_component(VolumeSlider), null);
    $$_insert_lite($$_el_4, $$_create_component(CaptionButton), null);
    $$_insert_lite($$_el_4, $$_create_component(ChaptersMenu, { tooltip: "top center", position: "top" }), null);
    $$_insert_lite($$_el_4, $$_create_component(SettingsMenu, { tooltip: "top right", position: "top" }), null);
    return $$_root;
  })();
}
const $$_templ = /* @__PURE__ */ $$_create_template(`<div part="media-ui vod live:dvr mobile"><media-captions mk-d></media-captions><media-buffering-indicator mk-d></media-buffering-indicator><div part="scrim"></div><div part="controls"><div part="controls-group"><div part="controls-spacer"></div></div><div part="controls-group"></div><div part="controls-group"><div part="controls-spacer"></div></div><div part="controls-group"></div></div><div part="start-duration"><media-time type="duration" mk-d></media-time></div></div>`), $$_templ_2 = /* @__PURE__ */ $$_create_template(`<div part="media-ui vod live:dvr desktop "><media-captions mk-d></media-captions><media-buffering-indicator mk-d></media-buffering-indicator><div part="scrim"></div><div part="controls"><div part="controls-group"><div part="controls-spacer"></div></div><div part="controls-group"></div><div part="controls-group"></div><div part="controls-group"></div></div></div>`);
function renderVideo(isMobile) {
  return isMobile ? MobileUI() : DesktopUI();
}
function MobileUI() {
  return (() => {
    const $$_root = $$_clone($$_templ), $$_el = $$_root.firstChild, $$_el_2 = $$_el.nextSibling, $$_el_3 = $$_el_2.nextSibling, $$_el_4 = $$_el_3.nextSibling, $$_el_5 = $$_el_4.firstChild;
    $$_el_5.firstChild;
    const $$_el_7 = $$_el_5.nextSibling, $$_el_8 = $$_el_7.nextSibling, $$_el_9 = $$_el_8.firstChild, $$_el_10 = $$_el_8.nextSibling, $$_el_11 = $$_el_4.nextSibling, $$_el_12 = $$_el_11.firstChild;
    $$_insert_lite($$_root, $$_create_component(VideoGestures), $$_el);
    $$_setup_custom_element($$_el);
    $$_setup_custom_element($$_el_2);
    $$_insert_lite($$_el_5, $$_create_component(CaptionButton, { tooltip: "bottom center" }), null);
    $$_insert_lite($$_el_5, $$_create_component(ChaptersMenu), null);
    $$_insert_lite($$_el_5, $$_create_component(SettingsMenu, { tooltip: "bottom center" }), null);
    $$_insert_lite($$_el_5, $$_create_component(MuteButton, { tooltip: "bottom right" }), null);
    $$_insert_lite($$_el_7, $$_create_component(PlayButton, { tooltip: "top center" }));
    $$_insert_lite($$_el_8, $$_create_component(TimeGroup), $$_el_9);
    $$_insert_lite($$_el_8, $$_create_component(ChapterTitleOrMainTitle), $$_el_9);
    $$_insert_lite($$_el_8, $$_create_component(FullscreenButton), null);
    $$_insert_lite($$_el_10, $$_create_component(TimeSlider));
    $$_setup_custom_element($$_el_12);
    return $$_root;
  })();
}
function DesktopUI() {
  return (() => {
    const $$_root = $$_clone($$_templ_2), $$_el = $$_root.firstChild, $$_el_2 = $$_el.nextSibling, $$_el_3 = $$_el_2.nextSibling, $$_el_4 = $$_el_3.nextSibling, $$_el_5 = $$_el_4.firstChild;
    $$_el_5.firstChild;
    const $$_el_7 = $$_el_5.nextSibling, $$_el_8 = $$_el_7.nextSibling, $$_el_9 = $$_el_8.nextSibling;
    $$_insert_lite($$_root, $$_create_component(VideoGestures), $$_el);
    $$_setup_custom_element($$_el);
    $$_setup_custom_element($$_el_2);
    $$_insert_lite($$_el_5, $$_create_component(ChaptersMenu), null);
    $$_insert_lite($$_el_5, $$_create_component(SettingsMenu), null);
    $$_insert_lite($$_el_8, $$_create_component(TimeSlider));
    $$_insert_lite($$_el_9, $$_create_component(PlayButton), null);
    $$_insert_lite($$_el_9, $$_create_component(MuteButton), null);
    $$_insert_lite($$_el_9, $$_create_component(VolumeSlider), null);
    $$_insert_lite($$_el_9, $$_create_component(TimeGroup), null);
    $$_insert_lite($$_el_9, $$_create_component(ChapterTitleOrMainTitle), null);
    $$_insert_lite($$_el_9, $$_create_component(CaptionButton), null);
    $$_insert_lite($$_el_9, $$_create_component(PiPButton), null);
    $$_insert_lite($$_el_9, $$_create_component(FullscreenButton), null);
    return $$_root;
  })();
}
class CommunitySkin extends Component {
  constructor(instance) {
    super(instance);
    __publicField(this, "k");
    this.k = useMedia();
    provideContext(communitySkinContext, {
      $props: this.$props,
      $media: this.k.$store
    });
  }
  /** We need this to compute and save the layout type to prevent unnecessary re-renders. */
  Ae() {
    const { viewType, streamType } = this.k.$store;
    return viewType() === "audio" ? streamType().includes("live") ? "audio:live" : "audio" : streamType().endsWith("live") ? "video:live" : "video";
  }
  onAttach() {
    this.setAttributes({
      "data-audio": this.Be.bind(this),
      "data-video": this.Ce.bind(this),
      "data-mobile": this.ze.bind(this)
    });
  }
  Be() {
    const { viewType } = this.k.$store;
    return viewType() === "audio";
  }
  Ce() {
    const { viewType } = this.k.$store;
    return viewType() !== "audio";
  }
  ze() {
    const { breakpointX } = this.k.$store;
    return breakpointX() === "sm";
  }
  render() {
    const $layoutType = computed(this.Ae.bind(this)), $isMobile = computed(this.ze.bind(this));
    return () => {
      const render = $layoutType().startsWith("video") ? renderVideo : renderAudio;
      return render($isMobile());
    };
  }
}
__publicField(CommunitySkin, "el", defineElement({
  tagName: "media-community-skin",
  nohydrate: true,
  props: {
    translations: null
  }
}));
__publicField(CommunitySkin, "register", getUIComponents);
function registerAllElements() {
  [Player, Outlet, ...getUIComponents(), CommunitySkin].map(registerLiteCustomElement);
}
const register = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: registerAllElements
}, Symbol.toStringTag, { value: "Module" }));
export {
  ATTACH_VIDEO as $,
  TEXT_TRACK_ON_MODE_CHANGE as A,
  LIST_ADD as B,
  CaptionsRenderer as C,
  DOMEvent as D,
  ENABLE_AUTO_QUALITY as E,
  isNumber as F,
  camelToKebabCase as G,
  onDispose as H,
  IS_CHROME as I,
  useDisposalBin as J,
  IS_SAFARI as K,
  LIST_SELECT as L,
  isHLSSrc as M,
  getNumberOfDecimalPlaces as N,
  isNil as O,
  ParseError as P,
  LIST_REMOVE as Q,
  setAttribute as R,
  SET_AUTO_QUALITY as S,
  TextCue as T,
  isMediaStream as U,
  VTTCue as V,
  TEXT_TRACK_NATIVE as W,
  TEXT_TRACK_NATIVE_HLS as X,
  canUsePictureInPicture as Y,
  canUseVideoPresentation as Z,
  canPlayHLSNatively as _,
  ParseErrorCode as a,
  register as a0,
  VTTRegion as b,
  createVTTCueTemplate as c,
  parseResponse as d,
  parseText as e,
  parseTextStream as f,
  parseVTTTimestamp as g,
  renderVTTTokensString as h,
  VTTParser as i,
  VTTBlock as j,
  isUndefined as k,
  isString as l,
  coerceToError as m,
  loadScript as n,
  isFunction as o,
  parseByteStream as p,
  isHLSSupported as q,
  renderVTTCueString as r,
  preconnect as s,
  tokenizeVTTCue as t,
  updateTimedVTTCueNodes as u,
  peek as v,
  listenEvent as w,
  effect as x,
  TextTrack as y,
  TEXT_TRACK_READY_STATE as z
};
