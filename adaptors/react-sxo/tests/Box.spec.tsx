import { describe, expect, it } from 'vitest';
import { Box } from '../src/components/Box';
import { render, screen } from './test-utils';

describe('Box', () => {
    it('should render as div by default', () => {
        const { container } = render(<Box>Content</Box>);
        expect(container.firstChild?.nodeName).toBe('DIV');
    });

    it('should render as different element using "as" prop', () => {
        const { container } = render(<Box as="section">Section Content</Box>);
        expect(container.firstChild?.nodeName).toBe('SECTION');
    });

    it('should apply utility props as classes', () => {
        const { container } = render(
            <Box p={4} m={2} bg="red-500">
                Box
            </Box>,
        );
        const element = container.firstChild as HTMLElement;
        expect(element.className).toContain('p-4');
        expect(element.className).toContain('m-2');
        expect(element.className).toContain('bg-red-500');
    });

    it('should apply custom className', () => {
        render(<Box className="custom-box">Box</Box>);
        expect(screen.getByText('Box').className).toContain('custom-box');
    });
});
