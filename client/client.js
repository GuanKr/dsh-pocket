window.__ModuleLoader__.load({
  id: "dsh-pocket",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    // The DSH client module system provides react as a module, never as a
    // global. esbuild keeps react external (see the build config above) and
    // its classic JSX transform emits bare React.createElement calls for the
    // mobile components (which import only named hooks, not React itself), so
    // the bundle must bind React itself - otherwise every mobile component
    // crashes at render time with "ReferenceError: React is not defined".
    var React = require("react");
var Ii=Object.create;var lt=Object.defineProperty;var Hi=Object.getOwnPropertyDescriptor;var Ni=Object.getOwnPropertyNames;var zi=Object.getPrototypeOf,Di=Object.prototype.hasOwnProperty;var Bi=(e,t)=>{for(var a in t)lt(e,a,{get:t[a],enumerable:!0})},Ka=(e,t,a,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Ni(t))!Di.call(e,n)&&n!==a&&lt(e,n,{get:()=>t[n],enumerable:!(o=Hi(t,n))||o.enumerable});return e};var Ua=(e,t,a)=>(a=e!=null?Ii(zi(e)):{},Ka(t||!e||!e.__esModule?lt(a,"default",{value:e,enumerable:!0}):a,e)),qi=e=>Ka(lt({},"__esModule",{value:!0}),e);var ul={};Bi(ul,{apply:()=>hl,inject:()=>ll,name:()=>sl,redactStatus:()=>Xa});module.exports=qi(ul);var m=require("react");var be="/dsh-pocket",$e="data-dsh-pocket-mobile-rightbar",Ge="dsh-pocket:mobile-rightbar",Oe="data-dsh-pocket-pinch-zoom",Xe="dsh-pocket:mobile-pinch-zoom",ge="data-dsh-pocket-mobile-font",Ze="dsh-pocket:mobile-font-size",we="--dsh-pocket-mobile-font-size";var W=Object.freeze({status:"pocket.status",tunnelStart:"tunnel.start",tunnelStop:"tunnel.stop",tunnelSetConfig:"tunnel.setConfig",version:"pocket.version",update:"pocket.update",restart:"pocket.restart",lanTokenRefresh:"token.lanRefresh",lanAuthSetEnabled:"lanAuth.setEnabled",lanSetOverride:"lan.setOverride",lanSetEnabled:"lan.setEnabled",mobileRightbarSetEnabled:"mobile.rightbar.setEnabled",mobilePinchZoomSetEnabled:"mobile.pinchZoom.setEnabled",mobileFontSetSize:"mobile.font.setSize",pinSetCustom:"pin.setCustom",pocketReset:"pocket.reset",fileRead:"pocket.fileRead"});function Ut(e,t){let a=String(e).replace(/^[vV]/,"").split("."),o=String(t).replace(/^[vV]/,"").split(".");for(let u=0;u<3;u++){let s=parseInt(a[u],10)||0,c=parseInt(o[u],10)||0;if(s!==c)return s-c}let n=String(e).replace(/^[vV]/,"").match(/-.*$/)?.[0]??"",i=String(t).replace(/^[vV]/,"").match(/-.*$/)?.[0]??"";if(!n&&!i)return 0;if(!n)return 1;if(!i)return-1;let r=n.slice(1).split("."),d=i.slice(1).split("."),h=Math.max(r.length,d.length);for(let u=0;u<h;u++){let s=r[u]??"",c=d[u]??"";if(s===c)continue;let l=/^\d+$/.test(s),x=/^\d+$/.test(c);return l&&x?Number(s)-Number(c):l?1:x||s<c?-1:1}return 0}function $a(e){return String(e??"").trim().toLowerCase().replace(/^git\+/,"").replace(/\/+$/,"").replace(/\.git$/,"")}function Ga(e,t){let a=$a(e);return a!==""&&a===$a(t)}function Xa(e){return{proxyRunning:e?.proxyRunning===!0,proxyPort:e?.proxyPort??null,lanUrl:e?.lanUrl??null,lanQr:e?.lanQr??null,lanCandidates:Array.isArray(e?.lanCandidates)?e.lanCandidates:[],lanIpOverride:e?.lanIpOverride??"",tunnelRunning:e?.tunnelRunning===!0,tunnelUrl:e?.tunnelUrl??null,tunnelQr:e?.tunnelQr??null,tunnelState:e?.tunnelState??{phase:"idle"},tunnelConfig:e?.tunnelConfig??{mode:"quick",hostname:"",tokenSet:!1},dshPort:e?.dshPort??null}}var ct=require("react");var Wi=Ua(require("@deepseek-ai/dsh-client-ui-primitives"),1),Vi=()=>null,$t=e=>{let t=Wi;for(let a of e){let o=t[a];if(o!==void 0)return o}return Vi},Za=$t(["IconPaperclipOutlineRegular","IconPaperclipOutline16"]),Ya=$t(["IconPanelLeftOutlineRegular","IconPanelLeftOutline16"]),Qa=$t(["IconFolderOpenOutlineRegular","IconFolderOpenOutline16"]);function Gt(){return document.querySelector("[data-shell-overlay]")?.parentElement??null}var Ja=null;function D(){let e=Ja;if(e!==null&&e.isConnected&&e.getAttribute("data-mobile-nav")==="frame")return e;let a=document.querySelector('[data-mobile-nav="frame"]')??Gt();return Ja=a,a}var ji="[data-sidebar-right-expand]",Ki="[data-sidebar-right-toggle]";function dt(e=document,t=D()){let a=e.querySelector(Ki),o=e.querySelector(ji),n=typeof o?.click=="function"?o:a;return typeof n?.click=="function"?(n.click(),!0):(t===null||(t.removeAttribute("data-aionui-preview-open"),t.setAttribute("data-aionui-explorer-open","")),!1)}function eo({toggleSidebar:e,t}){let[a,o]=(0,ct.useState)(!1);(0,ct.useEffect)(()=>{let i=()=>{let u=D();return u!==null&&!u.hasAttribute("data-sidebar-collapsed")};o(i());let r=0,d=()=>{r===0&&(r=requestAnimationFrame(()=>{r=0,o(i())}))},h=new MutationObserver(u=>{for(let s of u){if(s.type==="attributes"){if(s.attributeName==="data-sidebar-collapsed"){d();return}continue}let c=[...s.addedNodes,...s.removedNodes];if(c.length===0||!c.every(l=>l.nodeType===Node.TEXT_NODE)){d();return}}});return h.observe(document.documentElement,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["data-sidebar-collapsed"]}),()=>{r!==0&&cancelAnimationFrame(r),h.disconnect()}},[]);let n=()=>{dt()};return React.createElement(React.Fragment,null,React.createElement("button",{type:"button","data-mobile-nav":"toggle","aria-label":t(a?"close":"open"),"aria-expanded":a,title:t(a?"close":"open"),onClick:()=>e()},React.createElement(Ya,{size:16})),React.createElement("button",{type:"button","data-mobile-nav":"files","aria-label":t("files"),title:t("files"),onClick:n},React.createElement(Qa,{size:16})))}function to({useInput:e,useSession:t,t:a}){let o=e(r=>r.phase!=="plain"),n=t(r=>r.subagent!==null),i=o||n;return React.createElement("button",{type:"button","data-mobile-nav":"file-upload","aria-label":a("fileUpload"),title:a("fileUpload"),disabled:i},React.createElement(Za,{size:16}))}var ao=`
/* ---------- base control styles (rendered at any width, hidden where unused) ---------- */

[data-mobile-nav="toggle"],
[data-mobile-nav="files"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex: none;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--dsw-alias-label-secondary, inherit);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
/* 触屏点按不再粘滞灰底（pocket 补丁）：hover 态只在真有 hover 的指针上生效，
   :active 拆出来单独保留（触屏按下的即时反馈）。 */
@media (hover: hover) {
  [data-mobile-nav="toggle"]:hover,
  [data-mobile-nav="files"]:hover {
    background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06));
  }
}
[data-mobile-nav="toggle"]:active,
[data-mobile-nav="files"]:active {
  background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06));
}
[data-mobile-nav="toggle"]:focus-visible,
[data-mobile-nav="files"]:focus-visible {
  outline: 2px solid var(--dsw-alias-state-business-primary, #4f6ef7);
  outline-offset: 1px;
}

/* Drawer brand-row session-log icon (issue #225): the plugin-owned button is
   injected into the host's logo row by effects/drawer-session-log.ts, so it
   sizes as a compact icon control instead of the old footer pill. The host
   brand button is flex:1 and gives up exactly this width. The wrapper keeps the
   button out of the row's direct-button set: the third-party dsh-web-all layer
   adopts that row's last direct button as its sidebar toggle (see
   effects/drawer-session-log.ts#mount). */
[data-mobile-nav="session-log-wrap"] {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
}
[data-mobile-nav="session-log"] {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: var(--dsw-radius-md, 8px);
  background: transparent;
  color: var(--dsw-alias-label-secondary, inherit);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
@media (hover: hover) {
  [data-mobile-nav="session-log"]:hover:not(:disabled) {
    background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06));
  }
}
[data-mobile-nav="session-log"]:disabled {
  color: var(--dsw-alias-label-dimmed, rgba(0, 0, 0, .35));
  cursor: default;
  background: transparent;
}

[data-mobile-nav="delete-confirm-title"] {
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: var(--dsw-alias-text-primary, rgb(15, 17, 21));
}
[data-mobile-nav="delete-confirm-desc"] {
  font-size: 12px;
  line-height: 17px;
  color: var(--dsw-alias-label-secondary, inherit);
}
[data-mobile-nav="delete-confirm-actions"] {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 2px;
}
[data-mobile-nav="delete-confirm-actions"] > button {
  height: 36px;
  padding: 0 14px;
  border: 1px solid var(--dsw-alias-border-l1, rgba(0, 0, 0, .12));
  border-radius: 18px;
  background: transparent;
  color: var(--dsw-alias-label-primary, inherit);
  font-family: inherit;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
[data-mobile-nav="delete-confirm-yes"] {
  border-color: transparent !important;
  background: var(--dsw-alias-state-error-primary, #b91c1c) !important;
  color: #ffffff !important;
}
[data-mobile-nav="delete-confirm-actions"] > button:disabled {
  opacity: .55;
  cursor: default;
}
[data-mobile-nav="delete-error"] {
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  color: var(--dsw-alias-state-error-primary, #b91c1c);
}

/* Centered frosted-glass modal for the delete confirm / error card: the
   backdrop is a flex positioning container (centering + 16px inset padding)
   and the card rides inside it as a static child (session-menu.ts appends
   the card INTO the backdrop for exactly this reason). Look baseline = the
   host ⋯ menu's portal root, measured 2026-09-24: translucent
   rgba(248,249,250,.58) fill with blur(40px) saturate(1.5) frosted glass,
   16px radius, hairline + soft shadow. Geometry baseline = the host Dialog,
   measured the same day: centered modal, 16px/500 title, 36px pill buttons,
   solid-fill primary. [hidden] keeps the error line out of layout until a
   failure lands. */
[data-mobile-nav="delete-dialog-backdrop"] {
  position: fixed;
  inset: 0;
  z-index: 55;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, .4);
  animation: dsh-web-mobile-fade .2s var(--ds-ease-in-out, ease-in-out);
}
[data-mobile-nav="delete-dialog"] {
  position: static;
  width: min(420px, calc(100vw - 32px));
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 16px;
  background: rgba(248, 249, 250, .58);
  -webkit-backdrop-filter: blur(40px) saturate(1.5);
  backdrop-filter: blur(40px) saturate(1.5);
  box-shadow: rgba(0, 0, 0, .04) 0 0 0 .5px, rgba(0, 0, 0, .04) 0 3px 8px 0, rgba(0, 0, 0, .05) 0 0 20px 0;
}
@media (prefers-reduced-motion: reduce) {
  [data-mobile-nav="delete-dialog-backdrop"],
  [data-mobile-nav="delete-dialog"],
  [data-mobile-nav="file-picker-backdrop"],
  [data-mobile-nav="file-picker"] {
    animation: none !important;
  }
}

/* ---------- composer file picker (effects/composer-file-picker.ts) ----------
   手机档回形针入口的两选项浮层（上传图片 / 上传附件）。宿主在 0.1.6 删掉了自带的
   附件按钮，只剩 composer 里一个隐藏 input，直接点它只会弹系统文件选择器 ——
   形态不可控、也没有「只挑图片」这条路（2026-10-06 报障）。
   形态（同日店主反馈「这个 UI 太丑了，缩小点，不要从底部弹出」）：**贴锚点的小浮层**，
   不是整宽底部弹层 —— 宽度贴着内容（「width: max-content」，上限 min(78vw, 240px)），行高 34px、
   行间距 0（2026-10-07 店主：「之间的距离更紧致一点」+「右边的留白有点多了，往左边缩点」），字号 14px。
   定位用「position: fixed」，top/left 由 JS 按回形针 rect 算（上方优先，夹进视口 8px
   内边距，且**视口一变就重算** —— 键盘收起把整体下移一个键盘高时浮层必须跟着锚点走，
   否则会停在会话中部，2026-10-07 真机报障），所以这里只写盒子、不写定位与整宽。
   没有「取消」行：点浮层外或按返回键关闭（外层透明遮罩只负责收点击）。
   挂 document.body（与上面的 delete-dialog 同一取舍：挂在 frame 里会被第三方
   dismiss shim 的捕获链吞点击），z 在移动档块里抬到 1400。 */
[data-mobile-nav="file-picker-backdrop"] {
  position: fixed;
  inset: 0;
  z-index: 55;
  background: transparent;
}
[data-mobile-nav="file-picker"] {
  position: fixed;
  box-sizing: border-box;
  /* 宽度贴着内容（2026-10-07 店主：「右边的留白有点多了，往左边缩点」）：
     两行都是「图标 + 两字标签」，固定 168px 起步会在右侧留一大块空白。 */
  width: max-content;
  min-width: 0;
  max-width: min(78vw, 240px);
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 5px;
  border-radius: 12px;
  background: var(--dsw-alias-bg-layer-2, #fff);
  box-shadow: rgba(0, 0, 0, .16) 0 8px 28px, rgba(0, 0, 0, .06) 0 0 0 .5px;
  animation: dsh-web-mobile-fade .12s var(--ds-ease-in-out, ease-in-out);
}
[data-mobile-nav="file-picker-option"] {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 34px;
  padding: 0 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--dsw-alias-label-primary, currentColor);
  font: inherit;
  font-size: 14px;
  line-height: 1.3;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
[data-mobile-nav="file-picker-icon"] {
  flex: none;
  display: inline-flex;
  color: var(--dsw-alias-label-secondary, currentColor);
}
[data-mobile-nav="file-picker-icon"] svg {
  width: 18px;
  height: 18px;
}
[data-mobile-nav="file-picker-option"]:active {
  background: var(--dsw-alias-interactive-bg-active, rgba(127, 127, 127, .12));
}

/* ---------- popover band above the open drawer (mobile only) ----------
   The host portals its menus to <body> as position: fixed with z-index 1100,
   while the drawer column carries 1300 and our backdrop 1250. A menu opened
   from inside the drawer therefore painted UNDER both: measured 2026-09-14 at
   390px on the session row's ⋯ menu — menu rect [160,454,218,168] z1100, and
   elementFromPoint at its centre AND at both of its ends returned drawer
   elements, so the whole menu was unreachable and the row could not be
   renamed/forked/archived/deleted from the phone (the second half of the
   owner's report: the popup the ⋯ opens is pressed under the drawer).
   The raise is gated on the open drawer: our backdrop makes that the only
   state in which a menu can be opened from the drawer, so the closed-drawer
   and desktop stacks keep the host's own ordering.
   The plugin's own confirm card sits in the same band: it mounts on
   document.body (NOT in the frame — see session-menu.ts, which appends the
   backdrop and the card there so the third-party dismiss shim's capture-phase
   click chain cannot swallow its buttons) and carried the base z 55/56, so the
   drawer covered its left 272px (measured: elementFromPoint inside that band hit
   the drawer's own button, and the confirm card is 358px wide starting at x=8). */
@media (max-width: 1023px) and (pointer: coarse) {
  body:has([data-mobile-nav="frame"]:not([data-sidebar-collapsed])) [role="menu"] {
    z-index: 1400 !important;
  }
  /* Host modal dialogs (workspace rename, and any future dialog of the same
     shape) portal to a direct body child that carries the stacking context:
     body > div { position: fixed; z-index: 1000 } wrapping
     [role="dialog"][aria-modal="true"] (inner z-index: 1 — raising the dialog
     itself is useless, it only sorts inside that root).
     NOTE (2026-09-23): the hashes once recorded here (_root_w1urq_2 /
     _dialog_w1urq_22) are gone from both 0.1.7-alpha.1 and alpha.2, so this
     comment anchors on the SHAPE only — which is what the rule below already
     matches. Do not reintroduce a hash here without re-measuring.
     Measured 2026-09-19: with the drawer open (column z 1300) the workspace
     Rename dialog sat entirely under it and needed the drawer closed first.
     Raise the portal root, not the dialog.
     GATE (2026-09-25, real device): the gate is OUR BACKDROP'S PRESENCE, not
     the drawer-open marker. Marker and paint disagree for the whole close
     transition — the backdrop fades over .2s and is removed 260ms after the
     marker flips (overlay-backdrop-fab.ts), the column transitions .28s
     (layout.css.ts) and React swaps the pane subtree ~200ms late — so a
     marker-gated raise went dark inside that window and the drawer band
     covered any open modal. Measured on the reporter's phone (Android 16
     WebView) with the shortcut modal open: forcing data-sidebar-collapsed
     dropped this root 1400 -> 1000 and made elementsFromPoint(0.85w, .30h)
     return [data-mobile-nav="backdrop"] — rgba(0,0,0,.45) over the modal's
     white = luminance 141, matching the reporter's recording (140 behind a
     280px drawer edge). That is the "快捷键弹层抽搐/闪" report: a ~200-280ms
     dark frame with the drawer over the shortcut modal, not a compositing
     tear. The backdrop's presence IS the drawing condition, so gating on it
     has no such window; with no backdrop the host's own ordering stands (a
     menu opened inside a modal still sorts above it). Our own delete backdrop
     matches this rule too since the 2026-09-24 centered rework (its direct
     child card carries role=dialog) — harmlessly: it sets the same 1400 the
     dedicated rule below sets. */
  body:has([data-mobile-nav="backdrop"])
    > div:has(> [role="dialog"][aria-modal="true"]) {
    z-index: 1400 !important;
  }
  [data-mobile-nav="delete-dialog-backdrop"] {
    z-index: 1400 !important;
  }
  /* 同一个带里：回形针弹层也要压过抽屉（z 1300）与抽屉遮罩（1250）。 */
  [data-mobile-nav="file-picker-backdrop"] {
    z-index: 1400 !important;
  }
  [data-mobile-nav="delete-dialog"] {
    z-index: 1401 !important;
  }
  /* dsh-usage-stats portals its panel to <body> as position: fixed with
     z-index 100 (desktop-designed; the drawer does not exist there). With our
     drawer open (column z 1300) the「用量/余额」panel sat under it: measured
     2026-09-20 at 390px — panel rect [12,91,366,625] z100 vs drawer 280px wide
     z1300, and elementFromPoint at the panel's centre AND its left corners
     returned drawer elements, so only a ~98px strip on the right stayed
     reachable. The plugin also unmounts the panel when the drawer closes
     (Escape-linked dismissal) and the badge only renders in the open drawer,
     so the open-drawer gate covers the panel's only reachable state; the
     closed-drawer and desktop stacks keep the plugin's own ordering. */
  body:has([data-mobile-nav="frame"]:not([data-sidebar-collapsed]))
    [data-usage-stats-panel] {
    z-index: 1400 !important;
  }
  /* AppFrame overlayLayer band — the class self-fix of our own layering
     contract (NOT a per-plugin adaptation): plugin and host sheets portal
     INTO the AppFrame overlay layer (position: absolute; z-index 20 — its
     own stacking context), so no z-index on a sheet itself can out-rank the
     drawer column's 1300 in the root context, and every sheet opened from
     the drawer landed behind it. Measured 2026-09-22 at 390px with the
     drawer open: a probe sheet inside the layer stayed hit-blocked by
     drawer elements at z auto AND z 9999 alike, and only raising the layer
     ROOT revealed it (elementFromPoint). Raise the stacking root, not the
     children — the same shape as the dialog portal-root raise above. The
     body-ported bands keep their own raises (menus 1100, dialog root 1000,
     usage-stats panel 100): each is a per-surface adaptation patch for a
     portal OUTSIDE this layer. Closed-drawer and desktop stacks keep the
     host's own ordering. */
  body:has([data-mobile-nav="frame"]:not([data-sidebar-collapsed]))
    [class*="_overlayLayer"] {
    z-index: 1400 !important;
  }
  /* 0.1.7 fullscreen sidebar panels (the sidebar terminal / files / preview /
     browser tabs) state the dockkit cell at z 40 — the host sets
     --dsh-dockkit-dock-layer: 40 on .panel[data-sidebar-right-panel=fullscreen]
     — which outranks the
     host's own overlay layer (20) and our FAB (21). Measured 2026-09-23 at
     390px with the terminal panel open: elementFromPoint at the FAB's centre
     returned a panel child, and a real tap on it left the drawer closed — the
     phone lost its only way back to navigation (the FAB is the screen's only
     control once a panel owns the main area, see overlay-backdrop-fab.ts).
     Raise OUR two surfaces for that state, the same "raise the root, not the
     children" shape as above; the FAB stays in the below-the-drawer band (55)
     so an open drawer keeps covering it. Gate on the open attribute: the
     presentation attribute alone survives a closed panel. Closed-panel,
     docked-panel (dock layer 10) and desktop stacks keep the host's order. */
  body:has([data-sidebar-right-open][data-sidebar-right-panel="fullscreen"]) [data-mobile-nav="fab"] {
    z-index: 55 !important;
  }
  body:has([data-sidebar-right-open][data-sidebar-right-panel="fullscreen"])
    [class*="_overlayLayer"] {
    z-index: 1400 !important;
  }
}

/* ---------- touch press feedback (mobile + hover: none only) ----------
   Android WebView paints its own translucent blue tap highlight
   (-webkit-tap-highlight-color default) over every tapped control. The
   property is inherited and no host package sets it on descendants (grep of
   dsh-client-ui-* bundles, 2026-10), so transparent on html/body clears it
   page-wide; the explicit transparent values on our own controls above stay
   as the desktop-width fallback. In its place the UI gives its own pressed
   state: an inset box-shadow tint (paint-only, no layout, does not fight a
   host background) in the host's interactive-bg-active colour, which the
   theme defines for both light and dark. Every selector sits in :where(), so
   (0,0,0) loses to any host or plugin rule that styles the element itself —
   aria-selected / aria-pressed / own :active states keep their look — and
   :focus-visible outlines are untouched. Desktop and narrow mouse windows
   never enter this block (MOBILE_QUERY + hover: none). */
@media (max-width: 1023px) and (pointer: coarse) {
  @media (hover: none) {
    html,
    body {
      -webkit-tap-highlight-color: transparent;
    }
    :where(button, [role="button"], [role="menuitem"], [role="menuitemradio"], [role="option"], [role="tab"], [role="treeitem"], a[href]) {
      transition: box-shadow .12s var(--ds-ease-in-out, ease-in-out), transform .12s var(--ds-ease-in-out, ease-in-out);
    }
    :where(button, [role="button"], [role="menuitem"], [role="menuitemradio"], [role="option"], [role="tab"], [role="treeitem"], a[href]):where(:active):where(:not(:disabled, [aria-disabled="true"], [aria-selected="true"], [aria-pressed="true"], [aria-checked="true"])) {
      box-shadow: inset 0 0 0 100vmax var(--dsw-alias-interactive-bg-active, color-mix(in srgb, currentColor 8%, transparent));
    }
    /* Icon-only buttons (a lone svg child, or a button that carries only an
       aria-label) also shrink a touch. */
    :where(button:has(> svg:only-child), button[aria-label]:not(:has(> span, > div))):where(:active):where(:not(:disabled, [aria-disabled="true"])) {
      transform: scale(.96);
    }
    @media (prefers-reduced-motion: reduce) {
      :where(button, [role="button"], [role="menuitem"], [role="menuitemradio"], [role="option"], [role="tab"], [role="treeitem"], a[href]) {
        transition: none;
      }
      :where(button:has(> svg:only-child), button[aria-label]:not(:has(> span, > div))):where(:active) {
        transform: none;
      }
    }
  }
}

/* Floating fallback button (hero / blank phases without a session header).
   Top aligns with the session header's toggle row (that row sits 12px below
   the frame's safe-area padding); when the client has set viewport-fit=cover
   the safe-area inset moves it below the notch too. */
[data-mobile-nav="fab"] {
  position: absolute;
  top: calc(env(safe-area-inset-top, 0px) + 12px);
  left: 10px;
  z-index: 21;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border: 1px solid var(--dsw-alias-border-l1, rgba(0, 0, 0, .12));
  border-radius: 50%;
  background: var(--dsw-alias-button-floating-fill, #ffffff);
  color: var(--dsw-alias-label-primary, inherit);
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0, 0, 0, .18);
  -webkit-tap-highlight-color: transparent;
}
@media (hover: hover) {
  [data-mobile-nav="fab"]:hover {
    background: var(--dsw-alias-button-floating-hover, rgba(0, 0, 0, .08));
  }
}
[data-mobile-nav="fab"]:focus-visible {
  outline: 2px solid var(--dsw-alias-state-business-primary, #4f6ef7);
  outline-offset: 2px;
}

/* Dimmed backdrop under the open drawer; above every column, below the drawer.
   z 1250: 0.1.5 pins its native sidebarCol at z-index:1100 and paints mid
   layers up to that band; the backdrop must sit above the host stack
   (below the drawer's 1300) so the dim covers the content area on every
   host generation. Keep in sync with the drawer z in layout.css.ts. */
[data-mobile-nav="backdrop"] {
  position: absolute;
  inset: 0;
  z-index: 1250;
  background: rgba(0, 0, 0, .45);
  cursor: pointer;
  animation: dsh-web-mobile-fade .2s var(--ds-ease-in-out, ease-in-out);
  /* Fade-out twin of the mount animation: the task eases the dimming away
     (inline opacity 0 + pointer-events none) and removes the element after
     the fade. Also used by the gesture layer so the backdrop fades in step
     with a close-follow commit's slide-out. */
  transition: opacity .2s var(--ds-ease-in-out, ease-in-out);
  -webkit-tap-highlight-color: transparent;
}
@keyframes dsh-web-mobile-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  [data-mobile-nav="backdrop"] {
    animation: none !important;
    transition: none !important;
  }
}
/* Settings sheet entrance: the official dialog mounts with no animation at
   all, so it snaps in. A slight rise/scale reads as a proper sheet.
   No opacity arm (issue #124, 2026-09-25): checker scene 4 screencast caught
   the fade double-exposing the still-open drawer underneath the panel
   (frame a005) — sliding in fully opaque keeps the motion, drops the bleed. */
@keyframes dsh-web-mobile-sheet-in {
  from {
    transform: translateY(14px) scale(.98);
  }
  to {
    transform: none;
  }
}
/* Preview sheet rise: the aionui preview column opens as a bottom sheet. */
@keyframes dsh-web-mobile-sheet-up {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

`;var oo=`/* ---------- mobile-only layout (narrow viewport AND touch-primary pointer) ---------- */

@media (max-width: 1023px) and (pointer: coarse) {
  /* --- Phone chrome ---
     The system status bar stays visible (no fullscreen). Three adjustments
     make it behave:
     - touch-action: pan-y pinch-zoom kills double-tap-to-zoom (and the 300ms
       tap delay) while keeping vertical pan. Omitting pan-x (i.e. not using
       the manipulation alias) forbids HORIZONTAL pan on the root: a
       left-edge horizontal drag would otherwise be claimed by the browser as
       a pan (firing pointercancel) before the sidebar swipe layer can
       classify it. touch-action does not inherit and the behavior
       intersection stops at the first scroll container, so only touches
       landing directly on the root background are affected — inner
       horizontal scrolling of content containers is untouched. pinch-zoom is
       listed on purpose (#45): a bare pan-y also drops pinch, and then a
       zoom the browser applied by itself — iOS enlarges the viewport when a
       field under 16px takes focus — can no longer be undone by the user,
       so the app stays magnified until it is reopened or rotated. Two-finger
       zoom is also the WCAG 1.4.4 escape hatch and costs the gesture layer
       nothing: pinch is not a horizontal pan.
     - overscroll-behavior-x: none suppresses the browser's edge history
       navigation on the root scroller — Android Chrome claims a horizontal
       stroke that STARTS within its edge band (EDGE_WIDTH_DP=48dp,
       NavigationHandler.java) and navigates BACK, the exact gesture that
       opens the drawer ("页面直接返回上一页", 2026-08-29 user report). Only
       html/body count for this (Chromium issue 41483088: inner containers
       are ignored by the navigation path). iOS Safari's edge back-swipe has
       no CSS opt-out (WebKit bug 240183) — there the widened gesture start
       zone (START_ZONE_RATIO 0.45 of the viewport width, ~176px at 390px,
       past every browser's edge-claim strip) is the mitigation.
     - With the client's viewport-fit=cover, env(safe-area-inset-top) is the
       status bar / notch height; the rules below push the app content below
       it so the status bar never covers anything. Off notched phones (or in
       a normal browser tab where the layout viewport already sits below the
       status bar) the inset is 0 and nothing shifts. */
  html,
  body {
    touch-action: pan-y pinch-zoom !important;
    overscroll-behavior-x: none !important;
    /* iOS 竖屏防文字自动放大（pocket 补丁）：Safari 在窄视口会自行放大
       ≥阈值字号的文本，输入与消息排版被破坏；两行同值，前缀行给老引擎。 */
    -webkit-text-size-adjust: 100% !important;
    text-size-adjust: 100% !important;
  }

  /* AppFrame: the drawer takes the sidebar column out of grid flow, so the
     remaining in-flow items (center, details) land in tracks 1..2: give the
     center every pixel and keep the details track at zero. The top padding
     clears the status bar / notch for every in-flow surface (session header,
     messages, composer); the absolutely-positioned drawer is unaffected (its
     containing block is the frame's padding box, i.e. still the frame top).
     box-sizing MUST be border-box: the official frame is height:100% of a
     100%-height body, and it is content-box by default, so the safe-area
     padding is ADDED on top of the full viewport height. The frame then grows
     to 100% + inset, the document itself becomes scrollable by exactly the
     inset, and the sticky composer seat (bottom:0 of the scroll body) lands
     below the visual viewport. Symptoms on a notched phone: the whole UI can
     be swiped up, the composer lifts off the bottom leaving a blank strip,
     and the newest message sits under the composer because the host's
     at-bottom follow scrolls its own scroll body, not the document. With
     border-box the padding is taken out of the 100% height instead, so the
     frame is exactly one viewport tall and the document never scrolls.

     The leading html element selector is load-bearing, not decoration: the
     third-party @linxin666/dsh-web-all sheet ships an equal-specificity
     !important grid-template-columns for this same element under
     (max-width: 768px), so without the extra element the winner is decided by
     which sheet happens to be injected later. Measured before and after with
     scripts/probes/cascade-conflict-probe.mjs: no computed value moves, the
     rule only stops depending on sheet order (audit D-5 option A). */
  html [data-mobile-nav="frame"] {
    box-sizing: border-box !important;
    position: relative !important;
    grid-template-columns: minmax(0, 1fr) 0 0 !important;
    padding-top: env(safe-area-inset-top, 0px) !important;
    /* Bottom safe area, symmetric with the top inset above. It MUST stay in
       this rule: box-sizing: border-box is the pair that makes the padding eat
       into the one-viewport height instead of adding scrollable overflow
       (pitfalls §safe-area — padding without border-box pushes the composer
       seat below the fold).
       Why we have to own it: the third-party @linxin666 sheet (the same one
       the grid-template-columns note above is about) ships this padding only
       under (max-width: 768px), and the host ships none at all, so 769-1023px
       touch devices had no bottom inset from either side and their content sat
       in the system-bar band (issue #193). In the <=768px band that sheet's
       declaration and this one are the same property with the same value, so
       they do not stack. */
    padding-bottom: env(safe-area-inset-bottom, 0px) !important;
  }

  /* The sidebar column (first grid child) becomes a left drawer. The drawer
     hugs the sidebar content exactly (the wide sidebar carries an inline
     width, ~280px): a fixed 92vw box would leave a white strip where the
     container background shows beside the content.
     Closed state: translateX(-110%) — more than -100% of the max-content
     width — guarantees the whole drawer (and its shadow, had it one) leaves
     the viewport. A mere -100% leaves a sliver on screen; -105% (as used
     before) left 14px of the drawer plus a long 32px-blur shadow gradient
     visible along the left edge of the main UI. No box-shadow at all: the
     dimmed backdrop already separates drawer from content. */
  /* These legacy column rules stay armed on every host generation: the phone
     owner prefers this drawer over the official overlay one (2026-09-13). The
     host's own drawer ships NO full-screen backdrop, so the conversation beside
     it stays hit-testable - the rejection reason.
     Layering contract: this column is 1300 and the backdrop 1250 (base.css),
     both deliberately above the host's native sidebarCol at 1100. The earlier
     value of 40 sat BELOW that 1100: because this same rule also forces
     position/inset/width on the element, the column kept a correct-looking box
     while neither painting nor hit-testing, which is the "all black, click
     anywhere closes" root cause. The backdrop we append carries the dimming. */
  [data-mobile-nav="frame"] > :first-child {
    position: absolute !important;
    inset: 0 auto 0 0 !important;
    /* !important is load-bearing: the host ships
       [data-dsh-frame] [data-pane="sidebar"] { width: min(88vw, 320px) !important }
       under (max-width: 768px), which at 390px resolves to a flat 320px and
       BEATS a plain declaration here - measured: our max-content never applied
       and the column stayed 320px.
       280 is the drawer's hard floor, measured by sweeping the column width from
       304 down to 264: the inner surface is a FIXED 280px box and never
       reflows, so every pixel below 280 is simply clipped off its right edge
       (the list stays 270px at every width and its right edge sits at 278, so
       270 and below cut into the list itself). At exactly 280 the panel is fully
       intact - only the 12px of its right-hand padding is given up - which is
       what the owner asked for over the previous 304. Going narrower is a
       one-line change, but it starts eating content. */
    width: min(88vw, 280px) !important;
    /* 1300 is a contract with base.css: the host pins its native sidebarCol at
       z-index:1100 and paints its mid layers up to that band, so the drawer must
       sit above the host stack AND above our own backdrop at 1250 (which dims
       the content area). At 40 the backdrop covered the drawer itself, so
       opening it showed a full-screen dim with no drawer (measured 2026-09-13
       at 390px: backdrop [0,0,390,844] z1250 over column [0,0,320,844] z40, and
       elementFromPoint(40,300) returned the backdrop). Keep in sync with the
       backdrop z in base.css. */
    z-index: 1300 !important;
    transform: translateX(-110%);
    transition: transform .28s var(--ds-ease-in-out, ease-in-out);
    /* Keep the drawer's own content below the status bar / notch: the drawer
       spans the full frame height (its absolute containing block is the
       frame's padding box, so the frame's own safe-area padding does NOT
       reach it). The drawer background paints the status-bar strip, which
       the client's theme-color meta matches, so the strip reads seamless. */
    padding-top: env(safe-area-inset-top, 0px) !important;
    /* Kill the official sidebarCol right border: with the backdrop the edge
       reads cleanly, and the settings dialog (width:100% of this box) stays
       pixel-flush with the drawer. */
    border-right: none !important;

    /* The drawer's inner surface is 280px wide while the column is 88vw/320px, so
     the remaining 40px showed our own column background as a vertical strip
     along the right edge (measured: content right edge 280, column 320; the
     owner reported a white bar). The inner surface owns that band instead, so
     the strip is filled by the drawer's real surface colour.
     That scenario cannot recur as the layout stands: the column is
     min(88vw, 280px), never wider than the 280px inner surface, so the
     inequality that produced the band (column > surface) no longer holds at any
     viewport width (measured 430/390/340/320 = flush at 280, 300 -> 264,
     280 -> 246; a narrower column just crops the surface). The only change that
     would bring it back is raising the column's upper bound past 280px, or the
     host narrowing the inner surface below it. */
    /* The 40px band is a STACKING result, not a colour one: the drawer's inner
     surface is only 280px wide (host markup), while our column is 320px and
     carries z-index 1300 - so the column's own background paints OVER the
     surface's right 40px. Pixel-verified from a screenshot with the drawer open:
     x=10..270 rgb(249,250,251) (the surface) against x=285..315 rgb(255,255,255)
     (our white column). Repainting the column with the surface's own value makes
     the seam invisible.
     The value pinned here is the host's own drawer-fill token - the one
     .pI_x6G_sidebarCol paints with: --dsw-specific-sidebar-fill, i.e.
     --dsw-static-neutral-bluish-50 (#f9fafb) in light and
     --dsw-static-neutral-bluish-900 (#1b1b1c) in dark. Pinning it, rather than
     letting the host rule paint, keeps the band covered without depending on
     cascade order. The fallback is deliberately the token's LIGHT value: if the
     host ever renames this internal token the declaration degrades to today's
     light behaviour instead of going unset, so it cannot get worse. Do not
     "simplify" this back to --dsw-alias-bg-surface: that name is defined nowhere
     in the host, which froze this rule on its fallback and painted the drawer
     light in the dark theme (issue #192). */
    background: var(--dsw-specific-sidebar-fill, #f9fafb);
    /* Drawer swipe gestures (edge swipe-in / content swipe-out, see
     docs/specs/2026-08-27-sidebar-swipe-gestures.md).
     One rule is load-bearing for the gesture layer: dropping pan-x on the
     drawer lets horizontal pointermove events reach the gesture code —
     WITHOUT it the browser treats a horizontal stroke as a pan, fires
     pointercancel and the gesture never classifies (vertical panning stays
     intact). Start-hit is decided purely by geometry on the document
     capture listener (START_ZONE_RATIO = 0.45 of the viewport width, ~176px
     at 390px); there is no hotspot element (removed per audit C2,
     2026-08-27). pinch-zoom rides along with the
     root value so a browser-applied zoom stays undoable inside the drawer
     too (#45); touch-action intersects down the ancestor chain, so a bare
     pan-y here would cancel the root's pinch permission. */
    touch-action: pan-y pinch-zoom !important;
  }

  /* 壁纸兼容（issue #228）：deepseek-harness-background 0.6.x 在
     body[data-dsh-bg] 上把 --dsw-specific-sidebar-fill 置为 transparent（body 内联），
     而抽屉列以该令牌为唯一底色；令牌存在时 var() 的 fallback 不会生效，整列
     于是透出壁纸。宿主内表面（sidebarCol）用同一令牌，也透明，没有第二层
     填充源。壁纸启用时按该令牌自身的两档静态值补回原色：浅色
     --dsw-static-neutral-bluish-50、深色 --dsw-static-neutral-bluish-900。
     这两个静态令牌在明暗两套里取值相同，所以深色必须单独一条。
     规则只在 body[data-dsh-bg] 下命中，无壁纸时完全不参与。 */
  /* @patch
     id: wallpaper-drawer-fill
     for: deepseek-harness-background 0.6.x 的 body[data-dsh-bg]（壁纸启用时把 --dsw-specific-sidebar-fill 置为 transparent）
     why: 抽屉列的唯一底色就是该令牌，第三方插件把它清空后整列透出壁纸；宿主内表面同样透明，没有其它填充源
     until: 上游提供不透明的面板填充接缝，或不再把 --dsw-specific-sidebar-fill 置空——届时本块删除
     test: tests/wallpaper-surface-fill.test.ts
  */
  body[data-dsh-bg] [data-mobile-nav="frame"] > :first-child {
    background: var(--dsw-static-neutral-bluish-50, #f9fafb);
  }
  body[data-ds-dark-theme][data-dsh-bg] [data-mobile-nav="frame"] > :first-child {
    background: var(--dsw-static-neutral-bluish-900, #1b1b1c);
  }

  /* Closed slot, at the host's OWN specificity. 0.1.5 added a narrow-branch
     rule [data-dsh-frame][data-sidebar-collapsed] [data-pane="sidebar"]
     { width:52px !important; transform:none; pointer-events:none;
     background:transparent !important } - specificity (0,3,0), one class above
     the rule above, so it won BOTH width and transform: the closed drawer
     stayed a 52px transparent shell at x=0 and the only state delta left was
     the width (52<->280), which "transition: transform" cannot animate.
     Measured 2026-09-17: closed pane transform:none / width:52 /
     rect [0,0,52,844], and every frame sampled across a toggle click stayed
     transform:none - the owner's "no slide animation on click" report.
     Matching that specificity (plus !important, since the host declaration is
     important) restores the design's own slot (spec 2026-08-27, drawer DOM):
     a min(88vw, 280px) column translated -110% of its own width, i.e. -308px
     at 390px. The gesture layer never depended on this rule - it writes an
     inline transform !important - so only the CSS-driven click paths regressed. */
  [data-mobile-nav="frame"][data-sidebar-collapsed] > :first-child {
    width: min(88vw, 280px) !important;
    transform: translateX(-110%) !important;
  }

  /* Expanded state (frame without data-sidebar-collapsed) slides the drawer in.
     The open state must be transform:none — NOT translateX(0): an identity
     transform still makes the drawer the containing block for fixed-position
     descendants (the settings dialog's .VOzbGW_overlay is portaled into the
     sidebar DOM). With the identity transform the wide settings sheet
     (100vw-16) overflows the 280px drawer, the dialog's focus scrolls the
     overflow:hidden drawer to scrollLeft=102, and every static child (plus the
     fixed overlay) shifts 102px off-screen. With transform:none the overlay is
     viewport-anchored: it dims the full screen and the sheet sits at left:8. */
  [data-mobile-nav="frame"]:not([data-sidebar-collapsed]) > :first-child {
    transform: none !important;
  }


  /* The host's own drawer handle. It renders the branded fish glyph (a 24x17
     path in a 23.16x17.04 viewBox) and the phone owner reads it as a stray
     "whale" sitting at the very top-left of the header: measured [10,14,44,44]
     against our own toggle at [8,12,28,28], i.e. the two overlap in the same
     corner. It also duplicates what our toggle already does, so on the mobile
     branch it is removed. The selector keys on the host's own label - the
     element carries no distinguishing class (hHd-Xa_iconButton is shared with
     every other icon button, and the label flips to "Collapse sidebar" when the
     drawer is open, which is why the attribute prefix matches both states and
     both get removed). Nothing in this plugin queries that element; the drawer
     still opens from our toggle, the edge swipe, and closes by tapping the
     backdrop or swiping it away. */
  /* Two selectors and both are needed. The competitor is NOT the host's own
     CSS: @linxin666/dsh-web-all injects, under (max-width: 768px),
     [data-dsh-frame][data-sidebar-collapsed] [data-pane="sidebar"]
     [data-dsh-responsive-part="sidebar-toggle"] { pointer-events: auto;
     display: inline-flex !important }. That is 4 attribute selectors AND
     !important - exactly what the first selector below is - so this is NOT an
     out-specify, it is a TIE decided by sheet order, and it holds only because
     our sheet is injected after theirs. Measured twice, not inferred:
     scripts/probes/cascade-conflict-probe.mjs reports both sides imp=true at
     (0,4,0) and lists this as a reviewed order-tie; if the injection order
     flips, the dismiss shadow returns as a visible inline-flex box with
     pointer-events restored. Done (audit D-5 option A, 2026-09-16): every
     selector below carries a leading html, which lifts the first one to
     (0,4,1) and ends the tie - the outcome no longer depends on which sheet is
     injected later. The hash class and the label stay as fallbacks for hosts
     without that hook. */
  html [data-mobile-nav="frame"][data-sidebar-collapsed] [data-pane="sidebar"] [data-dsh-responsive-part="sidebar-toggle"],
  html [data-mobile-nav="frame"] [data-dsh-responsive-part="sidebar-toggle"],
  html [data-mobile-nav="frame"] [class*="hHd-Xa_toggle"]:is([aria-label*="sidebar" i], [aria-label*="侧边栏"]),
  /* The label-only fallbacks MUST stay scoped to the seats the host's own
     drawer handle can live in. Unscoped they match by aria-label substring,
     and the session row's ⋯ carries 会话“<title>”的操作 — so any session
     whose title contains 侧边栏 (or "sidebar") lost its ⋯ menu entirely
     (2026-09-22 phone repro: title 侧边栏不见了 → rowActions button
     display:none, row height unchanged, time shifted right by the 16px the
     button would have taken). Anchor them to the frame's leading seat and to
     the header's leading cell instead. */
  html [data-mobile-nav="frame"] [data-conversation-header-leading] button[aria-label*="sidebar" i],
  html [data-mobile-nav="frame"] [data-conversation-header-leading] button[aria-label*="侧边栏"],
  html [data-mobile-nav="frame"] [data-shell-leading] button[aria-label*="sidebar" i],
  html [data-mobile-nav="frame"] [data-shell-leading] button[aria-label*="侧边栏"] {
    display: none !important;
  }

  /* The host's own right sidebar IS the Files panel on phones, and the host
     pins it as a fixed full-bleed sheet: [data-sidebar-right-panel=fullscreen]
     carries position:fixed; inset:0 and no inset of its own (the host CSS
     never mentions safe-area at all). Its top row - the tab strip holding the
     tab label, the + button and the Split / Exit-fullscreen pair at the right
     edge - therefore sat UNDER the status bar: measured at 390x844 with the
     panel open, the strip is [0,0,390,38] and the phone's status bar owns the
     top of the screen. The frame's own safe-area padding cannot reach it: a
     fixed element's containing block is the viewport, not the frame's padding
     box. Taking the inset as padding keeps the panel's own --dsw-alias-bg-base
     covering the whole viewport (no seam behind the status bar) and drops the
     entire row below it, with the right-hand buttons still on the right edge.
     ONLY the fullscreen form: the host's docked form (measured at 820x1180 -
     form=push, position:absolute, 365px right-anchored) has the frame's
     padding box as its containing block, so it already starts below the
     status bar; padding it too would add the inset a second time. A host
     generation that renames the form value should fail the probe loudly
     instead of silently double-padding. The rule lives in the mobile branch,
     so desktop keeps the host layout. */
  [data-sidebar-right-panel="fullscreen"] {
    padding-top: env(safe-area-inset-top, 0px) !important;
  }

  /* Phone chrome keeps only the collapse control. Split visibility must not
     depend on data-dockkit-split-blocked: DockLayout measures after each commit,
     so conditional display can alternate blocked/allowed at the width threshold.
     Hide the wrapper too, since a blocked split wrapper is a tab stop. */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-sidebar-right-panel] [data-dockkit-split-button],
    [data-sidebar-right-panel] span:has(> [data-dockkit-split-button]),
    [data-sidebar-right-panel] [data-sidebar-right-mode="push"] {
      display: none !important;
    }
  }

  /* prefers-reduced-motion: the drawer's .28s slide is motion; drop it
     (audit S2 2026-08-27 — the old reduce block only covered the settings
     sheet and its mask). Same idiom as the animation:none blocks below. */
  @media (prefers-reduced-motion: reduce) {
    [data-mobile-nav="frame"] > :first-child {
      transition: none !important;
    }
  }

  /* Drag handles are useless on touch and would float over the drawer. */
  [data-side="sidebar"],
  [data-side="details"] {
    display: none !important;
  }

  /* --- Conversation text on mobile ---
     The official message flow keeps desktop's 32px side gutters and 16px
     type. On a phone: shrink the type a notch and widen the lines by
     trimming the gutters (the sidebar drawer list keeps its size). The
     flow's scroll container holds the markdown <p> paragraphs; since
     DSH 0.1.2-rc.1 the composer is a Lexical contenteditable that also
     renders real <p> paragraphs inside its own _scroll container, so the
     composer must be excluded explicitly via
     :not(:has([data-composer-input])). */
  /* The official main scroll body reserves scrollbar-gutter for desktop
     scrollbars (8px), which shoves every column off-center on a phone.
     Classic desktop scrollbars (Edge/Chrome) also occupy ~8-17px in a
     phone-sized viewport, shifting the column further. Mobile scrolling
     is touch/wheel, so remove the scrollbar entirely on phones: the
     column is then exactly centered in every browser. */
  [data-phase] [class*="_scrollBody"] {
    scrollbar-gutter: auto !important;
    scrollbar-width: none;
    /* 消息滚动体收拢自身的过滚动（pocket 补丁）：到底/到顶继续拽时不再把
       整页（drawer/背景）拖出橡皮筋。 */
    overscroll-behavior: contain;
  }
  [data-phase] [class*="_scrollBody"]::-webkit-scrollbar {
    display: none !important;
    width: 0;
    height: 0;
  }
  /* ---------- selection-drag autoscroll ramp (2026-10-07 live-host probe) ----------
     Report (Android): once the conversation chrome became unselectable, dragging
     the selection handle up stopped grabbing the title bar, but the conversation
     did not scroll WITH the finger - it teleported a few screens up instead.
     Mechanism measured on the live host (390x844, touch-emulated, selection anchor
     inside the message flow, pointer held 1.4s): Blink only starts autoscrolling a
     selection drag once the pointer is within ~3px of the scrollport's top edge,
     and the RATE grows with how far the pointer sits ABOVE that edge, saturating
     fast - y=140/100 -> 0 px/s, y=70 -> 1018, y=50 -> 2225, y=30 -> 3329,
     y=10 -> 3232 px/s. The conversation scrollport's top edge is the header's
     bottom edge (y=67), so every finger position on the header is 17-57px "above
     the list" and lands in the 2200-3300 px/s band: one 777px screen every ~0.23s,
     which reads as dropped frames / a jump to somewhere else. The ramp is
     geometric, not ours - from y>=100 nothing scrolls at all, so the speed is
     decided by where the list's box starts.
     Fix: extend the scrollport's box up under the header so a drag point over the
     header is only a few px above the list edge. Measured with the box moved to
     y=0: y=30 -> 0 px/s, y=10 -> 595 px/s. The visual position is unchanged by
     construction - the box grows upward by H while padding-top: H pushes the
     content back down, so an element at content offset X still paints at
     H + X - scrollTop (live-host check: header [0,0,390,67] and the composer seat
     [0,740,388,104] are identical before/after; only the box [0,67,388,777] ->
     [0,0,388,844] and scrollHeight +H move).
     H comes from --mobile-nav-header-h, written by the reconciler task
     "header-metrics" (phone-chrome.ts) as the header's bottom edge measured from
     the frame's top. It is 0px whenever the header is not measurable (hero / blank
     header), which makes both declarations below a no-op - the layout fails open if
     the host ever stops rendering a conversation header. Phone tier only: the
     desktop header is an ordinary in-flow bar and there is no touch selection drag
     to ramp. */
  [data-mobile-nav="frame"] [data-phase] [class*="_scrollBody"] {
    margin-top: calc(-1 * var(--mobile-nav-header-h, 0px)) !important;
    padding-top: var(--mobile-nav-header-h, 0px) !important;
  }
  /* ---------- selection handle drag: keep the extent local (2026-10-07) ----------
     The phone selection handle drag is a native (Android WebView
     TouchSelectionController) gesture: each move hit-tests the handle position to
     resolve the selection extent and then reveals that extent. With the bar
     unselectable but still hit-testable it won that hit test, Blink walked FORWARD
     in DOM order to the next selectable node - the flow's first item, the
     "Load earlier" gate, measured on the live host - and revealed it: the viewport
     teleported to the top of the conversation instead of extending by a line
     (reported as "not scroll-selection, it jumps somewhere else"). Dropping the bar
     out of the hit test for the duration of the selection lets the same point
     resolve into the message the lifted box above now puts underneath it, so the
     extent stays local and the scroll ramp stays gentle. 「pointer-events」 only -
     no layout change, so nothing reflows while the finger is down. The marker is
     set by installSelectionChromeYield (phone-chrome.ts) and only for selections
     that live in the conversation (composer/drawer keep their chrome
     interactive); header buttons remain reachable the moment the selection
     collapses, which is also what a tap anywhere else does. */
  html[data-mobile-nav-selecting] [data-mobile-nav="frame"] [data-phase] header {
    pointer-events: none !important;
  }
  /* A transparent header was harmless while nothing could scroll underneath it;
     with the box lifted it would show the messages through the title row
     (headless screenshot 2026-10-07: message text bled across "Standard mode"
     and the tab strip), so the header rule below now carries an opaque
     background. */
  /* Message action rows (copy / run-time badges) can overflow the right
     edge on narrow screens — keep them inside the message width. */
  [data-phase] [class*="_actions"] {
    overflow: hidden;
  }
  [data-phase] [class*="_actions"] [class*="_timeEnd"] {
    flex: 0 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap !important;
  }

  /* Message tooltip bubbles (copy / feedback labels, message-row hover
     bubbles) are redundant on touch: the icon already flips to a checkmark.
     Suppress only inside the actions row — the fork's original scope. On
     this host (0.1.1-rc.2) NO tooltip renders as a visible bubble: the copy
     label is a visuallyHidden span and no client-ui package emits
     role="tooltip". The user message bubble (Sixlwa_bubble since the host moved
     it to dsh-client-ui-chat) and the goal
     bubble (oRe1gG_bubble) live in _userStack/_row, NOT in _actions — the
     previously unscoped selector hid every user message on touch devices
     (2026-09-06 live regression). role="tooltip" stays globally suppressed:
     genuine ARIA tooltips are exactly what the sticky-residue fix targets,
     and nothing legitimate carries the role today. The actions-row arm
     re-activates by itself when a host version renders tooltip labels
     inline in the actions row (DSH 0.1.2 shape). */
  @media (hover: none), (pointer: coarse) {
    [data-phase] [role="tooltip"],
    [data-phase] [class*="_actions"] [class*="_bubble"] {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
  }

  [data-phase]
    [class*="_scroll"]:not([class*="_scrollBody"]):not(:has([data-composer-input])):has(p) {
    padding-left: 20px;
    padding-right: 20px;
    /* Message text follows the host's own font-size axis (Settings -> 字号大小)
       instead of a frozen phone constant. The host writes the user's choice to
       <body> as --dsh-content-font-size and derives the longhand token
       --dsw-font-markdown-base-font-size from it; the previous 15px !important
       cut that chain at the container, so settings 12-17 did nothing for message
       text while the host's own markdown blocks still moved — two sizes mixed in
       one column (#52). Read the longhand token only: the other token ending in
       -base is the font shorthand, an invalid font-size value that the parser
       drops and the cascade silently falls back on. The fallback chain ends at
       the host's own default axis value. */
    font-size: var(--dsw-font-markdown-base-font-size, var(--dsh-content-font-size, 14px)) !important;
  }
  /* Descendants only inherit: the host already resolves the same token on its
     own markdown blocks (and its styles pin 16px on paragraphs / list items),
     so a rule per p / li / user-message text would cut the axis a second time. */
  [data-phase]
    [class*="_scroll"]:not([class*="_scrollBody"]):not(:has([data-composer-input])):has(p) p,
  [data-phase]
    [class*="_scroll"]:not([class*="_scrollBody"]):not(:has([data-composer-input])):has(p) li,
  [data-phase]
    [class*="_scroll"]:not([class*="_scrollBody"]):not(:has([data-composer-input])):has(p) [
      class*="_text_"
    ] {
    font-size: inherit !important;
  }

  /* Markdown tables: the official table uses width:max-content, so on a phone
     it hugs the content and leaves dead space beside/inside the table. Force
     the table to fill the message column and let the table wrapper handle
     overflow if a cell is genuinely too wide. */
  [data-phase] table {
    width: 100%;
    max-width: 100%;
  }
  [data-phase] th,
  [data-phase] td {
    max-width: none;
    min-width: 0;
  }

  /* Markdown images: the official rule often forces width:100%, which
     upscales small square images to the full message column. Show small
     images at their intrinsic size; large / very wide images still scale
     down to fit the column (max-width:100% keeps horizontal panoramas
     adaptive without overflowing). */
  [data-phase] [class*="_scroll"]:not([class*="_scrollBody"]) img {
    width: auto !important;
    max-width: 100% !important;
    height: auto !important;
    /* Cap square / tall images so a big sticker does not dominate the
       narrow column; landscape images stay governed by max-width only.
       The plain px line is the fallback for engines without dvh. */
    max-height: 220px !important;
    max-height: min(40dvh, 220px) !important;
  }

  /* User bubbles: the official stack is capped at min(525px, 82%), which on a
     phone leaves a large blank strip on the left and pushes the bubble high.
     On mobile let the user message fill the same full width as assistant
     messages (the bubble background then spans the whole message column). */
  [data-phase] [class*="_userStack"],
  [data-phase] [class*="_userStack"] [class*="_bubble"] {
    box-sizing: border-box;
    width: fit-content;
    max-width: 100%;
  }

  /* 底部安全区与输入框边距（pocket 补丁，v3.1.0 起重算）：frame 自身已垫
     env(safe-area-inset-bottom)（上方 html [data-mobile-nav="frame"] 规则，
     v3.1.0 新增的 #193 修复），座位只补 2px 呼吸缝。旧值 calc(5px +
     env(...)) 是 v3.0.3 时代 frame 不垫底部的补偿——现在照叠会把 inset 计
     两遍（34px inset 真机 ~73px 下巴）。类名哈希代际不同时规则静默 no-op
     （与上游其余规则同一种脆弱性）。 */
  [data-mobile-nav="frame"] [class*="_composerSeat"],
  div[class*="_frame"] [class*="_composerSeat"],
  [data-mobile-nav="frame"] [data-phase] [class*="_composerSeat"] {
    padding-bottom: 2px !important;
  }

  /* 输入卡外层 root 的 8px 底垫收紧为 2px（pocket 补丁）：root 是宿主
     InputBar 的包裹层（padding: 0 … 8px），底垫只服务桌面悬浮态；移动端
     frame 已垫 inset，这 8px 属于重复留白。root 结构变化时 :has 不匹配，
     规则退化为 no-op。 */
  [data-mobile-nav="frame"] [class*="_composerSeat"] [class*="_root"]:has(> [class*="_card"]),
  div[class*="_frame"] [class*="_composerSeat"] [class*="_root"]:has(> [class*="_card"]),
  [data-mobile-nav="frame"] [data-phase] [class*="_composerSeat"] [class*="_root"]:has(> [class*="_card"]) {
    padding-bottom: 2px !important;
  }

  /* 座位钉底（pocket 补丁，10-14 真机底部空白案第二轮定案）：iOS WebKit 上
     viewArea（显式 px 高度的 flex 子项）在滚动容器 flex 列里 flex-grow 不生效
     （Blink 同构即拉伸，WebKit 停在内容高），内容不足一屏时座位按流内位置悬在
     内容末尾、与窗口底之间留出死区（真机探针 seatB=643 vs 视口 796）。座位是
     scrollBody 的直接 flex 子项，margin-top:auto 是跨引擎页脚钉底模式：有富余
     时吃掉全部自由空间把座位压到容器底，无富余（内容满/超一屏）时解析为 0、
     与 sticky 行为和长内容态完全无扰。hero 态被 [data-phase=active] 排除——
     hero 的居中布局依赖自由空间分配，auto margin 会抢走它把输入框甩到底。
     全部走宿主稳定标记（data-phase/-scroll/-seat），无哈希脆弱性。 */
  [data-phase="active"] [data-conversation-scroll] > [data-composer-seat] {
    margin-top: auto !important;
  }

  /* --- Composer bottom row on mobile ---
     The official row contains two lanes: tools (plus + permission/mode
     controls) and trailing (model + context + send). The previous rules made
     the modes lane flex:none, so its full intrinsic width collided with the
     model selector on narrow phones. Keep fixed hit targets fixed, but let
     text-bearing controls shrink and ellipsize before they paint over the
     trailing lane. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) {
    box-sizing: border-box;
    container-type: inline-size;
    container-name: dsh-mobile-composer;
    flex-wrap: nowrap;
    /* 2026-09-23 店主："每个功能键隔的空间太多"。真机实测间距主要不是 gap（6px）
       而是各控件自己的内边距；这里 gap 收到 3px，配合下面模型 chip 的 padding
       收紧，把右簇焊成一团。 */
    gap: 3px;
    padding-left: 6px;
    padding-right: 6px;
    /* The dropdown menu is absolutely positioned inside this row; any
       overflow: hidden here would clip it. Inner lanes keep their own
       overflow clipping, so the row itself can stay visible. */
    overflow: visible;
  }
  /* Dual-primary form (subagent view: stop + send). The four-control
     cluster [model][meter][stop][send] overflows the single-row lane the
     nowrap rule above enforces; the model pill is the only shrinkable
     item, so it collapses to zero and the fixed trio loses its auto
     margin (all hug the lane's left edge, send may even paint off-view).
     Restore the official wrap for this form only: the trailing lane
     drops to a second full-width row where the four controls always
     fit. Main-session three-control form keeps single-row layout. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]):has([class*="_primary"] ~ [class*="_primary"]) {
    flex-wrap: wrap;
  }
  /* Issue #140: in that same dual-primary form the stop key and the send key
     sit one 3px lane-gap apart — two same-shaped 34px pills where a mis-touch
     on the left one interrupts the running reply. The 2026-09-23 「焊在一起」
     3px decision keeps governing the main session's [model][send] cluster;
     only this form (the one with two adjacent destructive-adjacent primaries)
     gets +8px between the stop and the send key. Knob: margin-right. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]):has([class*="_primary"] ~ [class*="_primary"]) > [class*="_trailing"] > [class*="_primary"]:has(~ [class*="_primary"]) {
    margin-right: 8px;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > :first-child {
    flex: 0 1 auto;
    min-width: 0;
    /* 2026-09-23 店主第三轮："左边那三个功能区挨得太近了，隔开一点点"。
       权限控件收窄 16px 后，📎 跟着整体左移、贴到了 ⌄ 上（实测墨迹间距只剩 ~3px）。
       工具道 gap 单列放宽到 8px（右簇仍 3px，保持焊在一起）。 */
    gap: 8px;
    /* The permission dropdown (Menu, side: top) pops upward from inside the
       tools lane; overflow hidden here would crop it, same as the row. Text
       ellipsis is handled by the trigger label itself. */
    overflow: visible;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] {
    flex: 1 1 auto;
    min-width: 0;
    gap: 3px;
    /* Must not clip the model dropdown; the model trigger clips its own label. */
    overflow: visible;
  }
  /* Permission / plan controls share the tools lane inside the a2-style
     'div.modes' container (class survives as 'css.modes'; audit doc §10.1 /
     E-1). The positional anchor '> :first-child > :nth-child(2)' was already
     off-target on rc.2 and dies entirely on a2, so the series re-anchors on
     the tools lane's modes container: '[class*="_tools"] > [class*="_modes"]'
     (live-verified on the rc.2 host: the modes div is a direct child of the
     tools lane, a grandchild of the row — a row-direct-child anchor matches
     nothing on either generation). The permission label uses the remaining
     tools width, while the lower-priority plan slot keeps an icon-sized
     target instead of stealing model width. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] {
    flex: 0 1 auto;
    min-width: 0;
    max-width: none;
    /* 2026-09-23 店主："左边那个权限的也缩一点点"：容器 gap 4→0。 */
    gap: 0;
    /* The permission Menu list (side: top) pops upward out of this lane;
       overflow hidden crops it. The trigger label clips its own text. */
    overflow: visible;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] > [class*="_trigger"] {
    flex: 1 1 auto;
    min-width: 28px;
    max-width: 100%;
    display: flex !important;
    overflow: hidden;
    /* 权限 trigger 自带内边距 + flex gap（图标与 ⌄ 之间），图标化后都是浪费：
       2026-09-23 按店主"缩一点点"归零（真机 44px 盒 → ~34px）。 */
    padding: 0 !important;
    gap: 0 !important;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] > [class*="_trigger"] > [class*="_triggerLabel"] {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap !important;
  }
  /* Slot wrappers such as the live plan chip are not trigger elements. Do
     not force them into an icon-sized box: their child button would overflow
     that wrapper and paint over PermissionSelect. Keep the wrapper intrinsic;
     the model lane below is the one that sacrifices width. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] > :not([class*="_trigger"]) {
    flex: 0 1 auto;
    min-width: 34px;
    max-width: max-content;
    overflow: visible;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] > [class*="_wrap"] > [class*="_chip"] {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap !important;
  }
  @container dsh-mobile-composer (max-width: 359px) {
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_tools"] > [class*="_modes"] > [class*="_trigger"] > [class*="_triggerLabel"] {
      display: none !important;
    }
  }
  /* 权限触发器（宿主 dsh-client-ui-permission-presets，样式哈希 iWlSmW_）自身带
     padding:0 4px 0 8px + gap:4px —— 与模型 chip 同款浪费（左 8px 是给文字留的）。
     2026-09-23 店主："左边那个权限的也缩一点点"。注意：它外面套了一层
     display:contents 包装（真机探针：modes[55,44] > div[contents] > root[55,44]），
     所以「_modes > _trigger」这类直接子代锚点命不中（上一版改了没反应），
     必须用哈希后代锚点；哈希变了整条自动失效，不会误伤别家。 */
  [data-mobile-nav="frame"] [data-phase] [class*="iWlSmW_trigger"] {
    padding: 0 !important;
    gap: 0 !important;
  }
  /* 2026-09-23 店主："权限的图标有点小，稍微大一点点，不然左边轻右边重"。
     宿主把图标包在 _triggerIcon 里、自己写死 14px（iWlSmW_triggerIcon svg
     的 width/height 都是 14px），与 + / 📎 的 16px 不齐。只放大那个包装里的
     svg：⌄ 箭头不在 _triggerIcon 内，不会被一起放大。盒子 28×28 不变（16 仍有余量）。
     注意：本文件是模板字符串，注释里**不能出现反引号**（会劈开 CSS）。 */
  [data-mobile-nav="frame"] [data-phase] [class*="iWlSmW_triggerIcon"] svg {
    width: 16px !important;
    height: 16px !important;
  }

  /* Model selector: flexible and shrinkable, but never clipped.
     The root must be overflow:visible so the dropdown menu can render.
     The trigger itself clips the label text. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="menu"]) {
    flex: 0 1 auto;
    min-width: 0;
    overflow: visible;
  }
  @container dsh-mobile-composer (max-width: 359px) {
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="menu"]) {
      flex-basis: auto;
    }
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="menu"]) > [class*="_trigger"] {
    display: flex !important;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="menu"]) > [class*="_trigger"] > [class*="_triggerLabel"] {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap !important;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_root"]:has(> [class*="_trigger"]):not(:has(> [class*="_trigger"][aria-haspopup="menu"])) {
    flex: 0 0 auto;
  }

  /* Model switcher menu: was centered here with left:50% + translateX(-50%), but the
     host now PORTALS the menu to <body> (measured 2026-09-23: _7KE1Ra_menu, role=menu,
     position:fixed, parent=BODY, inline left/top), so this child-chain selector stopped
     matching and the rule had been dead. The re-anchor lives in JS instead —
     effects/model-menu-anchor.ts centers the panel on the trigger and clamps it to the
     viewport. Do not re-add a CSS rule here without checking the portal parent. */

  /* Phone reasoning-effort list is compact; the model catalog and the tablet stay
     host-sized. Measured on the real host bundle (dsh-client-ui-model-selection
     0.2.0-rc.2, 393x844, phone emulation): the effort pane renders 248px wide
     (its own min-width is 240px) while its four levels need far less.
     The two panes differ in the SHAPE of their radio list, and that difference is
     the only reliable discriminator (measured, same run):
       effort pane   DIV._surface_ri079_1._7KE1Ra_menu[role=menu]
                       > DIV._material_ri079_21
                       > button._7KE1Ra_option[role=menuitemradio]   <- DIRECT child
       model pane    DIV._surface_ri079_1._7KE1Ra_menu[role=group]
                       > DIV._material_ri079_21
                       > DIV._7KE1Ra_groups.scrollable[role=menu]
                           > SECTION._group_121p8_1[role=group] > button[role=menuitemradio]
     The host sets 「role: pane === "model" ? "group" : "menu"」, so the effort pane is
     the role=menu shell and its radios ARE direct children, while the catalog's sit
     two levels deeper. Requiring both halves — role=menu AND a direct-child radio —
     therefore selects the effort list and leaves the catalog at its host size.
     Neither half is safe alone: dropping the role also matches the catalog's inner
     _groups container, and matching radios as descendants selects the catalog shell.
     (Measured with each variant: the group/descendant form hit the catalog only.)
     「min-width: 0 !important」 is load-bearing: without it the host's own
     min-width 240px keeps the pane at 240 no matter what width is set. */
  @media (max-width: 767px) and (pointer: coarse) {
    [class*="_7KE1Ra_menu"][role="menu"]:has(> [role="menuitemradio"]) {
      width: min(208px, calc(100vw - 32px)) !important;
      min-width: 0 !important;
      max-width: calc(100vw - 32px) !important;
    }
  }

  /* --- Fix composer row overflow at narrow widths (320px-360px) ---
     Force every direct child of the tools and trailing lanes to shrink,
     so they can fit within the available space without causing horizontal
     overflow. The fixed-size icon buttons are exempt: officially both are
     flex:none at a fixed size (plus 28x28, send 34x34) and must stay put,
     not participate in adaptation. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > :first-child > :not([class*="_add"]) {
    flex-shrink: 1;
    min-width: 0;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > :not([class*="_primary"]) {
    flex-shrink: 1;
    min-width: 0;
  }
  /* Pin the plus button at the left edge of the tools lane: official
     flex:none 28x28, never squeezed by narrower viewports. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > :first-child > [class*="_add"] {
    flex: none;
  }
  /* The context meter in the trailing lane is another fixed-size icon
     control: its trigger is officially width:28px flex:none, but the root
     itself is shrinkable, so a squeezed root lets the trigger paint over
     the pinned send button. Keep the whole meter at its natural size; its
     trigger uses aria-haspopup="dialog", so the model-selector menu rules
     (keyed on "menu") still do not apply.
     GENERATION NOTE (issue #140, 2026-09-29): 0.1.7-rc.2 moved the
     ContextMeter out of this lane into the dock row under the card (next to
     the TPS stats pills) — on rc.2 NONE of the trailing-lane meter rules in
     this section match any more, and the trigger is back to its official
     ~22px-tall box. They stay for the 0.1.5/0.1.6 generations where the
     meter really rendered in the lane (structural anchors, inert elsewhere);
     the rc.2+ hit-area repair lives in the dock-row section below. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > [class*="_root"] {
    flex: none;
    min-width: 0;
  }
  /* --- 右簇贴右：2026-09-23 重新对锚（模型胶囊改"只留图标"后暴露的旧账）---
     宿主把右簇（模型座位 standardControls / 麦克风 activity / 发送 primary）
     放进可增长的 trailing 车道，靠"某个成员带 margin-left:auto"把整簇顶到右缘。
     插件原来把吸收器挂在模型 root 上：
       > [class*="_trailing"] [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="menu"])
     但 0.1.7 的祖先链变成了
       trailing > standardControls(flex item) > div[display:contents] > _root > _trigger
     于是 root 只是 standardControls **内部**的 flex item，auto 外边距落在一个
     内容宽度的盒子里 ⇒ 等于失效。真机探针实测三者 ml 全 = 0px，就是铁证。
     2026-09-23 之前胶囊很宽、把车道填满，看不出来；胶囊一收成图标，右簇立刻
     塌到左边（发送 x≈316 → 224，右边空出 ~76px，店主一眼看出"位置被移了"）。
     修法：把吸收器改锚到「车道的第一个 flex item」，并只在模型座位在场时生效
     —— 那时宿主那条把 primary 的 auto 清零的规则也在生效，避免两个 auto 平分
     空隙；模型不在场（子代理视图）照旧由 primary 自己的 auto 收尾。
     justify-content: flex-end 是兜底：万一首个 child 是 display:none，auto
     无处可挂时仍能贴右（此时无 auto 外边距，flex-end 才起作用）。 */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"]:has([class*="_trigger"][aria-haspopup="menu"]) {
    justify-content: flex-end;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"]:has([class*="_trigger"][aria-haspopup="menu"]) > :first-child {
    margin-left: auto;
  }
  /* ContextMeter (JObwrW_ hash family) hugging the primary key. This single
     value is the whole spacing knob, and because the trigger box is centred on
     the ring ink it doubles as the ink offset:
       6px + margin-right = the sliver before the primary key = the ink's
       leftward shift. 0px (current) therefore shifts the ink 6px -- exactly the
       official lane gap, with no negative-margin trick left in the chain --
       while -6px pins the ink perfectly still and +8px was vetoed on
       2026-09-17 as "too much" (14px). The phone owner asked for a visible
       shift after 1px (-5px) proved imperceptible, and will re-tune this number
       by eye: change it and nothing else moves.
     Anchor on the unique aria-haspopup="dialog" trigger (no other composer
     control uses it), not the hashed class, so an upstream hash bump cannot
     silently unhook us. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="dialog"]) {
    margin-right: 0px;
  }
  /* The model pill joins the same right cluster: its margin-left:auto absorbs
     ALL trailing slack, so the adaptive void sits between the tools lane and
     the pill (visible on wide phones/tablets), while [pill][meter][send] stay
     welded together at the right edge on every width. Descendant combinator
     on purpose: the pill root sits behind a display:contents wrapper, so a
     direct-child combinator silently misses (probe-verified). Within the
     trailing lane aria-haspopup="menu" belongs to the model trigger alone. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="menu"]) {
    margin-left: auto;
    margin-right: -4px;
  }
  /* Grow only the invisible trigger BOX, never the ring ink: 24x24 -> 28x34.
     The WIDTH is capped at 28 by pure geometry, not by taste: the box is
     centred on the ink, and the primary key's hit box begins 14px right of the
     ink's centre, so 28 is the widest box that can reach that boundary without
     stealing a single pixel from the destructive key (the current 1px sliver
     is the spacing knob on the root rule above); the same arithmetic puts the
     left edge on the model pill's edge. The 34px HEIGHT is free: the primary
     key is already the tallest control in the lane, so the box cannot overlap
     anything vertically and the row height does not move. Hit area 576 -> 952
     square px (+65%) with the ink within 1px of its old spot (probe-asserted),
     and the ring's ink stays at its official 14px -- enlarging it is rejected
     as attention-grabbing. Knob: height can drop to 28 if the tap halo should
     be a circle rather than a stadium. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="dialog"]) > [class*="_trigger"] {
    width: 28px;
    height: 34px;
    padding: 0;
  }
  /* Slack-absorber priority in the trailing lane: model pill > meter > send.
     Exactly one element carries margin-left:auto so the adaptive void always
     sits BEFORE the welded right cluster, never inside it. The meter itself
     never had an auto before 2026-09-06: in subagent sessions the model seat
     is officially absent (the parent pins the model), and zeroing the send's
     auto on the meter's aria-haspopup="dialog" then left NOTHING to absorb
     slack -- the whole right cluster hugged the lane's left edge (user
     screenshot). Fix: when no model pill renders, the meter root becomes the
     absorber, welding [meter][send] at the right edge like the main view's
     [pill][meter][send]; the send's auto only survives when neither renders. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"]:not(:has([class*="_trigger"][aria-haspopup="menu"])) > [class*="_root"]:has(> [class*="_trigger"][aria-haspopup="dialog"]) {
    margin-left: auto;
  }

  /* --- rc.2+ 的第二个失效面：子代理 composer 里环锚点回不到发送键左边（2026-10-12）---
     上面那条「无模型胶囊时由 ContextMeter 当吸收器」的兜底，在 **0.1.7-rc.2+** 上
     再也匹配不到：宿主已经把 ContextMeter 从 trailing 车道搬进卡片下方的 dock 行
     （实测路径 … > [class*="_card"] > [class*="_root"] > [class*="_dock"] > span.JObwrW_root），
     它不再是车道的子元素，「:has(> [class*="_trigger"][aria-haspopup="dialog"])」落空。
     后果（headless 393×844 实测，主/子两视图同机对比）：子代理会话里模型胶囊整个不渲染，
     「standardControls」塌成 0×0 且 margin-left:0，于是车道里唯一带 auto 的是发送键自己，
     插件注入的环锚点 span[data-mobile-nav="stats-ring-reserve"]（普通流内元素）被留在
     车道左缘 —— 环 x=127，而主会话同一元素 x=310、发送键在 333：**188px 空档**，
     用户看到的就是「上下文表跑到左边去了」。
     修法与 #191 同源（同一根因族：rc.2 把 meter 搬走后，车道里的 auto 归属没人接管）：
     没有模型胶囊时让**环锚点**顶替 meter 当吸收器，并把发送键的 auto 清零 ——
     不清零的话两个 auto 会平分空隙，环同样回不到键边。
     门控与上面那条兜底完全一致（车道里没有 aria-haspopup="menu"），所以主会话
     （模型胶囊在场）零改动。 */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"]:not(:has([class*="_trigger"][aria-haspopup="menu"])) > [data-mobile-nav="stats-ring-reserve"] {
    /* !important 不可省：compat 层有一条 [data-mobile-nav="stats-ring-reserve"]
       { margin: 0 2px 0 0 !important }。两条都 important 时先比特异性 —— 本选择器
       远高于那条裸属性选择器，加 !important 就能赢；不加则被它压成 margin-left:0。
       2026-10-12 受控实验实测：不加 → 环仍停在 x=127、发送键反被拉到 150（188px 空档
       只是从「环与键之间」搬到「键的右侧」）；加 → 环 310 / 键 333，正是期望值。 */
    margin-left: auto !important;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"]:not(:has([class*="_trigger"][aria-haspopup="menu"])) > [class*="_primary"] {
    margin-left: 0;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] > [class*="_primary"] {
    flex: none;
    margin-left: auto;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"]:has([class*="_trigger"][aria-haspopup="menu"], > [class*="_root"] > [class*="_trigger"][aria-haspopup="dialog"]) > [class*="_primary"] {
    margin-left: 0;
  }
  /* Issue #191 — the subagent running form (stop + send, both _primary) has
     NEITHER of the zeroing rule's two gates: ModelSelect renders nothing in an
     addressed subagent session (no aria-haspopup="menu" in the lane) and the
     meter lives in the card's dock row since rc.2 (no _root > dialog trigger
     in the lane either). Both primaries therefore keep the auto margin from the
     rule above, and flex SPLITS the free space between the two auto margins —
     the stop key lands mid-lane with a void on both sides of it.
     Same recipe as the model-present case (:707-712): zero every auto so no
     element competes for the slack, and let justify-content pin the whole
     cluster right. Zeroing alone would hug the LEFT edge instead, so both
     halves are required. Scoped to the dual-primary form, so the main
     session's single-primary path keeps its auto untouched. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]):has([class*="_primary"] ~ [class*="_primary"]) > [class*="_trailing"] {
    justify-content: flex-end;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]):has([class*="_primary"] ~ [class*="_primary"]) > [class*="_trailing"] > [class*="_primary"] {
    margin-left: 0;
  }

  /* --- ContextMeter hit area on 0.1.7-rc.2+ (issue #140) ---
     The stats-line overlay parks the ring in the composer card's trailing
     lane (right cluster next to the send key — a deliberate 2026-09-23
     placement, kept per the reporter's confirmation at acceptance). The
     official trigger is 16x20px, far under the touch minimum. Regrow the
     hit area IN PLACE with a transparent ::after (the 📎 recipe).
     2026-09-29 acceptance, final geometry (headless-measured): the ring
     svg and its reserve are set to 18px (compat.css.ts — 16px was too
     small to aim, 24px/20px too big, the reporter settled on 18px), the
     width growth is absorbed by the lane's left slack so the key gaps
     stay 6px/5px, and the hit box is a SYMMETRIC 26x26 square
     (inset -4px) keeping the generous touch area around the smaller
     ring — 2px/1px clearance to the model and send keys. The track is
     deepened to 25% black (compat.css.ts) so the donut reads as a
     meter, not a spinner.
     Knobs: the svg/reserve size (compat.css.ts) and this inset; the box
     must stay a square hugging the ring, its edges clamped by the two
     neighbouring keys. The dock container owns only this one dialog
     trigger (the TPS stats pills render plain text), so a scoped
     aria-haspopup="dialog" anchor cannot cross-match anything; the DOM
     ancestry (ring inside the dock container) is unchanged by the
     overlay's absolute positioning. */
  [data-phase] [class*="_dock"] [class*="_trigger"][aria-haspopup="dialog"] {
    position: relative;
  }
  [data-phase] [class*="_dock"] [class*="_trigger"][aria-haspopup="dialog"]::after {
    content: '';
    position: absolute;
    inset: -4px;
  }

  /* --- Third-party model seats (issue #60: @hytime/dsh-thinking-effort) ---
     A seat registered on conversation.input.model replaces the official pill,
     so the trailing lane no longer contains an aria-haspopup="menu" trigger:
     the pill absorber rule above never matches, and the meter fallback below
     would split the slack with the seat (two auto margins share it), leaving
     the seat stranded mid-lane. Worse, in the seat's open state the root's
     only child is the absolutely positioned panel, so the root collapses to
     zero width and the panel's right:0 anchor (width min(336px, 100vw - 32px))
     sweeps 336px leftward from wherever the stranded root sits — 230px off
     screen at 393px (reporter-measured: root x=106, panel left=-230; with our
     stylesheet disabled the root sat at x=339 and the panel at +3, which pins
     the blame on our injection). Both repairs anchor on the plugin's own
     stable data-seat-* markers (identical across v0.2.3-v0.3.7) and leave the
     official pill untouched:
     1. the seat root stretches across the trailing lane with its content
        pushed to the right edge, so the closed chip welds onto the
        [meter][send] cluster AND the grown root consumes all free space,
        which zeroes the meter fallback's margin-left:auto (flexible lengths
        resolve before auto margins — no double void). The root is also made
        position:static so the panel below anchors to the composer card
        instead — the root is 0-width while the panel is open, so any
        root-relative offset is meaningless;
     2. while the panel is open its anchor is laid over the composer card
        (left:0/right:0 against the card's padding box + an auto-margin
        centre), so the panel is centred on the card, never rides the
        collapsed root and never leaves the viewport.

     ── 2026-10-04, thinking-effort 0.3.7: the old centring recipe had to go ──
     Repair 2 used to be 'left:50%; right:auto; transform:translateX(-50%)'.
     That recipe only worked while the plugin positioned nothing itself: a
     mobile viewport left the panel hanging off whichever edge the collapsed
     root sat near. 0.3.7 added its own narrow-screen clamp, which writes an
     INLINE 'left' (390px phone, new chat: root x=122, inline left=-106px —
     i.e. 16px, exactly the right place). Inline 'left' wins over the
     stylesheet, so the recipe's 'left' became dead weight while its
     'transform' kept firing, shifting the panel half its width further left:
     x = 122 + (-106) + (-168) = -152px, off screen by 152px — the reproduced
     bug. Two layers each half-applied. The fix keeps repair 1 (the stretch
     is still what welds the closed chip onto the [meter][send] cluster) and
     replaces repair 2 with the card-anchored recipe above; 'transform:none'
     is what neutralises the stray translateX, and 'left:0' is '!important'
     because it must beat that inline value. Panel width stays the plugin's
     own (336px, capped at 100%) so the Off/High/Max ticks keep their
     designed spacing.

     The panel opens bottom:calc(100% + 8px) above the card, but the card is
     only 70-108px tall on a phone while the panel is 208px, so it always
     overflows upward — that is the plugin's own desktop behaviour and is
     kept. What is NOT acceptable is overflowing the VIEWPORT, so three
     guards follow (the inner listbox, the keyboard-short phone, landscape).
     Every guard stays inside this mobile media query: desktop untouched. */
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] [data-seat-root] {
    flex: 1 1 auto;
    justify-content: flex-end;
    /* Keep parked here rather than in a second rule: the panel below anchors
       to the card, not to this root. */
    position: static !important;
  }
  [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] [data-seat-root] > [data-seat-panel] {
    left: 0 !important;
    right: 0 !important;
    max-width: min(100%, 420px) !important;
    transform: none !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  /* Guard 1 — the panel's inner model listbox opens upward (bottom:58px
     inside the panel) with max-height:min(220px, 100vh - 96px). On a short
     screen that ceiling is taller than the room above the panel, so the
     listbox pokes past the viewport top (320x568: menu y=-41). Clamp it to
     half the viewport minus the panel's own 58px offset + padding. */
  @media (max-height: 700px) {
    [data-seat-model-menu] {
      max-height: min(220px, calc(50vh - 110px)) !important;
    }
  }

  /* Guard 2 — with the on-screen keyboard up (portrait, ≤505px tall) there
     is not even 208px of room above the card. Let the whole panel scroll
     inside itself instead of escaping the top; children keep their natural
     height so the slider and its ticks are never squashed. */
  @media (orientation: portrait) and (max-height: 505px) {
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] [data-seat-root] > [data-seat-panel] {
      max-height: calc(50dvh - 45px) !important;
      overflow-y: auto !important;
      overscroll-behavior: contain !important;
    }
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] [data-seat-root] > [data-seat-panel] > * {
      flex: 0 0 auto !important;
    }
  }

  /* Guard 3 — landscape: above the card there are only ~156px (the card
     sits low, the panel is 208px), so an upward opening can never fit.
     Detach the panel into a bottom-docked sheet instead; it floats clear
     of the card and the viewport top. */
  @media (orientation: landscape) {
    [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) > [class*="_trailing"] [data-seat-root] > [data-seat-panel] {
      position: fixed !important;
      left: 16px !important;
      right: 16px !important;
      bottom: 12px !important;
      top: auto !important;
      transform: none !important;
      margin: 0 auto !important;
      max-width: min(100%, 420px) !important;
    }
  }

  /* --- Composer file entry (0.1.6 host) ---
     The 0.1.6-alpha.2 host deleted the composer's paperclip attach button, so
     the only file entry left is the 文件 row inside the "+" listbox. The
     control is contributed to the host-declared conversation.input.left list
     slot ("Compact controls at the left of the composer tool row"), inside the
     tools lane beside the plus button, so only its own box is needed here:
     28x28 like the plus button and fixed — one of the row's hit targets, never
     part of the adaptive shrink. Its click handler triggers the host's own
     hidden input[type=file], so intake validation and upload stay host-owned. */
  [data-composer-card] [data-mobile-nav="file-upload"] {
    flex: 0 0 auto !important;
    /* 2026-09-23 店主："触发点有点小，没那么容易点" ⇒ 盒子 28×28 → 34×34
       （面积 +47%），再由下面的 ::after 向外扩 4px（最终命中区约 42×42）。
       **图标位置不变**：盒宽 +6 后 margin-left 从 -10 收到 -13，图标中心原地不动；
       高度对齐发送键的 34px，行高不受影响。 */
    /* 2026-10-07 店主：「点一下有一层深一点的灰色，也有一层浅一点的灰色，去掉一层」。
       根因是**嵌套两层**：宿主的按钮盒底色（34x34、圆角 8）与我们的 ::before 胶囊
       （28x28 圆）半透明叠半透明 —— 重叠区深、外圈浅。压层叠（!important）在真机上
       压不住那一层（实测按下仍是 233 外圈 + 222 内层），所以改成**结构上只有一层**：
       可见胶囊 = 按钮盒本身。盒子 28x28 + 全圆角，与加号同尺寸；图标中心不变
       （盒宽 34→28 ⇒ margin-left 由 -11 收到 -8）；命中区仍由 ::after 外扩。 */
    width: 28px !important;
    min-width: 28px !important;
    max-width: 28px !important;
    height: 28px !important;
    min-height: 28px !important;
    padding: 0 !important;
    position: relative !important;
    /* 左移 10px + 图标 14→16px（2026-09-23，店主："太往右了、有点小"）：
       工具道现在是 [+][⚠⌄][📎]，宿主给 modes 控件留了较宽的尾部留白，📎 看着
       离左边一截。与参考图逐像素对齐（以 + 为锚点）：参考 📎 墨迹 107..117 CSS，
       我们原先是 114..123；而墨迹高度 48 vs 参考 54 物理 px ⇒ 图标 14 偏小，
       换成宿主通用的 16（+ / ⚠ 都是 16）。28px 盒 + 16px 图标居中 ⇒ 墨迹左缘
       = 盒左缘 + 8.85，故盒左缘取 98 ⇒ margin-left: -10px（吃掉 6px gap 后再
       压进 modes 尾部留白 4px，不碰它的墨迹：chevron 墨迹止于 ~91）。
       这一个数值就是"往左多少"的旋钮，可按眼睛调，别动别的。 */
    margin: 0 0 0 -8px !important;
    display: grid !important;
    place-items: center;
    border: 0 !important;
    border-radius: 999px;
    background: transparent;
    color: inherit;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  /* 按下/悬停反馈：宿主其它按钮（加号常驻、模型与权限触发器按下）都有灰胶囊，
     只有我们这个是纯透明、也没有 :active —— 店主 2026-09-23："文件上传那个图标
     怎么没有胶囊？"（点了没反应）。用宿主自己的 hover token，视觉与官方一致。 */
  /* 可见胶囊只在 ::before 上画 28×28 的圆（与加号同尺寸，店主："胶囊有点太大"），
     按钮盒子仍是 34×34 + ::after 外扩 —— 命中区大、看起来小，两者解耦。 */
  [data-composer-card] [data-mobile-nav="file-upload"]::before {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 999px;
    background: transparent;
    transition: background .12s ease;
  }
  [data-composer-card] [data-mobile-nav="file-upload"]::before {
    /* 胶囊已由盒子本体承担，这一层永久透明（保留节点是为了不惊动既有锚点）。 */
    background: transparent !important;
  }
  /* 2026-10-07 店主："点一下有一层深一点的灰色，也有一层浅一点的灰色，去掉一层"。
     真因是**半透明叠半透明**，不是我们画了两层胶囊：宿主全局 CSS 里有
     「button:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}」
     （特异性 0,2,1 > 上面那条基础规则的 0,2,0，所以它赢了）与
     「button:active{background-color:#0000001f}」，两者都画在这个按钮的**盒子**上；
     而 ::before 的可见胶囊又画一层 ⇒ 重叠区深、外圈浅，看着就是两层灰。
     可见胶囊只留 ::before 一层：盒子在所有状态下强制透明（::after 只有命中区、无底色）。 */
  [data-composer-card] [data-mobile-nav="file-upload"]:hover,
  [data-composer-card] [data-mobile-nav="file-upload"]:active,
  [data-composer-card] [data-mobile-nav="file-upload"]:focus-visible {
    background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06));
    box-shadow: none !important;
    outline: none !important;
    border-color: transparent !important;
  }
  /* 压掉浏览器默认的淡蓝 tap 高亮（店主 2026-09-23："单纯点击图标，出现一个淡蓝色
     的原始的点击画面"）。读源码取证：宿主头部那几个包（dsh-client-ui-subagent /
     agent-preset / dsh-experimental-client-ui-agent-team / jobs）**都没有 :active、
     也没有任何 tap-highlight 处理**，触摸设备上点"标准模式 / Agent Team / 1 个子代理 /
     对话·轨迹"就会叠一层原始高亮；我们输入区的控件早已处理（见上面 file-upload 那组）。
     做法与输入区同源：高亮透明，按下反馈交给宿主自己的 :hover/:active token
     （那几个包各有 2~9 条 :hover 规则，触摸时 Chromium 会套用）。 */
  /* 覆盖范围放宽：宿主有些控件不是 button（实测输入区里就有 [role=button]、带
     tabindex 的 div 形态），所以三类一起收。 */
  [data-mobile-nav="frame"] [data-phase] header button,
  [data-mobile-nav="frame"] [data-phase] header [role="tab"],
  [data-mobile-nav="frame"] [data-phase] header [role="menuitem"],
  [data-mobile-nav="frame"] [data-phase] header [role="button"],
  [data-mobile-nav="frame"] [data-phase] header [tabindex],
  [data-composer-card] button,
  [data-composer-card] [role="button"],
  [data-composer-card] [tabindex] {
    -webkit-tap-highlight-color: transparent;
  }

  /* 深色下顶栏与页面底色的断层（issue #176「减轻顶部纯黑区域与网页头部的突兀色差」/
     2026-10-11 真机反馈：手机上头部呈灰黑一块，跟上面那行系统时间栏分得太开）。
     实测（393×844，真实会话，深色）：page/body 与 frame 都是 #151517（--dsw-alias-bg-base），
     而宿主会话头部自带层色 #232324，头部上方还夹着一条跟随页面底色的安全区带
     ⇒ 「深色带 → 较亮头部 → 深色内容」三段断层。
     处理：手机档（本块在移动媒体查询内）把头部底色并到页面底色，层次改由分隔线与内容承担；
     浅色档宿主两头同为白、本来就没有断层，不参与；桌面档不碰。
     宿主深色标记挂在 body 上（实测设 body[data-ds-dark-theme] 即切到 #151517），
     html 上若也挂同一个标记一并覆盖。 */
  body[data-ds-dark-theme] [data-mobile-nav="frame"] [data-phase] header,
  html[data-ds-dark-theme] [data-mobile-nav="frame"] [data-phase] header {
    background-color: var(--dsw-alias-bg-base, #151517) !important;
  }
  /* 壁纸兼容（issue #228）：同一个插件把 --dsw-alias-bg-base 也置为 transparent
     （见上方深色顶栏规则）。深色下顶栏用该令牌与页面同色，令牌被清空后顶栏
     失去底色，消息滚动区从标题行下方穿过。壁纸启用时用该令牌自身的深色静态
     定义补回原色；浅色档通用规则已经用未被覆盖的 --dsw-alias-bg-layer-1，
     不需要新规则。门控含 data-ds-dark-theme，特异性 (0,4,2) 高于上方深色
     规则的 (0,3,2)，不依赖源码顺序。 */
  /* @patch
     id: wallpaper-header-fill
     for: deepseek-harness-background 0.6.x 的 body[data-dsh-bg]（壁纸启用时把 --dsw-alias-bg-base 置为 transparent）
     why: 深色顶栏以该令牌与页面同色，第三方插件把它清空后顶栏失去底色，滚动内容从标题行穿过
     until: 上游提供不透明的面板填充接缝，或不再把 --dsw-alias-bg-base 置空——届时本块删除
     test: tests/wallpaper-surface-fill.test.ts
  */
  body[data-ds-dark-theme][data-dsh-bg] [data-mobile-nav="frame"] [data-phase] header {
    background-color: var(--dsw-static-neutral-bluish-950, #151517) !important;
  }
  /* 头部 UI 的按下反馈（店主 2026-09-23："是头部 UI，没有触发反馈"）。
     取证：头部四个宿主包 :active 全为 0，反馈只挂 :hover。
     ⚠ 第一版我给整颗 button 上 background-color，店主实测"胶囊过宽、跑到子代理下面"
     —— 因为 button 盒比可见胶囊大（芯片文字只占盒的一部分）。所以改成**不改几何**的
     按下效果：整体压暗（.92 ≈ 宿主 token 的观感强度；太淡店主会觉得"没变"）。胶囊类的视觉仍由宿主自己的 chip 背景负责。
     不用 position/伪元素：头部芯片里挂着宿主的弹层，改 position 会挪动包含块。 */
  [data-mobile-nav="frame"] [data-phase] header button:active,
  [data-mobile-nav="frame"] [data-phase] header [role="tab"]:active {
    filter: brightness(.92);
  }
  /* 头部那些 v 的翻转：**标准模式那个现在会翻** —— 规则在本文件「DSHA 集成层：预设 chip」
     那一块（搜 data-dsha-agent-preset="header" 的 svg:last-of-type 两条）。这里留一段纠正记录，
     免得后人被已经作废的旧结论误导：

     · 旧结论（同日早先写的）称"本 WebView 里该 svg 的 CSS transform 完全失效"——**错的**。
       真因是预设 chip 的 > svg 上有一条我们自己写的
       [data-dsha-agent-preset="header"] > svg { transform: none !important }（DSHA 集成层拿它把
       图标拉回静态流）。**内联 transform: rotate(45deg) 没带 !important，被那条压掉**，
       于是量出"盒子不变、computed 仍是 none"，被我误判成 WebView 不吃 CSS transform。
     · 子代理 chip 的 v 一直是宿主自带：dsh-client-ui-subagent 的
       .ZKlsPq_trigger svg{transition:transform .12s} + 类 .ZKlsPq_triggerOpen{transform:rotate(180deg)}。
     · 禁止对头部 svg 写通配规则（header svg{...} / [class*=chevron]{...}）：那会覆盖子代理 chip
       自己的 triggerOpen 状态，出现"修一个压掉另一个"（这正是当时反复翻车的原因）。 */
  /* 输入区**宿主渲染**的功能键**不再自加胶囊**（店主 2026-09-23："点击功能键怎么有两个
     灰色的叠加？"）。
     原因：宿主本来就有自己的 hover 底色（conversation 包 13 条 :hover、model-selection 3 条、
     permission-presets 2 条、input-trigger 3 条），我们再加一层 ::before 就是**两层灰叠在一起**。
     教训：上一轮店主说"这几个功能没有触击反馈"，我据此加了胶囊 —— 实际是那次刚把浏览器默认
     淡蓝 tap 高亮压掉、观感反差的错觉；**宿主已有的反馈不要再叠一层**。
     我们自己注入的 📎（[data-mobile-nav="file-upload"]）例外：宿主没有对应控件、也就没有底色，
     它的胶囊留在上面那组规则里。 */
  /* 命中区外扩：::after 属于按钮本身，一起参与命中测试，视觉完全不变。 */
  [data-composer-card] [data-mobile-nav="file-upload"]::after {
    content: '';
    position: absolute;
    inset: -7px;
    border-radius: 999px;
  }
  /* A busy submit phase or a subagent session refuses attachments. The host
     gates intake on canAcceptDrop (package-private), so this reads the closest
     observable facts — input phase and subagent — and keeps the control from
     opening a dialog the host would then reject. */
  [data-composer-card] [data-mobile-nav="file-upload"]:disabled {
    opacity: 0.38;
    cursor: default;
  }
  /* The hidden input[type=file] this control triggers only exists on
     0.1.6-alpha.2+ hosts (the rc generation's intake is paste/drop only),
     while the host renders the input.left seat on both generations. Hide the
     control wherever the host has no file input for it to trigger — its click
     would otherwise be a permanent silent no-op there (review 2026-09-19). */
  [data-composer-card]:not(:has(input[type=file])) [data-mobile-nav="file-upload"] {
    display: none !important;
  }

  /* --- Composer vertical slack on mobile (0.1.6 host) ---
     The host's own .card padding-top:8px + gap:12px and .row padding leave 29px of pure
     blank space in a 98px single-line card (measured). Only the vertical slack is trimmed;
     horizontal padding and both hit targets stay untouched. Scoped to the active phase on
     purpose: the hero composer's input carries the host's own min-height floor, and trimming
     it there re-creates the clip/scrollbar defect recorded under Pitfalls「hero 输入框下限」. */
  /* DSHA：输入卡片自身留白偏大。宿主那两声明全出自它自己的
     dsh-client-ui-conversation（.uV2eYG_card 是 padding-top:8px + gap:12px，
     .uV2eYG_row 再吃 padding:2px 8px 6px），单行输入时卡片 98px 里有 29px
     是纯空白。手机上只压纵向留白（真机实测 moderate 档）：
       卡片 98 -> 78、编辑器 36 -> 32、按钮行 42 -> 36、文字底到按钮顶 29 -> 19px。
     横向 padding（8px）与两个按钮尺寸（28/34px）一律不动，触控目标不变；
     编辑器仍是可增长的多行框（max-height 336px），只是单行时不再垫高。 */
  [data-mobile-nav="frame"] [data-phase="active"] [data-composer-card] {
    padding-top: 2px !important;
    gap: 4px !important;
  }
  [data-mobile-nav="frame"] [data-phase="active"] [data-composer-card] [class*="_row"] {
    padding: 0 8px !important;
  }
  [data-mobile-nav="frame"] [data-phase="active"] [data-composer-card] [data-composer-input],
  [data-mobile-nav="frame"] [data-phase="active"] [data-composer-card] [class*="_scroll"] {
    min-height: 28px !important;
    padding-top: 2px !important;
  }
  /* --- Session header on mobile ---
     Keep the host-owned metadata in one responsive row. The conversation
     title, the mode text and the running/subagent status all keep their
     words; the one tenant that yields width when a phone runs out of it is
     the background-job trigger's verbose label ("1 background job running"),
     while Files keeps its hit area. */
  /* Both !important flags are load-bearing. The host's session-controller sheet
     ships [data-dsh-frame] [data-dsh-responsive-part="conversation-header"] with
     padding-left: 60px !important under (max-width: 768px), so a plain
     declaration here loses however specific it is: measured 2026-09-13 at
     390px, the computed padding-left stayed 60px and the title still began at
     x=100 with our rule present, matching and later in source order. The value
     is 0 because our own toggle already occupies that left seat (painted at
     x=8-36), so the host reservation is pure dead space on a phone. */
  [data-mobile-nav="frame"] [data-phase] header {
    padding-left: 0 !important;
    padding-right: 8px !important;
    position: relative !important;
    /* Opaque AND above the flow, both required: the host bar has no background,
       and the message flow is a later sibling, so it painted OVER the bar (three
       headless screenshots 2026-10-07: transparent -> content read through the
       title row; opaque but unraised -> byte-identical to transparent, i.e. the
       background was painted underneath; opaque + raised -> pixel-identical to
       the untouched band). The scroll box runs underneath because of the
       "selection-drag autoscroll ramp" rule above (it lifts it by
       --mobile-nav-header-h). Same surface token the panel ghost uses, so themes
       carry over; the host keeps its --dsw-alias-border-l3 bottom border.
       z-index 30 clears the flow's own raised layers (host banners measured at
       z 6-7 and the marks slot / composer seat at 7 on the live host) while
       staying under this plugin's overlay tier (55+ backdrops/panels, FAB 21 is
       hero-only where the header is hidden, drawer/menus 1000+) so a dialog or
       the drawer still covers the bar. */
    background: var(--dsw-alias-bg-layer-1, #fff) !important;
    z-index: 30 !important;
  }
  /* The hero phase's empty header must stay hidden on phones. The host hides
     it via the headerHidden class at (0,1,0), but its own session-controller
     sheet re-shows the conversation header as a grid at <=768px —
     [data-dsh-frame] [data-dsh-responsive-part="conversation-header"] with
     display grid at (0,2,0) — and that beats the hide on the very element
     carrying both classes. Result measured 2026-09-19 at 390px: an empty 85px
     header paints only its 1px border-bottom (--dsw-alias-border-l3) as a stray
     gray hairline under the status bar (pixel-scanned at y=84-85,
     rgb(224,224,224)); desktop keeps display none and no line. Our (0,3,1)
     re-hide needs no !important: the grid rule's display is a normal
     declaration and our style tag loads last. The header carries no children in
     hero (drawer entry is the FAB), so hiding it frees the dead 85px too. */
  [data-mobile-nav="frame"] [data-phase] header[class*="_headerHidden"] {
    display: none;
  }
  /* 0.1.6-alpha.2 renamed the hero-empty marker: headerHidden -> headerBlank
     (audit §1 row 3), so the rule above is a dead needle on alpha.2 and this
     one is dead on rc hosts — together they cover both generations. Same
     (0,3,1) shape, same no-!important reasoning as above. */
  [data-mobile-nav="frame"] [data-phase] header[class*="headerBlank"] {
    display: none;
  }
  /* Header popovers resolve against the header, not against their 28px flow
     box. 0.1.5's background-job chip anchors its menu with
     position:absolute; top:calc(100% + 5px) inside .QsffPG_root
     {position:relative} — a 28px-tall chip — so the menu was laid out at
     x=-16 (our right:8px resolved against that 156px chip root) and then
     clipped twice: by our own overflow:hidden on the chip root and by the
     host's [data-dsh-responsive-part="session-title-cluster"]
     {overflow:hidden}. The chip still reported aria-expanded=true with
     nothing painted and nothing hit-testable: measured 2026-09-14 at 390px,
     menu rect [-16,49,336,40], elementFromPoint at its centre returned the
     view tabs row. A positioned header plus a static chip root puts the same
     menu at [46,77,336,73] — inside the viewport, its rows hit-testable, and
     an outside tap still dismisses it (menus 1 -> 0). On 0.1.6-alpha.2 the
     chip leaves the flow entirely (absolute, in the gated block below), and
     this rule's higher specificity ((0,6,2) vs the new (0,4,1)) would pin it
     static there too — so it is excluded on alpha.2 hosts via :not(:has(...))
     and keeps governing rc hosts (review 2026-09-19).
     BOTH halves are load-bearing: forcing the chip root static without
     positioning the header moves the containing block out to the frame, and
     the menu lands at x=8 y=849 — past the 844px viewport (A/B 2026-09-13).
     Scoped to the header actions slot, so the subagent lineage root inside
     the crumbs keeps its own anchored, fixed-position menu. */
  [data-mobile-nav="frame"] [data-phase] header:not(:has([class*="_headerLeading"])) [class*="_headerActions"] [class*="_root"]:not([class*="_switcherRoot"]):has(> button[class*="_trigger"]) {
    position: static !important;
  }
  /* The tab strip is a separate grid item from the title row and does not
     inherit the title row's inset, so after the header padding above went to 0
     it sat flush against the bezel (measured: tablist x=0, first tab 0..30
     while the title starts at 40). Give it the same left inset as the toggle so
     the two rows read as one column. */
  /* ---------- 手机档专属：头部留白收紧（≤767px + coarse）----------
     数值是照 360×754 真机量的（页签条 margin-top -4 / 页签下划线 5px /
     页签按钮去上内边距、靠底对齐 / 标题行回到内容高度）。**只对真·手机档生效**：
     768–1023 的平板档保持上游手机 UI 的排布，不套这台手机的魔数
     （仓库既有惯例，见文件末尾的 DSHA 预设块）。
     真机读数（修前 → 修后）：头部 77 → 67px、标题↔页签文字间距 22 → 15px。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header [class*="wSkVaW_tabs"] {
      padding-left: 8px !important;
      /* 2026-09-23 店主："标题和下面『对话』中间的空白有点多"。
         宿主给这条页签条 margin-top:10px，页签按钮自己还带 padding-bottom:9px
         （给选中下划线留位），两行文字之间就空出一条。收紧：
         margin 归零（真机 4 → 0）+ 下划线贴到 5px（页签条 36 → 31px）。
         ⚠ 选择器必须用**后代**：页签条外面套了一层 display:contents 的 div
         （真机链：div.wSkVaW_tabs < div[0..0] < header.wSkVaW_header），
         所以原来的「header > [class*="wSkVaW_tabs"]」是条死规则 —— padding-left
         从来没生效过（现按后代写，值仍是实测的 8px，视觉不变）。 */
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }
    [data-mobile-nav="frame"] [data-phase] header [class*="wSkVaW_tabs"] [class*="wSkVaW_tab"] {
      padding-bottom: 5px !important;
    }
    /* 真机诊断：页签条的 margin-top 计算值是 4px，但把 document.styleSheets 里
       所有能读的规则拿来和它 matches()，命中的 margin/padding 规则是 **0 条**
       —— 说明这 4px 来自一张读不到 cssRules 的表（跨源，App 自己注入的样式表），
       普通 !important 平级打不过它。所以这里加码：前缀 html + 钉住 header.wSkVaW_header，
       特异性抬到 (0,5,1)，实测能压过（页签条 4 → 0）。 */
    html [data-mobile-nav="frame"] [data-phase] header.wSkVaW_header [class*="wSkVaW_tabs"] {
      margin-top: -4px !important;
    }
    /* 真机读数：头部的 grid-template-rows 被钉成固定的 40px 36px（宿主自己没写行高，
       是 DSHA 那张表给的），于是标题行、页签行都各留一截死空间。改成 auto：两行各自
       贴住内容，标题行按 36px 的预设 chip 走、页签行由页签按钮撑开。 */
    /* 标题行实测 40px 高，而里面最高的东西是 36px 的预设 chip（"标准模式"）——
       多出来的 4px 是死空间。让行高回到内容高度（用 auto + min-height:0，
       不写死 36：将来标题簇里出现更高的东西（子代理谱系等）也不会被裁）。 */
    html [data-mobile-nav="frame"] [data-phase] header.wSkVaW_header [class*="wSkVaW_titleRow"] {
      height: auto !important;
      min-height: 0 !important;
    }
    /* 页签按钮文字上方还有 6px 空白（按钮被容器撑到 32px 高、文字居中）：去掉上内边距，
       下内边距 5px 已在上面钉住（下划线位置不变）。 */
    html [data-mobile-nav="frame"] [data-phase] header.wSkVaW_header [class*="wSkVaW_tab"] {
      padding-top: 0 !important;
      align-self: flex-end !important;
    }
  }
  /* NOTHING extra here on purpose. The header's own padding is already forced
     to 0 above, and the title row carries padding-left:40px of its own, so the
     title lands at x=40 - the toggle's right edge (36) plus 4px. A negative
     margin added on top of that over-corrected and pulled the title off the
     left edge (measured 2026-09-13: crumb x=20, and the string's first glyph
     painted partially outside the viewport), so the reclaim lives in exactly
     one place: the header padding. */

  [data-mobile-nav="frame"] [data-phase] header > :first-child {
    display: flex !important;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    gap: 2px;
    /* Just enough for the toggle (28px at left:8 -> right edge 36) plus 4px of
       breathing room; the host's 60px rail reservation is neutralised above. */
    padding-left: 40px;
  }
  [data-mobile-nav="frame"] [data-phase] header > :first-child > :first-child {
    display: flex !important;
    align-items: center;
    flex: 1 1 auto;
    min-width: 0;
    gap: 2px;
  }
  /* The directory toggle stays at the far left of the header. */
  [data-mobile-nav="toggle"] {
    position: absolute !important;
    left: 8px !important;
    top: 12px !important;
    z-index: 2 !important;
  }
  /* The files opener is pinned to the header's right corner, mirroring the
     directory toggle on the left (same 8px edge, same 12px seat). In flow it
     can never reach that corner: the host reserves the last 44px of the title
     cluster for a utilities seat that is EMPTY on mobile - measured at 390px,
     headerUtilities sits at x=374 with width 0 while the title cluster carries
     padding-right: 44px - so the button stopped at x=300..328 and left 62px of
     bare header to its right (2026-09-14 phone-side report: the opener is not
     pinned to the top-right corner). Absolute positioning also returns its
     28px of flow width to the title lane, and the containing block is the same
     one the toggle resolves against, so both controls shift together with the
     frame's safe-area padding. The 44px reservation itself is trimmed to the
     28px band this button actually paints in the compact-rows block below, so
     the title lane keeps the difference. */
  [data-mobile-nav="files"] {
    position: absolute !important;
    right: 8px !important;
    left: auto !important;
    top: 12px !important;
    z-index: 2 !important;
  }
  /* 手机档（≤767 + coarse）：文件夹按钮右移 4px（原 8px），为标题行右簇再腾出空间。
     与左侧 ☰ 的 8px 不再对称，是用户明确接受的取舍（2026-10-12 用户规格）。
     平板档这一档没被要求动，所以留在这条手机档作用域里；共用档保持本批之前的值。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="files"] {
      right: 4px !important;
    }
  }
  [data-mobile-nav="frame"] [data-phase] header [class*="_headerActions"] {
    display: flex !important;
    align-items: center;
    box-sizing: border-box;
    flex: 0 1 auto;
    min-width: 0;
    max-width: calc(100% - 32px);
    margin-left: auto;
    justify-content: flex-end;
    gap: 2px;
  }
  /* The title takes the remaining width and never paints outside it; the
     metadata lane's mode text is what shrinks first. */
  /* min-width is a readable floor (2026-09-13 phone report: the title showed a
     single glyph then an ellipsis). This lane has flex basis 0, so it is the
     first thing every crowding neighbour eats: measured at 320px with a lineage
     chip in the row, the crumb client width collapsed to 16px and NOTHING of
     the title was painted. 30% of the row keeps 2-4 CJK glyphs plus the host's
     own ellipsis whatever else is pinned next to it. */
  [data-mobile-nav="frame"] [data-phase] header [class*="_crumbs"] {
    flex: 1 1 0;
    min-width: 30%;
    max-width: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap !important;
  }
  /* Mode label: keep the icon AND the words. On a phone this chip is the only
     mode switcher there is, so its text is not the surplus it was once
     treated as: the longest preset name measured needs 121px including the
     18px icon seat, while the old cap min(22vw, 220px) allowed just 85.8px at
     390px — the text was clipped at every phone width even before the
     crowding rules below pinned it to the icon alone (2026-09-14 phone
     report: the mode label showed only its glyph). 38vw keeps the label whole
     from 320px up and still lets it ellipsize before the title on wider
     screens. */
  [data-mobile-nav="frame"] [data-phase] header [class*="_label"]:has(> svg) {
    order: 1;
    flex: 0 1 auto;
    min-width: 0;
    max-width: min(38vw, 220px);
    display: block;
    position: relative;
    box-sizing: border-box;
    padding-left: 18px;
    padding-right: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap !important;
  }
  [data-mobile-nav="frame"] [data-phase] header [class*="_label"]:has(> svg) > svg {
    position: absolute !important;
    left: 0 !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
  }
  /* Running/subagent controls keep their full status text and hit area; they
     do not give up width to the mode label. NOTE: the real subagent lineage
     root has class="ZKlsPq_root " — a TRAILING SPACE from the plugin's
     template-literal className — so [class$="_root"] never matches it. Use
     [class*="_root"] and exclude the switcher root ([class*="_switcherRoot"])
     so only the count/job roots get pinned (the switcher must stay shrinkable
     so its own title can ellipsize). */
  /* Pinned (flex 0 0 auto) with a max-width cap. A shrinkable chip is squeezed
     below its content and the count reads as clipped or overwritten (the
     2026-08-22 report), while a bare max-content pin eats the session title,
     whose flex basis is 0: measured 2026-09-13 at 320px, the crumb went 68px
     -> 16px and the painted title was EMPTY while the chip kept its full text.
     Pinned + capped + the crumbs min-width floor above is what holds both —
     the title ellipsizes, the count keeps its words, and the hit area stays
     one inline-flex button.
     NOTE: the popover containment lives with the header rules above, which
     force this root position:static. That only works together with the
     positioned header: static on its own moved the containing block out to
     the frame and the menu landed at x=8 y=849, past the 844px viewport
     (A/B 2026-09-13). */
  [data-mobile-nav="frame"] [data-phase] header [class*="_root"]:not([class*="_switcherRoot"]):has(> button[class*="_trigger"]) {
    order: 2;
    flex: 0 0 auto;
    min-width: 0;
    max-width: min(40vw, 180px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap !important;
  }
  [data-mobile-nav="frame"] [data-phase] header [class*="_root"]:not([class*="_switcherRoot"]):has(> button[class*="_trigger"]) > button {
    min-width: 0;
    max-width: 100%;
  }
  [data-mobile-nav="frame"] [data-phase] header [class*="_root"]:not([class*="_switcherRoot"]):has(> button[class*="_trigger"]) > button > * {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  [data-mobile-nav="frame"] [data-phase] header [class*="_root"]:not([class*="_switcherRoot"]):has(> button[class*="_trigger"]) > button,
  [data-mobile-nav="frame"] [data-phase] header [class*="_root"]:not([class*="_switcherRoot"]):has(> button[class*="_trigger"]) > button * {
    white-space: nowrap !important;
  }
  /* The lineage count's leading "/" (ZKlsPq_separator — official desktop
     chrome rendered only for a root session inside the crumbs) looks like a
     stray extra breadcrumb level on small screens; hide it. The crumbSep "/"
     between ancestry segments (subagent sessions) is a real separator and
     stays. */
  [data-mobile-nav="frame"] [data-phase] header [class*="_crumbs"] [class*="_separator"] {
    display: none !important;
  }
  /* The header's right-hand slot clips its own dropdown away (0.1.5 host bug).
     wSkVaW_headerUtilities is a 44x44 grid cell with overflow:auto, and the host
     mounts its "More actions" menu INSIDE it: the menu is 218x52, so the cell
     clipped it to 44x44 and the menu was never painted and never hit-testable
     (measured: menu rect 156,56 218x52, computed flex/visible/opacity 1, yet
     elementsFromPoint at the item centre returned the view tabs row and nothing
     from the menu). Raising the menu z-index cannot help - the cell's own
     stacking context traps it. Releasing the overflow paints the menu where the
     host positioned it, and the item then works (verified: a real tap opening
     the session-log export dialog, menus 1 -> 0 dialogs 1). Scoped to the mobile
     branch and to this one cell, so desktop keeps the host layout. The section
     is hidden on mobile anyway - the drawer footer carries the same action - but
     the release stays for any plugin that registers a header dropdown here. */
  [data-mobile-nav="frame"] [data-phase] header [class*="wSkVaW_headerUtilities"] {
    overflow: visible !important;
    /* The seat is empty on a phone (its only button is hidden just below) yet
       still 44px tall, which floors the whole title row — see the compact-rows
       block after the tab strip. */
    height: 30px !important;
    min-height: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] header [class*="wSkVaW_headerUtilities"] [class*="nL4_yW_moreButton"] {
    display: none !important;
  }
  [data-mobile-nav="frame"] [data-phase] header [data-mobile-nav="files"] {
    width: 28px;
  }
  /* Session log download: gone from the header row on mobile (the utilities
     seat holds only the session-log-export capsule). */
  [data-mobile-nav="frame"] [data-phase] header > :first-child > :last-child {
    display: none !important;
  }
  /* View tabs strip (official [role="tablist"] under the crumbs row).
     Desktop ships a single flex row (gap: 36) sized for the two stock tabs
     (对话/轨迹). Plugins register further views (memory / skill / todo
     panels, per-plugin settings pages), and once the count passes two the
     shrinkable buttons collapse to their min-content: CJK labels stack one
     glyph per line (staircase), latin labels break word-per-line — the
     strip eats a screenful of vertical space (#41, 8 tabs, HarmonyOS
     browser). Scroll the strip horizontally instead — the standard mobile
     tab-bar pattern — with every label kept whole (flex-shrink: 0 +
     nowrap). Affordance is the peek: the naturally cut-off tab at the right
     edge says "more this way" (unlike the settings navList, whose buttons
     nearly fit and would show no cut edge), which is why this strip scrolls
     while that one wraps. touch-action: pan-x opts the strip into
     horizontal panning — the root's pan-y intersection stops at this first
     scroll container (same mechanism as the drawer's pan-y), so the page
     never scrolls sideways. overscroll-behavior-x: contain stops a flick
     from chaining past the ends; snap keeps tabs edge-aligned after a
     fling; the scrollbar stays hidden like every native tab bar. */
  [data-mobile-nav="frame"] [data-phase] header [role="tablist"] {
    flex-wrap: nowrap;
    gap: 0 16px;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    touch-action: pan-x;
    scrollbar-width: none;
  }
  [data-mobile-nav="frame"] [data-phase] header [role="tablist"]::-webkit-scrollbar {
    display: none;
  }
  [data-mobile-nav="frame"] [data-phase] header [role="tablist"] > button {
    flex-shrink: 0;
    white-space: nowrap;
    scroll-snap-align: start;
  }
  /* Compact session header rows (2026-09-14 phone report: the top is very
     empty). The host's own mobile sheet lays the header out as
     grid-template-rows: minmax(32px, auto) minmax(44px, auto) with
     [role="tab"] { min-height: 44px }, and both rows then grow to 44: the
     title row is floored by the empty utilities seat above, the tab row by the
     buttons' own floor. Measured at 390px: header 97px = 8 padding + 44 + 44 +
     1 border, for 36px of painted content. Capping the rows at 36/32 and the
     tabs at their own content height gives 77px, with nothing else degraded —
     title, mode text, status chips, chevrons and both pinned corner buttons
     keep their measured geometry, and the tab strip keeps its #41 contract
     (horizontal scroll, 16px gap, whole labels, pan-x).
     The host's 8px padding-top is deliberately kept: the title row's 28px
     content then centres at y=26, exactly the centre of the pinned corner
     controls (toggle and Files opener both sit at top:12, 28px tall). Trimming
     that padding to 4 shaved 4 more px but left the text row visibly riding
     above both buttons (2026-09-14 phone report: the text row sits too high
     against the drawer and Files controls), so the row height is what pays for
     the compaction, not the alignment.
     :has(> *) guards the hero header: it is an EMPTY, host-hidden grid that
     still occupies 85px while the composer is laid out under it. In the hero
     the header has 0 element children, so the guard leaves it at its official
     height — measured, the hero composer rect [0,349,388,231] is identical
     with and without this block. */
  [data-mobile-nav="frame"] [data-phase] header:has(> *) {
    min-height: 0 !important;
    /* 2026-09-23 二轮：页签行地板 32 → 26（店主："标题和下面『对话』中间空白有点多"）。
       标题行地板保持 36 —— 它下面的文字要跟 top:6 的圆形按钮对齐（实测文字中心
       y=20 = 圆形按钮中心），压标题行会把文字顶得比按钮高（2026-09-14 已踩过）。
       页签按钮的 32px 地板同理下到 26px（文字 16px + 下划线留 5px），
       页签条的下沿随之从 76 收到 66。 */
    grid-template-rows: minmax(36px, auto) minmax(32px, auto) !important;
  }
  [data-mobile-nav="frame"] [data-phase] header [role="tab"] {
    min-height: 32px !important;
  }
  /* 手机档专属（≤767px + coarse）：页签行地板 32 → 26（下划线收到 5px 后仍够点）。
     平板档保留 32px 的既有值，不跟手机一起压。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has(> *) {
      grid-template-rows: minmax(36px, auto) minmax(26px, auto) !important;
    }
    [data-mobile-nav="frame"] [data-phase] header [role="tab"] {
      min-height: 26px !important;
    }
  }
  /* The title cluster reserves its last 44px for that empty utilities seat.
     The lane's right edge must stay clear of the Files opener's HIT BOX,
     otherwise the opener eats the trailing chips' taps. The pre-2026-09-22
     value (26px, a width optimisation) only cleared at the 390px test width:
     measured at 360x754 (dpr 4) the Agent Team chip ran to x=334 while the
     opener's 36px box started at x=316 — an 18px overlap, so tapping the
     chip's tail opened the Files panel. The reference phone UI shows the lane
     ending at ~314 with the opener box at 316..352, i.e. the full 44px seat
     plus 2px of breathing room, so restore that instead of narrowing the
     opener: 46px clears the 36px box at right:8 by 2px at every width. */
  [data-mobile-nav="frame"] [data-phase] header [class*="wSkVaW_titleCluster"] {
    /* 本批之前的值。2026-10-12/13 那串「46 → 40 → 36 → 32 → 26 → 34」的实验
       **只针对手机档**（后台任务圆点搬进标题行后与预设 chip 的间距），已整串
       搬进下面那条手机档作用域；共用档（= 平板档）保持本批之前的 46px 不动。
       预留从 padding 改记 margin（2026-10-17）：标题簇是 overflow:auto 的滚动
       容器，内容溢出时的裁剪线是 **padding box** —— 写在 padding 上会留下 46px
       的「可绘制溢出区」，挤爆的那一截 chip 正好画进预留带、被绝对定位的文件
       按钮压住（真机症状：预设 chip 末字被文件夹图标盖住）。改记 margin 后簇的
       border box 收在预留带左侧，溢出再大也止步于按钮之前，内容宽度不变
       （345 − 46 ⇄ 299 − 0）。 */
    padding-right: 0 !important;
    margin-right: 46px !important;
  }
  /* Header crowding on narrow phones.
     Three tenants want the same row: the session title, the mode chip and the
     status chips. The mode chip is the only mode switcher a phone has and the
     title is the only session identity, so both keep their words and the title
     ellipsizes instead (measured 2026-09-14 at 390px with a lineage chip
     present: after this the mode label keeps 101px of text and the crumb
     135px).
     The lineage root (dsh-client-ui-subagent) sits in the crumbs for BOTH
     running and idle descendants, so the guards below key on that root rather
     than the transient running-state dot — otherwise the row would reflow the
     moment agents go idle. Match roots with [class*="_root"] (the real class
     carries a trailing space; [class$="_root"] matches nothing).
     The background-job label used to yield here through two width-gated rules
     (<=440px, and <=559px when the lineage chip was present). Both were keyed
     on the chip's classed wrapper, which host 0.2.1 no longer renders, so they
     are deleted: the label is now hidden unconditionally by the job-chip rule
     in the phone-scope section (see header-job-chip-collapse). */
  /* With the subagent lineage (any state) AND a background job present
     together, 390px cannot hold the title, the mode words and the lineage
     count at once; the crumb gives 8px back to the action lane. */
  @media (max-width: 559px) {
    [data-mobile-nav="frame"] [data-phase] header [class*="_crumbs"] {
      padding-right: 8px;
    }
  }
  /* Last resort on 320px-class screens: the title and both status chips cannot
     share the row with the mode words, so the mode chip keeps only its icon. */
  @media (max-width: 359px) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_crumbs"] [class*="_root"]):has([class*="_headerActions"] [class*="_root"]) [class*="_label"]:has(> svg) {
      display: none !important;
    }
  }

  /* --- 顶栏状态 chip 座位契约：**暂缓**（2026-10-12 受控实验后整块撤回）---
     用户规格：「子智能体 chip 固定不变，后台任务 chip 出现在它左侧、间隔 2px」。
     首版用 flex 容器 + order + gap 实现，**受控实验证明该机制不成立**：
     子智能体 chip（ZKlsPq_root）在 alpha.2 代宿主上被插件自己钉成 position:absolute，
     绝对定位元素脱离文档流，flex 的 order 与容器 gap 都决定不了它的落点 ——
     注入一颗合成 jobs chip 后该 chip 实测从 x=292 跳到 x=174（视觉间距 −211px），
     三个目标点无一达成；容器 computed gap 也仍是宿主自己的 4px。
     真实 jobs chip 无法在受控环境构造（宿主在后台任务数为 0 时整颗不渲染），
     故本条**已整块撤回**，等拿到「真机带后台任务的截图 + 视觉稿」后按绝对定位口径重做。
     撤回是安全的：本组只在两颗 chip 同时在场时匹配，撤掉后单 chip 形态回到既有那批
     规则的管辖（受控实验：单 chip 的 rect 与撤前逐像素一致，规则匹配数=0）。 */

  /* --- Header popovers on mobile (dsh-client-ui-jobs / dsh-client-ui-subagent) --- */
  /* Both entries sit in the session header and both anchor their panel to the
     trigger's left edge (left:0 inside their own root), so clamp them to the
     viewport. The background-job menu resolves against the header (see the
     containment rules at the top of this section) and the subagent lineage
     menu is position:fixed, so right:8px pins either panel 8px from the
     phone's right edge: measured [46,77,336,73] for the job menu and
     [38,41,336,58] for the lineage menu at 390px, both fully inside the
     viewport. Do NOT clamp with left:8px: measured, that put the panel at
     x=350..686 (off-screen) against a right-anchored x=30..366. */
  [data-mobile-nav="frame"] [data-phase] header [class*="_menu"] {
    left: auto !important;
    right: 8px !important;
    width: min(336px, calc(100vw - 16px));
    max-width: none;
    /* vh 回退行在前（pocket 补丁） */
    max-height: min(420px, calc(100vh - 120px));
    max-height: min(420px, calc(100dvh - 120px));
  }

  /* --- 0.1.6-alpha.2 session-header adaptation (audited on a real device) ---
     The 16-item reconciliation in docs/upstream/2026-09-19-mobile-header-0.1.6-adaptation.md,
     landing the 14 items whose anchors exist in 0.1.6-alpha.2 host builds. Two preset items
     (#6/#7) are deliberately omitted: they anchor on .dsha-preset-header-anchor, a marker
     that exists only in the DSHA build, so they would be dead rules here.
     GENERATION GATING: only _headerLeading/_crumbCurrent/_crumbSeg/_headerCorner are
     alpha.2-only classes — every other anchor below (_titleCluster/_crumbs/_headerActions/
     _headerUtilities/tablist/QsffPG_/ZKlsPq_ and the :first-child chains) also exists on
     0.1.5-rc hosts, where these rules would silently re-tune geometry the older rules
     measured (review 2026-09-19). Every selector therefore carries
     header:has([class*="_headerLeading"]): the whole block is dead on pre-alpha.2 hosts and
     the rc-generation rules keep governing there unchanged. */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) {
    /* 顶部留白收窄：宿主 header 自带 padding-top: 10px、标题行再垫 2px，
       叠在刘海/状态栏避让之上就显空。这两处一起清零。 */
    padding-left: 8px !important;
    padding-right: 8px !important;
    padding-top: 0 !important;
    /* 宿主 header 有 min-height: 76px，而内容只有 ~69px，底部会垫出 7.6px 空白
       （实测：标签行底边 106，header 底边 113.6）。贴底定位的状态 chip 会被这
       段空白顶下去、和标签行错开。手机上让 header 贴住内容高度。 */
    min-height: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) > :first-child {
    flex-wrap: nowrap !important;
    align-items: center !important;
    gap: 0 !important;
    padding-left: 32px !important;
    padding-right: 0 !important;
    padding-top: 0 !important;
  }
  /* 目录开关跟着一起上移，保持与标题/按钮同一行居中。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-mobile-nav="toggle"] {
    top: 6px !important;
  }
   /* 空座位不判空、只塌宽：a2 槽位渲染器永远在 headerLeading 里挂一个
      [data-slot] 包装元素（display:contents、0×0），:empty 与 :not(:has(*))
      两种「空」判定都恒不命中（宿主自己的 :empty 规则同样失效），而
      display:none 又会在某代真的渲染控件时误藏真控件。这里不判定空不空，
      只把第三方误标进来的预留 padding 塌掉——web-all 兼容层按 0.1.5 结构
      把本座位误标成 session-title-cluster，注入 padding-inline-end:44px，
      座位于是 0 内容 + 44 padding = 44px 死占（实测 390px：座位
      [40,22,44,0]、titleCluster 被顶到 x=84）。padding 归零后空座位 = 0×0，
      真有内容的宿主也不受影响（内容盒照常渲染）。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerLeading"] {
    /* 不能塌掉左侧座位本身：上面那条（> :first-child）给本座位留了
       padding-left:32px 作面板开关的座位，而 padding: 0 !important 是
       简写，会把它一并清零。两条规则特异性同为 (0,4,1)，按源序本块在后
       ⇒ 简写胜出，座位塌成 0×0、网格第一列 0px、标题直接压到 left:8 的
       面板按钮上（真机实测 2026-09-22，360x754@4：crumbs x=8、
       toggle 8,6 28x28；真机 DOM 规则枚举确认胜出者就是本块）。
       NOTE: 本文件整体是 JS 模板字符串，注释里绝不能出现反引号。 */
    padding: 0 !important;
    padding-left: 32px !important;
  }
  /* --- 0.2.0-rc.x：header 变 grid，座位从 titleRow 内部搬到了 header 自己的第一列 ---
     上面两条把「面板开关的 32px 座位」记在座位自己身上（padding-left）。在
     0.1.6-alpha.2 里 headerLeading 是 titleRow 的第一个孩子，这个 padding 就是
     titleRow 内容盒的起点，标题的 40px 落点是它直接算出来的。0.2.0-rc.x 把 header
     改成 grid-template-columns: auto minmax(0,1fr)：座位成了 header 的直接孩子
     （grid-area: 1/1），titleRow 独占第二列（grid-column: 2），于是标题的 40px 落点
     变成「网格第一列恰好 32px」的副作用——座位一旦被谁塌掉（padding 被覆盖、宽度被
     第三方归零、display 被藏），第一列就回到 0px，标题立刻压到 left:8 的圆形开关上。
     2026-09-22 在 0.1.6 上实测过同一个失败面（座位被 padding 简写清零 → 第一列 0px
     → crumbs x=8、toggle 8,6 28x28），当时靠把 padding-left 补回来止住；这一代改成
     把座位记在标题行自己身上：padding-left 加在 titleRow 上（border-box，不撑破第二
     列），座位格归零，标题落点不再依赖座位格存在、也不依赖它的宽度算得对不对。
     判别式是「座位是不是 header 的直接孩子」——0.1.6 及更早座位在 titleRow 内部，
     整块不命中，老规则原样管老宿主。
     附带修掉一条静默漂移：老规则「header > :first-child > :last-child { display:none }」
     在 0.1.5 藏的是会话日志胶囊；0.2.0 里 header 的第一格是座位，它最后一个孩子是
     conversation.header.leading 槽的包装元素，整条规则于是变成「藏掉整个 leading 槽」
     （实测：往槽里注入 28x28 按钮，计算盒 0x0）。手机档这一格是插件自己的抽屉开关
     （绝对定位 left:8），槽里的控件必然和它叠在一起，所以「藏」的结果是对的、理由
     一直没写下来；这里按槽名显式藏，别再靠 :last-child 误伤。
     NOTE: 本文件整体是 JS 模板字符串，注释里绝不能出现反引号。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has(> [data-conversation-header-leading]) > [data-conversation-header-leading] {
    width: auto !important;
    min-width: 0 !important;
    padding: 0 !important;
    gap: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has(> [data-conversation-header-leading]) [data-slot="conversation.header.leading"] {
    display: none !important;
  }
  /* 这里用 [class*="_titleRow"] 后缀形而不是邻近两条的 [class*="wSkVaW_titleRow"]：
     全包只有 wSkVaW_titleRow 含这个片段（无前缀重叠，且已被 header:has 门控），
     后缀形对哈希前缀改名免疫——座位记错地方的代价是标题静默压回开关上，不值得
     为风格统一冒这个险。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has(> [data-conversation-header-leading]) [class*="_titleRow"] {
    box-sizing: border-box !important;
    padding-left: 32px !important;
  }
  /* 0.1.6 的新头部里，titleRow 的第一个孩子是新增的空座位
     headerLeading（macOS 桌面控件，安卓上渲染 null）。插件按 0.1.5 老结构
     写的「header > :first-child > :first-child { flex: 1 1 auto }」现在套在
     这个空座位上，于是它吃掉全部剩余宽度、把标题顶到右侧（实测 411px 宽
     屏幕上标题被推到 131px 处）。让它不参与伸缩即可——有内容时也不会塌。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) > :first-child > :first-child {
    flex: 0 0 auto !important;
    width: auto !important;
    min-width: 0 !important;
    gap: 0 !important;
  }
   /* 第三方兼容层（@linxin666/dsh-web-all 的 web-ui-compat 行）按 0.1.5 结构
      把本代 titleCluster 误标成 session-utilities，给里面所有按钮注入
      min-width/min-height:44px + flex:none：toggle/files、模式/团队/面包屑
      按钮全被顶成 44 —— toggle (8,6,44,44) 中心 28、files (338,2,44,44)
      中心 24、标题带中心 22 三心不齐；files 加宽后越过 headerActions 流右缘
      6px（338 < 344）。宿主 0.1.6-alpha.2 自身没有任何 44px 下限（全包
      grep 零命中），这里把外来下限归零：控件回到各自设计尺寸（toggle 28
      来自 base.css、files 36 来自下面的 a2 专条、chips/面包屑回宿主自然
      高度），三心回到 20，titleCluster 的 min-height:40 !important 重新
      主导行高。QsffPG/ZKlsPq 两个状态 chip 用 :not 明确豁免：它们的
      25px 下限由后面 min-height:25px !important 专条供给，特异性 (0,4,1)
      低于本条 (0,7,1)，不豁免会被顺手压掉，不靠书写顺序。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_titleCluster"] :is(button, [role="button"]):not([class*="QsffPG_root"] button):not([class*="ZKlsPq_root"] button) {
    min-width: 0 !important;
    min-height: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_titleCluster"] {
    display: flex !important;
    flex-wrap: nowrap !important;
    flex: 1 1 auto !important;
    width: auto !important;
    max-width: none !important;
    min-width: 0 !important;
    min-height: 40px !important;
    /* 三级间隙 6 → 4（2026-09-23 用户拍板）：团队 chip 在手机档被宿主
       @container(width<=480px) 藏掉标签、只剩 14px 图标（对账见 §6），
       这一行不再需要 6px 的呼吸量；收成 4px 让「模式 / 团队 / 文件夹」
       看起来是一组。 */
    /* 本批之前的值。2026-10-12 的「标题这一行三个之间放宽到 6px」只针对手机档
       （后台任务圆点搬进标题行后与预设 chip 的间距），已搬进手机档作用域。 */
    gap: 0 4px !important;
    justify-content: flex-start !important;
    align-items: center !important;
    /* 簇溢出守卫，随断点 A 无条件化并入本显示规则（原为独立条）：极端
       字体下 crumbs 触地板后的残余溢出保持可横滑，不依赖 web-all 垫片
       （缺席时簇溢出默认 visible，会压画到 corner 按钮上）；内容放得下时
       本声明完全惰性。x:auto 把 y 也算成 auto，簇内容高 ≤40px 恒不纵溢
       无实害；findHorizontalScroller 对 overflow-x 容器让位。 */
    overflow-x: auto !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_titleCluster"] > [class*="_crumbs"] {
    /* 标题改成自适应：面包屑条吃掉动作区之外的剩余宽度，标题多长就显示多少，
       装不下时由每一段自己的滑动窗口（见下）横向滑。min-width 保底 4 字，
       防止预设名字很长时把标题挤没。 */
    flex: 1 1 auto !important;
    width: auto !important;
    min-width: 72px !important;
    max-width: none !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    min-height: 0 !important;
    padding-right: 0 !important;
    overflow: visible !important;
    white-space: nowrap !important;
  }
  /* 标题本体：自适应宽度 + 横向滑动。宽度由上面面包屑条的剩余空间决定，
     装不下时在本段内左右滑（touch-action: pan-x 让浏览器先认领横滑，
     左缘抽屉手势不会抢走这一笔）。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_crumbs"] [class*="_crumbCurrent"] {
    flex: 0 1 auto !important;
    width: auto !important;
    min-width: 0 !important;
    /* 6 个汉字上限：6×14px + 左右 padding 16px = 100px。再长就在本段内横滑，
       这样标题永远不会顶到右侧的预设。 */
    /* 本批之前的值（100px 横滑窗 + 硬切）。2026-10-12 的「缩到 80px 再改省略号、
       最后取消硬顶改 max-width: 100%」只针对手机档（子智能体 chip 进标题行后
       要让出约 100px），已整串搬进手机档作用域；共用档（= 平板档）保持不动。 */
    max-width: 100px !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    text-overflow: clip !important;
    white-space: nowrap !important;
    text-align: left !important;
    justify-content: flex-start !important;
    touch-action: pan-x !important;
    overscroll-behavior-x: contain !important;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_crumbs"] [class*="_crumbCurrent"]::-webkit-scrollbar {
    display: none;
  }
  /* 面包屑的父会话段同样是 <button>，不设窗口就会顶出去（子代理会话实测）。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_crumbs"] [class*="_crumbSeg"] > button {
    flex: 0 1 auto !important;
    min-width: 0 !important;
    max-width: 80px !important;
    overflow-x: hidden !important;
    overflow-y: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    text-align: left !important;
    touch-action: pan-x !important;
    overscroll-behavior-x: contain !important;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_crumbs"] [class*="_crumbSeg"] {
    flex: 0 1 auto !important;
    min-width: 0 !important;
    justify-content: flex-start !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerActions"] {
    /* 断点 A（用户拍板 2026-09-19，全移动档无条件生效）：动作行不参与收缩，
       chips 按自然宽渲染，收缩职责全数交还 crumbs 滑动窗口当避震器。
       根因链：内容是字体相对的、预算是固定像素的——headless（CJK
       fallback 字体）文字窄、真机（另叠加 Android fontScale）文字宽，
       flex:0 1 auto 按 basis 比例收缩时行内唯一无下限的项是模式 label
       （min-width:0），真机截成「创造…」「Agent Te…」而 headless 全字。
       为什么无条件化：首版用 min-width:377 分档（按 390 假设视口的 k≈1.2
       破坏点推演），真机 diag 读数证伪——设备实测视口 360、dpr 3.5
       （vivo V2425A，Android 16，Chrome 151），整台设备落在档位之下，A 档
       从未绘制、旧收缩机制照跑、芯片照压；同一读数里无门的 stats 规则真机
       验证生效、A 档未生效，对照坐实是分档包裹死档而非声明无效。目标任何
       手机宽度芯片全字、极端窄屏靠滑窗降级不靠截断——分档与目标矛盾，删，
       flex 直接并入本几何规则唯一声明。新几何：lane 停缩后行内唯一可缩项
       是 crumbs（flex 1 1 auto，地板 72px；窗口帽 max-width:100px 是字体
       无关盒子，窗内 pan-x 滑动保证长标题可读），避震容量 = crumbs 自然
       宽−72（根会话约 28px、子代理会话双窗最多 128px；360 真机肥字体
       k>1.22 时 crumbs 触地板、残余走 cluster 横滑）。级联核查：本规则是
       全档唯一 flex 来源、无其他 flex 分量；rc 代 840 行是普通权重且
       prelude 不同（无 :has 门），被本条 importance 压制，无 order-tie。 */
    flex: 0 0 auto !important;
    width: auto !important;
    max-width: none !important;
    min-height: 36px !important;
    margin-left: auto !important;
    padding: 0 !important;
    border-top: 0 !important;
    justify-content: flex-end !important;
    /* 与 titleCluster 同步收到 4px（2026-09-23）：动作行里的 chip（任务 /
       谱系 / 团队）之间也只留 4px。 */
    /* 本批之前的值。2026-10-12 的「动作行内各 chip 之间放宽到 6px」只针对手机档，
       已搬进手机档作用域。 */
    gap: 4px !important;
    overflow-x: auto !important;
    scrollbar-width: none;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerActions"]::-webkit-scrollbar {
    display: none;
  }
  /* stats 行左端「N 轮」被裁且不可达（用户真机两帧 + headless 390 复现）：
     宿主 bOPqQW_root 是 justify-content:center 的横向滚动容器，内容溢出
     49px（scrollWidth 333 / clientWidth 284）时两侧对称各裁 ~50px——右侧
     scrollLeft 最大 49 可达，左侧起点 x=-34 是负坐标、scrollLeft 恒 ≥0
     永不可达，center+overflow 经典陷阱。改 flex-start 后溢出全落在右侧，
     滑动全程可达；取舍：内容放得下时行内从宿主的居中变左对齐（视觉差异
     仅空隙分布），功能缺陷（指标永久丢一段）优先。特异性 (0,3,0) 带
     !important 胜宿主 (0,1,0) 普通声明，与书写顺序无关；data-mobile-nav=
     "stats" 是 stats-line 效果打的稳定标记，无哈希、跨宿主代际可用。
     本条置于 ①嵌套块外：裁切陷阱与断点 A 的档位无关，全移动宽度生效。 */
  body:not([data-pocket-stats="off"]) [data-mobile-nav="frame"] [data-phase] [data-mobile-nav="stats"] {
    justify-content: flex-start !important;
    /* 指标行的空隙在手机上偏松（2026-10-07 店主截图：「距离缩一点，更紧致一点」）。
       宿主 dsh-client-ui-chat 的 StatsPills 叠了三层：root 的 12px 列间距 +
       sep 的 6px 两侧 margin + pill 的 8px 内边距 ⇒ 390px 实测两个指标之间的
       视觉空隙 ~28px。手机档收成 gap 6 / sep 2 / pill 6：同组内 ~14px、组间
       6px，仍然留得住「·」的读法，pill 的垂直尺寸没动（触控高度由宿主
       line-height 决定）。类名前缀 bOPqQW_ 会随宿主换代，故用子串锚并整条
       限定在本插件自己的 stats 标记内：换代只会让规则惰性化，不会误伤别处。 */
    gap: 6px !important;
  }
  body:not([data-pocket-stats="off"]) [data-mobile-nav="frame"] [data-phase] [data-mobile-nav="stats"] [class*="_sep"] {
    margin: 0 2px !important;
  }
  body:not([data-pocket-stats="off"]) [data-mobile-nav="frame"] [data-phase] [data-mobile-nav="stats"] [class*="_pill"] {
    padding-left: 6px !important;
    padding-right: 6px !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-mobile-nav="files"] {
    /* Keep the 36px seat the reference phone UI shows (opener box 316..352 at
       360px, icon 326..342): it is the geometry the lane's 46px reservation
       above is tuned against. Mirror the toggle's centre (top:6px for a 28px
       control -> centre y=20) by lifting the taller box to top:2px.
       本批之前的值；2026-10-12 的「座位 36→30 + top 2→5」只针对手机档，见手机档作用域。 */
    width: 36px !important;
    height: 36px !important;
    flex: 0 0 36px !important;
    top: 2px !important;
  }
  /* 手机档（≤767 + coarse）：2026-10-12 用户规格 —— 座位 36 → 30px（原来比左侧 ☰
     的 28px 胖一圈，用户指出"外部灰色胶囊"偏大）。top 由 2 改 5，保持图标中心仍在
     y=20，与 ☰ 同一水平线。平板档没被要求动，仍是 36px / top:2。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-mobile-nav="files"] {
      width: 30px !important;
      height: 30px !important;
      flex: 0 0 30px !important;
      top: 5px !important;
    }
  }
  /* 新宿主把「右侧栏入口」放进了 titleRow 的 headerCorner。手机上市宿右侧栏
     就是 Files 面板，所以它和插件的文件按钮是同一个面板的两个入口；而它带
     margin-right:-16px，36px 盒子在 360px 视口下会从文件按钮右侧漏出一角
     （2026-09-22 实测：corner [332,2 36x36]、图标 343..358 外露，被视口裁切），
     与参考图"右上角只有一个文件夹图标"不一致，也与插件自己的文件按钮重复。
     只针对标题行内的 corner，老一代宿主（corner 是唯一入口）不受影响。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="wSkVaW_titleRow"] > [class*="_headerCorner"] {
    display: none !important;
  }
  /* 右上角换人：0.1.6 把「右侧栏展开按钮」放进了 headerCorner，而插件的
     老规则「header > :first-child > :last-child 显示 none」在 0.1.5
     藏的是「会话日志胶囊」；新结构里 titleRow 的 :last-child 变成 corner，
     于是右侧栏入口被误藏、面板在手机上打不开。这里把 corner 放出来，
     同时让出「⋯」菜单那一格（360px 一行塞不下两个）。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) > :first-child > :last-child[class*="_headerCorner"] {
    display: flex !important;
    flex: 0 0 auto !important;
    margin-left: 4px !important;
    margin-right: 0 !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerCorner"] button {
    width: 36px !important;
    height: 36px !important;
    min-width: 36px !important;
    min-height: 36px !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerUtilities"] {
    display: none !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [role="tablist"] {
    width: 100% !important;
    margin-top: 4px !important;
  }
  /* 状态 chip 的座位：
     · 子代理谱系 chip（dsh-client-ui-subagent 的 ZKlsPq_root）—— 绝对定位到
       「对话/轨迹」行右侧；
     · 后台任务 chip（dsh-client-ui-jobs）—— 2026-10-17 起不再搬座位：宿主
       0.2.1 只渲染无类名包裹 div，旧代 QsffPG_root 那套座位规则已整块删除，
       现行规则见本条下方的 header-job-chip-collapse。
    谱系 chip 若不搬，会和标题窗口 + 预设 + 文件抢同一条 flex，实测直接叠在
     一起（进子代理会话时最明显）；动作行因此只留 [预设][团队][文件]。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) {
    position: relative !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [role="tablist"] {
    padding-right: 8px !important;
    /* 宿主的标签行宽度是满宽、默认 content-box，加 padding 会把它顶到
       x=8..368（右缘越过 header 右缘 360 共 8px，header.scrollWidth-clientWidth=8），
       也就是下面那条 118px 预留里有 8px 落在屏外。补 border-box 把它收回来，
       预留才是"整整 118px"。 */
    box-sizing: border-box !important;
  }
  /* 2026-10-12（受控实测后删除）：原「jobs 在场 ⇒ tablist 右侧预留 118px」规则
     被证明是**惰性的** —— 同一 DOM 上切 8px ↔ 118px，tablist 的 rect、clientWidth 与
     注入元素的 x **差量全为 0**。原因：本表 box-sizing 为 border-box，padding 落在声明
     宽度之内、不缩小 flex 容器的 content box；而 tablist 是 overflow-x 为 auto 的滚动容器，
     子元素可以排进 padding 区 ⇒ 预留区挡不住任何视觉重叠，只让 scrollWidth 多 110px，
     并在溢出后造成整行左移 8px（临界从 159 抬到 167）。
     实测临界（393×844，合成"第三方 chip"）：无 jobs 时 >159px 压到谱系 chip；
     有 jobs（74px 文案态）时 >83px 压到 jobs chip；标签行溢出要到 260px 才发生。
     要真正预留，border-box 下 padding 做不到，须用 margin-right 或
     width: calc(100% - Npx)（该替代方案未实测，属推断）；而 83px 这个上限的根源是
     jobs 的定位公式（左缘 = 谱系左缘 − 2 − jobs 宽），要腾更多得动定位而不是 padding。 */
   /* Agent Team chip（VoX2oq_root，data-team-action）被 rc 代 pin 规则钉死
      （flex 0 0 auto + order 2，实测 98.7px），动作行里唯一可缩的模式 chip
      被压到 56.2px（390px 实测「创造模式」只剩「创造…」）。模式 chip 是
      手机端唯一的模式切换入口（pitfalls ⑤：必须保字），团队 chip 的完整
      文字在自己的面板里有承载（点开即达），所以让它先让：保持 order:2
      不变（创造在前、团队在后的次序不能翻），只把不可缩改成可缩，并加
      收缩下限保住图标点击区；内部省略号窗口由 rc 代的
      > button / > button > * 规则继续供给。特异性 (0,5,1) 高于 pin 规则
      (0,4,1)，且 !important，不依赖书写顺序；:has 门控保证 rc 宿主不命中。
      2026-09-23 下限 44 → 28（用户拍板）：宿主自己那条 @container(width<=480px)
      把标签藏了，手机档这颗 chip 实际只剩 14px 图标，44px 的盒子成了那一行
      最宽的空占位（真机 dpr 4：图标右缘 291 → 文件按钮图标左缘 326，观感 35px
      留白）。28 = 图标 14 + 宿主自带左右内边距 7（.VoX2oq_trigger padding），
      与本插件 toggle/files 同尺寸，不再额外扩拍击区。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-team-action][class*="_root"] {
    flex: 0 1 auto !important;
    min-width: 28px !important;
  }
  /* 团队 chip 图标在「标准模式」与文件按钮之间居中（2026-09-26 用户拍板）。
     真机 360px / dpr 4 实测（无障碍盒 = 绘制盒）：标准模式 205..274、团队 chip
     278..306、文件按钮 316..352 —— 左缝 4、右缝 10，盒心 292 落在区间心 295 左侧。
     只做绘制层位移（宿主 .VoX2oq_root 本来就是 position:relative，不新增包含块、
     也不动它自己的弹层锚定），布局一个像素不变：46px 承重预留保持原样（见
     pitfalls「header 拥挤」），文件按钮不会被压。位移后两缝 7/7，图标正好居中。
     只在真·手机档生效：768–1023 平板档排布不同，不套这台手机的魔数。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-team-action][class*="_root"] {
      left: 3px !important;
    }
  }
  /* 后台任务 chip 的**现行**规则（宿主 0.2.1 起）：上面那整个 QsffPG_root 族在该代
     静默失配 —— 宿主只渲染一个**无类名**的包裹 div，类名映射表里已经没有 root 键。
     失效后果实测：8 字文案（1 个后台任务运行中）回到标题行，标题触 72px 地板后动作
     簇仍放不下，溢出的 30px 画进文件按钮预留带、被文件夹图标压住（真机「顶部错位」）。
     用户规格（2026-10-17）：只留状态圆点 + 折叠箭头，位置排在预设与文件夹之间、
     智能体团队 chip（pin 为 order 2）的右边。锚改用「trigger 直接挂 _count」这一
     形状，不依赖包裹 div 的类名；槽位是 display:contents 的包裹节点，故不写直接
     子元素组合符。诊断与判据见 pitfalls「header 拥挤」。 */
  /* @patch
     id: header-job-chip-collapse
     for: dsh-client-ui-jobs 的后台任务 chip（0.2.1 起包裹 div 无类名）
     why: chip 由宿主作为 header.actions 槽的贡献节点渲染，类名与结构归宿主所有，
          插件只能在样式层收窄可见内容与序位
     until: 宿主给该 chip 稳定的数据标记，或在手机档自带折叠形态
     test: tests/a2-header-gating.test.ts
  */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerActions"] div:has(> button[class*="_trigger"] > [class*="_count"]) {
      order: 9 !important;
    }
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerActions"] button[class*="_trigger"] > [class*="_count"] {
      display: none !important;
    }
  }
  /* 头部弹层定位（jobs 任务列表 / subagent 谱系 / 预设菜单都会命中的同一族）：
     插件老规则是「弹层左缘 = chip 左缘 + 8px」，那条规则成立的年代 chip 都
     贴着 header 左缘；现在标题窗口 72px + 子代理 chip + 预设都靠中右，336px
     宽的面板会被整体推到视口外 —— 点开就像没反应。
     统一改成视口定位：贴在 header 下方、左右各留 8px 满宽展开；顺带脱离
     headerActions 的 overflow 裁剪（绝对定位的面板会被那个 auto 裁掉）。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_menu"]:not([class*="_menuAnchor"]) {
    position: fixed !important;
    left: 8px !important;
    right: 8px !important;
    top: calc(env(safe-area-inset-top, 0px) + 80px) !important;
    bottom: auto !important;
    width: auto !important;
    max-width: none !important;
    /* vh 回退行在前（pocket 补丁） */
    max-height: calc(100vh - 96px) !important;
    max-height: calc(100dvh - 96px) !important;
  }
  /* 官方 agent-team 插件（@deepseek-ai/dsh-experimental-client-ui-agent-team）的
     TeamAction 弹层：根元素 data-team-action（VoX2oq_root，挂在 headerActions 槽
     order 20），面板 VoX2oq_panel 是 absolute 弹层。它和上面 _menu 族栽在同一个
     裁剪问题上 —— _headerActions 的 overflow 滚动盒把它整个裁掉（实测 390/360px
     视口均不可见、关闭键落在视口外），但类名不含 _menu，上面那条规则救不到，
     所以这里同款视口定位脱离裁剪。哈希前缀 VoX2oq_ 跨版本会变，按仓库约定用
     _panel 子串匹配；不会误伤其他弹层 —— data-team-action 根标记只有 agent-team
     插件在用，特异性 (0,5,1) 也高于 _menu 族的 (0,4,1)。代际上整条已由外层
     header:has([class*="_headerLeading"]) 门控，pre-alpha.2 宿主不命中。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-team-action] [class*="_panel"] {
    position: fixed !important;
    left: 8px !important;
    right: 8px !important;
    top: calc(env(safe-area-inset-top, 0px) + 80px) !important;
    bottom: auto !important;
    width: auto !important;
    max-width: none !important;
    /* 底部让位 composer 区：会话页 composer 卡顶缘实测 y=738、stats line
       到 840（844 视口，底部区共 106px）——原 max-height 100dvh-96px 让
       面板伸到 y=828，底部 90px 的任务列表被输入框盖住（2026-09-19 用户
       报障）。120px = composer 区 106px + 14px 呼吸间距；键盘弹出时 dvh
       收缩，面板随之再缩。vh 回退行在前（pocket 补丁）。 */
    max-height: calc(100vh - 200px) !important;
    max-height: calc(100dvh - 200px) !important;
    /* 面板虽被拖出头部渲染点，white-space 仍继承 0.1.6 头部的 nowrap
       （头部整行防换行是既有决策）——手机 374px 宽 + 长任务标题时内容
       单行撑出面板（实测 scrollWidth 541 / clientWidth 374，任务状态
       徽标被推到面板外 x=496 处）。恢复面板内正常换行。 */
    white-space: normal !important;
  }
  /* 子代理谱系 chip（ZKlsPq_root）：0.1.6 把它渲染在标题面包屑内部。进子代理
     会话时面包屑变成「父会话 / 当前会话」两段 + 这个 chip，动作行就叠在一起，
     所以整块搬到「对话/轨迹」这一行的空白区里居中，并与标签文字纵向对齐。
     后台任务 chip（同族的另一颗状态 chip）2026-10-17 起改由「trigger 直接挂
     _count」的形状锚收窄（见下方 header-job-chip-collapse）——宿主 0.2.1 不再给
     它的包裹 div 类名，QsffPG_root 那套座位规则已整块删除。 */
  /* @patch
     id: header-chip-seat
     for: 宿主 3.0.6 的 headerActions / titleCluster 槽位（子智能体谱系 chip 的座位）
     why: 槽位树由宿主 React 管理，本插件不能插入自有节点，只能靠 CSS 改排位
     until: 上游在标题行提供稳定的 actions/title 槽标记，或把该 chip 分到独立容器
     test: tests/a2-header-gating.test.ts
  */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"] {
    position: absolute !important;
    /* 在「标签右侧的空白区」里居中（左边界让开对话/轨迹，约 104px），
       比整行居中往右一些。 */
    left: 104px !important;
    right: 8px !important;
    /* 纵向对齐标签：直接镜像标签的盒模型 —— 标签是「16px 行高 + 9px 下内边距」，
       总高 25px 且贴着 header 底边。chip 也做成 25px 高、bottom:0、下内边距 9px，
       内容区正好落在同一段 16px 里，文字必然与「对话/轨迹」齐平。 */
    bottom: 0 !important;
    height: 25px !important;
    min-height: 25px !important;
    align-items: stretch !important;
    z-index: 3 !important;
    margin: 0 auto !important;
    width: max-content !important;
    min-width: 0 !important;
    max-width: min(32vw, 116px) !important;
    flex: 0 0 auto !important;
  }
  /* 2026-10-12：原「后台任务在场 ⇒ 谱系 chip 让位到 right:126px」规则已删除。
     用户规格是主次对调（谱系 chip 固定不动、后台任务 chip 让到它左侧），
     让位一旦保留就会把谱系 chip 推走 —— 与规格直接冲突。2026-10-17 起后台
     任务 chip 已不在标签行（宿主去了类名、旧座位规则删除），让位更没有存在
     的理由。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"] > button {
    height: 25px !important;
    min-height: 25px !important;
    line-height: 16px !important;
    /* 原 9px 下内边距是「贴 header 底边、与标签文字齐平」用的；搬进标题行后要改贴
       预设 chip 的竖直中心（与后台任务 chip 搬上去时同一处理）。 */
    /* 2026-10-12 用户规格：右侧内边距 4 → 2px，让 chip 的文字/箭头更靠近右缘。 */
    padding: 0 4px 9px !important;
    align-items: center !important;
  }
  /* 已知边界：标签行出现第三个标签时，标签总宽约
     252px，已经越过子代理 chip 居中区的左边界（104px），两者会叠在一起。
     这里用 :has() 按标签数量切换策略 —— ≥3 个标签时不再居中，改成停靠在标签行
     右侧的空白区（右缘 8px；有后台任务 chip 时让到 126px）。标签行本身可横向
     滑动，chip 不会被挤到下面，也不再盖住第三个标签：
       chip 占 268~352（宽 84），标签止于 8+252=260，右侧余量 8px。
     两个变体并列，兼容「tab 是 tablist 直接子按钮」与「tab 被容器包裹」两种渲染；
     两条变体均 (0,5,2)（带 QsffPG 的二次覆盖规则为 (0,6,2)），高于上面两条既有规则，
     不依赖书写顺序。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has([role="tablist"] button:nth-of-type(3)) [class*="ZKlsPq_root"]:not([class*="_switcherRoot"]),
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]):has([role="tablist"] > button:nth-child(3)) [class*="ZKlsPq_root"]:not([class*="_switcherRoot"]) {
    left: auto !important;
    right: 8px !important;
    margin: 0 !important;
  }
  /* 2026-10-12：≥3 标签版的让位规则（原 right:126px）已一并删除 —— 同 Y1，
     主次对调后谱系 chip 不再为后台任务 chip 让位。 */
  /* 真机反馈：「标题下面多了一条灰色滑条」。第 4/5 条为了让长标题能左右拖着看，
     把面包屑做成了横向滚动容器 —— 实测 button.wSkVaW_crumb: overflow-x:auto、
     scrollWidth − clientWidth = 88；像素实测那条灰条是 x=40.0~89.5、高 7.8、
     拇指宽 ≈50 的圆角滚动条（100×100/188 ≈ 53，吻合）。
     本机 WebView 不认 scrollbar-width（CSS.supports 为 false），只有
     ::-webkit-scrollbar 生效；而且滚动条是「经典占位式」的 8px（合成容器实测
     offsetHeight − clientHeight = 8）。所以这里对整个会话头部统一掐掉滚动条：
     滑动能力保留，视觉上不再多一条。头部里任何位置的滚动条在 360px 宽的手机上
     都不是想要的，故不再按具体类名收窄范围。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]),
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) * {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"])::-webkit-scrollbar,
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) *::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  /* 单子代理运行态的 switcher 变体（宿主 SubagentHeaderLineage variant=
     "switcher"，根类是「基类 + 修饰类」双类 ZKlsPq_root ZKlsPq_switcherRoot，
     挂在 crumbs 内同一 lineage 槽位，a2 bundle line 615 实锤）：pin 规则按
     设计排除 _switcherRoot（切换器必须保持可缩），于是它从我方链里继承了
     零溢出约束——宿主 trigger 上限 max-width:244px 大于我方根帽 116px，
     根又没有 overflow，trigger 连同标题从右锚定的根左缘向右画出最多
     128px：真机 390 上文字冲到 ≈389、越过条带右缘 374，省略号点也在视口
     外，看起来像「无省略号」。聚合态「N 个子代理」类表不含 _switcherRoot，
     不被本条命中（结构锚区分，文本无关）。修法：根帽提到 min(46vw,180px)
     （数值可调，给运行中标题比计数 chip 更多余地）+ 根 overflow 收口 +
     trigger max-width:100%，让宿主自带的 title 省略号链（flex:1 +
     min-width:0 + ellipsis）在根内收口；svg 宿主自带 flex:none，⋮⋮/箭头
     图标与省略号共存；菜单是 position:fixed，不受根 overflow 裁剪，点击
     不受损。特异性与上面 ZKlsPq_root 规则同类同权 (0,4,1)，靠书写在后接管
     switcher 变体；h8S2Va 旧代是否有同名修饰类未取证，a2 (ZKlsPq_) 已实测
     对号。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_switcherRoot"] {
    max-width: min(46vw, 180px) !important;
    overflow: hidden !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_switcherRoot"] > button {
    max-width: 100% !important;
    min-width: 0 !important;
  }
  /* switcher 定位（用户拍板 2026-09-19：右靠 + 与 tab 基线对齐）：基础规则
     把 switcher 与聚合 chip 一起居中/让位，取证实测 179.4 宽被推到
     84.6..264，整个压进 tab 带（tab 按钮 y 44-76、中心 y=60）盖住轨迹/
     记忆两 tab。本条用双类结构锚（聚合态类表无 _switcherRoot，零误伤）
     把 switcher 拉回右缘 8px 惯例位；top:48 使 25 高中心 60.5 ≈ tab 中心
     60，完成基线对齐——基础规则的 bottom:0 因 top+height+bottom 全非 auto
     过约束，按 spec 忽略 bottom、top 执政，行为确定。
     360 真机推演：右锚后左缘 360−8−180=172 > tabs 端 ~126，46px 空隙。
     菜单 position:fixed 独立定位层，不受本条影响（取证已证）。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"][class*="_switcherRoot"] {
    /* 同上，进标题行流程。变体实测宽 180px，而标题行右簇只有约 229px 可用
       （= 可用 305 − 标题地板 72 − 间隙 4），减去预设 chip 95 与间距后只剩约 124px，
       所以这里封顶，超出部分由内部 span 的 ellipsis 收掉（见本文件 ZKlsPq span 规则）。 */
    /* 换位后同样回标签行；标题行才需要的 124px 封顶随之撤掉。 */
    /* 2026-10-12 用户要求：**位置定死，不被其他插件移动**。
       绝对定位元素的落点由「四边偏移 + 包含块 + transform」三者决定，所以三处都钉：
       ① 四边写全（含 bottom: auto），别的插件只改一条也推不动；
       ② 包含块锁死在 header（见下面把 _titleCluster/_headerActions 钉成 static 的那条）；
       ③ transform/margin 归零并加 !important，防被 translate / 外边距挪走；
       ④ z-index 提固定值，防止标签行后来者把它盖住。
       ⚠ 本块只钉「不被别的插件移动」——落点本身仍是本批之前那套（绝对定位贴
       标签行右缘）；手机档的形态差异由手机档作用域表达。 */
    position: absolute !important;
    left: auto !important;
    right: 8px !important;
    top: 48px !important;
    bottom: auto !important;
    margin: 0 !important;
    transform: none !important;
    z-index: 3 !important;
  }
  /* 聚合 chip 右锚（用户拍板 2026-09-19：中置的子代理元素应右靠）：与
     switcher 同款右靠 + 基线（top:48 → 25 高中心 60.5 ≈ tab 中心 60；
     bottom:0 过约束被忽略、top 执政）。聚合 ~97 宽右锚后 285..382，标签行
     无第二颗状态 chip 时零碰撞（tabs 端 ≤170）。:not(_switcherRoot) 把变体
     让给上面 switcher 专属规则，二者匹配集不相交、无 order-tie。聚合
     max-width min(32vw,116) 沿用基础规则不动；数值 48/8 可调。 */
  /* @patch
     id: lineage-chip-pinned
     for: 宿主 ZKlsPq 子智能体 chip 的绝对定位落点（含包含块）
     why: 别的插件只要给任一祖先加 position:relative，包含块被抢、chip 就会挪位；四边偏移加 transform 是唯一能钉死的手段
     until: 宿主为该 chip 提供非绝对定位的稳定槽（届时四边偏移与祖先 static 都可删）
     test: tests/a2-header-gating.test.ts
  */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"]:not([class*="_switcherRoot"]) {
    /* 2026-10-12 用户规格（第三批·B 方案）：把**子智能体 chip 从标签行搬进标题行**，
       坐在「智能体预设 chip」与「文件夹按钮」之间 —— 即原先后台任务圆点占的那个位置；
       后台任务 chip 已进标题行（现由 header-job-chip-collapse 收窄）。
       原来它是 absolute + right:8px + top:48px（相对 header，视觉上落在标签行 y=42..67）。
       进流程后 left/right/top 全部失效，由 order 排在预设 chip 之后。 */
    /* 2026-10-12 换位后回标签行：绝对定位贴右缘、top:48（原形态）。 */
    /* 2026-10-12 用户要求：**位置定死，不被其他插件移动**。
       绝对定位元素的落点由「四边偏移 + 包含块 + transform」三者决定，所以三处都钉：
       ① 四边写全（含 bottom: auto），别的插件只改一条也推不动；
       ② 包含块锁死在 header（见下面把 _titleCluster/_headerActions 钉成 static 的那条）；
       ③ transform/margin 归零并加 !important，防被 translate / 外边距挪走；
       ④ z-index 提固定值，防止标签行后来者把它盖住。 */
    position: absolute !important;
    left: auto !important;
    right: 8px !important;
    top: 48px !important;
    bottom: auto !important;
    margin: 0 !important;
    transform: none !important;
    z-index: 3 !important;
  }
  /* 手机档（≤767 + coarse）：上面两条的 top:48 是按"标题行 40 + 页签行 36"的老几何
     推的（25 高中心 60.5 ≈ tab 中心 60）。本插件的手机档把页签行压到 26px 之后，
     真机页签文字落在 43..58（tab 盒 40..66），芯片还停在 48 ⇒ 文字 49..63、比
     "对话/轨迹"低 6px（店主 2026-09-23 截图报障："调了间距但忘记把这个调了"）。
     同特异性 + 同 !important 时后到先得，所以本条必须写在那两条之后：42 让芯片
     文字落到 43..57，与页签文字 43..58 对齐。平板档不压页签行，仍用 48。 */
  @media (max-width: 767px) and (pointer: coarse) {
    /* ⚠ 两个选择器都必须写成与上面两条**同特异性**：
       聚合变体的 48px 规则是 …[class*=ZKlsPq_root]:not([class*=_switcherRoot])，
       :not() 会把参数的特异性算进去 ⇒ (0,5,1)。我第一版第一个选择器写成通用的
       …[class*=ZKlsPq_root]（只有 (0,4,1)）⇒ 特异性输给那条 48px，
       店主实测"又没对齐了"（聚合芯片文字回到 49..63）。带上 :not(...) 才并列、
       再靠"后到先得"取胜。 */
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"]:not([class*="_switcherRoot"]),
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"][class*="_switcherRoot"] {
      top: 42px !important;
    }
  }
  /* 谱系 chip 里的文字（子代理标题 /「N 个子代理」）给一个规矩的省略号窗口：
     不要裁成半个字，也不要靠滚动去够剩下的字。 */
   /* :not([class*="_separator"])：rc 代有 (0,4,1) !important 的
      [class*="_crumbs"] [class*="_separator"] display:none 规则，专门隐藏
      谱系计数前的「/」（小屏上它读起来像多出一层面包屑层级）；本条原来
      同为 (0,4,1) !important 且书写在后，同特异性后到先得把 separator
      顶回 display:block（实测 390px separator [269.1,·,5.5,25] 实绘可见）。
      加 :not 把 separator 从本条管辖范围摘掉，隐藏权交还 rc 代那条。 */
  /* 2026-10-12 用户规格：给智能体预设 chip 套一层**不可见的胶囊**。
     动机：公共车道里预设 chip 与子智能体 chip 会贴在一起（间距已被收到 0），
     不套这层就分不清是两个控件。
     做法：外壳用 ::before 画一个透明底的圆角胶囊（「灰色层、不显现」——形状与圆角
     就位，底色透明；将来要显灰只需把 background 换成变量），实际间隔由 margin-right
     给出（几 px，用户明确要求「不至于为 0」）。
     用 ::before 而不是给本体加 padding：本 chip 的图标是 position:absolute 贴左缘的，
     给本体加左内边距会让文字右移而图标不动，两者会叠上。 */
  /* @patch
     id: preset-invisible-capsule
     for: 宿主 SVAs4q_label 智能体预设 chip 的外包裹层
     why: 该 chip 的图标是 position:absolute 贴左缘，给本体加内边距会让文字与图标叠上；只能加一层绝对定位外壳
     until: 宿主给预设 chip 自身加上左右内边距（本外壳与 margin 一并删）
     test: tests/a2-header-gating.test.ts
  */
  /* 智能体预设 chip（SVAs4q_label）：**本批之前这里没有任何本插件的规则** ——
     宿主的 max-width 180px + ellipsis 边界照旧，外层不加包裹层。
     2026-10-12 的「不可见胶囊 + 可收缩 + 超长省略号」是一组只针对手机档的改动，
     见下面的手机档作用域（平板档继续走宿主原样）。 */
  /* 手机档（≤767 + coarse）：2026-10-12 用户规格 —— 给智能体预设 chip 套一层
     **不可见的胶囊**。动机：公共车道里预设 chip 与子智能体 chip 会贴在一起
     （间距已被收到 0），不套这层就分不清是两个控件。做法：外壳用 ::before 画一个
     透明底的圆角胶囊（「灰色层、不显现」——形状与圆角就位，底色透明），实际间隔由
     margin-right 给出（几 px，用户明确要求「不至于为 0」）。用 ::before 而不是给
     本体加 padding：本 chip 的图标是 position:absolute 贴左缘的，给本体加左内边距
     会让文字右移而图标不动，两者会叠上。
     另加「长名字防护」：宿主自带的 min-width:auto（= 内容宽）会让长名字把同级挤出去、
     先压垮标题的 72px 地板再让整簇溢出；这里补可收缩 + min-width:0 + 省略号。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="SVAs4q_label"] {
      position: relative !important;
      /* 先归零（去掉与宿主自带 2px 右内边距的重复），用户看过之后要求
         「外包裹层的 px 抬一丢丢」⇒ 占回 2px。现在的构成 = 宿主自带右内边距 2 + 本 margin 2
         + 容器 gap 0 + 团队 chip 左内边距 2 = 6px（改前是 11px，大头那 7px 已收掉）。 */
      margin-right: 2px !important;
      flex: 0 1 auto !important;
      min-width: 0 !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      border-radius: 999px !important;
    }
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="SVAs4q_label"]::before {
      content: '' !important;
      position: absolute !important;
      /* 用户要求「外包裹层的 px 抬一丢丢」：左右各 4 → 5px，上下也包 1px。 */
      inset: -1px -5px !important;
      border-radius: 999px !important;
      background: transparent !important;
      pointer-events: none !important;
    }
    /* 2026-10-12 用户反馈「预设与团队之间距离太多」：实测大头来自**团队 chip 自己**的
       左内边距（宿主 .VoX2oq_trigger 是 padding: 3px 7px）。7 → 2px 收掉 5px，
       与上面预设的 margin 归零合起来，这段总间距从 11px 降到 4px（视觉上才看得出来）。
       代价：该按钮左侧命中区窄 5px（高度仍由 min-height: 28px 保证）—— 用户若觉得难点，
       把 2px 往上调即可，值就是唯一旋钮。 */
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [data-team-action][class*="_root"] > button,
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="VoX2oq_trigger"] {
      padding-left: 2px !important;
    }
  }
  /* 2026-10-12：把子智能体 chip 与 header 之间的两个祖先钉成 static ——
       绝对定位元素认「最近的已定位祖先」作包含块，别的插件只要给它们其中任何一个
       加上 position:relative，chip 就会以那个元素为基准重新落点（相对位移）。
       二者今天本来就不是定位元素，钉成 static 对现有布局零影响，只是把包含块锁死在 header。 */
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) > [class*="_titleCluster"],
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_titleCluster"] > [class*="_headerActions"] {
    position: static !important;
  }
  [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="ZKlsPq_root"] span:not([class*="_separator"]) {
    display: block !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    min-width: 0 !important;
    max-width: 100% !important;
  }
  /* composer 模型选择 chip（dsh-client-ui-model-selection，样式哈希
     _7KE1Ra_）。2026-09-23 改档：真·手机档一律**只留图标**
     （IconDataOutlineRegular），模型名与 effort 不再常驻 —— 官方新加的语音
     按钮吃掉宽度后「图标+名字」把动作行挤爆；点图标打开菜单后再选模型。

     上游 0.1.7 已把这个能力做成契约：conversation 的 observeControlRow()
     实测 row 装不下时才打 data-model-compact，其 CSS
     「.uV2eYG_row[data-model-compact]」向下传
       --dsh-composer-model-text-display: none;
       --dsh-composer-model-icon-display: block;
     由 model-selection 消费：triggerIcon display:var(…icon…,none)、
     triggerLabel/triggerEffort display:var(…text…,block)。
     **旧规则 [class*="_7KE1Ra_triggerLabel"]{display:inline !important}
     正是把它顶掉的那一条** —— 图标被 compact 显形、名字又被我们拉回来，
     所以现场是"图标和名字同时出现"，也就是"上游代码里有、却不生效"。
     这里删掉它，并在 ≤767px 直接钉住这两个变量，不去赌宿主的实测结果
     （否则一旦某项变窄让 row 装得下，文字又会长回来，来回抖）。

     _7KE1Ra_ 是本代 model-selection 的样式哈希，包不在则整条死规则，无需
     另加代际门；必须带哈希前缀，裸 [class*=_triggerLabel] 会误伤
     permission-presets / settings-general 的同名片段。 */
  @media (max-width: 767px) {
    [data-mobile-nav="frame"] [data-phase] [class*="_card"]:has(textarea, [data-composer-input]) [class*="_row"]:has([class*="_trailing"]) {
      --dsh-composer-model-text-display: none;
      --dsh-composer-model-icon-display: block;
    }
    /* 图标化后（上方变量钉死为 icon-only）宿主那套 padding:0 4px 0 8px 纯属
       浪费（左 8px 是给文字留的）。2026-09-23 店主第二轮："范围有点大、
       ⌄ 离图标远" ⇒ padding 归零、gap 归零，匣子只剩「图标 + ⌄」本身
       （实测墨迹间距 10px → ~4px，匣宽 46 → ~32px）。issue #101 对账：原与
       max-width 同块、无档位限定，768–1023 平板档文字在场时也被归零，chip
       内部「图标|模型名|effort|⌄」贴死 —— 2026-09-24 挪进本 ≤767 专档。 */
    [data-mobile-nav="frame"] [data-phase] [class*="_7KE1Ra_trigger"] {
      padding: 0 !important;
      gap: 0 !important;
    }
    /* ⌄ 的 svg 自身带内边距（墨迹比 viewBox 窄），再拉近 2px。gap 归零后两个
       svg 的内边距会让墨迹直接贴住（实测墨迹连成一段），这里不再加负 margin，
       留 ~2px 呼吸 —— 间距从 10px 收到 2px。 */
    [data-mobile-nav="frame"] [data-phase] [class*="_7KE1Ra_chevron"] {
      margin-left: 0 !important;
    }
  }
  /* 模型 chip 宽度预算（只对仍显示文字的 768–1023 平板档有意义）：宿主
     trigger 的 max-width min(360px,45cqw) 在窄容器下只给
     label+icon+effort+chevron 留 ~160px，模型名会省略成「GLM-5.3-Fla…」
     （headless 字体窄恰好放得下，同一盲区）。放宽到 60cqw，effort 有宿主
     自带 flex-shrink:1000 先让位。手机档文字已隐藏，这条不参与。特异性
     (0,3,0)+!important 胜宿主 (0,1,0) 普通声明；60 数值可调。 */
  [data-mobile-nav="frame"] [data-phase] [class*="_7KE1Ra_trigger"] {
    max-width: min(360px, 60cqw) !important;
    /* issue #101 对账：padding/gap 归零与 chevron margin-left:0 已分档至上方
       ≤767 专档（那是「图标化后」的前提）；768–1023 文字显示档保留宿主
       padding 0 4px 0 8px 与宿主 gap，⌄ 回宿主 margin。 */
  }
  /* --- Settings dialog on mobile ---
     Desktop: 800px two-column flex (188px nav + content). Mobile: a
     near-full-width sheet — nav tabs wrap into rows on top, option rows
     stay horizontal (title+description left, control right). Structural
     selectors are scoped to the unique aria-modal dialog; every
     settings-specific rule is gated with
     :has(> :first-child > :last-child > button) — the settings nav tab
     list holds <button> tabs, so the transient export dialog (the same
     primitives Modal, header(title+close)+description+body) keeps its
     official centered card layout. Requires :has() support
     (Chromium 105+, 2022).

     The directory picker (dsh-client-ui-directory-picker-browse) must be
     excluded too: its footer bar holds <button> children AND its breadcrumb
     trail (role="navigation") — which the role gate relies on to exclude
     it — is REPLACED by the path input in edit mode (pencil button), so
     without the ZuhsRW exclusion clicking the pencil would suddenly match
     this sheet rule: the dialog jumps to the top of the screen, the header
     (with the path input) is hidden by the > :first-child > :first-child
     display:none rule below, and the user can no longer type a path
     (issue #12, 2026-08-16). The picker family keeps the official layout
     on mobile in every mode.

     The keyboard-shortcut modal (dsh-client-ui-shortcuts, the same
     primitives Modal → data-shortcut-modal="shortcuts") needs the same
     exclusion for the same class of reason: its first child is the
     CONTENT column (nhfO0a_contents = header + search row + list +
     footer), not a nav row, and its footer holds <button> children, so
     the family predicate matched it and the sheet rules transposed the
     whole dialog — measured 2026-09-25 at 390px: the
     > :first-child { flex-direction: row } rule laid search row / list /
     footer SIDE BY SIDE (x=20 / 118 / 278, list 1296px tall, spilling
     far outside the sheet), and > :first-child > :first-child
     { display: none } swallowed the 「快捷键」 title together with its
     close button (owner report). The host tags every modal of this
     family: data-shortcut-modal="settings" on the settings sheet,
     "shortcuts" on this one — gating on that attribute (not on a hashed
     class) keeps the official centered card, the same treatment the
     export dialog gets. */
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) {
    position: absolute !important;
    left: 8px !important;
    /* Fixed top (no translateY): a transform on the panel combined with the
       panel overflowing the max-content drawer shifts the fixed overlay's
       coordinate frame, dragging the whole sidebar content off-screen. The
       safe-area inset keeps the sheet below the status bar / notch. */
    top: calc(env(safe-area-inset-top, 0px) + 12px) !important;
    width: calc(100vw - 16px);
    max-width: calc(100vw - 16px);
    /* Height follows the content (no dead space under a short page); it
       caps at the KEYBOARD-LESS viewport height minus 24 (less the safe-area
       top) and the options area scrolls only then. STABLE_VIEWPORT_VAR, not
       100dvh: measured 2026-09-25 on Android 16 WebView (adjustResize), the
       soft keyboard takes the layout viewport 754 -> 471 and vh / svh / lvh /
       dvh all follow it, so a dvh-sized sheet collapses a step the moment the
       shortcut modal's search field raises the keyboard — the reporter's
       「又闪一下」. The variable never moves for the keyboard, so the sheet
       keeps its size and the keyboard covers its lower half instead. */
    height: auto;
    max-height: min(800px, calc(100vh - 24px - env(safe-area-inset-top, 0px)));
    max-height: min(800px, calc(var(--dsh-web-mobile-vh, 100dvh) - 24px - env(safe-area-inset-top, 0px)));
    /* Only a real viewport change (rotation / window resize) reaches this now,
       so the short transition reads as a slide instead of a jump. */
    transition: max-height .2s var(--ds-ease-out, ease-in-out);
    flex-direction: column !important;
    border-radius: 14px !important;
    animation: dsh-web-mobile-sheet-in .22s var(--ds-ease-out, ease-in-out);
  }
  /* The settings sheet's dimmed mask fades in with the panel: the mask is the
     overlay's first child, so it is reached as a direct child of the overlay
     that holds the settings panel. The panel is identified by its stable
     data-shortcut-modal="settings" marker (host value; the shortcut editor uses
     "shortcut-edit" instead, so this cannot reach that family) plus
     role/aria-modal. Keep the outer :has() ATTRIBUTE-ONLY: an earlier form
     tested the panel's shape by nesting a :has() inside this one, which is an
     invalid selector — Chromium dropped the entire rule without a word and the
     fade never ran once (issue: settings mask, found 2026-09-27 and 2026-10-10).
     scripts/css-structure-check.mjs now fails the build on nested :has(). */
  :has(> [aria-modal="true"][data-shortcut-modal="settings"]) > [class*="_mask"] {
    animation: dsh-web-mobile-fade .18s var(--ds-ease-out, ease-in-out);
  }
  @media (prefers-reduced-motion: reduce) {
    [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]),
    :has(> [aria-modal="true"][data-shortcut-modal="settings"]) > [class*="_mask"] {
      animation: none !important;
    }
  }
  /* The export dialog (not the settings sheet) must never overflow the
     viewport: the official centered card can be wider than 390px. */
  [aria-modal="true"]:not(:has(> :first-child > :last-child > button)) {
    max-width: calc(100vw - 32px);
  }
  /* Nav bar: hide the "Settings" caption (redundant on a full-width sheet)
     and wrap the tab list so every tab is visible — a horizontal scroll cut
     the last tab ("Plugins") off with no affordance to scroll. */
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child {
    width: 100%;
    flex-direction: row !important;
    align-items: center;
    gap: 6px;
    padding: 10px 12px 8px;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child > :first-child {
    display: none !important;
  }
  /* The tab strip stays clear of the toolbar: the toolbar (the close ✕ on
     this host — the config-file button is hidden below) is absolutely
     positioned over the nav row's right end (#105 A' — it stays at its
     React home in the content column; see below). The strip is pinned to
     ONE horizontal scroller: flex-wrap:nowrap + overflow-x:auto.
     2026-09-25, rc.2 portal regression: 0.1.7-rc.1 rendered this sheet in
     place (inside the app frame); rc.2 wraps it in
     createPortal(..., document.body) — diffed rc.1 vs rc.2 bundles, no
     createPortal before — so every [data-mobile-nav="frame"]-scoped
     dialog rule (the frame-era single-row scroller in compat.css among
     them) went dead the moment the overlay became a direct body child.
     What survived was this rule's own flex-wrap:wrap, which had been
     losing to the host's nowrap scroller and now had nothing to lose to:
     the cells broke into uneven rows (3/2/3/2/1 at 402px) whose first row
     slid under the 138px toolbar (config-file button + close) — the
     settings-sheet half of the owner's 2026-09-25 report. Pinning the
     scroller here makes the geometry host-generation independent again;
     the cells keep flex-shrink:0 + nowrap (rule below), the strip
     scrolls, and the hairline scrollbar is the affordance. The scroller
     VIEWPORT stops short of the toolbar zone: margin-right = toolbar
     width (36: the 32px round close + 4px) + 6px gap (measured
     2026-09-24) reproduces the reparent-era scroller geometry (its box
     ended 6px short of the toolbar). The strip must be anchored by its
     class. */
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child [class*="_navList"] {
    flex: 1 1 auto;
    min-width: 0;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    gap: 6px;
    margin-right: 42px;
    scrollbar-width: thin;
    -webkit-overflow-scrolling: touch;
  }
  /* Hairline scrollbar for the tab strip: the default WebKit scrollbar
     reads fat on a phone; 2px keeps the scroll affordance without the
     bulk. (Portal-aware copies of the frame-scoped rules in compat.css,
     which died with the rc.2 portal move.) */
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child [class*="_navList"]::-webkit-scrollbar {
    height: 2px !important;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child [class*="_navList"]::-webkit-scrollbar-thumb {
    background: var(--dsw-alias-border-l2, rgba(0, 0, 0, .22)) !important;
    border-radius: 1px !important;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child [class*="_navList"]::-webkit-scrollbar-track {
    background: transparent !important;
  }
  /* Cells stay whole inside the scroller: no shrink, no wrap, compact
     metrics. (Portal-aware copies of the frame-scoped rules in compat.css,
     which died with the rc.2 portal move.) */
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child [class*="_navCell"] {
    flex: 0 0 auto !important;
    white-space: nowrap !important;
    padding: 6px 8px !important;
    gap: 6px !important;
    font-size: 13px !important;
    justify-content: flex-start !important;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :first-child [class*="_navCell"] svg {
    width: 14px !important;
    height: 14px !important;
    flex: none !important;
  }
  /* Content toolbar (close, plus the config-file button on hosts that
     render one): pinned over the nav row's right end, flush right.
     #105 A' — the toolbar stays at its React home (the content column's
     direct child) and is absolutely positioned against the dialog; the
     dialog is position:absolute itself, so it is the containing block
     and no new one is introduced. Constants measured 2026-09-24 (CDP,
     393px): the reparented toolbar — whose visual this replaces — sat
     at in-dialog dy=10 / fromRight=12, hence top 10px / right 12px.
     Out of flow, the toolbar's own row disappears and the options area
     starts right under the nav row; the navList's scroll viewport stops
     short of the toolbar with margin-right = toolbar width (36: the 32px
     round close + 4px) + 6px gap (measured). Children carry official
     auto-margins
     that would defeat flex-end, so neutralize them. The close button
     gets a round tappable base so it reads as its own control, not
     part of the outline button.
     Anchored structurally, not by class substring: a bare [class*="_header"]
     also matches every plugin settings card header in the options area —
     the official Plugins config cards (YyYd_a_header) and the dsh-web-ui-all
     group cards (Kwoi6G_header / Jh0q7G_header / rUBhvW_header; the bpnj3G_/jmhvDG_
     siblings were renamed upstream in dsh-web-all 0.3.20, verified 2026-09-18), all sharing the upstream template text-align:left,
     gap:12px, padding:14px 16px). The old broad anchor right-aligned their
     text, gutted the padding and painted a 32px gray circle behind the
     chevron (2026-09-05 sweep: 8 bleeding headers). The toolbar's one
     structural home is the content column's direct child (the panel's
     :last-child); the post-reparent nav-row home died with the
     settings-toolbar-reparent task. Card headers live deeper — inside
     the options scroll area — and match neither, so no per-plugin hash
     guards are needed. */
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child > [class*="_header"]:not([class*="_headerActions"]) {
    position: absolute;
    top: 10px;
    right: 12px;
    /* z-index is load-bearing since 0.1.7-rc.2 (owner report 2026-09-25):
       the sheet is portaled to <body>, and the market page (dshmarket's
       nUhMVa_root, position:relative, z:auto) paints AFTER this header in
       DOM order — both are z:auto positioned, so the market head covered
       the pinned toolbar: the close ✕ stayed visible through the head's
       transparent right end but hit-testing returned the head, so tapping
       the ✕ did nothing ("按了关闭没用"). z-index lifts the toolbar into
       the painted-above layer: above the market root and its sticky list
       heads (.stickyHead z:5), still below the market's own transient
       layers (.opPanel z:40, .lightbox z:10000) which SHOULD cover it.
       Settings view: the toolbar sits over the nav row's reserved right
       end (margin-right 42px), so nothing there to cover or be covered. */
    z-index: 10;
    flex: 0 0 auto;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    padding: 0 0 0 4px;
    /* Hug the close ✕ only: the host header box is 54px tall, and with the
       actions hidden its empty lower half (above the market's "导出日志"
       button, which starts ~13px under the ✕) formed a dead zone that
       ate the export button's top-right corner once z-index lifted the
       toolbar above it (owner report follow-up 2026-09-25). 32px = the
       close's own height, so the toolbar's box ends where the ✕ ends. */
    height: 32px;
    min-height: 32px;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child > [class*="_header"]:not([class*="_headerActions"]) > * {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child > [class*="_header"]:not([class*="_headerActions"]) > :last-child {
    position: relative;
    width: 32px;
    height: 32px;
    border-radius: 50% !important;
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06)) !important;
  }
  /* 32px is under the ~44px touch minimum and this ✕ shares the corner
     with the market's version text (above-left) and its export button
     (below-left) — the owner's "很容易误触" report 2026-09-25. Extend the
     HIT area only (no visual change): the pseudo-element grows up, left
     and right by 6px — never downward, where the market's "导出日志"
     button starts ~13px under the ✕'s bottom edge and must keep its own
     top-right corner. Anchored to the button (position:relative above),
     so the extension travels with the pinned toolbar. */
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child > [class*="_header"]:not([class*="_headerActions"]) > :last-child::after {
    content: "";
    position: absolute;
    inset: -6px -6px 0 -6px;
    border-radius: 50%;
  }
  /* The config-file action (a settings.action slot — dsh-version-update's
     "打开配置文件") is hidden on phones: it is rarely needed here, and its
     ~94px next to the 32px close made the pinned toolbar 138px wide —
     wide enough to swallow the nav strip's first cells while the strip
     still wrapped (2026-09-25 report, the other half of the same
     regression as the scroller fix above). The close ✕ is the toolbar's
     SIBLING, not its child (verified in the live DOM: header children are
     [actions, close]), so hiding the actions never removes the way out.
     Desktop keeps the button: this whole block sits inside the mobile
     media wrapper. (Portal-aware replacement for the frame-scoped rule in
     compat.css, which died with the rc.2 portal move.) */
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child > [class*="_header"]:not([class*="_headerActions"]) [class*="_actions"] {
    display: none !important;
  }
  /* Appearance mode cards: the official cube row renders three tall
     vertical cards (~268px) that eat half the sheet. Turn them into a
     compact horizontal trio (icon + label inline, equal widths).
     Relies on the official cube-row class name of this version. */
  [aria-modal="true"] [class*="_cubeRow"] {
    gap: 6px;
  }
  [aria-modal="true"] [class*="_cubeRow"] > * {
    flex: 1 1 0;
    flex-direction: row !important;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 8px;
    min-height: 0;
  }
  /* Content: the options scroll area gets bottom breathing room so the last
     row never sits flush against the sheet's rounded corner. */
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child {
    flex: 1 1 auto;
    min-height: 0;
  }
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])):not([data-shortcut-modal="shortcuts"]) > :last-child > :last-child {
    padding: 0 12px 24px;
  }
  /* 0.1.6-alpha.2 宿主的插件管理页（dsh-client-ui-plugin-manager 渲染的
     section[data-plugin-panel]）。FAB 是全站恒定的左上角控件（用户明确
     要求：右下角不对，就放左上角），所以规则不做的是挪 FAB，做的是给
     面板自己的左上角内容让位。两个页面都要让，偏移量同一个：
     - 列表页：**有**内容在左上角 —— H1「插件」实测 [24,28,91,28]，与 FAB 盒
       [10,12,38,38] 重叠 24×22；点标题左缘命中的是 FAB 而不是标题
       （2026-09-19 报障）。上一版这里记的是「热区为空、零规则」，实测不成立。
     - 详情页（DetailTop 组件）：宿主返回键「返回插件列表」crumb，文字实测
       [24,28,70,19]，同样压在 FAB 左半——点它会触发开抽屉而不是返回。
       详情根的 data-* 标记有三种：内置插件详情 data-plugin-item-detail、市场
       插件详情 data-plugin-row-detail、builtin 详情 data-plugin-detail
       （实测「智能体团队」卡走的就是第三种），三条选择器并列全覆盖。
     让位量 = FAB 右缘（10 + 38 = 48）+ 8px 间距 = 56px，**写成相对量**：
     减掉宿主自己的 padding（clamp(24px,4vw,48px)），这样它跟着视口走，而不是
     把 390px 上量到的 32px 钉死（768px 平板上宿主 padding 是 30.7px，钉死的
     32px 会过量）。在 390px 上它算出来正好还是 32px，与上一版行为一致。
     锚点全部是宿主 data-* 标记，比 css-module 哈希类（X_2TxG_）稳定；
     pre-alpha.2 宿主没有这些标记，规则天然不命中（代际门控）。 */
  [data-mobile-nav="frame"] section[data-plugin-panel] {
    --dsh-web-mobile-panel-clearance: calc(56px - clamp(24px, 4vw, 48px));
  }
  /* 页首是宿主滚动盒的直接子元素，宿主给它 width:100%（.X_2TxG_page>*）。
     这种盒子上用 margin 会把整行顶出右缘、给面板加出一条横向滚动条，所以
     这里用 margin + 等量收窄：margin 盒仍是 100%，左缘让开 FAB，右缘不动
     （工具栏「添加插件」保持贴右）。 */
  [data-mobile-nav="frame"] section[data-plugin-panel] [class*="_pageHead"] {
    margin-left: var(--dsh-web-mobile-panel-clearance) !important;
    width: calc(100% - var(--dsh-web-mobile-panel-clearance)) !important;
  }
  /* 详情 crumb 是被拉伸的 flex item（没有 width:100%），margin 就是对的工具。
     **0.1.7-rc.2 起「直子」形态落空**：宿主把 crumb 套进了 DetailTop 的根盒
     （实测链 [data-plugin-detail] > div.X_2TxG_detailTop > button.X_2TxG_crumb），
     于是上面三条「> button:first-child」在详情页全部 matches()=false ——
     crumb 的 margin-left 计算值 0px，停在宿主 padding 上：盒 [24,28,342,14]、
     自带箭头图标 [24,28,14,14]、文字 span x=44，整条压在 FAB 盒
     [10,12,38,38]（右缘 48）里 —— 图标 14px 全遮、文字首字压 4px；
     elementFromPoint 在图标中心与文字首字处都命中 FAB，点「返回插件列表」
     实际触发的是 FAB 的 exit-panel（2026-09-25 报障截图同形）。
     所以保留直子三条（旧代宿主仍走它们），再按 crumb 自己的哈希片段补三条
     后代选择器。片段取「_crumb」：同前缀的 svg.crumbIcon 不是 button 天然排除，
     本子树里也没有别的 crumb 家族（文件面板 ZuhsRW_crumb* 在另一棵树）。
     实测让位后 crumb 变 [56,28,310,14] —— flex 拉伸项自己收窄 32px，无横向
     溢出（面板 scrollWidth 恒 390），点文字可正常返回列表。 */
  [data-mobile-nav="frame"] section[data-plugin-panel] [data-plugin-detail] > button:first-child,
  [data-mobile-nav="frame"] section[data-plugin-panel] [data-plugin-item-detail] > button:first-child,
  [data-mobile-nav="frame"] section[data-plugin-panel] [data-plugin-row-detail] > button:first-child,
  [data-mobile-nav="frame"] section[data-plugin-panel] [data-plugin-detail] button[class*="_crumb"],
  [data-mobile-nav="frame"] section[data-plugin-panel] [data-plugin-item-detail] button[class*="_crumb"],
  [data-mobile-nav="frame"] section[data-plugin-panel] [data-plugin-row-detail] button[class*="_crumb"] {
    margin-left: var(--dsh-web-mobile-panel-clearance) !important;
  }
  /* 自动化任务面板（@deepseek-ai/dsh-client-ui-schedule，0.2.0-rc.2 随实验性
     bundle 提供）不是 section[data-plugin-panel]：该 bundle 里
     「data-plugin-panel」命中 0 次，页头是 t-XoWW_pageHeading(display:flex)，
     标题是 h1{flex:1;min-width:0;margin:0}。盒模型取自宿主自己的 CSS：
     pageContent padding = clamp(24px,4vw,48px)（390px 视口取 24px），
     于是标题左缘 24px 落进 FAB 盒 [10,12,38,38]（右缘 48）——20px 字号的
     首字被整颗压住（2026-10-06 报障截图）。让位量沿用同一口径
     （56px − 宿主自身 padding）；作用对象取 h1：它是 margin:0 的 flex item，
     margin-left 只吃 flex 自由空间，不需要 width 补偿，也不会像整宽盒那样
     顶出横向滚动条。「_pageHeading」片段在全部宿主 client bundle 里只有这一个
     渲染者（2026-10-06 全量扫描），不误伤。 */
  [data-mobile-nav="frame"] [class*="_pageHeading"] > h1 {
    margin-left: var(--dsh-web-mobile-panel-clearance, calc(56px - clamp(24px, 4vw, 48px))) !important;
  }
  /* 快捷键弹层在手机上的落地形态。上面那条 :not([data-shortcut-modal="shortcuts"])
     只是把它从设置面板家族里摘出来、还它官方的内部排版（2026-09-25 实测：纵向列
     回来了、标题「快捷键」回来了、列表 441px 可滚、无横向溢出、docScrollWidth
     恒 390）。但官方的外框在手机上仍会「抽搐」：宿主 Modal 的 _root 是
     position:fixed; inset:0; align-items:center（视口居中），而弹层打开时会自动
     聚焦搜索框（实测 activeElement = INPUT「搜索快捷键」），手机随即弹软键盘 ——
     视口一缩，居中卡片就整体重排/回弹，肉眼即抖动。所以这里给它插件自己的「纸片」
     几何：顶部锚定（键盘怎么变，上缘都钉在 12px）+ 与设置面板同款左缘/宽度/圆角/
     入场动画。高度沿用宿主的 600px：nhfO0a_contents 是 flex:1 1 0%，要有一个确定的
     高度才撑得开列表，故不改成 auto；max-height 再按视口收口，超出的部分进列表自己
     的 scroll（_list 已是 flex:1 + min-height:0 + overflow-y:auto），与设置面板同款。
     宿主那 30px 的 translateY 是桌面居中卡的微调，顶部锚定后必须归零。 */
  [aria-modal="true"][data-shortcut-modal="shortcuts"] {
    position: absolute !important;
    left: 8px !important;
    top: calc(env(safe-area-inset-top, 0px) + 12px) !important;
    width: calc(100vw - 16px) !important;
    max-width: calc(100vw - 16px) !important;
    /* 同上：键盘不进这层的高度。这一层下面就是键盘，卡片缩一次就一定被看见，
       所以用「不含键盘的视口高度」定高 → 点搜索框时卡片纹丝不动，键盘盖住下半截。 */
    max-height: min(760px, calc(var(--dsh-web-mobile-vh, 100dvh) - 24px - env(safe-area-inset-top, 0px))) !important;
    transition: max-height .2s var(--ds-ease-out, ease-in-out);
    transform: none !important;
    border-radius: 14px !important;
    /* 不做透明度淡入。改动前（#124 修法二刀，2026-09-25）设置面板的
       dsh-web-mobile-sheet-in 还带 opacity 段，而本层叠在**同样全宽全白**的
       设置面板上，淡入的 .22s 里两层文字互相透出：CDP screencast 逐帧实拍
       （390×844）第 10-15 帧能看到「权限/语言/外观」与「快捷键速查/新会话」
       重影，肉眼就是「闪」。该刀后 sheet-in 已是纯滑入，不再有透明度重影的
       机制；本层维持瞬时出现（不写 animation 会落回宿主的 _modalEnter，
       同样是透明度淡入）；遮罩自己的淡入保留，整体仍是一次正常的弹层出现。 */
    animation: none !important;
  }
  /* 手机档收掉搜索行（报障人拍板 2026-09-25：「加回来又闪了，不要这个了，手机上也不怎么用」）。
     因果已由报障人两次实机复现钉死：**行在 → 打开就闪；行藏 → 不闪**。机理：宿主 Modal 会把
     焦点抢到 [data-modal-autofocus]（就是这个搜索框），键盘在弹层打开那一瞬就抬起来，布局
     视口随之 754→471，整页重排 —— 就是「全屏闪」。收掉这个唯一的文本输入，弹层里就再也
     弹不出键盘，那一步不存在；而不是靠 focus 影子去拦（那条守卫在这台引擎上并不总是拦得住）。
     只做 CSS 隐藏，**绝不删宿主节点**：宿主是 React 渲染的，删掉它卸载时 parent.removeChild
     会抛 NotFoundError，被 SlotErrorBoundary 吞掉后整个 slot 变空白（见 pitfalls「搬宿主
     React 节点」）。想恢复搜索只需删掉这两行，但要接受打开瞬间那一下全屏闪。 */
  /* 手机档（窄屏）才收；768–1023 的平板档与桌面档照旧保留搜索
     （报障人 2026-09-25 拍板：「手机端不要了，平板电脑端照旧」）。 */
  @media (max-width: 767px) {
    [aria-modal="true"][data-shortcut-modal="shortcuts"] [class*="_searchRow"] {
      display: none !important;
    }
  }
  /* 这一层的遮罩也在每次挂载时跑宿主的 _modalEnter（0.2s 透明度淡入）：全屏亮度在
     0.24 档上渐变一次，肉眼看就是「全屏闪」。上一版只掐了卡片自己的动画、**故意保留**
     了遮罩的淡入；报障人 2026-09-25 的反馈（「全屏闪」）说明那一步同样看得见。
     这里连同卡片一起瞬时化：弹层与遮罩同帧出现、同帧消失，中间没有渐变。 */
  :has(> [aria-modal="true"][data-shortcut-modal="shortcuts"]) > [class*="_mask"]::after {
    animation: none !important;
    /* 手机档这个弹层只能从设置面板里打开，而设置面板自己已经压了一层 0.24 的遮罩；
       再叠一层就是全屏暗度 0.24 → 0.42 的一步 —— 报障人说的「全屏闪」。这一层不再
       重复变暗：屏幕的整体明暗在弹层开合前后完全一致，剩下的变化只有卡片本身。 */
    background: transparent !important;
  }
  /* --- 插件管理页（dsh-client-ui-plugin-manager）：整卡 / 整行可点 ---
     2026-10-07 店主：「打开如图里面的功能，需要点击那些加黑字体才行」。读宿主源码确认到两层：
     ① 宿主**已经**给标题按钮铺了整卡覆盖层（「.cardOpen:after{position:absolute;inset:0}」 配
        「.cardLink{position:relative}」，标准 stretched-link）；
     ② 但卡片 DOM 顺序是 icon → titleRow(button) → **cardDesc**，描述是个 -webkit-box 盒子，
        绘制顺序排在覆盖层**之后** ⇒ 描述整块把点击吃掉，点它什么都不发生；只有标题（按钮自身）
        与描述以外的细缝能开详情。
     所以本规则不是「再加一层」，而是**把覆盖层抬到描述之上**（z-index），并把卡片里的其它
     交互件（开关等）抬得更高，保证它们仍能单独点。
     根节点仍钉 「position: relative」：一旦宿主换代不再给 cardLink 定位，「inset:0」 的包含块会
     落到更外层 —— 覆盖层铺满整页，就成了「点哪都开第一个插件的详情」。
     2026-10-08 补：宿主的条目根有**三种**（li[data-plugin-package] 包卡片、li[data-plugin-row]
     包详情里的行、li[data-plugin-item] 官方 item 卡）。item 卡（plugins.item 槽）当初漏了 ——
     真机症状正是「有开关的包卡片能整卡点，从『终端』起的 item 卡只有加黑标题能点」。 */
  li[data-plugin-package],
  li[data-plugin-row],
  li[data-plugin-item] {
    position: relative !important;
  }
  li[data-plugin-package] button[class*="_cardOpen"]::after,
  li[data-plugin-row] button[class*="_rowOpen"]::after,
  li[data-plugin-item] button[class*="_cardOpen"]::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    /* 关键一行：压过同卡片里的描述/徽标等静态盒子（宿主那层没有 z-index）。 */
    z-index: 1;
  }
  li[data-plugin-package] :is(button:not([class*="_cardOpen"]), a, input),
  li[data-plugin-row] :is(button:not([class*="_rowOpen"]), a, input),
  li[data-plugin-item] :is(button:not([class*="_cardOpen"]), a, input) {
    position: relative;
    /* 比覆盖层高一档：开关等控件仍在覆盖层之上，可单独点。 */
    z-index: 2;
  }

  /* ---------- sidebar panel enter / exit (see effects/panel-exit.ts) ----------
     A sidebar panel REPLACES the main area. Two motions, both short and
     horizontal, matching the drawer's own rail-in (.15s, translate + fade):
       · enter — the panel slides in from the right;
       · exit  — the panel does NOT animate out; the conversation it hands the
         main area back to fades in instead.
     The asymmetry is deliberate. selectPanel(null) remounts the whole
     conversation and that commit blocks the main thread long enough to matter
     (measured on a phone: ~390 ms for a long session), so fading the panel out
     first would leave the screen blank for that whole window — panel already
     transparent, conversation not mounted yet. Keeping the panel opaque until
     the commit means the two swap on one frame.
     The enter rule is a CSS condition on purpose: :has() matches in the same
     commit that swaps the main slot, so the animation is already running at the
     element's first style resolution and there is no full-opacity frame first.
     The exit marker is set by JS before the swap for the same reason. */
  @keyframes dsh-web-mobile-panel-in {
    from { opacity: .55; transform: translateX(100%); }
  }
  /* Deliberately NOT reusing dsh-web-mobile-fade. The reason is the GHOST tail,
     not the whole exit: since 2026-10-12 the reveal side compares Animation
     objects (panel-exit.ts finishMain reads event.animationName only for the
     ghost), and the ghost cleanup still listens on animationend BY NAME
     (panel-exit.ts ghostEnd). dsh-web-mobile-fade also runs on the backdrop and
     the dialogs, which are frame descendants too — reusing it would end the
     ghost early. Comment corrected 2026-10-13 (was claiming the whole exit
     listens by name; the code had moved on). */
  @keyframes dsh-web-mobile-panel-reveal {
    from { opacity: 0; transform: translateX(-14px); }
  }
  [data-mobile-nav="frame"]:has([class*="panelRow"][aria-current="page"]) [class*="_centerCol"] > * > * {
    animation: dsh-web-mobile-panel-in .28s cubic-bezier(0, 0, .2, 1) backwards;
  }
  [data-mobile-nav="frame"][data-mobile-panel-exit]:not(:has([class*="panelRow"][aria-current="page"])) [class*="_centerCol"] > * > * {
    /* ease-out rather than the shared in-out curve: the panel vanishes and the
       conversation appears on the same frame, so the fade has to come up fast
       or the first frames read as a flash of empty background. */
    animation: dsh-web-mobile-panel-reveal .18s cubic-bezier(0, 0, .2, 1) backwards;
  }
  /* ---------- 面板进出：从侧面滑出 / 从原路滑回（2026-10-07 店主两轮报障） ----------
     ① 第一轮：「退出的时候看着跟掉帧一样，直接回到聊天界面」—— 逐帧实测（390×844，插件页）：
        点返回后的**第一帧**面板元素就已从 DOM 消失，退场动画落在 0×0 空槽上。
     ② 第二轮：「空档有点久了……像打开侧边栏一样，从侧面滑出来，然后从原路返回」——
        上一版把切换推迟 220ms 等真面板滑完，结果会话重挂那次 commit（长会话 ~390ms）
        又往后挪了 220ms，空档反而更明显。
     终态：退场不再动真面板，而是把面板 clone 成**冻结快照**（panel-exit.ts 里的
     panel-ghost），**立刻**切换，让快照在合成器上滑回右侧 —— 主线程忙着重挂会话时它照样
     不掉帧；进场整屏从右侧滑入（时长与抽屉的 .28s 对齐），会话侧从左侧 14px 滑回。
     方向：进 = 从右往左推入，退 = 原路推回右侧。 */
  [data-mobile-nav="panel-ghost"] {
    position: fixed;
    inset: 0;
    z-index: 1200;
    pointer-events: none;
    overflow: hidden;
    background: var(--dsw-alias-bg-layer-1, #fff);
    animation: dsh-web-mobile-panel-ghost-out .28s cubic-bezier(.4, 0, .2, 1) both;
  }
  [data-mobile-nav="panel-ghost"] > * {
    width: 100%;
    height: 100%;
  }
  @keyframes dsh-web-mobile-panel-ghost-out {
    to { opacity: .72; transform: translateX(100%); }
  }
  /* ---------- 长会话：消息块 content-visibility（2026-10-07 实测） ----------
     店主报「对话越长、切换/开侧边栏越卡」。真宿主取证（最长会话，中心列 ~6000 节点）：
       · 点抽屉那一拍 = 236ms longtask / 3 条（短会话 0ms），且随会话长度暴涨；
       · CPU profile：「(program)」（样式计算/布局/绘制）1216ms、宿主自己的
         「getAnimations({subtree:true})」 75ms、宿主 JS 个位数 ms、**插件 JS ≈ 8ms**
         ⇒ 代价是「大 DOM 的布局/绘制」，不是插件逻辑。
     这里让会话滚动区里的**消息块**自己跳过屏外内容的布局/绘制（窄选择器：只命中
     滚动区的直接子块，本次实测 3 个；宿主的 scrollBody 自身用 :not 排除）：
       · 运行时注入 A/B（同一会话，每臂 n=3）：点抽屉长任务 关 = 247/62/143ms
         （复测 386/206）→ 开 = **57/61/70ms**（紧致一条 ~60ms 带）；
       · 「contain-intrinsic-size: auto 320px」：auto 表示「渲染过就用记住的真实高度」，
         只有从未渲染过的块才吃 320px 兜底 ⇒ 本次实测 scrollHeight 17699 前后不变、
         置顶/置底位置正常，没有滚动跳变。 */
  [data-mobile-nav="frame"] [class*="scrollBody"] [class*="_scroll"]:not([class*="scrollBody"]) > * {
    content-visibility: auto;
    contain-intrinsic-size: auto 320px;
  }
  /* ---------- 文档预览的代码行：屏外行跳过布局/绘制（2026-10-09 实测） ----------
     报障场景：打开一份 13.4k 行文件的文档预览（DOM 23,662 节点）后整页卡死。
     真机读数（Android 16 WebView）：单帧最差 269 / 310 / 395 / 485 / 530ms，
     rAF 帧率掉到 2 / 5 / 17，长任务每秒合计最高 1031ms；加上下面这条规则后
     最长帧 33ms、帧率 88–119、长任务归零，只剩首次挂载建 React 元素的那几帧。
     代码行行高统一（约 20px），所以 contain-intrinsic-size 的估值精确，滚回很久
     以前的历史也不会跳滚动条 —— 这正是它与上面那条消息块规则（高度差异大、
     兜底给 320px）分开写的原因。
     选择器保持窄：只在移动 frame 内，且必须落在宿主文档预览模块自己的代码行
     容器里（dsh-client-ui-sidebar-documentpreview 的 TextPreview：_textDocument
     容器中的 _line 行）。同模块的 _preview 是更泛的词根，chat / conversation /
     deliverables 等别的宿主模块也有这个名字，纳入会越界改到那些面板，所以不收。
     这一条只省布局与绘制，不省 React 挂载的 JS，「切换会话」的卡顿不在它的射程内。 */
  [data-mobile-nav="frame"] [class*="_textDocument"] [class*="_line"] {
    content-visibility: auto;
    contain-intrinsic-size: auto 20px;
  }
  @media (prefers-reduced-motion: reduce) {
    [data-mobile-nav="frame"]:has([class*="panelRow"][aria-current="page"]) [class*="_centerCol"] > * > *,
    [data-mobile-nav="panel-ghost"],
    [data-mobile-nav="frame"][data-mobile-panel-exit]:not(:has([class*="panelRow"][aria-current="page"])) [class*="_centerCol"] > * > * {
      animation: none !important;
    }
  }

  /* ---------- DSHA 集成层：预设 chip 布局（宿主 @deepseek-ai/dsh-client-ui-agent-preset
     的 DSHA 补丁标记 .dsha-preset-header-anchor / [data-dsha-agent-preset]）。
     按 CSS 宽分两档，自动切换：
     ① 结构修正：图标与下拉箭头都是 position:absolute; left:0，会双双叠在
        「标准模式」文字上。这是宿主 DOM 决定的 bug，**任何手机档都要修** ——
        否则换到 768–1023 的平板/折叠屏就复现同一处叠字。
     ② 按 360px 实测钉出来的调优值（left 归零、团队 chip 在场时预设名 4 字上限）：
        只在「真·手机」档（CSS 宽 ≤ 767px，对齐上游 768px 平板档边界）生效；
        768–1023 保留上游手机 UI 的排布，不套这台手机的魔数。
     非 DSHA 宿主上没有这些标记，整块天然不命中（死规则）。 ---------- */
  [data-mobile-nav="frame"] [data-phase] header .dsha-preset-header-anchor {
    order: 1;
    width: max-content;
    flex: 0 1 auto;
    min-width: 0;
    max-width: min(40vw, 130px);
    margin-left: auto;
  }
  [data-mobile-nav="frame"] [data-phase] header .dsha-preset-header-anchor [data-dsha-agent-preset="header"] {
    display: inline-flex !important;
    align-items: center;
    gap: 4px;
    width: 100%;
    max-width: 100%;
    height: 36px !important;
    min-height: 36px !important;
    /* 左右内边距 6 → 4（2026-09-23 用户拍板）：与 6 → 4 的三级间隙一起，
       把「标准模式 / 智能体 / 文件夹」收成一组；文字本身不受影响。 */
    padding: 0 4px;
    border: 0;
    background: transparent;
    font: inherit;
    font-size: 12px;
  }
  [data-mobile-nav="frame"] [data-phase] header .dsha-preset-header-anchor [data-dsha-agent-preset="header"] > svg {
    position: static !important;
    transform: none !important;
    flex: 0 0 auto;
  }
  [data-mobile-nav="frame"] [data-phase] header .dsha-preset-header-anchor [data-dsha-agent-preset="header"] > span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /* 预设 chip 的 ⌄ 翻转（上游/DSHA 都没给这个 v 做开合指示；子代理 chip 有宿主自带的）。
     两件事必须同时成立才修得好：
     ① 上面那条 > svg 写过 transform: none !important，任何旋转都会被它压死 —— 这里用
        svg:last-of-type 提高特异性 + !important 接管，**不去删那条通用规则**（它还管着图标 svg）。
     ② 钩子各走各的：预设 chip 只有 aria-expanded 属性，子代理 chip 是宿主自己的
        .ZKlsPq_triggerOpen 类。所以这里只锚 [data-dsha-agent-preset="header"]，
        **完全不碰子代理芯片**，改这边不会把那边压掉。
     svg:last-of-type 取 chip 里最后一个 svg（下拉箭头）；只有一个 svg 时同样命中。
     时长 .12s 与子代理 chip 自带的 transition 一致，两个 v 观感统一。 */
  [data-mobile-nav="frame"] [data-phase] header .dsha-preset-header-anchor [data-dsha-agent-preset="header"] > svg:last-of-type {
    transition: transform .12s;
  }
  [data-mobile-nav="frame"] [data-phase] header .dsha-preset-header-anchor [data-dsha-agent-preset="header"][aria-expanded="true"] > svg:last-of-type {
    transform: rotate(180deg) !important;
  }
  @media (prefers-reduced-motion: reduce) {
    [data-mobile-nav="frame"] [data-phase] header .dsha-preset-header-anchor [data-dsha-agent-preset="header"] > svg:last-of-type {
      transition: none !important;
    }
  }
  /* ② 真·手机档（CSS 宽 ≤ 767px）才生效的调优值。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header .dsha-preset-header-anchor {
      /* 宿主 cubgiG_menuAnchor 带 left:-8px（原本是给弹层对位用的），
         手机上和标题窗口右缘叠 2px；这里把它拉回 0，整体右移 8px。 */
      left: 0 !important;
    }
    /* 智能体团队 Web 开启后头部多一个 Agent Team chip；预设名超过 4 个字就会
       把它挤掉（实测 6 个字时 Agent Team 被裁成「Agent Te」并压住文件按钮）。
       此时把预设名收成 4 个字 + 省略号 —— 完整名字在预设菜单里点开即达。 */
    [data-mobile-nav="frame"] [data-phase] header:has([data-team-action]) .dsha-preset-header-anchor [data-dsha-agent-preset="header"] > span {
      max-width: 4em;
    }
  }
  /* ---------- 会话行的 ⋯ 菜单在触屏常显（2026-09-22 交互契约） ----------
     宿主只在 :hover 和 menuOpen 时显示 _rowActions，而手机没有 hover。
     长按改名已于 2026-10-07 下线（真机上它依赖的事件重放到不了宿主），
     所以这个锚点是触屏到达重命名 / 分叉 / 归档 / 删除的唯一入口，必须常显。
     行内布局不动：标题是 flex:1 + min-width:0，自己让位并省略；host 的
     time / pinIndicator 保持原样。只作用于抽屉里的会话行，搜索行
     （searchResultRow）不受影响。 */
  [data-mobile-nav="frame"] [class*="sessionRow"] [class*="_rowActions"] {
    display: inline-flex !important;
  }
  /* ---------- 归档 / 置顶快捷按钮在手机档收进 ⋯ 菜单（issue #154） ----------
     宿主把两颗快捷按钮注册进「sidebar.workspaces.session.row.action」槽位
     （archive order 100 / pin order 200）；_rowActions 一常显，抽屉里每一行
     就多两颗图标、行尾发挤，而手机用户多数并不需要这两个入口。四个动作
     （归档 / 取消归档 / 置顶 / 取消置顶）在 ⋯ 菜单里都有，所以按宿主自己的
     aria-label 精确匹配隐藏它们——⋯ 锚点的 label 含会话标题（「会话“X”的
     操作」/「Session actions for X」），精确匹配不会误撞。宿主字典目前只有
     zh/en 两套（2026-10-10 核对 0.2.0-rc.2 产物），换到别的语言时本规则静默
     失效：按钮照常显示，不会隐藏错东西；第三方注册进同一槽位的快捷按钮也
     不动。 */
  [data-mobile-nav="frame"] [class*="sessionRow"] [class*="_rowActions"] :is([aria-label="归档会话"], [aria-label="取消归档"], [aria-label="置顶会话"], [aria-label="取消置顶"], [aria-label="Archive session"], [aria-label="Unarchive session"], [aria-label="Pin session"], [aria-label="Unpin session"]) {
    display: none !important;
  }

  /* ---------- 提问卡（ask-user）头部按钮热区（issue #140） ----------
     宿主 dsh-client-ui-user-questions 的 QuestionComposer 头部两颗图标按钮
     ——「收起问题卡片」与「放弃整组问题」——官方 24×24px、headerActions
     gap 4px，远低于触控下限；「放弃」紧贴「收起」（放弃 = pending.cancel()
     后 actions.clear，整组草稿不可恢复地清空，宿主无确认），单手误触即丢
     内容。手机档原地放大命中盒（::after 透明扩展，墨迹与版式零变化），
     同时拉开两颗按钮的节距：24px 按钮 + 12px gap + ±4px 扩展 = 32px 命中
     盒、命中盒之间净空 4px——扩展幅度若超过节距的一半，两颗命中盒会互相
     重叠，反而制造新的误触，这是本组数值的硬约束。
     作用域：头部动作区专用（_headerActions 后代），翻页器的 prev/next 也
     是同族 iconButton，但节距只有 6px，吃不下 ±4px 扩展，不掺和。哈希族
     Mbwy4a_ 是该包 QuestionComposer.module.css 的稳定前缀，哈希变更时整组
     规则自动失效，不误伤别家（哈希子串锚，非后缀锚，见 pitfalls「哈希子
     串」）。 */
  [class*="Mbwy4a_headerActions"] {
    gap: 12px !important;
  }
  [class*="Mbwy4a_iconButton"] {
    position: relative;
  }
  [class*="Mbwy4a_headerActions"] [class*="Mbwy4a_iconButton"]::after {
    content: '';
    position: absolute;
    inset: -4px;
  }
  /* ===== 手机档作用域补充（2026-10-13）=====
     下面四组是本批（2026-10-12/13）顶栏改动里「共用档已还原成本批之前的值、
     手机档需要另一个值」的那部分。它们与本文件里其它 @media (max-width: 767px)
     and (pointer: coarse) 嵌套块同权限 —— 同层 + 同特异性 + 书写在后，覆盖共用档。 */
  /* ① 标题簇右侧预留：共用 46px（给右端文件夹按钮）→ 手机档 34px。
     34 是 2026-10-12/13 那串「46 → 40 → 36 → 32 → 26 → 34」的终值，每一档的动机：
       46 → 40：后台任务圆点搬进标题行后偏左、与预设 chip 显得拥挤，收 6px 整簇右移；
       40 → 36：文件夹按钮盒子从 x=349 起、36px 宽，36 让整簇右缘正好贴到它的左沿
                （视觉上离图标仍余 10px 内边距），是**安全上限**，再往下会压进命中区；
       36 → 32：与「文件夹按钮右移 4px」**配对** —— 只移按钮不缩本值，两者之间会凭空
                多出 4px（用户要的是整组右移，不是拉开）；
       32 → 26：与「文件夹座位 36→30」**配对** —— 座位窄 6px 后其左沿右移 6px；
       26 → 34：用户反馈圆点离文件夹太近（0px），左下 8px 后按钮盒内还有 7px 内边距到
                图标，视觉距离约 15px。代价：整簇左移 8px，标题窗口相应窄 8px。
       2026-10-17：数值不变，只把这条预留从 padding 改记 margin —— 理由同共用档那条
       （滚动容器的裁剪线在 padding box，padding 预留挡不住溢出，chip 会被文件按钮
       压住）。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header [class*="wSkVaW_titleCluster"] {
      padding-right: 0 !important;
      margin-right: 34px !important;
    }
  }
  /* ② 标题行三个（标题 / 预设 / 后台任务）之间的间距：共用 4px → 手机档 6px
     （2026-10-12 用户要求；本条管「标题 ↔ 右侧 chip 簇」）。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_titleCluster"] {
      gap: 0 6px !important;
    }
  }
  /* ③ 标题本体：共用 100px 横滑窗 + clip（截断处是硬切，像被裁掉）→ 手机档
     可扩展 + 省略号（2026-10-12 用户规格）。第一轮收 80px 硬顶，第二轮取消硬顶改
     100%：硬顶的问题是「关掉团队 chip 后腾出的空间标题吃不到」；改成 100% 后由 flex
     决定 —— 右侧各 chip 是 flex 0 0 auto（不收缩，先拿够自己的地方），标题再吃掉
     剩下的，不够时由本条 ellipsis 收尾，既有 72px 地板（在 _crumbs 上）仍兜底。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_crumbs"] [class*="_crumbCurrent"] {
      max-width: 100% !important;
      overflow-x: hidden !important;
      text-overflow: ellipsis !important;
      /* 共用档保留本批之前的 pan-x（那时标题是横滑窗，横滑要先被浏览器认领，
         免得左缘抽屉手势抢走这一笔）；手机档改成不横滑的省略号窗口 ⇒ 横滑认领
         随之撤掉，否则手势层的判定与实际可滚动性对不上。
         写成 pan-y pinch-zoom（而不是 auto）与全库其余的 touch-action 声明同形，
         tests/ios-zoom-guard.test.ts 会逐条检查「非 pan-x 的值必须含 pinch-zoom」。 */
      touch-action: pan-y pinch-zoom !important;
    }
  }
  /* ④ 动作行内各 chip 之间：共用 4px → 手机档 6px（2026-10-12 用户要求）。 */
  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] [data-phase] header:has([class*="_headerLeading"]) [class*="_headerActions"] {
      gap: 6px !important;
    }
  }
}
`;var no=`@media (max-width: 1023px) and (pointer: coarse) {
  /* ---------- dsh-web-ui family compatibility ----------
     The linxin666 plugin suite extends the shell frame directly:
       - aionui-panel appends two trailing grid columns (explorer / preview)
         plus absolute drag handles to [data-dsh-frame]; its 5-track inline
         grid is already overridden above, but the handles and columns would
         still float over the main UI. On mobile the columns leave the grid
         as floating bottom sheets and keep their own visibility state —
         the suite's collapse chevron / preview tabs still work, so no
         feature is lost. The task-board / ssh plugins inject sidebar
         entries and center-column takeover panels; the entries need
         spacing and the kanban needs scrollable columns. */

  /* Touch devices: the drag handles are useless — the floating expand
     button is the opener. */
  .aionui-explorer-handle,
  .aionui-preview-handle {
    display: none !important;
  }

  /* Shared base: both columns leave the grid as floating panels. The
     explorer is gated shut by default (its own persisted expanded state
     must never cover the mobile UI on load); the header Files action opens
     it via the frame marker below, and the sheet's own collapse chevron
     clears it. Preview stays owned by the suite (hidden while no tab is
     open). The per-column rules below override the geometry. */
  [data-aionui-explorer-col],
  [data-aionui-preview-col] {
    position: fixed !important;
    z-index: 55 !important;
    background: var(--aion-bg-base, #ffffff) !important;
    border-left: none !important;
  }
  /* Explorer (file tree) bottom sheet: bottom edge aligned exactly with
     the composer card's bottom line — the card sits 36px above the
     viewport bottom (8px composer padding + the 28px stats strip below
     the card), so the sheet uses the same 36px bottom offset. */
  [data-aionui-explorer-col] {
    visibility: hidden !important;
    left: 8px !important;
    right: 8px !important;
    top: auto !important;
    bottom: 36px !important;
    width: auto !important;
    /* vh 行在前、dvh 行在后（pocket 补丁）：无 dvh 引擎把 dvh 声明整条丢弃，
       老设备上弹层高度全部塌回 auto。 */
    height: min(55vh, 460px) !important;
    height: min(55dvh, 460px) !important;
    max-height: calc(100vh - 44px) !important;
    max-height: calc(100dvh - 44px) !important;
    border-radius: 14px !important;
    overflow: hidden !important;
    box-shadow: 0 -4px 28px rgba(0, 0, 0, .18) !important;
    animation: dsh-web-mobile-sheet-up .24s var(--ds-ease-out, ease-in-out) !important;
  }
  /* Preview (file content) bottom sheet. Gated shut by default: the suite
     persists open preview tabs in localStorage and restores them on load,
     which would pop the sheet over the fresh UI. The client only sets the
     frame marker after the user taps a file row in the explorer; the
     suite's own collapse chevron clears it via the visibility watcher. */
  [data-aionui-preview-col] {
    visibility: hidden !important;
    position: fixed !important;
    left: 8px !important;
    right: 8px !important;
    top: auto !important;
    bottom: 40px !important;
    width: auto !important;
    /* vh 行在前、dvh 行在后（pocket 补丁），同上。 */
    height: min(50vh, 420px) !important;
    height: min(50dvh, 420px) !important;
    max-height: calc(100vh - 48px) !important;
    max-height: calc(100dvh - 48px) !important;
    border-radius: 14px !important;
    overflow: hidden !important;
    box-shadow: 0 -4px 28px rgba(0, 0, 0, .18) !important;
    z-index: 56 !important;
    animation: dsh-web-mobile-sheet-up .24s var(--ds-ease-out, ease-in-out) !important;
    /* Fullscreen toggle (issue #8): animate the geometry change instead of
       snapping. visibility is deliberately not listed, so opening/closing
       the sheet stays instant; the open/close keyframes own transform. */
    transition:
      left .24s var(--ds-ease-out, ease-in-out),
      right .24s var(--ds-ease-out, ease-in-out),
      top .24s var(--ds-ease-out, ease-in-out),
      bottom .24s var(--ds-ease-out, ease-in-out),
      width .24s var(--ds-ease-out, ease-in-out),
      height .24s var(--ds-ease-out, ease-in-out),
      border-radius .24s var(--ds-ease-out, ease-in-out),
      box-shadow .24s var(--ds-ease-out, ease-in-out),
      padding-top .24s var(--ds-ease-out, ease-in-out) !important;
  }
  /* User-opened preview sheet (frame marker, set on file-row tap). */
  [data-mobile-nav="frame"][data-aionui-preview-open] [data-aionui-preview-col] {
    visibility: visible !important;
  }
  /* The Files action opens the explorer sheet (frame marker). */
  [data-mobile-nav="frame"][data-aionui-explorer-open] [data-aionui-explorer-col] {
    visibility: visible !important;
  }
  /* While the preview sheet is up, the explorer sheet yields (two stacked
     bottom sheets would read as one broken overlay). Closing the preview
     via its collapse chevron / tab close clears the marker, and the
     explorer sheet returns. Same specificity as the explorer-open rule, so
     this must stay AFTER it. */
  [data-mobile-nav="frame"][data-aionui-preview-open] [data-aionui-explorer-col] {
    visibility: hidden !important;
  }
  /* The open drawer must never sit under a sheet: while the frame is in the
     narrow-expanded state both sheets yield (later in the file than the
     open marker rule, so it wins at equal specificity). The fullscreen
     toggle is a descendant of this column, so it is hidden with the rest of
     the column — there is no separate drawer-open rule for it. */
  [data-mobile-nav="frame"]:not([data-sidebar-collapsed]) [data-aionui-explorer-col],
  [data-mobile-nav="frame"]:not([data-sidebar-collapsed]) [data-aionui-preview-col] {
    visibility: hidden !important;
    display: none !important;
  }
  /* The suite's own expand button reads the store state we bypass on
     mobile — hide it; the header Files action is the opener. */
  .aionui-floating-expand {
    display: none !important;
  }

  /* Preview sheet fullscreen toggle (issue #8): a fixed button parked in the
     sheet's titlebar row, just left of the suite's collapse chevron (24px at
     right:8px of the sheet, and the sheet spans 8px..(100vw-8px)). The top
     calc mirrors the sheet geometry above (bottom 40px + min(50dvh, 420px));
     when the frame carries "data-mobile-preview-full" the sheet goes
     fullscreen and the button moves to the viewport corner. */
  [data-mobile-nav="preview-full-toggle"] {
    position: absolute !important;
    right: 36px !important;
    top: 8px !important;
    z-index: 57 !important;
    display: none !important;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 0;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--aion-text-secondary, var(--dsw-alias-label-secondary, inherit));
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    /* Native look: same size/radius/hover language as the suite's tab-bar
       icon buttons (the 20px panelCollapse next to it). The button lives
       INSIDE the preview column, so it rides the sheet's own open
       animation and geometry transition — no curve matching needed. */
    transition: background-color .15s, top .24s var(--ds-ease-out, ease-in-out);
  }
  @media (hover: hover) {
    [data-mobile-nav="preview-full-toggle"]:hover {
      background: var(--aion-bg-3, rgba(0, 0, 0, .22));
    }
  }
  [data-mobile-nav="preview-full-toggle"]:active {
    background: var(--aion-bg-active, rgba(0, 0, 0, .28));
  }
  [data-mobile-nav="preview-full-toggle"]:focus-visible {
    outline: 2px solid var(--dsw-alias-state-business-primary, #4f6ef7);
    outline-offset: 2px;
  }
  [data-mobile-nav="preview-full-toggle"] svg {
    width: 14px;
    height: 14px;
  }
  /* Keep the last tab (and the "+" URL-tab trigger) from sliding under the
     fullscreen toggle: reserve the right end of the preview tab row. */
  [data-aionui-preview-col] [class*="_tabScroll"] {
    padding-right: 34px !important;
  }
  /* Visible only while the preview sheet is open. Visibility itself is
     inherited from the column, so the sheet's own hide rules (collapse,
     drawer open) cover the button too. */
  [data-mobile-nav="frame"][data-aionui-preview-open] [data-aionui-preview-col] [data-mobile-nav="preview-full-toggle"] {
    display: inline-flex !important;
  }
  /* Icon swap on the frame fullscreen marker. */
  [data-mobile-nav="preview-full-toggle"] .dsh-web-mobile-full-out {
    display: none !important;
  }
  [data-mobile-nav="frame"][data-mobile-preview-full] [data-aionui-preview-col] [data-mobile-nav="preview-full-toggle"] .dsh-web-mobile-full-in {
    display: none !important;
  }
  [data-mobile-nav="frame"][data-mobile-preview-full] [data-aionui-preview-col] [data-mobile-nav="preview-full-toggle"] .dsh-web-mobile-full-out {
    display: inline !important;
  }
  /* Fullscreen preview: the sheet fills the whole viewport (notch included);
     the safe-area padding drops the titlebar row below the status bar, and
     the toggle follows the titlebar into the top corner. */
  [data-mobile-nav="frame"][data-aionui-preview-open][data-mobile-preview-full] [data-aionui-preview-col] {
    inset: 0 !important;
    left: 0 !important;
    right: 0 !important;
    top: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    /* vh 回退行在前（pocket 补丁），无 dvh 引擎丢弃 dvh 行后仍有高度。 */
    height: 100vh !important;
    height: 100dvh !important;
    max-height: none !important;
    box-sizing: border-box !important;
    padding-top: env(safe-area-inset-top, 0px) !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    z-index: 57 !important;
    animation: none !important;
  }
  /* Fullscreen: the column fills the viewport, so the button follows the
     titlebar row down below the notch. */
  [data-mobile-nav="frame"][data-mobile-preview-full] [data-aionui-preview-col] [data-mobile-nav="preview-full-toggle"] {
    top: calc(env(safe-area-inset-top, 0px) + 8px) !important;
  }
  @media (prefers-reduced-motion: reduce) {
    [data-aionui-preview-col],
    [data-mobile-nav="preview-full-toggle"] {
      transition: none !important;
      animation: none !important;
    }
  }

  /* dsh-web-ui sidebar entries (task board / ssh) sit flush against each
     other — give the injected rows breathing room. */
  button[data-dsh-taskboard-entry],
  button[data-dsh-ssh-entry] {
    margin-bottom: 8px !important;
  }

  /* Task board: five kanban columns at minmax(0,1fr) crush into ~78px phone
     strips. Give every column a usable minimum and let the row scroll. */
  [data-dsh-taskboard-board] > [class*="_columns"] {
    grid-template-columns: repeat(5, minmax(240px, 1fr)) !important;
    overflow-x: auto !important;
  }
  /* The floating button must not float over a takeover panel (task board /
     ssh own the center column while active). */
  html[data-dsh-taskboard-active] [data-mobile-nav="fab"],
  html[data-dsh-ssh-active] [data-mobile-nav="fab"],
  html[data-dsh-taskboard-active] [data-mobile-nav="backdrop"],
  html[data-dsh-ssh-active] [data-mobile-nav="backdrop"] {
    display: none !important;
  }
  /* Board header: let the search field take the slack instead of squeezing
     the action buttons. */
  [data-dsh-taskboard-board] > [class*="_boardHeader"] [class*="_search"] {
    flex: 1 1 auto !important;
    min-width: 80px !important;
  }

  /* ---------- dsh-web-ui polish: plugin market search ----------
     The market tab row (Discover / Themes / Installed + the plugin search
     box) is a no-wrap flex: at 390px the tabs plus the ~218px search box
     (~475px total) overflow the ~334px sheet and the search box runs off
     the right edge of the screen (it also forces a horizontal scrollbar on
     the sheet's options area). Let the row wrap: the tabs keep the first
     line and the search box gets its own full-width second line. */

  [aria-modal="true"] [class*="_tabs"] {
    flex-wrap: wrap !important;
    row-gap: 8px !important;
  }
  [aria-modal="true"] [class*="_searchInline"] {
    flex: 1 1 100% !important;
    width: 100% !important;
    max-width: 100% !important;
  }
  /* iOS Safari auto-zooms a focused input whose computed font-size is below
     16px. dshmarket's tab search uses the shared primitive Input at 13px;
     raise only this market-owned field on mobile so focusing it keeps the
     current viewport scale. Scoped to the market root to avoid changing
     unrelated settings/search fields; pinch zoom stays available. */
  [data-dsh-market-root] [class*="tabSearch"] input,
  [data-dsh-market-root] input[class*="tabSearch"] {
    font-size: 16px !important;
  }

  /* ---------- dshmarket polish: Tasks operations popup ----------
     Upstream .opPanel is a small dropdown pinned to the right edge of its
     ~54px trigger button; on a phone it reads as stuck to the sheet edge
     instead of centered. Promote it to a fixed, viewport-centered card:
     no ancestor between the popup and the viewport carries a transform,
     so position:fixed centers against the real viewport (a plain left:50%
     would resolve against the tiny relative trigger wrapper and land even
     further right). The upstream 86vw width cap, 70vh max-height and
     internal scroll all still apply; the close button stays inside.
     2026-09-25: re-anchored from [data-mobile-nav="frame"] [aria-modal]
     to the market's own root marker — since rc.2 the whole settings
     sheet (market included) is portaled to <body> and no longer matches a
     frame-descendant selector. */
  [data-dsh-market-root] [class*="_opPanel"] {
    position: fixed !important;
    top: 50% !important;
    bottom: auto !important;
    left: 50% !important;
    right: auto !important;
    transform: translate(-50%, -50%) !important;
    /* pocket 补丁：唯一无 z-index 的 fixed 层——不钉层级时后来居上的兄弟
       层可把它盖住。 */
    z-index: 60 !important;
  }

  /* ---------- dshmarket polish: header title row ----------
     The title row (icon + title + repo link + version + optional
     "Update market" / "Update all" buttons) is a nowrap flex whose
     natural width (~450px with both update buttons) exceeds the ~334px
     sheet. Flex then crushes the flexible items below their content
     width and every label wraps word-by-word — the "text turns
     vertical" report. Trigger is state-dependent (the buttons only
     exist while plugin updates are pending), which explains the
     sometimes-horizontal/sometimes-vertical flapping. Let the row wrap
     instead: line 1 keeps icon + title + repo + version, the update
     buttons get their own full-width-feeling second line, and the title
     itself is locked to one ellipsized line no matter what follows it.
     2026-09-25: re-anchored from [data-mobile-nav="frame"] [aria-modal]
     to the market's own root marker — since rc.2 the whole settings
     sheet (market included) is portaled to <body> and no longer matches a
     frame-descendant selector. Same day, second pass: the ported rule's
     flex:1 1 auto on the title GREW it to fill the row, which pushed the
     repo link and the version "v1.65.1" to the far right — exactly where
     the pinned toolbar's close ✕ sits, crowding the corner the owner
     reported as "很容易误触" (hit-test: the version box reached x≈378,
     the close ✕ starts at x=350). flex:0 1 auto keeps the title at its
     natural width (repo + version pack left, as upstream intends) while
     still letting it shrink-and-ellipsize when the update buttons force a
     wrap — the wrap rule above, not flex-grow, is what makes room for
     them. */
  [data-dsh-market-root] [class*="_titleRow"] {
    flex-wrap: wrap !important;
    row-gap: 6px !important;
  }
  [data-dsh-market-root] [class*="_titleRow"] [class*="_title"] {
    flex: 0 1 auto !important;
    min-width: 0 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  [data-dsh-market-root] [class*="_titleRow"] button {
    white-space: nowrap !important;
  }

  /* ---------- dshmarket polish: card byline stays on one line ----------
     The byline (avatar · owner · version · ↓downloads · ★stars) is a
     wrapping flex row by upstream design — the market would rather drop
     the counts to a second line than over-shrink the owner name (its
     .owner carries flex:0 1 auto + ellipsis + min-width:44px exactly for
     that). At a phone's card width the break point lands mid-row though:
     everything but the star fits, so a lone "· ★ 8k" wraps onto its own
     line under the author — inconsistent with the cards that happen to
     fit, which reads as a rendering bug (owner report 2026-09-25,
     IMG_4208: dsh-remote-web-ui and dsh-skill-explorer both orphaned the
     star). Pin the row to one line instead: the owner is the market's own
     flexible item, so it absorbs the squeeze and the counts stay whole.
     Desktop cards are far wider than the row and never wrapped anyway. */
  [data-dsh-market-root] [class*="_byline"] {
    flex-wrap: nowrap !important;
  }

  /* ---------- dshmarket polish: top inset ----------
     The sheet is pinned to the top of the screen (A': top = safe-area +
     12px) and the market page started FLUSH against the sheet's top
     edge — measured 2026-09-25: the title row's gap from the sheet's top
     was 0px while the pinned close ✕ sat 10px under it, so the whole
     page read as crushed against the boundary (owner report, IMG_4211:
     "最上面快要顶到边界了... 把整体往下移一点，有点留白会更美观").
     Give the page the same 12px inset its own horizontal padding already
     has (the root box was 12px from each side, 0px from the top), so the
     title lands ~12px under the sheet's rounded corner, level with the
     close ✕. The market page is the sheet's CONTENT, so it moves; the
     pinned toolbar (close ✕) belongs to the sheet and deliberately does
     NOT move ("关闭按钮可以不动"). Scrolls away naturally with the page.
     Desktop market is vertically centered with the host's own clearance
     and never had this read; the rule is mobile-only. */
  [data-dsh-market-root] {
    margin-top: 12px !important;
  }
  /* Below ~360px the fixed-width counts plus the owner's 44px min overrun
     the card, so the ellipsis eats most of the name ("omds..."). Trade text
     size for name length on the smallest phones: 11px → 10px text and
     6px → 4px gaps buy the owner roughly a third more room while the row
     stays one line. Tablet/phone tiers above this width are unaffected. */
  @media (max-width: 360px) {
    [data-dsh-market-root] [class*="_byline"] {
      gap: 4px !important;
      font-size: 10px !important;
    }
    [data-dsh-market-root] [class*="_byline"] [class*="_dot"] {
      margin-left: 3px !important;
    }
  }

  /* ---------- dshmarket 1.20+ compat: keep the settings nav visible ----------
     Upstream Market.module.css hides the host dialog's nav on phones
     ([role=dialog]:has([data-dsh-market-root]) > nav { display:none } at
     max-width:560px) so the market can take over the dialog; its comment
     assumes the host keeps "its own close button in the content header".
     Our host's only close ✕ lives inside that very nav, so the market
     would leave no categories and no way back or out (dead-end UI,
     2026-08-23). Mirror upstream's exact media condition and restore the
     nav: categories row + ✕ stay above the inline market page.
     2026-09-25 (rc.2 regression): 0.1.7-rc.2 renders this sheet through
     createPortal(..., document.body), so the frame-scoped selector matches
     nothing on rc.2+ hosts and the market takeover silently won — no
     categories row above the market page on every updated phone. The twin
     rule below carries the same declaration on a structural anchor
     ([role=dialog]:has(...) > nav, no frame prefix): on rc.1 hosts the
     frame-scoped rule does the work and the twin is inert (the sheet is a
     frame descendant there); on rc.2+ the twin carries it. Both stay
     inside this file's mobile media wrapper, so desktop never sees them.
     Premise note: this host generation keeps its close ✕ in the CONTENT
     header (pinned top-right — see layout.css), so the dead-end half of
     the 2026-08-23 report no longer applies; the rule is kept and twinned
     for the categories row it restores (guarded by the test suite). */
  @media (max-width: 560px) {
    [data-mobile-nav="frame"] [role="dialog"]:has([data-dsh-market-root]) > nav {
      display: flex !important;
    }
    [role="dialog"]:has([data-dsh-market-root]) > nav {
      display: flex !important;
    }
  }

  /* ---------- dsh-usage-stats polish: usage & balance panel ----------
     The panel's stats row shows three token counters side by side
     (today / month / total). The counters use tabular nowrap figures whose
     min-content width overflows the ~336px panel body on a phone: figures
     clip at the row's edges and the panel grows a horizontal scrollbar.
     Stack the three counters vertically — full-width rows, so the figures
     always fit. */

  [class*="usg_"][class*="_statsRow"] {
    flex-direction: column !important;
  }
  [class*="usg_"][class*="_stat"]:not([class*="_statsRow"]) {
    flex: 0 0 auto !important;
    width: 100% !important;
    min-width: 0 !important;
  }

  /* ---------- dsh-web-ui polish: settings sheet ----------
     Keep the nav tabs on ONE horizontally scrolling row. Setting rows need
     no mobile rework: the host redesigned them into compact space-between
     rows (text left, control right — verified in
     dsh-client-ui-settings-general .Pt1bsG_row, 2026-09-24). The old
     "stack each row" rules, written for the previous two-column generation
     with its dead label/control gap, now fight that design and double every
     row's height; they were removed (see the tombstone below). */

  /* Nav tabs + toolbar: TOMBSTONE (2026-09-25). This whole family —
     the single-row scroller, its hairline scrollbar, the compact cells and
     the hidden "Open configuration file" button — was scoped to
     [data-mobile-nav="frame"] because rc.1 rendered the settings sheet in
     place, inside the app frame. rc.2 wraps the sheet in
     createPortal(..., document.body): the overlay is a direct body child,
     nothing inside it matches a frame-descendant selector, and every rule
     here went dead at once. The live symptoms were the nav cells wrapping
     into uneven rows that slid under the 138px toolbar and the config-file
     button reappearing in that toolbar (owner report 2026-09-25). The
     portal-aware replacements live in layout.css.ts, in the "Settings
     dialog on mobile" section, anchored on the same structural
     :has(> :first-child > :last-child > button) gate (settings sheet only;
     export dialog and directory picker stay excluded). Nothing to restore
     here — do not re-add behind a frame selector. */
  /* Setting rows: no mobile rework — the host renders compact space-between
     rows natively (.Pt1bsG_row: text left, control right, 16px vertical
     padding, .5px divider). The previous "stack each row" rule family
     (column + gap:8 + control width:100% + the 36×20 switch cap that undid
     it) was written for the old two-column generation; on the redesigned
     host it doubled every row's height — the "settings feel vertically
     empty" report 2026-09-24 — and was removed in full. If an older host
     generation ever needs stacking again, reintroduce behind a generation
     guard, not as a blanket [class*="_row"] override. */
  /* Models provider editor: a CLOSED <details> ("_customized", the customized
     models section) must not paint its body. This engine paints the ~1500px
     model catalog of the closed details as a ghost layer anyway: it overlays
     the editor's own action rows (Fetch/Cancel/Apply/Add model) and the
     provider rows BEFORE the editor row in DOM order (those paint under the
     ghost and lose hit-testing), while rows after it paint above. Result
     (owner report 2026-09-19): providers cannot be deleted, "fetch available
     models" does nothing — every tap lands on whatever row overlaps the
     ghost. The host layout is computed for the collapsed details (editor
     217px, rows 903px), so the fix is to restore what the browser should do
     on its own: hide the body while the details is closed. Tapping the
     summary then opens it for real (details 33 → 1532px, rows re-flow,
     every button hittable — verified in place before this rule was written). */
  [aria-modal="true"] details[class*="_customized"]:not([open]) > [class*="_customizedBody"] {
    display: none !important;
  }
  /* Owner dialog footers (_w1urq family: the provider delete confirm, the
     workspace rename dialog, ...): the footer buttons keep white-space
     normal, so any width squeeze — a narrow viewport, a long provider name,
     Android font scaling (owner report 2026-09-19, verified at 320px with a
     1.3x font bump) — wraps the label inside the fixed 36px row where the
     second line clips. Keep each label on one line and let the footer wrap
     whole buttons to a second row instead. */
  [role="dialog"][aria-modal="true"] [class*="_footer"] {
    flex-wrap: wrap !important;
  }
  [role="dialog"][aria-modal="true"] [class*="_footer"] button[class*="_button"] {
    white-space: nowrap !important;
  }
  /* Appearance mode group: give the cube row a consistent bordered
     segmented look (the official borders differ per state). */
  [aria-modal="true"] [class*="_cubeRow"] > * {
    border: 1px solid var(--dsw-alias-border-l1, rgba(0, 0, 0, .12)) !important;
  }

  /* ---------- dsh-web-ui polish: explorer sheet ----------
     The aionui explorer was designed for a desktop side column: compact the
     header, search box and tree rows so a phone shows more entries, and pad
     the scroll bottom so the last row never sits flush on the edge. */

  [data-aionui-explorer-col] [class*="_tabBar"]:not([class*="_tabBarRight"]) {
    height: 36px !important;
  }
  [data-aionui-explorer-col] [class*="_tabBtn"],
  [data-aionui-explorer-col] [class*="_tabBtnActive"] {
    padding: 0 12px !important;
    font-size: 13px !important;
  }
  [data-aionui-explorer-col] [class*="_searchBox"] {
    height: 32px !important;
    font-size: 13px !important;
  }
  [data-aionui-explorer-col] [class*="_treeRow"] {
    height: 30px !important;
    font-size: 13px !important;
  }
  [data-aionui-explorer-col] [class*="_treeRow"] svg {
    width: 14px !important;
    height: 14px !important;
  }
  [data-aionui-explorer-col] [class*="_scrollArea"] {
    padding-bottom: 28px !important;
  }

  /* ---------- dsh-web-ui polish: drawer footer ----------
     The official footerActions row also hosts the remote-web-ui entry row
     (two icon buttons) and the usage/balance badge; without wrapping the
     groups squeeze each other on one line. Wrap so each group gets its own
     row. (The plugin's own footer pill was removed on 2026-10-18 — the
     session-log entry now lives in the drawer brand row.) */
  [data-mobile-nav="frame"] [class*="_footerActions"] {
    flex-wrap: wrap !important;
    gap: 6px !important;
  }

  /* ---------- dsh-web-ui polish: floating pet ----------
     The whale-girl pet (dsh-pet) floats at the viewport corner with a
     persisted, draggable position. On phones the pet is scaled down so
     it does not dominate the screen; the plugin's own drag + persist
     still work (the position itself is left alone — the mobile default
     position is seeded via the pet API to just above the composer). */

  body > [class*="_float"]:has([class*="_sprite"][role="button"]) {
    transform: scale(.66);
    transform-origin: bottom right;
  }
  /* While a modal dialog (settings sheet / export) owns the screen the pet
     floats ABOVE it and covers the dialog content; modal semantics say the
     background is inert, so hide the pet for the modal's lifetime. */
  body:has([aria-modal="true"]) > [class*="_float"]:has([class*="_sprite"][role="button"]) {
    display: none !important;
  }

  /* ---------- dsh-web-ui polish: conversation stats line ----------
     The official session-status row (turns / steps / LLM time / TTFT /
     cache) is long. The client marks the exact row with
     body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"] (text-anchored, hashed classes can't be
     targeted). Layout: ONE fixed-height (28px) flex strip that scrolls
     horizontally — the full metrics stream stays reachable by swiping,
     the row never grows vertically, no ellipsis or fade, 12px gaps
     between metric groups, a 2px scrollbar as the swipe affordance.

     2026-09-23 改档（店主："把那个滑动的压缩一下，固定住，不再滑动"）：
     真机探针实测 可见宽 251px、内容 390px（"10 轮 268 步·244 tok/s" 178 +
     "57.5M tok·缓存命中 99%" 187，gap 12、font 12），右边 ~75px 被 dock 里的
     上下文百分比那块占着 ⇒ 一行本来就放不下。按店主选择：**保持一行 + 末尾
     省略号**。做法：字号 12→10（≈0.83×）、组间距 12→6、去掉为滚动条留的
     4px 下内边距；overflow 改 hidden（不可滑）、滚动条显式干掉；第一组
     flex:0 0 auto 保持完整，最后一组 flex:0 1 auto + min-width:0 自己吃掉
     差额并在末尾出省略号（实测截到"…缓存命…"，tok 数字仍完整可读）。
     高度仍是 28px：composer 的底部占位（8px + 28px）不变，其它几何不跟着动。

      2026-10-06 加档（店主："输入框下面的轮次这一条和输入框底部的距离缩减一下，
      但不能挨得太近，还是要留出一点空间"）。**实测（真机同源 headless，工厂版）**：
      卡片 rect.bottom=808、轮次条 rect.top=812 → flex 间隙只有 4px，视觉间距
      ≈ 4px + 28px 行高里文字上方的约 5px ≈ 9px。所以只上提 2px（margin-top:-2px）
      → 视觉间距约 7px，仍留余量；早前的 -4px 会把间隙压到 0（就是"挨得太近"），
      已按实测改回。不改 28px 行高、不动 composer 底部占位（8px + 28px 几何契约）。 */

  body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"] {
    margin-top: -2px !important;
    display: flex !important;
    flex-flow: row nowrap !important;
    align-items: center !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    height: 28px !important;
    min-height: 28px !important;
    max-height: 28px !important;
    box-sizing: border-box !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    overscroll-behavior-x: none;
    scrollbar-width: none !important;
    padding: 0 !important;
    line-height: 18px !important;
    font-size: 10px !important;
  }
  body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"]::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"] > * {
    display: flex !important;
    flex-flow: row nowrap !important;
    align-items: center !important;
    white-space: nowrap !important;
    margin-right: 6px !important;
    padding: 0 !important;
  }
  /* 第一组（轮次·步数·tok/s）保持完整。 */
  body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"] > *:first-child {
    flex: 0 0 auto !important;
    width: max-content !important;
    min-width: max-content !important;
    max-width: none !important;
  }
  /* 最后一组（tok 总量·缓存命中）吃掉剩余宽度，末尾省略号。
     2026-09-23 第二版修正：第一版把整组改成 display:block + 子元素 inline，
     结果药丸里的图标变成 inline、基线对齐错位（店主："图标都出现位移"）。
     这版保持 flex 对齐，只让药丸**内部的文字 span** 收缩 + 出省略号；
     图标 svg 固定不缩。另外把两组药丸的左右内边距压到 6px、组间距压到 4px，
     抠出来的宽度全部让给第二组（实测它原本只分到 76px 而需要 156px）。 */
  body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"] > *:last-child {
    display: flex !important;
    align-items: center !important;
    flex: 0 1 auto !important;
    width: auto !important;
    min-width: 0 !important;
    max-width: none !important;
    overflow: hidden !important;
    margin-right: 0 !important;
  }
  body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"] > *:last-child > * {
    display: flex !important;
    align-items: center !important;
    min-width: 0 !important;
    max-width: 100% !important;
    overflow: hidden !important;
  }
  body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"] > *:last-child svg {
    flex: 0 0 auto !important;
  }
  body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"] > *:last-child span {
    flex: 0 1 auto !important;
    min-width: 0 !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"] button {
    padding: 0 3px !important;
    margin: 0 !important;
    min-width: 0 !important;
    max-width: 100% !important;
  }
  /* 药丸内部的 span/svg 有自己的字号（宿主 .pill 自带），只在外层设 10px 不会被
     继承进去 —— 真机上第二组仍差 ~20px 被省略号切掉，所以这里显式压到内部。 */
  body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"] button,
  body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"] button span,
  body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"] button svg,
  body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"] > * {
    font-size: 10px !important;
    line-height: 18px !important;
  }
  body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"] > *:not(:last-child) {
    margin-right: 3px !important;
  }
  body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"] * {
    white-space: nowrap !important;
  }
  /* 「上下文环」显示在输入框行的右簇（店主 2026-09-23 确认：
     环要、百分比数字不要）。font-size:0 只塌掉文本、环 svg 有显式尺寸不受
     影响；绝对定位盖在自建占位上（见下方 #104 注释），不再搬动节点。 */
  [data-mobile-nav="stats-ring"] {
    position: absolute !important;
    flex: 0 0 auto !important;
    display: inline-flex !important;
    align-items: center !important;
    min-width: 0 !important;
    margin: 0 2px 0 0 !important;
    padding: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
    border: 0 !important;
  }
  /* 文本要连**药丸内部**一起塌掉：药丸自带字号，只在外层设 0 不继承进去，
     真机上会留下半个 "46"。整棵子树 font-size:0，环 svg 用显式 px 不受影响。 */
  [data-mobile-nav="stats-ring"],
  [data-mobile-nav="stats-ring"] * {
    font-size: 0 !important;
  }
  [data-mobile-nav="stats-ring"] button {
    padding: 0 !important;
    margin: 0 !important;
    gap: 0 !important;
    min-width: 0 !important;
    width: auto !important;
    /* 宿主给药丸画的灰底/描边在输入框行里显得比环大一倍（店主："圆圈占了很多空间"），
       全去掉，只留环本身。 */
    background: transparent !important;
    box-shadow: none !important;
    border: 0 !important;
  }
  [data-mobile-nav="stats-ring"] svg {
    display: inline-block !important;
    /* 2026-09-29 验收定稿（issue #140）：16px 难瞄准、24px 过大、20px 仍偏大，
       店主拍板 18px；与 26×26 命中盒（见 layout.css.ts 的环规则）匹配。
       增宽由尾道左侧富余吸收，按键间距不变。 */
    width: 18px !important;
    height: 18px !important;
    flex: 0 0 auto !important;
  }
  /* 轨道深化（2026-09-29 验收，issue #140）：宿主轨道只有 12% 黑，环放大到
     24px 后深灰进度弧显得像残缺的加载圈（店主「什么玩意儿」）。加深到 25%
     让 donut 成完整圆环——是「用量表」不是「spinner」。子串锚 class*=_track
     与仓库哈希锚惯例一致，环标记内不会跨匹配（fill 类名不同）。
     #142：25% 黑改按主题取色——color-mix 取 25% 标签色（label-primary 浅色
     =近黑、暗色=近白），浅色维持 #140 验收观感，暗色自动翻成 25% 白（裸
     rgba(0,0,0,.25) 在暗色下不可见，环又退回残缺加载圈）；token 缺失时 var
     兜底 #000 与原值等价。border 族没有 25% 等价档，纯 var 兜底会让浅色回
     归宿主 12%，故用 color-mix；宿主 CSS 已用同款 color-mix+var 组合。 */
  [data-mobile-nav="stats-ring"] [class*="_track"] {
    stroke: color-mix(in srgb, var(--dsw-alias-label-primary, #000) 25%, transparent) !important;
  }
  /* 环与 TPS 读数不再搬动宿主 React 节点（#104：搬动后宿主卸载调 removeChild
     对不上父节点直接抛 NotFoundError，SlotErrorBoundary 把整个 composer 槽位
     清空）。节点留在 React 渲染的原位，可见槽位由插件自建占位顶住，宿主节点
     绝对定位盖在占位上；占位是插件节点，宿主重建/卸载都不经过它。 */
  [data-mobile-nav="stats-ring-reserve"],
  [data-mobile-nav="stats-tps-reserve"] {
    visibility: hidden !important;
    pointer-events: none !important;
  }
  [data-mobile-nav="stats-ring-reserve"] {
    flex: 0 0 auto !important;
    display: inline-block !important;
    /* 18px 与定稿的环（上方 svg 规则）同尺寸：占位顶住的槽位即环的落点，
       尾道左侧富余吸收增宽，按键间距不变。 */
    width: 18px !important;
    height: 18px !important;
    margin: 0 2px 0 0 !important;
    padding: 0 !important;
  }
  [data-mobile-nav="stats-tps"] {
    display: flex !important;
    flex-flow: row nowrap !important;
    align-items: center !important;
    margin: 0 !important;
    padding: 0 !important;
    font-size: 10px !important;
    line-height: 18px !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  [data-mobile-nav="stats-tps"] * {
    white-space: nowrap !important;
  }
  [data-mobile-nav="stats-tps"] span {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    min-width: 0 !important;
  }
  /* overlay 的定位上下文：宿主自己没定位时才生效（无 !important，宿主样式随时
     可以接管；stats-line 每帧按真实 positioned ancestor 计算，不受影响）。 */
  [data-mobile-nav="stats-ring-dock"],
  [data-mobile-nav="stats-tps-row"] {
    position: relative;
  }

  /* ---------- dsh-genui panel dock ----------
     The genui panel docks above the composer (conversation.input.dock,
     id genui-panel). On a phone its business-blue outline, generous chrome
     and single-line ellipsis read as an unfinished artifact: long titles
     truncate mid-word ("…default b···") with the chevron glued to the
     ellipsis, and the pill crowds the composer. Mobile treatment: neutral
     card border matching the composer, tighter chrome so the full title
     fits, chevron with breathing room. Scoped to the mobile frame marker —
     desktop keeps genui's own styling untouched. */

  [data-mobile-nav="frame"] [data-genui-panel] {
    margin: 6px 12px 4px !important;
    border-color: var(--dsw-alias-border-l1, rgba(0, 0, 0, .12)) !important;
    border-radius: 12px !important;
  }
  [data-mobile-nav="frame"] [data-genui-panel] [class*="_panelToggle"] {
    padding: 7px 12px !important;
    gap: 8px !important;
  }
  [data-mobile-nav="frame"] [data-genui-panel] [class*="_panelBadge"] {
    padding: 0 7px !important;
    border-radius: 5px !important;
    font-size: 10.5px !important;
    line-height: 1.7 !important;
  }
  [data-mobile-nav="frame"] [data-genui-panel] [class*="_panelTitle"] {
    flex: 1 1 auto !important;
    min-width: 0 !important;
    font-size: 12.5px !important;
    line-height: 1.45 !important;
  }
  [data-mobile-nav="frame"] [data-genui-panel] [class*="_panelChevron"] {
    flex: none !important;
    margin-left: 0 !important;
    padding-left: 4px !important;
  }

  /* ---------- git-graph branch chip: CSS re-anchor, no reparent (A′) ----------
     The branch chip (conversation.input.dock) floats between the dock rows
     and the input card; on a phone it reads as a stray capsule crowding the
     composer. #105: the old fix reparented the chip INTO the composer card,
     and React's unmount removeChild then threw NotFoundError into the
     SlotErrorBoundary (same root cause as #104). A′ re-anchors instead:
     the chip stays where React rendered it (inside the dock subtree) and
     the composerStack becomes the containing block, with the anchor
     constants = the card's static offset inside the stack + the original
     (12,12) corner offset. Constants measured 2026-09-24 (CDP, 393px):
     conversation phase card offset (16,0) → top 12 / left 28; hero phase
     card offset (16,122.9) → top 134.9 / left 28 (hero override below).
     The plugin's own sheet sets all four offsets on the anchor, so
     right/bottom must be neutralized too. Desktop untouched: the frame
     marker only exists below 1024px. Chip row geometry (2026-08-16, user
     feedback): 48px padding left a 16px dead gap and made the composer read
     too tall; 40px = chip (24px) at corner +12 + ~4px to the textarea; the
     chip has since grown to 28px (git-graph chip CSS), so the row is 44px
     (2026-09-06). The 44px clearance now keys off a STACK-level :has() —
     the chip is no longer a card descendant, so a card-level :has() could
     never match; the card disambiguation keeps non-composer cards (e.g. a
     todo card sharing the stack) out of the chip row. */
  [data-mobile-nav="frame"] [class*="_composerStack"] {
    position: relative;
  }
  [data-mobile-nav="frame"] [data-gitgraph-chip-anchor] {
    position: absolute !important;
    top: 12px !important;
    left: 28px !important;
    right: auto !important;
    bottom: auto !important;
    z-index: 1 !important;
  }
  [data-mobile-nav="frame"] [data-phase="hero"] [data-gitgraph-chip-anchor] {
    top: 134.9px !important;
  }
  [data-mobile-nav="frame"] [class*="_composerStack"]:has([data-gitgraph-chip-anchor]) [class*="_card"]:has(textarea, [data-composer-input]) {
    padding-top: 44px !important;
  }

  /* ---------- dsh-meme 表情选择卡片：右缘安全距离 ----------
     The meme picker (conversation.input.overlay, id meme-picker) is
     absolutely positioned left:0 inside the composer's overlay anchor with
     width:min(360px,90vw). That 90vw resolves against the VIEWPORT, not the
     anchor, and with the picker's own padding+border the border-box
     (377px on a 390px phone) exceeds the 356px anchor — the card's right
     edge then runs past the anchor and off the right screen edge, while the
     left edge keeps the anchor's 17px safe inset. Stretch the card to the
     anchor on both sides (left/right 0, width auto, border-box) so the
     right gap mirrors the left; cap at the card's original border-box size
     (360px content + 24px padding + 2px border) so tablets keep the
     intended card width instead of stretching. Desktop is untouched: the
     frame marker only exists below 1024px. */
  [data-mobile-nav="frame"] .meme-picker {
    left: 0 !important;
    right: 0 !important;
    width: auto !important;
    box-sizing: border-box !important;
    max-width: 386px !important;
  }

  /* dsh-meme 网格缩略图：自适应铺满卡片,保留 8px 间隙。
     dsh-meme 的 .mp-grid 是 flex-wrap + 固定 76px 的 .mp-cell(行内 style 再压到 74px):
     3 列(390px 手机)时每行右侧剩 ~78px 空白,卡片没有铺满。换成响应式 grid:
     repeat(auto-fill, minmax(64px,1fr)) 让列数随可用宽度伸缩、卡片 width:100% +
     aspect-ratio:1 随轨道自适应(方形,cover 裁切不变),gap 仍是 dsh-meme 的 8px。
     行内 width/height 用 !important 覆盖;手机端约 4 列、平板端约 5 列,均满宽。 */
  [data-mobile-nav="frame"] .meme-picker .mp-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(64px, 1fr)) !important;
    scrollbar-width: thin !important;
    scrollbar-color: var(--dsw-alias-label-tertiary, rgba(0, 0, 0, .3)) transparent !important;
  }
  [data-mobile-nav="frame"] .meme-picker .mp-cell {
    width: 100% !important;
    height: auto !important;
    aspect-ratio: 1 !important;
  }
  /* dsh-meme 网格右侧滚动条：默认 WebKit 滚动条在手机上看太粗,压成 4px
     细条——保留滚动指示又不占横向空间,thumb 圆角浅色、轨道透明。 */
  [data-mobile-nav="frame"] .meme-picker .mp-grid::-webkit-scrollbar {
    width: 4px !important;
  }
  [data-mobile-nav="frame"] .meme-picker .mp-grid::-webkit-scrollbar-thumb {
    background: var(--dsw-alias-label-tertiary, rgba(0, 0, 0, .3)) !important;
    border-radius: 999px !important;
  }
  [data-mobile-nav="frame"] .meme-picker .mp-grid::-webkit-scrollbar-track {
    background: transparent !important;
  }

  /* ---------- agent preset 模式选择菜单：手机端紧凑底部弹层 ----------
     The official agent-preset menu (role=menu, portal mounted on body) uses
     position:fixed + max-height:820px + bottom:12px, so on a phone it
     stretches from the trigger down to 12px above the screen bottom —
     effectively filling the screen. Turn it into a polished bottom sheet:
     cap the height, center it horizontally (the official max-width 360px
     left-anchors at left:12px, leaving 12/18px asymmetric gaps), add a
     drag-handle affordance, breathing room, and softer top radius; the
     inner viewport keeps scrolling. Scoped to the agent-preset item class
     (cubgiG_*) so other role=menu dropdowns (model/access mode) are
     untouched. Desktop ≥1024px is outside the media query, so it keeps the
     official large dropdown. */
  /* agent-preset 菜单依赖 @deepseek-ai/dsh-client-ui-agent-preset 的 CSS Module 哈希 (cubgiG_*)，升级该包时需验证此选择器是否仍有效 */
  [role="menu"]:has([class*="cubgiG_item"]) {
    top: auto !important;
    left: 50% !important;
    right: auto !important;
    bottom: 12px !important;
    transform: translateX(-50%) !important;
    width: min(100% - 24px, 360px) !important;
    max-width: 360px !important;
    /* vh 回退行在前（pocket 补丁），无 dvh 引擎时模式选择菜单不塌回 auto。 */
    max-height: min(55vh, 440px) !important;
    max-height: min(55dvh, 440px) !important;
    padding: 30px 6px 10px !important;
    border-radius: 16px !important;
  }
  [role="menu"]:has([class*="cubgiG_item"])::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 36px;
    height: 4px;
    border-radius: 999px;
    background: var(--dsw-alias-border-l2, rgba(0, 0, 0, .22)) !important;
    pointer-events: none;
  }
  /* 菜单内部滚动条：默认 WebKit 滚动条在竖屏太粗,会占 ~15px 宽度把文字描述
     挤窄,导致描述换行/截断不自然。压成 4px 细条(与表情网格一致),文字区域
     恢复自适应宽度。 */
  [role="menu"]:has([class*="cubgiG_item"]) [class*="_viewport_"] {
    scrollbar-width: thin !important;
    scrollbar-color: var(--dsw-alias-label-tertiary, rgba(0, 0, 0, .3)) transparent !important;
  }
  [role="menu"]:has([class*="cubgiG_item"]) [class*="_viewport_"]::-webkit-scrollbar {
    width: 4px !important;
  }
  [role="menu"]:has([class*="cubgiG_item"]) [class*="_viewport_"]::-webkit-scrollbar-thumb {
    background: var(--dsw-alias-label-tertiary, rgba(0, 0, 0, .3)) !important;
    border-radius: 999px !important;
  }
  [role="menu"]:has([class*="cubgiG_item"]) [class*="_viewport_"]::-webkit-scrollbar-track {
    background: transparent !important;
  }

/* 搜索框底部间距修复 */
  [aria-modal="true"] [class*="tabSearchRow"] {
  padding: 2px 4px 16px !important;
  }


  /* ===== 已安装列表：路径单行截断 ===== */
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) > div > [class*="spec"] {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  max-width: 100% !important;
  font-size: 12px !important;
  }
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) > div > [class*="nm"] {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  max-width: 100% !important;
  }
  /* ===== 已安装列表：手机端纵向重排 ===== */
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) {
    flex-wrap: wrap !important;
    align-items: center !important;
    gap: 4px 10px !important;
  }
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) > div:first-child {
    flex: 1 1 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
  }
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) > [class*="grow"] {
    flex: 1 1 auto !important;
  }
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) > button {
    flex: 0 0 auto !important;
  }
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) > button[class*="switch"] {
    order: 3 !important;
  }
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) > button:not([class*="switch"]) {
    order: 2 !important;
  }
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) > [class*="owner"] {
    order: 1 !important;
  }
  [class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"]) > [class*="grow"] {
    order: 0 !important;
  }
  /* ===== 市场卡片图片容器：横向滚动 ===== */
  [data-mobile-nav="frame"] [class*="cardShots"] {
  display: flex !important;
  flex-wrap: nowrap !important;
  overflow-x: auto !important;
  -webkit-overflow-scrolling: touch !important;
  /* 到头继续拽不把整页拖出（pocket 补丁） */
  overscroll-behavior-x: contain !important;
  scrollbar-width: thin !important;
  min-width: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  gap: 8px !important;
  padding: 4px 0 !important;
  }
  [data-mobile-nav="frame"] [class*="cardShots"] > [class*="cardShot"] {
  flex: 0 0 min(100%, 420px) !important;
  width: min(100%, 420px) !important;
  max-width: 100% !important;
  height: auto !important;
  display: block !important;
  object-fit: contain !important;
  }
  [data-mobile-nav="frame"] [class*="cardShots"]::-webkit-scrollbar {
  height: 4px !important;
  }
  [data-mobile-nav="frame"] [class*="cardShots"]::-webkit-scrollbar-thumb {
  background: var(--ds-border-color, #ccc) !important;
  border-radius: 4px !important;
}

  /* ---------- dsh-file-viewer (conversation.view tab「文件查看器」) ----------
     The plugin ships NO responsive CSS: its min-width:0 flex panels overflow
     on a phone — the titlebar caps the path at 520px beside a 5-button action
     row, and CSV/code headers row-stick inside content scrollers. It renders
     inline into the conversation view region (stable 'dsfv-*' prefix, injected
     <style>), not a modal sheet, so the fixes here are: stop the PANEL from
     scrolling horizontally (leave horizontal scrolling inside the content
     scrollers), compress the titlebar/statusbar, enlarge touch targets, and
     scope everything under [data-file-viewer-open] so only the active
     file-viewer tab is affected. The marker is owned by the
     file-viewer-open-marker reconciler task; nothing leaks to desktop because
     this whole block lives inside the mobile media query.
     (Port of community fork fix 2ff7976.) */

  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-panel {
    min-width: 0 !important;
    max-width: 100% !important;
    overflow-x: hidden !important;
  }
  /* Titlebar: single compact row; path truncates, secondary meta hides on
     narrow, the 5-button action row wraps to two rows of tall targets. */
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-titlebar {
    gap: 4px !important;
    padding: 6px 8px !important;
    flex-wrap: nowrap !important;
    min-width: 0 !important;
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-titlebar-path {
    min-width: 0 !important;
    padding-right: 4px !important;
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-path {
    font-size: 13px !important;
    min-width: 0 !important;
    max-width: 220px !important;
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-titlebar-actions {
    flex-wrap: wrap !important;
    gap: 4px !important;
    justify-content: flex-end !important;
    margin-left: auto !important;
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-toolbar-btn {
    min-height: 34px !important;
    padding: 0 10px !important;
    font-size: 13px !important;
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-icon-btn,
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-back-btn {
    min-height: 34px !important;
    min-width: 34px !important;
  }
  @media (max-width: 480px) {
    [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-meta {
      display: none !important;
    }
  }
  /* Status bar: wrap, safe-area bottom padding, compact. */
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-statusbar {
    flex-wrap: wrap !important;
    gap: 4px 10px !important;
    padding: 4px 8px calc(4px + env(safe-area-inset-bottom, 0px)) !important;
    font-size: 12px !important;
  }
  /* Content scrollers must own horizontal scrolling; the flex columns and the
     renderer stack must not let content push the panel wide. */
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-renderer,
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-renderer-stack,
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-scroll,
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-csv-scroll,
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-code-body {
    min-width: 0 !important;
    max-width: 100% !important;
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-scroll,
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-csv-scroll {
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
  }
  /* Browser / subtoolbar rows wrap; file rows get touch-friendly height. */
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-browser-nav,
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-subtoolbar {
    flex-wrap: wrap !important;
    gap: 6px !important;
    padding: 4px 8px !important;
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-file-row {
    min-height: 44px !important;
    padding: 8px 10px !important;
  }
  [data-mobile-nav="frame"][data-file-viewer-open] .dsfv-file-list [class*="name"] {
    min-width: 0 !important;
  }
  /* Produced-file chips render in the conversation tail, outside the viewer
     tab — keep tappable but not scoped to the marker. */
  [data-mobile-nav="frame"] .dsfv-produced-chip,
  [data-mobile-nav="frame"] .dsfv-produced-folder {
    min-height: 40px !important;
    padding: 0 12px !important;
  }
  @media (prefers-reduced-motion: reduce) {
    [data-mobile-nav="frame"][data-file-viewer-open] [class*="dsfv-"] {
      transition: none !important;
      animation: none !important;
    }
  }

  /* ---------- File share (effects/file-share.ts) ----------
     Files tree rows: the plugin appends one share button after the host's
     own row button inside li[data-files-entry="file"] (host nodes are never
     moved). The li becomes a flex row only while it carries that button, the
     host button keeps the remaining width. Preview header: one icon button in
     the official document.actions slot, sized like the host tool buttons. */
  [data-files-body] li[data-files-entry="file"]:has(> [data-mobile-nav="file-share-row"]) {
    display: flex;
    align-items: center;
  }
  [data-files-body] li[data-files-entry="file"]:has(> [data-mobile-nav="file-share-row"]) > button:first-child {
    flex: 1 1 auto;
    min-width: 0;
  }
  [data-mobile-nav="file-share-row"],
  [data-mobile-nav="file-share-preview"] {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 0;
    border-radius: var(--dsw-radius-sm, 6px);
    background: transparent;
    color: var(--dsw-alias-label-tertiary, currentColor);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  [data-mobile-nav="file-share-row"] {
    width: 36px;
    height: 32px;
  }
  [data-mobile-nav="file-share-preview"] {
    width: 32px;
    height: 32px;
    color: var(--dsw-alias-label-secondary, currentColor);
  }
  [data-mobile-nav="file-share-row"] svg,
  [data-mobile-nav="file-share-preview"] svg {
    width: 16px;
    height: 16px;
  }
  [data-mobile-nav="file-share-row"]:active,
  [data-mobile-nav="file-share-preview"]:active {
    background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.16));
  }
  [data-mobile-nav="file-share-row"]:focus-visible,
  [data-mobile-nav="file-share-preview"]:focus-visible {
    outline: 2px solid var(--dsw-alias-border-focus, #4d6bfe);
    outline-offset: -2px;
  }
  [data-mobile-nav="file-share-row"][aria-busy="true"],
  [data-mobile-nav="file-share-preview"][aria-busy="true"] {
    opacity: 0.45;
    cursor: progress;
  }
  /* Fallback notice, only on hosts without the primitives Toast. */
  [data-mobile-nav="file-share-toast"] {
    position: fixed;
    left: 50%;
    bottom: calc(24px + env(safe-area-inset-bottom, 0px));
    z-index: 1500;
    max-width: min(90vw, 420px);
    padding: 8px 14px;
    border-radius: 10px;
    background: rgba(28, 28, 30, 0.92);
    color: #fff;
    font-size: 13px;
    line-height: 1.45;
    transform: translateX(-50%);
    pointer-events: none;
  }

  /* ---------- Markdown 表格：手机档（≤767px）不再被压成「一字一行」 ----------
     2026-10-06 真机报障：6 列宽表在 390px 上被 table-layout:auto 压到每列
     1~2 字宽，表头竖排成一列单字，完全不可读。宿主 chat 包（ui-chat）只给
     表格外面套了 .md-table-wide —— 用容器查询单位做「出血加宽」
     （--dsh-table-lead / --dsh-table-spare），**整包没有任何 th/td/table
     规则**（已 grep 确认，唯一命中在 settings-subagent 的 depthTable，与本页
     无关），所以列宽完全由内容最小宽度决定，没有下限也没有滚动容器。
     这里补齐手机档的两件事：给单元格一个最小宽度下限 + 让包裹层横向滚动。
     th 允许 nowrap（表头本来就短、竖排最难看），td 只设下限、长句仍可换行，
     不会把表格撑到无法阅读的宽度。
     平板（768–1023）与桌面不动 —— 店主明确「平板不用」（对齐上游 768px
     分档边界，与 layout.css.ts 的手机档写法一致）。 */
  /* @patch
     id: ofm-mobile-cost-ceiling
     for: dsh-our-free-model 2.0.0 的 ofm_ 私有类名（毛玻璃表面 + 极光层 + 装饰动画）
     why: 上游把设置页做成一张超长 backdrop-filter 大面 + 常驻全屏极光，插件侧没有手机档成本降级，本插件只能用自己的手机档样式兜
     until: 上游自己给手机档出成本降级（或拿掉极光层与 blur 表面）——届时本块整节删除
     test: tests/our-free-model-cost.test.ts
  */
  /* ---------- dsh-our-free-model: mobile cost ceiling ----------
     该插件设置页在手机上卡顿掉帧。实测数字、驱动限制与验证方法见
     docs/maintenance/pitfalls.md「第三方成本上限」——这里只记为什么这么写。

     选择器用裸的 ofm_ 前缀类名，不加任何祖先锚。设置页经 createPortal 挂到
     document.body，[data-mobile-nav="frame"] 后代选择器一个都不命中；而
     .ofm_scrim 与 .ofm_toast 也 portal 到 body，锚 .ofm_root 同样漏。前缀是
     本插件独占（宿主与全仓 0 命中），锚根买不到隔离，只赔掉 portal 出去的那几块。

     只砍装饰，且按「遮罩 vs 表面」分两组——同一个「去 blur」动作，两类需要相反
     的补法：表面按半透明设计，只摘 filter 会让页面从下面透出来，故补不透明底；
     .ofm_scrim 是蒙层，补底等于把整页涂黑，故只摘 filter。

     带状态的动画一律保留（loading 骨架、池子 busy/over 点、状态点、进度条、
     aria-busy 按钮）。.ofm_scanline 看着像装饰，实则挂在登录等待提示上，上游
     自己的 prefers-reduced-motion 块也不杀它。

     本块在顶层手机档（≤1023px + pointer: coarse），触屏平板也吃到——有意为之：
     这是成本修复不是布局修复，与屏宽无关。 */
  .ofm_aurora {
    display: none !important;
  }
  .ofm_wave,
  .ofm_bubble,
  .ofm_fish,
  .ofm_tankrays {
    animation: none !important;
  }
  .ofm_nav,
  .ofm_glass,
  .ofm_hero,
  .ofm_panel,
  .ofm_ann,
  .ofm_modal,
  .ofm_toast {
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
    background: var(--dsw-alias-bg-layer-2, #fff) !important;
  }
  .ofm_scrim {
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
  }

  @media (max-width: 767px) and (pointer: coarse) {
    [data-mobile-nav="frame"] .md-table-wide {
      overflow-x: auto !important;
      -webkit-overflow-scrolling: touch;
    }
    [data-mobile-nav="frame"] .md-table-wide > table {
      width: auto !important;
      min-width: 100% !important;
    }
    [data-mobile-nav="frame"] .md-table-wide > table th {
      white-space: nowrap !important;
    }
    [data-mobile-nav="frame"] .md-table-wide > table th,
    [data-mobile-nav="frame"] .md-table-wide > table td {
      min-width: 4.5em !important;
    }
  }

  /* @patch
     id: ofm-toast-above-drawer
     for: dsh-our-free-model 2.0.0 的 .ofm_toasts（公告 toast，portal 到 document.body）
     why: 该插件把 toast 钉在 z-index 1200 并自称浮在所有层之上，但本插件移动抽屉是 1300、遮罩 1250、宿主原生侧栏 1100 —— 打开抽屉时整条 toast 既不可见也不可点，插件侧没有可调的层级接口
     until: 上游把 toast 抬到宿主弹层之上（1400+）或宿主提供官方通知层 —— 届时本块删除
     test: tests/our-free-model-toast-layer.test.ts
  */
  /* ---------- dsh-our-free-model: announcement toast above the drawer ----------
     2026-10-17 店主报障：打开侧边栏时左下角的官方推送消息被抽屉挡住。
     实测（390×844 触屏仿真）：toast .ofm_toasts rect(18,738,354×88) z1200；
     本插件 backdrop z1250、抽屉列 z1300 ⇒ elementFromPoint(195,780) 命中抽屉
     里的 Usage/Balance 按钮、(330,780) 命中遮罩 —— 整条与点击一起没了。

     选择器用 body 直子锚：插件 toastHost() 把 .ofm_toasts 挂在 document.body
     （不存在才建），.ofm_ 前缀又是本插件独占（宿主与全仓 0 命中，见上一节），
     所以这层锚既精确又不会误伤。

     1310 的取值：高于抽屉 1300（否则被盖），低于本插件自己的弹层 1400 与
     file-share toast 1500（公告 toast 不该压过模态）。桌面档没有抽屉，问题
     只在手机档出现，规则因此留在本顶层手机媒体查询内。

     代价（店主 2026-10-17 选定 A 方案时知情）：toast 通栏 354px 比抽屉 280px
     宽，浮起后会压住抽屉底部约 88px（用户行/设置按钮区）约 10 秒（插件
     holdMs 默认 10000），期间那几颗按钮点不到 —— 这是「推送可见」与「抽屉
     底部可点」的二选一，本次选了前者。 */
  body > .ofm_toasts {
    z-index: 1310 !important;
  }
}

`;var io=`@media (max-width: 1023px) and (pointer: coarse) {
  /* ---------- hero composer on mobile ----------
     The official hero card carries a 2-line textarea plus a tall tool row,
     which reads oversized on a phone. Tighten the empty-state rhythm: keep
     the official centered hero, shrink the textarea line box, slim the card
     padding and the tool row, and close the gap under the headline. */

  [data-phase="hero"] [class*="_card"]:has(textarea, [data-composer-input]) {
    gap: 8px !important;
  }
  /* Composer stacks carrying the git branch chip must keep compat.css's 44px
     chip clearance: that rule sets padding-top: 44px on the composer card of
     any stack that contains the absolutely-positioned chip anchor (A′, #105:
     the chip stays in the dock subtree and is re-anchored to the stack, so
     the exclusion moved from the card level to this stack-level :not(:has())
     — a card-level :has() could never match anymore). Chip geometry: top
     corner +12 + 28px chip — the chip grew 24→28px, so the clearance grew
     40→44px to keep the same ~4px breathing gap (2026-09-06). This compact
     override used to stomp the clearance back to 6px with the same
     specificity (this sheet loads after compat), so on the hero empty state
     the chip painted over the input line (2026-09-06). Excluding
     chip-bearing stacks restores the clearance; the textarea collapse below
     still applies to them. */
  [data-phase="hero"] [class*="_composerStack"]:not(:has([data-gitgraph-chip-anchor])) [class*="_card"]:has(textarea, [data-composer-input]) {
    padding-top: 6px !important;
  }
  /* The official composer autosizes the textarea and writes an inline
     height (2 lines on the hero empty state) on the textarea's scroll/grow
     wrappers. :placeholder-shown lets us collapse the EMPTY state to one
     line with !important; as soon as the user types, the pseudo-class no
     longer matches and the autosizer's inline height takes over again — so
     multi-line growth keeps working. */
  [data-phase="hero"] textarea:placeholder-shown {
    height: 28px !important;
  }
  [data-phase="hero"] [class*="_card"]:has(textarea:placeholder-shown) > [class*="_scroll"],
  [data-phase="hero"] [class*="_card"]:has(textarea:placeholder-shown) [class*="_grow"] {
    height: 28px !important;
  }
  /* The one-line collapse above is deliberately NOT mirrored onto the Lexical
     generation (0.1.2+), even though it signals its empty state with the
     separate [data-composer-placeholder] node. That host pins the hero input
     itself — hero-scoped min-height: 52px, because its hero hint wraps to two
     lines — and a min-height floor beats an outer height: the 28px wrappers of
     2026-09-05 only shrank the scrollport under a 52px input, i.e. overflow-y
     auto with scrollHeight 52 against clientHeight 28 → scrollbar plus a
     clipped first input line and hint line (phone report 2026-09-14, probe
     scripts/probes/hero-composer-clip-probe.mjs). The textarea generation this
     collapse was written for has no such floor — its input is a transparent
     height:100% layer over the wrappers — so it still collapses there. */
  [data-phase="hero"] [class*="_card"]:has(textarea, [data-composer-input]) > [class*="_row"] {
    padding-top: 2px !important;
  }
  [data-phase="hero"] [class*="_headline"] {
    line-height: 1.15 !important;
    margin-bottom: 0 !important;
  }
  [data-phase="hero"] [class*="_stack"] {
    gap: 0 !important;
  }

  /* ---------- composer dock: swap git branch chip with the todo card ----------
     The git-graph branch chip (conversation.input.dock, order 100) floats
     alone at the bottom-left above the input card, with a dead zone to its
     right; the full-width todo card (order 0) sits above it. Swap them so
     the chip reads as the stack's top row and the todo card fills the row
     above the composer. The dock container itself is display:contents
     (inline style) — its children are direct flex items of the composer
     stack, so order on the children is what reorders them. Only the chip
     needs an order change: -1 puts it before the todo card (order 0) and
     before the input card (order 0, later in DOM). The todo card must KEEP
     its order 0 — raising it past the input card's order 0 would drop it
     below the composer entirely (2026-08-16 regression, fixed). The queue
     strip (order 20) keeps hugging the input card. Desktop untouched (this
     block lives inside the max-width: 1023px media query). */
  [data-slot="conversation.input.dock"] [data-gitgraph-chip-anchor] {
    order: -1 !important;
  }
  /* Mobile tap target + feedback for the branch chip (git-graph, 24px
     desktop spec). Two real-world problems: ① the chip is tiny and sits
     right above the expandable todo card — mis-taps land on the todo card;
     ② opening the popover waits for the host's /git/branches round-trip
     (~700ms on device) with zero feedback, so users tap again and toggle
     the popover closed. Enlarge the target, kill double-tap zoom delay,
     and give an instant pressed state so a tap reads as registered. */
  [data-slot="conversation.input.dock"] [data-gitgraph-chip-anchor] [data-gitgraph-chip] {
    touch-action: manipulation !important;
    min-height: 34px !important;
    padding: 0 12px !important;
    font-size: 13px !important;
  }
  [data-slot="conversation.input.dock"] [data-gitgraph-chip-anchor] [data-gitgraph-chip]:active {
    transform: scale(.96) !important;
    transition: transform .12s !important;
  }

  /* ---------- mattskills status capsule: keep its tail (skills button / fold
      chevron) inside the pill on portrait ----------
      dsh-mattpocock-skills-deck renders a capsule status bar in
      conversation.input.dock (order 40, the row above the composer card). Its
      own sheet deliberately never shrinks icons or counters ("图标与普通计数
      永不收缩"), so as soon as the capsule's content is wider than the pill the
      host wrapper's overflow:hidden cuts the right edge and the two segments
      that sit last — the skills-list button (2×2 grid) and the fold chevron
      that collapses the whole deck strip — are not painted at all.
      Measured 2026-10-10 on a 393px portrait viewport, session bound to a
      ticket with two-digit counters (可接 21 / 诊断 20): capsule content
      ≈ 415px against a ~360px pill, i.e. ~55px short — exactly those two
      segments; the same session on landscape shows both, so this is width
      pressure, not a missing feature (and not a deck version difference:
      1.7.51 / 1.8.0-rc.1 / 1.8.0-rc.2 all render both unconditionally).
      Reclaim the width from the capsule's desktop-sized spacing (6px column
      gap plus 7px padding on each of ~11 children) rather than hiding any
      segment, and keep a horizontal scroll as the fallback for the narrowest
      phones so the tail can still be swiped into view. The scrollbar stays
      hidden, so the pill still reads as one pill. Desktop untouched: this
      block lives inside the max-width: 1023px media query. */
  [data-slot="conversation.input.dock"] .dsws-capsule {
    gap: 1px 3px !important;
    padding: 3px 4px !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    scrollbar-width: none !important;
  }
  [data-slot="conversation.input.dock"] .dsws-capsule::-webkit-scrollbar {
    display: none !important;
  }
  [data-slot="conversation.input.dock"] .dsws-capsule .dsws-capsule-word {
    padding: 2px 4px !important;
    column-gap: 3px !important;
  }
  [data-slot="conversation.input.dock"] .dsws-capsule .dsws-seg {
    padding: 2px 4px !important;
    gap: 3px !important;
  }
  [data-slot="conversation.input.dock"] .dsws-capsule .dsws-split .dsws-split-part {
    padding: 2px 4px !important;
  }
  [data-slot="conversation.input.dock"] .dsws-capsule .dsws-timebtn {
    padding: 2px 4px !important;
  }
  [data-slot="conversation.input.dock"] .dsws-capsule .dsws-skillbtn,
  [data-slot="conversation.input.dock"] .dsws-capsule .dsws-fold-toggle {
    padding: 1px 2px !important;
  }

  /* ---------- ask question composer (ask_user_question): kill iOS Safari
      input-focus auto-zoom ----------
      Safari on iPhone enlarges the whole viewport when a focused <input> /
      <textarea> computes font-size < 16px, and only reverts on blur. The ask
      dialog is a modal composer takeover, so taps outside never blur the
      field and the magnification persists until the field loses focus
      (e.g. the dialog is dismissed). The ask
      composer's custom-answer <input> (.customInput) and optionless free-form
      <textarea> (.customTextarea) both ship at 14px (ui-user-questions
      QuestionComposer.module.css). Raise them to 16px on iOS only, where the
      zoom can actually happen: on Android and desktop there is nothing to
      suppress, so they keep the compact size they were designed with
      (2026-09-16, audit D-1 option A; the iOS WebKit floor below covers these
      fields too, this rule keeps the requirement stated where it applies).
      Scoped to the ask
      composer's stable [data-question-key] root (AGENTS.md: scope hashed-class
      selectors to the owning region, prefer stable data-* markers); the
      class-name suffix match follows the plugin's established harness
      CSS-module convention (verified against the live app: generated names
      end with the original local name, e.g. uV2eYG_input / bhn1Oq_searchInput). */
  html[data-mobile-nav-ios] [data-question-key] [class*="_customInput"],
  html[data-mobile-nav-ios] [data-question-key] [class*="_customTextarea"] {
    font-size: 16px !important;
  }

  /* ---------- dsh-file-viewer inputs: kill iOS Safari auto-zoom ----------
     Same rule as the ask composer above: the file viewer's search / jump-to-
     line / pdf-page fields ship at 13-14px, which Safari auto-magnifies on
     focus inside a panel that does not blur on tap-away. Raise them to 16px
     on iOS only for the same reason as the ask composer above (2026-09-16,
     audit D-1 option A). Scoped to the frame marker; the
     viewer itself is scoped by its stable dsfv prefix.
     (Port of community fork fix 2ff7976.) */
  html[data-mobile-nav-ios] [data-mobile-nav="frame"] [class*="dsfv-search-input"],
  html[data-mobile-nav-ios] [data-mobile-nav="frame"] [class*="dsfv-jump-input"],
  html[data-mobile-nav-ios] [data-mobile-nav="frame"] [class*="dsfv-page-input"] {
    font-size: 16px !important;
  }

  /* ---------- iOS WebKit: hold every text field at >=16px so Safari never
      focus-zooms the viewport (#45) ----------
      Report (iPhone 15 Pro Max): the page magnifies as soon as a field takes
      focus, sometimes also when switching sessions (the host composer mounts
      with autoFocus), and it stays magnified until the app is closed and
      reopened or rotated landscape->portrait.
      Mechanism: iOS Safari enlarges the visual viewport whenever a focused
      input / textarea computes below 16px, and it only zooms back out on
      blur — a chat shell keeps the composer focused, so the zoom has no
      moment to revert; before this fix the root touch-action also withheld
      pinch-zoom, so the user could not pull it back out either (see
      layout.css.ts). maximum-scale=1 in the viewport meta is NOT the fix:
      iOS 10+ ignores it for user pinch zoom while other engines honor it, so
      writing it would only take zoom away from Android. Raising the fields is
      the fix that stays inside the standard.
      Gated on html[data-mobile-nav-ios] (phone-chrome.ts detectIosWebKit)
      because only WebKit on iOS zooms on focus: Android and desktop keep the
      compact 13px search boxes they were designed with. The floor covers
      every text-entry field on the page, including the ones portalled
      outside the frame (settings dialogs, the market sheet, third-party
      panels) — a phone can reach all of them. Button-like and widget inputs
      are excluded (nothing to type, no keyboard), and select is left alone on
      purpose: it would break the composer's 28px access-mode control, and a
      native picker overlays the screen instead of leaving a zoomed page
      behind. The composer's mirror / backdrop layers ride along with the
      textarea: they measure the autosize height and paint the highlight, so
      all three must share one font-size or the caret drifts off the text
      (they inherit 16px from the host card today — the rule locks that in on
      hosts whose composer ships smaller).
      The contenteditable branch is the forward-looking one: dsh
      0.1.2-rc.1 replaces the composer textarea with a Lexical
      contenteditable whose card reads font-size:
      var(--dsh-content-font-size, 14px), i.e. 14px by default — squarely in
      the zoom-triggering range. Match the attribute rather than the value
      "true" (Lexical writes "true", other hosts use plaintext-only or the
      bare attribute) and exclude contenteditable="false", which Lexical puts
      on decorator nodes inside the editor. */
  html[data-mobile-nav-ios] textarea,
  html[data-mobile-nav-ios] [contenteditable]:not([contenteditable="false"]),
  html[data-mobile-nav-ios] [data-input-mirror],
  html[data-mobile-nav-ios] [data-input-backdrop],
  html[data-mobile-nav-ios] input:not([type="button"]):not([type="checkbox"]):not([type="color"]):not([type="file"]):not([type="hidden"]):not([type="image"]):not([type="radio"]):not([type="range"]):not([type="reset"]):not([type="submit"]) {
    font-size: 16px !important;
  }

  /* ---------- drawer session tree: skip off-screen rendering ----------
     The drawer mounts ~389 nodes at once (the open gesture early-commits
     the host state while the drawer is still off-screen), and during
     streaming every token commit re-lays-out tree rows that are not even
     visible. content-visibility: auto lets the engine skip layout and
     paint of the session tree while it is outside the viewport (the arm
     moment of the open gesture) and of off-screen rows when the drawer is
     open on a long conversation. contain-intrinsic-size keeps the scroll
     geometry stable while rows are skipped. Scoped to the drawer tree via
     the frame marker + first child so the explorer sheet tree (a different
     subtree) is not affected. Measured with CDP Tracing on an empty
     conversation at 1x CPU (2026-08-29): biggest script task 104 -> 66ms,
     max rAF gap 167 -> 33ms; the benefit scales with conversation length.
     Desktop untouched (this block lives inside the max-width: 1023px
     media query). */
  [data-mobile-nav="frame"] > :first-child [role="tree"] {
    content-visibility: auto;
    contain-intrinsic-size: auto 600px;
  }

  /* ---------- text selection stays inside content (B1, 2026-10-04) ----------
     Report (Android): long-press a word in an AI reply, drag the selection
     handle up over the session header, and the selection jumps to "select
     all" instead of extending through the message list. Mechanism: the
     header and the composer card are ordinary selectable boxes; the header
     sits BEFORE the scrollport in DOM order (header, then
     [data-conversation-scroll]) and the drawer earlier still (frame first
     child, parked off-screen at -110%). A selection extent whose hit point
     resolves into that chrome lands IN the chrome, so the highlighted range
     covers the header and app shell on top of the messages - on a phone it
     reads as the whole page. With the chrome unselectable the extent snaps
     to the nearest message text instead (headless drag-select 390x844
     touch-emulated, message -> header: focus node went from the header
     title span to a message <p>; message -> composer row: from the Send
     button to a message <p>; the scrollport kept auto-scrolling in both).
     Layout is untouched: this only sets user-select.
     Kept selectable: the message flow (outside every rule below) and the
     composer editing surface, which is re-enabled explicitly - auto would
     inherit none from the card, and an unselectable contenteditable cannot
     host a caret or a paste on WebKit. Dialogs and text fields portalled
     into the drawer DOM (settings sheet) are re-enabled the same way, so
     their values stay copyable. Scope: the conversation header is the
     header inside the [data-phase] root (chat content never renders one
     there), and the anchor stays the DESCENDANT form on purpose: 0.2.0-rc.2
     (live-host probe 2026-10-07) renders an unclassed wrapper <div> between
     .wSkVaW_root[data-phase] and <header class="wSkVaW_header">, so the
     child-combinator form this rule used to carry matched 0 elements - the
     title bar kept user-select:auto and a drag-select up over it still ended
     in the header title span (4391 selected chars, opening with the title /
     mode / tab labels). On the composer side only the input card
     ([data-composer-card], host marker since 0.1.2) and the plugin stats
     row - the dock above the card (todo card, approval / ask-question
     panels) is reply content and stays copyable. */
  [data-mobile-nav="frame"] > :first-child,
  [data-mobile-nav="frame"] [data-phase] header,
  [data-mobile-nav="frame"] [data-composer-card],
  body:not([data-pocket-stats="off"]) [data-mobile-nav="stats"],
  [data-mobile-nav="fab"],
  [data-mobile-nav="backdrop"] {
    -webkit-user-select: none !important;
    user-select: none !important;
  }
  [data-mobile-nav="frame"] [data-composer-input],
  [data-mobile-nav="frame"] [data-composer-card] textarea,
  [data-mobile-nav="frame"] > :first-child [role="dialog"],
  [data-mobile-nav="frame"] > :first-child input,
  [data-mobile-nav="frame"] > :first-child textarea,
  [data-mobile-nav="frame"] [data-phase] header input {
    -webkit-user-select: text !important;
    user-select: text !important;
  }
}

/* ---------- tablet / wide mobile: keep sheets from becoming full-width ----------
   Below 768px the near-full-width sheets are the right call for a phone.
   On wider but still sub-desktop viewports (foldables, tablet portrait,
   desktop-mode tall windows) the same full-bleed sheet leaves content
   clustered at the left edge with a large dead zone on the right. Cap and
   center the modal sheets and the aionui bottom sheets instead. */
@media (min-width: 768px) and (max-width: 1023px) and (pointer: coarse) {
  /* Centered, never edge-to-edge — for the modal shapes below, not for every
     modal dialog. Covered: modals that are not sheet-shaped, plus sheet-shaped
     ones with neither a navigation element nor a directory picker. A modal
     that is sheet-shaped AND carries the directory picker is left out on
     purpose — layout.css.ts holds the dedicated rule for it. The settings
     sheet has a higher-specificity full-width rule above, so repeat its
     selector here to win; the generic export/other-modal rule is covered by
     the second selector. */
  [aria-modal="true"]:has(> :first-child > :last-child > button):not(:has([role="navigation"])):not(:has([class*="ZuhsRW"])),
  [aria-modal="true"]:not(:has(> :first-child > :last-child > button)) {
    left: 0 !important;
    right: 0 !important;
    margin-left: auto !important;
    margin-right: auto !important;
    width: min(calc(100vw - 32px), 720px) !important;
    max-width: min(calc(100vw - 32px), 720px) !important;
  }

  /* The dsh-web-ui explorer / preview bottom sheets: same treatment — keep
     the mobile bottom-sheet behavior, but stop them spanning the full width. */
  [data-aionui-explorer-col],
  [data-aionui-preview-col] {
    left: 0 !important;
    right: 0 !important;
    width: min(calc(100vw - 32px), 720px) !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  /* Settings sections (e.g. Agent presets) often carry a desktop max-width
     (720px) that leaves a dead strip on the right once the sheet is capped to
     the same width; let them fill the sheet body instead. */
  [aria-modal="true"] [class*="_section"] {
    width: 100% !important;
    max-width: none !important;
  }
}

/* ---------- desktop / non-touch: the mobile controls must never appear ----------
   Exact complement of the mobile query "(max-width: 1023px) and (pointer:
   coarse)" as a comma list (NOT A or NOT B): any viewport ≥1024px, plus any
   narrow viewport whose primary pointer is a mouse (fine) or absent (none).
   The pointer terms are what keep the header Files button off narrow desktop
   windows — the slot renders the buttons at every width, so before this the
   only guard was the width term (2026-08-30 PC leak: split windows and OS
   display scaling dropped the CSS viewport below 1024px and armed the whole
   mobile shell on desktop).

   The session-delete trio (menu item + confirm/error dialog) is the ONE
   deliberate exception: its effect arms on TOUCH_QUERY (pointer: coarse at
   every width — large tablets in landscape), so it lives in the pointer-only
   block below instead of this width arm. */

@media (min-width: 1024px), (pointer: fine), (pointer: none) {
  [data-mobile-nav="toggle"],
  [data-mobile-nav="files"],
  [data-mobile-nav="file-upload"],
  [data-mobile-nav="fab"],
  [data-mobile-nav="backdrop"],
  [data-mobile-nav="session-log"],
  [data-mobile-nav="session-log-wrap"],
  [data-mobile-nav="preview-full-toggle"] {
    display: none !important;
  }
}

/* Session-delete trio: hide on mouse-driven or pointer-less windows at ANY
   width. No width term — the injection is armed on touch at every width, so
   a width arm here would hide the item on wide touch (the device class the
   injection exists for). */
@media (pointer: fine), (pointer: none) {
  [data-mobile-nav="session-delete"],
  [data-mobile-nav="delete-dialog-backdrop"],
  [data-mobile-nav="delete-dialog"] {
    display: none !important;
  }
}
`;var ro=[ao,oo,no,io].join(`
`);var ve="(max-width: 1023px) and (pointer: coarse)",so="(min-width: 1024px)",pt="(pointer: coarse)";function H(e,t,a,o=ve){e.effect(()=>{let n=window.matchMedia(o),i,r=()=>{i?.(),i=n.matches?a(n):void 0};return r(),n.addEventListener("change",r),()=>{n.removeEventListener("change",r),i?.()}},t)}function Fe(e,t){if(t!==null)try{if(t("(font: -apple-system-body) and (-webkit-touch-callout: none)"))return!0}catch{}let a=e.userAgent;return/iP(hone|ad|od)/.test(a)?!0:/Macintosh/.test(a)&&e.maxTouchPoints>1}var Xt="--mobile-nav-header-h",Ui='[data-mobile-nav="frame"] [data-phase] header',Ye=null,Ie=null;function co(e){if(typeof document>"u")return;let t=document.documentElement;t.style.getPropertyValue(Xt)!==e&&t.style.setProperty(Xt,e)}function po(){let e=D(),t=Ye;return t===null||e===null||!(t instanceof HTMLElement)?"0px":`${Math.round(Math.max(0,t.getBoundingClientRect().bottom-e.getBoundingClientRect().top))}px`}function lo(){co(po())}function $i(){let e=Ye;co(e instanceof HTMLElement&&e.offsetHeight===0?"0px":po())}function Gi(){if(typeof document>"u")return;let e=document.querySelector(Ui);if(e===Ye){e!==null&&typeof ResizeObserver>"u"&&lo();return}Ie?.disconnect(),Ye=e,e!==null&&typeof ResizeObserver<"u"&&(Ie=Ie??new ResizeObserver(()=>{lo()}),Ie.observe(e)),$i()}function ho(){return{name:"header-metrics",scopes:["*"],ensure:()=>{Gi()},dispose:()=>{Ie?.disconnect(),Ie=null,Ye=null,typeof document<"u"&&document.documentElement.style.removeProperty(Xt)}}}var Zt="characterData";function uo(e){return e.type==="attributes"?e.attributeName===null?"*":e.attributeName:e.type==="characterData"?Zt:"*"}function mo(e){let t=e.onError??((w,R,T)=>{console.error(`[dsh-web-mobile] reconciler task ${w}${T==="dispose"?" dispose":""} failed`,R)}),a=new Set,o=null,n=new Set,i=!1,r=null,d=w=>{try{w.ensure()}catch(R){t(w.name,R,"ensure")}},h=w=>{try{w.dispose()}catch(R){t(w.name,R,"dispose")}},u=()=>{if(r!==null&&(r(),r=null),o===null){n.clear(),i=!1;return}let w=n,R=i;if(n=new Set,i=!1,R)for(let T of o)d(T);else if(w.size>0)for(let T of o){let E=T.scopes;(E===void 0||E.some(v=>w.has(v)))&&d(T)}},s=()=>{r===null&&(r=e.requestFrame(()=>{r=null,u()}))};return{get size(){return a.size},register:w=>(a.add(w),o!==null&&(o.add(w),d(w)),()=>{a.delete(w),o!==null&&o.delete(w)&&h(w)}),activate:()=>{o===null&&(o=new Set(a),i=!0,u())},deactivate:()=>{if(r!==null&&(r(),r=null),n.clear(),i=!1,o!==null){let w=o;o=null;for(let R of w)h(R)}},note:w=>{for(let R of w)n.add(R);s()},flush:u}}var Z="pocketMobileNav",fo={open:"打开目录",close:"收起目录",backdrop:"点击关闭目录",backToConversation:"返回会话",sessionLog:"导出会话日志",files:"文件浏览",fileUpload:"添加文件",fileUploadImage:"上传图片",fileUploadAttachment:"上传附件",previewFullscreen:"全屏预览",previewExitFullscreen:"退出全屏",deleteSession:"删除会话",deleteConfirmTitle:"删除会话？",deleteConfirmDesc:"将删除「{title}」的完整会话记录，此操作不可恢复。",deleteConfirmYes:"删除",deleteConfirmNo:"取消",deletePending:"正在删除…",deleteErrorBusy:"该会话正在运行且无法停止，请稍后重试。",deleteErrorNotFound:"会话不存在或已被删除。",deleteErrorResolve:"无法确定要删除的会话，请重试。",deleteErrorGeneric:"删除失败：{message}"},bo={open:"Open directory",close:"Close directory",backdrop:"Click to close directory",backToConversation:"Back to conversation",sessionLog:"Session log",files:"Files",fileUpload:"Add files",fileUploadImage:"Upload image",fileUploadAttachment:"Upload attachment",previewFullscreen:"Fullscreen preview",previewExitFullscreen:"Exit fullscreen",deleteSession:"Delete session",deleteConfirmTitle:"Delete session?",deleteConfirmDesc:"The complete log of “{title}” will be permanently removed. This cannot be undone.",deleteConfirmYes:"Delete",deleteConfirmNo:"Cancel",deletePending:"Deleting…",deleteErrorBusy:"This session is running and could not be stopped. Try again later.",deleteErrorNotFound:"The session does not exist or was already deleted.",deleteErrorResolve:"Could not identify the session to delete. Please try again.",deleteErrorGeneric:"Delete failed: {message}"};function go(e){H(e,"dsh-web-mobile: aionui explorer close marker",()=>{let t=a=>{let o=a.target;o===null||!o.closest(".aionui-collapse-chevron")||D()?.removeAttribute("data-aionui-explorer-open")};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)}),H(e,"dsh-web-mobile: preview sheet open marker",()=>{let t=()=>{D()?.removeAttribute("data-aionui-preview-open"),D()?.removeAttribute("data-mobile-preview-full")},a="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",o="5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",n=null,i=!1,r=["platform","userAgent","appVersion"],d=new Map,h=()=>{if(n!==null&&(window.clearTimeout(n),n=null),!!i){i=!1;for(let l of r){let x=d.get(l)??null;x===null?delete navigator[l]:Object.defineProperty(navigator,l,x)}d.clear()}},u=()=>{if(!i){for(let l of r)d.set(l,Object.getOwnPropertyDescriptor(navigator,l)??null);Object.defineProperty(navigator,"platform",{value:"Win32",configurable:!0}),Object.defineProperty(navigator,"userAgent",{value:a,configurable:!0}),Object.defineProperty(navigator,"appVersion",{value:o,configurable:!0}),i=!0}n!==null&&window.clearTimeout(n),n=window.setTimeout(h,1e3)},s=l=>{let x=l.target;if(x===null)return;let w=x.closest('[data-aionui-explorer-col] [class*="_treeRow"]');w!==null&&w.querySelector('[class*="_treeArrow"]:not([class*="_treeArrowEmpty"])')===null&&(u(),D()?.setAttribute("data-aionui-preview-open",""))},c=l=>{let x=l.target;x!==null&&x.closest('[data-aionui-preview-col] [class*="_panelCollapse"]')!==null&&t()};return document.addEventListener("click",s,!0),document.addEventListener("click",c,!0),()=>{h(),document.removeEventListener("click",s,!0),document.removeEventListener("click",c,!0)}})}function wo(){return{name:"preview-close-sync",scopes:["style"],ensure:()=>{let e=document.querySelector("[data-aionui-preview-col]");e!==null&&e.style.visibility==="hidden"&&(D()?.removeAttribute("data-aionui-preview-open"),D()?.removeAttribute("data-mobile-preview-full"))},dispose:()=>{}}}function vo(){let e=["[data-aionui-explorer-col]","[data-aionui-preview-col]"],t=new Map,a=new Map,o=()=>typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,n=h=>{let u=a.get(h);if(u!==void 0){a.delete(h);try{u.anim.cancel()}catch{}}},i=()=>{for(let h of e){let u=a.get(h);if(u===void 0)continue;if(!u.el.isConnected){n(h);continue}let s=document.querySelector(h);s!==null&&s!==u.el&&n(h)}},r=(h,u)=>{if(n(h),o())return;let s=u.animate([{opacity:0,transform:"translateY(28px)"},{opacity:1,transform:"none"}],{duration:280,easing:"cubic-bezier(.16, 1, .3, 1)",fill:"backwards"});a.set(h,{el:u,anim:s}),s.finished.then(()=>{a.get(h)?.anim===s&&a.delete(h)}).catch(()=>{})},d=[null,null];return{name:"sheet-rise-replay",scopes:["*","style","class","data-aionui-explorer-open","data-aionui-preview-open","data-mobile-preview-full"],ensure:()=>{let h=e.map((u,s)=>{let c=d[s];return c!==null&&c.isConnected&&c.matches(u)?c:d[s]=document.querySelector(u)});if(!(a.size===0&&h[0]===null&&h[1]===null)){i();for(let u=0;u<e.length;u++){let s=e[u],c=h[u];if(c===null){n(s);continue}let l=a.get(s);l!==void 0&&l.el!==c&&n(s);let x=getComputedStyle(c).visibility==="visible",w=t.get(s)??!1;x&&!w&&r(s,c),t.set(s,x)}}},dispose:()=>{for(let h of e)n(h);a.clear(),t.clear(),d[0]=d[1]=null}}}function Xi(e){return e===null||!e.isConnected||e.closest("[data-phase]")===null?!1:e.closest('[class*="_composerStack"]')!==null}var Zi=/^TPS\s+\d/,Yi=/TPS\s+\d/,Qi=e=>{for(let[t,a]of e.entries())if(Zi.test((a.textContent??"").trim())&&!(a.children.length>0)&&a.parentElement!==null)return{index:t,mark:a.getAttribute("data-mobile-nav")!=="stats-tps"};return{index:-1,mark:!1}};function Ji(e,t,a,o){return e!==null?{el:e.el,reserve:e.reserve,live:t}:Yi.test(a())?o():null}function er(e,t,a,o){return e?t:a&&o}function xo(){let e=(p,b)=>{getComputedStyle(p).position==="static"&&p.setAttribute("data-mobile-nav",b)},t=p=>{for(let b=p.parentElement;b!==null;b=b.parentElement)if(getComputedStyle(b).position!=="static")return b;return null},a=(p,b)=>{let _=t(p);if(_===null)return null;let L=b.getBoundingClientRect(),I=_.getBoundingClientRect(),N=p.getBoundingClientRect();return{host:p,left:L.left-I.left-_.clientLeft,top:L.top-I.top-_.clientTop-(N.height-L.height)/2}},o=p=>{let b=p.host;b.style.left!==`${p.left}px`&&(b.style.left=`${p.left}px`),b.style.top!==`${p.top}px`&&(b.style.top=`${p.top}px`)},n=p=>{let b=p.closest('[class*="_composerStack"]');if(b===null)return null;let _=p.querySelector(':scope > [data-mobile-nav="stats-tps-reserve"]'),L=[...b.querySelectorAll("div")],I=Qi(L);if(I.index<0)return null;let N=L[I.index];if(N===void 0)return null;_===null&&(_=document.createElement("span"),_.setAttribute("data-mobile-nav","stats-tps-reserve"),_.setAttribute("aria-hidden","true"),p.appendChild(_));let V=N.textContent??"";_.textContent!==V&&(_.textContent=V),I.mark&&N.setAttribute("data-mobile-nav","stats-tps");let X=N.parentElement;return X===null?null:(e(X,"stats-tps-row"),{el:N,reserve:_,live:V})},i=p=>{let{el:b,reserve:_}=p,L=a(b,_);return{el:b,measured:L,width:_.getBoundingClientRect().width}},r=p=>{p.measured!==null&&o(p.measured);let b=p.el,_=`${p.width}px`;b.style.maxWidth!==_&&(b.style.maxWidth=_)},d=(p,b)=>!p.contains(b)&&/\d\s*%/.test(p.textContent??""),h=p=>{let b=p.closest('[class*="_composerStack"]');for(let _=p.parentElement;_!==null;_=_.parentElement){let L=[..._.children].find(I=>d(I,p));if(L!==void 0)return{dock:_,ring:L};if(_===b)break}return null},u=p=>{let b=h(p);if(b===null)return null;let{dock:_,ring:L}=b,I=document.querySelector('[data-composer-card] [class*="_row"] [class*="_trailing"]');if(I===null)return null;let N=I.querySelector(':scope > [data-mobile-nav="stats-ring-reserve"]'),V=I.querySelector(':scope > [class*="_primary"]');return N===null?(N=document.createElement("span"),N.setAttribute("data-mobile-nav","stats-ring-reserve"),I.insertBefore(N,V)):(V===null?I.lastElementChild!==N:N.nextElementSibling!==V)&&I.insertBefore(N,V),L.getAttribute("data-mobile-nav")!=="stats-ring"&&L.setAttribute("data-mobile-nav","stats-ring"),e(_,"stats-ring-dock"),{ring:L,reserve:N,measured:a(L,N)}},s=p=>{let b=n(p);b!==null&&r(i(b))},c=p=>{let b=u(p);b!==null&&b.measured!==null&&o(b.measured)},l=null,x=0,w="",R=p=>{if(p===null)return"none";let b=p.getBoundingClientRect();return`${Math.round(b.left)}:${Math.round(b.top)}:${Math.round(b.width)}`},T=()=>{let p=document.querySelector('[data-mobile-nav="stats"]');if(p===null)return;let b=p.getBoundingClientRect(),_=`${Math.round(b.left)}:${Math.round(b.top)}:${Math.round(b.width)}:${Math.round(b.height)}|${R(document.querySelector('[data-mobile-nav="stats-ring-reserve"]'))}`;if(_===w)return;w=_;let L=n(p),I=L===null?null:i(L),N=u(p);I!==null&&r(I),N!==null&&N.measured!==null&&o(N.measured)},E=()=>{x===0&&(x=requestAnimationFrame(()=>{x=0,T()}))},v="",g=null,y=null,C=null,P=null,k=null,M=(p,b)=>p!==null&&p.isConnected&&p.getAttribute("data-mobile-nav")===b,A=p=>{let b=h(p);return b===null?!1:b.ring===C};return{name:"stats-line",scopes:["*",Zt],ensure:()=>{l===null&&(l=E,window.addEventListener("resize",E),window.visualViewport?.addEventListener("resize",E));let p=k;if((p===null||!p.isConnected||!p.matches('[data-mobile-nav="stats"]'))&&(p=k=document.querySelector('[data-mobile-nav="stats"]')),p!==null&&Xi(p)){let _=p.getBoundingClientRect(),L=`${Math.round(_.left)}:${Math.round(_.top)}:${Math.round(_.width)}:${Math.round(_.height)}`,I=M(g,"stats-tps"),N=M(y,"stats-tps-reserve"),V=I&&N&&g!==null&&y!==null?{el:g,reserve:y,live:""}:null,X=p.closest('[class*="_composerStack"]'),j=Ji(V,g?.textContent??"",()=>X?.textContent??"",()=>n(p)),he=`${L}|${j===null?"none":j.live}|${R(P)}`,q=er(j===null,g===null&&y===null,M(g,"stats-tps"),M(y,"stats-tps-reserve"));if(he===v&&q&&M(C,"stats-ring")&&A(p)&&M(P,"stats-ring-reserve"))return;v=he;let B=j!==null&&j.el===g?n(p):j,ae=B===null?null:i(B),U=u(p);ae!==null&&r(ae),U!==null&&U.measured!==null&&o(U.measured),g=B===null?null:B.el,y=B===null?null:B.reserve,C=U===null?null:U.ring,P=U===null?null:U.reserve,v=`${L}|${j===null?"none":j.live}|${R(P)}`;return}p?.removeAttribute("data-mobile-nav");let b=document.querySelector('[class*="_composerStack"]');if(b!==null)for(let _ of['[class*="_root"]',"[data-slot]"])for(let L of b.querySelectorAll(_)){if(L.matches('[data-testid="todo-panel"]'))continue;let I=L.querySelectorAll("button");if(I.length>0&&![...I].every(V=>V.getAttribute("aria-haspopup")!==null))continue;let N=L.textContent??"";if(/(turns|steps|\bLLM\b|轮|步)/.test(N)&&L.querySelector("textarea, [data-composer-input]")===null){L.setAttribute("data-mobile-nav","stats"),s(L),c(L);return}}},dispose:()=>{x!==0&&(cancelAnimationFrame(x),x=0),w="",k=null,l!==null&&(window.removeEventListener("resize",l),window.visualViewport?.removeEventListener("resize",l),l=null);for(let p of document.querySelectorAll('[data-mobile-nav="stats-ring"], [data-mobile-nav="stats-tps"]')){let b=p;b.style.left="",b.style.top="",b.style.maxWidth=""}for(let p of["stats","stats-ring","stats-ring-dock","stats-tps","stats-tps-row"])for(let b of document.querySelectorAll(`[data-mobile-nav="${p}"]`))b.removeAttribute("data-mobile-nav");for(let p of document.querySelectorAll('[data-mobile-nav="stats-ring-reserve"], [data-mobile-nav="stats-tps-reserve"]'))p.remove()}}}function yo(e){let t=null,a=n=>{let i=D()?.hasAttribute("data-mobile-preview-full")??!1,r=e(i?"previewExitFullscreen":"previewFullscreen");n.getAttribute("aria-label")!==r&&(n.setAttribute("aria-label",r),n.title=r)},o=()=>{D()?.toggleAttribute("data-mobile-preview-full"),t!==null&&a(t)};return{name:"preview-fullscreen-toggle",scopes:["data-aionui-preview-open","data-mobile-preview-full"],ensure:()=>{let n=document.querySelector("[data-aionui-preview-col]");n!==null&&(t===null&&(t=document.createElement("button"),t.type="button",t.dataset.mobileNav="preview-full-toggle",t.innerHTML=['<svg class="dsh-web-mobile-full-in" viewBox="0 0 16 16" fill="none" aria-hidden="true">','<path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',"</svg>",'<svg class="dsh-web-mobile-full-out" viewBox="0 0 16 16" fill="none" aria-hidden="true">','<path d="M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',"</svg>"].join(""),t.addEventListener("click",o)),a(t),t.parentElement!==n&&n.appendChild(t))},dispose:()=>{t?.remove(),t=null}}}function Qt(){Yt?.()}var Yt=null,tr=200,ar='<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="18" height="18"><path d="M9.8 3.4 5.2 8l4.6 4.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',or='<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="18" height="18"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.67272 0.522841C10.8339 0.522841 11.76 0.522714 12.4963 0.602493C13.2453 0.683657 13.8789 0.854248 14.4264 1.25197C14.7504 1.48739 15.0355 1.77247 15.2709 2.0965C15.6686 2.64394 15.8392 3.27758 15.9204 4.02655C16.0002 4.7629 16 5.68895 16 6.85014V9.14986C16 10.3111 16.0002 11.2371 15.9204 11.9735C15.8392 12.7224 15.6686 13.3561 15.2709 13.9035C15.0355 14.2275 14.7504 14.5126 14.4264 14.748C13.8789 15.1458 13.2453 15.3163 12.4963 15.3975C11.76 15.4773 10.8339 15.4772 9.67272 15.4772H6.3273C5.16611 15.4772 4.24006 15.4773 3.50371 15.3975C2.75474 15.3163 2.1211 15.1458 1.57366 14.748C1.24963 14.5126 0.964549 14.2275 0.729131 13.9035C0.331407 13.3561 0.160817 12.7224 0.0796529 11.9735C-0.000126137 11.2371 1.25338e-09 10.3111 1.25338e-09 9.14986V6.85014C1.25329e-09 5.68895 -0.000126137 4.7629 0.0796529 4.02655C0.160817 3.27758 0.331407 2.64394 0.729131 2.0965C0.964549 1.77247 1.24963 1.48739 1.57366 1.25197C2.1211 0.854248 2.75474 0.683657 3.50371 0.602493C4.24006 0.522714 5.16611 0.522841 6.3273 0.522841H9.67272ZM5.54303 1.88715V14.1118C5.78636 14.1128 6.04709 14.1169 6.3273 14.1169H9.67272C10.8639 14.1169 11.7032 14.1164 12.3493 14.0465C12.9824 13.9779 13.3497 13.8494 13.6268 13.6482C13.8354 13.4966 14.0195 13.3125 14.1711 13.1039C14.3723 12.8268 14.5007 12.4595 14.5693 11.8264C14.6393 11.1803 14.6398 10.341 14.6398 9.14986V6.85014C14.6398 5.65896 14.6393 4.81967 14.5693 4.1736C14.5007 3.54048 14.3723 3.17318 14.1711 2.89609C14.0195 2.68747 13.8354 2.50337 13.6268 2.35179C13.3497 2.1506 12.9824 2.02212 12.3493 1.95353C11.7032 1.88358 10.8639 1.88307 9.67272 1.88307H6.3273C6.04709 1.88307 5.78636 1.8862 5.54303 1.88715ZM4.1828 1.91166C3.99125 1.9216 3.8148 1.93577 3.65076 1.95353C3.01764 2.02212 2.65034 2.1506 2.37325 2.35179C2.16463 2.50337 1.98052 2.68747 1.82895 2.89609C1.62776 3.17318 1.49928 3.54048 1.43069 4.1736C1.36074 4.81967 1.36023 5.65896 1.36023 6.85014V9.14986C1.36023 10.341 1.36074 11.1803 1.43069 11.8264C1.49928 12.4595 1.62776 12.8268 1.82895 13.1039C1.98052 13.3125 2.16463 13.4966 2.37325 13.6482C2.65034 13.8494 3.01764 13.9779 3.65076 14.0465C4.29683 14.1164 5.13612 14.1169 6.3273 14.1169H9.67272C10.8639 14.1169 11.7032 14.1164 12.3493 14.0465C12.9824 13.9779 13.3497 13.8494 13.6268 13.6482C13.8354 13.4966 14.0195 13.3125 14.1711 13.1039C14.3723 12.8268 14.5007 12.4595 14.5693 11.8264C14.6393 11.1803 14.6398 10.341 14.6398 9.14986V6.85014C14.6398 5.65896 14.6393 4.81967 14.5693 4.1736C14.5007 3.54048 14.3723 3.17318 14.1711 2.89609C14.0195 2.68747 13.8354 2.50337 13.6268 2.35179C13.3497 2.1506 12.9824 2.02212 12.3493 1.95353C11.7032 1.88358 10.8639 1.88307 9.67272 1.88307H6.3273C5.13612 1.88307 4.29683 1.88358 3.65076 1.95353C3.47672 1.97129 3.30027 1.98546 3.10872 1.9954L4.1828 1.91166Z" fill="currentColor"/></svg>';function ko(e,t,a){let o=null,n=null,i=null,r=!1,d=()=>{let l=D();return l===null?!1:!l.hasAttribute("data-sidebar-collapsed")},h=null,u=()=>{let l=h;return l!==null&&l.isConnected&&l.matches('[data-phase="active"]')?!1:(h=document.querySelector('[data-phase="active"]'),h===null)},s=l=>{if(a!==null&&a.panelOpen()){l.preventDefault(),l.stopPropagation(),a.exit();return}t()},c=()=>{if(n===null)return;let l=a!==null&&a.panelOpen(),x=l?"exit-panel":"open-drawer";if(n.dataset.mobileNavFabMode===x)return;n.dataset.mobileNavFabMode=x;let w=e(l?"backToConversation":"open");n.setAttribute("aria-label",w),n.title=w,n.innerHTML=l?ar:or};return{name:"overlay-backdrop-fab",scopes:["*","data-sidebar-collapsed","data-phase"],ensure:()=>{Yt=()=>{o!==null&&(r=!0,o.style.pointerEvents="none",o.style.opacity="0")};let l=D();if(l===null){i!==null&&(window.clearTimeout(i),i=null),o?.remove(),o=null,n?.remove(),n=null;return}d()?o===null?(o=document.createElement("div"),o.dataset.mobileNav="backdrop",o.setAttribute("role","button"),o.setAttribute("aria-label",e("backdrop")),l.appendChild(o),r=!1):r&&i!==null&&(window.clearTimeout(i),i=null,r=!1,o.style.removeProperty("pointer-events"),o.style.removeProperty("opacity")):o!==null&&(o.style.pointerEvents="none",o.style.opacity="0",r=!0,i===null&&(i=window.setTimeout(()=>{i=null,o?.remove(),o=null},tr+60))),u()&&!d()&&n===null?(n=document.createElement("button"),n.type="button",n.dataset.mobileNav="fab",n.setAttribute("aria-label",e("open")),n.title=e("open"),n.addEventListener("click",s),l.appendChild(n)):(!u()||d())&&n!==null&&(n.remove(),n=null),c()},dispose:()=>{i!==null&&(window.clearTimeout(i),i=null),h=null,Yt=null,o?.remove(),o=null,n?.remove(),n=null}}}function Eo(){let e=null,t=null;return{name:"file-viewer-open-marker",scopes:["*"],ensure:()=>{let a=D();if(a===null)return;let o=document.querySelector(".dsfv-panel")!==null;o===e&&a===t||(e=o,t=a,o?a.setAttribute("data-file-viewer-open",""):a.removeAttribute("data-file-viewer-open"))},dispose:()=>{e=null,t=null,D()?.removeAttribute("data-file-viewer-open")}}}function Y(e){if(typeof e!="object"||e===null)return;let t=e;if(typeof t.current=="string")return t.current;for(let a in t.byId){let o=t.byId[a];if(o===void 0)continue;let n=o.retainedBy?.mainView;if(typeof n=="number"&&n>0&&typeof o.id=="string")return o.id}}function To(e){return typeof e?.clear=="function"}function _o(e){return typeof e?.open=="function"}var nr=4,ir=350;async function So(e){let t=e.attempts??nr,a=e.intervalMs??ir;for(let o=0;o<t;o+=1){try{await e.refresh?.()}catch{}if(!e.listed())return!0;o+1<t&&await e.sleep(a)}return!e.listed()}var rr='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1.95317V10.0469" stroke="currentColor" stroke-width="1"/><path d="M4.25 6.29688L8 10.0469L11.75 6.29688" stroke="currentColor" stroke-width="1"/><path d="M1.5 10.0469V13.158C1.5 13.3937 1.60536 13.6198 1.79289 13.7865C1.98043 13.9532 2.23478 14.0469 2.5 14.0469H13.5C13.7652 14.0469 14.0196 13.9532 14.2071 13.7865C14.3946 13.6198 14.5 13.3937 14.5 13.158V10.0469" stroke="currentColor" stroke-width="1"/></svg>';function Co(e){let t=e.locale.bind(Z),a=()=>Y(e.sessions.list.getSnapshot()),o=null,n=null,i=null,r=()=>{n!==null&&(n.disabled=a()===void 0)},d=()=>{let s=a();s!==void 0&&e.sessionLogDownload.download(s)},h=()=>{let s=D();return s===null?null:s.querySelector('[class*="sidebarCol"] [class*="logoRow"]')??s.querySelector('[class*="logoRow"]')},u=(s,c)=>{c.parentElement!==s&&s.appendChild(c)};return{name:"drawer-session-log",scopes:["*"],ensure:()=>{let s=h();s!==null&&(n===null&&(o=document.createElement("span"),o.dataset.mobileNav="session-log-wrap",n=document.createElement("button"),n.type="button",n.dataset.mobileNav="session-log",n.setAttribute("aria-label",t("sessionLog")),n.title=t("sessionLog"),n.innerHTML=rr,n.addEventListener("click",d),o.appendChild(n),i=e.sessions.list.subscribe(()=>{r()})),o!==null&&u(s,o),r())},dispose:()=>{i?.(),i=null,o?.remove(),o=null,n=null}}}var He=new WeakMap,Jt=!1;function ea(){Jt=!0}function ta(){Jt=!1}function aa(){return Jt}function ht(e){return typeof e=="object"&&e!==null&&"parentElement"in e&&e.parentElement!==void 0}function Ao(e,t,a){let o=performance.now()+t;if(!ht(e)){if(typeof e!="object"&&typeof e!="function"||e===null)return;He.set(e,o);return}let n=e;for(;n!==null&&(He.set(n,o),n!==a);)n=ht(n.parentElement)?n.parentElement:null}function Qe(e){let t=performance.now(),a=e.target;if(!ht(a)){if(typeof a!="object"&&typeof a!="function"||a===null)return!1;let n=He.get(a);return n===void 0?!1:n<=t?(He.delete(a),!1):!0}let o=a;for(;o!==null;){let n=He.get(o);if(n!==void 0)if(n<=t)He.delete(o);else return!0;o=ht(o.parentElement)?o.parentElement:null}return!1}var sr=["node","session","summary","result"],lr=["sessionId","id"],dr=["__reactFiber$","__reactInternalInstance$"];function cr(e){if(typeof e!="object"||e===null)return null;let t=e.id;return typeof t=="string"?t:null}function pr(e,t){if(e==null)return null;for(let a of sr){let o=cr(e[a]);if(o!==null&&t(o))return o}for(let a of lr){let o=e[a];if(typeof o=="string"&&t(o))return o}return null}function ut(e,t,a=60){let o=e;for(let n=0;n<a&&o!==null&&o!==void 0;n+=1){let i=pr(o.memoizedProps,t);if(i!==null)return i;o=o.return}return null}function mt(e){if(e==null||typeof e!="object")return null;let t=e;for(let a of dr)for(let o of Object.keys(t)){if(!o.startsWith(a))continue;let n=t[o];if(typeof n=="object"&&n!==null)return n}return null}function oa(e,t,a){return Math.abs(t.x-e.x)<=a&&Math.abs(t.y-e.y)<=a}var hr=.45;function Lo(e,t=hr){return Math.round(e*t)}var na=8,ur=.16,Ro=.13,zo=60,mr=.45,fr=.45,ye=350,br=300,gr=8,Te=110,Mo=280,Po=101,wr=.45,vr=.16,xr=.45,le=0,_e=!1,de=[],tt=0,ra=0,Se=!1,ce=0,et=null,$=null,Ce=!1,Do=0,ke=!1,ne=!1,at=!1,Ee="drawer",sa=!1,Bo=()=>!1;function yr(e,t,a){let o=a?-t.dx:t.dx;if(Math.abs(o)<=e.lockPx||Math.abs(o)<=Math.abs(t.dy))return"none";if(e.drawerOpen){if(Math.abs(o)/e.viewportWidthPx>=e.closeDistanceRatio)return"close";let r=a?-t.velX:t.velX;return r>0!=o>0?"none":Math.abs(r)>=e.closeVelocity?"close":"none"}return o<=0?"none":o/e.viewportWidthPx>=e.openDistanceRatio||(a?-t.velX:t.velX)>=e.openVelocity?"open":"none"}function kr(e,t,a){let o=a?-t.dx:t.dx;if(Math.abs(o)<=e.lockPx||Math.abs(o)<=Math.abs(t.dy))return"none";let n=a?-t.velX:t.velX;if(o<0)return e.panelOpen||e.drawerOpen?"none":-o/e.viewportWidthPx>=e.distanceRatio?"files":n>0!=o>0?"none":-n>=e.velocity?"files":"none";if(e.drawerOpen){let i=e.drawerCloseDistanceRatio??e.distanceRatio;return o/e.viewportWidthPx>=i?"close":n<=0?"none":n>=e.velocity?"close":"none"}return e.panelOpen?o/e.viewportWidthPx>=e.distanceRatio?"files":n>0!=o>0?"none":n>=e.velocity?"files":"none":"none"}function Er(e,t,a){let o=a-t,n=e.filter(h=>h.t>=o);if(n.length<2)return 0;let i=n[n.length-2],r=n[n.length-1],d=r.t-i.t;return d<=0?0:(r.x-i.x)/d}function Tr(e,t,a,o){let n=a?t-e:e;return n>=0&&n<=o.startZonePx}function Oo(e,t,a,o){let n=a?e:t-e;return n>=0&&n<=o}function _r(e,t){return e||!t?"drawer":"files"}function Sr(e,t,a,o){let n=e<=0?-1:1,i=Math.abs(e),r=a?-t:t;return o?r>=0?null:n*Math.min(i,-r)+0:r<=0?null:n*(i-Math.min(i,r))+0}function qo(e,t){let a=t?-e:e;return a<=0?null:t?`translateX(max(0px, calc(${Po}% - ${a}px)))`:`translateX(min(0px, calc(-${Po}% + ${a}px)))`}function Cr(e){let t=e;for(;t!==null;){if((t.overflowX==="auto"||t.overflowX==="scroll")&&t.scrollWidth>t.clientWidth+1)return t;t=t.parent}return null}function Be(){let e=D();return e!==null&&e.firstElementChild instanceof HTMLElement?e.firstElementChild:null}function la(){let e=D();return e!==null&&!e.hasAttribute("data-sidebar-collapsed")}function Ar(){let e=document.querySelector("[data-sidebar-right-panel]");if(e===null)return!1;let t=getComputedStyle(e);return t.visibility==="hidden"||t.display==="none"?!1:e.getBoundingClientRect().left<window.innerWidth}function Lr(e){let t=null,a=e;for(;a!==null;)t={parent:t,scrollWidth:a.scrollWidth,clientWidth:a.clientWidth,overflowX:getComputedStyle(a).overflowX},a=a.parentElement;return t}function vt(){return document.querySelector('[aria-modal="true"]')!==null}function da(){return document.documentElement.hasAttribute("data-dsh-taskboard-active")||document.documentElement.hasAttribute("data-dsh-ssh-active")||document.querySelector("[data-conversation-composer-overlay]")!==null}function Wo(){if(typeof window>"u")return!1;let e=window.getSelection();if(e!==null&&!e.isCollapsed)return!0;if(typeof document>"u")return!1;let t=document.activeElement;if(t===null)return!1;let a=t.tagName;if(a!=="TEXTAREA"&&a!=="INPUT")return!1;try{let{selectionStart:o,selectionEnd:n}=t;return typeof o=="number"&&typeof n=="number"&&o!==n}catch{return!1}}function Vo(){return performance.now()<ce}function jo(e){return document.documentElement.hasAttribute("data-mobile-nav-dragging")||document.body.hasAttribute("data-mobile-nav-dragging")?!0:e.target instanceof Element&&e.target.closest("[data-mobile-nav-dragging]")!==null}var Fo=200;function Rr(e){if(e.closest('[data-mobile-nav="frame"]')!==null)return null;let t=e;for(;t!==null;){if(t instanceof HTMLElement){let a=getComputedStyle(t);if((a.position==="fixed"||a.position==="absolute")&&t.offsetWidth<=Fo&&t.offsetHeight<=Fo)return t}t=t.parentElement}return null}function Ko(e){return e.target instanceof Element&&Rr(e.target)!==null}function Io(){$=null,Ce=!1,ne=!1,at=!1,ke=wt();let e=Be();if(e===null||!Se)return;$=e;let t=e.getBoundingClientRect().width*Te/100;Do=ke?t:-t}var ia=!1,Ne=0;function ca(){if(!ia)return;ia=!1,$?.style.removeProperty("content-visibility");let e=Be();e!==null&&e!==$&&e.style.removeProperty("content-visibility")}function Mr(e){if(ne||at)return;let t=Be();if(t===null||vt()||da()){at=!0;return}$=t,Ce=!0,t.style.setProperty("transition","none","important");let a=qo(1e-4,ke);t.style.setProperty("transform",a??`translateX(-${Te}%)`,"important"),t.style.willChange="transform",t.style.setProperty("content-visibility","hidden","important"),ia=!0,ne=!0,e.layout.toggleSidebar(),Ne=requestAnimationFrame(()=>{Ne=requestAnimationFrame(()=>{Ne=0,ca()})})}function Ho(e,t){if(!_e||Ee!=="drawer")return;if(!Se){let o=ke?-t:t;if(!ne&&(o<gr||(Mr(e),!ne)))return;let n=qo(t,ke);if(n===null){$?.style.setProperty("transform",`translateX(-${Te}%)`,"important");return}$?.style.setProperty("transform",n,"important");return}if($===null)return;let a=Sr(Do,t,ke,Se);if(a===null){Ce=!0,$.style.setProperty("transition","none","important"),$.style.setProperty("transform","translateX(0px)","important");return}Ce=!0,$.style.setProperty("transition","none","important"),$.style.setProperty("transform",`translateX(${a}px)`,"important")}function gt(){let e=$;!Ce||e===null||(Ce=!1,e.style.removeProperty("transition"),e.style.removeProperty("transform"),e.style.removeProperty("will-change"))}var ze=null;function ft(){let e=ze;if(e===null)return;ze=null,window.clearTimeout(e.timer),e.el.style.removeProperty("transition"),e.el.style.removeProperty("transform"),e.el.style.removeProperty("will-change");let t=D();t!==null&&!t.hasAttribute("data-sidebar-collapsed")&&e.ctx.layout.toggleSidebar()}function Uo(e,t,a){let o=ze;if(!(o!==null&&o.el===t&&o.target===a)){if(ft(),window.matchMedia("(prefers-reduced-motion: reduce)").matches){Qt(),ce=performance.now()+ye,ze={el:t,ctx:e,timer:0,target:a},ft();return}t.style.setProperty("transition",`transform ${Mo}ms ease-in-out`,"important"),t.style.getPropertyValue("transform")!==""&&t.getBoundingClientRect(),t.style.setProperty("transform",a,"important"),Qt(),ce=performance.now()+ye,ze={el:t,ctx:e,timer:window.setTimeout(ft,Mo+40),target:a}}}function bt(e){let t=$;if($=null,Ce=!1,t===null){gt(),e.layout.toggleSidebar(),ce=performance.now()+ye;return}let a=ke?`translateX(${Te}%)`:`translateX(-${Te}%)`;Uo(e,t,a)}function $o(e){if(!la()||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return!1;let t=Be();if(t===null)return!1;let a=wt()?`translateX(${Te}%)`:`translateX(-${Te}%)`;return Uo(e,t,a),!0}function xe(e,t=!1){if(ze!==null){t&&ft();return}let a=ne;if(ne=!1,at=!1,ca(),a&&e!==null&&$!==null&&!t){De(),bt(e);return}gt(),De(),a&&e!==null&&(e.layout.toggleSidebar(),ce=performance.now()+ye)}function Pr(e,t,a){if(Vo()||vt()||da()||Wo()||jo(e)||Ko(e)||!(e.target instanceof Element)||Cr(Lr(e.target))!==null||e.target.closest('[class*="_composerSeat"], [data-composer-card], [class*="_dock"]')!==null)return!1;let o=la(),n=Lo(a,wr);if(o){let i=D();if(i===null)return!1;let r=i.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom||e.target.closest('[class*="sessionRow"] button')!==null)return!1;let d=Be(),h=d===null?null:d.getBoundingClientRect(),u=h!==null&&e.clientX>=h.left&&e.clientX<=h.right;Ee=_r(u,Oo(e.clientX,a,t,n))}else if(Tr(e.clientX,a,t,{startZonePx:Lo(a)}))Ee="drawer";else if(Oo(e.clientX,a,t,n))Ee="files";else return!1;return le=e.pointerId,_e=!1,tt=e.clientX,ra=e.clientY,de=[{t:e.timeStamp,x:e.clientX}],!0}function Or(e){let t=e.clientX-tt,a=e.clientY-ra;return Math.max(Math.abs(t),Math.abs(a))<na?!1:jo(e)||Ko(e)||Math.abs(t)<=Math.abs(a)?(De(),!1):(_e=!0,Se=la(),Ee==="files"?(sa=Ar(),Se&&Io(),ea(),!0):(ea(),Io(),!0))}function No(e){de.push({t:e.timeStamp,x:e.clientX});let t=e.timeStamp-zo,a=0;for(;a<de.length-1&&de[a].t<t;)a+=1;a>0&&(de=de.slice(a))}function Fr(e,t,a,o){let n=_e,i=ne;ne=!1,at=!1;let r=Ee==="files",d=sa,h=Er(de,zo,t.timeStamp),u=t.clientX-tt,s=t.clientY-ra;if(De(),!n){i&&bt(e);return}let l=vt()||!i&&Vo()?"none":r?kr({distanceRatio:vr,velocity:xr,lockPx:na,viewportWidthPx:o,panelOpen:d,drawerOpen:Se,drawerCloseDistanceRatio:Ro},{dx:u,dy:s,velX:h},a):yr({openDistanceRatio:ur,closeDistanceRatio:Ro,openVelocity:mr,closeVelocity:fr,lockPx:na,viewportWidthPx:o,drawerOpen:Se},{dx:u,dy:s,velX:h},a);if(ca(),i){l==="open"?(gt(),ce=performance.now()+ye):bt(e),t.target instanceof Element&&Je(t.target);return}if(t.target instanceof Element){if(l==="close"){Je(t.target),bt(e);return}gt(),l==="open"&&(Je(t.target),e.layout.toggleSidebar(),ce=performance.now()+ye),l==="files"&&(Bo(),Je(t.target),ce=performance.now()+ye),r&&l==="none"&&Je(t.target)}}function Je(e){let t=Be(),a=t!==null&&t.contains(e)?t:D()??null;Ao(e,br,a),et=e}function De(){le=0,_e=!1,de=[],Ee="drawer",sa=!1,ta()}function wt(){let e=D();return e!==null&&getComputedStyle(e).direction==="rtl"}function Go(e,t){H(e,"dsh-web-mobile: sidebar swipe gestures",()=>{Bo=t;let a=()=>window.innerWidth||document.documentElement.clientWidth||0,o=c=>{if(et=null,ta(),!(c.pointerType!=="touch"&&c.pointerType!=="pen")){if(le!==0&&le!==c.pointerId){xe(e);return}Pr(c,wt(),a())}},n=c=>{if(c.pointerId===le){if(vt()||da()){xe(e);return}if(_e)No(c),Ho(e,c.clientX-tt);else{if(Wo()){De();return}Or(c)&&(No(c),Ho(e,c.clientX-tt))}}},i=c=>{c.pointerId===le&&Fr(e,c,wt(),a())},r=c=>{c.pointerId===le&&xe(e)},d=c=>{if(et===null||!(c.target instanceof Element))return;let l=c.target.closest('[data-mobile-nav="backdrop"], [data-mobile-nav="fab"]');l!==null&&!l.contains(et)||Qe(c)&&(c.stopPropagation(),c.preventDefault(),et=null)},h=()=>{document.hidden&&xe(e)},u=c=>{if(le!==0){if(c.touches.length!==1||!c.cancelable||document.hidden){xe(e);return}_e&&c.preventDefault()}};document.addEventListener("pointerdown",o,!0),document.addEventListener("pointermove",n,!0),document.addEventListener("pointerup",i,!0),document.addEventListener("pointercancel",r,!0),document.addEventListener("click",d,!0),document.addEventListener("touchmove",u,{capture:!0,passive:!1});let s=()=>xe(e);return document.addEventListener("visibilitychange",h),window.addEventListener("blur",s),()=>{document.removeEventListener("pointerdown",o,!0),document.removeEventListener("pointermove",n,!0),document.removeEventListener("pointerup",i,!0),document.removeEventListener("pointercancel",r,!0),document.removeEventListener("click",d,!0),document.removeEventListener("touchmove",u,{capture:!0}),document.removeEventListener("visibilitychange",h),window.removeEventListener("blur",s),Ne!==0&&(cancelAnimationFrame(Ne),Ne=0),xe(e,!0)}})}var Xo=12,qe=null,Ir='button[data-dsh-taskboard-entry], button[data-dsh-ssh-entry], [class*="newSession"], [class*="sessionRow"], [class*="searchResultRow"], [class*="searchResultWorkspace"], [class*="panelRow"]';function ot(e){$o(e)||e.layout.toggleSidebar()}function Zo(e){H(e,"dsh-web-mobile: drawer close (Escape + navigate)",()=>{let t=()=>{ot(e)},a=()=>{let p=D();return p!==null&&!p.hasAttribute("data-sidebar-collapsed")},o=p=>{p.key==="Escape"&&document.querySelector('[aria-modal="true"]')===null&&a()&&t()},n=()=>document.querySelector('[data-mobile-nav="frame"] > :first-child'),i=p=>{if(document.querySelector('[aria-modal="true"]')!==null||!a()||!(p instanceof Element))return!1;let b=n();return b===null||!b.contains(p)||p.closest('[class*="sessionRow"] button')!==null?!1:p.closest(Ir)!==null},r=p=>!(p instanceof Element&&p.closest("[data-dsha-session-select]")!==null)&&i(p),d=0,h="",u=null,s=null,c=p=>{if(!p.isTrusted)return;let b=p.target;b instanceof Element&&b.closest('[class*="sessionRow"] [class*="_title"]')!==null&&(p.preventDefault(),p.stopPropagation())},l=()=>n()?.querySelector('[role="treeitem"][aria-selected="true"]')?.querySelector('[class*="_title"]')?.textContent?.trim()??null,x=()=>{u?.disconnect(),u=null,s!==null&&window.clearTimeout(s),s=null,h=""},w=()=>{x(),h=l()??"";let p=n();p!==null&&(u=new MutationObserver(()=>{if(!a()){x();return}let b=l();b!==null&&b!==h&&(x(),t())}),u.observe(p,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["aria-selected"]}),s=window.setTimeout(x,2e3))},R=p=>e.sessions.list.getSnapshot().byId[p]!==void 0,T=(p,b)=>{if(qe===null||!oa(qe,{x:b.clientX,y:b.clientY},Xo))return null;let _=ut(mt(p),R);return _===null||Y(e.sessions.list.getSnapshot())===_?null:_},E=null,v=!1,g=0,y=()=>{v=!0,E?.(),E=null,g!==0&&(window.clearTimeout(g),g=0)},C=p=>{y(),v=!1;let b=()=>{v||(y(),a()&&t())};E=e.sessions.list.subscribe(()=>{Y(e.sessions.list.getSnapshot())===p&&(g!==0&&window.clearTimeout(g),g=window.setTimeout(()=>{g=0,b()},0))})},P=0,k=p=>{P=performance.now(),qe=p.pointerType==="touch"||p.pointerType==="pen"?{x:p.clientX,y:p.clientY}:null},M=p=>{let b=p.target;if(aa()||Qe(p))return;if(b instanceof Element&&b.closest('[data-mobile-nav="backdrop"]')!==null){a()&&t();return}let _=b instanceof Element?b.closest('[role="treeitem"][data-dsha-session-select]'):null;if(_!==null&&p.detail>0&&i(b)){if(p.defaultPrevented||qe!==null&&(performance.now()-P>=500||!oa(qe,{x:p.clientX,y:p.clientY},Xo)))return;p.preventDefault(),p.stopPropagation(),x(),y(),d=performance.now(),_.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,detail:0}));return}performance.now()-d<500||r(b)&&t()},A=p=>{if(aa()||Qe(p)||p.pointerType!=="touch"&&p.pointerType!=="pen")return;let b=p.target;if(!(b instanceof Element)||!r(b))return;let _=b.closest('[role="treeitem"]');if(_!==null){if(d=performance.now(),_.getAttribute("aria-selected")==="true")t();else{let L=T(_,p);L===null?(y(),w()):(x(),_o(e.sessions)?(C(L),e.sessions.open(L)):(y(),w()))}return}},O=()=>{a()&&t()};return document.addEventListener("dsha-session-open",O),document.addEventListener("dblclick",c,!0),document.addEventListener("keydown",o,!0),document.addEventListener("click",M,!0),document.addEventListener("pointerdown",k,!0),document.addEventListener("pointerup",A,!0),()=>{x(),y(),qe=null,document.removeEventListener("dsha-session-open",O),document.removeEventListener("dblclick",c,!0),document.removeEventListener("keydown",o,!0),document.removeEventListener("click",M,!0),document.removeEventListener("pointerdown",k,!0),document.removeEventListener("pointerup",A,!0)}})}var pa=!1,ha=!1,xt=mo({requestFrame:e=>{let t=0;return t=requestAnimationFrame(()=>{t=0,e()}),()=>{t!==0&&cancelAnimationFrame(t)}}});function Yo(e){return pa?()=>{}:(pa=!0,H(e,"dsh-web-mobile: DOM reconciler",()=>{let t=new MutationObserver(a=>{let o=new Set;for(let n of a)(n.target instanceof Element?n.target:n.target.parentElement)?.closest("[data-chat-flow]")||o.add(uo(n));o.size>0&&xt.note(o)});return t.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,characterData:!0,attributeFilter:["style","class","data-phase","data-sidebar-collapsed","data-aionui-explorer-open","data-aionui-preview-open","data-mobile-preview-full"]}),xt.activate(),()=>{t.disconnect(),xt.deactivate()}}),()=>{pa=!1})}function ee(e){return xt.register(e)}function Qo(e,t){if(ha)return()=>{};ha=!0;let a=e.locale.bind(Z),o=[ee(yo(a)),ee(wo()),ee(vo()),ee(xo()),ee(ko(a,()=>ot(e),t)),ee(t.task),ee(Eo()),ee(Co(e))];return()=>{for(let n of o)n();ha=!1}}var Jo="data-mobile-nav-ios",ua="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content",en="--dsh-web-mobile-vh",ma=()=>document.querySelector('meta[name="viewport"]');function tn(){let e=null,t=null,a=!1,o=()=>{let d=ma();d!==null&&(e===null&&(e=d.content),!(a||d.content===ua)&&(a=!0,d.content=ua,a=!1))},n=new MutationObserver(o),i=()=>{let d=ma();d!==t&&(t!==null&&n.disconnect(),t=d,d!==null&&n.observe(d,{attributes:!0,attributeFilter:["content"]}))},r=new MutationObserver(()=>{i(),o()});return r.observe(document.head,{childList:!0}),i(),o(),()=>{n.disconnect(),r.disconnect();let d=ma();d!==null&&e!==null&&d.content===ua&&(d.content=e)}}function an(){let e=document.documentElement,t=0,a=0,o="",n=()=>{let i=window.innerHeight,r=window.innerWidth,d=window.visualViewport,u=`${Math.max(1,Math.min(i,d?.height??i))}px`,s=`${d?.offsetTop??0}px`;if(e.style.getPropertyValue("--dsha-mobile-visible-vh")!==u&&e.style.setProperty("--dsha-mobile-visible-vh",u),e.style.getPropertyValue("--dsha-mobile-viewport-top")!==s&&e.style.setProperty("--dsha-mobile-viewport-top",s),t===0||i>t||r!==a){t=i,a=r;let c=`${i}px`;c!==o&&(o=c,e.style.setProperty(en,c))}};return n(),window.addEventListener("resize",n),window.visualViewport?.addEventListener("resize",n),window.visualViewport?.addEventListener("scroll",n),()=>{window.removeEventListener("resize",n),window.visualViewport?.removeEventListener("resize",n),window.visualViewport?.removeEventListener("scroll",n),e.style.removeProperty("--dsha-mobile-visible-vh"),e.style.removeProperty("--dsha-mobile-viewport-top"),o="",e.style.removeProperty(en)}}function on(e){if(!e)return;let t=document.documentElement;return t.setAttribute(Jo,""),()=>{t.removeAttribute(Jo)}}var Hr='[data-dsh-responsive-part="sidebar-toggle"]:not([data-mobile-nav])',nn='[data-mobile-nav="dismiss-shadow"]';function Nr(){if(typeof document>"u")return;let e=document.querySelector(nn),t=document.querySelector(Hr),a=t?.closest('[data-pane="sidebar"]')??null;if(t===null||a===null){e?.remove();return}if(e!==null&&e.parentElement===a&&a.firstElementChild===e)return;let o=e??document.createElement("span");e===null&&(o.setAttribute("data-mobile-nav","dismiss-shadow"),o.setAttribute("data-dsh-responsive-part","sidebar-toggle"),o.setAttribute("aria-hidden","true"),o.style.setProperty("display","none","important")),a.insertBefore(o,a.firstElementChild)}function rn(){if(fa)return()=>{};fa=!0;let e=null,t=ee({name:"frame-marker",scopes:["*"],ensure:()=>{(e===null||!e.isConnected)&&(e=Gt()),e!==null&&!e.hasAttribute("data-mobile-nav")&&e.setAttribute("data-mobile-nav","frame"),Nr()},dispose:()=>{e!==null&&(e.removeAttribute("data-mobile-nav"),e.removeAttribute("data-mobile-preview-full"),e.removeAttribute("data-aionui-explorer-open"),e.removeAttribute("data-aionui-preview-open")),typeof document<"u"&&document.querySelector(nn)?.remove(),e=null}}),a=ee(ho());return()=>{a(),t(),fa=!1}}var fa=!1;function sn(e){H(e,"dsh-web-mobile: status bar theme + viewport + zoom guard",()=>{let t=document.createElement("meta");t.name="theme-color";let a=()=>getComputedStyle(document.body).backgroundColor,o=typeof CSS<"u"&&typeof CSS.supports=="function"?h=>CSS.supports(h):null;t.content=a(),t.parentElement===null&&document.head.appendChild(t);let n=new MutationObserver(()=>{t.content=a()});n.observe(document.body,{attributes:!0,attributeFilter:["data-ds-dark-theme"]});let i=tn(),r=on(Fe(navigator,o)),d=an();return()=>{d(),n.disconnect(),i(),t.remove(),r?.()}})}var yt="data-mobile-nav-selecting";function zr(){let e=window.getSelection();if(e===null||e.isCollapsed)return!1;let t=e.anchorNode;if(t===null)return!1;let a=t instanceof HTMLElement?t:t.parentElement;return a===null||a.closest("[data-composer-card]")!==null?!1:a.closest("[data-phase]")!==null}function ln(e){H(e,"dsh-web-mobile: selection chrome yield",()=>{if(typeof document>"u")return;let t=document.documentElement,a=()=>{let o=zr();o!==t.hasAttribute(yt)&&(o?t.setAttribute(yt,""):t.removeAttribute(yt))};return document.addEventListener("selectionchange",a),a(),()=>{document.removeEventListener("selectionchange",a),t.removeAttribute(yt)}})}var dn='[data-mobile-nav="frame"] button[class*="_trigger"][aria-haspopup="tree"][aria-expanded]:not([class*="_switcherTrigger"])',Dr='[class*="ZKlsPq_root"], [class*="ZKlsPq_menu"], [class*="h8S2Va_root"], [class*="h8S2Va_menu"]',Br=800,qr=1e3,cn=["mouseover","mouseout","mouseenter","mouseleave"];function pn(e){H(e,"dsh-web-mobile: lineage chip touch toggle",()=>{if(typeof PointerEvent>"u")return;let t=0,a=()=>{t=Date.now()+Br},o=null,n=0,i=u=>{if(u.pointerType!=="touch"&&u.pointerType!=="pen")return;a();let s=u.target;if(!(s instanceof Element))return;let c=s.closest(dn);if(c===null)return;let l=c.getAttribute("aria-expanded")==="true";c.dispatchEvent(new KeyboardEvent("keydown",{key:l?"Escape":"ArrowDown",bubbles:!0,cancelable:!0})),o=c,n=Date.now()+qr},r=u=>{if(o===null)return;if(Date.now()>=n){o=null;return}let s=u.target;s instanceof Element&&s.closest(dn)===o&&(o=null,u.stopPropagation())},d=u=>{u.pointerType!=="touch"&&u.pointerType!=="pen"||a()},h=u=>{if(Date.now()>=t||!u.isTrusted)return;let s=u.target;s instanceof Element&&s.closest(Dr)!==null&&u.stopImmediatePropagation()};document.addEventListener("pointerdown",d,!0),document.addEventListener("pointerup",i,!0),document.addEventListener("click",r,!0);for(let u of cn)document.addEventListener(u,h,!0);return()=>{document.removeEventListener("pointerdown",d,!0),document.removeEventListener("pointerup",i,!0),document.removeEventListener("click",r,!0);for(let u of cn)document.removeEventListener(u,h,!0)}})}var Wr="workspace",Vr='data-mobile-nav="session-delete"',ba="var(--dsw-alias-state-error-primary, #b91c1c)",jr='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.4782 4.84067L14.2138 10.1152C14.1102 12.1872 14.067 13.0115 13.3866 13.9607C13.1044 14.3546 12.7498 14.6912 12.3424 14.9535C11.8239 15.2872 11.2415 15.4316 10.5585 15.4998C9.88727 15.5668 9.04946 15.5656 7.99998 15.5656C6.95051 15.5656 6.1127 15.5668 5.44142 15.4998C4.75851 15.4316 4.17602 15.2872 3.65753 14.9535C3.25012 14.6912 2.89559 14.3546 2.61332 13.9607C1.93296 13.0115 1.88979 12.1872 1.78619 10.1152L1.52179 4.84067L2.89006 4.77277L3.15343 10.0463C3.26221 12.2218 3.32452 12.6015 3.72646 13.1624C3.90825 13.4161 4.13686 13.6334 4.39927 13.8023C4.66204 13.9714 5.00263 14.0792 5.57825 14.1367C6.16562 14.1953 6.92298 14.1963 7.99998 14.1963C9.07699 14.1963 9.83434 14.1953 10.4217 14.1367C10.9973 14.0792 11.3379 14.1367 11.6007 13.8023C11.8631 13.6334 12.0917 13.4161 12.2735 13.1624C12.6755 12.6015 12.7378 12.2218 12.8465 10.0463L13.1099 4.77277L14.4782 4.84067ZM5.43011 6.22849H6.7994V11.3909H5.43011V6.22849ZM9.20056 6.22849H10.5699V11.3909H9.20056V6.22849ZM8.53597 0.434431C9.17976 0.434431 9.6522 0.426926 10.0966 0.571258C10.2357 0.616451 10.3717 0.672554 10.502 0.738948C10.9182 0.951107 11.2464 1.29099 11.7015 1.74612L12.4978 2.54136H15.3742V3.91169H0.625732V2.54136H3.50218L4.29845 1.74612C4.75358 1.29099 5.08174 0.951107 5.49801 0.738948C5.62831 0.672554 5.76425 0.616451 5.90334 0.571258C6.34776 0.426926 6.82021 0.434431 7.46399 0.434431H8.53597ZM7.46399 1.80476C6.73208 1.80476 6.51641 1.81187 6.32617 1.87369C6.25545 1.89667 6.18668 1.92533 6.12041 1.95907C5.96398 2.03878 5.82348 2.16253 5.44142 2.54136H10.5585C10.1765 2.16253 10.036 2.03878 9.87955 1.95907C9.81329 1.92533 9.74452 1.89667 9.6738 1.87369C9.48356 1.81187 9.26789 1.80476 8.53597 1.80476H7.46399Z" fill="currentColor" /></svg>';function Ae(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function hn(e){H(e,"dsh-web-mobile: session-menu delete",()=>{let t=e.locale.bind(Z),a=(A,O)=>e.locale.bind(Wr)(A,O),o=null,n=0,i=null,r=null,d=0,h=A=>{let O=A.getAttribute("data-row-key")??"";if(O.startsWith("session:")){let b=O.slice(8);if(b!=="")return b}let p=A.getAttribute("data-dsha-session-select");return p!==null&&p!==""?p:ut(mt(A),v)},u=A=>(A.querySelector('[class*="_itemLabel"]')??A).textContent?.trim()??"",s=A=>{let O=[...A.querySelectorAll('[role="menuitem"]')].map(u),p=a("rename"),b=a("menu.fork");return O.includes(p)&&O.includes(b)&&O.includes(a("menu.archiveSession"))},c=()=>{r!==null&&(document.removeEventListener("keydown",r,!0),r=null),i!==null&&(i.backdrop.remove(),i.card.remove(),i=null)},l=(A,O)=>{c();let p=document.body,b=document.createElement("div");b.dataset.mobileNav="delete-dialog-backdrop";let _=document.createElement("div");_.dataset.mobileNav="delete-dialog",_.setAttribute("role","dialog"),_.setAttribute("aria-modal","true"),_.innerHTML=`
        <div data-mobile-nav="delete-confirm-title">${Ae(t("deleteConfirmTitle"))}</div>
        <div data-mobile-nav="delete-confirm-desc">${Ae(t("deleteConfirmDesc",{title:O}))}</div>
        <div data-mobile-nav="delete-confirm-actions">
          <button type="button" data-mobile-nav="delete-confirm-no">${Ae(t("deleteConfirmNo"))}</button>
          <button type="button" data-mobile-nav="delete-confirm-yes">${Ae(t("deleteConfirmYes"))}</button>
        </div>
        <div data-mobile-nav="delete-error" role="alert" hidden></div>`;let L=_.querySelector('[data-mobile-nav="delete-confirm-no"]'),I=_.querySelector('[data-mobile-nav="delete-confirm-yes"]'),N=_.querySelector('[data-mobile-nav="delete-error"]');L?.addEventListener("click",c),b.addEventListener("click",q=>{q.target===b&&c()});let V=q=>{q.key==="Escape"&&c()};document.addEventListener("keydown",V,!0),r=V;let X=()=>{I!==null&&(I.disabled=!1,I.textContent=t("deleteConfirmYes")),L!==null&&(L.disabled=!1)},j=q=>{N!==null&&(N.textContent=q,N.hidden=!1),X()},he=(q,B)=>{let ae=q?.error?.code;if(ae==="session-not-found")return t("deleteErrorNotFound");if(ae==="session-busy")return t("deleteErrorBusy");let U=q?.error?.message??(B instanceof Error?B.message:String(B));return t("deleteErrorGeneric",{message:U})};I?.addEventListener("click",async()=>{I.disabled=!0,L!==null&&(L.disabled=!0),I.textContent=t("deletePending"),N!==null&&(N.hidden=!0);let q=++d;try{let oe=await fetch("/api/mobile-nav.session.delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sessionId:A})}),Q=await oe.json().catch(()=>null);if(!oe.ok||Q===null||Q.ok!==!0){j(he(Q,new Error(`HTTP ${oe.status}`)));return}}catch(oe){let Q=!1;try{Q=await So({listed:()=>e.sessions.list.getSnapshot()?.byId?.[A]!==void 0,refresh:async()=>{await e.sessions.refresh?.()},sleep:Nt=>new Promise(zt=>{window.setTimeout(()=>{zt()},Nt)})})}catch{Q=!1}if(!Q){j(he(null,oe));return}}let B=Y(e.sessions.list.getSnapshot())===A;if(q!==d)return;c(),B&&To(e.sessions)&&e.sessions.clear();let ae=e.sessions;try{await ae.refresh?.()}catch(oe){console.warn("[dsh-web-mobile] session list refresh after delete failed:",oe)}let U=D();U===null||U.hasAttribute("data-sidebar-collapsed")||B&&window.matchMedia(ve).matches&&ot(e)}),p.appendChild(b),b.appendChild(_),i={backdrop:b,card:_}},x=A=>{c();let O=document.body,p=document.createElement("div");p.dataset.mobileNav="delete-dialog-backdrop";let b=document.createElement("div");b.dataset.mobileNav="delete-dialog",b.setAttribute("role","dialog"),b.setAttribute("aria-modal","true"),b.innerHTML=`
        <div data-mobile-nav="delete-confirm-title">${Ae(t("deleteSession"))}</div>
        <div data-mobile-nav="delete-error" role="alert">${Ae(A)}</div>
        <div data-mobile-nav="delete-confirm-actions">
          <button type="button" data-mobile-nav="delete-confirm-no">${Ae(t("deleteConfirmNo"))}</button>
        </div>`,b.querySelector('[data-mobile-nav="delete-confirm-no"]')?.addEventListener("click",c),p.addEventListener("click",L=>{L.target===p&&c()});let _=L=>{L.key==="Escape"&&c()};document.addEventListener("keydown",_,!0),r=_,O.appendChild(p),p.appendChild(b),i={backdrop:p,card:b}},w=new Set,R=A=>{if(A.querySelector(`[${Vr}]`)!==null)return;let O=A.querySelector('[role="menuitem"]'),p=O?.parentElement??null,b=A.querySelector('[class*="_viewport"]');if(O===null||p===null||b===null)return;let _=p.cloneNode(!0),L=_.querySelector('[role="menuitem"]');if(L===null)return;let I=L.querySelector('[class*="_itemIcon"]');I!==null&&(I.innerHTML=jr,I.style.color=ba);let N=L.querySelector('[class*="_itemLabel"]');N!==null?(N.textContent=t("deleteSession"),N.style.color=ba):L.firstElementChild===null&&(L.textContent=t("deleteSession"),L.style.color=ba),L.setAttribute("data-mobile-nav","session-delete"),L.addEventListener("click",V=>{V.preventDefault(),V.stopPropagation();let X=o;X?.button.click();try{if(X===null){x(t("deleteErrorResolve"));return}let j=X.sessionId;if(j===null){x(t("deleteErrorResolve"));return}l(j,X.title)}catch(j){console.error("[dsh-web-mobile] session delete failed:",j),x(t("deleteErrorGeneric",{message:j instanceof Error?j.message:String(j)}))}}),b.appendChild(_),w.add(_)},T=()=>{for(let O of w)O.isConnected||w.delete(O);let A=a("session.new");for(let O of document.querySelectorAll('[role="menu"]'))s(O)&&(o!==null&&o.title===A||R(O))},E=()=>{n===0&&(n=requestAnimationFrame(()=>{n=0,T()}))},v=A=>e.sessions.list.getSnapshot().byId[A]!==void 0,g=A=>{let O=[...A.querySelectorAll("button")],p=O.find(_=>{let L=_.getAttribute("aria-label")??"";return/session actions/i.test(L)});return p!==void 0?p:O.find(_=>{let L=_.getAttribute("aria-label")??"";return!/archive session|pin session/i.test(L)})??null},y=A=>{if(!(A instanceof Element))return;let O=A.closest('[class*="_sessionRow"]');if(O===null)return;let p=g(O);if(p===null)return;let b=O.querySelector('[class*="_title"]')?.textContent?.trim()??"",_=h(O);o={button:p,title:b,sessionId:_},E()},C=A=>y(A.target),P=A=>y(A.target);document.addEventListener("click",C,!0),document.addEventListener("contextmenu",P,!0);let k=A=>{if(o===null)return!1;for(let O of A.removedNodes)if(O instanceof Element&&(O.matches('[role="menu"]')||O.querySelector('[role="menu"]')!==null))return!0;return!1},M=new MutationObserver(A=>{let O=A.length===0;for(let b of A)if((b.target instanceof Element?b.target:b.target.parentElement)?.closest("[data-chat-flow]")==null){O=!0;break}if(!O)return;let p=!1;for(let b of A){if(b.type!=="childList")continue;let _=b.target;if(_===document.body){E();break}if(p||(p=k(b)),_ instanceof HTMLElement&&(_.matches('[role="menu"]')||_.closest('[role="menu"]')!==null)){E();break}}p&&o!==null&&![...document.querySelectorAll('[role="menu"]')].some(s)&&(o=null)});return M.observe(document.body,{childList:!0,subtree:!0}),T(),()=>{document.removeEventListener("click",C,!0),document.removeEventListener("contextmenu",P,!0),M.disconnect(),n!==0&&cancelAnimationFrame(n),c();for(let A of w)A.remove();w.clear(),o=null}},pt)}var Kr="[data-composer-card]",ga="[data-composer-input]",Ur='button, [role="button"], [role="option"], [role="menuitem"], [role="combobox"], [aria-haspopup], select, a[href], label, input',pe="data-mobile-nav-focus-shadow";function un(e){H(e,"dsh-web-mobile: composer keyboard guard",()=>{let t=Fe(navigator,typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports.bind(CSS):null),a=typeof matchMedia=="function"&&matchMedia("(pointer: coarse)").matches;if(!t&&!a)return;let o=0,n=()=>{window.clearTimeout(o),o=0;let d=document.querySelector(`[${pe}]`);if(d===null)return;d.removeAttribute(pe);let h=d;Object.prototype.hasOwnProperty.call(d,"focus")&&delete h.focus},i=d=>{let h=d.target;if(!(h instanceof Element)||typeof h.closest!="function")return;let u=h.closest(Kr);if(u===null)return;let s=u.querySelector(ga);if(s===null)return;if(h.closest(ga)!==null){n();return}let c=h.closest(Ur);if(c===null||!u.contains(c)){n();return}n(),s.setAttribute(pe,""),Object.defineProperty(s,"focus",{configurable:!0,writable:!0,value:function(){}}),window.clearTimeout(o),o=window.setTimeout(n,700)},r=d=>{if(o===0)return;let h=d.target;h instanceof HTMLElement&&h.closest(ga)!==null&&h.blur()};return document.addEventListener("pointerdown",i,!0),document.addEventListener("touchstart",i,!0),document.addEventListener("mousedown",i,!0),document.addEventListener("focusin",r,!0),()=>{document.removeEventListener("pointerdown",i,!0),document.removeEventListener("touchstart",i,!0),document.removeEventListener("mousedown",i,!0),document.removeEventListener("focusin",r,!0),n()}})}var $r=24;function Gr(e){let{seatBottom:t,viewportHeight:a,scale:o,scrollY:n,offsetTop:i}=e;if(!Number.isFinite(t)||!Number.isFinite(a)||!Number.isFinite(o)||Math.abs(o-1)>.01||!Number.isFinite(n)||!Number.isFinite(i)||Math.abs(n-i)>$r)return 0;let r=t-a;return r>0?r:0}var mn='[data-mobile-nav="frame"] [class*="_composerSeat"]',fn="[data-composer-input]";function bn(e){H(e,"dsh-web-mobile: composer keyboard lift",()=>{if(!Fe(navigator,typeof CSS<"u"&&typeof CSS.supports=="function"?CSS.supports.bind(CSS):null))return;let t=window.visualViewport;if(!t)return;let a=null,o=0,n=0,i=()=>{if(n=0,a===null||!a.isConnected)return;let s=Gr({seatBottom:a.getBoundingClientRect().bottom+o,viewportHeight:t.height,scale:t.scale,scrollY:window.scrollY,offsetTop:t.offsetTop});o=s,a.style.transform=s>0?`translateY(${-s}px)`:""},r=()=>{n===0&&(n=requestAnimationFrame(i))},d=()=>{t.removeEventListener("resize",r),t.removeEventListener("scroll",r),window.removeEventListener("scroll",r),n!==0&&(cancelAnimationFrame(n),n=0),a!==null&&(a.style.transform=""),a=null,o=0},h=s=>{let c=s.target;if(!(c instanceof Element)||c.closest(fn)===null)return;d();let l=document.querySelector(mn);l!==null&&(a=l,t.addEventListener("resize",r),t.addEventListener("scroll",r),window.addEventListener("scroll",r,{passive:!0}),r())},u=s=>{let c=s.target;if(!(c instanceof Element)||c.closest(fn)===null)return;let l=s.relatedTarget;l instanceof Element&&l.closest(mn)!==null||d()};return document.addEventListener("focusin",h,!0),document.addEventListener("focusout",u,!0),()=>{document.removeEventListener("focusin",h,!0),document.removeEventListener("focusout",u,!0),d()}})}var wa='[class*="_add"]',Xr="[data-trigger-menu]",wn="[data-composer-input]",Zr=e=>{let t=e.getBoundingClientRect();return t.width>0&&t.height>0&&e.getClientRects().length>0},va=()=>{for(let e of document.querySelectorAll(Xr))if(Zr(e))return e;return null},vn=()=>{let e=document.querySelector(wn);return e instanceof HTMLElement?e:null},gn=()=>{let e=vn();e!==null&&document.activeElement===e&&e.blur()},Yr=()=>{let e=vn();e!==null&&e.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",keyCode:27,which:27,bubbles:!0,cancelable:!0}))};function xn(e){H(e,"dsh-web-mobile: composer plus toggle",()=>{let t=!1,a=[],o=()=>{for(let h of a)window.clearTimeout(h);a=[]},n=h=>{let u=h.target;t=u instanceof Element&&u.closest(wa)!==null&&va()!==null},i=h=>{let u=h.target;u instanceof Element&&u.closest(wa)!==null&&gn()},r=h=>{let u=t;t=!1;let s=h.target;if(!(!(s instanceof Element)||s.closest(wa)===null)){u&&va()!==null&&Yr(),o();for(let c of[120,320,640])a.push(window.setTimeout(()=>{va()!==null&&gn()},c))}},d=h=>{let u=h.target;u instanceof Element&&u.closest(wn)!==null&&o()};return document.addEventListener("pointerdown",i,!0),document.addEventListener("pointerdown",d,!0),document.addEventListener("click",n,!0),document.addEventListener("click",r,!1),()=>{o(),document.removeEventListener("pointerdown",i,!0),document.removeEventListener("pointerdown",d,!0),document.removeEventListener("click",n,!0),document.removeEventListener("click",r,!1)}})}var Qr='[class*="heroWorkspaceRow"] > button[aria-haspopup="menu"]',Jr='[role="menu"]';function yn(e){H(e,"dsh-web-mobile: workspace chip toggle",()=>{let t=null,a=i=>i instanceof Element?i.closest(Qr):null,o=i=>{t=null;let r=a(i.target);r!==null&&r.getAttribute("aria-expanded")==="true"&&document.querySelector(Jr)!==null&&(t=r)},n=i=>{let r=t;t=null,!(r===null||a(i.target)!==r)&&i.stopPropagation()};return document.addEventListener("pointerdown",o,!0),document.addEventListener("click",n,!0),()=>{t=null,document.removeEventListener("pointerdown",o,!0),document.removeEventListener("click",n,!0)}})}var es="[data-team-action]",ts='[data-team-action] > button[aria-haspopup="dialog"]',as="[data-team-panel]";function kn(e){H(e,"dsh-web-mobile: team chip toggle",()=>{let t=null,a=i=>i instanceof Element?i.closest(ts):null,o=i=>{t=null;let r=a(i.target);r!==null&&r.getAttribute("aria-expanded")==="true"&&document.querySelector(es)!==null&&document.querySelector(as)!==null&&(t=r)},n=i=>{let r=t;t=null,!(r===null||a(i.target)!==r)&&(document.body.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0,cancelable:!0})),i.stopPropagation())};return document.addEventListener("pointerdown",o,!0),document.addEventListener("click",n,!0),()=>{t=null,document.removeEventListener("pointerdown",o,!0),document.removeEventListener("click",n,!0)}},pt)}var En='[class*="_7KE1Ra_trigger"]',Tn='[class*="_7KE1Ra_menu"]',os="[data-composer-card]",kt=8,_n=[0,60,200];function Sn(e){H(e,"dsh-web-mobile: model menu anchor",()=>{let t=0,a=null,o=null,n=[],i=null,r=null,d=null,h=null,u=()=>{let k=h;h=null,k!==null&&k.el.style.left===k.value&&(k.el.style.left=k.original)},s=k=>{if(k===null)return null;let M=o?.get(k);if(M!==void 0)return M;let A=k.getBoundingClientRect(),O=A.width>0&&A.height>0?A:null;return o?.set(k,O),O},c=()=>{for(let k of document.querySelectorAll(Tn))if(s(k)!==null)return k;return null},l=k=>{let M=s(k);if(M===null)return;let A=M.width,O=document.documentElement.clientWidth,p=Math.max(kt,O-A-kt),b=s(r),_=s(d),L=b===null?null:b.right-A,I;if(L!==null&&L>=kt&&L<=p)I=L;else if(_!==null)I=_.left+(_.width-A)/2;else return;let N=`${Math.round(Math.min(Math.max(I,kt),p))}px`;h!==null&&h.el!==k&&u(),h===null?h={el:k,value:N,original:k.style.left}:h.value=N,k.style.left!==N&&(k.style.left=N)},x=()=>{i=c(),r=i===null?null:document.querySelector(En),d=i===null?null:document.querySelector(os),i!==null&&l(i)},w=()=>{if(i!==null){if(s(i)===null){u(),i=null,r=null,d=null;return}l(i)}},R=k=>{a=k,t===0&&(t=window.requestAnimationFrame(()=>{t=0;let M=a;a=null,o=new Map;try{M!==null&&M()}finally{o=null}}))},T=()=>{R(x);for(let k of _n)n.push(window.setTimeout(()=>R(x),k));for(;n.length>_n.length*2;){let k=n.shift();k!==void 0&&window.clearTimeout(k)}},E=k=>{let M=k.target;return M instanceof Element?M.closest(En)!==null||M.closest(Tn)!==null:!1},v=k=>{E(k)&&T()},g=k=>{E(k)&&T()},y=k=>{E(k)&&T()},C=k=>{E(k)&&T()},P=()=>{R(w)};return document.addEventListener("pointerdown",v,!0),document.addEventListener("keydown",g,!0),document.addEventListener("focusin",y,!0),document.addEventListener("click",C,!0),window.addEventListener("resize",P),document.addEventListener("scroll",P,!0),()=>{document.removeEventListener("pointerdown",v,!0),document.removeEventListener("keydown",g,!0),document.removeEventListener("focusin",y,!0),document.removeEventListener("click",C,!0),window.removeEventListener("resize",P),document.removeEventListener("scroll",P,!0),t!==0&&window.cancelAnimationFrame(t),a=null,o=null;for(let k of n)window.clearTimeout(k);n.length=0,u(),i=null,r=null,d=null}})}var Et=new Set,Tt=null;function _t(e){if(Tt===null){let a=HTMLInputElement.prototype,o=Object.getOwnPropertyDescriptor(a,"focus"),n=a.focus;if(typeof n!="function"||o?.configurable===!1||!o&&!Object.isExtensible(a))return()=>{};let i=function(d){for(let h of Et)if(h.shouldSkip(this))return;n.call(this,d)};try{Object.defineProperty(a,"focus",{configurable:!0,writable:!0,enumerable:o?.enumerable??!1,value:i})}catch{return()=>{}}Tt=()=>{if(Object.getOwnPropertyDescriptor(a,"focus")?.value===i)try{o?Object.defineProperty(a,"focus",o):delete a.focus}catch{}}}let t={shouldSkip:e};return Et.add(t),()=>{if(Et.delete(t)&&Et.size===0){let a=Tt;Tt=null,a?.()}}}var Cn='[data-shortcut-modal="shortcuts"] [data-modal-autofocus]';function An(e){H(e,"dsh-web-mobile: shortcut modal keyboard guard",()=>{let t=new WeakSet(document.querySelectorAll(Cn)),a=new WeakSet,o=_t(n=>{if(n.matches(Cn)){if(!t.has(n)&&n.hasAttribute("data-dsh-automatic-focus")){if(!a.has(n)){a.add(n),Promise.resolve().then(()=>t.add(n));let i=n.closest('[role="dialog"][aria-modal="true"]');i!==null&&!i.contains(document.activeElement)&&i.focus({preventScroll:!0})}return!0}t.add(n)}return!1});return()=>o()})}var ns='[data-menu-material], [class*="_7KE1Ra_menu"]',is='[data-menu-material] input[role="searchbox"], input[role="searchbox"][aria-controls$="-models"]',rs=2e3;function Ln(e){H(e,"dsh-web-mobile: model menu keyboard guard",()=>{let t=null,a=0,o=()=>{t===null&&(t=_t(r=>r.matches(is)))},n=()=>{t?.(),t=null},i=()=>{o(),window.clearTimeout(a),a=window.setTimeout(()=>{document.querySelector(ns)===null&&n()},rs)};return document.addEventListener("pointerdown",i,!0),()=>{document.removeEventListener("pointerdown",i,!0),window.clearTimeout(a),n()}})}function Rn(e){return e.insideOpen||e.onInteractive?"ignore":"open"}var ss="li[data-plugin-package], li[data-plugin-row], li[data-plugin-item]",ls='button[class*="_cardOpen"], button[class*="_rowOpen"]',ds='button, a, input, select, textarea, [role="switch"], [role="button"], [role="tab"], [contenteditable="true"]';function Mn(e){H(e,"dsh-web-mobile: plugin card tap",()=>{let t=a=>{let o=a.target;if(!(o instanceof Element))return;let n=o.closest(ss);if(n===null)return;let i=n.querySelector(ls);!(i instanceof HTMLButtonElement)||Rn({insideOpen:i.contains(o),onInteractive:o.closest(ds)!==null})==="ignore"||(a.preventDefault(),i.click())};return document.addEventListener("click",t,!0),()=>document.removeEventListener("click",t,!0)})}function Pn(e,t){let a=0,o=!1;return{schedule(n){o||(o=!0,a=e(()=>{o=!1,n()}))},cancel(){o&&(t(a),o=!1)}}}function On(e){e.effect(()=>{let t=window.matchMedia(ve),a='[class*="irow"]:not([class*="irowActions"]):not([class*="irowTrailing"])',o={"white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis","max-width":"100%"},n=[{pick:E=>E,props:{"flex-wrap":"wrap","align-items":"center",gap:"4px 10px"}},{pick:E=>E.children[0]??null,props:{flex:"1 1 100%","max-width":"100%","min-width":"0"}},{pick:E=>E.querySelector('[class*="spec"]'),props:o},{pick:E=>E.querySelector('[class*="nm"]'),props:o}],i=new WeakMap,r=(E,v)=>{let g=i.get(E);g===void 0&&i.set(E,g=new Map);for(let[y,C]of Object.entries(v)){let P="important",k=E.style.getPropertyValue(y),M=E.style.getPropertyPriority(y);if(k===C&&M===P)continue;let A=g.get(y),O=A!==void 0&&A.value===k&&A.priority===M;g.set(y,O?{...A,value:C,priority:P}:{value:C,priority:P,before:k,beforePriority:M}),E.style.setProperty(y,C,P)}},d=E=>{let v=i.get(E);if(v!==void 0){for(let[g,y]of v)v.delete(g),!(E.style.getPropertyValue(g)!==y.value||E.style.getPropertyPriority(g)!==y.priority)&&(y.before===""?E.style.removeProperty(g):E.style.setProperty(g,y.before,y.beforePriority));v.size===0&&i.delete(E)}},h=()=>{document.querySelectorAll(a).forEach(E=>{for(let v of n){let g=v.pick(E);g&&d(g)}})},u=null,s='[data-dsh-market-root], [role="dialog"]',c="[data-dsh-market-root]",l=()=>{let E=u;if(E!==null&&E.isConnected)return E;let v=document.querySelector(s);return v===null?(u=null,null):(u=v.matches(c)?v:document.querySelector(c)??v,u)},x=()=>{let E=l();if(E===null)return;let v=E.querySelectorAll(a);v.length===0&&!E.matches(c)&&(v=document.querySelectorAll(a)),v.forEach(g=>{for(let y of n){let C=y.pick(g);C&&r(C,y.props)}})},w=()=>{h(),t.matches&&x()};w();let R=Pn(E=>window.requestAnimationFrame(E),E=>window.cancelAnimationFrame(E)),T=new MutationObserver((E=[])=>{let v=E.length===0;for(let g of E)if((g.target instanceof Element?g.target:g.target.parentElement)?.closest("[data-chat-flow]")==null){v=!0;break}v&&t.matches&&R.schedule(()=>{t.matches&&x()})});return T.observe(document.documentElement,{childList:!0,subtree:!0}),t.addEventListener("change",w),()=>{R.cancel(),T.disconnect(),t.removeEventListener("change",w),h(),u=null}},"dsh-web-mobile: installed-list-inline-styles")}var cs=800,St="[data-composer-input]";function Fn(e){H(e,"dsh-web-mobile: session focus guard",()=>{let t=e.sessions.list,a=Y(t.getSnapshot()),o=0,n=!1,i=()=>{window.clearTimeout(o),o=0,n=!1;let l=document.querySelector(`[${pe}]`);if(l===null)return;l.removeAttribute(pe);let x=l;Object.prototype.hasOwnProperty.call(l,"focus")&&delete x.focus},r=l=>{l.hasAttribute(pe)||(l.setAttribute(pe,""),Object.defineProperty(l,"focus",{configurable:!0,writable:!0,value:function(){}}))},d=()=>{i(),n=!0;let l=document.querySelector(St);l!==null&&r(l),o=window.setTimeout(i,cs)},h=new MutationObserver(()=>{if(!n)return;let l=document.querySelector(St);l!==null&&r(l)}),u=l=>{if(!n)return;let x=l.target;x instanceof Element&&x.closest(St)!==null&&i()},s=l=>{if(!n)return;let x=l.target;x instanceof HTMLElement&&x.closest(St)!==null&&x.blur()},c=t.subscribe(()=>{let l=Y(t.getSnapshot());l!==a&&(a=l,d())});return h.observe(document.documentElement,{childList:!0,subtree:!0}),document.addEventListener("pointerdown",u,!0),document.addEventListener("focusin",s,!0),()=>{c(),h.disconnect(),document.removeEventListener("pointerdown",u,!0),document.removeEventListener("focusin",s,!0),i()}})}var ps="[data-composer-input]";function hs(e){if(!e.isTrusted||e.defaultPrevented||e.inputType!=="insertText")return!1;let t=e.data;return typeof t!="string"||t===`
`||t==="\r"?!1:t.includes(`
`)||t.includes("\r")}function us(e){if(typeof DataTransfer!="function"||typeof ClipboardEvent!="function")return null;try{let t=new DataTransfer;t.setData("text/plain",e);let a=new ClipboardEvent("paste",{clipboardData:t,bubbles:!0,cancelable:!0});return a.clipboardData?.getData("text/plain")!==e?null:a}catch{return null}}function In(e){H(e,"dsh-web-mobile: composer paste guard",()=>{let t=a=>{if(!(a instanceof InputEvent)||!hs(a))return;let o=a.target;if(!(o instanceof Element))return;let n=o.closest(ps);if(n===null)return;let i=us(a.data??"");i!==null&&(a.preventDefault(),a.stopPropagation(),n.dispatchEvent(i))};return document.addEventListener("beforeinput",t,!0),()=>{document.removeEventListener("beforeinput",t,!0)}})}var ms='[data-mobile-nav="file-upload"]',fs="[data-composer-card]",bs="input[type=file]",Le=null;function gs(e){return e==="image"?"image/*":""}function ws(e){return typeof e?.pickFile=="function"?e.pickFile.bind(e):void 0}function Nn(e){return Array.isArray(e)?e.filter(t=>typeof File<"u"&&t instanceof File):[]}function vs(e,t){return t?"fallback":e==null?"cancelled":Array.isArray(e)?e.length===0?"cancelled":Nn(e).length>0?"files":"fallback":"fallback"}function xa(){let e=document.querySelector(fs);return e===null?null:e.querySelector(bs)}function xs(e,t){if(t===null)return!1;try{let a=new DataTransfer;for(let o of e)a.items.add(o);t.files=a.files}catch{return!1}return t.dispatchEvent(new Event("change",{bubbles:!0})),!0}var ys='<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="20" height="20"><rect x="2.5" y="3.5" width="15" height="13" rx="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="7.2" cy="8" r="1.4" fill="currentColor"/><path d="M4.2 14.6l3.6-3.4 2.6 2.4 2.3-2.3 3.1 3.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',ks='<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="20" height="20"><path d="M12.6 3.2H6.4A1.9 1.9 0 0 0 4.5 5.1v9.8a1.9 1.9 0 0 0 1.9 1.9h7.2a1.9 1.9 0 0 0 1.9-1.9V6.6l-2.9-3.4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12.4 3.4v3.3h3.1" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';function ya(e,t=xa()){if(t===null)return;let a=gs(e),o=t.hasAttribute("accept"),n=t.getAttribute("accept");a!==""&&t.setAttribute("accept",a);try{t.click()}finally{a!==""&&(o?t.setAttribute("accept",n??""):t.removeAttribute("accept"))}}async function Es(e,t){let a=window.DSHA,o=ws(a);if(o===void 0){ya("file");return}let n=xa(),i=t?.()??null,r=null,d=!1;try{r=await o({accept:[],multiple:!0,title:e("fileUploadAttachment")})}catch{d=!0}if(n===null||xa()!==n||i!==null&&(t?.()??null)!==i)return;let h=vs(r,d);h!=="cancelled"&&(h==="files"&&xs(Nn(r),n)||ya("file",n))}var Hn=8,nt=8;function Ts(e,t,a){let o=e.top-Hn-t.height;o<a.top+nt&&(o=Math.min(e.bottom+Hn,a.bottom-t.height-nt));let n=Math.max(a.left+nt,Math.min(e.left,a.right-t.width-nt));return{top:Math.round(Math.max(a.top+nt,o)),left:Math.round(n)}}function _s(){let e=window.visualViewport;return e!=null?{top:e.offsetTop,bottom:e.offsetTop+e.height,left:e.offsetLeft,right:e.offsetLeft+e.width}:{top:0,bottom:window.innerHeight,left:0,right:window.innerWidth}}function Ss(e,t,a){Le?.(),Le=null;let o=document.createElement("div");o.dataset.mobileNav="file-picker-backdrop";let n=document.createElement("div");n.dataset.mobileNav="file-picker",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-label",e("fileUploadAttachment"));let i=[{kind:"image",icon:ys,label:e("fileUploadImage")},{kind:"file",icon:ks,label:e("fileUploadAttachment")}],r=[],d=()=>{Le===d&&(Le=null);for(let g of r.splice(0))g();o.remove()};Le=d;let h=g=>{g.key==="Escape"&&d()};for(let g of i){let y=document.createElement("button");y.type="button",y.dataset.mobileNav="file-picker-option",y.dataset.kind=g.kind;let C=document.createElement("span");C.dataset.mobileNav="file-picker-icon",C.innerHTML=g.icon;let P=document.createElement("span");P.textContent=g.label,y.append(C,P),y.addEventListener("click",()=>{d(),g.kind==="file"?Es(e,a):ya(g.kind)}),n.append(y)}o.addEventListener("click",g=>{g.target===o&&d()}),document.addEventListener("keydown",h,!0),r.push(()=>document.removeEventListener("keydown",h,!0)),o.append(n),document.body.append(o),n.style.visibility="hidden";let u=!1,s=()=>{u||(u=!0,n.style.visibility="")},c="",l=0,x=window.setTimeout(s,400);r.push(()=>window.clearTimeout(x));let w=()=>{if(!t.isConnected){d();return}let g=t.getBoundingClientRect(),y=n.getBoundingClientRect(),C=Ts(g,y,_s()),P=`${C.top}px`,k=`${C.left}px`;n.style.top!==P&&(n.style.top=P),n.style.left!==k&&(n.style.left=k);let M=`${C.top}:${C.left}`;M===c?l+=1:(c=M,l=0),l>=2&&s()};w();let R=!0,T=()=>{R||w()};window.addEventListener("resize",T),window.addEventListener("orientationchange",T),window.visualViewport?.addEventListener("resize",T),window.visualViewport?.addEventListener("scroll",T),r.push(()=>window.removeEventListener("resize",T)),r.push(()=>window.removeEventListener("orientationchange",T)),r.push(()=>window.visualViewport?.removeEventListener("resize",T)),r.push(()=>window.visualViewport?.removeEventListener("scroll",T));let E=0,v=requestAnimationFrame(function g(){if(w(),!n.isConnected){R=!1;return}++E<12?v=requestAnimationFrame(g):(R=!1,s())});r.push(()=>cancelAnimationFrame(v))}function zn(e){H(e,"dsh-web-mobile: composer file picker",()=>{let t=e.locale.bind(Z),a=()=>Y(e.sessions.list.getSnapshot())??null,o=n=>{let i=n.target;if(!(i instanceof Element))return;let r=i.closest(ms);r===null||r.hasAttribute("disabled")||(n.preventDefault(),n.stopPropagation(),Ss(t,r,a))};return document.addEventListener("click",o,!0),()=>{document.removeEventListener("click",o,!0),Le?.(),Le=null,document.querySelector('[data-mobile-nav="file-picker-backdrop"]')?.remove()}})}var Ct="mobile-nav-attachments";function We(e){return typeof e=="object"&&e!==null}function Dn(e){return We(e)?(Array.isArray(e.attachmentIds)?e.attachmentIds:Array.isArray(e.imageIds)?e.imageIds:[]).filter(a=>typeof a=="string"):[]}function Bn(e,t){if(!Array.isArray(e))return[];let a=[];for(let o of e){if(!We(o)||typeof o.id!="string")continue;let n=o.kind==="image"||o.kind==="file"?o.kind:void 0;if(n===void 0)continue;let i=We(o.file)?o.file:void 0,r=typeof i?.name=="string"?i.name:"",d=typeof i?.size=="number"&&Number.isFinite(i.size)?i.size:void 0,h=We(t)&&We(t[o.id])?t[o.id]:void 0,u=h?.status==="uploading"||h?.status==="ready"||h?.status==="error"?h.status:void 0;a.push({id:o.id,kind:n,name:r,...d===void 0?{}:{bytes:d},...n==="file"&&u!==void 0?{status:u}:{}})}return a}function Cs(e){if(e<1024)return`${e} B`;let t=["KB","MB","GB"],a=e/1024,o=0;for(;a>=1024&&o<t.length-1;)a/=1024,o+=1;return`${a>=10?Math.round(a):Math.round(a*10)/10} ${t[o]}`}function As(e){let t=new Map;for(let a of e)t.set(a.name,(t.get(a.name)??0)+1);return e.map((a,o)=>({v:1,id:a.id,kind:a.kind,name:a.name,ordinal:o+1,ambiguous:a.name===""||(t.get(a.name)??0)>1}))}function qn(e,t){return e.name===""?t.unnamed(e.ordinal):e.name}function Ls(e,t,a){if(a||t.includes("/"))return!1;let o=t.trim().toLowerCase();return o===""||e.toLowerCase().includes(o)}function Wn(e,t,a,o){let n=t.trim().toLowerCase(),i=[];for(let[r,d]of As(e).entries()){let h=e[r];if(h===void 0)continue;let u=qn(d,o);if(!Ls(u,t,a))continue;let s=[h.kind==="image"?o.kindImage:o.kindFile];h.bytes!==void 0&&s.push(Cs(h.bytes)),h.status==="uploading"?s.push(o.uploading):h.status==="error"&&s.push(o.failed),i.push({rank:n!==""&&u.toLowerCase().startsWith(n)?0:1,index:r,row:{name:u,description:s.join(" · "),icon:"file",section:o.section,value:JSON.stringify(d)}})}return i.sort((r,d)=>r.rank-d.rank||r.index-d.index),i.map(r=>r.row)}function Vn(e){if(typeof e!="string")return;let t;try{t=JSON.parse(e)}catch{return}if(!We(t)||t.v!==1)return;let{id:a,kind:o,name:n,ordinal:i,ambiguous:r}=t;if(!(typeof a!="string"||o!=="file"&&o!=="image"||typeof n!="string")&&!(typeof i!="number"||!Number.isInteger(i)||i<1||typeof r!="boolean"))return{v:1,id:a,kind:o,name:n,ordinal:i,ambiguous:r}}function Rs(e,t){return`@${t.mention}:${e.name===""?`#${e.ordinal}`:e.name}`}function ka(e,t){let a=Vn(e);if(a!==void 0)return{source:Ct,ref:JSON.stringify(a),label:qn(a,t),appearance:"file",clipboardText:Rs(a,t)}}function jn(e){let t=Vn(e);if(t===void 0)throw new Error(`${Ct}: unrecognized attachment reference`);let a=t.kind==="image"?"Image":"File",o=t.name===""?a:`${a} ${JSON.stringify(t.name)}`;return t.ambiguous?`[attachment #${t.ordinal}: ${o}]`:`[attachment: ${o}]`}var Kn="pocketMobileNav.attachments",Ps={section:"本次附件","kind.file":"文件","kind.image":"图片","status.uploading":"上传中","status.failed":"上传失败",unnamed:"附件 {n}",mention:"附件"},Os={section:"Attachments in this message","kind.file":"File","kind.image":"Image","status.uploading":"Uploading","status.failed":"Upload failed",unnamed:"Attachment {n}",mention:"attachment"};function Fs(e,t){let a=e.get("sessions"),o=e.get("conversation"),n=a?.scope?.(t);if(n===void 0||o?.input?.for===void 0)return[];let i=Dn(o.input.for(n)?.state?.getSnapshot());if(i.length===0)return[];let r=typeof o.resolveDraftAttachments=="function"?o.resolveDraftAttachments(i):typeof o.draftImages=="function"?o.draftImages(i):void 0;return Bn(r,o.fileUploads?.getSnapshot())}function Ea(e){let t=e.locale.bind(Kn);return{section:t("section"),kindFile:t("kind.file"),kindImage:t("kind.image"),uploading:t("status.uploading"),failed:t("status.failed"),unnamed:a=>t("unnamed",{n:a}),mention:t("mention")}}function Is(e){return{trigger:"@",name:Ct,order:-10,showGroupTitle:!1,candidates(t,a){if(a.signal.aborted)return Promise.resolve([]);try{return Promise.resolve(Wn(Fs(e,t.sessionId),a.query,a.drilled===!0,Ea(e)))}catch{return Promise.resolve([])}},onPick({candidate:t}){let a=ka(t.value,Ea(e));return a===void 0?void 0:{insert:a}},codec:{clipboardText:t=>ka(t,Ea(e))?.clipboardText??"",serialize:t=>{try{return Promise.resolve(jn(t))}catch(a){return Promise.reject(a)}}}}}function Un(e){e.effect(()=>e.locale.register(Kn,{zh:Ps,en:Os}),"dsh-web-mobile: attachment mention dictionaries"),e.inject(["inputTriggers"],t=>{H(t,"dsh-web-mobile: attachment mention source",()=>{let a=t.get("inputTriggers");if(typeof a?.registerSource=="function")return a.registerSource(Is(t))})})}var At="pocketMobileNavFileShare",$n={share:"分享",shareFile:"分享「{name}」",downloadFile:"下载「{name}」",sharing:"正在准备文件…",downloadedUnsupported:"当前环境不支持直接分享；已开始下载，请在系统保存位置确认",downloadedTooLarge:"文件超过 50 MB；已开始下载，请在系统保存位置确认",downloadedShareFailed:"分享未能完成；已开始下载，请在系统保存位置确认",errorTooLarge:"文件太大（超过 200 MB），无法在手机端分享或下载",errorNotFound:"文件不存在或已被移动",errorGeneric:"分享失败：{message}"},Gn={share:"Share",shareFile:'Share "{name}"',downloadFile:'Download "{name}"',sharing:"Preparing file…",downloadedUnsupported:"Direct sharing is unavailable here; a download has started — confirm it at the location your system shows",downloadedTooLarge:"The file is over 50 MB; a download has started — confirm it at the location your system shows",downloadedShareFailed:"Sharing did not finish; a download has started — confirm it at the location your system shows",errorTooLarge:"The file is too large (over 200 MB) to share or download on mobile",errorNotFound:"The file no longer exists or was moved",errorGeneric:"Share failed: {message}"};var K=require("react"),Ds=Ua(require("@deepseek-ai/dsh-client-ui-primitives"),1);var ie=class extends Error{code;constructor(t,a){super(a),this.code=t,this.name="FileShareError"}};function Hs(e){let t=e.code??"";return t==="workspace-file/too-large"?new ie("too-large",e.message??t):t==="workspace-file/not-found"||t==="workspace-file/not-regular-file"?new ie("not-found",e.message??t):new ie("read-failed",e.message??(t||"read failed"))}async function Xn(e,t,a,o=1048576,n=209715200){let i=[],r=0;for(;;){a.throwIfAborted();let d=await e(t,{offset:r,length:o},a);if(a.throwIfAborted(),!d.ok)throw Hs(d.error);let{data:h,eof:u,bytes:s}=d.value;if(s!==void 0&&s>n)throw new ie("too-large",`${t}: ${s} bytes exceed the ${n} byte share cap`);if(i.push(new Uint8Array(h)),r+=h.length,r>n)throw new ie("too-large",`${t}: more than ${n} bytes`);if(u||h.length===0)break}return{parts:i,size:r}}function Ns(e){return typeof e=="object"&&e!==null&&e.name==="AbortError"}function Lt(e){return e.share!==void 0&&e.canShare!==void 0}async function Zn(e,t){if(e.size>(t.shareMax??52428800))return t.download(e),{kind:"downloaded",reason:"too-large"};let a=t.share;if(a===void 0)return t.download(e),{kind:"downloaded",reason:"unsupported"};let o=!1;try{o=t.canShare?.({files:[e]})===!0}catch{o=!1}if(!o)return t.download(e),{kind:"downloaded",reason:"unsupported"};try{return await a({files:[e],title:e.name}),{kind:"shared"}}catch(n){return Ns(n)?{kind:"cancelled"}:(t.download(e),{kind:"downloaded",reason:"share-failed"})}}var zs={txt:"text/plain",log:"text/plain",md:"text/markdown",markdown:"text/markdown",csv:"text/csv",tsv:"text/tab-separated-values",json:"application/json",xml:"application/xml",yaml:"text/yaml",yml:"text/yaml",html:"text/html",htm:"text/html",css:"text/css",js:"text/javascript",mjs:"text/javascript",ts:"text/plain",tsx:"text/plain",py:"text/plain",sh:"text/plain",svg:"image/svg+xml",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",webp:"image/webp",bmp:"image/bmp",heic:"image/heic",avif:"image/avif",mp3:"audio/mpeg",wav:"audio/wav",m4a:"audio/mp4",ogg:"audio/ogg",mp4:"video/mp4",mov:"video/quicktime",webm:"video/webm",pdf:"application/pdf",zip:"application/zip",gz:"application/gzip",tar:"application/x-tar",doc:"application/msword",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",xls:"application/vnd.ms-excel",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",ppt:"application/vnd.ms-powerpoint",pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation"};function Rt(e){return e.split(/[/\\]+/).filter(Boolean).at(-1)??e}function Yn(e){let t=e.lastIndexOf(".");return t<=0?"application/octet-stream":zs[e.slice(t+1).toLowerCase()]??"application/octet-stream"}var Pt=Ds,Qn=["IconShareOutlineRegular","IconShareOutline16"].map(e=>Pt[e]).find(e=>typeof e=="function"),Jn=["IconWarningOutlineRegular","IconWarningOutline16"].map(e=>Pt[e]).find(e=>typeof e=="function"),Ta=typeof Pt.Toast=="function"?Pt.Toast:void 0,ei='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5v8.5M8 1.5 5 4.5M8 1.5l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 7H4a1.5 1.5 0 0 0-1.5 1.5v4A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5v-4A1.5 1.5 0 0 0 12 7h-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',ti='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.5v8.5M8 10 5 7M8 10l3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 12.5H4A1.5 1.5 0 0 0 2.5 14v.5h11V14A1.5 1.5 0 0 0 12 12.5h-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';function Bs(){return React.createElement("span",{"aria-hidden":"true",dangerouslySetInnerHTML:{__html:ti}})}function qs(){return Qn!==void 0?React.createElement(Qn,{size:16}):React.createElement("span",{"aria-hidden":"true",dangerouslySetInnerHTML:{__html:ei}})}function Ws(e){document.querySelector('[data-mobile-nav="file-share-toast"]')?.remove();let t=document.createElement("div");t.dataset.mobileNav="file-share-toast",t.setAttribute("role","status"),t.textContent=e,document.body.appendChild(t),setTimeout(()=>t.remove(),3e3)}function ai(e,t){return Lt(Ot())?e("shareFile",{name:t}):e("downloadFile",{name:t})}function Vs(e,t){return e.kind!=="downloaded"?null:e.reason==="too-large"?t("downloadedTooLarge"):e.reason==="share-failed"?t("downloadedShareFailed"):t("downloadedUnsupported")}function js(e,t){if(e instanceof ie){if(e.code==="too-large")return t("errorTooLarge");if(e.code==="not-found")return t("errorNotFound")}return t("errorGeneric",{message:e instanceof Error?e.message:String(e)})}function Ks(e){let t=URL.createObjectURL(e),a=document.createElement("a");a.href=t,a.download=e.name,a.rel="noopener",a.style.display="none",document.body.appendChild(a),a.click(),a.remove(),setTimeout(()=>URL.revokeObjectURL(t),3e4)}function Ot(){let e=navigator,t=window.DSHA;return{canShare:typeof t?.canShareFile=="function"?a=>a.files.length===1&&t.canShareFile(a.files[0]):typeof e.canShare=="function"?a=>e.canShare(a):void 0,share:typeof t?.shareFile=="function"?a=>t.shareFile(a.files[0]):typeof e.share=="function"?a=>e.share(a):void 0,download:Ks}}function oi(e,t,a){let[o,n]=(0,K.useState)(null),[i,r]=(0,K.useState)(null),d=(0,K.useRef)(null),h=(0,K.useRef)(0),u=(0,K.useRef)({sessionId:e,readFileRange:t,t:a});u.current={sessionId:e,readFileRange:t,t:a},(0,K.useEffect)(()=>()=>d.current?.abort(),[]);let s=(0,K.useCallback)(x=>{if(Ta===void 0){Ws(x);return}h.current+=1,r({seq:h.current,text:x})},[]),c=(0,K.useCallback)(x=>{if(d.current!==null)return;let w=new AbortController;d.current=w,n(x);let{sessionId:R,readFileRange:T,t:E}=u.current;(async()=>{let{parts:g}=await Xn((M,A,O)=>T(R,M,A,O),x,w.signal),y=Rt(x),C=new File(g,y,{type:Yn(y)}),P=await Zn(C,Ot()),k=Vs(P,E);k!==null&&s(k)})().catch(g=>{w.signal.aborted||(console.warn("[dsh-web-mobile] file share failed:",g),s(js(g,E)))}).finally(()=>{d.current===w&&(d.current=null),w.signal.aborted||n(null)})},[s]),l=i===null||Ta===void 0?null:React.createElement(Ta,{key:i.seq,text:i.text,...Jn===void 0?{}:{icon:React.createElement(Us,null)},onDone:()=>r(null)});return{busyPath:o,share:c,toast:l}}function Us(){let e=Jn;return e===void 0?null:React.createElement(e,null)}function ni({absolutePath:e,sessionId:t,readFileRange:a,t:o}){let{busyPath:n,share:i,toast:r}=oi(t,a,o),d=n!==null;return React.createElement(React.Fragment,null,React.createElement("button",{type:"button","data-mobile-nav":"file-share-preview","aria-label":d?o("sharing"):ai(o,Rt(e)),"aria-busy":d,disabled:d,onClick:()=>i(e)},Lt(Ot())?React.createElement(qs,null):React.createElement(Bs,null)),r)}var Mt="file-share-row";function ii({sessionId:e,readFileRange:t,t:a}){let{busyPath:o,share:n,toast:i}=oi(e,t,a),r=(0,K.useRef)(null),d=(0,K.useRef)({busyPath:o,share:n,t:a});d.current={busyPath:o,share:n,t:a};let h=(0,K.useRef)(null);return(0,K.useEffect)(()=>{let s=(r.current?.closest('[data-files-state="tree"]')??null)?.querySelector("[data-files-body]")??null;if(s===null)return;let c=T=>{T.preventDefault(),T.stopPropagation();let v=T.currentTarget.parentElement?.getAttribute("data-files-path");v&&d.current.share(v)},l=()=>{let{busyPath:T,t:E}=d.current;for(let v of s.querySelectorAll(`[data-mobile-nav="${Mt}"]`))v.parentElement?.getAttribute("data-files-entry")!=="file"&&v.remove();for(let v of s.querySelectorAll('li[data-files-entry="file"]')){let g=v.querySelector(`:scope > [data-mobile-nav="${Mt}"]`);g===null&&(g=document.createElement("button"),g.type="button",g.dataset.mobileNav=Mt,g.innerHTML=Lt(Ot())?ei:ti,g.addEventListener("click",c),v.appendChild(g));let y=v.getAttribute("data-files-path")??"",C=T!==null&&T===y,P=C?E("sharing"):ai(E,Rt(y)),k=T!==null;g.getAttribute("aria-label")!==P&&g.setAttribute("aria-label",P),g.disabled!==k&&(g.disabled=k),C?g.setAttribute("aria-busy","true"):g.removeAttribute("aria-busy")}};h.current=l;let x=0,w=()=>{x===0&&(x=requestAnimationFrame(()=>{x=0,l()}))},R=new MutationObserver(w);return R.observe(s,{childList:!0,subtree:!0}),l(),()=>{R.disconnect(),x!==0&&cancelAnimationFrame(x),h.current=null;for(let T of s.querySelectorAll(`[data-mobile-nav="${Mt}"]`))T.removeEventListener("click",c),T.remove()}},[]),(0,K.useEffect)(()=>{h.current?.()},[o,a]),React.createElement(React.Fragment,null,React.createElement("span",{hidden:!0,"data-mobile-nav":"file-share-anchor",ref:r}),i)}function ri(e){e.inject(["slots","locale","remote","remote.workspaceFiles"],t=>{t.effect(()=>t.locale.register(At,{zh:$n,en:Gn}),"dsh-web-mobile: file-share dictionaries");let a=t.remote,o=()=>({readFileRange:(n,i,r,d)=>a.workspaceFiles.readBytes(n,i,{range:r},d)});H(t,"dsh-web-mobile: file share",()=>{let n=[t.slots.inject("sidebar.right.tab.document.actions",()=>t.slots.register({name:"sidebar.right.tab.document.actions",id:"mobile-nav-file-share",order:100,locale:At,inject:o},ni)),t.slots.inject("sidebar.right.tab.files.actions",()=>t.slots.register({name:"sidebar.right.tab.files.actions",id:"mobile-nav-file-share-rows",order:100,locale:At,inject:o},ii))];return()=>{for(let i of n)i()}})})}function si(e){if(typeof e!="object"||e===null)return null;let t=e.selectPanel;return typeof t!="function"?null:()=>{t.call(e,null)}}var li='[class*="panelRow"][aria-current="page"]',Ca=!1,_a=null,Sa=null;function Aa(){let e=Sa;return e!==null&&e.isConnected&&e.matches(li)?!0:(Sa=document.querySelector(li),Sa!==null)}function di(){return!Ca&&Aa()}var ci="data-mobile-panel-exit",$s=2e3,Gs="panel-ghost",Xs=280,Zs='[data-mobile-nav="frame"] [class*="_centerCol"] > * > *';function pi(e){let t=si(e),a=t!==null,o=!1,n=!1,i=null,r=0,d=null,h=null,u=null,s=Symbol("panel-exit");function c(){let g=D();if(g===null)return[];let y=[];for(let C of g.querySelectorAll('[class*="_centerCol"]')){let P=C.firstElementChild?.firstElementChild;if(P instanceof HTMLElement)for(let k of P.getAnimations())k.playState!=="idle"&&y.push(k)}return y}function l(){if(o){if(i!==null&&(window.clearTimeout(i),i=null),r!==0&&(cancelAnimationFrame(r),r=0),_a===s){let g=D();g!==null&&g.removeAttribute(ci),Ca=!1,_a=null}o=!1}}function x(){h!==null&&(window.clearTimeout(h),h=null);let g=d;d=null,g!==null&&(u!==null&&g.removeEventListener("animationend",u,!0),u=null,g.remove())}function w(g){if(n||!o)return;let y=c();if(y.length===0){if(g<2){r=requestAnimationFrame(()=>{r=0,w(g+1)});return}l();return}let C=0;for(let P of y){let k=P.effect?.getTiming(),M=typeof k?.delay=="number"?k.delay:0,A=typeof k?.duration=="number"?k.duration:0,O=typeof k?.iterations=="number"?k.iterations:1;C=Math.max(C,M+A*O),P.finished.then(()=>l(),()=>l())}i=window.setTimeout(l,Math.min($s,Math.max(250,C+200)))}function R(){if(!Aa())return null;let g=document.querySelector(Zs);return g instanceof HTMLElement?g:null}function T(g){x();let y=document.createElement("div");return y.dataset.mobileNav=Gs,y.setAttribute("aria-hidden","true"),y.append(g.cloneNode(!0)),document.body.append(y),y}let E=()=>{if(n||!a||o)return;o=!0,Ca=!0,_a=s;let g=D();g!==null&&g.setAttribute(ci,"");let y=R();d=y===null?null:T(y);try{t()}finally{if(r=requestAnimationFrame(()=>{r=0,w(0)}),d!==null){let C=d;u=P=>{P.animationName==="dsh-web-mobile-panel-ghost-out"&&x()},C.addEventListener("animationend",u,!0),h=window.setTimeout(x,Xs+120)}}};function v(){n=!0,l(),x()}return{exit:E,supported:a,panelOpen:Aa,task:Ys(E,a),dispose:v}}function Ys(e,t){let a=!1,o=!1,n=!1,i=null;function r(){n=!1,i!==null&&(window.clearTimeout(i),i=null)}function d(){n=!0,i!==null&&window.clearTimeout(i),i=window.setTimeout(r,1200);try{history.back()}catch{r()}}function h(){if(n){r();return}a&&(a=!1,di()&&e())}function u(){o||(window.addEventListener("popstate",h),o=!0)}function s(){o&&(window.removeEventListener("popstate",h),o=!1)}return{name:"panel-back-exit",scopes:["*"],ensure:()=>{if(t){if(u(),di()){if(a)return;a=!0;try{history.pushState({mobilePanelExit:!0},"")}catch{a=!1}return}a&&(a=!1,d())}},dispose:()=>{s(),r(),a&&(a=!1,d())}}}function hi(e,t){H(e,"dsh-web-mobile: panel row returns to conversation",()=>{let a=o=>{let n=o.target;if(!(n instanceof Element)||typeof n.closest!="function")return;let i=n.closest('[class*="panelRow"]');i!==null&&i.getAttribute("aria-current")==="page"&&(o.preventDefault(),o.stopPropagation(),t())};return document.addEventListener("click",a,!0),()=>document.removeEventListener("click",a,!0)})}var Qs=/[?,]dsh-web-mobile\/client\.js/;function Js(e){if(typeof e!="string"||e==="")return null;try{let t=new URL(e,"http://x").searchParams.get("rev");return t===null||t===""?null:t}catch{return null}}function el(){for(let e of document.head.querySelectorAll('script[src], link[rel="preload"]')){let t=e.getAttribute("src")??e.getAttribute("href");if(t!==null&&Qs.test(t))return Js(t)}return null}function ui(e){e.effect(()=>{let t=new URLSearchParams(location.search);if(!t.has("mobile-nav-debug"))return()=>{};let a=[],o=T=>a.push(`ERR ${T.message.slice(0,120)}`),n=T=>a.push(`REJ ${String(T.reason).slice(0,120)}`);window.addEventListener("error",o),window.addEventListener("unhandledrejection",n);let i=document.createElement("div");i.style.cssText=["position:fixed","top:40px","right:6px","z-index:2147483000","background:rgba(0,0,0,.82)","color:#fff","font:11px/1.5 ui-monospace,monospace","padding:8px 10px","border-radius:8px","max-width:94vw","max-height:70vh","overflow:auto","white-space:pre-wrap","pointer-events:none"].join(";");let r=()=>{let T=C=>!!document.querySelector(C),E=C=>{let P=document.querySelector(C);return P===null?"absent":getComputedStyle(P).visibility},v=document.querySelector('[data-mobile-nav="frame"]'),g=()=>{let C=document.querySelector("[data-sidebar-right-panel]");if(C===null)return"absent";let P=C.getBoundingClientRect();return`${C.getAttribute("data-sidebar-right-panel")} pad ${getComputedStyle(C).paddingTop} rect ${Math.round(P.top)},${Math.round(P.left)} ${Math.round(P.width)}x${Math.round(P.height)}`};return[`build rev ${el()??"?"} (diag chips)`,`URL ${location.pathname}${location.search}`,`W ${innerWidth} x ${innerHeight} dpr ${devicePixelRatio}`,`mq≤1023 ${matchMedia(ve).matches}  mq≥1024 ${matchMedia(so).matches}`,`safeTop framePad ${v===null?"n/a":getComputedStyle(v).paddingTop}  rightPanel ${g()}`,`css ${T('style[data-plugin-css*="mobile"]')}  frame ${!!v}`,`previewCol ${E("[data-aionui-preview-col]")}  explorerCol ${E("[data-aionui-explorer-col]")}`,`previewOpen ${v?.hasAttribute("data-aionui-preview-open")??"?"}  explorerOpen ${v?.hasAttribute("data-aionui-explorer-open")??"?"}  previewFull ${v?.hasAttribute("data-mobile-preview-full")??"?"}`,`header ${E("[data-phase] header")}  composer ${T("textarea, [data-composer-input]")}`,`genui cards ${document.querySelectorAll("[data-genui]").length}  panel ${T("[data-genui-panel]")}`,`phase ${document.querySelector("[data-phase]")?.getAttribute("data-phase")??"?"}`,`errs ${a.slice(-5).join(" | ")||"none"}`].join(`
`)},d=()=>{i.textContent=r()};d();let h=0,u=()=>{h===0&&(h=requestAnimationFrame(()=>{h=0,d()}))},s=new MutationObserver(T=>{for(let E of T)if(!(E.target===i||i.contains(E.target))){u();return}});s.observe(document.body,{childList:!0,subtree:!0,attributes:!0});let c=setInterval(d,1500);document.body.appendChild(i);let l=T=>{let E=document.querySelector(T);if(E===null)return"absent";let v=E.getBoundingClientRect();return`${Math.round(v.x)},${Math.round(v.y)} ${Math.round(v.width)}x${Math.round(v.height)}`},x=()=>[r(),`rects toggle ${l('[data-mobile-nav="toggle"]')} files ${l('[data-mobile-nav="files"]')} header ${l("[data-phase] header")} titleCluster ${l('[class*="_titleCluster"]')}`,`chips crea ${l('[class*="SVAs4q_"]')} team ${l("[data-team-action]")} model ${l('[class*="_7KE1Ra_trigger"]')} crumbs ${l('[class*="_crumbs"]')} crumbCurrent ${l('[class*="_crumbCurrent"]')}`,`ua ${navigator.userAgent}`,`screen ${screen.width}x${screen.height} standalone ${matchMedia("(display-mode: standalone)").matches}`,`vv ${visualViewport===null?"n/a":`${Math.round(visualViewport.width)}x${Math.round(visualViewport.height)}@${Math.round(visualViewport.offsetTop)}`}`].join(`
`),w=t.get("beacon")||"http://127.0.0.1:3199/diag",R=setInterval(()=>{fetch(w,{method:"POST",mode:"no-cors",body:x()}).catch(()=>{})},2e3);return()=>{window.removeEventListener("error",o),window.removeEventListener("unhandledrejection",n),s.disconnect(),clearInterval(c),clearInterval(R),i.remove()}},"dsh-web-mobile: debug badge")}var mi=1e4,La=window,Ft=La.__dshaMobileScrollState instanceof WeakMap?La.__dshaMobileScrollState:La.__dshaMobileScrollState=new WeakMap;function fi(){return[...document.querySelectorAll('[data-mobile-nav="frame"] [class*="scrollBody"]')]}function tl(){for(let e of fi())e.scrollTop>0?Ft.set(e,{top:e.scrollTop,savedAt:Date.now(),url:location.href}):Ft.delete(e)}function al(){for(let e of fi()){let t=Ft.get(e);Ft.delete(e),!(!t||Date.now()-t.savedAt>mi||t.url!==location.href)&&requestAnimationFrame(()=>{e.isConnected&&t.url===location.href&&Date.now()-t.savedAt<=mi&&e.scrollTop===0&&(e.scrollTop=t.top)})}}function bi(e){e.effect(()=>e.locale.register(Z,{zh:fo,en:bo}),"dsh-web-mobile: dictionaries"),e.effect(()=>{for(let o of document.querySelectorAll('style[data-plugin-css="dsh-web-mobile/mobile.css"]'))o.remove();let a=document.createElement("style");return a.dataset.plugin="dsh-web-mobile",a.dataset.pluginCss="dsh-web-mobile/mobile.css",a.textContent=ro,document.head.appendChild(a),setTimeout(()=>{a.isConnected&&document.head.appendChild(a)},0),al(),()=>{tl(),a.remove()}},"dsh-web-mobile: styles"),On(e);let t=pi(e.layout);e.effect(()=>{let a=[rn(),Yo(e),Qo(e,t),()=>t.dispose()];return()=>{for(let o of a)o()}},"dsh-web-mobile: reconciler infrastructure"),ln(e),Zo(e),hi(e,t.exit),hn(e),Go(e,dt),pn(e),un(e),bn(e),xn(e),yn(e),kn(e),Sn(e),An(e),Ln(e),Mn(e),Fn(e),In(e),zn(e),Un(e),sn(e),go(e),ri(e),ui(e),e.slots.inject("conversation.session.header.actions",()=>e.slots.register({name:"conversation.session.header.actions",id:"mobile-nav-toggle",order:10,locale:Z,inject:()=>({toggleSidebar:()=>e.layout.toggleSidebar()})},eo)),e.slots.inject("conversation.input.left",()=>e.slots.register({name:"conversation.input.left",id:"mobile-nav-file-upload",order:10,locale:Z,inject:()=>({})},to))}var ol=["添加工作区","添加工作区…","Add workspace","Add workspace…"],gi='[role="tab"], [role="treeitem"], [role="menuitem"], [role="menu"]';function wi(e){let t=(e??"").trim();return t.length<3||t.length>320||/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(t)&&!/^file:\/\//i.test(t)?!1:!!(/^(\/|~\/|\.\.?\/|[A-Za-z]:\\)/.test(t)||/\/[\w.\-]+\.\w{1,12}$/.test(t))}async function nl(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.top="-9999px",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();let a=document.execCommand("copy");return t.remove(),a}catch{return!1}}function vi(e,t){let a=(v,g)=>{let y=t(v);if(g!==void 0)for(let[C,P]of Object.entries(g))y=y.split(`{${C}}`).join(String(P));return y},o=null,n=null,i=v=>{o===null&&(o=document.createElement("div"),o.setAttribute("data-mobile-nav","file-guard-toast"),Object.assign(o.style,{position:"fixed",left:"50%",bottom:"calc(64px + var(--dshp-kb, 0px))",transform:"translateX(-50%)",maxWidth:"84vw",zIndex:"9999",padding:"10px 14px",borderRadius:"10px",background:"rgba(20,22,28,.92)",color:"#fff",fontSize:"13px",lineHeight:"1.4",textAlign:"center",fontFamily:"inherit",boxShadow:"0 4px 16px rgba(0,0,0,.28)",pointerEvents:"none",opacity:"0",transition:"opacity .18s ease"}),document.body.appendChild(o)),o.textContent=v,requestAnimationFrame(()=>{o!==null&&(o.style.opacity="1")}),n!==null&&window.clearTimeout(n),n=window.setTimeout(()=>{o!==null&&(o.style.opacity="0")},2600)},r=null,d=v=>{document.activeElement?.blur(),r?.remove();let y=v.length>65536?`${v.slice(0,65536)}
${t("fileTruncated")}`:v,C=document.createElement("div");C.setAttribute("data-mobile-nav","file-guard-fallback"),Object.assign(C.style,{position:"fixed",left:"max(8px, env(safe-area-inset-left, 0px))",right:"max(8px, env(safe-area-inset-right, 0px))",bottom:"calc(16px + env(safe-area-inset-bottom, 0px) + var(--dshp-kb, 0px))",maxHeight:"45vh",overflow:"auto",zIndex:"10000",padding:"10px 12px",borderRadius:"10px",background:"rgba(20,22,28,.96)",color:"#eee",boxShadow:"0 6px 24px rgba(0,0,0,.4)",WebkitOverflowScrolling:"touch"});let P=document.createElement("div");Object.assign(P.style,{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px",color:"#9aa0a8",marginBottom:"6px"});let k=document.createElement("span");k.textContent=t("fileFallbackTitle");let M=document.createElement("button");M.type="button",M.textContent=t("fileFallbackClose"),Object.assign(M.style,{border:"1px solid #444a52",background:"transparent",color:"#eee",borderRadius:"6px",padding:"2px 10px",fontSize:"12px",cursor:"pointer"}),M.addEventListener("click",()=>{C.remove()});let A=document.createElement("pre");A.textContent=y,Object.assign(A.style,{margin:"0",whiteSpace:"pre-wrap",wordBreak:"break-all",userSelect:"text",WebkitUserSelect:"text",fontSize:"12px",lineHeight:"1.5",fontFamily:"inherit"}),P.append(k,M),C.append(P,A),document.body.appendChild(C),r=C},h=v=>{let g=v.target;if(g===null)return;let y=g.closest("button, a");y!==null&&y.closest("[data-phase]")!==null&&y.closest(gi)===null&&wi(y.textContent)&&(v.preventDefault(),v.stopImmediatePropagation(),i(t("fileGuardMsg")))};document.addEventListener("click",h,!0);let u=(v=document)=>{let g=v.querySelectorAll("button, a");(v instanceof Element&&v.matches("button, a")?[v,...g]:g).forEach(C=>{if(C.getAttribute("data-mobile-nav-copy")==="1"||C.closest("[data-phase]")===null||C.closest(gi)!==null)return;let P=(C.textContent??"").trim();if(!wi(P))return;C.setAttribute("data-mobile-nav-copy","1");let k=document.createElement("button");k.type="button",k.setAttribute("data-mobile-nav","copy-file"),k.textContent=t("fileCopy"),k.addEventListener("click",async M=>{M.preventDefault(),M.stopPropagation();let A=(C.textContent??"").trim().replace(/^file:\/\//i,"");k.disabled=!0,k.textContent="…";try{let O=await e(A);if(!O?.ok){i(O?.error?.message??t("fileCopyFailed"));return}let p=O.value?.content??"",b=O.value?.size??p.length;if(b>2097152){i(a("fileTooLarge",{size:(b/(1024*1024)).toFixed(1)}));return}if(await nl(p)){let L=Math.max(1,Math.round(b/1024));i(a("fileCopyDone",{kb:L}))}else i(t("fileCopyFailedFallback")),d(p)}catch(O){i(O instanceof Error?O.message:t("fileCopyFailed"))}finally{k.disabled=!1,k.textContent=t("fileCopy")}}),C.parentElement?.insertBefore(k,C.nextSibling)})},s=new Map,c='[role="menuitem"],[role="option"],li,button,a',l=v=>{let g=(v.getAttribute("aria-label")||""||v.textContent||"").trim();if(ol.includes(g)){let y=v;s.has(v)||s.set(v,y.style.display),y.style.display="none",v.setAttribute("data-mobile-nav-hide","add-workspace")}},x=v=>{v instanceof Element&&v.matches(c)&&l(v),v.querySelectorAll(c).forEach(l)},w=new Set,R=0,T=()=>{R=0;for(let v of w)v.isConnected&&(u(v),x(v));w.clear();for(let v of s.keys())v.isConnected||s.delete(v)};u(),x(document);let E=new MutationObserver(v=>{for(let g of v){if(g.type==="characterData"){let y=g.target.parentElement;y!==null&&y.childElementCount>0&&w.add(y);continue}g.addedNodes.forEach(y=>{y.nodeType===1?w.add(y):y.nodeType===3&&y.parentElement!==null&&w.add(y.parentElement)})}w.size>0&&R===0&&(R=requestAnimationFrame(T))});return E.observe(document.body,{childList:!0,subtree:!0,characterData:!0}),()=>{document.removeEventListener("click",h,!0),E.disconnect(),R!==0&&cancelAnimationFrame(R),w.clear(),n!==null&&window.clearTimeout(n),o?.remove(),o=null,r?.remove(),r=null,document.querySelectorAll('[data-mobile-nav="copy-file"]').forEach(v=>v.remove()),document.querySelectorAll('[data-mobile-nav-copy="1"]').forEach(v=>v.removeAttribute("data-mobile-nav-copy")),document.querySelectorAll('[data-mobile-nav-hide="add-workspace"]').forEach(v=>{let g=v,y=s.get(v);y!==void 0?g.style.display=y:g.style.removeProperty("display"),s.delete(v),v.removeAttribute("data-mobile-nav-hide")}),s.clear()}}var It="dsh-pocket.layout";function xi({urlValue:e,stored:t,narrowMatch:a}){let o=String(e??"").trim().toLowerCase();return o==="desktop"?"desktop":o==="mobile"?"mobile":t==="desktop"||t==="mobile"?t:a?"mobile":"desktop"}function yi(e){try{if(typeof localStorage>"u")return"";if(e==null)return il();let t=String(e).trim().toLowerCase();try{t==="desktop"||t==="mobile"?localStorage.setItem(It,t):(t==="auto"||t==="")&&localStorage.removeItem(It)}catch{}let a=localStorage.getItem(It);return a==="desktop"||a==="mobile"?a:""}catch{return""}}function il(){try{if(typeof localStorage>"u")return"";let e=localStorage.getItem(It);return e==="desktop"||e==="mobile"?e:""}catch{return""}}var it="pocket",Ra={section:"手机访问",title:"📱 手机访问",subtitle:"手机扫码打开的就是电脑上的这个界面，实时同步",developer:"开发者：大哈",starAsk:"⭐ 顺手留颗 Star，大哈能高兴一整天",starCta:"好，这就去 Star",restarted:"🔄 已重启",reloadFailed:"⚠️ 自动刷新没成功（新进程可能还在启动）",reloadNow:"刷新页面",ok:"知道了",bgHint:"进程在后台运行（不挂终端）。如需停止：{cmd}",updatedRestart:"✅ 已更新 v{ver}，重启生效",updateAutoRestarting:"✅ 已更新 v{ver}，正在自动重启…",updatedOk:"✅ 已更新 v{ver}",updateAvailable:"📦 新版本 v{ver}",updating:"更新中…",updateTo:"更新到 v{ver}",restartingNow:"正在重启生效…",restarting:"重启中…",restartNow:"🔄 重启 dsh web 生效",updatingDetail:"⏳ 更新中（通常 1-2 分钟）· 已等待 {s} 秒",restartingDetail:"⏳ 正在重启生效（通常 10-30 秒）· 已等待 {s} 秒",updatedAutoDetail:"✅ 已更新，正在自动重启生效，请稍候刷新",updatedRestartDetail:"✅ 已更新，重启 dsh web 生效",updateFailed:"❌ 失败：{err}（手动更新：dsh plugin --profile web update dsh-pocket --latest -w）",versionRange:"当前 v{cur} → 最新 v{latest}",wanAccess:"公网访问",pinLabel:"访问密码",modeLabel:"地址模式",advAddress:"高级 · 手动选地址",wanOffHint:"开启后可从任何网络访问（每次开启需确认免责声明）",resetFactory:"🧹 恢复出厂设置",resetGo:"恢复",resetIntro:"设置搞出问题时的临时兜底：清空本机配置并重设随机密码（DSH 的会话、模型、插件配置不受影响）",resetTitle:"⚠️ 确认恢复出厂设置？",resetBody:`将清空并恢复默认：
① 开关：局域网访问=开、访问密码=开、手机端右边栏=开、局域网地址=自动
② 公网：模式回到随机域名，清空 Tunnel Token 与固定域名，并关闭正在运行的公网
③ 密码：公网和局域网都换成新的随机 8 位密码（旧密码立即作废，手机需重新输入）

DSH 自身的会话、模型、插件配置不受影响；此操作不可撤销。`,resetConfirm:"确认恢复",resetDone:"✅ 已恢复出厂设置：设置已清空，密码已换新（手机需重新输入）",resetFailed:"❌ 恢复失败，请重试",lanTitle:"📶 局域网（同一 WiFi）",lanHint:"手机连接同一 WiFi 后扫码即可打开",lanAccess:"局域网访问",lanDisabledHint:"🔒 局域网访问已关闭：手机扫码/链接均不可用（公网不受影响）。点「开」恢复。",lanToggleTitleOff:"关闭局域网访问",lanToggleBodyOff:"关闭后，同一 WiFi 下的手机将无法扫码访问（局域网二维码/链接立即失效）。公网访问不受影响。确定关闭？",lanToggleTitleOn:"开启局域网访问",lanToggleBodyOn:"开启后，同一 WiFi 的手机扫码即可访问（默认需输入局域网密码）。确定开启？",confirm:"确定",lanAddress:"局域网地址",lanAddressAuto:"自动（推荐）",lanPin:"局域网访问密码",on:"开",off:"关",lanPinValue:"🔐 访问密码：{pin}（手机打开需输入；与公网密码分开）",lanPinCustomValue:"🔐 访问密码：{pin}（自定义；手机打开需输入）",refresh:"刷新",customize:"自定义",customizing:"新密码（8–64 位，英文字母或数字）：",save:"保存",cancel:"取消",pinInvalid:"密码必须是 8–64 位英文字母或数字",pinCustomHint:"自定义后开启公网不再自动换新",lanPinOff:"🔓 密码已关闭：扫码直连，无需密码（仅同一局域网设备可访问；公网仍要密码）",lanStarting:"代理未就绪…",mobileRightbar:"手机端右边栏",mobileRightbarHint:"显示原生右边栏入口；普通手机可按需关闭，折叠屏展开后使用更方便",prefsTitle:"手机端偏好",mobilePinchZoom:"手机端两指捏合缩放",mobilePinchZoomHint:"默认关闭：两指捏合禁用、页面锁定 1x；开启后恢复捏合，页面意外被放大时可用它还原",mobileFontSize:"手机端字号",mobileFontSizeHint:"只影响手机上的会话正文，桌面端「字号大小」保持原样；选「跟随桌面」则与桌面一致",mobileFontFollow:"跟随桌面",wanTitle:"🌐 公网（人在外面）",wanHint:"任何网络扫码即用（URL 每次重启自动换新）",wanPin:"🔐 访问密码：{pin}（每次开启公网变新；手机打开链接需输入此密码）",wanPinCustom:"🔐 访问密码：{pin}（自定义，开启公网不再自动换新）",wanEphemeralWarn:"⚠️ 公网链接仅在本次开启期间有效：关闭或重启后失效，并可能被他人复用为陌生网站。请勿收藏，每次从本页扫「当前」二维码。需要固定不变的地址请用下方「固定域名」。",stopTunnel:"关闭公网",enable:"开启公网访问",opening:"开启中…",tunnelMode:"公网模式：",modeQuick:"随机域名（默认）",modeNamed:"固定域名",namedSummary:"固定域名：{host} · Token {token}",namedTokenSet:"已配置",namedTokenMissing:"未配置",namedEdit:"修改",namedHostnameLabel:"固定域名：",namedTokenLabel:"Tunnel Token（留空 = 保持不变）：",namedHow:"在 Cloudflare Zero Trust → Networks → Tunnels 创建隧道并复制 Token；把域名的 Service 指向 http://127.0.0.1:3081（代理端口）。地址固定，重启不再变化。",namedSecurity:"固定域名长期暴露在公网、更易被扫描，建议同时设置自定义强密码（本模式公网密码默认不随重启轮换）。",namedNeedCfg:"请先填写固定域名与 Tunnel Token",namedRunningHint:"固定域名（Cloudflare 命名隧道）——地址不随重启变化",namedTakeEffect:"已保存固定域名配置——需关闭并重新开启公网访问后生效",disclaimerTitle:"⚠️ 安全免责声明",disclaimerBody:"开启公网 = 把本机 DSH（能执行代码）暴露到互联网。任何人拿到公网链接和密码，都能访问甚至操作你的电脑。请确认：① 使用自定义强密码或妥善保管自动密码；② 用完立即「关闭公网」；③ 公司/涉密网络请先确认合规。",disclaimerAgree:"我已知情，同意开启",disclaimerHint:"请勾选「我已知情」后再开启公网",downloading:"⏳ 下载 cloudflared（首次约 20-50MB，通常 1-2 分钟；之后秒开）· 已等待 {s} 秒",connecting:"⏳ 连接 Cloudflare 边缘（通常 5-30 秒）· 已等待 {s} 秒{suffix}",slowHint:" — 有点久？检查是否开着代理/VPN（Clash TUN 等）",error:"❌ 开启失败：{detail}（可重试；若是代理/VPN 问题见 README 排障）",unknownError:"未知错误",feedback:"有问题？欢迎到 GitHub Issues 反馈 🙏",fileGuardMsg:"手机上无法直接打开电脑上的文件",fileCopy:"复制",fileCopyDone:"已复制文件内容（{kb} KB）",fileCopyFailed:"复制失败",fileCopyFailedFallback:"复制失败，下方可长按选择",fileFallbackTitle:"复制失败，长按下方文本选择",fileFallbackClose:"关闭",fileTooLarge:"文件过大（{size}MB），已跳过复制",fileTruncated:"…已截断",copyLink:"复制链接",copied:"✅ 已复制地址",copyFailed:"复制失败，请长按地址手动复制",pinShow:"显示",pinHide:"隐藏"},ki={section:"Phone access",title:"📱 Phone access",subtitle:"The phone shows this exact screen, live",developer:"Developer: daha1216 (大哈)",starAsk:"⭐ Drop a Star if it helped — it makes daha1216’s day",starCta:"★ Star it on GitHub",restarted:"🔄 Restarted",reloadFailed:"⚠️ Auto-reload did not go through (the new process may still be starting)",reloadNow:"Reload",ok:"Got it",bgHint:"Running in the background (not attached to a terminal). To stop: {cmd}",updatedRestart:"✅ Updated to v{ver} — restart to apply",updateAutoRestarting:"✅ Updated to v{ver} — auto-restarting…",updatedOk:"✅ Updated to v{ver}",updateAvailable:"📦 Update available: v{ver}",updating:"Updating…",updateTo:"Update to v{ver}",restartingNow:"Restarting to apply…",restarting:"Restarting…",restartNow:"🔄 Restart dsh web now",updatingDetail:"⏳ Updating (usually 1-2 min) · {s}s elapsed",restartingDetail:"⏳ Restarting to apply (usually 10-30s) · {s}s elapsed",updatedAutoDetail:"✅ Updated — auto-restarting in progress, refresh shortly",updatedRestartDetail:"✅ Updated — restart dsh web to apply",updateFailed:"❌ Failed: {err} (manual update: dsh plugin --profile web update dsh-pocket --latest -w)",versionRange:"Current v{cur} → latest v{latest}",wanAccess:"Public access",pinLabel:"Access PIN",modeLabel:"Address mode",advAddress:"Advanced · Pick address",wanOffHint:"Reachable from any network once enabled (a disclaimer is confirmed on each enable)",resetFactory:"🧹 Factory reset",resetGo:"Reset",resetIntro:"Temporary fallback when settings break: clear local config and re-roll random PINs (DSH sessions, models and plugin config are untouched)",resetTitle:"⚠️ Confirm factory reset?",resetBody:`This clears and restores defaults:
① Switches: LAN access on, access PIN on, mobile right sidebar on, LAN address auto
② Public: mode back to random URL, Tunnel Token and fixed domain cleared, and any running tunnel is stopped
③ PINs: both public and LAN become new random 8-character PINs (old ones stop working; the phone must re-enter)

Your DSH sessions, models and plugin config are untouched. This cannot be undone.`,resetConfirm:"Reset",resetDone:"✅ Factory reset done: settings cleared and PINs re-rolled (re-enter the PIN on your phone)",resetFailed:"❌ Reset failed — please retry",lanTitle:"📶 LAN (same Wi-Fi)",lanHint:"Scan to open once your phone is on the same Wi-Fi",lanAccess:"LAN access",lanDisabledHint:'🔒 LAN access is off — the QR code and link are unavailable (public access is unaffected). Tap "On" to restore.',lanToggleTitleOff:"Turn off LAN access",lanToggleBodyOff:"Once off, phones on the same Wi-Fi can no longer scan to connect (the LAN QR code and link stop working immediately). Public access is unaffected. Turn it off?",lanToggleTitleOn:"Turn on LAN access",lanToggleBodyOn:"Once on, phones on the same Wi-Fi can scan to connect (a LAN PIN is required by default). Turn it on?",confirm:"Confirm",lanAddress:"LAN address",lanAddressAuto:"Auto (recommended)",lanPin:"LAN access PIN",on:"On",off:"Off",lanPinValue:"🔐 PIN: {pin} (required on the phone; separate from the public PIN)",lanPinCustomValue:"🔐 PIN: {pin} (custom; required on the phone)",refresh:"Refresh",customize:"Customize",customizing:"New PIN (8–64 chars, letters/digits): ",save:"Save",cancel:"Cancel",pinInvalid:"PIN must be 8–64 characters (letters and digits only)",pinCustomHint:"custom PINs are not rotated on tunnel start",lanPinOff:"🔓 PIN off — scan & go, no PIN (LAN devices only; public still requires PIN)",lanStarting:"Proxy starting…",mobileRightbar:"Mobile right sidebar",mobileRightbarHint:"Show the native right-sidebar entry; disable it for a compact phone header or keep it on for an unfolded display",prefsTitle:"Mobile preferences",mobilePinchZoom:"Mobile pinch zoom",mobilePinchZoomHint:"Off by default: two-finger pinch disabled, page locked at 1x; turn on to restore pinch for recovering from accidental zoom",mobileFontSize:"Mobile font size",mobileFontSizeHint:'Affects conversation text on the phone only; the desktop "Font size" setting stays as-is. Choose "Follow desktop" to match it.',mobileFontFollow:"Follow desktop",wanTitle:"🌐 Anywhere (public)",wanHint:"Scan from any network (the URL changes on every restart)",wanPin:"🔐 PIN: {pin} (changes each time the tunnel is enabled; required on the phone)",wanPinCustom:"🔐 PIN: {pin} (custom — not rotated on tunnel start)",wanEphemeralWarn:'⚠️ The public link is valid only for this session: it stops working after you close or restart, and may be reused by someone else for an unrelated site. Do not bookmark it — scan the CURRENT QR code from this page each time. For a permanent address use "Fixed domain" below.',stopTunnel:"Stop",enable:"Enable anywhere",opening:"Enabling…",tunnelMode:"Mode:",modeQuick:"Random URL (default)",modeNamed:"Fixed domain",namedSummary:"Fixed domain: {host} · Token {token}",namedTokenSet:"configured",namedTokenMissing:"not set",namedEdit:"Edit",namedHostnameLabel:"Fixed domain:",namedTokenLabel:"Tunnel Token (blank = keep current):",namedHow:"Create a tunnel in Cloudflare Zero Trust → Networks → Tunnels and copy the token; point the hostname's Service at http://127.0.0.1:3081 (the proxy port). The URL stays fixed across restarts.",namedSecurity:"A fixed domain is long-lived and easier to scan — set a strong custom PIN too (the public PIN is not rotated on restart in this mode).",namedNeedCfg:"Set the fixed domain and Tunnel Token first",namedRunningHint:"Fixed domain (Cloudflare named tunnel) — the URL no longer changes on restart",namedTakeEffect:"Fixed-domain config saved — turn public access off and on again to take effect",disclaimerTitle:"⚠️ Security disclaimer",disclaimerBody:"Enabling public access exposes this computer’s DSH (which can execute code) to the internet. Anyone with the public link and PIN can reach — and operate — your computer. Please confirm: ① use a strong custom PIN or keep the auto-generated one safe; ② turn public access OFF as soon as you’re done; ③ on a corporate/classified network, confirm compliance first.",disclaimerAgree:"I understand and agree",disclaimerHint:'Check "I understand" before enabling public access',downloading:"⏳ Downloading cloudflared (first run ~20-50MB, usually 1-2 min; instant afterward) · {s}s elapsed",connecting:"⏳ Connecting to Cloudflare edge (usually 5-30s) · {s}s elapsed{suffix}",slowHint:" — taking long? Check for a proxy/VPN (e.g., Clash TUN)",error:"❌ Failed to enable: {detail} (you can retry; for proxy/VPN issues see the README)",unknownError:"unknown error",feedback:"🙏 Questions? Open an issue on GitHub",fileGuardMsg:"Cannot open a file stored on your computer directly from the phone",fileCopy:"Copy",fileCopyDone:"File content copied ({kb} KB)",fileCopyFailed:"Copy failed",fileCopyFailedFallback:"Copy failed — long-press below to select instead",fileFallbackTitle:"Copy failed — long-press the text below to select it",fileFallbackClose:"Close",fileTooLarge:"File too large ({size}MB), copy skipped",fileTruncated:"… truncated",copyLink:"Copy link",copied:"✅ Address copied",copyFailed:"Copy failed — long-press the address to copy it manually",pinShow:"Show",pinHide:"Hide"};var rl=`/* pocket 控件/门控样式：刻意不加媒体查询——mobileApply 启动时写入的
     body[data-dsh-pocket-layout] 就是门（desktop 布局在写入之后才早退，选择器
     天然不命中；?dsh-layout=mobile 强制移动的宽桌面也依赖这些规则，宽度媒体
     反而会漏掉它）。 */
  /* ---------- iOS 双击智能缩放治理（2026-10-14 真机反馈：双击/轻点页面自己放大） ----------
     根规则 html,body{touch-action:pan-y pinch-zoom} 的交集止于第一个滚动容器
     （上游 layout.css 注释自述），消息/会话/文件等纵向滚动区内部的双击缩放
     一直没被覆盖。对 frame 内的纵向滚动容器补同值：不带 pan-x，左缘抽屉
     手势照旧不被浏览器抢走；pinch-zoom 保留 #45 捏合逃生口；代码块等横向
     滚动内容是更内层的 scroll container，由最内层规则接管，不受影响。 */
  body[data-dsh-pocket-layout="mobile"] [data-mobile-nav="frame"] [class*="scrollBody"] {
    touch-action: pan-y pinch-zoom !important;
  }

  /* ---------- 两指捏合缩放开关（2026-10-14）：默认关，全拦 ----------
     设置层写 body[data-dsh-pocket-pinch-zoom]（默认 off）；off 时去掉
     pinch-zoom 令牌（Android 侧 touch-action 即生效），iOS 侧由下方 H3
     手势锁双向全拦兜底。注意：关闭期间若浏览器自行放大视口（#45 场景）
     将无法捏合还原，只能重开页面——提示文案已写在设置页开关下方。 */
  body[data-dsh-pocket-pinch-zoom="off"],
  body[data-dsh-pocket-pinch-zoom="off"] [data-mobile-nav="frame"] [class*="scrollBody"] {
    touch-action: pan-y !important;
  }

  /* ---------- 宿主没有 aionui explorer 列时隐藏「文件浏览」入口（issue #48） ----------
     官方 DeepSeek Harness 不带 dsh-web-ui；explorer 列存在与否由下方探测 effect
     标到 frame 上（data-mobile-nav-explorer）。没有列时这两个入口点了没反应。 */
  body[data-dsh-pocket-layout="mobile"] [data-mobile-nav-explorer="0"] [data-mobile-nav="files"],
  body[data-dsh-pocket-layout="mobile"] [data-mobile-nav-explorer="0"] [data-mobile-nav="explorer"] {
    display: none !important;
  }

  /* ---------- 隐藏「添加工作区」入口（issue #17 修正：手机上配工作区无意义） ----------
     图标按钮的 aria-label 随语言变化，两种都覆盖；下拉菜单里的文本项由
     fileGuard.ts 的 MutationObserver 按文案兜底隐藏。由布局属性门控：
     桌面窄窗（auto→desktop）不隐藏，强制 mobile 的宽桌面要隐藏。 */
  body[data-dsh-pocket-layout="mobile"] button[aria-label="添加工作区"],
  body[data-dsh-pocket-layout="mobile"] button[aria-label="添加工作区…"],
  body[data-dsh-pocket-layout="mobile"] button[aria-label="Add workspace"],
  body[data-dsh-pocket-layout="mobile"] button[aria-label="Add workspace…"] {
    display: none !important;
  }

  /* ---------- 文件链接旁的「复制」按钮（issue #17：复制文件内容） ----------
     由 fileGuard.ts 注入，这里兜底样式。M10：实体 22→30px 高、字号 11→12px
     （原尺寸在手指下太抠，30px 仍保持行内紧凑视觉）；剩余触距用 ::after 向外
     扩 6px 补足（Apple HIG 44pt 触控标准的折中：实体紧凑、点区达标，与上游
     扩点伪元素同款手法），自身 position:relative 提供扩区的定位上下文。 */
  [data-mobile-nav="copy-file"] {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    margin-left: 6px !important;
    vertical-align: baseline !important;
    position: relative;
    height: 30px !important;
    padding: 0 8px !important;
    border: 1px solid var(--dsw-alias-border-l1, rgba(0, 0, 0, .14)) !important;
    border-radius: 6px !important;
    background: var(--dsw-alias-bg-layer-1, #fff) !important;
    color: var(--dsw-alias-label-primary, inherit) !important;
    font-family: inherit !important;
    font-size: 12px !important;
    line-height: 1 !important;
    cursor: pointer !important;
    -webkit-tap-highlight-color: transparent !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .12) !important;
  }
  [data-mobile-nav="copy-file"]::after {
    content: "";
    position: absolute;
    inset: -6px;
  }
  [data-mobile-nav="copy-file"]:active {
    background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, .06)) !important;
  }
  [data-mobile-nav="copy-file"][disabled] {
    opacity: .55 !important;
    cursor: default !important;
  }
@media (max-width: 1023px) and (pointer: coarse) {
  /* ---------- 右上角双入口冲突治理（0.1.7-rc.2 实测，2026-09-28 合并时发现） ----------
     rc.2 宿主把「右侧栏展开」经 dsh-client-ui-sidebar-right 注入
     conversation.session.header.corner 槽 → header 顶层 div[data-conversation-
     header-corner]（稳定属性，代际安全）。上游 dsh-web-mobile v3.0.3 的两条 corner
     规则分别锚 0.1.6-alpha.2（titleRow 内 + wSkVaW_ 哈希前缀）与 0.1.5（:first-child
     > :last-child）——rc.2 上结构与哈希都已变（D_tfqW_、corner 移到 header 顶层），
     两条全不命中 → 原生 corner 与插件绝对定位的 files 按钮（right:8px）叠在右上角。
     解法取自 dsh-pocket 上游（其 mobile.css.ts 用同一稳定属性 + 本开关）：
     - mobileRightbarEnabled=off → 藏原生 corner，files 独占右上角（web-mobile 的
       设计几何）；
     - 开关默认 on → corner 可见，files 左移 44px 让位（数值同上游实测）。
     特异性：本组覆盖选择器 (0,3,x) 均高于被覆盖的 (0,1,0)/(0,5,1 旧结构规则在
     rc.2 本就不命中)，不赌标签顺序。两态都带 body[data-dsh-pocket-layout] 门：
     桌面布局不藏宿主原生入口。 */
  html body[data-dsh-pocket-layout="mobile"][data-dsh-pocket-mobile-rightbar="off"] [data-conversation-header-corner] {
    display: none !important;
  }
  body[data-dsh-pocket-layout="mobile"]:not([data-dsh-pocket-mobile-rightbar="off"]) [data-conversation-header-corner] {
    display: flex !important;
    flex: 0 0 auto !important;
    margin-left: 4px !important;
    margin-right: 0 !important;
  }
  body[data-dsh-pocket-layout="mobile"]:not([data-dsh-pocket-mobile-rightbar="off"]) [data-conversation-header-corner] button {
    width: 36px !important;
    height: 36px !important;
    min-width: 36px !important;
    min-height: 36px !important;
  }
  body[data-dsh-pocket-layout="mobile"]:not([data-dsh-pocket-mobile-rightbar="off"]) [data-mobile-nav="files"] {
    right: 44px !important;
  }

  /* ---------- 移动端独立字号（2026-10-18 用户要求：手机调字号不影响桌面） ----------
     宿主把「字号大小」写在 body 的 --dsh-content-font-size 上，delta / secondary /
     markdown 字号 token 等派生值全部由它 calc。这里只在「手机布局 + 用户选了独立
     字号」两个条件同时成立时替换这一个轴；!important 用于压过宿主写在 body 上的
     内联值，桌面布局选择器不命中，桌面字号保持原样。 */
  body[data-dsh-pocket-layout="mobile"][data-dsh-pocket-mobile-font] {
    --dsh-content-font-size: var(--dsh-pocket-mobile-font-size) !important;
  }

  /* ---------- 会话行悬停卡片 ----------
     宿主把它挂在 body 下（不在 [data-phase] 内，上游的 tooltip 抑制规则够不着）。
     触屏点一下会话行会模拟 hover，卡片残留在抽屉右侧并溢出屏幕。
     选择器刻意不用「body >」直接子匹配：宿主经 portal 容器挂载时会隔一层 div，
     直接子匹配会漏（卡片类名 _card/_copyable + role=button 组合只属于这类悬停
     卡，去掉大于号不会误伤消息卡）。 */
  body [role="button"][class*="_card"][class*="_copyable"] {
    display: none !important;
  }

  /* ---------- 新会话页多余的右边栏开关 ----------
     宿主 headerBlank 的 titleRow 把「打开右侧边栏」塞在左上角（会话页在右上角
     是对的），紧贴 pocket 的 FAB，看着像多出来的按钮。新会话阶段没有右栏内容，
     直接隐藏；会话页（phase=active）不受影响。 */
  [data-phase="hero"] button[data-sidebar-right-expand] {
    display: none !important;
  }

  /* ---------- 小触点扩大点击区（粗指针） ----------
     宿主按钮普遍只有 22–28px：输入栏（加号/访问模式/模型）、会话头部
     （智能体团队 22×24/更多操作/Watcher/侧边栏开关）、抽屉（搜索/视图选项/
     收起侧边栏/新建会话/展开其余）、hero 的工作区与模式选择器。
     用伪元素把可点区向外扩，不改布局；相邻按钮的实体盒在自己的层绘制，
     不会被邻位的扩区抢走核心点击。分两档（实测间距定值）：
     - 紧凑档 -5px -2px：hero 工作区行 gap:2、会话头部工具组 gap:4、抽屉图标/
       列表行紧邻——横向最多 -2px，恰好吃满 2px 缝隙、绝不越界进邻盒；
     - 输入卡档 -8px：卡内行 gap:12/8，四向扩张都只落在空隙里。
     两档都加 :not(:disabled)：禁用按钮不派发 click，扩区若越到邻位会变成
     按不着的死条。三条边界（均实测核对过 computed ::after）：① 会话头部 tabs
     （对话/轨迹/版本/分叉）自带装饰性 ::after（选中下划线 inset:27px 0 -1），
     套我们的 inset 会把下划线撑成大色块——绝不扩它们；② 消息流内密集小操作簇
     （复制/编辑/反馈，间距仅几像素）不扩——互相抢点反而更难点；③ 抽屉整棵树
     挂在 [data-phase] 之外（实测 inPhase=false），抽屉控件的选择器必须不带
     [data-phase] 前缀，否则永远匹配不到（这些 aria-label 只属于抽屉，去掉
     前缀无误伤）。④ v3.0.3 起设置 sheet/快捷键弹层 portal 到 body，无 [data-phase]
     前缀的 aria-label 选择器一律加 :not([aria-modal] *)，弹层内同文案按钮不扩点
     （弹层自带足够密度的布局，误扩会盖邻位）。 */
  [data-phase] [data-composer-card] button:not(:disabled),
  [data-phase="hero"] button:not([data-mobile-nav]):not(:disabled),
  button[aria-label*="侧边栏"]:not(:disabled):not([aria-modal] *),
  button[aria-label*="right sidebar" i]:not(:disabled):not([aria-modal] *),
  button[aria-label*="搜索会话"]:not(:disabled):not([aria-modal] *),
  button[aria-label*="视图选项"]:not(:disabled):not([aria-modal] *),
  button[aria-label*="新建会话"]:not(:disabled):not([aria-modal] *),
  button[aria-label*="展开其余"]:not(:disabled):not([aria-modal] *),
  [data-phase] button[aria-label*="智能体团队"]:not(:disabled),
  [data-phase] button[aria-label*="更多操作"]:not(:disabled),
  [data-phase] button[aria-label^="Watcher"]:not(:disabled) {
    position: relative;
  }
  /* 紧凑档：横向 -2px 吃满最小缝（gap:2/4），纵向 -5px。 */
  [data-phase="hero"] button:not([data-mobile-nav]):not(:disabled)::after,
  button[aria-label*="侧边栏"]:not(:disabled):not([aria-modal] *)::after,
  button[aria-label*="right sidebar" i]:not(:disabled):not([aria-modal] *)::after,
  button[aria-label*="搜索会话"]:not(:disabled):not([aria-modal] *)::after,
  button[aria-label*="视图选项"]:not(:disabled):not([aria-modal] *)::after,
  button[aria-label*="新建会话"]:not(:disabled):not([aria-modal] *)::after,
  button[aria-label*="展开其余"]:not(:disabled):not([aria-modal] *)::after,
  [data-phase] button[aria-label*="智能体团队"]:not(:disabled)::after,
  [data-phase] button[aria-label*="更多操作"]:not(:disabled)::after,
  [data-phase] button[aria-label^="Watcher"]:not(:disabled)::after {
    content: "";
    position: absolute;
    inset: -5px -2px;
  }
  /* 输入卡档（放最后：与 hero 规则同等特异性，靠后声明让卡内按钮拿到 -8px）。 */
  [data-phase] [data-composer-card] button:not(:disabled)::after {
    content: "";
    position: absolute;
    inset: -8px;
  }

  /* ---------- H5 横屏刘海 safe-area 左右缘 ----------
     全项目（上游 + 本层）此前零处 safe-area-inset-left/right：上游只处理了竖屏的
     top（状态栏）与 bottom（home indicator）。iPhone 横屏（宽 844-932px，仍
     <1024，移动布局激活）时刘海落在屏幕左右缘，FAB（上游 base.css.ts left:10px）、
     抽屉内容、底部 sheet（上游一律 left/right:8px）会被刘海压住。
     为何放 POCKET_EXTRA_CSS：upstream/ 是整目录同步的上游镜像（sync 脚本覆盖，
     手改必丢——零手改原则），只能在 pocket 层以同特异性 + 后加载 + !important 压过。
     为何这一段（与本文件其它段不同）套媒体查询：被覆盖的上游规则本身全部住在
     (max-width:1023px) and (pointer:coarse) 臂内，覆盖必须与被覆盖同臂——否则
     断点翻宽后上游已回退桌面布局（aionui 列恢复网格列、delete-dialog 卸载），
     这里的 left/right !important 却残留，会把桌面网格列拽离原位。竖屏/无刘海
     设备 env() 恒 0，全部零位移。 */
  @media (max-width: 1023px) and (pointer: coarse) {
    /* a) frame 容器：上游同选择器已写 padding-top（layout.css.ts，竖屏让出状态
       栏），这里补左右两缘——中列（会话头/消息流/输入卡）是 in-flow 子元素，
       吃 frame 的 padding，直接让出刘海。 */
    [data-mobile-nav="frame"],
    div[class*="_frame"]:has(> div[class*="_centerCol"]) {
      padding-left: env(safe-area-inset-left, 0px) !important;
      padding-right: env(safe-area-inset-right, 0px) !important;
    }
    /* 抽屉：绝对定位子元素（containing block = frame 的 padding box），上一条的
       frame padding 挪不动它（padding 不影响绝对定位后代的偏移基准），需要自带
       padding-left 把内容让出左侧刘海；抽屉宽 ≤92vw，右侧到不了屏幕右缘，不需要。 */
    [data-mobile-nav="frame"] > :first-child,
    div[class*="_frame"]:has(> div[class*="_centerCol"]) > :first-child {
      padding-left: env(safe-area-inset-left, 0px) !important;
    }
    /* b) FAB（上游 base.css.ts left:10px）：max() 保证无刘海时仍是 10px。 */
    [data-mobile-nav="fab"] {
      left: max(10px, env(safe-area-inset-left, 0px)) !important;
    }
    /* c) 底部 sheet/面板：上游 base.css.ts 的 delete-dialog 与 compat.css.ts 的
       explorer/preview 两列 sheet 全是 left/right:8px。全屏预览态（compat.css.ts
       的三标记 + full 选择器，特异性更高）不受影响。fileGuard 的长按 fallback
       面板是内联样式，在 fileGuard.ts 里直接写同款 max()。 */
    /* 回归修复：aionui 两列选择器单独加 html 前缀提特异性——上游 compat.css 对
       同名选择器写有同特异性 left/right:8px !important，且其 style 标签用
       setTimeout(0) 把自己重排到 head 末尾（同特异性 + !important 对拼时后加载
       者胜，纯赌顺序），赌输则本覆盖整条失效。html 前缀加一档特异性后无论谁
       排在后都稳赢。delete-dialog 不加前缀：上游 base.css 对它没有同值竞争，
       !important 已稳赢，无需陪绑。 */
    [data-aionui-explorer-col],
    html [data-aionui-explorer-col],
    html [data-aionui-preview-col] {
      left: max(8px, env(safe-area-inset-left, 0px)) !important;
      right: max(8px, env(safe-area-inset-right, 0px)) !important;
    }

    /* ---------- M3 键盘期 overlay 协调 ----------
       iOS 软键盘弹起只收缩 visual viewport，fixed 元素仍锚 layout viewport。
       --dshp-kb 由 mobile-apply.tsx 的 effect 监听 visualViewport resize/scroll
       按帧写入 documentElement；键盘收起或 Android（resize 整个视口，差值 ≈0）时
       恒 0px，规则退化为无位移。fileGuard 的 toast/fallback 是内联样式，直接在
       fileGuard.ts 用该变量。FAB 无需处理：它是 frame 内绝对定位、top 锚定，
       永远在屏幕上部，键盘盖不到。
       删除确认卡（2026-09-28 v3.0.3 同步后重写）：上游把卡改成 backdrop
       （fixed inset:0 flex 居中）的 position:static 子元素，bottom/left/right 对它
       全部无效（旧覆盖已死）。改用 translateY 抬升半键盘高——卡原居屏幕中线，
       键盘占掉下半屏后抬一半正好让按钮带留在可视区；0px 时零位移。 */
    [data-mobile-nav="delete-dialog"] {
      transform: translateY(calc(-0.5 * var(--dshp-kb, 0px))) !important;
    }

    /* ---------- M3b 键盘期 composer 座位抬升（2026-09-29 真机反馈：键盘挡住输入内容） ----------
       宿主只在 [data-phase=active]（有内容的会话）给座位 position:sticky;bottom:0，
       钉在滚动视口底=布局视口底；iOS 与 Android(resizes-visual) 的软键盘只收缩
       visual viewport、布局视口不动 → 座位连同输入行整排沉到键盘底下。hero 态
       （空会话）座位更是静态居中，同样被键盘盖。键盘开态统一补 sticky + 把偏移
       改为键盘高度（html[data-dshp-kb="open"] 由 --dshp-kb 写入方同点维护）：
       sticky 只上推不下压——active 态座位钉到可视视口底；hero 态自然位在阈值之上
       时零位移、被键盘压到时同样自动上抬，一条规则通吃两形态。kb 公式已减
       vv.offsetTop，浏览器为露出焦点而滚动页面时偏移自洽。收起态（属性缺席）
       规则不命中，宿主原定位逐字节保留。刻意不用 translateY：座位子树里的
       fixed 弹层（plus 菜单等）会被 transform 变成 containing block，锚定全乱。
       html 前缀与三锚点选择器族同上游座位 padding 规则（防类名哈希代际漂移），
       特异性手法同 M2。
       键盘开态同时置 transform:none（10-14 键盘案）：上游 composer-keyboard-lift
       会给座位内联 translateY 抬升——与本规则双抬叠加、且让座位子树 fixed 弹层
       （plus 菜单）失去锚点。统一到 sticky 单机制：!important 压过上游内联样式，
       通道校验 fail-open 时也绝不再漏抬。 */
    html[data-dshp-kb="open"] [data-mobile-nav="frame"] [class*="_composerSeat"],
    html[data-dshp-kb="open"] div[class*="_frame"] [class*="_composerSeat"],
    html[data-dshp-kb="open"] [data-mobile-nav="frame"] [data-phase] [class*="_composerSeat"] {
      position: sticky !important;
      bottom: var(--dshp-kb, 0px) !important;
      transform: none !important;
    }

    /* ---------- iOS standalone 布局视口偏矮兜底（2026-09-28 真机反馈：A2HS 底部留白） ----------
       部分 iOS 版本的 standalone（添加到主屏幕）模式下，100%/dvh 参照的布局视口
       不含底部一段真实窗口（innerHeight < visualViewport.height，键盘收起且未缩放
       时仍成立）。视口守卫 effect（本文件下方）检测到该态持续 600ms 后：写
       --dshp-frame-h（= 可视高度）并给 html 标 data-dsh-pocket-full-height；此处把
       html/body 高度链顶满真实窗口（frame 是 100% 高度链的后代，自然跟着顶满）。
       标记与变量任一缺席时规则不命中，行为与旧版逐字节一致——不赌宿主原始
       html 高度写法是什么。 */
    html[data-dsh-pocket-full-height],
    html[data-dsh-pocket-full-height] body {
      height: var(--dshp-frame-h, 100%) !important;
    }

    /* 10-14 空白案补注：html/body 顶满只对「frame 是纯 100% 高度链后代」成立——
       中间任何一层被 100vh（B 态下 = 矮布局视口，如 660）截断时顶满传导不到
       frame，底部仍空出等于差值的一条带。给 frame 本体（reconciler 的
       data-mobile-nav="frame" 标记；健康态高度本就等值）直接补一跳，双保险。
       max-height 同值：单写 height 会被中间层的 max-height:100vh 压回。 */
    html[data-dsh-pocket-full-height] [data-mobile-nav="frame"] {
      height: var(--dshp-frame-h, 100%) !important;
      max-height: var(--dshp-frame-h, 100%) !important;
    }

    /* ---------- M10 上游小控件触控达标（44pt 触控标准：Apple HIG / WCAG 2.2） ----------
       上游控件以桌面视觉密度定尺寸（28-38px），手指按压容易 miss。upstream 零手改
       原则 → 在本层用 min-* 覆盖（min-height/width 会压过上游的固定 height/width）。 */
    /* 删除确认弹窗两按钮（base.css.ts [data-mobile-nav="delete-confirm-actions"]>button
       height:30px）→ 44px：破坏性操作的确认键不容 miss。 */
    [data-mobile-nav="delete-confirm-actions"] > button {
      min-height: 44px !important;
    }
    /* 抽屉品牌行「导出会话」图标（v3.2.0 起 28×28，issue #225）：不再给 min-height，
       否则会把品牌行撑高；触控目标由 wrapper 的 28px 图标 + 行内 padding 保证。 */
    /* FAB（base.css.ts 38×38）→ 44×44。 */
    [data-mobile-nav="fab"] {
      min-width: 44px !important;
      min-height: 44px !important;
    }
  }
}`;function Ei(e){let t=new URL(window.location.href).searchParams.get("dsh-layout"),a=t??"",o=window.matchMedia("(max-width: 1023px) and (pointer: coarse)"),n=yi(t),i=xi({urlValue:a,stored:n,narrowMatch:o.matches});if(document.body?.setAttribute("data-dsh-pocket-layout",i),i==="desktop")return;let r=o;i==="mobile"&&(r={matches:!0,addEventListener:()=>{},removeEventListener:()=>{}});let d=a.trim().toLowerCase();d==="desktop"||d==="mobile"||n==="desktop"||n==="mobile"||e.effect(()=>{let s=()=>{document.body?.setAttribute("data-dsh-pocket-layout",o.matches?"mobile":"desktop")};return o.addEventListener("change",s),()=>{o.removeEventListener("change",s)}},"dsh-pocket: auto layout attribute sync on breakpoint change");let u=(s,c)=>{e.effect(()=>{let l,x=()=>{l?.(),l=r.matches?c():void 0};return x(),r.addEventListener?.("change",x),()=>{r.removeEventListener?.("change",x),l?.()}},s)};bi(e),e.effect(()=>{let s=!0,c=w=>{document.body?.setAttribute($e,w?"on":"off")},l=w=>{c(w.detail?.enabled===!0)},x=async()=>{try{let w=await e.connection.rpc.call(be,W.status,{});s&&c(w?.ok===!0?w.value?.mobileRightbarEnabled!==!1:!0)}catch{s&&c(!0)}};return window.addEventListener(Ge,l),x(),()=>{s=!1,window.removeEventListener(Ge,l),document.body?.removeAttribute($e)}},"dsh-mobile-nav: optional right sidebar"),e.effect(()=>{let s=!0,c=w=>{document.body?.setAttribute(Oe,w?"on":"off")},l=w=>{c(w.detail?.enabled===!0)},x=async()=>{try{let w=await e.connection.rpc.call(be,W.status,{});s&&c(w?.ok===!0?w.value?.mobilePinchZoomEnabled===!0:!1)}catch{s&&c(!1)}};return window.addEventListener(Xe,l),x(),()=>{s=!1,window.removeEventListener(Xe,l),document.body?.removeAttribute(Oe)}},"dsh-pocket: pinch-zoom setting"),e.effect(()=>{let s=!0,c=w=>{let R=document.body;if(!R)return;let T=Number(w);Number.isInteger(T)&&T>=12&&T<=22?(R.style.setProperty(we,`${T}px`),R.setAttribute(ge,String(T))):(R.style.removeProperty(we),R.removeAttribute(ge))},l=w=>{c(Number(w.detail?.size)||0)},x=async()=>{try{let w=await e.connection.rpc.call(be,W.status,{});s&&c(w?.ok===!0&&Number(w.value?.mobileFontSize)||0)}catch{s&&c(0)}};return window.addEventListener(Ze,l),x(),()=>{s=!1,window.removeEventListener(Ze,l),document.body?.style.removeProperty(we),document.body?.removeAttribute(ge)}},"dsh-pocket: mobile font size"),u("dsh-pocket: mobile zoom lock",()=>{let s=0,c=()=>{s=window.visualViewport?.scale??0},l=w=>{if(document.body?.getAttribute(Oe)!=="on"){w.preventDefault();return}let R=w.scale;s>0&&s*R<=s||w.preventDefault()},x=()=>{s=0};return document.addEventListener("gesturestart",c,{passive:!1}),document.addEventListener("gesturechange",l,{passive:!1}),document.addEventListener("gestureend",x,{passive:!1}),()=>{document.removeEventListener("gesturestart",c),document.removeEventListener("gesturechange",l),document.removeEventListener("gestureend",x)}}),u("dsh-pocket: explorer availability (issue #48)",()=>{let s=()=>document.querySelector('[data-mobile-nav="frame"]'),c=0,l=()=>{c=0;let T=document.querySelector("[data-aionui-explorer-col]")!==null?"1":"0",E=s();E!==null&&E.getAttribute("data-mobile-nav-explorer")!==T&&E.setAttribute("data-mobile-nav-explorer",T)};l();let x=window.setTimeout(l,1500),w=()=>{c===0&&(c=requestAnimationFrame(l))},R=new MutationObserver(T=>{for(let E of T){for(let v of E.addedNodes)if(v.nodeType!==3){w();return}for(let v of E.removedNodes)if(v.nodeType!==3){w();return}}});return R.observe(document.body,{childList:!0,subtree:!0}),()=>{window.clearTimeout(x),c!==0&&cancelAnimationFrame(c),R.disconnect(),s()?.removeAttribute("data-mobile-nav-explorer")}}),e.effect(()=>{let s=document.createElement("style");return s.dataset.plugin="dsh-pocket",s.dataset.pluginCss="dsh-pocket/mobile-extras.css",s.textContent=rl,document.head.appendChild(s),()=>{s.remove()}},"dsh-pocket: mobile extra styles (issue #17/#48)"),u("dsh-pocket: keyboard height css var (--dshp-kb)",()=>{let s=window.visualViewport;if(s==null)return()=>{};let c=document.documentElement,l=0,x="",w=0,R=!1,T=null,E=()=>(T!==null&&T.isConnected&&T.matches("[data-composer-seat]")&&T.getClientRects().length>0||(T=Array.from(document.querySelectorAll("[data-composer-seat]")).find(y=>y.getClientRects().length>0)??null),T),v=()=>{l=0;let y=Math.max(0,window.innerHeight-s.height-s.offsetTop),C=0;if(Math.abs(s.scale-1)<.01){let M=E();if(M!==null){let A=M.getBoundingClientRect().bottom+(R?w:0);C=Math.max(0,A-s.height)}}let P=Math.min(Math.max(y,C),Math.round(window.innerHeight*.6));w=P,R=P>0;let k=`${Math.round(P)}px`;k!==x&&(x=k,c.style.setProperty("--dshp-kb",k),P>0?c.setAttribute("data-dshp-kb","open"):c.removeAttribute("data-dshp-kb"))},g=()=>{l===0&&(l=requestAnimationFrame(v))};return s.addEventListener("resize",g),s.addEventListener("scroll",g),v(),()=>{s.removeEventListener("resize",g),s.removeEventListener("scroll",g),l!==0&&cancelAnimationFrame(l),T=null,c.style.removeProperty("--dshp-kb"),c.removeAttribute("data-dshp-kb")}}),u("dsh-pocket: standalone viewport guard (scroll residue / short layout viewport)",()=>{let s=window.visualViewport;if(s==null)return()=>{};let c=document.documentElement,l=0,x=0,w=!1,R=null,T=0,E=new URLSearchParams(window.location.search).has("dshp-diag"),v=C=>{R===null&&(R=document.createElement("div"),R.dataset.dshPocketDiag="1",R.style.cssText="position:fixed;top:calc(env(safe-area-inset-top, 0px) + 2px);left:2px;z-index:2147483647;font:10px/1.4 ui-monospace,Menlo,Consolas,monospace;background:rgba(0,0,0,.65);color:#4ade80;padding:2px 6px;border-radius:4px;pointer-events:none;white-space:normal;width:calc(100vw - 8px);word-break:break-all",document.body.appendChild(R));let P=Array.from(document.querySelectorAll("[data-composer-seat]")).find(L=>L.getClientRects().length>0)??null,k=P?.closest("[data-conversation-scroll]")??null,M=k?.querySelector('[class*="_viewArea"]')??null,A=" va=-/col=-/nz=-";if(M!==null){A=` va=${Math.round(M.getBoundingClientRect().height)}/col=-/nz=-`;let L=M;for(let I=0;I<6&&L!==null;I+=1){if(L.children.length>10){let N=Array.from(L.children).filter(V=>V.offsetHeight>0).length;A=` va=${Math.round(M.getBoundingClientRect().height)} col=${Math.round(L.getBoundingClientRect().height)} nz=${N}/${L.children.length}`;break}L=L.firstElementChild}}let O=k===null?"":` sb=${k.clientHeight}/${k.scrollHeight}@${Math.round(k.scrollTop)}`,p=P===null?"":` seatB=${Math.round(P.getBoundingClientRect().bottom)}`,b=getComputedStyle(c).getPropertyValue("--dshp-kb").trim()||"0px",_=c.hasAttribute("data-dshp-kb")?1:0;R.textContent=`tag=1014.3 ih=${window.innerHeight} vv=${Math.round(s.height)} off=${Math.round(s.offsetTop)} sc=${s.scale.toFixed(2)} sy=${window.scrollY}${O}${p}${A} kbc=${b}/f=${_}`,C&&(window.clearTimeout(T),T=window.setTimeout(()=>{R?.remove(),R=null},8e3))},g=()=>{l=0;let C=s.height>=window.innerHeight-8;if(Math.abs(s.scale-1)<.01&&s.height-window.innerHeight>8){if(x===0&&(x=performance.now()),!w&&performance.now()-x>600){w=!0,c.style.setProperty("--dshp-frame-h",`${Math.round(s.height)}px`),c.style.setProperty("--dshp-vh-diff",`${Math.round(s.height-window.innerHeight)}px`),c.setAttribute("data-dsh-pocket-full-height","");let k=Array.from(document.querySelectorAll("[data-conversation-scroll]")).find(M=>M.getClientRects().length>0)??null;k!==null&&k.scrollHeight-k.scrollTop-k.clientHeight<=8&&requestAnimationFrame(()=>{w&&k.isConnected&&(k.scrollTop=k.scrollHeight)}),v(!0)}}else x=0,w&&(w=!1,c.style.removeProperty("--dshp-frame-h"),c.style.removeProperty("--dshp-vh-diff"),c.removeAttribute("data-dsh-pocket-full-height"));!w&&C&&(window.scrollY>1||s.offsetTop>1)&&window.scrollTo(0,0),E&&v(!1)},y=()=>{l===0&&(l=requestAnimationFrame(g))};return s.addEventListener("resize",y),s.addEventListener("scroll",y),window.addEventListener("focusout",y),window.addEventListener("pageshow",y),g(),()=>{s.removeEventListener("resize",y),s.removeEventListener("scroll",y),window.removeEventListener("focusout",y),window.removeEventListener("pageshow",y),l!==0&&cancelAnimationFrame(l),window.clearTimeout(T),R?.remove(),c.style.removeProperty("--dshp-frame-h"),c.style.removeProperty("--dshp-vh-diff"),c.removeAttribute("data-dsh-pocket-full-height")}}),u("dsh-pocket: file open guard + copy button + hide add-workspace (issue #17)",()=>{let s=()=>{try{let w=(e.get?.("workspaces")??e.workspaces)?.list,R=Array.isArray(w)?w:w&&typeof w=="object"&&"value"in w?w.value:null;if(Array.isArray(R))for(let T of R){let E=T?.cwd??T?.root;if(typeof E=="string"&&E)return E}}catch{}return""},c=x=>e.connection.rpc.call(be,W.fileRead,{path:x,cwd:s()}),l=e.locale.bind(it);return vi(c,l)})}var sl="dsh-pocket",ll=["slots","connection","layout","locale","sessionLogDownload","sessions"];function G(e,t,a){let o=e(t);if(a)for(let[n,i]of Object.entries(a))o=String(o).split(`{${n}}`).join(String(i));return o}var z={card:{background:"var(--dsw-alias-bg-layer-1,#fff)",border:"1px solid var(--dsw-alias-border-l2,#e5e7eb)",borderRadius:14,padding:"18px 20px",maxWidth:520},muted:{color:"var(--dsw-alias-label-tertiary,#8b93a1)",fontSize:12,lineHeight:1.5},primary:{font:"inherit",cursor:"pointer",border:"none",background:"var(--dsw-alias-button-primary-fill, var(--dsw-alias-brand-primary,#4f6ef7))",color:"var(--dsw-alias-label-primary-foreground, #fff)",height:36,padding:"0 16px",borderRadius:999,fontSize:13,fontWeight:500,display:"inline-flex",alignItems:"center",justifyContent:"center"},btn:{font:"inherit",cursor:"pointer",border:"1px solid var(--dsw-alias-button-ghost-active-border, var(--dsw-alias-border-l2,#d1d5db))",background:"var(--dsw-alias-bg-layer-1,#fff)",color:"var(--dsw-alias-label-primary,inherit)",height:36,padding:"0 16px",borderRadius:999,fontSize:13,display:"inline-flex",alignItems:"center",justifyContent:"center"},mini:{font:"inherit",cursor:"pointer",border:"1px solid var(--dsw-alias-border-l2,#d1d5db)",background:"var(--dsw-alias-bg-layer-1,#fff)",color:"var(--dsw-alias-label-secondary,#6b7280)",height:26,padding:"0 10px",borderRadius:999,fontSize:12,display:"inline-flex",alignItems:"center",justifyContent:"center"},link:{font:"inherit",cursor:"pointer",border:"none",background:"none",padding:0,fontSize:12,color:"var(--dsw-alias-label-tertiary,#8b93a1)",textDecoration:"none"},warn:{color:"var(--dsw-alias-state-warn-primary,#b45309)",fontSize:12,lineHeight:1.5},mono:{fontFamily:"ui-monospace,Menlo,monospace",letterSpacing:.5}},Ti=e=>(0,m.createElement)("span",{style:{display:"inline-block",width:8,height:8,borderRadius:"50%",flexShrink:0,background:e?"var(--dsw-alias-state-success-primary,#10b981)":"var(--dsw-alias-border-l2,#d1d5db)"}},null);function Ma(e){let t=e!==!1;document.body?.setAttribute($e,t?"on":"off"),window.dispatchEvent(new CustomEvent(Ge,{detail:{enabled:t}}))}function Pa(e){let t=e===!0;document.body?.setAttribute(Oe,t?"on":"off"),window.dispatchEvent(new CustomEvent(Xe,{detail:{enabled:t}}))}var dl=[0,...Array.from({length:11},(e,t)=>12+t)];function Oa(e){let t=Number(e),a=Number.isInteger(t)&&t>=12&&t<=22;a?(document.body?.style.setProperty(we,`${t}px`),document.body?.setAttribute(ge,String(t))):(document.body?.style.removeProperty(we),document.body?.removeAttribute(ge)),window.dispatchEvent(new CustomEvent(Ze,{detail:{size:a?t:0}}))}async function cl(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement("textarea");t.value=e,t.style.cssText="position:fixed;top:0;left:0;opacity:0",document.body.appendChild(t),t.select();let a=document.execCommand("copy");return t.remove(),a===!0}catch{return!1}}function pl({rpcCall:e,t}){let[a,o]=(0,m.useState)(null),[n,i]=(0,m.useState)(!1),[r,d]=(0,m.useState)(null),[h,u]=(0,m.useState)(null),[s,c]=(0,m.useState)(!1),[l,x]=(0,m.useState)(null),[w,R]=(0,m.useState)(!1),[T,E]=(0,m.useState)(Date.now()),[v,g]=(0,m.useState)({}),[y,C]=(0,m.useState)(!1),P=f=>o(S=>S&&{...S,...f});(0,m.useEffect)(()=>{if(!(!!((l?.updating||l?.restarting)&&l?.startedAt)||!!(h?.startedAt&&["downloading","starting","registering"].includes(h?.phase??""))))return;let S=setInterval(()=>E(Date.now()),1e3);return()=>clearInterval(S)},[l,h]);let k=f=>f?Math.max(0,Math.floor((Date.now()-f)/1e3)):0,M=async(f,S)=>{let F=await e(f,S);if(!F?.ok)throw new Error(F?.error?.message??"RPC failed");return F.value},A=async()=>{let f=Date.now()+3e4;for(;Date.now()<f;){try{if((await fetch(location.href,{method:"GET",cache:"no-store"})).ok){location.reload();return}}catch{}await new Promise(S=>setTimeout(S,1e3))}C(!0)},O=async()=>{try{let f=await M(W.status,{});o(f),Ma(f.mobileRightbarEnabled),Pa(f.mobilePinchZoomEnabled),Oa(f.mobileFontSize),u(f.tunnelState??null),f.desktop&&R(!0),f.restartNotice&&(c(!0),x(null),sessionStorage.getItem("dshp-auto-reloaded")||(sessionStorage.setItem("dshp-auto-reloaded","1"),A()))}catch{}};(0,m.useEffect)(()=>{O();let f=setInterval(()=>{document.hidden||O()},1e4);return()=>clearInterval(f)},[]),(0,m.useEffect)(()=>{try{sessionStorage.removeItem("dshp-auto-reloaded")}catch{}},[]),(0,m.useEffect)(()=>{if(w)return;let f=!0,S=async()=>{if(!document.hidden)try{let te=await M(W.version,{}),Ue=await(await fetch("https://registry.npmjs.org/dsh-pocket/latest",{cache:"no-store"})).json();if(!f)return;let Kt=typeof Ue?.version=="string"?Ue.version:null,Fi=typeof Ue?.repository=="string"?Ue.repository:Ue?.repository?.url??null;Ga(te.repository??null,Fi)&&Kt&&te.current&&Ut(Kt,te.current)>0?x({current:te.current,latest:Kt,updating:!1,result:null}):te.current&&te.loaded&&Ut(te.current,te.loaded)>0&&x({current:te.current,latest:te.current,updating:!1,result:"ok",updated:!0})}catch{}},F=()=>{document.hidden||S()};document.addEventListener("visibilitychange",F),S();let J=setInterval(S,900*1e3);return()=>{f=!1,clearInterval(J),document.removeEventListener("visibilitychange",F)}},[w]);let p=async()=>{x(f=>({...f,restarting:!0,startedAt:Date.now()}));try{await Promise.race([M(W.restart,{}),new Promise((f,S)=>setTimeout(()=>S(new Error("restart requested (no reply within 3s)")),3e3))]),x(f=>({...f,restarting:!0,result:"ok"}))}catch(f){let S=String(f?.message??"");if(/connection|socket|fetch|network|abort|cancelled|ECONN|disconnect|closed|timeout/i.test(S)){x(F=>({...F,restarting:!0,result:"ok"}));return}x(F=>({...F,restarting:!1,result:"fail",output:f.message}))}},b=async()=>{x(f=>({...f,updating:!0,result:null,startedAt:Date.now()}));try{let f=await M(W.update,{});x(S=>({...S,updating:!1,result:f.ok?"ok":"fail",autoRestart:f.autoRestart===!0,output:f.output??f.error}))}catch(f){x(S=>({...S,updating:!1,result:"fail",output:f.message}))}},[_,L]=(0,m.useState)(!1),[I,N]=(0,m.useState)(!1),V=async()=>{let f=a?.tunnelConfig;if(f?.mode==="named"&&(!f.hostname||!f.tokenSet)){d(t("namedNeedCfg"));return}i(!0),d(null),u({phase:"starting",detail:"正在开启…",startedAt:Date.now()});try{o(await M(W.tunnelStart,{disclaimer:!0}))}catch(S){d(S.message)}finally{i(!1)}},X=()=>{N(!1),L(!0)},j=()=>{I&&(L(!1),V())},he=async()=>{try{o(await M(W.tunnelStop,{}))}catch{}},[q,B]=(0,m.useState)(null),ae=async()=>{try{o(await M(W.tunnelSetConfig,{mode:"quick"}))}catch(f){d(f.message)}},U=async()=>{try{o(await M(W.tunnelSetConfig,{mode:"named",hostname:q?.hostname??"",token:q?.token||void 0})),B(null)}catch(f){B(S=>({...S,err:f.message}))}},[oe,Q]=(0,m.useState)(!1),Nt=async()=>{Q(!1),i(!0),d(null);try{let f=await M(W.pocketReset,{confirm:!0});o(f),Ma(f.mobileRightbarEnabled),Pa(f.mobilePinchZoomEnabled),Oa(f.mobileFontSize),B(null),ue(null),ja(!1),g({}),Vt(t("resetDone"))}catch(f){d(f.message),Vt(t("resetFailed"))}finally{i(!1)}},zt=async()=>{try{let f=await M(W.lanTokenRefresh,{});o(S=>S&&{...S,lanToken:f.lanToken})}catch{}},_i=async f=>{try{let S=await M(W.lanAuthSetEnabled,{on:f});o(F=>F&&{...F,lanAuthEnabled:S.lanAuthEnabled})}catch{}},Si=async f=>{try{let F=(await M(W.mobileRightbarSetEnabled,{on:f})).mobileRightbarEnabled===!0;P({mobileRightbarEnabled:F}),Ma(F)}catch(S){d(S.message)}},Ci=async f=>{try{let F=(await M(W.mobilePinchZoomSetEnabled,{on:f})).mobilePinchZoomEnabled===!0;P({mobilePinchZoomEnabled:F}),Pa(F)}catch(S){d(S.message)}},Ai=async f=>{try{let S=await M(W.mobileFontSetSize,{size:f}),F=Number(S.mobileFontSize)||0;P({mobileFontSize:F}),Oa(F)}catch(S){d(S.message)}},[Ve,Dt]=(0,m.useState)(null),Li=f=>Dt(f),Ri=async()=>{let f=Ve;if(Dt(null),f!==null)try{let S=await M(W.lanSetEnabled,{on:f});o(F=>F&&{...F,lanEnabled:S.lanEnabled})}catch(S){d(S.message)}},Mi=async f=>{try{o(await M(W.lanSetOverride,{ip:f}))}catch(S){d(S.message)}},[Re,ue]=(0,m.useState)(null),Fa=async f=>{try{let S=await M(W.pinSetCustom,{which:f,value:Re?.value??""});o(F=>F&&{...F,accessToken:f==="public"?S.pin:F.accessToken,lanToken:f==="lan"?S.pin:F.lanToken,publicPinCustom:f==="public"?!0:F.publicPinCustom,lanPinCustom:f==="lan"?!0:F.lanPinCustom}),ue(null)}catch(S){ue(F=>({...F,err:S.message}))}},Ia=a?.lanUrl,me=a?.tunnelUrl,Bt=h?.phase??"idle",Ha=["downloading","starting","registering"].includes(Bt),Pi=h?.detail??"",qt=h?.startedAt??null,fe=a?.tunnelConfig??{mode:"quick",hostname:"",tokenSet:!1},Me=fe.mode==="named",re=Me||q!==null,je=f=>{let S=String(f??""),F=S.indexOf(" | ");return F<0?S:(t("ok")===Ra.ok?S.slice(0,F):S.slice(F+3)).trim()},[Na,za]=(0,m.useState)(null),Wt=(0,m.useRef)(null),Vt=f=>{za(f),clearTimeout(Wt.current),Wt.current=setTimeout(()=>za(null),2600)};(0,m.useEffect)(()=>()=>clearTimeout(Wt.current),[]);let Ke=(f,S,F)=>(0,m.createElement)("button",{role:"switch","aria-checked":!!f,disabled:F===!0,style:{flexShrink:0,width:36,height:20,borderRadius:999,border:"none",padding:2,position:"relative",boxSizing:"border-box",cornerShape:"round",cursor:F===!0?"default":"pointer",font:"inherit",opacity:F===!0?.55:1,background:f?"var(--dsw-alias-brand-primary, var(--dsw-alias-button-primary-fill,#4f6ef7))":"var(--dsw-alias-border-l3, var(--dsw-alias-border-l2,#d1d5db))",transition:"background .12s ease"},onClick:F===!0?void 0:S},(0,m.createElement)("span",{style:{position:"absolute",top:2,left:2,width:16,height:16,borderRadius:"50%",background:f?"var(--dsw-alias-label-primary-foreground,#fff)":"var(--dsw-alias-switch-thumb,#fff)",boxShadow:"0 1px 2px rgba(0,0,0,.18)",transform:f?"translateX(16px)":"translateX(0)",transition:"transform .12s ease, background .12s ease"}})),st=(f,S,F,J)=>(J!=null&&typeof J!="string"&&console.warn("[dsh-pocket] Section 参数错位：key 槽收到非字符串（多余实参会被静默丢弃），children 需为数组",J),(0,m.createElement)("section",{style:{marginTop:20},"data-dshp-section":J??""},(0,m.createElement)("div",{style:{display:"flex",alignItems:"center",gap:8}},f?(0,m.createElement)("span",{style:{fontWeight:600,fontSize:13,flex:1,minWidth:0,display:"inline-flex",alignItems:"center",gap:6}},f):(0,m.createElement)("span",{style:{flex:1}},null),S??null),F??null)),se=(f,S,F)=>(0,m.createElement)("div",{style:{borderTop:"1px solid var(--dsw-alias-border-l2,#eceef2)",paddingTop:10,marginTop:10}},(0,m.createElement)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,flexWrap:"wrap"}},(0,m.createElement)("span",{style:{fontSize:13}},f),S),F??null),Da=(f,S,F)=>(0,m.createElement)("div",{style:{display:"flex",gap:14,alignItems:"center",flexWrap:"wrap",background:"var(--dsw-alias-bg-layer-2,#f3f4f6)",borderRadius:12,padding:12,marginTop:10}},(0,m.createElement)("div",{style:{flexShrink:0,padding:6,background:"#fff",borderRadius:10,border:"1px solid var(--dsw-alias-border-l2,#e5e7eb)"}},(0,m.createElement)("img",{src:f,alt:"QR",style:{width:128,height:128,display:"block",borderRadius:2}})),(0,m.createElement)("div",{style:{flex:"1 1 170px",minWidth:170}},(0,m.createElement)("div",{style:{...z.mono,fontSize:12,wordBreak:"break-all",color:"var(--dsw-alias-label-primary,inherit)",lineHeight:1.6}},S),(0,m.createElement)("div",{style:{...z.muted,fontSize:11,marginTop:6}},F),(0,m.createElement)("button",{style:{...z.mini,marginTop:8},onClick:async()=>Vt(await cl(S)?t("copied"):t("copyFailed"))},t("copyLink")))),Pe=(f,S,F)=>(0,m.createElement)("div",{style:{display:"flex",gap:8,alignItems:"flex-start",fontSize:12,lineHeight:1.6,borderRadius:10,padding:"8px 10px",marginTop:10,background:"var(--dsw-alias-bg-layer-2,#f3f4f6)",borderLeft:`3px solid ${f==="error"?"var(--dsw-alias-state-error-primary,#dc2626)":f==="info"?"var(--dsw-alias-brand-primary,#4f6ef7)":"var(--dsw-alias-state-warn-primary,#b45309)"}`,color:f==="error"?"var(--dsw-alias-state-error-primary,#dc2626)":f==="warn"?"var(--dsw-alias-state-warn-primary,#b45309)":"var(--dsw-alias-label-secondary,#6b7280)",...F}},S),Ba=(f,S,F)=>(0,m.createElement)("div",{style:{marginTop:8,display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}},(0,m.createElement)("span",{style:{...z.mono,fontSize:13},"data-dshp-pin":f},v[f]?S:"••••••••"),(0,m.createElement)("button",{style:{...z.link,padding:"2px 0"},onClick:()=>g(J=>({...J,[f]:!J[f]}))},v[f]?t("pinHide"):t("pinShow")),...F??[]),qa=f=>(0,m.createElement)("div",{style:{marginTop:8,fontSize:12,color:"var(--dsw-alias-label-secondary,#6b7280)",lineHeight:1.5}},t("customizing"),(0,m.createElement)("input",{style:{width:130,margin:"0 6px",padding:"4px 8px",fontSize:14,letterSpacing:1,textAlign:"center",border:"1px solid var(--dsw-alias-border-l2,#d1d5db)",borderRadius:6,outline:"none"},type:"password",minLength:8,maxLength:64,value:Re?.value??"",autoFocus:!0,onChange:S=>ue(F=>({...F,value:S.target.value.replace(/[^a-zA-Z0-9]/g,""),err:null})),onKeyDown:S=>{S.key==="Enter"&&Fa(f),S.key==="Escape"&&ue(null)}}),(0,m.createElement)("button",{style:z.mini,onClick:()=>Fa(f)},t("save")),(0,m.createElement)("button",{style:z.mini,onClick:()=>ue(null)},t("cancel")),Re?.err?(0,m.createElement)("div",{style:{color:"var(--dsw-alias-state-error-primary,#dc2626)",marginTop:4}},je(Re.err)):null),Wa=f=>(0,m.createElement)("button",{style:z.mini,onClick:()=>ue({which:f,value:"",err:null})},t("customize")),Oi=(0,m.createElement)("div",{style:{display:"inline-flex",background:"var(--dsw-alias-bg-layer-2,#eef0f4)",borderRadius:9,padding:2,gap:2}},(0,m.createElement)("button",{style:{font:"inherit",cursor:"pointer",border:"none",height:26,padding:"0 12px",borderRadius:7,fontSize:12,background:re?"transparent":"var(--dsw-alias-bg-layer-1,#fff)",color:re?"var(--dsw-alias-label-tertiary,#8b93a1)":"var(--dsw-alias-label-primary,inherit)",fontWeight:re?400:600,boxShadow:re?"none":"0 1px 3px rgba(0,0,0,.10)"},onClick:Me?ae:q?()=>B(null):void 0},t("modeQuick")),(0,m.createElement)("button",{style:{font:"inherit",cursor:"pointer",border:"none",height:26,padding:"0 12px",borderRadius:7,fontSize:12,background:re?"var(--dsw-alias-bg-layer-1,#fff)":"transparent",color:re?"var(--dsw-alias-label-primary,inherit)":"var(--dsw-alias-label-tertiary,#8b93a1)",fontWeight:re?600:400,boxShadow:re?"0 1px 3px rgba(0,0,0,.10)":"none"},onClick:()=>B(q?null:{hostname:fe.hostname??"",token:"",err:null})},t("modeNamed"))),jt=({title:f,tone:S="warn",children:F,actions:J})=>(0,m.createElement)("div",{style:{position:"fixed",inset:0,zIndex:1e4,background:"rgba(15,17,21,.45)",backdropFilter:"blur(3px)",WebkitBackdropFilter:"blur(3px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}},(0,m.createElement)("div",{style:{background:"var(--dsw-alias-bg-layer-1,#fff)",borderRadius:14,maxWidth:420,width:"100%",padding:"20px 22px",boxShadow:"0 12px 40px rgba(0,0,0,.22)"}},(0,m.createElement)("div",{style:{fontWeight:600,fontSize:15,marginBottom:10,color:S==="danger"?"var(--dsw-alias-state-error-primary,#dc2626)":S==="brand"?"var(--dsw-alias-brand-primary,#4f6ef7)":"var(--dsw-alias-state-warn-primary,#b45309)"}},f),F,(0,m.createElement)("div",{style:{display:"flex",gap:8,marginTop:18,justifyContent:"flex-end"}},J))),[Va,ja]=(0,m.useState)(!1);return(0,m.createElement)("div",{style:z.card,"data-dshp-ui":"v2"},(0,m.createElement)("div",null,(0,m.createElement)("div",{style:{fontWeight:600,fontSize:14}},t("title")),(0,m.createElement)("div",{style:{...z.muted,marginTop:2}},t("subtitle"))),!w&&s?Pe("info",(0,m.createElement)("div",{style:{flex:1,minWidth:0}},(0,m.createElement)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,flexWrap:"wrap"}},(0,m.createElement)("span",{style:{fontWeight:600}},t("restarted")),(0,m.createElement)("div",{style:{display:"flex",gap:6}},y?(0,m.createElement)("button",{style:z.mini,onClick:()=>{C(!1),A()}},t("reloadNow")):null,(0,m.createElement)("button",{style:z.mini,onClick:()=>c(!1)},t("ok")))),y?(0,m.createElement)("div",{style:{color:"var(--dsw-alias-label-tertiary,#8b93a1)",marginTop:2}},t("reloadFailed")):null,(0,m.createElement)("div",{style:{color:"var(--dsw-alias-label-tertiary,#8b93a1)",wordBreak:"break-all"}},G(t,"bgHint",{cmd:a?.killHint??`lsof -ti :${a?.dshPort??3080} | xargs kill -9`}))),{marginTop:14}):null,!w&&l?Pe("warn",(0,m.createElement)("div",{style:{flex:1,minWidth:0}},(0,m.createElement)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,flexWrap:"wrap"}},(0,m.createElement)("span",{style:{fontWeight:600}},l.updated?G(t,"updatedRestart",{ver:l.current}):l.result==="ok"?l.autoRestart?G(t,"updateAutoRestarting",{ver:l.latest}):G(t,"updatedOk",{ver:l.latest}):G(t,"updateAvailable",{ver:l.latest})),l.result!=="ok"?(0,m.createElement)("button",{style:z.primary,onClick:b,disabled:l.updating},l.updating?t("updating"):G(t,"updateTo",{ver:l.latest})):l.autoRestart?(0,m.createElement)("button",{style:z.btn,disabled:!0},t("restartingNow")):(0,m.createElement)("button",{style:z.primary,onClick:p,disabled:l.restarting},l.restarting?t("restarting"):t("restartNow"))),(0,m.createElement)("div",{style:{color:"var(--dsw-alias-label-tertiary,#8b93a1)"}},l.updating?G(t,"updatingDetail",{s:k(l.startedAt)}):l.restarting?G(t,"restartingDetail",{s:k(l.startedAt)}):l.result==="ok"?l.autoRestart?t("updatedAutoDetail"):t("updatedRestartDetail"):l.result==="fail"?G(t,"updateFailed",{err:je(l.output)||t("unknownError")}):G(t,"versionRange",{cur:l.current,latest:l.latest}))),{marginTop:14}):null,st((0,m.createElement)("span",null,Ti(a?.lanEnabled!==!1),t("lanAccess")),Ke(a?.lanEnabled!==!1,()=>Li(a?.lanEnabled===!1)),a?.lanEnabled===!1?Pe("warn",t("lanDisabledHint")):Ia?(0,m.createElement)("div",null,Da(a.lanQr,Ia,t("lanHint")),se(t("lanPin"),Ke(a?.lanAuthEnabled!==!1,()=>_i(a?.lanAuthEnabled===!1)),a?.lanAuthEnabled===!1?(0,m.createElement)("div",{style:{...z.muted,marginTop:6}},t("lanPinOff")):Re?.which==="lan"?qa("lan"):(0,m.createElement)("div",null,Ba("lan",a.lanToken,[(0,m.createElement)("button",{style:z.mini,onClick:zt},t("refresh")),Wa("lan")]),a?.lanPinCustom?(0,m.createElement)("div",{style:{...z.warn,fontSize:11,marginTop:4}},t("pinCustomHint")):null)),se(t("advAddress"),(0,m.createElement)("button",{style:{...z.link,font:"inherit"},onClick:()=>ja(f=>!f)},(a?.lanIpOverride||t("lanAddressAuto"))+(Va?" ‹":" ›")),Va?(0,m.createElement)("div",{style:{marginTop:8}},(0,m.createElement)("label",{style:{display:"flex",alignItems:"center",gap:8,fontSize:12,color:"var(--dsw-alias-label-secondary,#6b7280)"}},t("lanAddress"),(0,m.createElement)("select",{value:a?.lanIpOverride||"",onChange:f=>Mi(f.target.value),style:{font:"inherit",height:30,padding:"0 8px",borderRadius:8,border:"1px solid var(--dsw-alias-border-l2,#d1d5db)",background:"var(--dsw-alias-bg-layer-1,#fff)",color:"var(--dsw-alias-label-primary,inherit)"}},(0,m.createElement)("option",{value:""},t("lanAddressAuto")),(a?.lanCandidates||[]).map(f=>(0,m.createElement)("option",{key:f,value:f},f))))):null)):(0,m.createElement)("div",{style:{...z.muted,marginTop:8}},t("lanStarting")),"lan"),st((0,m.createElement)("span",null,Ti(!!me),t("wanAccess")),Ke(!!me,()=>me?he():X(),Ha),(0,m.createElement)("div",null,Ha?Pe("info",(0,m.createElement)("span",null,Bt==="downloading"?G(t,"downloading",{s:k(qt)}):G(t,"connecting",{s:k(qt),suffix:k(qt)>30?t("slowHint"):""}))):Bt==="error"?Pe("error",G(t,"error",{detail:je(Pi)||t("unknownError")})):!me&&!w?(0,m.createElement)("div",{style:{...z.muted,marginTop:8}},t("wanOffHint")):null,me?(0,m.createElement)("div",null,Da(a.tunnelQr,me,t(Me?"namedRunningHint":"wanHint")),Pe("warn",t("wanEphemeralWarn")),se(t("modeLabel"),Oi,(0,m.createElement)("div",{style:{marginTop:6}},Me&&/trycloudflare\.com/i.test(me??"")?(0,m.createElement)("div",{style:z.warn},t("namedTakeEffect")):null,Me&&!q?(0,m.createElement)("div",{style:{...z.muted}},G(t,"namedSummary",{host:fe.hostname||"—",token:fe.tokenSet?t("namedTokenSet"):t("namedTokenMissing")}),(0,m.createElement)("button",{style:{...z.mini,marginLeft:8},onClick:()=>B({hostname:fe.hostname??"",token:"",err:null})},t("namedEdit")),(0,m.createElement)("div",{style:{...z.muted,marginTop:4}},t("namedHow")),!fe.tokenSet||!fe.hostname?(0,m.createElement)("div",{style:{marginTop:2,color:"var(--dsw-alias-state-error-primary,#dc2626)"}},t("namedNeedCfg")):null):null,q?(0,m.createElement)("div",{style:{marginTop:6,fontSize:12,color:"var(--dsw-alias-label-secondary,#6b7280)",lineHeight:1.6}},(0,m.createElement)("div",null,t("namedHostnameLabel"),(0,m.createElement)("input",{style:{margin:"4px 0 0 6px",padding:"4px 8px",fontSize:13,border:"1px solid var(--dsw-alias-border-l2,#d1d5db)",borderRadius:6,outline:"none",width:200},placeholder:"pocket.example.com",value:q.hostname??"",autoFocus:!0,onChange:f=>B(S=>({...S,hostname:f.target.value.trim(),err:null})),onKeyDown:f=>{f.key==="Enter"&&U(),f.key==="Escape"&&B(null)}})),(0,m.createElement)("div",{style:{marginTop:6}},t("namedTokenLabel"),(0,m.createElement)("input",{style:{margin:"4px 0 0 6px",padding:"4px 8px",fontSize:13,border:"1px solid var(--dsw-alias-border-l2,#d1d5db)",borderRadius:6,outline:"none",width:240,...z.mono},type:"password",value:q.token??"",onChange:f=>B(S=>({...S,token:f.target.value.trim(),err:null})),onKeyDown:f=>{f.key==="Enter"&&U(),f.key==="Escape"&&B(null)}})),(0,m.createElement)("div",{style:{marginTop:8,display:"flex",gap:8}},(0,m.createElement)("button",{style:z.mini,onClick:U},t("save")),(0,m.createElement)("button",{style:z.mini,onClick:()=>B(null)},t("cancel"))),(0,m.createElement)("div",{style:{...z.muted,marginTop:6}},t("namedHow")),(0,m.createElement)("div",{style:{marginTop:2,fontSize:11,color:"var(--dsw-alias-state-warn-primary,#b45309)",lineHeight:1.5}},t("namedSecurity")),q.err?(0,m.createElement)("div",{style:{color:"var(--dsw-alias-state-error-primary,#dc2626)",marginTop:4}},je(q.err)):null):null)),a.accessToken?se(t("pinLabel"),null,Re?.which==="public"?qa("public"):(0,m.createElement)("div",null,Ba("public",a.accessToken,[Wa("public")]),(0,m.createElement)("div",{style:{marginTop:4}},a?.publicPinCustom?(0,m.createElement)("div",{style:{...z.warn,fontSize:11}},t("pinCustomHint")):null,Me?(0,m.createElement)("div",{style:{...z.warn,fontSize:11}},t("namedSecurity")):null))):null):null),"wan"),st((0,m.createElement)("span",null,t("prefsTitle")),null,[se(t("mobileRightbar"),Ke(a?.mobileRightbarEnabled!==!1,()=>Si(a?.mobileRightbarEnabled===!1)),(0,m.createElement)("div",{style:{...z.muted,marginTop:6}},t("mobileRightbarHint"))),se(t("mobilePinchZoom"),Ke(a?.mobilePinchZoomEnabled===!0,()=>Ci(a?.mobilePinchZoomEnabled!==!0)),(0,m.createElement)("div",{style:{...z.muted,marginTop:6}},t("mobilePinchZoomHint"))),se(t("mobileFontSize"),(0,m.createElement)("select",{style:{font:"inherit",fontSize:13,height:28,padding:"0 8px",borderRadius:8,border:"1px solid var(--dsw-alias-border-l2,#d1d5db)",background:"var(--dsw-alias-bg-layer-1,#fff)",color:"inherit"},value:String(Number(a?.mobileFontSize)||0),onChange:f=>Ai(Number(f.target.value))},dl.map(f=>(0,m.createElement)("option",{key:f,value:String(f)},f===0?t("mobileFontFollow"):`${f} px`))),(0,m.createElement)("div",{style:{...z.muted,marginTop:6}},t("mobileFontSizeHint")))],"prefs"),r?(0,m.createElement)("div",{style:{color:"var(--dsw-alias-state-error-primary,#dc2626)",fontSize:12,marginTop:12}},`❌ ${je(r)}`):null,st(null,null,se(t("resetFactory"),(0,m.createElement)("button",{style:{...z.mini,color:"var(--dsw-alias-state-error-primary,#dc2626)"},onClick:()=>Q(!0)},t("resetGo")),(0,m.createElement)("div",{style:{...z.muted,fontSize:11,marginTop:4}},t("resetIntro"))),"reset"),(0,m.createElement)("div",{style:{marginTop:20,paddingTop:12,borderTop:"1px solid var(--dsw-alias-border-l2,#eceef2)",display:"flex",alignItems:"center",justifyContent:"center",gap:6,flexWrap:"wrap",fontSize:11,color:"var(--dsw-alias-label-tertiary,#8b93a1)"}},(0,m.createElement)("span",null,t("developer")),(0,m.createElement)("span",null,"·"),(0,m.createElement)("a",{href:"https://github.com/daha1216/dsh-pocket",target:"_blank",rel:"noreferrer",title:t("starAsk"),style:{color:"inherit",textDecoration:"none",borderBottom:"1px dashed currentColor"}},t("starCta")),(0,m.createElement)("span",null,"·"),(0,m.createElement)("a",{href:"https://github.com/daha1216/dsh-pocket/issues",target:"_blank",rel:"noreferrer",style:{color:"inherit",textDecoration:"none",borderBottom:"1px dashed currentColor"}},t("feedback"))),oe?jt({title:t("resetTitle"),tone:"danger",children:(0,m.createElement)("div",{style:{fontSize:13,lineHeight:1.7,color:"var(--dsw-alias-label-primary,inherit)",whiteSpace:"pre-line"}},t("resetBody")),actions:[(0,m.createElement)("button",{style:{...z.btn,height:32,padding:"0 16px"},onClick:()=>Q(!1)},t("cancel")),(0,m.createElement)("button",{style:{...z.primary,height:32,padding:"0 16px",background:"var(--dsw-alias-state-error-primary,#dc2626)"},onClick:Nt},t("resetConfirm"))]}):null,Na?(0,m.createElement)("div",{style:{position:"fixed",left:"50%",top:"50%",transform:"translate(-50%, -50%)",zIndex:10001,maxWidth:300,background:"rgba(17,24,39,.92)",color:"#fff",border:"none",borderRadius:10,padding:"10px 16px",fontSize:13,lineHeight:1.5,textAlign:"center",boxShadow:"0 8px 24px rgba(0,0,0,.22)"}},Na):null,Ve!==null?jt({title:t(Ve?"lanToggleTitleOn":"lanToggleTitleOff"),tone:Ve?"brand":"warn",children:(0,m.createElement)("div",{style:{fontSize:13,lineHeight:1.7,color:"var(--dsw-alias-label-primary,inherit)"}},t(Ve?"lanToggleBodyOn":"lanToggleBodyOff")),actions:[(0,m.createElement)("button",{style:{...z.btn,height:32,padding:"0 16px"},onClick:()=>Dt(null)},t("cancel")),(0,m.createElement)("button",{style:{...z.primary,height:32,padding:"0 16px"},onClick:Ri},t("confirm"))]}):null,_?jt({title:t("disclaimerTitle"),tone:"warn",children:(0,m.createElement)("div",null,(0,m.createElement)("div",{style:{fontSize:13,lineHeight:1.7,color:"var(--dsw-alias-label-primary,inherit)"}},t("disclaimerBody")),(0,m.createElement)("label",{style:{display:"flex",alignItems:"center",gap:8,marginTop:14,fontSize:13,cursor:"pointer"}},(0,m.createElement)("input",{type:"checkbox",checked:I,onChange:f=>N(f.target.checked),style:{width:16,height:16}}),t("disclaimerAgree")),I?null:(0,m.createElement)("div",{style:{marginTop:8,fontSize:12,color:"var(--dsw-alias-state-error-primary,#dc2626)"}},t("disclaimerHint"))),actions:[(0,m.createElement)("button",{style:{...z.btn,height:32,padding:"0 16px"},onClick:()=>L(!1)},t("cancel")),(0,m.createElement)("button",{style:{...z.primary,height:32,padding:"0 16px",opacity:I?1:.5},disabled:!I,onClick:j},t("disclaimerAgree"))]}):null)}function hl(e){if(e?.connection)try{Object.defineProperty(e.connection,"isLoopback",{value:!0,writable:!0,configurable:!0})}catch{try{e.connection.isLoopback=!0}catch{}}let t=e.locale.bind(it);e.effect(()=>e.locale.register(it,{zh:Ra,en:ki}),"dsh-pocket: pocket locale dictionaries"),Ei(e);let a=(o,n,i)=>e.connection.rpc.call(be,o,n,i);e.slots.inject("settings.section",()=>e.slots.register({name:"settings.section",id:"pocket",order:1,label:()=>t("section"),inject:()=>({rpcCall:a,t})},pl))}

    return module.exports;
  }
});
