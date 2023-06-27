import fs from 'node:fs';
import path from 'node:path';

/**
 * 精确清理 src 目录下的 .js 和 .d.ts 文件（以及对应的 .map 文件）
 * 避免误删 .json 或其他源文件
 */

const rootDir = path.resolve(__dirname, '..');

function isArtifact(fileName: string): boolean {
    // 需要清理的文件类型：
    // - .js
    // - .js.map
    // - .d.ts
    // - .d.ts.map
    
    // 明确排除 .json 文件
    if (fileName.endsWith('.json')) return false;
    
    return (
        fileName.endsWith('.js') ||
        fileName.endsWith('.js.map') ||
        fileName.endsWith('.d.ts') ||
        fileName.endsWith('.d.ts.map')
    );
}

function processDirectory(currentDir: string, inSrc: boolean = false) {
    if (!fs.existsSync(currentDir)) return;

    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);

        if (entry.isDirectory()) {
            // 跳过不需要扫描的目录
            if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') {
                continue;
            }

            // 递归处理，标记是否在 src 或 scripts 中
            processDirectory(fullPath, inSrc || entry.name === 'src' || entry.name === 'scripts');
        } else if (entry.isFile()) {
            // 清理逻辑：
            // 1. 如果在 src 目录下，清理所有 .js, .d.ts, .map
            // 2. 如果在根目录（不在 src 中），清理特定的配置文件产生的 .d.ts, .js
            const isConfigArtifact = 
                entry.name.startsWith('vite.config.') || 
                entry.name.startsWith('vitest.config.') ||
                entry.name.startsWith('postcss.config.') ||
                entry.name.startsWith('tailwind.config.');
            
            const isArtifactFile = isArtifact(entry.name);

            if ((inSrc && isArtifactFile) || (!inSrc && isConfigArtifact && (entry.name.endsWith('.d.ts') || entry.name.endsWith('.js') && !entry.name.includes('.config.js')))) {
                // 特殊处理：如果 vite.config.ts 生成了 vite.config.js 或 vite.config.d.ts，则删除
                // 注意不要误删手写的 .config.js 文件（如果有的话）
                
                // 更安全的判断：如果同名 .ts 或 .tsx 存在，则认为 .js/.d.ts 是产物
                const baseName = entry.name.replace(/\.(d\.ts|js|js\.map|d\.ts\.map)$/, '');
                const hasSource = 
                    fs.existsSync(path.join(currentDir, baseName + '.ts')) || 
                    fs.existsSync(path.join(currentDir, baseName + '.tsx'));

                if (hasSource && isArtifactFile) {
                    try {
                        fs.unlinkSync(fullPath);
                        console.log(`[CLEAN] 已删除: ${fullPath}`);
                    } catch (err) {
                        console.error(`[ERROR] 无法删除 ${fullPath}:`, err);
                    }
                }
            }
        }
    }
}

console.log(`正在从 ${rootDir} 的 src 目录中清理编译产物...`);
processDirectory(rootDir);
console.log('清理完成。');
