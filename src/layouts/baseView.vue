<template>
  <keep-alive :include="include">
    <router-view ref="page"></router-view>
  </keep-alive>
</template>

<script>
/**
 * Created on 2019/3/21 0021
 * @author: ben0721@yeah.net
 * @desc: 基础的路由，可以根据路由配置对象中的meta.noCahce来关闭页面的缓存，默认是开启
 */
export default {
  name: 'baseView',
  data () {
    // const routes = this.$router.options.routes[0].children;
    // let exclude = [];
    // for (let item of routes) {
    //   for (let subItem of item.children) {
    //     if (subItem.meta.noCache) {
    //       // 把路由path上的'/'去掉，就会变成页面组件的name
    //       exclude.push(subItem.path.replace(/\//g, ''));
    //     }
    //   }
    // }
    //
    // exclude = exclude.join('|');

    return {
      // exclude: new RegExp(exclude, 'i')
    };
  },
  computed: {
    include () {
      const include = this.$store.state.global.pageCacheList.join('|') || '\\s';
      return new RegExp(include, 'i');
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
