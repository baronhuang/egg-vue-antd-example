/**
 * Created on 2019/2/19 0019
 * @author: ben0721@yeah.net
 * @desc: 商品接口集合
 */

export default (Vue) => {
  const api = Vue.$config.api;
  return {
    /**
     * 获取商品列表
     * @param where 获取商品列表的条件
     * @returns {Promise<void>}
     */
    getProductList: async ({ where = {}, pageNum = 1, pageSize = 10 } = {}) => {
      let res = await Vue.$ajax({
        url: `${api.dataApi}/api/mongoApi/member.demo_extcrm_product`,
        data: {
          where: JSON.stringify(where),
          pageNum,
          pageSize
        },
        mockData: {
          data: {
            list: []
          }
        }
      });

      return res;
    },
    /**
     * 添加商品
     * @param data
     * @returns {Promise<void>}
     */
    createProduct: async (data) => {
      let res = await Vue.$ajax({
        method: 'post',
        url: `${api.dataApi}/api/mongoApi/member.demo_extcrm_product`,
        contentType: 'json',
        data
      });

      return res;
    },
    /**
     * 更新商品
     * @param data data必须包含有_id
     * @returns {Promise<void>}
     */
    updateProduct: async (data) => {
      let res = await Vue.$ajax({
        method: 'put',
        url: `${api.dataApi}/api/mongoApi/member.demo_extcrm_product/${data._id}`,
        contentType: 'json',
        data
      });

      return res;
    },
    /**
     * 删除商品
     * @param data data必须包含有_id
     * @returns {Promise<void>}
     */
    deleteProduct: async (data) => {
      let res = await Vue.$ajax({
        method: 'delete',
        url: `${api.dataApi}/api/mongoApi/member.demo_extcrm_product/${data._id}`,
        // contentType: 'json',
        data
      });

      return res;
    }
  };
};
