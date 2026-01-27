import { describe, expect, it } from 'vitest';
import { defaultTokens } from '../src/tokens';
import { mergeTokens, resolveToken, tokensToCssVars } from '../src/utils';

describe('mergeTokens', () => {
    it('should deep merge tokens', () => {
        const custom = {
            color: {
                primary: {
                    DEFAULT: '#FF0000',
                },
            },
        };
        const merged = mergeTokens(defaultTokens, custom);
        expect(merged.color.primary.DEFAULT).toBe('#FF0000');
        // Check if other properties are preserved
        expect(merged.color.primary.foreground).toBe(defaultTokens.color.primary.foreground);
        expect(merged.color.secondary.DEFAULT).toBe(defaultTokens.color.secondary.DEFAULT);
    });

    it('should overwrite non-object properties', () => {
        const custom = {
            borderRadius: {
                DEFAULT: '10px',
            },
        };
        const merged = mergeTokens(defaultTokens, custom);
        expect(merged.borderRadius.DEFAULT).toBe('10px');
    });
});

describe('tokensToCssVars', () => {
    it('should convert tokens to CSS variables', () => {
        const tokens = {
            color: {
                primary: '#FF0000',
            },
            spacing: {
                sm: '4px',
            },
        };
        const vars = tokensToCssVars(tokens, 'test');
        expect(vars).toMatchObject({
            '--test-color-primary': '#FF0000',
            '--test-spacing-sm': '4px',
        });
    });
});

describe('resolveToken', () => {
    it('should resolve token path', () => {
        const tokens = {
            color: {
                primary: {
                    DEFAULT: '#FF0000',
                },
            },
        };
        // @ts-expect-error
        expect(resolveToken(tokens, 'color.primary.DEFAULT')).toBe('#FF0000');
    });

    it('should return undefined for invalid path', () => {
        const tokens = { color: { primary: '#FF0000' } };
        // @ts-expect-error
        expect(resolveToken(tokens, 'color.secondary')).toBeUndefined();
        // @ts-expect-error
        expect(resolveToken(tokens, 'invalid.path')).toBeUndefined();
    });
});
