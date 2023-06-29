import { resolve } from 'node:path';
import oxc from 'unplugin-oxc/vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

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
    build: {
        ssr: true,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'SXOCLI',
            fileName: () => `index.js`,
            formats: ['es'],
        },
        rollupOptions: {
            external: [
                'cac',
                'kolorist',
                'prompts',
                'execa',
                'fs-extra',
                'node:path',
                'node:fs',
                'node:process',
                'node:url',
                'path',
                'fs',
                'process',
                'url',
            ],
        },
        outDir: 'dist',
        sourcemap: true,
        minify: false,
    },
});
