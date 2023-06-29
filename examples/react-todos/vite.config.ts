import { pornhubTheme } from '@sxo/theme-pornhub';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { vitePluginSxo } from 'vite-plugin-sxo';

export default defineConfig({
    // @ts-expect-error
    builder: 'rolldown',
    plugins: [
        react(),
        vitePluginSxo({
            tokens: pornhubTheme,
        }),
    ],
    css: {
        transformer: 'lightningcss',
    },
    build: {
        cssMinify: 'lightningcss',
    },
    server: {
        port: 5001,
    },
});
