import fs from 'node:fs';
import path from 'node:path';

function getAllPackageJsons(dir: string, fileList: string[] = []): string[] {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
                getAllPackageJsons(filePath, fileList);
            }
        } else if (file === 'package.json') {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const rootDir = path.resolve(process.cwd());
const packageJsons = getAllPackageJsons(rootDir);

for (const pkgPath of packageJsons) {
    if (pkgPath === path.join(rootDir, 'package.json')) continue; // Skip root

    const content = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(content);
    
    let changed = false;

    // Ensure publishConfig exists for scoped packages
    if (pkg.name && pkg.name.startsWith('@sxo/')) {
        if (!pkg.publishConfig) {
            console.log(`Adding publishConfig to ${pkg.name}`);
            pkg.publishConfig = {
                access: 'public',
                main: './dist/index.cjs',
                module: './dist/index.js',
                types: './dist/index.d.ts',
                exports: {
                    '.': {
                        types: './dist/index.d.ts',
                        import: './dist/index.js',
                        require: './dist/index.cjs'
                    }
                }
            };
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 4) + '\n', 'utf8');
    }
}

console.log('Metadata check complete.');
