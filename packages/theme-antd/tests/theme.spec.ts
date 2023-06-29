import { describe, expect, it } from 'vitest';
import { antdTheme } from '../src/tokens';

describe('Ant Design Theme', () => {
    it('should have correct theme structure', () => {
        expect(antdTheme.color).toBeDefined();
        expect(antdTheme.color?.primary?.DEFAULT).toBeDefined();
    });
});
