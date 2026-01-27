import { describe, expect, it } from 'vitest';
import { defaultTokens } from '../../../sxo-design/src/tokens';
import { StyleEngine } from '../../src/engine';

describe('Effect Rules', () => {
    const engine = new StyleEngine(defaultTokens);

    describe('Shadow', () => {
        it('should handle default shadow', () => {
            expect(engine.generate('shadow')).toContain('box-shadow: var(--sxo-boxShadow-DEFAULT)');
        });

        it('should handle tokenized shadows', () => {
            expect(engine.generate('shadow-sm')).toContain('box-shadow: var(--sxo-boxShadow-sm)');
            expect(engine.generate('shadow-md')).toContain('box-shadow: var(--sxo-boxShadow-md)');
            expect(engine.generate('shadow-lg')).toContain('box-shadow: var(--sxo-boxShadow-lg)');
            expect(engine.generate('shadow-xl')).toContain('box-shadow: var(--sxo-boxShadow-xl)');
            expect(engine.generate('shadow-2xl')).toContain('box-shadow: var(--sxo-boxShadow-2xl)');
            expect(engine.generate('shadow-inner')).toContain(
                'box-shadow: var(--sxo-boxShadow-inner)',
            );
        });

        it('should handle shadow with color', () => {
            const css = engine.generate('shadow-primary');
            expect(css).toContain('box-shadow:');
            // Check if it contains the color variable
            expect(css).toContain('var(--sxo-color-primary-DEFAULT)');
        });

        it('should handle arbitrary shadows', () => {
            expect(engine.generate('shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]')).toContain(
                'box-shadow: 0 35px 60px -15px rgba(0,0,0,0.3)',
            );
        });
    });

    describe('Opacity', () => {
        it('should handle numeric opacity', () => {
            expect(engine.generate('opacity-0')).toContain('opacity: 0');
            expect(engine.generate('opacity-50')).toContain('opacity: 0.5');
            expect(engine.generate('opacity-100')).toContain('opacity: 1');
        });

        it('should handle arbitrary opacity', () => {
            expect(engine.generate('opacity-[0.25]')).toContain('opacity: 0.25');
        });

        it('should handle tokenized opacity', () => {
            const tokensWithOpacity = {
                ...defaultTokens,
                opacity: {
                    half: '0.5',
                },
            };
            const customEngine = new StyleEngine(tokensWithOpacity as any);
            expect(customEngine.generate('opacity-half')).toContain('opacity: 0.5');
        });
    });

    describe('Blur', () => {
        it('should handle default blur', () => {
            expect(engine.generate('blur')).toContain('filter: blur(8px)');
        });

        it('should handle tokenized blur', () => {
            expect(engine.generate('blur-sm')).toContain('filter: blur(4px)');
            expect(engine.generate('blur-md')).toContain('filter: blur(12px)');
            expect(engine.generate('blur-lg')).toContain('filter: blur(16px)');
        });

        it('should handle backdrop blur', () => {
            const css = engine.generate('backdrop-blur');
            expect(css).toContain('backdrop-filter: blur(8px)');
            expect(css).toContain('-webkit-backdrop-filter: blur(8px)');
        });

        it('should handle tokenized backdrop blur', () => {
            const css = engine.generate('backdrop-blur-md');
            expect(css).toContain('backdrop-filter: blur(12px)');
            expect(css).toContain('-webkit-backdrop-filter: blur(12px)');
        });

        it('should handle numeric and arbitrary blur', () => {
            expect(engine.generate('blur-10')).toContain('filter: blur(10px)');
            expect(engine.generate('blur-[20px]')).toContain('filter: blur(20px)');

            const css = engine.generate('backdrop-blur-10');
            expect(css).toContain('backdrop-filter: blur(10px)');

            const cssArb = engine.generate('backdrop-blur-[20px]');
            expect(cssArb).toContain('backdrop-filter: blur(20px)');
        });
    });
});
