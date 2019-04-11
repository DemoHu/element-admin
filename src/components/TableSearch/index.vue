<!--
 * @Author: Siwen
 * @LastEditors: Siwen
 * @Date: 2019-03-26 14:19:03
 * @LastEditTime: 2019-04-11 09:57:11
 * @Description: 列表搜索栏
 -->
<template>
  <div class="tools">
    <!-- 时间 -->
    <el-date-picker
      v-if="showDate"
      v-model="dateValue"
      :default-time="['00:00:00', '23:59:59']"
      value-format="timestamp"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期" />
    <!-- 用户ID -->
    <el-input
      v-if="userIdTitle"
      v-model="userId"
      :placeholder="userIdTitle"
      class="search_class"
      suffix-icon="el-icon-search"
      @keyup.enter.native="searchFun()" />
    <!-- 商户ID -->
    <el-input
      v-if="MerchantIdTitle"
      :placeholder="MerchantIdTitle"
      v-model="merchantId"
      class="search_class"
      suffix-icon="el-icon-search"
      @keyup.enter.native="searchFun()" />
    <!-- 备注 -->
    <el-input
      v-if="remarkTitle"
      :placeholder="remarkTitle"
      v-model="remark"
      class="search_class"
      suffix-icon="el-icon-search"
      @keyup.enter.native="searchFun()" />
    <!-- 订单编号 -->
    <el-input
      v-if="orderNoTitle"
      v-model="orderNo"
      :placeholder="orderNoTitle"
      class="search_class"
      suffix-icon="el-icon-search"
      @keyup.enter.native="searchFun()" />
    <!-- 额外搜索框 -->
    <el-input
      v-if="valueTitle"
      v-model="value1"
      :placeholder="valueTitle"
      class="search_class"
      suffix-icon="el-icon-search"
      @keyup.enter.native="searchFun()" />
    <!-- 币种选择 -->
    <el-select v-if="showCoinArr" v-model="selectCoin" :placeholder="coinTitle">
      <el-option
        v-for="item in coinTypeArr"
        :key="item.value"
        :label="item.label"
        :value="item.value" />
    </el-select>
    <!-- 币种选择 -->
    <el-select v-if="ArrivalCoinPlaceholder" v-model="ArrivalCoin" :placeholder="ArrivalCoinPlaceholder">
      <el-option
        v-for="item in coinTypeArr"
        :key="item.value"
        :label="item.label"
        :value="item.value" />
    </el-select>
    <!-- 交易类型 -->
    <el-select v-if="transArr" v-model="transType" :placeholder="transTypePlaceholder">
      <el-option
        v-for="item in transArr"
        :key="item.value"
        :label="item.label"
        :value="item.value" />
    </el-select>
    <!-- 支付方式 -->
    <el-select v-if="paymentTypeArr" v-model="paymentType" :placeholder="paymentTypePlaceholder">
      <el-option
        v-for="item in paymentTypeArr"
        :key="item.value"
        :label="item.label"
        :value="item.value" />
    </el-select>
    <!-- 通道属性 -->
    <el-select v-if="gewayArr" v-model="geway" :placeholder="gewayTitlePlaceholder">
      <el-option
        v-for="item in gewayArr"
        :key="item.value"
        :label="item.label"
        :value="item.value" />
    </el-select>
    <!-- 状态选择 -->
    <el-select v-if="statusArr" v-model="selectStatus" :placeholder="statusPlaceholder">
      <el-option
        v-for="item in statusArr"
        :key="item.value"
        :label="item.label"
        :value="item.value" />
    </el-select>
    <el-button type="primary" size="medium" icon="el-icon-search" @click="searchFun()">搜索</el-button>
    <el-button v-if="downUrl" type="warning" size="medium" icon="el-icon-download" @click="downloadFun()">下载报表</el-button>
    <el-button v-if="showAddType" type="warning" size="medium" icon="el-icon-plus" @click="addShowDialog()">新增</el-button>
  </div>
</template>
<script>
export default {
  name: 'Tools',
  props: {
    showDate: {
      type: Boolean,
      default: true
    },
    orderNoTitle: {
      type: String,
      default: ''
    },
    valueTitle: {
      type: String,
      default: ''
    },
    remarkTitle: {
      type: String,
      default: ''
    },
    downUrl: { //下载地址
      type: String,
      default: ''
    },
    /**
     * //新增
     * 1: 新增支付类型
     * 2: 新增充值通道
     * 3: 新增通道商户
     * 4: 新增提现通道
     * 5: 新增提现通道
     */
    showAddType: {
      type: Number,
      default: null
    },
    userIdTitle: {
      type: String,
      default: ''
    },
    MerchantIdTitle: {
      type: String,
      default: ''
    },
    transArr: { //交易类型
      type: null,
      default: ''
    },
    paymentTypeArr: { //支付方式
      type: null,
      default: ''
    },
    gewayArr: { //通道属性
      type: null,
      default: ''
    },
    statusArr: { //状态类型
      type: null,
      default: ''
    },
    showCoinArr: {
      type: Boolean,
      default: false
    },
    ArrivalCoinPlaceholder: {
      type: String,
      default: ''
    },
    gewayTitlePlaceholder: {
      type: String,
      default: '选择通道'
    },
    coinTitle: {
      type: String,
      default: '支付货币'
    },
    statusPlaceholder: {
      type: String,
      default: '选择状态'
    },
    transTypePlaceholder: {
      type: String,
      default: '交易类型'
    },
    paymentTypePlaceholder: {
      type: String,
      default: '支付方式'
    },
    pageNo: {
      type: Number,
      default: 1
    },
    template: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dateValue: '', //时间
      orderNo: '', //订单编号
      value1: '', //额外搜索条件
      remark: '', //备注
      userId: '', //用户ID
      merchantId: '', //商户ID
      coinTypeArr: [ //货币列表
        { value: '0', label: '全部' },
        { value: '1', label: 'CNY' },
        { value: '2', label: 'USD' }
      ],
      ArrivalCoinArr: [ //到账货币
        { value: '0', label: '全部' },
        { value: '1', label: 'CNY' },
        { value: '2', label: 'USD' }
      ],
      ArrivalCoin: '', //到账货币选择
      selectCoin: '', //所选币种
      selectStatus: '', //所选状态
      transType: '', //所选交易类型
      paymentType: '', //所选支付类型
      geway: ''//所选通道属性
    }
  },
  created() {
    // this.getCoinTypes()
  },
  methods: {
    /**获取币种列表 */
    getCoinTypes() {
      this.$api.getCoinTypes().then(res => {
        for (const key in res) {
          this.coinTypeArr.push({ value: res[key], label: res[key] })
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    /**搜索回调 */
    searchFun() {
      const dataObj = {
        orderNo: this.orderNo, //订单编号
        value2: this.value2, //额外搜索条件
        remark: this.remark, //备注
        merchantId: this.merchantId, //商户ID
        userId: this.userId, //用户ID
        paymentType: this.paymentType, //所选支付类型
        geway: this.geway, //所选通道属性
        transType: this.transType === '0' ? '' : this.transType, //类型
        coinType: this.selectCoin === '0' ? '' : this.selectCoin, //币种
        ArrivalCoin: this.ArrivalCoin === '0' ? '' : this.ArrivalCoin, //到账货币
        status: this.selectStatus === '0' ? '' : this.selectStatus, //状态
        beginTime: !this.dateValue ? '' : this.dateValue[0] / 1000,
        endTime: !this.dateValue ? '' : this.dateValue[1] / 1000
      }
      this.$emit('toolsFun', dataObj)
    },
    /**下载报表 */
    downloadFun() {
      this.$message.closeAll()
      if (!this.dateValue) {
        this.$message.warning('请先选择折算时间')
      } else {
        this.$utils.downloadCSV(this.downUrl, {
          pageNo: this.pageNo,
          pageSize: 10,
          tradeType: this.transType,
          orderNo: this.orderNo,
          remark: this.remark,
          merchantId: this.merchantId,
          userId: this.userId,
          paymentType: this.paymentType,
          geway: this.geway,
          coinType: this.selectCoin === '0' ? '' : this.selectCoin,
          ArrivalCoin: this.ArrivalCoin === '0' ? '' : this.ArrivalCoin,
          status: this.selectStatus === '0' ? '' : this.selectStatus,
          beginTime: !this.dateValue ? '' : this.dateValue[0] / 1000,
          endTime: !this.dateValue ? '' : this.dateValue[1] / 1000
        })
      }
    },
    /**打开新增dialog */
    addShowDialog() {
      this.$emit('changeDialogVisible', { status: true, data: '' })
    }
  }
}
</script>
<style lang='scss'>
  .tools {
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    .el-date-editor {
      width: 400px;
      margin-right: 15px;
    }
    .el-input {
      width: 150px;
      margin-right: 15px;
    }
    .el-button {
      margin-right: 15px;
    }
    .el-button--primary {
      // margin-left: 30px;
    }
    .search_class {
      width: 180px;
    }
  }
  .tools_wrapper {
    .el-scrollbar__wrap {
      padding-right: 50px;
      height: 100px !important;
    }
  }
</style>
