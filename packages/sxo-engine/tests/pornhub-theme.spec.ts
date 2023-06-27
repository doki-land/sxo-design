import { describe, it, expect } from 'vitest';
import { pornhubTheme } from '../../theme-pornhub/src/tokens';
import { StyleEngine } from '../src/engine';

describe('StyleEngine with PornHub Theme', () => {
    const engine = new StyleEngine(pornhubTheme);

    it('should generate correct CSS for primary background', () => {
        const css = engine.generate('bg-primary');
        expect(css).toContain('--sxo-color-primary');
    });

    it('should generate correct CSS for primary text', () => {
        const css = engine.generate('text-primary');
        expect(css).toContain('--sxo-color-text-primary');
    });

    it('should generate correct CSS for primary background color', () => {
        const css = engine.generate('bg-background-primary');
        expect(css).toContain('--sxo-color-background-primary');
    });

    it('should generate correct CSS for small rounded corners', () => {
        const css = engine.generate('rounded-sm');
        expect(css).toContain('border-radius: var(--sxo-borderRadius-sm)');
    });

    it('should generate correct CSS for hard accent shadow', () => {
        const css = engine.generate('shadow-hard-accent');
        expect(css).toContain('box-shadow: var(--sxo-boxShadow-hard-accent)');
    });

    it('should generate correct CSS for sans font', () => {
        const css = engine.generate('font-sans');
        expect(css).toContain('font-family: var(--sxo-typography-fontFamily-sans)');
    });
});
