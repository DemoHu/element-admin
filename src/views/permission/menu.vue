<!--
 * @Author: Siwen
 * @LastEditors: Siwen
 * @Date: 2019-04-08 10:14:50
 * @LastEditTime: 2019-04-10 15:30:58
 * @Description: 权限管理-菜单管理
 -->
<template>
  <div class="permission_menu">
    权限管理-菜单管理
    <el-multi-cascader
      :options="options"
      class="multi-cascader"
      popper-class="multi_cascader"
      placeholder="请设置充值配置"
      multiple
      select-children
      only-out-put-leaf-node
      change-on-select
      show-all-levels
      separator="-"
      v-model="selectedOptions"
      @change="change">
    </el-multi-cascader>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      options: [
        {
          label: '微信扫码',
          value: '1',
          children: [
            { label: '微信扫码1', value: '1-1',
              children: [
                { label: '微信扫码1-1-1', value: '1-1-1' },
                { label: '微信扫码1-1-2', value: '1-1-2' },
                { label: '微信扫码1-1-3', value: '1-1-3' }
              ]
            },
            { label: '微信扫码2', value: '1-2',
              children: [
                { label: '微信扫码1-2-1', value: '1-2-1' },
                { label: '微信扫码1-2-2', value: '1-2-2' },
                { label: '微信扫码1-2-3', value: '1-2-3' }
              ]
            },
            { label: '微信扫码3', value: '1-3',
              children: [
                { label: '微信扫码1-3-1', value: '1-3-1' },
                { label: '微信扫码1-3-2', value: '1-3-2' },
                { label: '微信扫码1-3-3', value: '1-3-3' }
              ]
            }
          ]
        },
        {
          label: '支付宝扫码',
          value: '2',
          children: [
            { label: '支付宝扫码1', value: '2-1',
              children: [
                { label: '支付宝扫码2-1-1', value: '2-1-1' },
                { label: '支付宝扫码2-1-2', value: '2-1-2' },
                { label: '支付宝扫码2-1-3', value: '2-1-3' }
              ]
            },
            { label: '支付宝扫码2', value: '2-2',
              children: [
                { label: '支付宝扫码2-2-1', value: '2-2-1' },
                { label: '支付宝扫码2-2-2', value: '2-2-2' },
                { label: '支付宝扫码2-2-3', value: '2-2-3' }
              ]
            },
            { label: '支付宝扫码3', value: '2-3',
              children: [
                { label: '支付宝扫码2-3-1', value: '2-3-1' },
                { label: '支付宝扫码2-3-2', value: '2-3-2' },
                { label: '支付宝扫码2-3-3', value: '2-3-3' }
              ]
            }
          ]
        },
        {
          label: '银行扫码',
          value: '3',
          children: [
            { label: '银行扫码1', value: '3-1',
              children: [
                { label: '银行扫码3-1-1', value: '3-1-1' },
                { label: '银行扫码3-1-2', value: '3-1-2' },
                { label: '银行扫码3-1-3', value: '3-1-3' }
              ]
            },
            { label: '银行扫码2', value: '3-2',
              children: [
                { label: '银行扫码3-2-1', value: '3-2-1' },
                { label: '银行扫码3-2-2', value: '3-2-2' },
                { label: '银行扫码3-2-3', value: '3-2-3' }
              ]
            },
            { label: '银行扫码3', value: '3-3',
              children: [
                { label: '银行扫码3-3-1', value: '3-3-1' },
                { label: '银行扫码3-3-2', value: '3-3-2' },
                { label: '银行扫码3-3-3', value: '3-3-3' }
              ]
            }
          ]
        }
      ],
      selectedOptions: []
    }
  },
  created() {},
  methods: {
    change() {
      console.log(this.selectedOptions)
    }
  }
}
</script>
<style lang='scss'>
.multi-cascader {
  min-width: 1000px;
  // .el-select-dropdown__item {
  //   ul {
  //     padding-inline-start: 0px;
  //     .li-style {
  //       height: 40px !important;
  //       line-height: 16px !important;
  //       .li-label-style {
  //         .el-checkbox {
  //           margin-right: 0;
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>
