'use strict'

import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'

axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  if (error && error.response) {
    let msg = '[' + error.response.status + ']错误'
    switch (error.response.status) {
      case 401:
        router.push('/login')
        break
      case 403:
        router.push('/403')
        break
      default:
        msg = '其它错误'
        if (error.response && error.response.data && error.response.data.Message) {
          msg = msg + '：' + error.response.data.Message
        } else {
          msg += '：其它错误'
        }
        Message({
          showClose: true,
          message: msg,
          type: 'warning'
        })
    }
  }
  return Promise.reject(error)
})

export default {
  install(Vue) {
    Vue.prototype.$http = axios
    Vue.http = axios
  },
  $http: axios
}

export const $http = axios
