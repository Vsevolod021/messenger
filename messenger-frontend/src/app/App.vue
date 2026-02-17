<script setup lang="ts">
import { onMounted } from 'vue'
import { logOut, setupAuthInterceptor } from '@/features/auth'
import { useAuthStore } from '@/features/auth'
import { Button } from 'primevue'
import router from './router'

const authStore = useAuthStore()

// FixMe. вынести в общий файл и юзать везде, где нужно, а не только в App.vue
onMounted(() => {
  setupAuthInterceptor(() => {
    router.push('/login')
  })
})

const logout = async () => {
  await logOut()

  router.push('/login')
}
</script>

<template>
  <div class="header" v-if="authStore.authStatus === 'authorized'">
    <RouterLink to="/feed" class="header__item">Лента новостей</RouterLink>
    <RouterLink to="/chats" class="header__item">Сообщения</RouterLink>
    <Button class="header__logout" @click="logout">Выйти</Button>
  </div>

  <RouterView />
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.header__item {
  color: black;
  text-decoration: none;
}

.header__item:hover {
  opacity: 0.7;
}

.header__logout {
  margin-left: auto;
}
</style>
