import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import axiosInstance from '@/api/axios'
import errorHandler from '@/helper/error'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

const app = createApp(App)

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  app.component(componentName, componentConfig.default || componentConfig)
})

const seller = localStorage.getItem('seller')
if (seller) {
  store.commit('SET_ISAUTHENTICATED', true)
} else {
  store.commit('SET_ISAUTHENTICATED', false)
}
axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    if (error.config && error.response && error.response.status === 404) {
      return Promise.reject(new Error('Not found'))
    }
    if (error.config.url !== '/auth/login' && error.response.status === 401) {
      return store.commit('CLEAR_USER_DATA')
    }
    return Promise.reject(errorHandler(error))
  }
)

axiosInstance.interceptors.request.use(function (config) {
  if (config.url !== '/auth/login') {
    const seller = JSON.parse(localStorage.getItem('seller'))
    const base64Credentials = seller.credentials
    config.headers.Authorization = base64Credentials ? `Basic ${base64Credentials}` : ''
  }
  return config
})

app.use(Toast).use(router).use(store).mount('#app')
