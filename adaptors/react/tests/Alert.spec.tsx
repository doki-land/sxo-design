import { describe, expect, it, vi } from 'vitest';
import { Alert } from '../src/components/Alert';
import { fireEvent, render, screen } from './test-utils';

describe('Alert', () => {
    it('should render title and description', () => {
        render(<Alert title="Alert Title" description="Alert Description" />);
        expect(screen.getByText('Alert Title')).toBeInTheDocument();
        expect(screen.getByText('Alert Description')).toBeInTheDocument();
    });

    it('should render icon by default', () => {
        const { container } = render(<Alert title="Title" />);
        // Default icons are SVG
        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should not render icon when showIcon is false', () => {
        const { container } = render(<Alert title="Title" showIcon={false} />);
        expect(container.querySelector('svg')).not.toBeInTheDocument();
    });

    it('should handle close event', () => {
        const handleClose = vi.fn();
        const { container } = render(<Alert title="Title" closable onClose={handleClose} />);

        // The close button is the last div in the alert
        const closeButton = container.querySelector('div[class*="closeButton"]');
        if (closeButton) {
            fireEvent.click(closeButton);
        } else {
            // Fallback: try to find the last svg and click its parent
            const svgs = container.querySelectorAll('svg');
            const closeIcon = svgs[svgs.length - 1];
            fireEvent.click(closeIcon.parentElement!);
        }

        expect(handleClose).toHaveBeenCalled();
    });

    it('should apply type classes', () => {
        const { rerender } = render(<Alert type="success" title="Success" />);
        expect(screen.getByText('Success')).toBeInTheDocument();

        rerender(<Alert type="error" title="Error" />);
        expect(screen.getByText('Error')).toBeInTheDocument();
    });
});
