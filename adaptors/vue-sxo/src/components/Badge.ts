import { defineComponent, h, computed, PropType } from 'vue';
import { getBadgeClasses, BadgeOptions } from '@sxo/ui';
import { useStyle } from '../hooks';

export const Badge = defineComponent({
    name: 'SxoBadge',
    props: {
        variant: {
            type: String as PropType<BadgeOptions['variant']>,
            default: 'primary',
        },
    },
    setup(props, { slots, attrs }) {
        const sxoClasses = computed(() => getBadgeClasses({ variant: props.variant }));

        useStyle(() => `${sxoClasses.value} ${attrs.class || ''}`.trim());

        return () =>
            h(
                'span',
                {
                    ...attrs,
                    class: [sxoClasses.value, attrs.class],
                },
                slots.default?.(),
            );
    },
});
