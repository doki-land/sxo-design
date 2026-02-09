import { defineConfig } from 'tsup';
import esbuildSvelte from 'esbuild-svelte';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  esbuildPlugins: [esbuildSvelte() as any],
  external: ['svelte'],
});
