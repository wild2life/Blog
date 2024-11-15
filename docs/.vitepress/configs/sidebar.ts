import type { DefaultTheme } from 'vitepress'
import fs from 'fs-extra'


export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/fe/': [
    {
      text: 'JavaScript 基础知识',
      collapsed: false,
      items: [
        { text: '数据类型', link: '/fe/javascript/types' },
        { text: '引用类型的拷贝', link: '/fe/javascript/clone' },
        { text: '类型转换', link: '/fe/javascript/conversions' },
        { text: '原型和原型链', link: '/fe/javascript/prototype' },
        { text: '继承', link: '/fe/javascript/inherit' }
      ]
    },
    {
      text: 'ES6 常用知识点',
      link: '/fe/es6/'
    },
    {
      text: 'TypeScript',
      collapsed: false,
      items: [
        { text: '基础知识', link: '/fe/typescript/base' },
        { text: '编译配置', link: '/fe/typescript/tsconfig' },
        { text: '类型体操', link: '/fe/typescript/challenges' }
      ],
      link: '/fe/typescript/base'
    },
    {
      text: 'HTML / CSS',
      collapsed: false,
      items: [
        { text: 'HTML 理论知识点', link: '/fe/html/' },
        { text: 'CSS 理论知识点', link: '/fe/css/' }
      ]
    },
    { text: ' Webpack', link: '/fe/webpack/' },
    {
      text: '浏览器与网络',
      collapsed: false,
      items: [
        { text: '浏览器相关知识点', link: '/fe/browser/' },
        { text: 'TCP', link: '/fe/network/tcp' },
        { text: 'HTTP', link: '/fe/network/http' }
      ]
    },
    {
      text: 'Node',
      collapsed: false,
      items: [{ text: 'package.json', link: '/fe/node/pkg' }]
    },
    {
      text: '概念知识点',
      collapsed: false,
      items: [
        { text: '模块化', link: '/fe/concept/module' },
        { text: '前端页面渲染方式', link: '/fe/concept/page-rendering' }
      ]
    },
    {
      text: '编程题',
      link: '/fe/coding/'
    }
  ],
  '/analysis/': [
    {
      text: 'React',
      items: [
        { text: 'React 18 的新特性', link: '/analysis/react/18' },
        { text: 'React 常见面试题', link: '/analysis/react/interview' }
      ]
    },
    { text: 'Vue', items: [
      { text: '源码阅读技巧', link: '/analysis/vue/way' },
      { text: 'Vue常见面试题', link: '/analysis/vue/interview' }
  ]
   },
    {
      text: '工具库',
      // collapsed: false,
      items: [
        { text: 'only-allow', link: '/analysis/utils/only-allow' },
        { text: 'clsx', link: '/analysis/utils/clsx' },
        { text: 'await-to-js', link: '/analysis/utils/await-to-js' }
      ]
    }
  ],
  '/workflow/': [
    {
      text: '编程规范',
      link: '/workflow/style-guide'
    },
    {
      text: '常用工具/方法',
      collapsed: false,
      items: [
        { text: '工具库整理', link: '/workflow/utils/library' },
        { text: '常用正则整理', link: '/workflow/utils/regexp' },
        { text: '常用代码片段', link: '/workflow/utils/snippets' }
      ]
    },
    {
      text: '常用库的使用与配置',
      collapsed: false,
      items: [
        { text: 'Tailwind CSS', link: '/workflow/library/tailwindcss' },
        { text: 'Day.js', link: '/workflow/library/dayjs' }
      ]
    },
    {
      text: 'HTML / CSS 相关',
      collapsed: false,
      items: [
        { text: 'HTML 奇淫技巧', link: '/workflow/html/tricks' },
        { text: 'CSS 语法', link: '/workflow/css/spec' },
        { text: 'CSS 奇淫技巧', link: '/workflow/css/tricks' },
        { text: 'Sass 常用技巧', link: '/workflow/sass/' }
      ]
    },
    {
      text: 'Vue 相关',
      link: '/workflow/vue/'
    },
    {
      text: 'Node 相关',
      // collapsed: false,
      items: [{ text: 'npm 常用命令', link: '/workflow/node/npm' }]
    },
    {
      text: '终端相关',
      collapsed: false,
      items: [
        { text: 'Zsh 配置', link: '/workflow/terminal/zsh' },
        { text: '命令行工具', link: '/workflow/terminal/toolkit' },
        { text: 'Shell 命令', link: '/workflow/terminal/shell' }
      ]
    },
    {
      text: 'Git 相关',
      collapsed: false,
      items: [
        { text: 'Git 相关技巧', link: '/workflow/git/' },
        { text: 'Git 命令清单', link: '/workflow/git/command' }
      ]
    },
    {
      text: 'Chrome',
      collapsed: false,
      items: [
        { text: 'chrome debugger', link: '/workflow/chrome/debugger' },
        { text: 'chrome插件', link: '/workflow/chrome/plugins' }
      ]
    }
  ],
  '/efficiency/': [
    {
      text: '软件推荐与配置',
      // collapsed: false,
      items: [
        { text: '多平台软件', link: '/efficiency/software/cross-platform' },
        { text: 'Mac 平台', link: '/efficiency/software/mac' },
        { text: 'Windows 平台', link: '/efficiency/software/windows' },
        { text: '浏览器设置与扩展', link: '/efficiency/software/browser' },
        { text: 'Visual Studio Code 配置', link: '/efficiency/software/vscode' },
        { text: 'WebStorm 配置', link: '/efficiency/software/webstorm' }
      ]
    },
    { text: '在线工具', link: '/efficiency/online-tools' },
    { text: '书签脚本', link: '/efficiency/bookmark-scripts' }
  ],
  '/notes/': [
    {
      text: '踩坑记录',
      // collapsed: false,
      items: [
        { text: 'Npm 踩坑记录', link: '/notes/pit/npm' },
        { text: '第三方库踩坑记录', link: '/notes/pit/library' },
        { text: 'PC 踩坑记录', link: '/notes/pit/pc' },
        { text: 'H5 踩坑记录', link: '/notes/pit/h5' },
        { text: '微信开发踩坑记录', link: '/notes/pit/wechat' },
        { text: 'Uniapp 常见问题', link: '/notes/pit/uniapp' },
        { text: 'Nuxt 常见问题', link: '/notes/pit/nuxt' },
        { text: 'Vue 踩坑记录', link: '/notes/pit/vue' },
      ]
    },
    {
      text: '项目沉淀',
      // collapsed: false,
      items: [
        { text: '文件上传', link: '/notes/project/upload' },
        { text: '环境搭建', link: '/notes/project/environment' }
      ]
    }
  ],
}
