/** @jsxImportSource solid-js */
import { fireEvent, render, screen } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import App from '../examples/solid-todos/src/App';

describe('Solid Todos Example', () => {
    it('should render the app', () => {
        render(() => <App />);
        expect(screen.getAllByText(/SXO/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/HUB/i).length).toBeGreaterThan(0);
        expect(screen.getByPlaceholderText(/What's next\?/i)).toBeInTheDocument();
    });

    it('should add a new todo', () => {
        render(() => <App />);
        const input = screen.getByPlaceholderText(/What's next\?/i);
        const addButton = screen.getByText(/Add/i);

        fireEvent.input(input, { target: { value: 'New Solid Todo' } });
        fireEvent.click(addButton);

        expect(screen.getByText('New Solid Todo')).toBeInTheDocument();
    });

    it('should toggle a todo', () => {
        render(() => <App />);
        const input = screen.getByPlaceholderText(/What's next\?/i);
        const addButton = screen.getByText(/Add/i);

        fireEvent.input(input, { target: { value: 'Toggle Me' } });
        fireEvent.click(addButton);

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        expect(screen.getByText('Toggle Me')).toHaveClass('line-through');
    });

    it('should delete a todo', () => {
        render(() => <App />);
        const input = screen.getByPlaceholderText(/What's next\?/i);
        const addButton = screen.getByText(/Add/i);

        fireEvent.input(input, { target: { value: 'Delete Me' } });
        fireEvent.click(addButton);

        // Find the delete button (it's a button with an SVG inside)
        const _deleteButton = screen.getByRole('button', { name: '' }); // The delete button has no name, but there is only one other button than "Add"
        // Actually, let's just find the button that is NOT the Add button.
        const buttons = screen.getAllByRole('button');
        const deleteBtn = buttons.find((b) => b.textContent !== 'Add');

        if (deleteBtn) {
            fireEvent.click(deleteBtn);
        }

        expect(screen.queryByText('Delete Me')).not.toBeInTheDocument();
    });
});
