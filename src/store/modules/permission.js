/*
 * @Author: Siwen
 * @LastEditors: Siwen
 * @Date: 2019-03-21 18:47:28
 * @LastEditTime: 2019-03-27 11:22:51
 * @Description: 路由权限判断脚本
 */
import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const realRoutes = []
  routes.forEach(v => {
    roles.forEach(item => {
      if (item.name === v.name) {
        if (item.children && item.children.length > 0) {
          v.children = filterAsyncRoutes(v.children, item.children)
        }
        realRoutes.push(v)
      }
    })
  })
  return realRoutes
}

const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}

export default permission
