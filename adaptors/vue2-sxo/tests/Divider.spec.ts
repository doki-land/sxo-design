import { describe, expect, it } from 'vitest';
import Vue from 'vue';
import { Divider } from '../src/components/Divider';
import { SxoPlugin } from '../src/plugin';

const localVue = Vue.extend();
localVue.use(SxoPlugin);

describe('Divider', () => {
    it('should render horizontal divider by default', () => {
        const vm = new localVue({
            render: (h) => h(Divider),
        }).$mount();

        expect(vm.$el.classList.contains('h-[1px]')).toBe(true);
    });

    it('should render vertical divider', () => {
        const vm = new localVue({
            render: (h) =>
                h(Divider, {
                    props: {
                        direction: 'vertical',
                    },
                }),
        }).$mount();

        expect(vm.$el.classList.contains('inline-block')).toBe(true);
        expect(vm.$el.classList.contains('w-[1px]')).toBe(true);
    });

    it('should render with content', () => {
        const vm = new localVue({
            render: (h) => h(Divider, {}, 'Text Content'),
        }).$mount();

        expect(vm.$el.textContent?.trim()).toBe('Text Content');
    });
});
