import { pronhubTheme } from '@sxo/theme-pronhub';
import Vue from 'vue';
import { SxoPlugin, ThemeProvider } from '@sxo/vue2-sxo';
import App from './App.vue';

Vue.use(SxoPlugin, { tokens: pronhubTheme });

new Vue({
    render: (h) => h(ThemeProvider as any, [h(App as any)]),
}).$mount('#app');
