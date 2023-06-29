import { describe, expect, it } from 'vitest';
import { pornhubTheme } from '../src/tokens';

describe('Pornhub Theme', () => {
    it('should have correct theme structure', () => {
        expect(pornhubTheme.color?.primary?.DEFAULT).toBe('#FF9900');
        expect(pornhubTheme.color?.background?.primary).toBe('#000000');
    });

    it('should have correct borderRadius', () => {
        expect(pornhubTheme.borderRadius?.sm).toBe('4px');
    });
});
