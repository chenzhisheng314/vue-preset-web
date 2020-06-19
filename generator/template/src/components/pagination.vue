<template>
  <div class="of-pagination">
    <el-pagination :current-page="pageIndex"
                   :page-sizes="[15, 30, 50, 100]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"
                   @size-change="pageSizeChange"
                   @current-change="pageIndexChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    pageIndex: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 15
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {}
  },
  methods: {
    pageIndexChange (val) {
      this.$emit('change', val, this.pageSize)
    },
    pageSizeChange (val) {
      this.$emit('change', 1, val)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
