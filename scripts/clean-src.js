const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');

function cleanDir(dirPath) {
    if (!fs.existsSync(dirPath)) return;

    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            cleanDir(filePath);
        } else if (
            file.endsWith('.js') ||
            file.endsWith('.d.ts') ||
            file.endsWith('.js.map') ||
            file.endsWith('.d.ts.map')
        ) {
            console.log(`Deleting artifact: ${filePath}`);
            fs.unlinkSync(filePath);
        }
    });
}

const packagesDir = path.join(rootDir, 'packages');
const adaptorsDir = path.join(rootDir, 'adaptors');

if (fs.existsSync(packagesDir)) {
    for (const pkg of fs.readdirSync(packagesDir)) {
        cleanDir(path.join(packagesDir, pkg, 'src'));
    }
}

if (fs.existsSync(adaptorsDir)) {
    for (const pkg of fs.readdirSync(adaptorsDir)) {
        cleanDir(path.join(adaptorsDir, pkg, 'src'));
    }
}

console.log('Cleanup complete!');
