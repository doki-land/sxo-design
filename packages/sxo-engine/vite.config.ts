import oxc from 'unplugin-oxc/vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { sharedBuildOptions } from '../../vite.workspace';

export default defineConfig({
    // @ts-expect-error
    builder: 'rolldown',
    plugins: [
        oxc(),
        dts({
            include: ['src'],
            insertTypesEntry: true,
            outDir: 'dist',
        }),
    ],
    css: {
        transformer: 'lightningcss',
    },
    build: sharedBuildOptions(__dirname, 'Engine'),
});
