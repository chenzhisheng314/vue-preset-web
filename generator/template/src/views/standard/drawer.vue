<template>
  <el-drawer ref="drawer"
             class="of-drawer"
             title="我是标题"
             size="600px"
             :visible.sync="tmpShow"
             append-to-body
             :with-header="false">
    <div class="of-box">
      <div class="of-container is-vertical">
        <div class="of-aside">
          <div class="of-box-header clearfix">
            <div class="header-text box-left">
              <dl>
                <dt class="clearfix">
                  <span>表单标题，说明内容可以不要</span>
                </dt>
                <dd>抽屉布局与表单布局玩全一致，Form 尺寸注意填满（:span="24"）</dd>
              </dl>
            </div>
          </div>
        </div>
        <!-- aside -->
        <div class="of-main">
          <el-row>
            <el-col :span="24">
              <of-form></of-form>
            </el-col>
          </el-row>
        </div>
        <!-- main -->
        <div class="of-aside">
          <div class="of-filter clearfix">
            <div class="filter-right">
              <el-button type="primary"
                         size="small"
                         :loading="loading"
                         @click="confirmForm">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
              <el-button type="default"
                         size="small"
                         @click="cancelForm">取消</el-button>
            </div>
          </div>
        </div>
        <!-- footer -->
      </div>
    </div>
  </el-drawer>
</template>

<script>
import OfForm from './form'

export default {
  components: {
    OfForm
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tmpShow: this.value,
      loading: false,
      timer: null
    }
  },
  watch: {
    value: {
      handler (n) {
        this.tmpShow = n
      },
      deep: true
    },
    tmpShow: {
      handler (n) {
        this.$emit('input', n)
      },
      deep: true
    }
  },
  created () {
    this.tmpShow = this.value
  },
  methods: {
    confirmForm () {
      this.loading = true
      this.timer = setTimeout(() => {
        this.cancelForm()
        // 动画关闭需要一定的时间
        setTimeout(() => {
          this.loading = false
        }, 400)
      }, 2000)
    },
    cancelForm () {
      this.loading = false
      this.tmpShow = false
      clearTimeout(this.timer)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
