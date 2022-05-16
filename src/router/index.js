import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../pages/Login.vue')
  },
  {
    path: '/order-list',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "about" */ '../pages/OrderList.vue')
  },
  {
    path: '/user/:id',
    name: 'SinglePage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/SinglePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
