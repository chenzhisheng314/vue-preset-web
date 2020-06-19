<template>
  <div class="of-layout"
       :class="{'open-menusub':isOpenSub,'no-menu':!showMenu,'no-header':!showHeader}">
    <div class="of-header">
      <of-header v-if="showHeader"></of-header>
    </div>
    <div class="of-menu">
      <of-menu :showMenu="showMenu"
               @handleSub="handleSub"></of-menu>
    </div>
    <div class="of-content">
      <router-view></router-view>
    </div>
    <!-- <div class="of-footer">
      <of-footer></of-footer>
    </div> -->
  </div>
</template>

<script>
import OfHeader from '@/shared/header'
import OfMenu from '@/shared/menu'

export default {
  components: {
    OfHeader,
    OfMenu
  },
  data () {
    return {
      showHeader: true,
      showMenu: true,
      isOpenSub: true
    }
  },
  mounted () {
  },
  methods: {
    handleSub (res) {
      this.isOpenSub = res
    },
    loading () {
      const loading = this.$loading({
        lock: true
      })
      setTimeout(() => {
        loading.close()
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
