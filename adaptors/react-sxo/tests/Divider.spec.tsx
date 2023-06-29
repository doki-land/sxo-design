import { describe, expect, it } from 'vitest';
import { Divider } from '../src/components/Divider';
import { render, screen } from './test-utils';

describe('Divider', () => {
    it('should render divider', () => {
        const { container } = render(<Divider />);
        expect(container.firstChild).toHaveClass('bg-neutral-200');
    });

    it('should render with children', () => {
        render(<Divider>Text</Divider>);
        expect(screen.getByText('Text')).toBeInTheDocument();
        expect(screen.getByText('Text').parentElement).toHaveClass('flex');
    });

    it('should apply orientation class', () => {
        const { container } = render(<Divider contentPlacement="left">Text</Divider>);
        expect(container.querySelector('.w-8')).toBeInTheDocument();
    });

    it('should apply dashed class', () => {
        const { container } = render(<Divider type="dashed" />);
        expect(container.firstChild).toHaveClass('border-t');
        expect(container.firstChild).toHaveClass('border-dashed');
    });

    it('should apply vertical class', () => {
        const { container } = render(<Divider direction="vertical" />);
        expect(container.firstChild).toHaveClass('inline-block');
        expect(container.firstChild).toHaveClass('w-[1px]');
    });
});
