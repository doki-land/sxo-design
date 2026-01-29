import { pronhubTheme } from '@sxo/theme-pronhub';
import { createSxo } from '@sxo/vue';
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

const app = createApp(App);
app.use(createSxo({ tokens: pronhubTheme }));
app.mount('#app');
