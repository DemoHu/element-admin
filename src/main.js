import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css
import '@/plugins'
import '@/filters'
import '@/directive'
import '@/icons'
import '@/permission'
import App from '@/App'
import store from '@/store'
import router from '@/router'
import api from '@/api'
import utils from '@/utils'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$utils = utils

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
