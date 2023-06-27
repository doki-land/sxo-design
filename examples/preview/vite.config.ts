import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { vitePluginSxo } from 'vite-plugin-sxo';

export default defineConfig({
    plugins: [react(), vitePluginSxo({ debug: true })],
    server: {
        port: 5173,
    },
});
