/**
 * Created on 2019/2/19 0019
 * @author: ben0721@yeah.net
 * @desc: 把client.config挂载到vue上，不需要每次都import配置文件
 */

import config from '../../config/client.config';
export default {
  install: (Vue, options) => {
    Vue.$config = config;
    Vue.prototype.$config = config;
  }
};
