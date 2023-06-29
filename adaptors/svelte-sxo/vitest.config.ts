import path from 'node:path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [svelte({ hot: !process.env.VITEST })],
    test: {
        environment: 'happy-dom',
        globals: true,
        setupFiles: ['./tests/setup.ts'],
    },
    resolve: {
        alias: {
            '@sxo/ui': path.resolve(__dirname, '../../packages/sxo-ui/src'),
            '@sxo/design': path.resolve(__dirname, '../../packages/sxo-design/src'),
            '@sxo/engine': path.resolve(__dirname, '../../packages/sxo-engine/src'),
        },
    },
});
