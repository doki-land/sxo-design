import { describe, expect, it } from 'vitest';
import { defaultTokens } from '../../../sxo-design/src/tokens';
import { getVar, resolveColor } from '../../src/core/utils';
import { SxoParser } from '../../src/parser';

describe('Core Utils', () => {
    describe('getVar', () => {
        it('should return var with path', () => {
            expect(getVar('color-primary', '#000')).toBe('var(--sxo-color-primary)');
        });

        it('should return fallback if path is empty', () => {
            expect(getVar('', '#000')).toBe('#000');
        });

        it('should handle opacity with numeric value', () => {
            const res = getVar('color-primary', '#000', '50');
            expect(res).toContain(
                'color-mix(in srgb, var(--sxo-color-primary), transparent calc(100% - 50%))',
            );
        });

        it('should handle opacity with percentage value', () => {
            const res = getVar('color-primary', '#000', '50%');
            expect(res).toContain(
                'color-mix(in srgb, var(--sxo-color-primary), transparent calc(100% - 50%))',
            );
        });
    });

    describe('resolveColor', () => {
        const parser = new SxoParser();

        it('should resolve simple color', () => {
            const parsed = parser.parse('text-white');
            const res = resolveColor(parsed, defaultTokens);
            expect(res?.color).toBe('#ffffff');
            expect(res?.varPath).toBe('color-white');
        });

        it('should resolve nested color', () => {
            const parsed = parser.parse('text-primary');
            const res = resolveColor(parsed, defaultTokens);
            expect(res?.color).toBe(defaultTokens.color.primary.DEFAULT);
            expect(res?.varPath).toBe('color-primary-DEFAULT');
        });

        it('should resolve color with subGroup', () => {
            const parsed = parser.parse('text-primary');
            const res = resolveColor(parsed, defaultTokens, { subGroup: 'text' });
            // text-primary in subGroup 'text' should match tokens.color.text.primary if it exists
            // Let's check defaultTokens.color.text.primary
            expect(res?.color).toBe(defaultTokens.color.text.primary);
            expect(res?.varPath).toBe('color-text-primary');
        });

        it('should handle opacity in utility', () => {
            const parsed = parser.parse('text-white/50');
            const res = resolveColor(parsed, defaultTokens);
            expect(res?.color).toBe('#ffffff');
            expect(res?.opacity).toBe('50');
        });

        it('should handle arbitrary colors', () => {
            const parsed = parser.parse('text-[#123456]');
            const res = resolveColor(parsed, defaultTokens);
            expect(res?.color).toBe('#123456');
            expect(res?.varPath).toBe('');
        });

        it('should handle transparent, inherit, currentColor', () => {
            expect(resolveColor(parser.parse('text-transparent'), defaultTokens)?.color).toBe(
                'transparent',
            );
            expect(resolveColor(parser.parse('text-inherit'), defaultTokens)?.color).toBe(
                'inherit',
            );
            expect(resolveColor(parser.parse('text-currentColor'), defaultTokens)?.color).toBe(
                'currentColor',
            );
        });

        it('should handle foreground semantic', () => {
            const res = resolveColor(parser.parse('text-foreground'), defaultTokens);
            expect(res?.varPath).toBe('color-text-primary');
        });

        it('should handle background semantic', () => {
            const res = resolveColor(parser.parse('bg-background'), defaultTokens);
            expect(res?.varPath).toBe('color-background-primary');
        });

        it('should handle foreground fallback to primary.foreground', () => {
            const tokens = {
                color: {
                    primary: { foreground: '#000' },
                },
            } as any;
            const res = resolveColor(parser.parse('text-foreground'), tokens);
            expect(res?.color).toBe('#000');
            expect(res?.varPath).toBe('color-primary-foreground');
        });

        it('should handle nested foreground semantic', () => {
            const tokens = {
                color: {
                    brand: { foreground: '#fff' },
                },
            } as any;
            const res = resolveColor(parser.parse('text-brand-foreground'), tokens);
            expect(res?.color).toBe('#fff');
            expect(res?.varPath).toBe('color-brand-foreground');
        });

        it('should handle background fallback to global primary', () => {
            const tokens = {
                color: {
                    background: { primary: '#fff' },
                    other: {},
                },
            } as any;
            // Use a path that doesn't have 'background' in 'current'
            const res = resolveColor(parser.parse('bg-other-background'), tokens);
            expect(res?.color).toBe('#fff');
            expect(res?.varPath).toBe('color-background-primary');
        });

        it('should handle DEFAULT fallback at the end of path', () => {
            const tokens = {
                color: {
                    brand: { DEFAULT: '#f00' },
                },
            } as any;
            const res = resolveColor(parser.parse('text-brand'), tokens);
            expect(res?.color).toBe('#f00');
            expect(res?.varPath).toBe('color-brand-DEFAULT');
        });

        it('should handle primary fallback when result is an object', () => {
            const tokens = {
                color: {
                    brand: { primary: '#00f' },
                },
            } as any;
            const res = resolveColor(parser.parse('text-brand'), tokens);
            expect(res?.color).toBe('#00f');
            expect(res?.varPath).toBe('color-brand-primary');
        });

        it('should return undefined when no DEFAULT or primary exists in object', () => {
            const tokens = {
                color: {
                    brand: { foo: '#00f' },
                },
            } as any;
            const res = resolveColor(parser.parse('text-brand'), tokens);
            expect(res).toBeUndefined();
        });

        it('should handle subGroup prefix skip', () => {
            // Case: bg-background-primary where the first background is the subGroup
            const parsed = parser.parse('bg-background-primary');
            const res = resolveColor(parsed, defaultTokens, { subGroup: 'background' });
            expect(res?.varPath).toBe('color-background-primary');
        });

        it('should handle DEFAULT fallback for unknown final part', () => {
            const tokens = {
                color: {
                    brand: { DEFAULT: '#f00' },
                },
            } as any;
            // text-brand-foo where foo doesn't exist but brand has DEFAULT
            const res = resolveColor(parser.parse('text-brand-foo'), tokens);
            expect(res?.color).toBe('#f00');
            expect(res?.varPath).toBe('color-brand-DEFAULT');
        });

        it('should handle manual opacity split (literal with slash)', () => {
            // We need to bypass the parser's fraction check or construct nodes manually
            // Actually, if we use skipNodes, we can provide a literal node that has a slash
            const parsed = {
                nodes: [
                    { type: 'literal', value: 'text' },
                    { type: 'literal', value: 'primary/50' },
                ],
                opacity: undefined,
            } as any;
            const tokens = { color: { primary: '#f00' } } as any;
            const res = resolveColor(parsed, tokens);
            expect(res?.opacity).toBe('50');
            expect(res?.color).toBe('#f00');
        });
    });
});
