import { describe, expect, it } from 'vitest';
import { defaultTokens } from '../../../sxo-design/src/tokens';
import { StyleEngine } from '../../src/engine';

describe('Typography Rules', () => {
    const engine = new StyleEngine(defaultTokens);

    describe('Font Size', () => {
        it('should handle tokenized font sizes', () => {
            expect(engine.generate('text-xs')).toContain(
                'font-size: var(--sxo-typography-fontSize-xs)',
            );
            expect(engine.generate('text-sm')).toContain(
                'font-size: var(--sxo-typography-fontSize-sm)',
            );
            expect(engine.generate('text-base')).toContain(
                'font-size: var(--sxo-typography-fontSize-base)',
            );
            expect(engine.generate('text-lg')).toContain(
                'font-size: var(--sxo-typography-fontSize-lg)',
            );
            expect(engine.generate('text-xl')).toContain(
                'font-size: var(--sxo-typography-fontSize-xl)',
            );
        });

        it('should handle numeric font sizes', () => {
            expect(engine.generate('text-14')).toContain('font-size: 14px');
            expect(engine.generate('text-16')).toContain('font-size: 16px');
            expect(engine.generate('text-1rem')).toContain('font-size: 1rem');
        });

        it('should handle arbitrary font sizes', () => {
            expect(engine.generate('text-[2rem]')).toContain('font-size: 2rem');
            expect(engine.generate('text-[15px]')).toContain('font-size: 15px');
        });
    });

    describe('Font Weight', () => {
        it('should handle tokenized font weights', () => {
            expect(engine.generate('font-thin')).toContain(
                'font-weight: var(--sxo-typography-fontWeight-thin)',
            );
            expect(engine.generate('font-normal')).toContain(
                'font-weight: var(--sxo-typography-fontWeight-normal)',
            );
            expect(engine.generate('font-medium')).toContain(
                'font-weight: var(--sxo-typography-fontWeight-medium)',
            );
            expect(engine.generate('font-bold')).toContain(
                'font-weight: var(--sxo-typography-fontWeight-bold)',
            );
        });

        it('should handle numeric font weights', () => {
            expect(engine.generate('font-400')).toContain('font-weight: 400');
            expect(engine.generate('font-700')).toContain('font-weight: 700');
        });

        it('should handle arbitrary font weights', () => {
            expect(engine.generate('font-[900]')).toContain('font-weight: 900');
        });
    });

    describe('Text Color & Opacity', () => {
        it('should handle text color from tokens', () => {
            const css = engine.generate('text-primary');
            expect(css).toContain('--sxo-text-color: var(--sxo-color-text-primary)');
            expect(css).toContain(
                'color: color-mix(in srgb, var(--sxo-text-color), transparent calc(100% - var(--sxo-text-opacity)))',
            );
        });

        it('should handle text opacity', () => {
            expect(engine.generate('text-opacity-50')).toContain('--sxo-text-opacity: 50%');
            expect(engine.generate('text-opacity-[0.2]')).toContain('--sxo-text-opacity: 0.2');
        });

        it('should handle arbitrary text color', () => {
            expect(engine.generate('text-[#123456]')).toContain('--sxo-text-color: #123456');
        });

        it('should handle text color with opacity', () => {
            const css = engine.generate('text-primary/50');
            expect(css).toContain(
                'color: color-mix(in srgb, var(--sxo-color-text-primary), transparent calc(100% - 50%))',
            );
        });
    });

    describe('Font Family', () => {
        it('should handle font families', () => {
            expect(engine.generate('font-sans')).toContain(
                'font-family: var(--sxo-typography-fontFamily-sans)',
            );
            expect(engine.generate('font-serif')).toContain(
                'font-family: var(--sxo-typography-fontFamily-serif)',
            );
            expect(engine.generate('font-mono')).toContain(
                'font-family: var(--sxo-typography-fontFamily-mono)',
            );
        });
    });
});
