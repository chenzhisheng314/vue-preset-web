<template>
  <div class="of-login">
    <div class="login-box clear-both">
      <div
        class="left"
        :style="{backgroundImage:`url(` + require(`@/assets/images/base/login-bg.jpg`) + `)`}"
      >
        <div class="of-logo" @click="goto('/')">
          <img src="@/assets/images/base/logo-w.png" />
          <span>组件库</span>
        </div>
      </div>
      <div class="right">
        <div class="login-container">
          <div class="login-content">
            <div v-for="(item, index) in loginHeader" :key="index" class="login-header">
              <ul v-if="setLoginHeader(index)" class="clear-both">
                <li v-for="(titem, tindex) in item" :key="tindex">
                  <font
                    :class="{'active': titem.id === loginActive}"
                    @click="loginChange(titem.id)"
                  >
                    <span>{{ titem.name }}</span>
                  </font>
                </li>
              </ul>
            </div>
            <!-- 密码登录 -->
            <div v-show="loginActive === '1'" class="login-item">
              <el-form ref="emailForm" :model="ruleForm" :rules="rules" class="login-form">
                <el-form-item
                  class="login-form-group"
                  :class="setFormClass('account')"
                  prop="account"
                >
                  <el-input
                    v-model="ruleForm.account"
                    @focus="changeFocus('account')"
                    @blur="changeFocus()"
                  ></el-input>
                  <div class="form-placeholder">请输入账号</div>
                </el-form-item>
                <!-- email -->
                <el-form-item
                  class="login-form-group"
                  :class="setFormClass('password')"
                  prop="password"
                >
                  <el-input
                    v-model="ruleForm.password"
                    show-password
                    @focus="changeFocus('password')"
                    @blur="changeFocus()"
                  ></el-input>
                  <div class="form-placeholder">请输入密码</div>
                </el-form-item>
                <!-- password -->
                <div class="login-item-group">
                  <div class="tablelayout item-info">
                    <div class="tablelayout-l">
                      <el-checkbox-group v-model="ruleForm.is_longtime">
                        <el-checkbox label="7 天免登录" name="is_longtime"></el-checkbox>
                      </el-checkbox-group>
                    </div>
                    <div class="tablelayout-s">
                      <span class="item-btn" @click="loginActive = '3'">忘记密码？</span>
                    </div>
                  </div>
                </div>
                <!-- group -->
                <el-button type="primary login-form-btn" @click="LoginByAccount()">登 录</el-button>
                <!-- submit -->
                <!-- group -->
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    var checkMobileOrEmail = (rule, value, callback) => {
      value = this.trimLine(value)
      if (value === '') {
        callback(new Error('请输入账号，账号不能为空'))
      } else {
        callback()
      }
    }
    var checkPasswod = (rule, value, callback) => {
      value = this.trimLine(value)
      if (value === '' || value.length < 6 || value.length > 12) {
        callback(new Error('请输入长度为 6 到 12 个字符的密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        account: '',
        is_longtime: false,
        password: ''
      },
      rules: {
        account: [
          {
            validator: checkMobileOrEmail,
            trigger: ['blur', 'change'],
            required: true
          }
        ],
        password: [
          {
            validator: checkPasswod,
            trigger: ['blur', 'change'],
            required: true
          }
        ]
      },
      formFocus: '',
      loginHeader: [[{ name: '登录', id: '1' }]],
      loginActive: '1',
      vfCodeTimeout: 0
    }
  },
  computed: {
    ...mapGetters(['getLoginRedirectUrl'])
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapMutations({
      setLoginRedirectUrl: 'UPDATE_LOGIN_REDIRECT_URL'
    }),
    // 选项改变
    loginChange(id) {
      if (id) this.loginActive = id
    },
    // 设置标题
    setLoginHeader(index) {
      let isShow = false
      this.loginHeader[index].forEach(tItem => {
        if (tItem.id === this.loginActive) {
          isShow = true
        }
      })
      return isShow
    },
    // 设置表单样式
    setFormClass(form) {
      let formClass = {}
      if (form && this.formFocus === form) {
        formClass['form-focus'] = true
      }
      if (form && this.ruleForm[form] && this.ruleForm[form].length > 0) {
        formClass['form-assigned'] = true
      }
      return formClass
    },
    // 焦点更改
    changeFocus(form) {
      let focusType = ''
      if (form) {
        focusType = form
      }
      this.formFocus = focusType
    },
    // 账号登录
    LoginByAccount() {
      var _this = this
      this.$refs.emailForm.validate(val => {
        if (val) {
          this.$http
            .post('/Api/Auth/Login', { account: this.ruleForm.account })
            .then(res => {
              if (res && res.Code === 0) {
                let redirectUrl = this.getLoginRedirectUrl
                this.setLoginRedirectUrl('')
                this.$router.push(redirectUrl || '/')
              } else {
                this.$message.error(res ? res.Message : '服务器繁忙')
              }
            })
        } else {
          _this.$message.error('请输入正确账号和密码')
        }
      })
    },
    trimLine(str) {
      if (str) {
        str = str.replace(/(^\s*)|(\s*$)/g, '')
        if (str) {
          str = str.replace(/[\r\n]/g, '')
        }
      }
      return str
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
