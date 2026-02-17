<script setup lang="ts">
import { ref } from 'vue'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { signUp } from '../utils/signUp'
import { useRouter } from 'vue-router'

const router = useRouter()

const login = ref('')
const password = ref('')
const displayName = ref('')

async function onFormSubmit(event: SubmitEvent) {
  event.preventDefault()

  await signUp({
    login: login.value,
    password: password.value,
    displayName: displayName.value,
  })

  router.push('/feed')
}
</script>

<template>
  <form @submit="onFormSubmit" class="form">
    <p class="help-text">
      Есть аккаунт? <RouterLink to="/login" class="login-link">Войдите</RouterLink>
    </p>

    <InputText v-model="login" type="text" placeholder="Логин" />

    <InputText v-model="password" type="password" placeholder="Пароль" />

    <InputText v-model="displayName" type="text" placeholder="Имя пользователя" />

    <Button type="submit" label="Зарегистрироваться" />
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 2px solid #34d39929;
  border-radius: 10px;
  width: 300px;
  margin: 0 auto;
}

.help-text {
  text-align: center;
}

.login-link {
  color: var(--p-button-primary-background);
  text-decoration: none;
}
</style>
