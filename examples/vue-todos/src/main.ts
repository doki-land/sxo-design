import { pornhubTheme } from '@sxo/theme-pornhub';
import { createApp } from 'vue';
import { sxoPlugin } from 'vue-sxo';
import App from './App.vue';
import 'virtual:sxo.css';

const app = createApp(App);
app.use(sxoPlugin, { theme: { tokens: pornhubTheme } });
app.mount('#app');
