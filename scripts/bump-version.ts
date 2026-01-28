import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const targetVersion = '0.0.1';

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
    const content = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(content);

    if (pkg.version !== targetVersion) {
        console.log(`Bumping ${pkg.name || pkgPath} to ${targetVersion}`);
        pkg.version = targetVersion;
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 4) + '\n', 'utf8');
    }
}

console.log('All packages bumped successfully.');
