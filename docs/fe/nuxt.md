##### 面向 c 端的项目一定要做 ssr

### 传统的 vue 纯浏览器渲染

npm run build 打包 把打包的东西放到服务器上 整个的生成是通过在**浏览器执行 js **
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1636943800402-17b66feb-fd06-4d1a-8ef0-304733271d6c.png#clientId=u85b1f32b-b9e4-4&from=paste&height=1116&id=ud5687010&name=image.png&originHeight=1116&originWidth=2208&originalType=binary&ratio=1&rotation=0&showTitle=false&size=424226&status=done&style=none&taskId=ueab5097e-b425-4a3f-ab11-a920fd8b1fa&title=&width=2208)

### ssr 服务端渲染

##### 在服务端执行 js 代码 场景：面向 C 端的项目 SEO 有利于搜索引擎优化

![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1637293019384-fd2d654b-c2ce-4274-a197-01bcec0c2756.png#clientId=ua55684b8-a44e-4&from=paste&height=1036&id=u685fc1d5&name=image.png&originHeight=1036&originWidth=1992&originalType=binary&ratio=1&rotation=0&showTitle=false&size=269062&status=done&style=none&taskId=u059b8448-9c80-4dc6-b36a-cd4d82495e8&title=&width=1992)

![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1636945671674-30427aec-6902-4782-ab5a-373dfd009830.png#clientId=u85b1f32b-b9e4-4&from=paste&height=1092&id=u580c42c6&name=image.png&originHeight=1092&originWidth=2078&originalType=binary&ratio=1&rotation=0&showTitle=false&size=401001&status=done&style=none&taskId=ua3b7a417-0780-4bb6-bc3a-c5ae8204c7e&title=&width=2078)

### 基础 ssr 的实现

![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1636963910562-d14dacc8-2b4a-474e-93e2-962cf940b7e5.png#clientId=u53b04b67-98b8-4&from=paste&height=495&id=u2d2b218e&name=image.png&originHeight=495&originWidth=1080&originalType=binary&ratio=1&rotation=0&showTitle=false&size=263596&status=done&style=none&taskId=ua0ccd4a3-cab2-4bf0-a09a-4ebb5027c2c&title=&width=1080)
把生成的 vue 实例转成 html [Vue-Server-Renderer](https://www.cnblogs.com/pengdt/p/12304026.html)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1636946283437-747a615a-6489-467a-a4a4-7211cd8ac17d.png#clientId=u53b04b67-98b8-4&from=paste&height=674&id=u6eba3481&name=image.png&originHeight=674&originWidth=1406&originalType=binary&ratio=1&rotation=0&showTitle=false&size=593889&status=done&style=none&taskId=u2f6dfde2-cdfb-44bf-a99d-4b714963311&title=&width=1406)
涉及的文件修改如下

#### 1. main.js src/main.js

每一次访问都必须要创建一个新的实例 所以要写成一个方法 每次访问都调用 createApp
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1636961103956-850eac35-77f3-4414-beb3-89586dd606e4.png#clientId=u53b04b67-98b8-4&from=paste&height=622&id=ub1d7e577&name=image.png&originHeight=622&originWidth=796&originalType=binary&ratio=1&rotation=0&showTitle=false&size=452495&status=done&style=none&taskId=uac4f44da-917f-42ae-ae85-3d0acc66f89&title=&width=796)

#### 2. router src/router/index.js

##### ⚠️ 路由只能是 history 模式

![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1636947137537-bdf1db66-d02b-4772-8d71-fd4253206f2e.png#clientId=u53b04b67-98b8-4&from=paste&height=703&id=ub53f80e4&name=image.png&originHeight=972&originWidth=906&originalType=binary&ratio=1&rotation=0&showTitle=false&size=532522&status=done&style=none&taskId=u5679f3e9-2fe3-4622-8d66-f3f635e84f0&title=&width=655)

#### 3. serve.js src/client.js

生成 vue 实例
![截屏2021-11-15 下午3.50.15.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1636962629712-4a129522-b013-453a-9d65-14ebb0bebcab.png#clientId=u53b04b67-98b8-4&from=drop&id=ucbbc61ac&name=%E6%88%AA%E5%B1%8F2021-11-15%20%E4%B8%8B%E5%8D%883.50.15.png&originHeight=518&originWidth=936&originalType=binary&ratio=1&rotation=0&showTitle=false&size=330728&status=done&style=none&taskId=u0f6d1c3d-d6cd-42f1-84d5-477a007bda5&title=)

#### 4. 客户端激活 src/client.js

![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1636962694217-dfcb049d-459b-4164-b0f8-a3205f11bdf7.png#clientId=u53b04b67-98b8-4&from=paste&height=376&id=u4c8305bd&name=image.png&originHeight=376&originWidth=896&originalType=binary&ratio=1&rotation=0&showTitle=false&size=219793&status=done&style=none&taskId=u4aeb0231-ee11-4f51-b162-f3120ea5be3&title=&width=896)

#### 5. 打包

webpack.base.conf.js
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1637128199972-c9d12b3d-8d3b-4f1b-b93d-a1519d3cd2cd.png#clientId=u59c3d412-293d-4&from=paste&height=492&id=u72374252&name=image.png&originHeight=492&originWidth=850&originalType=binary&ratio=1&rotation=0&showTitle=false&size=328300&status=done&style=none&taskId=u2fa8121a-9696-47fd-af03-4efd53bb499&title=&width=850)

客户端打包配置文件 build/webpack.build.conf.js
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1637128356665-e8a89d42-7683-4d30-841e-3591e14c979e.png#clientId=u59c3d412-293d-4&from=paste&height=394&id=u37c76d3e&name=image.png&originHeight=394&originWidth=889&originalType=binary&ratio=1&rotation=0&showTitle=false&size=232446&status=done&style=none&taskId=ud99cd7bc-821f-4a9f-abae-9215812566b&title=&width=889)
服务端打包配置文件
webpack 默认的打包，是在以浏览区上面跑为目标的 指定 node 环境的规范 commonjs
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1637128516413-cf3620bd-bfc7-48f7-baa3-3e133c14be54.png#clientId=u59c3d412-293d-4&from=paste&height=448&id=u06997bf6&name=image.png&originHeight=448&originWidth=885&originalType=binary&ratio=1&rotation=0&showTitle=false&size=282388&status=done&style=none&taskId=u815327f4-e5ac-4c78-b321-3870003aa7e&title=&width=885)
package.json
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1637128543684-0ff33175-24a0-497f-bf18-99bbebfc6064.png#clientId=u59c3d412-293d-4&from=paste&height=502&id=u75737ab8&name=image.png&originHeight=502&originWidth=946&originalType=binary&ratio=1&rotation=0&showTitle=false&size=358058&status=done&style=none&taskId=u5dc18888-a4fe-4375-a285-a7578365b7c&title=&width=946)

#### 6. server.js

##### 服务端打包入口 要在服务器上跑的

![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1637129834748-79a89aa4-8568-4a07-94b1-03d736d9060e.png#clientId=u79024e49-f0fd-4&from=paste&height=549&id=u1a59008d&name=image.png&originHeight=549&originWidth=1022&originalType=binary&ratio=1&rotation=0&showTitle=false&size=398259&status=done&style=none&taskId=u85afe642-e1f7-406f-8982-c35c44b9e63&title=&width=1022)

7. index.ssr.html <div id="app"></div>去掉 <div id="app"></div>加在 src/App.vue 里

![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1637129351895-f7817367-aa84-4964-a78f-9209f0c8d9da.png#clientId=u59c3d412-293d-4&from=paste&height=580&id=u1105e38c&name=image.png&originHeight=580&originWidth=1049&originalType=binary&ratio=1&rotation=0&showTitle=false&size=227893&status=done&style=none&taskId=u78d49121-a424-4cec-92c5-c477d146406&title=&width=1049)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1637130069102-408f577e-c721-4063-a360-e6c772affd5b.png#clientId=u79024e49-f0fd-4&from=paste&height=467&id=u46dd16fc&name=image.png&originHeight=467&originWidth=852&originalType=binary&ratio=1&rotation=0&showTitle=false&size=217822&status=done&style=none&taskId=uef60f74a-76ac-49f4-ab4e-6117c498711&title=&width=852)

### NUXT

Nuxt.js 是一个基于 Vue.js 的通用应用框架，一个用于 Vue.js 开发 SSR 应用的一站式解决方案。
[https://zhuanlan.zhihu.com/p/89484871](https://zhuanlan.zhihu.com/p/89484871)

# 手机端调试

mac 获取 IPV4
ipconfig getifaddr en0
![image.png](https://cdn.nlark.com/yuque/0/2022/png/292785/1651561270979-b7dd39ab-a557-468d-af38-345556854abc.png#clientId=u3edb182b-eea9-4&from=paste&height=470&id=uf9d479ab&name=image.png&originHeight=940&originWidth=1434&originalType=binary&ratio=1&rotation=0&showTitle=false&size=130905&status=done&style=none&taskId=u3e056f62-422d-4eed-a2cf-fb87be77197&title=&width=717)

#

# ssr 部署

[https://wenku.baidu.com/view/51d2443cff4ffe4733687e21af45b307e871f98c.html](https://wenku.baidu.com/view/51d2443cff4ffe4733687e21af45b307e871f98c.html)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/292785/1650622262276-94ac0226-9447-4014-b115-a2fba466c57e.png#clientId=uc0ebab56-7fa7-4&from=paste&height=214&id=ube6316f3&name=image.png&originHeight=214&originWidth=1124&originalType=binary&ratio=1&rotation=0&showTitle=false&size=81040&status=done&style=none&taskId=u9b609975-586c-4b18-9878-9814f4bd70e&title=&width=1124)

# _fetch 或者 asyncData 这 2 个方法在 layouts 和 components 中是失效的_

# Nuxt 出现 RangeError Maximum call stack size exceeded

经过排查发现问题是，components 引入的组件配置名称的时候，[Component](https://so.csdn.net/so/search?q=Component&spm=1001.2101.3001.7020)的名字和 vue 文件的 name 名字重复，就会出现栈溢出的 error

### methods 中 axios 跨域

注：配置的 api 前缀只支持 asyncData 里的请求
npm i @nuxtjs/axios -D
![image.png](https://cdn.nlark.com/yuque/0/2022/png/292785/1650506382957-b192af5b-083f-4afe-bf98-d0bf157eeb02.png#clientId=ue971133e-f02d-4&from=paste&height=734&id=uaede373c&name=image.png&originHeight=734&originWidth=1656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=216217&status=done&style=none&taskId=u455d611c-3b56-47bb-972a-8fb07fd8a94&title=&width=1656)

### 动态绑定 class 失败 window.addEventListener

### ![image.png](https://cdn.nlark.com/yuque/0/2022/png/292785/1650278973042-90874029-5db9-4b60-b6d5-ab1808f1c08e.png#clientId=u00b6b9fb-fe0c-4&from=paste&height=1350&id=u625acf6e&name=image.png&originHeight=1350&originWidth=1338&originalType=binary&ratio=1&rotation=0&showTitle=false&size=520647&status=done&style=none&taskId=u6062cf3c-aba1-44b2-8664-03dc17ea778&title=&width=1338)

### 根据 github nuxt 上的 issue 第 1552 条 提示，要将 v-if 改为 v-show 语法。

### ![image.png](https://cdn.nlark.com/yuque/0/2022/png/292785/1650273585315-e9750325-8c8b-4c03-8c53-5e3b92e9dcde.png#clientId=ub57f7d44-3988-4&from=paste&height=324&id=ua80a928f&name=image.png&originHeight=324&originWidth=3508&originalType=binary&ratio=1&rotation=0&showTitle=false&size=303199&status=done&style=none&taskId=uaa1b2d5a-f022-46b2-be9d-4d468ae3c28&title=&width=3508)img src 不显示

**解决方法 1：
**把图片存在服务器，使用网络路径，
**解决方法 2：**
使用 require 和相对路径引用图片
{ src: require("../static/images/1.png") }

### element 自定义主题 不推荐在 sass 中使用除法运算符/

: Using / for division outside of calc() is deprecated and will be removed in Dart Sass 2.0.0.
在 calc() 之外使用 / 进行除法已被弃用，并将在 Dart Sass 2.0.0 中删除。
[https://stackoverflow.com/questions/67631879/nuxtjs-vuetify-throwing-lots-of-using-for-division-is-deprecated-and-will-be](https://stackoverflow.com/questions/67631879/nuxtjs-vuetify-throwing-lots-of-using-for-division-is-deprecated-and-will-be)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/292785/1647319750522-d01ba091-e700-42da-9077-25c72d855687.png#clientId=u1bad42e8-d29d-4&from=paste&height=611&id=u5d842c30&name=image.png&originHeight=1222&originWidth=1164&originalType=binary&ratio=1&rotation=0&showTitle=false&size=407282&status=done&style=none&taskId=u208d4e70-7e7e-4889-9ac0-be5ee796190&title=&width=582)

### sass-loader 版本问题

![image.png](https://cdn.nlark.com/yuque/0/2022/png/292785/1647318064293-163619f8-1ee8-4b83-8c9a-3034a595ce95.png#clientId=uc84be5f8-8167-4&from=paste&height=370&id=u93e7e41a&name=image.png&originHeight=740&originWidth=1386&originalType=binary&ratio=1&rotation=0&showTitle=false&size=88052&status=done&style=none&taskId=uc3eab07b-0447-4d3a-a4f6-8ce7efe2b32&title=&width=693)
sass-loader > 10 不支持 vue2.0
[https://stackoverflow.com/questions/66082397/typeerror-this-getoptions-is-not-a-function](https://stackoverflow.com/questions/66082397/typeerror-this-getoptions-is-not-a-function)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/292785/1647318736729-bc0d9e34-c8e1-494f-9194-c22d688ea792.png#clientId=uc84be5f8-8167-4&from=paste&height=269&id=u255c304b&name=image.png&originHeight=538&originWidth=1576&originalType=binary&ratio=1&rotation=0&showTitle=false&size=90234&status=done&style=none&taskId=uc57d7419-ed21-4d9f-8320-f864b8ce680&title=&width=788)

### element 样式穿透

![image.png](https://cdn.nlark.com/yuque/0/2022/png/292785/1647318483727-ca16d9a8-ec79-46fe-ae95-3489e00e6bb9.png#clientId=uc84be5f8-8167-4&from=paste&height=70&id=u5445dd54&name=image.png&originHeight=140&originWidth=1492&originalType=binary&ratio=1&rotation=0&showTitle=false&size=132993&status=done&style=none&taskId=u03d8c626-d9dd-4376-90a8-05474b8acdc&title=&width=746)
于是我尝试用 **::v-deep** 替换 /deep/ ，成功解决了问题。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/292785/1647318413985-bbc04f93-dc8a-4cd9-96ee-9f0f89dc9559.png#clientId=uc84be5f8-8167-4&from=paste&height=178&id=ud575ce30&name=image.png&originHeight=228&originWidth=730&originalType=binary&ratio=1&rotation=0&showTitle=false&size=44525&status=done&style=none&taskId=uf2f1f03b-e8de-485c-90da-82a5beb59cb&title=&width=570)

### [document is not define](https://stackoverflow.com/questions/46058544/document-is-not-defined-in-nuxt-js)d

### 由于 nuxt.js 会在服务端渲染页面，而服务端并没有 window 或 documen

[https://stackoverflow.com/questions/46058544/document-is-not-defined-in-nuxt-js](https://stackoverflow.com/questions/46058544/document-is-not-defined-in-nuxt-js)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/292785/1650453007623-4c33d334-7bca-4e84-a17e-623bc36c025a.png#clientId=u75d33a12-5762-4&from=paste&height=1314&id=ub5da26aa&name=image.png&originHeight=1314&originWidth=1612&originalType=binary&ratio=1&rotation=0&showTitle=false&size=587069&status=done&style=none&taskId=ud3975e5e-6f81-49ad-9442-e2e7838f646&title=&width=1612)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/292785/1647318629137-171ec8a4-f4cd-472a-a6a7-14e475a90a39.png#clientId=uc84be5f8-8167-4&from=paste&height=387&id=uf5c63ff9&name=image.png&originHeight=774&originWidth=1214&originalType=binary&ratio=1&rotation=0&showTitle=false&size=285316&status=done&style=none&taskId=uc8800df3-081b-4b60-b2c8-518144c4d02&title=&width=607)
