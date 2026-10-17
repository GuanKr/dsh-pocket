// 手机端独立字号（2026-10-18）：手机上调字号不能影响桌面。
//
// 实现契约（读源码/产物断言，不引 jsdom）：
//   1) 覆盖只作用在宿主的「内容字号轴」--dsh-content-font-size 上——delta /
//      secondary / markdown 字号 token 都由它 calc，跟着一起缩放；
//   2) 覆盖规则必须同时带「手机布局 + 独立字号标记」两个门，桌面布局不命中；
//   3) 默认（0）不写标记，手机跟随桌面「字号大小」。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const bundle = readFileSync(new URL('../client/client.js', import.meta.url), 'utf8');
const apply = readFileSync(new URL('../client/mobile/mobile-apply.tsx', import.meta.url), 'utf8');
const index = readFileSync(new URL('../client/index.jsx', import.meta.url), 'utf8');
const locales = readFileSync(new URL('../client/pocket-locales.js', import.meta.url), 'utf8');
const api = readFileSync(new URL('../client/api.js', import.meta.url), 'utf8');

test('覆盖规则：只替换宿主内容字号轴，且带手机布局 + 独立字号双门', () => {
  assert.ok(
    bundle.includes('body[data-dsh-pocket-layout="mobile"][data-dsh-pocket-mobile-font]'),
    '产物必须含双门选择器（桌面布局不得命中）',
  );
  assert.ok(
    bundle.includes('--dsh-content-font-size: var(--dsh-pocket-mobile-font-size) !important'),
    '必须用 !important 覆盖宿主写在 body 上的内联字号',
  );
  // 不得覆盖代码字号轴（宿主「代码字号」是独立设置，语义上不归手机端字号管）
  assert.ok(!bundle.includes('--dsh-code-font-size: var(--dsh-pocket-mobile-font-size)'), '不应连带覆盖代码字号');
});

test('mobile-apply：自己拉 status 落标记、监听设置页事件、卸载时清干净', () => {
  assert.ok(apply.includes('MOBILE_FONT_EVENT'), '必须监听设置页广播事件');
  assert.ok(apply.includes('POCKET_ENDPOINTS.status'), '必须自己拉 status（不依赖设置页被打开过）');
  assert.ok(apply.includes('body.style.setProperty(MOBILE_FONT_SIZE_VAR'), '必须写入覆盖变量');
  assert.ok(apply.includes('removeAttribute(MOBILE_FONT_ATTRIBUTE)'), '清理必须摘标记');
  assert.ok(apply.includes('style.removeProperty(MOBILE_FONT_SIZE_VAR)'), '清理必须移除变量');
});

test('设置页：提供「跟随桌面」+ 12–22px 选择，走独立 RPC 端点', () => {
  assert.ok(api.includes("mobileFontSetSize: 'mobile.font.setSize'"), 'api.js 必须有独立端点');
  assert.ok(index.includes('MOBILE_FONT_OPTIONS'), '设置页必须有字号选项列表');
  assert.ok(index.includes("t('mobileFontFollow')"), '必须提供「跟随桌面」选项');
  assert.ok(index.includes('POCKET_ENDPOINTS.mobileFontSetSize'), '下拉变更必须走新端点');
  assert.ok(index.includes('applyMobileFontSize'), '设置变更后必须立即落 body 标记');
});

test('词典：zh/en 同键各一条（缺键=文案裸奔）', () => {
  for (const key of ['mobileFontSize', 'mobileFontSizeHint', 'mobileFontFollow']) {
    const hits = (locales.match(new RegExp(`'${key}':`, 'g')) || []).length;
    assert.ok(hits >= 2, `词典键 ${key} 必须 zh/en 各一条（实际 ${hits} 条）`);
  }
});
