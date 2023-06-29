import { describe, expect, it } from 'vitest';
import { defaultTokens } from '../../../sxo-design/src/tokens';
import { StyleEngine } from '../../src/engine';

describe('Variants', () => {
    const engine = new StyleEngine(defaultTokens);

    it('should handle hover variant', () => {
        const css = engine.generate('hover:bg-primary');
        expect(css).toContain('.hover\\:bg-primary:hover');
    });

    it('should handle focus variant', () => {
        const css = engine.generate('focus:text-secondary');
        expect(css).toContain('.focus\\:text-secondary:focus');
    });

    it('should handle dark mode variant', () => {
        const css = engine.generate('dark:bg-black');
        expect(css).toContain('[data-sxo-mode="dark"] .dark\\:bg-black');
    });

    it('should handle group-hover variant', () => {
        const css = engine.generate('group-hover:opacity-100');
        expect(css).toContain('.group:hover .group-hover\\:opacity-100');
    });

    it('should handle multiple variants', () => {
        const css = engine.generate('dark:hover:bg-white');
        expect(css).toContain('[data-sxo-mode="dark"] .dark\\:hover\\:bg-white:hover');
    });
});
