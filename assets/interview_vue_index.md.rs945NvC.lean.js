import{_ as t,E as r,c as p,m as e,a,J as i,a8 as l,o}from"./chunks/framework.Cpm-ryT4.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"interview/vue/index.md","filePath":"interview/vue/index.md","lastUpdated":1678680316000}'),h={name:"interview/vue/index.md"},u=l("",15),d=l("",136);function c(s,b,m,k,v,q){const n=r("myComponent");return o(),p("div",null,[u,e("ul",null,[e("li",null,[a("通过在父组件上自定义一个监听事件"),i(n,{onDiy:s.handleDiy},null,8,["onDiy"]),a(",在子组件用 this.$emit('diy',data)来触发这个diy事件，其中data为子组件向父组件通信的数据,在父组件中监听diy个事件时，可以通过$event 访问 data 这个值。")]),e("li",null,[a("通过在父组件上用修饰符.sync 绑定一个数据"),i(n,{show:s.show},null,8,["show"]),a(",在子组件用 this.$emit('update:show',data)来改变父组件中 show 的值。 通过 v-model。")])]),d])}const y=t(h,[["render",c]]);export{f as __pageData,y as default};