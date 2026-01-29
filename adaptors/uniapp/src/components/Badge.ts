import { type BadgeOptions, getBadgeClasses } from '@sxo/ui';
import { computed, defineComponent, h, type PropType } from 'vue';
import { useStyle } from '../hooks';

export const Badge = defineComponent({
    name: 'SxoBadge',
    props: {
        variant: {
            type: String as PropType<BadgeOptions['variant']>,
            default: 'primary',
        },
        size: {
            type: String as PropType<BadgeOptions['size']>,
            default: 'md',
        },
    },
    setup(props, { slots, attrs }) {
        const sxoClasses = computed(() =>
            getBadgeClasses({
                variant: props.variant,
                size: props.size,
            }),
        );

        useStyle(() => `${sxoClasses.value} ${attrs.class || ''}`.trim());

        return () =>
            h(
                'text',
                {
                    ...attrs,
                    class: [sxoClasses.value, attrs.class],
                },
                slots.default?.(),
            );
    },
});
