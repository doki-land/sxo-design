import { describe, expect, it } from 'vitest';
import { defaultTokens } from '../../../sxo-design/src/tokens';
import { StyleEngine } from '../../src/engine';

describe('Spacing Rules', () => {
    const engine = new StyleEngine(defaultTokens);

    describe('Margin & Padding', () => {
        it('should handle basic margin', () => {
            expect(engine.generate('m-0')).toContain('margin: var(--sxo-spacing-0)');
            expect(engine.generate('m-4')).toContain('margin: var(--sxo-spacing-4)');
            expect(engine.generate('m-auto')).toContain('margin: auto');
            expect(engine.generate('m-[10px]')).toContain('margin: 10px');
        });

        it('should handle directional margin', () => {
            expect(engine.generate('mt-2')).toContain('margin-top: var(--sxo-spacing-2)');
            expect(engine.generate('mr-4')).toContain('margin-right: var(--sxo-spacing-4)');
            expect(engine.generate('mb-6')).toContain('margin-bottom: var(--sxo-spacing-6)');
            expect(engine.generate('ml-8')).toContain('margin-left: var(--sxo-spacing-8)');
        });

        it('should handle axis margin', () => {
            expect(engine.generate('mx-4')).toContain('margin-inline: var(--sxo-spacing-4)');
            expect(engine.generate('my-2')).toContain('margin-block: var(--sxo-spacing-2)');
        });

        it('should handle basic padding', () => {
            expect(engine.generate('p-0')).toContain('padding: var(--sxo-spacing-0)');
            expect(engine.generate('p-4')).toContain('padding: var(--sxo-spacing-4)');
            expect(engine.generate('p-[10px]')).toContain('padding: 10px');
        });

        it('should handle directional padding', () => {
            expect(engine.generate('pt-2')).toContain('padding-top: var(--sxo-spacing-2)');
            expect(engine.generate('pr-4')).toContain('padding-right: var(--sxo-spacing-4)');
            expect(engine.generate('pb-6')).toContain('padding-bottom: var(--sxo-spacing-6)');
            expect(engine.generate('pl-8')).toContain('padding-left: var(--sxo-spacing-8)');
        });

        it('should handle axis padding', () => {
            expect(engine.generate('px-4')).toContain('padding-inline: var(--sxo-spacing-4)');
            expect(engine.generate('py-2')).toContain('padding-block: var(--sxo-spacing-2)');
        });
    });

    describe('Gap', () => {
        it('should handle gap values', () => {
            expect(engine.generate('gap-0')).toContain('gap: var(--sxo-spacing-0)');
            expect(engine.generate('gap-4')).toContain('gap: var(--sxo-spacing-4)');
            expect(engine.generate('gap-x-2')).toContain('column-gap: var(--sxo-spacing-2)');
            expect(engine.generate('gap-y-8')).toContain('row-gap: var(--sxo-spacing-8)');
            expect(engine.generate('gap-[10px]')).toContain('gap: 10px');
        });
    });

    it('should handle negative values', () => {
        const css = engine.generate('-m-4');
        expect(css).toContain('margin: calc(var(--sxo-spacing-4) * -1)');
    });

    it('should handle spacing token', () => {
        const customTokens = {
            ...defaultTokens,
            spacing: { testm: '7px' },
        };
        const customEngine = new StyleEngine(customTokens as any);
        const css = customEngine.generate('m-testm');
        expect(css).toContain('margin: var(--sxo-spacing-testm)');
    });
});
