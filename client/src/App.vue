<template>
  <div class="app">
    <div v-if="isConnected" class="app__indicator app__indicator--connected">Online</div>
    <div v-else class="app__indicator app__indicator--disconnected">Offline</div>

    <form @submit.prevent="sendMessage" class="app__input">
      <input v-model="newMessage" type="text" />
      <button type="submit">Отправить сообщение</button>
    </form>

    <div class="app__messages-container">
      <div v-for="message in messages" :key="message.date" class="app__message">
        <span>
          {{ message.message }}
        </span>
        <time>{{ dayjs(message.date).format('hh:mm a') }}</time>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
import { useWebSocket } from './useWebsocket';

const { send, error, messages, isConnected } = useWebSocket();

const newMessage = ref('');

const sendMessage = () => {
  if (newMessage.value === '') {
    return;
  }

  const messageData = { date: Date.now(), message: newMessage.value };
  send(messageData);

  newMessage.value = '';
};
</script>
