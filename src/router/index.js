import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/subHeader.vue')
    },
    {
      path: '/swiper',
      name: 'swiper',
      component: () => import('../views/swiperComponent.vue')
    },
    {
      path: '/accordion',
      name: 'accordion',
      component: () => import('../views/AccordionComponent.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../views/RegistrationPage.vue')
    }
  ]
})

export default router
