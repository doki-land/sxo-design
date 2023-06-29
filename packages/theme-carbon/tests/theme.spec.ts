import { describe, expect, it } from 'vitest';
import { carbonTheme } from '../src/tokens';

describe('Carbon Theme', () => {
    it('should have correct theme structure', () => {
        expect(carbonTheme.color).toBeDefined();
        expect(carbonTheme.color.primary.DEFAULT).toBeDefined();
    });
});
