import { describe, expect, it } from 'vitest';
import { halloweenTheme } from '../src/tokens';

describe('Halloween Theme', () => {
    it('should have correct theme structure', () => {
        expect(halloweenTheme.color?.primary?.DEFAULT).toBe('#ED6A43');
        expect(halloweenTheme.color?.background?.primary).toBe('#F6F8FA');
    });

    it('should have dark mode overrides', () => {
        expect(halloweenTheme.modes?.dark?.color?.primary?.DEFAULT).toBe('#FF9668');
        expect(halloweenTheme.modes?.dark?.color?.background?.primary).toBe('#0D1117');
    });
});
