/**
 * Created on 2019/2/18 0018
 * @author: ben0721@yeah.net
 * @desc: 自定义vue的axios插件，包括接口拦截等
 */

import axios from 'axios';
import { axiosConfig } from '../../config/client.config';

let axiosInstance = {};
axiosInstance = axios.create(axiosConfig);

// 在发送请求之前做些什么
const requestSuccessCb = function (config) {
  // console.log('requestSuccess');
  return config;
};

// 对请求错误做些什么
const requestFailCb = function (error) {
  console.error('requestFail', error);
  return Promise.reject(error);
};

// 对响应数据做点什么
const responseSuccessCb = function (response) {
  // console.log('responseSuccess', response);
  const { config, data } = response;
  const { code } = data;
  const vue = window.Global.Vue;
  // 如果检测到noIntercept，则不走下面的流程，直接返回response
  if (config.noIntercept) {
    return response;
  }

  switch (code) {
    case 200:
      // 如果需要返回整个response对象，则传入allRes:true
      if (config.allRes) {
        return response;
      } else {
        return response.data;
      }
    // 未登录跳转到登录页
    case 401:
      // 实现一个倒数的提示框，自动跳转到登录页
      let secondsToGo = 5;
      const modal = vue.$info({
        title: '您还未登录系统，请先登录！',
        content: `${secondsToGo}秒后自动跳转到登录页。`
      });
      const interval = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: `${secondsToGo}秒后自动跳转到登录页。`
        });
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        modal.destroy();
        window.location.href = `/#/login?redirect=${vue._route.fullPath}`;
      }, secondsToGo * 1000);
      break;
      // 有其他错误的code，也可以在这下面加...

    default:
      // 如果不需要使用公共的提示，可以传入isShowMessage=false来关闭
      if (config.isShowMessage) {
        // 如果不是以中文开头的message，就需要另外提示
        if (escape(response.data.message).indexOf('%u') !== 0) {
          vue.$message.error('服务器出错，请联系开发人员');
        } else {
          vue.$message.error(response.data.message);
        }
      }
      if (config.allRes) {
        return response;
      } else {
        return response.data;
      }
  }

  return config.mockData;
};

// 对响应错误做点什么
const responseFailCb = function (error) {
  console.error('responseFail', error);
  const { config, status, data } = error.response;
  const vue = window.Global.Vue;
  switch (status) {
    case 404:
      vue.$message.error('网络请求不存在');
      break;
    default:
      // 如果不需要使用公共的提示，可以传入isShowMessage=false来关闭
      if (config.isShowMessage) {
        const msg = data && (data.msg || data.message);
        if (msg) {
          // 如果不是以中文开头的message，就需要另外提示
          if (escape(msg).indexOf('%u') !== 0) {
            vue.$message.error('网络请求出错，请联系开发人员');
          } else {
            vue.$message.error(msg);
          }
        } else {
          vue.$message.error('网络请求出错，请联系开发人员');
        }
      }
  }
  return Promise.reject(error);
};

/**
 * 自定义的ajax方法，封装之后方便前端调用
 * @param method 请求方式
 * @param url 请求地址
 * @param data 请求参数
 * @param headers 请求的header
 * @param conentType 请求的contentType
 * @param params 请求的url参数
 * @param mockData 当请求的接口出错时，返回的假数据，防止因为数据依赖而导致程序执行不下去
 * @param allRes 是否返回整个response结果，包括headers、status等，默认只返回数据
 * @param isShowMessage 接口返回的code!==200时，是否显示全局的提示
 * @param noIntercept 不拦截接口处理，直接返回response，特殊情况下使用
 * @returns {Promise<void>}
 */
const $ajax = async function ({ method = 'get', url = '', data = {}, headers = '', contentType = '', params = {}, mockData = {}, allRes = false, isShowMessage = true, noIntercept = false }) {
  let config = {
    method: 'post',
    url: '/api/ajaxApi',
    mockData,
    allRes,
    isShowMessage,
    noIntercept,
    headers: {
      // 本地开发环境没有此值
      'ajax-method': method,
      'ajax-url': url,
      'ajax-type': contentType,
      'ajax-headers': headers
    }
  };

  if (method.toUpperCase() === 'GET') {
    config.params = data;
  } else {
    config.data = data;
    // 如果是GET以外的方式，需要同时支持url参数和表单参数
    config.params = params;
  }

  let res = await axiosInstance(config);
  return res;
};

// 注入请求的拦截
axiosInstance
  .interceptors.request.use(requestSuccessCb, requestFailCb);
// 注入响应的拦截
axiosInstance
  .interceptors.response.use(responseSuccessCb, responseFailCb);

export default {
  install: (Vue, options) => {
    // Vue全局方法
    Vue.$axios = axiosInstance;
    Vue.$ajax = $ajax;
    // 把axios实例挂载到vue实例上，方便调用
    Vue.prototype.$axios = axiosInstance;
    Vue.prototype.$ajax = $ajax;
  }
};
