<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  components: {
  },
  data () {
    return {
      locale: zhCN
    };
  },
  methods: {

  }
};
</script>

<style lang="scss">
@import "assets/style/common";
#app {
  font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 300px;
}
</style>
