<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title"></h3>
      <el-form-item prop="phone">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-enter-number
          v-model="loginForm.phone"
          name="phone"
          type="number"
          auto-complete="off"
          placeholder="请输入登录手机号"
          oninput="if(value.length>11)value=value.slice(0,11)" />
      </el-form-item>
      <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-enter-number
          v-model="loginForm.code"
          type="number"
          name="code"
          auto-complete="off"
          placeholder="请输入验证码"
          oninput="if(value.length>6)value=value.slice(0,6)"
          @keyup.enter.native="handleLogin" />
        <el-button :disabled="disabledCode" class="get_code" type="text" @click="getCode">{{ codeState }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCode } from '@/mixins'

export default {
  name: 'Login',
  mixins: [getCode],
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!this.$utils.isPhone(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(`请输入6位数字短信验证码`))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        phone: '',
        code: ''
      },
      loginRules: {
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        code: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      loading: false
    }
  },
  created() {},
  methods: {
    /**获取验证码 */
    getCode() {
      this.$message.closeAll()
      if (!this.$utils.isPhone(this.loginForm.phone) || !this.loginForm.phone) {
        this.$message.error(`请先输入正确的手机号`)
      } else {
        this.getCodeTime().then(res => {
          this.$api.getCode(123, this.loginForm.phone)
        })
      }
    },
    /**登录 */
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.getUserInfo().then(res => {
            this.loading = false
            this.$store.commit('SET_LOGIN', true) //更新登录状态
            this.$store.commit('SET_INFO', res) //更新登录状态
            this.$router.push({ path: '/' })
          }).catch(err => {
            this.loading = false
            this.$store.commit('SET_LOGIN', false) //更新登录状态
            this.$store.commit('SET_INFO', {})
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    width: 200px;
    height: 86px;
    background-image: url('../../assets/images/logo.png');
    background-repeat:no-repeat;
    background-position:center;
    margin: 50px auto;
    @media screen and (max-height: 750px) {
      margin-top: 0;
    }
  }
  .get_code {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    user-select: none;
  }
}
</style>
