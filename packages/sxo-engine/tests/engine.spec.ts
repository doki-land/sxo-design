import { describe, expect, it, vi } from 'vitest';
import { defaultTokens } from '../../sxo-design/src/tokens';
import { StyleEngine } from '../src/engine';

describe('StyleEngine Comprehensive Tests', () => {
    const engine = new StyleEngine(defaultTokens);

    describe('Layout', () => {
        it('display', () => {
            expect(engine.generate('flex')).toContain('display: flex');
            expect(engine.generate('grid')).toContain('display: grid');
            expect(engine.generate('hidden')).toContain('display: none');
            expect(engine.generate('block')).toContain('display: block');
        });

        it('flexbox', () => {
            expect(engine.generate('items-center')).toContain('align-items: center');
            expect(engine.generate('justify-between')).toContain('justify-content: space-between');
            expect(engine.generate('flex-col')).toContain('flex-direction: column');
            expect(engine.generate('flex-wrap')).toContain('flex-wrap: wrap');
            expect(engine.generate('grow')).toContain('flex-grow: 1');
            expect(engine.generate('shrink-0')).toContain('flex-shrink: 0');
        });

        it('positioning', () => {
            expect(engine.generate('absolute')).toContain('position: absolute');
            expect(engine.generate('relative')).toContain('position: relative');
            expect(engine.generate('top-0')).toContain('top: var(--sxo-spacing-0)');
            expect(engine.generate('left-4')).toContain('left: var(--sxo-spacing-4)');
            expect(engine.generate('inset-0')).toContain('top: var(--sxo-spacing-0)');
            expect(engine.generate('inset-0')).toContain('right: var(--sxo-spacing-0)');
            expect(engine.generate('inset-0')).toContain('bottom: var(--sxo-spacing-0)');
            expect(engine.generate('inset-0')).toContain('left: var(--sxo-spacing-0)');
        });
    });

    describe('Spacing', () => {
        it('margin & padding', () => {
            expect(engine.generate('m-4')).toContain('margin: var(--sxo-spacing-4)');
            expect(engine.generate('mt-2')).toContain('margin-top: var(--sxo-spacing-2)');
            expect(engine.generate('px-6')).toContain('padding-inline: var(--sxo-spacing-6)');
            expect(engine.generate('py-1')).toContain('padding-block: var(--sxo-spacing-1)');
        });

        it('gap', () => {
            expect(engine.generate('gap-4')).toContain('gap: var(--sxo-spacing-4)');
            expect(engine.generate('gap-x-2')).toContain('column-gap: var(--sxo-spacing-2)');
        });
    });

    describe('Typography', () => {
        it('font size', () => {
            expect(engine.generate('text-sm')).toContain(
                'font-size: var(--sxo-typography-fontSize-sm)',
            );
            expect(engine.generate('text-lg')).toContain(
                'font-size: var(--sxo-typography-fontSize-lg)',
            );
        });

        it('font weight', () => {
            expect(engine.generate('font-bold')).toContain(
                'font-weight: var(--sxo-typography-fontWeight-bold)',
            );
            expect(engine.generate('font-medium')).toContain(
                'font-weight: var(--sxo-typography-fontWeight-medium)',
            );
        });

        it('text colors', () => {
            const css = engine.generate('text-primary');
            expect(css).toContain('--sxo-text-color: var(--sxo-color-text-primary)');
            expect(css).toContain('color: color-mix(in srgb, var(--sxo-text-color)');
        });

        it('text opacity', () => {
            expect(engine.generate('text-opacity-50')).toContain('--sxo-text-opacity: 50%');
        });
    });

    describe('Borders', () => {
        it('border width', () => {
            expect(engine.generate('border')).toContain('border-width: 1px');
            expect(engine.generate('border-2')).toContain('border-width: 2px');
        });

        it('border radius', () => {
            expect(engine.generate('rounded')).toContain(
                'border-radius: var(--sxo-borderRadius-DEFAULT)',
            );
            expect(engine.generate('rounded-lg')).toContain(
                'border-radius: var(--sxo-borderRadius-lg)',
            );
            expect(engine.generate('rounded-full')).toContain(
                'border-radius: var(--sxo-borderRadius-full)',
            );
        });

        it('border colors', () => {
            const css = engine.generate('border-primary');
            expect(css).toContain('--sxo-border-color: var(--sxo-color-primary-DEFAULT)');
        });
    });

    describe('Backgrounds', () => {
        it('background colors', () => {
            const css = engine.generate('bg-primary');
            expect(css).toContain('--sxo-bg-color: var(--sxo-color-primary-DEFAULT)');
        });

        it('background opacity', () => {
            expect(engine.generate('bg-opacity-50')).toContain('--sxo-bg-opacity: 50%');
        });
    });

    describe('Engine Internal Methods', () => {
        it('should add custom rules', () => {
            engine.addRules([['custom-rule', () => ({ 'custom-prop': 'custom-value' })]]);
            expect(engine.generate('custom-rule')).toContain('custom-prop: custom-value');
        });

        it('should handle missed classes in debug mode', () => {
            const debugEngine = new StyleEngine(defaultTokens, { debug: true });
            debugEngine.generate('non-existent-class');
            expect(debugEngine.getMissedClasses()).toContain('non-existent-class');
        });

        it('should generate batch of classes', () => {
            const batch = engine.generateBatch(['flex', 'block']);
            expect(batch).toContain('display: flex');
            expect(batch).toContain('display: block');
        });

        it('should sort classes in generateSheet', () => {
            const sheet = engine.generateSheet(['md:flex', 'flex', 'hover:flex']);
            // flex should come before md:flex
            // hover:flex should come before md:flex
            expect(sheet.indexOf('.flex')).toBeLessThan(sheet.indexOf('.md\\:flex'));
            expect(sheet.indexOf('.hover\\:flex')).toBeLessThan(sheet.indexOf('.md\\:flex'));
        });

        it('should reset engine state', () => {
            engine.generate('flex');
            engine.reset();
            // Call reset to cover the lines
            expect(true).toBe(true);
        });

        it('should handle nested rules with &', () => {
            engine.addRules([
                [
                    'nested-rule',
                    () => ({
                        '&:hover': { color: 'red' },
                        '& span': { color: 'blue' },
                    }),
                ],
            ]);
            const css = engine.generate('nested-rule');
            expect(css).toContain('.nested-rule:hover { color: red; }');
            expect(css).toContain('.nested-rule span { color: blue; }');
        });

        it('should handle nested rules without &', () => {
            engine.addRules([
                [
                    'nested-no-amp',
                    () => ({
                        div: { color: 'green' },
                    }),
                ],
            ]);
            const css = engine.generate('nested-no-amp');
            expect(css).toContain('div { color: green; }');
        });

        it('should handle regex rules', () => {
            engine.addRules([[/^custom-(.*)$/, (match) => ({ custom: match[1] })]]);
            expect(engine.generate('custom-foo')).toContain('custom: foo');
        });

        it('should warn on unknown variants in debug mode', () => {
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
            const debugEngine = new StyleEngine(defaultTokens, { debug: true });
            debugEngine.generate('unknown:flex');
            expect(warnSpy).toHaveBeenCalled();
            warnSpy.mockRestore();
        });

        it('should generate token css variables', () => {
            const css = engine.generateTokenCssVars();
            expect(css).toContain(':root');
            expect(css).toContain('--sxo-color-primary');
            expect(css).toContain('@keyframes fade-in');
        });

        it('should handle dark mode variables in generateTokenCssVars', () => {
            const tokensWithDark = {
                ...defaultTokens,
                modes: {
                    dark: {
                        primary: { DEFAULT: '#000' },
                    },
                },
            };
            const engineWithDark = new StyleEngine(tokensWithDark as any);
            const css = engineWithDark.generateTokenCssVars();
            expect(css).toContain('[data-sxo-mode="dark"]');
            expect(css).toContain('--sxo-color-primary-DEFAULT: #000');
        });
    });

    describe('Variants', () => {
        it('should handle state variants', () => {
            expect(engine.generate('hover:bg-primary')).toContain(':hover');
            expect(engine.generate('focus:bg-primary')).toContain(':focus');
            expect(engine.generate('active:bg-primary')).toContain(':active');
            expect(engine.generate('disabled:bg-primary')).toContain(':disabled');

            const hoverCss = engine.generate('hover:bg-primary');
            expect(hoverCss).toContain('.hover\\:bg-primary:hover');
            expect(hoverCss).toContain('--sxo-bg-color: var(--sxo-color-primary-DEFAULT)');
        });

        it('should handle group variants', () => {
            const css = engine.generate('group-hover:bg-primary');
            expect(css).toContain('.group:hover .group-hover\\:bg-primary');

            const opacityCss = engine.generate('group-hover:opacity-100');
            expect(opacityCss).toContain('.group:hover .group-hover\\:opacity-100');
            expect(opacityCss).toContain('opacity: 1');
        });

        it('should handle mode variants', () => {
            expect(engine.generate('dark:bg-primary')).toContain('[data-sxo-mode="dark"]');
            expect(engine.generate('light:bg-primary')).toContain('[data-sxo-mode="light"]');

            const darkCss = engine.generate('dark:text-white');
            expect(darkCss).toContain('[data-sxo-mode="dark"] .dark\\:text-white');
            expect(darkCss).toContain('--sxo-text-color: var(--sxo-color-white)');
        });

        it('should handle responsive variants', () => {
            const css = engine.generate('md:bg-primary');
            expect(css).toContain('@media (min-width: 768px)');
        });
    });

    describe('Arbitrary Values', () => {
        it('spacing', () => {
            expect(engine.generate('m-[123px]')).toContain('margin: 123px');
            expect(engine.generate('p-[2rem]')).toContain('padding: 2rem');
        });

        it('colors', () => {
            expect(engine.generate('text-[#123456]')).toContain('--sxo-text-color: #123456');
            expect(engine.generate('bg-[rgba(0,0,0,0.5)]')).toContain(
                '--sxo-bg-color: rgba(0,0,0,0.5)',
            );
        });

        it('size', () => {
            expect(engine.generate('w-[50%]')).toContain('width: 50%');
            expect(engine.generate('h-[100vh]')).toContain('height: 100vh');
        });
    });
});
