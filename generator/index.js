module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    scripts: {
      'serve': 'vue-cli-service serve',
      'build': 'vue-cli-service build',
      'lint': 'vue-cli-service lint'
    },
    devDependencies: {
      '@vue/cli-plugin-babel': '~4.4.0',
      '@vue/cli-plugin-eslint': '~4.4.0',
      '@vue/cli-service': '~4.4.0',
      'babel-eslint': '^10.1.0',
      'eslint': '^6.7.2',
      'eslint-plugin-vue': '^6.2.2',
      'vue-template-compiler': '^2.6.11'
    },
    dependencies: {
      'axios': '^0.19.2',
      'core-js': '^3.6.5',
      'element-ui': '^2.13.2',
      'node-sass': '^4.14.1',
      'sass-loader': '^8.0.2',
      'vue': '^2.6.11',
      'vue-router': '^3.3.4',
      'vuex': '^3.4.0'
    }
  })

  // 删除 vue-cli 默认目录
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith('src/') || path.startsWith('public/'))
      .forEach(path => delete files[path])
  })

  api.render('./template')
}
