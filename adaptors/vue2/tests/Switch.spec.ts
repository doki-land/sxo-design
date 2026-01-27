import { describe, expect, it, vi } from 'vitest';
import Vue from 'vue';
import { Switch } from '../src/components/Switch';
import { SxoPlugin } from '../src/plugin';

const localVue = Vue.extend();
localVue.use(SxoPlugin);

describe('Switch', () => {
    it('should toggle when clicked', async () => {
        const onChange = vi.fn();
        const vm = new localVue({
            data() {
                return { value: false };
            },
            render(h) {
                return h(Switch, {
                    props: { value: this.value },
                    on: {
                        input: (val: boolean) => {
                            this.value = val;
                            onChange(val);
                        },
                    },
                });
            },
        }).$mount();

        const track = vm.$el as HTMLElement;
        expect(track.classList.contains('bg-primary')).toBe(false);

        (track as HTMLElement).click();
        await vm.$nextTick();

        expect(onChange).toHaveBeenCalledWith(true);
        expect(track.classList.contains('bg-primary')).toBe(true);
    });

    it('should be disabled when disabled prop is true', async () => {
        const onChange = vi.fn();
        const vm = new localVue({
            render: (h) =>
                h(Switch, {
                    props: { disabled: true },
                    on: { input: onChange },
                }),
        }).$mount();

        const track = vm.$el as HTMLElement;

        (track as HTMLElement).click();
        await vm.$nextTick();

        expect(onChange).not.toHaveBeenCalled();
        expect(track.classList.contains('opacity-50')).toBe(true);
    });
});
