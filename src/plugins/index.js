/*
 * @Author: Siwen
 * @LastEditors: Siwen
 * @Date: 2019-03-22 10:11:47
 * @LastEditTime: 2019-04-10 16:57:39
 * @Description: 第三方插件载入
 */

import Vue from 'vue'
// import {
//   Icon,
//   Scrollbar,
//   Dropdown, DropdownMenu, DropdownItem,
//   Menu, Submenu, MenuItem, MenuItemGroup,
//   Select, Option,
//   DatePicker,
//   Input,
//   Table, TableColumn,
//   Breadcrumb,
//   BreadcrumbItem,
//   Switch,
//   Dialog,
//   Button, ButtonGroup,
//   Upload,
//   Message,
//   Loading,
//   Tooltip,
//   RadioGroup, Radio,
//   Form, FormItem,
//   Tree,
//   Col,
//   Checkbox
// } from 'element-ui'
// Vue.prototype.$message = Message
// // Vue.prototype.$loading = Loading.service
// // Vue.prototype.$msgbox = MessageBox
// // Vue.prototype.$confirm = MessageBox.confirm;
// // Vue.prototype.$alert = MessageBox.alert;
// // Vue.prototype.$prompt = MessageBox.prompt

// Vue.use(Icon)
// Vue.use(Scrollbar)
// Vue.use(Dropdown)
// Vue.use(DropdownMenu)
// Vue.use(DropdownItem)
// Vue.use(Menu)
// Vue.use(Submenu)
// Vue.use(MenuItem)
// Vue.use(MenuItemGroup)
// Vue.use(Tooltip)
// Vue.use(Select)
// Vue.use(Option)
// Vue.use(DatePicker)
// Vue.use(Input)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Breadcrumb)
// Vue.use(BreadcrumbItem)
// Vue.use(Switch)
// Vue.use(Dialog)
// Vue.use(Button)
// Vue.use(ButtonGroup)
// Vue.use(Upload)
// Vue.use(Radio)
// Vue.use(RadioGroup)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Tree)
// Vue.use(Col)
// Vue.use(Checkbox)
// Vue.use(Loading.directive)

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
import multiCascader from 'multi-cascader-base-ele'
Vue.use(multiCascader)
import countTo from 'vue-count-to'
Vue.component(countTo)
