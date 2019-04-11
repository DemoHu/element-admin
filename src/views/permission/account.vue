<!--
 * @Author: Siwen
 * @LastEditors: Siwen
 * @Date: 2019-04-08 10:14:50
 * @LastEditTime: 2019-04-08 13:43:14
 * @Description: 权限管理-账号管理
 -->
<template>
  <div class="permission_account">
    权限管理-账号管理
    <div class="tree_box">
      <el-tree
        ref="tree"
        :data="permissionAccount"
        :props="defaultProps"
        :default-expand-all="true"
        :check-on-click-node="true"
        node-key="id"
        show-checkbox>
      </el-tree>
    </div>
    <el-button @click="getCheckedKeys">通过 key 获取</el-button>
  </div>
</template>

<script>
export default {
  name: 'Account',
  data() {
    return {
      permissionAccount: [
        {
          id: '1',
          name: '权限管理',
          status: false,
          children: [
            { id: '1-1', name: '账号管理', status: false },
            { id: '1-2', name: '菜单管理', status: false }
          ]
        },
        {
          id: '2',
          name: '充值管理',
          status: false,
          children: [
            { id: '2-1', name: '充值通道列表', status: false },
            { id: '2-2', name: '通道商户列表', status: false }
          ]
        },
        {
          id: '3',
          name: '单个页面',
          status: false
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {},
  methods: {
    /**更新tree */
    getCheckedKeys() {
      this.initTree()
      const idArr = this.$refs.tree.getCheckedKeys()
      idArr.forEach(id => {
        this.settingTree(id)
      })
      console.log(this.permissionAccount)
    },
    /**设置权限 */
    settingTree(id) {
      this.permissionAccount.forEach(v => {
        if (id === v.id) {
          v.status = true
        }
        if (v.children) {
          v.children.forEach(vid => {
            if (id === vid.id) {
              vid.status = true
            }
          })
        }
      })
    },
    /**初始化tree状态 */
    initTree() {
      this.permissionAccount.forEach(v => {
        v.status = false
        if (v.children) {
          v.children.forEach(vid => {
            vid.status = false
          })
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
