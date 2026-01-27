import { describe, expect, it } from 'vitest';
import { Icon } from '../src/components/Icon';
import { render } from './test-utils';

describe('Icon', () => {
    it('should render correctly', () => {
        const { container } = render(<Icon name="Check" />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });

    it('should apply size and color', () => {
        const { container } = render(<Icon name="Check" size="24px" color="red" />);
        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('width', '24px');
        expect(svg).toHaveAttribute('height', '24px');
        expect(svg).toHaveAttribute('stroke', 'red');
    });

    it('should apply custom className', () => {
        const { container } = render(<Icon name="Check" className="custom-icon" />);
        const svg = container.querySelector('svg');
        expect(svg).toHaveClass('custom-icon');
    });
});
