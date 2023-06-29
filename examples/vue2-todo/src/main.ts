import { pornhubTheme } from '@sxo/theme-pornhub';
import Vue from 'vue';
import { SxoPlugin, ThemeProvider } from 'vue2-sxo';
import App from './App.vue';

Vue.use(SxoPlugin, { tokens: pornhubTheme });

new Vue({
    render: (h) => h(ThemeProvider as any, [h(App as any)]),
}).$mount('#app');
