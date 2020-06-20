import Vue from 'vue';

const filters = {
  /**
   * 隐藏电话号码中间四位
   * @param str
   * @returns {void | string | never}
   */
  hidePhoneNumber (str) {
    str = str.toString();
    return str.replace(str.substring(3, 7), '****');
  }
};

// 遍历所有方法进行注册
for (let name in filters) {
  Vue.filter(name, filters[name]);
}
