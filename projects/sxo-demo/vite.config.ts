import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePluginSxo } from 'vite-plugin-sxo';

export default defineConfig({
  plugins: [react(), vitePluginSxo()],
});
