import Vue from 'vue';
import { SxoPlugin, ThemeProvider } from 'vue2-sxo';
import { pornhubTheme } from '@sxo/theme-pornhub';
import App from './App.vue';

Vue.use(SxoPlugin, { tokens: pornhubTheme });

new Vue({
    render: (h) => h(ThemeProvider, [h(App)]),
}).$mount('#app');
