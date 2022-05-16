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
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../pages/OrderList.vue')
  },
  {
    path: '/user/:id',
    name: 'SinglePage',
    meta: {
      requiresAuth: true
    },
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

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('seller')
  // coming directly from the login page will mean the user is authenticated
  // there will also be no seller localStorage item
  if (to.meta.requiresAuth && from.name !== 'Home' && !loggedIn) {
    return next('/')
  }
  if (to.name === 'Home' && loggedIn) {
    return next({ name: 'OrderList' })
  }
  next()
})

export default router
