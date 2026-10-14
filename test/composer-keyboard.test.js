// composer 座位键盘抬升（M3b，2026-09-29 真机反馈「键盘挡住输入内容」）：座位是
// 宿主 sticky bottom:0 钉布局视口底，iOS/Android(resizes-visual) 键盘只收缩
// visual viewport → 输入行整排沉键盘底。修法=键盘开态把座位 sticky 偏移改为
// --dshp-kb。断言打在适配器层（mobile-apply.tsx，upstream/ 零手改）与产物上，
// 方法论同 file-guard.test.js：esbuild 压缩不改属性/方法名字符串，只查 ASCII 标记。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const apply = readFileSync(new URL('../client/mobile/mobile-apply.tsx', import.meta.url), 'utf8');
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
