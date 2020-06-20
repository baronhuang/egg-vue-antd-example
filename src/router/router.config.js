/**
 * Created on 2019/3/8 0008
 * @author: ben0721@yeah.net
 * @desc: 路由的配置文件
 */

import globalLayout from '@/layouts/globalLayout';
import pageLayout from '@/layouts/pageLayout';

/**
 * 只是为了让你少写点代码
 * @param path
 * @param title
 * @param meta
 * @returns {{path: *, meta: {[p: string]: *}, name: *}}
 */
function initProps (path, title, meta) {
  return {
    path,
    name: path,
    meta: {
      title,
      ...meta
    }

  };
}

const rootRouter = [
  {
    path: '/',
    name: 'index',
    component: globalLayout,
    meta: { title: '首页' },
    redirect: '/product',
    children: [
      {
        // 若增加的页面是不需要显示在左边菜单，添加hide: true即可
        ...initProps('/blank', '', { hide: true }),
        component: pageLayout,
        children: []
      },
      {
        ...initProps('/product', '商品管理', { icon: 'table' }),
        redirect: '/product/index',
        component: pageLayout,
        children: [
          {
            // 若页面不想缓存下来，请添加noCache: true即可，默认都是缓存的
            ...initProps('/product/index', '商品列表', { noCache: true }),
            component: () => import('@/views/product/index/index.vue')
          },
          {
            ...initProps('/product/list', '商品管理'),
            component: () => import('@/views/product/list/list.vue')
          }
        ]
      },
      {
        ...initProps('/punchCard', '打卡数据管理', { icon: 'mail' }),
        redirect: '/punchCard/list',
        component: pageLayout,
        children: [
          {
            ...initProps('/punchCard/list', '打卡数据列表'),
            component: () => import('@/views/punchCard/list/list.vue')
          },
          {
            ...initProps('/punchCard/list2', '刷卡数据源设置'),
            component: () => import('@/views/punchCard/list2/list2.vue')
          }
        ]
      }
    ]
  }
  // {
  //   path: '/product',
  //   name: 'product',
  //   component: () => import(/* webpackChunkName: 'product' */ '@/views/product/index/index.vue')
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   redirect: '/admin/product',
  //   component: () => import('@/layouts/adminLayout.vue'),
  //   children: adminRouter
  // }

];

export default [
  ...rootRouter
];
