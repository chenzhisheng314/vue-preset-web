import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/shared/layout'
import home from '@/views/home'
import login from '@/views/login'
import StandardList from '@/views/standard/list'
import StandardForm from '@/views/standard/form'
import StandardTree from '@/views/standard/tree'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: home }
      ]
    },
    { path: '/login', component: login },
    { path: '/standard/list', component: StandardList },
    { path: '/standard/form', component: StandardForm },
    { path: '/standard/tree', component: StandardTree },
    { path: '*', name: 'any', redirect: '/404' }
  ]
})
