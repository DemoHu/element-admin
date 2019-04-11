/*
 * @Author: Siwen
 * @LastEditors: Siwen
 * @Date: 2019-03-21 11:00:59
 * @LastEditTime: 2019-04-10 15:45:00
 * @Description: 路由配置
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '@/layout'

/**
* hidden: true                   是否在侧边栏显示
* alwaysShow: true               如果设置为真，则始终显示根菜单，无论其子路由的长度如何
*                                如果未设置AlwaysShow，则子级下只能有一个以上的路由
*                                它将成为嵌套模式，否则不显示根菜单
* redirect: noredirect           如果“redirect:noredirect”，则不会重定向
* name:'router-name'             权限匹配条件，必须设置  the name is used by <keep-alive> (must set!!!)
* noSearch                       不在搜索中显示
* meta : {
    title: 'title'               子菜单和面包屑中显示的名称
    icon: 'svg-name'             图标
    breadcrumb: false            如果为false，则该项将隐藏在breadcrumb中（默认为true）
    noCache: true                如果为true，则不会缓存该页（默认值为false）
    affix: true                  如果为真，标签将粘贴在标签视图中。
  }
**/

export const constantRoutes = [
  { path: '/', redirect: '/account/accountList', hidden: true },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/account',
    component: Layout,
    name: '支付商户管理',
    noSearch: true,
    meta: { title: '支付商户管理', icon: 'peoples' },
    children: [
      {
        path: 'accountList',
        component: () => import('@/views/account/accountList'),
        name: '商户列表',
        meta: { title: '商户列表' }
      },
      {
        path: 'assetsList',
        component: () => import('@/views/account/assetsList'),
        name: '资产列表',
        meta: { title: '资产列表' }
      },
      {
        path: 'neichongList',
        component: () => import('@/views/account/neichongList'),
        name: '内充订单',
        meta: { title: '内充订单' }
      }
    ]
  },
  {
    path: '/payment',
    component: Layout,
    name: '支付方式管理',
    noSearch: true,
    meta: { title: '支付方式管理', icon: 'money' },
    children: [
      {
        path: 'paymentList',
        component: () => import('@/views/payment/paymentList'),
        name: '支付方式列表',
        meta: { title: '支付方式管理' }
      }
    ]
  },
  {
    path: '/recharge',
    component: Layout,
    name: '充值管理',
    noSearch: true,
    meta: { title: '充值管理', icon: 'recharge' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/recharge/recharge'),
        name: '充值通道列表',
        meta: { title: '充值通道列表' }
      },
      {
        path: 'merchant',
        component: () => import('@/views/recharge/merchant'),
        name: '通道商户列表',
        meta: { title: '通道商户列表' }
      }
    ]
  },
  {
    path: '/withdrawal',
    component: Layout,
    name: '提现管理',
    noSearch: true,
    meta: { title: '提现管理', icon: 'withdrawal' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/withdrawal/withdrawal'),
        name: '提现通道列表',
        meta: { title: '提现通道列表' }
      },
      {
        path: 'merchant',
        component: () => import('@/views/withdrawal/merchant'),
        name: '通道商户列表',
        meta: { title: '通道商户列表' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    name: '订单管理',
    noSearch: true,
    meta: { title: '订单管理', icon: 'list' },
    children: [
      {
        path: 'rechargeOrderList',
        component: () => import('@/views/order/rechargeOrderList'),
        name: '充值订单',
        meta: { title: '充值订单' }
      },
      {
        path: 'withdrawalOrderList',
        component: () => import('@/views/order/withdrawalOrderList'),
        name: '提现订单',
        meta: { title: '提现订单' }
      },
      {
        path: 'paymentOrderList',
        component: () => import('@/views/order/paymentOrderList'),
        name: '代付订单',
        meta: { title: '代付订单' }
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    name: '数据统计',
    noSearch: true,
    meta: { title: '数据统计', icon: 'chart' },
    children: [
      {
        path: 'dataCount',
        component: () => import('@/views/dataCount/dataCount'),
        name: '数据统计中心',
        meta: { title: '数据统计' }
      }
    ]
  }
]

// 权限路由
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/account',
    name: '权限管理',
    noSearch: true,
    meta: { title: '权限管理', icon: 'lock' },
    children: [
      {
        path: 'account',
        component: () => import('@/views/permission/account'),
        name: '账号管理',
        meta: { title: '账号管理' }
      },
      {
        path: 'menu',
        component: () => import('@/views/permission/menu'),
        name: '菜单管理',
        meta: { title: '菜单管理' }
      }
    ]
  },
  { path: '*', redirect: '/404', name: '404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
