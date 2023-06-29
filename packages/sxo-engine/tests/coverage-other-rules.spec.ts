import { defaultTokens } from '@sxo/design';
import { describe, expect, it } from 'vitest';
import { StyleEngine } from '../src/engine';

describe('Coverage Gaps - Other Rules', () => {
    const engine = new StyleEngine(defaultTokens as any);

    describe('Background Gaps', () => {
        it('should handle bg-position with numeric node', () => {
            // backgrounds.ts Line 17: return '';
            // bg-top-4 -> [bg, top, 4]
            const css = engine.generate('bg-top-4');
            expect(css).toContain('background-position: top');
        });

        it('should handle background-clip box types', () => {
            // backgrounds.ts Line 73-74: ['border', 'padding', 'content'].includes(val)
            expect(engine.generate('bg-clip-border')).toContain('background-clip: border-box');
            expect(engine.generate('bg-clip-padding')).toContain('background-clip: padding-box');
            expect(engine.generate('bg-clip-content')).toContain('background-clip: content-box');
        });

        it('should handle background-size literal guard', () => {
            // backgrounds.ts Line 96: if (node.value.startsWith('[')) return;
            // A malformed arbitrary value that the parser might treat as a literal
            const css = engine.generate('bg-size-[200%');
            expect(css).toBe('');
        });
    });

    describe('Border Gaps', () => {
        it('should handle border width from tokens', () => {
            // borders.ts Line 11-12
            const customTokens = {
                ...defaultTokens,
                borderWidth: { thin: '0.5px' },
            };
            const customEngine = new StyleEngine(customTokens as any);
            const css = customEngine.generate('border-thin');
            expect(css).toContain('border-width: 0.5px');
        });

        it('should handle border color fallback to generic resolveColor', () => {
            // borders.ts Line 25: resolveColor(..., { subGroup: 'border' }) || resolveColor(...)
            const css = engine.generate('border-primary');
            expect(css).toContain('border-color');
        });

        it('should handle border color with subGroup match', () => {
            // borders.ts Line 25: resolveColor(..., { subGroup: 'border' })
            // Create a custom engine where border is a subGroup in colors
            const customTokens = {
                ...defaultTokens,
                color: {
                    ...defaultTokens.color,
                    border: {
                        custom: '#123456',
                    },
                },
            };
            const customEngine = new StyleEngine(customTokens as any);
            const css = customEngine.generate('border-custom');
            expect(css).toContain('border-color');
            expect(css).toContain('var(--sxo-color-border-custom)');
        });
    });

    describe('Typography Gaps', () => {
        it('should handle numeric font sizes with and without units', () => {
            // typography.ts Line 14
            const css1 = engine.generate('text-16');
            expect(css1).toContain('font-size: 16px');

            const css2 = engine.generate('text-1.5rem');
            expect(css2).toContain('font-size: 1.5rem');
        });

        it('should handle color early return with color-mix', () => {
            // typography.ts Line 25: if (color.startsWith('color-mix'))
            const css = engine.generate('text-primary/50');
            expect(css).toContain('color: color-mix');
            expect(css).not.toContain('--sxo-text-opacity');
        });
    });

    describe('Effect Gaps', () => {
        it('should handle opacity with unit', () => {
            // effects.ts Line 46: node.unit ? node.raw : ...
            const css = engine.generate('opacity-50');
            expect(css).toContain('opacity: 0.5');

            const cssWithUnit = engine.generate('opacity-50%');
            expect(cssWithUnit).toContain('opacity: 50%');
        });

        it('should handle blur with unit', () => {
            // effects.ts Line 85: node.unit ? node.raw : ...
            const css = engine.generate('blur-10');
            expect(css).toContain('blur(10px)');

            const cssWithUnit = engine.generate('blur-10px');
            expect(cssWithUnit).toContain('blur(10px)');
        });
    });
});
