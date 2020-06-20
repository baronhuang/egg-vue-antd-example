/**
 * Created on 2019/3/20 0020
 * @author: ben0721@yeah.net
 * @desc: 页面的左边菜单
 */

export default {
  namespaced: true,
  state: {
    // 是否收起菜单
    collapsed: false
  },
  mutations: {
    toggleCollapsed (state, { collapsed }) {
      state.collapsed = collapsed;
    }
  }
};
