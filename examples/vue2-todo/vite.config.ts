import path from 'node:path';
import vue from '@vitejs/plugin-vue2';
import oxc from 'unplugin-oxc/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    // @ts-expect-error
    builder: 'rolldown',
    plugins: [oxc(), vue()],
    css: {
        transformer: 'lightningcss',
    },
    build: {
        cssMinify: 'lightningcss',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            vue: 'vue/dist/vue.esm.js',
        },
    },
});
