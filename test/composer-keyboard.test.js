// composer 座位键盘抬升（M3b，2026-09-29 真机反馈「键盘挡住输入内容」）：座位是
// 宿主 sticky bottom:0 钉布局视口底，iOS/Android(resizes-visual) 键盘只收缩
// visual viewport → 输入行整排沉键盘底。修法=键盘开态把座位 sticky 偏移改为
// --dshp-kb。断言打在适配器层（mobile-apply.tsx，upstream/ 零手改）与产物上，
// 方法论同 file-guard.test.js：esbuild 压缩不改属性/方法名字符串，只查 ASCII 标记。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const apply = readFileSync(new URL('../client/mobile/mobile-apply.tsx', import.meta.url), 'utf8');
const guard = readFileSync(new URL('../client/mobile/upstream/effects/composer-keyboard-guard.ts', import.meta.url), 'utf8');
const sg = readFileSync(new URL('../client/mobile/upstream/effects/session-focus-guard.ts', import.meta.url), 'utf8');
const index = readFileSync(new URL('../client/mobile/upstream/index.tsx', import.meta.url), 'utf8');
const bundle = readFileSync(new URL('../client/client.js', import.meta.url), 'utf8');

test('抬座位规则只在键盘开态命中（html[data-dshp-kb="open"] 门控 + 座位三锚点选择器族）', () => {
  // 开态门控：收起时规则不命中，宿主原定位逐字节保留（不赌宿主原值恰为 sticky/0）
  const gated = apply.match(/html\[data-dshp-kb="open"\][^{]*\{[^}]*position:\s*sticky\s*!important;[^}]*bottom:\s*var\(--dshp-kb, 0px\)\s*!important;[^}]*\}/);
  assert.ok(gated, '必须存在 data-dshp-kb="open" 门控的座位 sticky+bottom 覆盖规则');
  // 三锚点与上游座位 padding 规则同族（防类名哈希代际漂移）
  const sel = gated[0];
  for (const anchor of ['[data-mobile-nav="frame"] [class*="_composerSeat"]', 'div[class*="_frame"] [class*="_composerSeat"]', '[data-mobile-nav="frame"] [data-phase] [class*="_composerSeat"]']) {
    assert.ok(sel.includes(anchor), `选择器族必须含锚点 ${anchor}`);
  }
});

test('抬座位不用 translateY，但必须 transform:none 中和上游内联抬升（10-14 键盘案统一 sticky 单机制）', () => {
  const m3b = apply.slice(apply.indexOf('M3b'), apply.indexOf('M3b') + 1600);
  assert.ok(m3b.includes('containing block'), 'M3b 注释必须记录 transform 禁用原因（防后人『优化』成 translateY）');
  // 剥掉块注释再取规则：注释正文本身含 html[data-dshp-kb="open"] 与 transform 字样，
  // 不剥会从注释起匹、误把说明文字算进规则体
  const bare = apply.replace(/\/\*[\s\S]*?\*\//g, '');
  const gatedRule = bare.match(/html\[data-dshp-kb="open"\][^{]*\{[^}]*\}/)?.[0] ?? '';
  assert.ok(gatedRule.length > 0, '剥注释后必须仍能取到开态门控规则');
  assert.ok(!gatedRule.includes('translate'), '抬升不得走 translateY（transform 会把座位子树 fixed 弹层变 containing block）');
  // 上游 composer-keyboard-lift 给座位内联 translateY，与 sticky 双抬叠加且破坏
  // 弹层锚点——开态必须置 transform:none 压过内联样式（10-14 键盘案三路 fail-open）
  assert.ok(/transform:\s*none\s*!important/.test(gatedRule), '开态必须 transform:none 中和上游内联抬升');
});

test('开合标记与 --dshp-kb 同点维护（同短路路径，卸载时清理）', () => {
  // setProperty 与 setAttribute 必须夹在同一段 write() 里：value 短路时两态同步跳过
  const w = apply.match(/root\.style\.setProperty\('--dshp-kb', value\)[\s\S]{0,300}?removeAttribute\('data-dshp-kb'\)/);
  assert.ok(w, "setProperty('--dshp-kb') 之后必须同点维护 data-dshp-kb 开合标记");
  assert.ok(w[0].includes(`if (kb > 0) root.setAttribute('data-dshp-kb', 'open')`), '开态=kb>0 置 open，否则摘除');
  // dispose：断点翻宽卸载时变量与标记一起清，不留 pocket 残留
  const d = apply.match(/root\.style\.removeProperty\('--dshp-kb'\)\s*\n\s*root\.removeAttribute\('data-dshp-kb'\)/);
  assert.ok(d, '卸载清理必须同时摘 --dshp-kb 变量与 data-dshp-kb 标记');
});

test('打包产物含座位抬升全链路标记（CSS 规则 + 标记写入）', () => {
  // esbuild 压缩不改属性/方法名字符串，只查 ASCII 结构标记——先跑 node client/build.mjs
  assert.ok(bundle.includes('[data-dshp-kb="open"]'), '产物必须含开态门控选择器');
  assert.ok(/html\[data-dshp-kb="open"\][^{]*\{[^}]*--dshp-kb/.test(bundle), '产物必须含 bottom: var(--dshp-kb) 规则');
  assert.ok(bundle.includes("setAttribute('data-dshp-kb','open')") || bundle.includes('setAttribute("data-dshp-kb","open")') || /setAttribute\(.data-dshp-kb.,.open.\)/.test(bundle), '产物必须含开态标记写入');
});

// ── 「会话切换弹输入法」守卫（issue #140）——2026-10-15 对账后改锚上游 ────────
// 本仓原有一条**本地**守卫（抑制会话切换的程序化聚焦 + 卡片外点按补装影子），
// rebase 对账后整条退役，改由上游 v3.1.0 自带的 effects/session-focus-guard.ts
// 承担。退役理由不是「重复」而是「更粗、会误伤」，两条实测：
//
//   ① 无 pointerdown 的纯程序化 focus()：上游放行、本地那条吞掉。宿主的 shell.focus()
//      （"Return the keyboard to the composer"）与 Lexical 内部的
//      rootElement.focus({preventScroll:true}) 都在这条路上。
//   ② 长按卡片空白 → 引擎触摸校正聚焦编辑面（≈500ms）：上游已由 2026-10-04 的 B2
//      判定修好，本地那条却因 markIntent 在非编辑面点按时作废意图窗口，命中
//      「无意图 + 本无焦点」当场 blur —— 正是「长按粘贴被吞」换条路径复活。
//
// 结果：composer-keyboard-guard.ts 对上游逐字节一致，upstream/ 零足迹。
// 下面这组断言改为钉住上游那条解法的关键属性，守护面从「本地实现细节」换成
// 「该守卫必须具备的性质」——换实现时不误红，退化时立刻红。
// 断言方法论同上：esbuild 压缩不改属性/方法名字符串，只查 ASCII 标记。

test('整个守卫装在 installMobileEffect 内（桌面窄窗不挂载）', () => {
  const start = sg.indexOf('export function installSessionFocusGuard');
  assert.ok(start > 0, '必须存在 installSessionFocusGuard');
  const mount = sg.indexOf('installMobileEffect(ctx,', start);
  assert.ok(mount > start, '函数体开头必须挂 installMobileEffect——它负责触屏/窄屏门控与断点变化时的 cleanup+重装');
  assert.ok(sg.includes("'dsh-web-mobile: session focus guard'"), '必须带 effect 名，卸载/诊断靠它');
});

test('守卫窗口必须有限（不得退化成永久 blur）', () => {
  // 这是本组最承重的一条：窗口失效就等于「编辑面永远弹不出键盘」，而症状与
  // issue #140 完全同形，肉眼分不出是守卫太狠还是宿主没聚焦。
  const w = sg.match(/const FOCUS_GUARD_WINDOW_MS = (\d+)/);
  assert.ok(w, '必须有 FOCUS_GUARD_WINDOW_MS 常量');
  const ms = Number(w[1]);
  assert.ok(ms > 0 && ms < 5000, `窗口必须是正有限数（实测 ${ms}ms），不得为 0 或无限`);
  assert.ok(/window\.setTimeout\(restore, FOCUS_GUARD_WINDOW_MS\)/.test(sg),
    '到点必须用同一个常量 restore 收窗，不能另写一个魔法数');
});

test('只在会话 id 真的变化时开窗（列表 churn 不得开窗）', () => {
  assert.ok(sg.includes('currentSessionIdOf(list.getSnapshot())'), '必须从快照读当前会话 id');
  assert.ok(/if \(current === lastSessionId\) return/.test(sg),
    '订阅回调必须先比 lastSessionId：标题/排序/refresh 这类列表 churn 绝不能开窗');
  const sub = sg.indexOf('list.subscribe');
  assert.ok(sub > 0, '必须订阅会话列表');
  assert.ok(sg.slice(sub, sub + 320).includes('arm()'), '确认变化之后才 arm');
  assert.ok(/let lastSessionId = currentSessionIdOf/.test(sg),
    'install 时必须先快照一次 lastSessionId——否则订阅本身就会开一次窗');
});

test('所有 blur 路径都必须被 windowOpen 门控（防退化成无差别吞焦）', () => {
  // 本地退役守卫的核心教训：它的 focusin 兜底只看「意图窗口 + editorFocused」，
  // 从不看「窗口是否开着」，于是窗口外的合法程序化聚焦也被 blur。
  for (const fn of ['onPointerDown', 'onFocusIn']) {
    const start = sg.indexOf(`const ${fn}`);
    assert.ok(start > 0, `必须存在 ${fn}`);
    const body = sg.slice(start, sg.indexOf('document.addEventListener', start));
    assert.ok(new RegExp(`^const ${fn} = \\(event: Event\\): void => \\{\\s*\\n\\s*if \\(!windowOpen\\) return`).test(body),
      `${fn} 必须以 if (!windowOpen) return 开场——否则窗口外的正常聚焦也会被 blur`);
  }
  const blur = (sg.match(/\.blur\(\)/g) || []).length;
  assert.equal(blur, 1, `全文件只应有一处 blur()，实际 ${blur}——多一处就多一条误伤路径`);
});

test('点编辑面即早关窗（真点按不受守卫影响）', () => {
  const start = sg.indexOf('const onPointerDown');
  const body = sg.slice(start, sg.indexOf('document.addEventListener', start));
  const check = body.indexOf('target.closest(COMPOSER_INPUT_SELECTOR) !== null');
  assert.ok(check > 0, '必须判「点按落在编辑面」');
  assert.ok(body.slice(check, check + 120).includes('restore()'),
    '命中后必须 restore() 解除影子与窗口，否则用户点了输入框反而弹不出键盘');
  assert.ok(sg.includes("document.addEventListener('pointerdown', onPointerDown, true)"),
    'pointerdown 必须以捕获阶段注册——否则赶不上浏览器随后的原生 focus');
});

test('MutationObserver 在窗口内补装重挂载的编辑面', () => {
  // 会话切换会重挂 InputBar（编辑面由 Session 拥有），宿主 focus 跑在 commit 的
  // 同步布局阶段、早于 observer 微任务，所以补装是必需而非优化（上游 2026-09-29
  // headless 实测：focusin 落在 t=314ms 而当时 marker 仍为 false）。
  const start = sg.indexOf('new MutationObserver');
  assert.ok(start > 0, '必须有 MutationObserver');
  const body = sg.slice(start, sg.indexOf('observer.observe', start));
  assert.ok(body.includes('if (!windowOpen) return'), '观察者必须被 windowOpen 门控，否则窗口外也会装影子');
  assert.ok(body.includes('shadow(el)'), '窗口内必须补装影子');
  assert.ok(/observer\.observe\(document\.documentElement, \{ childList: true, subtree: true \}\)/.test(sg),
    '必须观察 documentElement 的 childList+subtree——重挂载发生在 body 深处');
});

test('影子 marker 与 composer-keyboard-guard 共用同一个常量', () => {
  assert.ok(/import \{ SHADOW_MARKER \} from '\.\/composer-keyboard-guard\.ts'/.test(sg),
    '必须从 composer-keyboard-guard 导入 SHADOW_MARKER，不另立一个');
  assert.ok(/export const SHADOW_MARKER = 'data-mobile-nav-focus-shadow'/.test(guard),
    'composer-keyboard-guard 必须导出 SHADOW_MARKER（one marker, one own-property recipe）');
});

test('shadow() 必须幂等（重复补装不得重复 defineProperty）', () => {
  // arm() 与 MutationObserver 都可能对同一元素调用 shadow()。
  const start = sg.indexOf('const shadow =');
  assert.ok(start > 0, '必须存在 shadow()');
  const body = sg.slice(start, sg.indexOf('const arm =', start));
  const idempotent = body.indexOf('if (el.hasAttribute(SHADOW_MARKER)) return');
  assert.ok(idempotent > 0, '已带标记的元素必须早退');
  assert.ok(body.indexOf('Object.defineProperty') > idempotent, 'defineProperty 必须排在幂等早退之后');
});

test('restore() 必须先归零计时器再查 DOM（窗开状态不得滞后于影子）', () => {
  // 只删影子不归零 windowOpen ⇒ 窗口永久开启（点一次之后输入框再也弹不出键盘）。
  const start = sg.indexOf('const restore =');
  assert.ok(start > 0, '必须存在 restore');
  const body = sg.slice(start, sg.indexOf('const shadow =', start));
  const clear = body.indexOf('window.clearTimeout(windowTimer)');
  const open = body.indexOf('windowOpen = false');
  const query = body.indexOf('document.querySelector');
  assert.ok(clear > 0 && open > 0, 'restore 必须清计时器并把 windowOpen 归 false');
  assert.ok(query > 0, 'restore 必须定位带标记的元素来撤影子');
  assert.ok(clear < query && open < query, '归零必须排在 DOM 查询之前');
});

test('注册与解绑严格对称（含订阅与 observer）', () => {
  const add = (sg.match(/document\.addEventListener\(/g) || []).length;
  const rem = (sg.match(/document\.removeEventListener\(/g) || []).length;
  assert.equal(add, 2, `应注册 2 个 document 监听器，实际 ${add}`);
  assert.equal(rem, add, `addEventListener ${add} 个但 removeEventListener ${rem} 个——解绑遗漏会让守卫叠加`);
  const dispose = sg.slice(sg.indexOf('return () => {', sg.indexOf('observer.observe')));
  for (const must of ['unsubscribe()', 'observer.disconnect()', 'restore()']) {
    assert.ok(dispose.includes(must), `卸载路径必须调 ${must}`);
  }
});

test('index.tsx 必须安装该守卫（源码全对但没挂上等于没有）', () => {
  assert.ok(/installSessionFocusGuard\(ctx\)/.test(index),
    'upstream/index.tsx 必须调 installSessionFocusGuard(ctx)');
});

test('产物含该守卫的独有标记（防只改源码忘重建）', () => {
  assert.ok(bundle.includes('dsh-web-mobile: session focus guard'),
    '产物必须含守卫的 effect 名——它是基线产物里没有、只此一处出现的字面量');
  assert.ok(/data-mobile-nav-focus-shadow/.test(bundle), '产物必须含共享影子标记');
});