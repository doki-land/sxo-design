/** @jsxImportSource solid-js */
import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import { Input } from '../src/components/Input';

describe('Input', () => {
    it('should render correctly', () => {
        render(() => (<Input placeholder="Enter text" />) as any);
        const input = screen.getByPlaceholderText('Enter text');
        expect(input).toBeInTheDocument();
    });

    it('should handle input events', () => {
        const handleInput = vi.fn();
        render(() => (<Input onInput={handleInput} />) as any);
        const input = screen.getByRole('textbox');
        fireEvent.input(input, { target: { value: 'test' } });
        expect(handleInput).toHaveBeenCalled();
    });
});
