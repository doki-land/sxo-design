import { pronhubTheme } from '@sxo/theme-pronhub';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { vitePluginSxo } from '@sxo/vite-plugin-sxo';

export default defineConfig({
    // @ts-expect-error
    builder: 'rolldown',
    plugins: [
        react(),
        vitePluginSxo({
            tokens: pronhubTheme,
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
