import { describe, expect, it } from 'vitest';
import { defaultTokens } from '../../sxo-design/src/tokens';
import { resolveColor } from '../src/core/utils';
import { StyleEngine } from '../src/engine';
import { SxoParser } from '../src/parser';

describe('Final Coverage Improvements', () => {
    const engine = new StyleEngine(defaultTokens);
    const parser = new SxoParser();

    describe('Engine & Variants', () => {
        it('should handle rule that returns a string', () => {
            // This hits engine.ts line 265
            const customEngine = new StyleEngine(defaultTokens);
            (customEngine as any).rules.push([
                (parsed: any) => parsed.utility === 'custom-str',
                () => 'color: red;',
            ]);
            const css = customEngine.generate('custom-str');
            expect(css).toContain('.custom-str { color: red; }');
        });

        it('should handle rule with only nested rules', () => {
            // This hits engine.ts line 285 (css ? '\n' : '')
            const customEngine = new StyleEngine(defaultTokens);
            (customEngine as any).rules.push([
                (parsed: any) => parsed.utility === 'custom-nested',
                () => ({
                    '& .child': { color: 'blue' },
                }),
            ]);
            const css = customEngine.generate('custom-nested');
            expect(css).not.toContain('.custom-nested {');
            expect(css).toContain('.custom-nested .child { color: blue; }');
        });

        it('should handle special characters in class names', () => {
            // This hits engine.ts escapeClassName and line 294
            const css = engine.generate('md:w-[50%]');
            expect(css).toContain('.md\\:w-\\[50\\%\\]');
            expect(css).toContain('@media (min-width: 768px)');
        });

        it('should handle combined parent variants', () => {
            // This hits engine.ts line 141 (parent ? branch)
            const css = engine.generate('group-hover:group-focus:bg-primary');
            expect(css).toContain('.group:focus .group:hover');
        });

        it('should handle negative values with existing negative prefix', () => {
            // This hits engine.ts line 73 (val.startsWith('-'))
            const css = engine.generate('-m-[-10px]');
            expect(css).toContain('margin: 10px');
        });

        it('should handle custom media query starting with @media', () => {
            const customTokens = {
                ...defaultTokens,
                breakpoints: {
                    custombp: '@media (max-width: 100px)',
                },
            };
            const customEngine = new StyleEngine(customTokens as any);
            const css = customEngine.generate('custombp:block');
            expect(css).toContain('@media (max-width: 100px)');
        });

        it('should hit cache', () => {
            // This hits engine.ts line 147
            engine.generate('block');
            const css = engine.generate('block');
            expect(css).toContain('.block');
        });
    });

    describe('Spacing Rules', () => {
        it('should handle m-auto (literal not in tokens)', () => {
            const css = engine.generate('m-auto');
            expect(css).toContain('margin: auto');
        });

        it('should handle spacing literal from tokens', () => {
            const css = engine.generate('m-1');
            expect(css).toContain('margin: var(--sxo-spacing-1)');
        });

        it('should handle matcher false for non-literal first node', () => {
            const css = engine.generate('[m]-4');
            expect(css).toBe('');
        });
    });

    describe('Background Rules', () => {
        it('should handle multiple position literals', () => {
            const css = engine.generate('bg-left-top');
            expect(css).toContain('background-position: left top');
        });

        it('should handle background position with non-literal node', () => {
            // Fixed backgrounds.ts to support arbitrary nodes in position
            const css = engine.generate('bg-left-[10px]');
            expect(css).toContain('background-position: left 10px');
        });

        it('should handle custom gradient direction', () => {
            const css = engine.generate('bg-gradient-to-[45deg]');
            expect(css).toContain('linear-gradient(45deg,');
        });

        it('should handle background size defensive check', () => {
            // bg-[length:unknown] should NOT match bg-color now because of heuristic in resolveColor
            const css = engine.generate('bg-[length:unknown]');
            expect(css).toBe('');
        });
    });

    describe('Border Rules', () => {
        it('should handle border width from tokens', () => {
            const css = engine.generate('border-2');
            expect(css).toContain('border-width: 2px');
        });

        it('should handle border width without units', () => {
            // Fixed borders.ts to append px to arbitrary pure numbers
            const css = engine.generate('border-[3]');
            expect(css).toContain('border-width: 3px');
        });

        it('should handle border width with unit in numeric', () => {
            const css = engine.generate('border-2px');
            expect(css).toContain('border-width: 2px');
        });

        it('should handle border color from subGroup', () => {
            const css = engine.generate('border-primary');
            expect(css).toContain(
                'border-color: color-mix(in srgb, var(--sxo-border-color), transparent calc(100% - var(--sxo-border-opacity)))',
            );
        });
    });

    describe('Effect Rules', () => {
        it('should handle shadow with missing default in tokens', () => {
            const customTokens = {
                ...defaultTokens,
                boxShadow: { my: '1px 1px black' },
            } as any;
            delete customTokens.boxShadow.DEFAULT;
            const customEngine = new StyleEngine(customTokens);
            const css = customEngine.generate('shadow-primary');
            // Corrected expectation: it replaces the color in baseShadow with resolved color
            expect(css).toContain('box-shadow: 0 1px 3px 0 var(--sxo-color-primary-DEFAULT)');
        });

        it('should handle opacity without unit', () => {
            const css = engine.generate('opacity-50');
            expect(css).toContain('opacity: 0.5');
        });

        it('should handle opacity with unit', () => {
            const css = engine.generate('opacity-[0.8]');
            expect(css).toContain('opacity: 0.8');
        });

        it('should handle blur with hardcoded literal', () => {
            const css = engine.generate('blur-sm');
            expect(css).toContain('blur(4px)');
        });

        it('should handle blur with custom literal fallback', () => {
            const css = engine.generate('blur-heavy');
            expect(css).toContain('blur(heavy)');
        });

        it('should handle blur with numeric value', () => {
            const css = engine.generate('blur-10');
            expect(css).toContain('blur(10px)');
        });
    });

    describe('Layout Rules', () => {
        it('should handle gap with fraction', () => {
            const css = engine.generate('gap-1/2');
            expect(css).toContain('gap: 50%');
        });

        it('should handle size with unresolved value', () => {
            const css = engine.generate('w-unknown');
            expect(css).toContain('width: unknown');
        });

        it('should handle grid-cols format variants (longhand)', () => {
            const css = engine.generate('grid-cols-4');
            expect(css).toContain('grid-template-columns: repeat(4, minmax(0, 1fr))');
        });

        it('should handle grid-rows format variants (longhand)', () => {
            const css = engine.generate('grid-rows-4');
            expect(css).toContain('grid-template-rows: repeat(4, minmax(0, 1fr))');
        });
    });

    describe('Utils Corner Cases', () => {
        it('should return undefined if skipNodes >= length', () => {
            const parsed = parser.parse('bg');
            const res = resolveColor(parsed, defaultTokens, { skipNodes: 1 });
            expect(res).toBeUndefined();
        });

        it('should return undefined for non-literal/numeric nodes', () => {
            const parsed = parser.parse('text-1/2');
            const res = resolveColor(parsed, defaultTokens);
            expect(res).toBeUndefined();
        });
    });

    describe('Parser Corner Cases', () => {
        it('should parse text[20px] correctly', () => {
            const parsed = parser.parse('text[20px]');
            expect(parsed.parts).toContain('text');
            expect(parsed.nodes[0]).toEqual({ type: 'literal', value: 'text' });
        });
    });
});
