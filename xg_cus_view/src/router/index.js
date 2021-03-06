import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register'

Vue.use(Router)

var router = new Router({

  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => require(['../components/login.vue'], resolve)
    },
    {
      path: '/register/:key',
      name: 'register',
      component: register
    },
    {
      path: '/real',
      name: 'real',
      component: resolve => require(['../components/real.vue'], resolve)
    },
    {
      path: '/real/:key',
        name: 'real',
      component: resolve => require(['../components/real.vue'], resolve)
    },
    {
      path: '/banklist',
      name: 'banklist',
      component: resolve => require(['../components/bankcard/bank_list.vue'], resolve)
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
      path: '/creditapply/:key',
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
    },
    {
      path: '/wdrllist',
        name: 'wdrllist',
      component: resolve => require(['../components/wdrl/wdrl_list.vue'], resolve)
    },
    {
      path: '/repymtlist/:wdrlId',
        name: 'repymtlist',
      component: resolve => require(['../components/repymt/repymt_list.vue'], resolve)
    },
    {
      path: '/repymtapply/:wdrlId',
        name: 'repymtapply',
      component: resolve => require(['../components/repymt/repymt_apply.vue'], resolve)
    },
    {
      path: '/info',
        name: 'info',
      component: resolve => require(['../components/info.vue'], resolve)
    },
    {
      path: '/auth/:code',
        name: 'auth',
      component: resolve => require(['../components/auth.vue'], resolve)
    },
    {
      path: '/common/ok',
        name: 'ok',
      component: resolve => require(['../components/common/ok.vue'], resolve)
    },
    {
      path: '/common/ok/:key',
        name: 'ok',
      component: resolve => require(['../components/common/ok.vue'], resolve)
    },
    {
      path: '/explain/question',
        name: 'question',
      component: resolve => require(['../components/explain/question.vue'], resolve)
    },
    {
      path: '/explain/agreement/:key',
        name: 'agreement',
      component: resolve => require(['../components/explain/agreement.vue'], resolve)
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(process.env.IS_WX == 0){
    next();
  }else{
    if(localStorage.getItem("_cusToken")){
      next();
    }else{
      // alert(to.path);
      if(localStorage.getItem("_openId") && to.path.indexOf("/register/") != -1){
        next();
      }else{
        if(to.path.indexOf("/login") != -1 ||
          to.path.indexOf("/auth/") != -1){
          next();
        }else{
          let theRequest = getRequest();
          let code = theRequest['code'];
          if(code){
            if(to.path.indexOf("/register/") == -1){
              // alert("index.js/isGoOut");
              localStorage.setItem("isGoOut", 1);
            }
            next("/auth/" + code);
          }
        }
      }
    }
  }

});

function getRequest() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    let str = url.substr(1);
    let strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

export default router;
