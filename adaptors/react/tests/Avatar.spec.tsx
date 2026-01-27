import { describe, expect, it } from 'vitest';
import { Avatar } from '../src/components/Avatar';
import { render, screen } from './test-utils';

describe('Avatar', () => {
    it('should render with src', () => {
        render(<Avatar src="https://example.com/avatar.png" alt="User Avatar" />);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', 'https://example.com/avatar.png');
        expect(img).toHaveAttribute('alt', 'User Avatar');
    });

    it('should render with fallback', () => {
        render(<Avatar fallback="JD" />);
        expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('should render with alt char as fallback', () => {
        render(<Avatar alt="John Doe" />);
        expect(screen.getByText('J')).toBeInTheDocument();
    });

    it('should apply size class', () => {
        const { container } = render(<Avatar size="lg" />);
        // lg size usually corresponds to w-12 h-12 in this system
        expect(container.firstChild).toHaveClass('w-12');
        expect(container.firstChild).toHaveClass('h-12');
    });

    it('should apply shape class', () => {
        const { container } = render(<Avatar shape="square" />);
        expect(container.firstChild).toHaveClass('rounded-lg');
    });
});
