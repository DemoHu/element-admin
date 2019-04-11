<!--
 * @Author: Siwen
 * @LastEditors: Siwen
 * @Date: 2019-04-10 15:43:23
 * @LastEditTime: 2019-04-10 16:42:34
 * @Description: 内充订单
 -->
<template>
  <div class="neichong_list">
    <table-search
      :show-coin-arr="false"
      :trans-arr="transType"
      :status-arr="statusArr"
      coin-title="充值货币"
      trans-type-placeholder="充值通道"
      merchant-id-title="商户ID"
      order-no-title="充值单号"
      downUrl="/api"
      @toolsFun="getToolsData"
      @changeDialogVisible="changeDialogVisible" />
    <el-table v-loading="loading" :data="tableData">
      <el-table-column prop="orderId" label="充值单号"></el-table-column>
      <el-table-column prop="createTime" label="下单时间" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | formatDate('yyyy-MM-dd hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="merchantId" label="商户ID"></el-table-column>
      <el-table-column prop="rechargeGeway" label="充值通道"></el-table-column>
      <el-table-column prop="coinType" label="充值货币"></el-table-column>
      <el-table-column prop="rechargeNumber" label="充值数量"></el-table-column>
      <el-table-column prop="serveFee" label="服务费"></el-table-column>
      <el-table-column prop="arrivalNumber" label="到账数量"></el-table-column>
      <el-table-column prop="total" label="转账总额"></el-table-column>
      <el-table-column prop="status" label="充值状态">
        <template slot-scope="scope">
          <span :class="{'suspend': scope.row.status === '2'}">{{ scope.row.statusDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="操作" width="150">
        <template slot-scope="scope">
          <el-button :disabled="false" type="warning" size="small" @click="examine(scope.row.orderId)">审核</el-button>
          <el-button :disabled="false" type="primary" size="small" @click="remark(scope.row.orderId)">备注</el-button>
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
  name: 'NeichongList',
  components: {
    tableSearch,
    pagination
  },
  data() {
    return {
      statusArr: [
        { value: '0', label: '全部' },
        { value: '1', label: '审核中' },
        { value: '2', label: '已完成' },
        { value: '3', label: '已取消' }
      ],
      transType: [
        { value: '0', label: '全部' },
        { value: '1', label: '富友' },
        { value: '2', label: '友富' }
      ],
      tableData: [
        { orderId: '23467238239', createTime: '1388307216', merchantId: '738949', rechargeGeway: '富友代付', coinType: 'CC', rechargeNumber: '100000', serveFee: '600', arrivalNumber: '90400', total: '100000', status: '1', statusDesc: '审核中' },
        { orderId: '23467238239', createTime: '1388307216', merchantId: '738949', rechargeGeway: '富友代付', coinType: 'CC', rechargeNumber: '100000', serveFee: '600', arrivalNumber: '90400', total: '100000', status: '1', statusDesc: '审核中' },
        { orderId: '23467238239', createTime: '1388307216', merchantId: '738949', rechargeGeway: '富友代付', coinType: 'CC', rechargeNumber: '100000', serveFee: '600', arrivalNumber: '90400', total: '100000', status: '1', statusDesc: '审核中' },
        { orderId: '23467238239', createTime: '1388307216', merchantId: '738949', rechargeGeway: '富友代付', coinType: 'CC', rechargeNumber: '100000', serveFee: '600', arrivalNumber: '90400', total: '100000', status: '1', statusDesc: '审核中' },
        { orderId: '23467238239', createTime: '1388307216', merchantId: '738949', rechargeGeway: '富友代付', coinType: 'CC', rechargeNumber: '100000', serveFee: '600', arrivalNumber: '90400', total: '100000', status: '1', statusDesc: '审核中' },
        { orderId: '23467238239', createTime: '1388307216', merchantId: '738949', rechargeGeway: '富友代付', coinType: 'CC', rechargeNumber: '100000', serveFee: '600', arrivalNumber: '90400', total: '100000', status: '1', statusDesc: '审核中' },
        { orderId: '23467238239', createTime: '1388307216', merchantId: '738949', rechargeGeway: '富友代付', coinType: 'CC', rechargeNumber: '100000', serveFee: '600', arrivalNumber: '90400', total: '100000', status: '1', statusDesc: '审核中' },
        { orderId: '23467238239', createTime: '1388307216', merchantId: '738949', rechargeGeway: '富友代付', coinType: 'CC', rechargeNumber: '100000', serveFee: '600', arrivalNumber: '90400', total: '100000', status: '1', statusDesc: '审核中' },
        { orderId: '23467238239', createTime: '1388307216', merchantId: '738949', rechargeGeway: '富友代付', coinType: 'CC', rechargeNumber: '100000', serveFee: '600', arrivalNumber: '90400', total: '100000', status: '1', statusDesc: '审核中' },
        { orderId: '23467238239', createTime: '1388307216', merchantId: '738949', rechargeGeway: '富友代付', coinType: 'CC', rechargeNumber: '100000', serveFee: '600', arrivalNumber: '90400', total: '100000', status: '1', statusDesc: '审核中' },
        { orderId: '23467238239', createTime: '1388307216', merchantId: '738949', rechargeGeway: '富友代付', coinType: 'CC', rechargeNumber: '100000', serveFee: '600', arrivalNumber: '90400', total: '100000', status: '1', statusDesc: '审核中' }
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
    /**审核 */
    examine(orderId) {
      console.log(orderId)
      this.$confirm('请查验该支付商户是否已完成全款转账并且，我方已完成代充', '审核内充订单', {
        distinguishCancelAndClose: true,
        confirmButtonText: '审核通过',
        cancelButtonText: '取消订单',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '点击了审核通过!'
        })
      }).catch((action) => {
        if (action === 'cancel') {
          this.$message({
            type: 'info',
            message: '点击了取消订单'
          })
        } else {
          console.log('关闭')
        }
      })
    },
    /**备注 */
    remark(orderId) {
      console.log(orderId)
      this.$prompt('请输入订单备注', '订单备注', {
        distinguishCancelAndClose: true,
        confirmButtonText: '保存',
        cancelButtonText: '取消',
        inputValidator(value) {
          if (!value) {
            return false
          }
        },
        inputErrorMessage: '请输入订单备注'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '已设置: ' + value
        })
      }).catch(() => {})
    }
  }
}
</script>
<style lang='scss'>
.neichong_list {
  font-size: 30px;
  color: #333;
}
</style>

