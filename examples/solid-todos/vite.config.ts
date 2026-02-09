import { pronhubTheme } from '@sxo/theme-pronhub';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { vitePluginSxo } from 'vite-plugin-sxo';

export default defineConfig({
    // @ts-expect-error
    builder: 'rolldown',
    plugins: [
        solidPlugin(),
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
        port: 5003,
    },
});
