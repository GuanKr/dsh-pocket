# AGENTS.md — dsh-pocket fork 的工作约定

> 面向编码 agent 与贡献者的**硬约定**。与 [`client/mobile/PORTING.md`](./client/mobile/PORTING.md) 互补：
> 那份讲上游 dsh-web-mobile 怎么同步，这份讲这个 fork 自己怎么出包、怎么改代码。

## 仓库身份

| 远端 | 指向 | 角色 |
| --- | --- | --- |
| `origin` | `daha1216/dsh-pocket` | **本 fork，日常同步上游的目标**（见第五节） |
| `upstream` | `shaobeichen/dsh-pocket` | 原作者仓库 |

npm 上的 `dsh-pocket` 包归原作者（`leachzhou`）所有，本 fork **没有也不应该获得发布权限**。

---

## 一、不走发布链路：永远本地打包安装

**本 fork 不向 npm 发包。`.releaserc.cjs`、`release` 脚本、`semantic-release` 相关 devDependencies 已刻意删除，不要恢复。**

### `origin/main` 上的 `chore(release)` 不是 semantic-release

远程会出现 `chore(release): 2.10.7` 这类提交，看着像在自动发版。**它不是**（2026-10-18 实测）：

- 提交作者是维护者本人，不是 `semantic-release-bot`；
- 每个提交只改 `package.json` 的 `version` 一个字段，`CHANGELOG.md` 始终停在 `2.10.6`；
- npm 上该包的 owner 是原作者，本地也无发布凭据。

所以那些版本号**只是本地标记**，不对应任何已发布的产物。**不要去追平它们，也不要为它们改动版本逻辑。**

### 出包流程

```sh
# 1. 改 package.json 的 version —— 必须 bump，不能复用旧版本号
#    本仓惯例：<对方当前发布号>-local.<递增序号>，例如 2.10.9-local.1
#    序号只在「对方发布号不变」时递增 —— 对方发布号一变就回到 1。
#    先例：2.10.7-local.4 → 升到 2.10.9 时写成 2.10.9-local.1（提交 26832ef）。
#    判定基准是 origin/main 的 package.json 的 version —— 提交信息里写的上游版本号
#    可能与之不一致（如 2.11.0 那次提交写着「吸收上游 dsh-pocket 2.12.0」），以 package.json 为准。
# 2. 同步 lock（只解析 registry 元数据，不下载包、不动 node_modules）
npm install --package-lock-only

# 3. 打包
npm pack                      # → dsh-pocket-<version>.tgz

# 4. 装进 DSH profile
dsh plugin --profile web add "file:<仓库绝对路径>/dsh-pocket-<version>.tgz"
```

**为什么每次都必须 bump 版本号**：profile 的 `pnpm-lock.yaml` 用 `file:` specifier 指向 tarball，
并钉死 `sha512` integrity。同名同版本重新打包会让锁文件**静默不更新**，装上去的还是旧代码。

装完请核对两处：

```sh
# profile 的 specifier 应指向新 tarball
node -e "console.log(require(process.env.DSH_HOME+'/profiles/web/package.json').dependencies['dsh-pocket'])"
# 已安装版本应为新版本号
node -e "console.log(require(process.env.DSH_HOME+'/profiles/web/node_modules/dsh-pocket/package.json').version)"
```

### 安装前先备份 profile

```sh
ts=$(date +%Y%m%d-%H%M%S)
cp "$DSH_HOME/profiles/web/package.json"   "$DSH_HOME/profiles/web/package.json.bak-$ts"
cp "$DSH_HOME/profiles/web/pnpm-lock.yaml" "$DSH_HOME/profiles/web/pnpm-lock.yaml.bak-$ts"
```

沿用 DSH 自己的 `.bak-YYYYMMDD-HHMMSS` 惯例。

### 装完必须重启 dsh web

插件在进程启动时加载，不重启就仍在跑旧代码。

### 不要做的事

- ❌ 恢复 `.releaserc.cjs` / `release` 脚本 / `semantic-release` devDependencies
- ❌ `npm publish`
- ❌ `dsh plugin --profile web update dsh-pocket --latest` —— 会从 npm 拉官方版，
  **直接覆盖本地修复**。插件内有 fork-aware 的 update-guard 会拦截（`lib/web-rpc.js`
  检测到「repository 与 npm 上游不一致」时报 `一键更新会覆盖本地修改，已拦截`），
  但别去试，拦截不是保险。
- ❌ 看到远程 `chore(release)` 就去对齐版本号

---

## 二、`client/client.js` 不要重建

它是 **esbuild 打包产物**，由 `node client/build.mjs` 从 `client/mobile/upstream/` + 适配器
+ fileGuard 生成。

**除非真的改了 `client/` 的源码，否则不要重建它。** 两个理由：

1. **纯噪声差异**：本地 esbuild（`node_modules`，devDep `^0.25.9` → 实测 0.25.12）与维护者用的
   版本（`PORTING.md` 记的是 vendored `0.28.1`）不同，minified 输出有约 1.3% 的差异
   （实测 462432 → 456517 字符）。重建会让产物与上游产生无功能差异的 diff。
2. **制造必然冲突**：产物由上游整体推送，重建等于在本仓重新引入一个每次 sync 都要解的文件。

什么时候**才**需要重建：改了 `client/api.js`、`client/index.jsx`、`client/mobile/**` 之后。
只改 `lib/**` 不需要。

> 若确实需要重建以跟上上游，请先确认 esbuild 版本与上游一致，否则 diff 无意义。

---

## 三、`client/mobile/upstream/` 零手改

该目录是 dsh-web-mobile 插件 `src/client` 的**镜像**，sync 脚本会整目录覆盖。仓库规矩是
「零手改」—— pocket 特有逻辑住在 `client/mobile/mobile-apply.tsx` 与 pocket 自有文件里。

本仓目前对它**零足迹**（与上游逐字节一致），这是有意为之：下次 sync 不会产生任何冲突。
往里面加东西前先问能不能放到适配器层；确实必须落在镜像内部（例如只有内部作用域的选择器
才生效），登记进 `client/mobile/PORTING.md` 的补丁清单。

**新增的注释同理**：写在上游文件里的说明会在下一次 sync 被整段抹掉，却先制造一次冲突。
知识写进 `PORTING.md`，那里不会被覆盖。

---

## 四、测试

```sh
npm test          # 277 个用例（273 pass / 4 skip）
```

- `test/tunnel-args.test.js` 有 3 条在 Windows 上 **skip**（依赖 POSIX shebang 的隧道参数
  测试），这是上游的预期行为，不是回归。另有 `test/download.test.js` 1 条**非 Linux 一律
  skip**（Windows 与 macOS 都算），合计 4 条。
- 改 CSS 或样式时，**契约测试只证明字符串还在、不证明渲染结果**。这类改动必须在真机媒体
  条件下实测 —— 桌面 UA 下 `(max-width:1023px) and (pointer:coarse)` 整块不生效，什么都测不出来。
  方法论见 `client/mobile/PORTING.md` 的「判『选择器是否失效』的正确方法」一节。
- 补断言时确认它**非空**：写完做一次变异测试（把被保护的东西改坏，确认测试真的变红），
  否则容易写出一个恒真的断言。

---

## 五、同步上游：用 squash-merge，不要 rebase

### 为什么不是 rebase

`local` 只存在于本机（未推送、无任何远端引用其 SHA），所以 rebase 重写 SHA 的唯一硬伤不成立；
而它的「线性历史」收益，在足迹几乎零冲突时也有限。真正需要的是**一条可审计的同步痕迹** ——
「我什么时候合到了上游的哪个位置」。

squash-merge 同时给出三样东西：线性历史、不重写 SHA（备份分支 / tag / 过去的 `git bisect`
永远有效）、每次同步产出一个自己写的提交。唯一的成本是 sync 提交会累积 —— 但那正是审计日志：

```
a1b2c3 chore(sync): 同步 origin/main 至 ba2f53d（2.10.9）
f9e2008 chore: 删除 semantic-release 发布链路 —— 本 fork 不发 npm 包
26832ef chore: 版本 bump 到 2.10.9-local.1 + 忽略 npm pack 产物
1b844fd docs(PORTING): 补丁台账第 15/16 条改写 + 真机诊断方法论
094457f test(mobile): 席位面板定位契约同步上游重写后的配方
8b8fcd4 test(mobile): 键盘守卫契约改锚上游 session-focus-guard
```

### 三层职责边界

```
upstream/main (shaobeichen)  ──sync 脚本──▶  origin/main (daha1216)  ──你──▶  local
```

- **你只负责 `origin/main` → `local`。**
- **不要自己去合 `upstream/main`。** 那需要跑 dsh-web-mobile 的同步脚本（整目录镜像 + 镜像期
  变换），是上游维护者的职责。`origin/main` 落后 `upstream/main` 十几个提交是正常状态。
- 需要上游的修复时：等它进 `origin/main`；急的话在 `local` 打补丁并登记进
  `client/mobile/PORTING.md` 的补丁台账，或推给 fork。

### 一次性配置

```sh
git config rerere.enabled true      # 记住冲突解法，下次自动重放
git config rerere.autoupdate true
```

写在 `.git/config`（仓库级，不进版本库）。换机器重克隆时要重新执行一次。

### 每次同步的流程

```sh
git fetch origin

# 1. 先看清这次上游变了什么（不要跳过）
git log --oneline HEAD..origin/main
git diff --stat HEAD origin/main

# 2. 可选留个备份引用（不重写历史，所以成本为零）
git branch backup/pre-sync-$(git rev-parse --short HEAD)

# 3. squash 合入
git merge --squash origin/main

# 4. 解冲突 —— 实际只有一处需要判断
#    (a) package-lock.json 不要手解：先取回本地那份（保证是合法 JSON），并清掉冲突态
git checkout --ours -- package-lock.json
git add package-lock.json     # 缺这句索引仍停在 stage 1/2/3，冲突并没有解开
#    (b) package.json 只改 version 一行 → <对方版本>-local.<序号>
#        序号在对方版本变化时回到 1（先例：2.10.7-local.4 → 2.10.9-local.1）
#        顺手确认没把 release 脚本 / semantic-release devDeps 带回来
#    (c) 再让 npm 重算 lock（最终通常只剩 lock 里 2 个 version 字段）
npm install --package-lock-only
git add package-lock.json

# 5. 验证
npm test

# 6. 提交
git commit -m "chore(sync): 同步 origin/main 至 <短 sha>（<上游版本>）"
```

**要退出**：第 6 步提交之前，任何时候 `git reset --hard HEAD` 都能干净回退，不影响已有历史。

### rerere 开着无害，但**别指望它替你解 version 冲突**（2026-10-19 订正）

本节原文写「每次解法完全相同，正是 rerere 最理想场景，第一次手工解之后自动重放」——**这条是错的，
而且两处都错**：

1. rerere 的冲突 ID 是**冲突内容本身**的哈希，而冲突内容里就含版本号。下次同步时
   `2.10.9-local.1 / 2.11.0` 会变成 `2.11.0-local.1 / 2.12.0`，ID 不同 → **根本不会重放**。
   （实测：冲突后 `.git/rr-cache` 里只有 `preimage`，且每轮同步各是一份新条目。）
2. **即便真重放了也是错的**：记下来的 postimage 是**上一次**的版本号（`2.10.9-local.1`），
   而这一次正确答案必须是 `2.11.0-local.1`。自动重放等于把版本号写回旧值。

保留 `rerere.enabled`（对其它偶发冲突仍有价值）没问题，但 version 那一行**每次都要人工改**。

`package-lock.json` 的冲突是机械的，**永远**用「`git checkout --ours` +
`npm install --package-lock-only`」重生成，不要手解。

### 本仓足迹（都会保留；冲突面比早期大）

| 文件 | 性质 |
| --- | --- |
| `.gitignore` / `package.json` / `package-lock.json` | 配置与版本 |
| `.releaserc.cjs` | **已删除**（f9e2008）—— sync 时不要让它回来 |
| `AGENTS.md` / `LOCAL-DEV.md` / `client/mobile/PORTING.md` | 本仓文档 |
| `test/composer-keyboard.test.js` / `test/mobile-nav.test.js` / `test/public-settings.test.js` | 本仓测试 |
| `lib/tunnel.mjs` / `lib/settings.mjs` / `lib/service.mjs` / `lib/index.js` / `lib/web-rpc.js` / `bin/dsh-pocket.mjs` | **本地功能补丁**：Quick Tunnel（见下节） |
| `client/index.jsx` / `client/pocket-locales.js` / `client/client.js` | 设置页 Quick Tunnel 模式切换 + 重建产物 |

**足迹里已有生产代码**（2026-10-25 起，Quick Tunnel 恢复）。冲突面比过去大：sync 时要特别
检查 `lib/service.mjs`、`lib/settings.mjs`、`client/index.jsx`，解完冲突必须跑全量测试。

### 本地功能补丁：Quick Tunnel（3.0.2-local.1 起；.3 含两轮审查修复）

origin/main 在 `8828e14`（v3.0.0）删除了随机域名 Quick Tunnel，只保留用户自配的固定域名。
本 fork 恢复它，因为 Quick Tunnel **不需要 Cloudflare 账号/域名**，是「没有 CF 账号」场景
唯一的公网入口。

- 模式：`settings.tunnelMode()` 默认 `'quick'`；显式保存 `'named'` 才用固定域名。
- 启动：`lib/service.mjs` 的 `startTunnel` 按 mode 分派 `startQuickTunnel` / `startNamedTunnel`。
- 安全语义：Quick 每次开启轮换公网 PIN（自定义 PIN 除外）；Quick 的 `tunnel-auto.json`
  标记为 `mode:'quick'`，**重启后不自动恢复**（域名已变，自动拉起等于替用户重新暴露公网）；
  只有完整配置的 Named 会恢复。
- CLI：`dsh-pocket --public` 默认走 Quick（免账号）；设置里切到 named 且配置完整才走固定域名。
- UI：设置页公网卡有「随机域名（免账号） / 固定域名」切换；Quick 不显示配置表单。
- 守护测试：`test/service.test.js`（quick 启动/标记/恢复）、`test/settings.test.js`、
  `test/cli-auth.test.js`、`test/public-settings.test.js`、`test/tunnel-args.test.js`。

同步时如果 origin 再次改隧道语义，先读这一节与 `client/mobile/PORTING.md` 的对应条目，
不要把 Quick 分支当成冲突噪音删掉。

### 什么时候该换回 rebase

- `local` 开始推送或被他人引用 → 仍用 squash-merge，但要重新想清楚远端语义
- **足迹里开始出现生产代码** → 本仓已出现（Quick Tunnel 补丁，2026-10-25）；结论仍是
  squash-merge，但每次 sync 后必须人工核对本地补丁并跑全量测试
- 需要在多个长期分支间来回 → 结论不变，sync 提交的价值反而更大

---

## 相关文档

- [`LOCAL-DEV.md`](./LOCAL-DEV.md) —— 软链方式联调：改完即生效，不用打包
- [`client/mobile/PORTING.md`](./client/mobile/PORTING.md) —— 移动端移植层、上游同步机制、补丁台账、真机诊断方法论
- [`README.md`](./README.md) —— 用户向的安装与使用说明