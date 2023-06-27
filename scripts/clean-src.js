const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function cleanDir(dirPath) {
    if (!fs.existsSync(dirPath)) return;
    
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
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
            // Only delete if it's in a src directory
            if (filePath.includes(path.sep + 'src' + path.sep) || filePath.endsWith(path.sep + 'src')) {
                console.log(`Deleting artifact: ${filePath}`);
                fs.unlinkSync(filePath);
            }
        }
    });
}

const packagesDir = path.join(rootDir, 'packages');
const adaptorsDir = path.join(rootDir, 'adaptors');

if (fs.existsSync(packagesDir)) {
    fs.readdirSync(packagesDir).forEach(pkg => cleanDir(path.join(packagesDir, pkg, 'src')));
}

if (fs.existsSync(adaptorsDir)) {
    fs.readdirSync(adaptorsDir).forEach(pkg => cleanDir(path.join(adaptorsDir, pkg, 'src')));
}

console.log('Cleanup complete!');
