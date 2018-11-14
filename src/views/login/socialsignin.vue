<template>
  <div class="registration-container">
    <el-form ref="registrationForm" :model="registrationForm" :rules="registrationRules" class="registration-form" auto-complete="on" label-position="left">

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="registrationForm.email"
          :placeholder="$t('registration.email')"
          name="email"
          type="email"
          auto-complete="off"
          @keyup.enter.native="handleRegistration"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="passwordType"
          v-model="registrationForm.password"
          :placeholder="$t('registration.password')"
          name="password"
          auto-complete="off"
          @keyup.enter.native="handleRegistration" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item prop="password_confirm">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="passwordConfirmType"
          v-model="registrationForm.password_confirm"
          :placeholder="$t('registration.password_confirm')"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleRegistration" />
        <span class="show-pwd" @click="showPwdConfirm">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item prop="name">
        <span class="svg-container">
          <svg-icon icon-class="form" />
        </span>
        <el-input
          v-model="registrationForm.name"
          :placeholder="$t('registration.name')"
          type="text"
          name="name"
          auto-complete="off"
          @keyup.enter.native="handleRegistration" />
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegistration">{{ $t('registration.registration') }}</el-button>
    </el-form>
  </div>
</template>

<script>
// import openWindow from '@/utils/openWindow'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { isValidateEmail } from '../../utils/validate'
export default {
  name: 'SocialSignin',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!isValidateEmail(value)) {
        callback(new Error('Vui lòng điền Email của bạn'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('Mật khẩu phải có chiều dài lớn hơn 6 ký tự'))
      } else {
        callback()
      }
    }
    const validatePasswordConfirm = (rule, value, callback) => {
      if (value !== this.registrationForm.password) {
        callback(new Error('Mật khẩu nhập lại không đúng'))
      } else {
        callback()
      }
    }
    return {
      registrationForm: {
        email: 'dauminhquantlu@gmail.com',
        password: 'admin123456',
        password_confirm: 'admin123456',
        name: 'Quan Dau'
      },
      registrationRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        password: [{ required: true, trigger: 'change', validator: validatePassword }],
        password_confirm: [{ required: true, trigger: 'change', validator: validatePasswordConfirm }]
      },
      loading: true,
      passwordType: 'password',
      passwordConfirmType: 'password'
    }
  },
  methods: {
    handleRegistration() {
      this.$refs.registrationForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Registration', this.registrationForm).then(() => {
            this.loading = false
            this.$notify({
              title: this.$t('message.success'),
              message: 'Đăng ký thành công',
              type: 'success',
              duration: 2000
            })
            this.$emit('doneRegistration', {
              email: this.registrationForm.email
            })
          }).catch((error) => {
            console.log(error)
            let message = ''
            if (error.response !== undefined) {
              if (error.response.data.errors.email !== undefined) {
                if (error.response.data.errors.email.length > 0) {
                  error.response.data.errors.email.forEach(item => {
                    message += item + '\n'
                  })
                }
              }
            } else {
              message = error.response.data.message
            }
            this.$notify({
              title: this.$t('message.error'),
              message: message,
              type: 'error',
              duration: 10000
            })
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    showPwdConfirm() {
      if (this.passwordConfirmType === 'password') {
        this.passwordConfirmType = ''
      } else {
        this.passwordConfirmType = 'password'
      }
    },
    wechatHandleClick(thirdpart) {
      alert('ok')
      // this.$store.commit('SET_AUTH_TYPE', thirdpart)
      // const appid = 'xxxxx'
      // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
      // const url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_registration#wechat_redirect'
      // openWindow(url, thirdpart, 540, 540)
    },
    handleCreate() {
      this.$nextTick(() => {
        this.$refs['registrationForm'].clearValidate()
      })
    },
    tencentHandleClick(thirdpart) {
      alert('ok')
      // this.$store.commit('SET_AUTH_TYPE', thirdpart)
      // const client_id = 'xxxxx'
      // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
      // const url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri
      // openWindow(url, thirdpart, 540, 540)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .social-signup-container {
    .sign-btn {
      display: inline-block;
      cursor: pointer;
    }
    .icon {
      color: #fff;
      font-size: 24px;
      margin-top: 8px;
    }
    .wx-svg-container,
    .qq-svg-container,
    .fb-svg-container {
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 4px;
      margin-bottom: 20px;
      margin-right: 5px;
      border: 1px solid rgba(149,146,145,0.59);
    }
    .wx-svg-container {
      background-color: #8ada53;
    }
    .qq-svg-container {
      background-color: #6BA2D6;
      margin-left: 50px;
    }
    .fb-svg-container{
      background-color: #ffffff;
      margin-left: 50px;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;
  /* reset element-ui css */
  .registration-container {
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
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #4AB7BD inset !important;
          -webkit-text-fill-color: black !important;
        }
        border-bottom: 1px solid #ffffff;
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: #4AB7BD;
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .registration-container {
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
      color: white;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
      .set-language {
        color: #fff;
        position: absolute;
        top: 5px;
        right: 0px;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: #ffffff;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
