export default [
  {
    path: "/list",
    redirect: "/list/0"
  },
  // 嵌套路由
  {
    path: "/list/:newsType",
    name: "list",
    // 路由按需加载
    component: res => require(['../views/Home'], res),
    meta: {
      title: '资讯列表'
    }
  },
  {
    path: "/detail/:artTarget",
    name: "detail",
    component: res => require(['../views/Detail'], res),
    meta: {
      title: '阅读正文'
    }
  },
  {
    path: "/",
    redirect: "/list/0"
  },
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/demo',
    component: res => require(['../views/Demo'], res),
  }
]