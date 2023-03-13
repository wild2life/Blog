## 新建项目

### 建立目录

### 初始化 git

在 npm 项目根目录运行终端命令：

```
git init .
```

### 编写 package.json

```
npm init --yes
```

**package.json 重点字段说明：**
name 即 npm 项目包名，发布到 npm 时就是取的这个 name 名，你自己取个语义化的名字，和已有的 npm 库不能重复；
version 版本号，更新 npm 包时必须修改一个更高的版本号后才能成功发布到 npm，版本号最好遵循 npm 版本管理规范；
description 包的描述，发布到 npm 后你搜索该 npm 包时，在搜索联想列表里会显示在包名的下方，作为描述说明；
main 入口文件路径，在你通过 import 或 require 引用该 npm 包时就是引入的该路径的文件；

### 添加 LICENSE

LICENSE 即开源协议文件，这里使用 MIT 协议类型。

```
MIT License

Copyright (c) 2020 zhangfuling

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- Copyright © 2020 zhangfuling 这一行，2020 是年份，自行修改为当前年份，zhangfuling 是作者姓名，改成你自己的。
- package.json 里修改 license 字段值为 MIT

### 配置 npm 上传白名单

配置 npm 上传的文件白名单，可以指定哪些文件上传哪些不上传，
比如我这里不想直接发布 src 里的 index.js 源码，而是发布 dist 目录下的 index.min.js（index.js 压缩后的文件），按以下配置：
在 package.json 里，修改 main 字段的路径指向 dist/index.min.js：

```
"main": "dist/index.min.js"
```

添加 files 字段来配置要上传 npm 的文件白名单目录：

```
"files": [
  "dist"
]
```

这样 dist 文件夹会上传 npm，而 src 文件夹就不会上传，想保存 src 源码就上传项目到 git 远程仓库就行，这样 git 仓库保存了完整项目，而 npm 只包含部分项目文件。
有些文件是必定会上传的，无法控制，例如 package.json、LICENSE、README.md 等等。
当然了，也可以配置 npm 上传黑名单，通过.npmignore 配置，具体不再赘述。

### 关联 github 地址

如果想把 npm 包和项目 github 地址关联起来，首先项目需要先上传到 github 上，然后 package.json 添加 repository 字段

```
"repository": {
  "type": "git",
  "url": "git://github.com/neohan666/wxmp-rsa.git"
}
```

- url 后的地址格式，就是项目 git 上的 https 完整地址把 https 换成 git
- 关联并发布 npm 后，在 npm 官网的该 npm 包页面右边会显示有 github 链接，点击可以跳转到 github 项目地址。

### 完整 package.json 内容和项目目录

```
{
  "name": "wxmp-rsa",
  "version": "1.0.0",
  "description": "兼容微信小程序的rsa加解密库，支持超长文本和中文字符",
  "author": "neohan",
  "main": "dist/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["wxmp", "rsa", "jsencrypt", "js", "long"],
  "license": "MIT",
  "files": [
    "dist"
  ],
  "repository": {
    "type": "git",
    "url": "git://github.com/xxx/xxxx.git"
  }
}
```

![image.png](https://cdn.nlark.com/yuque/0/2022/png/292785/1654762576220-ebfb1f80-d712-40a0-b72d-bfd8ba615d11.png#clientId=ue306e734-9531-4&from=paste&height=199&id=u6053376a&name=image.png&originHeight=199&originWidth=191&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10479&status=done&style=none&taskId=ub635b870-6084-429d-a098-02326c571b2&title=&width=191)

## 发布 npm

### npm 注册登录

- 先去 npm 官网注册账号：https://www.npmjs.com/，或者通过终端命令注册： npm adduser
- 终端命令，登录 npm 账号 npm login

### 调试 npm

如果不需要调试，可以跳过调试步骤，直接发布。
npm 项目根目录运行终端命令：

```
npm link
```

运行后即将该 npm 包放进了本地 npm 缓存里，
如果要在其他项目（例如项目名叫 aaa）里引用调试，只需要在在 aaa 里运行命令：

```
npm link 包名
```

这样就在 aaa 里建立了包名到 npm 包的链接关联，通过常规方式引入就可以测试 npm 包了。
如果要取消项目 aaa 与 npm 包的关联，在 aaa 项目下运行命令：

```
npm unlink 包名
```

为了防止本地调试 npm 与发布后的 npm 混淆冲突，在调试完成后一定记得手动取消项目关联。

### 发布

在 npm 包项目根目录运行命令：

```
npm publish
```

运行完后，稍等片刻，在 npm 官网就可以搜索到发布的该 npm 包了。

- 因为很多人把 npm 源都切到了淘宝源，毕竟速度快，但是发布 npm 前需要先恢复到 npm 官方源上，否则发布失败，切换命令：

```
// 配置npm全局使用淘宝镜像源
npm config set registry https://registry.npm.taobao.org
// 配置npm全局恢复官方镜像源
npm config set registry https://registry.npmjs.org
```

或者呢，在项目根目录新建.npmrc 文件，写入以下内容即可：

```
registry=https://registry.npmjs.org
```

这样，在此项目下运行 npm 命令时，默认使用的仓库都是配置官方源，不影响其他项目。
如果要发布一个 beta 包，运行命令：

```
npm publish --tag beta
```

- 其实就是发布了一个标签，标签名可以自定义，例如 alpha next。

### 成员权限

发布 npm 是用自己的账号发布的，默认只有自己能更新包，如果想要给其他人更新 npm 包的权限，按以下方式：
打开 npm 包所在页面，点击右方 settings 栏，然后在 Invite maintainer 模块，输入要加入权限的 npm 账号的 username，然后点击 invite 就加入，下方 Maintainers 就是有权限的 npm 项目成员列表。

### 作废和删除

（1）作废 npm 包，就是这里的 Deprecate package，就是给 npm 包打上已作废的标签，表示不再更新维护。

在 npm 包页面展示（示例：@babel/polyfill）以及 npm i 下载时会有提示。

也可以通过命令行操作：`npm deprecate <package-name> "<message>"`
（2）**删除已发布的包**，这是非常危险的行为，除非你确定这个包没有其他人使用。
npm 官网的删除政策这几年一直在变，我记得之前是不允许删除，现在又可以了，但有一些限制，需满足以下几点才能删除：

- 没有其他 npm 包依赖此包
- 上一周的 npm 下载量不超过 300
- npm 包成员只存在一个拥有者或管理员
  具体可以查看 npm 官网政策

## 注意点

- 发布到 npm 上就意味着代码的开源，如果是有公司业务相关的代码就不建议发到 npm 上，最好是公司自建一个私有仓库来使用。
- npm 淘宝源是每隔十分钟和 npm 官方源同步一次，所以刚发布 npm 后可能要等几分钟后淘宝源才会更新，如果发布后就立马切换回淘宝源再更新包可能更的还是老版本。
