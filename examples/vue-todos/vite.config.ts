import { pornhubTheme } from '@sxo/theme-pornhub';
import vue from '@vitejs/plugin-vue';
import oxc from 'unplugin-oxc/vite';
import { defineConfig } from 'vite';
import { vitePluginSxo } from 'vite-plugin-sxo';

export default defineConfig({
    environments: {
        client: {
            // @ts-expect-error
            builder: 'rolldown',
        },
    },
    css: {
        transformer: 'lightningcss',
    },
    build: {
        cssMinify: 'lightningcss',
    },
    plugins: [
        oxc(),
        vue(),
        vitePluginSxo({
            tokens: pornhubTheme,
        }),
    ],
    server: {
        port: 5002,
    },
});
