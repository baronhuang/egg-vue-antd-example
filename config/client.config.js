/**
 * Created on 2019/2/18 0018
 * @author: ben0721@yeah.net
 * @desc: 网页前端的参数配置，为了兼容前后端的语法一致，请使用commonjs的语法
 */

const merge = require('lodash/merge');

// 默认配置
let config = {
  // node的环境变量
  NODE_ENV: process.env.NODE_ENV || 'production',
  // axios配置
  axiosConfig: {
    maxContentLength: 100000,
    timeout: 2000000
  },
  // 请求域名的配置
  api: {
    dataApi: 'https://api.example.com'
  }
};

// 根据当前环境变量自由配置信息
let envConfig = {
  // 开发环境
  dev: {
    api: {
    }
  },
  // 测试环境
  test: {
    api: {
    }
  },
  // 灰度环境
  huidu: {
    api: {
    }
  },
  // 生产环境
  prod: {
    api: {
    }
  }
};

// 当前的环境变量
let env;

// 判断是否为node环境
if (typeof window === 'undefined') {
  env = process.env.EGG_SERVER_ENV || 'local';
} else {
  // node端写入的当前环境变量，与process.env.EGG_SERVER_ENV一致
  env = window.__ENV__;
}

// 合并对象
merge(config, envConfig[env]);
module.exports = config;
