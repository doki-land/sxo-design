import { defineConfig } from 'vitest/config';
import path from 'path';

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
