import { defaultTokens } from '@sxo/design';
import { describe, expect, it } from 'vitest';
import { StyleEngine } from '../../src/engine';

describe('New Rules Verification', () => {
    const engine = new StyleEngine(defaultTokens);

    it('should generate text-center', () => {
        const css = engine.generate('text-center');
        expect(css).toContain('text-align: center');
    });

    it('should generate text-balance', () => {
        const css = engine.generate('text-balance');
        expect(css).toContain('text-wrap: balance');
    });

    it('should generate select-none', () => {
        const css = engine.generate('select-none');
        expect(css).toContain('user-select: none');
    });

    it('should generate cursor-pointer', () => {
        const css = engine.generate('cursor-pointer');
        expect(css).toContain('cursor: pointer');
    });

    it('should generate transition-all', () => {
        const css = engine.generate('transition-all');
        expect(css).toContain('transition-property: all');
    });

    it('should generate duration-300', () => {
        const css = engine.generate('duration-300');
        expect(css).toContain('transition-duration: 300ms');
    });

    it('should generate scale-105', () => {
        const css = engine.generate('scale-105');
        expect(css).toContain('transform: scale(1.05)');
    });

    it('should generate -translate-y-1', () => {
        const css = engine.generate('-translate-y-1');
        expect(css).toContain('transform: translateY(-1px)');
    });

    it('should generate col-span-7', () => {
        const css = engine.generate('col-span-7');
        expect(css).toContain('grid-column: span 7 / span 7');
    });

    it('should generate border-t', () => {
        const css = engine.generate('border-t');
        expect(css).toContain('border-top-width: 1px');
    });

    it('should generate bg-size-[200%]', () => {
        const css = engine.generate('bg-size-[200%]');
        expect(css).toContain('background-size: 200%');
    });

    it('should generate shadow with opacity', () => {
        const css = engine.generate('shadow-neutral-100/50');
        expect(css).toContain('box-shadow:');
        expect(css).toContain('color-mix');
    });
});
