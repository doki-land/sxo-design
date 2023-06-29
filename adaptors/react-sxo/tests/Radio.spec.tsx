import { describe, expect, it, vi } from 'vitest';
import { Radio, RadioGroup } from '../src/components/Radio';
import { fireEvent, render, screen } from './test-utils';

describe('Radio', () => {
    it('should render correctly in a group', () => {
        render(
            <RadioGroup defaultValue="A">
                <Radio value="A">Option A</Radio>
                <Radio value="B">Option B</Radio>
            </RadioGroup>,
        );

        expect(screen.getByText('Option A')).toBeInTheDocument();
        expect(screen.getByText('Option B')).toBeInTheDocument();

        const radioA = screen.getByDisplayValue('A');
        const radioB = screen.getByDisplayValue('B');

        expect(radioA).toBeChecked();
        expect(radioB).not.toBeChecked();
    });

    it('should change value when clicked', () => {
        const onChange = vi.fn();
        render(
            <RadioGroup onChange={onChange}>
                <Radio value="A">Option A</Radio>
                <Radio value="B">Option B</Radio>
            </RadioGroup>,
        );

        fireEvent.click(screen.getByText('Option B'));
        expect(onChange).toHaveBeenCalledWith('B');
        expect(screen.getByDisplayValue('B')).toBeChecked();
    });

    it('should work in controlled mode', () => {
        const onChange = vi.fn();
        const { rerender } = render(
            <RadioGroup value="A" onChange={onChange}>
                <Radio value="A">Option A</Radio>
                <Radio value="B">Option B</Radio>
            </RadioGroup>,
        );

        fireEvent.click(screen.getByText('Option B'));
        expect(onChange).toHaveBeenCalledWith('B');
        expect(screen.getByDisplayValue('A')).toBeChecked(); // Still A because it's controlled

        rerender(
            <RadioGroup value="B" onChange={onChange}>
                <Radio value="A">Option A</Radio>
                <Radio value="B">Option B</Radio>
            </RadioGroup>,
        );
        expect(screen.getByDisplayValue('B')).toBeChecked();
    });

    it('should throw error when used outside RadioGroup', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        expect(() => render(<Radio value="A">Option A</Radio>)).toThrow(
            'Radio must be used within RadioGroup',
        );
        consoleSpy.mockRestore();
    });
});
