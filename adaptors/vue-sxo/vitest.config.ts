import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue()],
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
