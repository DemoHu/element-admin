/*
 * @Author: Siwen
 * @LastEditors: Siwen
 * @Date: 2019-03-21 14:02:10
 * @LastEditTime: 2019-03-28 10:55:59
 * @Description: 接口中心
 */
import { get, post } from './http'
import store from '../store/index'

export default {
  /**获取币种 */
  getCoinTypes() {
    return new Promise((resolve, reject) => {
      get('/api/user/coinTypes', {}).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**获取用户信息 */
  getUserInfo() {
    return new Promise((resolve, reject) => {
      get('/useraccount/getUserInfo', {}).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**获取验证码 */
  getCode(type, account) {
    return new Promise((resolve, reject) => {
      get('/useraccount/getUserInfo', { type, account }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**退出登录 */
  logOut() {
    return new Promise((resolve, reject) => {
      post('/user/logout', {}).then(res => {
        resolve(res)
        store.commit('SET_LOGIN', false)
        store.commit('SET_INFO', {})
      }).catch(err => {
        reject(err)
      })
    })
  }
}
