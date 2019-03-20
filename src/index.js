/*
 * @Author: liuxin 
 * @Date: 2018-05-27 22:53:40 
 * @Last Modified by: liuxin
 * @Last Modified time: 2018-08-03 23:27:40
 */

import '$assets/style/index.scss'
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})