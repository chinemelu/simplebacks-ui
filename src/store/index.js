import { createStore } from 'vuex'
import { post, get, axiosDelete } from '@/services/axios'

export default createStore({
  state: {
    seller: null,
    isAuthenticated: false
  },
  mutations: {
    CLEAR_USER_DATA () {
      localStorage.clear()
      location.reload()
    },
    SET_USER_DATA (state, sellerData) {
      state.seller = sellerData
      localStorage.setItem('seller', JSON.stringify(sellerData))
    },
    SET_ISAUTHENTICATED (state, val) {
      state.isAuthenticated = val
    }
  },
  actions: {
    async login (_, credentials) {
      const response = await post('/auth/login', credentials)
      return response
    },
    async fetchOrderItems (_, { sort, order, offset, limit }) {
      const response = get(`/order_items?sort=${sort}&order=${order}&offset=${offset}&limit=${limit}`)
      return response
    },
    async deleteOrderItem (_, id) {
      const response = axiosDelete(`/order_items/${id}`)
      return response
    }
  }
})
