<template>
  <div class="of-container clear-both">
    <div class="of-logo"
         @click="goto('/')">
      <img src="@/assets/images/base/logo.png" />
    </div>
    <template v-if="currentUserInfo && IsLogin">
      <!-- logo -->
      <div v-show="IsLogin"
           class="of-user">
        <el-dropdown @command="handleCommand">
          <div class="el-dropdown-link">
            <font>
              <img :src="currentUserInfo.avatar || userDefault.avatar" />
            </font>
            <i class="el-icon-arrow-down"></i>
            <span>
              {{ currentUserInfo.userName || currentUserInfo.mobileNo || userDefault.name }}
            </span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in userMenu"
                              :key="index"
                              :command="item.url">
              {{ item.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- user -->
      <div class="of-info">
        <i class="far fa-bell"></i>
        <font v-if="userInfo && userInfo>0">
          {{ userInfo > 99 ? '99+' : userInfo }}
        </font>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'OfHeader',
  data () {
    return {
      userDefault: {
        name: '游客用户',
        // eslint-disable-next-line no-undef
        avatar: require('@/assets/images/base/header-default.jpg')
      },
      userInfo: 12,
      userMenu: [
        { name: '个人资料', url: '#' },
        { name: '退出登录', url: '#' }
      ],
      currentUserInfo: {}
    }
  },
  computed: {
    IsLogin () {
      return true
    }
  },
  methods: {
    handleCommand (command) {
      if (command) {
        this.goto(command)
      }
    },
    goto (path) {
      if (path) this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
