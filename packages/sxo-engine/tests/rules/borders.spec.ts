import { describe, expect, it } from 'vitest';
import { defaultTokens } from '../../../sxo-design/src/tokens';
import { StyleEngine } from '../../src/engine';

describe('Border Rules', () => {
    const engine = new StyleEngine(defaultTokens);

    describe('Border Width', () => {
        it('should handle basic border', () => {
            const css = engine.generate('border');
            expect(css).toContain('border-width: 1px');
            expect(css).toContain('border-style: solid');
        });

        it('should handle numeric border widths', () => {
            expect(engine.generate('border-0')).toContain('border-width: 0px');
            expect(engine.generate('border-2')).toContain('border-width: 2px');
            expect(engine.generate('border-4')).toContain('border-width: 4px');
            expect(engine.generate('border-8')).toContain('border-width: 8px');
        });

        it('should handle arbitrary border widths', () => {
            expect(engine.generate('border-[3px]')).toContain('border-width: 3px');
        });
    });

    describe('Border Radius', () => {
        it('should handle tokenized border radius', () => {
            expect(engine.generate('rounded')).toContain(
                'border-radius: var(--sxo-borderRadius-DEFAULT)',
            );
            expect(engine.generate('rounded-sm')).toContain(
                'border-radius: var(--sxo-borderRadius-sm)',
            );
            expect(engine.generate('rounded-md')).toContain(
                'border-radius: var(--sxo-borderRadius-md)',
            );
            expect(engine.generate('rounded-lg')).toContain(
                'border-radius: var(--sxo-borderRadius-lg)',
            );
            expect(engine.generate('rounded-xl')).toContain(
                'border-radius: var(--sxo-borderRadius-xl)',
            );
        });

        it('should handle special border radius values', () => {
            expect(engine.generate('rounded-none')).toContain(
                'border-radius: var(--sxo-borderRadius-none)',
            );
            expect(engine.generate('rounded-full')).toContain(
                'border-radius: var(--sxo-borderRadius-full)',
            );
        });

        it('should handle numeric and arbitrary border radius', () => {
            expect(engine.generate('rounded-4')).toContain('border-radius: 4');
            expect(engine.generate('rounded-[12px]')).toContain('border-radius: 12px');
        });
    });

    describe('Border Color', () => {
        it('should handle border colors from tokens', () => {
            const css = engine.generate('border-primary');
            expect(css).toContain('--sxo-border-color: var(--sxo-color-primary-DEFAULT)');
            expect(css).toContain(
                'border-color: color-mix(in srgb, var(--sxo-border-color), transparent calc(100% - var(--sxo-border-opacity)))',
            );
        });

        it('should handle arbitrary border colors', () => {
            expect(engine.generate('border-[#ff00ff]')).toContain('--sxo-border-color: #ff00ff');
        });
    });

    describe('Ring', () => {
        it('should handle ring width', () => {
            const css = engine.generate('ring-2');
            expect(css).toContain('--sxo-ring-width: 2px');
            expect(css).toContain('box-shadow: 0 0 0 var(--sxo-ring-width) var(--sxo-ring-color)');
        });

        it('should handle ring color', () => {
            const css = engine.generate('ring-primary');
            expect(css).toContain('--sxo-ring-color: var(--sxo-color-primary-DEFAULT)');
            expect(css).toContain(
                'box-shadow: 0 0 0 var(--sxo-ring-width, 3px) var(--sxo-ring-color)',
            );
        });

        it('should handle arbitrary ring width', () => {
            const css = engine.generate('ring-[10px]');
            expect(css).toContain('--sxo-ring-width: 10px');
            expect(css).toContain('box-shadow: 0 0 0 var(--sxo-ring-width) var(--sxo-ring-color)');
        });
    });

    describe('Border Radius Edge Cases', () => {
        it('should handle full and none without tokens', () => {
            const emptyTokens = {
                ...defaultTokens,
                borderRadius: { DEFAULT: '0.25rem' },
            };
            const customEngine = new StyleEngine(emptyTokens as any);
            expect(customEngine.generate('rounded-full')).toContain(
                'border-radius: var(--sxo-borderRadius-full)',
            );
            expect(customEngine.generate('rounded-none')).toContain(
                'border-radius: var(--sxo-borderRadius-none)',
            );
        });
    });
});
