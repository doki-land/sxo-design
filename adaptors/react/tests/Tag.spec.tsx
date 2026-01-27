import { describe, expect, it, vi } from 'vitest';
import { Tag } from '../src/components/Tag';
import { fireEvent, render, screen } from './test-utils';

describe('Tag', () => {
    it('should render children', () => {
        render(<Tag>My Tag</Tag>);
        expect(screen.getByText('My Tag')).toBeInTheDocument();
    });

    it('should handle close event', () => {
        const handleClose = vi.fn();
        render(
            <Tag closable onClose={handleClose}>
                Closable Tag
            </Tag>,
        );
        const closeIcon = screen.getByText('×');
        fireEvent.click(closeIcon);
        expect(handleClose).toHaveBeenCalled();
    });

    it('should apply color and variant props', () => {
        const { rerender } = render(<Tag color="success">Success Tag</Tag>);
        expect(screen.getByText('Success Tag')).toBeInTheDocument();

        rerender(<Tag variant="outline">Outline Tag</Tag>);
        expect(screen.getByText('Outline Tag')).toBeInTheDocument();
    });
});
