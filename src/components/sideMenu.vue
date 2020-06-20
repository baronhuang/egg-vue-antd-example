<template>
  <a-layout-sider class="sider"
    theme="light"
    width="256px"
    v-model="collapsed"
    >
    <div class="logo">
      <router-link to="/">
        <ant-vue-svg alt="logo" />
        <h1>汇桔考勤系统</h1>
      </router-link>
    </div>
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys="openKeys"
      mode="inline"
      :inlineCollapsed="collapsed"
      @openChange="onOpenChange"
    >
      <a-sub-menu :key="menu.path" v-for="menu in routes">
        <span slot="title"><a-icon :type="menu.meta.icon" v-if="menu.meta.icon" /><span>{{ menu.meta.title }}</span></span>
        <template v-for="subMenu in menu.children">
          <a-menu-item :key="subMenu.path" v-if="!subMenu.meta.hide">
            <router-link :to="subMenu.path">
              {{ subMenu.meta.title }}
            </router-link>
          </a-menu-item>
        </template>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
/**
 * Created on 2019/3/21 0021
 * @author: ben0721@yeah.net
 * @desc: 全局左边菜单，根据路由树映射出菜单结构，可以自由伸缩
 */
import antVueSvg from '@/assets/ant-vue.svg?inline';
export default {
  name: 'sideMenu',
  components: {
    antVueSvg
  },
  data () {
    // meta.hide需要过滤掉
    const routes = this.$router.options.routes[0].children.filter(v => !v.meta.hide);
    return {
      routes,
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: [],
      rootKeys: routes.map(v => v.path)
    };
  },
  watch: {
    $route () {
      this.updateMenu();
    },
    /* 当伸缩左边菜单时，需要把之前的状态保存，恢复时再次赋值 */
    collapsed (val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys.concat();
        this.openKeys = [];
      } else {
        this.openKeys = this.cachedOpenKeys;
      }
    }
  },
  computed: {
    collapsed () {
      return this.$store.state.sideMenu.collapsed;
    }
  },
  methods: {
    /**
     * 打开当前，收起其他
     * @param openKeys
     */
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key));
      if (!this.rootKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    /**
     * 更新菜单，当路由变化时执行
     */
    updateMenu () {
      const openKeys = [];
      // 寻找当前的路由的父节点path，打开父菜单
      for (let item of this.routes) {
        if (openKeys.length > 0) {
          break;
        }
        for (let subItem of item.children) {
          if (subItem.path === this.$route.path) {
            openKeys.push(item.path);
            break;
          }
        }
      }
      this.openKeys = openKeys;
      this.selectedKeys = [this.$route.path];

      if (this.collapsed) {
        this.openKeys = [];
      } else {
        this.cachedOpenKeys = openKeys;
      }
    }
  },
  created () {
    this.updateMenu();
  }
};
</script>

<style lang="scss" scoped>
  // 菜单样式
  .sider {
    position: relative;
    z-index: 10;
    height: auto;
    background-color: #fff;
    box-shadow: 2px 0px 8px 0px rgba(29, 35, 41, 0.05);
    .ant-layout-sider-children:hover {
      overflow-y: auto;
    }

    &.ant-fixed-sidemenu {
      position: fixed;
      height: 100%;
    }

    .logo {
      height: 64px;
      position: relative;
      line-height: 64px;
      padding-left: 24px;
      -webkit-transition: all .3s;
      transition: all .3s;
      background: #fff;
      box-shadow: 1px 1px 0px 0px #e8e8e8;
      overflow: hidden;

      img, svg, h1 {
        display: inline-block;
        vertical-align: middle;
      }

      img, svg {
        height: 32px;
        width: 32px;
      }

      h1 {
        display: inline-block;
        vertical-align: middle;
        color: #1890FF;
        font-size: 20px;
        margin: 0 0 0 12px;
        font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-weight: 600;
      }
    }

    .ant-menu-light {
      border-right-color: transparent;
    }

  }
</style>
