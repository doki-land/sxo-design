import { describe, expect, it } from 'vitest';
import { defaultTokens } from '../../../sxo-design/src/tokens';
import { StyleEngine } from '../../src/engine';

describe('Layout Rules', () => {
    const engine = new StyleEngine(defaultTokens);

    describe('Display', () => {
        it('should handle basic display values', () => {
            expect(engine.generate('flex')).toContain('display: flex');
            expect(engine.generate('inline-flex')).toContain('display: inline-flex');
            expect(engine.generate('grid')).toContain('display: grid');
            expect(engine.generate('inline-grid')).toContain('display: inline-grid');
            expect(engine.generate('block')).toContain('display: block');
            expect(engine.generate('inline-block')).toContain('display: inline-block');
            expect(engine.generate('inline')).toContain('display: inline');
            expect(engine.generate('hidden')).toContain('display: none');
        });
    });

    describe('Flexbox & Grid Alignment', () => {
        it('should handle items alignment', () => {
            expect(engine.generate('items-start')).toContain('align-items: flex-start');
            expect(engine.generate('items-end')).toContain('align-items: flex-end');
            expect(engine.generate('items-center')).toContain('align-items: center');
            expect(engine.generate('items-baseline')).toContain('align-items: baseline');
            expect(engine.generate('items-stretch')).toContain('align-items: stretch');
        });

        it('should handle justify content', () => {
            expect(engine.generate('justify-start')).toContain('justify-content: flex-start');
            expect(engine.generate('justify-end')).toContain('justify-content: flex-end');
            expect(engine.generate('justify-center')).toContain('justify-content: center');
            expect(engine.generate('justify-between')).toContain('justify-content: space-between');
            expect(engine.generate('justify-around')).toContain('justify-content: space-around');
            expect(engine.generate('justify-evenly')).toContain('justify-content: space-evenly');
        });

        it('should handle align content', () => {
            expect(engine.generate('content-start')).toContain('align-content: flex-start');
            expect(engine.generate('content-end')).toContain('align-content: flex-end');
            expect(engine.generate('content-center')).toContain('align-content: center');
            expect(engine.generate('content-between')).toContain('align-content: space-between');
            expect(engine.generate('content-around')).toContain('align-content: space-around');
            expect(engine.generate('content-evenly')).toContain('align-content: space-evenly');
        });

        it('should handle self alignment', () => {
            expect(engine.generate('self-auto')).toContain('align-self: auto');
            expect(engine.generate('self-start')).toContain('align-self: flex-start');
            expect(engine.generate('self-end')).toContain('align-self: flex-end');
            expect(engine.generate('self-center')).toContain('align-self: center');
            expect(engine.generate('self-stretch')).toContain('align-self: stretch');
            expect(engine.generate('self-baseline')).toContain('align-self: baseline');
        });
    });

    describe('Flex Direction & Wrap', () => {
        it('should handle flex direction', () => {
            expect(engine.generate('flex-row')).toContain('flex-direction: row');
            expect(engine.generate('flex-row-reverse')).toContain('flex-direction: row-reverse');
            expect(engine.generate('flex-col')).toContain('flex-direction: column');
            expect(engine.generate('flex-col-reverse')).toContain('flex-direction: column-reverse');
        });

        it('should handle flex wrap', () => {
            expect(engine.generate('flex-wrap')).toContain('flex-wrap: wrap');
            expect(engine.generate('flex-nowrap')).toContain('flex-wrap: nowrap');
            expect(engine.generate('flex-wrap-reverse')).toContain('flex-wrap: wrap-reverse');
        });
    });

    describe('Flex Grow / Shrink / Basis', () => {
        it('should handle flex grow', () => {
            expect(engine.generate('grow')).toContain('flex-grow: 1');
            expect(engine.generate('grow-0')).toContain('flex-grow: 0');
            expect(engine.generate('grow-[2]')).toContain('flex-grow: 2');
        });

        it('should handle flex shrink', () => {
            expect(engine.generate('shrink')).toContain('flex-shrink: 1');
            expect(engine.generate('shrink-0')).toContain('flex-shrink: 0');
            expect(engine.generate('shrink-[2]')).toContain('flex-shrink: 2');
        });

        it('should handle flex basis/shorthand', () => {
            expect(engine.generate('flex-1')).toContain('flex: 1 1 0%');
            expect(engine.generate('flex-auto')).toContain('flex: 1 1 auto');
            expect(engine.generate('flex-initial')).toContain('flex: 0 1 auto');
            expect(engine.generate('flex-none')).toContain('flex: none');
            expect(engine.generate('flex-[2]')).toContain('flex: 2');
        });
    });

    describe('Positioning', () => {
        it('should handle position values', () => {
            expect(engine.generate('static')).toContain('position: static');
            expect(engine.generate('fixed')).toContain('position: fixed');
            expect(engine.generate('absolute')).toContain('position: absolute');
            expect(engine.generate('relative')).toContain('position: relative');
            expect(engine.generate('sticky')).toContain('position: sticky');
        });

        it('should handle insets', () => {
            expect(engine.generate('inset-0')).toContain(
                'top: var(--sxo-spacing-0); right: var(--sxo-spacing-0); bottom: var(--sxo-spacing-0); left: var(--sxo-spacing-0)',
            );
            expect(engine.generate('inset-x-4')).toContain(
                'left: var(--sxo-spacing-4); right: var(--sxo-spacing-4)',
            );
            expect(engine.generate('inset-y-2')).toContain(
                'top: var(--sxo-spacing-2); bottom: var(--sxo-spacing-2)',
            );
            expect(engine.generate('top-1')).toContain('top: var(--sxo-spacing-1)');
            expect(engine.generate('right-8')).toContain('right: var(--sxo-spacing-8)');
            expect(engine.generate('bottom-auto')).toContain('bottom: auto');
            expect(engine.generate('left-[10%]')).toContain('left: 10%');
        });
    });

    describe('Grid Columns & Rows', () => {
        it('should handle grid-cols', () => {
            expect(engine.generate('grid-cols-3')).toContain(
                'grid-template-columns: repeat(3, minmax(0, 1fr))',
            );
            expect(engine.generate('grid-cols-[200px_1fr]')).toContain(
                'grid-template-columns: 200px 1fr',
            );
        });

        it('should handle split grid cols', () => {
            // grid-cols-4 can be parsed as ['grid', 'cols', '4']
            expect(engine.generate('grid-cols-4')).toContain(
                'grid-template-columns: repeat(4, minmax(0, 1fr))',
            );
        });

        it('should handle grid-rows', () => {
            expect(engine.generate('grid-rows-2')).toContain(
                'grid-template-rows: repeat(2, minmax(0, 1fr))',
            );
            expect(engine.generate('grid-rows-[auto_1fr]')).toContain(
                'grid-template-rows: auto 1fr',
            );
        });
    });

    describe('Z-Index', () => {
        it('should handle z-index', () => {
            expect(engine.generate('z-0')).toContain('z-index: 0');
            expect(engine.generate('z-50')).toContain('z-index: 50');
            expect(engine.generate('z-auto')).toContain('z-index: auto');
            expect(engine.generate('z-[100]')).toContain('z-index: 100');
        });
    });

    describe('Layout Edge Cases', () => {
        it('should handle inset-x-4 as separate nodes', () => {
            const css = engine.generate('inset-x-4');
            expect(css).toContain('left: var(--sxo-spacing-4)');
            expect(css).toContain('right: var(--sxo-spacing-4)');
        });

        it('should handle gap-auto as literal', () => {
            const css = engine.generate('gap-auto');
            expect(css).toContain('gap: auto');
        });

        it('should handle gap with spacing token', () => {
            const customTokens = {
                ...defaultTokens,
                spacing: { testgap: '13px' },
            };
            const customEngine = new StyleEngine(customTokens as any);
            const css = customEngine.generate('gap-testgap');
            expect(css).toContain('gap: var(--sxo-spacing-testgap)');
        });

        it('should handle min/max width/height', () => {
            expect(engine.generate('min-w-4')).toContain('min-width: var(--sxo-spacing-4)');
            expect(engine.generate('max-w-xs')).toContain('max-width: var(--sxo-maxWidth-xs)');
            expect(engine.generate('min-h-[50vh]')).toContain('min-height: 50vh');
            expect(engine.generate('max-h-full')).toContain('max-height: 100%');
        });

        it('should handle literal spacing in width', () => {
            const customTokens = {
                ...defaultTokens,
                spacing: { gutter: '24px' },
            };
            const customEngine = new StyleEngine(customTokens as any);
            const css = customEngine.generate('w-gutter');
            expect(css).toContain('width: var(--sxo-spacing-gutter)');
        });
    });

    describe('Overflow', () => {
        it('should handle overflow', () => {
            expect(engine.generate('overflow-hidden')).toContain('overflow: hidden');
            expect(engine.generate('overflow-x-auto')).toContain('overflow-x: auto');
            expect(engine.generate('overflow-y-scroll')).toContain('overflow-y: scroll');
        });
    });
});
