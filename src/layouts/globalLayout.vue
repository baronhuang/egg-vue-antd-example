<template>
  <a-layout>
    <!-- 左边菜单 -->
    <side-menu></side-menu>
    <a-layout>
      <!-- 头部 -->
      <global-header></global-header>
      <!-- 中间内容 -->
      <a-layout-content>
        <!-- 多tabs导航 -->
        <multi-tabs></multi-tabs>
        <base-view></base-view>
      </a-layout-content>
      <!-- 底部 -->
      <global-footer></global-footer>
    </a-layout>
  </a-layout>
</template>

<script>
/**
 * Created on 2019/3/21 0021
 * @author: ben0721@yeah.net
 * @desc: 页面中最大的布局
 */

import sideMenu from '@/components/sideMenu';
import globalHeader from '@/layouts/globalHeader';
import globalFooter from '@/layouts/globalFooter';
import baseView from '@/layouts/baseView';
import multiTabs from '@/components/multiTabs';
export default {
  name: 'globalLayout',
  components: {
    sideMenu,
    globalHeader,
    globalFooter,
    baseView,
    multiTabs
  }
};
</script>

<style lang="scss" scoped>

</style>
