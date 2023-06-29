import { describe, expect, it } from 'vitest';
import { githubTheme } from '../src/tokens';

describe('GitHub Theme', () => {
    it('should have correct theme structure', () => {
        expect(githubTheme.color).toBeDefined();
        expect(githubTheme.color?.primary?.DEFAULT).toBeDefined();
    });
});
