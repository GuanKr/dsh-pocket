// 设置页视图件契约（2026-10-19 v3 重构）：Btn 同时支持 props.children 与
// Btn({...}, '文案') 的旧式第二参数。
//
// 背景：重构时把 Btn 从「位置参数」改成「单 props 对象」，但调用点仍是旧写法，
// 第二参数被静默丢弃 → 页面上所有文字按钮变成空壳（复制链接/刷新/自定义/保存…），
// 只保留图标，用户直接看到一排空白按钮。渲染层不报错，测试也照不到，故用源码契约兜住。
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../client/index.jsx', import.meta.url), 'utf8');

test('Btn 必须同时接收位置参数与 props.children', () => {
  assert.match(src, /const Btn = \(props, \.\.\.extraChildren\)/, 'Btn 签名必须接收位置参数 children');
  assert.ok(
    src.includes('extraChildren.length > 0 ? extraChildren : propChildren'),
    '必须合并两种传法（只解构 props 会静默丢文案）',
  );
});

test('现有调用点确实在用旧式第二参数（保证上一条测试有意义）', () => {
  const positional = src.match(/Btn\(\{[\s\S]{0,400}?\}, t\('/g) ?? [];
  assert.ok(positional.length >= 10, `应存在旧式 Btn({...}, t('...')) 调用点（实际 ${positional.length}）`);
});
