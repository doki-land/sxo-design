import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { sharedBuildOptions } from '../../vite.workspace';

export default defineConfig({
    // @ts-expect-error
    builder: 'rolldown',
    plugins: [
        svelte(),
        dts({
            include: ['src'],
            insertTypesEntry: true,
            outDir: 'dist',
        }),
    ],
    css: {
        transformer: 'lightningcss',
    },
    build: sharedBuildOptions(__dirname, 'SvelteSxo'),
});
