export default {
  mixinTableHeight (el) {
    setTimeout(() => {
      this.setTableHeight(el)
      window.addEventListener('resize', () => {
        this.setTableHeight(el)
      })
    }, 50)
  },
  setTableHeight (el) {
    const _this = el
    if (_this.$refs.tableBox) {
      const boxPadding = 20
      const boxHeight = _this.$refs.tableBox.clientHeight
      _this.pageHeight = boxHeight - boxPadding
      _this.$forceUpdate()
    }
  }
}
