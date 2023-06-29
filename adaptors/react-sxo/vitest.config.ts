import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
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
