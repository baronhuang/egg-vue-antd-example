<template>
  <a-layout-footer class="footer">
    <div class="links">
      <!--<a href="https://pro.ant.design/" target="_blank">Pro 首页</a>-->
      <!--<a href="https://github.com/ant-design/ant-design-pro" target="_blank">-->
        <!--<a-icon type="github"/>-->
      <!--</a>-->
      <!--<a href="https://ant.design/">Ant Design</a>-->
      <!--<a href="https://vue.ant.design/">Vue Antd</a>-->
      <a href="javascript:;">互联网研发产品中心</a>
      <a href="javascript:;">用户平台研发部</a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright"/>
      2019 <span>广州博鳌纵横网络科技有限公司版权所有</span>
    </div>
  </a-layout-footer>
</template>

<script>
/**
 * Created on 2019/3/21 0021
 * @author: ben0721@yeah.net
 * @desc: 全局底部布局，用来添加版权信息
 */
export default {
  name: 'globalFooter'
};
</script>

<style lang="scss" scoped>
  .footer {
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;

    .links {
      margin-bottom: 8px;

      a {
        color: rgba(0, 0, 0, .45);

        &:hover {
          color: rgba(0, 0, 0, .65);
        }

        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }
    .copyright {
      color: rgba(0, 0, 0, .45);
      font-size: 14px;
    }
  }
</style>
