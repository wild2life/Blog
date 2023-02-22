module.exports = {
  title: 'Yolo',
  base: '/blog/',
  head: [
    [
      'meta',
      {
        name: 'referrer',
        content: 'no-referrer'
      }
    ]
  ],
  themeConfig: {
    repo: 'SetoInlandSea/blog',
    repoLabel: 'GitHub',
    docsDir: 'docs',
    docsBranch: 'docs',
    editLinks: true,
    editLinkText: '编辑',
    nav: [
      { text: '计网', link: '/internet/计算机网络简史' },
      { text: '框架', link: '/frame/' },
      { text: '工具', link: '/utils/源码阅读' },
      { text: '面试', link: '/interview/内存管理' },
      { text: '产品', link: '/product/产品设计思维' },
    ],
    sidebar: [
      {
        title: '计网',
        collapsable: false,
        children: [
          ['/', 'overview'],
          ['/internet/计算机网络简史', '计算机网络简史'],
          ['/internet/OSI七层模型', 'OSI七层模型'],
          ['/internet/TCP_IP协议群', 'TCP_IP协议群']
        ]
      },
      {
        title: '框架',
        collapsable: false,
        children: [
          ['/frame/', '首页'],
          ['/frame/vue/大屏适配', '大屏适配'],
          ['/frame/vue/vue3.0项目工程环境', 'vue3.0项目工程环境'],
          ['/frame/vue/vue3', 'vue3'],
          ['/frame/react/', 'react'],
          ['/frame/other/SSR', 'ssr'],
          ['/frame/other/nuxt', 'nuxt'],
          ['/frame/常用的方法', '常用的方法'],
          ['/frame/字符串技巧', '字符串技巧'],
          ['/frame/黑魔法', '黑魔法']
        ]
      },
      {
        title: '工具',
        collapsable: false,
        children: [
          ['/utils/源码阅读', '源码阅读'],
          ['/utils/Chrome debugger', 'Chrome debugger'],
          ['/utils/git', 'git'],
          ['/utils/Chrome扩展插件', 'Chrome扩展插件'],
          ['/utils/npm发布', 'npm发布'],
          ['/utils/shell', 'shell'],
          ['/utils/前端工具', '前端工具'],
        ]
      },
      {
        title: '产品',
        collapsable: false,
        children: [
          ['/product/产品设计思维', '产品设计思维'],
          ['/product/Axure', 'Axure'],
        ]
      },
      {
        title: '面试',
        collapsable: false,
        children: [
          ['/interview/内存管理', '内存管理'],
          ['/interview/异步', '异步'],
          ['/interview/JavaScript如何工作', 'JavaScript如何工作'],
        ]
      },
    ]
  },
}