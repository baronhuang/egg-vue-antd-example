/**
 * Created on 2019/3/12 0012
 * @author: ben0721@yeah.net
 * @desc: 前端工具方法
 */

const $util = {
  /**
   * 删除对象的空字符串
   * @param obj
   * @returns {*}
   */
  deleteEmptyString (obj) {
    for (var i in obj) {
      if (obj[i] === '') {
        delete obj[i];
      } else if (typeof obj[i] === 'object' && !Array.isArray(obj[i])) {
        this.deleteEmptyString(obj[i]);
      }
    }

    return obj;
  }
};

export default {
  install: (Vue, options) => {
    Vue.prototype.$util = $util;
  }
};
