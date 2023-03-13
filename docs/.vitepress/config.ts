// module.exports = {
//     outDir: '../dist',
//     title: "Yolo",
//     base: "/Blog/",
//     head: [
//       [
//         "meta",
//         {
//           name: "referrer",
//           content: "no-referrer",
//         },
//       ],
//     ],
//     themeConfig: {
//       repo: "wild2life/Blog",
//       repoLabel: "GitHub",
//       docsDir: "docs",
//       docsBranch: "docs",
//       editLinks: true,
//       editLinkText: "编辑",
//       subSidebar: "auto",
//       i18nRouting: false,
//       nav: [
//         { text: "计网", link: "/internet/计算机网络简史" },
//         { text: "框架", link: "/frame/" },
//         { text: "工具", link: "/utils/源码阅读" },
//         { text: "面试", link: "/interview/vue/" },
//       ],
//       sidebar: [
//         {
//           title: "计网",
//           collapsable: false,
//           items: [
//             {
//               text: "计算机网络简史",
//               link: "/internet/计算机网络简史",
//             },
//             {
//               text: "OSI七层模型",
//               link: "/internet/OSI七层模型",
//             },
//             {
//               text: "TCP_IP协议群",
//               link: "/internet/TCP_IP协议群",
//             },
//           ],
//         },
//         {
//           title: "框架",
//           collapsable: false,
//           items: [
//             {
//                 "text": "首页",
//                 "link": "/frame/"
//             },
//             {
//                 "text": "vue3.0项目工程环境",
//                 "link": "/frame/vue/vue3.0项目工程环境"
//             },
//             {
//                 "text": "vue3",
//                 "link": "/frame/vue/vue3"
//             },
//             {
//                 "text": "大文件上传",
//                 "link": "/frame/vue/大文件上传"
//             },
//             {
//                 "text": "react",
//                 "link": "/frame/react/"
//             },
//             {
//                 "text": "nuxt",
//                 "link": "/frame/other/nuxt"
//             },
//             {
//                 "text": "electron",
//                 "link": "/frame/other/electron"
//             },
//             {
//                 "text": "常用的方法",
//                 "link": "/frame/常用的方法"
//             },
//             {
//                 "text": "字符串技巧",
//                 "link": "/frame/字符串技巧"
//             },
//             {
//                 "text": "黑魔法",
//                 "link": "/frame/黑魔法"
//             }
//         ],
//         },
//         {
//           title: "工具",
//           collapsable: false,
//           items: [
//             {
//               text: "源码阅读",
//               link: "/utils/源码阅读",
//             },
//             {
//               text: "Chrome debugger",
//               link: "/utils/Chrome debugger",
//             },
//             {
//               text: "git",
//               link: "/utils/git",
//             },
//             {
//               text: "Chrome扩展插件",
//               link: "/utils/Chrome扩展插件",
//             },
//             {
//               text: "npm发布",
//               link: "/utils/npm发布",
//             },
//             {
//               text: "shell",
//               link: "/utils/shell",
//             },
//             {
//               text: "前端工具",
//               link: "/utils/前端工具",
//             },
//             {
//               text: "webpack",
//               link: "/utils/webpack",
//             },
//           ],
//         },
//         {
//           title: "产品",
//           collapsable: true,
//           items: [
//             {
//               text: "产品设计思维",
//               link: "/product/产品设计思维",
//             },
//             {
//               text: "Axure",
//               link: "/product/Axure",
//             },
//           ]
//         },
//         {
//           title: "面试",
//           collapsable: true,
//           items: [
//             ["/interview/vue/", "Vue"],
//             ["/interview/js/", "JS"],
//             ["/interview/other/", "其他"],
//           ],
//         },
//         {
//           title: "分享",
//           collapsable: true,
//           items: [
//             {
//               text: "算法",
//               link: "/share/算法",
//             },
//             {
//               text: "干爆前端",
//               link: "/share/干爆前端",
//             },
//           ]
//         },
//       ],
//       outline: {
//         level: 'deep',
//         label: '本页目录'
//       },
//       socialLinks: [{ icon: 'github', link: 'https://github.com/wild2life' }],
//       footer: {
//         copyright: 'Copyright © 2019-present wild2life'
//       },
//       darkModeSwitchLabel: '外观',
//       returnToTopLabel: '返回顶部',
//       lastUpdatedText: '上次更新',
//       docFooter: {
//         prev: '上一篇',
//         next: '下一篇'
//       }
//     },
//   };

import { basename } from 'node:path'
import { defineConfig } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'

import { head, nav, sidebar } from './configs'

const APP_BASE_PATH = basename(process.env.GITHUB_REPOSITORY || '')

export default defineConfig({
  outDir: '../dist',
  base: APP_BASE_PATH ? `/${APP_BASE_PATH}/` : '/Blog/',

  lang: 'zh-CN',
  title: '野生动物',
  description: '茂茂的成长之路，包含前端常用知识、源码阅读笔记、各种奇淫技巧、日常提效工具等',
  head,
  lastUpdated: true,
  cleanUrls: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
  },

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,

    logo: '/mine.jpg',

    nav,
    sidebar,

    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '目录',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/wild2life/Blog' }],

    footer: {
      message: '如有转载或 CV 的请标注本站原文地址',
      copyright: 'Copyright © 2019-present maomao',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    /*** 自定义配置 ***/
    visitor: {
      badgeId: 'maomao1996.vitepress-nav-template',
    },

    comment: {
      repo: 'wild2life/Blog',
      repoId: 'R_kgDOJC09Jg',
      category: 'Announcements',
      categoryId: 'DIC_kwDOJC09Js4Cekn0',
    },
  },

  vite: {
    plugins: [MarkdownPreview()],
  },
})
