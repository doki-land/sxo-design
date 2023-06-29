import { describe, expect, it } from 'vitest';
import { getIconSvg, Icons } from '../src/index';

describe('getIconSvg', () => {
    it('should generate valid SVG string', () => {
        const svg = getIconSvg({ name: 'Check' });
        expect(svg).toContain('<svg');
        expect(svg).toContain('viewBox="0 0 24 24"');
        expect(svg).toContain(Icons.Check);
    });

    it('should respect size and color props', () => {
        const svg = getIconSvg({ name: 'Close', size: 24, color: 'red' });
        expect(svg).toContain('width="24"');
        expect(svg).toContain('height="24"');
        expect(svg).toContain('stroke="red"');
    });

    it('should apply custom className', () => {
        const svg = getIconSvg({ name: 'Search', className: 'custom-icon' });
        expect(svg).toContain('class="custom-icon"');
    });

    it('should apply strokeWidth', () => {
        const svg = getIconSvg({ name: 'Plus', strokeWidth: 3 });
        expect(svg).toContain('stroke-width="3"');
    });
});
