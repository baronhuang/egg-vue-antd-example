/**
 * Created on 2019/2/21 0021
 * @author: ben0721@yeah.net
 * @desc: 路由配置的入口文件
 */
import Vue from 'vue';
import Router from 'vue-router';
// 添加顶部的页面加载进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '@/store';
import routers from './router.config';

// vue-router3.1版本之后，对于航组件重复点击的错误处理方式
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};

NProgress.configure({ showSpinner: false });

Vue.use(Router);

const router = new Router({
  // 去掉地址栏上面的#
  mode: 'history',
  // 页面跳转时，自动跳到顶部
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    ...routers
  ]
});

// 在这里可以进行路由的拦截
router.beforeEach(async (to, from, next) => {
  // 没有userInfo，需要先请求
  if (!(store.state.global.userInfo && store.state.global.userInfo.account)) {
    await store.dispatch('global/fetchUserInfo');
  }

  // 单路由开始跳转时，就要把当前的路由的页面name插入到缓存列表
  if (!to.meta.noCache) {
    store.commit('global/insertPageCacheList', { pageName: to.path.replace(/\//g, '') });
  }
  // start progress bar
  NProgress.start();
  next();
  NProgress.done();
});

router.afterEach(() => {
  // start progress bar
  NProgress.done();
});

export default router;
