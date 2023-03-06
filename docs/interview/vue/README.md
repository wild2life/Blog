## 初级


## 进阶
### Vue在created和mounted这两个生命周期中请求数据有什么区别呢？
### v-model的原理是什么?
### 说说你对keep-alive的理解
### v-if和v-for的优先级是什么？如果这两个同时出现时，那应该怎么优化才能得到更好的性能？
### 使用v-for遍历对象时，是按什么顺序遍历的？如何保证顺序？
### 按Object.keys()的顺序的遍历，转成数组保证顺序
### 在v-for中使用key，会提升性能吗，为什么？
### key除了在v-for中使用，还有什么作用？
### 使用key要什么要注意的吗？
### 说说组件的命名规范
### 为什么组件中data必须用函数返回一个对象？
对象为引用类型，当重用组件时，由于数据对象都指向同一个data对象，当在一个组件中修改data时，其他重用的组件中的data会同时被修改；而使用返回对象的函数，由于每次返回的都是一个新对象（Object的实例），引用地址不同，则不会出现这个问题。
### Vue父子组件双向绑定的方法有哪些？
- 通过在父组件上自定义一个监听事件<myComponent @diy="handleDiy"></myComponent>,在子组件用this.$emit('diy',data)来触发这个diy事件，其中data为子组件向父组件通信的数据,在父组件中监听diy个事件时，可以通过$event访问data这个值。
- 通过在父组件上用修饰符.sync绑定一个数据<myComponent :show.sync="show"></myComponent>,在子组件用this.$emit('update:show',data)来改变父组件中show的值。
通过v-model。
### 组件的name选项有什么作用？
- 递归组件时，组件调用自身使用；
- 用is特殊特性和component内置组件标签时使用；
- keep-alive内置组件标签中include 和exclude属性中使用。
### 什么是递归组件？举个例子说明下？
递归引用可以理解为组件调用自身，在开发多级菜单组件时就会用到，调用前要先设置组件的name选项， 注意一定要配合v-if使用，避免形成死循环，用element-vue组件库中NavMenu导航菜单组件开发多级菜单为例：
```
<template>
    <el-submenu :index="menu.id" popper-class="layout-sider-submenu" :key="menu.id">
        <template slot="title">
            <Icon :type="menu.icon" v-if="menu.icon"/>
            <span>{{menu.title}}</span>
        </template>
        <template v-for="(child,i) in menu.menus">
            <side-menu-item v-if="Array.isArray(child.menus) && child.menus.length" :menu="child"></side-menu-item>
            <el-menu-item :index="child.id" :key="child.id" v-else>
                <Icon :type="child.icon" v-if="child.icon"/>
                <span>{{child.title}}</span>
            </el-menu-item>
        </template>
    </el-submenu>
</template>
<script>
    export default{
        name: 'sideMenuItem',
        props: {
            menu: {
                type: Object,
                default(){
                    return {};
                }
            }
        }
    }
</script>
```
### 说说你对slot的理解？slot使用场景有哪些？
### 说下$attrs和$listeners的使用场景？
$attrs: 包含了父作用域中（组件标签）不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。
在创建基础组件时候经常使用，可以和组件选项inheritAttrs:false和配合使用在组件内部标签上用v-bind="$attrs"将非prop特性绑定上去；
$listeners: 包含了父作用域中（组件标签）的 (不含.native) v-on 事件监听器。
在组件上监听一些特定的事件，比如focus事件时，如果组件的根元素不是表单元素的，则监听不到，那么可以用v-on="$listeners"绑定到表单元素标签上解决。

### 说说你对provide和inject的理解
### EventBus注册在全局上时，路由切换时会重复触发事件，如何解决呢？
在有使用$on的组件中要在beforeDestroy钩子函数中用$off销毁。
### Vue组件里写的原生addEventListeners监听事件，要手动去销毁吗？为什么？
要，不然会造成多次绑定和内存泄露。关于移除事件监听的坑。
### Vue组件里的定时器要怎么销毁？
如果页面上有很多定时器，可以在data选项中创建一个对象timer，给每个定时器取个名字一一映射在对象timer中，
在beforeDestroy构造函数中for(let k in this.timer){clearInterval(k)}；
如果页面只有单个定时器，可以这么做。
const timer = setInterval(() =>{}, 500);
this.$once('hook:beforeDestroy', () => {
   clearInterval(timer);
})
### Vue中能监听到数组变化的方法有哪些？为什么这些方法能监听到呢？
push()、pop()、shift()、unshift()、splice()、sort()、reverse()，这些方法在Vue中被重新定义了，故可以监听到数组变化；
filter()、concat()、slice()，这些方法会返回一个新数组，也可以监听到数组的变化。


### 在Vue中那些数组变化无法监听，为什么，怎么解决？
利用索引直接设置一个数组项时；
修改数组的长度时。
第一个情况，利用已有索引直接设置一个数组项时Object.defineProperty()是可以监听到，利用不存在的索引直接设置一个数组项时Object.defineProperty()是不可以监听到，但是官方给出的解释是由于JavaScript的限制，Vue不能检测以上数组的变动，其实根本原因是性能问题，性能代价和获得的用户体验收益不成正比。
第二个情况，原因是Object.defineProperty()不能监听到数组的length属性。
用this.$set(this.items, indexOfItem, newValue)或this.items.splice(indexOfItem, 1, newValue)来解决第一种情况；
this.items.splice(newLength)来解决第二种情况。

### 在Vue中那些对象变化无法监听，为什么，怎么解决？
- 对象属性的添加
- 对象属性的删除
因为Vue是通过Object.defineProperty来将对象的key转成getter/setter的形式来追踪变化，但getter/setter只能追踪一个数据是否被修改，无法追踪新增属性和删除属性，所以才会导致上面对象变化无法监听。
- 用this.$set(this.obj,"key","newValue")来解决第一种情况
- 用Object.assign来解决第二种情况。

### 删除对象用delete和Vue.delete有什么区别？
- delete：只是被删除对象成员变为' '或undefined，其他元素键值不变；
- Vue.delete：直接删了对象成员，如果对象是响应式的，确保删除能触发更新视图，这个方法主要用于避开 Vue 不能检测到属性被删除的限制。

### watch和计算属性有什么区别？
- watch：一个数据影响多个数据，当需要在数据变化时执行异步或开销较大的操作时；
- 计算属性：一个数据受多个数据影响。是基于它的响应式依赖进行缓存的，只在相关响应式依赖发生改变时它才会重新求值。

### 计算属性和方法有什么区别？
- 计算属性：是基于它们的响应式依赖进行缓存的，只在相关响应式依赖发生改变时它们才会重新求值。
- 方法：每当触发重新渲染时，调用方法将总会再次执行函数。当我们不希望有缓存，可以使用方法，但是如果求值开销大时建议用计算属性。
### 过渡动画实现的方式有哪些

### 你有写过自定义指令吗？自定义指令的生命周期（钩子函数）有哪些？
### 手写一个自定义指令及写出如何调用
### Vue怎么定义全局方法
1.挂载在Vue的prototype上
```
// base.js
const install = function (Vue, opts) {
    Vue.prototype.demo = function () {
        console.log('我已经在Vue原型链上')
    }
}
export default {
    install
}
```
```
//main.js
//注册全局函数
import base from 'service/base';
Vue.use(base);
```
2.利用全局混入mixin
3.用this.$root.$on绑定方法，用this.$root.$off解绑方法，用this.$root.$emit全局调用
```
this.$root.$on('demo',function(){
    console.log('test');
})
this.$root.$emit('demo')；
this.$root.$off('demo')；
```

### 说说你对DOM选项el、template、render的理解？

### <template></template>有什么用
当做一个不可见的包裹元素，减少不必要的DOM元素，整个结构会更加清晰。
#### Vue怎么改变插入模板的分隔符
用delimiters选项,其默认是["{{", "}}"]
```
// 将分隔符变成ES6模板字符串的风格
new Vue({
  delimiters: ['${', '}']
})
```
### Vue变量名如果以_、$开头的属性会发生什么问题？怎么访问到它们的值？
以 _ 或 $ 开头的属性 不会 被 Vue 实例代理，因为它们可能和 Vue 内置的属性、API 方法冲突，你可以使用例如 vm.$data._property 的方式访问这些属性
### 怎么捕获Vue组件的错误信息？
errorCaptured是组件内部钩子，当捕获一个来自子孙组件的错误时被调用，接收error、vm、info三个参数，return false后可以阻止错误继续向上抛出。
errorHandler为全局钩子，使用Vue.config.errorHandler配置，接收参数与errorCaptured一致，2.6后可捕捉v-on与promise链的错误，可用于统一错误处理与错误兜底。

### Vue.observable
让一个对象可响应。可以作为最小化的跨组件状态存储器。
### Vue项目中如何配置favicon？
静态配置 <link rel="icon" href="<%= BASE_URL %>favicon.ico">,
其中<%= BASE_URL %>等同vue.config.js中publicPath的配置;
动态配置<link rel="icon" type="image/png" href="">

```
import browserImg from 'images/kong.png';//为favicon的默认图片
const imgurl ='后端传回来的favicon.ico的线上地址'
let link = document.querySelector('link[type="image/png"]');
if (imgurl) {
    link.setAttribute('href', imgurl);
} else {
    link.setAttribute('href', browserImg);
}
```
### 怎么修改Vue项目打包后生成文件
在Vue CLI2中修改config/index.js文件中的build.assetsPublicPath的值；
在Vue CLI3中配置publicPath的值。
### 怎么解决Vue项目打包后静态资源图片失效的问题？
在项目中一般通过配置alias路径别名的方式解决,下面是Vue CLI3的配置。
```
configureWebpack: {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            'assets': resolve('src/assets'),
            'css': resolve('src/assets/css'),
            'images': resolve('src/assets/images'),
        }
    },
}
```
### 怎么解决Vue中动态设置img的src不生效的问题？
因为动态添加src被当做静态资源处理了，没有进行编译，所以要加上require。
```javascript
<template>
    <img class="logo" :src="logo" alt="公司logo">
</template>
<script>
export default {
    data() {
        return {
            logo:require("assets/images/logo.png"),
        };
    }
};
</script>
```
### 在Vue项目中如何引入第三方库（比如jQuery）？有哪些方法可以做到、
### 在vue中如果引用一个js文件 
index,html script直接引用

## 高级
### 说说你对SPA单页面的理解，它的优缺点分别是什么？
优点：服务器压力小 响应速度快
缺点：SEO， 难以进行搜索引擎优化
首屏打开速度很慢（因为要一次性加载多种依赖和包）

### SPA单页面的实现方式有哪些？
- 在hash模式中，在window上监听hashchange事件（地址栏中hash变化触发）驱动界面变化；
- 在history模式中，在window上监听popstate事件（浏览器的前进或后退按钮的点击触发）驱动界面变化，监听a链接点击事件用history.pushState、history.replaceState方法驱动界面变化；
- 直接在界面用显示隐藏事件驱动界面变化。
### 说说你对MVC、MVP、MVVM模式的理解
modal view controller 
用户操作View，View发送指令到Control，完成业务逻辑处理后，要求Model处理相应的数据，将处理好的数据发送到View，要求View把这些数据展示给用户。
缺点：Model、Control、View三者相互依赖，修改起来要兼顾其他两者，还是非常困难。

Presenter [prɪˈzentə(r)] 主持人
当用户操作View，View发送指令到Presenter,完成业务逻辑处理后，要求Model处理相应的数据，将处理好的数据返回到Presenter中，Presenter将数据发送到View中，要求View把这些数据展示给用户
MVP模式中，Presenter将View和Model完全隔离开，Presenter和View相互依赖，Presenter和Model相互依赖，优点：View和Model不再相互依赖，使代码耦合降低。
缺点：因为Presenter和View相互依赖，这样Presenter就没办法单独做单元测试，非得等到View做好以后才行。所以对View分割一部分叫做View接口，Presenter只依赖View接口，这样Presenter不用依赖View就可以测试了，并且也增加了复用性，只要View实现了View接口部分，Presenter就可以大发神威。
然而在MVP模式中，因为让Presenter发送数据到View,让View展示，仍然需要大量的、烦人的代码，这实在是一件不舒服的事情。 那么可不可以让View在Model变化时自动更新。

所以出现了MVVM模式来实现这个设想，其中**VM代表ViewModel负责视图显示逻辑和监听视图变化**，M代表Model变成处理业务逻辑和数据。
当用户操作View时，ViewModel监听到View的变化，会通知Model中对应的方法进行业务逻辑和数据处理，处理完毕后，ViewModel会监听到自动让View做出相应的更新。ViewModel可以对应多个View,具有很强的复用性。
在Vue项目中。new Vue()就是一个ViewModel，View就是template模板。Model就是Vue的选项如data、methods等。在开发过程我们只关注View怎么展示，Model怎么处理业务逻辑和数据。不要去管处理业务逻辑和数据后怎么让View更新，View上有操作，怎么让Model处理这个操作，这些通通交给**ViewModel**来实现，大大降低了开发成本。
### 说说你对Object.defineProperty的理解
### Vue的模板语法用的是哪个web模板引擎的吗？说说你对这模板引擎的理解
采用的是Mustache的web模板引擎[mustache.js](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fjanl%2Fmustache.js%2Fblob%2Fmaster%2Fmustache.js)   [məˈstɑːʃ]
```javascript
<script type="text/javascript" src="./mustache.js"></script> <script type="text/javascript">
var data = { "company": "Apple", } var tpl = '<h1>Hello {{company}}</h1>'; 
var html = Mustache.render(tpl, data); 
console.log(html);
</script>
```
### 你认为Vue的核心是什么？
### 说说你对单向数据流和双向数据流的理解
### 什么是双向绑定？原理是什么？
### 什么是虚拟DOM？Vue中如何实现一个虚拟DOM？说说你的思路
[bar - four](./VDOM.md)
### 你了解Vue的diff算法吗？
### 你知道nextTick的原理吗？
### Vue的template编译的理解
### Vue实例挂载的过程是什么？
### 说下你对指令的理解？
### Vue为什么要求组件模板只能有一个根元素？
当前的virtualDOM差异和diff算法在很大程度上依赖于每个子组件总是只有一个根元素
### 你有用过事件总线(EventBus)吗？说说你的理解
### 使用Vue后怎么针对搜索引擎做SEO优化？
### SSR解决了什么问题（服务器端渲染）？有做过SSR吗？你是怎么做的
解决首屏渲染过长的问题
更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。
### axios是什么？怎样使用它？怎么解决跨域的问题？
axios 是一个基于 promise 的 HTTP 库，先封装在使用。

使用proxyTable配置解决跨域问题。
```
dev:{
    proxyTable: {
        '/api': {
            target: 'http://172.16.13.205:9011', // 设置你调用的接口域名和端口号
            secure: false,
            changeOrigin: true,// 跨域
            pathRewrite: {
                '^/api': '' // 去掉标志
            }
        }
    },
}
```
### ajax、fetch、axios这三都有什么区别？
### 为何官方推荐使用axios而不用vue-resource？
### 你有封装过axios吗？主要是封装哪方面的？
### Vue开发过程你是怎么做接口管理的？
### 如何中断axios的请求？
### 如果将axios异步请求同步化处理？
### 你了解axios的原理吗？有看过它的源码吗？
### 说说你对Vue组件的设计原则的理解
### 写出多种定义组件模板的方法
### 你有使用过render函数吗？有什么好处？
### 你了解什么是函数式组件吗？
### 你有使用过JSX吗？说说你对JSX的理解？
JSX就是Javascript和XML结合的一种格式。React发明了JSX，利用HTML语法来创建虚拟DOM。当遇到<，JSX就当HTML解析，遇到{就当JavaScript解析。
### 如果想扩展某个现有的Vue组件时，怎么做呢？
### 你了解什么是高阶组件吗？可否举个例子说明下？
### 怎么在Vue中使用插件？
### 组件和插件有什么区别？
### 为什么Vue使用异步更新组件？
### 你有看过Vue推荐的风格指南吗？列举出你知道的几条
### 如何优化首页的加载速度？
### Vue渲染大量数据时应该怎么优化？说下你的思路！
### 你有使用过babel-polyfill模块吗？主要是用来做什么的？
 Babel默认只转换新的JavaScript语法（syntax），如箭头函数等，而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码；因此我们需要polyfill；
[https://www.cnblogs.com/Jeely/p/11231530.html](https://www.cnblogs.com/Jeely/p/11231530.html)
### 为什么我们写组件的时候可以写在.vue里呢？可以是别的文件名后缀吗？
### vue-loader是什么？它有什么作用
vue-loader是一个webpack的loader，是一个模块转换器，用于把模块原内容按照需求转换成新内容。
它允许你以一种名为单文件组件 (SFCs)的格式撰写 Vue 组件。可以解析和转换 .vue 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，再分别把它们交给对应的loader去处理。

### 分析下Vue项目本地开发完成后部署到服务器后报404是什么原因呢？
### Vue首页白屏是什么问题引起的？如何解决呢？
### vue打包成最终的文件有哪些？
### 如何解决vue打包vendor过大的问题？
### vue部署上线前需要做哪些准备工作？
### 说说你觉得认为的Vue开发规范有哪些


### webpack打包vue速度太慢怎么办？
"打包慢"，是一个综合的因素，和vue关系不大。
1. loader范围缩小到src项目文件！一些不必要的loader能关就关了吧 include
2. happypack多进程进行 webpack4
3. eslint代码校验其实是一个很费时间的一个步奏。 ：可以把eslint的范围缩小到src,且只检查*.js 和 *.vue ：生产环境不开启lint，使用pre-commit或者husky在提交前校验
4. DllReferencePlugin 如果项目上了 webpack 4，再使用 dll 收益并不大。我拿实际项目的代码试了一下，加入 dll 可能会有 1-2 s 的速度提升，对于整体打包时间可以说可以忽略不计
| DLL | 缓存 |
| --- | --- |
| 1.把公共代码打包为 DLL 文件存到硬盘里 | 1.把常用文件存到硬盘/内存里 |
| 2.第二次打包时动态链接 DLL 文件，不重新打包 | 2.第二次加载时直接读取缓存，不重新请求 |
| 3.打包时间缩短 | 3.加载时间缩短 |

AutoDllPlugin
HardSourceWebpackPlugin 直接引入plugin中使用即可 性能yyds

### 你有使用过Vue开发多语言项目吗？说说你的做法？
### 用vue怎么实现一个换肤的功能？
### 对于即将到来的vue3.0特性你有什么了解的吗？
### 说说你对Proxy的理解
### Object.defineProperty和Proxy的区别
<!-- ### [初级](./初级.md)
### [进阶](./进阶.md)
### [高级](./高级.md) -->
