import { describe, expect, it } from 'vitest';
import Vue from 'vue';
import { Badge } from '../src/components/Badge';
import { SxoPlugin } from '../src/plugin';

const localVue = Vue.extend();
localVue.use(SxoPlugin);

describe('Badge', () => {
    it('should render with variant class', () => {
        const vm = new localVue({
            render: (h) =>
                h(
                    Badge,
                    {
                        props: {
                            variant: 'secondary',
                        },
                    },
                    [h('div', 'Target')],
                ),
        }).$mount();

        expect(vm.$el.classList.contains('bg-background-secondary')).toBe(true);
    });
});
