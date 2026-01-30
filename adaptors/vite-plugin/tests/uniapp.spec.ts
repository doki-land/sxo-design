import { describe, expect, it } from 'vitest';
import { vitePluginSxo } from '../src/index';

describe('vite-plugin-sxo uniapp mode', () => {
    it('should escape class names in transform and load', async () => {
        const plugin = vitePluginSxo({ uniapp: true });
        const code = '<view class="bg-[#ff0000] hover:text-primary"></view>';
        const id = 'test.vue';

        // @ts-expect-error
        const result = await plugin.transform(code, id);
        
        expect(result).toBeDefined();
        if (result && typeof result !== 'string') {
            expect(result.code).toContain('bg-__h_ff0000_');
            expect(result.code).toContain('hover_text-primary');
            expect(result.code).not.toContain('bg-[#ff0000]');
            expect(result.code).not.toContain('hover:text-primary');
        }

        // @ts-expect-error
        const css = plugin.load('\0virtual:sxo.css');
        expect(css).toContain('.bg-__h_ff0000_');
        expect(css).toContain('.hover_text-primary');
        expect(css).not.toContain('.bg-\\[\\#ff0000\\]');
    });

    it('should handle complex arbitrary values', async () => {
        const plugin = vitePluginSxo({ uniapp: true });
        const code = '<view class="w-[100px] h-[50%]"></view>';
        const id = 'test.vue';

        // @ts-expect-error
        await plugin.transform(code, id);

        // @ts-expect-error
        const css = plugin.load('\0virtual:sxo.css');
        expect(css).toContain('.w-_100px_');
        expect(css).toContain('.h-_50_p__');
    });
});
