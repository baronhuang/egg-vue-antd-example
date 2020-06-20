module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  /**
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  'rules': {
    'no-console': 0, // 禁用 console
    'semi': ['error', 'always'], // 要求分号
    'no-eval': 0, // 禁用 eval()
    'no-unused-expressions': ['error', { 'allowTernary': true, 'allowShortCircuit': true }], // 禁止未使用过的表达式
    'no-throw-literal': 0, // 限制可以被抛出的异常
    'no-trailing-spaces': 0 // 不允许在语句后存在多余的空格
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
