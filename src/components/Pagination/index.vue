<!--
 * @Author: Siwen
 * @LastEditors: Siwen
 * @Date: 2019-03-26 14:20:12
 * @LastEditTime: 2019-04-08 14:34:45
 * @Description: 列表分页
 -->
<template>
  <div class="page_box">
    <el-button-group>
      <el-button v-show="pageNo > 1" type="text" icon="el-icon-arrow-left" @click="pagePrevious">上一页</el-button>
      <el-button v-show="next" type="text" @click="pageNext">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </el-button-group>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    pageNo: {
      type: Number,
      default: 1
    },
    next: {
      type: Boolean,
      default: false
    },
    pageLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    /**下一页 */
    pageNext() {
      !this.pageLoading && this.$emit('pageFunc', this.pageNo + 1)
    },
    /**上一页 */
    pagePrevious() {
      !this.pageLoading && this.$emit('pageFunc', this.pageNo - 1)
    }
  }
}
</script>
<style lang='scss'>
.page_box {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  .el-button--text {
    padding-right: 15px;
  }
}
</style>
