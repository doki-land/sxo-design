import { type CardOptions, getCardClasses } from '@sxo/ui';
import { computed, defineComponent, h, type PropType } from 'vue';
import { useStyle } from '../hooks';

export const Card = defineComponent({
    name: 'SxoCard',
    props: {
        variant: {
            type: String as PropType<CardOptions['variant']>,
            default: 'default',
        },
        padding: {
            type: String as PropType<CardOptions['padding']>,
            default: 'md',
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
                interactive: props.interactive,
            });
            return `${sxoClasses} ${attrs.class || ''}`.trim();
        });

        useStyle(() => classes.value);

        return () =>
            h(
                'div',
                {
                    ...attrs,
                    class: classes.value,
                },
                slots.default?.(),
            );
    },
});
