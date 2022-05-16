import { createStore } from 'vuex'
import axiosInstance from '@/api/axios'
import { post } from '@/services/axios'

export default createStore({
  state: {
    seller: null
  },
  mutations: {
    CLEAR_USER_DATA () {
      localStorage.clear()
      location.reload()
    },
    SET_USER_DATA (state, sellerData) {
      state.seller = sellerData
      localStorage.setItem('seller', JSON.stringify(sellerData))
      axiosInstance.defaults.headers.common.Authorization = `Basic ${
        sellerData.credentials
      }`
    }
  },
  actions: {
    async login ({ commit }, credentials) {
      const response = post('/auth/login', credentials)
      return response
    }
  }
})
