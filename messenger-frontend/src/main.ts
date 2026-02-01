import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { io } from 'socket.io-client'

const token = sessionStorage.getItem('token')

const socket = io('http://localhost:9000', {
  auth: {
    token: token,
  },
})

socket.on('connect', () => {
  console.log('WS connected:', socket.id)
})

socket.emit('join:chat', {
  chatId: 'chat-123',
})

socket.emit('chat:test', {
  chatId: 'chat-123',
  text: 'hello room',
})

socket.on('chat:test:response', (data) => {
  console.log(data.from + ': ' + data.text)
})

socket.on('disconnect', () => {
  console.log('WS disconnected')
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
