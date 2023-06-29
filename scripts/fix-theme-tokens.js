const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const packagesDir = path.join(rootDir, 'packages');

function fixThemeTokens(pkgPath) {
    const tokensPath = path.join(pkgPath, 'src/tokens.ts');
    if (!fs.existsSync(tokensPath)) return;

    let content = fs.readFileSync(tokensPath, 'utf-8');

    // Add xl to borderRadius if missing
    if (content.includes('borderRadius: {') && !content.includes('xl:')) {
        content = content.replace(/borderRadius: \{([^}]*)\}/, (match, p1) => {
            if (p1.includes('xl:')) return match;
            return `borderRadius: {${p1}        xl: '12px',\n    }`;
        });
    }

    // Add none and xl to boxShadow if missing
    if (content.includes('boxShadow: {')) {
        content = content.replace(/boxShadow: \{([^}]*)\}/, (_match, p1) => {
            let newContent = p1;
            if (!newContent.includes('none:')) {
                newContent = `\n        none: 'none',${newContent}`;
            }
            if (!newContent.includes('xl:')) {
                newContent = `${newContent}        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',\n    }`;
            }
            return `boxShadow: {${newContent}`;
        });
    }

    fs.writeFileSync(tokensPath, content);
    console.log(`Fixed tokens in ${pkgPath}`);
}

const themes = fs.readdirSync(packagesDir).filter((f) => f.startsWith('theme-'));
for (const theme of themes) {
    fixThemeTokens(path.join(packagesDir, theme));
}
