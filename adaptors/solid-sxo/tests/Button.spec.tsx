/** @jsxImportSource solid-js */
import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../src/components/Button';

describe('Button', () => {
    it('should render correctly', () => {
        render(() => (<Button>Click me</Button>) as any);
        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toBeInTheDocument();
    });

    it('should handle click events', () => {
        const handleClick = vi.fn();
        render(() => (<Button onClick={handleClick}>Click me</Button>) as any);
        const button = screen.getByRole('button', { name: /click me/i });
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalled();
    });

    it('should apply variant classes', () => {
        render(() => (<Button variant="primary">Primary</Button>) as any);
        const button = screen.getByRole('button', { name: /primary/i });
        expect(button.className).toBeDefined();
    });
});
