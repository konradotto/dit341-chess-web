import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations: {
    setUser(state, username) {
      state.user = username
    }
  }
})
