<template>
  <div class="user-menu">
    <a-dropdown>
      <span class="action ant-dropdown-link user-dropdown-menu">
        <a-avatar class="avatar" size="small" :src="$store.state.global.userInfo.headimgurl"/>
        <span>{{ $store.state.global.userInfo.name }}</span>
      </span>
      <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
        <a-menu-item key="0">
          <router-link to="/center">
            <a-icon type="user"/>
            <span>个人中心</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="1">
          <router-link to="/setting">
            <a-icon type="setting"/>
            <span>账户设置</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2" disabled>
          <a-icon type="setting"/>
          <span>测试</span>
        </a-menu-item>
        <a-menu-divider/>
        <a-menu-item key="3">
          <a href="javascript:;" @click="handleLogout">
            <a-icon type="logout"/>
            <span>退出登录</span>
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
/**
 * Created on 2019/3/21 0021
 * @author: ben0721@yeah.net
 * @desc: 用户菜单，可以自定义用户的信息和操作
 */
export default {
  name: 'userMenu',
  components: {
  },
  methods: {
    handleLogout () {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          console.log('注销');
        },
        onCancel () {
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .user-menu {
    float: right;
    height: 100%;

    .action {
      cursor: pointer;
      padding: 0 12px;
      display: inline-block;
      transition: all .3s;
      height: 100%;
      color: rgba(0, 0, 0, 0.65);

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }

      .avatar {
        margin: 20px 8px 20px 0;
        color: #1890ff;
        background: hsla(0, 0%, 100%, .85);
        vertical-align: middle;
      }

      .icon {
        font-size: 16px;
        padding: 4px;
      }
    }
  }
</style>
