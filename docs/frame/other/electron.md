## 背景
### 图形用户界面
图形用户界面（Graphical User Interface，简称 GUI），是计算机图形学技术的一种，它一般由窗口、下拉菜单或者对话框等图形化的控件组成。用户通过点击菜单栏、按钮或者弹出对话框的形式来实现与机器的交互，GUI 的存在拉近了人与计算机的的距离，让人机交互的过程变得简单舒适、有温度。
- 当打开腾讯 QQ 后，在电脑桌面上会弹出 QQ 的登录界面，成功登录 QQ 后会显示 QQ 的主界面，这些都可以被称作图形用户界面
- 再比如 Windows 操作系统的电脑桌面，本质上也是“图形用户界面”，只不过与 APP 相比，计算机用户界面更为复杂，在桌面上出现的任何一个弹出框都可以看做是一个“图形用户界面
### GUI应用领域
GUI 的应用领域非常广泛，它不仅仅局限于软件产品（app）、计算机操作系统界面，还囊括了车载系统产品、智能家居、电子数码等产品，比如汽车中控台的显示屏界面，或者行车记录仪界面等等。
### GUI的优势
GUI 在互联网行业中有着举足轻重的地位，那些专门从事于界面开发的程序员被称为 GUI 开发工程师，如果在细分的话，可分为软件界面开发工程师和硬件界面开发工程师，它们统称为“界面开发程序员”。当然界面开发工作也需要配合其他岗位一起完成，比如前端 UI 工程师（User Interface Designer），他们主要负责界面的美化和设计等工作。

与早期的命令行界面相比，图形界面对于用户更加友好，使用户在视觉上更容易接受。由于 GUI 直接与用户交互，因此它不仅仅是计算机中的一门技术，它还涉及了美学、行为学、心里学等许多领域的知识。因此在开发、设计一款 GUI 产品时，不能只局限于技术层面，而要对全局进行把控，最终使产品更符合人性化，从而提高用户的使用体验。
### GUI开发工具
目前市面上的 GUI 开发软件包有很多，其中多数使用 C/C++ 语言开发，其中较为流行的框架有 Qt 、GTK、wxWidgets、Electron、MFC/ATL（微软公司开发） 等。Electron 较为特殊，它是由 C/C++ 和 JS、TypeScript 开发而成，它通过 JavaScript、HTML 和 CSS 来构建跨平台的桌面应用程序。
### 为什么采用 C/C++ 库来开发 GUI 软件包呢？
这是因为相比于其他语言，C/C++ 更适合于开发 GUI 程序。我们知道 GUI 程序其实就是人和计算机的交互操作，因此程序的运行性能是考虑的第一要素，若性能不佳，将非常影响用户的体验。 C/C++ 作为执行效率仅次于汇编语言的编译型语言，用来开发 GUI 软件包在合适不过了。
除 C/C++ 之外，Python、Java、C# 等语言也提供了一些 GUI 开发软件包，如下所示：
Python GUI 工具：Tkinter、wxPython、PyQt、PyGTK、Pywin32 等；
Java GUI 工具：AWT、SWING、JavaFX 等；
C# GUI 工具： WinForm、WPF 等；
虽然上述语言的性能不及 C/C++，但是它们的开发效率很高，因此在性能要求不高的情况下，这些软件包也能够满足大多数用户的需求。大家要铭记，开发 GUI 程序的目的是为了实现人机交互，提升设备或者 APP 软件的易用性，这是 GUI 程序的初衷。



## 基本要求
::: tip
在使用Electron进行开发之前，您需要安装 Node.js。 我们建议您使用最新的LTS版本。
:::

> 注意 因为 Electron 将 Node.js 嵌入到其二进制文件中，你应用运行时的 Node.js 版本与你系统中运行的 Node.js 版本无关。

## 创建应用程序

### 使用脚手架创建
```
mkdir my-electron-app && cd my-electron-app
npm init
npm install --save-dev electron
```
init初始化命令会提示您在项目初始化配置中设置一些值 为本教程的目的，有几条规则需要遵循：
- entry point 应为 main.js.
- author 与 description 可为任意值，但对于应用打包是必填项。

### 运行主进程

任何 Electron 应用程序的入口都是 **main** 文件。 这个文件控制了主进程，它运行在一个完整的Node.js环境中，负责控制您应用的生命周期，显示原生界面，执行特殊操作并管理渲染器进程(稍后详细介绍)

### 创建页面
在可以为我们的应用创建窗口前，我们需要先创建加载进该窗口的内容。 在Electron中，各个窗口显示的内容可以是本地HTML文件，也可以是一个远程url。

### 在窗口中打开您的页面
将页面加载进应用窗口 需要两个模块
- [app](https://www.electronjs.org/zh/docs/latest/api/app) 模块，它控制应用程序的事件生命周期。
- [BrowserWindow](https://www.electronjs.org/zh/docs/latest/api/browser-window) 模块，它创建和管理应用程序窗口。
```javascript
// main.js
const { app, BrowserWindow } = require('electron')
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
  win.loadFile('index.html')
}
```
在 Electron 中，只有在 app 模块的 **ready** 事件被激发后才能创建浏览器窗口。 您可以通过使用 app.whenReady() API来监听此事件。 在whenReady()成功后调用createWindow()。
```javascript
app.whenReady().then(() => {
  createWindow()
})
```

### 管理窗口的生命周期
#### 关闭所有窗口时退出应用 (Windows & Linux)
在Windows和Linux上，关闭所有窗口通常会完全退出一个应用程序
```javascript
// 你需要监听 app 模块的 'window-all-closed' 事件。如果用户不是在 macOS(darwin) 上运行程序，则调用 app.quit()。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```
#### 如果没有窗口打开则打开一个窗口 (macOS)
当 Linux 和 Windows 应用在没有窗口打开时退出了，macOS 应用通常即使在没有打开任何窗口的情况下也继续运行，并且在没有窗口可用的情况下激活应用时会打开新的窗口。
```javascript
/*
为了实现这一特性，监听 app 模块的 activate 事件。如果没有任何浏览器窗口是打开的，则调用 createWindow() 方法。
因为窗口无法在 ready 事件前创建，你应当在你的应用初始化后仅监听 activate 事件。 通过在您现有的 whenReady() 回调中附上您的事件监听器来完成这个操作。
*/
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
```

### 通过预加载脚本从渲染器访问Node.js
输出Electron的版本号和它的依赖项到你的web页面上

在主进程通过Node的全局 process 对象访问这个信息是微不足道的。 然而，你不能直接在主进程中编辑DOM，因为它无法访问渲染器 文档 上下文。 它们存在于完全不同的进程
这是将 预加载 脚本连接到渲染器时派上用场的地方。 预加载脚本在渲染器进程加载之前加载，并有权访问两个 渲染器全局 (例如 window 和 document) 和 Node.js 环境

### 额外：将功能添加到您的网页内容
```
对于与您的网页内容的任何交互，您想要将脚本添加到您的渲染器进程中。 由于渲染器运行在正常的 Web 环境中，因此您可以在 index.html 文件关闭 </body> 标签之前添加一个 <script> 标签，来包括您想要的任意脚本
```
总结
- 我们启动了一个Node.js程序，并将Electron添加为依赖。

- 我们创建了一个 main.js 脚本来运行我们的主要进程，它控制我们的应用程序 并且在 Node.js 环境中运行。 在此脚本中， 我们使用 Electron 的 app 和 BrowserWindow 模块来创建一个浏览器窗口，在一个单独的进程(渲染器)中显示网页内容。

- 为了访问渲染器中的Node.js的某些功能，我们在 BrowserWindow 的构造函数上附加了一个预加载脚本。

## 打包分发应用程序

### update.electronjs.org
Electron 官方在 [https://update.electronjs.org](https://update.electronjs.org) 上为**开源应用程序**提供了免费的自动更新服务。 使用它有以下几点要求：
- 你的应用在 macOS 或 Windows 上运行
- 你的应用有一个公开的 GitHub 仓库
- 应用程序需要发布到 GitHub releases 中
- 应用程序需要完成 签名

### Publisher
Electron Forge 的 [Publishers](https://www.electronforge.io/config/publishers) 插件可以自动将打包的应用程序分发到各种来源

### 使用其他更新服务
开发一个私有的 Electron 应用程序
第一步：部署更新服务器
根据你的需要，你可以从下方选择：

- Hazel——用于私人或开源应用的更新服务器，可在 Vercel 上免费部署。 它从GitHub Releases中拉取更新文件，并且利用 GitHub CDN 的强大性能。
- Nuts－同样使用GitHub Releases, 但得在磁盘上缓存应用程序更新并支持私有存储库.
- electron-release-server – 提供一个用于处理发布的仪表板，并且不需要在GitHub上发布发布。
- Nucleus – 一个由Atlassian维护的 Electron 应用程序的完整更新服务器。 支持多种应用程序和渠道; 使用静态文件存储来降低服务器成本.
一旦您部署了更新服务器，您就可以编写您的应用代码，以使用 Electron 的 autoUpdater 模块接收和应用更新。

第二步：在你的应用程序上接收更新
首先，在您的主进程代码中导入所需模块
```javascript
const { app, autoUpdater, dialog } = require('electron')
const server = 'https://your-deployment-url.com'
const url = `${server}/update/${process.platform}/${app.getVersion()}`
// 构建更新服务器的 URL 并通知 autoUpdater：
autoUpdater.setFeedURL({ url })
setInterval(() => {
  autoUpdater.checkForUpdates() // 每分钟检查一次
}, 60000)
```
第三步：当更新可用时通知用户
```javascript
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail:
      'A new version has been downloaded. Restart the application to apply the updates.',
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
// 错误处理 错误日志输出到stderr
autoUpdater.on('error', (message) => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```
## 检测更新程序代码
至此我们有了一个通过 GitHub 发布的功能性发布系统， 我们现在需要告诉我们的 Electron 应用来下载更新，而且是每当新版本出现时都需要更新。 Electron 应用通过 [autoUpdater](https://www.electronjs.org/zh/docs/latest/api/auto-updater) 模块来实现此功能, 此模块可以从更新服务源中读取信息, 并检查是否有一个新版本可供下载.


## Code signing
代码签名是一种用来证明应用是由你创建的一种安全技术。
::: tip
在Windows系统中，如果程序没有代码签名证书，或者代码签名授信级别较低时，系统同样会将其列为可信程序，只是当用户运行该应用时，系统会显示安全提示。
:::
默认情况下，Windows 和 macOS 都会禁止未签名的应用的下载或运行

### 认证
## 发布
应用上传到各个操作系统的应用分发平台（如 App Store）

## Electron + Vue3
Vue CLI Plugin Electron Builder基于Vue Cli的，因此项目的搭建非常方便
::: info
vue-cli-plugin-electron-builder打包构建实际上用的是[electron-builder](https://www.electron.build/)
不用再去安装一遍electron-builder了
:::
```javascript
npm i @vue/cli -g·············
vue create electron-app
```
Vue CLI Plugin Electron Builder
```javascript
vue add electron-builder
```
启用项目
```
npm run electron:serve
```

electron主进程的代码放在了**background.js**
```javascript
// vue.config.js
module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
      }
    }
  }
}
```

## 注意
### 打包因图标太小报错
报错 ```ERR_ICON_TOO_SMALL```
win图标最小为256*256
mac图标最小为512*512
electron-builder要求icon需要放到buildResources目录中（默认为build）中，也就是dist目录

### M1 Exit code: ENOENT. spawn /usr/bin/python ENOENT
原因
  builder-util正在尝试调用 python，因为该包dmg-builder使用 
  python 脚本您可以设置环境变量PYTHON_PATH以覆盖默认值/usr/bin/python，但是：
  dmg-builder使用仅在 Python 2 中内置的reload模块

方法一
安装python 2.7，并获取安装路径（例如：/XXX/versions/2.7/bin/python）；
打开“YourProjectPath/node_modules/dmg-builder/out/dmg.js”，找到“/usr/bin/python”，替换为“/XXX/versions/2.7/bin/python”

方法二
1. 场景1 不使用vue-cli-plugin-electron-builder
- 可以直接升级electron-builder@23.0.3

2. 场景2 使用vue-cli-plugin-electron-builder 
内部的electron-builder版本依旧很低
- 可以通过yarn [选择性依赖](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/) / 或者npm overrides 解决方案
::: tip
为什么需要选择性依赖？
可能依赖于一个不经常更新的包，而这又依赖于另一个获得重要升级的包
:::

```javascript
// 如果你使用 yarn，安装 python2.7.18 并修复 python 的路径后，
// 你可以在 package.json 中添加这段代码来修复它
"dependencies": {
....
}
"devDependencies": {
...
}
"resolutions" : {
  "vue-cli-plugin-electron-builder/electron-builder": "^23.0.3"
}
```
```javascript
如果你是用npm
npm >= v8
{
  "devDependencies": {
    "vue-cli-plugin-electron-builder": "^2.1.1"
  },
  "overrides": {
    "vue-cli-plugin-electron-builder": {
      "electron-builder": "^23.0.3"
    }
  }
}

rm -rf node_modules
rm package-lock.json
npm install

```

### Error: error:0308010C:digital envelope routines::unsupported
```javascript
// nodejs v17+
⠋  Bundling main process...node:internal/crypto/hash:67
  this[kHandle] = new _Hash(algorithm, xofLen);
                  ^

Error: error:0308010C:digital envelope routines::unsupported
  at module.exports (/Users/zhangfuling/Desktop/project/electron-app/node_modules/vue-cli-plugin-electron-builder/node_modules/webpack/lib/util/createHash.js:135:53)

```
1. 原因
- nodejs 17+支持OpenSSL3.0 MD4这样的算法已经被降级了
- webpack使用crypto.createHash()模块的方法创建哈希。这个方法只能使用当前node版本对应的OpenSSL版本可用和支持的算法创建哈希。
[webpack源码](https://github.com/webpack/webpack/blob/main/lib/util/createHash.js)

```javascript
/**
 * Creates a hash by name or function
 * @param {string | typeof Hash} algorithm the algorithm name or a constructor creating a hash
 * @returns {Hash} the hash
 */
module.exports = algorithm => {
  if (typeof algorithm === "function") {
    return new BulkUpdateDecorator(() => new algorithm());
  }
  switch (algorithm) {
    // TODO add non-cryptographic algorithm here
    case "debug":
      return new DebugHash();
    case "xxhash64":
      if (createXXHash64 === undefined) {
        createXXHash64 = require("./hash/xxhash64");
        if (BatchedHash === undefined) {
          BatchedHash = require("./hash/BatchedHash");
        }
      }
      return new BatchedHash(createXXHash64());
    case "md4":
      if (createMd4 === undefined) {
        createMd4 = require("./hash/md4");
        if (BatchedHash === undefined) {
          BatchedHash = require("./hash/BatchedHash");
        }
      }
      return new BatchedHash(createMd4());
    case "native-md4":
      if (crypto === undefined) crypto = require("crypto");
      return new BulkUpdateDecorator(() => crypto.createHash("md4"), "md4");
    default:
      if (crypto === undefined) crypto = require("crypto");
      return new BulkUpdateDecorator(
        () => crypto.createHash(algorithm),
        algorithm
      );
  }
};

```

2. 解决方法
- nodejs降级到16或者更低版本
- 将--openssl-legacy-provider传递给webpack或者基于webpack的cli工具
- 设置环境变量 NODE_OPTIONS
::: tip
--openssl-legacy-provider 这个标志可以告诉node恢复到openssl3.0的旧提供程序，
允许webpack使用md4这种传统加密算法
:::
```javascript
// macos Unix
"scripts": {
    "serve": "export NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve",
    "build": "export NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service build",
    "lint": "export NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service lint"
},
// windows
"scripts": {
    "serve": "set NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve",
    "build": "set NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service build",
    "lint": "set NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service lint"
},
```



###  part download request failed with status code 401
在macos上打包exe
```javascript
  • downloading     url=https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-2.6.0/winCodeSign-2.6.0.7z size=5.6 MB parts=1
  • retrying        attempt=1
  • retrying        attempt=2
  • retrying        attempt=3
  ⨯ part download request failed with status code 401
github.com/develar/app-builder/pkg/download.(*Part).doRequest
	/Volumes/data/Documents/app-builder/pkg/download/Part.go:126
github.com/develar/app-builder/pkg/download.(*Part).download
	/Volumes/data/Documents/app-builder/pkg/download/Part.go:67
github.com/develar/app-builder/pkg/download.(*Downloader).DownloadResolved.func1.1
	/Volumes/data/Documents/app-builder/pkg/download/downloader.go:155
github.com/develar/app-builder/pkg/util.MapAsyncConcurrency.func2
	/Volumes/data/Documents/app-builder/pkg/util/async.go:68
runtime.goexit
	/usr/local/Cellar/go/1.17/libexec/src/runtime/asm_arm64.s:1133
```
原因
网络问题 在macos上打包exe 包体积太大 
解决方案
```
cat .npmrc
registry=https://registry.npm.taobao.org/
electron-builder-binaries_mirror=https://registry.npmmirror.com/-/binary/electron-builder-binaries/
electron-mirror=http://npm.taobao.org/mirrors/electron/
```