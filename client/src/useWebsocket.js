import { ref, onUnmounted, onMounted } from 'vue';

export function useWebSocket(url = 'ws://localhost:8000') {
  const socket = ref(null);
  const isConnected = ref(false);
  const messages = ref([]);
  const error = ref(null);

  const connect = () => {
    socket.value = new WebSocket(url);

    socket.value.onopen = () => {
      isConnected.value = true;
    };
    socket.value.onclose = () => {
      isConnected.value = false;
    };
    socket.value.onerror = (err) => {
      error.value = err;
    };

    socket.value.onmessage = (event) => {
      messages.value = JSON.parse(event.data);
    };
  };

  const send = (data) => {
    if (isConnected.value) {
      socket.value.send(JSON.stringify(data));
    } else {
      console.log('not connected');
    }
  };

  const disconnect = () => {
    if (isConnected.value) {
      socket.value.close();
    }
  };

  onMounted(() => {
    connect();
  });

  onUnmounted(() => {
    disconnect();
  });

  return {
    isConnected,
    send,
    messages,
    error,
  };
}
