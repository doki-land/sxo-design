import { describe, expect, it } from 'vitest';
import Vue from 'vue';
import { Avatar } from '../src/components/Avatar';
import { SxoPlugin } from '../src/plugin';

const localVue = Vue.extend();
localVue.use(SxoPlugin);

describe('Avatar', () => {
    it('should render correctly', () => {
        const vm = new localVue({
            render: (h) =>
                h(Avatar, {
                    props: {
                        src: 'https://example.com/avatar.jpg',
                        alt: 'User',
                    },
                }),
        }).$mount();

        const img = vm.$el.querySelector('img');
        expect(img).toBeTruthy();
        expect(img?.getAttribute('src')).toBe('https://example.com/avatar.jpg');
        expect(img?.getAttribute('alt')).toBe('User');
    });

    it('should render initials when src is missing', () => {
        const vm = new localVue({
            render: (h) =>
                h(Avatar, {
                    props: {
                        alt: 'John Doe',
                    },
                }),
        }).$mount();

        expect(vm.$el.textContent?.trim()).toBe('J');
    });

    it('should apply size and shape classes', () => {
        const vm = new localVue({
            render: (h) =>
                h(Avatar, {
                    props: {
                        size: 'lg',
                        shape: 'square',
                    },
                }),
        }).$mount();

        expect(vm.$el.classList.contains('w-12')).toBe(true);
        expect(vm.$el.classList.contains('h-12')).toBe(true);
        expect(vm.$el.classList.contains('rounded-lg')).toBe(true);
    });
});
