import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {}

export default new Vuex.Store({
  state,
  getters: {
    getLoginRedirectUrl() {
      let r = localStorage.getItem('LOGIN_REDIRECT_URL')
      if (r) {
      state.redirectUrl = r
      }
      return state.redirectUrl
    }
  },
  mutations: {
    UPDATE_LOGIN_REDIRECT_URL(state, path) {
      state.redirectUrl = path
      localStorage.setItem('LOGIN_REDIRECT_URL', path)
    }
  }
})
