import { pornhubTheme } from '@sxo/theme-pornhub';
import { createApp } from 'vue';
import { createSxo } from 'vue-sxo';
import App from './App.vue';
import 'virtual:sxo.css';

const app = createApp(App);
app.use(createSxo({ tokens: pornhubTheme }));
app.mount('#app');
