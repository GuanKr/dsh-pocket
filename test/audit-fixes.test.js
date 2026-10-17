// 审计修复回归测试（2026-10）：
//  1) fileRead 权限边界：凭据/密钥类路径一律拒绝；能枚举工作区时只允许工作区内；
//  2) isTrustedLoopbackRequest 的 IPv6 / 127.0.0.0/8 判定；
//  3) 登录限速的全局锁不连坐「成功登录过的来源」（防被攻击者刷成 DoS）。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer, request as httpRequest } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { mkdtempSync, writeFileSync, unlinkSync } from 'node:fs';
import { installPocketRpc, isTrustedLoopbackRequest } from '../lib/web-rpc.js';
import { createPocketProxy } from '../lib/proxy.mjs';
import { POCKET_ENDPOINTS } from '../client/api.js';

/** mock ctx：抓 RPC 处理函数，并可按需提供工作区服务。 */
function makeCtx(services = {}) {
  let handler = null;
  const ctx = {
    connection: { rpc: { handle: (_channel, fn) => { handler = fn; return () => {}; } } },
    get: (name) => services[name],
  };
  return { ctx, call: (endpoint, payload, signal) => handler(endpoint, payload, signal) };
}

function tmpFile(name, content) {
  const dir = mkdtempSync(join(tmpdir(), 'pocket-audit-'));
  const file = join(dir, name);
  writeFileSync(file, content);
  return { dir, file };
}

test('fileRead：凭据/密钥类路径一律拒绝（先于存在性检查）', async () => {
  const { ctx, call } = makeCtx();
  installPocketRpc(ctx, { service: { status: async () => ({}) } });
  const cases = [
    ['~/.ssh/id_rsa', '私钥目录'],
    ['~/.dsh/.env', '隐藏配置目录 + .env'],
    ['/srv/app/.env.local', '.env 变体'],
    ['/srv/app/certs/server.pem', '.pem 证书'],
    ['/srv/app/tls/client.key', '.key 私钥'],
    ['/home/u/.aws/credentials', 'AWS 凭据'],
    ['/home/u/.git-credentials', 'git 凭据'],
  ];
  for (const [path, label] of cases) {
    const res = await call(POCKET_ENDPOINTS.fileRead, { path });
    assert.equal(res.ok, false, `${label} 应被拒绝：${path}`);
    assert.match(String(res.error?.message ?? ''), /凭据|credential/, `${label} 应给出凭据类拒绝文案`);
  }
});

test('fileRead：能枚举工作区时只允许读工作区内的文件', async () => {
  const inside = tmpFile('inside.txt', 'inside-content\n');
  const outside = tmpFile('outside.txt', 'outside-content\n');
  const { ctx, call } = makeCtx({ workspaceRegistry: { list: [{ cwd: inside.dir }] } });
  installPocketRpc(ctx, { service: { status: async () => ({}) } });
  try {
    const ok = await call(POCKET_ENDPOINTS.fileRead, { path: inside.file });
    assert.equal(ok.ok, true, '工作区内文件应可读');
    assert.equal(ok.value.content, 'inside-content\n');
    const denied = await call(POCKET_ENDPOINTS.fileRead, { path: outside.file });
    assert.equal(denied.ok, false, '工作区外文件应被拒绝');
    assert.match(String(denied.error?.message ?? ''), /工作区/, '应给出工作区限制文案');
  } finally {
    for (const f of [inside.file, outside.file]) { try { unlinkSync(f); } catch { /* ignore */ } }
  }
});

test('isTrustedLoopbackRequest：IPv6 方括号与 127.0.0.0/8 都算 loopback', () => {
  const req = (headers) => ({ headers });
  assert.equal(isTrustedLoopbackRequest(req({ host: '[::1]:3080' })), true, '[::1]:3080 应受信');
  assert.equal(isTrustedLoopbackRequest(req({ host: '127.0.0.2:3081' })), true, '127.0.0.2 应受信');
  assert.equal(isTrustedLoopbackRequest(req({ host: 'localhost:3080' })), true, 'localhost 应受信');
  assert.equal(isTrustedLoopbackRequest(req({ host: '192.168.1.5:3081' })), false, '局域网地址不应受信');
  assert.equal(isTrustedLoopbackRequest(req({ host: '[::1]:3080', 'sec-fetch-site': 'cross-site' })), false, '跨站请求不应受信');
  assert.equal(isTrustedLoopbackRequest(req({ host: '[::1]:3080', origin: 'http://evil.example' })), false, 'Origin 与 Host 不一致不应受信');
  assert.equal(isTrustedLoopbackRequest(req({ host: '[::1]:3080', origin: 'http://[::1]:3080' })), true, 'Origin 与 Host 一致应受信');
});

test('登录限速：全局锁豁免已成功登录过的来源，仍拦没成功过的来源', async () => {
  const TOKEN = '12345678';
  const up = createServer((_req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end('<html><body>dsh</body></html>');
  });
  await new Promise((r) => up.listen(0, '127.0.0.1', r));
  const proxy = await createPocketProxy({
    port: 0,
    host: '127.0.0.1',
    upstream: { host: '127.0.0.1', port: up.address().port },
    auth: { getToken: () => TOKEN, isProtected: () => true },
    rateLimit: { windowMs: 60_000, maxFailures: 99, lockMs: 5_000, globalMaxFailures: 2, globalLockMs: 30_000 },
  });
  const login = (ip, pin) => new Promise((resolve, reject) => {
    const req = httpRequest({
      host: '127.0.0.1', port: proxy.port, method: 'POST', path: '/pocket-login',
      headers: { Host: 'abc.trycloudflare.com', 'Content-Type': 'application/x-www-form-urlencoded', 'cf-connecting-ip': ip },
    }, (res) => {
      res.resume();
      res.on('end', () => resolve({ status: res.statusCode }));
    });
    req.on('error', reject);
    req.write('token=' + pin);
    req.end();
  });
  try {
    // IP-A 成功登录 → 记为可信来源
    assert.equal((await login('10.9.0.1', TOKEN)).status, 302, '正确密码登录成功');
    // 两个陌生 IP 各失败一次 → 达到全局阈值，全局锁生效
    assert.equal((await login('10.9.0.2', '00000000')).status, 200);
    assert.equal((await login('10.9.0.3', '00000000')).status, 200);
    // 没成功过的新 IP → 被全局锁拦
    assert.equal((await login('10.9.0.4', '00000000')).status, 429, '陌生来源应被全局锁拦');
    // 成功过的 IP 不被连坐：仍能正常拿到登录页（而不是 429）
    assert.equal((await login('10.9.0.1', '00000000')).status, 200, '已登录过的来源不应被全局锁连坐');
  } finally {
    await proxy.close();
    await new Promise((r) => up.close(r));
  }
});
