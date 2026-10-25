import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script, createContext } from 'node:vm';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { POCKET_ENDPOINTS } from '../client/api.js';
import { zh, en } from '../client/pocket-locales.js';

const QUICK_URL = 'https://quick-test.trycloudflare.com';

const result = await build({
  entryPoints: [fileURLToPath(new URL('../client/index.jsx', import.meta.url))],
  bundle: true,
  write: false,
  format: 'cjs',
  platform: 'browser',
  plugins: [{
    name: 'settings-only',
    setup(build) {
      build.onResolve({ filter: /mobile-apply\.tsx$/ }, () => ({ path: 'mobile', namespace: 'settings-stub' }));
      build.onLoad({ filter: /.*/, namespace: 'settings-stub' }, () => ({ contents: 'export function mobileApply() {}' }));
    },
  }],
  external: ['react', '@deepseek-ai/dsh-client-ui-primitives'],
});

function mount({ configured = false, mode = 'quick', dictionary = zh, rpc } = {}) {
  let status = {
    lanEnabled: true, lanAuthEnabled: true,
    lanUrl: 'http://192.0.2.10:3081', lanQr: 'data:qr', lanToken: '12345678',
    accessToken: '87654321', desktop: true, tunnelUrl: null,
    tunnelState: { phase: 'idle' },
    tunnelConfig: { mode, hostname: configured ? 'pocket.example.com' : '', tokenSet: configured },
  };
  const calls = [];
  const states = [];
  let cursor = 0;
  const react = {
    createElement: (type, props, ...children) => ({ type, props: props ?? {}, children: children.flat(Infinity) }),
    useState(initial) {
      const i = cursor++;
      if (!(i in states)) states[i] = i === 0 ? structuredClone(status) : typeof initial === 'function' ? initial() : initial;
      return [states[i], (value) => { states[i] = typeof value === 'function' ? value(states[i]) : value; }];
    },
    useRef(initial) {
      const i = cursor++;
      if (!(i in states)) states[i] = { current: initial };
      return states[i];
    },
    useEffect() {},
  };
  const module = { exports: {} };
  const context = createContext({
    module, exports: module.exports, console,
    require: (id) => {
      if (id === 'react') return react;
      if (id === '@deepseek-ai/dsh-client-ui-primitives') return {};
      throw new Error(`Unexpected require: ${id}`);
    },
    setTimeout() { return 1; }, clearTimeout() {},
    document: { body: { setAttribute() {}, removeAttribute() {}, style: { setProperty() {}, removeProperty() {} } } },
    window: { dispatchEvent() {} }, CustomEvent: class {},
  });
  new Script(result.outputFiles[0].text).runInContext(context);
  let Component;
  module.exports.apply({
    connection: {},
    locale: { bind: () => (key) => dictionary[key] ?? key },
    effect() {},
    slots: { inject: (_slot, fn) => fn(), register: (_meta, component) => { Component = component; } },
  });
  const rpcCall = async (endpoint, payload) => {
    calls.push({ endpoint, payload });
    if (rpc) return rpc(endpoint, payload);
    if (endpoint === POCKET_ENDPOINTS.tunnelSetConfig) {
      // 与真实后端一致：运行中保存配置会先停止旧隧道，避免旧凭据/旧入口继续暴露。
      if (status.tunnelUrl) status = { ...status, tunnelUrl: null, tunnelQr: null, tunnelState: { phase: 'idle' } };
      if (payload.mode === 'quick') {
        status = { ...status, tunnelConfig: { ...status.tunnelConfig, mode: 'quick' } };
      } else {
        status = {
          ...status,
          tunnelConfig: {
            mode: 'named',
            hostname: payload.hostname ?? status.tunnelConfig.hostname,
            tokenSet: payload.token ? true : status.tunnelConfig.tokenSet,
          },
        };
      }
    } else if (endpoint === POCKET_ENDPOINTS.tunnelStart) {
      const named = status.tunnelConfig.mode === 'named';
      status = {
        ...status,
        tunnelUrl: named ? `https://${status.tunnelConfig.hostname}` : QUICK_URL,
        tunnelQr: 'data:qr', tunnelState: { phase: 'ready' },
      };
    } else if (endpoint === POCKET_ENDPOINTS.tunnelStop) {
      status = { ...status, tunnelUrl: null, tunnelState: { phase: 'idle' } };
    } else if (endpoint === POCKET_ENDPOINTS.pocketReset) {
      status = { ...status, tunnelUrl: null, tunnelState: { phase: 'idle' }, tunnelConfig: { mode: 'quick', hostname: '', tokenSet: false } };
    } else {
      assert.fail(`Unexpected RPC: ${endpoint}`);
    }
    return { ok: true, value: structuredClone(status) };
  };
  return { calls, render() { cursor = 0; return Component({ rpcCall, t: (key) => dictionary[key] ?? key }); } };
}

function nodes(tree, predicate) {
  if (!tree || typeof tree !== 'object') return [];
  return [...(predicate(tree) ? [tree] : []), ...tree.children.flatMap((child) => nodes(child, predicate))];
}

function text(tree) {
  if (tree == null || typeof tree === 'boolean') return '';
  if (typeof tree !== 'object') return String(tree);
  return tree.children.map(text).join('');
}

function button(tree, label) {
  const matches = nodes(tree, (node) => node.type === 'button' && text(node) === label);
  assert.equal(matches.length, 1, `Expected one button: ${label}`);
  return matches[0];
}

function wan(tree) {
  return nodes(tree, (node) => node.props['data-dshp-section'] === 'wan')[0];
}

function switchOf(tree) {
  return nodes(wan(tree), (node) => node.props.role === 'switch')[0];
}

async function settle() {
  await new Promise((resolve) => setImmediate(resolve));
}

for (const dictionary of [zh, en]) {
  test(`公网设置：${dictionary === zh ? '中文' : 'English'} 默认随机域名零配置，切换/开启走 RPC`, async () => {
    const page = mount({ dictionary });
    let tree = page.render();
    const wanText = text(wan(tree));
    assert.ok(wanText.includes(dictionary.modeQuick), '随机域名模式按钮');
    assert.ok(wanText.includes(dictionary.modeNamed), '固定域名模式按钮');
    assert.ok(wanText.includes(dictionary.quickOffHint), '零配置说明');
    assert.equal(nodes(wan(tree), (node) => node.props['data-dshp-pin']).length, 1, 'quick 模式也显示公网密码');
    assert.equal(nodes(wan(tree), (node) => node.type === 'input').length, 0, 'quick 模式没有配置表单');

    // 切到固定域名但未配置：展开表单，不直接改模式
    button(tree, dictionary.modeNamed).props.onClick();
    await settle();
    tree = page.render();
    assert.equal(page.calls.length, 0, '未配置时只展开表单');
    assert.equal(nodes(wan(tree), (node) => node.type === 'input').length, 2);
    assert.equal(switchOf(tree).props.disabled, true, '表单打开时公网开关禁用，避免误启 Quick');
    assert.equal(nodes(wan(tree), (node) => node.type === 'button' && text(node) === dictionary.enable).length, 0, '不再显示 Quick 开启 CTA');
    const modeButtons = nodes(wan(tree), (node) => node.type === 'button' && [dictionary.modeQuick, dictionary.modeNamed].includes(text(node)));
    assert.equal(modeButtons.length, 2);
    assert.ok(modeButtons.every((node) => node.props.disabled === true), '表单打开时模式按钮也禁用，避免抹掉已输入内容');

    // 保存固定域名配置 → 只保存不启动
    const inputs = nodes(wan(tree), (node) => node.type === 'input');
    inputs[0].props.onChange({ target: { value: 'pocket.example.com' } });
    inputs[1].props.onChange({ target: { value: 'fake-cloudflared-token-for-ui-tests' } });
    await button(page.render(), dictionary.save).props.onClick();
    tree = page.render();
    assert.deepEqual(page.calls.map((call) => call.endpoint), [POCKET_ENDPOINTS.tunnelSetConfig]);
    assert.equal(page.calls[0].payload.mode, 'named');
    assert.ok(text(wan(tree)).includes('pocket.example.com'));
    assert.equal(switchOf(tree).props['aria-checked'], false);
    assert.ok(!text(tree).includes('fake-cloudflared-token-for-ui-tests'), '保存后不回显 Token');
  });

  test(`公网设置：${dictionary === zh ? '中文' : 'English'} 切回 quick 只发 mode，不需要凭据`, async () => {
    const page = mount({ configured: true, mode: 'named', dictionary });
    let tree = page.render();
    button(tree, dictionary.modeQuick).props.onClick();
    await settle();
    tree = page.render();
    assert.equal(page.calls[0].endpoint, POCKET_ENDPOINTS.tunnelSetConfig);
    assert.equal(page.calls[0].payload.mode, 'quick', 'quick 只切模式');
    assert.equal(page.calls[0].payload.hostname, undefined, 'quick 不需要 hostname');
    assert.equal(page.calls[0].payload.token, undefined, 'quick 不需要 token');
    assert.ok(text(wan(tree)).includes(dictionary.quickOffHint));
  });
}

test('公网设置：Quick 开启须确认免责声明，启动/停止走独立端点', async () => {
  const page = mount();
  button(page.render(), zh.enable).props.onClick();
  let tree = page.render();
  assert.equal(button(tree, zh.disclaimerAgree).props.disabled, true);
  assert.equal(page.calls.length, 0);
  nodes(tree, (node) => node.type === 'input' && node.props.type === 'checkbox')[0].props.onChange({ target: { checked: true } });
  tree = page.render();
  assert.equal(button(tree, zh.disclaimerAgree).props.disabled, false);
  button(tree, zh.disclaimerAgree).props.onClick();
  await settle();
  tree = page.render();
  assert.equal(page.calls[0].endpoint, POCKET_ENDPOINTS.tunnelStart);
  assert.equal(page.calls[0].payload.disclaimer, true);
  assert.equal(switchOf(tree).props['aria-checked'], true);
  assert.equal(nodes(wan(tree), (node) => node.type === 'img').length, 1);
  assert.ok(text(wan(tree)).includes(QUICK_URL));
  await switchOf(tree).props.onClick();
  assert.equal(page.calls[1].endpoint, POCKET_ENDPOINTS.tunnelStop);
  assert.equal(switchOf(page.render()).props['aria-checked'], false);
});

test('公网设置：固定域名已配置时再次确认免责声明，启动使用固定域名', async () => {
  const page = mount({ configured: true, mode: 'named' });
  button(page.render(), zh.enable).props.onClick();
  let tree = page.render();
  assert.equal(button(tree, zh.disclaimerAgree).props.disabled, true);
  nodes(tree, (node) => node.type === 'input' && node.props.type === 'checkbox')[0].props.onChange({ target: { checked: true } });
  button(page.render(), zh.disclaimerAgree).props.onClick();
  await settle();
  tree = page.render();
  assert.equal(page.calls[0].endpoint, POCKET_ENDPOINTS.tunnelStart);
  assert.ok(text(wan(tree)).includes('https://pocket.example.com'));
});

test('公网设置：编辑时 Token 留空不覆盖旧值，保存中禁止公网开关', async () => {
  let finish;
  const page = mount({ configured: true, mode: 'named', rpc: () => new Promise((resolve) => { finish = resolve; }) });
  button(page.render(), zh.namedEdit).props.onClick();
  let tree = page.render();
  assert.equal(nodes(wan(tree), (node) => node.type === 'input' && node.props.type === 'password')[0].props.value, '');
  const pending = button(tree, zh.save).props.onClick();
  tree = page.render();
  assert.equal(page.calls[0].payload.token, undefined);
  assert.equal(switchOf(tree).props.disabled, true);
  assert.equal(button(tree, zh.save).props.disabled, true);
  assert.equal(button(tree, zh.cancel).props.disabled, true);
  finish({ ok: false, error: { message: 'configuration rejected' } });
  await pending;
  tree = page.render();
  assert.ok(text(wan(tree)).includes('configuration rejected'));
  assert.equal(switchOf(tree).props.disabled, true, '表单仍打开时公网开关保持禁用');
  button(tree, zh.cancel).props.onClick();
  tree = page.render();
  assert.equal(switchOf(tree).props.disabled, false, '取消表单后恢复开关');
  assert.equal(page.calls.length, 1);
});

test('公网设置：运行中切换模式会停止旧隧道，避免设置与实际入口不一致', async () => {
  const page = mount({ configured: true, mode: 'named' });
  button(page.render(), zh.enable).props.onClick();
  nodes(page.render(), (node) => node.type === 'input' && node.props.type === 'checkbox')[0].props.onChange({ target: { checked: true } });
  button(page.render(), zh.disclaimerAgree).props.onClick();
  await settle();
  let tree = page.render();
  assert.equal(switchOf(tree).props['aria-checked'], true);
  button(tree, zh.modeQuick).props.onClick();
  await settle();
  tree = page.render();
  assert.equal(page.calls.at(-1).endpoint, POCKET_ENDPOINTS.tunnelSetConfig);
  assert.equal(page.calls.at(-1).payload.mode, 'quick');
  assert.equal(switchOf(tree).props['aria-checked'], false, '旧固定域名隧道已停止');
  assert.equal(nodes(wan(tree), (node) => node.type === 'img').length, 0, '旧地址二维码不再展示');
  assert.ok(text(tree).includes(zh.configStopped), '运行中切换模式要提示旧隧道已停止');
});

test('公网设置：运行中只改 Token 保存也会停止旧隧道', async () => {
  const page = mount({ configured: true, mode: 'named' });
  button(page.render(), zh.enable).props.onClick();
  nodes(page.render(), (node) => node.type === 'input' && node.props.type === 'checkbox')[0].props.onChange({ target: { checked: true } });
  button(page.render(), zh.disclaimerAgree).props.onClick();
  await settle();
  let tree = page.render();
  assert.equal(switchOf(tree).props['aria-checked'], true);
  button(tree, zh.namedEdit).props.onClick();
  tree = page.render();
  assert.equal(switchOf(tree).props.disabled, false, '运行中打开表单仍可用开关立即关闭公网');
  nodes(wan(tree), (node) => node.type === 'input' && node.props.type === 'password')[0].props.onChange({ target: { value: 'fake-rotated-token-for-ui-tests' } });
  await button(page.render(), zh.save).props.onClick();
  tree = page.render();
  assert.equal(page.calls.at(-1).endpoint, POCKET_ENDPOINTS.tunnelSetConfig);
  assert.equal(page.calls.at(-1).payload.token, 'fake-rotated-token-for-ui-tests');
  assert.equal(switchOf(tree).props['aria-checked'], false, '旧 Token 隧道已停止，需重新开启应用新 Token');
  assert.ok(text(tree).includes(zh.configStopped), '保存配置后要提示旧隧道已停止');
});

test('公网设置：恢复出厂回到随机域名，不留下公网入口或二维码', async () => {
  const page = mount({ configured: true, mode: 'named' });
  button(page.render(), zh.resetGo).props.onClick();
  await button(page.render(), zh.resetConfirm).props.onClick();
  const tree = page.render();
  assert.equal(page.calls[0].endpoint, POCKET_ENDPOINTS.pocketReset);
  assert.equal(page.calls[0].payload.confirm, true);
  assert.equal(nodes(wan(tree), (node) => node.type === 'img').length, 0);
  assert.equal(switchOf(tree).props['aria-checked'], false);
  assert.ok(text(wan(tree)).includes(zh.quickOffHint));
});

test('源码与构建产物都带回了 Quick Tunnel（免账号随机域名）', () => {
  for (const relative of ['../client/index.jsx', '../client/client.js', '../client/pocket-locales.js', '../lib/tunnel.mjs', '../bin/dsh-pocket.mjs']) {
    const source = readFileSync(new URL(relative, import.meta.url), 'utf8');
    assert.match(source, /startQuickTunnel|QUICK_TUNNEL_URL_RE|modeQuick|quickOffHint/, relative);
  }
  for (const relative of ['../lib/settings.mjs', '../lib/service.mjs', '../lib/index.js', '../lib/web-rpc.js']) {
    assert.doesNotMatch(readFileSync(new URL(relative, import.meta.url), 'utf8'), /随机隧道已移除|不再支持随机/, relative);
  }
});
