<template>
  <a-tabs class="multi-tabs"
    hideAdd
    :activeKey="activeTab.path"
    type="editable-card"
    @change="selectTab"
    @edit="removeTab"
  >
    <a-tab-pane v-for="tab in tabList" :key="tab.path" :closable="tabList.length > 1">
      <a-dropdown overlay :trigger="['contextmenu']" slot="tab">
        <span>{{ tab.meta.title }}</span>
        <!-- 鼠标右键菜单 -->
        <a-menu slot="overlay" :path="tab.path" @click="selectTabMenu">
          <a-menu-item key="refresh">刷新页面</a-menu-item>
          <a-menu-item key="closeThat">关闭当前页</a-menu-item>
          <a-menu-item key="closeRight">关闭右侧</a-menu-item>
          <a-menu-item key="closeLeft">关闭左侧</a-menu-item>
          <a-menu-item key="closeAll">关闭全部</a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
/**
 * Created on 2019/3/21 0021
 * @author: ben0721@yeah.net
 * @desc: 头部多tabs打开，支持鼠标右键菜单
 */
export default {
  name: 'multiTabs',
  data () {
    return {
      // 当前的激活的tab
      activeTab: {},
      // 菜单列表
      tabList: []
    };
  },
  methods: {
    removeTab (key) {
      this.tabList = this.tabList.filter(v => v.path !== key);
      // 关闭页面，需要把当前的页面缓存清除
      this.$store.commit('global/removePageCacheList', { pageName: key.replace(/\//g, '') });
      // 如果当前关闭的是当前的tab，则跳到最后一个tab
      if (key === this.activeTab.path) {
        if (this.tabList.length > 0) {
          this.activeTab = this.tabList[this.tabList.length - 1];
        }
      }
    },
    selectTab (key) {
      this.activeTab = this.tabList.filter(v => v.path === key)[0];
    },
    refresh (key) {
      this.tabList = this.tabList.filter(v => v.path !== key);
      // 关闭页面，需要把当前的页面缓存清楚
      this.$store.commit('global/removePageCacheList', { pageName: key.replace(/\//g, '') });
      this.$router.go(-1);
      setTimeout(() => {
        this.$router.push(key);
      }, 100);
    },
    closeThat (key) {
      this.removeTab(key);
    },
    closeLeft (key) {
      // 获取当前点击的索引
      const curIndex = this.tabList.findIndex(v => v.path === key);
      if (curIndex > 0) {
        this.tabList.forEach((item, index) => {
          if (index < curIndex) {
            this.removeTab(item.path);
          }
        });
      } else {
        this.$message.info('左侧没有标签');
      }
    },
    closeRight (key) {
      // 获取当前点击的索引
      const curIndex = this.tabList.findIndex(v => v.path === key);
      if (curIndex < this.tabList.length - 1) {
        this.tabList.forEach((item, index) => {
          if (index > curIndex) {
            this.removeTab(item.path);
          }
        });
      } else {
        this.$message.info('右侧没有标签');
      }
    },
    closeAll (key) {
      // 获取当前点击的索引
      const curIndex = this.tabList.findIndex(v => v.path === key);
      this.tabList.forEach((item, index) => {
        if (index !== curIndex) {
          this.removeTab(item.path);
        }
      });
    },
    selectTabMenu ({ key, item }) {
      const path = item.$el.parentNode.getAttribute('path');
      // 执行关闭
      this[key](path);
    }
  },
  created () {
    this.tabList.push(this.$route);
    this.activeTab = this.tabList[0];
    /**
     * 关闭当前页面的全局事件
     * url: 关闭当前tab后，跳转到哪个url，不传则直接跳到最后打开的页面
     */
    this.$bus.$on('multiTabs:closeCurTab', ({ url }) => {
      this.removeTab(this.activeTab.path);
      url && this.$router.push(url);
    });
  },
  watch: {
    $route (nVal, oVal) {
      this.activeTab = nVal;
      if (!this.tabList.find(v => v.path === nVal.path)) {
        this.tabList.push(nVal);
      }
    },
    activeTab (nVal, oVal) {
      if (nVal && nVal.fullPath) {
        this.$router.push(nVal.fullPath);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.multi-tabs {
  margin-top: 1px;
  /deep/ .ant-tabs-card-bar {
    background: rgb(255, 255, 255);
    margin: 0px;
    padding-left: 16px;
    padding-top: 1px;
    .ant-tabs-tab {
      user-select: none;
    }
  }
}
</style>
