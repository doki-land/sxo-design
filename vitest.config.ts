import path from 'node:path';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import oxc from 'unplugin-oxc/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    // @ts-expect-error
    builder: 'rolldown',
    plugins: [oxc(), react(), vue()],
    test: {
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html', 'lcov'],
            include: [
                'packages/*/src/**/*.{ts,tsx,vue,svelte}',
                'adaptors/*/src/**/*.{ts,tsx,vue,svelte}',
                'examples/*/src/**/*.{ts,tsx,vue,svelte}',
            ],
            exclude: [
                '**/node_modules/**',
                '**/dist/**',
                '**/*.d.ts',
                '**/*.spec.ts',
                '**/*.test.ts',
            ],
            all: true,
            reportOnFailure: true,
            thresholds: {
                lines: 0,
                functions: 0,
                branches: 0,
                statements: 0,
            },
        },
        globals: true,
        environment: 'happy-dom',
        setupFiles: ['./tests/setup.ts'],
    },
    resolve: {
        alias: {
            '@sxo/ui': path.resolve(__dirname, 'packages/sxo-ui/src'),
            '@sxo/design': path.resolve(__dirname, 'packages/sxo-design/src'),
            '@sxo/engine': path.resolve(__dirname, 'packages/sxo-engine/src'),
            '@sxo/theme-pornhub': path.resolve(__dirname, 'packages/theme-pornhub/src'),
            'react-sxo': path.resolve(__dirname, 'adaptors/react-sxo/src'),
            'vue-sxo': path.resolve(__dirname, 'adaptors/vue-sxo/src'),
        },
    },
});
