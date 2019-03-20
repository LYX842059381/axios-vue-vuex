import Vue from 'vue'
import Router from 'vue-router'
import routerMap from './router-map'
Vue.use(Router)

const router = new Router({
  base: '/',
  // history模式
  mode: "history",
  routes: [
    ...routerMap
  ]
})

// 后置路由钩子，用于修改title
router.afterEach((to,from) => {
  const { meta: {title = ''} } = to
  document.title = title || ''
})

export default router


