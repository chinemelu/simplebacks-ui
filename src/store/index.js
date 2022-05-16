import { createStore } from 'vuex'
import { post, get } from '@/services/axios'

export default createStore({
  state: {
    seller: null
  },
  mutations: {
    CLEAR_USER_DATA () {
      localStorage.clear()
      // location.reload()
    },
    SET_USER_DATA (state, sellerData) {
      state.seller = sellerData
      localStorage.setItem('seller', JSON.stringify(sellerData))
    }
  },
  actions: {
    async login ({ commit }, credentials) {
      const response = post('/auth/login', credentials)
      return response
    },
    async fetchOrderItems (_, { sort, order, offset, limit }) {
      const response = get(`/order_items?sort=${sort}&order=${order}&offset=${offset}&limit=${limit}`)
      return response
    }
  }
})
