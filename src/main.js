import Vue from 'vue';
import App from './App.vue';
import './antDesignVue';
import router from './router';
import store from './store';
import config from './plugins/config';
import axiosInstance from './plugins/axios';
import api from './plugins/api';
import mixin from './plugins/mixin';
import directive from './plugins/directive';
import util from './plugins/util';
// 第三方filters包
import Vue2Filters from 'vue2-filters';
// 自定义的filters包
import './filters/filters';

Vue.config.productionTip = false;

// 注意插件的顺序，config和axios需要在api前面
Vue.use(config);
Vue.use(axiosInstance);
Vue.use(api);
Vue.use(mixin);
Vue.use(directive);
Vue.use(util);
Vue.use(Vue2Filters);
// 事件总线，自定义全局事件，使用于简单的逻辑，复杂的逻辑还是适合用vuex，注意区分
Vue.prototype.$bus = new Vue();

// 全局变量，方便日后访问
window.Global = {};
window.Global.Vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
