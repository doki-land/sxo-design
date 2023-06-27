import { pornhubTheme } from '@sxo/theme-pornhub';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { vitePluginSxo } from 'vite-plugin-sxo';

export default defineConfig({
    plugins: [
        vue(),
        vitePluginSxo({
            tokens: pornhubTheme,
        }),
    ],
    server: {
        port: 5002,
    },
});
