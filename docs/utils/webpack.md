
### ![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1637223769070-66d32de2-abc8-47e2-bfc1-73b07947695e.png#clientId=u3c28fa1e-9a66-4&from=paste&height=958&id=uee282e5c&name=image.png&originHeight=958&originWidth=1544&originalType=binary&ratio=1&rotation=0&showTitle=false&size=333784&status=done&style=none&taskId=u6e4f5208-55d8-4d65-91f1-089a760a28f&title=&width=1544)![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1637223672902-2480a842-d1e4-45b4-810f-594208ac8e33.png#clientId=u3c28fa1e-9a66-4&from=paste&height=900&id=u451947f7&name=image.png&originHeight=900&originWidth=1592&originalType=binary&ratio=1&rotation=0&showTitle=false&size=133927&status=done&style=none&taskId=uf2213a57-30c7-4466-bd97-7632433bc24&title=&width=1592)![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1637223204586-8654ec7d-5e4d-46f3-90d4-cc0a318ec143.png#clientId=u3c28fa1e-9a66-4&from=paste&height=1124&id=u2b243ffb&name=image.png&originHeight=1124&originWidth=1916&originalType=binary&ratio=1&rotation=0&showTitle=false&size=437630&status=done&style=none&taskId=u49e9e04e-565c-45b6-92c0-fb863e834a3&title=&width=1916)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1637223276765-488d54ab-ff30-45f6-bab3-a5c1af9bb434.png#clientId=u3c28fa1e-9a66-4&from=paste&height=968&id=u3c2e20fd&name=image.png&originHeight=968&originWidth=1544&originalType=binary&ratio=1&rotation=0&showTitle=false&size=297205&status=done&style=none&taskId=u51a1fe11-406b-411d-99e6-321a18cbda2&title=&width=1544)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1637223369843-03d73e22-4290-46ab-8e23-a3b7c29b81f8.png#clientId=u3c28fa1e-9a66-4&from=paste&height=962&id=udb8f177e&name=image.png&originHeight=962&originWidth=1790&originalType=binary&ratio=1&rotation=0&showTitle=false&size=509333&status=done&style=none&taskId=ud106e71a-44e0-40eb-9246-a8e6b1b64e0&title=&width=1790)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1637223482095-e1cd646d-94bc-4fd9-afd9-8153504b936a.png#clientId=u3c28fa1e-9a66-4&from=paste&height=970&id=u297c8f86&name=image.png&originHeight=970&originWidth=1540&originalType=binary&ratio=1&rotation=0&showTitle=false&size=314504&status=done&style=none&taskId=ue73dccc9-c69f-40c3-b758-31ba3b0c514&title=&width=1540)
## 作用

1. 模块打包。可以将不同模块的文件打包整合在一起，并且保证它们之间的引用正确，执行有序。利用打包我们就可以在开发的时候根据我们自己的业务自由划分文件模块，保证项目结构的清晰和可读性。
2. 编译兼容。在前端的“上古时期”，手写一堆浏览器兼容代码一直是令前端工程师头皮发麻的事情，而在今天这个问题被大大的弱化了，通过`webpack`的`Loader`机制，不仅仅可以帮助我们对代码做`polyfill`，还可以编译转换诸如`.less, .vue, .jsx`这类在浏览器无法识别的格式文件，让我们在开发的时候可以使用新特性和新语法做开发，提高开发效率。

3.能力扩展。通过`webpack`的`Plugin`机制，我们在实现模块化打包和编译兼容的基础上，可以进一步实现诸如按需加载，代码压缩等一系列功能，帮助我们进一步提高自动化程度，工程效率以及打包输出的质量。


## webpack 的构建流程是什么

- **初始化参数**：解析webpack配置参数，合并shell传入和webpack.config.js文件配置的参数,形成最后的配置结果；
- **开始编译**：上一步得到的参数初始化compiler对象，注册所有配置的插件，插件 监听webpack构建生命周期的事件节点，做出相应的反应，执行对象的run方法开始执行编译；
- **确定入口**：从配置的entry入口，开始解析文件构建AST语法树，找出依赖，递归下去；
- **编译模块**：递归中根据文件类型和loader配置，调用所有配置的loader对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
- **完成模块编译并输出**：递归完事后，得到每个文件结果，包含每个模块以及他们之间的依赖关系，根据entry或分包配置生成代码块chunk;
- **输出完成**：输出所有的chunk到文件系统；
## webpack 的热更新原理
其实是自己**开启了express应用**，添加了对webpack编译的监听，添加了和浏览器的websocket长连接，当文件变化触发webpack进行编译并完成后，**会通过sokcet消息告诉浏览器准备刷新**。而为了减少刷新的代价，**就是不用刷新网页，而是刷新某个模块**，webpack-dev-server可以支持热更新，通过生成 文件的hash值来比对需要更新的模块，浏览器再进行热替换

**服务端**

- 启动 webpack-dev-server服务器
- 创建webpack实例
- 创建server服务器
- 添加webpack的done事件回调
- 编译完成向客户端发送消息
- 创建express应用app
- 设置文件系统为内存文件系统
- 添加 webpack-dev-middleware 中间件
- 中间件负责返回生成的文件
- 启动webpack编译
- 创建http服务器并启动服务
- 使用sockjs在浏览器端和服务端之间建立一个websocket长连接
- 创建socket服务器

**客户端**

- webpack-dev-server/client端会监听到此hash消息
- 客户端收到ok消息后会执行reloadApp方法进行更新
- 在reloadApp中会进行判断，是否支持热更新，如果支持的话发生 webpackHotUpdate事件，如果不支持就直接刷新浏览器
- 在 webpack/hot/dev-server.js 会监听 webpackHotUpdate 事件
- 在check方法里会调用module.hot.check方法
- HotModuleReplacement.runtime请求Manifest
- 通过调用 JsonpMainTemplate.runtime 的 hotDownloadManifest方法
- 调用JsonpMainTemplate.runtime的hotDownloadUpdateChunk方法通过JSONP请求获取最新的模块代码
- 补丁js取回来或会调用 JsonpMainTemplate.runtime.js 的 webpackHotUpdate 方法
- 然后会调用 HotModuleReplacement.runtime.js 的 hotAddUpdateChunk方法动态更新 模块代码
- 然后调用hotApply方法进行热更
## webpack 打包是hash码是如何生成的

1.webpack生态中存在多种计算hash的方式

- **hash**
- **chunkhash**
- **contenthash** 

hash代表每次webpack编译中生成的hash值，所有使用这种方式的文件hash都相同。每次构建都会使webpack计算新的hash。chunkhash基于入口文件及其关联的chunk形成，某个文件的改动只会影响与它有关联的chunk的hash值，不会影响其他文件contenthash根据文件内容创建。当文件内容发生变化时，contenthash发生变化

2.避免相同随机值

- webpack在**计算hash后分割chunk。产生相同随机值可能是因为这些文件属于同一个chunk,可以将某个文件提到独立的chunk（如放入entry）**
## webpack 离线缓存静态资源如何实现

- 在配置webpack时，我们可以使用html-webpack-plugin来注入到和html一段脚本来实现将第三方或者共用资源进行 静态化存储在html中注入一段标识，例如 <% HtmlWebpackPlugin.options.loading.html %> ,在 html-webpack-plugin 中即可通过配置html属性，将script注入进去
- 利用 webpack-manifest-plugin 并通过配置 webpack-manifest-plugin ,生成 manifestjson 文件，用来对比js资源的差异，做到是否替换，当然，也要写缓存script
- 在我们做Cl以及CD的时候，也可以通过编辑文件流来实现静态化脚本的注入，来降低服务器的压力，提高性能
- 可以通过自定义plugin或者html-webpack-plugin等周期函数，动态注入前端静态化存储script
## webpack 常见的plugin有哪些

- **ProvidePlugin**：自动加载模块，代替require和import
- html-webpack-plugin可以根据模板自动生成html代码，并自动引用css和js文件
- extract-text-webpack-plugin 将js文件中引用的样式单独抽离成css文件
- DefinePlugin 编译时配置全局变量，这对开发模式和发布模式的构建允许不同的行为非常有用。
- HotModuleReplacementPlugin 热更新
- optimize-css-assets-webpack-plugin 不同组件中重复的css可以快速去重
- webpack-bundle-analyzer 一个webpack的bundle文件分析工具，将bundle文件以可交互缩放的treemap的形式展示。
- compression-webpack-plugin 生产环境可采用gzip压缩JS和CSS
- happypack：通过多进程模型，来加速代码构建
- clean-wenpack-plugin 清理每次打包下没有使用的文件
- speed-measure-webpack-plugin:可以看至U每个Loader和Plugin执行耗时（整个扌丁包耗时、每个Plugin和 Loader 耗时）
- webpack-bundle-analyzer:可视化Webpack输出文件的体积（业务组件、依赖第三方模块
## webpack 插件如何实现

- webpack本质是一个事件流机制，核心模块：tabable(Sync + Async)Hooks 构造出 === Compiler(编译) + Compiletion(创建bundles)
- compiler对象代表了完整的webpack环境配置。这个对象在启动webpack时被一次性建立，并配置好所有可操作的设置，包括options、loader和plugin。当在webpack环境中应用一插件时，插件将收到此compiler对象的引用。可以使用它来访问webpack的主环境
- compilation对象代表了一次资源版本构建。当运行webpack开发环境中间件时，每当检测到一个文件变化，就会创建一个新的compilation,从而生成一个新的编译资源。一个compilation对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态的信息。compilation对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用
- 创建一个插件函数，在其prototype上定义apply方法，指定一个webpack自身的事件钩子
- 函数内部处理webpack内部实例的特定数据
- 处理完成后，调用webpack提供的回调函数
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
## webpack有哪些常⻅的Loader

- file-loader：把⽂件输出到⼀个⽂件夹中，在代码中通过相对 URL 去引⽤输出的⽂件
- url-loader：和 file-loader 类似，但是能在⽂件很⼩的情况下以 base64 的⽅式把⽂件内容注⼊到代码中去
- source-map-loader：加载额外的 Source Map ⽂件，以⽅便断点调试
- image-loader：加载并且压缩图⽚⽂件
- babel-loader：把 ES6 转换成 ES5
- css-loader：加载 CSS，⽀持模块化、压缩、⽂件导⼊等特性
- style-loader：把 CSS 代码注⼊到 JavaScript 中，通过 DOM 操作去加载 CSS。
- eslint-loader：通过 ESLint 检查 JavaScript 代码

## webpack如何实现持久化缓存

- **服务端设置http缓存头（cache-control）**
- 打包依赖和运行时到不同的chunk，**即作为splitChunk,因为他们几乎是不变的**
- **延迟加载**：**使用import()方式**，可以动态加载的文件分到独立的chunk,以得到自己的chunkhash
- **保持hash值的稳定**：编译过程和文件内通的更改尽量不影响其他文件hash的计算，对于低版本webpack生成的增量数字id不稳定问题，可用hashedModuleIdsPlugin基于文件路径生成解决
## 如何⽤**webpack**来优化前端性能
⽤webpack优化前端性能是指优化webpack的输出结果，让打包的最终结果在浏览器运⾏快速⾼效。

- **压缩代码**：删除多余的代码、注释、简化代码的写法等等⽅式。可以利⽤webpack的 UglifyJsPlugin 和 ParallelUglifyPlugin 来压缩JS⽂件， 利⽤ cssnano （css-loader?minimize）来压缩css
- **利⽤CDN加速**: 在构建过程中，将引⽤的静态资源路径修改为CDN上对应的路径。可以利⽤webpack对于 output 参数和各loader的 publicPath 参数来修改资源路径
- **Tree Shaking**: 将代码中永远不会⾛到的⽚段删除掉。可以通过在启动webpack时追加参数 --optimize-minimize 来实现
- **Code Splitting**: 将代码按路由维度或者组件分块(chunk),这样做到按需加载,同时可以充分利⽤浏览器缓存
- **提取公共第三⽅库**: SplitChunksPlugin插件来进⾏公共模块抽取,利⽤浏览器缓存可以⻓期缓存这些⽆需频繁变动的公共代码
## webpack treeShaking机制的原理

- treeShaking 也叫**摇树优化**，是一种通过移除多于代码，来优化打包体积的，**生产环境默认开启**。
- 可以在**代码不运行的状态下，分析出不需要的代码**；
- 利用**es6模块**的规范 
   - ES6 Module引入进行**静态分析**，故而**编译的时候正确判断到底加载了那些模块**
   - 静态分析程序流，判断那些模块和变量未被使用或者引用，进而删除对应代码

