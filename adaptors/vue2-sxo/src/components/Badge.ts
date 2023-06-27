import { defineComponent, h, computed, getCurrentInstance } from 'vue';
import { type BadgeOptions, getBadgeClasses } from '@sxo/ui';
import { useStyle } from '../hooks';

export const Badge = defineComponent({
    name: 'SxoBadge',
    props: {
        variant: {
            type: String as () => BadgeOptions['variant'],
            default: 'primary',
        },
    },
    setup(props, { slots, attrs }) {
        const instance = getCurrentInstance();
        const listeners = instance?.proxy.$listeners || {};

        const sxoClasses = computed(() => getBadgeClasses({ variant: props.variant }));

        useStyle(() => `${sxoClasses.value} ${attrs.class || ''}`.trim());

        return () =>
            h(
                'span',
                {
                    attrs,
                    class: [sxoClasses.value, attrs.class],
                    on: listeners,
                },
                slots.default ? slots.default() : [],
            );
    },
});
