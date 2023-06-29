import { describe, expect, it } from 'vitest';
import { cupertinoTheme } from '../src/tokens';

describe('Cupertino Theme', () => {
    it('should have correct theme structure', () => {
        expect(cupertinoTheme.color).toBeDefined();
        expect(cupertinoTheme.color?.primary?.DEFAULT).toBeDefined();
    });
});
