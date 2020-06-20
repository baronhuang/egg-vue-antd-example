/**
 * Created on 2019/2/27 0027
 * @author: ben0721@yeah.net
 * @desc: 遍历所有的directives文件，统一挂载
 */

// 使用require.context，支持根据目录遍历所有的文件
let files = require.context('../directives/', false, /^((?!.\/index).)*\.js$/);

export default {
  install: (Vue, options) => {
    files.keys().forEach(key => {
      files(key).default(Vue);
    });
  }
};
