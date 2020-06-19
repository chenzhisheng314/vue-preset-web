module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/scss/theme.scss";`
      }
    }
  },
  devServer: {
    proxy: 'http://127.0.0.1:8081/'
  },
  assetsDir: 'static',
  publicPath: './'
}
