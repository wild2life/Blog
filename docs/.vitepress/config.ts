import { basename } from 'node:path'
import { defineConfig } from 'vitepress'
import MarkdownPreview from 'vite-plugin-markdown-preview'

import { head, nav, sidebar, algolia } from './configs'

const APP_BASE_PATH = basename(process.env.GITHUB_REPOSITORY || '')

export default defineConfig({
  outDir: '../dist',
  base: APP_BASE_PATH ? `/${APP_BASE_PATH}/` : '/Blog/',

  lang: 'zh-CN',
  title: '野生动物',
  description: '我的理想永不坠落',
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

    logo: '/logo.jpg',

    nav,
    sidebar,

    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '目录',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/wild2life/Blog' }],

    footer: {
      message: '转载自 maomao1996',
      copyright: 'Copyright © 2019-present maomao',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
    algolia,
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
      badgeId: 'wild2life.Blog',
    },

    comment: {
      repo: 'wild2life/Blog',
      repoId: 'R_kgDOJA9Fow',
      category: 'Announcements',
      categoryId: 'DIC_kwDOJA9Fo84CkSp6',
    },
  },

  /* 生成站点地图 */
  sitemap: {
    hostname: 'https://wild2life.github.io/Blog/',
  },

  vite: {
    plugins: [MarkdownPreview()],
  },
})
