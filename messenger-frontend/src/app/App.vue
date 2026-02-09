<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/features/auth/model/auth.store'
import { setupAuthEffects } from '@/features/auth'

const authStore = useAuthStore()

onMounted(() => {
  setupAuthEffects()
  authStore.init()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
