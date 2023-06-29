import { describe, expect, it, vi } from 'vitest';
import { Checkbox, CheckboxGroup } from '../src/components/Checkbox';
import { fireEvent, render, screen } from './test-utils';

describe('Checkbox', () => {
    it('should render correctly', () => {
        render(<Checkbox>Accept Terms</Checkbox>);
        expect(screen.getByLabelText('Accept Terms')).toBeInTheDocument();
    });

    it('should handle checked state', () => {
        const handleChange = vi.fn();
        render(<Checkbox onChange={handleChange}>Check me</Checkbox>);
        const checkbox = screen.getByLabelText('Check me');
        fireEvent.click(checkbox);
        // Note: useCheckbox hook might handle the event, let's check if it was called
        expect(checkbox).toBeChecked();
    });

    it('should be disabled when disabled prop is true', () => {
        render(<Checkbox disabled>Disabled Checkbox</Checkbox>);
        expect(screen.getByLabelText('Disabled Checkbox')).toBeDisabled();
    });

    describe('CheckboxGroup', () => {
        it('should handle group value changes', () => {
            const handleChange = vi.fn();
            render(
                <CheckboxGroup onChange={handleChange}>
                    <Checkbox value="A">Option A</Checkbox>
                    <Checkbox value="B">Option B</Checkbox>
                </CheckboxGroup>,
            );

            const optionA = screen.getByLabelText('Option A');
            fireEvent.click(optionA);

            expect(handleChange).toHaveBeenCalledWith(['A']);
            expect(optionA).toBeChecked();
        });

        it('should support default values', () => {
            render(
                <CheckboxGroup defaultValue={['B']}>
                    <Checkbox value="A">Option A</Checkbox>
                    <Checkbox value="B">Option B</Checkbox>
                </CheckboxGroup>,
            );

            expect(screen.getByLabelText('Option B')).toBeChecked();
            expect(screen.getByLabelText('Option A')).not.toBeChecked();
        });
    });
});
