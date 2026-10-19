// Reproduce dsh-pocket client entry activation in Node with DOM stubs.
// Goal: capture the exact throw behind "web boot: 1 entry did not activate".
import { readFileSync } from 'node:fs'

const el = () => ({
  setAttribute() {}, removeAttribute() {}, getAttribute() { return null },
  hasAttribute() { return false }, appendChild() {}, remove() {},
  addEventListener() {}, removeEventListener() {}, click() {},
  style: { setProperty() {}, removeProperty() {}, getPropertyValue: () => '' }, dataset: {},
  classList: { add() {}, remove() {} }, isConnected: true, contains() { return false },
  // v3.2.0 的 drawer-session-log 任务会对 frame 做 querySelector 查找品牌行；
  // 真机是真实元素，这里补最小形状，避免冒烟把桩的缺口当成激活失败。
  querySelector: () => null, querySelectorAll: () => [], parentElement: null,
  childElementCount: 0, children: [], closest: () => null, matches: () => false,
  insertBefore() {},
})
const reg = []
const registered = []
const frame = el()
globalThis.window = {
  location: { href: 'http://127.0.0.1:19387/', search: '' },
  matchMedia: () => ({ matches: true, addEventListener() {}, removeEventListener() {} }),
  addEventListener() {}, removeEventListener() {},
  setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval: () => {},
  requestAnimationFrame: () => 1, cancelAnimationFrame() {},
  dispatchEvent() {}, CustomEvent: class { constructor(n, o) { this.type = n; this.detail = o?.detail } },
  visualViewport: null, navigator: globalThis.navigator, scrollY: 0, scrollTo() {}, innerHeight: 800,
  URLSearchParams,
}
globalThis.document = {
  querySelector: (s) => (s === '[data-mobile-nav="frame"]' ? frame : null),
  querySelectorAll: () => [],
  createElement: () => el(), documentElement: el(), body: el(), head: el(),
  addEventListener() {}, removeEventListener() {},
}
globalThis.Node = { TEXT_NODE: 3 }
globalThis.MutationObserver = class { observe() {} disconnect() {} }
const selStub = {
  rangeCount: 0, isCollapsed: true, anchorNode: null, focusNode: null,
  type: 'None', getRangeAt: () => ({ collapsed: true, cloneRange: () => ({}) }),
  removeAllRanges() {}, addRange() {}, collapse() {}, empty() {},
}
globalThis.getComputedStyle = () => ({ getPropertyValue: () => '', visibility: 'visible', paddingTop: '0px' })
globalThis.location = window.location
globalThis.getSelection = () => selStub
globalThis.innerWidth = 390
globalThis.devicePixelRatio = 2
globalThis.window.getSelection = () => selStub
globalThis.Selection = class {}
globalThis.Range = class {}
globalThis.Element = class {}
globalThis.HTMLElement = class {}
globalThis.HTMLInputElement = class {}
globalThis.HTMLTextAreaElement = class {}
globalThis.KeyboardEvent = class { constructor(t){ Object.assign(this,t) } }
globalThis.PointerEvent = class {}
globalThis.Event = class { constructor(t){ this.type=t } }
globalThis.EventTarget = class {}
globalThis.performance = globalThis.performance ?? { now: () => Date.now() }
globalThis.requestAnimationFrame = () => 1
globalThis.cancelAnimationFrame = () => {}
globalThis.CustomEvent = window.CustomEvent

// minimal react shim (components render only when host mounts them; activation
// just needs hooks to be importable functions)
const React = {
  createElement: (...a) => ({ a }), Fragment: 'f', useState: (v) => [typeof v === 'function' ? v() : v, () => {}],
  useEffect: () => {}, useRef: (v) => ({ current: v }), useMemo: (f) => f(), useCallback: (f) => f,
}
const ctx = {
  locale: {
    register: (ns, tables) => { registered.push(typeof ns === 'object' ? (ns.ns ?? JSON.stringify(ns).slice(0, 40)) : ns); },
    bind: (ns) => (k) => k,
  },
  inject: (deps, cb) => { registered.push('dyn:' + deps.join(',')); try { cb(ctx) } catch (e) { console.error('[dyn-inject threw]', deps.join(','), e.message) } },
  effect: (f, label) => { reg.push(label ?? 'anon'); try { return f() } catch (e) { console.error('[effect threw]', label, e); throw e } },
  slots: { inject: () => {}, register: () => ({}) },
  connection: { rpc: { call: async () => ({ ok: true, value: {} }) } },
  get: () => undefined,
  sessions: { list: { getSnapshot: () => ({ current: 's1', byId: {} }), subscribe: () => () => {} }, selected: null },
}

let factory
globalThis.window.__ModuleLoader__ = {
  load: (m) => { factory = m.factory },
}
const code = readFileSync(new URL('./client.js', import.meta.url), 'utf8')
// bundle is plain script calling window.__ModuleLoader__.load({...})
new Function('window', 'document', 'Node', 'MutationObserver', 'navigator', code)(window, document, Node, MutationObserver, navigator)
const exports = factory((id) => {
  if (id === 'react') return React
  if (id === '@deepseek-ai/dsh-client-ui-primitives') return new Proxy({}, { get: () => () => null })
  throw new Error('unexpected require: ' + id)
})
console.log('[boot] module loaded ok. exports:', Object.keys(exports))
exports.apply(ctx)
console.log('[boot] apply() completed. locale NS registered:', JSON.stringify(registered))
console.log('[boot] effects registered:', reg.length)
process.exit(0) // status-poll timers keep the loop alive; smoke test is done








