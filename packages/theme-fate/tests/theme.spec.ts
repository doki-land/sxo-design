import { describe, expect, it } from 'vitest';
import { fateTheme } from '../src/tokens';

describe('Fate Theme', () => {
    it('should have correct theme structure', () => {
        expect(fateTheme.color).toBeDefined();
        expect(fateTheme.color?.primary?.DEFAULT).toBeDefined();
    });
});
