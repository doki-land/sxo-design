import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    // @ts-expect-error
    builder: 'rolldown',
    plugins: [vue()],
    css: {
        transformer: 'lightningcss',
    },
    test: {
        environment: 'happy-dom',
        globals: true,
    },
    resolve: {
        alias: {
            '@sxo/ui': path.resolve(__dirname, '../../packages/sxo-ui/src'),
            '@sxo/design': path.resolve(__dirname, '../../packages/sxo-design/src'),
            '@sxo/engine': path.resolve(__dirname, '../../packages/sxo-engine/src'),
            '@sxo/component-admin': path.resolve(__dirname, '../../packages/component-admin/src'),
        },
    },
});
