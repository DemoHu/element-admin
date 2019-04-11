/*
 * @Author: Siwen
 * @LastEditors: Siwen
 * @Date: 2019-03-26 15:06:24
 * @LastEditTime: 2019-04-08 14:38:43
 * @Description: Vue过滤器
 */
import Vue from 'vue'
import utils from '@/utils'
//时间格式化
Vue.filter('formatDate', (v, format) => {
  return utils.formatDate(v, format)
})
//数字千分位格式化
Vue.filter('comdify', (num) => {
  return utils.comdify(num)
})
