import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tokensToCssVars } from '../../sxo-design/src/index.ts';
import { StyleEngine } from '../../sxo-engine/src/index.ts';
import * as components from '../../sxo-ui/src/components/index.ts';
import { antdTheme } from '../../theme-antd/src/index.ts';
import { githubTheme } from '../../theme-github/src/index.ts';
import { pornhubTheme } from '../../theme-pornhub/src/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

async function build() {
    console.log('🚀 Starting SXO Bundle build...');

    // 1. Collect all possible classes from components
    const allClassNames = new Set();

    // Helper to add classes
    const addClasses = (classes) => {
        if (!classes) return;
        classes
            .split(/\s+/)
            .filter(Boolean)
            .forEach((c) => allClassNames.add(c));
    };

    // Iterate through components and variants (This is a simplified version for AOT)
    // In a real scenario, we might want to be more exhaustive or scan source files
    console.log('📦 Scanning components for classes...');

    // Example: Button
    const buttonVariants = ['primary', 'secondary', 'accent', 'outline', 'ghost'];
    const buttonSizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    buttonVariants.forEach((v) => {
        buttonSizes.forEach((s) => {
            addClasses(components.getButtonClasses({ variant: v, size: s }));
        });
    });

    // Example: Input
    addClasses(components.getInputClasses({}));

    // Add some common utility classes that users might need (Bootstrap-like)
    const utilities = [
        'm-0',
        'm-1',
        'm-2',
        'm-3',
        'm-4',
        'm-8',
        'p-0',
        'p-1',
        'p-2',
        'p-3',
        'p-4',
        'p-8',
        'flex',
        'grid',
        'items-center',
        'justify-between',
        'gap-2',
        'gap-4',
        'w-full',
        'h-full',
        'min-h-screen',
        'text-center',
        'font-bold',
        'italic',
        'rounded',
        'rounded-md',
        'rounded-lg',
        'rounded-full',
        'shadow-sm',
        'shadow-md',
        'shadow-lg',
    ];
    utilities.forEach((c) => allClassNames.add(c));

    // 2. Generate Core CSS (using a default theme for the rules, but variables will be used)
    console.log('🎨 Generating core CSS...');
    const engine = new StyleEngine(pornhubTheme); // Use any theme for rules
    const coreCss = engine.generateSheet(allClassNames);
    fs.writeFileSync(path.join(distDir, 'sxo-core.css'), coreCss);

    // 3. Generate Theme CSS files
    console.log('🌈 Generating theme files...');
    const themes = {
        pornhub: pornhubTheme,
        github: githubTheme,
        antd: antdTheme,
    };

    for (const [name, tokens] of Object.entries(themes)) {
        const cssVars = tokensToCssVars(tokens);
        const themeContent = `[data-sxo-theme="${name}"] {\n${cssVars}\n}`;
        fs.writeFileSync(path.join(distDir, `sxo-theme-${name}.css`), themeContent);
    }

    // 4. Create sxo.js runtime
    console.log('v Creating sxo.js runtime...');
    const runtimeJs = `
(function() {
    const SXO = {
        setTheme: function(themeName) {
            document.documentElement.setAttribute('data-sxo-theme', themeName);
            localStorage.setItem('sxo-theme', themeName);
        },
        init: function() {
            const savedTheme = localStorage.getItem('sxo-theme') || 'pornhub';
            this.setTheme(savedTheme);
            console.log('SXO Runtime Initialized');
        }
    };
    window.SXO = SXO;
    document.addEventListener('DOMContentLoaded', () => SXO.init());
})();
    `;
    fs.writeFileSync(path.join(distDir, 'sxo.js'), runtimeJs);

    console.log('✅ Build complete! Files generated in packages/sxo-bundle/dist');
}

build().catch(console.error);
