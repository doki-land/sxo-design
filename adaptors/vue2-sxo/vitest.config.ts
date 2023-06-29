import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue2';
import { defineConfig } from 'vitest/config';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            vue: require.resolve('vue/dist/vue.runtime.esm.js'),
            'vue-template-compiler': require.resolve('vue-template-compiler'),
            '@vue/test-utils': require.resolve('@vue/test-utils'),
            '@sxo/ui': path.resolve(__dirname, '../../packages/sxo-ui/src'),
            '@sxo/design': path.resolve(__dirname, '../../packages/sxo-design/src'),
            '@sxo/engine': path.resolve(__dirname, '../../packages/sxo-engine/src'),
        },
        dedupe: ['vue', 'vue-template-compiler', '@vue/test-utils'],
    },
    test: {
        environment: 'happy-dom',
        globals: true,
        setupFiles: ['./tests/setup.ts'],
        server: {
            deps: {
                inline: ['@vue/test-utils', 'vue', 'vue-template-compiler'],
            },
        },
    },
});
