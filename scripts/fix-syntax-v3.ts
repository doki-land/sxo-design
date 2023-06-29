import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const packagesDir = path.join(rootDir, 'packages');
const adaptorsDir = path.join(rootDir, 'adaptors');

function fixSyntax(filePath: string) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');

    // Fix the double comma
    content = content.replace(/,,/g, ',');

    fs.writeFileSync(filePath, content);
}

function processDir(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory()) {
            const viteConfigPath = path.join(dir, entry.name, 'vite.config.ts');
            fixSyntax(viteConfigPath);
        }
    }
}

processDir(packagesDir);
processDir(adaptorsDir);
console.log('Fixed double commas.');
