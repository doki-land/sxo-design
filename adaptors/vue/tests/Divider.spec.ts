import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { Divider } from '../src/components/Divider';
import { createSxo } from '../src/plugin';

describe('Divider', () => {
    it('should render horizontal divider by default', () => {
        const wrapper = mount(Divider, {
            global: {
                plugins: [createSxo()],
            },
        });
        expect(wrapper.classes()).toContain('flex-1');
        expect(wrapper.classes()).toContain('h-[1px]');
    });

    it('should render vertical divider', () => {
        const wrapper = mount(Divider, {
            global: {
                plugins: [createSxo()],
            },
            props: {
                direction: 'vertical',
            },
        });
        expect(wrapper.classes()).toContain('inline-block');
        expect(wrapper.classes()).toContain('w-[1px]');
    });

    it('should render with content', () => {
        const wrapper = mount(Divider, {
            global: {
                plugins: [createSxo()],
            },
            slots: {
                default: 'Divider Content',
            },
        });
        expect(wrapper.text()).toBe('Divider Content');
        expect(wrapper.find('span').exists()).toBe(true);
    });
});
