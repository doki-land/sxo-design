import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { cvoReact } from '@cvo/plugin-react';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        cvoReact(),
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
