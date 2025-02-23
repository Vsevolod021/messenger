import router from './router/index.js';
import { createApp } from 'vue';
import App from './App.vue';

import '@/assets/styles/index.sass';

const app = createApp(App);

app.use(router);
app.mount('#app');
