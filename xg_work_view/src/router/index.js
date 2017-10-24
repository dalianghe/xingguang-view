import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '/register/:key',
      name: 'register',
      component: resolve => require(['../components/register.vue'], resolve)
    },
    {
      path: '/real',
      name: 'real',
      component: resolve => require(['../components/real.vue'], resolve)
    },
    {
      path: '/',
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
    },
    {
      path: '/creditinfo',
      name: 'creditinfo',
      component: resolve => require(['../components/credit/credit_info.vue'], resolve)
    },
    {
      path: '/creditapply',
      name: 'creditapply',
      component: resolve => require(['../components/credit/credit_apply.vue'], resolve)
    },
    {
      path: '/my',
      name: 'my',
      component: resolve => require(['../components/my.vue'], resolve)
    },
    {
      path: '/wdrlapply',
      name: 'wdrlapply',
      component: resolve => require(['../components/wdrl/wdrl_apply.vue'], resolve)
    }
  ]
})
