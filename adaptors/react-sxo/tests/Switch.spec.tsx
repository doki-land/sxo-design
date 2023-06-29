import { describe, expect, it, vi } from 'vitest';
import { Switch } from '../src/components/Switch';
import { fireEvent, render, screen } from './test-utils';

describe('Switch', () => {
    it('should render correctly', () => {
        const { container } = render(<Switch />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it('should toggle state when clicked', () => {
        const onChange = vi.fn();
        render(<Switch onChange={onChange} />);
        const track = screen.getByRole('switch');

        fireEvent.click(track);
        expect(onChange).toHaveBeenCalledWith(true);

        fireEvent.click(track);
        expect(onChange).toHaveBeenCalledWith(false);
    });

    it('should be disabled when disabled prop is true', () => {
        const onChange = vi.fn();
        render(<Switch disabled onChange={onChange} />);
        const track = screen.getByRole('switch');

        fireEvent.click(track);
        expect(onChange).not.toHaveBeenCalled();
        expect(track).toHaveClass('cursor-not-allowed');
    });

    it('should respect defaultChecked', () => {
        render(<Switch defaultChecked />);
        const track = screen.getByRole('switch');
        expect(track).toHaveAttribute('aria-checked', 'true');
    });

    it('should work in controlled mode', () => {
        const onChange = vi.fn();
        const { rerender } = render(<Switch checked={false} onChange={onChange} />);
        const track = screen.getByRole('switch');
        expect(track).toHaveAttribute('aria-checked', 'false');

        fireEvent.click(track);
        expect(onChange).toHaveBeenCalledWith(true);
        // Should still be false because it's controlled
        expect(track).toHaveAttribute('aria-checked', 'false');

        rerender(<Switch checked={true} onChange={onChange} />);
        expect(track).toHaveAttribute('aria-checked', 'true');
    });
});
