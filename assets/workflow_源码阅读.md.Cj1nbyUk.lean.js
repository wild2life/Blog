import{_ as n,c as a,a6 as p,o as e}from"./chunks/framework.C_m7SF9B.js";const u=JSON.parse('{"title":"源码目录结构","description":"","frontmatter":{},"headers":[],"relativePath":"workflow/源码阅读.md","filePath":"workflow/源码阅读.md","lastUpdated":1679303921000}'),l={name:"workflow/源码阅读.md"};function r(i,s,c,t,o,b){return e(),a("div",null,s[0]||(s[0]=[p(`<ol><li>下载源码</li></ol><p>git clone <a href="https://github.com/vuejs/vue.git" target="_blank" rel="noreferrer">https://github.com/vuejs/vue.git</a> 或者<a href="https://github.com/vuejs/vue/tree/dev" target="_blank" rel="noreferrer">zip</a></p><ol start="2"><li><p>npm i</p></li><li><p>在 package.json -&gt; scripts 中的 dev 命令中添加 --sourcemap，这样就可以在浏览器中调试源码时查看当前代码在源码中的位置。</p></li></ol><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;scripts&quot;: {</span></span>
<span class="line"><span>    &quot;dev&quot;: &quot;rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>4.npm run dev <img src="https://cdn.nlark.com/yuque/0/2021/png/292785/1635496174575-0b6ff95c-605d-4157-9d2c-42f5cd1771bf.png#clientId=u22b003c3-5731-4&amp;from=paste&amp;height=182&amp;id=bHX2k&amp;name=image.png&amp;originHeight=182&amp;originWidth=727&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=25838&amp;status=done&amp;style=none&amp;taskId=ua303496f-035d-4fdf-be69-c17abaa93a3&amp;title=&amp;width=727" alt="image.png"></p><h1 id="源码目录结构" tabindex="-1">源码目录结构 <a class="header-anchor" href="#源码目录结构" aria-label="Permalink to &quot;源码目录结构&quot;">​</a></h1><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>├── benchmarks                  性能、基准测试</span></span>
<span class="line"><span>├── dist                        构建打包的输出目录</span></span>
<span class="line"><span>├── examples                    案例目录</span></span>
<span class="line"><span>├── flow                        flow 语法的类型声明</span></span>
<span class="line"><span>├── packages                    一些额外的包，比如：负责服务端渲染的包 vue-server-renderer、配合 vue-loader 使用的的 vue-template-compiler，还有 weex 相关的</span></span>
<span class="line"><span>│   ├── vue-server-renderer</span></span>
<span class="line"><span>│   ├── vue-template-compiler</span></span>
<span class="line"><span>│   ├── weex-template-compiler</span></span>
<span class="line"><span>│   └── weex-vue-framework</span></span>
<span class="line"><span>├── scripts                     所有的配置文件的存放位置，比如 rollup 的配置文件</span></span>
<span class="line"><span>├── src                         vue 源码目录</span></span>
<span class="line"><span>│   ├── compiler                编译器</span></span>
<span class="line"><span>│   ├── core                    运行时的核心包</span></span>
<span class="line"><span>│   │   ├── components          全局组件，比如 keep-alive</span></span>
<span class="line"><span>│   │   ├── config.js           一些默认配置项</span></span>
<span class="line"><span>│   │   ├── global-api          全局 API，比如熟悉的：Vue.use()、Vue.component() 等</span></span>
<span class="line"><span>│   │   ├── instance            Vue 实例相关的，比如 Vue 构造函数就在这个目录下</span></span>
<span class="line"><span>│   │   ├── observer            响应式原理</span></span>
<span class="line"><span>│   │   ├── util                工具方法</span></span>
<span class="line"><span>│   │   └── vdom                虚拟 DOM 相关，比如熟悉的 patch 算法就在这儿</span></span>
<span class="line"><span>│   ├── platforms               平台相关的编译器代码</span></span>
<span class="line"><span>│   │   ├── web</span></span>
<span class="line"><span>│   │   └── weex</span></span>
<span class="line"><span>│   ├── server                  服务端渲染相关</span></span>
<span class="line"><span>├── test                        测试目录</span></span>
<span class="line"><span>├── types                       TS 类型声明</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div>`,7)]))}const d=n(l,[["render",r]]);export{u as __pageData,d as default};
