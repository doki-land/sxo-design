const fs = require('node:fs');
const path = require('node:path');

const COMPONENTS_DIR = path.join(__dirname, '../adaptors/vue-sxo/src/components');
const DOCS_DIR = path.join(__dirname, '../documentions/zh/components');

function extractProps(content: string) {
    const propsMatch = content.match(/props:\s*{([\s\S]*?)\s*},\s*(emits|setup)/);
    if (!propsMatch) return [];

    const propsStr = propsMatch[1];
    const props = [];

    // Very basic parsing for props
    // Matches: propName: { ... } or propName: Type
    const propRegex = /(\/\*\*([\s\S]*?)\*\/)?\s*(\w+):\s*({[\s\S]*?}|[\w[\], ]+)/g;
    let match = propRegex.exec(propsStr);

    while (match !== null) {
        const description = match[2] ? match[2].trim().replace(/\* /g, '') : '-';
        const name = match[3];
        const definition = match[4];

        let type = '-';
        let defaultValue = '-';

        if (definition.startsWith('{')) {
            const typeMatch = definition.match(/type:\s*([^,}\n]+)/);
            const defaultMatch = definition.match(/default:\s*([^,}\n]+)/);

            if (typeMatch) {
                type = typeMatch[1]
                    .trim()
                    .replace(/as PropType<.*?>/g, '')
                    .replace(/PropType<.*?>/g, '')
                    .replace(/\[\s*/g, '[')
                    .replace(/\s*\]/g, ']')
                    .replace(/,\s*/g, ', ')
                    .trim();
            }
            if (defaultMatch) {
                defaultValue = defaultMatch[1].trim();
                if (defaultValue.includes('=>')) {
                    defaultValue = defaultValue.split('=>')[1].trim();
                }
            }
        } else {
            type = definition.trim();
        }

        props.push({ name, description, type, default: defaultValue });
        match = propRegex.exec(propsStr);
    }

    return props;
}

function generateMarkdownTable(props: any[]) {
    if (props.length === 0) return '';

    let md = '### API\n\n';
    md += '| 参数 | 说明 | 类型 | 默认值 |\n';
    md += '| --- | --- | --- | --- |\n';

    for (const prop of props) {
        md += `| ${prop.name} | ${prop.description} | \`${prop.type}\` | \`${prop.default}\` |\n`;
    }

    return md;
}

async function run() {
    const files = fs.readdirSync(COMPONENTS_DIR).filter((f: string) => f.endsWith('.ts'));

    for (const file of files) {
        const filePath = path.join(COMPONENTS_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');

        const props = extractProps(content);
        if (props.length > 0) {
            const componentName = file.replace('.ts', '').toLowerCase();
            const docPath = path.join(DOCS_DIR, `${componentName}.md`);

            if (fs.existsSync(docPath)) {
                let docContent = fs.readFileSync(docPath, 'utf-8');
                const apiSection = generateMarkdownTable(props);

                // Replace or append API section
                if (docContent.includes('### API')) {
                    docContent = docContent.replace(/### API[\s\S]*/, apiSection);
                } else {
                    docContent += `\n\n${apiSection}`;
                }

                fs.writeFileSync(docPath, docContent);
                console.log(`Updated documentation for ${componentName}`);
            }
        }
    }
}

run();
