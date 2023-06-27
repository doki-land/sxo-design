import { defaultTokens } from '@sxo/design';
import { StyleEngine } from '@sxo/engine';
import type { Plugin, ViteDevServer } from 'vite';

export interface VitePluginSxoOptions {
    debug?: boolean;
}

export function vitePluginSxo(options: VitePluginSxoOptions = {}): Plugin {
    const engine = new StyleEngine(defaultTokens);
    const classes = new Set<string>();
    const ignoredClasses = new Set<string>();
    const virtualModuleId = 'virtual:sxo.css';
    const resolvedVirtualModuleId = '\0' + virtualModuleId;
    let server: ViteDevServer | undefined;

    /**
     * Scans code for class names that might be SXO atomic classes
     * Uses a broad strategy to catch classes in template literals, variables, etc.
     */
    const scan = (code: string, id: string) => {
        // Broad match for potential class names:
        // Matches sequences of alphanumeric chars, dashes, colons, slashes, brackets, dots, percents
        const regex = /([a-zA-Z0-9-:[\]/%]+)/g;
        let match;
        let foundNew = false;

        while ((match = regex.exec(code)) !== null) {
            const cls = match[1];
            
            // Skip obviously too short or too long strings to save perf
            if (cls.length < 2 || cls.length > 50) continue;

            if (!classes.has(cls) && !ignoredClasses.has(cls)) {
                // Check if the engine can actually generate something for this class
                const css = engine.generate(cls);
                if (css) {
                    classes.add(cls);
                    foundNew = true;
                    if (options.debug) {
                        console.log(`[SXO] Discovered: ${cls} in ${id.split('/').pop()}`);
                    }
                } else {
                    // Only log as warning if it looks like an atomic class (contains - or :)
                    if (cls.includes('-') || cls.includes(':')) {
                        ignoredClasses.add(cls);
                        if (options.debug) {
                            console.warn(`[SXO] Unknown/Invalid class: "${cls}" in ${id.split('/').pop()}`);
                        }
                    }
                }
            }
        }
        return foundNew;
    };

    return {
        name: 'vite-plugin-sxo',

        buildStart() {
            if (options.debug) {
                console.log('[SXO] Plugin initialized with debug mode');
            }
        },

        configureServer(_server) {
            server = _server;
        },

        resolveId(id) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId;
            }
            return null;
        },

        load(id) {
            if (id === resolvedVirtualModuleId) {
                // Generate CSS variables and all collected classes
                const vars = engine.generateTokenCssVars();
                const styles = engine.generateSheet(classes);
                if (options.debug) {
                    console.log(`[SXO] Generated ${classes.size} classes`);
                }
                return `${vars}\n\n${styles}`;
            }
            return null;
        },

        transform(code, id) {
            // Scan everything except non-code assets
            // Explicitly allow node_modules/@sxo to be scanned
            if (id.includes('node_modules') && !id.includes('@sxo')) return null;
            
            if (!/\.(vue|svelte|[jt]sx?|html)$/.test(id)) return null;

            const foundNew = scan(code, id);

            // If new classes were found, trigger HMR for the virtual CSS module
            if (foundNew && server) {
                const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
                if (mod) {
                    server.reloadModule(mod);
                }
            }

            return null;
        },
    };
}
