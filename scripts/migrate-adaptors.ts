import fs from 'node:fs';
import path from 'node:path';

const adaptorsDir = path.resolve('adaptors');
const adaptors = fs
    .readdirSync(adaptorsDir)
    .filter((f) => fs.statSync(path.join(adaptorsDir, f)).isDirectory());

const getViteConfig = (name: string, framework: string) => {
    let plugins = "dts({ include: ['src'], insertTypesEntry: true })";
    let imports = "import dts from 'vite-plugin-dts';";
    const external = "['react', 'react-dom', 'vue', (id) => id.startsWith('@sxo/')]";

    if (framework === 'react') {
        imports = `import react from '@vitejs/plugin-react';\n${imports}`;
        plugins = `react(), ${plugins}`;
    } else if (framework === 'vue') {
        imports = `import vue from '@vitejs/plugin-vue';\n${imports}`;
        plugins = `vue(), ${plugins}`;
    } else if (framework === 'vue2') {
        imports = `import vue2 from '@vitejs/plugin-vue2';\n${imports}`;
        plugins = `vue2(), ${plugins}`;
    }

    return `import { defineConfig } from 'vite';
import { resolve } from 'path';
${imports}

export default defineConfig({
    plugins: [${plugins}],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: '${name}',
            fileName: 'index',
            formats: ['es', 'cjs'] as any,
        },
        rollupOptions: {
            external: ${external},
        },
        outDir: 'dist',
        emptyOutDir: true,
    },
});
`;
};

for (const adaptor of adaptors) {
    const adaptorDir = path.join(adaptorsDir, adaptor);
    const packageJsonPath = path.join(adaptorDir, 'package.json');
    const viteConfigPath = path.join(adaptorDir, 'vite.config.ts');

    if (fs.existsSync(packageJsonPath)) {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

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

        let framework = '';
        if (adaptor.includes('react')) {
            framework = 'react';
            pkg.devDependencies['@vitejs/plugin-react'] = '^4.0.0';
        } else if (adaptor === 'vue-sxo') {
            framework = 'vue';
            pkg.devDependencies['@vitejs/plugin-vue'] = '^5.0.0';
        } else if (adaptor === 'vue2-sxo') {
            framework = 'vue2';
            pkg.devDependencies['@vitejs/plugin-vue2'] = '^2.0.0';
        }

        fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 4));

        const className = adaptor
            .split('-')
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join('');
        fs.writeFileSync(viteConfigPath, getViteConfig(className, framework));

        console.log(`Updated adaptor ${adaptor}`);
    }
}
