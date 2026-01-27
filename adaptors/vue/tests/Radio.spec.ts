import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { h } from 'vue';
import { Radio, RadioGroup } from '../src/components/Radio';
import { createSxo } from '../src/plugin';

describe('Radio', () => {
    it('should throw error when used outside RadioGroup', () => {
        // Silencing error log for this test
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        expect(() => {
            mount(Radio, {
                props: { value: 'test' },
            });
        }).toThrow('Radio must be used within RadioGroup');
        consoleSpy.mockRestore();
    });

    it('should select radio in group', async () => {
        const wrapper = mount(RadioGroup, {
            global: {
                plugins: [createSxo()],
            },
            props: {
                modelValue: 'a',
            },
            slots: {
                default: () => [
                    h(Radio, { value: 'a' }, () => 'Option A'),
                    h(Radio, { value: 'b' }, () => 'Option B'),
                ],
            },
        });

        const radios = wrapper.findAllComponents(Radio);
        expect(radios[0].text()).toBe('Option A');
        expect(radios[1].text()).toBe('Option B');

        // Initial state
        expect(radios[0].find('div').classes()).toContain('border-primary');
        expect(radios[1].find('div').classes()).not.toContain('border-primary');

        // Click second radio
        await radios[1].trigger('click');
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b']);
    });
});
