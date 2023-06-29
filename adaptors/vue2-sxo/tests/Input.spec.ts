import { describe, expect, it, vi } from 'vitest';
import Vue from 'vue';
import { Input } from '../src/components/Input';
import { SxoPlugin } from '../src/plugin';

const localVue = Vue.extend();
localVue.use(SxoPlugin);

describe('Input', () => {
    it('should render correctly', () => {
        const vm = new localVue({
            render: (h) =>
                h(Input, {
                    props: {
                        value: 'hello',
                    },
                }),
        }).$mount();

        const input = vm.$el.tagName === 'INPUT' ? vm.$el : vm.$el.querySelector('input');
        expect((input as HTMLInputElement)?.value).toBe('hello');
    });

    it('should emit input event on change', async () => {
        const onInput = vi.fn();
        const vm = new localVue({
            render: (h) =>
                h(Input, {
                    props: {
                        value: '',
                    },
                    on: {
                        input: onInput,
                    },
                }),
        }).$mount();

        const input = (
            vm.$el.tagName === 'INPUT' ? vm.$el : vm.$el.querySelector('input')
        ) as HTMLInputElement;
        if (input) {
            input.value = 'test';
            input.dispatchEvent(new Event('input'));
        }
        expect(onInput).toHaveBeenCalledWith('test');
    });

    it('should be disabled when disabled attribute is set', () => {
        const vm = new localVue({
            render: (h) =>
                h(Input, {
                    attrs: {
                        disabled: true,
                    },
                }),
        }).$mount();

        const input = vm.$el.tagName === 'INPUT' ? vm.$el : vm.$el.querySelector('input');
        expect(input?.getAttribute('disabled')).toBe('disabled');
    });
});
