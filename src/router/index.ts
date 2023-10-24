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
      path: '/GoogleMap',
      name: 'GoogleMap',
      component: () => import('@/views/GoogleMap/GoogleMap.vue')
    },
    {
      path: '/Cesium',
      name: 'Cesium',
      component: () => import('@/views/Cesium/Cesium.vue')
    },
    {
      path: '/Three',
      name: 'Three',
      component: () => import('@/views/Threejs/Scene.vue')
    },
    {
      path: '/three2',
      name: 'three2',
      component: () => import('@/views/three2/three2.vue')
    }
  ]
})

export default router
