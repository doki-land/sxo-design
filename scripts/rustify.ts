import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const targetDirs = ['packages', 'adaptors', 'examples'];

function transformViteConfig(filePath: string) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');

    // 1. Add builder: 'rolldown'
    if (content.includes('defineConfig({') && !content.includes("builder: 'rolldown'")) {
        content = content.replace(
            'defineConfig({',
            "defineConfig({\n    // @ts-ignore\n    builder: 'rolldown',",
        );
    }

    // 2. Add skipDiagnostics: true to dts plugin
    if (content.includes('dts(') && !content.includes('skipDiagnostics: true')) {
        content = content.replace(/dts\(\s*\{([\s\S]*?)\}\s*\)/, (_match, p1) => {
            const trimmed = p1.trim();
            if (trimmed) {
                // Avoid double comma if it already ends with one
                const separator = trimmed.endsWith(',') ? ' ' : ', ';
                return `dts({ ${trimmed}${separator}skipDiagnostics: true })`;
            }
            return `dts({ skipDiagnostics: true })`;
        });
        // Fallback for empty dts()
        content = content.replace(/dts\(\)/g, 'dts({ skipDiagnostics: true })');
    }

    fs.writeFileSync(filePath, content);
    console.log(`Transformed: ${filePath}`);
}

function processDir(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory()) {
            const viteConfigPath = path.join(dir, entry.name, 'vite.config.ts');
            transformViteConfig(viteConfigPath);
        }
    }
}

console.log('Rustifying project-sxo...');
for (const dir of targetDirs) {
    processDir(path.join(rootDir, dir));
}
console.log('Done!');
