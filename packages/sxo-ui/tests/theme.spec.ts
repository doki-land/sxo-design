import { describe, expect, it } from 'vitest';
import { getButtonClasses } from '../src/components/Button';

describe('sxo-ui style generators', () => {
    describe('getButtonClasses', () => {
        it('should generate basic button classes', () => {
            const classes = getButtonClasses({ variant: 'primary', size: 'md' });
            expect(classes).toContain('inline-flex');
            expect(classes).toContain('bg-primary');
        });

        it('should handle different variants', () => {
            const primary = getButtonClasses({ variant: 'primary' });
            const secondary = getButtonClasses({ variant: 'secondary' });
            expect(primary).not.toBe(secondary);
            expect(primary).toContain('bg-primary');
            expect(secondary).toContain('bg-background-primary');
        });

        it('should handle different sizes', () => {
            const sm = getButtonClasses({ size: 'sm' });
            const lg = getButtonClasses({ size: 'lg' });
            expect(sm).not.toBe(lg);
        });
    });
});
