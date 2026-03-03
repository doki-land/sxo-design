import fs from 'node:fs';
import path from 'node:path';

const targetVersion = process.argv[2];

if (!targetVersion) {
    console.error('Usage: npx tsx scripts/bump-version.ts <version>');
    console.error('Example: npx tsx scripts/bump-version.ts 0.0.2');
    process.exit(1);
}

if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(targetVersion)) {
    console.error(`Invalid version format: ${targetVersion}`);
    process.exit(1);
}

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
let updatedCount = 0;

for (const pkgPath of packageJsons) {
    const content = fs.readFileSync(pkgPath, 'utf8');
    const pkg = JSON.parse(content);

    if (pkg.version && pkg.version !== targetVersion) {
        const relativePath = path.relative(rootDir, pkgPath);
        const privateTag = pkg.private ? ' [private]' : '';
        console.log(`${relativePath}${privateTag}: ${pkg.version} -> ${targetVersion}`);
        pkg.version = targetVersion;
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 4) + '\n', 'utf8');
        updatedCount++;
    }
}

console.log(`\nUpdated ${updatedCount} packages to version ${targetVersion}`);
