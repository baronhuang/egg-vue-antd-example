/**
 * Created on 2019/2/27 0027
 * @author: ben0721@yeah.net
 * @desc: 在这里统一导入所有的mixin文件，挂载到vue实例上
 */

// 使用require.context，支持根据目录遍历所有的文件
let files = require.context('../mixins/', false, /^((?!.\/index).)*\.js$/);

export default {
  install: (Vue, options) => {
    const $mixin = {};
    files.keys().forEach(key => {
      $mixin[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
    });
    Vue.prototype.$mixin = $mixin;
  }
};
