import { describe, expect, it, vi } from 'vitest';
import alpineSxo from '../src/index';

describe('alpine-sxo', () => {
    it('should register sxo store and directive', () => {
        const store = vi.fn();
        const directive = vi.fn();
        const Alpine = {
            store,
            directive,
        };

        alpineSxo(Alpine);

        expect(store).toHaveBeenCalledWith('sxo', expect.any(Object));
        expect(directive).toHaveBeenCalledWith('sxo-theme', expect.any(Function));
    });

    it('should update theme in store', () => {
        let sxoStore: any;
        const Alpine = {
            store: (_name: string, value: any) => {
                if (value) sxoStore = value;
                return sxoStore;
            },
            directive: vi.fn(),
        };

        alpineSxo(Alpine);

        expect(sxoStore.theme).toBeDefined();

        sxoStore.setTheme({ color: { primary: { 500: '#ff0000' } } });
        expect(sxoStore.theme.color.primary[500]).toBe('#ff0000');
    });
});
