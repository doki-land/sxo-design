import { type CardOptions, getCardClasses } from '@sxo/ui';
import { computed, defineComponent, h, type PropType } from 'vue';
import { useStyle } from '../hooks';

export const Card = defineComponent({
    name: 'SxoCard',
    props: {
        variant: {
            type: String as PropType<CardOptions['variant']>,
            default: 'outline',
        },
        padding: {
            type: String as PropType<CardOptions['padding']>,
            default: 'md',
        },
        rounded: {
            type: String as PropType<CardOptions['rounded']>,
            default: 'lg',
        },
        interactive: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { slots, attrs }) {
        const classes = computed(() => {
            const sxoClasses = getCardClasses({
                variant: props.variant,
                padding: props.padding,
                rounded: props.rounded,
                interactive: props.interactive,
            });
            return `${sxoClasses} ${attrs.class || ''}`.trim();
        });

        useStyle(() => classes.value);

        return () =>
            h(
                'view',
                {
                    ...attrs,
                    class: classes.value,
                },
                slots.default?.(),
            );
    },
});
