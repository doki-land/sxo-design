import { describe, expect, it } from 'vitest';
import { pronhubTheme } from '../src/tokens';

describe('PronHub Theme', () => {
    it('should have correct theme structure', () => {
        expect(pronhubTheme.color?.primary?.DEFAULT).toBe('#FF9900');
        expect(pronhubTheme.color?.background?.primary).toBe('#000000');
    });

    it('should have correct borderRadius', () => {
        expect(pronhubTheme.borderRadius?.sm).toBe('4px');
    });
});
