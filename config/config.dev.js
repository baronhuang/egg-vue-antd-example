/**
 * Created on 2019/4/16 0016
 * @author: ben0721@yeah.net
 * @desc: 开发环境
 */
const prodConf = require('./config.prod');

module.exports = () => {
  const config = prodConf();
  return config;
};
