import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '../examples/preview/src/main';

// Mock ReactDOM.createRoot since we are importing the component which might be calling it if it's not exported
// But wait, main.tsx usually has the side effect of rendering.
// Let's check if App is exported.

describe('Preview Example', () => {
    it('should render the preview app', () => {
        render(<App />);
        expect(screen.getByText(/SXO/i)).toBeInTheDocument();
        expect(screen.getAllByText(/DESIGN/i).length).toBeGreaterThan(0);
    });

    it('should toggle theme mode', () => {
        render(<App />);
        const modeButton = screen.getByText(/🌙|☀️/);
        fireEvent.click(modeButton);
    });

    it('should open dialog', () => {
        render(<App />);
        // Find button that contains "Open Dialog"
        const openDialogButton = screen.getByRole('button', { name: /Open Dialog/i });
        fireEvent.click(openDialogButton);
        expect(screen.getByText(/Confirmation/i)).toBeInTheDocument();
    });
});
