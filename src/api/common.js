
export default (Vue) => {
  const api = Vue.$config.api;
  return {
    /**
     * 获取用户信息
     */
    async getUserInfo () {
      let res = await Vue.$axios({
        method: 'GET',
        url: `/api/getUserInfo`
      });
      return res;
    },

    /**
     * 高地登录检测，已登录会返回用户信息
     * @returns {Promise<*>}
     */
    async checkGdLogin () {
      let res = await Vue.$axios({
        method: 'GET',
        url: `${api.authApi}/api/auth/checklogin`,
        withCredentials: true
      });

      return res;
    }
  };
};
