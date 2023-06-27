import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            include: ['src'],
            insertTypesEntry: true,
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
