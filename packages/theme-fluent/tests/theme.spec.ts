import { describe, expect, it } from 'vitest';
import { fluentTheme } from '../src/tokens';

describe('Fluent Theme', () => {
    it('should have correct theme structure', () => {
        expect(fluentTheme.color).toBeDefined();
        expect(fluentTheme.color?.primary?.DEFAULT).toBeDefined();
    });
});
