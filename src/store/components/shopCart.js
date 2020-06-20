/**
 * Created on 2019/3/1 0001
 * @author: ben0721@yeah.net
 * @desc: 购物车的状态管理
 */
export default {
  namespaced: true,
  state: {
    // 购物车里面的商品列表
    selectedProductList: [],
    // 是否打开购物车
    isOpen: false
  },
  mutations: {
    insertSelectedProductList (state, { product }) {
      state.selectedProductList = [ ...state.selectedProductList, product ];
    },
    toggleShopCart (state, { isOpen }) {
      state.isOpen = isOpen;
    }
  },
  actions: {
    insertSelectedProductList ({ commit }, { product }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('insertSelectedProductList', { product });
          resolve();
        }, 300);
      });
    }
  },
  getters: {
    productTotal: state => state.selectedProductList.length
  }
};
