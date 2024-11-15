---
description: 记录开发中的一些常用方法：环境判断、验证 url 是否有效、提取身份证信息
---

# 常用代码片段

> 收集开发中的一些常用代码片段

## 环境判断

```js
const UA = window.navigator.userAgent.toLowerCase()

// Android
const isAndroid = /android/.test(UA)

// IOS
const isIOS = /iphone|ipad|ipod|ios/.test(UA)

// 浏览器环境
const inBrowser = typeof window !== 'undefined'

// IE
const isIE = /msie|trident/.test(UA)

// Edge
const isEdge = UA.indexOf('edge/') > 0

// Chrome
const isChrome = /chrome\/\d+/.test(UA) && !isEdge

// 微信
const isWeChat = /micromessenger/.test(UA)

// 移动端
const isMobile = 'ontouchstart' in window
```

## 主题切换

根据用户的主题首选项（`light`、`dark` 或 `system`）切换主题

```js
;(() => {
  try {
    const rootElement = document.documentElement
    const classList = rootElement.classList
    const userTheme = localStorage.getItem('theme')

    // 移除 'light' 和 'dark' class，确保没有重复的主题类
    classList.remove('light', 'dark')

    // 判断用户的主题首选项
    if (userTheme === 'system' || !userTheme) {
      // 判断用户的系统主题首选项是否为 dark
      const systemDarkQuery = '(prefers-color-scheme: dark)'
      const systemMatchMedia = window.matchMedia(systemDarkQuery)
      const isSystemDark = systemMatchMedia.media !== systemDarkQuery || systemMatchMedia.matches

      // 根据系统主题设置添加对应的 class 和 document 的颜色模式
      if (isSystemDark) {
        classList.add('dark')
        rootElement.style.colorScheme = 'dark'
      } else {
        classList.add('light')
        rootElement.style.colorScheme = 'light'
      }
    } else {
      // 如果用户设置了具体的主题首选项（'light' 或 'dark'），则添加对应的 class 和 document 的颜色模式
      classList.add(userTheme)
      rootElement.style.colorScheme = userTheme
    }
  } catch (e) {}
})()
```

## 验证 `url` 是否有效

```js
function isUrl(string) {
  if (typeof string !== 'string') {
    return false
  }
  try {
    new URL(string)
    return true
  } catch (err) {
    return false
  }
}

isUrl('maomao') // false

isUrl('https://github.com/maomao1996') // true
isUrl('https://a.b.c') // true
```

::: warning 注意
该技巧只适用于一些验证不严格的场景，[严格场景下可以使用这个 npm 包 —— is-url](https://github.com/segmentio/is-url)
:::

## 金额格式化（保留两位小数）

```js
function formatNumber(value) {
  const num = parseFloat(value)

  if (isNaN(num)) {
    return 'Invalid number'
  }

  const [integer, decimal] = num.toFixed(2).split('.')
  return `${integer.replace(/\B(?=(\d{3})+\b)/g, ',')}.${decimal}`
}

formatNumber(0) // '0.00'
formatNumber(12) // '12.00'
formatNumber(123.4) // '123.40'
formatNumber(12345.6789) // '12,345.68'
```

## 微信 `api promise` 化

```js
function promisify(fn) {
  return function (options) {
    return new Promise((resolve, reject) => {
      fn(
        Object.assign({}, options, {
          success: resolve,
          fail: reject,
        }),
      )
    })
  }
}

// 例 获取系统信息
promisify(wx.getSystemInfo)
  .then((res) => {
    console.log('success', res)
  })
  .catch((err) => {
    console.log('fail', err)
  })
```

## 提取身份证信息

- #### 参数

  - **idCard:** 身份证号码
  - **separator:** 出生年月日的分割字符，默认为 `/`

- #### 返回值

  - **age:** 年龄（实岁）
  - **birthday:** 出生年月日
  - **gender:** 性别（0 女 1 男）

```js
function getIdCardInfo(idCard, separator = '/') {
  if (
    !/^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/.test(
      idCard,
    )
  ) {
    throw Error(`${idCard}不是一个身份证号码`)
  }
  // 提取 idCard 中的字符
  const idSubstr = (s, e) => idCard.substr(s, e)
  // 拼接日期
  const splice = (d) => d.join(separator)
  // 获取出生年月日 性别（0 女 1 男）
  let birthday, gender
  if (idCard.length === 18) {
    birthday = splice([idSubstr(6, 4), idSubstr(10, 2), idSubstr(12, 2)])
    gender = idSubstr(-2, 1) & 1
  } else {
    birthday = splice(idSubstr(6, 2), idSubstr(8, 2), idSubstr(10, 2))
    gender = idSubstr(-1, 1) & 1
  }
  // 获取年龄（实岁）
  const birthDate = new Date(birthday)
  const newDate = new Date()
  const year = newDate.getFullYear()
  let age = year - birthDate.getFullYear()
  if (newDate < new Date(splice([year, birthday.substring(5)]))) {
    age--
  }
  return {
    age,
    birthday,
    gender,
  }
}
```

## 复制到剪切板

```js
export function copyTextToClipboard(text, el) {
  const textArea = document.createElement('textarea')
  textArea.style.top = 0
  textArea.style.left = 0
  textArea.style.width = '0px'
  textArea.style.height = '2em'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'
  textArea.value = text
  if (el) {
    el.appendChild(textArea)
  } else {
    document.body.appendChild(textArea)
  }
  textArea.select()
  try {
    document.execCommand('copy')
    Message({
      type: 'success',
      dangerouslyUseHTMLString: true,
      message: `<div style="margin-bottom: 10px">复制成功</div><div>复制内容: ${text || '-'}</div>`,
    })
  } catch (err) {
    Message({
      type: 'error',
      message: '复制失败',
    })
  }
  if (el) {
    el.removeChild(textArea)
  } else {
    document.body.removeChild(textArea)
  }
}
```

## 获取当前系统

````javascript
function buildRules(ruleTuples) {
        return ruleTuples.map(function(tuple) {
            return {
                name: tuple[0],
                rule: tuple[1]
            };
        });
    }
function getOperatingSystemRules() {
        return buildRules([
            [ 'iOS', /iP(hone|od|ad)/ ],
            [ 'Android OS', /Android/ ],
            [ 'BlackBerry OS', /BlackBerry|BB10/ ],
            [ 'Windows Mobile', /IEMobile/ ],
            [ 'Amazon OS', /Kindle/ ],
            [ 'Windows 3.11', /Win16/ ],
            [ 'Windows 95', /(Windows 95)|(Win95)|(Windows_95)/ ],
            [ 'Windows 98', /(Windows 98)|(Win98)/ ],
            [ 'Windows 2000', /(Windows NT 5.0)|(Windows 2000)/ ],
            [ 'Windows XP', /(Windows NT 5.1)|(Windows XP)/ ],
            [ 'Windows Server 2003', /(Windows NT 5.2)/ ],
            [ 'Windows Vista', /(Windows NT 6.0)/ ],
            [ 'Windows 7', /(Windows NT 6.1)/ ],
            [ 'Windows 8', /(Windows NT 6.2)/ ],
            [ 'Windows 8.1', /(Windows NT 6.3)/ ],
            [ 'Windows 10', /(Windows NT 10.0)/ ],
            [ 'Windows ME', /Windows ME/ ],
            [ 'Open BSD', /OpenBSD/ ],
            [ 'Sun OS', /SunOS/ ],
            [ 'Linux', /(Linux)|(X11)/ ],
            [ 'Mac OS', /(Mac_PowerPC)|(Macintosh)/ ],
            [ 'QNX', /QNX/ ],
            [ 'BeOS', /BeOS/ ],
            [ 'OS/2', /OS\/2/ ],
            [ 'Search Bot', /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/ ]
        ]);
    }
function detectOS(userAgentString) {
        var rules = getOperatingSystemRules();
        var detected = rules.filter(function (os) {
            return os.rule && os.rule.test(userAgentString);
        })[0];
        return detected ? detected.name : null;
    }
    ```
    detectOS(navigator.userAgent)
````

## toBoolean

```javascript
function toBoolean(str) {
  return str === 'Y' || str === 'true' || str === true
}
```

## 过滤数组中为 false 的项

```javascript
;['a', '', 'b'].filter(Boolean) // ["a","b"]
```

## 表单校验

```javascript
export function validatePhoneNumber(phoneNumber) {
  /**
   * 由于运营商开放手机号段较快 170 178等，所以不做精准验证
   */
  const reg = /^1(3|4|5|7|8)[0-9]\d{8}$/g
  return reg.test(phoneNumber)
}
export function validateEmail(email) {
  /**
   * W3C standard regular expression
   * reference:
   *   https://www.w3.org/TR/html/sec-forms.html#email-state-typeemail
   *   http://emailregex.com/
   */
  /* eslint-disable max-len */
  const reg =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g
  return reg.test(email)
}
```

## mayNull

```javascript
export function mayNull(str = '') {
  if (str == null || (str.trim && str.trim() === '')) {
    return '-'
  }
  return str
}
```

## date diff

```javascript
export function diffSeconds(startTime, endTime) {
  let format = ''
  if (startTime === endTime) {
    return '0秒'
  }
  const date1 = dayjs(endTime)
  const date2 = dayjs(startTime)
  let interval = date1.diff(date2)
  const day = date1.diff(date2, 'day')
  const hour = date1.diff(date2, 'hour')
  const minute = date1.diff(date2, 'minute')
  const second = date1.diff(date2, 'second')
  if (day) {
    interval = interval - 24 * 60 * 60 * 1000 - 3600 * 1000 * 8
    format = 'DD天HH小时mm分ss秒'
  } else if (hour) {
    interval = interval - 3600 * 1000 * 8
    format = 'HH小时mm分ss秒'
  } else if (minute) {
    format = 'mm分ss秒'
  } else if (second) {
    format = 'ss秒'
  }
  return dayjs(interval).format(format)
}
```

## 大屏适配

```javascript
<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div ref="container">
      <div class="fullscreen-button" @click="onFullscreenButtonClick">
        {{ isFullscreen ? '退出全屏' : '进入全屏' }}
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Fruit from './components/Fruit.vue';
import {addListener, removeListener} from 'resize-detector';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // Fruit,
  },
  data() {
    return {
      windowResizeListener: null,
      fullscreenListener: null,
      isFullscreen: false,
    }
  },
  mounted() {
    const container = this.$refs.container;
    // 存储上一次计算fontsize时用的clientwidth
    let memoryClientWidth = null;
    const SCROLLBAR_WIDTH = 20;
    // 设计图尺寸
    const DESIGNED_WIDTH = 1920;
    this.windowResizeListener = () => {
      const targetWidth = container.clientWidth;
      this.$store.dispatch('updateContainer', container);
      if (memoryClientWidth && Math.abs(targetWidth - memoryClientWidth) < SCROLLBAR_WIDTH) {
        return;
      }
      document.documentElement.style.fontSize = `${Math.max(targetWidth / DESIGNED_WIDTH, 0.5)}px`;
      memoryClientWidth = targetWidth;
    };
    addListener(container, this.windowResizeListener);
    this.windowResizeListener();
    this.fullscreenListener = () => {
      this.isFullscreen = !!document.fullscreenElement;
    };
    document.addEventListener('fullscreenchange', this.fullscreenListener);
  },
  beforeDestroy() {
    removeListener(this.$refs.container, this.windowResizeListener);
    if (this.fullscreenListener) {
      document.removeEventListener('fullscreenchange', this.fullscreenListener);
    }
  },
  methods: {
    onFullscreenButtonClick() {
      if (this.isFullscreen) {
        this.exitFullscreen();
      } else {
        this.enterFullscreen();
      }
      this.$store.dispatch('updateIsFullscreen', !this.isFullscreen);
    },
    enterFullscreen() {
      this.$refs.container.requestFullscreen().catch(e => {
        console.log(e);
      });
    },
    exitFullscreen() {
      document.exitFullscreen();
    }
  }
}
</script>

<style>
.fullscreen-button {
  background-color: red;
  color: white;
  padding: .5em 1em;
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  transition: all .2s;
}
</style>

```

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {
      username: '',
      name: '',
    },
    whitelist: null,
    containerSize: { w: 0, h: 0, rem: 1, rh: 1, rw: 1 },
    isFullscreen: false,
  },
  getters: {
    containerSize: (state) => state.containerSize,
  },
  mutations: {
    'sso:user:login'(state, payload) {
      state.userInfo = payload
    },
    'auth:setWhitelist'(state, payload) {
      state.whitelist = payload
    },
    'update:container-size'(state, payload) {
      state.containerSize = {
        w: payload.clientWidth,
        h: payload.clientHeight,
        rem: payload.clientWidth / 1920,
        rw: payload.clientWidth / 1920,
        rh: payload.clientHeight / 1080,
      }
    },
    'update:isFullscreen'(state, payload) {
      state.isFullscreen = payload
    },
  },
  actions: {
    updateContainer({ commit }, payload) {
      commit('update:container-size', payload)
    },
    updateIsFullscreen({ commit }, payload) {
      commit('update:isFullscreen', payload)
    },
  },
})
export default store
```

```javascript
@Watch('$store.getters.containerSize.rem', { immediate: true })
setHeightRem() {
  const rem = this.$store.getters.containerSize.rem;
  this.defaultConfig.height = 240 * rem;
  this.defaultConfig.lineHeight = 40 * rem;
  this.mainConfig.height = 360 * rem;
  this.mainConfig.lineHeight = 60 * rem;
}
```

##   下载

```javascript
export function download(url, name) {
  const filename = name || url
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
}
```

## codemirror6 json editor

```javascript
<template>
  <div class="json-editor">
    <div ref="codemirror" placeholder="请输入..." id="json-editor" class="editor"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, ref, toRefs, watch } from 'vue';

import { keymap, EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { syntaxTree } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { linter, lintGutter, lintKeymap, Diagnostic } from '@codemirror/lint';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { search } from '@codemirror/search';

export default defineComponent({
  name: 'JsonEditor',
  props: {
    modelValue: {
      type: Object as PropType<StringKeyToAnyValue>,
      default: () => {
        return {};
      }
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    let editorView = ref<EditorView>();
    const doc = ref<string>('');
    const myTheme = EditorView.baseTheme({
      '&.cm-editor': {
        // fontSize: '16px',
        border: '1px solid silver'
      }
      // '.cm-scroller': {
      //   fontFamily: 'Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace'
      // },
      // '.cm-content': { color: 'black' },
      // '&.cm-focused .cm-content': { color: 'orange' },
      // '&dark .cm-mySelector': { background: 'dimgrey' },
      // '&light .cm-mySelector': { background: 'ghostwhite' }
    });
    let timer: NodeJS.Timer | null = null;
    // const errorMarker = () => {
    //   let diagnostics = [
    //     {
    //       from: 1,
    //       to: 2,
    //       severity: 'error',
    //       message: 'null'
    //     }
    //   ];
    //   return diagnostics;
    // };
    // 自定义hint
    const regexpLinter = linter((view: EditorView) => {
      let diagnostics: Diagnostic[] = [];
      syntaxTree(view.state)
        .cursor()
        .iterate((node) => {
          // console.log(node, 'node');
          if (node.name == 'JsonText') {
            diagnostics.push({
              from: node.from,
              to: node.to,
              severity: 'warning',
              message: 'Regular expressions are FORBIDDEN',
              actions: [
                {
                  name: 'Remove',
                  apply(view, from, to) {
                    view.dispatch({ changes: { from, to } });
                  }
                }
              ]
            });
          }
        });
      return diagnostics;
    });
    const createEditor = () => {
      if (typeof editorView.value !== 'undefined') {
        editorView.value.destroy();
      }
      const startState = EditorState.create({
        doc: doc.value,
        extensions: [
          basicSetup,
          // keymap.of(defaultKeymap),
          keymap.of([...defaultKeymap, indentWithTab, ...lintKeymap]),
          search({ top: true }),
          // keymap.of([indentWithTab]),
          myTheme,
          lintGutter(),
          // regexpLinter,
          json(),
          linter(jsonParseLinter()),
          EditorView.editable.of(!props.readonly),
          EditorView.updateListener.of((v) => {
            if (v.docChanged) {
              if (timer) clearTimeout(Number(timer));
              timer = setTimeout(() => {
                const value = editorView.value?.state.doc.toString();
                value && emit('update:modelValue', JSON.parse(value));
              }, 500);
            }
          })
        ]
      });
      editorView.value = new EditorView({
        state: startState,
        parent: document.getElementById('json-editor') as HTMLElement
      });
    };
    watch(
      () => props.modelValue,
      () => {
        doc.value = JSON.stringify(props.modelValue, null, 2);
        createEditor();
      },
      { immediate: true, deep: true }
    );

    onMounted(createEditor);
    return {
      createEditor,
      doc
    };
  }
});
</script>

<style scoped lang="scss">
.json-editor,
.editor {
  width: 100%;
  max-height: 800px;
  overflow-y: scroll;
}
</style>
```

```

   "@codemirror/commands": "^6.0.1",
    "@codemirror/gutter": "^0.19.9",
    "@codemirror/lang-json": "^6.0.0",
    "@codemirror/lint": "^6.0.0",
    "@codemirror/search": "^6.0.0",
    "codemirror": "^6.0.1",
```
