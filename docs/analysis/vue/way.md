# 源码阅读

1. 下载源码

git clone https://github.com/vuejs/vue.git 或者[zip](https://github.com/vuejs/vue/tree/dev)

2.  npm i

3.  在 package.json -> scripts 中的 dev 命令中添加 --sourcemap，这样就可以在浏览器中调试源码时查看当前代码在源码中的位置。

```
{
  "scripts": {
    "dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev"
  }
}
```

4.npm run dev
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1635496174575-0b6ff95c-605d-4157-9d2c-42f5cd1771bf.png#clientId=u22b003c3-5731-4&from=paste&height=182&id=bHX2k&name=image.png&originHeight=182&originWidth=727&originalType=binary&ratio=1&rotation=0&showTitle=false&size=25838&status=done&style=none&taskId=ua303496f-035d-4fdf-be69-c17abaa93a3&title=&width=727)

## 源码目录结构

```
├── benchmarks                  性能、基准测试
├── dist                        构建打包的输出目录
├── examples                    案例目录
├── flow                        flow 语法的类型声明
├── packages                    一些额外的包，比如：负责服务端渲染的包 vue-server-renderer、配合 vue-loader 使用的的 vue-template-compiler，还有 weex 相关的
│   ├── vue-server-renderer
│   ├── vue-template-compiler
│   ├── weex-template-compiler
│   └── weex-vue-framework
├── scripts                     所有的配置文件的存放位置，比如 rollup 的配置文件
├── src                         vue 源码目录
│   ├── compiler                编译器
│   ├── core                    运行时的核心包
│   │   ├── components          全局组件，比如 keep-alive
│   │   ├── config.js           一些默认配置项
│   │   ├── global-api          全局 API，比如熟悉的：Vue.use()、Vue.component() 等
│   │   ├── instance            Vue 实例相关的，比如 Vue 构造函数就在这个目录下
│   │   ├── observer            响应式原理
│   │   ├── util                工具方法
│   │   └── vdom                虚拟 DOM 相关，比如熟悉的 patch 算法就在这儿
│   ├── platforms               平台相关的编译器代码
│   │   ├── web
│   │   └── weex
│   ├── server                  服务端渲染相关
├── test                        测试目录
├── types                       TS 类型声明
```

## vdom

**虚拟 DOM**简而言之就是，用 JS 去按照 DOM 结构来实现的树形结构对象，你也可以叫做**DOM 对象**

```javascript
// element.js
class Element {
  constructor(type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }
}
// 创建虚拟DOM，返回虚拟节点(object)
function createElement(type, props, children) {
  return new Element(type, props, children)
}

// render方法可以将虚拟DOM转化成真实DOM
function render(domObj) {
  let el = document.createElement(domObj.type)
  // 再去遍历props属性对象，然后给创建的元素el设置属性
  for (let key in domObj.props) {
    // 设置属性的方法
    setAttr(el, key, domObj.props[key])
  }
  // 遍历子节点
  // 如果是虚拟DOM，就继续递归渲染
  // 不是就代表是文本节点，直接创建
  domObj.children.forEach((child) => {
    child = child instanceof Element ? render(child) : document.createTextNode(child)
    // 添加到对应元素内
    el.appendChild(child)
  })
  return el
}

// 设置属性
function setAttr(node, key, value) {
  switch (key) {
    case 'value':
      // node是一个input或者textarea就直接设置其value即可
      if (node.tagName.toLowerCase() === 'input' || node.tagName.toLowerCase() === 'textarea') {
        node.value = value
      } else {
        node.setAttribute(key, value)
      }
      break
    case 'style':
      // 直接赋值行内样式
      node.style.cssText = value
      break
    default:
      node.setAttribute(key, value)
      break
  }
}
// 将元素插入到页面内
function renderDom(el, target) {
  target.appendChild(el)
}
export { Element, createElement, renderDom, render, setAttr }

// index.js
import { createElement, render, renderDom } from './element'

let virtualDom = createElement(
  'ul',
  {
    class: 'list',
  },
  [
    createElement(
      'li',
      {
        class: 'item',
      },
      ['周杰伦'],
    ),
    createElement(
      'li',
      {
        class: 'item',
      },
      ['林俊杰'],
    ),
    createElement(
      'li',
      {
        class: 'item',
      },
      ['王力宏'],
    ),
  ],
)
let el = render(virtualDom)
renderDom(el, document.getElementById('root'))
```

## diff

说到 DOM-diff 那一定要清楚其存在的意义，给定任意两棵树，采用**先序深度优先遍历**的算法找到最少的转换步骤
DOM-diff 比较两个虚拟 DOM 的区别，也就是在比较两个对象的区别。
**作用：** 根据两个虚拟对象创建出补丁，描述改变的内容，将这个补丁用来更新 DOM

## 整个 DOM-diff 的过程：

1. 用 JS 对象模拟 DOM（虚拟 DOM）
2. 把此虚拟 DOM 转成真实 DOM 并插入页面中（render）
3. 如果有事件发生修改了虚拟 DOM，比较两棵虚拟 DOM 树的差异，得到差异对象（diff）
4. 把差异对象应用到真正的 DOM 树上（patch）

[https://juejin.cn/post/6844903895467032589](https://juejin.cn/post/6844903895467032589)

## 真实 DOM 和其解析流程

所有的浏览器渲染引擎工作流程大致分为 5 步：创建 DOM 树 —> 创建 Style Rules -> 构建 Render 树 —> 布局 Layout -—> 绘制 Painting。

- 第一步，构建 DOM 树：用 HTML 分析器，分析 HTML 元素，构建一棵 DOM 树；
- 第二步，生成样式表：用 CSS 分析器，分析 CSS 文件和元素上的 inline 样式，生成页面的样式表；
- 第三步，构建 Render 树：将 DOM 树和样式表关联起来，构建一棵 Render 树（Attachment）。每个 DOM 节点都有 attach 方法，接受样式信息，返回一个 render 对象（又名 renderer），这些 render 对象最终会被构建成一棵 Render 树；
- 第四步，确定节点坐标：根据 Render 树结构，为每个 Render 树上的节点确定一个在显示屏上出现的精确坐标；
- 第五步，绘制页面：根据 Render 树和节点显示坐标，然后调用每个节点的 paint 方法，将它们绘制出来。

**注意点：**
**1、DOM 树的构建是文档加载完成开始的？** 构建 DOM 树是一个渐进过程，为达到更好的用户体验，渲染引擎会尽快将内容显示在屏幕上，它不必等到整个 HTML 文档解析完成之后才开始构建 render 树和布局。
**2、Render 树是 DOM 树和 CSS 样式表构建完毕后才开始构建的？** 这三个过程在实际进行的时候并不是完全独立的，而是会有交叉，会一边加载，一边解析，以及一边渲染。
**3、CSS 的解析注意点？**CSS 的解析是从右往左逆向解析的，嵌套标签越多，解析越慢。
**4、JS 操作真实 DOM 的代价？** 用我们传统的开发模式，原生 JS 或 JQ 操作 DOM 时，浏览器会从构建 DOM 树开始从头到尾执行一遍流程。在一次操作中，我需要更新 10 个 DOM 节点，浏览器收到第一个 DOM 请求后并不知道还有 9 次更新操作，因此会马上执行流程，最终执行 10 次。例如，第一次计算完，紧接着下一个 DOM 更新请求，这个节点的坐标值就变了，前一次计算为无用功。计算 DOM 节点坐标值等都是白白浪费的性能。即使计算机硬件一直在迭代更新，操作 DOM 的代价仍旧是昂贵的，频繁操作还是会出现页面卡顿，影响用户体验
