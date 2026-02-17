<script setup lang="ts">
import { ref } from 'vue'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { signIn } from '../utils/signIn'
import { useRouter } from 'vue-router'

const router = useRouter()

const login = ref('')
const password = ref('')

async function onFormSubmit(event: SubmitEvent) {
  event.preventDefault()

  await signIn({
    login: login.value,
    password: password.value,
  })

  router.push('/feed')
}
</script>

<template>
  <form @submit="onFormSubmit" class="form">
    <p class="help-text">
      Не зарегистрированы?
      <RouterLink to="/register" class="register-link">Создайте аккаунт</RouterLink>
    </p>

    <InputText v-model="login" type="text" placeholder="Логин" />

    <InputText v-model="password" type="password" placeholder="Пароль" />

    <Button type="submit" label="Войти" />
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

.register-link {
  color: var(--p-button-primary-background);
  text-decoration: none;
}
</style>
