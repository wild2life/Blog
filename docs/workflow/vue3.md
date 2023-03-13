[API](https://cn.vuejs.org/api/)

[掘金](https://juejin.cn/post/7164159759619194893)

- 全局 API —— 全局会用到的 API
- 组合式 API —— vue3 所拥有的组合式 API
- 选项式 API —— vue2 所拥有的选项式 API
- 内置内容 —— 指令、组件、特殊元素和特殊属性
- 单文件组件 —— 语法定义、
- 进阶 API —— 渲染函数、服务端渲染、TS 工具类型和自定义渲染

## 项目中遇到的问题

### element plus el-input 无法输入问题

- ref 和 v-model 的值冲突了。
- element plus 官方文档 el-form 用的是:model,很容易 el-input 就跟着写:model, 应该用 v-model

### 某些页面路由跳转失败

- 该页面没有用 template 包裹
