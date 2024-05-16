import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AuthLogin',
      component: () => import('@/auth/AuthLogin.vue')
    },
    {
      path: '/register',
      name: 'AuthRegister',
      component: () => import('@/auth/AuthRegister.vue')
    },
    {
      path: '/verify-email',
      name: 'VerifyEmail.vue',
      component: () => import('@/auth/verification/VerifyEmail.vue')
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword.vue',
      component: () => import('@/auth/verification/ForgotPassword.vue')
    },
    {
      path: '/reset-password',
      name: 'ResetPassword.vue',
      component: () => import('@/auth/verification/ResetPassword.vue')
    },
    {
      path: '/user',
      name: 'UserProfile',
      component: () => import('@/user/UserProfile.vue')
    }
  ]
})

export default router
