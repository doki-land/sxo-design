import { describe, expect, it, vi } from 'vitest';
import Vue from 'vue';
import { Radio, RadioGroup } from '../src/components/Radio';
import { SxoPlugin } from '../src/plugin';

const localVue = Vue.extend();
localVue.use(SxoPlugin);

describe('Radio', () => {
    it('should select radio in group', async () => {
        const onChange = vi.fn();
        const vm = new localVue({
            data() {
                return { value: 'a' };
            },
            render(h) {
                return h(
                    RadioGroup,
                    {
                        props: { value: this.value },
                        on: {
                            input: (val: string) => {
                                this.value = val;
                                onChange(val);
                            },
                        },
                    },
                    [
                        h(Radio, { props: { value: 'a' } }, 'Option A'),
                        h(Radio, { props: { value: 'b' } }, 'Option B'),
                    ],
                );
            },
        }).$mount();

        const radioLabels = vm.$el.querySelectorAll('label');
        const inputs = vm.$el.querySelectorAll(
            'input[type="radio"]',
        ) as NodeListOf<HTMLInputElement>;

        expect(inputs[0].checked).toBe(true);
        expect(inputs[1].checked).toBe(false);

        radioLabels[1].click();
        await vm.$nextTick();

        expect(onChange).toHaveBeenCalledWith('b');
        expect(inputs[1].checked).toBe(true);
        expect(inputs[0].checked).toBe(false);
    });
});
