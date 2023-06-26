import { generateDemo } from './demo';
import * as fs from 'fs';
import * as path from 'path';

const html = generateDemo();
const outputPath = path.join(__dirname, '../demo.html');

fs.writeFileSync(outputPath, html);
console.log(`Demo HTML generated at: ${outputPath}`);
