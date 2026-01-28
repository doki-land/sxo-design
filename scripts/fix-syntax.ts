import fs from 'node:fs';
import path from 'node:path';

/**
 * 修复 packages 和 adaptors 目录下的 vite.config.ts 中的常见语法问题
 */

const rootDir = process.cwd();
const packagesDir = path.join(rootDir, 'packages');
const adaptorsDir = path.join(rootDir, 'adaptors');

function fixSyntax(filePath: string) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;

    // 1. 修复 ", skipDiagnostics" 问题 (v1)
    content = content.replace(/\{\s*,\s*skipDiagnostics/g, '{ skipDiagnostics');

    // 2. 修复孤立的逗号问题 (v2)
    content = content.replace(
        /\n\s*,\s*skipDiagnostics: true/g,
        ',\n            skipDiagnostics: true',
    );

    // 3. 修复双逗号问题 (v3)
    content = content.replace(/,,/g, ',');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`[FIX] 已修复: ${filePath}`);
    }
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

console.log('正在检查并修复语法问题...');
processDir(packagesDir);
processDir(adaptorsDir);
console.log('修复完成。');
