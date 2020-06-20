/**
 * Created on 2019/3/12 0012
 * @author: ben0721@yeah.net
 * @desc: 自定义helper方法
 */

module.exports = {
  /**
   * 获取客户端ip
   * @param req
   * @returns {*}
   */
  getClientIp (req) {
    // console
    return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
  },
  /**
   * 格式化返回给前端的body格式
   * @param data 数据
   * @param options 自定义的选项，可以传入code或者message等
   */
  formatBody (data, options) {
    const defaults = {
      code: 200,
      message: 'success'
    };
    options = Object.assign(defaults, options);
    if (parseInt(options.code) === 200) {
      this.ctx.body = Object.assign(options, {
        data
      });
    }
  }
};
