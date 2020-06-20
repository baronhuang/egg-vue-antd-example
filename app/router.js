'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 退出登录，需要带上redirectUrl参数，登陆后会跳转回来
  // router.get('/logout', app.easyCas.logout(), controller.home.logout);
  // 前端使用此接口来调用后端的接口，跨域调用
  router.post('/api/ajaxApi', controller.common.ajaxApi);
  // 文件上传转发测试
  router.post('/api/ajaxUpload', controller.common.ajaxUpload);
  // 获取用户信息
  router.get('/api/getUserInfo', controller.common.getUserInfo);
  // 入口路由，匹配所有路由，登录拦截等操作
  router.get('*', controller.home.index);
};
