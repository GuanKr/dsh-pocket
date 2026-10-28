// settling 卡死判定（2026-10-28 反馈：宿主重连后输入框会消失，且首版修复仍复发）
//
// 宿主把输入栏可见性绑在 [data-phase] 上：ConversationMainPanel 里
//   settling = sessionId !== undefined && (shellPhase === 'blank' &&
//              openState === 'loading' && summaryBlank !== true || parentAvailabilityPending)
// 命中时 [data-phase=settling] [class*=_composerSeat] { visibility: hidden }——座位仍在
// 文档流里占位，只是不可见。而 openState 只由 Session.doOpen 的 try/catch 推进：
// events.open() 挂在 RemoteStreamMuxClient.waitForSocket 上就永远停在 'loading'；
// 抛非 RemoteFailure 的异常时 catch 直接 rethrow，openState 同样停在 'loading'。
// Manager.handleConnected() 只清 projectionStores、重拉 list/projections，不碰任何
// Session 的 openState，这个 'loading' 再没人接手。
//
// ---- 为什么首版修复会在 iOS PWA 上复发（关键）----
// 首版把「观察到一次断线」当作卡死的唯一证据（generation 变 undefined）。这个前提在
// 主屏 PWA 上不成立：PWA 进后台时 WebKit 冻结整个 JS 上下文，socket 被系统拆掉，但
// close 事件的回调根本不会执行；回到前台时页面「看起来」一直在线，于是
//   1) generation 从不经过 undefined，window 的 online/offline 也不触发
//      （watchBrowserNetwork 只监听这两个事件，见 dsh-client-connection client.browser.js）；
//   2) MuxClient.socket.readyState 仍是 1，waitForSocket 直接把这个死 socket 返回，
//      events.open() 把请求写进死连接，永远等不到回包 → openState 卡死在 'loading'。
// 结果：首版看门狗既等不到断线证据，就算等到了，resync() 也会在同一个死 socket 上重开。
//
// ---- 因此判据必须换 ---- 
// 证据改成「settling 跨过一次页面冻结/恢复」或「open 的 promise 已经消失但状态还停在
// loading」或「loading 持续到不合常理的时长」。修复动作也分两步：先让传输层真正重连
// （connection.reconnect() → onReconnectRequested → mux.reconnect() 关掉死 socket 并
// reject 掉挂在 waitForSocket 上的 waiter），再 resync() 在新 socket 上重开。
//
// 本模块只做判定，不碰 DOM：DOM 接线留在 mobile-apply.tsx，判定留在可单测的纯逻辑里。

/** 冻结恢复后的宽限期：页面刚从后台回来，给宿主一次自愈的机会再动手。
 *  宿主本地会话首帧常在数百毫秒内完成，2500ms 对「慢加载」与「真卡死」留有足够间隔。 */
export const SETTLING_STALE_MS = 2500;

/** 没有任何断线/恢复证据时，loading 持续到这个时长就视为病态。仅在 openState 仍是
 *  loading 时生效——正常会话不可能在 8s 后还停在 loading，而首屏大历史回放会先落到
 *  open 再逐步 prepend，不会一直 loading。 */
export const HARD_STUCK_MS = 8000;

/** 心跳间隔超过它即认为页面被冻结过（iOS 后台挂起、锁屏、标签页被丢弃）。
 *  正常计时器抖动远小于它；取 5s 以避开后台节流。 */
export const FREEZE_GAP_MS = 5000;

/** 同一 root 在一轮恢复/重连里最多尝试修复几次。resync 会把会话打回 cold 再 open，
 *  连发就成活锁；留少量重试覆盖「第一次重连恰好失败」的情况。 */
export const MAX_REPAIR_ATTEMPTS = 3;

/**
 * 链路快照 → 统一判据。generation 优先：它在任何非 connected 状态都被 publish 成
 * undefined，连通时换成新的 { id, host }。state 只在宿主没提供 generation 时退化使用。
 * 读不到链路（代际差异）按「一直可用、没断过」处理——宁可不动，也不误修。
 *
 * 注意：这个判据只能识别「宿主自己察觉到的断线」。iOS PWA 冻结那种「socket 已死、
 * readyState 仍为 1」的情形会一直报 usable=true，正是首版失效的原因，所以它现在只是
 * 证据之一，不再是唯一前提。
 *
 * @param {{ hasGeneration: boolean, generation?: unknown, state?: unknown }} snapshot
 * @returns {{ down: boolean, usable: boolean }}
 */
export function resolveLinkVerdict(snapshot) {
  const { hasGeneration, generation, state } = snapshot ?? {};
  if (hasGeneration === true) {
    const alive = generation !== undefined && generation !== null;
    return { down: !alive, usable: alive };
  }
  const down = state === 'disconnected' || state === 'connecting';
  return { down, usable: !down };
}

/**
 * 卡死判定器。所有方法都接收外部时刻（毫秒，单调即可），便于用假时钟单测。
 * root 可以是任何对象身份（真实用法是 HTMLElement）；本模块只把它当 Map 键。
 *
 * hints（可选，来自会话快照）让判据能识别「结构性卡死」：
 *   - openState：'cold' | 'loading' | 'open' | 'error'
 *   - openPromise：'live' | 'gone' | 'unknown'
 *   openState='loading' 且 openPromise='gone' 是决定性矛盾——在途 open 已经不在了，
 *   状态却还是 loading，宿主自己永远不会把它推出去（doOpen 的 catch 对非 RemoteFailure
 *   直接 rethrow，正是这条路径）。
 */
export function createSettlingGuard({
  staleMs = SETTLING_STALE_MS,
  hardStuckMs = HARD_STUCK_MS,
  maxRepairAttempts = MAX_REPAIR_ATTEMPTS,
} = {}) {
  /** @type {Map<unknown, number>} root → 本轮 settling 起始时刻 */
  const settlingSince = new Map();
  /** @type {Map<unknown, number>} root → 已尝试修复的次数（本轮） */
  const repairs = new Map();
  let reconnectedAt = Number.NEGATIVE_INFINITY;
  let resumedAt = Number.NEGATIVE_INFINITY;
  let episode = 0;
  let downSeen = false;

  /** 登记一次链路快照；down → up 的跳变开新一轮重连。 */
  const noteLink = (verdict, now) => {
    if (verdict.down) {
      downSeen = true;
      return;
    }
    if (!downSeen) return;
    downSeen = false;
    episode += 1;
    reconnectedAt = now;
  };

  /**
   * 登记一次「页面恢复」：从后台回到前台、或心跳发现被冻结过。
   * 这是 iOS PWA 上唯一可靠的证据——它出现时 socket 大概率已经被系统拆掉。
   * 新场景重新给满修复配额：上一轮修不好不代表这一轮不该试。
   */
  const noteResume = (now) => {
    resumedAt = now;
    episode += 1;
    downSeen = false;
    repairs.clear();
  };

  /** 观察到 root 处于 settling（首帧与突变都调）；返回是否新进入（用于挂计时器）。 */
  const observe = (root, now) => {
    if (settlingSince.has(root)) return false;
    settlingSince.set(root, now);
    return true;
  };

  /** root 已离开 settling / 已脱离文档：清掉它的全部痕迹。 */
  const release = (root) => {
    settlingSince.delete(root);
    repairs.delete(root);
  };

  /**
   * 此刻该对这个 root 做什么。
   * @param {unknown} root
   * @param {number} now
   * @param {{ openState?: string, openPromise?: 'live'|'gone'|'unknown' }} [hints]
   * @returns {{ waiting: boolean, stale: boolean, repair: boolean, reconnect: boolean, remainingMs?: number }}
   *   waiting：还在宽限期内，别动（remainingMs 是距可以判定的剩余毫秒，供重新计时）；
   *   stale：该还原可见性（打标记走 CSS 兜底）；repair：该 resync；
   *   reconnect：修复前要先让传输层重连（死 socket 不换掉，resync 只会重新挂死）。
   */
  const decide = (root, now, hints = {}) => {
    const since = settlingSince.get(root);
    if (since === undefined) return IDLE;
    if ((repairs.get(root) ?? 0) >= maxRepairAttempts) {
      // 修过上限仍没恢复：不再推翻会话（活锁），但可见性该给就给——用户至少能用输入框。
      return { waiting: false, stale: true, repair: false, reconnect: false };
    }

    const openLoading = hints.openState === 'loading';

    // A. 结构性矛盾：状态还是 loading，但在途 open 已经不在了。宿主永远不会自愈。
    if (openLoading && hints.openPromise === 'gone') {
      return claim(root, { reconnect: false });
    }

    // settling 也可能由 parentAvailabilityPending 造成：那时 openState 已经是 'open'，
    // 会话本身没问题，只是「父会话可用性未知」这一位一直没回来。这种情况只需把座位
    // 还给用户，别去 resync——那会把已经打开的历史源整个重建一遍。
    // 'cold' 同理：会话根本没开过，resync 会直接 return，白费一次配额。
    const resyncable = hints.openState !== 'open' && hints.openState !== 'cold';

    // B. settling 跨过了一次页面冻结/恢复（iOS PWA 主路径）。
    if (resumedAt > since) {
      const elapsed = now - resumedAt;
      if (elapsed < staleMs) return { waiting: true, stale: false, repair: false, reconnect: false, remainingMs: staleMs - elapsed };
      if (!resyncable) return ONLY_VISIBLE;
      return claim(root, { reconnect: true });
    }

    // C. 宿主自己察觉到的断线（真断网、切网络）：它已经重连过，换掉 socket 非必需。
    if (episode > 0 && reconnectedAt > since) {
      const elapsed = now - Math.max(since, reconnectedAt);
      if (elapsed < staleMs) return { waiting: true, stale: false, repair: false, reconnect: false, remainingMs: staleMs - elapsed };
      if (!resyncable) return ONLY_VISIBLE;
      return claim(root, { reconnect: false });
    }

    // D. 没有任何事件证据，但 loading 已经久到不合常理（socket 静默死亡、事件被丢弃）。
    //    只认 openState === 'loading'：其他状态本来就不会保持 settling。
    if (openLoading && now - since >= hardStuckMs) {
      return claim(root, { reconnect: true });
    }

    // E. 不是 loading 却一直在 settling：parentAvailabilityPending 那种「数据没问题、
    //    只是某一位没回来」。不重开会话，但也不能让用户永远看不见输入框。
    if (hints.openState === 'open') {
      const remaining = staleMs - (now - since);
      if (remaining > 0) return { waiting: true, stale: false, repair: false, reconnect: false, remainingMs: remaining };
      return ONLY_VISIBLE;
    }

    // F. 状态完全读不到（宿主改了快照形状、或 sessions 服务拿不到）：先老实等到硬阈值，
    //    之后只还原可见性。这类情形不能 resync——连它是不是 loading 都不知道。
    if (hints.openState === undefined) {
      const remaining = hardStuckMs - (now - since);
      if (remaining > 0) return { waiting: true, stale: false, repair: false, reconnect: false, remainingMs: remaining };
      return ONLY_VISIBLE;
    }

    // 证据不足：继续等。返回 remainingMs 让调用方重新挂计时器，否则节点会永久悬空
    // （没有新突变，扫描不会再发生）。
    if (openLoading) {
      const remaining = Math.max(0, hardStuckMs - (now - since));
      return { waiting: true, stale: false, repair: false, reconnect: false, remainingMs: remaining };
    }
    return IDLE;
  };

  const IDLE = { waiting: false, stale: false, repair: false, reconnect: false };
  /** 数据没坏、只是某个标志位没回来：还给用户输入框，但不动会话。 */
  const ONLY_VISIBLE = { waiting: false, stale: true, repair: false, reconnect: false };

  const claim = (root, { reconnect }) => {
    repairs.set(root, (repairs.get(root) ?? 0) + 1);
    return { waiting: false, stale: true, repair: true, reconnect };
  };

  const reset = () => {
    settlingSince.clear();
    repairs.clear();
    downSeen = false;
    episode = 0;
    reconnectedAt = Number.NEGATIVE_INFINITY;
    resumedAt = Number.NEGATIVE_INFINITY;
  };

  return { noteLink, noteResume, observe, release, decide, reset };
}

/**
 * 冻结检测器：靠心跳间隔判断页面是否被挂起过。
 * iOS 把 PWA 冻结时计时器一起停，恢复后第一个 tick 的间隔会明显超出间隔本身；
 * 这个「迟到」就是唯一能拿到的挂起证据。visibilitychange / pageshow 由调用方另行
 * 走 noteResume（有些恢复路径不产生长间隔，但会产生可见性事件）。
 */
export function createFreezeDetector({ gapMs = FREEZE_GAP_MS, intervalMs = 1000 } = {}) {
  let last = null;
  /** @returns {boolean} 本次 tick 是否发现页面被冻结过 */
  const tick = (now) => {
    if (last === null) {
      last = now;
      return false;
    }
    const delta = now - last;
    last = now;
    // 只认「远超计划间隔」的迟到；正常抖动（后台节流到 1s 上限）不会到这里。
    return delta > Math.max(gapMs, intervalMs * 2);
  };
  const reset = () => {
    last = null;
  };
  return { tick, reset, intervalMs };
}
