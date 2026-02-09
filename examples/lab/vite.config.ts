import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { vitePluginSxo } from 'vite-plugin-sxo';

export default defineConfig({
    plugins: [vue(), vitePluginSxo()],
    css: {
        transformer: 'lightningcss',
    },
    build: {
        cssMinify: 'lightningcss',
    },
});
