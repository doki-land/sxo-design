import { defaultTokens } from '@sxo/design';
import { describe, expect, it } from 'vitest';
import { StyleEngine } from '../src/engine';

describe('Coverage Gaps - Engine & Layout', () => {
    const engine = new StyleEngine(defaultTokens as any);

    describe('Engine Gaps', () => {
        it('should handle negative values with already negative literal', () => {
            // Line 74: val.startsWith('-') ? val.substring(1) : `-${val}`
            const css = engine.generate('-m-[-10px]');
            expect(css).toContain('margin: 10px');

            // False branch: positive literal becomes negative
            const css2 = engine.generate('-m-[10px]');
            expect(css2).toContain('margin: -10px');
        });

        it('should handle mixed direct and nested rules', () => {
            // Line 294: css += (css ? '\n' : '') + nested.join('\n');
            const customEngine = new StyleEngine(defaultTokens as any);
            customEngine.addRules([
                ['mixed', () => ({ color: 'red', '&:hover': { color: 'blue' } })],
            ]);
            const css = customEngine.generate('mixed');
            expect(css).toContain('.mixed { color: red; }');
            expect(css).toContain('.mixed:hover { color: blue; }');
            expect(css).toContain('\n');
        });

        it('should handle only nested rules (empty direct rules)', () => {
            // Line 294: css += (css ? '\n' : '') + nested.join('\n');
            const customEngine = new StyleEngine(defaultTokens as any);
            customEngine.addRules([['nested-only', () => ({ '&:hover': { color: 'red' } })]]);
            const css = customEngine.generate('nested-only');
            expect(css).toBe('.nested-only:hover { color: red; }');
            expect(css).not.toContain('\n');
        });

        it('should handle media query that does not start with @media', () => {
            // Line 303: mediaQuery.startsWith('@media') ? mediaQuery : `@media ${mediaQuery}`
            const customTokens = {
                ...defaultTokens,
                breakpoints: {
                    simple: '100px',
                },
            };
            const customEngine = new StyleEngine(customTokens as any);
            const css = customEngine.generate('simple:block');
            expect(css).toContain('@media (min-width: 100px)');
        });

        it('should handle generateTokenCssVars without dark mode', () => {
            // Line 254: const modeStyles = darkVars ? ... : '';
            const tokensNoDark = { ...defaultTokens, modes: {} };
            const engineNoDark = new StyleEngine(tokensNoDark as any);
            const css = engineNoDark.generateTokenCssVars();
            expect(css).not.toContain('[data-sxo-mode="dark"]');
        });
    });

    describe('Layout Gaps', () => {
        it('should handle inset and gap without value (edge cases)', () => {
            // Line 128: if (!value) return; (via inset-x)
            const cssInset = engine.generate('inset-x');
            expect(cssInset).toBe('');

            // Line 163: if (!valueNode) return; (via gap-x)
            const cssGap = engine.generate('gap-x');
            expect(cssGap).toBe('');
        });

        it('should handle width fallback to raw and resolveSize', () => {
            // Line 253: resolveSize || value || raw
            expect(engine.generate('w-4')).toContain('width: var(--sxo-spacing-4)');
            expect(engine.generate('w-customlit')).toContain('width: customlit');
            expect(engine.generate('w-[0]')).toContain('width: 0');
        });

        it('should handle grid-cols and grid-rows variants', () => {
            // Line 274, 275, 280, 295, 301
            // Most cases hit 3-node branch because parser splits '-'
            expect(engine.generate('grid-cols-4')).toContain(
                'grid-template-columns: repeat(4, minmax(0, 1fr))',
            );
            expect(engine.generate('grid-cols[100px]')).toContain('grid-template-columns: 100px');
            expect(engine.generate('grid-rows-3')).toContain(
                'grid-template-rows: repeat(3, minmax(0, 1fr))',
            );
            expect(engine.generate('grid-rows[200px]')).toContain('grid-template-rows: 200px');
        });
    });
});
