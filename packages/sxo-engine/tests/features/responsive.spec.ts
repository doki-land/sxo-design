import { describe, expect, it } from 'vitest';
import { defaultTokens } from '../../../sxo-design/src/tokens';
import { StyleEngine } from '../../src/engine';

describe('Responsive Design', () => {
    const engine = new StyleEngine(defaultTokens);

    it('should handle sm breakpoint', () => {
        const css = engine.generate('sm:flex-row');
        expect(css).toContain('@media (min-width:');
        expect(css).toContain('.sm\\:flex-row');
    });

    it('should handle md breakpoint', () => {
        const css = engine.generate('md:w-1/2');
        expect(css).toContain('@media (min-width:');
        expect(css).toContain('.md\\:w-1\\/2');
    });

    it('should handle lg breakpoint', () => {
        const css = engine.generate('lg:grid-cols-3');
        expect(css).toContain('@media (min-width:');
        expect(css).toContain('.lg\\:grid-cols-3');
    });

    it('should handle combined responsive and state variants', () => {
        const css = engine.generate('md:hover:bg-primary');
        expect(css).toContain('@media (min-width:');
        expect(css).toContain('.md\\:hover\\:bg-primary:hover');
    });
});
