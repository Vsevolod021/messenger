import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { io } from 'socket.io-client'

const socket = io('http://localhost:9000', {
  auth: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTZiZWEzMTE2YmFkZGE0MzYyODdlNjIiLCJsb2dpbiI6InZzZXZvbG9kIiwiaWF0IjoxNzY5MTA5NjAxLCJleHAiOjE3NjkxMTA1MDF9.ifRKYNq2zleNMlfLXdZUwOhW1m3x2bslBcSo6nu6e3s',
  },
})

socket.on('connect', () => {
  console.log('WS connected:', socket.id)
})

socket.on('disconnect', () => {
  console.log('WS disconnected')
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
