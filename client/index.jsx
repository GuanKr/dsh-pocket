// dsh-pocket 网页客户端：
//   1. 设置页签「手机访问」（局域网/公网通道卡 + 二维码 + 更新/重启提示）
//   2. 移动端适配（移植自 MIT 项目 dsh-web-mobile，见 client/mobile/LICENSE.dsh-web-mobile）
//
// 手机扫码打开的就是电脑上的 dsh web，实时同步；窄屏自动变成抽屉布局。
//
// 设置页设计（v2 重设计）：
//   - 单列三区：连接（局域网/公网两个通道小节）→ 偏好 → 尾部（恢复出厂 + 署名行）；
//   - 二维码横排卡：左 128px 码 + 右地址/提示/复制，不再整宽堆叠；
//   - 访问密码默认遮罩（••••••••，不泄露长度），「显示」按需明文；
//   - 分段控件（公网地址模式）、统一样式的确认弹窗与 Alert 提示条。
//
// 注：Web Push 已移除——浏览器推送依赖 Google FCM（Chrome）等境外服务，
// 国内直连被墙，普通用户用不了。专注扫码同屏这一件事。

import { createElement as h, useEffect, useRef, useState } from 'react';

import { POCKET_RPC_CHANNEL, POCKET_ENDPOINTS, MOBILE_RIGHTBAR_ATTRIBUTE, MOBILE_RIGHTBAR_EVENT, MOBILE_PINCH_ZOOM_ATTRIBUTE, MOBILE_PINCH_ZOOM_EVENT, redactStatus, compareVersions, isSameRepo } from './api.js';
import { mobileApply } from './mobile/mobile-apply.tsx';
import { NS as POCKET_NS, zh as POCKET_ZH, en as POCKET_EN } from './pocket-locales.js';

const name = 'dsh-pocket';
// inject 必须是 upstream（client/mobile/upstream/index.tsx）inject 的超集：
// v3.1.0 起新增 'sessions'（session-focus-guard 读 ctx.sessions.list），
// 漏声明会让宿主给 ctx.sessions 传 undefined，激活即抛错 "did not activate"。
const inject = ['slots', 'connection', 'layout', 'locale', 'sessionLogDownload', 'sessions'];

// 词典在 pocket-locales.js；这里只做「取 key → 替换 {占位符} → 字符串」。
// 不依赖 DSH t() 的插值能力，避免行为不一致。
function fmt(t, key, vars) {
  let s = t(key);
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = String(s).split(`{${k}}`).join(String(v));
    }
  }
  return s;
}

// 官方 DeepSeek Harness 设计系统（dsh-client-ui-theme design-platform.css）：
// 按钮 md=36px 胶囊形 / sm=28px；品牌色 --dsw-alias-brand-primary；
// hover 走 --dsw-alias-button-*-hover；间距 4px 栅格；正文 13px。
// v2 在此基础上收敛：区块之间用留白，行之间用发丝线；提示全部走 12px 三级文字色。
const styles = {
  card: { background: 'var(--dsw-alias-bg-layer-1,#fff)', border: '1px solid var(--dsw-alias-border-l2,#e5e7eb)', borderRadius: 14, padding: '18px 20px', maxWidth: 520 },
  muted: { color: 'var(--dsw-alias-label-tertiary,#8b93a1)', fontSize: 12, lineHeight: 1.5 },
  // 主按钮：官方 md 胶囊形（36px）
  primary: { font: 'inherit', cursor: 'pointer', border: 'none', background: 'var(--dsw-alias-button-primary-fill, var(--dsw-alias-brand-primary,#4f6ef7))', color: 'var(--dsw-alias-label-primary-foreground, #fff)', height: 36, padding: '0 16px', borderRadius: 999, fontSize: 13, fontWeight: 500, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
  // 次级按钮：官方 outline/ghost 胶囊形
  btn: { font: 'inherit', cursor: 'pointer', border: '1px solid var(--dsw-alias-button-ghost-active-border, var(--dsw-alias-border-l2,#d1d5db))', background: 'var(--dsw-alias-bg-layer-1,#fff)', color: 'var(--dsw-alias-label-primary,inherit)', height: 36, padding: '0 16px', borderRadius: 999, fontSize: 13, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
  // 行内小按钮（28px）：密码行的 显示/刷新/自定义、复制链接
  mini: { font: 'inherit', cursor: 'pointer', border: '1px solid var(--dsw-alias-border-l2,#d1d5db)', background: 'var(--dsw-alias-bg-layer-1,#fff)', color: 'var(--dsw-alias-label-secondary,#6b7280)', height: 26, padding: '0 10px', borderRadius: 999, fontSize: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
  link: { font: 'inherit', cursor: 'pointer', border: 'none', background: 'none', padding: 0, fontSize: 12, color: 'var(--dsw-alias-label-tertiary,#8b93a1)', textDecoration: 'none' },
  warn: { color: 'var(--dsw-alias-state-warn-primary,#b45309)', fontSize: 12, lineHeight: 1.5 },
  mono: { fontFamily: 'ui-monospace,Menlo,monospace', letterSpacing: 0.5 },
};

// 状态圆点（通道开启/关闭）：8px，成功色，关闭走灰
const Dot = (on) => h('span', {
  style: { display: 'inline-block', width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: on ? 'var(--dsw-alias-state-success-primary,#10b981)' : 'var(--dsw-alias-border-l2,#d1d5db)' },
}, null);

function applyMobileRightbarSetting(enabled) {
  const on = enabled !== false;
  document.body?.setAttribute(MOBILE_RIGHTBAR_ATTRIBUTE, on ? 'on' : 'off');
  window.dispatchEvent(new CustomEvent(MOBILE_RIGHTBAR_EVENT, { detail: { enabled: on } }));
}

function applyMobilePinchZoomSetting(enabled) {
  const on = enabled === true;
  document.body?.setAttribute(MOBILE_PINCH_ZOOM_ATTRIBUTE, on ? 'on' : 'off');
  window.dispatchEvent(new CustomEvent(MOBILE_PINCH_ZOOM_EVENT, { detail: { enabled: on } }));
}

// 剪贴板：优先 Clipboard API（需安全上下文），LAN http 场景回退 execCommand
async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { /* 回退 */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok === true;
  } catch {
    return false;
  }
}

function PocketSettingsTab({ rpcCall, t }) {
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [tunnelState, setTunnelState] = useState(null); // 隧道进度 {phase, detail, startedAt}
  const [restartNotice, setRestartNotice] = useState(false); // 重启后提示
  const [updateInfo, setUpdateInfo] = useState(null); // { current, latest, updating, result, startedAt } | null
  const [isDesktop, setIsDesktop] = useState(false); // DSH Desktop（Electron）环境：更新/重启由桌面版管理
  const [now, setNow] = useState(Date.now()); // 每秒 tick，驱动倒计时
  const [pinShown, setPinShown] = useState({}); // 密码明文开关 { lan?: true, public?: true }——默认遮罩

  // 进行中操作的「已等待 X 秒」倒计时——只在有活跃倒计时（更新/重启进行中、隧道
  // 连接中）时才挂每秒 tick，操作结束即卸载；空闲设置页不再无条件每秒重渲染
  useEffect(() => {
    const countdownActive =
      !!((updateInfo?.updating || updateInfo?.restarting) && updateInfo?.startedAt) ||
      !!(tunnelState?.startedAt && ['downloading', 'starting', 'registering'].includes(tunnelState?.phase ?? ''));
    if (!countdownActive) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [updateInfo, tunnelState]);
  const elapsed = (startedAt) => (startedAt ? Math.max(0, Math.floor((Date.now() - startedAt) / 1000)) : 0);

  const call = async (endpoint, payload) => {
    const res = await rpcCall(endpoint, payload);
    if (!res?.ok) throw new Error(res?.error?.message ?? 'RPC failed');
    return res.value;
  };

  const load = async () => {
    try {
      const s = await call(POCKET_ENDPOINTS.status, {});
      setStatus(s);
      applyMobileRightbarSetting(s.mobileRightbarEnabled);
      applyMobilePinchZoomSetting(s.mobilePinchZoomEnabled);
      setTunnelState(s.tunnelState ?? null);
      if (s.desktop) setIsDesktop(true);
      if (s.restartNotice) {
        // 新进程确认起来了：显示一次「已重启」，清掉旧的更新横幅（单状态，不并存），
        // 然后自动刷新页面加载新代码——不用用户手动刷新
        setRestartNotice(true);
        setUpdateInfo(null);
        if (!sessionStorage.getItem('dshp-auto-reloaded')) {
          sessionStorage.setItem('dshp-auto-reloaded', '1');
          setTimeout(() => { try { location.reload(); } catch { /* 忽略 */ } }, 2000);
        }
      }
    } catch { /* 忽略瞬时失败 */ }
  };

  useEffect(() => {
    load();
    // 页面不可见时跳过 status 轮询，回到前台后下一拍（≤3s）自动恢复
    const t = setInterval(() => { if (!document.hidden) load(); }, 3000);
    return () => clearInterval(t);
  }, []);

  // 每次页面加载清掉自动刷新标记——这样下次重启（更新后）才能再次触发自动刷新
  useEffect(() => {
    try { sessionStorage.removeItem('dshp-auto-reloaded'); } catch { /* 忽略 */ }
  }, []);

  // 版本检测：host 当前版本 vs npm registry latest（registry 带 CORS *）
  // 两种情况显示横幅：① 有新版可更新；② 磁盘已更新但进程还是旧代码（重启生效）
  // cache: 'no-store' —— registry 响应带缓存头，浏览器会缓存旧版本号导致「小版本不提示」
  // 周期重查（每 5 分钟）：npm registry 的 /latest 走 CDN 边缘缓存，刚发布后打开页面
  // 可能拿到旧版本号——周期性重查让更新提示在缓存刷新后自动出现，不用重开页面。
  // 桌面端（isDesktop）：更新/重启由 DSH Desktop 管理，这里不做版本检测、不显示更新横幅
  useEffect(() => {
    if (isDesktop) return;
    let alive = true;
    const check = async () => {
      try {
        const v = await call(POCKET_ENDPOINTS.version, {});
        const meta = await (await fetch('https://registry.npmjs.org/dsh-pocket/latest', { cache: 'no-store' })).json();
        if (!alive) return;
        const latest = typeof meta?.version === 'string' ? meta.version : null;
        const upstreamRepo = typeof meta?.repository === 'string' ? meta.repository : meta?.repository?.url ?? null;
        // fork/分支安装（repository 与 npm 上游不同源）不比 npm 版本：版本号滞后是常态，
        // 横幅会永远挂着；且一键更新会把上游代码盖在本地修改上。只保留「已更新未重启」本地分支。
        const npmManaged = isSameRepo(v.repository ?? null, upstreamRepo);
        if (npmManaged && latest && v.current && compareVersions(latest, v.current) > 0) {
          setUpdateInfo({ current: v.current, latest, updating: false, result: null });
        } else if (v.current && v.loaded && compareVersions(v.current, v.loaded) > 0) {
          // 已更新未重启：显示「已更新，重启生效」+ 重启按钮
          setUpdateInfo({ current: v.current, latest: v.current, updating: false, result: 'ok', updated: true });
        }
      } catch { /* 网络失败静默 */ }
    };
    check();
    const t = setInterval(check, 5 * 60 * 1000);
    return () => { alive = false; clearInterval(t); };
  }, [isDesktop]);

  // 重启宿主（更新生效必需：刷新页面不会重载服务端代码）
  const restartPocket = async () => {
    setUpdateInfo((u) => ({ ...u, restarting: true, startedAt: Date.now() }));
    try {
      // 宿主 500ms 后自杀，RPC 响应可能来不及送达 → 3 秒超时兜底，别让按钮永远卡「重启中…」
      await Promise.race([
        call(POCKET_ENDPOINTS.restart, {}),
        new Promise((_, rej) => setTimeout(() => rej(new Error('restart requested (no reply within 3s)')), 3000)),
      ]);
      setUpdateInfo((u) => ({ ...u, restarting: true, result: 'ok' }));
    } catch (err) {
      // 网络断连/超时同样视为「已请求重启」——旧进程即将退出，等新进程起来后刷新即可
      const msg = String(err?.message ?? '');
      if (/connection|socket|fetch|network|abort|cancelled|ECONN|disconnect|closed|timeout/i.test(msg)) {
        setUpdateInfo((u) => ({ ...u, restarting: true, result: 'ok' }));
        return;
      }
      setUpdateInfo((u) => ({ ...u, restarting: false, result: 'fail', output: err.message }));
    }
  };

  // 一键更新：调宿主 dsh plugin update（成功后宿主自动重启生效，用户只点一次）
  const runUpdate = async () => {
    setUpdateInfo((u) => ({ ...u, updating: true, result: null, startedAt: Date.now() }));
    try {
      const r = await call(POCKET_ENDPOINTS.update, {});
      setUpdateInfo((u) => ({
        ...u,
        updating: false,
        result: r.ok ? 'ok' : 'fail',
        autoRestart: r.autoRestart === true,
        output: r.output ?? r.error,
      }));
    } catch (err) {
      setUpdateInfo((u) => ({ ...u, updating: false, result: 'fail', output: err.message }));
    }
  };

  // 安全免责声明（issue #31）：每次开启公网都必须先弹框勾选「我已知情」。
  // 服务端同样强制（tunnel.start 需 disclaimer: true），防绕过前端直接调 RPC。

  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);

  const doStartTunnel = async () => {
    // 命名隧道模式：Token/域名没配齐就不发起（服务端同样会拒绝）
    const cfg = status?.tunnelConfig;
    if (cfg?.mode === 'named' && (!cfg.hostname || !cfg.tokenSet)) {
      setError(t('namedNeedCfg'));
      return;
    }
    setBusy(true);
    setError(null);
    setTunnelState({ phase: 'starting', detail: '正在开启…', startedAt: Date.now() });
    try {
      setStatus(await call(POCKET_ENDPOINTS.tunnelStart, { disclaimer: true }));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };
  const startTunnel = () => {
    // 每次开启都弹免责确认（勾选后才能继续）
    setDisclaimerChecked(false);
    setDisclaimerOpen(true);
  };
  const confirmDisclaimer = () => {
    if (!disclaimerChecked) return; // 未勾选不允许
    setDisclaimerOpen(false);
    doStartTunnel();
  };

  const stopTunnel = async () => {
    try { setStatus(await call(POCKET_ENDPOINTS.tunnelStop, {})); } catch { /* 忽略 */ }
  };

  // 公网模式（issue #66）：随机域名（默认零配置）/ 固定域名（Cloudflare 命名隧道 + Tunnel Token）
  // tunnelCfg：编辑态 { hostname, token, err } | null；token 输入留空 = 保持已存的 Token 不变
  const [tunnelCfg, setTunnelCfg] = useState(null);
  const switchToQuick = async () => {
    try { setStatus(await call(POCKET_ENDPOINTS.tunnelSetConfig, { mode: 'quick' })); } catch (err) { setError(err.message); }
  };
  const saveNamedTunnel = async () => {
    try {
      setStatus(await call(POCKET_ENDPOINTS.tunnelSetConfig, {
        mode: 'named',
        hostname: tunnelCfg?.hostname ?? '',
        token: tunnelCfg?.token || undefined, // 留空不覆盖已存 Token
      }));
      setTunnelCfg(null);
    } catch (err) {
      setTunnelCfg((c) => ({ ...c, err: err.message }));
    }
  };

  // 恢复出厂设置：清本机设置 + 重设随机密码（弹窗确认；RPC 端也强制校验 confirm）
  const [resetOpen, setResetOpen] = useState(false);
  const doFactoryReset = async () => {
    setResetOpen(false);
    setBusy(true);
    setError(null);
    try {
      const next = await call(POCKET_ENDPOINTS.pocketReset, { confirm: true });
      setStatus(next);
      applyMobileRightbarSetting(next.mobileRightbarEnabled);
      applyMobilePinchZoomSetting(next.mobilePinchZoomEnabled);
      setTunnelCfg(null);
      setCustomPin(null);
      setAdvOpen(false);
      setPinShown({});
      showToast(t('resetDone'));
    } catch (err) {
      setError(err.message);
      showToast(t('resetFailed'));
    } finally {
      setBusy(false);
    }
  };

  // 刷新局域网访问密码（旧密码立即作废）
  const refreshLanPin = async () => {
    try {
      const r = await call(POCKET_ENDPOINTS.lanTokenRefresh, {});
      setStatus((s) => ({ ...s, lanToken: r.lanToken }));
    } catch { /* 忽略 */ }
  };

  // 局域网访问密码开关（issue #24）：默认开启；关闭后局域网扫码直连（公网不受影响）
  const setLanAuth = async (on) => {
    try {
      const r = await call(POCKET_ENDPOINTS.lanAuthSetEnabled, { on });
      setStatus((s) => ({ ...s, lanAuthEnabled: r.lanAuthEnabled }));
    } catch { /* 忽略 */ }
  };

  const setMobileRightbar = async (on) => {
    try {
      const r = await call(POCKET_ENDPOINTS.mobileRightbarSetEnabled, { on });
      const enabled = r.mobileRightbarEnabled === true;
      setStatus((s) => ({ ...s, mobileRightbarEnabled: enabled }));
      applyMobileRightbarSetting(enabled);
    } catch (err) {
      setError(err.message);
    }
  };

  const setMobilePinchZoom = async (on) => {
    try {
      const r = await call(POCKET_ENDPOINTS.mobilePinchZoomSetEnabled, { on });
      const enabled = r.mobilePinchZoomEnabled === true;
      setStatus((s) => ({ ...s, mobilePinchZoomEnabled: enabled }));
      applyMobilePinchZoomSetting(enabled);
    } catch (err) {
      setError(err.message);
    }
  };

  // 局域网访问总开关：关闭后局域网扫码/链接直接失效（公网不受影响）。
  // 切换前弹窗确认（弹窗提醒）；服务端用 setLanEnabled 持久化，代理按 Host 实时拦截。
  const [lanToggleOpen, setLanToggleOpen] = useState(null); // null | true | false（目标 on 状态）
  const requestLanToggle = (on) => setLanToggleOpen(on);
  const confirmLanToggle = async () => {
    const on = lanToggleOpen;
    setLanToggleOpen(null);
    if (on === null) return;
    try {
      const r = await call(POCKET_ENDPOINTS.lanSetEnabled, { on });
      setStatus((s) => ({ ...s, lanEnabled: r.lanEnabled }));
    } catch (err) {
      setError(err.message);
    }
  };

  // 局域网地址手动覆盖（Tailscale/VPN 等远程访问场景）：空值恢复自动选择
  const setLanAddress = async (ip) => {
    try {
      setStatus(await call(POCKET_ENDPOINTS.lanSetOverride, { ip }));
    } catch (err) {
      setError(err.message);
    }
  };

  // 自定义访问密码（issue #33）：公网/局域网各自设固定 8–64 位密码（英文字母大小写或数字）；自定义后公网不再自动轮换。
  // customPin: { which: 'public'|'lan', value, err } | null —— 正在输入自定义密码的区块
  const [customPin, setCustomPin] = useState(null);
  const saveCustomPin = async (which) => {
    try {
      const r = await call(POCKET_ENDPOINTS.pinSetCustom, { which, value: customPin?.value ?? '' });
      setStatus((s) => ({
        ...s,
        accessToken: which === 'public' ? r.pin : s.accessToken,
        lanToken: which === 'lan' ? r.pin : s.lanToken,
        publicPinCustom: which === 'public' ? true : s.publicPinCustom,
        lanPinCustom: which === 'lan' ? true : s.lanPinCustom,
      }));
      setCustomPin(null);
    } catch (err) {
      setCustomPin((c) => ({ ...c, err: err.message }));
    }
  };

  const lanUrl = status?.lanUrl;
  const tunnelUrl = status?.tunnelUrl;
  const tunnelPhase = tunnelState?.phase ?? 'idle';
  const tunnelStarting = ['downloading', 'starting', 'registering'].includes(tunnelPhase);
  const tunnelStateDetail = tunnelState?.detail ?? '';
  const tunnelStateStarted = tunnelState?.startedAt ?? null;
  // 公网模式视图（issue #66）：{ mode, hostname, tokenSet }
  const tunnelModeView = status?.tunnelConfig ?? { mode: 'quick', hostname: '', tokenSet: false };
  const namedMode = tunnelModeView.mode === 'named';
  // 模式按钮选中态高亮：固定域名模式本身，或正在编辑固定域名配置，都视为「选中」
  const namedActive = namedMode || tunnelCfg !== null;
  // 后端错误消息统一为「中文 | English」混排；按当前界面语言只显示对应一半
  const errText = (msg) => {
    const s = String(msg ?? '');
    const i = s.indexOf(' | ');
    if (i < 0) return s;
    return (t('ok') === POCKET_ZH.ok ? s.slice(0, i) : s.slice(i + 3)).trim();
  };
  // 轻量 Toast：操作成功/失败后短暂提示（自动消失，不打断操作）
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const showToast = (text) => {
    setToast(text);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // ── v2 视图件 ──────────────────────────────────────────────────────────────
  // iOS 风格小开关：局域网总开关 / 公网总开关 / 局域网密码开关 / 手机端右边栏；
  // disabled 态用于操作进行中（如隧道连接），视觉半透明且不可点
  const Switch = (on, onClick, disabled) => h('button', {
    role: 'switch', 'aria-checked': !!on, disabled: disabled === true,
    style: { flexShrink: 0, width: 40, height: 22, borderRadius: 11, border: 'none', padding: 0, position: 'relative', cursor: disabled === true ? 'default' : 'pointer', font: 'inherit', opacity: disabled === true ? 0.55 : 1, background: on ? 'var(--dsw-alias-button-primary-fill, var(--dsw-alias-brand-primary,#4f6ef7))' : 'var(--dsw-alias-border-l2,#d1d5db)', transition: 'background .15s ease' },
    onClick: disabled === true ? undefined : onClick,
  }, h('span', { style: { position: 'absolute', top: 2, left: on ? 20 : 2, width: 18, height: 18, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.18)', transition: 'left .15s ease' } }));

  // 通道小节：标题行（状态点 + 名称 + 右侧控件）+ 内容；小节之间只靠留白，不再画粗边框
  // children 只有一个槽——再加行必须包成数组传入，多余的 row 会落进 key 槽被静默丢弃
  const Section = (title, right, children, key) => {
    if (key != null && typeof key !== 'string') console.warn('[dsh-pocket] Section 参数错位：key 槽收到非字符串（多余实参会被静默丢弃），children 需为数组', key);
    return h('section', { style: { marginTop: 20 }, 'data-dshp-section': key ?? '' },
    h('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
      title ? h('span', { style: { fontWeight: 600, fontSize: 13, flex: 1, minWidth: 0, display: 'inline-flex', alignItems: 'center', gap: 6 } }, title) : h('span', { style: { flex: 1 } }, null),
      right ?? null),
    children ?? null);
  };

  // 设置行：发丝线分隔；第一行 = 左标签 + 右控件；extra 追加在下方
  const row = (label, control, extra) => h('div', { style: { borderTop: '1px solid var(--dsw-alias-border-l2,#eceef2)', paddingTop: 10, marginTop: 10 } },
    h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' } },
      h('span', { style: { fontSize: 13 } }, label), control),
    extra ?? null);

  // 二维码横排卡：左 128px 码（白底衬 quiet zone，深色模式也稳）+ 右侧地址/提示/复制
  const qrBlock = (src, url, hint) => h('div', { style: { display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', background: 'var(--dsw-alias-bg-layer-2,#f3f4f6)', borderRadius: 12, padding: 12, marginTop: 10 } },
    h('div', { style: { flexShrink: 0, padding: 6, background: '#fff', borderRadius: 10, border: '1px solid var(--dsw-alias-border-l2,#e5e7eb)' } },
      h('img', { src, alt: 'QR', style: { width: 128, height: 128, display: 'block', borderRadius: 2 } })),
    h('div', { style: { flex: '1 1 170px', minWidth: 170 } },
      h('div', { style: { ...styles.mono, fontSize: 12, wordBreak: 'break-all', color: 'var(--dsw-alias-label-primary,inherit)', lineHeight: 1.6 } }, url),
      h('div', { style: { ...styles.muted, fontSize: 11, marginTop: 6 } }, hint),
      h('button', {
        style: { ...styles.mini, marginTop: 8 },
        onClick: async () => showToast(await copyText(url) ? t('copied') : t('copyFailed')),
      }, t('copyLink'))));

  // 紧凑提示条：kind = info(品牌蓝) | warn(琥珀) | error(红)
  const Alert = (kind, children, extraStyle) => h('div', {
    style: {
      display: 'flex', gap: 8, alignItems: 'flex-start',
      fontSize: 12, lineHeight: 1.6,
      borderRadius: 10, padding: '8px 10px', marginTop: 10,
      background: 'var(--dsw-alias-bg-layer-2,#f3f4f6)',
      borderLeft: `3px solid ${kind === 'error' ? 'var(--dsw-alias-state-error-primary,#dc2626)' : kind === 'info' ? 'var(--dsw-alias-brand-primary,#4f6ef7)' : 'var(--dsw-alias-state-warn-primary,#b45309)'}`,
      color: kind === 'error' ? 'var(--dsw-alias-state-error-primary,#dc2626)' : kind === 'warn' ? 'var(--dsw-alias-state-warn-primary,#b45309)' : 'var(--dsw-alias-label-secondary,#6b7280)',
      ...extraStyle,
    },
  }, children);

  // 访问密码值行：遮罩（固定 8 个点，不泄露长度）/明文 + 显示/隐藏 + 刷新/自定义（按钮间距放宽）
  const pinValueRow = (which, value, extraBtns) => h('div', { style: { marginTop: 8, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' } },
    h('span', { style: { ...styles.mono, fontSize: 13 }, 'data-dshp-pin': which }, pinShown[which] ? value : '••••••••'),
    h('button', {
      style: { ...styles.link, padding: '2px 0' },
      onClick: () => setPinShown((m) => ({ ...m, [which]: !m[which] })),
    }, pinShown[which] ? t('pinHide') : t('pinShow')),
    ...(extraBtns ?? []));

  // 渲染自定义输入行（共用）：输入框 + 保存/取消
  const customPinRow = (which) => h('div', { style: { marginTop: 8, fontSize: 12, color: 'var(--dsw-alias-label-secondary,#6b7280)', lineHeight: 1.5 } },
    t('customizing'),
    h('input', {
      style: { width: 130, margin: '0 6px', padding: '4px 8px', fontSize: 14, letterSpacing: 1, textAlign: 'center', border: '1px solid var(--dsw-alias-border-l2,#d1d5db)', borderRadius: 6, outline: 'none' },
      type: 'password',
      minLength: 8,
      maxLength: 64,
      value: customPin?.value ?? '',
      autoFocus: true,
      onChange: (e) => setCustomPin((c) => ({ ...c, value: e.target.value.replace(/[^a-zA-Z0-9]/g, ''), err: null })),
      onKeyDown: (e) => { if (e.key === 'Enter') saveCustomPin(which); if (e.key === 'Escape') setCustomPin(null); },
    }),
    h('button', { style: styles.mini, onClick: () => saveCustomPin(which) }, t('save')),
    h('button', { style: styles.mini, onClick: () => setCustomPin(null) }, t('cancel')),
    customPin?.err ? h('div', { style: { color: 'var(--dsw-alias-state-error-primary,#dc2626)', marginTop: 4 } }, errText(customPin.err)) : null);
  // 「自定义」按钮（非输入态显示在密码行末尾）
  const customBtn = (which) => h('button', { style: styles.mini, onClick: () => setCustomPin({ which, value: '', err: null }) }, t('customize'));

  // 公网地址模式分段控件（随机/固定域名）
  const modeSeg = h('div', { style: { display: 'inline-flex', background: 'var(--dsw-alias-bg-layer-2,#eef0f4)', borderRadius: 9, padding: 2, gap: 2 } },
    h('button', {
      style: { font: 'inherit', cursor: 'pointer', border: 'none', height: 26, padding: '0 12px', borderRadius: 7, fontSize: 12, background: !namedActive ? 'var(--dsw-alias-bg-layer-1,#fff)' : 'transparent', color: !namedActive ? 'var(--dsw-alias-label-primary,inherit)' : 'var(--dsw-alias-label-tertiary,#8b93a1)', fontWeight: !namedActive ? 600 : 400, boxShadow: !namedActive ? '0 1px 3px rgba(0,0,0,.10)' : 'none' },
      onClick: namedMode ? switchToQuick : (tunnelCfg ? () => setTunnelCfg(null) : undefined),
    }, t('modeQuick')),
    h('button', {
      style: { font: 'inherit', cursor: 'pointer', border: 'none', height: 26, padding: '0 12px', borderRadius: 7, fontSize: 12, background: namedActive ? 'var(--dsw-alias-bg-layer-1,#fff)' : 'transparent', color: namedActive ? 'var(--dsw-alias-label-primary,inherit)' : 'var(--dsw-alias-label-tertiary,#8b93a1)', fontWeight: namedActive ? 600 : 400, boxShadow: namedActive ? '0 1px 3px rgba(0,0,0,.10)' : 'none' },
      onClick: () => setTunnelCfg(tunnelCfg ? null : { hostname: tunnelModeView.hostname ?? '', token: '', err: null }),
    }, t('modeNamed')));

  // 统一确认弹窗：遮罩 + 面板（标题色随语义）+ 内容 + 右对齐操作
  const Modal = ({ title, tone = 'warn', children, actions }) => h('div', {
    style: { position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(15,17,21,.45)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  },
  h('div', { style: { background: 'var(--dsw-alias-bg-layer-1,#fff)', borderRadius: 14, maxWidth: 420, width: '100%', padding: '20px 22px', boxShadow: '0 12px 40px rgba(0,0,0,.22)' } },
    h('div', { style: { fontWeight: 600, fontSize: 15, marginBottom: 10, color: tone === 'danger' ? 'var(--dsw-alias-state-error-primary,#dc2626)' : tone === 'brand' ? 'var(--dsw-alias-brand-primary,#4f6ef7)' : 'var(--dsw-alias-state-warn-primary,#b45309)' } }, title),
    children,
    h('div', { style: { display: 'flex', gap: 8, marginTop: 18, justifyContent: 'flex-end' } }, actions)));

  // 高级（手动选地址）展开态
  const [advOpen, setAdvOpen] = useState(false);

  return h('div', { style: styles.card, 'data-dshp-ui': 'v2' },
    // 页头：一行标题 + 一行副题（署名挪到页脚，不再挤在右上角）
    h('div', null,
      h('div', { style: { fontWeight: 600, fontSize: 14 } }, t('title')),
      h('div', { style: { ...styles.muted, marginTop: 2 } }, t('subtitle')),
    ),

    // 重启后提示（进程在后台运行，停止方法）——蓝色提示条（桌面端不会触发本插件的自重启）
    // 桌面端不显示更新/重启横幅（更新由 DSH Desktop 管理），也不需要额外提示
    !isDesktop && restartNotice ? Alert('info',
      h('div', { style: { flex: 1, minWidth: 0 } },
        h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 } },
          h('span', { style: { fontWeight: 600 } }, t('restarted')),
          h('button', { style: styles.mini, onClick: () => setRestartNotice(false) }, t('ok'))),
        h('div', { style: { color: 'var(--dsw-alias-label-tertiary,#8b93a1)', wordBreak: 'break-all' } },
          fmt(t, 'bgHint', { cmd: status?.killHint ?? `lsof -ti :${status?.dshPort ?? 3080} | xargs kill -9` }))),
      { marginTop: 14 }) : null,

    // 更新提示——琥珀色提示条（有新版本/更新中/已更新待重启，单状态不并存）
    // 桌面端不渲染（更新由 DSH Desktop 管理）
    !isDesktop && updateInfo ? Alert('warn',
      h('div', { style: { flex: 1, minWidth: 0 } },
        h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' } },
          h('span', { style: { fontWeight: 600 } },
            updateInfo.updated
              ? fmt(t, 'updatedRestart', { ver: updateInfo.current })
              : updateInfo.result === 'ok'
                ? (updateInfo.autoRestart ? fmt(t, 'updateAutoRestarting', { ver: updateInfo.latest }) : fmt(t, 'updatedOk', { ver: updateInfo.latest }))
                : fmt(t, 'updateAvailable', { ver: updateInfo.latest })),
          updateInfo.result !== 'ok'
            ? h('button', { style: styles.primary, onClick: runUpdate, disabled: updateInfo.updating }, updateInfo.updating ? t('updating') : fmt(t, 'updateTo', { ver: updateInfo.latest }))
            : updateInfo.autoRestart
              ? h('button', { style: styles.btn, disabled: true }, t('restartingNow'))
              : h('button', { style: styles.primary, onClick: restartPocket, disabled: updateInfo.restarting }, updateInfo.restarting ? t('restarting') : t('restartNow'))),
        h('div', { style: { color: 'var(--dsw-alias-label-tertiary,#8b93a1)' } },
          updateInfo.updating
            ? fmt(t, 'updatingDetail', { s: elapsed(updateInfo.startedAt) })
          : updateInfo.restarting
            ? fmt(t, 'restartingDetail', { s: elapsed(updateInfo.startedAt) })
          : updateInfo.result === 'ok'
            ? (updateInfo.autoRestart ? t('updatedAutoDetail') : t('updatedRestartDetail'))
          : updateInfo.result === 'fail' ? fmt(t, 'updateFailed', { err: errText(updateInfo.output) || t('unknownError') })
          : fmt(t, 'versionRange', { cur: updateInfo.current, latest: updateInfo.latest }))),
      { marginTop: 14 }) : null,

    // ── 局域网 ────────────────────────────────────────────────────────────────
    // 标题行自带总开关 → 二维码横排卡 → 访问密码行（开关 + 遮罩值）→ 高级·手动选地址
    Section(h('span', null, Dot(status?.lanEnabled !== false), t('lanAccess')), Switch(status?.lanEnabled !== false, () => requestLanToggle(status?.lanEnabled === false)),
      status?.lanEnabled === false
        ? Alert('warn', t('lanDisabledHint'))
        : (lanUrl
          ? h('div', null,
            qrBlock(status.lanQr, lanUrl, t('lanHint')),
            // 访问密码行：开关 + 值（关闭时提示直连）
            row(t('lanPin'), Switch(status?.lanAuthEnabled !== false, () => setLanAuth(status?.lanAuthEnabled === false)),
              status?.lanAuthEnabled === false
                ? h('div', { style: { ...styles.muted, marginTop: 6 } }, t('lanPinOff'))
                : (customPin?.which === 'lan'
                  ? customPinRow('lan')
                  : h('div', null,
                    pinValueRow('lan', status.lanToken, [
                      h('button', { style: styles.mini, onClick: refreshLanPin }, t('refresh')),
                      customBtn('lan'),
                    ]),
                    status?.lanPinCustom ? h('div', { style: { ...styles.warn, fontSize: 11, marginTop: 4 } }, t('pinCustomHint')) : null))),
            // 高级：手动选地址（默认收起）
            row(t('advAddress'),
              h('button', {
                style: { ...styles.link, font: 'inherit' },
                onClick: () => setAdvOpen((v) => !v),
              }, (status?.lanIpOverride || t('lanAddressAuto')) + (advOpen ? ' ‹' : ' ›')),
              advOpen ? h('div', { style: { marginTop: 8 } },
                h('label', { style: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--dsw-alias-label-secondary,#6b7280)' } },
                  t('lanAddress'),
                  h('select', {
                    value: status?.lanIpOverride || '',
                    onChange: (e) => setLanAddress(e.target.value),
                    style: { font: 'inherit', height: 30, padding: '0 8px', borderRadius: 8, border: '1px solid var(--dsw-alias-border-l2,#d1d5db)', background: 'var(--dsw-alias-bg-layer-1,#fff)', color: 'var(--dsw-alias-label-primary,inherit)' },
                  },
                  h('option', { value: '' }, t('lanAddressAuto')),
                  (status?.lanCandidates || []).map((ip) => h('option', { key: ip, value: ip }, ip)),
                  ),
                )) : null),
          )
          : h('div', { style: { ...styles.muted, marginTop: 8 } }, t('lanStarting'))),
        'lan'),

    // ── 公网 ────────────────────────────────────────────────────────────────
    // 标题行自带总开关（与局域网同语义）：开=已连隧道，关=未开启；
    // 开启经免责声明弹窗确认，进度/错误由下方提示条呈现
    Section(h('span', null, Dot(!!tunnelUrl), t('wanAccess')),
      Switch(!!tunnelUrl, () => (tunnelUrl ? stopTunnel() : startTunnel()), tunnelStarting),
      h('div', null,
        tunnelStarting
          ? Alert('info', h('span', null,
              tunnelPhase === 'downloading'
                ? fmt(t, 'downloading', { s: elapsed(tunnelStateStarted) })
                : fmt(t, 'connecting', { s: elapsed(tunnelStateStarted), suffix: elapsed(tunnelStateStarted) > 30 ? t('slowHint') : '' })))
          : tunnelPhase === 'error'
            ? Alert('error', fmt(t, 'error', { detail: errText(tunnelStateDetail) || t('unknownError') }))
            : (!tunnelUrl && !isDesktop ? h('div', { style: { ...styles.muted, marginTop: 8 } }, t('wanOffHint')) : null),
        tunnelUrl
          ? h('div', null,
            qrBlock(status.tunnelQr, tunnelUrl, namedMode ? t('namedRunningHint') : t('wanHint')),
            // 防钓鱼 / 别收藏（issue #82）：公网链接仅本次有效、勿收藏提示
            Alert('warn', t('wanEphemeralWarn')),
            // 地址模式行（随机/固定；固定域名选中或编辑时分段高亮）
            row(t('modeLabel'), modeSeg,
              h('div', { style: { marginTop: 6 } },
                // 刚保存固定域名但当前连接仍是随机域名：需关闭后重新开启才生效
                namedMode && /trycloudflare\.com/i.test(tunnelUrl ?? '') ? h('div', { style: styles.warn }, t('namedTakeEffect')) : null,
                // 固定域名：已保存摘要 + 修改入口（非编辑态）
                namedMode && !tunnelCfg ? h('div', { style: { ...styles.muted } },
                  fmt(t, 'namedSummary', { host: tunnelModeView.hostname || '—', token: tunnelModeView.tokenSet ? t('namedTokenSet') : t('namedTokenMissing') }),
                  h('button', { style: { ...styles.mini, marginLeft: 8 }, onClick: () => setTunnelCfg({ hostname: tunnelModeView.hostname ?? '', token: '', err: null }) }, t('namedEdit')),
                  h('div', { style: { ...styles.muted, marginTop: 4 } }, t('namedHow')),
                  !tunnelModeView.tokenSet || !tunnelModeView.hostname ? h('div', { style: { marginTop: 2, color: 'var(--dsw-alias-state-error-primary,#dc2626)' } }, t('namedNeedCfg')) : null,
                ) : null,
                // 固定域名：编辑表单（域名 + Tunnel Token，Token 留空保持不变）
                tunnelCfg ? h('div', { style: { marginTop: 6, fontSize: 12, color: 'var(--dsw-alias-label-secondary,#6b7280)', lineHeight: 1.6 } },
                  h('div', null,
                    t('namedHostnameLabel'),
                    h('input', {
                      style: { margin: '4px 0 0 6px', padding: '4px 8px', fontSize: 13, border: '1px solid var(--dsw-alias-border-l2,#d1d5db)', borderRadius: 6, outline: 'none', width: 200 },
                      placeholder: 'pocket.example.com',
                      value: tunnelCfg.hostname ?? '',
                      autoFocus: true,
                      onChange: (e) => setTunnelCfg((c) => ({ ...c, hostname: e.target.value.trim(), err: null })),
                      onKeyDown: (e) => { if (e.key === 'Enter') saveNamedTunnel(); if (e.key === 'Escape') setTunnelCfg(null); },
                    }),
                  ),
                  h('div', { style: { marginTop: 6 } },
                    t('namedTokenLabel'),
                    h('input', {
                      style: { margin: '4px 0 0 6px', padding: '4px 8px', fontSize: 13, border: '1px solid var(--dsw-alias-border-l2,#d1d5db)', borderRadius: 6, outline: 'none', width: 240, ...styles.mono },
                      type: 'password',
                      value: tunnelCfg.token ?? '',
                      onChange: (e) => setTunnelCfg((c) => ({ ...c, token: e.target.value.trim(), err: null })),
                      onKeyDown: (e) => { if (e.key === 'Enter') saveNamedTunnel(); if (e.key === 'Escape') setTunnelCfg(null); },
                    }),
                  ),
                  h('div', { style: { marginTop: 8, display: 'flex', gap: 8 } },
                    h('button', { style: styles.mini, onClick: saveNamedTunnel }, t('save')),
                    h('button', { style: styles.mini, onClick: () => setTunnelCfg(null) }, t('cancel')),
                  ),
                  h('div', { style: { ...styles.muted, marginTop: 6 } }, t('namedHow')),
                  h('div', { style: { marginTop: 2, fontSize: 11, color: 'var(--dsw-alias-state-warn-primary,#b45309)', lineHeight: 1.5 } }, t('namedSecurity')),
                  tunnelCfg.err ? h('div', { style: { color: 'var(--dsw-alias-state-error-primary,#dc2626)', marginTop: 4 } }, errText(tunnelCfg.err)) : null,
                ) : null,
              )),
            // 访问密码行：遮罩值 + 自定义（自定义输入态整体替换）
            status.accessToken
              ? row(t('pinLabel'), null,
                  customPin?.which === 'public'
                    ? customPinRow('public')
                    : h('div', null,
                      pinValueRow('public', status.accessToken, [customBtn('public')]),
                      h('div', { style: { marginTop: 4 } },
                        status?.publicPinCustom ? h('div', { style: { ...styles.warn, fontSize: 11 } }, t('pinCustomHint')) : null,
                        namedMode ? h('div', { style: { ...styles.warn, fontSize: 11 } }, t('namedSecurity')) : null)))
              : null,
          )
          : null,
      ),
      'wan'),

    // ── 偏好：手机端右边栏 / 捏合缩放（同属「手机访问」页，给出可见分组标题）──
    // Section 签名是 (title, right, children, key)——只吃一个 children 槽，两行必须包成数组；
    // 之前第二行 row 落进 key 参数被静默丢弃（data-dshp-section 变 [object Object]）
    Section(h('span', null, t('prefsTitle')), null,
      [row(
        t('mobileRightbar'),
        Switch(status?.mobileRightbarEnabled !== false, () => setMobileRightbar(status?.mobileRightbarEnabled === false)),
        h('div', { style: { ...styles.muted, marginTop: 6 } }, t('mobileRightbarHint')),
      ),
      row(
        t('mobilePinchZoom'),
        Switch(status?.mobilePinchZoomEnabled === true, () => setMobilePinchZoom(status?.mobilePinchZoomEnabled !== true)),
        h('div', { style: { ...styles.muted, marginTop: 6 } }, t('mobilePinchZoomHint')),
      )],
      'prefs'),

    error ? h('div', { style: { color: 'var(--dsw-alias-state-error-primary,#dc2626)', fontSize: 12, marginTop: 12 } }, `❌ ${errText(error)}`) : null,

    // ── 恢复出厂设置：设置出问题时的临时兜底（最底部，避免误触） ─────────────
    Section(null, null,
      row(
        t('resetFactory'),
        h('button', { style: { ...styles.mini, color: 'var(--dsw-alias-state-error-primary,#dc2626)' }, onClick: () => setResetOpen(true) }, t('resetGo')),
        h('div', { style: { ...styles.muted, fontSize: 11, marginTop: 4 } }, t('resetIntro')),
      ),
      'reset'),

    // 页脚署名行：开发者 · Star · 反馈（一行收拢，弱化处理）
    h('div', { style: { marginTop: 20, paddingTop: 12, borderTop: '1px solid var(--dsw-alias-border-l2,#eceef2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap', fontSize: 11, color: 'var(--dsw-alias-label-tertiary,#8b93a1)' } },
      h('span', null, t('developer')),
      h('span', null, '·'),
      h('a', { href: 'https://github.com/daha1216/dsh-pocket', target: '_blank', rel: 'noreferrer', title: t('starAsk'), style: { color: 'inherit', textDecoration: 'none', borderBottom: '1px dashed currentColor' } }, t('starCta')),
      h('span', null, '·'),
      h('a', { href: 'https://github.com/daha1216/dsh-pocket/issues', target: '_blank', rel: 'noreferrer', style: { color: 'inherit', textDecoration: 'none', borderBottom: '1px dashed currentColor' } }, t('feedback')),
    ),

    // 恢复出厂设置确认弹框
    resetOpen ? Modal({ title: t('resetTitle'), tone: 'danger',
      children: h('div', { style: { fontSize: 13, lineHeight: 1.7, color: 'var(--dsw-alias-label-primary,inherit)', whiteSpace: 'pre-line' } }, t('resetBody')),
      actions: [
        h('button', { style: { ...styles.btn, height: 32, padding: '0 16px' }, onClick: () => setResetOpen(false) }, t('cancel')),
        h('button', { style: { ...styles.primary, height: 32, padding: '0 16px', background: 'var(--dsw-alias-state-error-primary,#dc2626)' }, onClick: doFactoryReset }, t('resetConfirm')),
      ] }) : null,

    // Toast：重置等操作的即时反馈（固定屏幕正中央，2.6s 自动消失）
    toast ? h('div', {
      style: { position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 10001, maxWidth: 300, background: 'rgba(17,24,39,.92)', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 16px', fontSize: 13, lineHeight: 1.5, textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,.22)' },
    }, toast) : null,

    // 局域网访问开关确认弹框（关闭/打开时弹窗提醒）
    lanToggleOpen !== null ? Modal({ title: t(lanToggleOpen ? 'lanToggleTitleOn' : 'lanToggleTitleOff'), tone: lanToggleOpen ? 'brand' : 'warn',
      children: h('div', { style: { fontSize: 13, lineHeight: 1.7, color: 'var(--dsw-alias-label-primary,inherit)' } }, t(lanToggleOpen ? 'lanToggleBodyOn' : 'lanToggleBodyOff')),
      actions: [
        h('button', { style: { ...styles.btn, height: 32, padding: '0 16px' }, onClick: () => setLanToggleOpen(null) }, t('cancel')),
        h('button', { style: { ...styles.primary, height: 32, padding: '0 16px' }, onClick: confirmLanToggle }, t('confirm')),
      ] }) : null,

    // 安全免责声明弹框（issue #31）：每次开启公网访问前确认
    disclaimerOpen ? Modal({ title: t('disclaimerTitle'), tone: 'warn',
      children: h('div', null,
        h('div', { style: { fontSize: 13, lineHeight: 1.7, color: 'var(--dsw-alias-label-primary,inherit)' } }, t('disclaimerBody')),
        h('label', { style: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, fontSize: 13, cursor: 'pointer' } },
          h('input', { type: 'checkbox', checked: disclaimerChecked, onChange: (e) => setDisclaimerChecked(e.target.checked), style: { width: 16, height: 16 } }),
          t('disclaimerAgree')),
        !disclaimerChecked ? h('div', { style: { marginTop: 8, fontSize: 12, color: 'var(--dsw-alias-state-error-primary,#dc2626)' } }, t('disclaimerHint')) : null),
      actions: [
        h('button', { style: { ...styles.btn, height: 32, padding: '0 16px' }, onClick: () => setDisclaimerOpen(false) }, t('cancel')),
        h('button', {
          style: { ...styles.primary, height: 32, padding: '0 16px', opacity: disclaimerChecked ? 1 : 0.5 },
          disabled: !disclaimerChecked,
          onClick: confirmDisclaimer,
        }, t('disclaimerAgree')),
      ] }) : null,
  );
}

export function apply(ctx) {
  // 兜底：确保 connection.isLoopback 为 true（issue #58）。
  // 注：代理注入的 loopback 补丁（proxy.mjs LOOPBACK_ENV_PATCH）已在 #105 移除——
  // 它与 DSH Desktop 2.0.4+ 客户端运行时不兼容，会令 BootHandoff 阶段白屏。
  // #58「远程浏览器开设置页」需上游提供官方信任来源机制才能正经解决；此处仅保留兜底。
  // 0.2.0-rc.1 起真正的修复在 proxy.mjs 的 TRANSPORT_API_CLIENT_SHIM（transport.ownsHost=true）：
  // isLoopback = transport?.ownsHost === true || isLoopbackHostname(location.hostname)，
  // 且 ui-settings 在插件激活前就固化 persistence，本插件 apply 时补来不及——只能注入层抢先。
  if (ctx?.connection) {
    try {
      Object.defineProperty(ctx.connection, 'isLoopback', { value: true, writable: true, configurable: true });
    } catch {
      try { ctx.connection.isLoopback = true; } catch { /* 忽略 */ }
    }
  }

  // 设置页签接入 DSH 本地化：注册 pocket 词典（zh/en），并绑定一个随当前 locale 切换的 t()。
  // 必须先于 mobileApply(ctx)：mobile-apply 安装的 fileGuard 取词依赖 pocket 词典已
  // 注册——注册 effect 排在其后的话，理论上 fileGuard 安装期取词会早于词典就位。
  const translate = ctx.locale.bind(POCKET_NS);
  ctx.effect(() => ctx.locale.register(POCKET_NS, { zh: POCKET_ZH, en: POCKET_EN }), 'dsh-pocket: pocket locale dictionaries');

  // 移动端适配（dsh-web-mobile 移植）：抽屉布局/触控/安全区，仅窄屏生效
  mobileApply(ctx);

  const rpcCall = (endpoint, payload, signal) =>
    ctx.connection.rpc.call(POCKET_RPC_CHANNEL, endpoint, payload, signal);

  // 设置一级入口（与 通用设置/模型/插件 同级，order 1 = 通用之后、最外层）
  ctx.slots.inject('settings.section', () =>
    ctx.slots.register(
      {
        name: 'settings.section',
        id: 'pocket',
        order: 1,
        label: () => translate('section'),
        inject: () => ({ rpcCall, t: translate }),
      },
      PocketSettingsTab,
    ),
  );
}

export { name, inject, redactStatus };
