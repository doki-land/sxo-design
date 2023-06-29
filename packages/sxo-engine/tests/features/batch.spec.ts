import { describe, expect, it } from 'vitest';
import { defaultTokens } from '../../../sxo-design/src/tokens';
import { StyleEngine } from '../../src/engine';

describe('Batch Generation', () => {
    const engine = new StyleEngine(defaultTokens);

    it('should generate multiple classes in one sheet', () => {
        const classes = ['flex', 'items-center', 'justify-between', 'p-4', 'bg-primary'];
        const sheet = engine.generateSheet(classes);

        expect(sheet).toContain('.flex');
        expect(sheet).toContain('.items-center');
        expect(sheet).toContain('.justify-between');
        expect(sheet).toContain('.p-4');
        expect(sheet).toContain('.bg-primary');
    });

    it('should sort classes correctly (base first, then variants, then responsive)', () => {
        const classes = ['sm:p-4', 'hover:bg-primary', 'p-2', 'md:m-4'];
        const sheet = engine.generateSheet(classes);

        const lines = sheet.split('\n').filter(Boolean);

        // p-2 should come before hover:bg-primary
        const p2Idx = lines.findIndex((l) => l.includes('.p-2'));
        const hoverIdx = lines.findIndex((l) => l.includes('.hover\\:bg-primary'));
        const smIdx = lines.findIndex((l) => l.includes('.sm\\:p-4'));
        const mdIdx = lines.findIndex((l) => l.includes('.md\\:m-4'));

        expect(p2Idx).toBeLessThan(hoverIdx);
        expect(hoverIdx).toBeLessThan(smIdx);
        expect(smIdx).toBeLessThan(mdIdx);
    });
});
