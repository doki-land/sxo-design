import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [
        solidPlugin(),
        dts({ include: ['src'], insertTypesEntry: true })
    ],
    css: {
        transformer: 'lightningcss',
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.tsx'),
            name: 'SolidSxo',
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
