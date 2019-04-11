/*
 * @Author: Siwen
 * @LastEditors: Siwen
 * @Date: 2019-03-21 11:00:59
 * @LastEditTime: 2019-04-08 16:56:23
 * @Description: 项目通用vuex
 */
const TEST_ENV = document.domain === 'otc.becent.cc' || document.domain.includes('localhost')
const app = {
  state: {
    api_url: TEST_ENV ? 'https://api.becent.cc/otc/w' : 'https://api.becent.net/otc/w', //接口主地址
    www_api_url: TEST_ENV ? 'https://api.becent.cc/w' : 'https://api.becent.net/w', //退出登录用
    sidebar: {
      opened: !+localStorage.getItem('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        localStorage.setItem('sidebarStatus', 1)
      } else {
        localStorage.setItem('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      localStorage.setItem('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}

export default app
