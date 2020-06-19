'use strict'

import Vue from 'vue'
import ElementUI from 'element-ui'
import '@/assets/scss/font-awesome.css'
import '@/assets/scss/element-variables.scss'
import '@/assets/scss/site.scss'

import App from './App.vue'
import router from './router'

import store from './plugin/store'
import ajax from './plugin/ajax'

import Utils from '@/assets/js/utils.js'
Vue.prototype.utils = Utils

Vue.use(ElementUI)
Vue.use(ajax)

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

router.beforeEach((to, from, next) => {
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
