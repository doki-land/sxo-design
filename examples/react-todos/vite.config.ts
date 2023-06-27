import { pornhubTheme } from '@sxo/theme-pornhub';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { vitePluginSxo } from 'vite-plugin-sxo';

export default defineConfig({
    plugins: [
        react(),
        vitePluginSxo({
            tokens: pornhubTheme,
        }),
    ],
    server: {
        port: 5001,
    },
});
