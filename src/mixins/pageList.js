/**
 * Created on 2019/2/27 0027
 * @author: ben0721@yeah.net
 * @desc: 分页列表的mixin，包括分页的定义，列表的定义，点击分页时的回调方法等
 */

import dot from 'dot-object';

/**
 * 数据分页的mixin方法，
 * @param name  数据字段的前缀
 * @param pagination 分页
 * @param loading 加载中的标志
 * @param resConfig 数据响应的数据配置
 * @returns {*}
 */
export default ({
  name = 'data',
  pagination = {
    current: 1,
    pageSize: 10,
    showTotal: (total, range) => `共 ${total} 条`,
    showSizeChanger: true,
    showQuickJumper: true,
    onChange: async () => {}
  },
  loading = false,
  resConfig = {
    list: 'data.list',
    total: 'data.pager.total',
    current: 'data.pager.pageNum',
    pageSize: 'data.pager.pageSize'
  }
}) => {
  // 把首字母变成大写
  const upCase = name.replace(name[0], name[0].toUpperCase());
  // 数据列表
  const nameList = `${name}List`;
  // 获取数据列表的方法，可以进行重写
  const getNameData = `get${upCase}Data`;
  // 分页
  const namePagination = `${name}Pagination`;
  // loading状态
  const nameListLoading = `${name}ListLoading`;
  // 获取数据列表的数据以后进行处理的方法，可以进行重写
  const getNameList = `get${upCase}List`;
  return {
    data () {
      return {
        [nameList]: [],
        [namePagination]: Object.assign(pagination, {
          onChange: (current, pageSize) => {
            this[namePagination].current = current;
            this[namePagination].pageSize = pageSize;
            this[getNameList]();
          },
          onShowSizeChange: (current, pageSize) => {
            this[namePagination].current = current;
            this[namePagination].pageSize = pageSize;
            this[getNameList]();
          }
        }),
        [nameListLoading]: loading
      };
    },
    methods: {
      /**
       * 获取数据的方法，必须要返回数据，供给getNameList里面调用，例如：
       * let res = await this.$api.product.getProductList({ pageNum: xxx, pageSize: xxx });
       * return res;
       * @returns {Promise<void>}
       */
      async [getNameData] () {
        throw Error(`需要在实例中重写${getNameData}方法`);
      },
      /**
       * 如果遇到比较特别不能实现的，可以在实例里重写此方法
       * @returns {Promise<void>}
       */
      async [getNameList] () {
        this[nameListLoading] = true;
        // 调用获取数据的方法
        let res = await this[getNameData]();
        this[nameList] = dot.pick(resConfig.list, res);
        this[namePagination].total = parseInt(dot.pick(resConfig.total, res));
        this[namePagination].current = parseInt(dot.pick(resConfig.current, res));
        this[namePagination].pageSize = parseInt(dot.pick(resConfig.pageSize, res));
        this[nameListLoading] = false;
      }
    }
  };
};
