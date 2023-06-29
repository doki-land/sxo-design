import { describe, expect, it, vi } from 'vitest';
import Vue from 'vue';
import { Alert } from '../src/components/Alert';
import { SxoPlugin } from '../src/plugin';

const localVue = Vue.extend();
localVue.use(SxoPlugin);

describe('Alert', () => {
    it('should render correctly with title and description', () => {
        const vm = new localVue({
            render: (h) =>
                h(Alert, {
                    props: {
                        title: 'Alert Title',
                        description: 'Alert Description',
                    },
                }),
        }).$mount();

        expect(vm.$el.textContent).toContain('Alert Title');
        expect(vm.$el.textContent).toContain('Alert Description');
    });

    it('should apply status classes', () => {
        const vm = new localVue({
            render: (h) =>
                h(Alert, {
                    props: {
                        type: 'success',
                    },
                }),
        }).$mount();

        console.log('Alert Success HTML:', vm.$el.outerHTML);
        expect(
            vm.$el.classList.contains('bg-success-50') || vm.$el.outerHTML.includes('success'),
        ).toBe(true);
    });

    it('should emit close event when close button is clicked', async () => {
        const onClose = vi.fn();
        const vm = new localVue({
            render: (h) =>
                h(Alert, {
                    props: {
                        closable: true,
                    },
                    on: {
                        close: onClose,
                    },
                }),
        }).$mount();

        const closeBtn = vm.$el.lastChild as HTMLElement;
        closeBtn?.click();
        expect(onClose).toHaveBeenCalled();
    });
});
