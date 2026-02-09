import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { vitePluginSxo } from 'vite-plugin-sxo';

export default defineConfig({
    plugins: [
        react(),
        vitePluginSxo(),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    build: {
        rollupOptions: {
            // Ensure react and react-dom are not bundled twice if needed, 
            // but for SSG it's usually fine to bundle them.
        }
    }
});
