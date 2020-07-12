// vue.config.js

const path = require('path');
module.exports = {
  publicPath: '/static/',
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // 选项...
  // webpack-dev-server 的配置项
  devServer: {
    disableHostCheck: true,
    port: 7207
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
    } else {
      // 为开发环境修改配置...
      // config.plugins.push({
      //   apply: (compiler) => {
      //     compiler.hooks.done.tap('pluginName', function (compilation) {
      //       console.log('ok');
      //     });
      //   }
      // });
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      });
  }
};
