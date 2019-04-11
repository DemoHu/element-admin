<template>
  <div class="add_dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      :title="formTitle.title"
      width="35%"
      top="60px"
      @close="closeDialogVisible">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item v-if="formTitle.name" :label="formTitle.name" required prop="name">
          <el-input v-model="ruleForm.name" :placeholder="`请输入${formTitle.name}`"></el-input>
        </el-form-item>
        <el-form-item v-if="formTitle.name2" :label="formTitle.name2" required prop="name2">
          <el-input v-model="ruleForm.name2" :placeholder="`请输入${formTitle.name2}`"></el-input>
        </el-form-item>
        <el-form-item v-if="formTitle.paymentType" :label="formTitle.paymentType" prop="paymentType">
          <el-select v-model="ruleForm.paymentType" :placeholder="`请选择${formTitle.paymentType}`" @change="changePayment">
            <el-option
              v-for="item in paymentTypeArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="formTitle.passageway" :label="formTitle.passageway" prop="passageway">
          <el-select v-model="ruleForm.passageway" multiple :placeholder="`请选择${formTitle.passageway}`" @focus="selectFocus" @change="changePassageway">
            <el-option
              v-for="item in passagewayArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="formTitle.coin" :label="formTitle.coin" prop="coin">
          <el-select v-model="ruleForm.coin" :placeholder="`请选择${formTitle.coin}`" @change="changeCoin">
            <el-option
              v-for="item in coinArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="formTitle.ArrivalCoin" :label="formTitle.ArrivalCoin" prop="ArrivalCoin">
          <el-select v-model="ruleForm.ArrivalCoin" :placeholder="`请选择${formTitle.ArrivalCoin}`">
            <el-option
              v-for="item in ArrivalCoinArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="formTitle.limit" :label="formTitle.limit" required>
          <div>
            <div class="radio_box">
              <el-radio v-model="limitRadio" label="1">不限</el-radio>
              <el-radio v-model="limitRadio" label="2">设置限额</el-radio>
            </div>
            <div class="ipt_box" v-if="limitRadio === '2'">
              <el-col :span="10">
                <el-form-item prop="minLimit">
                  <el-input v-model="ruleForm.minLimit" :placeholder="`请输入最小${formTitle.limit}`" type="number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" class="line">-</el-col>
              <el-col :span="10">
                <el-form-item prop="maxLimit">
                  <el-input v-model="ruleForm.maxLimit" :placeholder="`请输入最大${formTitle.limit}`" type="number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" class="company">{{ company }}</el-col>
            </div>
          </div>
        </el-form-item>
        <el-form-item v-if="formTitle.everyday" :label="formTitle.everyday" required>
          <div>
            <div class="radio_box">
              <el-radio v-model="everydayRadio" label="1">不限</el-radio>
              <el-radio v-model="everydayRadio" label="2">设置限额</el-radio>
            </div>
            <div class="ipt_box" v-if="everydayRadio === '2'">
              <el-col :span="22">
                <el-form-item prop="everyDayLimit">
                  <el-input v-model="ruleForm.everyDayLimit" :placeholder="`请输入${formTitle.everyday}`" type="number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" class="company">{{ company }}</el-col>
            </div>
          </div>
        </el-form-item>
        <el-form-item v-if="formTitle.geway" :label="formTitle.geway" prop="geway">
          <el-select v-model="ruleForm.geway" :placeholder="`请选择${formTitle.geway}`" @change="changeGeway">
            <el-option
              v-for="item in gewayArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="formTitle.overtime" :label="formTitle.overtime" prop="overtime">
          <el-col :span="22">
            <el-input v-model="ruleForm.overtime" :placeholder="`请输入${formTitle.overtime}`" type="number"></el-input>
          </el-col>
          <el-col :span="2" class="company">分钟</el-col>
        </el-form-item>
        <el-form-item v-if="formTitle.rate" :label="formTitle.rate" prop="rate">
          <el-col :span="22">
            <el-input v-model="ruleForm.rate" :placeholder="`请输入${formTitle.rate}`" type="number"></el-input>
          </el-col>
          <el-col :span="2" class="company">%</el-col>
        </el-form-item>
        <el-form-item v-if="formTitle.gewayFee" :label="formTitle.gewayFee" required>
          <div>
            <div class="radio_box">
              <el-radio v-model="gewayFeeRadio" label="1">按比例</el-radio>
              <el-radio v-model="gewayFeeRadio" label="2">按固定金额</el-radio>
            </div>
            <div class="ipt_box">
              <el-col :span="22">
                <el-form-item prop="gewayFee">
                  <el-input v-model="ruleForm.gewayFee" :placeholder="`请输入${formTitle.gewayFee}`" type="number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" class="company">
                <span v-if="gewayFeeRadio === '1'">%</span>
                <span v-if="gewayFeeRadio === '2'">{{ company }} /笔</span>
              </el-col>
            </div>
          </div>
        </el-form-item>
        <el-form-item v-if="formTitle.other" :label="formTitle.other" prop="other">
          <el-input v-model="ruleForm.other" :placeholder="`请输入${formTitle.other}`" type="textarea"></el-input>
        </el-form-item>
        <el-form-item v-if="formTitle.remark" :label="formTitle.remark" prop="remark">
          <el-input v-model="ruleForm.remark" :placeholder="`请输入${formTitle.remark}`" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn_box">
        <el-button class="cancel" @click="resetForm('ruleForm')">取消</el-button>
        <el-button class="submit" type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddDialog',
  props: {
    ruleFormInfo: {
      type: null,
      default: ''
    },
    formTitle: {
      type: null,
      default: ''
    },
    paymentTypeArrProps: {
      type: null,
      default: ''
    },
    passagewayArrProps: {
      type: null,
      default: ''
    },
    gewayArrProps: {
      type: null,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: true,
      company: '',
      limitRadio: '1',
      everydayRadio: '1',
      gewayFeeRadio: '1',
      ruleForm: {
        name: '', // 名称
        name2: '', // 名称
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
        gewayFee: '', //提现通道费率
        other: '', //备用框
        remark: '' //备注
      },
      coinArr: [
        { label: '人民币', value: 1, company: 'CNY' },
        { label: '美元', value: 2, company: 'USD' },
        { label: '港币', value: 3, company: 'HKD' }
      ],
      ArrivalCoinArr: [
        { label: '人民币', value: 1, company: 'CNY' },
        { label: '美元', value: 2, company: 'USD' },
        { label: '港币', value: 3, company: 'HKD' }
      ]
    }
  },
  computed: {
    rules() {
      const rules = {
        name: [
          { required: true, message: `请输入${this.formTitle.name}`, trigger: 'blur' }
        ],
        name2: [
          { required: true, message: `请输入${this.formTitle.name2}`, trigger: 'blur' }
        ],
        paymentType: [
          { required: true, message: `请选择${this.formTitle.paymentType}`, trigger: 'change' }
        ],
        passageway: [
          { required: true, message: `请选择${this.formTitle.passageway}`, trigger: 'blur' }
        ],
        coin: [
          { required: true, message: `请选择${this.formTitle.coin}`, trigger: 'change' }
        ],
        ArrivalCoin: [
          { required: true, message: `请选择${this.formTitle.ArrivalCoin}`, trigger: 'change' }
        ],
        minLimit: [
          { required: true, message: `请输入最小${this.formTitle.limit}`, trigger: 'blur' }
        ],
        maxLimit: [
          { required: true, message: `请输入最大${this.formTitle.limit}`, trigger: 'blur' }
        ],
        everyDayLimit: [
          { required: true, message: `请输入最小${this.formTitle.everyday}`, trigger: 'blur' }
        ],
        geway: [
          { required: true, message: `请选择${this.formTitle.geway}`, trigger: 'change' }
        ],
        overtime: [
          { required: true, message: `请输入${this.formTitle.overtime}`, trigger: 'blur' }
        ],
        rate: [
          { required: true, message: `请输入${this.formTitle.rate}`, trigger: 'blur' }
        ],
        gewayFee: [
          { required: true, message: `请输入${this.formTitle.gewayFee}`, trigger: 'blur' }
        ],
        other: [
          { required: true, message: `请输入${this.formTitle.other}`, trigger: 'blur' }
        ],
        remark: [
          { required: true, message: `请输入${this.formTitle.remark}`, trigger: 'blur' }
        ]
      }
      return rules
    },
    paymentTypeArr() {
      return this.paymentTypeArrProps.slice(1, this.paymentTypeArrProps.length)
    },
    passagewayArr() {
      return this.passagewayArrProps.slice(1, this.passagewayArrProps.length)
    },
    gewayArr() {
      return this.gewayArrProps.slice(1, this.gewayArrProps.length)
    }
  },
  created() {
    if (Object.keys(this.ruleFormInfo).length > 0) {
      this.ruleForm = this.ruleFormInfo
      this.formTitle.title = this.formTitle.title.replace('新增', '编辑')
    } else {
      this.formTitle.title = this.formTitle.title.replace('编辑', '新增')
    }
  },
  methods: {
    /**提交 */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('changeDialogVisible', { status: true, data: this.ruleForm })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**取消 */
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('changeDialogVisible', { status: false, data: 'cancel' })
    },
    /**关闭dialog */
    closeDialogVisible() {
      this.$emit('changeDialogVisible', { status: false, data: 'cancel' })
    },
    /**选择货币 */
    changeCoin(value) {
      this.ruleForm.coin = value
      this.coinArr.forEach(v => {
        if (value === v.value) {
          this.company = v.company
        }
      })
    },
    /**选择支付方式 */
    changePayment(value) {
      this.ruleForm.paymentType = value
    },
    /**选择通道 */
    changePassageway(value) {
      this.ruleForm.passageway = value
    },
    selectFocus() { // tag:解决element 表单验证select开启多选触发验证的BUG
      this.rules.passageway[0].trigger = 'change'
    },
    /**选择通道属性 */
    changeGeway(value) {
      this.ruleForm.geway = value
    }
  }
}
</script>
<style lang='scss' scoped>
  .add_dialog {
    .line,.company {
      text-align: center;
    }
    .el-select {
      width: 100%;
    }
    .btn_box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 50px;
      .submit,.cancel {
        width: 45%;
      }
    }
  }
</style>
