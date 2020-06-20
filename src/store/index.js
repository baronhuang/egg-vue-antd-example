import Vue from 'vue';
import Vuex from 'vuex';
import global from './global';
import shopCart from './components/shopCart';
import sideMenu from './components/sideMenu';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    shopCart,
    sideMenu
  }
});
