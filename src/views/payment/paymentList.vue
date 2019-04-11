<!--
 * @Author: Siwen
 * @LastEditors: Siwen
 * @Date: 2019-03-27 11:40:03
 * @LastEditTime: 2019-04-10 18:19:48
 * @Description: 支付方式管理
 -->
<template>
  <div class="payment_list">
    <table-search
      :show-coin-arr="true"
      :show-date="false"
      :show-add-type="1"
      :status-arr="statusArr"
      value-title="支付方式名称"
      @toolsFun="getToolsData"
      @changeDialogVisible="changeDialogVisible" />
    <el-table v-loading="loading" :data="tableData">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="名称"></el-table-column>
      <el-table-column prop="coinType" label="支付货币"></el-table-column>
      <el-table-column prop="minLimit" label="单笔限额">
        <template slot-scope="scope">
          <span>{{ scope.row.minLimit }}-{{ scope.row.maxLimit }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dayLimit" label="每日上限">
        <template slot-scope="scope">
          <span>{{ scope.row.dayLimit | comdify }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span :class="{'suspend': scope.row.status === '2'}">{{ scope.row.statusDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="操作" width="150">
        <template slot-scope="scope">
          <el-button :disabled="false" type="warning" size="small" @click="suspend(scope.row.id)">停用</el-button>
          <el-button :disabled="false" type="primary" size="small" @click="edit(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :page-no="pageNo" :next="next" :page-loading="pageLoading" @pageFunc="getPageFunc" />
    <add-dialog
      v-if="dialogVisible"
      :form-title="formTitle"
      :rule-form-info="ruleFormInfo"
      @changeDialogVisible="changeDialogVisible">
    </add-dialog>
  </div>
</template>
<script>
import tableSearch from '@/components/TableSearch'
import pagination from '@/components/Pagination'
import addDialog from '@/components/addDialog'
export default {
  name: 'PaymentList',
  components: {
    tableSearch,
    pagination,
    addDialog
  },
  data() {
    return {
      dialogVisible: false,
      ruleFormInfo: {},
      formTitle: {
        title: '新增支付方式',
        name: '支付方式名称',
        coin: '支付货币',
        limit: '单笔限额',
        everyday: '每日上限',
        remark: '备注'
      },
      statusArr: [
        { value: '0', label: '全部' },
        { value: '1', label: '正常' },
        { value: '2', label: '停用' }
      ],
      tableData: [
        { id: 232, title: '微信扫码', coinType: 'CNY', minLimit: '200', maxLimit: '5000', dayLimit: '1000000', status: '1', statusDesc: '正常' },
        { id: 232, title: '微信扫码', coinType: 'CNY', minLimit: '200', maxLimit: '5000', dayLimit: '1000000', status: '1', statusDesc: '正常' },
        { id: 232, title: '支付宝扫码', coinType: 'CNY', minLimit: '200', maxLimit: '5000', dayLimit: '1000000', status: '2', statusDesc: '停用' },
        { id: 232, title: '微信扫码', coinType: 'CNY', minLimit: '200', maxLimit: '5000', dayLimit: '1000000', status: '1', statusDesc: '正常' },
        { id: 232, title: '支付宝红包', coinType: 'CNY', minLimit: '200', maxLimit: '5000', dayLimit: '1000000', status: '1', statusDesc: '正常' },
        { id: 232, title: '农业银行', coinType: 'CNY', minLimit: '200', maxLimit: '5000', dayLimit: '1000000', status: '1', statusDesc: '正常' },
        { id: 232, title: '微信扫码', coinType: 'CNY', minLimit: '200', maxLimit: '5000', dayLimit: '1000000', status: '2', statusDesc: '停用' },
        { id: 232, title: '支付宝扫码2（港币）', coinType: 'HKD', minLimit: '200', maxLimit: '5000', dayLimit: '1000000', status: '1', statusDesc: '正常' },
        { id: 232, title: '微信扫码', coinType: 'CNY', minLimit: '200', maxLimit: '5000', dayLimit: '1000000', status: '1', statusDesc: '正常' },
        { id: 232, title: '微信扫码', coinType: 'CNY', minLimit: '200', maxLimit: '5000', dayLimit: '1000000', status: '1', statusDesc: '正常' }
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
      if (data === 'cancel') {
        this.ruleFormInfo = {}
      }
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
      this.ruleFormInfo = {
        name: id, // 名称
        paymentType: '', //支付方式
        passageway: '', //通道
        coin: '', //支付货币
        ArrivalCoin: '', //到账货币
        minLimit: '', //单笔最小限额
        maxLimit: '', //单笔最大限额
        everyDayLimit: '', //每日上限
        geway: '', //通道属性
        overtime: '', //超时时间
        rate: '', //费率
        gewayFee: '', //通道服务费
        remark: '123213' //备注
      }
      this.changeDialogVisible({ status: true })
    }
  }
}
</script>
<style lang='scss'>
.payment_list {
  font-size: 30px;
}
</style>
