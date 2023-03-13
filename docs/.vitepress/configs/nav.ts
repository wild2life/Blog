import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '前端导航', link: '/nav/' },
  // todo
  { text: '前端物语', items: [
    {
      text: 'JS基础知识',
      link: 'https://github.com/wild2life/Blog'
    },
    {
      text: 'JS基础知识',
      link: 'https://github.com/wild2life/Blog'
    },
    {
      text: 'JS基础知识',
      link: 'https://github.com/wild2life/Blog'
    },
    {
      text: 'ES6常用知识',
      link: 'https://github.com/wild2life/Blog'
    },
    {
      text: 'Monorepo',
      link: 'https://github.com/wild2life/Blog'
    }
  ] },
  // todo
  {
    text: '源码阅读',
    items: [
      {
        text: 'Vue',
        link: 'https://github.com/wild2life/Blog',
      },
      {
        text: 'React',
        link: 'https://github.com/wild2life/Blog',
      }
    ],
  },
  // todo
  {
    text: '笔记',
    items: [
      {
        text: 'Vue',
        link: 'https://github.com/wild2life/Blog',
      },
      {
        text: 'React',
        link: 'https://github.com/wild2life/Blog',
      }
    ],
  },
]
