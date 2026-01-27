import { describe, expect, it, vi } from 'vitest';
import Vue from 'vue';
import { Button } from '../src/components/Button';
import { SxoPlugin } from '../src/plugin';

// Use localVue-like behavior without @vue/test-utils
const localVue = Vue.extend();
localVue.use(SxoPlugin);

describe('Button', () => {
    it('should render correctly with default props', () => {
        const vm = new localVue({
            render: (h) => h(Button, {}, 'Click me'),
        }).$mount();

        expect(vm.$el.textContent).toBe('Click me');
        expect(vm.$el.classList.contains('bg-primary')).toBe(true);
    });

    it('should apply variant and size classes', () => {
        const vm = new localVue({
            render: (h) =>
                h(Button, {
                    props: {
                        variant: 'secondary',
                        size: 'lg',
                    },
                }),
        }).$mount();

        expect(vm.$el.classList.contains('px-6')).toBe(true);
        expect(vm.$el.classList.contains('bg-background-primary')).toBe(true);
    });

    it('should be disabled when disabled prop is true', () => {
        const vm = new localVue({
            render: (h) =>
                h(Button, {
                    props: {
                        disabled: true,
                    },
                }),
        }).$mount();

        expect(vm.$el.getAttribute('disabled')).toBe('disabled');
        expect(vm.$el.classList.contains('opacity-30')).toBe(true);
    });

    it('should emit click event when clicked', async () => {
        const onClick = vi.fn();
        const vm = new localVue({
            render: (h) =>
                h(Button, {
                    on: {
                        click: onClick,
                    },
                }),
        }).$mount();

        (vm.$el as HTMLElement).click();
        expect(onClick).toHaveBeenCalled();
    });
});
