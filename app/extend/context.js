/**
 * Created on 2019/8/22 0022
 * @author: ben0721@yeah.net
 * @desc: 自定义的ctx方法
 */
const _ = require('lodash');
module.exports = {
  /**
   * 自定义http请求方法，默认把dataType: 'json'和cookie传给ctx.curl，避免重复性工作
   * @param url 请求地址
   * @param options 配置选项
   * @returns {*}
   */
  async $http (url, options = {}) {
    const ctx = this;

    let defaults = {
      headers: {
        Cookie: ctx.headers.cookie || '',
        referer: ctx.headers.referer || ''
      },
      dataType: 'json'
    };
    options = _.merge({}, defaults, options);

    try {
      const res = await ctx.curl(url, options);
      // 如果返回的status不是200，证明是有问题，需要抛出
      if (parseInt(res.status) !== 200) {
        const msg = res.data && res.data.message;
        throw {
          status: res.status,
          message: msg
        };
      }

      return res;
    } catch (err) {
      this.logger.error('--------------------curl error', url);
      this.logger.error(err);
      throw err;
    }
  }
};
