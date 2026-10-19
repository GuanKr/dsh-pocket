# 本地联调（开发软链）

改完代码想在本机 dsh web 里直接验证，**不用发版**——把已安装的插件换成指向本地仓库的软链即可。

原理：dsh 的插件装在 profile 的 `node_modules` 里（pnpm 软链），我们把它重新指向本地仓库目录，dsh web 重启后就加载本地代码。

> **两种本地联调方式，按场景选：**
>
> | | 软链（本文档） | 打包安装 |
> | --- | --- | --- |
> | 生效粒度 | 改完即生效 | 需重新 `npm pack` + 安装 |
> | 适合 | 日常快速改代码验证 | 要留存一个可复现的构建 |
> | 安装形态 | `node_modules/dsh-pocket` 是符号链接 | profile 用 `file:` specifier 指向 `.tgz` |
>
> 本机（Windows）目前实际用的是**打包安装**那条路，完整流程见 [`AGENTS.md`](./AGENTS.md) 第一节。
>
> 本文第一~四节是 POSIX 写法；**Windows / PowerShell 的对应命令见[第五节](#五windows-写法powershell)**。

---

## 一、建立软链（只需做一次）

```sh
# 插件安装位置：$DSH_HOME/profiles/web/node_modules/dsh-pocket（默认 $DSH_HOME=~/.dsh）
# 若你改过 DSH_HOME，把下面的 ~/.dsh 换成实际路径
cd ~/.dsh/profiles/web/node_modules

rm dsh-pocket
ln -s /你的/仓库/绝对路径/dsh-pocket dsh-pocket

# 确认
ls -l dsh-pocket
# dsh-pocket -> /你的/仓库/绝对路径/dsh-pocket
```

桌面版 profile 同理，把路径里的 `web` 换成 `desktop` 即可。

## 二、日常改代码流程

| 改了哪里 | 要做什么 |
| --- | --- |
| `lib/**`（后端） | 直接重启 dsh web 生效 |
| `client/**`（前端源码） | 先 `node client/build.mjs` 打包，再重启 dsh web |

```sh
node client/build.mjs     # 只改后端可跳过
npm test                  # 建议顺手跑一遍（当前 221 个用例：218 pass / 3 skip）
```

### 重启 dsh web

直接 `kill` 后用 `nohup` 拉起**会被终端会话回收**，必须用 detached 方式（和插件自带的自重启同一套做法）：

```sh
# 1) 停掉当前 dsh web
kill $(lsof -ti :3080 -sTCP:LISTEN)

# 2) detached 重新拉起（日志在 /tmp/dsh-web-dev.log）
node -e "
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const out = fs.openSync('/tmp/dsh-web-dev.log', 'a');
const err = fs.openSync('/tmp/dsh-web-dev.log', 'a');
spawn('$(command -v dsh)', ['web'], {
  detached: true, stdio: ['ignore', out, err], env: process.env, cwd: process.env.HOME,
}).unref();
"

# 3) 等服务起来
curl -s -o /dev/null -w "3080:%{http_code}\n" http://127.0.0.1:3080/   # dsh web
curl -s -o /dev/null -w "3081:%{http_code}\n" http://127.0.0.1:3081/   # dsh-pocket 代理
```

## 三、确认加载的确实是本地代码

页面引用的 `client.js` 带一个 `rev` 参数，它是打包产物内容的 sha1 前 12 位。比对一下就知道有没有生效：

```sh
# 页面正在引用的版本
REV=$(curl -s http://127.0.0.1:3080/ | grep -o 'dsh-pocket/client.js?rev=[a-f0-9]*' | head -1 | cut -d= -f2)
echo $REV

# 本地打包产物的 sha1 前 12 位
shasum -a 1 client/client.js | cut -c1-12
```

两者一致 = 本地代码已生效。

## 四、换回 npm 官方版本

```sh
dsh plugin --profile web add dsh-pocket -w
```

重装会把软链换回 pnpm 的正式安装：

```sh
ls -l ~/.dsh/profiles/web/node_modules/dsh-pocket
# dsh-pocket -> .pnpm/dsh-pocket@<版本>/node_modules/dsh-pocket
```

之后重启 dsh web 即可。

---

## 五、Windows 写法（PowerShell）

上面各节的命令是 POSIX 写法（`lsof` / `shasum` / `~/.dsh` / `/tmp`）。Windows 上对应如下。

> ⚠️ **PowerShell 里 `$HOME` 是只读自动变量**，不要拿它当临时变量赋值——会报
> `无法覆盖变量 HOME，因为它是只读变量或常量`。用 `$dshHome` 之类的名字。

### 路径

```powershell
$dshHome = if ($env:DSH_HOME) { $env:DSH_HOME } else { "$env:USERPROFILE\.dsh" }
```

### 建立软链

```powershell
$link = "$dshHome\profiles\web\node_modules\dsh-pocket"

# 移走已安装的目录（pnpm 装的是 .pnpm 里的实体）
if (Test-Path $link) { Remove-Item -LiteralPath $link -Recurse -Force }

# 建符号链接指向本地仓库
New-Item -ItemType SymbolicLink -Path $link -Target "<repo-path>"

# 确认
(Get-Item $link -Force).LinkType   # 期望输出 SymbolicLink
(Get-Item $link -Force).Target     # 期望输出你的仓库路径
```

> **软链需要权限**：Windows 建符号链接要求「开发者模式」或管理员权限，否则报
> `需要管理员权限`。创建失败就直接走打包安装那条路（见 [`AGENTS.md`](./AGENTS.md) 第一节）——
> 本机目前用的就是那条。

### 停止占用端口的进程

```powershell
Get-NetTCPConnection -LocalPort 3080 -State Listen |
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

### detached 重启（不随终端关闭被回收）

`dsh` 在 Windows 上是 PowerShell 脚本（`dsh.ps1`），`Start-Process` 不能直接执行 `.ps1`，
必须经由 `dsh.cmd` 或 `cmd.exe`：

```powershell
$log    = "$env:TEMP\dsh-web-dev.log"
$errLog = "$env:TEMP\dsh-web-dev.err.log"
$dshCmd = "$env:APPDATA\npm\dsh.cmd"

Start-Process -FilePath "cmd.exe" `
  -ArgumentList "/c", "`"$dshCmd`" web" `
  -WindowStyle Hidden `
  -RedirectStandardOutput $log `
  -RedirectStandardError $errLog
```

三个要点：

1. **stdout 与 stderr 必须重定向到两个不同文件**。指向同一个文件 PowerShell 会直接报错。
2. `-WindowStyle Hidden` 让它没有可见窗口；`Start-Process` 起的是独立进程，不会随当前
   PowerShell 会话结束而被回收。
3. 日志在 `$env:TEMP\dsh-web-dev.log`（POSIX 版是 `/tmp/dsh-web-dev.log`）。

等端口起来：

```powershell
# dsh-pocket 代理在 3081 被占时会自动顺延，所以按实际端口查
Get-NetTCPConnection -State Listen | Where-Object { $_.LocalPort -in 3080,3081 } |
  Select-Object LocalPort, OwningProcess
```

### 确认加载的确实是本地代码

页面在 PIN 门禁之后（`Invoke-WebRequest http://127.0.0.1:3080/` 会返回 **401**），
所以别去抓 HTML 里的 `?rev=`，直接比对安装件与工作区：

```powershell
# 软链法：看链接指向
(Get-Item "$dshHome\profiles\web\node_modules\dsh-pocket" -Force).Target

# 两种方式通用：比对已安装副本与工作区是否逐字节一致
$installed = "$dshHome\profiles\web\node_modules\dsh-pocket"
foreach ($f in 'client\client.js', 'lib\index.js') {
  $a = (Get-FileHash "$installed\$f" -Algorithm SHA256).Hash
  $b = (Get-FileHash ".\$f" -Algorithm SHA256).Hash
  "{0,-24} 一致={1}" -f $f, ($a -eq $b)
}
```

产物变了但界面没变，先确认 `client/client.js` 是否已重新打包：

```powershell
(Get-FileHash .\client\client.js -Algorithm SHA1).Hash.Substring(0,12)
```

### 查端口占用（对应「常见问题」里的 lsof）

```powershell
Get-NetTCPConnection -LocalPort 3080 -State Listen | Select-Object LocalPort, OwningProcess
Get-NetTCPConnection -LocalPort 3081 -State Listen | Select-Object LocalPort, OwningProcess
```

---

## 注意事项

- **软链期间，你日常用的 dsh web 跑的都是本地仓库代码**（包括未提交的改动），而别人通过 npm 装到的仍是发布版——两边互不影响。
- 本地仓库需要装过依赖（`npm install`），否则 `lib/` 用到的 `cordis` / `cosmokit` 等解析不到，插件会静默加载失败。
- 改完 `client/` 忘了打包，界面不会变（dsh web 加载的是 `client/client.js` 产物，不是 `index.jsx` 源码）。
- 电脑重启后自己正常启动 dsh web 即可，软链是持久的，仍然加载本地代码。

## 常见问题

**手机页面没变化**：多半是忘了 `node client/build.mjs`，或 dsh web 没重启成功。日志在 `/tmp/dsh-web-dev.log`（Windows：`$env:TEMP\dsh-web-dev.log`，错误日志是同目录的 `dsh-web-dev.err.log`）。

**代理端口 3081 起不来**：插件没加载成功。检查安装路径是否正确、仓库依赖是否装好。注意 `curl http://127.0.0.1:3080/` 在 PIN 门禁下会返回 **401**，所以「HTML 里有没有 `dsh-pocket/client.js`」不能当判据——改用第五节的安装件比对法，或直接看启动日志里的报错。

**端口被占**：`lsof -ti :3080` 或 `lsof -ti :3081` 查占用进程；dsh-pocket 的代理在 3081 被占时会自动顺延到下一个端口。
