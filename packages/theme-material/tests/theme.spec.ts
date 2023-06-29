import { describe, expect, it } from 'vitest';
import { materialTheme } from '../src/tokens';

describe('Material Theme', () => {
    it('should have correct theme structure', () => {
        expect(materialTheme.color).toBeDefined();
        expect(materialTheme.color?.primary?.DEFAULT).toBeDefined();
    });
});
