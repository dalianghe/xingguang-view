// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import config from './router/conf/config'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$ajax = axios
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);
import './assets/css/style.css';

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import tools from './js/tools';
Vue.use(tools);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
