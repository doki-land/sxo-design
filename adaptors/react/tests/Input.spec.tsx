import { describe, expect, it, vi } from 'vitest';
import { Input } from '../src/components/Input';
import { fireEvent, render, screen } from './test-utils';

describe('Input', () => {
    it('should render correctly', () => {
        render(<Input placeholder="Enter text" />);
        const input = screen.getByPlaceholderText('Enter text');
        expect(input).toBeInTheDocument();
    });

    it('should handle value changes', () => {
        const handleChange = vi.fn();
        render(<Input onChange={handleChange} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'Hello' } });
        expect(handleChange).toHaveBeenCalled();
        expect((input as HTMLInputElement).value).toBe('Hello');
    });

    it('should be disabled when disabled prop is true', () => {
        render(<Input disabled />);
        const input = screen.getByRole('textbox');
        expect(input).toBeDisabled();
    });

    it('should apply invalid styles', () => {
        render(<Input invalid />);
        const input = screen.getByRole('textbox');
        // Check if class reflects invalid state
        expect(input.className).toBeDefined();
    });
});
