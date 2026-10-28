// settling 卡死判定（2026-10-28 反馈：宿主重连后输入框会消失）
//
// 被测对象是纯判定模块 client/mobile/settling-watchdog.mjs；DOM 接线在 mobile-apply.tsx，
// 这里只对「何时算卡死、何时允许 resync、何时需要先换 socket」下断言——那正是最容易写错、
// 也最伤用户的分支。
//
// 背景（详见模块文件头）：宿主在 [data-phase=settling] 时 visibility:hidden 藏起 composer
// 座位，该 phase 依赖 openState === "loading"；这个 'loading' 没人接手，座位永久不可见。
// 用户实际跑 iOS 主屏 PWA：页面冻结后 socket 已死但 readyState 仍为 1，连断线事件都没有，
// 所以首版「靠断线证据」的判据在本机上失效，现已改为「页面恢复 / 结构性矛盾 / 超长 loading」。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const {
  createSettlingGuard,
  createFreezeDetector,
  resolveLinkVerdict,
  SETTLING_STALE_MS,
  HARD_STUCK_MS,
  MAX_REPAIR_ATTEMPTS,
  FREEZE_GAP_MS,
} = await import('../client/mobile/settling-watchdog.mjs');

const apply = readFileSync(new URL('../client/mobile/mobile-apply.tsx', import.meta.url), 'utf8');
// POCKET_EXTRA_CSS 的模板字面量正文：从声明处的第一个反引号到下一个反引号。
const cssStart = apply.indexOf('const POCKET_EXTRA_CSS');
const cssOpen = apply.indexOf('`', cssStart);
const css = apply.slice(cssOpen + 1, apply.indexOf('`', cssOpen + 1));
const bundle = readFileSync(new URL('../client/client.js', import.meta.url), 'utf8');

const DOWN = { down: true, usable: false };
const UP = { down: false, usable: true };
const IDLE = { waiting: false, stale: false, repair: false, reconnect: false };
const LOADING = { openState: 'loading' };

test('resolveLinkVerdict：generation 存在时以它为准（undefined = 断线）', () => {
  assert.deepEqual(resolveLinkVerdict({ hasGeneration: true, generation: undefined }), DOWN);
  assert.deepEqual(resolveLinkVerdict({ hasGeneration: true, generation: { id: 1 } }), UP);
  // generation 可用时即使 state 报 connected，也以 generation 为准：断连瞬间
  // generation 先被 publish 成 undefined，state 滞后一帧属于预期。
  assert.deepEqual(
    resolveLinkVerdict({ hasGeneration: true, generation: undefined, state: 'connected' }),
    DOWN,
  );
});

test('resolveLinkVerdict：无 generation 时退化到 state', () => {
  assert.deepEqual(resolveLinkVerdict({ hasGeneration: false, state: 'disconnected' }), DOWN);
  assert.deepEqual(resolveLinkVerdict({ hasGeneration: false, state: 'connecting' }), DOWN);
  assert.deepEqual(resolveLinkVerdict({ hasGeneration: false, state: 'connected' }), UP);
  // 读不到 state（形状差异）→ 视为可用；宁可不动，也不误修。
  assert.deepEqual(resolveLinkVerdict({ hasGeneration: false, state: undefined }), UP);
});

test('没有证据就不介入：cold/error 与「已开但还早」都不动手', () => {
  const guard = createSettlingGuard();
  const root = {};
  guard.observe(root, 0);
  // cold / error 本来就不会保持 settling，任何时长都不该有动作——尤其不能 resync。
  for (const state of ['cold', 'error']) {
    for (const t of [1000, SETTLING_STALE_MS, HARD_STUCK_MS, 600_000]) {
      assert.deepEqual(guard.decide(root, t, { openState: state }), IDLE,
        `openState=${String(state)} t=${t}：非 settling 来源，不动`);
    }
  }
  // 'open' 是 parentAvailabilityPending 型 settling 的来源：刚进入时先等，
  // 超过宽限期只还原可见性（见下一条测试），不在这里断言 IDLE。
  assert.equal(guard.decide(root, 1000, { openState: 'open' }).waiting, true,
    '刚进入 settling 时给宿主时间，不要立刻插手');
});

test('纯慢加载：loading 但仍有在途 open，硬阈值前一律等（不把加载推倒重来）', () => {
  const guard = createSettlingGuard();
  const root = {};
  guard.observe(root, 0);
  const verdict = guard.decide(root, 1000, { openState: 'loading', openPromise: 'live' });
  assert.equal(verdict.waiting, true);
  assert.equal(verdict.stale, false);
  // 必须回传剩余毫秒：否则调用方没有新突变可等，节点会永久悬空。
  assert.equal(verdict.remainingMs, HARD_STUCK_MS - 1000);
});

test('硬阈值兜底：长时间 loading 且毫无事件证据 → 标记并先换 socket（僵尸连接路径）', () => {
  const guard = createSettlingGuard();
  const root = {};
  guard.observe(root, 0);
  assert.equal(guard.decide(root, HARD_STUCK_MS - 1, LOADING).waiting, true);
  const verdict = guard.decide(root, HARD_STUCK_MS, LOADING);
  assert.deepEqual(verdict, { waiting: false, stale: true, repair: true, reconnect: true },
    '没有任何断线/恢复证据时，只有僵尸 socket 能解释超长 loading，必须先重连');
});

test('结构性矛盾：openState=loading 但 openPromise 已消失 → 立刻修，不必等超时', () => {
  const guard = createSettlingGuard();
  const root = {};
  guard.observe(root, 0);
  // 这就是 doOpen 的 catch 对非 RemoteFailure 直接 rethrow 的后果：promise 没了，
  // openState 永远停在 loading，宿主自己再无推进路径。
  const verdict = guard.decide(root, 1, { openState: 'loading', openPromise: 'gone' });
  assert.deepEqual(verdict, { waiting: false, stale: true, repair: true, reconnect: false },
    '此时不是 socket 的问题，resync 在新 socket 上重开即可，不必强制重连');
});

test('页面恢复（iOS PWA 主路径）：宽限期内只等，期满才重连 + resync', () => {
  const guard = createSettlingGuard();
  const root = {};
  guard.observe(root, 0);
  guard.noteResume(1000);
  // 恢复瞬间不该动手：宿主自己常在半秒内完成首帧。
  const waiting = guard.decide(root, 1000, LOADING);
  assert.equal(waiting.waiting, true);
  assert.equal(waiting.remainingMs, SETTLING_STALE_MS);
  assert.equal(guard.decide(root, 1000 + SETTLING_STALE_MS - 1, LOADING).waiting, true);
  const verdict = guard.decide(root, 1000 + SETTLING_STALE_MS, LOADING);
  assert.deepEqual(verdict, { waiting: false, stale: true, repair: true, reconnect: true },
    '冻结恢复后 socket 大概率已被系统拆掉，必须先换连接再重开');
});

test('断线重连（桌面/普通标签页路径）：先重连过即视为传输层已自愈，不强制再换 socket', () => {
  const guard = createSettlingGuard();
  const root = {};
  guard.observe(root, 0);
  guard.noteLink(DOWN, 100);
  guard.noteLink(UP, 2000);
  const verdict = guard.decide(root, 2000 + SETTLING_STALE_MS, LOADING);
  assert.deepEqual(verdict, { waiting: false, stale: true, repair: true, reconnect: false });
});

test('宽限期从「恢复时刻」起算，不是从进入 settling 的时刻（否则刚回来就被推翻）', () => {
  const guard = createSettlingGuard();
  const root = {};
  guard.observe(root, 0);
  guard.noteResume(60_000);
  // 进入 settling 已 60s，但恢复才 1ms —— 必须还等。
  const verdict = guard.decide(root, 60_001, LOADING);
  assert.equal(verdict.waiting, true);
  assert.equal(verdict.remainingMs, SETTLING_STALE_MS - 1);
});

test(`同一轮恢复最多修 ${MAX_REPAIR_ATTEMPTS} 次，之后只维持 CSS 兜底（防活锁）`, () => {
  const guard = createSettlingGuard();
  const root = {};
  // 真实顺序：先进入 settling，之后才被切到后台再切回来。
  guard.observe(root, 0);
  guard.noteResume(10);
  let at = 10 + SETTLING_STALE_MS;
  for (let i = 0; i < MAX_REPAIR_ATTEMPTS; i += 1) {
    const verdict = guard.decide(root, at, LOADING);
    assert.equal(verdict.repair, true, `第 ${i + 1} 次仍允许修`);
    at += 1;
  }
  const spent = guard.decide(root, at, LOADING);
  assert.deepEqual(spent, { waiting: false, stale: true, repair: false, reconnect: false },
    '修到上限仍没恢复：停止推翻会话，但用户至少要能看见输入框');
});

test('下一轮恢复允许重新获得修复配额（新场景，不是活锁）', () => {
  const guard = createSettlingGuard();
  const root = {};
  guard.observe(root, 0);
  guard.noteResume(10);
  for (let i = 0; i < MAX_REPAIR_ATTEMPTS; i += 1) guard.decide(root, 10 + SETTLING_STALE_MS + i, LOADING);
  assert.equal(guard.decide(root, 12_000, LOADING).repair, false);
  guard.noteResume(20_000);
  assert.equal(guard.decide(root, 20_000 + SETTLING_STALE_MS, LOADING).repair, true,
    '第二次切回前台是新故障场景，配额应当重置');
});

test('重连之后才开始的 loading：不越过 resync（那不是被挂住的 open）', () => {
  const guard = createSettlingGuard();
  const root = {};
  guard.noteLink(DOWN, 0);
  guard.noteLink(UP, 1000);
  // settling 是在重连之后才进入的：没有「跨过断线」的证据。
  guard.observe(root, 2000);
  assert.equal(guard.decide(root, 2000 + SETTLING_STALE_MS, LOADING).waiting, true,
    '本轮 loading 全新开始，先让宿主自己跑完');
  const verdict = guard.decide(root, 2000 + HARD_STUCK_MS, LOADING);
  assert.equal(verdict.repair, true, '真拖到硬阈值还是得兜底');
  assert.equal(verdict.reconnect, true);
});

test('parentAvailabilityPending 型 settling：只还原可见性，不重建历史', () => {
  // settling 的另一个来源是 parentAvailabilityPending —— 那时 openState 已经是 'open'，
  // 会话数据完好，只是父会话可用性那一位没回来。对它 resync 会把整段历史重开一遍。
  const guard = createSettlingGuard();
  const root = {};
  guard.observe(root, 0);
  guard.noteResume(10);
  const verdict = guard.decide(root, 10 + SETTLING_STALE_MS, { openState: 'open', openPromise: 'gone' });
  assert.deepEqual(verdict, { waiting: false, stale: true, repair: false, reconnect: false },
    '座位要还给用户，但不该重开会话');
});

test('release/reset 清干净状态，不会跨会话误判', () => {
  const guard = createSettlingGuard();
  const a = {};
  const b = {};
  guard.observe(a, 0);
  guard.noteResume(0);
  guard.release(a);
  assert.deepEqual(guard.decide(a, 10_000, LOADING), IDLE, 'release 后不得再有动作');
  guard.observe(b, 0);
  guard.reset();
  assert.deepEqual(guard.decide(b, 10_000, LOADING), IDLE, 'reset 后不得再有动作');
});

test('createFreezeDetector：只有明显迟到才算冻结，首帧与正常抖动不算', () => {
  const freeze = createFreezeDetector({ gapMs: FREEZE_GAP_MS, intervalMs: 1000 });
  assert.equal(freeze.tick(0), false, '首帧没有参照，永远不算冻结');
  assert.equal(freeze.tick(1000), false, '正常 1s');
  assert.equal(freeze.tick(2500), false, '后台节流到 2.5s 仍属正常抖动');
  assert.equal(freeze.tick(60_000), true, '整段被挂起（iOS 冻结）必须识别出来');
  assert.equal(freeze.tick(61_000), false, '恢复后重新正常');
  freeze.reset();
  assert.equal(freeze.tick(999_999), false, 'reset 后重新以首帧计');
});

test('mobile-apply：CSS 兜底规则存在且压过宿主的 visibility:hidden', () => {
  assert.ok(css.includes('[data-dshp-settling-stale]'),
    'CSS 必须按标记还原可见性');
  assert.ok(/html \[data-phase="settling"\]\[data-dshp-settling-stale\][\s\S]*?visibility:\s*visible\s*!important/.test(css),
    '必须带 !important 且以 html 前缀提特异性——上游是 (0,3,0) 无 !important');
  // 上游同一份 CSS 里还有一条内嵌会话体的等价规则
  // （.embeddedBody[data-content-phase=settling] .composerSeat{visibility:hidden}），
  // 只覆盖根节点会在子会话/并行分支上漏掉。
  assert.ok(/html \[data-content-phase="settling"\]\[data-dshp-settling-stale\]\s+\[class\*="_composerSeat"\]\s*\{\s*visibility:\s*visible\s*!important/.test(css),
    '内嵌会话体的 settling 也要还原（同一个 visibility:hidden 的另一半）');
});

test('mobile-apply：看门狗走 armOnNarrow 且清理全部订阅与标记', () => {
  const start = apply.indexOf("armOnNarrow('dsh-pocket: settling watchdog");
  assert.ok(start > 0, '看门狗必须包在 armOnNarrow 里（宽屏桌面布局不掺和）');
  const body = apply.slice(start, apply.indexOf('\n  }, ', start));
  assert.ok(body.includes('guard.decide('), '判定必须委托纯模块');
  assert.ok(body.includes('typeof session?.resync !== ') && body.includes("'function'"),
    'resync 必须有 typeof 守卫，宿主形状变化就跳过');
  assert.ok(body.includes('connection.reconnect') || body.includes('conn?.reconnect'),
    '必须能主动换 socket：iOS PWA 的僵尸连接不会自己断');
  assert.ok(body.includes("addEventListener('visibilitychange'"), '必须订阅页面恢复');
  assert.ok(body.includes("addEventListener('pageshow'"), '必须覆盖 bfcache 恢复');
  assert.ok(body.includes('clearInterval(heartbeat)'), '心跳计时器必须清掉');
  assert.ok(body.includes('removeEventListener') || body.includes('for (const off of unsubscribers) off()'),
    '订阅必须全部退订');
  assert.ok(body.includes('observer.disconnect()'), '清理时必须断开 observer');
  assert.ok(body.includes('cancelAnimationFrame(raf)'), '清理时必须取消待执行的 rAF');
  assert.ok(body.includes('timers.clear()'), '清理时必须清掉计时器');
  assert.ok(body.includes('guard.reset()'), '清理时必须重置判定状态');
  assert.ok(body.includes('removeAttribute(STALE_ATTR)'), '清理时必须摘掉标记');
  // 父子会话同时挂着时，靠 retainedBy.mainView 反推会认错人，必须按 root 自带的
  // 会话标识定位；内嵌会话体（data-content-phase）也要能被扫到。
  assert.ok(body.includes('data-conversation-session'), '会话 id 必须从这个 root 自己读');
  assert.ok(body.includes('data-content-phase="settling"'), '内嵌会话体的 settling 也要扫到');
});

test('bundle：构建产物包含看门狗与 CSS 兜底（防止改了源码忘了重建）', () => {
  assert.ok(bundle.includes('data-dshp-settling-stale'), 'bundle 必须包含标记');
  assert.ok(bundle.includes('settling watchdog'), 'bundle 必须包含看门狗');
  assert.ok(/\[data-phase="settling"\]\[data-dshp-settling-stale\]/.test(bundle),
    'bundle 里的 CSS 规则必须与源码一致');
});
