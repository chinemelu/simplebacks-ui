import { createStore } from 'vuex'
import axiosInstance from '../api/axios'
import { post } from ''

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
    login ({ commit }, credentials) {
      return post('/auth/login', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    }
  }
})
