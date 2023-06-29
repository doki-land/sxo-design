import { defaultTokens } from '@sxo/design';
import { StyleEngine } from '@sxo/engine';
import type { Plugin, ViteDevServer } from 'vite';

export interface VitePluginSxoOptions {
    /**
     * Enable debug mode for verbose logging
     */
    debug?: boolean;
    /**
     * Warn about classes that look like SXO classes but are not found in the engine.
     * @default false
     */
    warnUnknown?: boolean;
    /**
     * Files to include for scanning. Supports regex or glob patterns.
     */
    include?: (string | RegExp)[];
    /**
     * Files to exclude from scanning. Supports regex or glob patterns.
     */
    exclude?: (string | RegExp)[];
    /**
     * Theme tokens to use for static analysis
     */
    tokens?: any;
}

export function vitePluginSxo(options: VitePluginSxoOptions = {}): Plugin {
    const engine = new StyleEngine(defaultTokens);
    const classes = new Set<string>();
    const ignoredClasses = new Set<string>();
    const missedClasses = new Map<string, Set<string>>(); // cls -> Set of file IDs
    const virtualModuleId = 'virtual:sxo.css';
    const resolvedVirtualModuleId = `\0${virtualModuleId}`;
    let server: ViteDevServer | undefined;

    const {
        include = [/\.(vue|tsx|jsx|html|svelte)$/],
        exclude = [/[\\/]node_modules[\\/]/, /[\\/](dist|build|target|out|temp)[\\/]/],
        warnUnknown = false,
        debug = false,
    } = options;

    /**
     * Scans code for class names that might be SXO atomic classes
     */
    const scan = (code: string, id: string) => {
        // Broad match for potential class names:
        // Matches sequences of alphanumeric chars, dashes, colons, slashes, brackets, dots, percents, underscores, hashes
        // Supports arbitrary values with spaces inside brackets [ ... ]
        // Refined regex: Ensure it doesn't end with a colon (which is usually an object key or label)
        const regex = /(?<![a-zA-Z0-9-])([a-zA-Z0-9-:[\]/%._#]+(?:\[[^\]]+\])?)(?<!:)(?!:)/g;
        let match;
        let foundNew = false;

        // Common JS keywords, built-ins, React props, and SVG attributes
        const skipWords = new Set([
            'export',
            'import',
            'const',
            'let',
            'var',
            'function',
            'return',
            'if',
            'else',
            'for',
            'while',
            'switch',
            'case',
            'break',
            'continue',
            'default',
            'try',
            'catch',
            'finally',
            'throw',
            'class',
            'extends',
            'super',
            'this',
            'new',
            'delete',
            'typeof',
            'void',
            'instanceof',
            'in',
            'of',
            'async',
            'await',
            'yield',
            'null',
            'undefined',
            'true',
            'false',
            'NaN',
            'Infinity',
            'Object',
            'Array',
            'String',
            'Number',
            'Boolean',
            'Symbol',
            'Error',
            'RegExp',
            'Date',
            'Promise',
            'JSON',
            'Math',
            'Intl',
            'Console',
            'arguments',
            'window',
            'document',
            'process',
            'module',
            'exports',
            'require',
            'none',
            'auto',
            'inherit',
            'initial',
            'unset',
            // React/JSX common props
            'className',
            'style',
            'id',
            'key',
            'ref',
            'children',
            'onClick',
            'onChange',
            'onSubmit',
            'onKeyDown',
            'onKeyUp',
            'onKeyPress',
            'onFocus',
            'onBlur',
            'value',
            'defaultValue',
            'type',
            'name',
            'placeholder',
            'disabled',
            'readOnly',
            'required',
            'checked',
            'src',
            'alt',
            'href',
            'target',
            'rel',
            'role',
            'aria-',
            'data-',
            // SVG common attributes
            'width',
            'height',
            'viewBox',
            'fill',
            'xmlns',
            'stroke',
            'd',
            'points',
            'cx',
            'cy',
            'r',
            'x',
            'y',
            'x1',
            'y1',
            'x2',
            'y2',
            'strokeWidth',
            'strokeLinecap',
            'strokeLinejoin',
            'transform',
            'opacity',
        ]);

        while ((match = regex.exec(code)) !== null) {
            const cls = match[1];

            // Skip obviously too short or too long strings
            if (cls.length < 2 || cls.length > 50) continue;

            // Skip common JS keywords and non-class words (case-insensitive check)
            if (skipWords.has(cls) || skipWords.has(cls.toLowerCase())) continue;

            // Skip common URL protocols
            if (cls.toLowerCase() === 'http' || cls.toLowerCase() === 'https') continue;

            if (!classes.has(cls) && !ignoredClasses.has(cls)) {
                try {
                    // Check if the engine can actually generate something for this class
                    const css = engine.generate(cls);
                    if (css) {
                        classes.add(cls);
                        foundNew = true;
                        if (debug) {
                            console.log(`[SXO] Discovered: ${cls} in ${id.split('/').pop()}`);
                        }
                    } else {
                        const knownPrefixes = [
                            'bg-',
                            'text-',
                            'p-',
                            'm-',
                            'flex-',
                            'grid-',
                            'border-',
                            'rounded-',
                            'shadow-',
                            'w-',
                            'h-',
                            'opacity-',
                            'z-',
                            'top-',
                            'left-',
                            'right-',
                            'bottom-',
                            'inset-',
                            'gap-',
                            'justify-',
                            'items-',
                            'self-',
                            'align-',
                            'overflow-',
                            'pointer-',
                            'cursor-',
                            'whitespace-',
                            'break-',
                            'list-',
                            'table-',
                            'transition-',
                            'duration-',
                            'ease-',
                            'delay-',
                            'animate-',
                            'blur-',
                            'backdrop-',
                            'ring-',
                            'outline-',
                            'select-',
                            'fill-',
                            'stroke-',
                            'aspect-',
                            'origin-',
                            'scale-',
                            'rotate-',
                            'translate-',
                            'skew-',
                            'mix-',
                            'isolate-',
                            'appearance-',
                        ];

                        // Stricter "likely class" check:
                        // 1. Starts with known prefix
                        // 2. Contains variant colon (e.g. hover:), but isn't a URL and doesn't look like minified code
                        // 3. Doesn't look like a variable name (no camelCase or simple lowercase words unless prefixed)
                        const hasPrefix = knownPrefixes.some((p) =>
                            cls.toLowerCase().startsWith(p),
                        );
                        const hasVariant =
                            cls.includes(':') && !cls.includes('/') && !/^[0-9]/.test(cls);
                        const isArbitrary = cls.includes('[') && cls.includes(']');

                        const isLikelyClass = hasPrefix || hasVariant || isArbitrary;

                        if (isLikelyClass) {
                            if (warnUnknown) {
                                console.warn(
                                    `[SXO] Unknown/Invalid class: "${cls}" in ${id.split('/').pop()}`,
                                );
                            }

                            if (debug) {
                                if (!missedClasses.has(cls)) missedClasses.set(cls, new Set());
                                missedClasses.get(cls)!.add(id.split('/').pop()!);
                            }
                        }
                        ignoredClasses.add(cls);
                    }
                } catch (_e) {
                    // Ignore engine errors during scanning
                    ignoredClasses.add(cls);
                }
            }
        }
        return foundNew;
    };

    return {
        name: 'vite-plugin-sxo',

        buildStart() {
            if (debug) {
                console.log('[SXO] Plugin initialized');
            }
        },

        buildEnd() {
            if (debug && missedClasses.size > 0) {
                console.log('\n[SXO] --- Diagnostic Report (Missed Classes) ---');
                missedClasses.forEach((files, cls) => {
                    console.log(`- "${cls}" (seen in: ${Array.from(files).join(', ')})`);
                });
                console.log('[SXO] -------------------------------------------\n');
            }
        },

        configureServer(_server) {
            server = _server;

            // Inject middleware to handle /__sxo
            _server.middlewares.use((req, res, next) => {
                const url = req.url || '';
                const pathname = url.split('?')[0];

                // Handle /__sxo with or without base path
                const base = _server.config.base || '/';
                const isDiagnosticPath =
                    pathname === '/__sxo' ||
                    pathname === (base.endsWith('/') ? `${base}__sxo` : `${base}/__sxo`);

                if (isDiagnosticPath) {
                    if (debug) {
                        console.log(`[SXO] Serving diagnostics page (url: ${url})`);
                    }
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    res.statusCode = 200;

                    const missedList = Array.from(missedClasses.entries())
                        .map(
                            ([cls, files]) => `
                        <div class="item missed">
                            <div class="cls-info">
                                <span class="cls">${cls}</span>
                                <span class="reason">Not found in engine</span>
                            </div>
                            <span class="files">${Array.from(files).join(', ')}</span>
                        </div>
                    `,
                        )
                        .join('');

                    const foundList = Array.from(classes)
                        .sort()
                        .map(
                            (cls) => `
                        <div class="item found">
                            <span class="cls">${cls}</span>
                        </div>
                    `,
                        )
                        .join('');

                    res.end(`
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <title>SXO Diagnostics</title>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <style>
                                :root {
                                    --bg: #0f172a;
                                    --card-bg: #1e293b;
                                    --border: #334155;
                                    --text: #e2e8f0;
                                    --text-muted: #94a3b8;
                                    --primary: #38bdf8;
                                    --error: #ef4444;
                                    --error-bg: #450a0a;
                                    --success: #10b981;
                                    --success-bg: #064e3b;
                                }
                                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 2rem; background: var(--bg); color: var(--text); line-height: 1.5; margin: 0; }
                                .container { max-width: 1000px; margin: 0 auto; }
                                header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
                                h1 { color: var(--primary); margin: 0; font-size: 1.875rem; font-weight: 800; letter-spacing: -0.025em; }
                                .refresh-btn { background: var(--primary); color: var(--bg); border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer; text-decoration: none; font-size: 0.875rem; }
                                .section { margin-bottom: 2rem; border: 1px solid var(--border); padding: 1.5rem; border-radius: 0.75rem; background: var(--card-bg); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
                                .section h2 { margin-top: 0; margin-bottom: 1.25rem; font-size: 1.125rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem; }
                                .item { padding: 0.75rem 1rem; margin: 0.5rem 0; border-radius: 0.5rem; display: flex; justify-content: space-between; align-items: center; transition: transform 0.1s; }
                                .item:hover { transform: translateX(4px); }
                                .missed { background: var(--error-bg); border: 1px solid #991b1b; }
                                .found { background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); }
                                .cls-info { display: flex; flex-direction: column; gap: 2px; }
                                .cls { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-weight: 600; color: #fff; }
                                .reason { font-size: 0.75rem; color: var(--error); opacity: 0.8; }
                                .files { font-size: 0.75rem; color: var(--text-muted); background: rgba(0,0,0,0.3); padding: 0.25rem 0.5rem; border-radius: 0.375rem; max-width: 40%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                                .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
                                .stat-card { background: var(--card-bg); padding: 1.5rem; border-radius: 0.75rem; text-align: center; border: 1px solid var(--border); }
                                .stat-label { font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em; }
                                .stat-value { font-size: 2.5rem; font-weight: 800; color: var(--primary); }
                                .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.75rem; }
                                .empty { opacity: 0.5; font-style: italic; grid-column: 1 / -1; }
                                .badge { display: inline-flex; align-items: center; justify-content: center; width: 1.5rem; height: 1.5rem; border-radius: 9999px; background: var(--border); color: var(--text); font-size: 0.75rem; font-weight: 700; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <header>
                                    <h1>SXO Diagnostics</h1>
                                    <button onclick="window.location.reload()" class="refresh-btn">Refresh Data</button>
                                </header>

                                <div class="stats">
                                    <div class="stat-card">
                                        <div class="stat-label">Active Classes</div>
                                        <div class="stat-value">${classes.size}</div>
                                    </div>
                                    <div class="stat-card">
                                        <div class="stat-label">Missed Potential</div>
                                        <div class="stat-value" style="color: ${missedClasses.size > 0 ? 'var(--error)' : 'var(--success)'}">${missedClasses.size}</div>
                                    </div>
                                </div>
                                
                                <div class="section">
                                    <h2>
                                        Missed Classes
                                        <span class="badge">${missedClasses.size}</span>
                                    </h2>
                                    ${missedList || '<p class="empty">No missed classes detected. Your code is clean!</p>'}
                                </div>

                                <div class="section">
                                    <h2>
                                        Active Atomic Classes
                                        <span class="badge">${classes.size}</span>
                                    </h2>
                                    <div class="grid">
                                        ${foundList || '<p class="empty">No classes generated yet. Start coding to see them here.</p>'}
                                    </div>
                                </div>
                            </div>
                        </body>
                        </html>
                    `);
                    return;
                }
                next();
            });
        },

        resolveId(id) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId;
            }
            return null;
        },

        load(id) {
            if (id === resolvedVirtualModuleId) {
                try {
                    const vars = engine.generateTokenCssVars();
                    const styles = engine.generateSheet(classes);
                    if (debug) {
                        console.log(`[SXO] Generated ${classes.size} classes`);
                    }
                    return `${vars}\n\n${styles}`;
                } catch (e: any) {
                    console.error('[SXO] Error generating CSS:', e);
                    return `/* SXO Error: ${e.message || e} */`;
                }
            }
            return null;
        },

        transform(code, id) {
            // Check include
            const isIncluded = include.some((pattern) =>
                typeof pattern === 'string' ? id.includes(pattern) : pattern.test(id),
            );
            if (!isIncluded) return null;

            // Check exclude
            const isExcluded = exclude.some((pattern) =>
                typeof pattern === 'string' ? id.includes(pattern) : pattern.test(id),
            );
            if (isExcluded) {
                // Special case: allow @sxo modules even if they are in node_modules
                if (id.includes('node_modules') && id.includes('@sxo')) {
                    // continue
                } else {
                    return null;
                }
            }

            const foundNew = scan(code, id);

            if (foundNew && server) {
                const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
                if (mod) {
                    // Compatible way to invalidate and reload
                    server.moduleGraph.invalidateModule(mod);
                    if (server.reloadModule) {
                        server.reloadModule(mod).catch(() => {});
                    } else {
                        server.ws.send({
                            type: 'full-reload',
                        });
                    }
                }
            }

            return null;
        },
    };
}
