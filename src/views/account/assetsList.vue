<!--
 * @Author: Siwen
 * @LastEditors: Siwen
 * @Date: 2019-04-10 15:32:28
 * @LastEditTime: 2019-04-10 16:07:20
 * @Description: 资产列表
 -->
<template>
  <div class="assets_list">
    <table-search
      :show-date="false"
      downUrl="/api"
      merchant-id-title="商户ID"
      @toolsFun="getToolsData" />
    <el-table v-loading="loading" :data="tableData">
      <el-table-column prop="id" label="商户ID"></el-table-column>
      <el-table-column prop="dayLimit" label="CC可用">
        <template slot-scope="scope">
          <span>{{ scope.row.available | comdify }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dayLimit" label="CC冻结">
        <template slot-scope="scope">
          <span>{{ scope.row.freeze | comdify }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dayLimit" label="CC总量">
        <template slot-scope="scope">
          <span>{{ scope.row.total | comdify }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dayLimit" label="资产总估值">
        <template slot-scope="scope">
          <span>{{ scope.row.assetsTotal | comdify }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination :page-no="pageNo" :next="next" :page-loading="pageLoading" @pageFunc="getPageFunc" />
  </div>
</template>
<script>
import tableSearch from '@/components/TableSearch'
import pagination from '@/components/Pagination'
export default {
  name: 'AssetsList',
  components: {
    tableSearch,
    pagination
  },
  data() {
    return {
      tableData: [
        { id: 232, available: '2001', freeze: '1200', total: '200', assetsTotal: '5000' },
        { id: 232, available: '2001', freeze: '1200', total: '200', assetsTotal: '5000' },
        { id: 232, available: '2001', freeze: '1200', total: '200', assetsTotal: '5000' },
        { id: 232, available: '2001', freeze: '1200', total: '200', assetsTotal: '5000' },
        { id: 232, available: '2001', freeze: '1200', total: '200', assetsTotal: '5000' },
        { id: 232, available: '2001', freeze: '1200', total: '200', assetsTotal: '5000' },
        { id: 232, available: '2001', freeze: '1200', total: '200', assetsTotal: '5000' },
        { id: 232, available: '2001', freeze: '1200', total: '200', assetsTotal: '5000' },
        { id: 232, available: '2001', freeze: '1200', total: '200', assetsTotal: '5000' },
        { id: 232, available: '2001', freeze: '1200', total: '200', assetsTotal: '5000' },
        { id: 232, available: '2001', freeze: '1200', total: '200', assetsTotal: '5000' },
        { id: 232, available: '2001', freeze: '1200', total: '200', assetsTotal: '5000' }
      ],
      dataObj: {},
      loading: false,
      pageNo: 1,
      next: false,
      pageLoading: false
    }
  },
  created() {},
  methods: {
    /** 打开新增 */
    changeDialogVisible({ status, data }) {
      this.dialogVisible = status
      console.log(data)
    },
    /**搜索回调 */
    getToolsData(dataObj) {
      this.pageNo = 1
      this.dataObj = dataObj
      // this.next = this.tableData.length === 10 ? true : false
      // this.getDetailsList()
    },
    /**分页 */
    getPageFunc(pageNo) {
      this.pageNo = pageNo
      console.log(this.pageNo)
      // this.getOrderList(this.pageNo)
    },
    /**停用 */
    suspend(id) {
      console.log(id)
    },
    /**编辑 */
    edit(id) {
      console.log(id)
    }
  }
}
</script>
<style lang='scss'>
.assets_list {
  font-size: 30px;
  color: #333;
}
</style>
