import fs from 'node:fs';
import path from 'node:path';

const packagesDir = path.resolve('packages');
const themes = fs.readdirSync(packagesDir).filter((f) => f.startsWith('theme-'));

const viteConfigTemplate = (name: string) => `import { defineConfig } from 'vite';
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
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: '${name}',
            fileName: 'index',
            formats: ['es', 'cjs'] as any,
        },
        rollupOptions: {
            external: (id) => id.startsWith('@sxo/'),
        },
        outDir: 'dist',
        emptyOutDir: true,
    },
});
`;

for (const theme of themes) {
    const themeDir = path.join(packagesDir, theme);
    const packageJsonPath = path.join(themeDir, 'package.json');
    const viteConfigPath = path.join(themeDir, 'vite.config.ts');

    if (fs.existsSync(packageJsonPath)) {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

        // Update scripts and devDependencies
        pkg.scripts = {
            ...pkg.scripts,
            build: 'vite build',
            dev: 'vite build --watch',
        };
        delete pkg.scripts.test;

        pkg.devDependencies = {
            ...pkg.devDependencies,
            vite: '^5.0.0',
            'vite-plugin-dts': '^4.0.0',
            typescript: '^5.0.0',
        };

        fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 4));

        // Create vite.config.ts
        const className = theme
            .split('-')
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join('');
        fs.writeFileSync(viteConfigPath, viteConfigTemplate(className));

        console.log(`Updated ${theme}`);
    }
}
