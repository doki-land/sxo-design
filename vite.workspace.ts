import { resolve } from 'node:path';
import type { LibraryFormats } from 'vite';

export const sharedExternals = [
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
    'alpinejs',
];

export const sharedBuildOptions = (dir: string, name: string, entry = 'src/index.ts') =>
    ({
        lib: {
            entry: resolve(dir, entry),
            name,
            fileName: 'index',
            formats: ['es', 'cjs'] as any[],
        },
        rollupOptions: {
            external: sharedExternals,
        },
        outDir: 'dist',
        emptyOutDir: true,
        cssMinify: 'lightningcss' as const,
    }) as import('vite').UserConfig['build'];
