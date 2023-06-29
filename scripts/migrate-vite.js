const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const packagesDir = path.join(rootDir, 'packages');
const adaptorsDir = path.join(rootDir, 'adaptors');

const _viteConfigTemplate = (name) => `import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            include: ['src'],
            insertTypesEntry: true,
        }),
    ],
    css: {
        transformer: 'lightningcss',
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: '${name}',
            fileName: 'index',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: [(id) => id.startsWith('@sxo/') || id === 'vue' || id === 'react' || id === 'solid-js' || id === 'svelte'],
        },
        outDir: 'dist',
        emptyOutDir: true,
        cssMinify: 'lightningcss',
    },
});
`;

function migratePackage(pkgPath) {
    const packageJsonPath = path.join(pkgPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) return;

    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    console.log(`Migrating ${pkg.name}...`);

    // Detect entry point
    let entry = 'src/index.ts';
    if (fs.existsSync(path.join(pkgPath, 'src/index.tsx'))) {
        entry = 'src/index.tsx';
    } else if (fs.existsSync(path.join(pkgPath, 'src/index.js'))) {
        entry = 'src/index.js';
    }

    pkg.main = './dist/index.cjs';
    pkg.module = './dist/index.js';
    pkg.types = './dist/index.d.ts';
    pkg.type = 'module';
    pkg.exports = {
        '.': {
            types: './dist/index.d.ts',
            import: './dist/index.js',
            require: './dist/index.cjs',
        },
    };
    pkg.files = ['dist'];

    if (!pkg.scripts) pkg.scripts = {};
    pkg.scripts.build = 'vite build';
    pkg.scripts.dev = 'vite build --watch';

    // Add vite and vite-plugin-dts if missing in devDependencies
    if (!pkg.devDependencies) pkg.devDependencies = {};
    if (!pkg.devDependencies.vite) pkg.devDependencies.vite = '^5.0.0';
    if (!pkg.devDependencies['vite-plugin-dts']) pkg.devDependencies['vite-plugin-dts'] = '^4.0.0';
    if (!pkg.devDependencies.typescript) pkg.devDependencies.typescript = '^5.0.0';

    fs.writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 4)}\n`);

    // Create vite.config.ts
    const viteConfigPath = path.join(pkgPath, 'vite.config.ts');
    const className = pkg.name
        .split('/')
        .pop()
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

    // Add plugins based on package name or deps
    const plugins = ["dts({ include: ['src'], insertTypesEntry: true })"];
    const imports = ["import dts from 'vite-plugin-dts';"];

    if (pkg.name.includes('react')) {
        imports.push("import react from '@vitejs/plugin-react';");
        plugins.unshift('react()');
    } else if (pkg.name.includes('vue2')) {
        imports.push("import vue2 from '@vitejs/plugin-vue2';");
        plugins.unshift('vue2()');
    } else if (pkg.name.includes('vue')) {
        imports.push("import vue from '@vitejs/plugin-vue';");
        plugins.unshift('vue()');
    } else if (pkg.name.includes('solid')) {
        imports.push("import solidPlugin from 'vite-plugin-solid';");
        plugins.unshift('solidPlugin()');
    } else if (pkg.name.includes('svelte')) {
        imports.push("import { svelte } from '@sveltejs/vite-plugin-svelte';");
        plugins.unshift('svelte()');
    }

    const configContent = `import { defineConfig } from 'vite';
import { resolve } from 'path';
${imports.join('\n')}

export default defineConfig({
    plugins: [
        ${plugins.join(',\n        ')}
    ],
    css: {
        transformer: 'lightningcss',
    },
    build: {
        lib: {
            entry: resolve(__dirname, '${entry}'),
            name: '${className}',
            fileName: 'index',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
                    external: [
                        '@sxo/design',
                        '@sxo/engine',
                        '@sxo/ui',
                        '@sxo/component-admin',
                        '@sxo/component-icons',
                        '@sxo/component-table',
                        '@sxo/theme-antd',
                        '@sxo/theme-material',
                        'vue',
                        'vue-demi',
                        'react',
                        'react-dom',
                        'react/jsx-runtime',
                        'solid-js',
                        'solid-js/web',
                        'solid-js/store',
                        'svelte',
                        'alpinejs'
                    ],
                },
        outDir: 'dist',
        emptyOutDir: true,
        cssMinify: 'lightningcss',
    },
});
`;
    fs.writeFileSync(viteConfigPath, configContent);
}

// Themes
const themes = fs.readdirSync(packagesDir).filter((f) => f.startsWith('theme-'));
for (const theme of themes) {
    migratePackage(path.join(packagesDir, theme));
}

// Components
const components = ['component-admin', 'component-icons', 'component-table'];
for (const comp of components) {
    migratePackage(path.join(packagesDir, comp));
}

// Others
const others = ['sxo-engine', 'sxo-ui', 'sxo-design'];
for (const other of others) {
    migratePackage(path.join(packagesDir, other));
}

// Adaptors
const adaptors = fs.readdirSync(adaptorsDir);
for (const adaptor of adaptors) {
    migratePackage(path.join(adaptorsDir, adaptor));
}

console.log('Migration complete!');
