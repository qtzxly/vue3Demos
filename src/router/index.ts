import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/GDmap',
      name: 'GDmap',
      component: () => import('@/views/GDmap/GDmap.vue')
    },
    {
      path: '/Cesium',
      name: 'Cesium',
      component: () => import('@/views/Cesium/Cesium.vue')
    }
  ]
})

export default router
