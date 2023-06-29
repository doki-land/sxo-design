import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { sharedBuildOptions } from '../../vite.workspace';

export default defineConfig({
    // @ts-expect-error
    builder: 'rolldown',
    plugins: [
        vue(),
        dts({
            include: ['src'],
            insertTypesEntry: true,
            outDir: 'dist',
        }),
    ],
    css: {
        transformer: 'lightningcss',
    },
    build: sharedBuildOptions(__dirname, 'VueSxo'),
});
