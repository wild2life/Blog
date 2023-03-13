vue3 不支持 IE11

## 技术选型

Vite + Vue3 + TypeScript

请确保你的电脑上成功安装 Node.js，本项目使用 Vite 构建工具，**需要 Node.js 版本 >= 12.0.0**。

```
node -v
```

## 架构搭建

### 使用 Vite 快速初始化项目雏形

```
npm init @vitejs/app or yarn create @vitejs/app
```

1.输入项目名称
例如：本项目名称 **vite-vue3-starter**
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1634785025230-f731f042-f6c9-4c21-9193-7a889bd53342.png#clientId=u82097804-1b5a-4&from=paste&height=192&id=uddc54a78&name=image.png&originHeight=192&originWidth=1054&originalType=binary&ratio=1&rotation=0&showTitle=false&size=98327&status=done&style=none&taskId=uacfe7d2c-b15f-4a0d-bfad-f7e22042a43&title=&width=1054) 2.选择模板
本项目需要使用 Vue3 + TypeScript，所以我们选择 vue-ts，会自动安装 Vue3 和 TypeScript。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1634785052387-0e2fd804-c9c3-445d-b10f-819de039a33a.png#clientId=u82097804-1b5a-4&from=paste&height=538&id=u9aa66c62&name=image.png&originHeight=538&originWidth=1434&originalType=binary&ratio=1&rotation=0&showTitle=false&size=207879&status=done&style=none&taskId=ubfda0cc1-dc4b-43dc-a52d-d1bd709fd2b&title=&width=1434)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1634785058750-e0703433-47cb-4af4-bf5c-2d96686c0d54.png#clientId=u82097804-1b5a-4&from=paste&height=500&id=u8cb0522f&name=image.png&originHeight=500&originWidth=1484&originalType=binary&ratio=1&rotation=0&showTitle=false&size=171817&status=done&style=none&taskId=ua4087222-f897-4cb9-b89e-f6118a8fbd7&title=&width=1484)

你还可以通过附加的命令行选项直接指定项目名和模板，本项目要构建 Vite + Vue3 + TypeScript 项目，则运行：

```
# npm 6.x
npm init @vitejs/app vite-vue3-starter --template vue-ts

# npm 7+（需要额外的双横线）
npm init @vitejs/app vite-vue3-starter -- --template vue-ts

# yarn
yarn create @vitejs/app vite-vue3-starter --template vue-ts
```

3.安装依赖

```
npm install
```

4.启动项目

```
npm run dev
```

Vite + Vue3 + TypeScript 简单的项目骨架搭建完毕，
下面我们来为这个项目集成 Vue Router、Vuex、Element Plus、Axios、Stylus/Sass/Less。

### 修改 Vite 配置文件

Vite 配置文件 vite.config.ts 位于根目录下，项目启动时会自动读取。
本项目先做一些简单配置，例如：设置 @ 指向 src 目录、 服务启动端口、打包路径、代理等。
关于 Vite 更多配置项及用法，请查看 Vite 官网 [vitejs.dev/config/](https://link.juejin.cn?target=https%3A%2F%2Fvitejs.dev%2Fconfig%2F) 。

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
    },
  },
  base: './', // 设置打包路径
  server: {
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域

    // 设置代理，根据我们项目实际情况配置
    // proxy: {
    //   '/api': {
    //     target: 'http://xxx.xxx.xxx.xxx:8000',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace('/api/', '/')
    //   }
    // }
  },
})
```

### 规范目录结构

```
├── publish/
└── src/
    ├── assets/                    // 静态资源目录
    ├── common/                    // 通用类库目录
    ├── components/                // 公共组件目录
    ├── router/                    // 路由配置目录
    ├── store/                     // 状态管理目录
    ├── style/                     // 通用 CSS 目录
    ├── utils/                     // 工具函数目录
    ├── views/                     // 页面组件目录
    ├── App.vue
    ├── main.ts
    ├── shims-vue.d.ts
├── tests/                         // 单元测试目录
├── index.html
├── tsconfig.json                  // TypeScript 配置文件
├── vite.config.ts                 // Vite 配置文件
└── package.json
```

### 集成路由工具 Vue Router

1.安装支持 Vue3 的路由工具 vue-router@4

```
npm i vue-router@4
```

2.创建 src/router/index.ts 文件

```javascript
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home.vue'
import Vuex from '@/views/vuex.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/vuex',
    name: 'Vuex',
    component: Vuex,
  },
  {
    path: '/axios',
    name: 'Axios',
    component: () => import('@/views/axios.vue'), // 懒加载组件
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
```

根据本项目路由配置的实际情况，你需要在 src 下创建 views 目录，用来存储页面组件。
我们在 views 目录下创建 home.vue 、vuex.vue 、axios.vue。 3.在 main.ts 文件中挂载路由配置

```javascript
import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'

createApp(App).use(router).mount('#app')
```

### 集成状态管理工具 Vuex

1.安装支持 Vue3 的状态管理工具 vuex@next

```
npm i vuex@next
```

2.创建 src/store/index.ts 文件

```javascript
import { createStore } from 'vuex'

const defaultState = {
  count: 0,
}

// Create a new store instance.
export default createStore({
  state() {
    return defaultState
  },
  mutations: {
    increment(state: typeof defaultState) {
      state.count++
    },
  },
  actions: {
    increment(context) {
      context.commit('increment')
    },
  },
  getters: {
    double(state: typeof defaultState) {
      return 2 * state.count
    },
  },
})
```

3.在 main.ts 文件中挂载 Vuex 配置

```javascript
import { createApp } from 'vue'
import App from './App.vue'

import store from './store/index'

createApp(App).use(store).mount('#app')
```

### 集成 UI 框架 Element Plus

1. 安装支持 Vue3 的 UI 框架 Element Plus

```javascript
npm i element-plus 复制代码
```

2. 在 main.ts 文件中挂载 Element Plus

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css' createApp(App).use(ElementPlus).mount('#app')
```

### 集成 HTTP 工具 Axios

1. 安装 Axios（Axios 跟 Vue 版本没有直接关系，安装最新即可）

```javascript
npm i axios
```

###### 2.配置 Axios

为了使项目的目录结构合理且规范，我们在 src 下创建 utils 目录来存储我们常用的工具函数。
Axios 作为 HTTP 工具，我们在 utils 目录下创建 axios.ts 作为 Axios 配置文件：

```javascript
import Axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = 'https://api.github.com'

const axios = Axios.create({
  baseURL,
  timeout: 20000, // 请求超时 20s
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (response) => {
    /**
     * 根据你的项目实际情况来对 config 做处理
     * 这里对 config 不做任何处理，直接返回
     */
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    return response
  },
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      ElMessage.error(`Code: ${code}, Message: ${msg}`)
      console.error(`[Axios Error]`, error.response)
    } else {
      ElMessage.error(`${error}`)
    }
    return Promise.reject(error)
  },
)

export default axios
```

3.使用 Axios
在需要使用 Axios 文件里，引入 Axios 配置文件，参考如下：

```javascript
<template>axios</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import axios from '../utils/axios'

  export default defineComponent({
    setup() {
      axios
        .get('/users/XPoet')
        .then((res) => {
          console.log('res: ', res)
        })
        .catch((err) => {
          console.log('err: ', err)
        })
    }
  })
</script>
```

### 集成 CSS 预编译器 Stylus/Sass/Less

1.安装

```javascript
npm i stylus -D
# or
npm i sass -D
npm i less -D
```

2.使用

```javascript
<style lang="less">...</style>
```

下面我们来打磨这个项目，增加代码规范约束、提交规范约束、单元测试、自动部署等，让其更完善、更健壮。

## 代码规范

### 集成 EditorConfig 配置

使用 **EditorConfig + Prettier + ESLint** 组合来实现代码规范化。
这样做带来好处：

- 解决团队之间代码不规范导致的可读性差和可维护性差的问题。
- 解决团队成员不同编辑器导致的编码规范不统一问题。
- 提前发现代码风格问题，给出对应规范提示，及时修复。
- 减少代码审查过程中反反复复的修改过程，节约时间。
- 自动格式化，统一编码风格，从此和脏乱差的代码说再见。

官网：[editorconfig.org](https://link.juejin.cn/?target=http%3A%2F%2Feditorconfig.org)
在项目根目录下增加 .editorconfig 文件：
注意：

- VSCode 使用 EditorConfig 需要去插件市场下载插件 **EditorConfig for VS Code** 。
- JetBrains 系列（WebStorm、IntelliJ IDEA 等）则不用额外安装插件，可直接使用 EditorConfig 配置。

### 集成 Prettier 配置

Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。
官网：[prettier.io/](https://link.juejin.cn?target=https%3A%2F%2Fprettier.io%2F)

1. 安装 Prettier

```javascript
npm i prettier -D
```

2. 创建 Prettier 配置文件 Prettier 支持多种格式的[配置文件](https://link.juejin.cn?target=https%3A%2F%2Fprettier.io%2Fdocs%2Fen%2Fconfiguration.html)，比如 .json、.yml、.yaml、.js 等。在本项目根目录下创建 .prettierrc 文件。
3. 配置 .prettierrc 在本项目中，我们进行如下简单配置，关于更多配置项信息，请前往官网查看 [Prettier-Options](https://link.juejin.cn?target=https%3A%2F%2Fprettier.io%2Fdocs%2Fen%2Foptions.html)

```javascript
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true,
  "semi": false
}
```

4. Prettier 安装且配置好之后，就能使用命令来格式化代码

```javascript
# 格式化所有文件（. 表示所有文件）
npx prettier --write .
```

注意：VSCode 编辑器使用 Prettier 配置需要下载插件 **Prettier - Code formatter** 。
JetBrains 系列（WebStorm、IntelliJ IDEA 等）则不用额外安装插件，可直接使用 EditorConfig 配置。

Prettier 配置好以后，在使用 VSCode 或 WebStorm 等编辑器的格式化功能时，编辑器就会按照 Prettier 配置文件的规则来进行格式化，避免了因为大家编辑器配置不一样而导致格式化后的代码风格不统一的问题。

### 集成 ESLint 配置

[ESLint](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Feslint%2Feslint) 是一款用于查找并报告代码中问题的工具，并且支持部分问题自动修复。其核心是通过对代码解析得到的 AST（Abstract Syntax Tree 抽象语法树）进行模式匹配，来分析代码达到检查代码质量和风格问题的能力。
正如前面我们提到的因团队成员之间编程能力和编码习惯不同所造成的代码质量问题，我们使用 ESLint 来解决，一边写代码一边查找问题，如果发现错误，就给出规则提示，并且自动修复，长期下去，可以促使团队成员往同一种编码风格靠拢。

1. 安装 ESLint

可以全局或者本地安装，作者推荐本地安装（只在当前项目中安装）。

```javascript
npm i eslint -D
```

2. 配置 ESLint

ESLint 安装成功后，执行 npx eslint --init，然后按照终端操作提示完成一系列设置来创建配置文件。

- How would you like to use ESLint? （你想如何使用 ESLint?）

![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1634794175262-e772cec7-e71e-4686-9f3e-c03f1a444e6c.png#clientId=u82097804-1b5a-4&from=paste&height=276&id=u196aa8e3&name=image.png&originHeight=276&originWidth=1116&originalType=binary&ratio=1&rotation=0&showTitle=false&size=145810&status=done&style=none&taskId=u062f0836-2540-4c8c-b47e-387c14352db&title=&width=1116)
我们这里选择 **To check syntax, find problems, and enforce code style（检查语法、发现问题并强制执行代码风格）**

- What type of modules does your project use?（你的项目使用哪种类型的模块?）![](https://cdn.nlark.com/yuque/0/2021/webp/292785/1634794208790-e2fd2bd3-9a3f-4a93-9d4a-020a636d0d73.webp#clientId=u82097804-1b5a-4&from=paste&id=u020a8d2f&originHeight=138&originWidth=514&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uda9ec735-9857-4d4d-add2-71837c6338a&title=)

我们这里选择 **JavaScript modules (import/export)**

- Does your project use TypeScript?（你的项目是否使用 TypeScript？）![](https://cdn.nlark.com/yuque/0/2021/webp/292785/1634794241074-7868c7ab-e739-4787-a138-173278079e72.webp#clientId=u82097804-1b5a-4&from=paste&id=u01d7d927&originHeight=134&originWidth=496&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ua9eddcd1-c414-4b4e-8153-79df1d440ac&title=)

我们这里选择 **Yes**

- Where does your code run?（你的代码在哪里运行?）![](https://cdn.nlark.com/yuque/0/2021/webp/292785/1634794256259-b1e0c691-28bd-4755-ba26-4656b2b8c363.webp#clientId=u82097804-1b5a-4&from=paste&id=u8a0a8659&originHeight=168&originWidth=835&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf4173cac-4c88-47a5-bef1-9dd86e280c5&title=)我们这里选择 **Browser 和 Node**（按空格键进行选择，选完按回车键确定）
- How would you like to define a style for your project?（你想怎样为你的项目定义风格？）![](https://cdn.nlark.com/yuque/0/2021/webp/292785/1634794270189-8716473a-ee1e-4f14-a416-ba6b73861463.webp#clientId=u82097804-1b5a-4&from=paste&id=u4202e500&originHeight=203&originWidth=616&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u1dbfa73f-3e13-4de0-8345-8a740c790da&title=)我们这里选择 **Use a popular style guide（使用一种流行的风格指南）**
- Which style guide do you want to follow?（你想遵循哪一种风格指南?）

![](https://cdn.nlark.com/yuque/0/2021/webp/292785/1634794283476-20481e8d-280a-4203-969f-d15b5740429a.webp#clientId=u82097804-1b5a-4&from=paste&id=u5b1eea0b&originHeight=217&originWidth=600&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u968a9a07-5bbd-4512-8828-e4ff58c1cb7&title=)
我们这里选择 **Airbnb: **[https://github.com/airbnb/javascript](https://github.com/airbnb/javascript)
ESLint 为我们列出了三种社区流行的 JavaScript 风格指南，分别是 [Airbnb](https://github.com/airbnb/javascript)、[Standard](https://github.com/standard/standard)、[Google](https://google.github.io/styleguide/jsguide.html)。
这三份风格指南都是由众多大佬根据多年开发经验编写，足够优秀，全球很多大小公司都在使用。我们选用 **GitHub 上 star 最多的 Airbnb**，免去繁琐的配置 ESLint 规则时间，然后让团队成员去学习 Airbnb JavaScript 风格指南即可。
此时，我们在 ESLint 配置了 Airbnb JavaScript 规则，在编码时，所有不符合 Airbnb 风格的代码，编辑器都会给出提示，并且可以自动修复。

- What format do you want your config file to be in?（你希望你的配置文件是什么格式?）

![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1634794588422-dfb2602a-c526-4908-baf8-113ad8212d19.png#clientId=u82097804-1b5a-4&from=paste&height=233&id=u22172ec6&name=image.png&originHeight=233&originWidth=650&originalType=binary&ratio=1&rotation=0&showTitle=false&size=103946&status=done&style=none&taskId=u66f53c92-10c1-4cde-b6ce-8dc16233efa&title=&width=650)
我们这里选择 **JavaScript**

- Would you like to install them now with npm?（你想现在就用 NPM 安装它们吗?）
  ![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1634794664012-23f9c537-e805-4adf-b784-152649fe5833.png#clientId=u82097804-1b5a-4&from=paste&height=304&id=u4b6fc903&name=image.png&originHeight=304&originWidth=1084&originalType=binary&ratio=1&rotation=0&showTitle=false&size=164076&status=done&style=none&taskId=u0586ce6e-5f2c-433b-85af-1c71a7080ad&title=&width=1084)

根据上面的选择，ESLint 会自动去查找缺失的依赖，我们这里选择 **Yes**，使用 NPM 下载安装这些依赖包。
注意：如果自动安装依赖失败，那么需要手动安装

```javascript
npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-base eslint-plugin-import eslint-plugin-vue -D
```

3.ESLint 配置文件 .eslintrc.js
在**上一步**操作完成后，会在项目根目录下自动生成 .eslintrc.js 配置文件：

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {},
}
```

根据项目实际情况，如果我们有额外的 ESLint 规则，也在此文件中追加。
注意：VSCode 使用 ESLint 配置文件需要去插件市场下载插件 **ESLint** 。
JetBrains 系列（WebStorm、IntelliJ IDEA 等）则不用额外安装插件

配置好以后，我们在 VSCode 或 WebStorm 等编辑器中开启 ESLin，写代码时，ESLint 就会按照我们配置的规则来进行实时代码检查，发现问题会给出对应错误提示和修复方案。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1634795446734-d069ac10-be68-471f-a546-867b677035c2.png#clientId=u82097804-1b5a-4&from=paste&height=270&id=ubc695048&name=image.png&originHeight=272&originWidth=643&originalType=binary&ratio=1&rotation=0&showTitle=false&size=32233&status=done&style=none&taskId=u2a37b903-96b7-416f-a72c-1cb79aa73a3&title=&width=638)
我们只需设置编辑器保存文件时自动执行 eslint --fix 命令进行代码风格修复。
VSCode 在 settings.json 设置文件中，增加以下代码：

```javascript
 "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
 }
```

WebStorm 打开设置窗口，按如下操作，最后点击 Apply -> OK。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1634795764733-b5fbc4f9-3f2c-426c-9c35-ef80c161ea5d.png#clientId=u82097804-1b5a-4&from=paste&height=1456&id=ud6da9209&name=image.png&originHeight=1456&originWidth=1856&originalType=binary&ratio=1&rotation=0&showTitle=false&size=410262&status=done&style=none&taskId=u546bcfab-82df-4f6f-b324-d3c96cc38d1&title=&width=1856)

### 解决 Prettier 和 ESLint 的冲突

#### 通常大家会在项目中根据实际情况添加一些额外的 ESLint 和 Prettier 配置规则，难免会存在规则冲突情况。

本项目中的 ESLint 配置中使用了 Airbnb JavaScript 风格指南校验，其规则之一是*代码结束后面要加分号*，而我们在 Prettier 配置文件中加了*代码结束后面不加分号*的配置项，这样就有冲突了，会出现用 Prettier 格式化后的代码，ESLint 检测到格式有问题的，从而抛出错误提示。

解决两者冲突问题，需要用到 **eslint-plugin-prettier** 和 **eslint-config-prettier**。

- eslint-plugin-prettier 将 Prettier 的规则设置到 ESLint 的规则中。
- eslint-config-prettier 关闭 ESLint 中与 Prettier 中会发生冲突的规则。

最后形成优先级：Prettier 配置规则 > ESLint 配置规则。

1. 安装插件

```javascript
npm i eslint-plugin-prettier eslint-config-prettier -D
```

2. 在 .eslintrc.js 添加 prettier 插件

```javascript
module.exports = {
  ...
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  ...
}
```

### 集成 husky 和 lint-staged

我们在项目中已集成 ESLint 和 Prettier，在编码时，这些工具可以对我们写的代码进行实时校验，在一定程度上能有效规范我们写的代码，但团队可能会有些人觉得这些条条框框的限制很麻烦，选择视“提示”而不见，依旧按自己的一套风格来写代码，或者干脆禁用掉这些工具，开发完成就直接把代码提交到了仓库，日积月累，ESLint 也就形同虚设。
所以，我们还需要做一些限制，让没通过 ESLint 检测和修复的代码禁止提交，从而保证仓库代码都是符合规范的。
为了解决这个问题，我们需要用到 Git Hook，在本地执行 git commit 的时候，就对所提交的代码进行 ESLint 检测和修复（即执行 eslint --fix），如果这些代码没通过 ESLint 规则校验，则禁止提交。
实现这一功能，我们借助 [husky](https://github.com/typicode/husky) + [lint-staged](https://github.com/okonet/lint-staged) 。
[husky](https://github.com/typicode/husky) —— Git Hook 工具，可以设置在 git 各个阶段（pre-commit、commit-msg、pre-push 等）触发我们的命令。
[lint-staged](https://github.com/okonet/lint-staged) —— 在 git 暂存的文件上运行 linters。

#### 配置 husky

- 自动配置（推荐）

```javascript
npx husky-init && npm install
```

自动安装做了 4 件事 如下 1.安装 husky 到开发依赖 2.在项目根目录下创建 .husky 目录 3.在 .husky 目录创建 pre-commit hook，并初始化 pre-commit 命令为 npm test 4.修改 package.json 的 scripts，增加 "prepare": "husky install"

husky 包含很多 hook（钩子），常用有：pre-commit、commit-msg、pre-push。这里，我们使用 pre-commit 来触发 ESLint 命令。
修改 .husky/pre-commit hook 文件的触发命令：

```javascript
eslint --fix ./src --ext .vue,.js,.ts
```

上面这个 pre-commit hook 文件的作用是：当我们执行 git commit -m "xxx" 时，会先对 src 目录下所有的 .vue、.js、.ts 文件执行 eslint --fix 命令，如果 ESLint 通过，成功 commit，否则终止 commit。
但是又存在一个问题：有时候我们明明只改动了一两个文件，却要对所有的文件执行 eslint --fix。假如这是一个历史项目，我们在中途配置了 ESLint 规则，那么在提交代码时，也会对其他未修改的“历史”文件都进行检查，可能会造成大量文件出现 ESLint 错误，显然不是我们想要的结果。
我们要做到只用 ESLint 修复自己此次写的代码，而不去影响其他的代码。所以我们还需借助一个神奇的工具 **lint-staged** 。

#### 配置 lint-staged

lint-staged 这个工具一般结合 husky 来使用，它可以让 husky 的 hook 触发的命令只作用于 git add 那些文件（即 git 暂存区的文件），而不会影响到其他文件。 1.安装 lint-staged

```javascript
npm i lint-staged -D
```

2.在 package.json 里增加 lint-staged 配置项

```javascript
"lint-staged": {
  "*.{vue,js,ts}": "eslint --fix"
},
```

这行命令表示：只对 git 暂存区的 .vue、.js、.ts 文件执行 eslint --fix。

tips: 跳过 eslint --fix git commit --no-verify -m 'msg' 3.修改 .husky/pre-commit hook 的触发命令为：npx lint-staged
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1639718312903-cb4be700-e872-4ff7-bc5b-2eacc708aca4.png#clientId=u1c2189c9-72d7-4&from=paste&height=279&id=ufb8ac0bf&name=image.png&originHeight=279&originWidth=871&originalType=binary&ratio=1&rotation=0&showTitle=false&size=42817&status=done&style=none&taskId=u73f228f0-073c-4a55-b34e-6549650d6b8&title=&width=871)
至此，husky 和 lint-staged 组合配置完成。

## 提交规范

这里，我们使用社区最流行、最知名、最受认可的 Angular 团队提交规范。
[angular 项目的提交记录](https://github.com/angular/angular/commits/master)

### commit message 格式规范

commit message 由 Header、Body、Footer 组成。

#### Header

Header 部分包括三个字段 type（必需）、scope（可选）和 subject（必需）

```javascript
<type>(<scope>): <subject>
```

##### type

type 用于说明 commit 的提交类型（必须是以下几种之一）。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1634802285826-dcaeadbe-2dd6-4c1a-8797-e717f75e01ee.png#clientId=u82097804-1b5a-4&from=paste&height=604&id=uf5212925&name=image.png&originHeight=604&originWidth=653&originalType=binary&ratio=1&rotation=0&showTitle=false&size=42571&status=done&style=none&taskId=ua31cd80e-645b-40bb-a11f-9b0ba8b1bc2&title=&width=653)

##### scope

scope 用于指定本次 commit 影响的范围。scope 依据项目而定，例如在业务项目中可以依据菜单或者功能模块划分，如果是组件库开发，则可以依据组件划分。（scope 可省略）

##### subject

subject 是本次 commit 的简洁描述，长度约定在 50 个字符以内，通常遵循以下几个规范：

- 用动词开头，第一人称现在时表述，例如：change 代替 changed 或 changes
- 第一个字母小写
- 结尾不加句号（.）

#### Body

body 是对本次 commit 的详细描述，可以分成多行。（body 可省略）
跟 subject 类似，用动词开头，body 应该说明修改的原因和更改前后的行为对比。

#### Footer

如果本次提交的代码是突破性的变更或关闭缺陷，则 Footer 必需，否则可以省略。

- 突破性的变更当前代码与上一个版本有突破性改变，则 Footer 以 BREAKING CHANGE 开头，后面是对变动的描述、以及变动的理由。
- 关闭缺陷如果当前提交是针对特定的 issue，那么可以在 Footer 部分填写需要关闭的单个 issue 或一系列 issues。

#### 参考例子

```javascript
feat(browser): onUrlChange event (popstate/hashchange/polling)

Added new event to browser:
- forward popstate event if available
- forward hashchange event if popstate not available
- do polling when neither popstate nor hashchange available

Breaks $browser.onHashChange, which was removed (use onUrlChange instead)
```

```javascript
fix(compile): couple of unit tests for IE9

Older IEs serialize html uppercased, but IE9 does not...
Would be better to expect case insensitive, unfortunately jasmine does
not allow to user regexps for throw expectations.

Closes #392
Breaks foo.bar api, foo.baz should be used instead
```

```javascript
style(location): add couple of missing semi colons
```

```javascript
chore(release): v3.4.2
```

#### 规范 commit message 的好处

- 首行就是简洁实用的关键信息，方便在 git history 中快速浏览。
- 具有更加详细的 body 和 footer，可以清晰的看出某次提交的目的和影响。
- 可以通过 type 过滤出想要查找的信息，也可以通过关键字快速查找相关提交。
- 可以直接从 commit 生成 change log。

### 集成 Commitizen 实现规范提交

上面介绍了 Angular 规范提交的格式，初次接触的同学咋一看可能会觉得复杂，其实不然，如果让大家在 git commit 的时候严格按照上面的格式来写，肯定是有压力的，首先得记住不同的类型到底是用来定义什么，subject 怎么写，body 怎么写，footer 要不要写等等问题，懒才是程序员第一生产力，为此我们使用 Commitizen 工具来帮助我们自动生成 commit message 格式，从而实现规范提交。

Commitizen 是一个帮助撰写规范 commit message 的工具。它有一个命令行工具 cz-cli

#### 安装 Commitizen

```javascript
npm install commitizen -D
```

#### 初始化项目

成功安装 Commitizen 后，我们用 **cz-conventional-changelog** 适配器来初始化项目：

```javascript
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

这行命令做了两件事：

- 安装 cz-conventional-changelog 到开发依赖（devDependencies）
- 在 package.json 中增加了 config.commitizen

```javascript
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
```

#### 使用 Commitizen

以前我们提交代码都是 git commit -m "xxx"，现在改为 git cz，然后按照终端操作提示，逐步填入信息，就能自动生成规范的 commit message。
注意：![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1634801808400-ea76136b-35a0-41a3-8c3f-ba612a419101.png#clientId=u82097804-1b5a-4&from=paste&height=48&id=u24b08d00&name=image.png&originHeight=48&originWidth=440&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8275&status=done&style=none&taskId=u1f0ed4e5-289b-49ad-92b7-8dc85d37244&title=&width=440)需全局安装 commitizen

#### 自定义配置提交说明

从上面的截图可以看到，git cz 终端操作提示都是英文的，如果想改成中文的或者自定义这些配置选项，我们使用 [**cz-customizable**](https://github.com/leoforfree/cz-customizable/blob/master/cz-config-EXAMPLE.js) 适配器。
npm i cz-customizable -D  
npm i commitlint-config-cz -D

```javascript
"config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    }
  }
```

新建.cz-config.js

创建 commitlint.config.js

```javascript
module.exports = { extends: ['cz'] }
或者
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['Add', 'Fix', 'Drop', 'Make', 'Optimize', 'Document', 'Refactor', 'Reformat'],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
}
```

### 集成 commitlint 验证提交规范

在“代码规范”章节，我们已经讲到过，尽管制定了规范，但在多人协作的项目中，总有些人依旧我行我素，因此提交代码这个环节，我们也增加一个限制：**只让符合 Angular 规范的 commit message 通过**，我们借助 @commitlint/config-conventional 和 @commitlint/cli 来实现。

#### 安装 commitlint

```javascript
npm i @commitlint/config-conventional @commitlint/cli -D
```

#### 配置 commitlint

创建 commitlint.config.js 文件 在项目根目录下创建 commitlint.config.js 文件，并填入以下内容：

```javascript
module.exports = { extends: ['@commitlint/config-conventional'] }
```

或直接使用快捷命令：

```javascript
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

使用 husky 的 commit-msg hook 触发验证提交信息的命令
我们使用 husky 命令在 .husky 目录下创建 commit-msg 文件，并在此执行 commit message 的验证命令

```javascript
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1634801308644-787a1bac-931f-4983-8b60-3f1c62f8b753.png#clientId=u82097804-1b5a-4&from=paste&height=426&id=ue3220438&name=image.png&originHeight=426&originWidth=1410&originalType=binary&ratio=1&rotation=0&showTitle=false&size=288682&status=done&style=none&taskId=ubec24dd2-76bf-480e-b403-2d79ec5d700&title=&width=1410)

#### commitlint 验证

- 不符合规范的提交信息
  如下图，提交信息 test commitlint 不符合规范，提交失败。 ![](https://cdn.nlark.com/yuque/0/2021/webp/292785/1634801441737-35498e7a-bf56-458c-9e6a-7d2970ad7333.webp#clientId=u82097804-1b5a-4&from=paste&id=ue4981be9&originHeight=540&originWidth=1658&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u46a4e035-65ec-4e6b-ace0-1b5bd70a197&title=)
- 符合规范的提交信息
  如下图，提交信息 test: commitlint test 符合规范，成功提交到仓库。 ![](https://cdn.nlark.com/yuque/0/2021/webp/292785/1634801441957-09001a5b-b35d-4ae9-94d0-008afc04c328.webp#clientId=u82097804-1b5a-4&from=paste&id=ud178037e&originHeight=278&originWidth=1334&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ucd68758b-0d17-48b4-9597-d5f9ae9a588&title=)

因为已在项目中集成 commitizen，建议大家用 git cz 来代替 git commit 提交代码，可以保证提交信息规范。

## 单元测试

单元测试是项目开发中一个非常重要的环节，完整的测试能为代码和业务提供质量保证，减少 Bug 的出现

### 安装核心依赖

```javascript
npm i @vue/test-utils@next jest vue-jest@next ts-jest -D
```

### 创建 jest 配置文件

在项目根目录下新建 jest.config.js 文件：

```javascript
module.exports = {
  moduleFileExtensions: ['vue', 'js', 'ts'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest', // vue 文件用 vue-jest 转换
    '^.+\\.ts$': 'ts-jest', // ts 文件用 ts-jest 转换
  },
  // 匹配 __tests__ 目录下的 .js/.ts 文件 或其他目录下的 xx.test.js/ts xx.spec.js/ts
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts)$',
}
```

### 创建单元测试文件

在上面的 jest.config.js 文件中，我们配置只匹配 **tests** 目录下的任意 .ts 文件或其他目录下的 xx.test.ts/xx.spec.ts 文件进行单元测试。

### 集成 @types/jest

![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1634809449859-0306b278-da25-4242-b41a-7f2d58a6067a.png#clientId=uec4e8a93-df41-4&from=paste&height=273&id=u0e320947&name=image.png&originHeight=273&originWidth=582&originalType=binary&ratio=1&rotation=0&showTitle=false&size=29657&status=done&style=none&taskId=u40392ca5-86f7-4745-9176-64b42b3e142&title=&width=582)
如上图，我们使用 VSCode / WebStrom / IDEA 等编辑器时，在单元测试文件中，IDE 会提示某些方法不存在（如 test、describe、it、expect 等），安装 @types/jest 即可解决。

```javascript
npm i @types/jest -D
```

TypeScript 的编译器也会提示 jest 的方法和类型找不到，我们还需把 @types/jest 添加根目录下的 ts.config.json（TypeScript 配置文件）中：

```javascript
{
  "compilerOptions": {
    ...
    "types": ["vite/client", "jest"]
  },
}
```

### 添加 eslint-plugin-jest

![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1634809560440-425e1e3c-5076-4328-b7d4-a4755455ec61.png#clientId=uec4e8a93-df41-4&from=paste&height=341&id=ua428b80f&name=image.png&originHeight=341&originWidth=668&originalType=binary&ratio=1&rotation=0&showTitle=false&size=39976&status=done&style=none&taskId=ud21f69da-c979-4305-a462-959bac34258&title=&width=668)
因为我们在项目中集成了 ESLint，如上图很明显是没通过 ESLint 规则检验。因此，我们还需要在 ESLint 中增加 **eslint-plugin-jest** 插件来解除对 jest 的校验。

```javascript
npm i eslint-plugin-jest -D
```

添加 eslint-plugin-jest 到 ESLint 配置文件 .eslintrc.js 中

```javascript
module.exports = {
  ...
  extends: [
    ...
    'plugin:jest/recommended'
  ],
  ...
}
```

现在，我们的单元测试代码就不会有错误提示信息了 ؏؏☝ᖗ 乛 ◡ 乛 ᖘ☝؏

### 执行单元测试

在根目录下 package.json 文件的 scripts 中，添加一条单元测试命令： "test": "jest"。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1634809708845-29acec3c-ceff-437d-879c-e0346e5fc5a5.png#clientId=uec4e8a93-df41-4&from=paste&height=169&id=ub2eaf9aa&name=image.png&originHeight=169&originWidth=450&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16361&status=done&style=none&taskId=ueb5bb452-bf5e-45b3-83ef-f74141480fb&title=&width=450)
执行命令 npm run test 即可进行单元测试，jest 会根据 jest.config.js 配置文件去查找 **tests** 目录下的 .ts 文件或其他任意目录下的 .spec.ts 和 .test.ts 文件，然后执行单元测试方法。
你可以在 jest.config.js 配置文件中，自由配置单元测试文件的目录。

当单元测试没有全部通过时，我们需要根据报错信息去优化对应组件的代码，进一步提高项目健壮性。但是写单元测试是件比较痛苦的事，我个人觉得也没必要全部组件都写单元测试，根据项目实际情况有针对性去写就行了。

test 报错 兼容性问题
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1634813203628-80b8b0bf-340e-4cbd-8977-72e057e61bc4.png#clientId=uec4e8a93-df41-4&from=paste&height=574&id=u087e0d3e&name=image.png&originHeight=574&originWidth=1412&originalType=binary&ratio=1&rotation=0&showTitle=false&size=98112&status=done&style=none&taskId=ub59aca20-94da-4f6f-a6df-d88e6adcaf7&title=&width=1412)

### 单元测试约束

前面，我们使用 husky 在 Git 的 pre-commit 和 commit-msg 阶段分别约束代码风格规范和提交信息规范。这一步，我们在 pre-push 阶段进行单元测试，只有单元测试全部通过才让代码 push 到远端仓库，否则终止 push。
使用 husky 命令在 .husky 目录下自动创建 pre-push hook 文件，并在此执行单元测试命令 npm run test。

```javascript
npx husky add .husky/pre-push "npm run test $1"
```

现在，我们在 git push 时就能先进行单元测试了，只有单元测试全部通过，才能成功 push。

## 自动部署

#### 创建 GitHub 仓库

因为 GitHub Actions 只对 GitHub 仓库有效，所以我们[创建 GitHub 仓库](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fnew)来托管项目代码。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1634806841389-ecc88c42-e26b-47f1-b7d2-6b684b1d3a2c.png#clientId=uec4e8a93-df41-4&from=paste&height=69&id=ud0f30070&name=image.png&originHeight=69&originWidth=264&originalType=binary&ratio=1&rotation=0&showTitle=false&size=4111&status=done&style=none&taskId=uc2c23a60-8fc3-473c-9b6e-5a4f7466921&title=&width=264)

#### 创建 GitHub Token

创建一个有 **repo** 和 **workflow** 权限的 [GitHub Token](https://github.com/settings/tokens/new)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1634806916623-da108793-8227-4a90-aed1-852ba71c542d.png#clientId=uec4e8a93-df41-4&from=paste&height=445&id=u753d9b03&name=image.png&originHeight=445&originWidth=575&originalType=binary&ratio=1&rotation=0&showTitle=false&size=45362&status=done&style=none&taskId=u94ffa603-1842-4a77-b6b1-c711621fb3d&title=&width=575)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1634806965227-04f6a918-9f0a-467f-980c-562c59c9b60b.png#clientId=uec4e8a93-df41-4&from=paste&height=127&id=u5bc828ba&name=image.png&originHeight=127&originWidth=682&originalType=binary&ratio=1&rotation=0&showTitle=false&size=12533&status=done&style=none&taskId=ud7e187ab-613e-4524-8eb2-5e3974706d0&title=&width=682)
注意：新生成的 Token 只会显示一次，保存起来，后面要用到。如有遗失，重新生成即可。

#### 在仓库中添加 secret

将上面新创建的 Token 添加到 GitHub 仓库的 Secrets 里，并将这个新增的 secret 命名为 VUE3_DEPLOY （名字无所谓，看你喜欢）。
步骤：仓库 -> settings -> Secrets -> New repository secret。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1634807083105-6ab6a492-7fa2-4d3f-82ef-e7ec0809a403.png#clientId=uec4e8a93-df41-4&from=paste&height=1294&id=ud976f364&name=image.png&originHeight=1294&originWidth=1964&originalType=binary&ratio=1&rotation=0&showTitle=false&size=404802&status=done&style=none&taskId=uef1911b8-86d3-4353-9ea8-4bb235fc082&title=&width=1964)
新创建的 secret VUE3_DEPLOY 在 Actions 配置文件中要用到，两个地方需保持一致！

#### 创建 Actions 配置文件

1. 在项目根目录下创建 .github 目录。
2. 在 .github 目录下创建 workflows 目录。
3. 在 workflows 目录下创建 deploy.yml 文件。

### 自动部署触发原理

当有新提交的代码 push 到 GitHub 仓库时，就会触发 GitHub Actions，在 GitHub 服务器上执行 Action 配置文件里面的命令，例如：**安装依赖**、**项目打包**等，然后将打包好的静态文件部署到 GitHub Pages 上，最后，我们就能通过域名访问了。
[https://altmaniss.github.io/vite-vue3-template](https://altmaniss.github.io/vite-vue3-template/#/)
[https://github.com/AltmanIss/vite-vue3-template](https://github.com/AltmanIss/vite-vue3-template)
