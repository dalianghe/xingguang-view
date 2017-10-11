import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import register from '@/components/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'register',
      component: resolve => require(['../components/register.vue'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../components/login.vue'], resolve)
    },
    {
      path: '/banks',
      name: 'banks',
      component: resolve => require(['../components/bankcard/banks.vue'], resolve)
    },
    {
      path: '/addbank',
      name: 'addbank',
      component: resolve => require(['../components/bankcard/addbank.vue'], resolve)
    }
  ]
})
