<template>
  <a-layout-header class="header">
    <a-row>
      <a-col :span="4">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="toggle"/>
      </a-col>
      <a-col :span="16">
        <h3 class="text-center title">{{ $route.meta.title }}</h3>
      </a-col>
      <a-col :span="4">
        <user-menu></user-menu>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script>
/**
 * Created on 2019/3/21 0021
 * @author: ben0721@yeah.net
 * @desc: 全局头部布局，可以存放一些头部常规组件，如用户菜单等
 */
import userMenu from '@/components/userMenu';
export default {
  name: 'globalHeader',
  components: {
    userMenu
  },
  data () {
    return {

    };
  },
  computed: {
    collapsed () {
      return this.$store.state.sideMenu.collapsed;
    }
  },
  methods: {
    toggle () {
      this.$store.commit('sideMenu/toggleCollapsed', { collapsed: !this.collapsed });
    }
  }
};
</script>

<style lang="scss" scoped>
  .ant-layout-header {
    padding: 0;
  }
  .header {
    height: 64px;
    padding: 0 12px 0 0;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    position: relative;
    .trigger {
      font-size: 20px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color .3s;
      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
    .title {
      font-size: 20px;
    }
  }
</style>
