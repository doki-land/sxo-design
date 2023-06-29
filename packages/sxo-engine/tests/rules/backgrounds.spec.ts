import { describe, expect, it } from 'vitest';
import { defaultTokens } from '../../../sxo-design/src/tokens';
import { StyleEngine } from '../../src/engine';

describe('Background Rules', () => {
    const engine = new StyleEngine(defaultTokens);

    describe('Background Color', () => {
        it('should handle primary background color', () => {
            const css = engine.generate('bg-primary');
            expect(css).toContain('--sxo-bg-color: var(--sxo-color-primary-DEFAULT)');
            expect(css).toContain(
                'background-color: color-mix(in srgb, var(--sxo-bg-color), transparent calc(100% - var(--sxo-bg-opacity)))',
            );
        });

        it('should handle background color with opacity', () => {
            const css = engine.generate('bg-white/50');
            // When opacity is present, resolveColor returns color-mix directly or we handle it
            expect(css).toContain(
                'background-color: color-mix(in srgb, var(--sxo-color-white), transparent calc(100% - 50%))',
            );
        });

        it('should handle background opacity', () => {
            const css = engine.generate('bg-opacity-50');
            expect(css).toContain('--sxo-bg-opacity: 50%');

            const cssArbitrary = engine.generate('bg-opacity-[0.5]');
            expect(cssArbitrary).toContain('--sxo-bg-opacity: 0.5');
        });

        it('should handle background arbitrary color', () => {
            const css = engine.generate('bg-[#ff0000]');
            expect(css).toContain('--sxo-bg-color: #ff0000');
        });
    });

    describe('Background Size & Position', () => {
        it('should handle background size', () => {
            expect(engine.generate('bg-auto')).toContain('background-size: auto');
            expect(engine.generate('bg-cover')).toContain('background-size: cover');
            expect(engine.generate('bg-contain')).toContain('background-size: contain');
            expect(engine.generate('bg-size-[200px]')).toContain('background-size: 200px');
            expect(engine.generate('bg-size-100')).toContain('background-size: 100px');
            expect(engine.generate('bg-size-50%')).toContain('background-size: 50%');
        });

        it('should handle background position', () => {
            expect(engine.generate('bg-center')).toContain('background-position: center');
            expect(engine.generate('bg-top-left')).toContain('background-position: top left');
            expect(engine.generate('bg-bottom-right')).toContain(
                'background-position: bottom right',
            );
        });
    });

    describe('Background Clip', () => {
        it('should handle background clip', () => {
            expect(engine.generate('bg-clip-text')).toContain('background-clip: text');
            expect(engine.generate('bg-clip-border')).toContain('background-clip: border-box');
            expect(engine.generate('bg-clip-padding')).toContain('background-clip: padding-box');
            expect(engine.generate('bg-clip-content')).toContain('background-clip: content-box');
        });
    });

    describe('Gradients', () => {
        it('should handle gradient directions', () => {
            expect(engine.generate('bg-gradient-to-r')).toContain(
                'background-image: linear-gradient(to right, var(--sxo-gradient-stops, var(--sxo-gradient-from, transparent), var(--sxo-gradient-to, transparent)))',
            );
            expect(engine.generate('bg-gradient-to-tr')).toContain(
                'background-image: linear-gradient(to top right, var(--sxo-gradient-stops, var(--sxo-gradient-from, transparent), var(--sxo-gradient-to, transparent)))',
            );
            expect(engine.generate('bg-gradient-to-bl')).toContain(
                'background-image: linear-gradient(to bottom left, var(--sxo-gradient-stops, var(--sxo-gradient-from, transparent), var(--sxo-gradient-to, transparent)))',
            );
        });

        it('should handle radial and conic gradients', () => {
            expect(engine.generate('bg-gradient-radial')).toContain(
                'background-image: radial-gradient(circle, var(--sxo-gradient-stops, var(--sxo-gradient-from, transparent), var(--sxo-gradient-to, transparent)))',
            );
            expect(engine.generate('bg-gradient-conic')).toContain(
                'background-image: conic-gradient(var(--sxo-gradient-stops, var(--sxo-gradient-from, transparent), var(--sxo-gradient-to, transparent)))',
            );
        });

        it('should handle gradient stops', () => {
            const css = engine.generateSheet(['from-primary', 'via-secondary', 'to-accent']);
            expect(css).toContain('--sxo-gradient-from: var(--sxo-color-primary-DEFAULT)');
            expect(css).toContain('--sxo-gradient-to: var(--sxo-color-accent-DEFAULT)');
            expect(css).toContain(
                '--sxo-gradient-stops: var(--sxo-gradient-from, transparent), var(--sxo-color-secondary-DEFAULT), var(--sxo-gradient-to, transparent)',
            );
        });
    });

    describe('Background Image & Gadients Edge Cases', () => {
        it('should handle background image from arbitrary value', () => {
            const css = engine.generate('bg-[url(image.png)]');
            expect(css).toContain('background-image: url(image.png)');
        });

        it('should handle background size literal', () => {
            expect(engine.generate('bg-size-inherit')).toContain('background-size: inherit');
        });

        it('should handle background color that is actually an image', () => {
            const tokensWithImage = {
                ...defaultTokens,
                color: {
                    ...defaultTokens.color,
                    my: {
                        image: 'url(foo.png)',
                    },
                },
            };
            const engineWithImage = new StyleEngine(tokensWithImage as any);
            expect(engineWithImage.generate('bg-my-image')).toContain(
                'background-image: url(foo.png)',
            );
        });
    });
});
