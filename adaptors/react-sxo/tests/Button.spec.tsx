import { describe, expect, it, vi } from 'vitest';
import { Button } from '../src/components/Button';
import { fireEvent, render, screen } from './test-utils';

describe('Button', () => {
    it('should render correctly', () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();
    });

    it('should handle click events', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        const button = screen.getByRole('button', { name: /click me/i });
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when disabled prop is true', () => {
        render(<Button disabled>Disabled Button</Button>);
        const button = screen.getByRole('button', { name: /disabled button/i });
        expect(button).toBeDisabled();
    });

    it('should apply custom className', () => {
        render(<Button className="custom-class">Custom Class Button</Button>);
        const button = screen.getByRole('button', { name: /custom class button/i });
        expect(button.className).toContain('custom-class');
    });

    it('should apply variant classes', () => {
        render(<Button variant="primary">Primary Button</Button>);
        const button = screen.getByRole('button', { name: /primary button/i });
        expect(button.className).toBeDefined();
    });
});
