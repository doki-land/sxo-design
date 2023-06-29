import { describe, expect, it } from 'vitest';
import { SxoParser } from '../../src/parser';

describe('SxoParser', () => {
    const parser = new SxoParser();

    it('should parse simple utility', () => {
        const result = parser.parse('flex');
        expect(result.utility).toBe('flex');
        expect(result.variants).toHaveLength(0);
        expect(result.nodes[0]).toEqual({ type: 'literal', value: 'flex' });
    });

    it('should parse utility with variants', () => {
        const result = parser.parse('hover:focus:flex');
        expect(result.utility).toBe('flex');
        expect(result.variants).toEqual(['hover', 'focus']);
    });

    it('should parse numeric values', () => {
        const result = parser.parse('m-4');
        expect(result.nodes[1]).toEqual({
            type: 'numeric',
            value: 4,
            unit: undefined,
            raw: '4',
        });
    });

    it('should parse unit values', () => {
        const result = parser.parse('w-100px');
        expect(result.nodes[1]).toEqual({
            type: 'numeric',
            value: 100,
            unit: 'px',
            raw: '100px',
        });
    });

    it('should parse fraction values', () => {
        const result = parser.parse('w-1/2');
        expect(result.nodes[1]).toEqual({
            type: 'fraction',
            numerator: 1,
            denominator: 2,
            value: '1/2',
        });
    });

    it('should parse arbitrary values', () => {
        const result = parser.parse('m-[10px]');
        expect(result.nodes[1].type).toBe('arbitrary');
        expect((result.nodes[1] as any).value).toBe('10px');
    });

    it('should parse complex arbitrary values with underscores', () => {
        const result = parser.parse('grid-cols-[1fr_min-content_20%]');
        expect(result.nodes[2].type).toBe('arbitrary');
        const arbitrary = result.nodes[2] as any;
        expect(arbitrary.value).toBe('1fr_min-content_20%');
    });

    it('should parse nested brackets in arbitrary values', () => {
        const result = parser.parse('bg-[url(image.png)]');
        expect(result.nodes[1].type).toBe('arbitrary');
        expect((result.nodes[1] as any).value).toBe('url(image.png)');
    });

    it('should parse expressions in arbitrary values', () => {
        const result = parser.parse('w-[calc(100%-20px)]');
        const arbitrary = result.nodes[1] as any;
        expect(arbitrary.type).toBe('arbitrary');
        expect(arbitrary.nodes[0].type).toBe('expression');
        expect(arbitrary.nodes[0].name).toBe('calc');
    });

    it('should parse functions with multiple arguments', () => {
        const result = parser.parse('grid-cols-[minmax(0,1fr)]');
        const arbitrary = result.nodes[2] as any;
        const expression = arbitrary.nodes[0];
        expect(expression.type).toBe('expression');
        expect(expression.name).toBe('minmax');
        expect(expression.arguments).toHaveLength(2);
        expect(expression.arguments[0]).toEqual({ type: 'numeric', value: 0, raw: '0' });
        expect(expression.arguments[1]).toEqual({
            type: 'numeric',
            value: 1,
            unit: 'fr',
            raw: '1fr',
        });
    });

    it('should handle list in function arguments', () => {
        const parsed = parser.parse('grid-cols-[repeat(3,100px_200px)]');
        const arbitrary = parsed.nodes[2] as any;
        const repeat = arbitrary.nodes[0];
        expect(repeat.type).toBe('expression');
        expect(repeat.arguments[1].type).toBe('list');
        expect(repeat.arguments[1].items).toHaveLength(2);
    });

    it('should handle arbitrary values without preceding dash', () => {
        const parsed = parser.parse('text[20px]');
        expect(parsed.parts).toContain('text');
        expect(parsed.parts).toContain('[20px]');
    });

    it('should distinguish color opacity from fractions', () => {
        // bg-neutral-50/50 should be color + opacity, not a fraction
        const result = parser.parse('bg-neutral-50/50');
        expect(result.opacity).toBe('50');
        expect(
            result.nodes.map((n) =>
                (n as any).value !== undefined ? (n as any).value : (n as any).raw,
            ),
        ).toEqual(['bg', 'neutral', 50]);

        // w-1/2 should still be a fraction
        const wResult = parser.parse('w-1/2');
        expect(wResult.opacity).toBeUndefined();
        expect(wResult.nodes[1].type).toBe('fraction');
    });

    it('should skip dash after arbitrary value', () => {
        const parsed = parser.parse('text-[20px]-foo');
        expect(parsed.parts).toEqual(['text', '[20px]', 'foo']);
    });

    it('should handle comma in arbitrary values', () => {
        const result = parser.parse('bg-[rgba(0,0,0,0.5),red]');
        const arbitrary = result.nodes[1] as any;
        expect(arbitrary.nodes).toHaveLength(2);
        expect(arbitrary.nodes[0].type).toBe('expression');
        expect(arbitrary.nodes[1].type).toBe('literal');
    });

    it('should handle comma after literal in arbitrary values', () => {
        const result = parser.parse('grid-cols-[100px,200px]');
        const arbitrary = result.nodes[2] as any;
        expect(arbitrary.nodes).toHaveLength(2);
        expect(arbitrary.nodes[0].raw).toBe('100px');
        expect(arbitrary.nodes[1].raw).toBe('200px');
    });

    it('should handle nested function calls', () => {
        const parsed = parser.parse('text-[calc(100%-var(--foo))]');
        const arbitrary = parsed.nodes[1] as any;
        expect(arbitrary.nodes[0].type).toBe('expression');
        expect(arbitrary.nodes[0].name).toBe('calc');
    });

    it('should parse arbitrary opacity', () => {
        const result = parser.parse('bg-primary/[0.5]');
        expect(result.utility).toBe('bg-primary/[0.5]');
        expect(result.opacity).toBe('0.5');
    });

    it('should parse complex variant with brackets', () => {
        const result = parser.parse('[data-active]:hover:bg-red-500');
        expect(result.variants).toEqual(['[data-active]', 'hover']);
        expect(result.utility).toBe('bg-red-500');
    });
});
