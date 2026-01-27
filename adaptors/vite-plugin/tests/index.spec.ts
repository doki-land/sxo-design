import { describe, expect, it } from 'vitest';
import { vitePluginSxo } from '../src/index';

describe('vite-plugin-sxo', () => {
    it('should have correct name', () => {
        const plugin = vitePluginSxo();
        expect(plugin.name).toBe('vite-plugin-sxo');
    });

    it('should define virtual module', () => {
        const plugin = vitePluginSxo();
        expect(plugin.resolveId).toBeDefined();

        // @ts-expect-error
        const resolved = plugin.resolveId('virtual:sxo.css');
        expect(resolved).toBe('\0virtual:sxo.css');
    });

    it('should handle virtual module loading', () => {
        const plugin = vitePluginSxo();
        // @ts-expect-error
        const content = plugin.load('\0virtual:sxo.css');
        expect(content).toBeTruthy();
        if (typeof content === 'string') {
            expect(content).toContain(':root');
        }
    });

    it('should scan code for classes', async () => {
        const plugin = vitePluginSxo({ debug: true });
        const code = '<div class="bg-primary-500 text-white p-4"></div>';
        const id = 'test.vue';

        // @ts-expect-error
        await plugin.transform(code, id);

        // @ts-expect-error
        const css = plugin.load('\0virtual:sxo.css');
        expect(css).toContain('.bg-primary-500');
        expect(css).toContain('.text-white');
        expect(css).toContain('.p-4');
    });
});
