import { describe, expect, it } from 'vitest';
import { defaultTokens } from '../../../sxo-design/src/tokens';
import { ValueResolver } from '../../src/core/resolver';
import type { SxoNode } from '../../src/parser';

describe('ValueResolver', () => {
    describe('resolveSpacing', () => {
        it('should resolve literal spacing', () => {
            const node: SxoNode = { type: 'literal', value: '4' };
            expect(ValueResolver.resolveSpacing(node, defaultTokens)).toBe(
                defaultTokens.spacing['4'],
            );
        });

        it('should resolve numeric spacing in tokens', () => {
            const node: SxoNode = { type: 'numeric', value: 4, raw: '4' };
            expect(ValueResolver.resolveSpacing(node, defaultTokens)).toBe(
                defaultTokens.spacing['4'],
            );
        });

        it('should return raw for numeric spacing NOT in tokens', () => {
            const node: SxoNode = { type: 'numeric', value: 999, raw: '999px' };
            expect(ValueResolver.resolveSpacing(node, defaultTokens)).toBe('999px');
        });

        it('should resolve fraction spacing', () => {
            const node: SxoNode = { type: 'fraction', numerator: 1, denominator: 2, value: '1/2' };
            expect(ValueResolver.resolveSpacing(node, defaultTokens)).toBe('50%');

            const node2: SxoNode = { type: 'fraction', numerator: 1, denominator: 3, value: '1/3' };
            expect(ValueResolver.resolveSpacing(node2, defaultTokens)).toBe('33.333333%');
        });

        it('should resolve arbitrary spacing', () => {
            const node: SxoNode = { type: 'arbitrary', value: '10px', nodes: [] };
            expect(ValueResolver.resolveSpacing(node, defaultTokens)).toBe('10px');
        });

        it('should return undefined for unknown node type', () => {
            const node = { type: 'unknown' } as any;
            expect(ValueResolver.resolveSpacing(node, defaultTokens)).toBeUndefined();
        });
    });

    describe('resolveSize', () => {
        it('should handle max-width tokens', () => {
            const tokens = { ...defaultTokens, maxWidth: { sm: '640px', '7xl': '80rem' } };
            const node: SxoNode = { type: 'literal', value: 'sm' };
            expect(ValueResolver.resolveSize(node, tokens, 'max-width')).toBe('640px');

            const nodeNumeric: SxoNode = { type: 'numeric', value: 0, raw: '7xl' };
            expect(ValueResolver.resolveSize(nodeNumeric, tokens, 'max-width')).toBe('80rem');
        });

        it('should handle special literals', () => {
            const node = (val: string): SxoNode => ({ type: 'literal', value: val });
            expect(ValueResolver.resolveSize(node('full'), defaultTokens, 'width')).toBe('100%');
            expect(ValueResolver.resolveSize(node('screen'), defaultTokens, 'width')).toBe('100vw');
            expect(ValueResolver.resolveSize(node('screen'), defaultTokens, 'height')).toBe(
                '100vh',
            );
            expect(ValueResolver.resolveSize(node('min'), defaultTokens, 'width')).toBe(
                'min-content',
            );
            expect(ValueResolver.resolveSize(node('max'), defaultTokens, 'width')).toBe(
                'max-content',
            );
            expect(ValueResolver.resolveSize(node('fit'), defaultTokens, 'width')).toBe(
                'fit-content',
            );
            expect(ValueResolver.resolveSize(node('auto'), defaultTokens, 'width')).toBe('auto');
        });

        it('should return undefined for unknown literal size', () => {
            const node: SxoNode = { type: 'literal', value: 'unknown' };
            expect(ValueResolver.resolveSize(node, defaultTokens, 'width')).toBeUndefined();
        });
    });

    describe('resolveNumeric', () => {
        it('should resolve literal from token group', () => {
            const tokens = { borderRadius: { sm: '2px' } } as any;
            const node: SxoNode = { type: 'literal', value: 'sm' };
            expect(ValueResolver.resolveNumeric(node, tokens, 'borderRadius')).toBe('2px');
        });

        it('should resolve numeric raw value', () => {
            const node: SxoNode = { type: 'numeric', value: 10, raw: '10px' };
            expect(ValueResolver.resolveNumeric(node, {}, 'any')).toBe('10px');
        });

        it('should resolve arbitrary value', () => {
            const node: SxoNode = { type: 'arbitrary', value: 'calc(100% - 10px)', nodes: [] };
            expect(ValueResolver.resolveNumeric(node, {}, 'any')).toBe('calc(100% - 10px)');
        });

        it('should return undefined for unknown type', () => {
            const node = { type: 'expression', name: 'calc', arguments: [] } as any;
            expect(ValueResolver.resolveNumeric(node, {}, 'none')).toBeUndefined();
        });
    });
});
