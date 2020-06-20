<template>
  <div class="page-layout">
    <!-- 面包屑 -->
    <div class="page-header">
      <a-breadcrumb class="breadcrumb">
        <a-breadcrumb-item v-for="(item, index) in breadList" :key="index">
          <span>{{ item.meta.title }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <!-- 页面内容 -->
    <transition name="slide-fade">
      <base-view ref="content" class="page-wrapper"></base-view>
    </transition>
  </div>
</template>

<script>
/**
 * Created on 2019/3/21 0021
 * @author: ben0721@yeah.net
 * @desc: 根据路由变化的中间内容，实际上的页面布局，可以把一些公共的组件放这，例如面包屑等
 */
import baseView from '@/layouts/baseView';
export default {
  name: 'pageLayout',
  components: {
    baseView
  },
  data () {
    return {};
  },
  methods: {
  },
  computed: {
    breadList () {
      const routes = this.$router.options.routes[0].children;
      const breadList = [this.$router.options.routes[0]];
      for (let item of routes) {
        for (let subItem of item.children) {
          if (subItem.path === this.$route.path) {
            breadList.push(item);
            breadList.push(this.$route);
            break;
          }
        }
      }

      return breadList;
    }
  },
  mounted () {
  }
};
</script>

<style lang="scss" scoped>
.page-layout {
  .page-header {
    background: #fff;
    padding: 14px 32px;
    border-bottom: 1px solid #e8e8e8;
  }
}

// 页面进入退出动画
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
