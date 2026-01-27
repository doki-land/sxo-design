import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { Switch } from '../src/components/Switch';
import { createSxo } from '../src/plugin';

describe('Switch', () => {
    it('should render correctly with default props', () => {
        const wrapper = mount(Switch, {
            global: {
                plugins: [createSxo()],
            },
        });
        expect(wrapper.classes()).toContain('bg-neutral-200');
    });

    it('should toggle when clicked', async () => {
        const wrapper = mount(Switch, {
            global: {
                plugins: [createSxo()],
            },
            props: {
                modelValue: false,
            },
        });
        await wrapper.trigger('click');
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
        expect(wrapper.emitted('change')?.[0]).toEqual([true]);
    });

    it('should not toggle when disabled', async () => {
        const wrapper = mount(Switch, {
            global: {
                plugins: [createSxo()],
            },
            props: {
                modelValue: false,
                disabled: true,
            },
        });
        await wrapper.trigger('click');
        expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });

    it('should show active color when modelValue is true', () => {
        const wrapper = mount(Switch, {
            global: {
                plugins: [createSxo()],
            },
            props: {
                modelValue: true,
            },
        });
        expect(wrapper.classes()).toContain('bg-primary');
    });
});
