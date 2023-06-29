import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../examples/react-todos/src/App';

describe('React Todo Example', () => {
    it('should render the app', () => {
        render(<App />);
        expect(screen.getByPlaceholderText(/What's next?/i)).toBeInTheDocument();
    });

    it('should add a new todo', () => {
        render(<App />);
        const input = screen.getByPlaceholderText(/What's next?/i);
        const button = screen.getByText(/Add/i);

        fireEvent.change(input, { target: { value: 'Buy milk' } });
        fireEvent.click(button);

        expect(screen.getByText('Buy milk')).toBeInTheDocument();
    });

    it('should toggle a todo', () => {
        render(<App />);
        const input = screen.getByPlaceholderText(/What's next?/i);
        const button = screen.getByText(/Add/i);

        fireEvent.change(input, { target: { value: 'Buy milk' } });
        fireEvent.click(button);

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        // Check if it's completed (this depends on UI implementation,
        // but checking if the checkbox is checked is a good start)
        expect(checkbox).toBeChecked();
    });

    it('should delete a todo', () => {
        render(<App />);
        const input = screen.getByPlaceholderText(/What's next?/i);
        const button = screen.getByText(/Add/i);

        fireEvent.change(input, { target: { value: 'Buy milk' } });
        fireEvent.click(button);

        // Find the delete button (the one with the trash icon)
        // It's the only other button in the todo item
        const deleteButton = screen
            .getAllByRole('button')
            .find((btn) => btn.innerHTML.includes('svg'));
        if (deleteButton) {
            fireEvent.click(deleteButton);
        }

        expect(screen.queryByText('Buy milk')).not.toBeInTheDocument();
    });
});
