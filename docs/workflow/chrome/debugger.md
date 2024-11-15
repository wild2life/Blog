[developers](https://developers.google.com/web/tools/chrome-devtools/?hl=zh-cn)
Open Chrome DevTools
Ctrl+Shift+I (Windows) 或 Cmd+Opt+I (Mac)

## console.log({})

在使用 console.log();的时候，不仅仅打印变量，而是要打印对象，用大括号({})将变量包围起来。这样的优点是不仅会把变量的值打印，同时还会将变量名打印出来。
![](https://cdn.nlark.com/yuque/0/2020/png/292785/1607917242655-d693f0ce-9779-4d02-a987-e9cb03d67fe0.png#height=330&id=sCa6T&originHeight=330&originWidth=1014&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=1014)

## console.table

使用 console.table 来打印多条目数据
![](https://cdn.nlark.com/yuque/0/2020/png/292785/1607917242720-dc89e7ca-69de-49e8-b794-dcb951ef005f.png#height=646&id=LcsTU&originHeight=646&originWidth=2558&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=2558)

## $0

如果你想引用某个 DOM 元素，使用$0。$0 指向你当前在 Element 中选中的元素。如果指定了$0，$1 指向之前选中的元素。以此类推，直到$4 都可以使用。

## getEventListeners()

getEventListeners(domElement) 返回在 DOM 元素上注册的所有的事件。请看下面的例子：

![](https://cdn.nlark.com/yuque/0/2020/gif/292785/1607917242792-c89d12be-4541-49cd-a655-ee863c53459e.gif#height=391&id=YKrRQ&originHeight=391&originWidth=673&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=673)

## 复制 JavaScript 变量 copy(obj)

copy(anything) 是一个很有用的工具函数方便你将任何东西拷贝到系统的粘贴板暂存。
给 copy 函数传入一个没有格式的 JSON，会返回格式化的结果：
![](https://cdn.nlark.com/yuque/0/2020/gif/292785/1607917242933-36947c55-06d1-4263-912f-eebc5b34b9f7.gif#height=705&id=GNcOh&originHeight=705&originWidth=1213&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=1213)

## 暂停 UI 在 Hover 状态下的展示结果

我们很难去检查一个只有在 Hover 状态下展示的元素。比如，如何去检查一个 tooltip？如果你右键并选择检查，元素已经消失了。那么有办法吗？
(1)打开 sources 面板
(2)显示 tooltip
(3)使用快捷键来暂停脚本执行(将鼠标停留在暂停的图标上查看快捷键)
(4)回到 Elements 面板，然后像通常一样去检查元素
![](https://cdn.nlark.com/yuque/0/2020/gif/292785/1607917244001-126ce8ca-0ac6-4000-9f25-d8b5c487fc51.gif#height=566&id=CmVgd&originHeight=566&originWidth=1056&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=1056)

## breakPoint

[使用断点暂停代码](https://developers.google.com/web/tools/chrome-devtools/javascript/breakpoints?hl=zh-cn)

## **$i**直接在控制台安装 npm 包

[Console Importer](https://link.juejin.cn/?target=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fconsole-importer%2Fhgajpakhafplebkdljleajgbpdmplhie%2Frelated) 就是这么一个插件，用来在控制台直接安装**npm**包。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/292785/1654571103353-aece2262-4836-4a81-a426-c966cd117a0e.png#clientId=uc14f4d5d-c842-4&from=paste&height=719&id=u280ff3ae&name=image.png&originHeight=719&originWidth=1304&originalType=binary&ratio=1&rotation=0&showTitle=false&size=256843&status=done&style=none&taskId=u22880a3b-1f8b-4fe2-88e3-0b06f4d8360&title=&width=1304)

## 快速切换主题

1. **cmd + shift + p** 执行**Command**命令
2. 输入**Switch to dark theme**或者**Switch to light theme**进行主题切换

## **$\_**控制台引用上一次执行的结果

使用**$\_**引用上一次操作的结果，不用每次都复制一遍

```
// 第1步'fatfish'.split('') // ['f', 'a', 't', 'f', 'i', 's', 'h']
// 第2步 $_.reverse() // ['h', 's', 'i', 'f', 't', 'a', 'f']
// 第3步 $_.join('') // hsiftaf
```

## 截取一张全屏的网页

1. 准备好需要截屏的内容
2. **cmd + shift + p** 执行**Command**命令
3. 输入**Capture full size screenshot** 按下回车

## 在控制台快速发起请求

还是联调或修 BUG 的场景，针对同样的请求，有时候需要**修改入参**重新发起，有啥快捷方式？

1. 选中**Network**
2. 点击**Fetch/XHR**
3. 选择**Copy as fetch**
4. 控制台粘贴代码
5. 修改参数，回车搞定

## 一键重新发起请求

在与后端接口联调或排查线上 BUG 时，你是不是也经常听到他们说这句话：**你再发起一次请求试试，我这边看下为啥出错了！**
重发请求，这有一种简单到发指的方式

1. 选中**Network**
2. 点击**Fetch/XHR**
3. 选择要重新发送的请求
4. 右键选择**Replay XHR**
