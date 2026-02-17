import { useAuthStore } from '@/features/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/chats',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../../pages/login/LoginPage.vue'),
      meta: { public: true },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../../pages/register/RegisterPage.vue'),
      meta: { public: true },
    },
    {
      path: '/chats',
      name: 'Chats',
      component: () => import('../../pages/chats/ChatsPage.vue'),
    },
    {
      path: '/feed',
      name: 'Feed',
      component: () => import('../../pages/feed/FeedPage.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  if (authStore.authStatus === 'unknown') {
    await authStore.init()
  }

  if (authStore.authStatus === 'unauthorized' && !to.meta.public) {
    return '/login'
  }

  if (authStore.authStatus === 'authorized' && to.meta.public) {
    return '/feed'
  }

  return true
})

export default router
