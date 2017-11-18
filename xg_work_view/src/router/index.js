import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register'

Vue.use(Router)

var router = new Router({

  routes: [
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['../components/register.vue'], resolve)
    },
    {
      path: '/register/:key',
      name: 'register',
      component: resolve => require(['../components/register.vue'], resolve)
    },
    {
      path: '/',
      name: 'login',
      component: resolve => require(['../components/login.vue'], resolve)
    },
    {
      path: '/my',
      name: 'my',
      component: resolve => require(['../components/my.vue'], resolve)
    },
    {
      path: '/cuslist',
      name: 'cuslist',
      component: resolve => require(['../components/cus/cus_list.vue'], resolve)
    },
    {
      path: '/info',
        name: 'info',
      component: resolve => require(['../components/info.vue'], resolve)
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
      path: '/auth/:code',
        name: 'auth',
      component: resolve => require(['../components/auth.vue'], resolve)
    },
    {
      path: '/qr',
        name: 'qr',
      component: resolve => require(['../components/qr.vue'], resolve)
    },
    {
      path: '/underlinglist',
        name: 'underlinglist',
      component: resolve => require(['../components/underling/underling_list.vue'], resolve)
    },
    {
      path: '/underlingqr',
        name: 'underlingqr',
      component: resolve => require(['../components/underling/underling_qr.vue'], resolve)
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(process.env.IS_WX == 0){
    next();
  }else{
    if(localStorage.getItem("_workToken")){
      next();
    }else{
      if(localStorage.getItem("_openId") && to.path.indexOf("/register") != -1){
        next();
      }else{
        if(to.path.indexOf("/login") != -1 ||
          to.path.indexOf("/auth/") != -1){
          next();
        }else{
          let theRequest = getRequest();
          let code = theRequest['code'];
          if(code){
            if(to.path.indexOf("/register") == -1){
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
