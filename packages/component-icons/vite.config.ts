import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ComponentIcons',
      fileName: 'index',
      formats: ['es'],
    },
    minify: false,
  },
});
