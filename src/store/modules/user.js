/*
 * @Author: Siwen
 * @LastEditors: Siwen
 * @Date: 2019-03-21 11:00:59
 * @LastEditTime: 2019-03-27 11:23:37
 * @Description: 用户信息vuex
 */
const user = {
  state: {
    login: JSON.parse(localStorage.getItem('isLogin')) || false,
    myInfo: JSON.parse(localStorage.getItem('myInfo')) || {}
  },

  mutations: {
    SET_LOGIN: (state, obj) => {
      localStorage.setItem('isLogin', obj)
      state.login = obj
    },
    SET_INFO: (state, info) => {
      localStorage.setItem('myInfo', JSON.stringify(info))
      state.myInfo = info
    }
  }
}

export default user
