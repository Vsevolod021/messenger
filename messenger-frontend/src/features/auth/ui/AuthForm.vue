<script setup lang="ts">
import { Button } from 'primevue'
import { signIn } from '../utils/signIn'

async function onClick() {
  await signIn({
    login: 'seva123',
    password: '123',
  })
}
</script>

<template>
  <div>
    <h2>AuthForm</h2>

    <Button label="Click" @click="onClick">SignIn Seva</Button>
  </div>
</template>

<style scoped></style>
