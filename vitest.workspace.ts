import path from 'node:path';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import solid from 'vite-plugin-solid';
import { defineWorkspace } from 'vitest/config';

const commonConfig = {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html', 'lcov'],
        include: ['examples/*/src/**/*.{ts,tsx,vue,svelte}'],
        exclude: ['**/node_modules/**', '**/dist/**', '**/tests/**', '**/*.d.ts'],
        all: true,
    },
    resolve: {
        conditions: ['browser', 'development', 'solid'],
        alias: {
            '@sxo/ui': path.resolve(__dirname, 'packages/sxo-ui/src'),
            '@sxo/design': path.resolve(__dirname, 'packages/sxo-design/src'),
            '@sxo/engine': path.resolve(__dirname, 'packages/sxo-engine/src'),
            '@sxo/theme-pornhub': path.resolve(__dirname, 'packages/theme-pornhub/src'),
            'react-sxo': path.resolve(__dirname, 'adaptors/react-sxo/src'),
            'vue-sxo': path.resolve(__dirname, 'adaptors/vue-sxo/src'),
            'solid-sxo': path.resolve(__dirname, 'adaptors/solid-sxo/src'),
            'virtual:sxo.css': path.resolve(__dirname, 'tests/empty.css'),
        },
    },
};

export default defineWorkspace([
    'packages/*',
    'adaptors/*',
    {
        plugins: [react()],
        test: {
            ...commonConfig,
            name: 'root-react',
            include: ['tests/**/*.react.test.{ts,tsx}'],
        },
        resolve: commonConfig.resolve,
    },
    {
        plugins: [vue()],
        test: {
            ...commonConfig,
            name: 'root-vue',
            include: ['tests/**/*.vue.test.{ts,tsx}'],
        },
        resolve: commonConfig.resolve,
    },
    {
        plugins: [solid({ ssr: false, hot: false })],
        test: {
            ...commonConfig,
            environment: 'jsdom',
            name: 'root-solid',
            include: ['tests/**/*.solid.test.{ts,tsx}'],
            server: {
                deps: {
                    inline: [/solid-js/],
                },
            },
        },
        resolve: {
            ...commonConfig.resolve,
            conditions: ['browser', 'development', 'solid'],
        },
    },
]);
