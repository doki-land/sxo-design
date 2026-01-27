import { describe, expect, it } from 'vitest';
import { Badge } from '../src/components/Badge';
import { render, screen } from './test-utils';

describe('Badge', () => {
    it('should render children', () => {
        render(<Badge>New</Badge>);
        expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('should apply variant props', () => {
        const { rerender } = render(<Badge variant="primary">Primary</Badge>);
        expect(screen.getByText('Primary')).toBeInTheDocument();

        rerender(<Badge variant="success">Success</Badge>);
        expect(screen.getByText('Success')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        render(<Badge className="custom-badge">Custom</Badge>);
        expect(screen.getByText('Custom').className).toContain('custom-badge');
    });
});
