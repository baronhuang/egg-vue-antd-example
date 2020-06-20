/**
 * Created on 2019/3/4 0004
 * @author: ben0721@yeah.net
 * @desc: 全局的共享数据
 */

import Vue from 'vue';
export default {
  namespaced: true,
  state: {
    // 用户信息
    userInfo: {
      userId: 0,
      account: '',
      name: '',
      companyName: '',
      orgName: '',
      posName: '',
      headimgurl: ''
    },
    // 页面缓存，需要根据当前路由的路径转化成页面的name
    pageCacheList: []
  },
  mutations: {
    // 插入页面缓存
    insertPageCacheList (state, { pageName }) {
      if (!state.pageCacheList.includes(pageName)) {
        state.pageCacheList = [ ...state.pageCacheList, pageName ];
      }
    },
    // 移除页面缓存
    removePageCacheList (state, { pageName }) {
      state.pageCacheList = state.pageCacheList.filter(v => v !== pageName);
    },
    // 初始化用户信息
    setUserInfo (state, userData) {
      state.userInfo = userData;
    }
  },
  actions: {
    // 拉取用户信息
    async fetchUserInfo ({ commit }, { type } = {}) {
      const $api = Vue.$api;
      const res = await $api.common.getUserInfo();
      if (res.code === 200) {
        commit('setUserInfo', res.data);
        return res.data;
      } else {
        return res;
      }
    }
  },
  getters: {}
};
