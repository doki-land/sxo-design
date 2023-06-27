import { pornhubTheme } from '@sxo/theme-pornhub';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { vitePluginSxo } from 'vite-plugin-sxo';

export default defineConfig({
    plugins: [
        solidPlugin(),
        vitePluginSxo({
            tokens: pornhubTheme,
        }),
    ],
    server: {
        port: 5003,
    },
});
