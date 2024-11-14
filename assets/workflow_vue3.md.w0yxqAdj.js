import{_ as e,c as l,o as t,a8 as a}from"./chunks/framework.Cpm-ryT4.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"workflow/vue3.md","filePath":"workflow/vue3.md","lastUpdated":1678680316000}'),r={name:"workflow/vue3.md"},i=a('<p><a href="https://cn.vuejs.org/api/" target="_blank" rel="noreferrer">API</a></p><p><a href="https://juejin.cn/post/7164159759619194893" target="_blank" rel="noreferrer">掘金</a></p><ul><li>全局 API —— 全局会用到的 API</li><li>组合式 API —— vue3 所拥有的组合式 API</li><li>选项式 API —— vue2 所拥有的选项式 API</li><li>内置内容 —— 指令、组件、特殊元素和特殊属性</li><li>单文件组件 —— 语法定义、</li><li>进阶 API —— 渲染函数、服务端渲染、TS 工具类型和自定义渲染</li></ul><h2 id="项目中遇到的问题" tabindex="-1">项目中遇到的问题 <a class="header-anchor" href="#项目中遇到的问题" aria-label="Permalink to &quot;项目中遇到的问题&quot;">​</a></h2><h3 id="element-plus-el-input-无法输入问题" tabindex="-1">element plus el-input 无法输入问题 <a class="header-anchor" href="#element-plus-el-input-无法输入问题" aria-label="Permalink to &quot;element plus el-input 无法输入问题&quot;">​</a></h3><ul><li>ref 和 v-model 的值冲突了。</li><li>element plus 官方文档 el-form 用的是:model,很容易 el-input 就跟着写:model, 应该用 v-model</li></ul><h3 id="某些页面路由跳转失败" tabindex="-1">某些页面路由跳转失败 <a class="header-anchor" href="#某些页面路由跳转失败" aria-label="Permalink to &quot;某些页面路由跳转失败&quot;">​</a></h3><ul><li>该页面没有用 template 包裹</li></ul>',8),o=[i];function n(s,u,p,_,d,c){return t(),l("div",null,o)}const f=e(r,[["render",n]]);export{m as __pageData,f as default};