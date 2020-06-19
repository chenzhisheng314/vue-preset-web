<template>
  <div id="app" class="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  computed: {},
  mounted() {
    this._checkLogin()
  },
  methods: {
    ...mapMutations({
      setLoginRedirectUrl: 'UPDATE_LOGIN_REDIRECT_URL'
    }),
    _checkLogin() {
      let fullPath = this.$route.fullPath
      let path = this.$route.path
      this.$http.post('/Api/Auth/State').then(resp => {
        if (resp.Data.IsLogin) {
          if (path === '/login') {
            this.$router.push('/')
          }
        } else {
          if (path !== '/login') {
            this.setLoginRedirectUrl(fullPath)
            this.$router.push('/login')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
