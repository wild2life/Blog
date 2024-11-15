---
description: '前端物语：记录一些面试需要的 Webpack 理论知识点'
---

# Webpack

Webpack 是一个用于现代 `JavaScript` 应用程序的静态模块打包工具

- [Webpack 英文官网](https://webpack.js.org)
- [Webpack 中文官网](https://www.webpackjs.com)

## 核心概念

- `entry` 编译的入口文件
- `output` 如何输出以及在哪里输出
- `module` Webpack 一切皆模块，一个模块对应一个文件
- `chunk` 代码块，由多个 module 组成
- `loader` Webpack 通过不同的 loader 对模块的源代码进行转换
- `plugin` 插件 Webpack 在打包构建的生命周期中提供了不同的 hooks 允许调用方能够对打包的资源注入自己的逻辑处理
- `compiler` 编译器，把控整个 Webpack 打包的构建流程
- `compilation` 每一次构建的上下文对象包含了当次构建的所有信息
- `dependence` 记录模块间依赖关系

## 构建流程

### `Init` 初始化阶段

1. 解析命令行与 `webpack.config.js` 配置的参数，合并生成最后的配置
2. 创建 `compiler` 对象并开始启动插件
   1. 调用 `createCompiler` 函数创建 `compiler` 对象
   2. 遍历注册的 `Plugins` 并执行其 `apply` 方法
   3. 调用 `new WebpackOptionsApply().process` 方法，根据配置内容动态注入相应插件
      1. 调用 `EntryOptionPlugin` 插件，该插件根据 `entry` 值注入 `DynamicEntryPlugin` 或 `EntryPlugin` 插件
      2. 根据 `devtool` 值注入 `Sourcemap` 插件
         1. `SourceMapDevToolPlugin`
         2. `EvalSourceMapDevToolPlugin`
         3. `EvalDevToolModulePlugin`
      3. 注入 `RuntimePlugin` 用于根据代码内容动态注入 `webpack` 运行时
   4. 调用 `compiler.compile` 方法开始执行构建

### `Make` 构建阶段

1. 读入文件内容
2. 调用 `Loader` 将模块转译为标准的 `JS` 内容
3. 调用 `acorn` 生成 `AST` 语法树
4. 分析 `AST` 确定模块依赖列表
5. 解析模块依赖（对每一个依赖模块重新执行上述流程，直到生成完整的模块依赖图 —— `ModuleGraph` 对象）

### `Seal` 生成阶段

1. 遍历模块依赖图并执行操作
   1. 代码转译，如 `import` 转换为 `require` 调用
   2. 分析运行时依赖
2. 合并模块代码与运行时代码并生成 `chunk`
3. 执行产物优化操作
   1. `Tree-shaking`
   2. 压缩
   3. `Code Split`
4. 输出结果（根据配置确定输出的路径和文件名，把文件内容写入到文件系统）

## 作用

1. 模块打包。可以将不同模块的文件打包整合在一起，并且保证它们之间的引用正确，执行有序。利用打包我们就可以在开发的时候根据我们自己的业务自由划分文件模块，保证项目结构的清晰和可读性。
2. 编译兼容。在前端的“上古时期”，手写一堆浏览器兼容代码一直是令前端工程师头皮发麻的事情，而在今天这个问题被大大的弱化了，通过`webpack`的`Loader`机制，不仅仅可以帮助我们对代码做`polyfill`，还可以编译转换诸如`.less, .vue, .jsx`这类在浏览器无法识别的格式文件，让我们在开发的时候可以使用新特性和新语法做开发，提高开发效率。

3.能力扩展。通过`webpack`的`Plugin`机制，我们在实现模块化打包和编译兼容的基础上，可以进一步实现诸如按需加载，代码压缩等一系列功能，帮助我们进一步提高自动化程度，工程效率以及打包输出的质量。

## webpack 的构建流程是什么

- **初始化参数**：解析 webpack 配置参数，合并 shell 传入和 webpack.config.js 文件配置的参数,形成最后的配置结果；
- **开始编译**：上一步得到的参数初始化 compiler 对象，注册所有配置的插件，插件 监听 webpack 构建生命周期的事件节点，做出相应的反应，执行对象的 run 方法开始执行编译；
- **确定入口**：从配置的 entry 入口，开始解析文件构建 AST 语法树，找出依赖，递归下去；
- **编译模块**：递归中根据文件类型和 loader 配置，调用所有配置的 loader 对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
- **完成模块编译并输出**：递归完事后，得到每个文件结果，包含每个模块以及他们之间的依赖关系，根据 entry 或分包配置生成代码块 chunk;
- **输出完成**：输出所有的 chunk 到文件系统；

## 热更新原理

其实是自己**开启了 express 应用**，添加了对 webpack 编译的监听，添加了和浏览器的 websocket 长连接，当文件变化触发 webpack 进行编译并完成后，**会通过 sokcet 消息告诉浏览器准备刷新**。而为了减少刷新的代价，**就是不用刷新网页，而是刷新某个模块**，webpack-dev-server 可以支持热更新，通过生成 文件的 hash 值来比对需要更新的模块，浏览器再进行热替换

**服务端**

- 启动 webpack-dev-server 服务器
- 创建 webpack 实例
- 创建 server 服务器
- 添加 webpack 的 done 事件回调
- 编译完成向客户端发送消息
- 创建 express 应用 app
- 设置文件系统为内存文件系统
- 添加 webpack-dev-middleware 中间件
- 中间件负责返回生成的文件
- 启动 webpack 编译
- 创建 http 服务器并启动服务
- 使用 sockjs 在浏览器端和服务端之间建立一个 websocket 长连接
- 创建 socket 服务器

**客户端**

- webpack-dev-server/client 端会监听到此 hash 消息
- 客户端收到 ok 消息后会执行 reloadApp 方法进行更新
- 在 reloadApp 中会进行判断，是否支持热更新，如果支持的话发生 webpackHotUpdate 事件，如果不支持就直接刷新浏览器
- 在 webpack/hot/dev-server.js 会监听 webpackHotUpdate 事件
- 在 check 方法里会调用 module.hot.check 方法
- HotModuleReplacement.runtime 请求 Manifest
- 通过调用 JsonpMainTemplate.runtime 的 hotDownloadManifest 方法
- 调用 JsonpMainTemplate.runtime 的 hotDownloadUpdateChunk 方法通过 JSONP 请求获取最新的模块代码
- 补丁 js 取回来或会调用 JsonpMainTemplate.runtime.js 的 webpackHotUpdate 方法
- 然后会调用 HotModuleReplacement.runtime.js 的 hotAddUpdateChunk 方法动态更新 模块代码
- 然后调用 hotApply 方法进行热更

## webpack 打包是 hash 码是如何生成的

1.webpack 生态中存在多种计算 hash 的方式

- **hash**
- **chunkhash**
- **contenthash**

hash 代表每次 webpack 编译中生成的 hash 值，所有使用这种方式的文件 hash 都相同。每次构建都会使 webpack 计算新的 hash。chunkhash 基于入口文件及其关联的 chunk 形成，某个文件的改动只会影响与它有关联的 chunk 的 hash 值，不会影响其他文件 contenthash 根据文件内容创建。当文件内容发生变化时，contenthash 发生变化

2.避免相同随机值

- webpack 在**计算 hash 后分割 chunk。产生相同随机值可能是因为这些文件属于同一个 chunk,可以将某个文件提到独立的 chunk（如放入 entry）**

## webpack 离线缓存静态资源如何实现

- 在配置 webpack 时，我们可以使用 html-webpack-plugin 来注入到和 html 一段脚本来实现将第三方或者共用资源进行 静态化存储在 html 中注入一段标识，例如 <% HtmlWebpackPlugin.options.loading.html %> ,在 html-webpack-plugin 中即可通过配置 html 属性，将 script 注入进去
- 利用 webpack-manifest-plugin 并通过配置 webpack-manifest-plugin ,生成 manifestjson 文件，用来对比 js 资源的差异，做到是否替换，当然，也要写缓存 script
- 在我们做 Cl 以及 CD 的时候，也可以通过编辑文件流来实现静态化脚本的注入，来降低服务器的压力，提高性能
- 可以通过自定义 plugin 或者 html-webpack-plugin 等周期函数，动态注入前端静态化存储 script

## webpack 常见的 plugin 有哪些

- **ProvidePlugin**：自动加载模块，代替 require 和 import
- html-webpack-plugin 可以根据模板自动生成 html 代码，并自动引用 css 和 js 文件
- extract-text-webpack-plugin 将 js 文件中引用的样式单独抽离成 css 文件
- DefinePlugin 编译时配置全局变量，这对开发模式和发布模式的构建允许不同的行为非常有用。
- HotModuleReplacementPlugin 热更新
- optimize-css-assets-webpack-plugin 不同组件中重复的 css 可以快速去重
- webpack-bundle-analyzer 一个 webpack 的 bundle 文件分析工具，将 bundle 文件以可交互缩放的 treemap 的形式展示。
- compression-webpack-plugin 生产环境可采用 gzip 压缩 JS 和 CSS
- happypack：通过多进程模型，来加速代码构建
- clean-wenpack-plugin 清理每次打包下没有使用的文件
- speed-measure-webpack-plugin:可以看至 U 每个 Loader 和 Plugin 执行耗时（整个扌丁包耗时、每个 Plugin 和 Loader 耗时）
- webpack-bundle-analyzer:可视化 Webpack 输出文件的体积（业务组件、依赖第三方模块

## webpack 插件如何实现

- webpack 本质是一个事件流机制，核心模块：tabable(Sync + Async)Hooks 构造出 === Compiler(编译) + Compiletion(创建 bundles)
- compiler 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options、loader 和 plugin。当在 webpack 环境中应用一插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境
- compilation 对象代表了一次资源版本构建。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation,从而生成一个新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态的信息。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用
- 创建一个插件函数，在其 prototype 上定义 apply 方法，指定一个 webpack 自身的事件钩子
- 函数内部处理 webpack 内部实例的特定数据
- 处理完成后，调用 webpack 提供的回调函数

```javascript
function MyWebpackPlugin()(
}；
// prototype 上定义 apply 方法
MyWebpackPlugin.prototype.apply=function(){
// 指定一个事件函数挂载到webpack
compiler.pluginCwebpacksEventHook"funcion (compiler)( console. log(“这是一个插件”)；
// 功能完成调用后webpack提供的回调函数
callback()
})
```

## webpack 有哪些常⻅的 Loader

- file-loader：把⽂件输出到⼀个⽂件夹中，在代码中通过相对 URL 去引⽤输出的⽂件
- url-loader：和 file-loader 类似，但是能在⽂件很⼩的情况下以 base64 的⽅式把⽂件内容注⼊到代码中去
- source-map-loader：加载额外的 Source Map ⽂件，以⽅便断点调试
- image-loader：加载并且压缩图⽚⽂件
- babel-loader：把 ES6 转换成 ES5
- css-loader：加载 CSS，⽀持模块化、压缩、⽂件导⼊等特性
- style-loader：把 CSS 代码注⼊到 JavaScript 中，通过 DOM 操作去加载 CSS。
- eslint-loader：通过 ESLint 检查 JavaScript 代码

## webpack 如何实现持久化缓存

- **服务端设置 http 缓存头（cache-control）**
- 打包依赖和运行时到不同的 chunk，**即作为 splitChunk,因为他们几乎是不变的**
- **延迟加载**：**使用 import()方式**，可以动态加载的文件分到独立的 chunk,以得到自己的 chunkhash
- **保持 hash 值的稳定**：编译过程和文件内通的更改尽量不影响其他文件 hash 的计算，对于低版本 webpack 生成的增量数字 id 不稳定问题，可用 hashedModuleIdsPlugin 基于文件路径生成解决

## 如何⽤**webpack**来优化前端性能

⽤ webpack 优化前端性能是指优化 webpack 的输出结果，让打包的最终结果在浏览器运⾏快速⾼效。

- **压缩代码**：删除多余的代码、注释、简化代码的写法等等⽅式。可以利⽤ webpack 的 UglifyJsPlugin 和 ParallelUglifyPlugin 来压缩 JS ⽂件， 利⽤ cssnano （css-loader?minimize）来压缩 css
- **利⽤ CDN 加速**: 在构建过程中，将引⽤的静态资源路径修改为 CDN 上对应的路径。可以利⽤ webpack 对于 output 参数和各 loader 的 publicPath 参数来修改资源路径
- **Tree Shaking**: 将代码中永远不会⾛到的⽚段删除掉。可以通过在启动 webpack 时追加参数 --optimize-minimize 来实现
- **Code Splitting**: 将代码按路由维度或者组件分块(chunk),这样做到按需加载,同时可以充分利⽤浏览器缓存
- **提取公共第三⽅库**: SplitChunksPlugin 插件来进⾏公共模块抽取,利⽤浏览器缓存可以⻓期缓存这些⽆需频繁变动的公共代码

## webpack treeShaking 机制的原理

- treeShaking 也叫**摇树优化**，是一种通过移除多于代码，来优化打包体积的，**生产环境默认开启**。
- 可以在**代码不运行的状态下，分析出不需要的代码**；
- 利用**es6 模块**的规范
  - ES6 Module 引入进行**静态分析**，故而**编译的时候正确判断到底加载了那些模块**
  - 静态分析程序流，判断那些模块和变量未被使用或者引用，进而删除对应代码
