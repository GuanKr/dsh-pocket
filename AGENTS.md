# AGENTS.md — dsh-pocket fork 的工作约定

> 面向编码 agent 与贡献者的**硬约定**。与 [`client/mobile/PORTING.md`](./client/mobile/PORTING.md) 互补：
> 那份讲上游 dsh-web-mobile 怎么同步，这份讲这个 fork 自己怎么出包、怎么改代码。

## 仓库身份

| 远端 | 指向 | 角色 |
| --- | --- | --- |
| `origin` | `daha1216/dsh-pocket` | **本 fork，日常 rebase 的目标** |
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
npm test          # 218 个用例
```

- Windows 上 `test/tunnel-args.test.js` 有 2 条会 **skip**（依赖 POSIX shebang 的隧道参数
  测试），这是上游的预期行为，不是回归。
- 改 CSS 或样式时，**契约测试只证明字符串还在、不证明渲染结果**。这类改动必须在真机媒体
  条件下实测 —— 桌面 UA 下 `(max-width:1023px) and (pointer:coarse)` 整块不生效，什么都测不出来。
  方法论见 `client/mobile/PORTING.md` 的「判『选择器是否失效』的正确方法」一节。
- 补断言时确认它**非空**：写完做一次变异测试（把被保护的东西改坏，确认测试真的变红），
  否则容易写出一个恒真的断言。

---

## 五、rebase 惯例

- rebase 目标是 `origin/main`，**不是** `upstream/main`（fork 已把需要的东西同步过来了）。
- 本仓足迹只有下面这些文件，都不会被 sync 覆盖，因此基本不会冲突：

  | 文件 | 性质 |
  | --- | --- |
  | `.gitignore` | 仓库配置 |
  | `package.json` / `package-lock.json` | 版本与依赖 |
  | `client/mobile/PORTING.md` | 本仓文档 |
  | `test/composer-keyboard.test.js` | 本仓测试 |
  | `test/mobile-nav.test.js` | 本仓测试 |

- **版本号是唯一会反复冲突的地方**，解成 `<对方版本>-local.<递增>` 即可。这个冲突是有用的
  —— 它逼你在每次同步时确认一次版本口径。

---

## 相关文档

- [`LOCAL-DEV.md`](./LOCAL-DEV.md) —— 软链方式联调：改完即生效，不用打包
- [`client/mobile/PORTING.md`](./client/mobile/PORTING.md) —— 移动端移植层、上游同步机制、补丁台账、真机诊断方法论
- [`README.md`](./README.md) —— 用户向的安装与使用说明