import { Plugin, ViteDevServer } from 'vite';
import { StyleEngine } from '@sxo/engine';
import { defaultTokens } from '@sxo/design';

export function vitePluginSxo(): Plugin {
  const engine = new StyleEngine(defaultTokens);
  const classes = new Set<string>();
  const virtualModuleId = 'virtual:sxo.css';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;
  let server: ViteDevServer | undefined;

  /**
   * Scans code for class names that might be SXO atomic classes
   */
  const scan = (code: string) => {
    // Regex to match className="...", class="...", or sxo="..."
    const regex = /(?:class(?:Name)?|sxo)=["']([^"']+)["']/g;
    let match;
    let foundNew = false;

    while ((match = regex.exec(code)) !== null) {
      const classList = match[1].split(/\s+/);
      for (const cls of classList) {
        if (cls && !classes.has(cls)) {
          // Check if the engine can actually generate something for this class
          // This prevents bloating the CSS with non-SXO classes
          if (engine.generate(cls)) {
            classes.add(cls);
            foundNew = true;
          }
        }
      }
    }
    return foundNew;
  };

  return {
    name: 'vite-plugin-sxo',

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
        const styles = engine.generateBatch(classes);
        return `${vars}\n\n${styles}`;
      }
      return null;
    },

    transform(code, id) {
      // Skip node_modules and non-relevant files
      if (id.includes('node_modules')) return null;
      if (!/\.(vue|svelte|[jt]sx?|html)$/.test(id)) return null;

      const foundNew = scan(code);

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
