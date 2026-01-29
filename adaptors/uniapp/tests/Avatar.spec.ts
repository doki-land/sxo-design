import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { Avatar } from '../src/components/Avatar';
import { createSxo } from '../src/plugin';

describe('Avatar', () => {
    it('should render image when src is provided', () => {
        const wrapper = mount(Avatar, {
            global: {
                plugins: [createSxo()],
            },
            props: {
                src: 'https://example.com/avatar.png',
                alt: 'User Avatar',
            },
        });
        const img = wrapper.find('img');
        expect(img.exists()).toBe(true);
        expect(img.attributes('src')).toBe('https://example.com/avatar.png');
        expect(img.attributes('alt')).toBe('User Avatar');
    });

    it('should render fallback when src is not provided', () => {
        const wrapper = mount(Avatar, {
            global: {
                plugins: [createSxo()],
            },
            props: {
                fallback: 'JD',
            },
        });
        expect(wrapper.text()).toBe('JD');
    });

    it('should apply size and shape classes', () => {
        const wrapper = mount(Avatar, {
            global: {
                plugins: [createSxo()],
            },
            props: {
                size: 'lg',
                shape: 'square',
            },
        });
        expect(wrapper.classes()).toContain('w-12');
        expect(wrapper.classes()).toContain('h-12');
        expect(wrapper.classes()).toContain('rounded-lg');
    });
});
