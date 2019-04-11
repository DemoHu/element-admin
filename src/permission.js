import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import api from './api'

NProgress.configure({
  showSpinner: false
})
// api.getUserInfo().then(res => {
//   console.log(res)
// })
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.state.user.login) {
    if (store.state.permission.routes.length === 0) {
      //模拟数据
      const roles = [
        { name: '404' },
        {
          name: '权限管理',
          children: [
            { name: '账号管理' },
            { name: '菜单管理' }
          ]
        }
      ]
      store.dispatch('GenerateRoutes', {
        roles
      }).then(accessRoutes => {
        // 根据roles权限生成可访问的路由表
        router.addRoutes(accessRoutes) // 动态添加可访问路由表
        next({ ...to, replace: true })
        NProgress.done()
      })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
