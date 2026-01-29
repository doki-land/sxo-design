import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        react(),
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
