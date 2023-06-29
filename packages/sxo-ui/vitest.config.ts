import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
    },
    resolve: {
        alias: {
            '@sxo/design': path.resolve(__dirname, '../sxo-design/src'),
            '@sxo/engine': path.resolve(__dirname, '../sxo-engine/src'),
        },
    },
});
