import fs from 'node:fs';
import path from 'node:path';

const IGNORE_DIRS = ['node_modules', '.git', 'target', 'dist', '.changeset', '.github', 'examples'];

const EXTENSIONS = ['.ts', '.tsx', '.vue', '.svelte', '.js', '.rs', '.md'];
const THRESHOLD = 800;

function countLines(filePath: string): number {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.split('\n').length;
}

function findFiles(dir: string, fileList: { path: string; lines: number }[] = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                findFiles(filePath, fileList);
            }
        } else {
            const ext = path.extname(file);
            if (EXTENSIONS.includes(ext)) {
                try {
                    const lines = countLines(filePath);
                    if (lines > THRESHOLD) {
                        fileList.push({ path: filePath, lines });
                    }
                } catch (_e) {
                    // Skip files that can't be read
                }
            }
        }
    }
    return fileList;
}

const rootDir = path.resolve(__dirname, '..');
console.log(`Searching for files > ${THRESHOLD} lines in ${rootDir}...`);

const largeFiles = findFiles(rootDir);

largeFiles.sort((a, b) => b.lines - a.lines);

console.log('\nResults:');
console.log('Lines\tStatus\tPath');
console.log('--------------------------------------------------');
for (const file of largeFiles) {
    const relativePath = path.relative(rootDir, file.path);
    const status = file.lines > 1000 ? '[CRITICAL]' : '[WARNING]';
    console.log(`${file.lines}\t${status}\t${relativePath}`);
}

if (largeFiles.length === 0) {
    console.log(`No files > ${THRESHOLD} lines found.`);
}
