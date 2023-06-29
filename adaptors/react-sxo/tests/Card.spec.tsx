import { describe, expect, it } from 'vitest';
import { Card } from '../src/components/Card';
import { render, screen } from './test-utils';

describe('Card', () => {
    it('should render content', () => {
        render(<Card>Card Content</Card>);
        expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('should apply interactive class', () => {
        const { container } = render(<Card interactive>Content</Card>);
        expect(container.firstChild).toHaveClass('cursor-pointer');
    });

    it('should apply variant class', () => {
        const { container } = render(<Card variant="ghost">Content</Card>);
        expect(container.firstChild).toHaveClass('border-none');
    });
});
