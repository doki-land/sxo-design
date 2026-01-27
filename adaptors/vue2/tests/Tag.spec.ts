import { describe, expect, it, vi } from 'vitest';
import Vue from 'vue';
import { Tag } from '../src/components/Tag';
import { SxoPlugin } from '../src/plugin';

const localVue = Vue.extend();
localVue.use(SxoPlugin);

describe('Tag', () => {
    it('should render correctly', () => {
        const vm = new localVue({
            render: (h) => h(Tag, {}, 'Tag Content'),
        }).$mount();

        expect(vm.$el.textContent).toContain('Tag Content');
    });

    it('should apply variant classes', () => {
        const vm = new localVue({
            render: (h) =>
                h(Tag, {
                    props: {
                        variant: 'subtle',
                        color: 'success',
                    },
                }),
        }).$mount();

        console.log('Tag Success HTML:', vm.$el.outerHTML);
        expect(
            vm.$el.classList.contains('bg-success-50') || vm.$el.outerHTML.includes('success'),
        ).toBe(true);
    });

    it('should emit close event when close icon is clicked', async () => {
        const onClose = vi.fn();
        const vm = new localVue({
            render: (h) =>
                h(
                    Tag,
                    {
                        props: {
                            closable: true,
                        },
                        on: {
                            close: onClose,
                        },
                    },
                    'Tag Content',
                ),
        }).$mount();

        const closeIcon = vm.$el.querySelector('span.cursor-pointer');
        (closeIcon as HTMLElement)?.click();
        expect(onClose).toHaveBeenCalled();
    });
});
