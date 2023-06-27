import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import vue2 from '@vitejs/plugin-vue2';

export default defineConfig({
    plugins: [
        vue2(),
        dts({ include: ['src'], insertTypesEntry: true })
    ],
    css: {
        transformer: 'lightningcss',
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'Vue2Sxo',
            fileName: 'index',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
                    external: [
                        '@sxo/design',
                        '@sxo/engine',
                        '@sxo/ui',
                        '@sxo/component-admin',
                        '@sxo/component-icons',
                        '@sxo/component-table',
                        '@sxo/theme-antd',
                        '@sxo/theme-material',
                        'vue',
                        'vue-demi',
                        'react',
                        'react-dom',
                        'react/jsx-runtime',
                        'solid-js',
                        'solid-js/web',
                        'solid-js/store',
                        'svelte',
                        'alpinejs'
                    ],
                },
        outDir: 'dist',
        emptyOutDir: true,
        cssMinify: 'lightningcss',
    },
});
