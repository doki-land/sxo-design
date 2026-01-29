import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { cvoReact } from '@cvo/plugin-react';
import { vitePluginSxo } from '@sxo/vite-plugin';

export default defineConfig({
    plugins: [
        react(),
        vitePluginSxo(),
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
