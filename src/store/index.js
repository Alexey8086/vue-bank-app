import { createStore } from 'vuex'
import auth from '@/store/modules/auth.module'
import request from './modules/request.module'

export default createStore({
  state() {
    return {
      message: null,
      sidebar: false,
    }
  },
  getters: {
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    },
    setClearMessage(state) {
      state.message = null
    },
    setOpenSidebar(state) {
      state.sidebar = true
    },
    setCloseSidebar(state) {
      state.sidebar = false
    }
  },
  actions: {
    addMessage({commit}, message) {
      commit('setMessage', message)
      setTimeout(() => {
        commit('setClearMessage')
      }, 8000)
    }
  },
  modules: {
    auth,
    request,
  }
})
