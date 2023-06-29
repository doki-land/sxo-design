import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const examplesDir = path.join(rootDir, 'examples');

function updateExamplePackageJson(dir: string) {
    const packageJsonPath = path.join(dir, 'package.json');
    if (!fs.existsSync(packageJsonPath)) return;

    const content = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    // Update build script
    if (content.scripts?.build) {
        content.scripts.build = 'vite build';
    }

    // Add type-check script if it doesn't exist
    if (content.scripts && !content.scripts['type-check']) {
        content.scripts['type-check'] = 'tsc --noEmit';
    }

    fs.writeFileSync(packageJsonPath, JSON.stringify(content, null, 4));
    console.log(`Updated: ${packageJsonPath}`);
}

function processExamples() {
    if (!fs.existsSync(examplesDir)) return;
    const entries = fs.readdirSync(examplesDir, { withFileTypes: true });
    for (const entry of entries) {
        if (entry.isDirectory()) {
            updateExamplePackageJson(path.join(examplesDir, entry.name));
        }
    }
}

processExamples();
console.log('Done updating examples!');
