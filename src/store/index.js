import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    path: ''
  },
  mutations: {
    saveToken(state, token) {
      state.token = token
    },
    savePath(state, path) {
      state.path = path
    }
  },
  actions: {
  },
  modules: {
  }
})
